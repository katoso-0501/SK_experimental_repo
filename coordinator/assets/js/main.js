
const tops = document.querySelector('.jonny__tops');
const trouser = document.querySelector('.jonny__trouser');

const jonny_tops_hsl = [50,50,100];
const jonny_trouser_hsl = [50,50,14];

document.querySelector('.jonny__tops_hue').addEventListener('change', m=>{
    const hue = m.target.value;
    jonny_tops_hsl[0] = hue;
    changeHSL(tops,jonny_tops_hsl[0],jonny_tops_hsl[1],jonny_tops_hsl[2]);
});
document.querySelector('.jonny__tops_saturation').addEventListener('change', m=>{
    const saturation = m.target.value;
    jonny_tops_hsl[1] = saturation;
    changeHSL(tops,jonny_tops_hsl[0],jonny_tops_hsl[1],jonny_tops_hsl[2]);
});
document.querySelector('.jonny__tops_brightness').addEventListener('change', m=>{
    const brightness = m.target.value;
    jonny_tops_hsl[2] = brightness;
    changeHSL(tops,jonny_tops_hsl[0],jonny_tops_hsl[1],jonny_tops_hsl[2]);
});


document.querySelector('.jonny__trouser_hue').addEventListener('change', m=>{
    const hue = m.target.value;
    jonny_trouser_hsl[0] = hue;
    changeHSL(trouser,jonny_trouser_hsl[0],jonny_trouser_hsl[1],jonny_trouser_hsl[2]);
});
document.querySelector('.jonny__trouser_saturation').addEventListener('change', m=>{
    const saturation = m.target.value;
    jonny_trouser_hsl[1] = saturation;
    changeHSL(trouser,jonny_trouser_hsl[0],jonny_trouser_hsl[1],jonny_trouser_hsl[2]);
});
document.querySelector('.jonny__trouser_brightness').addEventListener('change', m=>{
    const brightness = m.target.value;
    jonny_trouser_hsl[2] = brightness;
    changeHSL(trouser,jonny_trouser_hsl[0],jonny_trouser_hsl[1],jonny_trouser_hsl[2]);
});


function changeHSL (tgt,h,s,l) {
    tgt.style.background = `hsl(${h},${s}%,${l}%)`;
}

window.addEventListener('load', ()=>{
    changeHSL(tops,jonny_tops_hsl[0],jonny_tops_hsl[1],jonny_tops_hsl[2]);
    changeHSL(trouser,jonny_trouser_hsl[0],jonny_trouser_hsl[1],jonny_trouser_hsl[2]);
});