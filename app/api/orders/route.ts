import { eq } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { getDb } from "../../../db";
import { auditLogs, orderItems, orders } from "../../../db/schema";
import { products } from "../../lib/products";

type OrderPayload={customer?:{name?:unknown;email?:unknown;cep?:unknown;city?:unknown;state?:unknown};paymentMethod?:unknown;items?:Array<{productId?:unknown;quantity?:unknown;unitPrice?:unknown}>;total?:unknown};
const clean=(value:unknown,max=140)=>typeof value==="string"?value.trim().slice(0,max):"";
const id=(prefix:string)=>`${prefix}-${crypto.randomUUID().replaceAll("-","").slice(0,8).toUpperCase()}`;

async function ensureOrderStorage(){
  const d1=env.DB;
  await d1.batch([
    d1.prepare("CREATE TABLE IF NOT EXISTS orders (id TEXT PRIMARY KEY NOT NULL, idempotency_key TEXT NOT NULL, user_id TEXT, customer_name TEXT NOT NULL, customer_email TEXT NOT NULL, postal_code TEXT NOT NULL, shipping_city TEXT NOT NULL, shipping_state TEXT NOT NULL, payment_method TEXT NOT NULL, status TEXT NOT NULL, mode TEXT DEFAULT 'sandbox' NOT NULL, currency TEXT DEFAULT 'BRL' NOT NULL, total REAL NOT NULL, pre_cac_margin REAL NOT NULL, supplier_order_id TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)"),
    d1.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_idempotency ON orders (idempotency_key)"),
    d1.prepare("CREATE INDEX IF NOT EXISTS idx_orders_status_created ON orders (status, created_at)"),
    d1.prepare("CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders (customer_email)"),
    d1.prepare("CREATE TABLE IF NOT EXISTS order_items (id TEXT PRIMARY KEY NOT NULL, order_id TEXT NOT NULL, product_id TEXT NOT NULL, variant_id TEXT, quantity INTEGER NOT NULL, unit_price REAL NOT NULL, unit_operating_cost REAL NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)"),
    d1.prepare("CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items (order_id)"),
    d1.prepare("CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items (product_id)"),
    d1.prepare("CREATE TABLE IF NOT EXISTS audit_logs (id TEXT PRIMARY KEY NOT NULL, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL, action TEXT NOT NULL, actor_type TEXT NOT NULL, before_json TEXT, after_json TEXT, source TEXT NOT NULL, created_at TEXT NOT NULL)"),
    d1.prepare("CREATE INDEX IF NOT EXISTS idx_audit_logs_entity_date ON audit_logs (entity_type, entity_id, created_at)"),
  ]);
}

export async function POST(request:Request){
  const idempotencyKey=clean(request.headers.get("Idempotency-Key"),100);
  if(!idempotencyKey) return Response.json({error:"Chave de idempotência obrigatória."},{status:400});
  let payload:OrderPayload;
  try{payload=await request.json() as OrderPayload}catch{return Response.json({error:"JSON inválido."},{status:400})}
  const name=clean(payload.customer?.name);const email=clean(payload.customer?.email);const cep=clean(payload.customer?.cep,12);const city=clean(payload.customer?.city);const state=clean(payload.customer?.state,2);const method=payload.paymentMethod==="pix"?"pix":"card";
  if(!name||!email.includes("@")||!/^\d{5}-?\d{3}$/.test(cep)||!city||state.length!==2) return Response.json({error:"Revise nome, e-mail, CEP, cidade e estado."},{status:400});
  const rawItems=Array.isArray(payload.items)?payload.items:[];
  if(!rawItems.length||rawItems.length>30) return Response.json({error:"Pedido sem itens ou acima do limite."},{status:400});
  const normalized=[] as Array<{product:(typeof products)[number];quantity:number;unitPrice:number}>;
  for(const item of rawItems){const product=products.find(p=>p.id===item.productId);const quantity=Number(item.quantity);if(!product||!Number.isInteger(quantity)||quantity<1||quantity>9)return Response.json({error:"Produto ou quantidade inválida."},{status:400});const unitPrice=method==="pix"?product.pixPrice:product.price;normalized.push({product,quantity,unitPrice})}
  const authoritativeTotal=Number(normalized.reduce((sum,item)=>sum+item.unitPrice*item.quantity,0).toFixed(2));
  if(Math.abs(authoritativeTotal-Number(payload.total))>.01)return Response.json({error:"Preço divergente. Atualize o carrinho."},{status:409});
  const now=new Date().toISOString();await ensureOrderStorage();const db=getDb();
  const [existing]=await db.select({id:orders.id,status:orders.status}).from(orders).where(eq(orders.idempotencyKey,idempotencyKey)).limit(1);
  if(existing)return Response.json({orderId:existing.id,status:existing.status,mode:"sandbox",idempotentReplay:true});
  const orderId=id("ND");const preCac=Number(normalized.reduce((sum,item)=>sum+(item.unitPrice-(item.product.operations.operatingCost ?? item.unitPrice))*item.quantity,0).toFixed(2));
  await db.insert(orders).values({id:orderId,idempotencyKey,customerName:name,customerEmail:email,postalCode:cep,shippingCity:city,shippingState:state,paymentMethod:method,status:"manual_review",mode:"sandbox",currency:"BRL",total:authoritativeTotal,preCacMargin:preCac,createdAt:now,updatedAt:now});
  await db.insert(orderItems).values(normalized.map(item=>({id:id("ITEM"),orderId,productId:item.product.id,quantity:item.quantity,unitPrice:item.unitPrice,unitOperatingCost:item.product.operations.operatingCost ?? item.unitPrice,createdAt:now,updatedAt:now})));
  await db.insert(auditLogs).values({id:id("AUD"),entityType:"order",entityId:orderId,action:"sandbox_order_created",actorType:"customer",afterJson:JSON.stringify({status:"manual_review",total:authoritativeTotal,itemCount:normalized.length}),source:"storefront",createdAt:now});
  return Response.json({orderId,status:"manual_review",mode:"sandbox"},{status:201});
}
