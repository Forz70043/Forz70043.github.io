
$(document).ready(function() {

    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
        console.log('🎉 Dark mode is supported');
        const lightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
        
        console.log(`Dark mode is ${lightMode ? '☀️ off' : '🌒 on'}`);
        let currentTheme = localStorage.getItem("theme");
        console.log(currentTheme);
        if(currentTheme==null){
            localStorage.setItem("theme", lightMode ? 'light' : 'dark');
        }
        console.log(localStorage.getItem("theme"));
    }
    
    var storiesIndex=0;
    var typeWriter=document.getElementById('typeWriter');
    //typeWriter.style.color="white";
    var stories=getStoriesLanguage();
    writeStories(stories,storiesIndex);

    if ("serviceWorker" in navigator) {
        console.log("serv work");
        window.addEventListener("load", function() {
          navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
        })
    }else console.log("serv don't work");

});
    function switchTheme(e){
        console.log(e);
        let currentTheme = localStorage.getItem("theme");
        if(currentTheme=='light') newTheme='dark';
        else newTheme='light';


        localStorage.setItem("theme",newTheme);
    }

	function writeStories(stories,storiesIndex)
    {
        var word = ' '+stories[storiesIndex];
	    var index=0;
    	
        var adder = setInterval(function(){ 
            typeWriter.innerHTML = typeWriter.innerHTML + word[index];
            index++;
    		if(index===word.length) {
                clearInterval(adder);
                if(storiesIndex == stories.length-1){
                    //console.log("VIEWpROJECT");
                    viewProject();
                }
        		if(storiesIndex !== stories.length-1) {
            		//setInterval(function(){ typeWriter.innerHTML = ''; },1000);
            		deleteStories(stories,storiesIndex);
        		}
            }
        }, 50);
    }

	function deleteStories(stories,storiesIndex,del=false)
    {
    	var backSpacer = setInterval(function(){
        	//se vuoi eliminare decommenta
            //typeWriter.innerHTML = typeWriter.innerHTML.substring(0, typeWriter.innerHTML.length-1);
            storiesIndex++;
            if(del){
                if(!typeWriter.innerHTML.length) {
                    storiesIndex++;
                    clearInterval(backSpacer);
                    writeStories(stories,storiesIndex);
                }
            }
            else{
                typeWriter.innerHTML+='<br/>&nbsp;&nbsp;&nbsp;&nbsp;';
                clearInterval(backSpacer);
                writeStories(stories,storiesIndex);
            }
    	}, 95);
    }

	function viewProject(){
        if($('#linkbox').hasClass('d-none')) $('#linkbox').removeClass('d-none');
    }

    function getStoriesLanguage(){
        var userLang = navigator.language || navigator.userLanguage;

        switch(userLang.slice(0,2)){
            case "en-US":
            case "en-GB":
            case "en":
                var stories = ["Hi, I'm Alfonso !","This's my digital garden,","a compendium of the things I've created","and learned over the years.","Thank you for being here. ❤ "];
                break;
            case "it-IT":
            case "it":
                //var stories = ["Benvenuto, sono Alfonso","o meglio, sono il suo web server.","Qui potrai trovare il suo portfolio con i progetti personali","ed il suo curriculum vitae.","Grazie per essere passato di qui. &hearts;"];
                //var stories = ["Ciao, sono Alfonso !","Qui puoi trovare progetti personali,","semplici tutorial, wiki","ed il mio curriculum vitae.","Grazie per essere passato di qui. ❤ "];
                var stories = ["Ciao, sono Alfonso !","Questo è il mio giardino digitale,","un compendio di ciò che ho creato"," ed imparato nel corso degli anni.",/*"ed il mio curriculum vitae.",*/"Grazie per essere passato di qui. ❤ "];
                break;
        }
        return stories;
    }
