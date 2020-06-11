
$(document).ready(function() {
    console.log("jQuery ready");
    var storiesIndex=0;
    var index =0;
    //var index=0;
    var typeWriter=document.getElementById('typeWriter');
    typeWriter.style.color="white";
    var stories=getStoriesLanguage();
    writeStories(stories,storiesIndex);

});

	function writeStories(stories,storiesIndex)
    {
        console.log("writeStories");
        console.log("stories index");
        console.log(storiesIndex);
        var word = ' '+stories[storiesIndex];
        console.log(word);
	    var index=0;
    	
        var adder = setInterval(function(){ 
            typeWriter.innerHTML = typeWriter.innerHTML + word[index];
            index++;
    		if(index===word.length) {
        		//console.log("index ===word.length");
        		clearInterval(adder);
        		if(storiesIndex !== stories.length-1) {
            		//console.log("indice storie != storia.length-1"); 
            		//setInterval(function(){
        				//typeWriter.innerHTML = ''; 
        			//},1000);
            		deleteStories(stories,storiesIndex);
            		//viewProject();
        		}
    		}
    	}, 200);
    }

	function deleteStories(stories,storiesIndex,del=false)
    {
        console.log("delete");
    	var backSpacer = setInterval(function(){
        	//se vuoi eliminare decommenta
            //typeWriter.innerHTML = typeWriter.innerHTML.substring(0, typeWriter.innerHTML.length-1);
        	console.log("typeWriter length");
            console.log(typeWriter.innerHTML.length);
            //
            storiesIndex++;
            if(del){
                if(!typeWriter.innerHTML.length) 
                {
                    console.log("typeWriter length false");
                    storiesIndex++;
                    console.log(storiesIndex);
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
        console.log("viewProject");
    }

    function getStoriesLanguage(){
        var userLang = navigator.language || navigator.userLanguage;
        var color = ["white"];
        console.log(userLang);
        console.log(userLang.slice(0,2));
        console.log("getStries");
        switch(userLang.slice(0,2)){
            case "en-US":
            case "en-GB":
            case "en":
                var stories = ["Welcome I'm Alfonso","or better, I'm Alfonso's web server.","Here you will find his portfolio of small personal projects","and his curriculum vitae.","Thank you for being here. &hearts; "];
                break;
            case "it-IT":
            case "it":
                var stories = ["Benvenuto, sono Alfonso","o meglio, sono il suo web server.","Qui potrai trovare il suo portfolio con i progetti personali","ed il suo curriculum vitae.","Grazie per essere passato di qui. &hearts;"];
                break;
            case "ru-RU":
            case "ru":
                var stories = ["Добро пожаловать, я Альфонсо или, вернее, я веб-сервер Альфонсо. Здесь вы найдете его портфолио небольших личных проектов и его биографические данные. Спасибо за то, что вы здесь. Dobro pozhalovat', ya Al'fonso ili, verneye, ya veb-server Al'fonso. Zdes' vy naydete yego portfolio nebol'shikh lichnykh proyektov i yego biograficheskiye dannyye. Spasibo za to, chto vy zdes'. &hearts;"];
                break;
        }
        console.log(stories);
        return stories;
    }
