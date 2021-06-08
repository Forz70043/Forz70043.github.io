log("start");
$(document).ready(function() {

    /*if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
        console.log('🎉 Dark mode is supported');
        const lightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
        
        console.log(`Dark mode is ${lightMode ? '☀️ off' : '🌒 on'}`);
        let currentTheme = localStorage.getItem("theme");
        console.log(currentTheme);
        if(currentTheme==null){
            localStorage.setItem("theme", lightMode ? 'light' : 'dark');
        }
        console.log(localStorage.getItem("theme"));
    }*/
    
    console.log("doc ready");
    if ("serviceWorker" in navigator) {
        console.log("serv work");
        //window.addEventListener("load", function() {
          navigator.serviceWorker.register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
        //})
    }
    else console.log("serv don't work");

});
    /*
    function switchTheme(e){
        console.log(e);
        let currentTheme = localStorage.getItem("theme");
        if(currentTheme=='light') newTheme='dark';
        else newTheme='light';


        localStorage.setItem("theme",newTheme);
    }
    */
