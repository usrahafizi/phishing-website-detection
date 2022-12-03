import numpy as np
import pandas as pd
from features import generate_data_set
from flask import Flask, request, render_template

# Decision Tree Classifier model 
from sklearn.tree import DecisionTreeClassifier
import pickle
from datetime import datetime

#flask working
app = Flask(__name__)

@app.route("/donate")
def donate():
    URLtoDonate = request.args.get('data')
    f = open("donates.csv", "a")
    f.write(URLtoDonate + ",Phishing \n")
    f.close()
    return render_template("donate.html")

@app.route("/")
def index():
    URLtoPredict = request.args.get('data')
    # Splitting the dataset into dependant and independant fetature
    # X = data.drop(["class"],axis =1)
    # y = data["class"]
    #prediction process
    # tree = DecisionTreeClassifier(max_depth=30)
    # fit the model 
    # tree.fit(X, y)

    dataArray = generate_data_set(URLtoPredict) 
    x = np.array(dataArray).reshape(1,30) 
    # dataArray = generate_data_set(URLtoPredict)
    #import the trained model
    myModel = pickle.load(open("myPhishing", "rb"))
    result = myModel.predict(x)

    # write the scanned url in history
    dateTime = datetime.today().strftime('%Y-%m-%d %H:%M:%S').split(" ")
    f = open("history.txt", "a")
    if result[0] == 1:
        f.write(URLtoPredict + ",Legitimate,"+dateTime[0]+","+dateTime[1]+"\n")
    else:
        f.write(URLtoPredict + ",Phishing,"+dateTime[0]+","+dateTime[1]+"\n")     
    f.close()
    
    return render_template("process.html", result=result, dataList = dataArray)



if __name__ == "__main__":
    app.debug = True
    app.run(host = "0.0.0.0", port = 5000)




