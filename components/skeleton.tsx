export function ProductSkeleton() {
  return <div className="skeleton-card surface-card" aria-hidden="true"><div className="skeleton-line skeleton-icon" /><div className="skeleton-line skeleton-short" /><div className="skeleton-line skeleton-mid" /><div className="skeleton-line skeleton-long" /></div>;
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return <div className="product-grid">{Array.from({ length: count }, (_, i) => <ProductSkeleton key={i} />)}</div>;
}
