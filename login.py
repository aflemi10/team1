from flask import Flask, flash, redirect, render_template, request, session,url_for
from db import userdb,itemdb
import hashlib

app = Flask(__name__)
users = userdb(None)
items = itemdb(None)

@app.route('/')
def goto_login():
    #TODO : get page to redirect straight to login and get sessions to work
    return redirect(url_for('login'))

@app.route('/createuser',methods=['GET'])
def show_create_account():
    return render_template('adduser.html')

@app.route('/createuser',methods=['POST'])
def get_new_account_info():
    username = request.form['username']
    password = request.form['password']
    vpassword = request.form['verify password']

    if len(username) == 0:
        return render_template('adduser.html',message = "Please enter a username")
    if len(password) == 0:
        return render_template('adduser.html', message="Please enter a password",userin=username)
    if len(vpassword) == 0:
        return render_template('adduser.html', message="Please verify password",userin=username)
    if len(password) < 6:
        return render_template('adduser.html', message="Password must be longer than 6 characters",userin=username)
    if password != vpassword:
        return render_template('adduser.html', message="passwords do not match",userin=username)
    if users.userexists(username):
        return render_template('adduser.html', message="username entered is already in use")

    #redirect back to login page
    res = users.adduser(username, password)
    assert res == 0
    return render_template('login.html',message="User account created successfully")

@app.route('/login',methods=['GET'])
def show_login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def do_login():
    try:
        #username = request.form['username']
        #password = request.form['password']
        username = request.args.get('username')
        password = request.args.get('password')
        res=users.login(username,password)
        # TODO : add more verification to username and password if needed
        # TODO : hash and salt password inputs before anything else

        if res == -1:
            #TODO : Make an error page and redirect to it
            return("error page")

        if res == 0:
            #TODO : Log user in using session
            #TODO : Make a user home page and redirect to it
            res =users.get_user_full(username)
            return res['user_profile']

        if res == 1:
            return render_template('login.html',message = "Username not found")

        if res == 2:
            return render_template('login.html',message = "Incorrect password",userin = username)
    except Exception as e:
        return e


@app.route('/logout', methods=['POST'])
def do_logout():
    username = request.args.get('username')
    res = users.logout(username)

    if res == -1:
        return("Error page")
    if res == 0:
        return("user logged out")



@app.route('/updatezip', methods=['POST'])
def updatezip():
    return "Endpoint not constructed yet"


@app.route('/items/add', methods=['POST'])
def add_items():
    username = request.args.get('username')
    items = request.args.get('items')

    return "Endpoint not constructed yet"



@app.route('/items/remove', methods=['POST'])
def remove_items():
    return "Endpoint not constructed yet"


@app.route('/items/get', methods=['GET'])
def get_items():
    username = request.args.get('username')
    res = users.get_items(username)
    print(res)
    return res

@app.route('/nutritional/weight', methods=['GET'])
def add_weight():
    return "Endpoint not constructed yet"


@app.route('/nutritional/calories', methods=['GET'])
def add_calories():
    return "Endpoint not constructed yet"


@app.route('/nutritional/weight', methods=['POST'])
def get_weight():
    return "Endpoint not constructed yet"


@app.route('/nutritional/calories', methods=['POST'])
def get_calories():
    return "Endpoint not constructed yet"






if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0', port=5000)
