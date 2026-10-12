import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import SafeImage from '../components/SafeImage.jsx';

export default function About() {
  const { t } = useApp();
  const values = ['about.v1', 'about.v2', 'about.v3'];
  return (
    <>
      <section className="about">
        <div className="container about__grid">
          <div className="about__copy">
            <h1>{t('about.title')}</h1>
            <p>{t('about.text1')}</p>
            <p>{t('about.text2')}</p>
            <Link to="/all" className="btn btn--primary">
              {t('hero.find')}
            </Link>
          </div>
          <div className="about__visual">
            <div className="about__arch">
              <SafeImage
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                alt="DOMUS"
                eager
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="why">
            {values.map((k) => (
              <div className="why__item" key={k}>
                <h3>{t(`${k}.title`)}</h3>
                <p>{t(`${k}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
