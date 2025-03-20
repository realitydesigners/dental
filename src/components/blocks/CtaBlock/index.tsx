import Link from "next/link";
import { RichText } from "../../richtext";
import { SanityImage } from "../../sanity-image";

// Define the types for the component
type ButtonType = {
  _key?: string;
  label?: string;
  link?: {
    href?: string;
    openInNewTab?: boolean;
  };
  variant?: "default" | "outline" | "secondary" | "link";
};

type StatType = {
  value: string;
  label: string;
};

type PagebuilderType<T extends string> = {
  _type: T;
  style?: "simple" | "split" | "gradient" | "card";
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  richText?: any[];
  image?: any;
  backgroundImage?: any;
  stats?: StatType[];
  buttons?: ButtonType[];
};

export type CTABlockProps = PagebuilderType<"cta">;

// Simple Badge component to replace the imported one
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-white/10 text-gray-200 backdrop-blur-sm">
    {children}
  </span>
);

// Custom SanityButtons component
const SanityButtons = ({
  buttons,
  className = "",
}: {
  buttons?: ButtonType[];
  className?: string;
}) => {
  if (!buttons?.length) return null;

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {buttons.map((button, index) => {
        if (!button.link?.href) return null;

        const getButtonVariantClasses = () => {
          switch (button.variant) {
            case "outline":
              return "border border-white/20 text-white hover:bg-white/10";
            case "secondary":
              return "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm";
            case "link":
              return "text-gray-300 hover:text-white";
            default:
              return "bg-white text-black hover:bg-gray-100";
          }
        };

        return (
          <Link
            key={button._key || index}
            href={button.link.href}
            target={button.link.openInNewTab ? "_blank" : undefined}
            rel={button.link.openInNewTab ? "noopener noreferrer" : undefined}
            className={`inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-medium transition-all duration-300 ${getButtonVariantClasses()}`}
          >
            {button.label}
          </Link>
        );
      })}
    </div>
  );
};

const Stat = ({ value, label }: StatType) => (
  <div className="rounded-2xl bg-white/5 p-8 backdrop-blur-sm">
    <p className="text-4xl font-bold text-white mb-2">{value}</p>
    <p className="text-sm text-gray-400 font-medium">{label}</p>
  </div>
);

export function CTABlock({
  style = "gradient",
  richText,
  title,
  subtitle,
  eyebrow,
  buttons,
  image,
  backgroundImage,
  stats,
}: CTABlockProps) {
  const getContainerClasses = () => {
    switch (style) {
      case "split":
        return "grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto";
      case "gradient":
        return "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center";
      case "card":
        return "max-w-5xl mx-auto p-12 md:p-16";
      default:
        return "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center";
    }
  };

  return (
    <section className="relative overflow-hidden bg-black">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/90" />
          <SanityImage
            asset={backgroundImage}
            fill
            className="object-cover opacity-40"
          />
        </div>
      )}

      <div className={`relative z-10 py-20 md:py-28 ${getContainerClasses()}`}>
        {style === "split" ? (
          <>
            <div className="flex flex-col items-start gap-8">
              {eyebrow && <Badge>{eyebrow}</Badge>}
              <div className="space-y-6">
                {title && (
                  <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl [text-wrap:balance]">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-xl text-gray-300 [text-wrap:balance] leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>
              {richText && (
                <div className="prose prose-lg prose-invert max-w-2xl">
                  <RichText richText={richText} />
                </div>
              )}
              <SanityButtons buttons={buttons} className="pt-4" />
            </div>
            {image && (
              <div className="relative">
                <div className="absolute -inset-4 bg-white/5 blur-3xl rounded-[2rem]" />
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <SanityImage
                    asset={image}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="max-w-3xl mx-auto">
              {eyebrow && <Badge>{eyebrow}</Badge>}
              <div className="mt-8 space-y-6">
                {title && (
                  <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl [text-wrap:balance]">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-xl text-gray-300 [text-wrap:balance] leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            {richText && (
              <div className="prose prose-lg prose-invert mx-auto mt-8 max-w-2xl">
                <RichText richText={richText} />
              </div>
            )}
            {stats && stats.length > 0 && (
              <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
                {stats.map((stat, index) => (
                  <Stat key={index} {...stat} />
                ))}
              </div>
            )}
            <SanityButtons buttons={buttons} className="mt-12" />
          </>
        )}
      </div>
    </section>
  );
}
