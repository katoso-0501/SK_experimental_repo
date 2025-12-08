"use strict";
let characterID = 0;
//  __________________
// Character classes start
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
        this.createColormat('Tops','char__tops');
        this.createColormat('Trouser','char__trouser');
        this.createColormat('Skin','char__skin');
    }

    createColormat (tgtname, tgt) {
        const targetPart = document.createElement('div');
        targetPart.classList.add(tgt);
        
        const controllerPanel = document.createElement('div');
        const controllerLabel = document.createElement('span');
        controllerPanel.classList.add(tgtname);
        controllerPanel.append(controllerLabel);
        controllerLabel.textContent = tgtname;

        controllerLabel.addEventListener('click', ()=>{
            controllerPanel.classList.toggle('expanded');
        });

        const mat = new ColorMat (targetPart, controllerPanel);
        
        this.controllerMaster.append(controllerPanel);
        this.jonnyBody.append(targetPart);
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
        this.createColormat('Tops','char__tops');
        this.createColormat('Trouser','char__trouser');
        this.createColormat('TeethRetainer','char__retainer');
    }
}

class Rolf extends Jonny {
    constructor() {
        super();
        this.img.src = "assets/images/rolf_original.webp";
        this.jonnyMain.classList.remove('jonny');
        this.jonnyMain.classList.add('rolf');
    }
    
    loadIndependentParts () {
        this.createColormat('Tops','char__tops');
        this.createColormat('Trouser','char__trouser');
        this.createColormat('Hair','char__hair');
        this.createColormat('Socks','char__socks');
        this.createColormat('Shoes','char__shoes');
        this.createColormat('Grass','char__grass');
    }
}
//  ______________________
// Character classes end
//￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣

// Color Managements
//  ______________________
class ColorChip {
    constructor(initialColor, colorMode, mat, controllerMaster) {
        this.layer = document.createElement('div');
        // this.layer.classList.add('colorChip');
        this.layer.style.width = "100%";
        this.layer.style.height = "100%";
        this.layer.style.position = "absolute";
        this.layer.style.top = "0";
        this.layer.style.left = "0";
        this.controllerMaster = controllerMaster;

        if(colorMode === "simple") {
            // this.layer.style.backgroundColor = initialColor;
            this.createSimpleColorControls();
        } else if(colorMode === "pattern") {
            this.createPatternControls();
        }
    }
    
    HSLupdate (tgt, h, s, l) {
        tgt.style.background = `hsl(${h},${s}%,${l}%)`;
    }

    patternUpdate (tgt, pattern, scale, opacity, blendmode) {
        console.log(`The pattern will shown as follows: ${tgt}, ${pattern}, ${scale}px, ${opacity}, ${blendmode}`);
        tgt.style.backgroundImage = "url(./assets/images/pattern-" + pattern + ".png)";    
        tgt.style.backgroundSize = scale + "px";
        tgt.style.opacity = opacity / 100;
        tgt.style.backgroundBlendMode = blendmode;
    }

