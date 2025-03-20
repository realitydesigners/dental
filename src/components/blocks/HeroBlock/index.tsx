import { RichText } from "../../richtext";
import { SanityImage } from "../../sanity-image";
import Link from "next/link";

// Define the missing types
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

type PagebuilderType<T extends string> = {
  _type: T;
  title?: string;
  badge?: string;
  richText?: any[];
  image?: any;
  buttons?: ButtonType[];
};

type HeroBlockProps = PagebuilderType<"hero">;

// Simple Badge component to replace the imported one
const Badge = ({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
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
      className={`px-4 py-1.5 text-sm font-medium rounded-full ${getVariantClasses()} backdrop-blur-sm transition-all duration-300 hover:scale-105`}
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
            target={button.link.openInNewTab ? "_blank" : "_self"}
            className={`${buttonClassName} inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg transition-all duration-300 ${getButtonVariantClasses()}`}
          >
            {button.label}
          </Link>
        );
      })}
    </div>
  );
};

export function HeroBlock({
  title,
  buttons,
  badge,
  image,
  richText,
}: HeroBlockProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center py-16 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/5 to-gray-900/80" />

      {/* Animated Background Shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
            {badge && (
              <div
                className="animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <Badge variant="secondary">{badge}</Badge>
              </div>
            )}

            <div
              className="flex flex-col gap-6 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight [text-wrap:balance]">
                {title}
              </h1>
              {richText && (
                <RichText
                  richText={richText}
                  className="text-lg md:text-xl font-normal text-blue-100/80 leading-relaxed max-w-2xl [text-wrap:balance]"
                />
              )}
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <SanityButtons
                buttons={buttons}
                buttonClassName="w-full sm:w-auto"
                className="w-full sm:w-fit flex flex-col sm:flex-row gap-3 lg:justify-start"
              />
            </div>
          </div>

          {image && (
            <div
              className="relative aspect-square w-full max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              {/* Image Effects */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl opacity-30" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10" />

              {/* Main Image */}
              <div className="relative group">
                <SanityImage
                  asset={image}
                  loading="eager"
                  width={1200}
                  height={1200}
                  priority
                  quality={90}
                  className="h-full w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-[1.02]"
                />

                {/* Hover Effects */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
