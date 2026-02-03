"use strict";
{
    let characterID = 0;
    //  __________________
    // Character classes start
    class JonnyA {
        constructor(decoded = null) {
            document.querySelector('.messageWhenEmpty').classList.remove('expanded');
            
            this.jonnyMain = document.createElement('div');
            this.jonnyMain.classList.add('jonnyA');
            this.jonnyMain.classList.add('char__main');
            
            this.charID = characterID;
            this.jonnyMain.dataset.charid = characterID;
            characterID++;
            
            this.jonnyBody = document.createElement('div');
            this.jonnyBody.classList.add('char__body');

            this.img = document.createElement('img');
            this.img.src = "assets/images/jonnyA_original.webp";
            this.jonnyBody.append(this.img);

            this.controllerMaster = document.createElement('div');
            this.controllerMaster.classList.add('char__controller');
            
            this.jonnyMain.append(this.jonnyBody);
            this.jonnyMain.append(this.controllerMaster);

            this.resurrectionSpell = { char : "JonnyA", parts: {}};

            this.exportBtn = document.createElement('span');
            this.exportBtn.classList.add('exportBtn');
            this.exportBtn.textContent = '...';
            this.exportBtn.addEventListener('click', ()=>{
                toggleMenuDialog(this.charID, this.exportBtn.getBoundingClientRect().left, this.exportBtn.getBoundingClientRect().top, this.contextMenuMaker());
            });

            this.mats = [];
            this.decodedSpell = null;
            if(decoded) this.decodedSpell = decoded;
            
            this.loadIndependentParts();

            this.jonnyBody.append(this.exportBtn);
            document.querySelector('.character_wrapper').append(this.jonnyMain);
        }

        loadIndependentParts () {
            this.createColormat('Tops','char__tops', this.decodedSpell);
            this.createColormat('Trouser','char__trouser', this.decodedSpell);
            this.createColormat('Skin','char__skin', this.decodedSpell);
        }

        createColormat (tgtname, tgt, decoded = null) {
            const targetPart = document.createElement('div');
            targetPart.classList.add(tgt);
            
            const controllerPanel = document.createElement('div');
            const controllerLabel = document.createElement('span');
            controllerPanel.classList.add(tgtname);
            controllerPanel.append(controllerLabel);
            controllerLabel.textContent = tgtname;

            let decodedPart = null;
            if(decoded){
                decodedPart = decoded?.parts[tgtname];
            }

            controllerLabel.addEventListener('click', ()=>{
                controllerPanel.classList.toggle('expanded');
            });

            const mat = new ColorMat (targetPart, controllerPanel, tgtname, decodedPart);
            this.mats.push(mat);

            this.resurrectionSpell.parts[tgtname] = mat.getMatObj();
            
            this.controllerMaster.append(controllerPanel);
            this.jonnyBody.append(targetPart);
        }

        deleteCharacter () {
            const randomAnimation = Math.floor(Math.random()*9);
            switch(randomAnimation) {
                case 0 :
                    this.jonnyMain.classList.add('animating_shrinkingOut');
                    break;
                case 1 :
                    this.jonnyMain.classList.add('animating_tornadoOut');
                    break;
                case 2 :
                    this.jonnyMain.classList.add('animating_jumpingOut');
                    break;
                case 3 :
                    this.jonnyMain.classList.add('animating_blurringOut');
                    break;
                case 4 :
                    this.jonnyMain.classList.add('animating_shadowedOut');
                    break;
                case 5 :
                    this.jonnyBody.classList.add('animating_stompedOut');
                    summonAnvil(
                        this.jonnyMain,
                        0,
                        0,
                        this.jonnyMain.getBoundingClientRect().width,
                        300
                    );
                    break;
                case 6 :
                    this.exportBtn.remove();
                    paperIsFun(0,
                        this.jonnyMain,
                        this.jonnyBody.getBoundingClientRect().left,
                        this.jonnyBody.getBoundingClientRect().top + window.scrollY - document.querySelector('header').getBoundingClientRect().height - 30,
                        this.jonnyBody.offsetWidth,
                        this.jonnyBody.offsetHeight
                    );
                    this.jonnyBody.style.opacity = 0;
                    break;
                case 7 :
                    this.exportBtn.remove();
                    checkers(this.jonnyMain, 7);
                    break;
                case 8 :
                    this.exportBtn.remove();
                    this.controllerMaster.remove();
                    paperIsFun(1,
                        this.jonnyMain,
                        this.jonnyBody.getBoundingClientRect().left,
                        this.jonnyBody.getBoundingClientRect().top + window.scrollY - document.querySelector('header').getBoundingClientRect().height - 30,
                        this.jonnyBody.offsetWidth,
                        this.jonnyBody.offsetHeight
                    );
                    this.jonnyBody.style.opacity = 0;
                    break;
            }
            
            this.controllerMaster.remove();
            this.exportBtn.remove(); 
            this.jonnyMain.dataset.charid = null;

            setTimeout(()=>{
                this.jonnyMain.remove();
                charHandler = 99;
                characters.splice(this.charID, 1);
                characters.forEach(char=>{
                    if(char.getCharID() > this.charID){
                        char.shiftIdLeftward();
                    }
                });
                characterID = characters.length;
                if(characters.length === 0){
                    document.querySelector('.messageWhenEmpty').classList.add("expanded");
                }
            }, 1000);

        }

        getCharID () {
            return this.charID;
        }

        shiftIdLeftward () {
            this.charID--;
            this.jonnyMain.dataset.charid = this.charID;
        }

        generateResurrectionSpell () {
            this.mats.forEach(mat=>{
                this.resurrectionSpell.parts[mat.targetName] = mat.getMatObj();
            });
            return JSON.stringify(this.resurrectionSpell);
        }

        contextMenuMaker () {
            const actions = [];
            const a = function () {
                try{
                    openSpellExportation(this.generateResurrectionSpell());
                }catch(err){
                    console.log("There's no character here");
                }
            }
            const b = function () {
                this.deleteCharacter();
            }
            actions.push(["Generate Spell", a.bind(this)],["Delete Character", b.bind(this)]);
            return actions;
        }

        tellThyName () {
            return this.resurrectionSpell.char;
        }
    }
    
    class JonnyB extends JonnyA {
        constructor(decoded = null) {
            super(decoded);
            this.resurrectionSpell.char = "JonnyB";
            this.img.src = "assets/images/jonnyB_original.webp";
            this.jonnyMain.classList.remove('jonnyA');
            this.jonnyMain.classList.add('jonnyB');
        }
        
        loadIndependentParts () {
            this.createColormat('Skin','char__skin', this.decodedSpell);
            this.createColormat('Diaper','char__diaper', this.decodedSpell);
            this.createColormat('Pacifier','char__pacifier', this.decodedSpell);
            this.createColormat('SafetyClip','char__safetyclip', this.decodedSpell);
        }
    }

    class JimmyA extends JonnyA {
        constructor(decoded = null) {
            super(decoded);
            this.resurrectionSpell.char = "JimmyA";
            this.img.src = "assets/images/jimmyA_original.webp";
            this.jonnyMain.classList.remove('jonnyA');
            this.jonnyMain.classList.add('jimmyA');
        }
        
        loadIndependentParts () {
            this.createColormat('Tops','char__tops', this.decodedSpell);
            this.createColormat('Trouser','char__trouser', this.decodedSpell);
            this.createColormat('TeethRetainer','char__retainer', this.decodedSpell);
        }
    }

    class RolfA extends JonnyA {
        constructor(decoded = null) {
            super(decoded);
            this.resurrectionSpell.char = "RolfA";
            this.img.src = "assets/images/rolfA_original.webp";
            this.jonnyMain.classList.remove('jonnyA');
            this.jonnyMain.classList.add('rolfA');
        }
        
        loadIndependentParts () {
            this.createColormat('Tops','char__tops', this.decodedSpell);
            this.createColormat('Trouser','char__trouser', this.decodedSpell);
            this.createColormat('Hair','char__hair', this.decodedSpell);
            this.createColormat('Socks','char__socks', this.decodedSpell);
            this.createColormat('Shoes','char__shoes', this.decodedSpell);
            this.createColormat('Grass','char__grass', this.decodedSpell);
        }
    }

    class KevinA extends JonnyA {
        constructor(decoded = null) {
            super(decoded);
            this.resurrectionSpell.char = "KevinA";
            this.img.src = "assets/images/kevinA_original.webp";
            this.jonnyMain.classList.remove('jonnyA');
            this.jonnyMain.classList.add('kevinA');
        }
        
        loadIndependentParts () {
            this.createColormat('Tops','char__tops', this.decodedSpell);
            this.createColormat('Trouser','char__trouser', this.decodedSpell);
            this.createColormat('Cap','char__cap', this.decodedSpell);
        }
    }

    class EdA extends JonnyA {
        constructor(decoded = null) {
            super(decoded);
            this.resurrectionSpell.char = "EdA";
            this.img.src = "assets/images/edA_original.webp";
            this.jonnyMain.classList.remove('jonnyA');
            this.jonnyMain.classList.add('edA');
        }
        
        loadIndependentParts () {
            this.createColormat('OuterShirt','char__outer_shirt', this.decodedSpell);
            this.createColormat('InnerShirt','char__inner_shirt', this.decodedSpell);
            this.createColormat('Trouser','char__trouser', this.decodedSpell);
            this.createColormat('Socks','char__socks', this.decodedSpell);
            this.createColormat('Shoes','char__shoes', this.decodedSpell);
        }
    }

    class EddyA extends JonnyA {
        constructor(decoded = null) {
            super(decoded);
            this.resurrectionSpell.char = "EddyA";
            this.img.src = "assets/images/eddyA_original.webp";
            this.jonnyMain.classList.remove('jonnyA');
            this.jonnyMain.classList.add('eddyA');
        }
        
        loadIndependentParts () {
            this.createColormat('Gown','char__gown', this.decodedSpell);
            this.createColormat('Skin','char__skin', this.decodedSpell);
            this.createColormat('Tongue','char__tongue', this.decodedSpell);
        }
    }

    class EddA extends JonnyA {
        constructor(currency, decoded = null) {
            super(decoded);
            this.resurrectionSpell.char = "EddA";
            if(decoded !== null) {
                this.currency = decoded.currency;
            }else{
                this.currency = currency;
            }
            switch(this.currency) {
                case 0:
                    this.img.src = "assets/images/eddA_original.webp";
                    this.createColormat('Dollar','char__dollar', this.decodedSpell);
                break;
                case 1:
                    this.img.src = "assets/images/eddA_variable_yen.webp";
                    this.createColormat('Yen','char__yen',  this.decodedSpell);
                break;
                case 2:
                    this.img.src = "assets/images/eddA_variable_euro.webp";
                    this.createColormat('Euro','char__euro', this.decodedSpell);
                break;
                case 3:
                    this.img.src = "assets/images/eddA_variable_rupee.webp";
                    this.createColormat('Rupee','char__rupee', this.decodedSpell);
                break;
                case 4:
                    this.img.src = "assets/images/eddA_variable_wong.webp";
                    this.createColormat('Wong','char__wong',  this.decodedSpell);
                break;
                case 5:
                    this.img.src = "assets/images/eddA_variable_gbp.webp";
                    this.createColormat('GBP','char__gbp',  this.decodedSpell);
                break;
            }
            this.resurrectionSpell.currency = this.currency;
            this.jonnyMain.classList.remove('jonnyA');
            this.jonnyMain.classList.add('eddA');
        }
        
        loadIndependentParts () {
            this.createColormat('Jacket','char__jacket', this.decodedSpell);
            this.createColormat('Hat','char__hat', this.decodedSpell);
            this.createColormat('Printer','char__printer', this.decodedSpell);
        }
    }
    //  ______________________
    // Character classes end
    //￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣

    //  ______________________
    // Color Managements
    //￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
    class ColorChip {
        constructor(decodedChip = null, colorMode, mat, controllerMaster, chipID) {
            this.decodedChip = decodedChip;

            this.chipID = chipID;
            this.layer = document.createElement('div');
            
            this.layer.style.width = "200%";
            this.layer.style.height = "200%";
            this.layer.style.position = "absolute";
            this.layer.style.top = "-50%";
            this.layer.style.left = "-50%";
            this.controllerMaster = controllerMaster;
            
            this.thumbnail = document.createElement('div');
            this.thumbnail.style.backgroundColor = "#000";
            this.thumbnail.classList.add('thumbnail');

            this.thumbnailInner = document.createElement('div');
            this.thumbnailInner.style.backgroundColor = "#000";
            this.thumbnailInner.classList.add('thumbnail__inner');

            this.g = [];

            this.thumbnailInner.addEventListener('contextmenu', e=>{
                e.preventDefault();
                if(menu.classList.contains('expanded')){
                    menu.classList.remove("expanded");
                };
                toggleMenuDialog(0, e.clientX, e.clientY, this.g);
            });

            this.thumbnail.append(this.thumbnailInner);

            this.controller = undefined;
            this.controllerInner = undefined;
            this.gradientMode = "linear";

            this.tipSpell = {"colorMode": colorMode};

            if(colorMode === "simple") {
                this.createSimpleColorControls();
            } else if(colorMode === "pattern") {
                this.createPatternControls();
            } else if(colorMode === "gradient") {
                this.createGradientControls();
            }
        }
        
        HSLupdate (tgt, h, s, l) {
            tgt.style.background = `hsl(${h},${s}%,${l}%)`;
        }

        patternUpdate (tgt, pattern, scale, opacity, blendmode, rotation = 0) {
            tgt.style.backgroundImage = "url(./assets/images/pattern-" + pattern + ".png)";    
            tgt.style.backgroundSize = scale + "px";
            tgt.style.backgroundPosition = "center";
            tgt.style.opacity = opacity / 100;
            tgt.style.transform = "rotate(" + rotation + "deg)";
            tgt.style.backgroundBlendMode = blendmode;
        }
        
        gradientUpdate (tgt, gradientStops, rotation = 0, gradientMode = "linear") {
            let gradientExpression;
            gradientExpression = gradientMode === "radial" ? "radial-gradient(" : "linear-gradient("+ rotation +"deg,";
                gradientStops.forEach((stop, i)=>{
                const comma = i <= (gradientStops.length - 2) ? "," : "";
                gradientExpression += "hsla(" + stop[0] + "deg," + stop[1] +  "%," + stop[2] + "%," + (stop[3] /100) + ") " + stop[4] + "%" + comma;
                });
            gradientExpression += ")";
            tgt.style.backgroundImage = gradientExpression;
        }

        createSimpleColorControls () {
            const controlGroup = document.createElement('div');
            controlGroup.classList.add('colorGroup');
            this.controller = controlGroup;

            const controlGroupInner = document.createElement('div');
            controlGroupInner.classList.add('controlGroupInner');
            controlGroupInner.classList.add('onRightSide');
            this.controllerInner = controlGroupInner;

            const controllerPanel = document.createElement('div');
            const controllerLabel = document.createElement('span');

            this.thumbnail.addEventListener('click', ()=>{
                if(!controlGroupInner.classList.contains("expanded")){
                    document.querySelectorAll('.controlGroupInner, .thumbnail').forEach(f=>f.classList.remove("expanded"));
                }
                this.thumbnail.classList.toggle('expanded');
                controlGroupInner.classList.toggle('expanded');
                this.adjustControllerPos(controlGroupInner, controlGroup);
            });
            
            controllerPanel.append(this.thumbnail);

            controllerLabel.addEventListener('click', ()=>{
                controllerPanel.classList.toggle('expanded');
            });

            const controlParts = [
                ['Hue',document.createElement('input')],
                ['Saturation',document.createElement('input')],
                ['Brightness',document.createElement('input')],
                ['Opacity',document.createElement('input')],
                ['Blend Mode',document.createElement('select')],
            ];

            for (let i = 0;i <= 2; i++){
                controlParts[i][1].addEventListener('change', ()=>{
                    this.HSLupdate(this.layer,controlParts[0][1].value,controlParts[1][1].value,controlParts[2][1].value);
                    this.HSLupdate(this.thumbnailInner,controlParts[0][1].value,controlParts[1][1].value,controlParts[2][1].value);
                    
                    this.tipSpell["hue"] = controlParts[0][1].value;
                    this.tipSpell["saturation"] = controlParts[1][1].value;
                    this.tipSpell["brightness"] = controlParts[2][1].value;
                    this.tipSpell["opacity"] = controlParts[3][1].value / 100;
                });
            }
            controlParts[3][1].addEventListener('change', m=>{
                this.layer.style.opacity = controlParts[3][1].value / 100;
                this.thumbnailInner.style.opacity = controlParts[3][1].value / 100;
            
                this.tipSpell["hue"] = controlParts[0][1].value;
                this.tipSpell["saturation"] = controlParts[1][1].value;
                this.tipSpell["brightness"] = controlParts[2][1].value;
                this.tipSpell["opacity"] = controlParts[3][1].value / 100;
            });
            
            controlParts.forEach((part, i) => {
                const paragraph = document.createElement('p');

                if(i !== 4) {
                    part[1].setAttribute('type', 'range');
                    part[1].setAttribute('min', '0');
                }
                if(i === 0) {
                    part[1].setAttribute('max', '360');
                    part[1].setAttribute('value', Math.floor(Math.random() * 360));
                }else if (i===4) {
                    part[1].setAttribute('value', "normal");
                }else{
                    part[1].setAttribute('max', '100');
                    part[1].setAttribute('value', Math.floor(Math.random() * 100));
                }
                if(i===3) {
                    part[1].setAttribute('value', 100);
                }
                
                paragraph.append(part[0],part[1]);
                controllerPanel.append(paragraph); 
            });

            /* Define blend modes */
            const blendMode = [
                "normal",
                "multiply",
                "screen",
                "overlay",
                "darken",
                "lighten",
                "color",
                "color-dodge",
                "color-burn",
                "hard-light",
                "soft-light",
                "difference",
                "exclusion",
                "hue",
                "saturation",
                "luminosity"
            ];
            blendMode.forEach(mode=>{
                const option = document.createElement('option');
                option.value = mode;
                option.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
                controlParts[4][1].append(option);
            });

            controlParts[4][1].addEventListener('change', m=>{
                this.layer.style.mixBlendMode = controlParts[4][1].value;
                this.tipSpell["mixblendmode"] = controlParts[4][1].value;
            });

            controlGroup.innerHTML = '';
            controlGroup.append(this.thumbnail);
            controlGroupInner.append(controllerPanel);
            controlGroup.append(controlGroupInner);
            this.controllerMaster.append(controlGroup);

            if(controlGroup.getBoundingClientRect().left > (window.innerWidth - 280)){
                controlGroupInner.classList.add('onRightSide');
            }

            try {
                if(this.decodedChip) {
                    controlParts[0][1].value = this.decodedChip.hue;
                    controlParts[1][1].value = this.decodedChip.saturation;
                    controlParts[2][1].value = this.decodedChip.brightness;
                    controlParts[3][1].value = this.decodedChip.opacity * 100;
                    controlParts[4][1].value = this.decodedChip.mixblendmode;
                    this.layer.style.mixBlendMode = this.decodedChip.mixblendmode;

                    this.decodedChip = null;
                }
            } catch {
                console.log("Failed to decode chip");
            }
            
            this.HSLupdate(
                this.thumbnailInner,
                controlParts[0][1].value,controlParts[1][1].value,controlParts[2][1].value
            );

            this.HSLupdate(
                this.layer,
                controlParts[0][1].value,controlParts[1][1].value,controlParts[2][1].value
            );
            this.layer.style.opacity = controlParts[3][1].value / 100;
            this.thumbnailInner.style.opacity = controlParts[3][1].value / 100;

            this.tipSpell["hue"] = controlParts[0][1].value;
            this.tipSpell["saturation"] = controlParts[1][1].value;
            this.tipSpell["brightness"] = controlParts[2][1].value;
            this.tipSpell["opacity"] = controlParts[3][1].value / 100;
            this.tipSpell["mixblendmode"] = "normal";
        }

        createPatternControls() {
            const controlGroup = document.createElement('div');
            controlGroup.classList.add('colorGroup');
            this.controller = controlGroup;

            const controlGroupInner = document.createElement('div');
            controlGroupInner.classList.add('controlGroupInner');
            controlGroupInner.classList.add('onRightSide');
            this.controllerInner = controlGroupInner;
            
            const controllerPanel = document.createElement('div');
            const controllerLabel = document.createElement('span');

            controllerPanel.append(this.thumbnail);

            this.thumbnail.addEventListener('click', ()=>{
                if(!controlGroupInner.classList.contains("expanded")){
                    document.querySelectorAll('.controlGroupInner, .thumbnail').forEach(f=>f.classList.remove("expanded"));
                }
                this.thumbnail.classList.toggle('expanded');
                controlGroupInner.classList.toggle('expanded');
                this.adjustControllerPos(controlGroupInner, controlGroup);
            });
            
            controllerLabel.addEventListener('click', ()=>{
                controllerPanel.classList.toggle('expanded');
            });

            /* Define Patterns */
            const patterns = [
                ["Polka Dot", "polka-dot"],
                ["Checkboard", "checkboard"],
                ["Sprite", "sprite"],
                ["Heart", "heart"],
                ["Star", "star"],
                ["Jungle", "jungle"],
                ["Crosshair", "crosshair"],
                ["Traditional A", "traditional-a"],
                ["Hotei Pseudo", "hotei"],
                ["Geometry", "geometry"],
                ["Butterfly", "butterfly"],
                ["Cheetah", "cheetah"],
                ["Pictgram A", "pictgram-a"],
                ["Wave", "wave"],
                ["Country", "country"],
            ];

            const patternController = document.createElement('div');
            patterns.forEach(pattern => {
                const anchor = document.createElement('a');
                anchor.href = '#';
                anchor.style.background = "url(./assets/images/pattern-" + pattern[1] + ".png) center center, #000000";
                anchor.style.display ="inline-block";
                anchor.style.width = "32px";
                anchor.style.height = "32px";
                anchor.style.margin="0 2px 0 0";
                anchor.style.lineHeight="0";
                anchor.style.backgroundSize = "24px";
                this.layer.dataset.patternName = pattern[1];

                anchor.addEventListener('click', m => {
                    m.preventDefault();
                    this.layer.dataset.patternName = pattern[1];
                    this.tipSpell["patternName"] = pattern[1];
                    this.patternUpdate(this.thumbnailInner,  this.layer.dataset.patternName,  controlParts[0][1].value , controlParts[1][1].value, "none", controlParts[3][1].value);
                    this.patternUpdate(this.layer,  this.layer.dataset.patternName,  controlParts[0][1].value, controlParts[1][1].value, controlParts[2][1].value, controlParts[3][1].value);
                });
                patternController.append(anchor);
            });

            controllerPanel.append(patternController); 

            const controlParts = [
                ["Scale",document.createElement('input')],
                ["Opacity", document.createElement('input')],
                ["Blend Mode", document.createElement('select')],
                ["Rotation", document.createElement('input')],
            ];

            controlParts.forEach((part, i) => {
                const paragraph = document.createElement('p');
                paragraph.append(part[0],part[1]);
                controllerPanel.append(paragraph); 
            });
            
            // Scale Controls
            controlParts[0][1].type= "range";
            controlParts[0][1].min= "1";
            controlParts[0][1].max= "128";
            controlParts[0][1].value= "32";
            controlParts[0][1].addEventListener('change', m=>{
            this.patternUpdate(this.thumbnailInner,  this.layer.dataset.patternName,  controlParts[0][1].value , controlParts[1][1].value, "none", controlParts[3][1].value);
            this.patternUpdate(this.layer,  this.layer.dataset.patternName,  controlParts[0][1].value, controlParts[1][1].value, controlParts[2][1].value, controlParts[3][1].value);
            });

            // Opacity Controls
            controlParts[1][1].type= "range";
            controlParts[1][1].min= "0";
            controlParts[1][1].max= "100";
            controlParts[1][1].value= "100";
            controlParts[1][1].addEventListener('change', m=>{
            this.patternUpdate(this.thumbnailInner,  this.layer.dataset.patternName,  controlParts[0][1].value , controlParts[1][1].value, "none", controlParts[3][1].value);
            this.patternUpdate(this.layer,  this.layer.dataset.patternName,  controlParts[0][1].value, controlParts[1][1].value, controlParts[2][1].value, controlParts[3][1].value);
            });

            // Rotation Controls
            controlParts[3][1].type= "range";
            controlParts[3][1].min= "0";
            controlParts[3][1].max= "360";
            controlParts[3][1].value= "0";
            controlParts[3][1].addEventListener('change', m=>{
                this.patternUpdate(this.thumbnailInner,  this.layer.dataset.patternName,  controlParts[0][1].value , controlParts[1][1].value, "none", controlParts[3][1].value);
                this.patternUpdate(this.layer,  this.layer.dataset.patternName,  controlParts[0][1].value, controlParts[1][1].value, controlParts[2][1].value, controlParts[3][1].value);
            });
            
            /* Define blend modes */
            const blendMode = [
                "normal",
                "multiply",
                "screen",
                "overlay",
                "darken",
                "lighten",
                "color",
                "color-dodge",
                "color-burn",
                "hard-light",
                "soft-light",
                "difference",
                "exclusion",
                "hue",
                "saturation",
                "luminosity"
            ];

            blendMode.forEach(mode=>{
                const option = document.createElement('option');
                option.value = mode;
                option.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
                controlParts[2][1].append(option);
            });

            controlParts[2][1].addEventListener('change', m=>{
                this.layer.style.mixBlendMode = m.target.value;
                this.tipSpell["mixblendmode"] = m.target.value;
            });

            controlParts.forEach(part=>{
                part[1].addEventListener('change', m=>{
                    this.tipSpell["scale"] = controlParts[0][1].value;
                    this.tipSpell["opacity"] = controlParts[1][1].value / 100;
                    this.tipSpell["rotation"] = controlParts[3][1].value;
                    this.tipSpell["mixblendmode"] = controlParts[2][1].value;
                });
            })

            controlGroup.innerHTML = '';
            controlGroup.append(this.thumbnail);
            controlGroupInner.append(controllerPanel);
            controlGroup.append(controlGroupInner);
            
            
            this.layer.dataset.patternName = "polka-dot";
            this.tipSpell["patternName"] = "polka-dot";
            
            try {
                if(this.decodedChip) {
                    console.log("Decoded chip ID :" + this.chipID + "　👇🏻");
                    controlParts[0][1].value = this.decodedChip.scale;
                    controlParts[1][1].value = this.decodedChip.opacity * 100;
                    controlParts[2][1].value = this.decodedChip.mixblendmode;
                    this.layer.style.mixBlendMode = this.decodedChip.mixblendmode;
                    controlParts[3][1].value = this.decodedChip.rotation;
                    this.layer.dataset.patternName = this.decodedChip.patternName;
                    this.tipSpell["patternName"] = this.decodedChip.patternName;
                    
                    this.decodedChip = null;
                }
            } catch {
                console.log("Failed to decode chip");
            }

            this.patternUpdate(this.thumbnailInner, this.layer.dataset.patternName, controlParts[0][1].value, controlParts[1][1].value, controlParts[2][1].value, controlParts[3][1].value);
            this.patternUpdate(this.layer, this.layer.dataset.patternName, controlParts[0][1].value, controlParts[1][1].value, controlParts[2][1].value, controlParts[3][1].value);
            this.tipSpell["scale"] = controlParts[0][1].value;
            this.tipSpell["opacity"] = controlParts[1][1].value / 100;
            this.tipSpell["rotation"] = controlParts[3][1].value;
            console.log(controlParts[2][1].value);
            this.tipSpell["mixblendmode"] = controlParts[2][1].value;

            this.controllerMaster.append(controlGroup);
            
            if(controlGroup.getBoundingClientRect().left > (window.innerWidth - 280)){
                controlGroupInner.classList.add('onRightSide');
            }
        }

        createGradientControls () {
            const controlGroup = document.createElement('div');
            controlGroup.classList.add('colorGroup');
            this.controller = controlGroup;

            const controlGroupInner = document.createElement('div');
            controlGroupInner.classList.add('controlGroupInner');
            controlGroupInner.classList.add('onRightSide');
            this.controllerInner = controlGroupInner;

            
            const controllerPanel = document.createElement('div');
            const controllerLabel = document.createElement('span');

            const gradientSpecimen = document.createElement('div');
            gradientSpecimen.classList.add('gradientSpecimen');
            controllerPanel.append(gradientSpecimen);

            const specimensPos = [
                gradientSpecimen.getBoundingClientRect().left,
                gradientSpecimen.getBoundingClientRect().right
            ];
            
            this.thumbnail.addEventListener('click', ()=>{
                if(!controlGroupInner.classList.contains("expanded")){
                    document.querySelectorAll('.controlGroupInner,.thumbnail').forEach(f=>f.classList.remove("expanded"));
                }
                this.thumbnail.classList.toggle('expanded');
                controlGroupInner.classList.toggle('expanded');
                this.adjustControllerPos(controlGroupInner, controlGroup);
            });
            
            controllerPanel.append(this.thumbnail);

            controllerLabel.addEventListener('click', ()=>{
                controllerPanel.classList.toggle('expanded');
            });

            const gradientStops = [];
            if(this.decodedChip) {
                console.log(this.decodedChip);
                this.decodedChip.colorStops.forEach(stop=>{
                    gradientStops.push(stop);
                });
            }else{
                gradientStops.push(
                    [Math.floor(Math.random()*360), Math.floor(Math.random()*100), Math.floor(Math.random()*100), 100, 0],
                    [Math.floor(Math.random()*360), Math.floor(Math.random()*100), Math.floor(Math.random()*100), 100, 100]
                );
            }

            // Pins
            const pins = [];
            gradientStops.forEach((stop, i) =>{
                const gradientPin = document.createElement('div');
                const gradientPinInner = document.createElement('div');
        
                gradientPin.classList.add('gradientPin');
                gradientPinInner.classList.add('gradientPinInner');
                gradientPin.dataset.index = i;
                pins.push(gradientPin);
        
                gradientPin.append(gradientPinInner);
                gradientSpecimen.append(gradientPin);
                
                gradientPin.style.top = "12px";
                gradientPin.style.left = "calc("+ gradientStops[i][4] +"% - 0px)";            
                gradientPinInner.style.background = "hsla(" + gradientStops[i][0] + "," + gradientStops[i][1] + "%," + gradientStops[i][2] + "%," + gradientStops[i][3] / 100 + ")";
            });
            pins[0].classList.add('selected');

            let dragMode = 0;
            let movingPin;

            gradientSpecimen.addEventListener('mousedown', f=>{
                specimensPos[0] = gradientSpecimen.getBoundingClientRect().left;
                specimensPos[1] = gradientSpecimen.getBoundingClientRect().right;

                if(f.target.classList.contains("gradientPin")) {
                    movingPin = f.target;
                    selectedStop = f.target.dataset.index;
                    document.querySelectorAll('.gradientPin').forEach(pin=>{
                        pin.classList.remove('selected');
                    });
                    movingPin.classList.add('selected');
                    
                    try {
                        controlParts[0][1].value = gradientStops[selectedStop][0];
                        controlParts[1][1].value = gradientStops[selectedStop][1];
                        controlParts[2][1].value = gradientStops[selectedStop][2];
                        controlParts[3][1].value = gradientStops[selectedStop][3];
                        controlParts[4][1].value = gradientStops[selectedStop][4];
                    } catch {
                        console.log("Hah! You should visit \"http://boysandmen.jp\"");
                    }
                    dragMode = 1;
                }
            });
            
            gradientSpecimen.addEventListener('touchstart', f=>{
                specimensPos[0] = gradientSpecimen.getBoundingClientRect().left;
                specimensPos[1] = gradientSpecimen.getBoundingClientRect().right;
                if(f.target.classList.contains("gradientPin")) {
                    movingPin = f.target;
                    selectedStop = f.target.dataset.index;
                    document.querySelectorAll('.gradientPin').forEach(pin=>{
                        pin.classList.remove('selected');
                    });
                    movingPin.classList.add('selected');
                    
                    try {
                        controlParts[0][1].value = gradientStops[selectedStop][0];
                        controlParts[1][1].value = gradientStops[selectedStop][1];
                        controlParts[2][1].value = gradientStops[selectedStop][2];
                        controlParts[3][1].value = gradientStops[selectedStop][3];
                        controlParts[4][1].value = gradientStops[selectedStop][4];
                    } catch {
                        console.log("Hah! You should visit \"http://boysandmen.jp\"");
                    }
                    dragMode = 1;
                }
            });
            
            gradientSpecimen.addEventListener('mousemove', f=>{
                if(dragMode===1) {
                    let pinPos =  (f.clientX - specimensPos[0]);
                    if(pinPos<0) {
                        pinPos=0;
                    }
                    if(pinPos > (specimensPos[1] - specimensPos[0])) {
                        pinPos = specimensPos[1] - specimensPos[0];
                    }
                    movingPin.style.left = pinPos + "px";
                }
            });
            
            gradientSpecimen.addEventListener('touchmove', f=>{
                f.preventDefault();
                if(dragMode===1) {
                    let pinPos =  (f.touches[0].clientX - specimensPos[0]);
                    if(pinPos<0) {
                        pinPos=0;
                    }
                    if(pinPos > (specimensPos[1] - specimensPos[0])) {
                        pinPos = specimensPos[1] - specimensPos[0];
                    }
                    movingPin.style.left = pinPos + "px";
                }
            });

            gradientSpecimen.addEventListener('mouseup', f=>{
                let pinPos = ((f.clientX - specimensPos[0]) / (specimensPos[1] - specimensPos[0])) * 100;

                
                if(dragMode === 0) {
                    let insertPos = gradientStops.length;
                    gradientStops.forEach((stop,i)=>{
                        if(pinPos <= stop[4]) {
                            pins[i].dataset.index = parseInt(pins[i].dataset.index) + 1;
                            insertPos--;
                        }
                    });
                    
                    // Add a new stop
                    gradientStops.splice(insertPos,0,[Math.floor(Math.random()*360), Math.floor(Math.random()*100), Math.floor(Math.random()*100), 100, pinPos]);

                    controlParts[7][1].max =  gradientStops.length - 1;
                    controlParts[7][1].value = insertPos;

                    const gradientPin = document.createElement('div');
                    const gradientPinInner = document.createElement('div');
            
                    gradientPin.classList.add('gradientPin');
                    gradientPinInner.classList.add('gradientPinInner');
                    gradientPin.dataset.index = insertPos;
                    pins.splice(insertPos,0,gradientPin);
                    gradientPin.append(gradientPinInner);
                    
                    if(insertPos < gradientStops.length) {
                        gradientSpecimen.insertBefore(gradientPin, gradientSpecimen.children[insertPos]);
                    }else{
                        gradientSpecimen.append(gradientPin);
                    }
            
                    selectedStop = insertPos;
                    
                    controlParts[0][1].value = gradientStops[selectedStop][0];
                    controlParts[1][1].value = gradientStops[selectedStop][1];
                    controlParts[2][1].value = gradientStops[selectedStop][2];
                    controlParts[3][1].value = gradientStops[selectedStop][3];
                    controlParts[4][1].value = gradientStops[selectedStop][4];

                    gradientPin.style.top = "12px";
                    gradientPin.style.left = "calc("+ gradientStops[selectedStop][4] +"% - 0px)";            
                    gradientPinInner.style.background = "hsla(" + gradientStops[selectedStop][0] + "," + gradientStops[selectedStop][1] + "%," + gradientStops[selectedStop][2] + "%," + gradientStops[selectedStop][3] / 100 + ")";
                    
                    document.querySelectorAll('.gradientPin').forEach(pin=>{
                        pin.classList.remove('selected');
                    });
                    gradientPin.classList.add('selected');
                    
                    this.gradientUpdate(this.layer, gradientStops, controlParts[6][1].value, this.gradientMode);
                    this.gradientUpdate(this.thumbnailInner, gradientStops, controlParts[6][1].value, this.gradientMode);
                    this.gradientUpdate(gradientSpecimen, gradientStops, 90, this.gradientMode);
                } else {
                    if(pinPos<0){
                        pinPos=0;
                    }
                    if(pinPos > 100){
                        pinPos=100;
                    }
                    gradientStops[selectedStop][4] = pinPos;
                    controlParts[4][1].value = pinPos;
                    this.gradientUpdate(this.layer, gradientStops, controlParts[6][1].value, this.gradientMode);
                    this.gradientUpdate(this.thumbnailInner, gradientStops, controlParts[6][1].value, this.gradientMode);
                    this.gradientUpdate(gradientSpecimen, gradientStops, 90, this.gradientMode);    
                    movingPin = "";
                }
                this.tipSpell["colorStops"] = gradientStops;
                dragMode = 0;
            });

            gradientSpecimen.addEventListener('touchend', f=>{
                let pinPos = 0;
                pinPos = ((pins[selectedStop].getBoundingClientRect().left - specimensPos[0]) / (specimensPos[1] - specimensPos[0])) * 100;
                if(pinPos<0){
                    pinPos=0;
                }
                if(pinPos > 100){
                    pinPos=100;
                }
                gradientStops[selectedStop][4] = pinPos;
                controlParts[4][1].value = pinPos;
                this.tipSpell["colorStops"] = gradientStops;
                this.gradientUpdate(this.layer, gradientStops, controlParts[6][1].value, this.gradientMode);
                this.gradientUpdate(this.thumbnailInner, gradientStops, controlParts[6][1].value, this.gradientMode);
                this.gradientUpdate(gradientSpecimen, gradientStops, 90, this.gradientMode);    
                movingPin = "";
                dragMode = 0;
            });

            
            let selectedStop = 0;

            const controlParts = [
                ['Hue',document.createElement('input')],
                ['Saturation',document.createElement('input')],
                ['Brightness',document.createElement('input')],
                ['Opacity',document.createElement('input')],
                ['Stop Position',document.createElement('input')],
                ['Blend Mode',document.createElement('select')],
                ['Degree', document.createElement('input')],
                ['Stop Selector', document.createElement('input')],
            ];

            for (let i = 0;i <= 4; i++){
                controlParts[i][1].addEventListener('change', ()=>{
                    gradientStops[selectedStop][0] = controlParts[0][1].value;
                    gradientStops[selectedStop][1] = controlParts[1][1].value;
                    gradientStops[selectedStop][2] = controlParts[2][1].value;
                    gradientStops[selectedStop][3] = controlParts[3][1].value;
                    gradientStops[selectedStop][4] = controlParts[4][1].value;

                    pins[selectedStop].children[0].style.background = "hsla(" + controlParts[0][1].value + "," + controlParts[1][1].value + "%," + controlParts[2][1].value + "%," + controlParts[3][1].value / 100 + ")";
                    pins[selectedStop].style.left = controlParts[4][1].value + "%";

                    this.tipSpell["colorStops"] = gradientStops;
                    
                    this.gradientUpdate(this.layer, gradientStops, controlParts[6][1].value, this.gradientMode);
                    this.gradientUpdate(this.thumbnailInner, gradientStops, controlParts[6][1].value, this.gradientMode);
                    this.gradientUpdate(gradientSpecimen, gradientStops, 90, this.gradientMode);
                });
            }
            
            controlParts.forEach((part, i) => {
                const paragraph = document.createElement('p');

                part[1].setAttribute('type', 'range');
                part[1].setAttribute('min', '0');
                if(i === 0 || i === 6) {
                    part[1].setAttribute('max', '360');
                    part[1].setAttribute('value', Math.floor(Math.random() * 360));
                }else{
                    part[1].setAttribute('max', '100');
                    part[1].setAttribute('value', Math.floor(Math.random() * 100));
                }            
                if(i !== 4 && i !== 7){
                    paragraph.append(part[0],part[1]);
                    controllerPanel.append(paragraph); 
                }
                
                this.tipSpell["gradientRotation"] = controlParts[6][1].value;
                this.tipSpell["mixblendmode"] = controlParts[5][1].value;
            });

            /* Define blend modes */
            const blendMode = [
                "normal",
                "multiply",
                "screen",
                "overlay",
                "darken",
                "lighten",
                "color",
                "color-dodge",
                "color-burn",
                "hard-light",
                "soft-light",
                "difference",
                "exclusion",
                "hue",
                "saturation",
                "luminosity"
            ];
            
            blendMode.forEach(mode=>{
                const option = document.createElement('option');
                option.value = mode;
                option.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
                controlParts[5][1].append(option);
            });

            controlParts[5][1].addEventListener('change', m=>{
                this.layer.style.mixBlendMode = controlParts[5][1].value;
                this.tipSpell["mixblendmode"] = controlParts[5][1].value;
                this.gradientUpdate(this.layer, gradientStops, controlParts[6][1].value, this.gradientMode);
                this.gradientUpdate(this.thumbnailInner, gradientStops, controlParts[6][1].value, this.gradientMode);
                this.gradientUpdate(gradientSpecimen, gradientStops, 90, this.gradientMode);
            });

            // Gradient Rotation
            controlParts[6][1].addEventListener('change', m=>{
                this.tipSpell["gradientRotation"] = controlParts[6][1].value;
                this.gradientUpdate(this.layer, gradientStops, controlParts[6][1].value, this.gradientMode);
                this.gradientUpdate(this.thumbnailInner, gradientStops, controlParts[6][1].value, this.gradientMode);
                this.gradientUpdate(gradientSpecimen, gradientStops, 90, this.gradientMode);
            });

            // Remove color stop
            const gradientRemoveBtn = document.createElement('div');
            gradientRemoveBtn.textContent="Remove Current Stop";
            gradientRemoveBtn.classList.add('gradient_stopRemove');
            
            gradientRemoveBtn.addEventListener('click', ()=>{
                dragMode=0;
                if(gradientStops.length<=2) return;

                pins[selectedStop].remove();
                pins.splice(selectedStop,1);

                gradientStops.splice(selectedStop,1);
                if(selectedStop>0) {
                    selectedStop--;
                }
                pins[selectedStop].classList.add('selected');
                pins.forEach((pin, i) => {pin.dataset.index = i;});
                
                controlParts[0][1].value = gradientStops[selectedStop][0];
                controlParts[1][1].value = gradientStops[selectedStop][1];
                controlParts[2][1].value = gradientStops[selectedStop][2];
                controlParts[3][1].value = gradientStops[selectedStop][3];
                controlParts[4][1].value = gradientStops[selectedStop][4];
                
                this.tipSpell["colorStops"] = gradientStops;
                
            this.gradientUpdate(this.layer, gradientStops, controlParts[6][1].value, this.gradientMode);
            this.gradientUpdate(this.thumbnailInner, gradientStops, controlParts[6][1].value, this.gradientMode);
            this.gradientUpdate(gradientSpecimen, gradientStops, 90, this.gradientMode);
            });
            controllerPanel.append(gradientRemoveBtn);

            // Gradient Mode Sel
            this.gradientMode = "linear";
            controllerPanel.append(document.createElement("br"));
            const gradientModeRadio = 
            [
                [document.createElement('input'),"Linear"],
                [document.createElement('input'),"Radial"],
            ];

            gradientModeRadio.forEach((radio)=>{
                const label = document.createElement('label');
                radio[0].type = "radio";
                radio[0].name = "gradientType" + this.chipID;
                radio[0].value = String(radio[1]).toLowerCase();

                label.addEventListener('click', (e)=>{
                    this.gradientMode = radio[0].value;
                    this.gradientUpdate(this.layer, gradientStops, controlParts[6][1].value, this.gradientMode);
                    this.gradientUpdate(this.thumbnailInner, gradientStops, controlParts[6][1].value, this.gradientMode);
                    this.gradientUpdate(gradientSpecimen, gradientStops, 90, this.gradientMode);
                    this.tipSpell["gradientMode"] = this.gradientMode;
                });

                label.append(radio[0]);
                label.innerHTML += radio[1];
                controllerPanel.append(label);
            });

            // Append Controller on Controller Master
            controlGroup.innerHTML = '';
            controlGroup.append(this.thumbnail);
            controlGroupInner.append(controllerPanel);
            controlGroup.append(controlGroupInner);
            this.controllerMaster.append(controlGroup);

            this.adjustControllerPos(this.controllerMaster, this.thumbnail);
            this.adjustControllerPos(controlGroupInner, controlGroup);
            
            try {
                if(this.decodedChip) {
                    console.log("Decoded chip ID :" + this.chipID + "　👇🏻");
                    console.log(this.decodedChip);
                    this.gradientMode = this.decodedChip.gradientMode;
                    controlParts[6][1].value = this.decodedChip.gradientRotation;
                    controlParts[5][1].value = this.decodedChip.mixblendmode;
                    this.layer.style.mixBlendMode = controlParts[5][1].value;
                    this.decodedChip = null;
                }
            } catch {
                console.log("Failed to decode chip");
            }
            
            this.tipSpell["colorStops"] = gradientStops;
            this.tipSpell["gradientRotation"] = controlParts[6][1].value;
            this.tipSpell["mixblendmode"] = controlParts[5][1].value;
            this.tipSpell["gradientMode"] = this.gradientMode;
            
            this.gradientUpdate(this.thumbnailInner, gradientStops, controlParts[6][1].value, this.gradientMode);
            this.gradientUpdate(this.layer, gradientStops, controlParts[6][1].value, this.gradientMode);
            this.gradientUpdate(gradientSpecimen, gradientStops, 90, this.gradientMode);
        }

        updateThisChipPos (deletedPos, array) {
            if(this.chipID > deletedPos) {
                this.chipID--;
            }
        }

        addDeleteTrigger(mat) {
            const depthGroup = document.createElement('div');
            depthGroup.classList.add('depthGroup');
            
            
            const LowestBtn = document.createElement('div');
            LowestBtn.classList.add('depthBtn');
            LowestBtn.innerHTML="&laquo;";
            depthGroup.append(LowestBtn);
            LowestBtn.addEventListener('click', ()=>{
                this.swapLayerPos(0, mat.layers);
                mat.reRender();
            });

            const lvDn = document.createElement('div');
            lvDn.classList.add('depthBtn');
            lvDn.innerHTML="&lt;";
            depthGroup.append(lvDn);
            lvDn.addEventListener('click', ()=>{
                this.swapLayerPos(this.chipID-1, mat.layers);
                mat.reRender();
            });

            const lvUp = document.createElement('div');
            lvUp.classList.add('depthBtn');
            lvUp.innerHTML="&gt;";
            depthGroup.append(lvUp);
            lvUp.addEventListener('click', ()=>{
                this.swapLayerPos(this.chipID+1, mat.layers);
                mat.reRender();
            });

            const HighestBtn = document.createElement('div');
            HighestBtn.classList.add('depthBtn');
            HighestBtn.innerHTML="&raquo;";
            depthGroup.append(HighestBtn);
            HighestBtn.addEventListener('click', ()=>{
                this.swapLayerPos(mat.layers.length-1, mat.layers);
                mat.reRender();
            });

            this.controllerInner.append(depthGroup);
            
            const deleteBtn = document.createElement('div');
            deleteBtn.classList.add('deleteBtn');
            deleteBtn.textContent="DELETE";
            this.controllerInner.append(deleteBtn);

            deleteBtn.addEventListener('click', ()=>{
                this.deleteColorChip();
                mat.layers.splice(this.chipID, 1);
                mat.layers.forEach(f=>{f.updateThisChipPos(this.chipID, mat.layers);});
            });

            const a = function () {
                this.swapLayerPos(this.chipID+1, mat.layers);
                mat.reRender();
            }

            const b = function () {
                this.swapLayerPos(this.chipID-1, mat.layers);
                mat.reRender();
            }
            
            const c = function () {
                this.deleteColorChip();
                mat.layers.splice(this.chipID, 1);
                mat.layers.forEach(f=>{f.updateThisChipPos(this.chipID, mat.layers);});
            }

            this.g.push(
                ["Raise Layer", a.bind(this)],
                ["Lower Layer", b.bind(this)],
                ["Delete layer", c.bind(this)],
            );
        }
        
        swapLayerPos (movePosition, array) {
            if(movePosition<0 || movePosition>array.length-1){
                return;
            }

            const bases = [this.controllerMaster.getBoundingClientRect().left + 8,this.controllerMaster.getBoundingClientRect().top + 8];
            const prevPos = [];
            const copier = array[this.chipID];
            
            array.forEach((f,index)=>{
                const x = index === 0 ? 0 : bases[0] - f.controller.getBoundingClientRect().left;
                const y = index === 0 ? 0 : bases[1] - f.controller.getBoundingClientRect().top;
                prevPos.push([f.getTipID(), x, y, f.getTipObj().colorMode]);
            });
            
            const copier2 = prevPos[this.chipID];
            prevPos.splice(this.chipID, 1);
            prevPos.splice(movePosition, 0, copier2);

            array.splice(this.chipID, 1);
            array.splice(movePosition, 0, copier);

            array.forEach((f,index)=>{                
                this.controllerMaster.append(f.controller);
                f.chipID = index;
                f.controllerInner.classList.add('onRightSide');
            });

            this.adjustControllerPos(this.controllerInner , this.thumbnail);
            
            array.forEach((f,index)=>{
                f.animateChip(
                    ((bases[0] - f.controller.getBoundingClientRect().left) - prevPos[index][1]),
                    ((bases[1] - f.controller.getBoundingClientRect().top) - prevPos[index][2]),
                    0,
                    0
                );
            });
        }

        animateChip(startX, startY, endX, endY) {
            let current = [startX,startY];
            let spd = 6;
            let intvl = setInterval(()=>{
                current[0] += (endX - current[0]) / spd;
                current[1] += (endY - current[1]) / spd;
                
                this.thumbnail.style.transform = `translate(${current[0]}px, ${current[1]}px)`;

                if(Math.abs(current[0] - endX) < 1) {
                    current[0] = endX;
                    current[1] = endY;
                    clearInterval(intvl);
                    this.thumbnail.style.transform = `translate(0, 0)`;
                }
            }, 16);
        }

        deleteColorChip () {
            this.thumbnail.remove();
            this.layer.remove();
            this.controller.remove();
        }

        adjustControllerPos (dialog, thumbnail) {
                const top = dialog.getBoundingClientRect().top;
                const left = thumbnail.getBoundingClientRect().left;
                const screenHeight = window.innerHeight;
                const leftTurningPoint = (document.querySelector('header').offsetWidth - 280);

                if(top > (screenHeight - 350)){
                    dialog.classList.add('onBottom');
                }else {
                    dialog.classList.remove('onBottom');
                }

                if(left > leftTurningPoint) {
                    dialog.classList.add('onRightSide');
                }else {
                    dialog.classList.remove('onRightSide');
                }
        }

        getTipID () {
            return this.chipID;
        }
        
        getTipObj () {
            return this.tipSpell;
        }
    }

    class ColorMat {
        constructor (addTo, controllerMaster, targetName, decodedPart) {
            this.matMain = document.createElement('div');   
            this.matMain.classList.add('mat_main');

            this.targetName = targetName;
            this.matSpell = {};

            this.decodedPart = null;
            if(decodedPart) {
                this.decodedPart = decodedPart;
            }

            this.mat = document.createElement('div');   
            this.mat.classList.add('mat');
            this.mat.style.width = "100%";
            this.mat.style.height = "100%";
            this.mat.style.overflow = "hidden";
            this.mat.style.position = "relative";
            
            this.controllerMaster = controllerMaster;

            this.palette = document.createElement('div');
            this.palette.classList.add('mat_palette');

            this.layerID = 0;
            this.layers = [];
            
            this.matMain.append(this.mat);
            this.matMain.append(this.controllerMaster);
            

            this.simpleColorAddBtn = document.createElement('div');
            this.simpleColorAddBtn.textContent = " Color";
            this.simpleColorAddBtn.classList.add('plusBtn');
            this.simpleColorAddBtn.addEventListener('click', ()=>{
                this.addColorLayer();
            });
            
            this.patternAddBtn = document.createElement('div');
            this.patternAddBtn.textContent = " Pattern";
            this.patternAddBtn.classList.add('plusBtn');
            this.patternAddBtn.style.top = "40px";
            this.patternAddBtn.addEventListener('click', ()=>{
                this.addPattern();
            });

            this.gradientAddBtn = document.createElement('div');
            this.gradientAddBtn.textContent = " Gradient";
            this.gradientAddBtn.classList.add('plusBtn');
            this.gradientAddBtn.style.top = "72px";
            this.gradientAddBtn.addEventListener('click', ()=>{
                this.addGradient();
            });
            
            if(!this.decodedPart) {
                this.addColorLayer();
            }else{
                this.reviveBySpell();
            }

            this.palette.append(this.simpleColorAddBtn);
            this.palette.append(this.patternAddBtn);
            this.palette.append(this.gradientAddBtn);
            controllerMaster.append(this.palette);

            addTo.append(this.matMain);
        }
        
        addColorLayer () {
            this.layers.push(new ColorChip(this.decodedPart, "simple", this, this.palette, this.layers.length));
            this.layers[this.layers.length-1].addDeleteTrigger(this);
            this.layerID++;
            this.reRender();
        }

        addPattern () {
            this.layers.push(new ColorChip(this.decodedPart, "pattern", this, this.palette, this.layers.length));
            this.layers[this.layers.length-1].addDeleteTrigger(this);
            this.layerID++;
            this.reRender();
        } 

        addGradient () {
            this.layers.push(new ColorChip(this.decodedPart, "gradient", this, this.palette, this.layers.length));
            this.layers[this.layers.length-1].addDeleteTrigger(this);
            this.layerID++;
            this.reRender();
        }  
        
        reRender () {
            this.mat.innerHTML = "";
            this.layers.forEach(l=>{
                this.mat.append(l.layer);
            });
        }

        reviveBySpell () {
            try {
                Object.entries(this.decodedPart).forEach(([key, chip]) => {
                    this.layers.push(new ColorChip(chip, chip.colorMode, this.mat, this.palette, this.layers.length));
                    this.layers[this.layers.length-1].addDeleteTrigger(this);
                    this.layerID++;
                    this.reRender();
                });
                this.decodedPart = null;
            } catch (err) {
                console.log("Some of restoring parts could not be restored!");
            }
        }

        getMatObj () {
            this.matSpell = {};
            this.layers.forEach(layer => {
                this.matSpell[layer.getTipID()] = layer.getTipObj();
            });
            return this.matSpell;
        }
    }

    /*______________________
    Characters
    ________________________*/
    const characters = [];
    let charClasses = "";

    function adderButtonAdder () {
        [[JonnyA, "jonnyA"], [JonnyB, "jonnyB"], [JimmyA, "jimmyA"], [RolfA, "rolfA"], [KevinA, "kevinA"], [EdA, "edA"], [EddyA, "eddyA"], [EddA, "eddA"]].forEach(char => {
            const a = document.createElement('a');
            a.classList.add("character_adder__" + char[1]);
            const img = document.createElement('img');
            img.src = "./assets/images/" + char[1] + "_original.webp";
            img.alt = char[1];
            a.appendChild(img);
            charClasses += "." + char[1] + ", ";
    
            if(char[1] !== "eddA"){
                a.addEventListener('click', e=>{
                    e.preventDefault();
                    characters.push(new char[0]());
                });
            }else{
                a.addEventListener('click', e=>{
                    e.preventDefault();
                    characters.push(new EddA(Math.floor(Math.random()*6)));
                });
            }
            document.querySelector('.character_adder__inner').appendChild(a); 
        });
        charClasses = charClasses.slice(0, -2);
    }
    adderButtonAdder();
    // Print button
    document.querySelector('.printBtn').addEventListener('click', ()=>{window.print();});

    /* ________________________
    Theatre Mode
    _________________________*/
    //   - Theatre mode button
    document.querySelector('.theatreBtn').addEventListener('click', b=>{
        b.preventDefault();
        toggleTheatreMode ();
    });

    //   - background settings
    document.querySelector('.theatre_background_setter a').addEventListener('click', b=>{
        b.preventDefault();
        document.querySelector('.theatre_background_setter').classList.toggle('expanded');
    });

    // - Define All Background Classes
    const backgroundParts = [
        '.background_01',
        '.background_02',
        '.background_03',
        '.background_04',
        '.background_05',
        '.background_06',
    ]

    // - Define each input to reset all effects and apply background which is picked
    document.querySelectorAll('.theatre_background_setter input').forEach((radio, index)=>{
        radio.addEventListener('click', (item)=>{
            document.querySelector('.theatre_background_setter').classList.remove('expanded');
            document.querySelector('main').classList.remove('reminiscence');
            wipeAllSnowdrops ();
            wipeAllColorballs ();
            wipeAllHeartPop ();
            wipeAllFlames ();
            wipeAllReminiscence ();
            backgroundParts.forEach(bgs=>{
                document.querySelector(bgs).classList.remove('expanded');
            });
        
            document.querySelector(backgroundParts[index]).classList.add('expanded');
        });
    });

    document.getElementById('theatre_background_snowfall').addEventListener('click',function(){
        setTimeout(()=>{
            initiateSnowdrop();
        }, 100);
    });

    document.getElementById('theatre_background_spotlight').addEventListener('click',function(){
        setTimeout(()=>{
            initiateColorball();
        }, 100);
    });

    document.getElementById('theatre_background_heartfullyheart').addEventListener('click',function(){
        setTimeout(()=>{
        initiateHeartPop();
        }, 100);
    });

    document.getElementById('theatre_background_burstfullyflame').addEventListener('click',function(){
        setTimeout(()=>{
        initiateFlames();
        }, 100);
    });

    document.getElementById('theatre_background_reminiscence').addEventListener('click',function(){
        document.querySelector('main').classList.add('reminiscence');
        setTimeout(()=>{
            initiateReminiscence();
        }, 100);
    });

    /* Snowdrop-Related */
    let snowDropStats = [];
    function initiateSnowdrop () {
        document.querySelectorAll(charClasses).forEach(chars=>{chars.classList.add('filterHardlight')});
        for(let i = 0; i < 50; i++) {
            const snowDrop = document.createElement('div');
            snowDrop.classList.add('snowDrop');
            snowDrop.style.left = (Math.random() * (window.innerWidth) ) + "px";
            snowDrop.style.top = (Math.random() * (window.innerHeight)) + "px";
            snowDropStats.push({
                velocityX: Math.random() * 5,
                velocityY: Math.random() * 4
            });
        document.querySelector('.background_02').append(snowDrop);
        }
        moveSnowdrop();
    }

    function moveSnowdrop () {
        snowDropStats.forEach((stat, i)=>{
            const snowDrop = document.querySelectorAll('.snowDrop')[i];
            snowDrop.style.left = (parseFloat(snowDrop.style.left) + stat.velocityX) + "px";
            snowDrop.style.top = (parseFloat(snowDrop.style.top) + stat.velocityY) + "px";

            if(snowDrop.offsetLeft> window.innerWidth + 50) {
                snowDrop.style.left = 0;
                stat.velocityX = Math.random() * 5;
                stat.velocityY = Math.random() * 4;
            }
            if(snowDrop.offsetTop> window.innerHeight + 50) {
                snowDrop.style.top = 0;

                snowDropStats[i].velocityX = Math.random() * 5;
                snowDropStats[i].velocityY = Math.random() * 4;
            }
        });

        if(snowDropStats.length > 0 && document.visibilityState === 'visible') {
            setTimeout(moveSnowdrop,20);
        }
    }

    function wipeAllSnowdrops () {
        document.querySelectorAll(charClasses).forEach(chars=>{chars.classList.remove('filterHardlight')});
        document.querySelectorAll('.snowDrop').forEach(f=>f.remove());
        snowDropStats = [];
    }

    /* Colorball-Related */
    let colorballStats = [];
    function initiateColorball() {
        document.querySelectorAll(charClasses).forEach(chars=>{chars.classList.add('filterMultiply')});
        for(let i = 0; i < 15; i++) {
            const colorBall = document.createElement('div');
            colorBall.classList.add('colorBall');
            colorBall.style.left = (Math.random() * (window.innerWidth) ) + "px";
            colorBall.style.top = (Math.random() * (window.innerHeight)) + "px";
            colorballStats.push({
                velocityX: Math.random() * 10 - 5,
                velocityY: Math.random() * 10 - 5,
                scale: (Math.random()*256 + 48) + "px",
                opacity: Math.random()*0.3 + 0.7,
                bg: `hsl(${Math.floor(Math.random()*360)},${Math.floor(Math.random()*100)}%,${Math.floor(Math.random()*100)}%)`
            });
        document.querySelector('.background_03').append(colorBall);
        }
        moveColorball();
    }

    function moveColorball () {
        colorballStats.forEach((stat, i)=>{
            const colorBall = document.querySelectorAll('.colorBall')[i];
            colorBall.style.left = (parseFloat(colorBall.style.left) + stat.velocityX) + "px";
            colorBall.style.top = (parseFloat(colorBall.style.top) + stat.velocityY) + "px";
            colorBall.style.width = stat.scale;
            colorBall.style.height = stat.scale;
            colorBall.style.opacity = stat.opacity;
            colorBall.style.backgroundColor = stat.bg;

            if(colorBall.offsetLeft> window.innerWidth + 50 || colorBall.offsetLeft < -50) {
                colorballStats[i].velocityX = colorballStats[i].velocityX * -1;
            }
            if(colorBall.offsetTop> window.innerHeight + 50 || colorBall.offsetTop < -50) {
                colorballStats[i].velocityY = colorballStats[i].velocityY * -1;
            }
        });

        if(colorballStats.length > 0 && document.visibilityState === 'visible') {
            setTimeout(moveColorball,20);
        }
    }

    function wipeAllColorballs () {
        document.querySelectorAll(charClasses).forEach(chars=>{chars.classList.remove('filterMultiply')});
        document.querySelectorAll('.colorBall').forEach(f=>f.remove());
        colorballStats = [];
    }
    
    /* HeartRipples-Related */
    let heartPopStats = [];
    function initiateHeartPop () {
        document.querySelectorAll(charClasses).forEach(chars=>{chars.classList.add('filterMultiply')});
        for(let i = 0; i < 20; i++) {
            const heartItem = document.createElement('div');
            heartItem.classList.add('heartItem');
            const heartItemInner = document.createElement('div');
            heartItemInner.classList.add('heartItemInner');
            heartItem.append(heartItemInner);
            heartItem.style.left = (Math.random() * (window.innerWidth) ) + "px";
            heartItem.style.top = Math.random() * 600 + (window.innerHeight / 2) + "px";
            heartItem.style.opacity = 0.01;
            heartItem.style.scale = Math.random()*2 + 0.1;
            heartPopStats.push({
                skewX : 0,
                skewY : 0,
                skewXVelocity : 0,
                skewYVelocity : 0,
                velocityX: 0,
                velocityY: Math.random() * 2 + 0.2,
                // opacity: Math.random() + 0.65,
                opacity: 0.01,
                opacityVel: 0.05,
            });
        document.querySelector('.background_04').append(heartItem);
        }
        heartPopStats.forEach((stat,i)=>{
            const heartItem = document.querySelectorAll('.heartItem')[i];
            if(Math.random()*10 <= 1) {
                heartItem.classList.add('whiteHeart');
                heartItem.style.scale = Math.random()*0.7 + 0.1;
                heartItem.style.left = (Math.random()*2 <= 1 ? 0 : window.innerWidth ) + "px";
                stat.velocityX += Math.random()*12.5;
                stat.velocityY = Math.random()*20 + 5;
                stat.opacityVel *= 2;
                stat.skewXVelocity = Math.random()*1 - 1;
                stat.skewYVelocity = Math.random()*1 - 1;
            }
        });
        moveHeartPop();
    }

    function moveHeartPop () {
        heartPopStats.forEach((stat, i)=>{
            const heartItem = document.querySelectorAll('.heartItem')[i];
            heartItem.style.left = (parseFloat(heartItem.style.left) + stat.velocityX) + "px";
            heartItem.style.top = (parseFloat(heartItem.style.top) - stat.velocityY) + "px";
            stat.opacity += stat.opacityVel;
            heartItem.style.opacity = stat.opacity;
            
            stat.skewX += stat.skewXVelocity;
            stat.skewY += stat.skewYVelocity;
            heartItem.style.transform = "skew(" + stat.skewX + "deg, " + stat.skewY + "deg)";

            if(stat.opacity>=1){
                stat.opacityVel = ( Math.random()*0.01 + 0.001) * -1;
            }
            
            if(heartItem.offsetTop < -30 || stat.opacity <= 0) {
                heartItem.classList.remove('whiteHeart');
                heartItem.style.top = Math.random() * 600 + (window.innerHeight / 2) + "px";
                heartItem.style.left = (Math.random() * (window.innerWidth) ) + "px";
                stat.skewX = 0;
                stat.skewY = 0;
                stat.skewXVelocity = 0;
                stat.skewYVelocity = 0;
                stat.velocityX = 0;
                stat.velocityY = Math.random() * 2 + 0.2;
                stat.opacity = 0.01;
                stat.opacityVel = 0.05;
                heartItem.style.scale = Math.random()*2 + 0.1;
                
                if(Math.random()*10 <= 1) {
                heartItem.classList.add('whiteHeart');
                heartItem.style.scale = Math.random()*0.7 + 0.1;
                heartItem.style.left = (Math.random()*2 <= 1 ? 0 : window.innerWidth ) + "px";
                stat.velocityX += Math.random()*12.5;
                stat.velocityY = Math.random()*20 + 5;
                stat.opacityVel *= 2;
                stat.skewXVelocity = Math.random()*1 - 1;
                stat.skewYVelocity = Math.random()*1 - 1;
                }
            }
        });

        if(heartPopStats.length > 0 && document.visibilityState === 'visible') {
            setTimeout(moveHeartPop,20);
        }
    }

    function wipeAllHeartPop () {
        document.querySelectorAll(charClasses).forEach(chars=>{chars.classList.remove('filterMultiply')});
        document.querySelectorAll('.heartItem').forEach(f=>f.remove());
        heartPopStats = [];
    }

    /* Flame-Related */
    let flameParticleStats = [];
    function initiateFlames () {
        document.querySelectorAll(charClasses).forEach(chars=>{chars.classList.add('filterOverlay')});
        for(let i = 0; i < 50; i++) {
            const flameParticle = document.createElement('div');
            const flamePalette =
            [
                "flameParticle__phase01",
                "flameParticle__phase02",
                "flameParticle__phase03",
                "flameParticle__phase04",
            ];
            flamePalette.forEach(tip=>{
                const flameTip = document.createElement('div');
                flameTip.classList.add(tip);
                flameTip.classList.add(tip + "--" + i);
                flameParticle.append(flameTip);
            });
            flameParticle.classList.add('flameParticle');
            flameParticle.style.left = (Math.random() * (window.innerWidth) ) + "px";
            flameParticle.style.top =  (window.innerHeight - 70) + "px";

            flameParticleStats.push({
                flameTemp: Math.random()* 2000 - 1000,
                velocityX: Math.random() * 1 - 1,
                velocityY: (Math.random() * 2 + 0.2) * -1,
                scale: Math.random()*1 + 0.5,
            });
        document.querySelector('.background_05').append(flameParticle);
        }
        moveFlames();
    }

    function moveFlames () {
        flameParticleStats.forEach((stat, i)=>{
            const flameParticle = document.querySelectorAll('.flameParticle')[i];
            flameParticleStats[i].flameTemp -= Math.random()* 75 + 5;
            const insideParticles = [
                ".flameParticle__phase01--" + i,
                ".flameParticle__phase02--" + i,
                ".flameParticle__phase03--" + i,
                ".flameParticle__phase04--" + i
            ];

            document.querySelector(insideParticles[1]).style.opacity =  (31000 + (flameParticleStats[i].flameTemp * 6)) / 10000;
            document.querySelector(insideParticles[2]).style.opacity =  (24000 + (flameParticleStats[i].flameTemp * 6)) / 10000;
            document.querySelector(insideParticles[3]).style.opacity =  (10000 + (flameParticleStats[i].flameTemp * 6)) / 10000;
            // document.querySelector(insideParticles[3]).style.opacity = 0


            flameParticleStats[i].velocityY -= 0.03;

            flameParticle.style.left = (parseFloat(flameParticle.style.left) + stat.velocityX) + "px";
            flameParticle.style.top = (parseFloat(flameParticle.style.top) + stat.velocityY) + "px";
            flameParticle.style.transform = "scale("+stat.scale+")";

            if(flameParticle.offsetTop < -50 || flameParticleStats[i].flameTemp < -5000) {
                flameParticle.style.top =  (window.innerHeight - 70) + "px";
                flameParticle.style.left = (Math.random() * (window.innerWidth) ) + "px";
                
                flameParticleStats[i].flameTemp = Math.random()* 600 + 350;
                flameParticleStats[i].velocityX = Math.random() *  1 - 1,
                flameParticleStats[i].velocityY =(Math.random() * 2 + 0.2) * -1;
                flameParticleStats[i].scale= Math.random()*1 + 0.5;
            }
        });

        if(flameParticleStats.length > 0 && document.visibilityState === 'visible') {
            setTimeout(moveFlames,20);
        }
    }

    function wipeAllFlames () {
        document.querySelectorAll(charClasses).forEach(chars=>{chars.classList.remove('filterOverlay')});
        document.querySelectorAll('.flameParticle').forEach(f=>f.remove());
        flameParticleStats = [];
    }

    /* Reminiscence */
    document.querySelector('.addPhotoFrameBtn').addEventListener('click', addPhotoFrame);
    function initiateReminiscence () {
        document.querySelector('.addPhotoFrameBtn').classList.add('expanded');
        for(let i = 0; i < 5; i++) {
            addPhotoFrame();
        }

        const adoleImages = [
            document.createElement('img'),
            document.createElement('img'),
            document.createElement('img'),
        ]
        adoleImages[0].src = "assets/images/bg_adolescence_01.png";
        adoleImages[1].src = "assets/images/bg_adolescence_02.png";
        adoleImages[2].src = "assets/images/bg_adolescence_03.png";
        
        const colorTape = document.createElement('div');
        colorTape.classList.add('colorTape');
        colorTape.appendChild(adoleImages[0]);
        document.querySelector('body').append(colorTape);
        
        const colorPen = document.createElement('div');
        colorPen.classList.add('colorPen');
        colorPen.appendChild(adoleImages[1]);
        document.querySelector('body').append(colorPen);
        
        const pencil = document.createElement('div');
        pencil.classList.add('pencil');
        pencil.appendChild(adoleImages[2]);
        document.querySelector('body').append(pencil);

        setTimeout(()=>{
            document.querySelector('.colorTape').classList.add('expanded');
            document.querySelector('.colorPen').classList.add('expanded');
            document.querySelector('.pencil').classList.add('expanded');
        }, 50);
    }

    function addPhotoFrame () {
        const initTranslate = [];
            initTranslate.push(Math.random()*2 <= 1 ? 2000 : -2000);
            initTranslate.push(Math.random()*2 <= 1 ? 2000 : -2000);
            const skewDeg = window.innerWidth <= 768 ? "-4deg" : "-8deg";
            const randomRotation = Math.random()*360 + "deg";
            const photoFrame = document.createElement('div');
            photoFrame.classList.add('photoFrame');
            photoFrame.style.left = (Math.random() * (window.innerWidth) - 300 ) + "px";
            photoFrame.style.top =  (Math.random() * (window.innerHeight) - 300 ) + "px";
            photoFrame.style.transform = "skewX(" + skewDeg + ") rotate(" + randomRotation + ") translate("+  initTranslate[0] +"px, "+ initTranslate[1] +"px)";
            photoFrame.style.background = "linear-gradient(308deg, rgb(" + Math.random()*255 + " " + Math.random()*255 + " " + Math.random()*255 + ") 0%, rgb(" + Math.random()*255 + " " + Math.random()*255 + " " + Math.random()*255 + ") 100%)";
            
            setTimeout (()=>{
                if(characters.length > 0) {
                    const humble = Math.floor(Math.random() * characters.length);
                    const duplicated = characters[humble].jonnyMain.cloneNode(true);
                    for(let l = 0; l < duplicated.children.length; l++) {
                        if(!duplicated.children[l].matches(".char__body")) {
                            duplicated.children[l].remove();
                        }
                    }
                    duplicated.dataset.charid=null;
                    photoFrame.appendChild(duplicated);
                }
                photoFrame.style.transition = "transform 1.4s";
                photoFrame.style.transform = "skewX(" + skewDeg + ") rotate(" + randomRotation + ") translate(0, 0)";
            }, 50);
            document.querySelector('.background_06').appendChild(photoFrame);
    }
    
    function wipeAllReminiscence () {
        document.querySelector('.addPhotoFrameBtn').classList.remove('expanded');
        document.querySelectorAll('.photoFrame,.pencil,.colorPen,.colorTape').forEach(f=>f.remove());
    }

    /* ************************
       Resurrection spell 
    ************************* */
    document.querySelector('.resurrectionBtn').addEventListener('click', b=>{
        b.preventDefault();
        openSpellImportation();
    });

    document.getElementById('resurrectionSpell_moreOption').addEventListener('click', b=>{
        b.preventDefault();
        const a = function () {
            let flag = 0;
            const temporarySpell = document.getElementById('resurrectionSpell_input').value;
            flag = reviveBySpell();

            if(flag) {
                for(let i = 0; i < 9;i ++){
                    document.getElementById('resurrectionSpell_input').value  = temporarySpell;
                    reviveBySpell();
                }
            }
        }
        toggleMenuDialog(0, b.clientX, b.clientY, [["Cast spell and copy 10 times",a]]);
    });

    document.querySelector('.resurrection_dialog').addEventListener('click', e => {
        if(e.target.classList.contains("resurrection_dialog")) {
            document.querySelector('.resurrection_dialog').classList.remove('expanded');
            document.querySelector('.resurrection_dialog_export__inner').classList.remove('expanded');  
            document.querySelector('.resurrection_dialog_import__inner').classList.remove('expanded');  
        }
    });

    function openSpellExportation(spell) {
        try {
            document.querySelector('.resurrectionSpell__stoneboard').textContent = spell;
            document.querySelector('.resurrection_dialog').classList.add('expanded');   
            document.querySelector('.resurrection_dialog_export__inner').classList.add('expanded');
        } catch (err) {
            alert("Alas! Generating thy spell has failed! Reason: " + err.message);
        }
    }

    function openSpellImportation() {
        try {
            document.querySelector('.resurrection_dialog').classList.add('expanded');   
            document.querySelector('.resurrection_dialog_import__inner').classList.add('expanded');
        } catch (err) {
            console.log(err);
        }
    }

    document.querySelector('#resurrectionSpell_cast').addEventListener('click', reviveBySpell);
    function reviveBySpell () {
        let validity = 0;
        let decoded = null;
        
        document.querySelector('.resurrection_dialog').classList.remove('expanded');
        document.querySelector('.resurrection_dialog_import__inner').classList.remove('expanded'); 
        try {
            const spell = document.getElementById('resurrectionSpell_input').value;
            decoded = JSON.parse(spell);
            validity = 1;
            document.getElementById('resurrectionSpell_input').value = "";
        } catch (err) {
            alert('Alas! Reviving thy characters has failed! Reason: ' + err.message);
            document.getElementById('resurrectionSpell_input').value = "";
        }
        if(!validity) return;
        validity = 0;
        if(decoded.char === "JonnyA") {
            characters.push(new JonnyA(decoded));
            validity=1;
        }
        if(decoded.char === "JonnyB") {
            characters.push(new JonnyB(decoded));
            validity=1;
        }
        if(decoded.char === "JimmyA") {
            characters.push(new JimmyA(decoded));
            validity=1;
        }
        if(decoded.char === "RolfA") {
            characters.push(new RolfA(decoded));
            validity=1;
        }
        if(decoded.char === "KevinA") {
            characters.push(new KevinA(decoded));
            validity=1;
        }
        if(decoded.char === "EdA") {
            characters.push(new EdA(decoded));
            validity=1;
        }
        if(decoded.char === "EddyA") {
            characters.push(new EddyA(decoded));
            validity=1;
        }
        if(decoded.char === "EddA" && decoded.currency <= 5 && decoded.currency >= 0) {
            characters.push(new EddA(0, decoded));
            validity=1;
        }
        if(!validity) {
            alert("Alas! Reviving thy characters has failed! Reason: Invalid spell");
            return;
        };
        return 1;
    }

    /* Copy to clipboard */
    function copyToClipboard(text) {
        let errorFlag = null;
        try {
            navigator.clipboard.writeText(text);
        } catch (err) {
            alert("Oooh... we have failed to copy the spell! Reason : " + err.message);
            errorFlag = err.message;
        }

        if(!errorFlag) {
            document.querySelector('.copyBtn').textContent="Copied!";
            setTimeout(()=>{document.querySelector('.copyBtn').textContent = "Copy";}, 2000);
        }
    }

    const copyButton = document.querySelector('.copyBtn');
    copyButton.addEventListener("click", e=>{
        copyToClipboard(document.querySelector('.resurrectionSpell__stoneboard').textContent);
    });

    /* ****************************** 
    Codes about context menu dialog 
    ****************************** */
    const menu = document.querySelector('.popup_menu');
    let charHandler = 0;

    function toggleMenuDialog (charID, x, y, actions = []) {
        const actionsArray = [];
        document.querySelectorAll('.popup_menu li').forEach(f=>f.remove());
        if(actions.length > 0){
            actions.forEach(action => {
                actionsArray.push(action);
            });
        }

        actionsArray.push(["Drop Anvil Anyway", null]);
        actionsArray.forEach(list => {
            // action is an array with [label, callback]
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = "#";
            a.textContent=list[0];
            li.appendChild(a);
            if(list[1]) a.addEventListener('click', list[1]);
            document.querySelector('.popup_menu ul').appendChild(li);
        });

        document.querySelectorAll('.popup_menu li').forEach((li, index) => {
            li.children[0].addEventListener('click', f => {
                f.preventDefault();
                if(index === actionsArray.length - 1) {
                    if(f.touches) {
                        summonAnvil(document.querySelector('main'), f.touches[0].clientX - 100, (window.scrollY + f.touches[0].clientY) - 100);
                    }else{
                        summonAnvil(document.querySelector('main'), f.clientX - 100, (window.scrollY + f.clientY) - 100);
                    }
                }
            });
        });

        menu.classList.toggle("expanded");

        charHandler = charID;
        let to = "";
        if(x > window.innerWidth - (menu.offsetWidth)) {
            x -= (menu.offsetWidth - 0);
            to += "right ";
        } else {
            to += "left ";
        }
        if(y > window.innerHeight - (menu.offsetHeight + 50)) {
            y -= (menu.offsetHeight + 25);
            to += "bottom";
        }else{
            to += "top";
        }

        menu.style.transformOrigin = to;
        menu.style.left = x + 'px';
        menu.style.top = (y + 20) + 'px';
    }

    document.addEventListener('click', e => {
        if(!e.target.classList.contains("popup_menu") && !e.target.classList.contains("exportBtn") && e.target.id !== "resurrectionSpell_moreOption") {
            document.querySelector('.popup_menu').classList.remove("expanded");
        }
    });

    function summonAnvil (summonTarget, x, y, width = 200, height = 200) {
        const anvil = document.createElement('div');
        anvil.classList.add('animation_anvil');
        anvil.textContent="100t";
        summonTarget.appendChild(anvil);
        summonTarget.style.position = 'relative';
        anvil.style.left = x + 'px';
        if(y !== 0 ){
            anvil.style.top = y + 'px';
        }
        anvil.style.width = width + "px";
        anvil.style.height = height + "px";
        setTimeout(()=>{
            anvil.style.transform = "translateY(-200px)";
            anvil.style.animation = "blurringOut 1s ease-in-out forwards";
        }, 4000);
        setTimeout(()=>{anvil.remove();}, 5000);
    }

    function toggleTheatreMode () {
        document.querySelector('body').classList.toggle('theatreMode');
        if(!document.querySelector('body').classList.contains('theatreMode')) {
            wipeAllColorballs();
            wipeAllFlames();
            wipeAllHeartPop();
            wipeAllSnowdrops();
            wipeAllReminiscence ();
            return;
        } 
        if(document.querySelector(".background_02").classList.contains("expanded")) {
            document.getElementById('theatre_background_snowfall').click();
        }
        if(document.querySelector(".background_03").classList.contains("expanded")) {
            document.getElementById('theatre_background_spotlight').click();
        }
        if(document.querySelector(".background_04").classList.contains("expanded")) {
            document.getElementById('theatre_background_heartfullyheart').click();
        }
        if(document.querySelector(".background_05").classList.contains("expanded")) {
            document.getElementById('theatre_background_burstfullyflame').click();
        }
        if(document.querySelector(".background_06").classList.contains("expanded")) {
            document.getElementById('theatre_background_reminiscence').click();
        }
    }

    /* Right-click menu */
    document.querySelector('main').addEventListener('contextmenu',f=>{
        f.preventDefault();
        const tgt = f.target;
        
        if(tgt.classList.contains('thumbnail__inner')) return;
        
        if(menu.classList.contains('expanded')){
            menu.classList.remove("expanded");
        };

        let l = -1;
        if(tgt.classList.contains("char__body")){
            l = tgt.parentElement.dataset.charid;
            charHandler = l;
        }
        if(l >= 0){
            toggleMenuDialog(charHandler, f.clientX, f.clientY, characters[charHandler].contextMenuMaker());
        }else {
            if(tgt.classList.contains("character_adder__eddA")){
                const addEddOptions = [
                    ["Add Edd with Dollar", function () {characters.push(new EddA(0))}],
                    ["Add Edd with Yen", function () {characters.push(new EddA(1))}],
                    ["Add Edd with Euro", function () {characters.push(new EddA(2))}],
                    ["Add Edd with Rupee", function () {characters.push(new EddA(3))}],
                    ["Add Edd with Won", function () {characters.push(new EddA(4))}],
                    ["Add Edd with GBP", function () {characters.push(new EddA(5))}],
                ];
                toggleMenuDialog(0, f.clientX, f.clientY, addEddOptions);
            }else{
                const g = function () {
                    toggleTheatreMode();
                }
                toggleMenuDialog(0, f.clientX, f.clientY, [["Theatre Mode",g]]);
            }
        }
    });

    /* Paper is Fun */
    function paperIsFun (animationNo,character,x,y,wid,hei) {
        document.querySelector("main").style.position = "relative";
        const duplicated = character.cloneNode(true);
        duplicated.dataset.charid = null;
        for( const child of duplicated.children){
            if(child.matches('.char__controller')) {
                child.remove();
            }
        }
        duplicated.style.position = "absolute";
        duplicated.style.left = x + 'px';
        duplicated.style.top = y + 'px';
        duplicated.style.width = wid + 'px';
        duplicated.style.height = hei + 'px';
        duplicated.style.zIndex = 8;
        duplicated.style.animation = "paperIsFun_" + animationNo + " 1s ease-in-out forwards";
        document.querySelector('main').appendChild(duplicated);

        switch(animationNo) {
            case 0:
                const rotates = [0, 0, 0];
                const paper = document.createElement('div');
                let intv;
                let opc = 100;
                let trsY = 0;
                let trsX = 0;
                let velY = 1;
                let velX = Math.random()*1 - 1;
                let score = 0;
                const scl = (screen.width < 768) ? 0.66 : 1;
                paper.classList.add("paperIsFun__paper");
                paper.style.position = "absolute";
                paper.style.width = wid + 30 + 'px';
                paper.style.height = hei + 30 + 'px';
                paper.style.minHeight = "640px";
                paper.style.background = "#FFFFFF";
                paper.style.border = "1px solid #808080";
                paper.style.zIndex = 7;
                paper.style.left = x - 15 + 'px';
                paper.style.top = (y + 15) + 'px';
                paper.style.transform = "translateY(100%)";
                paper.style.boxShadow = "85px 85px 70px #999999";

                setTimeout(()=>{
                    paper.style.transition = "transform 0.4s, box-shadow  1s";
                    paper.style.transform = "translateY(0%)";
                    paper.style.boxShadow = "0 0 0 #FFFFFF";
                    paper.addEventListener('click', f => {
                        const ctr =  paper.getBoundingClientRect().left + (paper.getBoundingClientRect().width / 2);
                        console.log((f.clientX - ctr ) * -0.01);
                        velX += (f.clientX - ctr) * -0.01;
                        velY = velY > 0 ? -10 : velY - 10;
                        opc = 100;
                        score ++;
                    });
                },25);

                setTimeout(()=>{
                    duplicated.style.left = "0px";
                    duplicated.style.top = "0px";
                    paper.style.transition = "scale 0.5s, box-shadow 1s";
                    paper.style.scale = scl;
                    paper.append(duplicated);
                    intv = setInterval(()=>{
                        velY += 0.1;
                        trsY += velY;
                        trsX += velX;
                        opc = velY > 0 ? opc - 0.5 : 100;
                        rotates[0] += Math.random()*2 - 4;
                        rotates[1] += Math.random()*2 - 4;
                        rotates[2] += Math.random()*2 - 4;
                        paper.style.transform = `translateX(${trsX}px) translateY(${trsY}px) rotateX(${rotates[0]}deg) rotateY(${rotates[1]}deg) rotateZ(${rotates[2]}deg)`;
                        paper.style.opacity = opc / 100;
                        if(opc<0) {
                            clearInterval(intv);
                            if(score > 0){
                                showScore(score);
                            }
                            paper.remove();                            
                        }
                    },12);
                },400);
                
                document.querySelector('main').appendChild(paper);
            break;

            case 1:
                slasher(duplicated);
            break;
        }
    }

    /* Slasher */
    function slasher (duplicated) {
        const cloneA = duplicated;
        const cloneB = cloneA.cloneNode(true);
        cloneA.style.transition = "0.4s";
        cloneB.style.transition = "0.4s";
        const blackBG = document.createElement("div");
        blackBG.classList.add("blackBG");

        cloneA.classList.add("turningBlack");
        cloneA.classList.add("slashedPartA");

        cloneB.classList.add("turningBlack");
        cloneB.classList.add("slashedPartB");

        const slashEffect = document.createElement('div');
        slashEffect.classList.add("slashEffect");
        slashEffect.style.left = cloneA.getBoundingClientRect().left  + "px";
        
        document.querySelector("body").appendChild(blackBG);
        blackBG.appendChild(slashEffect);

        const slashPos = cloneA.getBoundingClientRect().top + (cloneA.getBoundingClientRect().height * 0.76 );
        slashEffect.style.top = `${slashPos}px`;

        document.querySelector("main").appendChild(cloneA);
        document.querySelector("main").appendChild(cloneB);

        setTimeout(()=>{
            blackBG.style.opacity="0";
            cloneA.classList.add("active");
            cloneB.classList.add("active");
        }, 100);

        setTimeout(()=>{
            blackBG.remove();
        }, 600);

        setTimeout(()=>{
            cloneA.style.transform = "translate(-240px, 15px)";
            cloneB.style.transform = "translate(240px, -15px)";
        }, 600);
        setTimeout(()=>{
            cloneA.style.opacity = "0";
            cloneB.style.opacity = "0";
        }, 1200);
        setTimeout(()=>{
            cloneA.remove();
            cloneB.remove();
        }, 1600);
    }

    /* Show score */
    function showScore (scr) {
        const scoreCounter = document.createElement("span");
        scoreCounter.textContent = scr > 1 ? `${scr} pts.` : `${scr} pt.`;
        scoreCounter.classList.add('scoreCounter');

        setTimeout(()=>{
            scoreCounter.remove();
        }, 3000);

        document.querySelector("main").appendChild(scoreCounter);
    }

    /* Checkers */
    function checkers (target, tileRows) {
        if(tileRows<2) {
            console.log("tileRows must be greater than 2");
            return;
        }
        const display = target;
        // const display = document.querySelector(target);
        let checkerRem = tileRows * tileRows;
        const checkerState = [];

        for (let i = 0; i < tileRows; i++){
            checkerState.push(Array.from({length: tileRows}, () => 1));
        }

        let bgPosSettings = "";
        for(let i = 0; i < tileRows; i++) {
            for(let j = 0; j < tileRows; j++) {
                bgPosSettings += `${(100 / tileRows) * j}% ${(100 / tileRows) * i}%, `;
            }
        }
        bgPosSettings = bgPosSettings.slice(0, -2);

        let intv = setInterval (()=>{
            let isCheckRemoved = 0;
            do {
                const random = [Math.floor(Math.random()*tileRows), Math.floor(Math.random()*tileRows)];
                if(checkerState[random[0]][random[1]] == 1) {
                    checkerState[random[0]][random[1]] = 0;
                    checkerRem --;
                    isCheckRemoved = 1;
                }
            }while(isCheckRemoved===0);
    
            let bgSettings = "";
            const chipSize = [
                display.getBoundingClientRect().width / tileRows,
                display.getBoundingClientRect().height / tileRows
            ];
            
            for(let i = 0; i < tileRows; i++) {
                for(let j = 0; j < tileRows; j++) {
                    bgSettings += "linear-gradient(0deg, ";
                    let lastPrefix = "),";
                    bgSettings += checkerState[i][j] == 1 ? "rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%" + lastPrefix : "rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%" + lastPrefix;
                }
            }

            bgSettings = bgSettings.slice(0, -1);

            display.style.maskImage = bgSettings;
            display.style.maskSize = `${chipSize[0]}px ${chipSize[1]}px`;
            display.style.maskRepeat = "no-repeat";
            display.style.maskPosition = bgPosSettings;

    
            if(checkerRem <= 0) {
                console.log('Interval has been stopped...');
                clearInterval(intv);
            }
        }, 17);
    }
}