    createSimpleColorControls () {
        const controlGroup = document.createElement('div');
        controlGroup.classList.add('colorGroup');

        const controlGroupInner = document.createElement('div');
        controlGroupInner.classList.add('controlGroupInner');
        
        const controllerPanel = document.createElement('div');
        const controllerLabel = document.createElement('span');

        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');

        thumbnail.addEventListener('click', ()=>{
            controlGroupInner.classList.toggle('expanded');
        })
        
        controllerPanel.append(thumbnail);

        controllerLabel.addEventListener('click', ()=>{
            controllerPanel.classList.toggle('expanded');
        });

        const controlParts = [
            ['Hue',document.createElement('input')],
            ['Saturation',document.createElement('input')],
            ['Brightness',document.createElement('input')],
            ['Opacity',document.createElement('input')],
            ['Blend Mode',document.createElement('select')],
        ];

        for (let i = 0;i <= 2; i++){
            controlParts[i][1].addEventListener('change', ()=>{
                this.HSLupdate(this.layer,controlParts[0][1].value,controlParts[1][1].value,controlParts[2][1].value);
                this.HSLupdate(thumbnail,controlParts[0][1].value,controlParts[1][1].value,controlParts[2][1].value);
            });
        }
        controlParts[3][1].addEventListener('change', m=>{
            this.layer.style.opacity = controlParts[3][1].value / 100;
            thumbnail.style.opacity = controlParts[3][1].value / 100;
        });
        
        controlParts.forEach((part, i) => {
            const paragraph = document.createElement('p');

            part[1].setAttribute('type', 'range');
            part[1].setAttribute('min', '0');
            if(i === 0) {
                part[1].setAttribute('max', '360');
                part[1].setAttribute('value', Math.floor(Math.random() * 360));
            }else{
                part[1].setAttribute('max', '100');
                part[1].setAttribute('value', Math.floor(Math.random() * 100));
            }
            
            paragraph.append(part[0],part[1]);
            controllerPanel.append(paragraph); 
        });

        /* Define blend modes */
        const blendMode = [
            "Normal",
            "Multiply",
            "Screen",
            "Overlay",
            "Darken",
            "Lighten",
            "Color Dodge",
            "Color Burn",
            "Hard Light",
            "Soft Light",
            "Difference",
            "Exclusion",
            "Hue",
            "Saturation",
            "Color",
            "Luminosity"
        ];
        blendMode.forEach(mode=>{
            const option = document.createElement('option');
            option.value = mode;
            option.textContent = mode;
            controlParts[4][1].append(option);
        });

        controlParts[4][1].addEventListener('change', m=>{
            this.layer.style.mixBlendMode = controlParts[4][1].value;
        });

        controlGroup.innerHTML = '';
        controlGroup.append(thumbnail);
        controlGroupInner.append(controllerPanel);
        controlGroup.append(controlGroupInner);

        this.controllerMaster.append(controlGroup);
        this.HSLupdate(
            thumbnail,
            controlParts[0][1].value,controlParts[1][1].value,controlParts[2][1].value
        );
        this.HSLupdate(
            this.layer,
            controlParts[0][1].value,controlParts[1][1].value,controlParts[2][1].value
        );
    }

