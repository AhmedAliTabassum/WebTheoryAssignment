export default function CardWrapper({ children, className = '' }) {
  return <section className={`card-wrapper ${className}`}>{children}</section>;
}
