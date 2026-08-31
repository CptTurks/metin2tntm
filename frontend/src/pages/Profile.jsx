import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Server, Heart, MessageSquare, Settings, Calendar, Mail, ThumbsUp, Star, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORY_LABELS, SYSTEM_FEATURE_LABELS } from '../mock/mock';
import { toast } from 'sonner';

export default function Profile() {
  const { user, servers, deleteServer, updateServerFeaturedSystem } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState('servers');
  const [editSrv, setEditSrv] = useState(null);
  const [sel, setSel] = useState([]);

  if (!user) {
    return (
      <div className="card"><div className="empty-state">
        Bu sayfayı görmek için giriş yapmalısınız.<br /><br />
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex' }}>Anasayfaya Dön</Link>
      </div></div>
    );
  }

  const myServers = servers.filter((s) => s.owner === user.username);
  const myComments = servers.flatMap((s) => s.comments.filter((c) => c.user === user.username).map((c) => ({ ...c, server: s.name, serverId: s.id })));

  const openEdit = (s) => { setEditSrv(s); setSel(Array.isArray(s.featuredSystem) ? s.featuredSystem : []); };
  const toggleSel = (k) => {
    if (sel.includes(k)) { setSel(sel.filter((x) => x !== k)); return; }
    if (sel.length >= 4) { toast.error('En fazla 4 rozet seçebilirsin.'); return; }
    setSel([...sel, k]);
  };
  const saveEdit = () => { updateServerFeaturedSystem(editSrv.id, sel); toast.success('Kart rozetleri güncellendi.'); setEditSrv(null); };
  const editEnabled = editSrv ? Object.keys(SYSTEM_FEATURE_LABELS).filter((k) => (editSrv.system || {})[k]) : [];

  return (
    <>
      <div className="crumb"><Link to="/">Anasayfa</Link> <ChevronRight size={14} /> <span>Kullanıcı Panelim</span></div>

      <div className="profile-head">
        <div className="profile-avatar">{user.username.charAt(0).toUpperCase()}</div>
        <div>
          <h1 className="profile-name">{user.username}</h1>
          <span className="profile-rank">{user.rank}</span>
          <div style={{ display: 'flex', gap: 18, marginTop: 12, flexWrap: 'wrap', color: 'var(--muted)', fontSize: 13 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={14} /> {user.email}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={14} /> Kayıt: {user.registerDate}</span>
          </div>
        </div>
        {user.isAdmin && (
          <button className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => navigate('/admin')}><Settings size={16} /> Admin Panel</button>
        )}
      </div>

      <div className="stats-grid" style={{ marginBottom: 18 }}>
        <div className="stat-item"><div className="stat-ico"><Server size={20} /></div><div><div className="stat-label">Serverlerim</div><div className="stat-value">{myServers.length}</div></div></div>
        <div className="stat-item"><div className="stat-ico"><MessageSquare size={20} /></div><div><div className="stat-label">Yorumlarım</div><div className="stat-value">{myComments.length}</div></div></div>
        <div className="stat-item"><div className="stat-ico"><ThumbsUp size={20} /></div><div><div className="stat-label">Toplam Beğeni</div><div className="stat-value">{myServers.reduce((a, s) => a + s.likes, 0)}</div></div></div>
        <div className="stat-item"><div className="stat-ico"><Heart size={20} /></div><div><div className="stat-label">Favoriler</div><div className="stat-value">0</div></div></div>
      </div>

      <div className="tabs-bar">
        <div className={`tab-btn ${tab === 'servers' ? 'active' : ''}`} onClick={() => setTab('servers')}>Serverlerim</div>
        <div className={`tab-btn ${tab === 'comments' ? 'active' : ''}`} onClick={() => setTab('comments')}>Yorumlarım</div>
        <div className={`tab-btn ${tab === 'settings' ? 'active' : ''}`} onClick={() => setTab('settings')}>Ayarlar</div>
      </div>

      {tab === 'servers' && (
        <div className="card" style={{ overflowX: 'auto' }}>
          {myServers.length === 0 ? (
            <div className="empty-state">Henüz server eklemediniz. <Link to="/sunucu-ekle" style={{ color: 'var(--brand2)' }}>Hemen ekle</Link></div>
          ) : (
            <table className="data-table">
              <thead><tr><th>Server</th><th>Kategori</th><th>Beğeni</th><th>Tıklama</th><th>İşlem</th></tr></thead>
              <tbody>
                {myServers.map((s) => (
                  <tr key={s.id}>
                    <td><Link to={`/server/${s.id}`} style={{ color: 'var(--brand2)', fontWeight: 700 }}>{s.name}</Link></td>
                    <td>{CATEGORY_LABELS[s.category]}</td>
                    <td>{s.likes}</td>
                    <td>{s.webClicks + s.discordClicks}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn" style={{ padding: '6px 12px' }} data-testid={`profile-edit-badges-${s.id}`} onClick={() => openEdit(s)}><Star size={14} /> Rozetler</button>
                        <button className="btn btn-danger" style={{ padding: '6px 12px' }} onClick={() => { deleteServer(s.id); toast.success('Server silindi.'); }}>Sil</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {tab === 'comments' && (
        <div className="card"><div className="card-body">
          {myComments.length === 0 ? <div className="empty-state">Henüz yorum yapmadınız.</div> :
            myComments.map((c) => (
              <div key={c.id} className="cmt-item">
                <div className="cmt-head">
                  <div className="cmt-avatar">{user.username.charAt(0).toUpperCase()}</div>
                  <div><div className="cmt-user"><Link to={`/server/${c.serverId}`} style={{ color: 'var(--brand2)' }}>{c.server}</Link></div><div className="cmt-date">{c.date}</div></div>
                </div>
                <div className="cmt-text">{c.text}</div>
              </div>
            ))}
        </div></div>
      )}

      {tab === 'settings' && (
        <div className="card"><div className="card-body">
          <div className="field"><label>Kullanıcı Adı</label><input className="inp" defaultValue={user.username} disabled /></div>
          <div className="field"><label>E-posta</label><input className="inp" defaultValue={user.email} /></div>
          <div className="field"><label>Yeni Şifre</label><input className="inp" type="password" placeholder="••••••" /></div>
          <button className="btn btn-primary" onClick={() => toast.success('Bilgiler kaydedildi (demo).')}>Kaydet</button>
        </div></div>
      )}

      {/* Kart rozet düzenleme modalı */}
      {editSrv && (
        <div className="modal-back" onClick={() => setEditSrv(null)}>
          <div className="modal-box" role="dialog" aria-modal="true" data-testid="profile-badge-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head"><h3>Kart Rozetleri — {editSrv.name}</h3><button className="icon-btn" onClick={() => setEditSrv(null)}><X size={18} /></button></div>
            <div className="modal-body">
              <p className="hint" style={{ marginTop: 0, marginBottom: 12 }}>Kartta öne çıkacak sistem rozetlerini seç (en fazla 4).</p>
              <div className="badge-picker" data-testid="profile-badge-picker">
                {editEnabled.map((k) => (
                  <button type="button" key={k} className={`badge-pick ${sel.includes(k) ? 'on' : ''}`} data-testid={`profile-pick-${k}`} onClick={() => toggleSel(k)}>
                    {sel.includes(k) ? '★' : '☆'} {SYSTEM_FEATURE_LABELS[k]}
                  </button>
                ))}
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: 16 }} data-testid="profile-badge-save" onClick={saveEdit}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
