import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, MessageCircle, ThumbsUp, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORY_LABELS, SYSTEM_FEATURE_LABELS } from '../mock/mock';
import { toast } from 'sonner';

export default function ServerRow({ s }) {
  const navigate = useNavigate();
  const { voteServer, trackClick, votes } = useApp();
  const [popOpen, setPopOpen] = useState(false);
  const f = s.features;
  const sys = s.system || {};
  const enabledSys = Object.keys(SYSTEM_FEATURE_LABELS).filter((k) => sys[k]);
  const featuredSys = Array.isArray(s.featuredSystem) && s.featuredSystem.length
    ? s.featuredSystem.filter((k) => sys[k])
    : enabledSys;
  const shownSys = featuredSys.slice(0, 4);
  const hiddenSys = enabledSys.filter((k) => !shownSys.includes(k));
  const extraSys = hiddenSys.length;

  const tier = s.vipTier && s.vipTier !== 'none' ? s.vipTier : null;
  const vipClass = tier ? `srv-vip srv-vip--${tier}` : '';
  const vipLabel = tier === 'green' ? 'YEŞİL VIP' : 'KIRMIZI VIP';

  const doVote = (e) => {
    e.preventDefault();
    const r = voteServer(s.id);
    r.ok ? toast.success(r.msg) : toast.error(r.msg);
  };
  const goExternal = (e, url, type) => {
    e.preventDefault();
    trackClick(s.id, type);
    window.open(url, '_blank', 'noopener');
  };

  return (
    <article className={`srv-row ${vipClass}`}>
      {tier && <span className={`srv-vip-badge srv-vip-badge--${tier}`}>👑 {vipLabel}</span>}
      <div className="srv-left">
        <div className="srv-meta">
          <div className="srv-meta-line"><span className="srv-meta-key">⚔️ Başlangıç Seviyesi</span><span className="srv-meta-val">{s.startLevel}. Level</span></div>
          <div className="srv-meta-line"><span className="srv-meta-key">🛡️ Bitiş Seviyesi</span><span className="srv-meta-val">{s.endLevel}. Level</span></div>
          <div className="srv-meta-line"><span className="srv-meta-val">{f.lycan ? '✅ Lycan Var' : '❌ Lycan Yok'}</span></div>
          <div className="srv-meta-line"><span className="srv-meta-val">{f.efsunSabit ? '✅ Efsun Oranları Sabit' : '❌ Efsun Oranları Değişken'}</span></div>
          <div className="srv-meta-line"><span className="srv-meta-val">{f.kostum ? '✅ Kostümler Var' : '❌ Kostümler Yok'}</span></div>
          <div className="srv-badges">
            <a className="srv-badge srv-badge-cat" href={`#${s.category}`} onClick={(e) => { e.preventDefault(); navigate(`/kategori/${s.category}`); }}>🗂️ {CATEGORY_LABELS[s.category]}</a>
          </div>
          {shownSys.length > 0 && (
            <div className={`srv-sys-badges ${popOpen ? 'open' : ''}`} data-testid={`server-sys-badges-${s.id}`}>
              {shownSys.map((k) => (
                <span key={k} className="srv-sys-badge">✦ {SYSTEM_FEATURE_LABELS[k]}</span>
              ))}
              {extraSys > 0 && (
                <span
                  className="srv-sys-badge srv-sys-badge--more srv-sys-more"
                  data-testid={`server-sys-more-${s.id}`}
                  title="Tüm sistem özelliklerini gör"
                  onClick={(e) => { e.stopPropagation(); setPopOpen((o) => !o); }}
                >
                  {popOpen ? '− gizle' : `+${extraSys}`}
                </span>
              )}
              {extraSys > 0 && (
                <span className="srv-sys-extra" data-testid={`server-sys-pop-${s.id}`}>
                  {hiddenSys.map((k) => (
                    <span key={k} className="srv-sys-badge">✦ {SYSTEM_FEATURE_LABELS[k]}</span>
                  ))}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="srv-mid">
        <div className="srv-name" style={{ cursor: 'pointer' }} onClick={() => navigate(`/server/${s.id}`)}>{s.name}</div>
        <a className="srv-banner" href={`/server/${s.id}`} onClick={(e) => { e.preventDefault(); navigate(`/server/${s.id}`); }}>
          <img src={s.banner} alt={s.name} />
        </a>
        <div className="srv-domain">{s.title}</div>
      </div>

      <div className="srv-right">
        <div className="srv-right-top">
          <span className="srv-stat srv-stat--online" data-testid={`server-online-${s.id}`}><span className="dot" /> {s.online} online</span>
          <span className="srv-stat srv-stat--like"><ThumbsUp size={12} /> {s.likes}</span>
        </div>
        <a className="srv-btn srv-btn-like" href={s.webUrl} onClick={(e) => goExternal(e, s.webUrl, 'web')}>
          <HomeIcon size={15} /> <span>Anasayfa</span>
          <span className="srv-click-badge">{s.webClicks}</span>
        </a>
        <a className="srv-btn srv-btn-visit" href={s.discordUrl} onClick={(e) => goExternal(e, s.discordUrl, 'discord')}>
          <MessageCircle size={15} /> <span>Discord</span>
          <span className="srv-click-badge">{s.discordClicks}</span>
        </a>
        <button className="srv-btn srv-btn-vote" onClick={doVote} disabled={votes[s.id]} style={votes[s.id] ? { opacity: .6, cursor: 'not-allowed' } : {}}>
          <ThumbsUp size={15} /> <span>{votes[s.id] ? 'Oy Verildi' : 'Beğen'}</span>
          <span className="srv-click-badge">{s.likes}</span>
        </button>
        <a className="srv-detail" href={`/server/${s.id}`} onClick={(e) => { e.preventDefault(); navigate(`/server/${s.id}`); }}>
          DETAY <ArrowRight size={15} />
        </a>
      </div>
    </article>
  );
}
