import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BedDouble, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { formatPrice } from '../utils/format.js';
import SafeImage from './SafeImage.jsx';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] } },
};

export default function Hero({ onFind }) {
  const { t, allProperties } = useApp();
  const featured = allProperties.find((p) => p.id === 1) || allProperties[0];

  return (
    <section className="hero">
      <div className="container hero__grid">
        <motion.div className="hero__copy" variants={stagger} initial="hidden" animate="show">
          <motion.h1 variants={rise}>{t('hero.title')}</motion.h1>
          <motion.p variants={rise}>{t('hero.text')}</motion.p>
          <motion.div className="hero__actions" variants={rise}>
            <button type="button" className="btn btn--primary" onClick={onFind}>
              {t('hero.find')}
            </button>
            <Link to="/add" className="btn btn--ghost">
              {t('hero.list')}
            </Link>
          </motion.div>
        </motion.div>

        {featured && (
          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
          >
            <div className="hero__outline" aria-hidden="true" />
            <div className="hero__arch">
              <SafeImage src={featured.gallery?.[0] || featured.image} alt={featured.title} eager />
            </div>
            <motion.div
              className="hero__card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.7 }}
            >
              <Link to={`/property/${featured.id}`} className="hero__card-title">
                {featured.title}
              </Link>
              <p className="hero__card-loc">
                <MapPin size={14} /> {featured.city}, {featured.district}
              </p>
              <div className="hero__card-row">
                <strong>{formatPrice(featured, t)}</strong>
                <span>
                  <BedDouble size={15} /> {featured.bedrooms} {t('hero.bedrooms')}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
