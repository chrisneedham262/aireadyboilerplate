import React from 'react';
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ArrowPathIcon,
  FingerPrintIcon,
} from '@heroicons/react/24/outline';

const defaultFeatures = [
  {
    name: 'Push to deploy',
    description:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates',
    description:
      'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple queues',
    description:
      'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced security',
    description:
      'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    icon: FingerPrintIcon,
  },
];

export default function FeaturesSection({ 
  sectionRef,
  title = "Deploy faster",
  heading = "Everything you need to deploy your app",
  description = "Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.",
  features = defaultFeatures,
  iconBackgroundColor = "bg-indigo-600",
  className = ""
}) {
  return (
    <div ref={sectionRef} className={`mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">{title}</h2>
        <p className="mt-2 h2">
          {heading}
        </p>
        <p className="mt-6 p-large">
          {description}
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <dt className="h6">
                <div className={`absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg ${iconBackgroundColor}`}>
                  <feature.icon aria-hidden="true" className="size-6 text-white" />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 p-medium">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

