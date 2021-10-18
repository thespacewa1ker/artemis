import React from "react";
import '../stylesheets/index.css'
import { Fragment, useState } from 'react'
import NumberFormat from 'react-number-format'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import axios from 'axios';

const getcoins = await axios.get(COINS_URL)

const coins = getcoins.data

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Convert() {
  const [selectedOne, setSelectedOne] = useState([])
  const [selected, setSelected] = useState([])
  const [exchange, setExchange] = useState({});
  const [amount, setAmount] = useState('');


  async function onSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.get(CONVERSTION_URL + `coin_1=${selectedOne.name}&coin_2=${selected.name}&amount=${amount}`);
      const coin_response = await response.data[0];
      setExchange({
        coin_1: selectedOne.name,
        coin_2: selected.name,
        amount: amount,
        symbol_1:coin_response['symbol1'],
        symbol_2:coin_response['symbol2'],
        image1: coin_response['img1'],
        image2: coin_response['img2'],
        z_value :coin_response['Z_value'],
        current_price:coin_response['current_price'],
        marketCap_1:coin_response['marketCap1'],
        marketCap_2:coin_response['marketCap2'],
        marketPrice:coin_response['market_price'],
        result: coin_response['coin_amount'],
      });
      console.log(exchange.image1)
    } catch (err) {
      console.log(`Unable to fetch curriencies: ${err}`);
    }
  }

  function swapConversion() {
    setSelectedOne(selected);
    setSelected(selectedOne);
  }


  return (
    <div>
      <section className="pt-14 bg-grey px-6 pb-14 shadow">
        <h1 className="text-black text-2xl mb-10 font-semibold">Show the value of A with the market cap of B</h1>
        <form onSubmit={onSubmit}>
          <div className="flex flex-row mb-6 gap-5 items-end">
            <div className="flex-1">
              <label className="font-bold text-sm mb-1 block px-6" htmlFor="text">
                Amount
              </label>
              <input
                type="text"
                className="focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800 w-full border-2 rounded-sm min-h-40 pl-3 pr-10 py-2"
                value={amount}
                size="lg"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="flex-1">
              <Listbox value={selectedOne} onChange={setSelectedOne}>
                <Listbox.Label className="block text-sm font-bold text-gray-700 px-9">Select A</Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="flex items-center">
                      <img src={selectedOne.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                      <span className="ml-3 block truncate">{selectedOne.name}</span>
                    </span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>

                  <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {coins.map((cryptoCoin) => (
                        <Listbox.Option
                          key={cryptoCoin.id}
                          className={({ active }) =>
                            classNames(
                              active ? 'text-white bg-indigo-600' : 'text-gray-900',
                              'cursor-default select-none relative py-2 pl-3 pr-9'
                            )
                          }
                          value={cryptoCoin}
                        >
                          {({ selectedOne, active }) => (
                            <>
                              <div className="flex items-center">
                                <img src={cryptoCoin.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                <span className={classNames(selectedOne ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                  {cryptoCoin.name}
                                </span>
                              </div>

                              {selectedOne ? (
                                <span
                                  className={classNames(
                                    active ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                  )}
                                >
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div
              onClick={() => swapConversion()}
              className="border-2 border-blue-500 rounded-full p-3 cursor-pointer hover:border-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 17"
                aria-hidden="true"

                className="w-4 h-4 text-green-500 miscellany___StyledIconSwap-sc-1r08bla-1 fZJuOo"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="flex-1">
              <Listbox value={selected} onChange={setSelected}>
                <Listbox.Label className="block text-sm font-bold text-gray-700 px-9">Select B</Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="flex items-center">
                      <img src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                      <span className="ml-3 block truncate">{selected.name}</span>
                    </span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>

                  <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {coins.map((cryptoCoin) => (
                        <Listbox.Option
                          key={cryptoCoin.id}
                          className={({ active }) =>
                            classNames(
                              active ? 'text-white bg-indigo-600' : 'text-gray-900',
                              'cursor-default select-none relative py-2 pl-3 pr-9'
                            )
                          }
                          value={cryptoCoin}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <img src={cryptoCoin.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                  {cryptoCoin.name}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                  )}
                                >
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>

          <div className="flex justify-between mt-10  items-center">
            <div>
              <div>
                <span>
                <div className="font-semibold text-sm text-gray-500">
                  <div className="flex gap-1 font-semibold text-sm text-gray-500">
                      <p>
                        <span className="ml-1 block truncate">Market cap of {exchange.symbol_1} wrt {exchange.symbol_2}</span>
                        <span className="flex items-center">
                          <img src={exchange.image1} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                          <span className="ml-3 block truncate"><NumberFormat value={exchange.current_price} displayType={'text'} thousandSeparator={true} prefix={'$ '} /></span>
                          <span className="ml-3 block truncate">({exchange.marketPrice})</span>
                        </span>
                      </p>
                    </div>
                    <div>

                      <h5>Z value= <span>{exchange.z_value}*{exchange.symbol_1}</span></h5>

                      <h6>Market caps</h6>
                      
                        <span className="flex items-center">
                          <img src={exchange.image1} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                          <span className="ml-3 block truncate"><NumberFormat value={exchange.marketCap_1} displayType={'text'} thousandSeparator={true} prefix={'$ '} /></span>
                        </span>
                        <span className="flex items-center">
                          <img src={exchange.image2} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                          <span className="ml-3 block truncate"><NumberFormat value={exchange.marketCap_2} displayType={'text'} thousandSeparator={true} prefix={'$ '} /></span>
                        </span>
                     
                    </div>
                  </div>
                </span>

              </div>
            </div>
            <div>
              <button
                className='inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-md font-bold rounded-md text-white bg-blue-500 hover:bg-blue-600'
                
              >
                Convert
              </button>
            </div>
          </div>

        </form>
      </section>
      <div>
      
      </div>
      

    </div>
    
  )
}

export default Convert
