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
              return "border border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800";
            case "secondary":
              return "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600";
            case "link":
              return "text-blue-600 hover:underline dark:text-blue-400 p-0";
            default:
              return "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500";
          }
        };

        return (
          <Link
            key={button._key || index}
            href={button.link.href}
            target={button.link.openInNewTab ? "_blank" : "_self"}
            className={`${buttonClassName} inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${getButtonVariantClasses()}`}
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
    <section id="features" className="my-6 md:my-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-gray-100 dark:bg-gray-800 py-16 rounded-3xl px-4">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            {eyebrow && (
              <Badge
                variant="secondary"
                className="bg-white dark:bg-gray-700 dark:text-gray-200"
              >
                {eyebrow}
              </Badge>
            )}
            <h2 className="text-3xl font-semibold md:text-5xl text-balance">
              {title}
            </h2>
            <div className="text-lg text-gray-600 dark:text-gray-300">
              <RichText richText={richText} className="text-balance" />
            </div>
            <div className="flex justify-center">
              <SanityButtons
                buttons={buttons}
                buttonClassName="w-full sm:w-auto"
                className="w-full sm:w-fit grid gap-2 sm:grid-flow-col justify-center mb-8"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
