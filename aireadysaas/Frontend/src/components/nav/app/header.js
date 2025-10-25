import React, {useContext, useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import AuthContext from '../../../context/AuthContext';
import ThemeToggleGlobal from '../../ui/ThemeToggleGlobal';
import axios from 'axios';
import { useRouter } from 'next/router';

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', current: true },
  ]
  const userNavigation = [
    { name: 'Your Profile', href: '/app/profile' },
    { name: 'Customer Service', href: '/app/customer-service' },
    { name: 'Sign out', href: '#' },
  ]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function HeaderApp() {
    const { logout, user, userProfile, accessToken } = useContext(AuthContext);
    const router = useRouter();
    const currentPath = router.pathname;

    const [currentNav, setCurrentNav] = useState(() => {
        const currentItem = navigation.find(item => item.href === currentPath);
        return currentItem ? currentItem.name : 'Dashboard';
    });

    // Get avatar from userProfile context, fallback to default
    const avatarUrl = userProfile?.avatar || '/default-image.jpeg';

    console.log('Avatar URL:', avatarUrl);

    const handleLogout = async () => {
      await logout();
    };

    const handleNavClick = (name) => {
        setCurrentNav(name);
    };

  return (
    <Disclosure as="nav" className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 justify-between">
        <div className="flex">
          <div className="flex shrink-0 items-center">
            <Link href="/app/dashboard">
              <Image
                alt="Your Company"
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="block h-8 w-auto lg:hidden"
                width={32}
                height={32}
              />
            </Link>
            <Link href="/app/dashboard">
              <Image
                alt="Your Company"
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="hidden h-8 w-auto lg:block"
                width={32}
                height={32}
              />
            </Link>
          </div>
          <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item.name)}
                aria-current={currentNav === item.name ? 'page' : undefined}
                className={classNames(
                  currentNav === item.name
                    ? 'border-indigo-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-white',
                  'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
          {/* Theme Toggle */}
          <ThemeToggleGlobal />
          
          <button
            type="button"
            className="btn-icon-medium"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" className="size-6" />
          </button>

          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img alt="" src={avatarUrl} className="size-8 rounded-full" />
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 dark:ring-gray-700 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {userNavigation.map((item) => (
                <MenuItem key={item.name}>
                  {item.name === 'Sign out' ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-700 data-[focus]:outline-none"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-700 data-[focus]:outline-none"
                    >
                      {item.name}
                    </a>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>
       
        <div className="-mr-2 flex items-center sm:hidden">
          {/* Mobile menu button */}
          <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white dark:bg-gray-800 p-2 text-gray-400 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-500 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel className="sm:hidden">
      <div className="space-y-1 pb-3 pt-2">
        {navigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as="a"
            href={item.href}
            aria-current={item.current ? 'page' : undefined}
            className={classNames(
              item.current
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                : 'border-transparent text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white',
              'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
            )}
          >
            {item.name}
          </DisclosureButton>
        ))}
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 pb-3 pt-4">
        <div className="flex items-center px-4">
          <div className="shrink-0">
            <img alt="" src={avatarUrl} className="size-10 rounded-full" />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-gray-800 dark:text-white">{user.name}</div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">{user.email}</div>
          </div>
          <div className="ml-auto flex items-center space-x-3">
            <ThemeToggleGlobal />
            <button
              type="button"
              className="btn-icon-medium shrink-0"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          {userNavigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
  )
}
