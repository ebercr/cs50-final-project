import os

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session

# Configure application
app = Flask(__name__)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///final_project.db")

@app.route("/")
def index():
    """Show index page"""

    return render_template("index.html")

