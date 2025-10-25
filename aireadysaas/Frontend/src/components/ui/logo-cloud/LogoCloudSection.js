import React from 'react';

const defaultLogos = [
  {
    name: "Transistor",
    src: "https://tailwindui.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg",
    darkSrc: "https://tailwindui.com/plus-assets/img/logos/158x48/transistor-logo-white.svg",
  },
  {
    name: "Reform",
    src: "https://tailwindui.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg",
    darkSrc: "https://tailwindui.com/plus-assets/img/logos/158x48/reform-logo-white.svg",
  },
  {
    name: "Tuple",
    src: "https://tailwindui.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg",
    darkSrc: "https://tailwindui.com/plus-assets/img/logos/158x48/tuple-logo-white.svg",
  },
  {
    name: "SavvyCal",
    src: "https://tailwindui.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg",
    darkSrc: "https://tailwindui.com/plus-assets/img/logos/158x48/savvycal-logo-white.svg",
  },
  {
    name: "Statamic",
    src: "https://tailwindui.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg",
    darkSrc: "https://tailwindui.com/plus-assets/img/logos/158x48/statamic-logo-white.svg",
  },
];

export default function LogoCloudSection({ 
  sectionRef,
  logos = defaultLogos,
  caseStudyText = "Transistor saves up to $40,000 per year, per employee by working with us.",
  caseStudyLinkText = "Read our case study",
  caseStudyLink = "#",
  showCaseStudy = true,
  className = ""
}) {
  return (
    <div ref={sectionRef} className={className}>
      {/* Logo cloud */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {logos.map((logo, index) => (
            <img
              key={logo.name}
              alt={logo.name}
              src={logo.src}
              width={158}
              height={48}
              className={`
                col-span-2 max-h-12 w-full object-contain lg:col-span-1
                dark:hidden
                ${index === 3 ? 'sm:col-start-2' : ''}
                ${index === 4 ? 'col-start-2 sm:col-start-auto' : ''}
              `}
            />
          ))}
          {logos.map((logo, index) => (
            logo.darkSrc && (
              <img
                key={`${logo.name}-dark`}
                alt={logo.name}
                src={logo.darkSrc}
                width={158}
                height={48}
                className={`
                  col-span-2 max-h-12 w-full object-contain lg:col-span-1
                  hidden dark:block
                  ${index === 3 ? 'sm:col-start-2' : ''}
                  ${index === 4 ? 'col-start-2 sm:col-start-auto' : ''}
                `}
              />
            )
          ))}
        </div>
        
        {showCaseStudy && (
          <div className="mt-16 flex justify-center">
            <p className="relative rounded-full px-4 py-1.5 text-sm/6 text-gray-600 dark:text-gray-300 ring-1 ring-inset ring-gray-900/10 dark:ring-gray-100/10 hover:ring-gray-900/20 dark:hover:ring-gray-100/20 transition-all duration-200">
              <span className="hidden md:inline">
                {caseStudyText}
              </span>
              <a href={caseStudyLink} className="font-semibold text-indigo-600 dark:text-indigo-400">
                <span aria-hidden="true" className="absolute inset-0" /> {caseStudyLinkText}{' '}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

