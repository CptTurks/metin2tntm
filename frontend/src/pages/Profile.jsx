import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Server, Heart, MessageSquare, Settings, Calendar, Mail, ThumbsUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORY_LABELS } from '../mock/mock';
import { toast } from 'sonner';

export default function Profile() {
  const { user, servers, deleteServer } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState('servers');

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
        <div className="card">
          {myServers.length === 0 ? (
            <div className="empty-state">Henüz server eklemediniz. <Link to="/sunucu-ekle" style={{ color: 'var(--brand2)' }}>Hemen ekle</Link></div>
          ) : (
            <table className="data-table">
              <thead><tr><th>Server</th><th>Kategori</th><th>Beğeni</th><th>Tıklama</th><th></th></tr></thead>
              <tbody>
                {myServers.map((s) => (
                  <tr key={s.id}>
                    <td><Link to={`/server/${s.id}`} style={{ color: 'var(--brand2)', fontWeight: 700 }}>{s.name}</Link></td>
                    <td>{CATEGORY_LABELS[s.category]}</td>
                    <td>{s.likes}</td>
                    <td>{s.webClicks + s.discordClicks}</td>
                    <td><button className="btn btn-danger" style={{ padding: '6px 12px' }} onClick={() => { deleteServer(s.id); toast.success('Server silindi.'); }}>Sil</button></td>
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
    </>
  );
}
