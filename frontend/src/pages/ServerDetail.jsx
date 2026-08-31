import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Home as HomeIcon, MessageCircle, ThumbsUp, Star, ListChecks, MessagesSquare, Cpu } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORY_LABELS, FEATURE_LABELS, SYSTEM_FEATURE_LABELS, DEFAULT_SYSTEM, isVar, isNA } from '../mock/mock';
import AuthModal from '../components/AuthModal';
import { toast } from 'sonner';

export default function ServerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { servers, user, voteServer, trackClick, addComment, votes } = useApp();
  const s = servers.find((x) => x.id === Number(id));
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [authOpen, setAuthOpen] = useState(false);

  if (!s || (s.hidden && !(user && user.isAdmin))) return <div className="card"><div className="empty-state">Server bulunamadı veya yayından kaldırılmış. <Link to="/">Anasayfaya dön</Link></div></div>;

  const visibleComments = s.comments.filter((c) => !c.hidden);
  const avg = visibleComments.length ? (visibleComments.reduce((a, c) => a + c.rating, 0) / visibleComments.length).toFixed(1) : '0.0';

  const submitComment = (e) => {
    e.preventDefault();
    if (!user) { setAuthOpen(true); return; }
    if (!text.trim()) { toast.error('Lütfen bir yorum yazın.'); return; }
    if (!rating) { toast.error('Lütfen puan verin.'); return; }
    const r = addComment(s.id, text.trim(), rating);
    if (r.ok) { toast.success(r.msg); setText(''); setRating(0); }
    else toast.error(r.msg);
  };

  const doVote = () => { const r = voteServer(s.id); r.ok ? toast.success(r.msg) : toast.error(r.msg); };
  const goExt = (url, type) => { trackClick(s.id, type); window.open(url, '_blank', 'noopener'); };

  const featureKeys = Object.keys(FEATURE_LABELS);
  const sys = s.system || DEFAULT_SYSTEM;
  const sysKeys = Object.keys(SYSTEM_FEATURE_LABELS);

  return (
    <>
      <div className="crumb">
        <Link to="/">Anasayfa</Link> <ChevronRight size={14} />
        <Link to={`/kategori/${s.category}`}>{CATEGORY_LABELS[s.category]}</Link> <ChevronRight size={14} />
        <span>{s.name}</span>
      </div>

      <div className="detail-hero">
        <img src={s.banner} alt={s.name} />
        <div className="detail-hero__overlay">
          <span className="detail-hero__cat">{CATEGORY_LABELS[s.category]}</span>
          <h1 className="detail-hero__title">{s.name}</h1>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 18 }}>
        <div className="card">
          <div className="card-head"><ListChecks size={18} /> Server Özellikleri</div>
          <div className="card-body">
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
              <span className="feature-chip yes">⚔️ Başlangıç: {s.startLevel}. Level</span>
              <span className="feature-chip yes">🛡️ Bitiş: {s.endLevel}. Level</span>
              {!isNA(s.features.efsunSabit) && <span className={`feature-chip ${isVar(s.features.efsunSabit) ? 'yes' : 'no'}`}>{isVar(s.features.efsunSabit) ? '✅' : '❌'} Efsun Oranları {isVar(s.features.efsunSabit) ? 'Sabit' : 'Değişken'}</span>}
            </div>
            <div className="feature-grid">
              {featureKeys.filter((k) => !isNA(s.features[k])).map((k) => (
                <div key={k} className={`feature-chip ${isVar(s.features[k]) ? 'yes' : 'no'}`}>
                  {isVar(s.features[k]) ? '✅' : '❌'} {FEATURE_LABELS[k]} {isVar(s.features[k]) ? 'Var' : 'Yok'}
                </div>
              ))}
            </div>
            <p style={{ marginTop: 18, color: '#cfe0ff', lineHeight: 1.7 }}>{s.description}</p>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><Cpu size={18} /> Sistem Özellikleri</div>
          <div className="card-body">
            <div className="feature-grid">
              {sysKeys.filter((k) => !isNA(sys[k])).map((k) => (
                <div key={k} className={`feature-chip ${isVar(sys[k]) ? 'yes' : 'no'}`}>
                  {isVar(sys[k]) ? '✅' : '❌'} {SYSTEM_FEATURE_LABELS[k]} {isVar(sys[k]) ? 'Var' : 'Yok'}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="srv-btn srv-btn-like" style={{ flex: 1, minWidth: 160, paddingRight: 52 }} onClick={() => goExt(s.webUrl, 'web')}>
              <HomeIcon size={16} /> Anasayfa <span className="srv-click-badge">{s.webClicks}</span>
            </button>
            <button className="srv-btn srv-btn-visit" style={{ flex: 1, minWidth: 160, paddingRight: 52 }} onClick={() => goExt(s.discordUrl, 'discord')}>
              <MessageCircle size={16} /> Discord <span className="srv-click-badge">{s.discordClicks}</span>
            </button>
            <button className="srv-btn srv-btn-vote" style={{ flex: 1, minWidth: 160, paddingRight: 52 }} onClick={doVote} disabled={votes[s.id]}>
              <ThumbsUp size={16} /> {votes[s.id] ? 'Oy Verildi' : 'Beğen (Oy Ver)'} <span className="srv-click-badge">{s.likes}</span>
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-head" style={{ justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><MessagesSquare size={18} /> 💬 Yorumlar ({visibleComments.length})</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
              <Star size={16} className="star on" fill="#ffb020" /> {avg} / 5
            </span>
          </div>
          <div className="card-body">
            <form onSubmit={submitComment} style={{ marginBottom: 20, padding: 16, border: '1px solid var(--stroke)', borderRadius: 14, background: 'rgba(19,39,71,.18)' }}>
              {!user && <p className="hint" style={{ marginBottom: 10 }}>Yorum yapmak ve puan vermek için üyelik gerekir. <button type="button" className="link-btn" onClick={() => setAuthOpen(true)} style={{ color: 'var(--brand2)', background: 'none', border: 0, cursor: 'pointer', fontWeight: 700 }}>Giriş Yap</button></p>}
              <div className="field" style={{ marginBottom: 12 }}>
                <label>Puanınız</label>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={26} className={`star ${(hover || rating) >= n ? 'on' : ''}`}
                      fill={(hover || rating) >= n ? '#ffb020' : 'none'}
                      onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => setRating(n)} />
                  ))}
                </div>
              </div>
              <div className="field" style={{ marginBottom: 12 }}>
                <label>Yorumunuz</label>
                <textarea className="ta" value={text} onChange={(e) => setText(e.target.value)} placeholder="Server hakkındaki düşüncelerini paylaş..." />
              </div>
              <button className="btn btn-primary" type="submit">Yorum Gönder</button>
            </form>

            {visibleComments.length === 0 ? (
              <div className="empty-state">Henüz yorum yapılmamış. İlk yorumu sen yap!</div>
            ) : visibleComments.map((c) => (
              <div key={c.id} className="cmt-item">
                <div className="cmt-head">
                  <div className="cmt-avatar">{c.user.charAt(0).toUpperCase()}</div>
                  <div>
                    <div className="cmt-user">{c.user}</div>
                    <div className="stars">{[1, 2, 3, 4, 5].map((n) => <Star key={n} size={13} className={`star ${c.rating >= n ? 'on' : ''}`} fill={c.rating >= n ? '#ffb020' : 'none'} />)}</div>
                  </div>
                  <span className="cmt-date">{c.date}</span>
                </div>
                <div className="cmt-text">{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
