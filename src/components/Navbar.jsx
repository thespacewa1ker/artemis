import React from "react";
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import axios from "axios";
import { useHistory } from "react-router-dom";




const response = await axios.get('https://api.coingecko.com/api/v3/coins/categories/list')
const category_list=response.data;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Navbar({ fixed }) {

  const history = useHistory();


  const [navbarOpen, setNavbarOpen] = React.useState(false);

  async function onChangeD(e){
      let selectdrop = e.target.value;
      history.push(`/categories/` + selectdrop)
      location.reload()
  }
 
  
  return (
    <div>
      <nav className="relative flex flex-wrap items-center justify-between px-4 py-3 bg-indigo-700 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#pablo"
            >
              Artemis Network
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div>
            {/* <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                  Categories
                  <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="overflow-y-scroll h-80 py-1">
                {category_list.map((category_id) => (
                   <div key={category_list.indexOf(category_id)+1}>
                    <Menu.Item>
                      {({ active }) => (
                       <div className={classNames(
                        active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}>
                          <Link to={`/categories/${category_id['category_id']}`}>{category_id.name}</Link>
                      </div>
                      )}
                    </Menu.Item>
                  </div>
                ))}
                </div>
                </Menu.Items>
              </Transition>
            </Menu> */}
          </div>
          <div>
            <select className="block w-52 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" onChange={e => onChangeD(e)}>
              <option value="">
                Categories
              </option>
              {category_list.map((category_id) => (
              <option key={category_id.name} value={category_id.category_id}>
                {category_id.category_id}
              </option>
              ))}
            </select>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="http://localhost:3000/categories/smart-contract-platform"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Smart Contract</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="http://localhost:3000/categories/decentralized-finance-defi"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span className="ml-2">DeFi</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="http://localhost:3000/categories/non-fungible-tokens-nft"
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i><span className="ml-2">NFT</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
