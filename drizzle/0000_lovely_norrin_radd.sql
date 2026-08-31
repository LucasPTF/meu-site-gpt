CREATE TABLE `addresses` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`name` text NOT NULL,
	`line1` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`postal_code` text NOT NULL,
	`country` text DEFAULT 'BR' NOT NULL,
	`phone` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_addresses_user_id` ON `addresses` (`user_id`);--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`entity_type` text NOT NULL,
	`entity_id` text NOT NULL,
	`action` text NOT NULL,
	`actor_type` text NOT NULL,
	`before_json` text,
	`after_json` text,
	`source` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_audit_logs_entity_date` ON `audit_logs` (`entity_type`,`entity_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `automation_events` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text,
	`type` text NOT NULL,
	`status` text NOT NULL,
	`adapter` text,
	`attempt` integer DEFAULT 1 NOT NULL,
	`payload_json` text,
	`error_message` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_automation_events_order_status` ON `automation_events` (`order_id`,`status`);--> statement-breakpoint
CREATE TABLE `carts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_carts_user_status` ON `carts` (`user_id`,`status`);--> statement-breakpoint
CREATE TABLE `coupons` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`type` text NOT NULL,
	`value` real NOT NULL,
	`active` integer DEFAULT false NOT NULL,
	`starts_at` text,
	`ends_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_coupons_code` ON `coupons` (`code`);--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`product_id` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_favorites_user_product` ON `favorites` (`user_id`,`product_id`);--> statement-breakpoint
CREATE TABLE `inventory` (
	`id` text PRIMARY KEY NOT NULL,
	`variant_id` text NOT NULL,
	`supplier_product_id` text NOT NULL,
	`available` integer NOT NULL,
	`quantity` integer,
	`checked_at` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_inventory_variant` ON `inventory` (`variant_id`);--> statement-breakpoint
CREATE TABLE `margin_rules` (
	`id` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`minimum_percent` real NOT NULL,
	`target_percent` real NOT NULL,
	`max_cost_variation_percent` real NOT NULL,
	`action_on_breach` text DEFAULT 'manual_review' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_margin_rules_category` ON `margin_rules` (`category`);--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`product_id` text NOT NULL,
	`variant_id` text,
	`quantity` integer NOT NULL,
	`unit_price` real NOT NULL,
	`unit_operating_cost` real NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_order_items_order` ON `order_items` (`order_id`);--> statement-breakpoint
CREATE INDEX `idx_order_items_product` ON `order_items` (`product_id`);--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`idempotency_key` text NOT NULL,
	`user_id` text,
	`customer_name` text NOT NULL,
	`customer_email` text NOT NULL,
	`postal_code` text NOT NULL,
	`shipping_city` text NOT NULL,
	`shipping_state` text NOT NULL,
	`payment_method` text NOT NULL,
	`status` text NOT NULL,
	`mode` text DEFAULT 'sandbox' NOT NULL,
	`currency` text DEFAULT 'BRL' NOT NULL,
	`total` real NOT NULL,
	`pre_cac_margin` real NOT NULL,
	`supplier_order_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_orders_idempotency` ON `orders` (`idempotency_key`);--> statement-breakpoint
CREATE INDEX `idx_orders_status_created` ON `orders` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_orders_customer_email` ON `orders` (`customer_email`);--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`provider` text NOT NULL,
	`provider_payment_id` text,
	`status` text NOT NULL,
	`amount` real NOT NULL,
	`idempotency_key` text NOT NULL,
	`mode` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_payments_idempotency` ON `payments` (`idempotency_key`);--> statement-breakpoint
CREATE INDEX `idx_payments_order` ON `payments` (`order_id`);--> statement-breakpoint
CREATE TABLE `price_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`variant_id` text NOT NULL,
	`supplier_product_id` text,
	`currency` text NOT NULL,
	`supplier_cost` real NOT NULL,
	`operating_cost` real NOT NULL,
	`sale_price` real NOT NULL,
	`margin_percent` real NOT NULL,
	`captured_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_price_history_variant_date` ON `price_history` (`variant_id`,`captured_at`);--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`brand` text NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`role` text NOT NULL,
	`status` text DEFAULT 'validation' NOT NULL,
	`compliance_status` text NOT NULL,
	`score` real,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_products_slug` ON `products` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_products_status_category` ON `products` (`status`,`category`);--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`product_id` text NOT NULL,
	`order_item_id` text NOT NULL,
	`rating` integer NOT NULL,
	`title` text,
	`body` text,
	`verified_purchase` integer DEFAULT true NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_reviews_order_item` ON `reviews` (`order_item_id`);--> statement-breakpoint
CREATE INDEX `idx_reviews_product_status` ON `reviews` (`product_id`,`status`);--> statement-breakpoint
CREATE TABLE `shipments` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`supplier_id` text,
	`tracking_code` text,
	`carrier` text,
	`status` text NOT NULL,
	`estimated_delivery` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_shipments_order` ON `shipments` (`order_id`);--> statement-breakpoint
CREATE INDEX `idx_shipments_tracking` ON `shipments` (`tracking_code`);--> statement-breakpoint
CREATE TABLE `supplier_products` (
	`id` text PRIMARY KEY NOT NULL,
	`supplier_id` text NOT NULL,
	`variant_id` text NOT NULL,
	`external_id` text,
	`currency` text DEFAULT 'BRL' NOT NULL,
	`unit_cost` real NOT NULL,
	`freight_cost` real DEFAULT 0 NOT NULL,
	`is_primary` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_supplier_products_variant` ON `supplier_products` (`variant_id`);--> statement-breakpoint
CREATE INDEX `idx_supplier_products_supplier` ON `supplier_products` (`supplier_id`);--> statement-breakpoint
CREATE TABLE `supplier_scores` (
	`id` text PRIMARY KEY NOT NULL,
	`supplier_id` text NOT NULL,
	`score` real NOT NULL,
	`reputation` real,
	`dispatch` real,
	`tracking` real,
	`stock_stability` real,
	`automation` real,
	`evaluated_at` text NOT NULL,
	`evidence_json` text
);
--> statement-breakpoint
CREATE INDEX `idx_supplier_scores_supplier_date` ON `supplier_scores` (`supplier_id`,`evaluated_at`);--> statement-breakpoint
CREATE TABLE `suppliers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`adapter` text NOT NULL,
	`status` text DEFAULT 'qualification' NOT NULL,
	`score` real,
	`country` text,
	`automation_mode` text DEFAULT 'mock' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tracking_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`shipment_id` text NOT NULL,
	`status` text NOT NULL,
	`description` text NOT NULL,
	`occurred_at` text NOT NULL,
	`source` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_tracking_events_shipment_date` ON `tracking_events` (`shipment_id`,`occurred_at`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_users_email` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `variants` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`sku` text NOT NULL,
	`name` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_variants_sku` ON `variants` (`sku`);--> statement-breakpoint
CREATE INDEX `idx_variants_product_id` ON `variants` (`product_id`);--> statement-breakpoint
CREATE TABLE `webhook_events` (
	`id` text PRIMARY KEY NOT NULL,
	`provider` text NOT NULL,
	`external_event_id` text NOT NULL,
	`signature_valid` integer NOT NULL,
	`status` text NOT NULL,
	`payload_hash` text NOT NULL,
	`received_at` text NOT NULL,
	`processed_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_webhook_provider_event` ON `webhook_events` (`provider`,`external_event_id`);
--> statement-breakpoint
PRAGMA optimize;
