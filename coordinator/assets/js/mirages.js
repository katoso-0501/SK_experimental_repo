'use strict';
{
    const mouse = [0,0];
    const mirages = [];
    let mirageCount = 20;
    let timeIntervalID;

    function activateMirage () {
        for (let i = 0; i < mirageCount; i++) {
            mirages.push([document.createElement('div'),{scale: 100, activePos: [0,0]}]);
            const m = mirages[i][0];
            m.style.position="fixed";
            m.style.zIndex = "9999999";
            m.style.pointerEvents="none";
            m.style.width = "120px";
            m.style.height = "120px";
            m.style.borderRadius = "50%";
            m.style.backdropFilter = "blur(" + Math.random()*5 + "px)";
        }
    
        mirages.forEach(mirage=>{
            document.querySelector('body').appendChild(mirage[0]);
        });
    
        timeIntervalID = setInterval( () => {
            document.querySelectorAll('iframe').forEach(f=>f.style.pointerEvents="none");
            mirages.forEach((f, index) => {
                f[1].activePos[0] += (mouse[0] - f[1].activePos[0]) / (4  * index);
                f[1].activePos[1] += (mouse[1] - f[1].activePos[1]) /  (4  * index);
                f[0].style.left = (f[1].activePos[0] + Math.random()*60 - 30) + "px";
                f[0].style.top = (f[1].activePos[1] + Math.random()*60 - 30)  + "px";
                f[0].style.backdropFilter = "blur(" + Math.random()*5 + "px)";

                if(f[1].activePos[0] === 0) {
                    f[1].activePos[0] = 10;
                }
                if(f[1].activePos[1] === 0) {
                    f[1].activePos[1] = 10;
                }
            });
        }, 17);
    }

    window.addEventListener('mousemove', f=>{
        mouse[0] = f.clientX - 60;
        mouse[1] = f.clientY - 60;
    });

    activateMirage();
}