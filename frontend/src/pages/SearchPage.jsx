import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Search as SearchIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORY_LABELS } from '../mock/mock';
import ServerRow from '../components/ServerRow';
import SortBar, { sortServers } from '../components/SortBar';

export default function SearchPage() {
  const { servers } = useApp();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [sort, setSort] = useState('likes');
  const q = (new URLSearchParams(search).get('q') || '').trim().toLowerCase();

  const results = q
    ? sortServers(servers.filter((s) =>
        !s.hidden && (
        s.name.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        (CATEGORY_LABELS[s.category] || '').toLowerCase().includes(q))
      ), sort)
    : [];

  return (
    <>
      <div className="crumb"><Link to="/">Anasayfa</Link> <ChevronRight size={14} /> <span>Arama</span></div>
      <div className="m2-top">
        <div className="m2-top__title">
          <span className="m2-top__badge"><SearchIcon size={18} /></span>
          <div className="m2-top__main">“{q}” için {results.length} sonuç bulundu</div>
        </div>
        <button className="m2-addBtn" onClick={() => navigate('/')}>Anasayfa</button>
      </div>
      {results.length === 0 ? (
        <div className="card"><div className="empty-state">Aramanızla eşleşen server bulunamadı. Başka bir kelime deneyin.</div></div>
      ) : (
        <>
          <SortBar value={sort} onChange={setSort} />
          {results.map((s) => <ServerRow key={s.id} s={s} />)}
        </>
      )}
    </>
  );
}
