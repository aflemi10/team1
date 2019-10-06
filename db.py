from elasticsearch import Elasticsearch,NotFoundError

#creating a class using elasticsearch
class userdatabase:

    #constructor for a given or a default host
    def __init__(self,host):
        print("-------DATABASE UP---------")
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
                return 0
            else:
                return 2
        except NotFoundError:
            return 1
        except Exception as e:
            print(e)
            return -1

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
                    }
                res = self.client.index(index=username,id=1, body=doc)
                print(res)
                return 0
            else:
                return 1
        except Exception as e:
            print(e)
            return -1

    def userexists(self, username):
        return self.client.indices.exists(index=username)
