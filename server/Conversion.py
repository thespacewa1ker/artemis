class Conversion:
    def __init__(self,current_price,market_cap,image):
        self.image = image
        self.current_price = current_price
        self.market_cap = market_cap


    def compare_market_cap(self,coin_2):
        try:
            compare_res = round(((coin_2.market_cap - self.market_cap)/self.market_cap)*100,2)
            return compare_res
        except Exception as e:
            return 0

    def compare_current_price(self,coin_2):
        try:
            market_cap =(self.compare_market_cap(coin_2))
            compare_res = round(self.current_price + (market_cap/100)*self.current_price,2)
            return compare_res
        except:
            return 0

    def get_image(self):
        return self.image
    
    def convert_current_price(self,coin_2,coin_amount):
        return round(coin_amount*self.current_price/coin_2.current_price,2)
    



    






