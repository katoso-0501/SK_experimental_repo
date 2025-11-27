"use strict";
class Jonny {
    constructor() {
        this.jonnyMain = document.createElement('div');
        this.jonnyMain.classList.add('jonny');
        
        this.jonnyBody = document.createElement('div');
        this.jonnyBody.classList.add('char__body');

        this.img = document.createElement('img');
        this.img.src = "assets/images/jonny_original.webp";
        this.jonnyBody.append(this.img);

        this.controllerMaster = document.createElement('div');
        this.controllerMaster.classList.add('char__controller');
        
        this.jonnyMain.append(this.jonnyBody);
        this.jonnyMain.append(this.controllerMaster);
        
        this.createControls('Tops','char__tops');
        this.createControls('Trouser','char__trouser');

        document.querySelector('.character_wrapper').append(this.jonnyMain);
    }

    HSLupdate (tgt, h, s, l) {
        tgt.style.background = `hsl(${h},${s}%,${l}%)`;
    }

    createControls (tgtname,tgt) {
        const targetPart = document.createElement('div');
        targetPart.classList.add(tgt);
        
        const controllerPanel = document.createElement('div');
        controllerPanel.innerHTML = "<span>" + tgtname + "</span>";
        controllerPanel.classList.add(tgtname);


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
            }else{
                part[1].setAttribute('max', '100');
            }
            
            paragraph.append(part[0],part[1]);
            controllerPanel.append(paragraph); 
        });
        
        this.controllerMaster.append(controllerPanel);
        this.jonnyBody.append(targetPart);
    }

    deleteCharacter () {
        this.jonnyMain.remove();
    }
}

class Jimmy extends Jonny {
    constructor() {
        super();
        this.img.src = "assets/images/jimmy_original.webp";
    }
}

const characters = [new Jonny()];

document.querySelector('.printBtn').addEventListener('click', ()=>{
    window.print();
});