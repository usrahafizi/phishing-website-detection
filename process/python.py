
from flask import Flask, request, render_template
app = Flask(__name__)

@app.route("/")

def index():
    URLtoPredict = request.args.get('data')
    
    return render_template("process.html", name=URLtoPredict)

if __name__ == "__main__":
    app.debug = True
    app.run(host = "0.0.0.0", port = 5000)
    
#------------
# import sys

# data_to_pass_back = "send this to node process."

# input = sys.argv[1]
# output = data_to_pass_back
# print(output)

# sys.stdout.flush()