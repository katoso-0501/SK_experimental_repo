"use strict";
class Jonny {
    constructor() {
        this.jonnyMain = document.createElement('div');
        this.jonnyMain.classList.add('jonny');
        
        this.jonnyBody = document.createElement('div');
        this.jonnyBody.classList.add('jonny__body');

        this.img = document.createElement('img');
        this.img.src = "assets/images/jonny_original.webp";

        const tops = document.createElement('div'); 
        tops.classList.add('jonny__tops');
        const trouser = document.createElement('div');
        trouser.classList.add('jonny__trouser');

        const controllerMaster = document.createElement('div');
        controllerMaster.classList.add('jonny__controller');

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
        
        controllerParts[0][1].classList.add('jonny__tops_hue');
        controllerParts[1][1].classList.add('jonny__tops_saturation');
        controllerParts[2][1].classList.add('jonny__tops_brightness');
        controllerParts[3][1].classList.add('jonny__trouser_hue');
        controllerParts[4][1].classList.add('jonny__trouser_saturation');
        controllerParts[5][1].classList.add('jonny__trouser_brightness');

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
            // controllerMaster.append(paragraph);
        });
        
        this.jonnyBody.append(this.img,tops,trouser);
        this.jonnyMain.append(this.jonnyBody);
        this.jonnyMain.append(controllerMaster);

        
        controllerParts[0][1].addEventListener('change', m=>{
            const hue = m.target.value;
            jonny_tops_hsl[0] = hue;
            this.HSLupdate(tops,jonny_tops_hsl[0],jonny_tops_hsl[1],jonny_tops_hsl[2]);
        });
        controllerParts[1][1].addEventListener('change', m=>{
            const saturation = m.target.value;
            jonny_tops_hsl[1] = saturation;
            this.HSLupdate(tops,jonny_tops_hsl[0],jonny_tops_hsl[1],jonny_tops_hsl[2]);
        });
        controllerParts[2][1].addEventListener('change', m=>{
            const brightness = m.target.value;
            jonny_tops_hsl[2] = brightness;
            this.HSLupdate(tops,jonny_tops_hsl[0],jonny_tops_hsl[1],jonny_tops_hsl[2]);
        });


        controllerParts[3][1].addEventListener('change', m=>{
            const hue = m.target.value;
            jonny_trouser_hsl[0] = hue;
            this.HSLupdate(trouser,jonny_trouser_hsl[0],jonny_trouser_hsl[1],jonny_trouser_hsl[2]);
        });
        controllerParts[4][1].addEventListener('change', m=>{
            const saturation = m.target.value;
            jonny_trouser_hsl[1] = saturation;
            this.HSLupdate(trouser,jonny_trouser_hsl[0],jonny_trouser_hsl[1],jonny_trouser_hsl[2]);
        });
        controllerParts[5][1].addEventListener('change', m=>{
            const brightness = m.target.value;
            jonny_trouser_hsl[2] = brightness;
            this.HSLupdate(trouser,jonny_trouser_hsl[0],jonny_trouser_hsl[1],jonny_trouser_hsl[2]);
        });

        document.querySelector('body').append(this.jonnyMain);
    }

    HSLupdate (tgt, h, s, l) {
        tgt.style.background = `hsl(${h},${s}%,${l}%)`;
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