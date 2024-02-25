console.log("start");
$(document).ready(function() 
{
    console.log("doc ready");
    if ("serviceWorker" in navigator) 
    {
        console.log("serv work");
        navigator.serviceWorker.register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    }
    else console.log("serv don't work");

});
