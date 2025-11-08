"use client";

import React, { useContext, useState, useEffect, useRef  } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowUpRightIcon  } from '@heroicons/react/24/outline'
import Image from "next/image";
import Footer from "@/components/nav/footer"; 
import LoadingButton from "@/components/ui/LoadingButton";
import Header from "@/components/nav/header";
import OnePageHeader from "@/components/nav/onepageheader";
import AuthContext from "../../../context/AuthContext";
import { PricingSection } from "@/components/ui/pricing";
import { FAQSection } from "@/components/ui/faq";
import { CTASection } from "@/components/ui/cta";
import { LogoCloudSection } from "@/components/ui/logo-cloud";
import { FeaturesSection } from "@/components/ui/features";
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Dialog, DialogPanel } from '@headlessui/react'
import SEO from "../../SEO";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function HomePage() {
  const { isAuthenticated, loading, user } = useContext(AuthContext);
  const casestudyRef = useRef(null);
  const pricingRef = useRef(null);
  const faqRef = useRef(null);

  // Function to scroll to a section
  const scrollToSection = (section) => {
    if (section === "casestudy" && casestudyRef.current) {
      casestudyRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "pricing" && pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "faq" && faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    //console.log("Auth state:", { isAuthenticated, loading, user });
  }, [isAuthenticated, loading, user]);
  
  if (loading) {
    return <LoadingButton />;
  }

  return (
    <>
    	<SEO page="home" />
   
      {/* <Header /> */}
      <OnePageHeader scrollToSection={scrollToSection} />

      {isAuthenticated && (
        <div className="flex items-center justify-center h-60 bg-gray-100">
          <Link href="/app/dashboard">
            <p className="text-2xl font-bold text-blue-500 hover:underline">
              Go to Dashboard
            </p>
          </Link>
        </div>
      )}

      <div className="surface-toggle">
      <main className="isolate">
        {/* Hero section */}
        <div className="relative pt-14">
         
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="h1">
                  Your AI Ready Boilerplate
                </h1>
                <p className="mt-8 text-lead">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                  amet fugiat veniam occaecat.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href="/contact"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </Link>
                  <Link href="/contact" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <img
                    alt="App screenshot"
                    src="https://tailwindui.com/plus-assets/img/component-images/project-app-screenshot.png"
                    width={2432}
                    height={1442}
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>

        {/* Logo cloud */}
        <LogoCloudSection sectionRef={casestudyRef} />

        {/* Feature section */}
        <FeaturesSection />

        {/* Testimonial section */}
        <div className="mx-auto mt-32 max-w-7xl sm:mt-56 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gray-900 px-6 py-20 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1601381718415-a05fb0a261f3?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8ODl8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1216&q=80"
              className="absolute inset-0 size-full object-cover brightness-150 saturate-0"
            />
            <div className="absolute inset-0 bg-gray-900/90 mix-blend-multiply" />
            <div aria-hidden="true" className="absolute -left-80 -top-56 transform-gpu blur-3xl">
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-[0.45]"
              />
            </div>
            <div
              aria-hidden="true"
              className="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl"
            >
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
              />
            </div>
            <div className="relative mx-auto max-w-2xl lg:mx-0">
              <img
                alt=""
                src="https://tailwindui.com/plus-assets/img/logos/workcation-logo-white.svg"
                className="h-12 w-auto"
              />
              <figure>
                <blockquote className="mt-6 text-lg font-semibold text-white sm:text-xl/8">
                  <p>
                    "Amet amet eget scelerisque tellus sit neque faucibus non eleifend. Integer eu praesent at a. Ornare
                    arcu gravida natoque erat et cursus tortor consequat at. Vulputate gravida sociis enim nullam
                    ultricies habitant malesuada lorem ac."
                  </p>
                </blockquote>
                <figcaption className="mt-6 text-base text-white">
                  <div className="font-semibold">Judith Black</div>
                  <div className="mt-1">CEO of Tuple</div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Pricing section */}
        <PricingSection sectionRef={pricingRef} />
        

        {/* FAQs */}
        <FAQSection sectionRef={faqRef} />
        

        {/* CTA section */}
        <CTASection />
      </main>

     
      </div>

    <Footer />
    </>
  );
}