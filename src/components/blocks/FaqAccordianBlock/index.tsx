import { useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

// Define the types for the component
type LinkType = {
  title?: string;
  description?: string;
  href?: string;
  openInNewTab?: boolean;
};

type FaqType = {
  _id: string;
  title?: string;
  richText?: any[];
};

type PagebuilderType<T extends string> = {
  _type: T;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  faqs?: FaqType[];
  link?: LinkType;
};

type FaqAccordionProps = PagebuilderType<"faqAccordion">;

// Simple RichText component as a placeholder
// Replace with your actual RichText component implementation
const RichText = ({
  richText,
  className,
}: {
  richText: any[];
  className?: string;
}) => {
  return <div className={className}>Content goes here</div>;
};

export function FaqAccordion({
  eyebrow,
  title,
  subtitle,
  faqs,
  link,
}: FaqAccordionProps) {
  const [openItemId, setOpenItemId] = useState<string | null>(
    faqs && faqs.length > 0 ? faqs[0]._id : null,
  );

  const toggleItem = (id: string) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <section id="faq" className="my-12 py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex w-full flex-col items-center mb-12">
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center">
            {eyebrow && (
              <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
                {eyebrow}
              </span>
            )}
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              {title}
            </h2>
            <h3 className="max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              {subtitle}
            </h3>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs?.map((faq) => (
              <div
                key={faq._id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq._id)}
                  className="flex justify-between items-center w-full px-6 py-4 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span>{faq.title}</span>
                  {openItemId === faq._id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>

                {openItemId === faq._id && (
                  <div className="px-6 py-4 bg-white dark:bg-gray-800">
                    <RichText
                      richText={faq?.richText ?? []}
                      className="text-gray-600 dark:text-gray-300"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {link?.href && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              {link.title && (
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  {link.title}
                </p>
              )}
              <Link
                href={link.href ?? "#"}
                target={link.openInNewTab ? "_blank" : "_self"}
                className="group inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                <span>{link.description}</span>
                <span className="rounded-full border border-current p-1 group-hover:translate-x-0.5 transition-transform">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
