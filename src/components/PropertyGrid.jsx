import PropertyCard from './PropertyCard.jsx';

export default function PropertyGrid({ items, empty }) {
  if (!items.length) {
    return <div className="empty">{empty}</div>;
  }
  return (
    <div className="grid">
      {items.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
