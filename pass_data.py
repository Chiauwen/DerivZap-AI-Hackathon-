from flask import Flask, request, jsonify
from flask_cors import CORS
from UI_analyse import ui_analyse  # Import your function

app = Flask(__name__)
CORS(app)

@app.route("/ui_analyse", methods=["POST"])
def handle_ui_analyse():
    try:
        data = request.get_json()
        actions = data.get("actions", [])  

        if not actions:  
            return jsonify({"error": "No actions received"}), 400

        print(f"Received actions: {actions}")  # Log received actions in Flask console

        # Example: Pass actions to your function
        result = ui_analyse([3], ["deposit,trade in,trade out,withdraw"], [60])
        result = [0,1]

        if result is None or not isinstance(result, list):
            return jsonify({"error": "ui_analyse returned an invalid response"}), 500

        return jsonify({"message": f"Received {actions}", "result": result[0]})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # ✅ Proper error handling

if __name__ == "__main__":
    app.run(debug=True)
