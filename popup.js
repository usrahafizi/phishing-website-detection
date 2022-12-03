
function linkify(text) {
    // alert("function called successfully");
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return urlRegex.test(text);
    };

function isPhish(text){
    //dataLength = Object.keys(data).length;
    // cause we do phishing detection via python we use pyscript, 
    // we redirect the page and sent the specific url to another page for process
    var w = screen.availWidth/2 + 70;
    var h = screen.availHeight/2 + 220;      // math for popup location on the client's screen
    var left = (screen.width/2)-(w/2) - 170;
    var top = (screen.height/2)-(h/2) - 90;
    
    var pageURL = "http://localhost:5000/?data="+text;
        var createData = {
            "url" : pageURL,
            "type": "popup",
            "top" : top,
            "left": left,
            "width": w,
            "height": h
        };
        var createData2 = {
            "url" : "process/templates/wait.html",
            "type": "popup",
            "top" : top,
            "left": left,
            "width": w,
            "height": h
        };
        chrome.windows.create(createData, function(){
          document.getElementById("spinners").style = "display:inline-block;margin-top:12px;margin-bottom:12px;center:center;margin-left:40%;";
          document.getElementById("simpleCont").style.display = "none";
        
          chrome.windows.create(createData2, function(){});        
        });
}

$(function(){
    $("#scan").click(function(){
        if($("#link").val() !== ""){
            var text = $("#link").val();
            if(linkify(text)){
                // All logic for scanning the URL
                // all core functionalities are going here....
                // call the function that jump to check is the url phishing or not
                
                isPhish(text);
               
            }else{
                alert("You entered a wrong url, Please Enter a valid URL!");
            }
        }
        else{
            alert("Please input a URL to scan!");
        }
    });
    $("#cancel").click(function(){
      window.close();
    });
});