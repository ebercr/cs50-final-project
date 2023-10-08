import os

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from passlib.hash import sha256_crypt
from functools import wraps

# Configure application
app = Flask(__name__)

# Create secret key for session
app.secret_key = os.urandom(24)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///final_project.db")

def login_required(f):
    """
    Decorate routes to require login.

    http://flask.pocoo.org/docs/0.12/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function

@app.route("/")
@login_required
def index():
    """Show index page"""

    return render_template("index.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        name = request.form.get("name")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        # Ensure no fields are left and validadte password/confiramtion
        if not username:
            flash("danger", "Must provide username")
            return redirect("/register")
        elif not name:
            flash("danger", "Must provide name")
            return redirect("/register")
        elif not password:
            flash("danger", "Must provide password")
            return redirect("/register")
        elif not confirmation:
            flash("danger", "Must confirm your password")
            return redirect("/register")
        elif  password != confirmation:             
            flash("danger", "The password and confirmation do not match")
            return redirect("/register")
        
        # Ensure if the username is not already taken
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))
        if len(rows) != 0:
            flash("danger", "This username is already taken")
            return redirect("/register")
        
        # Generate a hash of the password
        hashed_password = sha256_crypt.encrypt(password)

        # Add the user to the users database
        db.execute("INSERT INTO users (username, hash, name) VALUES(?,?,?)", username, hashed_password, name)

        # Redirect to login
        flash("success", "Successfully registered")
        return redirect("/login")
    
    else:
        return render_template("register.html")
    

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        # Ensure no fields are left and validadte password/confiramtion
        if not username:
            flash("danger", "Must provide username")
            return redirect("/login")
        elif not password:
            flash("danger", "Must provide password")
            return redirect("/login")

        #
        user = db.execute("SELECT * FROM users WHERE username = ?", username)
    
        if user and sha256_crypt.verify(password, user[0]["hash"]):
            session["user_id"] = user[0]["id"]
            flash("success", "Login successful!")
            return redirect("/")
        else:
            flash("Credenciais inválidas. Tente novamente.", "danger")


    else:
        return render_template("login.html")
    

@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/login")