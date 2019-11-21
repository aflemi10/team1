from elasticsearch import Elasticsearch,NotFoundError
import pprint,os
from datetime import datetime
import scrape
import re
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

    def add_item(self,username,name,expiration,quantity):
        try:
            res = self.get_user_full(username)
            assert self.check_login_status(username)
            items = res['user_profile']['items']
            weight_data = res['user_profile']['weight_data']
            cal_data = res['user_profile']['cal_data']
            newitem={
                'name':name,
                'expiration':expiration,
                'quantity':quantity
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

    def construct_test_user(self):
        doc = {
            'password': "password",
            'is_logged_in': "True",
            'user_profile':{
                'username':"test-user",
                'items': [],
                'weight_data': [{
                    'datetime':"11/21/2019",
                    'weight':"100"
                    },
                    {
                    'datetime':"11/22/2019",
                    'weight':"200"
                    },
                    {
                        'datetime':"11/23/2019",
                        'weight':"300"
                    },
                    {
                        'datetime':"11/24/2018",
                        'weight':"400"
                    },
                    {
                        'datetime':"11/20/2019",
                        'weight':"500"
                    },
                    {
                        'datetime':"11/18/2019",
                        'weight':"60"
                    }],
                'cal_data': [{
                    'datetime':"11/22/2019",
                    'calories':"100"
                    },
                    {
                    'datetime':"11/22/2019",
                    'calories':"200"
                    },
                    {
                        'datetime':"10/23/2018",
                        'calories':"300"
                    },
                    {
                        'datetime':"11/24/2018",
                        'calories':"400"
                    },
                    {
                        'datetime':"11/23/2019",
                        'calories':"500"
                    },
                    {
                        'datetime':"11/20/2019",
                        'calories':"600"
                    }
                ]
                }
            }
        res = self.client.index(index="test-user",id=1, body=doc)

    def date1_less_than_date2(self,date_str1,date_str2):
        ds1y=int(date_str1.split("/")[2])
        ds2y=int(date_str2.split("/")[2])

        ds1m=int(date_str1.split("/")[0])
        ds2m=int(date_str2.split("/")[0])

        ds1d=int(date_str1.split("/")[1])
        ds2d=int(date_str2.split("/")[1])


        #compare years
        if(ds1y != ds2y):
            if ds1y<ds2y:
                return True
            else:
                return False

        #compare months
        if(ds1m != ds2m):
            if ds1m<ds2m:
                return True
            else:
                return False

        #compare days
        if(ds1d != ds2d):
            if ds1d<ds2d:
                return True
            else:
                return False
        return False

    def dates_are_neighbors(self,date_str1,date_str2):
        ds1y=int(date_str1.split("/")[2])
        ds2y=int(date_str2.split("/")[2])

        ds1m=int(date_str1.split("/")[0])
        ds2m=int(date_str2.split("/")[0])

        ds1d=int(date_str1.split("/")[1])
        ds2d=int(date_str2.split("/")[1])

        if(ds1y != ds2y):
            return False

        #compare months
        if(ds1m != ds2m):
            return False

        #compare days
        if(ds1d+1 == ds2d or ds1d==ds2d+1):
                return True


        return False

    def process_empty_data_points(self,date_array,data_array):
        assert len(date_array) == len(data_array)
        for x in range(len(date_array)-1):
            while not self.dates_are_neighbors(date_array[x],date_array[x+1]):
                new_date_day=int(date_array[x].split("/")[1])+1
                new_date_month=date_array[x].split("/")[0]
                new_date_year=date_array[x].split("/")[2]
                new_date = str(new_date_month)+"/"+str(new_date_day)+"/"+str(new_date_year)
                date_array.insert(x+1,new_date)
                data_array.insert(x+1,0)
        return date_array,data_array

    def get_formatted_cal_data(self,username):
        try:
            res = self.get_user_full(username)
            assert self.check_login_status(username)
            cal_data = res['user_profile']
            cal_data = cal_data['cal_data']
            date_array = []
            output_array = []

            #
            for dp in cal_data:
                current_date = dp['datetime']
                if current_date in date_array:
                    date_array.index(current_date)
                else:
                    date_array.append(current_date)

            for x in date_array:
                output_array.append(0)



            for dp in cal_data:
                current_date = dp['datetime']
                cals = dp['calories']
                i = date_array.index(current_date)
                output_array[i]+=int(cals)



            for j in range(len(date_array)):
                for i in range(len(date_array)-1):
                    res = self.date1_less_than_date2(date_array[i],date_array[i+1])
                    if not res:
                        temp = date_array[i]
                        temp2 = output_array[i]

                        date_array[i]=date_array[i+1]
                        date_array[i+1]=temp

                        output_array[i]=output_array[i+1]
                        output_array[i+1] = temp2

            #print(date_array)
            #print(output_array)

            #finding minimum date based on largest_date
            largest_date = date_array[len(date_array)-1]
            minimum_date = int(largest_date.split("/")[1])-7
            if minimum_date < 1:
                minimum_date=(31+minimum_date)

            month = largest_date.split("/")[0]
            year = largest_date.split("/")[2]

            minimum_date=(f'{month}/{minimum_date}/{year}')

            date_array2=[]
            output_array2=[]
            for date in date_array:
                #print(f'minimum_Date:{minimum_date}------date:{date}')
                if self.date1_less_than_date2(minimum_date,date):
                    #print("date1 greater than date 2")
                    date_array2.append(date)
                    output_array2.append(output_array[date_array.index(date)])

            date_array=date_array2
            output_array=output_array2

            date_array,output_array=self.process_empty_data_points(date_array,output_array)
            #insert 0s for data points

            if(len(output_array)>=7):
                output_array=output_array[len(output_array)-7:]

            if len(output_array)<7:
                for x in range(7-len(output_array)):
                    output_array.insert(0,0)

            return(str(output_array))


        except Exception as e:
            raise e
    #returns
    # -1 = error
    #  0 = user added
    #  1 = user already exists
    #  2 = No capital letters in password
    #  3 = No lowercase letters in password
    #  4 = No numbers in password
    #  5 = Password too short
    def adduser(self,username,password):
        if(password.islower()):
            return 2

        if(password.isupper()):
            return 3

        if (not bool(re.search(r'\d', password))):
            return 4

        if len(password)<6:
            return 5

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
            date_time = now.strftime("%m/%d/%Y")
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
            date_time = now.strftime("%m/%d/%Y")
            for x in range(len(weight_data)):
                if weight_data[x]['datetime'] == date_time:
                    return -1
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


    def get_formatted_weight_data(self,username):
        try:
            res = self.get_user_full(username)
            assert self.check_login_status(username)
            weight_data = res['user_profile']
            weight_data = weight_data['weight_data']
            date_array = []
            output_array = []

            #
            for dp in weight_data:
                current_date = dp['datetime']
                if current_date in date_array:
                    date_array.index(current_date)
                else:
                    date_array.append(current_date)

            for x in date_array:
                output_array.append(0)



            for dp in weight_data:
                current_date = dp['datetime']
                #print(dp)
                weight = dp['weight']
                i = date_array.index(current_date)
                output_array[i]=weight


            for j in range(len(date_array)):
                for i in range(len(date_array)-1):
                    res = self.date1_less_than_date2(date_array[i],date_array[i+1])
                    if not res:
                        temp = date_array[i]
                        temp2 = output_array[i]

                        date_array[i]=date_array[i+1]
                        date_array[i+1]=temp

                        output_array[i]=output_array[i+1]
                        output_array[i+1] = temp2

            #print(date_array)
            #print(output_array)

            #finding minimum date based on largest_date
            largest_date = date_array[len(date_array)-1]
            minimum_date = int(largest_date.split("/")[1])-7
            if minimum_date < 1:
                minimum_date=(31+minimum_date)

            month = largest_date.split("/")[0]
            year = largest_date.split("/")[2]

            minimum_date=(f'{month}/{minimum_date}/{year}')

            date_array2=[]
            output_array2=[]
            for date in date_array:
                #print(f'minimum_Date:{minimum_date}------date:{date}')
                if self.date1_less_than_date2(minimum_date,date):
                    #print("date1 greater than date 2")
                    date_array2.append(date)
                    output_array2.append(output_array[date_array.index(date)])

            date_array=date_array2
            output_array=output_array2

            date_array,output_array=self.process_empty_data_points(date_array,output_array)
            #insert 0s for data points

            if(len(output_array)>=7):
                output_array=output_array[len(output_array)-7:]

            if len(output_array)<7:
                for x in range(7-len(output_array)):
                    output_array.insert(0,0)

            print(date_array)
            print(output_array)

            return(str(output_array))


        except Exception as e:
            raise e


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
            return res['_source']['pricing_info']

    def itemexists(self, item_zip):
        return self.client.indices.exists(index=item_zip)

    def search_item(self,item_zip):
        if self.itemexists(item_zip):
            return self.client.get(index=item_zip,id=1)
        else:
             return None

udb = userdb(None)
res =udb.construct_test_user()
res = udb.add_weight_data("test-user",100)
print(res)
res =udb.add_weight_data("test-user",400)
print(res)
res =udb.add_weight_data("test-user",500)
print(res)
res =udb.add_weight_data("test-user",400)
print(res)
res = udb.get_formatted_weight_data("test-user")
("test-user")
pprint.pprint(res)
