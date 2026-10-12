# DOMUS — Premium Real Estate

Заманбап, премиум деңгээлдеги кыймылсыз мүлк сайты. React + Vite + React Router + Framer Motion + Lucide.

## Иштетүү

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview
```

Node.js 18+ талап кылынат. Сүрөттөр жана шрифттер (Prata, Manrope) интернет аркылуу жүктөлөт.

## Түзүмү

```
src/
  components/   Header, Footer, Hero, SearchPanel, PropertyCard, PropertyGrid, Gallery, Logo, SafeImage
  pages/        Home, Listings, PropertyDetails, About, Contact, AddProperty, Favorites, NotFound
  context/      AppContext (тил, сүйүктүүлөр, колдонуучунун жарыялары — localStorage)
  data/         properties.js (14 объект, шаарлар, агенттер)
  i18n/         translations.js (ky негизги; ru/en жарым-жартылай)
  utils/        format.js (баа форматы жана фильтр логикасы)
  styles/       base.css, layout.css, home.css, pages.css
```

## Маршруттар

`/` · `/houses` · `/apartments` · `/rent` · `/all` · `/property/:id` · `/about` · `/contact` · `/add` · `/favorites`

## Эскертүүлөр

- «Үй жарыялоо» формасы жана байланыш формалары backend'ге туташкан эмес: жарыялар браузердин localStorage'ында сакталат, билдирүүлөр жөнөтүлбөйт.
- `src/data/properties.js` ичиндеги телефон, дарек жана почтаны өзүңүздүкүнө алмаштырыңыз.
- SPA'ны хостингге чыгарганда бардык маршрутту `index.html`'ге багыттаңыз.
