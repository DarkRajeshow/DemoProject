import React, { useState } from 'react';

import SearchBox from './SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Context } from '../App';
import { useContext } from 'react';

export default function NavBar() {

  let { setSearchQuary, setSelectedGender, activeLink, setActiveLink, setProgress } = useContext(Context);
  let [usermenu, setusermenu] = useState("hidden");
  let links = [{ link: "Home", path: "/" }, { link: "All users", path: "/allusers" }, { link: "About", path: "/about" }]

  let userMenuOpenClose = () => {
    if (usermenu === "hidden") {
      setusermenu("block");
    }
    else {
      setusermenu("hidden");
    }
  }

  let setOutTheBar = () => {
    setProgress(0);
    setProgress(100);
  }
  return (
    <>
      <nav className="bg-gray-800 fixed top-0 w-full z-10">

        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>

                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth
                  ="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Link to={"/newUserData"} onClick={() => {
                setActiveLink("/");
                setOutTheBar();
              }}>
                <div className="flex flex-shrink-0 items-center ">
                  <img className="block h-10 w-10 lg:hidden rounded-lg" src="https://image.lexica.art/full_jpg/2af12d9b-846c-4b8d-a228-f49b6fa8e12a" alt="INoteBook" />
                  <img className="hidden h-10 w-10 lg:block rounded-lg" src="https://image.lexica.art/full_jpg/2af12d9b-846c-4b8d-a228-f49b6fa8e12a" alt="INoteBook" />
                </div>
              </Link>
              <div className={`hidden sm:ml-6 sm:grid grid-flow-col grid-cols-3`}>
                <div className="flex space-x-4 col-span-2">
                  {
                    links.map((link) => {
                      return (
                        <Link to={`${link.path}`} key={link.link} onClick={() => {
                          setActiveLink(link.path)
                          setOutTheBar();
                        }} className={`${activeLink === link.path ? "bg-gray-900" : "bg-transparent"} text-white rounded-md px-3 py-2 text-sm font-medium`} aria-current="page">{link.link}</Link>
                      )
                    })
                  }
                </div>
                {activeLink === "/allusers" && <SearchBox className="col-span-1" setSearchQuary={setSearchQuary} setSelectedGender={setSelectedGender} />}
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth
                  ="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </button>

              {/* Profile dropdown */}
              <div className="relative ml-3">
                <div onClick={userMenuOpenClose}>
                  <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true" >
                    <span className="sr-only">Open user menu</span>
                    <FontAwesomeIcon className="h-8 w-8 rounded-full text-white" icon={faUserShield} />
                  </button>
                </div>

                <div className={`${usermenu} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden" role="menu" aria-orientation="vertical`} aria-labelledby="user-menu-button" tabIndex="-1">
                  <Link to="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</Link>
                  <Link to="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</Link>
                  <Link to="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {/* Mobile menu, show/hide based on menu state. */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            <Link to="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</Link>
            <Link to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</Link>
            <Link to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</Link>
            <Link to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</Link>
          </div>
        </div>
      </nav>
    </>
  )
}
