import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SIDE_BANNERS } from '../mock/mock';
import { useApp } from '../context/AppContext';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-links">
          <Link to="/gm-kodlari">GM Kodları</Link>
          <Link to="/reklam-fiyatlari">Reklam Fiyatları</Link>
          <Link to="/blog">Blog</Link>
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

// Tall vertical "page skin" (sayfa giydirme) side banner
export function AdSlot({ side }) {
  const { banners, trackBannerClick, trackBannerImpression } = useApp();
  const pos = side === 'left' ? 'sol' : 'sag';
  const b = banners.find((x) => x.active && x.position === pos);
  const img = b ? b.img : (side === 'left' ? SIDE_BANNERS.left : SIDE_BANNERS.right);
  const { pathname } = useLocation();
  React.useEffect(() => { if (b && !pathname.startsWith('/admin')) trackBannerImpression(b.id); /* eslint-disable-next-line */ }, []);
  return (
    <aside className="ad-slot">
      <a
        className="side-skin"
        href={b?.url || '#reklam'}
        target={b ? '_blank' : undefined}
        rel="noopener noreferrer"
        title="Reklam alanı"
        data-testid={b ? `side-banner-${b.id}` : undefined}
        onClick={() => { if (b) trackBannerClick(b.id); }}
      >
        <img src={img} alt="Sayfa giydirme reklam alanı" />
        <span className="side-skin__tag">REKLAM</span>
      </a>
      <Link to="/reklam-fiyatlari" className="side-cta">🚀 Serverini burada tanıt!</Link>
    </aside>
  );
}
