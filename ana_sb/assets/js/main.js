"use strict";
let lockState = 0;
let unlockPushRemaining = 3;

document.querySelectorAll('.add_movie').forEach(adder=>{
    adder.addEventListener('click',x=>{
        x.preventDefault();
        document.querySelector('.more_movie_adder').classList.remove("expanded");
        createMovieEmbed(adder.dataset.ytid);
    });
});

let timeoutID;
const lockButton = document.querySelector('.lock_button');
lockButton.addEventListener('click', () => {
    const lockRemaining = document.querySelector('.lock_remaining');
    const itemToBeLocked = document.querySelectorAll('.itemToBeLocked');
    lockRemaining.innerHTML = '<span class="lock_potch"></span><span class="lock_potch"></span><span class="lock_potch"></span>';
    if (lockState == 0) {
        document.querySelector('.more_movie_adder').classList.remove("expanded");
        itemToBeLocked.forEach(i=>i.classList.add('locked'));
        lockState = 1;
        unlockPushRemaining = 3;
        lockRemaining.innerHTML = '<span class="lock_potch"></span><span class="lock_potch"></span><span class="lock_potch"></span>';
    } else {
        if(unlockPushRemaining>0) {
            clearTimeout(timeoutID);
            timeoutID=setTimeout(()=>{
                unlockPushRemaining=3;
                lockRemaining.innerHTML = '<span class="lock_potch"></span><span class="lock_potch"></span><span class="lock_potch"></span>';
            },4000);
            unlockPushRemaining--;
            for (let i = 0; i <= (2 - unlockPushRemaining); i++) {
                document.querySelectorAll('.lock_potch')[i].classList.add('active');
            }
        }
        if(unlockPushRemaining===0) {
            clearTimeout(timeoutID);
            itemToBeLocked.forEach(i=>i.classList.remove('locked'));
            lockState = 0;
            lockRemaining.innerHTML = "";
        }
    }
});

window.addEventListener('scroll', ()=>{
    upwardSwipePrevention();
});

window.addEventListener('load', ()=>{
    upwardSwipePrevention();
});

screen.orientation.addEventListener('change', ()=>{
    setTimeout(()=>{
        upwardSwipePrevention();
    },50);
})

function upwardSwipePrevention () {
    if(window.innerWidth < 768) {
        window.scrollTo(0,600);   
    }
}

function createMovieEmbed(movieID) {
const videoContainer = document.createElement('div');
videoContainer.classList.add('video_container');    
    const fullURL = "https://www.youtube.com/embed/"+movieID+"?enablejsapi=1";
    const video = document.createElement('iframe');
    video.setAttribute('width', '200%');
    video.setAttribute('height', '630');
    video.setAttribute('src', fullURL);
    video.setAttribute('title', 'YouTube video player');
    video.setAttribute('frameborder', '0');
    video.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    video.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    video.setAttribute('allowfullscreen', '');

    videoContainer.appendChild(video);

    const stopBtn = document.createElement('div');
    stopBtn.textContent="Stop";
    stopBtn.classList.add('stopBtn');
    stopBtn.addEventListener('click', ()=>{
        video.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    });

    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close_btn');

    closeBtn.addEventListener('click', f=>{
        videoContainer.classList.add('shrinked');
        setTimeout(()=>{
            videoContainer.remove();
        }, 1000);
    })
    videoContainer.appendChild(closeBtn);
    videoContainer.appendChild(stopBtn);

    const embedBody = document.querySelector('.embed_body');
    embedBody.appendChild(videoContainer);
}

// Create YT Embed by YTID
document.querySelector('.extending_item').addEventListener('submit', f=>{
    f.preventDefault();
    const j = document.querySelector('.extendingID').value;
    if(j !== "") {
        createMovieEmbed(j);
        document.querySelector('.extendingID').value = "";
    }
});

document.querySelector('.more_movie_adder__arrow').addEventListener('click', f=>{
    f.preventDefault();
    document.querySelector('.more_movie_adder').classList.toggle('expanded');
});