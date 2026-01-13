function refreshingNotification () {
    console.log("Did you forget something?")
    const notification = new Audio();
    setTimeout(()=>{
        notification.src = 'https://osabisi.sakura.ne.jp/m2/tm4/se/tm2_whistle000.wav';
        notification.addEventListener('stalled', ()=>{
            window.location.reload();
        });
    },299000);
    if(new Date().getHours() <= 8) {
        setTimeout(()=>{window.location.reload();},300000);
    }else{
        setTimeout(()=>{notification.play();},300000);
        setTimeout(()=>{notification.play();},360000);
        setTimeout(()=>{notification.play();},420000);
        setTimeout(()=>{window.location.reload()},480000);
    }
}

function enablePiPBypass() {
    try {
        const removeDisablePiP = () => {
            let video = document.querySelector('video');
            if (video) {
                video.removeAttribute('disablePictureInPicture');
            }
        };

        const redefineExitPiP = () => {
            if (typeof document.exitPictureInPicture === "function") {
                document.exitPictureInPicture = function() {
                };
            }
        };

        const disableMutationObserver = () => {
            window.MutationObserver = class {
                constructor() {}
                observe() {}
                disconnect() {}
            };
        };

        setInterval(() => {
            try {
                removeDisablePiP();
                redefineExitPiP();
            } catch (error) {
                console.error("PiP設定の再適用中にエラー:", error);
            }
        }, 1000);

        disableMutationObserver();

        document.addEventListener("keydown", function(event) {
            if (event.key === "p") {
                let video = document.querySelector('video');
                if (video) {
                    video.requestPictureInPicture().catch(err => console.log("PiPエラー: ", err));
                }
            }
        });

        console.log("PiP Disabler Blocker Enabled.");
    } catch (error) {
        console.error("PiP Disabler Blocker Error:", error);
    }
}