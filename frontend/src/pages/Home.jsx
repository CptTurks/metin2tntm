import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Crown, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WelcomeHero, ServerModes, StatsRow, TopBanners } from '../components/HomeSections';
import ServerRow from '../components/ServerRow';
import SortBar, { sortServers } from '../components/SortBar';
import { AD_BANNERS, BLOG_POSTS } from '../mock/mock';

export default function Home() {
  const { servers } = useApp();
  const navigate = useNavigate();
  const [sort, setSort] = useState('date');
  const visible = servers.filter((s) => !s.hidden);
  const vipServers = visible.filter((s) => s.featured).sort((a, b) => b.likes - a.likes);
  const normalServers = sortServers(visible.filter((s) => !s.featured), sort);

  return (
    <>
      <WelcomeHero />
      <ServerModes />

      {/* Üstte yan yana 2 reklam bannerı */}
      <TopBanners />

      {/* VIP / Öne Çıkan Serverler */}
      {vipServers.length > 0 && (
        <>
          <div className="m2-top m2-top--vip">
            <div className="m2-top__title">
              <span className="m2-top__badge m2-top__badge--vip"><Crown size={18} /></span>
              <div className="m2-top__main">👑 VIP Öne Çıkan Serverler</div>
            </div>
            <button className="m2-addBtn m2-addBtn--vip" onClick={() => navigate('/reklam-fiyatlari')}>VIP Ol</button>
          </div>
          {vipServers.map((s) => <ServerRow key={s.id} s={s} />)}
        </>
      )}

      <div className="m2-top">
        <div className="m2-top__title">
          <span className="m2-top__badge"><Sparkles size={18} /></span>
          <div className="m2-top__main">Son Eklenen PVP Serverler</div>
        </div>
        <button className="m2-addBtn" onClick={() => navigate('/sunucu-ekle')}>🚀 Server Ekle</button>
      </div>

      <SortBar value={sort} onChange={setSort} />
      {normalServers.map((s) => <ServerRow key={s.id} s={s} />)}

      {/* Son Rehberler & Blog şeridi */}
      <div className="m2-top" style={{ marginTop: 24 }}>
        <div className="m2-top__title">
          <span className="m2-top__badge"><BookOpen size={18} /></span>
          <div className="m2-top__main">📚 Son Rehberler & Blog</div>
        </div>
        <Link className="m2-addBtn" to="/blog" data-testid="home-blog-all">Tümü →</Link>
      </div>
      <div className="blog-strip" data-testid="home-blog-strip">
        {BLOG_POSTS.slice(0, 3).map((p) => (
          <Link key={p.id} to={`/blog/${p.id}`} className="blog-strip__item" data-testid={`home-blog-${p.id}`}>
            <img src={p.img} alt={p.title} />
            <div className="blog-strip__body">
              <span className="vip-tag vip-tag--green" style={{ alignSelf: 'flex-start' }}>{p.tag}</span>
              <h4>{p.title}</h4>
              <span className="blog-card__meta">{p.date}</span>
            </div>
          </Link>
        ))}
      </div>

      <StatsRow />

      <section className="banners">
        {AD_BANNERS.map((b, i) => (
          <div key={i} className="banner"><a href="#reklam"><img src={b} alt="banner" /></a></div>
        ))}
      </section>
    </>
  );
}
