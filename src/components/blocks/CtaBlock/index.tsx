import Link from "next/link";
import { RichText } from "../../richtext";
import { SanityImage } from "../../sanity-image";

// Define the types for the component
type ButtonType = {
  _key?: string;
  text?: string;
  variant?: "default" | "outline" | "secondary" | "link";
  openInNewTab?: boolean;
  href?: string;
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
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-200 backdrop-blur-sm ring-1 ring-white/10">
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
        if (!button.href) return null;

        const getButtonVariantClasses = () => {
          switch (button.variant) {
            case "outline":
              return "border border-white/20 text-white hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-white/5";
            case "secondary":
              return "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm hover:shadow-lg hover:shadow-white/5";
            case "link":
              return "text-gray-300 hover:text-white";
            default:
              return "bg-white text-black hover:bg-gray-100 shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20";
          }
        };

        return (
          <Link
            key={button._key || index}
            href={button.href}
            target={button.openInNewTab ? "_blank" : undefined}
            rel={button.openInNewTab ? "noopener noreferrer" : undefined}
            className={`inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-medium transition-all duration-300 ${getButtonVariantClasses()}`}
          >
            {button.text}
          </Link>
        );
      })}
    </div>
  );
};

const Stat = ({ value, label }: StatType) => (
  <div className="group relative">
    <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-white/5 to-white/10 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <div className="relative rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.07]">
      <p className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-bold text-transparent mb-2">
        {value}
      </p>
      <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
        {label}
      </p>
    </div>
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
        return "grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto px-4";
      case "gradient":
        return "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center";
      case "card":
        return "max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12 backdrop-blur-sm";
      default:
        return "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center";
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black py-20 via-gray-900 to-black py-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay" />

      {/* Gradient Orbs - Made smaller */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[5%] top-[20%] h-[100px] w-[100px] rounded-full bg-purple-500/10 blur-[32px]" />
        <div className="absolute -right-[5%] top-[30%] h-[100px] w-[100px] rounded-full bg-blue-500/10 blur-[32px]" />
      </div>

      {backgroundImage && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <SanityImage
            asset={backgroundImage}
            width={200}
            height={500}
            className="object-cover opacity-20"
            quality={85}
            priority
          />
        </div>
      )}

      <div className={`relative z-10 ${getContainerClasses()}`}>
        {style === "split" ? (
          <>
            <div className="flex flex-col items-start gap-4">
              {eyebrow && <Badge>{eyebrow}</Badge>}
              <div className="space-y-3">
                {title && (
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl [text-wrap:balance] bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-base sm:text-lg text-gray-300 [text-wrap:balance] leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>
              {richText && (
                <div className="prose prose-sm sm:prose-base prose-invert prose-p:text-gray-300 prose-a:text-white prose-strong:text-white/90 max-w-xl">
                  <RichText richText={richText} />
                </div>
              )}
              <SanityButtons buttons={buttons} className="pt-2" />
            </div>
            {image && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-white/5 to-white/10 blur-lg rounded-lg group-hover:from-white/10 group-hover:to-white/20 transition-all duration-700" />
                <div className="relative  overflow-hidden rounded-lg ring-1 ring-white/10 bg-gray-900/50">
                  <SanityImage
                    asset={image}
                    width={600}
                    height={400}
                    className="max-h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    quality={85}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-black/10 to-transparent" />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mx-auto">
              {eyebrow && <Badge>{eyebrow}</Badge>}
              <div className="mt-4 space-y-3">
                {title && (
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl [text-wrap:balance] bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-base sm:text-lg text-gray-300 [text-wrap:balance] leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            {richText && (
              <div className="prose prose-sm sm:prose-base prose-invert prose-p:text-gray-300 prose-a:text-white prose-strong:text-white/90 mx-auto mt-4 max-w-xl">
                <RichText richText={richText} />
              </div>
            )}
            {stats && stats.length > 0 && (
              <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <Stat key={index} {...stat} />
                ))}
              </div>
            )}
            <SanityButtons buttons={buttons} className="mt-6 justify-center" />
          </>
        )}
      </div>

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
