/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ConnectButton } from '@rainbow-me/rainbowkit'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Search = () => {
    return (<div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
        <div className="w-full">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
                />
            </div>
        </div>
    </div>)
}

export default function Header() {
    return (
        <>
            {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
            <Popover
                as="header"
                className={({ open }) =>
                    classNames(
                        open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
                        'bg-white shadow-sm lg:static lg:overflow-y-visible'
                    )
                }
            >

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between">
                    <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                        <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                            <div className="flex flex-shrink-0 items-center">
                                <a href="#">
                                    <img
                                        className="block h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt="Your Company"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                            <Search />
                        </div>
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                        <ConnectButton />
                    </div>
                </div>
            </Popover>
        </>
    )
}
