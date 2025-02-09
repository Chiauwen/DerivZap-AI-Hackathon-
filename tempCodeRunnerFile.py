from flask import Flask, request, jsonify
from flask_cors import CORS
from UI_analyse import ui_analyse  # Import your function

app = Flask(__name__)
CORS(app)