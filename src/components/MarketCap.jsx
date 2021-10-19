import axios from "axios";
import NumberFormat from 'react-number-format';
import React, { useState,useEffect } from "react";


export default function MarketCap(props) {
    const [val,setVal]=useState({coin1:{id:'null',image:'null',name:'null',market_cap_rank:'null',market_cap:'null',current_price:'null',low_24h:'null'}
    ,coin2:{id:'null',image:'null',name:'null',market_cap_rank:'null',market_cap:'null',current_price:'null',low_24h:'null'},coin3:{id:'null',image:'null',name:'null',market_cap_rank:'null',market_cap:'null',current_price:'null',low_24h:'null'},coin4:{id:'null',image:'null',name:'null',market_cap_rank:'null',market_cap:'null',current_price:'null',low_24h:'null'},coin5:{id:'null',image:'null',name:'null',market_cap_rank:'null',market_cap:'null',current_price:'null',low_24h:'null'}})
    const catprops = props.match.params.id
    async function apiCall(id){
        
        const {data} =await axios.get(MARKETCAP_INFO)
        console.log(data)
        
        // const categoryData=await response.data

        setVal ({
            coin1:data[0],
            coin2:data[1],
            coin3:data[2],
            coin4:data[3],
            coin5:data[4],
        })
}
    useEffect(()=>{
    apiCall(catprops)
},[])
    
 
return (
    <div>
      <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Market Cap/Rank
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    current price/low_24h
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={val.coin1.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{val.coin1.name}</div>
                            
                          </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm-bold text-gray-500"><NumberFormat value={val.coin1.market_cap} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div> 
                    <div className="text-sm-bold text-gray-500">{val.coin1.market_cap_rank}</div> 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm-bold text-gray-500"><NumberFormat value={val.coin1.current_price} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div>
                        <div className="text-sm-bold text-gray-500"><NumberFormat value={val.coin1.low_24h} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div>
                    </td>
              </tr>
              <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={val.coin2.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{val.coin2.name}</div>
                          </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm-bold text-gray-500"><NumberFormat value={val.coin2.market_cap} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div> 
                    <div className="text-sm-bold text-gray-500">{val.coin2.market_cap_rank}</div> 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm-bold text-gray-500"><NumberFormat value={val.coin2.current_price} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div>
                        <div className="text-sm-bold text-gray-500"><NumberFormat value={val.coin2.low_24h} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div>
                    </td>
              </tr>
              <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={val.coin3.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{val.coin3.name}</div>
                          </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm-bold text-gray-500"><NumberFormat value={val.coin3.market_cap} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div> 
                    <div className="text-sm-bold text-gray-500">{val.coin3.market_cap_rank}</div> 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm-bold text-gray-500"><NumberFormat value={val.coin3.current_price} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div>
                        <div className="text-sm-bold text-gray-500"><NumberFormat value={val.coin3.low_24h} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div>
                    </td>
              </tr>
              <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={val.coin4.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{val.coin4.name}</div>
                            
                          </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm-bold text-gray-500"><NumberFormat value={val.coin4.market_cap} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div> 
                    <div className="text-sm-bold text-gray-500">{val.coin4.market_cap_rank}</div> 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm-bold text-gray-500"><NumberFormat value={val.coin4.current_price} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div>
                        <div className="text-sm-bold text-gray-500"><NumberFormat value={val.coin4.low_24h} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div>
                    </td>
              </tr>
              <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={val.coin5.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{val.coin5.name}</div>
                          </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm-bold text-gray-500"><NumberFormat value={val.coin5.market_cap} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div> 
                    <div className="text-sm-bold text-gray-500">{val.coin5.market_cap_rank}</div> 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm-bold text-gray-500"><NumberFormat value={val.coin5.current_price} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div>
                        <div className="text-sm-bold text-gray-500"><NumberFormat value={val.coin5.low_24h} displayType={'text'} thousandSeparator={true} prefix={'$ '}/></div>
                    </td>
              </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
   
    </div>
 
)

}


