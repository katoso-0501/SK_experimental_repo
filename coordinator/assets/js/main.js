"use strict";
class Jonny {
    constructor() {
        this.jonnyMain = document.createElement('div');
        this.jonnyMain.classList.add('jonny');
        
        this.jonnyBody = document.createElement('div');
        this.jonnyBody.classList.add('char__body');

        this.img = document.createElement('img');
        this.img.src = "assets/images/jonny_original.webp";

        const tops = document.createElement('div'); 
        tops.classList.add('char__tops');
        const trouser = document.createElement('div');
        trouser.classList.add('char__trouser');

        const controllerMaster = document.createElement('div');
        controllerMaster.classList.add('char__controller');

        const controllerDiv = [
            ["Tops",document.createElement('div')],
            ["Trouser",document.createElement('div')],
        ]

        controllerDiv.forEach(div=>{
            div[1].classList.add(div[0]);
            div[1].innerHTML = "<span>" + div[0] + "</span>";
            controllerMaster.append(div[1]);
        })


        // Create Controller's Parts
        const controllerParts =
        [
            ['Hue',document.createElement('input')],
            ['Saturation',document.createElement('input')],
            ['Brightness',document.createElement('input')],
            ['Hue',document.createElement('input')],
            ['Saturation',document.createElement('input')],
            ['Brightness',document.createElement('input')],
        ]
        
        controllerParts[0][1].classList.add('char__tops_hue');
        controllerParts[1][1].classList.add('char__tops_saturation');
        controllerParts[2][1].classList.add('char__tops_brightness');
        controllerParts[3][1].classList.add('char__trouser_hue');
        controllerParts[4][1].classList.add('char__trouser_saturation');
        controllerParts[5][1].classList.add('char__trouser_brightness');

        controllerParts.forEach((part, i) => {
            const paragraph = document.createElement('p');

            part[1].setAttribute('type', 'range');
            part[1].setAttribute('min', '0');
            if(i === 0 || i ===  3) {
                part[1].setAttribute('max', '360');
            }else{

                part[1].setAttribute('max', '100');
            }
            
            paragraph.append(part[0],part[1]);
            if(i < 3){
                controllerDiv[0][1].append(paragraph);
            }else{
                controllerDiv[1][1].append(paragraph);
            }
        });
        
        this.jonnyBody.append(this.img,tops,trouser);
        this.jonnyMain.append(this.jonnyBody);
        this.jonnyMain.append(controllerMaster);

        
        controllerParts[0][1].addEventListener('change', m=>{
            this.HSLupdate(tops,controllerParts[0][1].value,controllerParts[1][1].value,controllerParts[2][1].value);
        });
        controllerParts[1][1].addEventListener('change', m=>{
            this.HSLupdate(tops,controllerParts[0][1].value,controllerParts[1][1].value,controllerParts[2][1].value);
        });
        controllerParts[2][1].addEventListener('change', m=>{
            this.HSLupdate(tops,controllerParts[0][1].value,controllerParts[1][1].value,controllerParts[2][1].value);
        });


        controllerParts[3][1].addEventListener('change', m=>{
            this.HSLupdate(trouser,controllerParts[3][1].value,controllerParts[4][1].value,controllerParts[5][1].value);
        });
        controllerParts[4][1].addEventListener('change', m=>{
            this.HSLupdate(trouser,controllerParts[3][1].value,controllerParts[4][1].value,controllerParts[5][1].value);
        });
        controllerParts[5][1].addEventListener('change', m=>{
            this.HSLupdate(trouser,controllerParts[3][1].value,controllerParts[4][1].value,controllerParts[5][1].value);
        });

        document.querySelector('.character_wrapper').append(this.jonnyMain);
    }

    HSLupdate (tgt, h, s, l) {
        tgt.style.background = `hsl(${h},${s}%,${l}%)`;
    }

    createControls () {
        const controllerMaster = document.createElement('div');
        controllerMaster.classList.add('char__controller');
        
        const controlParts = [
            ['Hue',document.createElement('input')],
            ['Saturation',document.createElement('input')],
            ['Brightness',document.createElement('input')],
        ];
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