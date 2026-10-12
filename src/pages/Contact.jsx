import { useState } from 'react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function Contact() {
  const { t } = useApp();
  const [sent, setSent] = useState(false);

  const info = [
    { icon: MapPin, label: t('contact.address'), value: t('contact.addressValue') },
    { icon: Phone, label: t('contact.phone'), value: '+996 555 12 34 56' },
    { icon: Mail, label: t('contact.email'), value: 'hello@domus.kg' },
    { icon: Clock, label: t('contact.hours'), value: t('contact.hoursValue') },
  ];

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.text')}</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container contact">
          <ul className="contact__info">
            {info.map(({ icon: Icon, label, value }) => (
              <li key={label}>
                <span className="why__icon">
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <div>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </div>
              </li>
            ))}
          </ul>

          <div className="panel">
            {sent ? (
              <p className="notice" role="status">
                {t('contact.sent')}
              </p>
            ) : (
              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <label className="field">
                  <span>{t('details.name')}</span>
                  <input required autoComplete="name" />
                </label>
                <div className="form__row">
                  <label className="field">
                    <span>{t('details.phone')}</span>
                    <input required type="tel" autoComplete="tel" placeholder="+996" />
                  </label>
                  <label className="field">
                    <span>{t('contact.email')}</span>
                    <input type="email" autoComplete="email" />
                  </label>
                </div>
                <label className="field">
                  <span>{t('details.message')}</span>
                  <textarea rows="5" required />
                </label>
                <button type="submit" className="btn btn--primary">
                  {t('contact.send')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
