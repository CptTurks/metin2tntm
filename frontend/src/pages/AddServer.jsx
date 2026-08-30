import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Rocket } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, FEATURE_LABELS } from '../mock/mock';
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

export default function AddServer() {
  const navigate = useNavigate();
  const { addServer } = useApp();
  const [form, setForm] = useState({
    name: '', title: '', category: 'farm-server', startLevel: 1, endLevel: 105,
    banner: CATEGORIES[1].img, webUrl: '', discordUrl: '', description: '',
    features: { lycan: true, simya: true, kusak: true, kemer: true, tilsim: true, pet: true, binek: true, kostum: true, beceri: true, efsunSabit: true },
  });

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const updFeat = (k) => (e) => setForm((f) => ({ ...f, features: { ...f.features, [k]: e.target.value === '0' } }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.title.trim()) { toast.error('Server adı ve başlık zorunludur.'); return; }
    const id = addServer({
      ...form,
      startLevel: Number(form.startLevel), endLevel: Number(form.endLevel),
    });
    toast.success('Serveriniz eklendi! Yönlendiriliyorsunuz...');
    setTimeout(() => navigate(`/server/${id}`), 700);
  };

  return (
    <>
      <div className="crumb"><Link to="/">Anasayfa</Link> <ChevronRight size={14} /> <span>Yeni Server Ekle</span></div>

      <div className="m2-top">
        <div className="m2-top__title">
          <span className="m2-top__badge"><Rocket size={18} /></span>
          <div className="m2-top__main">Yeni PVP Server Ekle</div>
        </div>
      </div>

      <form onSubmit={submit}>
        <div className="card" style={{ marginBottom: 18 }}>
          <div className="card-head">📝 Genel Bilgiler</div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="field"><label>Server Adı *</label><input className="inp" value={form.name} onChange={upd('name')} placeholder="Örn: DragonPvP" /></div>
              <div className="field"><label>Kategori *</label>
                <select className="sel" value={form.category} onChange={upd('category')}>
                  {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
                </select>
              </div>
            </div>
            <div className="field"><label>Konu Başlığı *</label><input className="inp" value={form.title} onChange={upd('title')} placeholder="Konu Başlığı Giriniz" /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="field"><label>Başlangıç Seviyesi</label><input className="inp" type="number" value={form.startLevel} onChange={upd('startLevel')} /></div>
              <div className="field"><label>Bitiş Seviyesi</label><input className="inp" type="number" value={form.endLevel} onChange={upd('endLevel')} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="field"><label>Anasayfa Linki</label><input className="inp" value={form.webUrl} onChange={upd('webUrl')} placeholder="https://serverin.com" /></div>
              <div className="field"><label>Discord Linki</label><input className="inp" value={form.discordUrl} onChange={upd('discordUrl')} placeholder="https://discord.gg/..." /></div>
            </div>
            <div className="field"><label>Kapak Görseli (URL)</label><input className="inp" value={form.banner} onChange={upd('banner')} placeholder="https://..." /><span className="hint">Geçerli bir görsel URL'si girin.</span></div>
            <div className="field" style={{ marginBottom: 0 }}><label>Açıklama</label><textarea className="ta" value={form.description} onChange={upd('description')} placeholder="Serveriniz hakkında detaylı bilgi..." /></div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 18 }}>
          <div className="card-head">⚙️ Genel Özellikler</div>
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

        <button className="btn btn-primary" type="submit" style={{ width: '100%', padding: 15, fontSize: 15 }}>
          <Rocket size={18} /> Serveri Yayınla
        </button>
      </form>
    </>
  );
}
