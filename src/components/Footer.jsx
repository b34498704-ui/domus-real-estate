import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { CITIES } from '../data/properties.js';
import Logo from './Logo.jsx';

export default function Footer() {
  const { t } = useApp();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p>{t('footer.tagline')}</p>
        </div>

        <div>
          <h3>{t('footer.nav')}</h3>
          <ul>
            <li><Link to="/">{t('nav.home')}</Link></li>
            <li><Link to="/houses">{t('nav.houses')}</Link></li>
            <li><Link to="/apartments">{t('nav.apartments')}</Link></li>
            <li><Link to="/rent">{t('nav.rent')}</Link></li>
            <li><Link to="/about">{t('nav.about')}</Link></li>
          </ul>
        </div>

        <div>
          <h3>{t('footer.cities')}</h3>
          <ul>
            {CITIES.slice(0, 5).map((c) => (
              <li key={c}><span>{c}</span></li>
            ))}
          </ul>
        </div>

        <div>
          <h3>{t('footer.contact')}</h3>
          <ul className="footer__contacts">
            <li><MapPin size={16} /> {t('contact.addressValue')}</li>
            <li><Phone size={16} /> +996 555 12 34 56</li>
            <li><Mail size={16} /> hello@domus.kg</li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© 2026 DOMUS. {t('footer.rights')}</span>
      </div>
    </footer>
  );
}
