function refreshingNotification () {
    console.log("Did you forget something?")
    const notification = new Audio();
    setTimeout(()=>{notification.src = 'https://osabisi.sakura.ne.jp/m2/tm4/se/tm2_whistle000.wav';},299000);
    setTimeout(()=>{notification.play();},300000);
    setTimeout(()=>{notification.play();},360000);
    setTimeout(()=>{notification.play();},420000);
}
