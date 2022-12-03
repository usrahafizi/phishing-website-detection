chrome.contextMenus.create({
    id : "2",
    title: "Scan \"%s\"",
    contexts: ["link"],
});

// for copying
function getClipboard() {
  var result = null;
  var inputData = document.getElementById('link');
  inputData.value = '';
  inputData.select();

  if (document.execCommand('paste')) {
      result = inputData.value;
  } else {
      console.log('failed to get clipboard content');
  }

  inputData.value = '';
  return result;
}
// onclick paste button
$(function(){
    $(".btnPst").click(function (){
      console.log(getClipboard());
      var copied = getClipboard();
      document.getElementById('link').value = copied;
    });

});
