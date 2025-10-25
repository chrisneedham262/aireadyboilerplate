import React, { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function BannerProfile() {
  const [isVisible, setIsVisible] = useState(() => {
    // Retrieve the visibility state from localStorage
    const savedVisibility = localStorage.getItem('bannerVisibility');
    return savedVisibility !== null ? JSON.parse(savedVisibility) : true;
  });

  useEffect(() => {
    // Save the visibility state to localStorage whenever it changes
    localStorage.setItem('bannerVisibility', JSON.stringify(isVisible));
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="flex items-center gap-x-6 bg-indigo-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
          <p className="text-sm/6 text-white">
            <Link href="/app/profile">
              <strong className="font-semibold">Don't forget to update your profile</strong>
            </Link>
          </p>
          <div className="flex flex-1 justify-end">
            <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px] hover:opacity-75 transition-opacity" onClick={handleDismiss}>
              <span className="sr-only">Dismiss</span>
              <XMarkIcon aria-hidden="true" className="size-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
