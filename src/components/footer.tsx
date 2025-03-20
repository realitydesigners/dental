import Link from "next/link";
import { sanityFetch } from "@/src/sanity/lib/live";
import { queryFooterData } from "@/src/sanity/lib/query";
import { Logo } from "./logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "./social-icons";

interface SocialLinksProps {
  data: NonNullable<any>["socialLinks"];
}

interface FooterProps {
  data: NonNullable<any>;
}

async function fetchFooterData() {
  const response = await sanityFetch({
    query: queryFooterData,
  });
  return response;
}

export async function FooterServer() {
  const footerData = await fetchFooterData();
  if (!footerData?.data) return <FooterSkeleton />;
  return <Footer data={footerData.data} />;
}

function SocialLinks({ data }: SocialLinksProps) {
  if (!data) return null;

  const { facebook, twitter, instagram, youtube, linkedin } = data;

  const socialLinks = [
    {
      url: instagram,
      Icon: InstagramIcon,
      label: "Follow us on Instagram",
    },
    { url: facebook, Icon: FacebookIcon, label: "Follow us on Facebook" },
    { url: twitter, Icon: XIcon, label: "Follow us on Twitter" },
    { url: linkedin, Icon: LinkedinIcon, label: "Follow us on LinkedIn" },
    {
      url: youtube,
      Icon: YoutubeIcon,
      label: "Subscribe to our YouTube channel",
    },
  ].filter((link) => link.url);

  return (
    <ul className="flex items-center space-x-6 text-muted-foreground">
      {socialLinks.map(({ url, Icon, label }, index) => (
        <li
          key={`social-link-${url}-${index.toString()}`}
          className="font-medium transition-all duration-300 hover:scale-110"
        >
          <Link
            href={url ?? "#"}
            target="_blank"
            prefetch={false}
            rel="noopener noreferrer"
            aria-label={label}
            className="block transition-transform duration-300 hover:-translate-y-1"
          >
            <Icon className="fill-muted-foreground transition-colors duration-300 hover:fill-primary dark:fill-zinc-400 dark:hover:fill-primary" />
            <span className="sr-only">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FooterSkeleton() {
  return (
    <section className="mt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <footer className="h-[500px] lg:h-auto">
          <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
              <div>
                <span className="flex items-center justify-center gap-4 lg:justify-start">
                  <div className="h-[40px] w-[80px] animate-pulse rounded bg-muted" />
                </span>
                <div className="mt-6 h-16 w-full animate-pulse rounded bg-muted" />
              </div>
              <div className="flex items-center space-x-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-6 animate-pulse rounded bg-muted"
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 lg:gap-20">
              {[1, 2, 3].map((col) => (
                <div key={col}>
                  <div className="mb-6 h-6 w-24 animate-pulse rounded bg-muted" />
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="h-4 w-full animate-pulse rounded bg-muted"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center lg:flex-row lg:items-center lg:text-left">
            <div className="h-4 w-48 animate-pulse rounded bg-muted" />
            <div className="flex justify-center gap-4 lg:justify-start">
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}

function Footer({ data }: FooterProps) {
  const { subtitle, columns, socialLinks, logo, siteTitle } = data;
  const year = new Date().getFullYear();

  return (
    <section className="mt-20 pb-8 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/20">
      <div className="container mx-auto">
        <footer className="h-[500px] lg:h-auto">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-4 text-center md:px-6 lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 md:gap-8 lg:items-start">
              <div className="group">
                <span className="flex items-center justify-center gap-4 lg:justify-start">
                  <div className="transform transition-all duration-500 hover:scale-105">
                    <Logo src="/tbs.png" alt={siteTitle} priority />
                  </div>
                </span>
                {subtitle && (
                  <p className="mt-6 text-sm text-muted-foreground opacity-90 transition-opacity duration-300 hover:opacity-100 dark:text-zinc-400">
                    {subtitle}
                  </p>
                )}
              </div>
              {socialLinks && <SocialLinks data={socialLinks} />}
            </div>
            {Array.isArray(columns) && columns?.length > 0 && (
              <div className="grid grid-cols-3 gap-6 lg:mr-20 lg:gap-28">
                {columns.map((column, index) => (
                  <div
                    key={`column-${column?._key}-${index}`}
                    className="transition-all duration-300 hover:translate-y-[-4px]"
                  >
                    <h3 className="mb-6 font-semibold text-gray-800 dark:text-gray-200">
                      {column?.title}
                    </h3>
                    {column?.links && column?.links?.length > 0 && (
                      <ul className="space-y-4 text-sm text-muted-foreground dark:text-zinc-400">
                        {column?.links?.map((link, index) => (
                          <li
                            key={`${link?._key}-${index}-column-${column?._key}`}
                            className="font-medium transition-all duration-300 hover:translate-x-1 hover:text-primary"
                          >
                            <Link
                              href={link.href ?? "#"}
                              target={link.openInNewTab ? "_blank" : undefined}
                              rel={
                                link.openInNewTab
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="inline-block transition-colors duration-300 hover:text-primary"
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-20 border-t border-gray-200 pt-8 dark:border-gray-800">
            <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 text-center text-sm font-normal text-muted-foreground md:px-6 lg:flex-row lg:items-center lg:text-left">
              <p className="transition-colors duration-300 hover:text-gray-700 dark:hover:text-gray-300">
                © {year} {siteTitle}. All rights reserved.
              </p>
              <ul className="flex justify-center gap-4 lg:justify-start">
                <li className="transition-colors duration-300 hover:text-primary">
                  <Link
                    href="/terms"
                    className="transition-colors duration-300 hover:text-primary hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li className="transition-colors duration-300 hover:text-primary">
                  <Link
                    href="/privacy"
                    className="transition-colors duration-300 hover:text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
