
let currentBeat = 0;
let maximumBeat = 4;
let promisedBeat = 0;
let millisec = 400;
let animationBehavior = 0;
let imageSrc = "./assets/images/beat01.jpg";

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
        document.querySelector('.beat_indication').innerHTML = "Beats: "+ currentBeat + " / " + maximumBeat +
         "<small>Beats will be changed at the end of current measure</small>";
    }else{
        document.querySelector('.beat_indication').textContent = "Beats: "+ currentBeat + " / " + maximumBeat;
    }
    document.querySelector('.sticky_bpm_indicator__beats span').textContent =  currentBeat + " / " + maximumBeat;
    const formattedBeat = String(currentBeat).padStart(2,"0");

    img.src = "./assets/images/beat"+formattedBeat+".jpg"
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
        document.querySelector('.sticky_bpm_indicator__bpm span').textContent = document.querySelector('.bpm').value;
    }

    
    clearInterval(interv);
    currentBeat = 0;
    updateBeat();

    updateAnimatingPictures(millisec);

    interv = setInterval(updateBeat,millisec);
    document.querySelector('.beat_lamp_child').style.display = "block";
});

document.querySelectorAll('.bpm_minus10').forEach(f=>{
    f.addEventListener('click', (f)=>{
        f.preventDefault();
        const input = document.querySelector('.bpm');
        const a = Number(input.value) - 10;
        input.value = a;
        changeTempoByBPM();
    });
});
document.querySelectorAll('.bpm_minus1').forEach(f=>{
    f.addEventListener('click', (f)=>{
        f.preventDefault();
        const input = document.querySelector('.bpm');
        const a = Number(input.value) - 1;
        input.value = a;
        changeTempoByBPM();
    });
});
document.querySelectorAll('.bpm_plus1').forEach(f=>{
    f.addEventListener('click', (f)=>{
        f.preventDefault();
        const input = document.querySelector('.bpm');
        const a = Number(input.value) + 1;
        input.value = a;
        changeTempoByBPM();
    });
});

document.querySelectorAll('.bpm_plus10').forEach(f=>{
    f.addEventListener('click', (f)=>{
        f.preventDefault();
        const input = document.querySelector('.bpm');
        const a = Number(input.value) + 10;
        input.value = a;
        changeTempoByBPM();
    });
});

document.querySelector('.bpm_button_update').addEventListener('click', changeTempoByBPM);
document.querySelector('.stopbutton').addEventListener('click', stopBeats);

