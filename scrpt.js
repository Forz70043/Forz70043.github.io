document.addEventListener("DOMContentLoaded", function()
{
	var userLang = navigator.language || navigator.userLanguage;
	var color = ["white"];

	switch(userLang){
		case "en-US":
		case "en":
			var stories = ["Welcome I'm Alfonso","or better, I'm Alfonso's web server.","Here you will find his portfolio of small personal projects","and his curriculum vitae.","Thank you for being here. "];
			break;
		case "it-IT":
		case "it":
			var stories = var stories = ["Benvenuto, sono Alfonso","o meglio, sono il suo web server.","Qui potrai trovare il suo portfolio con i progetti personali","ed il suo curriculum vitae.","Grazie per essere passato di qui. "];
			break;
		case "ru-RU":
		case "ru":
			var stories = ["Добро пожаловать, я Альфонсо или, вернее, я веб-сервер Альфонсо. Здесь вы найдете его портфолио небольших личных проектов и его биографические данные. Спасибо за то, что вы здесь. Dobro pozhalovat', ya Al'fonso ili, verneye, ya veb-server Al'fonso. Zdes' vy naydete yego portfolio nebol'shikh lichnykh proyektov i yego biograficheskiye dannyye. Spasibo za to, chto vy zdes'."];
			break;
	}


	var typeWriter = document.getElementById('typeWriter');
    	var storiesIndex = 0;
    	writeStories(); 

	function writeStories()
    	{
        	var word = ' '+stories[storiesIndex];
	        var index=0;
        	//typeWriter.style.color = color[storiesIndex];
	        typeWriter.style.color="white";
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
                    			deleteStories();
                    			//viewProject();
                		}
            		}
        	}, 180);
    	}

	function deleteStories() {
        	var backSpacer = setInterval(function(){  
            		typeWriter.innerHTML = typeWriter.innerHTML.substring(0, typeWriter.innerHTML.length-1);
            		if(!typeWriter.innerHTML.length) {         
                		storiesIndex++;
                		clearInterval(backSpacer);
                		writeStories();
            		}
        	}, 80);
    	}

	function viewProject(){
        	console.log("viewProject");
    	}