    createPatternControls() {
        const controlGroup = document.createElement('div');
        controlGroup.classList.add('colorGroup');

        const controlGroupInner = document.createElement('div');
        controlGroupInner.classList.add('controlGroupInner');
        
        const controllerPanel = document.createElement('div');
        const controllerLabel = document.createElement('span');

        const thumbnail = document.createElement('div');
        thumbnail.style.backgroundColor = "#000";
        thumbnail.classList.add('thumbnail');

        controllerPanel.append(thumbnail);

        thumbnail.addEventListener('click', ()=>{
            controlGroupInner.classList.toggle('expanded');
        });
        
        controllerLabel.addEventListener('click', ()=>{
            controllerPanel.classList.toggle('expanded');
        });

        /* Define Patterns */
        const patterns = [
            ["Polka Dot", "polka-dot"],
            ["Checkboard", "checkboard"],
            // ["Stripes", "stripes"],
            // ["Grid", "grid"],
            // ["Crosshatch", "crosshatch"],
            // ["Dots", "dots"],
            // ["Hatch", "hatch"],
            // ["Oil", "oil"],
            // ["Sphere", "sphere"],
            // ["Tile", "tile"],
            // ["Trellis", "trellis"],
            // ["Zigzag", "zigzag"]
        ];

        const patternController = document.createElement('div');
        patterns.forEach(pattern => {
            const anchor = document.createElement('a');
            anchor.href = '#';
            anchor.style.background = "url(./assets/images/pattern-" + pattern[1] + ".png), #000000";
            anchor.style.display ="inline-block";
            anchor.style.width = "32px";
            anchor.style.height = "32px";
            anchor.style.margin="0 2px 0 0";
            anchor.style.lineHeight="0";
            anchor.style.backgroundSize = "24px";
            this.layer.dataset.patternName = pattern[1];

            anchor.addEventListener('click', m => {
                m.preventDefault();
                this.layer.dataset.patternName = pattern[1];
                this.patternUpdate(thumbnail,  this.layer.dataset.patternName,  controlParts[0][1].value , controlParts[1][1].value, "none");
                this.patternUpdate(this.layer, this.layer.dataset.patternName, 16, 100, controlParts[2][1].value);
            });
            patternController.append(anchor);
        });
        controllerPanel.append(patternController); 

        
        const controlParts = [
            ["Scale",document.createElement('input')],
            ["Opacity", document.createElement('input')],
            ["Blend Mode", document.createElement('select')],
        ];

        controlParts.forEach((part, i) => {
            const paragraph = document.createElement('p');
            
            paragraph.append(part[0],part[1]);
            controllerPanel.append(paragraph); 
        });
        
        // Scale Controls
        controlParts[0][1].type= "range";
        controlParts[0][1].min= "1";
        controlParts[0][1].max= "128";
        controlParts[0][1].value= "32";
        controlParts[0][1].addEventListener('change', m=>{
        this.patternUpdate(thumbnail,  this.layer.dataset.patternName,  controlParts[0][1].value, controlParts[1][1].value,  "none");
        this.patternUpdate(this.layer,  this.layer.dataset.patternName,  controlParts[0][1].value, controlParts[1][1].value, controlParts[2][1].value);
        });

        // Opacity Controls
        controlParts[1][1].type= "range";
        controlParts[1][1].min= "0";
        controlParts[1][1].max= "100";
        controlParts[1][1].value= "100";
        controlParts[1][1].addEventListener('change', m=>{
        this.patternUpdate(thumbnail,  this.layer.dataset.patternName,  controlParts[0][1].value , controlParts[1][1].value, "none");
        this.patternUpdate(this.layer,  this.layer.dataset.patternName,  controlParts[0][1].value, controlParts[1][1].value);
        });
        
        /* Define blend modes */
        const blendMode = [
            "Normal",
            "Multiply",
            "Screen",
            "Overlay",
            "Darken",
            "Lighten",
            "Color Dodge",
            "Color Burn",
            "Hard Light",
            "Soft Light",
            "Difference",
            "Exclusion",
            "Hue",
            "Saturation",
            "Color",
            "Luminosity"
        ];

        blendMode.forEach(mode=>{
            const option = document.createElement('option');
            option.value = mode;
            option.textContent = mode;
            controlParts[2][1].append(option);
        });

        controlParts[2][1].addEventListener('change', m=>{
            console.log(m.target.value);
            this.layer.style.mixBlendMode = m.target.value;
        });

        controlGroup.innerHTML = '';
        controlGroup.append(thumbnail);
        controlGroupInner.append(controllerPanel);
        controlGroup.append(controlGroupInner);
        controlGroupInner.append(controlParts[2][1]);
        
        this.patternUpdate(thumbnail, "polka-dot", 16, 100, controlParts[2][1].value);
        this.patternUpdate(this.layer, "polka-dot", 16, 100, controlParts[2][1].value);

        this.controllerMaster.append(controlGroup);
    }
}

