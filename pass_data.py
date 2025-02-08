from flask import Flask, render_template
from UI_analyse import ui_analyse  # Import your function

app = Flask(__name__)

# accept value from react for ui_analyse
# accept return value from ui_analyse python
@app.route("/ui_analyse")
def index():
    result = ui_analyse([3], ["deposit,trade in,trade out,withdraw"], [60])
    return str(result[0])

if __name__ == "__main__":
    app.run(debug=True)