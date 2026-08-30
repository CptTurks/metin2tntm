import React from 'react';
import { Link } from 'react-router-dom';
import { AD_BANNERS } from '../mock/mock';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-links">
          <a href="#gm">GM Kodları</a>
          <a href="#reklam">Reklam Fiyatları</a>
          <a href="#blog">Blog</a>
        </div>
        <div className="footer-center">
          <span className="rights">© 2026 TopMetin2Pvp — Tüm hakları saklıdır</span>
          <span className="version">
            <span>Metin2 PvP Server Tanıtım Merkezi</span>
            <span className="dot">•</span>
            <span>v1.0</span>
          </span>
        </div>
        <div className="footer-links">
          <a href="#gizlilik">Gizlilik</a>
          <a href="#kurallar">Kurallar</a>
          <a href="#iletisim">İletişim</a>
        </div>
      </div>
    </footer>
  );
}

export function AdSlot({ side }) {
  const img = side === 'left' ? AD_BANNERS[0] : AD_BANNERS[1];
  return (
    <aside className="ad-slot">
      <div className="ad-card">
        <div className="ad-label">Reklam</div>
        <a href="#reklam"><img src={img} alt="Reklam alanı" /></a>
      </div>
      <div className="ad-card" style={{ marginTop: 14 }}>
        <div className="ad-label">Sponsor</div>
        <Link to="/sunucu-ekle">
          <div style={{ padding: '24px 12px', textAlign: 'center', border: '1px dashed rgba(240,164,75,.4)', borderRadius: 12, color: '#ffce52', fontWeight: 700 }}>
            🚀 Serverini burada tanıt!
          </div>
        </Link>
      </div>
    </aside>
  );
}
