from elasticsearch import Elasticsearch,NotFoundError
import pprint,os
from datetime import datetime
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
            res = res["items"]
            res =str(res)
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
            new_cal_data={
                'datetime',datetime.now(),
                'calories',weight
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
            new_weight_data={
                'datetime',datetime.now(),
                'weight',weight
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

    def get_weight(username):
        try:
            assert self.check_login_status(username)
            res = self.get_user_full(username)
            res = res['user_profile']
            res = res["weight_data"]
            res =str(res)
            return res
        except Exception as e:
            print(e)


    def get_calories(username):
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

    #Should be redone
    def get_item_by_name(self, item_name):
        res =self.client.search(index="*", body={"query": {"match": {'name': item_name}}})
        print("---")
        pprint.pprint(res)
        print("---")
        return res

    def newitem(self,item_name,price,quantity):
        item_num = self.get_new_item_num()
        print(item_num)
        if not self.client.indices.exists(item_num):
            doc = {
                'item_name': item_name,
                'price':price,
                'quantity':quantity
            }
            res = self.client.index(index=item_num, id=1, body=doc)
           # print(res)
            return item_num
        else:
            return -1

    def print_item_full(self,item_num):
        res =self.client.get(index=item_num,id=1)
        pprint.pprint(res['_source'])

    def get_new_item_num(self):
        self.items+=1
        return self.items

    def get_item_full(self, itemnum):
        try:
            res = self.client.get(index=itemnum, id=1)
            res = res
            return res
        except Exception as e:
            raise e


    def searchitem(self,name):
        return None

def test():
    os.system("curl -XDELETE localhost:9200/*")
    udb = userdb(None)
    #login user
    res=udb.adduser("allen","oofoof")
    res=udb.login("allen","oofoof")
    res = udb.clear_fields("allen")
    res=udb.add_item("allen","1")
    udb.print_user_pretty("allen")
    print("\n")
    res=udb.add_item("allen","2")
    udb.print_user_pretty("allen")


    idb = itemdb(None)
    res = idb.newitem("apples","5.99","3")
    print(res)
    print("---")
    res = idb.newitem("oranges","3.00","12")
    print(res)
    idb.print_item_full(1)
    idb.print_item_full(2)

    idb.get_item_by_name("apples")

    os.system("curl -XDELETE localhost:9200/*")
    #
