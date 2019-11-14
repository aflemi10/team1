from elasticsearch import Elasticsearch,NotFoundError

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
            dbpassword = res['_source']['password']
            items = res["_source"]['user_profile']['items']
            if dbpassword == password:
                doc = {
                    'password': dbpassword,
                    'is_logged_in': "True",
                    'user_profile':{
                        'username':username,
                        'items':items
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

            doc = {
                'password': info['password'],
                'is_logged_in': "False",
                'user_profile':{
                    'username':username,
                    'items': info['user_profile']['items']
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

    def add_item(self,username,items):
        try:
            res = self.get_user_full(username)
            assert self.check_login_status(username)
            items = res['user_profile']['items']
            doc = {
                'password': res['password'],
                'is_logged_in': "True",
                'user_profile':{
                    'username':username,
                    'items':res['user_profile']['items']
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
                    'username':username,
                    'password': password,
                    'is_logged_in': "False",
                    'user_profile':{
                        'items':""
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

    def newitem(self,name,itemnum,price,quantity):
        if not self.itemexists(itemnum):
            doc = {
                'item_name': item_name,
                'item_num': itemnum,
                'price':price,
                'quantity':quantity
            }
            res = self.client.index(index=itemnum, id=1, body='item')
           # print(res)
            return 0
        else:
            return 1


    def get_new_item_num(self):
        self.items+=1
        return self.items



    def searchitem(self,name):
        return None
