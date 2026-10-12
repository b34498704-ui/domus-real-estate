import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import SafeImage from './SafeImage.jsx';

export default function Gallery({ images, title }) {
  const { t } = useApp();
  const [open, setOpen] = useState(null);
  const isOpen = open !== null;
  const count = images.length;

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + count) % count)), [count]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close, go]);

  const rest = images.slice(1, 5);

  return (
    <>
      <div className={`gallery${rest.length === 0 ? ' is-single' : ''}`}>
        <button type="button" className="gallery__main" onClick={() => setOpen(0)} aria-label={`${title} — ${t('details.photos')}`}>
          <SafeImage src={images[0]} alt={title} eager />
        </button>
        {rest.map((src, i) => (
          <button
            key={src + i}
            type="button"
            className="gallery__thumb"
            onClick={() => setOpen(i + 1)}
            aria-label={`${i + 2} ${t('details.photo')}`}
          >
            <SafeImage src={src} alt="" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <button type="button" className="lightbox__close" aria-label={t('details.closeGallery')} onClick={close}>
              <X size={22} />
            </button>
            {count > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox__nav lightbox__nav--prev"
                  aria-label={t('details.prev')}
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                >
                  <ChevronLeft size={26} />
                </button>
                <button
                  type="button"
                  className="lightbox__nav lightbox__nav--next"
                  aria-label={t('details.next')}
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                >
                  <ChevronRight size={26} />
                </button>
              </>
            )}
            <motion.div
              key={open}
              className="lightbox__stage"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <SafeImage src={images[open]} alt={title} eager />
              <span className="lightbox__count">
                {open + 1} / {count}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
