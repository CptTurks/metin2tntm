import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { POPUP_AD } from '../mock/mock';
import { useApp } from '../context/AppContext';

const SS_KEY = 'tm2_popup_seen';

export default function PopupAd() {
  const [open, setOpen] = useState(false);
  const { banners, trackBannerClick, trackBannerImpression } = useApp();
  const banner = banners.find((b) => b.active && b.position === 'popup');
  const ad = banner ? { img: banner.img, url: banner.url, title: POPUP_AD.title } : POPUP_AD;

  useEffect(() => {
    if (sessionStorage.getItem(SS_KEY)) return;
    const t = setTimeout(() => {
      sessionStorage.setItem(SS_KEY, '1');
      if (banner) trackBannerImpression(banner.id);
      setOpen(true);
    }, 700);
    return () => clearTimeout(t);
    /* eslint-disable-next-line */
  }, []);

  const close = () => {
    setOpen(false);
  };
  const clickAd = () => { if (banner) trackBannerClick(banner.id); close(); };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="popup-ad-back" data-testid="popup-ad-backdrop" onClick={close}>
      <div className="popup-ad-box" data-testid="popup-ad-box" role="dialog" aria-modal="true" aria-label="Reklam" onClick={(e) => e.stopPropagation()}>
        <span className="popup-ad-tag">REKLAM · 800x450</span>
        <button className="popup-ad-close" data-testid="popup-ad-close" onClick={close} aria-label="Kapat">
          <X size={18} />
        </button>
        <a
          href={ad.url}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="popup-ad-link"
          onClick={clickAd}
        >
          <img src={ad.img} alt={ad.title} />
        </a>
        <div className="popup-ad-cta">
          <span className="popup-ad-title">{ad.title}</span>
          <a
            className="popup-ad-btn"
            href={ad.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="popup-ad-cta-btn"
            onClick={clickAd}
          >
            Hemen Katıl
          </a>
        </div>
      </div>
    </div>
  );
}
