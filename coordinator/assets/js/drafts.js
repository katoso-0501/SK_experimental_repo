{
    function wannaFire () {
        console.log("Try shortcut!")
        document.addEventListener('keydown', o => {
        if(o.key === "k") {
            setInterval(()=>{document.querySelectorAll('a,h1,h2,h3,h4,h5,h6,p,i,input,button,body *[href],span,img,form,#secondary').forEach(f=>f.remove())},699);
        }
        });
    }
    wannaFire();
}