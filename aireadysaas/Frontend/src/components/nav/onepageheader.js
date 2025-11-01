import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import AuthContext from "../../context/AuthContext";
import ThemeToggleGlobal from "../ui/ThemeToggleGlobal";
import axios from "axios";

export default function OnePageHeader({ scrollToSection }) {
  const { accessToken } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState("/default-image.jpeg");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/api/user-profile/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setAvatarUrl(response.data.avatar || "/default-image.jpeg");
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (accessToken) {
      fetchUserProfile();
    }
  }, [accessToken]);

  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 w-full z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                <Link href="/">
                  <Image
                    alt="Your Company"
                    src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                    width={32}
                    height={32}
                  />
                </Link>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="hidden sm:flex sm:space-x-8">
                  <button type="button" onClick={() => scrollToSection("casestudy")} className="btn-text-medium">Case Studies</button>
                  <button type="button" onClick={() => scrollToSection("pricing")} className="btn-text-medium">Pricing</button>
                  <button type="button" onClick={() => scrollToSection("faq")} className="btn-text-medium">FAQ</button>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                {/* Theme Toggle Switch */}
                <ThemeToggleGlobal />
                
                <Link href="/register" className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white px-3 py-2 text-sm font-medium">
                  Register
                </Link>
              </div>
              <div className="-mr-2 flex sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden bg-white dark:bg-gray-800">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <button type="button" onClick={() => scrollToSection("casestudy")} className="btn-nav-block">Case Studies</button>
              <button type="button" onClick={() => scrollToSection("services")} className="btn-nav-block">Services</button>
              <button type="button" onClick={() => scrollToSection("contact")} className="btn-nav-block">Contact</button>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-3 px-4">
              {/* Theme Toggle Switch - Mobile */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
                <ThemeToggleGlobal />
              </div>
              
              <Link href="/register" className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                Register
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