class ColorMat {
    constructor (addTo,controllerMaster) {
        this.matMain = document.createElement('div');   
        this.matMain.classList.add('mat_main');

        this.mat = document.createElement('div');   
        this.mat.classList.add('mat');
        this.mat.style.width = "100%";
        this.mat.style.height = "100%";
        this.mat.style.position = "relative";
        
        this.controllerMaster = controllerMaster;

        this.palette = document.createElement('div');
        this.palette.classList.add('mat_palette');

        this.layerID = 0;
        this.layers = [];
        
        this.matMain.append(this.mat);
        this.matMain.append(this.controllerMaster);
        this.addColorLayer( `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`, "simple");

        this.simpleColorAddBtn = document.createElement('div');
        this.simpleColorAddBtn.textContent = " Color";
        this.simpleColorAddBtn.classList.add('plusBtn');
        this.simpleColorAddBtn.addEventListener('click', ()=>{
        this.addColorLayer( `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`, "simple");
        });
        
        this.patternAddBtn = document.createElement('div');
        this.patternAddBtn.textContent = " Pattern";
        this.patternAddBtn.classList.add('plusBtn');
        this.patternAddBtn.style.top = "40px";
        this.patternAddBtn.addEventListener('click', ()=>{
        this.addPattern();
        });

        this.palette.append(this.simpleColorAddBtn);
        this.palette.append(this.patternAddBtn);
        controllerMaster.append(this.palette);

        addTo.append(this.matMain);
    }
    
    addColorLayer (color = "#FFFFFF", mode = "simple") {
        this.layerID++;
        this.layers.push(new ColorChip(color, mode, this.mat, this.palette));
        this.reRender();
    }

    addPattern () {
        this.layerID++;
        this.layers.push(new ColorChip("#000000", "pattern", this.mat, this.palette));
        this.reRender();
    }
    
    reRender () {
        this.mat.innerHTML = "";
        this.layers.forEach(l=>{
            this.mat.append(l.layer);
        });
    }
}
// Color Managements end
//  ______________________

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
});

document.querySelector('.character_adder__rolf').addEventListener('click', b=>{
    b.preventDefault();
    characters.push(new Rolf());
});

// Print button
document.querySelector('.printBtn').addEventListener('click', ()=>{window.print();});

// Theatre mode button
document.querySelector('.theatreBtn').addEventListener('click', b=>{
    b.preventDefault();
    document.querySelector('body').classList.toggle('theatreMode');
});

// background setting button
document.querySelector('.theatre_background_setter a').addEventListener('click', b=>{
    b.preventDefault();
    document.querySelector('.theatre_background_setter').classList.toggle('expanded');
});

const backgroundParts = [
    '.background_01',
    '.background_02',
    '.background_03',
]

document.querySelectorAll('.theatre_background_setter input').forEach((radio, index)=>{
    radio.addEventListener('click', (item)=>{
        console.log(item.target.id);
        document.querySelector('.theatre_background_setter').classList.remove('expanded');
        
        wipeAllSnowdrops ();
        wipeAllColorballs ();
            
        backgroundParts.forEach(bgs=>{
            document.querySelector(bgs).classList.remove('expanded');
        });
    
        console.log(document.querySelector(backgroundParts[index]));
        document.querySelector(backgroundParts[index]).classList.add('expanded');
    });
});

document.getElementById('theatre_background_snowfall').addEventListener('click',function(){
    initiateSnowdrop();
});

document.getElementById('theatre_background_spotlight').addEventListener('click',function(){
    initiateColorball();
});

/* Snowdrop-Related */
let snowDropStats = [];
function initiateSnowdrop () {
    document.querySelectorAll('.jonny,.jimmy,.rolf').forEach(chars=>{chars.classList.add('snowCoated')});
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
    document.querySelectorAll('.jonny,.jimmy,.rolf').forEach(chars=>{chars.classList.remove('snowCoated')});
    document.querySelectorAll('.snowDrop').forEach(f=>f.remove());
    snowDropStats = [];
}

/* Colorball-Related */
let colorballStats = [];
function initiateColorball() {
    document.querySelectorAll('.jonny,.jimmy,.rolf').forEach(chars=>{chars.classList.add('withSpotlight')});
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
    document.querySelectorAll('.jonny, .jimmy,.rolf').forEach(chars=>{chars.classList.remove('withSpotlight')});
    document.querySelectorAll('.colorBall').forEach(f=>f.remove());
    colorballStats = [];
}



