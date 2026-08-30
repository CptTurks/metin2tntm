import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Rocket, Server, Settings2, Cpu, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, FEATURE_LABELS, SYSTEM_FEATURE_LABELS, DEFAULT_SYSTEM } from '../mock/mock';
import { toast } from 'sonner';

const YESNO = [
  { key: 'lycan', yes: '✅ Lycan Var', no: '❌ Lycan Yok' },
  { key: 'simya', yes: '✅ Simya Var', no: '❌ Simya Yok' },
  { key: 'kusak', yes: '✅ Kuşak Var', no: '❌ Kuşak Yok' },
  { key: 'kemer', yes: '✅ Kemer Var', no: '❌ Kemer Yok' },
  { key: 'tilsim', yes: '✅ Tılsım Var', no: '❌ Tılsım Yok' },
  { key: 'pet', yes: '✅ Levelli Pet Var', no: '❌ Levelli Pet Yok' },
  { key: 'binek', yes: '✅ Binek Sistemi Var', no: '❌ Binek Sistemi Yok' },
  { key: 'kostum', yes: '✅ Kostümler Var', no: '❌ Kostümler Yok' },
  { key: 'beceri', yes: '✅ Yeni Beceriler Var', no: '❌ Yeni Beceriler Yok' },
];

const TABS = [
  { id: 'bilgi', label: 'Server Bilgileri', icon: <Server size={16} /> },
  { id: 'genel', label: 'Genel Özellikler', icon: <Settings2 size={16} /> },
  { id: 'sistem', label: 'Sistem Özellikleri', icon: <Cpu size={16} /> },
];

