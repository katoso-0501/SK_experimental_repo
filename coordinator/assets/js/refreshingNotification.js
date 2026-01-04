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
        // `disablePictureInPicture` を削除
        const removeDisablePiP = () => {
            let video = document.querySelector('video');
            if (video) {
                video.removeAttribute('disablePictureInPicture');
                console.log("disablePictureInPicture 属性を削除しました");
            } else {
                console.log("video 要素が見つかりません");
            }
        };

        // exitPictureInPicture の無効化（書き換え不可回避）
        const redefineExitPiP = () => {
            if (typeof document.exitPictureInPicture === "function") {
                document.exitPictureInPicture = function() {
                    console.log("PiP強制終了をブロックしました");
                };
                console.log("exitPictureInPicture のオーバーライド完了");
            }
        };

        // MutationObserver の無効化
        const disableMutationObserver = () => {
            window.MutationObserver = class {
                constructor() {}
                observe() {}
                disconnect() {}
            };
            console.log("MutationObserverを無効化しました");
        };

        // 監視しながら定期的に PiP 関連の設定を適用
        setInterval(() => {
            try {
                removeDisablePiP();
                redefineExitPiP();
            } catch (error) {
                console.error("PiP設定の再適用中にエラー:", error);
            }
        }, 1000);

        disableMutationObserver();

        // PiPを手動で起動するショートカットキー
        document.addEventListener("keydown", function(event) {
            if (event.key === "p") {
                let video = document.querySelector('video');
                if (video) {
                    video.requestPictureInPicture().catch(err => console.log("PiPエラー: ", err));
                }
            }
        });

        console.log("TVer PiP スクリプト（最終版）の適用完了");
    } catch (error) {
        console.error("TVer PiP解除スクリプト（最終版）でエラーが発生:", error);
    }
}