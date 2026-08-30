import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Crown, Rocket, MessageCircle, Ruler, Clock, Tag } from 'lucide-react';
import { AD_PRICES, WA_NUMBER } from '../mock/mock';

function waLink(name) {
  const msg = `Merhaba ( ${name} ) Reklam Alanı Hakkında Bilgi Almak İstiyorum`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function ReklamFiyatlari() {
  return (
    <>
      <div className="crumb"><Link to="/">Anasayfa</Link> <ChevronRight size={14} /> <span>Reklam Fiyatları</span></div>

      <div className="m2-top">
        <div className="m2-top__title">
          <span className="m2-top__badge"><Tag size={18} /></span>
          <div className="m2-top__main">Reklam Fiyatları</div>
        </div>
        <a className="m2-addBtn" href={waLink('Genel Reklam')} target="_blank" rel="noopener"><MessageCircle size={15} /> İletişime Geç</a>
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        <div className="card-body" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          Serverinizi binlerce oyuncuya ulaştırmak için aşağıdaki reklam alanlarından dilediğinizi seçebilirsiniz. Seçiminizi yaptıktan sonra “Mesaj Gönder” butonu ile WhatsApp üzerinden bizimle iletişime geçin. Ödeme onayı sonrası reklamınız anında yayına alınır.
        </div>
      </div>

      <div className="price-grid">
        {AD_PRICES.map((p, i) => (
          <div key={i} className={`price-card ${p.highlight ? 'is-vip' : ''} ${p.accent ? 'is-accent' : ''}`}>
            {p.highlight && <span className="price-ribbon">EN POPÜLER</span>}
            <div className="price-ico">{p.icon === 'crown' ? <Crown size={22} /> : <Rocket size={22} />}</div>
            <div className="price-name">{p.name}</div>
            <div className="price-meta">
              <span><Ruler size={13} /> {p.size}</span>
              <span><Clock size={13} /> {p.duration}</span>
            </div>
            <div className="price-amount">{p.price}</div>
            <a className="btn btn-primary price-btn" href={waLink(p.name)} target="_blank" rel="noopener">
              <MessageCircle size={16} /> Mesaj Gönder
            </a>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <div className="card-head"><Crown size={18} /> VIP Server Bölümü Nedir?</div>
        <div className="card-body" style={{ color: '#cfe0ff', lineHeight: 1.7 }}>
          VIP Server Bölümü, serverinizin ana sayfada <b>tüm normal serverlerin en üstünde</b>, altın çerçeveli ve “👑 VIP” rozetli olarak görünmesini sağlar. Bu sayede serveriniz sürekli en üstte kalır ve maksimum tıklanma alır. Süre: 1 Ay — 500 TL.
        </div>
      </div>
    </>
  );
}
