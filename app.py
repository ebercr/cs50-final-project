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
    """Show register page"""

    if request.method == "POST":
        username = request.form.get("username")
        name = request.form.get("name")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        # Ensure no fields are left and validate password/confiramtion
        if not username:
            flash("danger", "Must provide username")
            return redirect("/register")
        elif not name:
            flash("danger", "Must provide name")
            return redirect("/register")
        elif not all(c.isalpha() or c.isspace() for c in name):
            flash("danger", "The name must contain only letters and spaces")
            return redirect("/register")
        elif not password:
            flash("danger", "Must provide password")
            return redirect("/register")
        elif not confirmation:
            flash("danger", "Must confirm your password")
            return redirect("/register")
        elif password != confirmation:
            flash("danger", "The password and confirmation do not match")
            return redirect("/register")

        # Validate the minimum and maximum length for name, username and password
        if len(username) < 3 or len(username) > 50:
            flash("danger", "Username must be between 3 and 50 characters.")
            return redirect("/register")

        if len(name) < 2 or len(name) > 255:
            flash("danger", "Name must be between 2 and 255 characters.")
            return redirect("/register")

        if len(password) < 8 or len(password) > 128:
            flash("danger", "Password must be between 8 and 128 characters.")
            return redirect("/register")

        # Ensure if the username is not already taken
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", request.form.get("username")
        )
        if len(rows) != 0:
            flash("danger", "This username is already taken")
            return redirect("/register")

        # Generate a hash of the password
        hashed_password = sha256_crypt.encrypt(password)

        # Add the user to the users database
        db.execute(
            "INSERT INTO users (username, hash, name) VALUES(?,?,?)",
            username,
            hashed_password,
            name,
        )

        # Query database for user
        user = db.execute("SELECT * FROM users WHERE username = ?", username)

        # Redirect to Index
        session["user_id"] = user[0]["id"]
        flash("success", f"Successfully registered! Welcome, {name}!")
        return redirect("/")

    else:
        return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    """Show login page"""

    # Check if the user is already authenticated and close the session
    if session.get("user_id") is not None:
        session.clear()

    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        # Ensure no fields are left
        if not username:
            flash("danger", "Must provide username")
            return redirect("/login")
        elif not password:
            flash("danger", "Must provide password")
            return redirect("/login")

        # Query database for user
        user = db.execute("SELECT * FROM users WHERE username = ?", username)

        # Validate password
        if user and sha256_crypt.verify(password, user[0]["hash"]):
            session["user_id"] = user[0]["id"]
            flash("success", f"Login successful! Welcome, {user[0]['name']}!")
            return redirect("/")
        else:
            flash("danger", "Invalid username or password")
            return redirect("/login")

    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/login")


@app.route("/c")
@login_required
def c():
    """Show c page"""

    return render_template("c.html")


@app.route("/python")
@login_required
def python():
    """Show python page"""

    return render_template("python.html")


@app.route("/javascript")
@login_required
def javascript():
    """Show javascript page"""

    return render_template("javascript.html")


@app.route("/quiz")
@login_required
def quiz():
    """Show quiz page"""

    return render_template("quiz.html")


@app.route("/account", methods=["GET", "POST"])
@login_required
def account():
    """Change your password"""

    user_id = session["user_id"]

    # Query database for user
    user = db.execute("SELECT * FROM users WHERE id = ?", user_id)

    # User reached route via POST
    if request.method == "POST":
        old_password = request.form.get("old_password")
        new_password = request.form.get("new_password")
        confirmation = request.form.get("confirmation")

        # Ensure no fields are left in blank
        if not old_password:
            flash("danger", "must provide old password")
            return redirect("/account")
        elif not new_password:
            flash("danger", "must provide new password")
            return redirect("/account")
        elif not confirmation:
            flash("danger", "must confirm your new password")
            return redirect("/account")

        if len(new_password) < 8 or len(new_password) > 128:
            flash("danger", "New password must be between 8 and 128 characters.")
            return redirect("/account")

        # Ensure password is correct
        if not sha256_crypt.verify(old_password, user[0]["hash"]):
            flash("danger", "Old password invalid.")
            return redirect("/account")

        # Ensure if the new password and confirmation matches
        if new_password != confirmation:
            flash("danger", "The new password and confirmation do not match.")
            return redirect("/account")

        # Generate a hash of the new password
        new_hashed_password = sha256_crypt.encrypt(new_password)

        # Update password
        db.execute(
            "UPDATE users SET hash = ? WHERE id = ?", new_hashed_password, user_id
        )

        # Flash a message and redirect user to home page
        flash("success", "Password was changed successfully!")
        return redirect("/")

    else:
        # Get user's informations
        name = user[0]["name"]
        username = user[0]["username"]
        max_score = user[0]["max_pontuation"]

        return render_template(
            "account.html", name=name, username=username, max_score=max_score
        )


@app.route("/save_score", methods=["POST"])
def salvar_score():
    # Extracts 'score' value from POST request
    score = int(request.form["score"])

    # Query database for user
    user_id = session["user_id"]
    user = db.execute("SELECT * FROM users WHERE id = ?", user_id)

    max_score = int(user[0]["max_pontuation"])

    # Atarts "message" with the lowest scoring message
    message = "Don't worry, everyone starts somewhere. Keep practicing, and you'll improve quickly!"

    # Update the score if it is higher and updates the message according to the result
    if score > max_score:
        db.execute("UPDATE users SET max_pontuation = ? WHERE id = ?", score, user_id)
        message = "🎉 New record saved successfully 🥳"
    elif score == 20:
        message = "🎉 Incredible! You achieved the maximum score on the quiz! 🥳"
    elif score > 14:
        message = "Your score is impressive. Keep up this exceptional performance and challenge yourself to surpass it next time!"
    elif score > 7:
        message = "You're on the right track! With a little more effort and focus, you can achieve an even better score."
    else:
        message = "Don't worry, everyone starts somewhere. Keep practicing, and you'll improve quickly!"

    return message
