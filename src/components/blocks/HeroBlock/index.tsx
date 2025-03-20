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
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-200 backdrop-blur-sm ring-1 ring-white/10">
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
              return "border border-white/20 text-white hover:bg-white/10 hover:border-white/30";
            case "secondary":
              return "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm";
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

export function HeroBlock({
  title,
  badge,
  richText,
  image,
  buttons,
}: HeroBlockProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay" />

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[128px]" />
        <div className="absolute -right-[10%] top-[30%] h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-[128px]" />
      </div>

      <div className="relative px-4 w-full lg:px-[5vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-[calc(100vh-4rem)] py-20">
          {/* Content */}
          <div className="flex flex-col items-start gap-8 max-w-2xl">
            {badge && <Badge>{badge}</Badge>}

            <div className="space-y-8">
              {title && (
                <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl xl:text-7xl [text-wrap:balance] bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent">
                  {title}
                </h1>
              )}
              {richText && (
                <div className="prose prose-lg prose-invert prose-p:text-gray-300 prose-a:text-white prose-strong:text-white/90">
                  <RichText richText={richText} />
                </div>
              )}
            </div>

            <SanityButtons buttons={buttons} className="pt-6" />
          </div>

          {/* Image */}
          {image && (
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-white/5 to-white/10 blur-3xl rounded-[2rem] transition-all duration-700" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10 bg-gray-900/50">
                <SanityImage
                  asset={image}
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/20 to-transparent" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
