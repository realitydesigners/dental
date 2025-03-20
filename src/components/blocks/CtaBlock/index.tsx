import Link from "next/link";
import { RichText } from "../../richtext";

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

type PagebuilderType<T extends string> = {
  _type: T;
  title?: string;
  eyebrow?: string;
  richText?: any[];
  buttons?: ButtonType[];
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
        return "bg-blue-900/30 text-blue-100 dark:bg-blue-900/40 dark:text-blue-100 border border-blue-800/50";
      case "outline":
        return "bg-transparent border border-blue-400 text-blue-100 dark:border-blue-500 dark:text-blue-100";
      default:
        return "bg-blue-500/10 text-blue-100 dark:bg-blue-800/20 dark:text-blue-100 border border-blue-400/20";
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
              return "border border-blue-300/50 text-blue-50 hover:bg-blue-800/30 dark:border-blue-400/50 dark:text-blue-50 dark:hover:bg-blue-800/40";
            case "secondary":
              return "bg-white/10 text-white hover:bg-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 backdrop-blur-sm";
            case "link":
              return "text-blue-200 hover:text-blue-100 dark:text-blue-200 dark:hover:text-blue-100 p-0";
            default:
              return "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-lg shadow-blue-500/20";
          }
        };

        return (
          <Link
            key={button._key || index}
            href={button.link.href}
            target={button.link.openInNewTab ? "_blank" : "_self"}
            className={`${buttonClassName} inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 ${getButtonVariantClasses()}`}
          >
            {button.label}
          </Link>
        );
      })}
    </div>
  );
};

export function CTABlock({ richText, title, eyebrow, buttons }: CTABlockProps) {
  return (
    <section className="relative my-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/30 to-gray-900 py-24 rounded-3xl">
          {/* Noise Texture */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />

          {/* Gradient Orbs */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative text-center max-w-3xl mx-auto px-4 space-y-8">
            {eyebrow && (
              <Badge variant="secondary" className="mx-auto">
                {eyebrow}
              </Badge>
            )}
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight [text-wrap:balance]">
              {title}
            </h2>
            <div className="text-lg text-blue-100/80">
              <RichText richText={richText} className="[text-wrap:balance]" />
            </div>
            <div className="flex justify-center pt-4">
              <SanityButtons
                buttons={buttons}
                buttonClassName="w-full sm:w-auto"
                className="w-full sm:w-fit flex flex-col sm:flex-row gap-3 justify-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
