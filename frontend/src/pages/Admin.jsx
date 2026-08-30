import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Shield, Server, Users, MessageSquare, Trash2, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORY_LABELS } from '../mock/mock';
import { toast } from 'sonner';

export default function Admin() {
  const { user, servers, users, deleteServer } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState('servers');

  if (!user || !user.isAdmin) {
    return (
      <div className="card"><div className="empty-state">
        🔒 Bu alana erişim yetkiniz yok.<br /><br />
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex' }}>Anasayfaya Dön</Link>
      </div></div>
    );
  }

  const totalComments = servers.reduce((a, s) => a + s.comments.length, 0);
  const totalLikes = servers.reduce((a, s) => a + s.likes, 0);

  return (
    <>
      <div className="crumb"><Link to="/">Anasayfa</Link> <ChevronRight size={14} /> <span>Admin Panel</span></div>

      <div className="profile-head" style={{ background: 'linear-gradient(135deg,rgba(224,8,16,.12),rgba(240,164,75,.08))' }}>
        <div className="profile-avatar" style={{ background: 'linear-gradient(135deg,#E00810,#f0a44b)' }}><Shield size={38} /></div>
        <div>
          <h1 className="profile-name">Yönetim Paneli</h1>
          <span className="profile-rank">Site Yöneticisi — {user.username}</span>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: 18 }}>
        <div className="stat-item"><div className="stat-ico"><Server size={20} /></div><div><div className="stat-label">Toplam Server</div><div className="stat-value">{servers.length}</div></div></div>
        <div className="stat-item"><div className="stat-ico"><Users size={20} /></div><div><div className="stat-label">Üyeler</div><div className="stat-value">{users.length}</div></div></div>
        <div className="stat-item"><div className="stat-ico"><MessageSquare size={20} /></div><div><div className="stat-label">Yorumlar</div><div className="stat-value">{totalComments}</div></div></div>
        <div className="stat-item"><div className="stat-ico"><Eye size={20} /></div><div><div className="stat-label">Toplam Oy</div><div className="stat-value">{totalLikes}</div></div></div>
      </div>

      <div className="tabs-bar">
        <div className={`tab-btn ${tab === 'servers' ? 'active' : ''}`} onClick={() => setTab('servers')}>Server Yönetimi</div>
        <div className={`tab-btn ${tab === 'users' ? 'active' : ''}`} onClick={() => setTab('users')}>Üye Yönetimi</div>
        <div className={`tab-btn ${tab === 'comments' ? 'active' : ''}`} onClick={() => setTab('comments')}>Yorum Yönetimi</div>
      </div>

      {tab === 'servers' && (
        <div className="card">
          <table className="data-table">
            <thead><tr><th>ID</th><th>Server</th><th>Kategori</th><th>Sahip</th><th>Beğeni</th><th>İşlem</th></tr></thead>
            <tbody>
              {servers.map((s) => (
                <tr key={s.id}>
                  <td>#{s.id}</td>
                  <td><Link to={`/server/${s.id}`} style={{ color: 'var(--brand2)', fontWeight: 700 }}>{s.name}</Link></td>
                  <td>{CATEGORY_LABELS[s.category]}</td>
                  <td>{s.owner}</td>
                  <td>{s.likes}</td>
                  <td><button className="btn btn-danger" style={{ padding: '6px 12px' }} onClick={() => { deleteServer(s.id); toast.success(`${s.name} silindi.`); }}><Trash2 size={14} /> Sil</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'users' && (
        <div className="card">
          <table className="data-table">
            <thead><tr><th>Kullanıcı</th><th>E-posta</th><th>Rütbe</th><th>Kayıt Tarihi</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.username}>
                  <td style={{ fontWeight: 700 }}>{u.username}</td>
                  <td>{u.email}</td>
                  <td><span className="profile-rank" style={{ margin: 0 }}>{u.rank}</span></td>
                  <td>{u.registerDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'comments' && (
        <div className="card"><div className="card-body">
          {totalComments === 0 ? <div className="empty-state">Henüz yorum yok.</div> :
            servers.flatMap((s) => s.comments.map((c) => ({ ...c, server: s.name, serverId: s.id }))).map((c) => (
              <div key={`${c.serverId}-${c.id}`} className="cmt-item">
                <div className="cmt-head">
                  <div className="cmt-avatar">{c.user.charAt(0).toUpperCase()}</div>
                  <div><div className="cmt-user">{c.user} <span style={{ color: 'var(--muted)', fontWeight: 400 }}>→ {c.server}</span></div><div className="cmt-date">{c.date}</div></div>
                  <button className="btn btn-danger" style={{ marginLeft: 'auto', padding: '6px 12px' }} onClick={() => toast.success('Yorum silindi (demo).')}><Trash2 size={14} /></button>
                </div>
                <div className="cmt-text">{c.text}</div>
              </div>
            ))}
        </div></div>
      )}
    </>
  );
}
