import Link from "next/link";

import { sanityFetch } from "@/src/sanity/lib/live";
import { queryNavbarData } from "@/src/sanity/lib/query";

import { Logo } from "./logo";

interface NavLinkProps {
  href: string;
  openInNewTab?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface ButtonType {
  _key?: string;
  label?: string;
  link?: {
    href?: string;
    openInNewTab?: boolean;
  };
  variant?: "default" | "outline" | "secondary" | "link";
}

interface NavbarProps {
  data: NonNullable<any>;
}

const NavLink = ({
  href,
  openInNewTab,
  children,
  className = "",
}: NavLinkProps) => (
  <Link
    href={href}
    target={openInNewTab ? "_blank" : undefined}
    rel={openInNewTab ? "noopener noreferrer" : undefined}
    className={`text-sm font-medium text-gray-300 transition-colors hover:text-white ${className}`}
  >
    {children}
  </Link>
);

const NavButtons = ({ buttons }: { buttons?: ButtonType[] }) => {
  if (!buttons?.length) return null;

  return (
    <div className="flex items-center gap-4">
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
            className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${getButtonVariantClasses()}`}
          >
            {button.label}
          </Link>
        );
      })}
    </div>
  );
};

async function fetchNavbarData() {
  const response = await sanityFetch({
    query: queryNavbarData,
  });
  return response;
}

export async function NavbarServer() {
  const navbarData = await fetchNavbarData();
  if (!navbarData?.data) return <NavbarSkeleton />;
  return <Navbar data={navbarData.data} />;
}

export function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="h-[40px] w-[80px] bg-white/5 rounded animate-pulse" />
        <div className="hidden items-center gap-8 lg:flex">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-4 w-20 bg-white/5 rounded animate-pulse"
            />
          ))}
        </div>
        <div className="flex items-center gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-9 w-24 bg-white/5 rounded animate-pulse"
            />
          ))}
        </div>
      </nav>
    </header>
  );
}

function Navbar({ data }: NavbarProps) {
  const { columns, buttons, logo, siteTitle } = data;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo src="/tbs.png" alt={siteTitle} priority />
        </Link>

        {Array.isArray(columns) && columns?.length > 0 && (
          <div className="hidden items-center gap-8 lg:flex">
            {columns.map((item) => {
              if (item.type === "link") {
                return (
                  <NavLink
                    key={item._key}
                    href={item.href ?? "#"}
                    openInNewTab={item.openInNewTab}
                  >
                    {item.name}
                  </NavLink>
                );
              }

              if (item.type === "column" && item.links?.length > 0) {
                return (
                  <div key={item._key} className="relative group">
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-300 transition-colors hover:text-white">
                      {item.title}
                      <svg
                        className="h-4 w-4 transition-transform group-hover:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div className="absolute left-1/2 top-full hidden -translate-x-1/2 transform group-hover:block">
                      <div className="mt-2 rounded-lg border border-white/10 bg-black/95 p-4 shadow-xl backdrop-blur-lg">
                        <div className="grid gap-2">
                          {item.links.map((link) => (
                            <NavLink
                              key={link._key}
                              href={link.href ?? "#"}
                              openInNewTab={link.openInNewTab}
                              className="whitespace-nowrap px-4 py-2 hover:bg-white/5 rounded-md"
                            >
                              {link.name}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}

        <NavButtons buttons={buttons} />
      </nav>
    </header>
  );
}
