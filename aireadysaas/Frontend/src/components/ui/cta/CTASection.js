import React from 'react';
import Link from 'next/link';

export default function CTASection({ 
  sectionRef,
  heading = "Boost your productivity. Start using our app today.",
  description = "Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.",
  primaryButtonText = "Get started",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Learn more",
  secondaryButtonHref = "/contact",
  showSecondaryButton = true,
  className = ""
}) {
  return (
    <div ref={sectionRef} className={`relative -z-10 mt-32 px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="h2">
          {heading}
        </h2>
        <p className="mx-auto mt-6 max-w-xl p-large">
          {description}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href={primaryButtonHref}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
          >
            {primaryButtonText}
          </Link>
          
          {showSecondaryButton && (
            <Link 
              href={secondaryButtonHref} 
              className="text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              {secondaryButtonText} <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

