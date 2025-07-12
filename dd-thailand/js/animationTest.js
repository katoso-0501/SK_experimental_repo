
let currentBeat = 0;
let maximumBeat = 4;
let promisedBeat = 0;
let millisec = 400;
let animationBehavior = 0;
let imageSrc = "./img/beat01.jpg";

function updateBeat (){
    currentBeat++;
    const img = document.querySelector('.variableImg');
    if(currentBeat>maximumBeat){
        currentBeat = 1;

        if(promisedBeat > 0) {
            maximumBeat = promisedBeat;
            promisedBeat = 0;
        }
    }

    if(promisedBeat>0){
        document.querySelector('.beat_indication').textContent = "Beats: "+ currentBeat + " / " + maximumBeat +
         "  Beats will be changed at the end of current measure";
    }else{
        document.querySelector('.beat_indication').textContent = "Beats: "+ currentBeat + " / " + maximumBeat;
    }
    const formattedBeat = String(currentBeat).padStart(2,"0");

    img.src = "./img/beat"+formattedBeat+".jpg"
}

updateBeat();
let interv = setInterval(updateBeat, millisec);

document.querySelector('.button_update').addEventListener('click', ()=>{
    const input = document.querySelector('.millisec');

    if(promisedBeat > 0) {
        maximumBeat = promisedBeat;
        promisedBeat = 0;
    }

    // If you input invalid value, show a modal
    if(String(Number(input.value) + 25) == "NaN" || input.value=="")  {
        popupModal('Sorry, invalid input!');
    }else {
        console.log(Number(input.value));
        millisec = input.value;
        document.querySelector('.bpm').value = Math.floor((60 / input.value) * 1000);
    }


    document.querySelectorAll(".animated_parent, .animated_image, .beat_lamp_child").forEach(f=>{
        let a = millisec + "ms";
        f.style.animation = null;
        f.style.animationDuration = a;
        f.style.animationIterationCount = "infinite";
    });

    clearInterval(interv);
    
    currentBeat = 0;
    updateBeat();
    interv = setInterval(updateBeat,millisec);
    document.querySelector('.beat_lamp_child').style.display="block";
});

document.querySelector('.bpm_minus10').addEventListener('click', ()=>{
    const input = document.querySelector('.bpm');
    const a = Number(input.value) - 10;
    input.value = a;
    changeTempoByBPM();
});
document.querySelector('.bpm_minus1').addEventListener('click', ()=>{
    const input = document.querySelector('.bpm');
    const a = Number(input.value) - 1;
    input.value = a;
    changeTempoByBPM();
});
document.querySelector('.bpm_plus1').addEventListener('click', ()=>{
    const input = document.querySelector('.bpm');
    const a = Number(input.value) + 1;
    input.value = a;
    changeTempoByBPM();
});

document.querySelector('.bpm_plus10').addEventListener('click', ()=>{
    const input = document.querySelector('.bpm');
    const a = Number(input.value) + 10;
    input.value = a;
    changeTempoByBPM();
});

document.querySelector('.bpm_button_update').addEventListener('click', changeTempoByBPM);
document.querySelector('.stopbutton').addEventListener('click', stopBeats);

/* Setting for animation behavior */
document.querySelectorAll(".behavior_changer").forEach(function(d,g){
    const index = g;
    d.addEventListener('click',function(){
        animationBehavior = index;

        const iw = document.querySelector('.image_wrapper');
        iw.classList.remove("monkeyDance");
        iw.classList.remove("heartbeat");
        iw.classList.remove("jumper");
        iw.classList.remove("see_saw");

        let animationName;
        switch (index) {
            case 0:
                animationName = "Monkey Dance";
                iw.classList.add("monkeyDance");
                break;
            case 1:
                animationName = "Heartbeat";
                iw.classList.add("heartbeat");
                break;
            case 2:
                animationName = "Jumper";
                iw.classList.add("jumper");
                break;
            case 3:
                animationName = "See Saw";
                iw.classList.add("see_saw");
                break;
        }
        document.querySelector('.behavior_indication span').textContent = animationName;
    });
});

