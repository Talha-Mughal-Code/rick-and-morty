export default function CharacterSkeleton() {
  return (
    <div className="skeleton">
      <div className="skeleton-image" />
      <div className="p-4">
        <div className="skeleton-text skeleton-text-short" />
        <div className="skeleton-text skeleton-text-medium" />
      </div>
    </div>
  );
}