import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Shield, Server, Users, MessageSquare, Trash2, Eye, EyeOff, Image as ImageIcon, Tags, Plus, X, Pencil, Megaphone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORY_LABELS, VIP_TIERS, BANNER_POSITIONS } from '../mock/mock';
import { toast } from 'sonner';

function Switch({ checked, onChange, testid }) {
  return (
    <label className="switch">
      <input type="checkbox" checked={!!checked} onChange={onChange} data-testid={testid} />
      <span className="switch__slider" />
    </label>
  );
}

const daysLeft = (d) => { if (!d) return null; const ms = new Date(d + 'T23:59:59') - new Date(); return Math.ceil(ms / 86400000); };

export default function Admin() {
  const {
    user, servers, users, banners, announcement, taxonomy,
    deleteServer, toggleServerHidden, setServerVip, toggleServerFeatured,
    deleteComment, toggleCommentHidden, addBanner, deleteBanner, toggleBanner,
    setAnnouncement, addTaxGroup, deleteTaxGroup, addTaxTag, deleteTaxTag,
    updateUserRole, resetUserPassword,
    infoRules, addInfoRule, updateInfoRule, deleteInfoRule,
  } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState('servers');
  const [editUser, setEditUser] = useState(null);
  const [pwd, setPwd] = useState('');
  const [bf, setBf] = useState({ position: 'ust', img: '', url: '', start: '', end: '' });
  const [newGroup, setNewGroup] = useState('');
  const [tagInputs, setTagInputs] = useState({});
  const [vipSoonOnly, setVipSoonOnly] = useState(false);

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
  const serverList = vipSoonOnly ? servers.filter((s) => s.vipTier !== 'none' && s.vipUntil && daysLeft(s.vipUntil) <= 7) : servers;

  const submitBanner = () => {
    if (!bf.img.trim()) { toast.error('Görsel URL zorunludur.'); return; }
    addBanner({ ...bf });
    setBf({ position: 'ust', img: '', url: '', start: '', end: '' });
    toast.success('Banner eklendi.');
  };

  const openUser = (u) => { setEditUser(u); setPwd(''); };
  const saveUser = () => {
    if (pwd.trim()) { resetUserPassword(editUser.username, pwd.trim()); toast.success('Şifre sıfırlandı.'); }
    setEditUser(null);
  };

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
        <div className={`tab-btn ${tab === 'servers' ? 'active' : ''}`} data-testid="admin-tab-servers" onClick={() => setTab('servers')}>Server Yönetimi</div>
        <div className={`tab-btn ${tab === 'users' ? 'active' : ''}`} data-testid="admin-tab-users" onClick={() => setTab('users')}>Üye Yönetimi</div>
        <div className={`tab-btn ${tab === 'comments' ? 'active' : ''}`} data-testid="admin-tab-comments" onClick={() => setTab('comments')}>Yorum Yönetimi</div>
        <div className={`tab-btn ${tab === 'banners' ? 'active' : ''}`} data-testid="admin-tab-banners" onClick={() => setTab('banners')}>Reklam Yönetimi</div>
        <div className={`tab-btn ${tab === 'features' ? 'active' : ''}`} data-testid="admin-tab-features" onClick={() => setTab('features')}>Özellik Yönetimi</div>
      </div>

      {/* ---- SERVER YÖNETİMİ ---- */}
      {tab === 'servers' && (
        <>
          <div className="sort-bar" style={{ marginBottom: 14 }}>
            <button className={`sort-btn ${vipSoonOnly ? 'active' : ''}`} data-testid="admin-vip-filter" onClick={() => setVipSoonOnly((o) => !o)}>⚠ Süresi Dolmak Üzere (VIP)</button>
            {vipSoonOnly && <span style={{ fontSize: 12, color: 'var(--muted)' }}>{serverList.length} sunucu listeleniyor</span>}
          </div>
          <div className="card" style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>ID</th><th>Server</th><th>Kategori</th><th>Durum</th><th>VIP Kademe</th><th>Öneri</th><th>İşlem</th></tr></thead>
            <tbody>
              {serverList.map((s) => (
                <tr key={s.id} data-testid={`admin-server-row-${s.id}`}>
                  <td>#{s.id}</td>
                  <td><Link to={`/server/${s.id}`} style={{ color: 'var(--brand2)', fontWeight: 700 }}>{s.name}</Link></td>
                  <td>{CATEGORY_LABELS[s.category]}</td>
                  <td>
                    <div className="admin-actions">
                      <Switch checked={!s.hidden} onChange={() => toggleServerHidden(s.id)} testid={`admin-active-toggle-${s.id}`} />
                      <span style={{ fontSize: 12, color: s.hidden ? '#ff8b93' : '#8ff0d6', fontWeight: 700 }}>{s.hidden ? 'Gizli' : 'Aktif'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <select className="mini-sel" value={s.vipTier} data-testid={`admin-vip-select-${s.id}`} onChange={(e) => setServerVip(s.id, e.target.value, s.vipUntil)}>
                        {Object.keys(VIP_TIERS).map((t) => <option key={t} value={t}>{VIP_TIERS[t]}</option>)}
                      </select>
                      {s.vipTier !== 'none' && (
                        <input type="date" className="mini-inp" value={s.vipUntil || ''} data-testid={`admin-vip-until-${s.id}`} onChange={(e) => setServerVip(s.id, s.vipTier, e.target.value)} />
                      )}
                      {s.vipTier !== 'none' && s.vipUntil && (() => {
                        const dl = daysLeft(s.vipUntil);
                        if (dl === null) return null;
                        if (dl < 0) return <span className="vip-tag vip-tag--red" data-testid={`admin-vip-warn-${s.id}`}>⛔ Süre doldu</span>;
                        if (dl <= 7) return <span className="vip-tag vip-tag--red" data-testid={`admin-vip-warn-${s.id}`}>⚠ {dl}g kaldı</span>;
                        if (dl <= 30) return <span className="vip-tag vip-tag--green" data-testid={`admin-vip-warn-${s.id}`}>{dl}g kaldı</span>;
                        return null;
                      })()}
                    </div>
                  </td>
                  <td><Switch checked={s.featured} onChange={() => toggleServerFeatured(s.id)} testid={`admin-featured-toggle-${s.id}`} /></td>
                  <td><button className="btn btn-danger" style={{ padding: '6px 12px' }} data-testid={`admin-delete-server-${s.id}`} onClick={() => { deleteServer(s.id); toast.success(`${s.name} silindi.`); }}><Trash2 size={14} /> Sil</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </>
      )}

      {/* ---- ÜYE YÖNETİMİ ---- */}
      {tab === 'users' && (
        <div className="card" style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>Kullanıcı</th><th>E-posta</th><th>Rütbe</th><th>Kayıt</th><th>İşlem</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.username} data-testid={`admin-user-row-${u.username}`}>
                  <td style={{ fontWeight: 700 }}>{u.username}</td>
                  <td>{u.email}</td>
                  <td><span className={`vip-tag ${u.isAdmin ? 'vip-tag--red' : 'vip-tag--none'}`}>{u.rank}</span></td>
                  <td>{u.registerDate}</td>
                  <td><button className="btn" style={{ padding: '6px 12px' }} data-testid={`admin-edit-user-${u.username}`} onClick={() => openUser(u)}><Pencil size={14} /> Düzenle</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ---- YORUM YÖNETİMİ ---- */}
      {tab === 'comments' && (
        <div className="card"><div className="card-body">
          {totalComments === 0 ? <div className="empty-state">Henüz yorum yok.</div> :
            servers.flatMap((s) => s.comments.map((c) => ({ ...c, server: s.name, serverId: s.id }))).map((c) => (
              <div key={`${c.serverId}-${c.id}`} className="cmt-item" style={c.hidden ? { opacity: .5 } : {}} data-testid={`admin-comment-${c.serverId}-${c.id}`}>
                <div className="cmt-head">
                  <div className="cmt-avatar">{c.user.charAt(0).toUpperCase()}</div>
                  <div><div className="cmt-user">{c.user} <span style={{ color: 'var(--muted)', fontWeight: 400 }}>→ {c.server}</span>{c.hidden && <span style={{ color: '#ff8b93', marginLeft: 8, fontSize: 12 }}>(Gizli)</span>}</div><div className="cmt-date">{c.date}</div></div>
                  <div className="admin-actions" style={{ marginLeft: 'auto' }}>
                    <button className="btn" style={{ padding: '6px 12px' }} data-testid={`admin-comment-toggle-${c.serverId}-${c.id}`} onClick={() => toggleCommentHidden(c.serverId, c.id)}>
                      {c.hidden ? <><Eye size={14} /> Göster</> : <><EyeOff size={14} /> Gizle</>}
                    </button>
                    <button className="btn btn-danger" style={{ padding: '6px 12px' }} data-testid={`admin-comment-delete-${c.serverId}-${c.id}`} onClick={() => { deleteComment(c.serverId, c.id); toast.success('Yorum silindi.'); }}><Trash2 size={14} /></button>
                  </div>
                </div>
                <div className="cmt-text">{c.text}</div>
              </div>
            ))}
        </div></div>
      )}

      {/* ---- REKLAM (BANNER) YÖNETİMİ ---- */}
      {tab === 'banners' && (
        <>
          <div className="card" style={{ marginBottom: 18 }}>
            <div className="card-head"><Megaphone size={18} /> Site Duyurusu</div>
            <div className="card-body">
              <div className="field"><label>Duyuru Metni</label><input className="inp" value={announcement.text} data-testid="admin-announce-text" onChange={(e) => setAnnouncement({ text: e.target.value })} placeholder="Üst barda görünecek duyuru..." /></div>
              <div className="admin-actions"><Switch checked={announcement.active} onChange={() => setAnnouncement({ active: !announcement.active })} testid="admin-announce-toggle" /><span style={{ fontSize: 13, fontWeight: 700 }}>{announcement.active ? 'Yayında' : 'Kapalı'}</span></div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 18 }}>
            <div className="card-head"><Megaphone size={18} /> Sunucu Ekle Bilgilendirme Kuralları</div>
            <div className="card-body">
              {infoRules.map((r) => (
                <div className="admin-actions" key={r.id} style={{ marginBottom: 10 }}>
                  <select className="mini-sel" value={r.icon} data-testid={`admin-inforule-icon-${r.id}`} onChange={(e) => updateInfoRule(r.id, { icon: e.target.value })}>
                    <option value="check">✅ Onay</option>
                    <option value="warn">⚠ Uyarı</option>
                    <option value="clock">⏱ Süre</option>
                    <option value="pin">📌 Not</option>
                  </select>
                  <input className="inp" style={{ flex: 1, minWidth: 220 }} value={r.text} data-testid={`admin-inforule-text-${r.id}`} onChange={(e) => updateInfoRule(r.id, { text: e.target.value })} />
                  <button className="btn btn-danger" style={{ padding: '6px 10px' }} data-testid={`admin-inforule-delete-${r.id}`} onClick={() => deleteInfoRule(r.id)}><Trash2 size={14} /></button>
                </div>
              ))}
              <button className="btn btn-primary" style={{ marginTop: 6 }} data-testid="admin-inforule-add" onClick={addInfoRule}><Plus size={16} /> Kural Ekle</button>
              <span className="hint">**metin** ile kalın yazabilirsiniz. Değişiklikler /sunucu-ekle popup'ında anında görünür.</span>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 18 }}>
            <div className="card-head"><Plus size={18} /> Yeni Banner Ekle</div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14 }}>
                <div className="field" style={{ marginBottom: 0 }}><label>Konum</label>
                  <select className="sel" value={bf.position} data-testid="admin-banner-position" onChange={(e) => setBf({ ...bf, position: e.target.value })}>
                    {Object.keys(BANNER_POSITIONS).map((p) => <option key={p} value={p}>{BANNER_POSITIONS[p]}</option>)}
                  </select>
                </div>
                <div className="field" style={{ marginBottom: 0 }}><label>Görsel URL</label><input className="inp" value={bf.img} data-testid="admin-banner-img" onChange={(e) => setBf({ ...bf, img: e.target.value })} placeholder="https://..." /></div>
                <div className="field" style={{ marginBottom: 0 }}><label>Hedef Link</label><input className="inp" value={bf.url} data-testid="admin-banner-url" onChange={(e) => setBf({ ...bf, url: e.target.value })} placeholder="https://..." /></div>
                <div className="field" style={{ marginBottom: 0 }}><label>Başlangıç</label><input type="date" className="inp" value={bf.start} onChange={(e) => setBf({ ...bf, start: e.target.value })} /></div>
                <div className="field" style={{ marginBottom: 0 }}><label>Bitiş</label><input type="date" className="inp" value={bf.end} onChange={(e) => setBf({ ...bf, end: e.target.value })} /></div>
              </div>
              <button className="btn btn-primary" style={{ marginTop: 14 }} data-testid="admin-banner-add-btn" onClick={submitBanner}><Plus size={16} /> Banner Ekle</button>
            </div>
          </div>

          <div className="card"><div className="card-body">
            <div className="admin-banner-grid">
              {banners.map((b) => (
                <div key={b.id} className={`admin-banner-card ${b.active ? '' : 'is-off'}`} data-testid={`admin-banner-${b.id}`}>
                  <img src={b.img} alt={BANNER_POSITIONS[b.position]} />
                  <div className="admin-banner-body">
                    <span className="admin-banner-pos"><ImageIcon size={12} style={{ verticalAlign: '-2px' }} /> {BANNER_POSITIONS[b.position] || b.position}</span>
                    <div className="admin-banner-meta"><span>👁 {b.impressions} gösterim</span><span>🖱 {b.clicks} tıklama</span></div>
                    {(b.start || b.end) && <div className="admin-banner-meta"><span>📅 {b.start || '—'} → {b.end || '—'}</span></div>}
                    <div className="admin-banner-foot">
                      <Switch checked={b.active} onChange={() => toggleBanner(b.id)} testid={`admin-banner-toggle-${b.id}`} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: b.active ? '#8ff0d6' : '#ff8b93' }}>{b.active ? 'Aktif' : 'Pasif'}</span>
                      <button className="btn btn-danger" style={{ marginLeft: 'auto', padding: '6px 10px' }} data-testid={`admin-banner-delete-${b.id}`} onClick={() => { deleteBanner(b.id); toast.success('Banner silindi.'); }}><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div></div>
        </>
      )}

      {/* ---- ÖZELLİK YÖNETİMİ ---- */}
      {tab === 'features' && (
        <div className="card">
          <div className="card-head"><Tags size={18} /> Özellik Kategorileri & Etiketleri</div>
          <div className="card-body">
            <div className="tax-add" style={{ marginBottom: 18 }}>
              <input className="inp" style={{ maxWidth: 260 }} value={newGroup} data-testid="admin-newgroup-input" onChange={(e) => setNewGroup(e.target.value)} placeholder="Yeni kategori adı (örn. Eşya Sistemleri)" />
              <button className="btn btn-primary" data-testid="admin-add-group-btn" onClick={() => { if (!newGroup.trim()) return; addTaxGroup(newGroup.trim()); setNewGroup(''); toast.success('Kategori eklendi.'); }}><Plus size={16} /> Kategori Ekle</button>
            </div>

            {taxonomy.length === 0 ? <div className="empty-state">Henüz kategori yok.</div> : taxonomy.map((g) => (
              <div className="tax-group" key={g.id} data-testid={`admin-taxgroup-${g.id}`}>
                <div className="tax-group__head">
                  <span className="tax-group__name">{g.name}</span>
                  <button className="btn btn-danger" style={{ marginLeft: 'auto', padding: '6px 10px' }} data-testid={`admin-delete-group-${g.id}`} onClick={() => { deleteTaxGroup(g.id); toast.success('Kategori silindi.'); }}><Trash2 size={14} /></button>
                </div>
                <div className="tax-tags">
                  {g.tags.length === 0 ? <span style={{ color: 'var(--muted)', fontSize: 13 }}>Etiket yok.</span> : g.tags.map((t) => (
                    <span className="tax-tag" key={t.id}>{t.name}<button data-testid={`admin-delete-tag-${t.id}`} onClick={() => deleteTaxTag(g.id, t.id)}><X size={13} /></button></span>
                  ))}
                </div>
                <div className="tax-add">
                  <input className="mini-inp" style={{ maxWidth: 200 }} value={tagInputs[g.id] || ''} data-testid={`admin-tag-input-${g.id}`} onChange={(e) => setTagInputs({ ...tagInputs, [g.id]: e.target.value })} placeholder="Yeni etiket" />
                  <button className="btn" style={{ padding: '6px 12px' }} data-testid={`admin-add-tag-${g.id}`} onClick={() => { const v = (tagInputs[g.id] || '').trim(); if (!v) return; addTaxTag(g.id, v); setTagInputs({ ...tagInputs, [g.id]: '' }); }}><Plus size={14} /> Ekle</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---- ÜYE DÜZENLEME MODALI ---- */}
      {editUser && (
        <div className="modal-back" onClick={() => setEditUser(null)}>
          <div className="modal-box" role="dialog" aria-modal="true" data-testid="admin-user-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head"><h3>Üye Düzenle — {editUser.username}</h3><button className="icon-btn" onClick={() => setEditUser(null)}><X size={18} /></button></div>
            <div className="modal-body">
              <div className="field">
                <label>Rol</label>
                <div className="admin-actions">
                  <Switch checked={editUser.isAdmin} onChange={() => { updateUserRole(editUser.username, !editUser.isAdmin); setEditUser({ ...editUser, isAdmin: !editUser.isAdmin, rank: !editUser.isAdmin ? 'Yönetici' : 'Üye' }); }} testid="admin-user-role-toggle" />
                  <span style={{ fontWeight: 700 }}>{editUser.isAdmin ? 'Yönetici (Admin)' : 'Üye'}</span>
                </div>
                <span className="hint">Rol değişikliği anında uygulanır.</span>
              </div>
              <div className="field">
                <label>Şifre Sıfırla</label>
                <input className="inp" type="text" value={pwd} data-testid="admin-user-pwd" onChange={(e) => setPwd(e.target.value)} placeholder="Yeni şifre girin" />
                <span className="hint">Boş bırakırsanız şifre değişmez.</span>
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }} data-testid="admin-user-save" onClick={saveUser}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
