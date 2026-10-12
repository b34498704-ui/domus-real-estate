import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, Heart, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Logo from './Logo.jsx';

const LINKS = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/houses', key: 'nav.houses' },
  { to: '/apartments', key: 'nav.apartments' },
  { to: '/rent', key: 'nav.rent' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
];

const LANGS = [
  { code: 'ky', short: 'KY', label: 'Кыргызча' },
  { code: 'ru', short: 'RU', label: 'Русский' },
  { code: 'en', short: 'EN', label: 'English' },
];

export default function Header() {
  const { t, lang, setLang, favorites } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!langOpen) return undefined;
    const onDown = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setLangOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [langOpen]);

  const current = LANGS.find((l) => l.code === lang) || LANGS[0];

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header__inner">
        <Logo />

        <nav className="nav" aria-label="Негизги навигация">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
            >
              {t(l.key)}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <div className="lang" ref={langRef}>
            <button
              type="button"
              className="icon-btn lang__btn"
              aria-label={t('nav.language')}
              aria-expanded={langOpen}
              onClick={() => setLangOpen((v) => !v)}
            >
              <Globe size={18} />
              <span>{current.short}</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  className="lang__menu"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {LANGS.map((l) => (
                    <li key={l.code}>
                      <button
                        type="button"
                        className={l.code === lang ? 'is-active' : ''}
                        onClick={() => {
                          setLang(l.code);
                          setLangOpen(false);
                        }}
                      >
                        {l.label}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <Link to="/favorites" className="icon-btn fav-link" aria-label={t('nav.favorites')}>
            <Heart size={18} />
            {favorites.length > 0 && <span className="fav-link__count">{favorites.length}</span>}
          </Link>

          <Link to="/add" className="btn btn--primary btn--sm header__cta">
            {t('nav.list')}
          </Link>

          <button
            type="button"
            className="icon-btn burger"
            aria-label={menuOpen ? t('nav.close') : t('nav.menu')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="mobile__nav" aria-label="Мобилдик навигация">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.end}
                    className={({ isActive }) => `mobile__link${isActive ? ' is-active' : ''}`}
                  >
                    {t(l.key)}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="mobile__foot">
              <Link to="/add" className="btn btn--primary">
                {t('nav.list')}
              </Link>
              <div className="mobile__langs">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    className={l.code === lang ? 'is-active' : ''}
                    onClick={() => setLang(l.code)}
                  >
                    {l.short}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
