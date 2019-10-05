from flask import Flask
from flask import Flask, flash, redirect, render_template, request, session, abort,url_for
import os
from db import userdatabase
import hashlib

app = Flask(__name__)
dbase = userdatabase(None)

@app.route('/')
def goto_login():
    return redirect(url_for('login'))

@app.route('/createaccount',methods=['GET'])
def show_create_account():
    return render_template('adduser.html')

@app.route('/createaccount',methods=['POST'])
def get_new_account_info():
    username = request.form['username']
    password = request.form['password']
    vpassword = request.form['verify password']
    #check if password and vpassword are equal
    #check that username is not already in use
    #add account
    return(f'{username} {password} {vpassword}')

@app.route('/login',methods=['GET'])
def show_login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def do_login():
    username = request.form['username']
    password = request.form['password']
    res=dbase.login(username,password)
    #add more verification to password
    if res == -1:
        #error page
        return("error page")
    if res == 0:
        #user home page
        return("user home page")
    if res == 1:
        #username not found
        #flash incorrect credentials on login page
        return("update login page to let user know credentials are invalid")
    if res == 2:
        return("update login page to let user know credentials are invald")
            #incorrect credentials
            #flash incorrect credentials on login page


if __name__ == "__main__":
    app.secret_key = os.urandom(12)
    app.run(debug=True,host='0.0.0.0', port=5000)
