from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import os

# Load variables from .env file
load_dotenv()

# load the location where we have the email.py function
import controller.validation.email as controller_validation_email

# Access the environment variable
print(os.getenv('EMAIL_VALIDATION_API_KEY'))  # Output: some_value of the API - Optional

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Allow specific frontend origin


# GET Endpoint
@app.route('/get-data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!"})

# POST Endpoint
@app.route('/validation/email', methods=['POST'])
def post_validation_email():
    data = request.json # gets the data when this API is called
   #  print(data)   
   # Stores the full response from the email validator api
    response = controller_validation_email.validate_email(data['email'])
    # gather data here from response to feed the ML
    return jsonify(response)

@app.route('/validation/address', methods=['POST'])
def post_validation_address():
    user_ip = request.remote_addr
    print(user_ip)
    return jsonify({})

if __name__ == '__main__':
    app.run(debug=True)