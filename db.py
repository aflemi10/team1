from elasticsearch import Elasticsearch,NotFoundError
import pprint,os
from datetime import datetime
import scrape
#creating a class using elasticsearch
class userdb:

    #constructor for a given or a default host
    def __init__(self,host):
        print("-------USER DATABASE UP---------")
        if host==None:
            self.client=Elasticsearch('localhost')
        else:
            self.client=Elasticsearch(host)

    #returns
    # -1 = error
    #  0 = username found and password good
    #  1 = username not found
    #  2 = username found , incorrect password
    def login(self,username,password):
        try:
            res = self.client.get(index=username,id=1)
            assert res['_source']['is_logged_in'] == "False"
            dbpassword = res['_source']['password']
            items = res["_source"]['user_profile']['items']
            weight_data = res["_source"]['user_profile']['weight_data']
            cal_data = res["_source"]['user_profile']['cal_data']
            if dbpassword == password:
                doc = {
                    'password': dbpassword,
                    'is_logged_in': "True",
                    'user_profile':{
                        'username':username,
                        'items':items,
                        'weight_data': weight_data,
                        'cal_data': cal_data
                        }
                    }
                res = self.client.index(index=username,id=1, body=doc)
                return 0
            else:
                return 2
        except NotFoundError:
            print(f'{username} not found')
            return 1
        except Exception as e:
            print(e)
            return -1


    #returns
    # 1 - user cannot be logged out, either not logged in or couldnot be found
    # 0 - user was logged out successfully
    def logout(self,username):
        try:
            assert self.check_login_status(username)
            info=self.get_user_full(username)
            items = info['user_profile']['items']
            weight_data = info['user_profile']['weight_data']
            cal_data = info['user_profile']['cal_data']
            doc = {
                'password': info['password'],
                'is_logged_in': "False",
                'user_profile':{
                    'username':username,
                    'items': items,
                    'weight_data': weight_data,
                    'cal_data': cal_data
                    }
                }
            res = self.client.index(index=username,id=1, body=doc)
            return 0
        except Exception as e:
            print("\n")
            print(e)
            return -1


    #backend use only
    def get_user_pword(self,username):
        try:
            #print(self.check_login_status(username)
            res = self.client.get(index=username,id=1)
            res = res['_source']['password']
            return res
        except Exception as e:
            raise e


    # db use only
    # returns full user account
    def get_user_full(self,username):
        try:
            #print(self.check_login_status(username))
            assert self.check_login_status(username)
            res = self.client.get(index=username,id=1)
            res = res['_source']
            return res
        except Exception as e:
            raise e

    # db use only
    # returns true if user is currently logged in
    # returns false if not
    def check_login_status(self,username):
        try:
            res = self.client.get(index=username,id=1)
            #print(res)
            assert res['_source']['is_logged_in']=="True"
            #print("---true---")
            return True
        except Exception as e:
            #print("---False---")
            return False

    # returns users items
    def get_items(self,username):
        try:
            assert self.check_login_status(username)
            res = self.get_user_full(username)
            res = res['user_profile']
            res = res['items']
            return res
        except Exception as e:
            print(e)

    def add_item(self,username,name,expiration,price):
        try:
            res = self.get_user_full(username)
            assert self.check_login_status(username)
            items = res['user_profile']['items']
            weight_data = res['user_profile']['weight_data']
            cal_data = res['user_profile']['cal_data']
            newitem={
                'name':name,
                'expiration':expiration,
                'price':price
            }

            items.append(newitem)
            doc = {
                'password': res['password'],
                'is_logged_in': "True",
                'user_profile':{
                    'username':username,
                    'items': items,
                    'weight_data': weight_data,
                    'cal_data': cal_data
                    }
                }
            res = self.client.index(index=username,id=1, body=doc)
            return 0
        except Exception as e:
            return 1

    def clear_fields(self,username):
        try:
            res = self.get_user_full(username)
            assert self.check_login_status(username)
            doc = {
                'password': res['password'],
                'is_logged_in': "True",
                'user_profile':{
                    'username':username,
                    'items': [],
                    'weight_data': [],
                    'cal_data': []
                    }
                }
            res = self.client.index(index=username,id=1, body=doc)
            return 0
        except Exception as e:
            return 1



    #returns
    # -1 = error
    #  0 = user added
    #  1 = user already exists
    def adduser(self,username,password):
        try:
            if not self.userexists(username):
                doc = {
                    'password': password,
                    'is_logged_in': "False",
                    'user_profile': {
                        'username': username,
                        'items': [],
                        'weight_data': [],
                        'cal_data': []
                    }
                }
                res = self.client.index(index=username,id=1, body=doc)
               # print(res)
                return 0
            else:
                return 1
        except Exception as e:
            print(e)
            return -1

    def print_user_pretty(self,username):
        res= self.get_user_full(username)
        pprint.pprint(res)

    def add_calorie_data(self,username,calories):
        try:
            res = self.get_user_full(username)
            assert self.check_login_status(username)
            items = res['user_profile']['items']
            weight_data = res['user_profile']['weight_data']
            cal_data = res['user_profile']['cal_data']
            now = datetime.now()
            date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
            new_cal_data={
                'datetime':date_time,
                'calories':calories
            }

            cal_data.append(new_cal_data)
            doc = {
                'password': res['password'],
                'is_logged_in': "True",
                'user_profile':{
                    'username':username,
                    'items': items,
                    'weight_data': weight_data,
                    'cal_data': cal_data
                    }
                }
            res = self.client.index(index=username,id=1, body=doc)
            return 0
        except Exception as e:
            print(e)
            return -1

    def add_weight_data(self,username,weight):
        try:
            res = self.get_user_full(username)
            assert self.check_login_status(username)
            items = res['user_profile']['items']
            weight_data = res['user_profile']['weight_data']
            cal_data = res['user_profile']['cal_data']
            now =datetime.now()
            date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
            new_weight_data={
                'datetime':date_time,
                'weight':weight
            }

            weight_data.append(new_weight_data)
            doc = {
                'password': res['password'],
                'is_logged_in': "True",
                'user_profile':{
                    'username':username,
                    'items': items,
                    'weight_data': weight_data,
                    'cal_data': cal_data
                    }
                }
            res = self.client.index(index=username,id=1, body=doc)
            return 0
        except Exception as e:
            print(e)
            return -1

    def get_weight(self,username):
        try:
            assert self.check_login_status(username)
            res = self.get_user_full(username)
            res = res['user_profile']
            res = res["weight_data"]
            res =str(res)
            return res
        except Exception as e:
            print(e)


    def get_calories(self,username):
        try:
            assert self.check_login_status(username)
            res = self.get_user_full(username)
            res = res['user_profile']
            res = res["cal_data"]
            res =str(res)
            return res
        except Exception as e:
            print(e)

    # db use only
    # returns true if user exists
    # returns false if not
    def userexists(self, username):
        return self.client.indices.exists(index=username)


class itemdb:
    def __init__(self,host):
        print("-------ITEM DATABASE UP---------")
        if host==None:
            self.client=Elasticsearch('localhost')
        else:
            self.client=Elasticsearch(host)
        self.items = 0

    def get_pricing_data(self,item_zip):
        # try searching for data
        # if there return
        # if not there add item-zip to database then scrape
        res = self.search_item(item_zip)
        if res == None:
            print("----------------------not found----------------------")
            now =datetime.now()
            date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
            info = item_zip.split("-")
            res = scrape.scrape(info[0],info[1])
            item = {
                'item_zip':item_zip,
                'timestamp':date_time,
                'pricing_info':res
            }
            self.client.index(index=item_zip,id=1, body=item)
            return res
        else:
            print("-------------------found---------------------")
            return res

    def itemexists(self, item_zip):
        return self.client.indices.exists(index=item_zip)

    def search_item(self,item_zip):
        if self.itemexists(item_zip):
            return self.client.get(index=item_zip,id=1)
        else:
             return None
