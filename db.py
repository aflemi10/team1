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
            if dbpassword == password:
                doc = {
                    'username':username,
                    'password': password,
                    'is_logged_in': "True",
                    'user_profile':{
                        'items':[]
                        }
                    }
                res = self.client.index(index=username,id=1, body=doc)
                return 0
            else:
                return 2
        except NotFoundError:
            return 1
        except Exception as e:
            print(e)
            return -1
    
    def logout(self,username):
        try:
            assert check_login_status(username)
            doc = {
                'username':username,
                'password': password,
                'is_logged_in': "False",
                'items':[]
                }
            res = self.client.index(index=username,id=1, body=doc)
        except Exception as e:
            return False

    def get_user(self,username):
        try:
            #print(self.check_login_status(username))
            assert self.check_login_status(username)
            res = self.client.get(index=username,id=1)
            return res
        except Exception as e:
            raise e
            

    def check_login_status(self,username):
        try:
            res = self.client.get(index=username,id=1)
            #print(res)
            assert res['_source']['is_logged_in']=="True"
            #print("---true---")
            return True
        except exception as e:
            #print("---False---")
            return False

    

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
                        'items':[]
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

    def userexists(self, username):
        return self.client.indices.exists(index=username)


class itemdb:
    def __init__(self,host):
        print("-------ITEM DATABASE UP---------")
        if host==None:
            self.client=Elasticsearch('localhost')
        else:
            self.client=Elasticsearch(host)

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


