import { RichText } from "../../richtext";
import { SanityImage } from "../../sanity-image";
import Link from "next/link";

// Define the types for the component
type ButtonType = {
  _key?: string;
  _type?: string;
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
  buttons?: ButtonType[];
  image?: any;
  backgroundImage?: any;
  stats?: StatType[];
};

export type CTABlockProps = PagebuilderType<"cta">;

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
        return "bg-blue-900/30 text-blue-100 border border-blue-500/20 dark:bg-blue-900/40 dark:text-blue-100 dark:border-blue-400/20";
      case "outline":
        return "bg-transparent border border-blue-300 text-blue-100 dark:border-blue-400 dark:text-blue-100";
      default:
        return "bg-blue-500/10 text-blue-100 border border-blue-400/20 dark:bg-blue-900/30 dark:text-blue-100 dark:border-blue-500/20";
    }
  };

  return (
    <span
      className={`px-4 py-1.5 text-sm font-medium rounded-full ${getVariantClasses()} ${className} backdrop-blur-sm`}
    >
      {children}
    </span>
  );
};

// Custom SanityButtons component
const SanityButtons = ({
  buttons,
  className = "",
  buttonClassName = "",
}: {
  buttons?: ButtonType[];
  className?: string;
  buttonClassName?: string;
}) => {
  if (!buttons || buttons.length === 0) return null;

  return (
    <div className={className}>
      {buttons.map((button, index) => {
        if (!button.link?.href) return null;

        const getButtonVariantClasses = () => {
          switch (button.variant) {
            case "outline":
              return "border border-blue-300/50 text-blue-50 hover:bg-blue-800/30 hover:border-blue-400/70 dark:border-blue-400/50 dark:text-blue-50 dark:hover:bg-blue-800/40";
            case "secondary":
              return "bg-white/10 text-white hover:bg-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 backdrop-blur-sm";
            case "link":
              return "text-blue-200 hover:text-blue-100 dark:text-blue-200 dark:hover:text-blue-100 p-0 hover:translate-x-1";
            default:
              return "bg-blue-600 text-white hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02]";
          }
        };

        return (
          <Link
            key={button._key || index}
            href={button.link.href}
            target={button.link.openInNewTab ? "_blank" : undefined}
            rel={button.link.openInNewTab ? "noopener noreferrer" : undefined}
            className={`${buttonClassName} inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg transition-all duration-300 ${getButtonVariantClasses()}`}
          >
            {button.label}
          </Link>
        );
      })}
    </div>
  );
};

const Stat = ({ value, label }: StatType) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-blue-200/80">{label}</div>
  </div>
);

export function CTABlock({
  style = "simple",
  richText,
  title,
  subtitle,
  eyebrow,
  buttons,
  image,
  backgroundImage,
  stats,
}: CTABlockProps) {
  const getStyleClasses = () => {
    switch (style) {
      case "split":
        return "bg-gradient-to-br from-gray-900 to-blue-900/80";
      case "gradient":
        return "bg-gradient-to-br from-blue-600 via-blue-800 to-gray-900";
      case "card":
        return "bg-gray-900 shadow-2xl shadow-blue-500/10";
      default:
        return "bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900";
    }
  };

  const renderContent = () => (
    <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
      {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight [text-wrap:balance]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl text-blue-200/90 font-medium tracking-wide">
            {subtitle}
          </p>
        )}
        {richText && (
          <div className="text-lg text-blue-100/80">
            <RichText richText={richText} className="[text-wrap:balance]" />
          </div>
        )}
      </div>

      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-8">
          {stats.map((stat, index) => (
            <Stat key={index} {...stat} />
          ))}
        </div>
      )}

      <SanityButtons
        buttons={buttons}
        buttonClassName="w-full sm:w-auto"
        className="w-full sm:w-fit flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
      />
    </div>
  );

  return (
    <section className="relative my-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`relative overflow-hidden rounded-3xl ${getStyleClasses()} ${
            style === "split" ? "lg:min-h-[600px]" : "py-16 md:py-24"
          }`}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none" />
          {backgroundImage && (
            <>
              <div className="absolute inset-0">
                <SanityImage
                  asset={backgroundImage}
                  fill
                  className="object-cover opacity-20"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
            </>
          )}

          {/* Content */}
          <div
            className={`relative ${
              style === "split"
                ? "grid lg:grid-cols-2 items-center gap-12 p-8 md:p-12 lg:p-16"
                : "max-w-3xl mx-auto px-4"
            }`}
          >
            {style === "split" ? (
              <>
                {renderContent()}
                {image && (
                  <div className="relative aspect-square w-full max-w-2xl mx-auto lg:ml-auto">
                    <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl opacity-30" />
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                    <SanityImage
                      asset={image}
                      width={800}
                      height={800}
                      className="relative h-full w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
                    />
                  </div>
                )}
              </>
            ) : (
              renderContent()
            )}
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
        </div>
      </div>
    </section>
  );
}
