import React from 'react';
import { ThumbsUp, Clock, MousePointerClick, ArrowDownWideNarrow } from 'lucide-react';

const OPTIONS = [
  { key: 'likes', label: 'Beğeni', icon: ThumbsUp },
  { key: 'date', label: 'Tarih', icon: Clock },
  { key: 'clicks', label: 'Tıklanma', icon: MousePointerClick },
];

export default function SortBar({ value, onChange }) {
  return (
    <div className="sort-bar" data-testid="sort-bar">
      <span className="sort-bar__label"><ArrowDownWideNarrow size={14} /> Sırala</span>
      {OPTIONS.map((o) => {
        const Icon = o.icon;
        return (
          <button
            key={o.key}
            className={`sort-btn ${value === o.key ? 'active' : ''}`}
            data-testid={`sort-btn-${o.key}`}
            onClick={() => onChange(o.key)}
          >
            <Icon size={14} /> {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function sortServers(list, sort) {
  const arr = [...list];
  if (sort === 'date') return arr.sort((a, b) => (a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : b.id - a.id));
  if (sort === 'clicks') return arr.sort((a, b) => ((b.webClicks + b.discordClicks) - (a.webClicks + a.discordClicks)) || (b.id - a.id));
  return arr.sort((a, b) => (b.likes - a.likes) || (b.id - a.id));
}