export default function AddServer() {
  const navigate = useNavigate();
  const { addServer } = useApp();
  const [tab, setTab] = useState('bilgi');
  const [form, setForm] = useState({
    name: '', title: '', category: 'farm-server', startLevel: 1, endLevel: 105,
    banner: CATEGORIES[1].img, webUrl: '', discordUrl: '', description: '',
    features: { lycan: true, simya: true, kusak: true, kemer: true, tilsim: true, pet: true, binek: true, kostum: true, beceri: true, efsunSabit: true },
    system: { ...DEFAULT_SYSTEM },
  });

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const updFeat = (k) => (e) => setForm((f) => ({ ...f, features: { ...f.features, [k]: e.target.value === '0' } }));
  const updSys = (k) => (e) => setForm((f) => ({ ...f, system: { ...f.system, [k]: e.target.value === '0' } }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.title.trim()) { toast.error('Server adı ve başlık zorunludur.'); setTab('bilgi'); return; }
    const id = addServer({ ...form, startLevel: Number(form.startLevel), endLevel: Number(form.endLevel) });
    toast.success('Serveriniz eklendi! Yönlendiriliyorsunuz...');
    setTimeout(() => navigate(`/server/${id}`), 700);
  };

  const tabIndex = TABS.findIndex((t) => t.id === tab);
  const nextTab = () => setTab(TABS[Math.min(tabIndex + 1, TABS.length - 1)].id);
  const prevTab = () => setTab(TABS[Math.max(tabIndex - 1, 0)].id);

  return (
    <>
      <div className="crumb"><Link to="/">Anasayfa</Link> <ChevronRight size={14} /> <span>Yeni Server Ekle</span></div>

      <div className="m2-top">
        <div className="m2-top__title">
          <span className="m2-top__badge"><Rocket size={18} /></span>
          <div className="m2-top__main">Yeni PVP Server Ekle</div>
        </div>
      </div>

      {/* Sekmeler */}
      <div className="tabs-bar">
        {TABS.map((t, i) => (
          <div key={t.id} className={`tab-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}
               style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ opacity: .8 }}>{i + 1}.</span> {t.icon} {t.label}
          </div>
        ))}
      </div>

      <form onSubmit={submit}>
        {/* 1) Server Bilgileri */}
        {tab === 'bilgi' && (
          <div className="card" style={{ marginBottom: 18 }}>
            <div className="card-head"><Server size={18} /> Server Bilgileri</div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="field"><label>Server Adınız *</label><input className="inp" value={form.name} onChange={upd('name')} placeholder="Örn: DragonPvP" /></div>
                <div className="field"><label>Kategori *</label>
                  <select className="sel" value={form.category} onChange={upd('category')}>
                    {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="field"><label>Konu Başlığı *</label><input className="inp" value={form.title} onChange={upd('title')} placeholder="Konu Başlığı Giriniz" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="field"><label>Başlangıç Leveli</label>
                  <select className="sel" value={form.startLevel} onChange={upd('startLevel')}>
                    {[1, 5, 10, 40, 55, 90].map((l) => <option key={l} value={l}>{l}. Level</option>)}
                  </select>
                </div>
                <div className="field"><label>Bitiş Leveli</label>
                  <select className="sel" value={form.endLevel} onChange={upd('endLevel')}>
                    {[75, 90, 99, 105, 110, 120, 250].map((l) => <option key={l} value={l}>{l}. Level</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="field"><label>Server WebSitesi (URL)</label><input className="inp" value={form.webUrl} onChange={upd('webUrl')} placeholder="https://serverin.com" /></div>
                <div className="field"><label>Discord Adresi (URL)</label><input className="inp" value={form.discordUrl} onChange={upd('discordUrl')} placeholder="https://discord.gg/..." /></div>
              </div>
              <div className="field"><label>Varsa Hareketli Banner Kapak Fotoğrafı (URL)</label><input className="inp" value={form.banner} onChange={upd('banner')} placeholder="https://... (gif/jpg/png)" /><span className="hint">Geçerli bir görsel URL'si girin.</span></div>
              <div className="field" style={{ marginBottom: 0 }}><label>Açıklama</label><textarea className="ta" value={form.description} onChange={upd('description')} placeholder="Serveriniz hakkında detaylı bilgi..." /></div>
            </div>
          </div>
        )}

        {/* 2) Genel Özellikler */}
        {tab === 'genel' && (
          <div className="card" style={{ marginBottom: 18 }}>
            <div className="card-head"><Settings2 size={18} /> Genel Özellikler</div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
                {YESNO.map((f) => (
                  <div key={f.key} className="field" style={{ marginBottom: 0 }}>
                    <label>{FEATURE_LABELS[f.key]}</label>
                    <select className="sel" value={form.features[f.key] ? '0' : '1'} onChange={updFeat(f.key)}>
                      <option value="0">{f.yes}</option>
                      <option value="1">{f.no}</option>
                    </select>
                  </div>
                ))}
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>Efsun Oranları</label>
                  <select className="sel" value={form.features.efsunSabit ? '0' : '1'} onChange={(e) => setForm((fm) => ({ ...fm, features: { ...fm.features, efsunSabit: e.target.value === '0' } }))}>
                    <option value="0">✅ Efsun Oranları Sabit</option>
                    <option value="1">❌ Efsun Oranları Değişken</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3) Sistem Özellikleri */}
        {tab === 'sistem' && (
          <div className="card" style={{ marginBottom: 18 }}>
            <div className="card-head"><Cpu size={18} /> Sistem Özellikleri</div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 14 }}>
                {Object.keys(SYSTEM_FEATURE_LABELS).map((k) => (
                  <div key={k} className="field" style={{ marginBottom: 0 }}>
                    <label>{SYSTEM_FEATURE_LABELS[k]} Var Mı ?</label>
                    <select className="sel" value={form.system[k] ? '0' : '1'} onChange={updSys(k)}>
                      <option value="0">✅ {SYSTEM_FEATURE_LABELS[k]} Var</option>
                      <option value="1">❌ {SYSTEM_FEATURE_LABELS[k]} Yok</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Adım navigasyonu */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {tabIndex > 0 && (
            <button type="button" className="btn" onClick={prevTab}><ArrowLeft size={16} /> Geri</button>
          )}
          {tabIndex < TABS.length - 1 ? (
            <button type="button" className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={nextTab}>
              Devam <ArrowRight size={16} />
            </button>
          ) : (
            <button className="btn btn-primary" type="submit" style={{ marginLeft: 'auto', padding: '13px 22px' }}>
              <Check size={18} /> Serveri Yayınla
            </button>
          )}
        </div>
      </form>
    </>
  );
}
