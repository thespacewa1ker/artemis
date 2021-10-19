from flask import Flask
import requests
from flask import render_template,request,json
from flask_cors import CORS,cross_origin
from Conversion import *
from lists import *


app = Flask(__name__)





"""Get all the crypto coins"""

@app.route('/Coins')
@cross_origin()
def Coinlist():
    coins=[]
    for index in range(1,2):
        coinsList = requests.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page='+f'{index}'+'&sparkline=false').json()
        for coinindex in range(len(coinsList)):
            Convert_drop_down = {}
            Convert_drop_down['id']=coinsList[coinindex]['id']
            Convert_drop_down['name']=coinsList[coinindex]['name']
            Convert_drop_down['avatar']=coinsList[coinindex]['image']
            coins.append(Convert_drop_down)

    result = {'coinList': coins}

    return json.jsonify(result['coinList'])






"""Get particular Category coins"""

@app.route('/category_coins')
@cross_origin()
def categoryCoins():
    
    category = request.args['id']
    coins=[]
    for index in range(1,2):
        coinsList = requests.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category='+f'{category}'+'&order=market_cap_desc&per_page=100&page='+f'{index}'+'&sparkline=false').json()
        for coinindex in range(len(coinsList)):
            Convert_drop_down = {}
            Convert_drop_down['id']=coinsList[coinindex]['id']
            Convert_drop_down['name']=coinsList[coinindex]['name']
            Convert_drop_down['avatar']=coinsList[coinindex]['image']
            coins.append(Convert_drop_down)

    result = {'coinList': coins}

    return json.jsonify(result)









#end point for view page
@app.route('/convert')
@cross_origin()
def index():

    curr_list = coinId
    Coin_name_id_dict = {}
    curr_symbol = [] 

    for index in range(1,4):
        coinsList = requests.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page='+f'{index}'+'&sparkline=false').json()

        for coinindex in range(len(coinsList)):
            Coin_name_id_dict[coinsList[coinindex]['name']] =coinsList[coinindex]['id']
            curr_symbol.append(coinsList[coinindex]['symbol'])

    # take input arguments from the user
    end_point_1 = request.args['coin_1']
    end_point_2 = request.args['coin_2']
    coin_amount = request.args['amount']

    end_point_1 = Coin_name_id_dict[str(end_point_1)]
    end_point_2 = Coin_name_id_dict[str(end_point_2)]


    if end_point_1 and end_point_2 and coin_amount:
        # getting market_data of two coins.
        api_path = 'https://api.coingecko.com/api/v3/coins/'
        currency_1 = requests.get(api_path+end_point_1).json()
        currency_2 = requests.get(api_path+end_point_2).json()


        #if marketCap is null take user input
        if currency_1["market_data"]["market_cap"]["usd"]==None:
            currency_1["market_data"]["market_cap"]["usd"]=input("Enter the marketcap for CURR_1: ")
        
        if currency_2["market_data"]["market_cap"]["usd"]==None:
            currency_2["market_data"]["market_cap"]["usd"]=input("Enter the marketcap for CURR_2: ")
        
    
        coin_amount=int(coin_amount)
        coin_1 = Conversion(
            currency_1["market_data"]["current_price"]["usd"],
            currency_1["market_data"]["market_cap"]["usd"],
            currency_1["image"]["small"])
        coin_2 = Conversion(
            currency_2["market_data"]["current_price"]["usd"],
            currency_2["market_data"]["market_cap"]["usd"],
            currency_2["image"]["small"])
       
        symbol = curr_symbol[curr_list.index(end_point_1)].upper()
        symbol_1 = curr_symbol[curr_list.index(end_point_2)].upper()
        res_convert = round(coin_1.convert_current_price(coin_2,coin_amount),2)
        z = round(coin_1.compare_current_price(coin_2)/currency_1["market_data"]['current_price']['usd'],2)

        dct = {'convert_data':[
                    {"current_price": str(f"${coin_1.compare_current_price(coin_2)}"),
                    "market_price": str(f"{coin_1.compare_market_cap(coin_2)}%"),
                    "Z_value":z,
                    "coin_amount":str(f'{res_convert}'),
                    "marketCap1":coin_1.market_cap ,
                    "marketCap2":coin_2.market_cap,
                    "img1":coin_1.image,
                    "img2":coin_2.image,
                    "price1":coin_1.current_price,
                    "price2":coin_2.current_price,
                    "symbol1":symbol,
                    "symbol2":symbol_1
                    }
                ]
            }

        result = dct['convert_data']
        
        return json.jsonify(result)












@app.route('/category')
@cross_origin()
def categories():
    
    category = request.args['id']

    curr_list = coinId
    Coin_name_id_dict = {}
    curr_symbol = [] 

    
    coinsList = requests.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category='+f'{category}'+'&order=market_cap_desc&per_page=100&page=1&sparkline=false').json()

    # for coinindex in range(len(coinsList)):
    #     Coin_name_id_dict[coinsList[coinindex]['name']] =coinsList[coinindex]['id']
    #     curr_symbol.append(coinsList[coinindex]['symbol'])

    # take input arguments from the user
    # end_point_1 = request.args['coin_1']
    # end_point_2 = request.args['coin_2']

    
    # if end_point_1 and end_point_2 :
    #     # getting market_data of two coins.
    #     api_path = 'https://api.coingecko.com/api/v3/coins/'
    #     currency_1 = requests.get(api_path+end_point_1).json()
    #     currency_2 = requests.get(api_path+end_point_2).json()


    #     #if marketCap is null take user input
    #     if currency_1["market_data"]["market_cap"]["usd"]==None:
    #         currency_1["market_data"]["market_cap"]["usd"]=input("Enter the marketcap for CURR_1: ")
        
    #     if currency_2["market_data"]["market_cap"]["usd"]==None:
    #         currency_2["market_data"]["market_cap"]["usd"]=input("Enter the marketcap for CURR_2: ")
        
    
    #     coin_1 = Conversion(
    #         currency_1["market_data"]["current_price"]["usd"],
    #         currency_1["market_data"]["market_cap"]["usd"],
    #         currency_1["image"]["small"])
    #     coin_2 = Conversion(
    #         currency_2["market_data"]["current_price"]["usd"],
    #         currency_2["market_data"]["market_cap"]["usd"],
    #         currency_2["image"]["small"])
       
    #     symbol = curr_symbol[curr_list.index(end_point_1)].upper()
    #     symbol_1 = curr_symbol[curr_list.index(end_point_2)].upper()
       
    #     z = round(coin_1.compare_current_price(coin_2)/currency_1["market_data"]['current_price']['usd'],2)

    #     dct = {'convert_data':[
    #                 {"current_price": str(f"${coin_1.compare_current_price(coin_2)}"),
    #                 "market_price": str(f"{coin_1.compare_market_cap(coin_2)}%"),
    #                 "Z_value":z,
    #                 "marketCap1":coin_1.market_cap ,
    #                 "marketCap2":coin_2.market_cap,
    #                 "img1":coin_1.image,
    #                 "img2":coin_2.image,
    #                 "price1":coin_1.current_price,
    #                 "price2":coin_2.current_price,
    #                 "symbol1":symbol,
    #                 "symbol2":symbol_1
    #                 }
    #             ]
    #         }
    dct={'convert_data':coinsList}

    result= json.jsonify(dct['convert_data'])

    #     return result
    return result















if __name__=="__main__":
    app.run(debug=True)
