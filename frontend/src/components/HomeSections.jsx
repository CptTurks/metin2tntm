import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, SITE_STATS, TOP_BANNERS } from '../mock/mock';
import { useApp } from '../context/AppContext';
import { Server, Users, ThumbsUp, Eye, Crown } from 'lucide-react';

export function WelcomeHero() {
  const daysActive = 242;
  return (
    <section className="dle-welcome" aria-label="Hoşgeldiniz Alanı">
      <div className="dle-wrap">
        <div className="dle-head">
          <p className="dle-title">Sitemize Hoşgeldiniz !</p>
          <div className="dle-notice">
            <span className="dle-dot" />
            <span>DUYURU: Sitemiz {daysActive} Gündür Aktif !</span>
          </div>
        </div>
        <div className="dle-hero">
          <div className="dle-grid">
            <div className="dle-side">
              <img src="https://images.unsplash.com/photo-1529981188441-8a2e6fe30103?crop=entropy&cs=srgb&fm=jpg&q=85&w=500" alt="Sol blok görseli" loading="lazy" />
            </div>
            <div className="dle-mid">
              <div className="dle-illu">M2</div>
              <h1 className="dle-big">HOŞGELDİNİZ</h1>
              <p className="dle-sub">Pvp serverlerinizi sitemizde ücretsiz olarak tanıtabilirsiniz. Blog bölümümüzde sizlere özel olarak hazırladığımız içerikler ile kalitenin farkına varın. Haydi Durma ! Aramıza Katıl</p>
            </div>
            <div className="dle-side">
              <img src="https://images.unsplash.com/photo-1553986782-9f6de60b51b4?crop=entropy&cs=srgb&fm=jpg&q=85&w=500" alt="Sağ blok görseli" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServerModes() {
  const navigate = useNavigate();
  return (
    <section className="m2-modes" aria-label="Server Tipleri">
      <div className="m2-modes__grid">
        {CATEGORIES.map((c) => (
          <a key={c.slug} className="m2-mode" href={`/kategori/${c.slug}`}
             onClick={(e) => { e.preventDefault(); navigate(`/kategori/${c.slug}`); }}>
            <img className="m2-mode__img" src={c.img} alt={c.label} />
            <div className="m2-mode__label">{c.label}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function TopBanners() {
  const { banners, trackBannerClick, trackBannerImpression } = useApp();
  const list = banners.filter((b) => b.active && b.position === 'ust');
  useEffect(() => { list.forEach((b) => trackBannerImpression(b.id)); /* eslint-disable-next-line */ }, []);
  if (list.length === 0) {
    return (
      <section className="top-banners" aria-label="Reklamlı serverler">
        {TOP_BANNERS.map((b, i) => (
          <a key={i} className="top-banner" href={b.url}>
            <img src={b.img} alt={b.title} />
            <span className="top-banner__tag">REKLAM</span>
          </a>
        ))}
      </section>
    );
  }
  return (
    <section className="top-banners" aria-label="Reklamlı serverler">
      {list.map((b) => (
        <a key={b.id} className="top-banner" href={b.url || '#'} target="_blank" rel="noopener noreferrer"
           data-testid={`top-banner-${b.id}`} onClick={() => trackBannerClick(b.id)}>
          <img src={b.img} alt="reklam" />
          <span className="top-banner__tag">REKLAM</span>
        </a>
      ))}
    </section>
  );
}

export function StatsRow() {
  const items = [
    { icon: <Server size={20} />, label: 'Toplam Server', value: SITE_STATS.serverCount },
    { icon: <Users size={20} />, label: 'Üye Sayısı', value: SITE_STATS.memberCount.toLocaleString('tr-TR') },
    { icon: <ThumbsUp size={20} />, label: 'Toplam Oy', value: SITE_STATS.totalVotes.toLocaleString('tr-TR') },
    { icon: <Eye size={20} />, label: 'Günlük Ziyaret', value: SITE_STATS.dailyVisits.toLocaleString('tr-TR') },
  ];
  return (
    <div className="stats-grid">
      {items.map((it, i) => (
        <div key={i} className="stat-item">
          <div className="stat-ico">{it.icon}</div>
          <div>
            <div className="stat-label">{it.label}</div>
            <div className="stat-value">{it.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
