
function getStoriesLanguage(){
    var userLang = navigator.language || navigator.userLanguage;
    console.log(userLang);
   
    var stories=[];
    return stories['Developer', 'OpenSource Lover', 'Programmer', 'Backend Developer', 'Frontend Developer'];
}

window.onload = (event) => {
    console.log('page is fully loaded');
    
    var stories = ['Developer', 'OpenSource Lover', 'Programmer', 'Backend Developer', 'Frontend Developer'];
    console.log(stories);
    
    //var text = el.innerText;
    //console.log(text);
    /* for(var i=0; i<stories.length; i++){
        for(var k=0; k < stories[i].length; k++){
        }
    } */


    var app = document.getElementById('whoIam');
 
    var typewriter = new Typewriter(app, {
        loop: true,
        delay: 75,
    });
    let age = Math.floor((new Date() - new Date('1993-07-17').getTime()) / 3.15576e+10 ); 
    typewriter
    .pauseFor(1500)
    //.typeString('<strong>Welcome to my personal digital garden,</br>A compendium of what I\'ve created and learned over the years</strong>')
    //.pauseFor(1500)
    //.deleteAll()
    .typeString('<strong>Developer</strong>')
    .pauseFor(500)
    .deleteAll()
    .typeString('<strong>OpenSource Lover</strong>')
    .pauseFor(500)
    .deleteAll()
    .typeString('<strong>Programmer</strong>')
    .pauseFor(500)
    .deleteChars(10)
    /*.typeString('<strong>var Alfonso = { </br>  surname: Pisicchio,</br>  age: '+ age +
    ',</br>skills: PHP, Js, Bash, MySql/MariaDB, NodeJs, Express, API</br></strong>')
    */
   .typeString('Sunset & SUP lover')
   .pauseFor(500)
   .deleteAll()
   .typeString('Software Developer')
   .pauseFor(500)
   .deleteAll()
    
    
    .start();
};

