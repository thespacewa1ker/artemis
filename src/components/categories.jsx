import React from 'react';
import axios from 'axios'; 
import NumberFormat from 'react-number-format';
import {Link} from 'react-router-dom' 


const response = await axios.get(CATEGORIES_URL)
const category_list=response.data;

function Categories() {
  return (
    <div className="flex flex-col">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-5 lg:px-12">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
              <th
                  scope="col"
                  className="px-10 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-10 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Market Cap/Change_in_cap
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Volume_24h
                </th>
                
              </tr>

            </thead>
            <tbody className="bg-white divide-y divide-gray-200">

              {category_list.map((category_id) => (
                <tr key={category_list.indexOf(category_id)+1}>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-500">{category_list.indexOf(category_id)+1}</div>
                      </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="ml-4">
                      
                        <div className="text-sm font-medium text-gray-500"><Link to={`/categories/${category_id.id}`}>{category_id.name}</Link></div>
                      
                      </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500"><NumberFormat value={category_id.market_cap} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div>
                    <div className="text-sm-bold text-gray-500">{category_id.market_cap_change_24h}</div> 
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500"><NumberFormat value={category_id.volume_24h} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div>   
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}


export default Categories
