"use strict";
let characterID = 0;
class Jonny {
    constructor() {
        characterID++;
        this.jonnyMain = document.createElement('div');
        this.jonnyMain.classList.add('jonny');
        this.jonnyMain.classList.add('charID_'+characterID);
        
        this.jonnyBody = document.createElement('div');
        this.jonnyBody.classList.add('char__body');

        this.img = document.createElement('img');
        this.img.src = "assets/images/jonny_original.webp";
        this.jonnyBody.append(this.img);

        this.controllerMaster = document.createElement('div');
        this.controllerMaster.classList.add('char__controller');
        
        this.jonnyMain.append(this.jonnyBody);
        this.jonnyMain.append(this.controllerMaster);
        
        this.loadIndependentParts();

        document.querySelector('.character_wrapper').append(this.jonnyMain);
    }

    HSLupdate (tgt, h, s, l) {
        tgt.style.background = `hsl(${h},${s}%,${l}%)`;
    }

    loadIndependentParts () {
        this.createControls('Tops','char__tops');
        this.createControls('Trouser','char__trouser');
        this.createControls('Skin','char__skin');
    }

    createControls (tgtname, tgt) {
        const targetPart = document.createElement('div');
        targetPart.classList.add(tgt);
        
        const controllerPanel = document.createElement('div');
        const controllerLabel = document.createElement('span');
        controllerLabel.textContent = tgtname;
        controllerPanel.append(controllerLabel);
        controllerPanel.classList.add(tgtname);

        controllerLabel.addEventListener('click', ()=>{
            controllerPanel.classList.toggle('expanded');
        });

        const controlParts = [
            ['Hue',document.createElement('input')],
            ['Saturation',document.createElement('input')],
            ['Brightness',document.createElement('input')],
        ];

        controlParts[0][1].addEventListener('change', m=>{
            this.HSLupdate(targetPart,controlParts[0][1].value,controlParts[1][1].value,controlParts[2][1].value);
        });
        controlParts[1][1].addEventListener('change', m=>{
            this.HSLupdate(targetPart,controlParts[0][1].value,controlParts[1][1].value,controlParts[2][1].value);
        });
        controlParts[2][1].addEventListener('change', m=>{
            this.HSLupdate(targetPart,controlParts[0][1].value,controlParts[1][1].value,controlParts[2][1].value);
        });
        
        controlParts.forEach((part, i) => {
            const paragraph = document.createElement('p');

            part[1].setAttribute('type', 'range');
            part[1].setAttribute('min', '0');
            if(i === 0 || i ===  3) {
                part[1].setAttribute('max', '360');
                part[1].setAttribute('value', Math.floor(Math.random() * 360));
            }else{
                part[1].setAttribute('max', '100');
                part[1].setAttribute('value', Math.floor(Math.random() * 100));
            }
            
            paragraph.append(part[0],part[1]);
            controllerPanel.append(paragraph); 
        });
        
        this.controllerMaster.append(controllerPanel);
        this.jonnyBody.append(targetPart);
        this.HSLupdate(
            targetPart,
            controlParts[0][1].value,
            controlParts[1][1].value,
            controlParts[2][1].value
        );
    }

    deleteCharacter () {
        this.jonnyMain.remove();
    }
}

class Jimmy extends Jonny {
    constructor() {
        super();
        this.img.src = "assets/images/jimmy_original.webp";

        this.jonnyMain.classList.remove('jonny');

        this.jonnyMain.classList.add('jimmy');
    }
    
    loadIndependentParts () {
        this.createControls('Tops','char__tops');
        this.createControls('Trouser','char__trouser');
        this.createControls('TeethRetainer','char__retainer');
    }
}


const characters = [];

window.addEventListener('load', ()=>{
    characters.push(new Jonny());
    
    if(window.innerWidth > 768) {
        document.querySelectorAll('.char__controller > div').forEach(controller=>{
            controller.classList.add('expanded');
        })
    }
});

document.querySelector('.character_adder__jonny').addEventListener('click', b=>{
    b.preventDefault();
    characters.push(new Jonny());
});

document.querySelector('.character_adder__jimmy').addEventListener('click', b=>{
    b.preventDefault();
    characters.push(new Jimmy());
})

document.querySelector('.printBtn').addEventListener('click', ()=>{
    window.print();
});

document.querySelector('.theatreBtn').addEventListener('click', b=>{
    b.preventDefault();
    document.querySelector('body').classList.toggle('theatreMode');
});

document.querySelector('.theatre_background_setter a').addEventListener('click', ()=>{
    document.querySelector('.theatre_background_setter').classList.toggle('expanded');
});

const backgroundParts = [
    '.background_01',
    '.background_02',
    '.background_03',
]

document.getElementById('theatre_background_default').addEventListener('click',function(){
    backgroundParts.forEach(bgs=>{
        console.log(bgs);
        document.querySelector(bgs).classList.remove('expanded');
    });
    wipeAllSnowdrops ();
    wipeAllColorballs ();
    document.querySelector(backgroundParts[0]).classList.add('expanded');
});

