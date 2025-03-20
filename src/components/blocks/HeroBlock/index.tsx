import Link from "next/link";
import { RichText } from "../../richtext";
import { SanityImage } from "../../sanity-image";

// Define the missing types
type ButtonType = {
  _key?: string;
  text?: string;
  variant?: "default" | "outline" | "secondary" | "link";
  openInNewTab?: boolean;
  href?: string;
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

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-white/10 text-gray-200 backdrop-blur-sm">
    {children}
  </span>
);

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
            href={button.href}
            target={button.openInNewTab ? "_blank" : undefined}
            rel={button.openInNewTab ? "noopener noreferrer" : undefined}
            className={`inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-medium transition-all duration-300 ${getButtonVariantClasses()}`}
          >
            {button.text}
          </Link>
        );
      })}
    </div>
  );
};

export function HeroBlock({
  title,
  badge,
  richText,
  image,
  buttons,
}: HeroBlockProps) {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none" />

      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-[calc(100vh-4rem)] py-20">
          {/* Content */}
          <div className="flex flex-col items-start gap-8 max-w-2xl">
            {badge && <Badge>{badge}</Badge>}

            <div className="space-y-6">
              {title && (
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl [text-wrap:balance]">
                  {title}
                </h1>
              )}
              {richText && (
                <div className="prose prose-lg prose-invert">
                  <RichText richText={richText} />
                </div>
              )}
            </div>

            <SanityButtons buttons={buttons} className="pt-4" />
          </div>

          {/* Image */}
          {image && (
            <div className="relative">
              <div className="absolute -inset-4 bg-white/5 blur-3xl rounded-[2rem]" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <SanityImage
                  asset={image}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-white/5 to-white/10 opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
}
