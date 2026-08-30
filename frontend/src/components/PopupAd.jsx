import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { POPUP_AD } from '../mock/mock';

const SS_KEY = 'tm2_popup_seen';

export default function PopupAd() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SS_KEY)) return;
    const t = setTimeout(() => {
      sessionStorage.setItem(SS_KEY, '1');
      setOpen(true);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="popup-ad-back" data-testid="popup-ad-backdrop" onClick={close}>
      <div className="popup-ad-box" data-testid="popup-ad-box" onClick={(e) => e.stopPropagation()}>
        <span className="popup-ad-tag">REKLAM · 800x450</span>
        <button className="popup-ad-close" data-testid="popup-ad-close" onClick={close} aria-label="Kapat">
          <X size={18} />
        </button>
        <a
          href={POPUP_AD.url}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="popup-ad-link"
          onClick={close}
        >
          <img src={POPUP_AD.img} alt={POPUP_AD.title} />
        </a>
        <div className="popup-ad-cta">
          <span className="popup-ad-title">{POPUP_AD.title}</span>
          <a
            className="popup-ad-btn"
            href={POPUP_AD.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="popup-ad-cta-btn"
            onClick={close}
          >
            Hemen Katıl
          </a>
        </div>
      </div>
    </div>
  );
}
