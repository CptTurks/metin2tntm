import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WelcomeHero, ServerModes, StatsRow } from '../components/HomeSections';
import ServerRow from '../components/ServerRow';
import { AD_BANNERS } from '../mock/mock';

export default function Home() {
  const { servers } = useApp();
  const navigate = useNavigate();
  const sorted = [...servers].sort((a, b) => b.id - a.id);

  return (
    <>
      <WelcomeHero />
      <ServerModes />

      <div className="m2-top">
        <div className="m2-top__title">
          <span className="m2-top__badge"><Sparkles size={18} /></span>
          <div className="m2-top__main">Son Eklenen PVP Serverler</div>
        </div>
        <button className="m2-addBtn" onClick={() => navigate('/sunucu-ekle')}>🚀 Server Ekle</button>
      </div>

      {sorted.map((s) => <ServerRow key={s.id} s={s} />)}

      <StatsRow />

      <section className="banners">
        {AD_BANNERS.map((b, i) => (
          <div key={i} className="banner"><a href="#reklam"><img src={b} alt="banner" /></a></div>
        ))}
      </section>
    </>
  );
}
