from flask import Flask, request, jsonify
from flask_cors import CORS
from UI_analyse import ui_analyse  # Import your function

app = Flask(__name__)
CORS(app)

@app.route("/ui_analyse", methods=["POST"])
def handle_ui_analyse():
    try:
        print("Received request to /ui_analyse")  # Add this line
        data = request.get_json()
        print("Received data:", data)  # Add this line
        actions = data.get("action", [])  # Changed from "actions" to "action" to match React

        if not actions:  
            print("No actions received")  # Add this line
            return jsonify({"error": "No actions received"}), 400

        print(f"Processing actions: {actions}")  # Add this line

        # Example: Pass actions to your function
        result = ui_analyse([3], ["deposit,trade in,trade out,withdraw"], [60])
        result = [0,1]
        
        print(f"Sending response: {result}")  # Add this line
        return jsonify({"message": f"Received {actions}", "result": result[0]})
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Add this line
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
