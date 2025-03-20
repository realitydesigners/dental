type ProductCatalogProps = {
  _type: "productCatalog";
  title?: string;
  subtitle?: string;
  description?: string;
  // Add more props as needed
};

export function ProductCatalog({ title, subtitle, description }: ProductCatalogProps) {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
            {title}
          </h2>
        )}
        {subtitle && (
          <h3 className="text-xl text-blue-400 mb-6">
            {subtitle}
          </h3>
        )}
        {description && (
          <p className="text-gray-300 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}