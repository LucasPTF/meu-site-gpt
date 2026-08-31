"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductMedia } from "../../lib/products";

export function ProductGallery({ media, accent }: { media: ProductMedia[]; accent: string }) {
  const [selected, setSelected] = useState(0);
  const [broken, setBroken] = useState(false);
  const current = media[selected] ?? media[0];

  return <div className="gallery-shell">
    <div className="product-gallery" style={{ background: accent }}>
      <Image
        key={`${current.id}-${broken}`}
        src={broken ? "/og-v2.png" : current.src}
        alt={broken ? "Identidade visual Nordly exibida enquanto a imagem do produto está indisponível" : current.alt}
        width={900}
        height={900}
        priority={selected === 0}
        sizes="(max-width: 760px) 100vw, 50vw"
        onError={() => setBroken(true)}
      />
      <small>{broken ? "Imagem temporariamente indisponível" : `Imagem oficial · fonte: ${current.sourceLabel}`}</small>
    </div>
    {media.length > 1 && <div className="gallery-thumbnails" aria-label="Galeria do produto">
      {media.map((item, index) => <button className={selected === index ? "active" : ""} key={item.id} onClick={() => { setSelected(index); setBroken(false); }} aria-label={`Ver imagem ${index + 1}: ${item.alt}`} aria-pressed={selected === index}>
        <Image src={item.src} alt="" width={130} height={110} loading="lazy" />
      </button>)}
    </div>}
  </div>;
}
