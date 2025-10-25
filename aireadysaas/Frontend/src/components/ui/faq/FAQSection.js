import React from 'react';

const defaultFaqs = [
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 2,
    question: "How do I get started?",
    answer:
      "Getting started is easy! Simply sign up for an account, choose your plan, and you'll be up and running in minutes. Our onboarding process guides you through every step.",
  },
  {
    id: 3,
    question: "Can I change my plan later?",
    answer:
      "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges or credits.",
  },
  {
    id: 4,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.",
  },
  {
    id: 5,
    question: "Is there a free trial?",
    answer:
      "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start your trial.",
  },
];

export default function FAQSection({ 
  sectionRef,
  heading = "Frequently asked questions",
  faqs = defaultFaqs,
  showBackgroundBlur = true,
  className = ""
}) {
  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      <div className="mx-auto max-w-2xl px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:pb-32">
        <h2 className="h2">
          {heading}
        </h2>
        <dl className="mt-20 divide-y divide-gray-900/10 dark:divide-gray-700/50">
          {faqs.map((faq) => (
            <div key={faq.id} className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt className="h6 lg:col-span-5">{faq.question}</dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="p-medium">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      
      {showBackgroundBlur && (
        <div
          aria-hidden="true"
          className="absolute left-1/2 right-0 top-full z-0 hidden -translate-y-1/2 transform-gpu overflow-hidden blur-3xl sm:block"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
      )}
    </div>
  );
}

