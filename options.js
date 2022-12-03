function linkify(text) {
    // alert("function called successfully");
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return urlRegex.test(text);
    };
$(function(){
    $("#btnAdd").click(function(){
        var text = $("#urlDonate").val();
        if(linkify(text)){
            window.location.href = "http://localhost:5000/donate?data="+text;
        }else{
            alert("It seems you don't entered a valid URL! \nA valid url form is 'http/https://....'");
        }
    });
    // var data = $.csv.toObjects("process/history.csv");
    // console.log(data);
});
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "process/history.txt",
        dataType: "text",
        success: function(data) {processData(data);}
     });

});
function processData(allText) {
    //var record_num = 5;  // or however many elements there are in each row
    var allTextLines = allText.split(/\r\n|\n/);
    console.log(allTextLines);
    allTextLines.pop() // remove the lasgt empy emlement in array
    console.log(allTextLines);
    
    allTextLines = allTextLines.reverse() // reverse elements bcz we want see recently elems firstly

    var table = document.getElementById("historyTable");
    //console.log(table);
    table.innerHTML="";
    var tr="";
    var idCounter = 0;
    allTextLines.forEach(x=>{
        x = x.split(",")
        idCounter += 1;
        console.log(x);
        tr+='<tr>';
        tr+='<td>'+ idCounter +'</td>'+'<td>'+x[0]+'</td>'+'<td>'+x[1]+'</td>'+'<td>'+x[2]+'</td>'+'<td>'+x[3]+'</td>'
        tr+='</tr>'
    })
    table.innerHTML+=tr;
}