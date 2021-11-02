window.onload = function (){
    document.cookie = `the_fl4g_goes_here`;
}

/*var form = document.getElementById( "my-form" );
var form2 = document.getElementById( "payload" ).value;

console.log(form2);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    // TODO do something here to show user that form is being submitted
    fetch(event.target.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target)) // event.target is the form
    }).then((resp) => {
        return resp.json(); // or resp.text() or whatever the server sends
    }).then((body) => {
        // TODO handle body
    }).catch((error) => {
        // TODO handle error
    });
});*/

/*function formSubmit(event) {
    var url = location.origin+"/new-chirp";
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.onload = function() { // request successful
    // we can use server response to our request now
      console.log(request.responseText);
    };
  
    request.onerror = function() {
      // request failed
    };
  
    request.send(new FormData(event.target)); // create FormData from form that triggered event
    event.preventDefault();
  }

  function attachFormSubmitEvent(formId){
    document.getElementById(formId).addEventListener("submit", formSubmit);
  }*/


const host = location.origin;

function chirp(){
    console.log("entrou");
    /*var url = host+'/new-chirp';
    fetch(url, {
        headers: {'Content-Type': 'application/text'},
        method: 'POST',
        body: JSON.stringify(document.getElementById('payload').value)
    }).then(function (response){
        console.log(response);
    })*/
    var newChirpsDiv = document.getElementById("test");
    txt = document.getElementById("payload").value; 
    newChirpsDiv.innerHTML = txt;
}