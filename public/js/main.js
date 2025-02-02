
function getStoriesLanguage(){
    var userLang = navigator.language || navigator.userLanguage;
    console.log(userLang);
   
    var stories=[];
    return stories['Developer', 'OpenSource Lover', 'Programmer', 'Backend Developer', 'Frontend Developer'];
}

window.onload = (event) => {
    var app = document.getElementById('whoIam');
 
    var typewriter = new Typewriter(app, {
        loop: true,
        delay: 75,
    });
    
    typewriter
    .pauseFor(1500)
    .typeString('<strong>Developer</strong>')
    .pauseFor(500)
    .deleteAll()
    .typeString('<strong>OpenSource Lover</strong>')
    .pauseFor(500)
    .deleteAll()
    .typeString('<strong>Programmer</strong>')
    .pauseFor(500)
    .deleteChars(10)
   .typeString('Sunset & SUP lover')
   .pauseFor(500)
   .deleteAll()
   .typeString('Software Developer')
   .pauseFor(500)
   .deleteAll()
    
    
    .start();
};

