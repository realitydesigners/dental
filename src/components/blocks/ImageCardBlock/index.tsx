import { CTACard } from "../../image-link-card";
import { RichText } from "../../richtext";

// Define the types for the component
type PagebuilderType<T extends string> = {
  _type: T;
  title?: string;
  eyebrow?: string;
  richText?: any[];
  cards?: any[];
};

export type ImageLinkCardsProps = PagebuilderType<"imageLinkCards">;

// Simple Badge component to replace the imported one
const Badge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "outline":
        return "bg-transparent border border-gray-300 text-gray-800 dark:border-gray-600 dark:text-gray-200";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
    }
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${getVariantClasses()} ${className}`}
    >
      {children}
    </span>
  );
};

// cn utility function replacement
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export function ImageLinkCards({
  richText,
  title,
  eyebrow,
  cards,
}: ImageLinkCardsProps) {
  return (
    <section id="image-link-cards" className="my-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center">
            {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}
            <h2 className="text-3xl font-semibold md:text-5xl text-balance">
              {title}
            </h2>
            {richText && (
              <RichText richText={richText} className="text-balance" />
            )}
          </div>

          {/* Card Grid */}
          {Array.isArray(cards) && cards.length > 0 && (
            <div className="mt-16 grid w-full grid-cols-1 gap-4 lg:gap-1 sm:grid-cols-2 lg:grid-cols-4">
              {cards?.map((card, idx) => (
                <CTACard
                  key={card._key}
                  card={card}
                  className={cn(
                    "bg-gray-100 dark:bg-gray-800",
                    idx === 0 && "lg:rounded-l-3xl lg:rounded-r-none",
                    idx === cards.length - 1 &&
                      "lg:rounded-r-3xl lg:rounded-l-none",
                    idx !== 0 && idx !== cards.length - 1 && "lg:rounded-none",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
