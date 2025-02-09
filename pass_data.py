from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from UI_analyse import ui_analyse

app = Flask(__name__)
CORS(app)

# Global list to store accumulated actions
accumulate = []
last_result = None  # Store the last processed result

@app.route("/ui_analyse", methods=["POST"])
def handle_ui_analyse():
    global accumulate, last_result

    try:
        data = request.get_json()
        actions = data.get("actions", [])  

        if not actions:  
            return jsonify({"error": "No actions received"}), 400

        # Extend accumulated actions
        accumulate.extend(actions)
        print(f"Accumulated actions: {accumulate}")

        # Extract num_days from the first numeric element
        num_days = None
        actions_list = []

        for item in accumulate:
            if num_days is None and str(item).isdigit():
                num_days = int(item)  # Convert to integer
            else:
                actions_list.append(item)

        print(f"Extracted num_days: {num_days}")
        print(f"Remaining actions: {actions_list}")
        
        

        # **Trigger processing when the last action is "withdrawal"**
        if actions_list and actions_list[-1].lower() == "withdrawal":
            print("Withdrawal detected! Processing accumulated data...")
            actions_list = [", ".join(actions_list)]  
            print("new", actions_list)
            # Call ui_analyse with num_days, actions_list
            result = ui_analyse([num_days], actions_list, [60])  # Modify as needed
            last_result = result.tolist()  # Store the last result

            # Reset accumulate after processing
            accumulated_data = accumulate.copy()  # Store for response before clearing
            accumulate.clear()

            return jsonify({

                "result": last_result[0]
            })

        return jsonify({"message": f"Accumulated {accumulate}", "num_days": num_days, "actions": actions_list})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
