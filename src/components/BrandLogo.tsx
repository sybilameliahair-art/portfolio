type BrandLogoProps = {
  className?: string;
  alt?: string;
};

export function BrandLogo({ className = "", alt = "Studio Amelia" }: BrandLogoProps) {
  return <img src="/logo.png?v=2" alt={alt} className={`block max-w-full ${className}`} />;
}