document.getElementById('theatre_background_snowfall').addEventListener('click',function(){
    backgroundParts.forEach(bgs=>{
        console.log(bgs);
        document.querySelector(bgs).classList.remove('expanded');
    });
    wipeAllSnowdrops ();
    wipeAllColorballs ();
    initiateSnowdrop();
    document.querySelector(backgroundParts[1]).classList.add('expanded');
});


document.getElementById('theatre_background_spotlight').addEventListener('click',function(){
    backgroundParts.forEach(bgs=>{
        console.log(bgs);
        document.querySelector(bgs).classList.remove('expanded');
    });
    wipeAllSnowdrops ();
    wipeAllColorballs ();
    initiateColorball();
    document.querySelector(backgroundParts[2]).classList.add('expanded'); 
});



/* Snowdrop-Related */
let snowDropStats = [];
function initiateSnowdrop () {
    document.querySelectorAll('.jonny,.jimmy').forEach(chars=>{chars.classList.add('snowCoated')});
    for(let i = 0; i < 50; i++) {
        const snowDrop = document.createElement('div');
        snowDrop.classList.add('snowDrop');
        snowDrop.style.left = (Math.random() * (window.innerWidth) ) + "px";
        snowDrop.style.top = (Math.random() * (window.innerHeight)) + "px";
        snowDropStats.push({
            velocityX: Math.random() * 5,
            velocityY: Math.random() * 4
        });
       document.querySelector('.background_02').append(snowDrop);
    }
    moveSnowdrop();
}

function moveSnowdrop () {
    snowDropStats.forEach((stat, i)=>{
        const snowDrop = document.querySelectorAll('.snowDrop')[i];
        snowDrop.style.left = (parseFloat(snowDrop.style.left) + stat.velocityX) + "px";
        snowDrop.style.top = (parseFloat(snowDrop.style.top) + stat.velocityY) + "px";

        if(snowDrop.offsetLeft> window.innerWidth + 50) {
            snowDrop.style.left = 0;
            stat.velocityX = Math.random() * 5;
            stat.velocityY = Math.random() * 4;
        }
        if(snowDrop.offsetTop> window.innerHeight + 50) {
            snowDrop.style.top = 0;

            snowDropStats[i].velocityX = Math.random() * 5;
            snowDropStats[i].velocityY = Math.random() * 4;
        }
    });

    if(snowDropStats.length > 0 && document.visibilityState === 'visible') {
        setTimeout(moveSnowdrop,20);
    }
}

function wipeAllSnowdrops () {
    document.querySelectorAll('.jonny,.jimmy').forEach(chars=>{chars.classList.remove('snowCoated')});
    document.querySelectorAll('.snowDrop').forEach(f=>f.remove());
    snowDropStats = [];
}



/* Colorball-Related */
let colorballStats = [];
function initiateColorball() {
    document.querySelectorAll('.jonny,.jimmy').forEach(chars=>{chars.classList.add('withSpotlight')});
    for(let i = 0; i < 15; i++) {
        const colorBall = document.createElement('div');
        colorBall.classList.add('colorBall');
        colorBall.style.left = (Math.random() * (window.innerWidth) ) + "px";
        colorBall.style.top = (Math.random() * (window.innerHeight)) + "px";
        colorballStats.push({
            velocityX: Math.random() * 10 - 5,
            velocityY: Math.random() * 10 - 5,
            scale: (Math.random()*256 + 48) + "px",
            opacity: Math.random()*0.3 + 0.7,
            bg: `hsl(${Math.floor(Math.random()*360)},${Math.floor(Math.random()*100)}%,${Math.floor(Math.random()*100)}%)`
        });
       document.querySelector('.background_03').append(colorBall);
    }
    moveColorball();
}

function moveColorball () {
    colorballStats.forEach((stat, i)=>{
        const colorBall = document.querySelectorAll('.colorBall')[i];
        colorBall.style.left = (parseFloat(colorBall.style.left) + stat.velocityX) + "px";
        colorBall.style.top = (parseFloat(colorBall.style.top) + stat.velocityY) + "px";
        colorBall.style.width = stat.scale;
        colorBall.style.height = stat.scale;
        colorBall.style.opacity = stat.opacity;
        colorBall.style.backgroundColor = stat.bg;

        if(colorBall.offsetLeft> window.innerWidth + 50 || colorBall.offsetLeft < -50) {
            colorballStats[i].velocityX = colorballStats[i].velocityX * -1;
        }
        if(colorBall.offsetTop> window.innerHeight + 50 || colorBall.offsetTop < -50) {
            colorballStats[i].velocityY = colorballStats[i].velocityY * -1;
        }
    });

    if(colorballStats.length > 0 && document.visibilityState === 'visible') {
        setTimeout(moveColorball,20);
    }
}

function wipeAllColorballs () {
    document.querySelectorAll('.jonny, .jimmy').forEach(chars=>{chars.classList.remove('withSpotlight')});
    document.querySelectorAll('.colorBall').forEach(f=>f.remove());
    colorballStats = [];
}