for(let i = 2; i <= 10; i++) {
    const ind = ".beatChanger"+i;
    document.querySelectorAll(ind).forEach(f=>{
        f.addEventListener('click',s=>{
            promisedBeat = i;
            s.preventDefault();
        });
    });
}

window.addEventListener("keydown", (j)=>{
    var a = false;
    document.querySelectorAll('input').forEach(f=>{
        if(f.matches(':focus')){
            a = true;
        }
    });

    if(a) {
        return;
    }

    for(let i = 1; i <= 9; i++) {
        if(j.key === String(i)) {
            let f = parseInt(j.key);
            if(j.key == "1") {
                f = 10;
            }
            if(!a){
                promisedBeat = f;
            }
        }
    }

    if(j.key === "s" || j.key === "S") {
        changeTempoByBPM ();
    }

    if(j.key === "x" || j.key === "X") {
        stopBeats();
    }

    if(j.code === "ArrowLeft") {
    const input = document.querySelector('.bpm');
    const a = Number(input.value) - 1;
    input.value = a;
    changeTempoByBPM();
    }

    if(j.code === "ArrowRight") {
    const input = document.querySelector('.bpm');
    const a = Number(input.value) + 1;
    input.value = a;
    changeTempoByBPM();
    }
});

function stopBeats () {
    document.querySelectorAll(".animated_parent, .animated_image, .beat_lamp_child").forEach(f=>{
        f.style.animationDuration = "0.12s";
        f.style.animationIterationCount = "1";
        f.style.animationFillMode ="forwards";
        f.style.animation = "none";
    });
    
    clearInterval(interv);
    currentBeat = 0;
    document.querySelector('.beat_indication').textContent = "Beats: ---";
    document.querySelector('.beat_lamp_child').style.display="none";
}

function changeTempoByBPM () {    
    const input = document.querySelector('.bpm');
    
    if(promisedBeat > 0) {
        maximumBeat = promisedBeat;
        promisedBeat = 0;
    }

    if(String(Number(input.value) + 25) == "NaN" || input.value == "" || input.value <= 0)  {
        popupModal('Sorry, invalid input!');
        const c = Math.floor((60 / document.querySelector('.millisec').value) * 1000);
        input.value = c;
    } else if (input.value >= 5000) {
        popupModal('BPM is too high to perform.');
    } else {
        const c = Math.floor((60 / Number(input.value)) * 1000);
        millisec = c;
        document.querySelector('.millisec').value = c;
    }

    document.querySelectorAll(".animated_parent, .animated_image, .beat_lamp_child").forEach(f=>{
        let a = millisec + "ms";
        f.style.animation = null;
        f.style.animationDuration = a;
        f.style.animationIterationCount = "infinite";
    });
    
    clearInterval(interv);
    currentBeat = 0;
    updateBeat();
    interv = setInterval(updateBeat,millisec);
    document.querySelector('.beat_lamp_child').style.display="block";
}

// When picture is uploaded, create an element and place it to the bottom of page
document.querySelector('#imageFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        // Accept only jpg, png, webp, or gif
        if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/webp' && file.type !== 'image/gif') {
            popupModal("U can only upload JPG, PNG, WEBP, or GIF files.");
            return;
        }
        
        // Restrict file size up to 3MB
        if(file.size > 3 * 1024 * 1024) {
            popupModal("File size is too large. Please upload a file smaller than 3MB.");
            return;
        }

        try {
            const imgParent = document.createElement('div');
            imgParent.classList.add('animated_parent');
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('animated_image');
            
            imgParent.appendChild(img);
            document.querySelector('.image_wrapper').appendChild(imgParent);
        } catch (error) {
            popupModal("Oops! Something went wrong and failed to upload the image.");
            console.error(error);
        }
    }
    reader.readAsDataURL(file);
});

// Pop up modal with message
const modal = document.querySelector('.modal');
modal.addEventListener('click', ()=>{
    modal.classList.remove('expanded');
});

function popupModal(message) {
    modal.classList.add('expanded');
    document.querySelector('.modal_message').textContent = message;

    // Hide modal automatically after 3 sec or click somewhere else
    setTimeout(()=>{
        modal.classList.remove('expanded');
    }, 3000);
}