/* Setting for animation behavior */
document.querySelectorAll(".behavior_changer").forEach(function(d,g){
    const index = g;
    const names =
    [
        ["monkeyDance", "Monkey Dance"],
        ["heartbeat", "Heartbeat"],
        ["jumper", "Jumper"],
        ["see_saw", "See Saw"],
        ["blinker", "Blinker"],
        ["acrobatic", "Acrobatic"],
        ["moonsault", "Moonsault"],
        ["gelatin", "Gelatin"],
        ["tornadoSpin", "Tornado Spin"],
        ["glimmering", "Glimmering"],
        ["dazzling", "Dazzling"],
        ["marchingPerformance", "Marching Performance"],
        ["doNothing", "Do Nothing!"],
    ];
    d.addEventListener('click',function(){
        animationBehavior = index;

        // Remove Animation Classes
        document.querySelector('body').classList.remove("whenDazzlingBeating");
        document.querySelector('body').classList.remove("marchingPerformance");
        const iw = document.querySelector('.image_wrapper');
        for(let d = 0; d < names.length; d++){
            iw.classList.remove(names[d][0]);
        }

        // Add Selected Animation
        iw.classList.add(names[index][0]);
        document.querySelector('.behavior_indication span').textContent = names[index][1];
        
        if(names[index][0] === "dazzling"){
            document.querySelector('body').classList.add("whenDazzlingBeating");
        }
        
        if(currentBeat>0) {
            if(names[index][0] === "marchingPerformance"){
                updateAnimatingPictures (millisec);
                document.querySelector('body').classList.add("marchingPerformance");
            }else{
                updateAnimatingPictures (millisec);
            }
        }
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
    document.querySelector('.sticky_instant_changer_toggle').classList.remove('expanded');
    document.querySelector('.beat_indication').textContent = "Beats: ---";
    document.querySelector('.sticky_bpm_indicator__beats span').textContent =  "-----";
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

        if(document.querySelector('.image_wrapper').classList.contains('marchingPerformance')) {
            millisec = c * 1;
        } else {
            millisec = c;
        }
        
        document.querySelector('.sticky_bpm_indicator__bpm span').textContent = document.querySelector('.bpm').value;
        document.querySelector('.millisec').value = c;
    }
    updateAnimatingPictures(millisec);

    clearInterval(interv);
    currentBeat = 0;
    updateBeat();
    
    if(document.querySelector('.image_wrapper').classList.contains('marchingPerformance')) {
        interv = setInterval(updateBeat,(millisec / 1));
    } else {
        interv = setInterval(updateBeat,millisec);
    }
    document.querySelector('.beat_lamp_child').style.display="block";
    document.querySelector('.sticky_instant_changer_toggle').classList.add('expanded');
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

            const iw = document.querySelector('.image_wrapper').classList[1];
            document.querySelector('.image_wrapper').classList.remove(iw);
            setTimeout(()=>{
                document.querySelector('.image_wrapper').classList.add(iw);
            },35);
            
        } catch (error) {
            popupModal("Oops! Something went wrong and failed to upload the image.");
            console.error(error);
        }
    }
    reader.readAsDataURL(file);
    // Unselect the file in the file input
    document.querySelector('#imageFile').value = '';
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

// Remove The Default Pictures
document.querySelector('.general-remove-default-pics').addEventListener('click', ()=>{
    document.querySelectorAll('.defaultPic').forEach(f=>{
        f.remove();
    });
    document.querySelector('.general-remove-default-pics').setAttribute("disabled", "disabled");
});

//  Toggle One-hand Mode
document.querySelector('.general-toggle-one-hand-mode').addEventListener('click', ()=>{
    document.querySelector('body').classList.toggle('onehandMode');
});

document.querySelector('.new_add_image_to_beat').addEventListener('click', ()=>{
    document.querySelector('#imageFile').click();
});

// To prevent refreshing by swiping upward
let upwardSwipePrevention = false;
window.addEventListener("scroll", ()=>{
    preventUpwardSwipeRefreshing();
});
window.addEventListener("load", ()=>{
    preventUpwardSwipeRefreshing();
});
window.addEventListener("resize", ()=>{
    preventUpwardSwipeRefreshing();
});

function preventUpwardSwipeRefreshing () {
    if(window.innerWidth <= 768) {
        document.querySelector('body').classList.add('upwardSwipePrevention');
        upwardSwipePrevention = true;
    }else{
        document.querySelector('body').classList.remove('upwardSwipePrevention');
        upwardSwipePrevention = false;
    }

    if(upwardSwipePrevention) {
        if(window.scrollY<=600) {
            window.scrollTo(0, 601);
        }
    }
}

const bpmIndis = document.querySelectorAll('.sticky_bpm_indicator, .sticky_instant_changer');
window.addEventListener('scroll', ()=>{
    const a = upwardSwipePrevention ? 640 : 60;
    if(window.scrollY > a){
        document.querySelector('.sticky_bpm_indicator').classList.add('expanded');
    }else{
        bpmIndis.forEach(f=>{
            f.classList.remove('expanded');
        });
    }
});

document.querySelector('.sticky_instant_changer__btn').addEventListener('click', (s)=>{
    s.preventDefault();
    document.querySelector('.sticky_instant_changer').classList.toggle('expanded');
});

document.querySelector('.sticky_instant_changer_toggle').addEventListener('click', f=>{
    f.preventDefault();
    if(currentBeat>0) {
        stopBeats();
    }else{
        changeTempoByBPM();
    }
});

function updateAnimatingPictures (dur) {
    if(document.querySelector('.image_wrapper').classList.contains('marchingPerformance')) {
        dur *= 2;
        document.querySelectorAll(".animated_parent , .animated_image").forEach(f=>{
            let a = dur + "ms";
            f.style.animation = null;
            f.style.animationDuration = a;
            f.style.animationIterationCount = "infinite";
        });
        document.querySelectorAll(".beat_lamp_child").forEach(f=>{
            let a = (dur / 2) + "ms";
            f.style.animation = null;
            f.style.animationDuration = a;
            f.style.animationIterationCount = "infinite";
        });
    } else {
        document.querySelectorAll(".animated_parent, .animated_image, .beat_lamp_child").forEach(f=>{
            let a = dur + "ms";
            f.style.animation = null;
            f.style.animationDuration = a;
            f.style.animationIterationCount = "infinite";
        });
    }
}