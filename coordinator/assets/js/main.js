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
            const randomAnimation = Math.floor(Math.random()*6);

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
            }
            
            this.controllerMaster.remove();
            this.exportBtn.remove(); 
            this.jonnyMain.dataset.charid = null;

            setTimeout(()=>{
                this.jonnyMain.remove();
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
            this.controllerInner = controlGroupInner;

            const controllerPanel = document.createElement('div');
            const controllerLabel = document.createElement('span');

            this.thumbnail.addEventListener('click', ()=>{
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
                }else if (i===4){
                    part[1].setAttribute('value', "normal");
                }else{
                    part[1].setAttribute('max', '100');
                    part[1].setAttribute('value', Math.floor(Math.random() * 100));
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
                    controlParts[3][1].value = this.decodedChip.opacity;
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
            this.controllerInner = controlGroupInner;
            
            const controllerPanel = document.createElement('div');
            const controllerLabel = document.createElement('span');

            controllerPanel.append(this.thumbnail);

            this.thumbnail.addEventListener('click', ()=>{
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
            this.tipSpell["mixblendmode"] = "normal";

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
                controlGroupInner.classList.toggle('expanded');
                specimensPos[0] = gradientSpecimen.getBoundingClientRect().left;
                specimensPos[1] = gradientSpecimen.getBoundingClientRect().right;
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

        addDeleteTrigger(array) {
            const deleteBtn = document.createElement('div');
            deleteBtn.classList.add('deteleBtn');
            deleteBtn.textContent="DELETE";
            this.controllerInner.append(deleteBtn);
            deleteBtn.addEventListener('click', ()=>{
                this.deleteColorChip();
                array.splice(this.chipID, 1);
                array.forEach(f=>{f.updateThisChipPos(this.chipID, array);});
            });
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
                console.log(left + " / " + leftTurningPoint);

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
            if(!this.decodedPart) {
                this.addColorLayer();
            }else{
                this.reviveBySpell();
            }

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

            this.palette.append(this.simpleColorAddBtn);
            this.palette.append(this.patternAddBtn);
            this.palette.append(this.gradientAddBtn);
            controllerMaster.append(this.palette);

            addTo.append(this.matMain);
        }
        
        addColorLayer () {
            this.layers.push(new ColorChip(this.decodedPart, "simple", this.mat, this.palette, this.layers.length));
            this.layers[this.layers.length-1].addDeleteTrigger(this.layers);
            this.layerID++;
            this.reRender();
        }

        addPattern () {
            this.layers.push(new ColorChip(this.decodedPart, "pattern", this.mat, this.palette, this.layers.length));
            this.layers[this.layers.length-1].addDeleteTrigger(this.layers);
            this.layerID++;
            this.reRender();
        } 

        addGradient () {
            this.layers.push(new ColorChip(this.decodedPart, "gradient", this.mat, this.palette, this.layers.length));
            this.layers[this.layers.length-1].addDeleteTrigger(this.layers);
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
                    this.layers[this.layers.length-1].addDeleteTrigger(this.layers);
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
    // Color Managements end
    //  ______________________

    const characters = [];

    document.querySelectorAll('.character_adder__inner a').forEach(a=>{
        a.addEventListener('click', a=>{
            a.preventDefault();
        });
    });
    
    document.querySelector('.character_adder__jonnyA').addEventListener('click', ()=>{
        characters.push(new JonnyA());
    });
    document.querySelector('.character_adder__jonnyB').addEventListener('click', ()=>{
        characters.push(new JonnyB());
    });
    document.querySelector('.character_adder__jimmyA').addEventListener('click', ()=>{
        characters.push(new JimmyA());
    });
    document.querySelector('.character_adder__rolfA').addEventListener('click', ()=>{
        characters.push(new RolfA());
    });
    document.querySelector('.character_adder__kevinA').addEventListener('click', ()=>{
        characters.push(new KevinA());
    });
    document.querySelector('.character_adder__edA').addEventListener('click', ()=>{
        characters.push(new EdA());
    });
    document.querySelector('.character_adder__eddyA').addEventListener('click', ()=>{
        characters.push(new EddyA());
    });
    document.querySelector('.character_adder__eddA').addEventListener('click', ()=>{
        characters.push(new EddA(Math.floor(Math.random()*6)));
    });

    // Print button
    document.querySelector('.printBtn').addEventListener('click', ()=>{window.print();});


    const charClasses = '.jonnyA,.jonnyB,.jimmyA,.rolfA,.kevinA,.edA,.eddyA,.eddA';
    /* ________________________
    Theatre Mode
    _________________________*/
    // Theatre mode button
    document.querySelector('.theatreBtn').addEventListener('click', b=>{
        b.preventDefault();
        toggleTheatreMode ();
    });

    // ___________________
    //background settings
    //____________________
    document.querySelector('.theatre_background_setter a').addEventListener('click', b=>{
        b.preventDefault();
        document.querySelector('.theatre_background_setter').classList.toggle('expanded');
    });

    const backgroundParts = [
        '.background_01',
        '.background_02',
        '.background_03',
        '.background_04',
        '.background_05',
    ]

    document.querySelectorAll('.theatre_background_setter input').forEach((radio, index)=>{
        radio.addEventListener('click', (item)=>{
            console.log(item.target.id);
            document.querySelector('.theatre_background_setter').classList.remove('expanded');
            
            wipeAllSnowdrops ();
            wipeAllColorballs ();
            wipeAllHeartPop ();
            wipeAllFlames ();
                
            backgroundParts.forEach(bgs=>{
                document.querySelector(bgs).classList.remove('expanded');
            });
        
            console.log(document.querySelector(backgroundParts[index]));
            document.querySelector(backgroundParts[index]).classList.add('expanded');
        });
    });

    document.getElementById('theatre_background_snowfall').addEventListener('click',function(){
        initiateSnowdrop();
    });

    document.getElementById('theatre_background_spotlight').addEventListener('click',function(){
        initiateColorball();
    });

    document.getElementById('theatre_background_heartfullyheart').addEventListener('click',function(){
        initiateHeartPop();
    });

    document.getElementById('theatre_background_burstfullyflame').addEventListener('click',function(){
        initiateFlames();
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

    /* ************************
       Resurrection spell 
    ************************* */
    document.querySelector('.resurrectionBtn').addEventListener('click', b=>{
        b.preventDefault();
        openSpellImportation();
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

    /* Expand/Shrink Pop up menu */
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
            if(list[1])
            a.addEventListener('click', list[1]);
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
        if(x > window.innerWidth - 150) {
            x -= 140;
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
        if(!e.target.classList.contains("popup_menu") && !e.target.classList.contains("exportBtn")) {
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
    }

    /* Right-click menu */
    document.querySelector('main').addEventListener('contextmenu',f=>{
        f.preventDefault();
        const tgt = f.target;
        if(menu.classList.contains('expanded')){
            menu.classList.remove("expanded");
        };
        let l = -1;
        if(tgt.classList.contains("char__body")){
            l = tgt.parentElement.dataset.charid;
            console.log(l);
            charHandler = l;
        }
        if(l >= 0){
            toggleMenuDialog(charHandler, f.clientX, f.clientY, characters[charHandler].contextMenuMaker());
        }else {
            if(tgt.classList.contains("character_adder__eddA")){
                const g = [
                    ["Add Edd with Dollar", function () {characters.push(new EddA(0))}],
                    ["Add Edd with Yen", function () {characters.push(new EddA(1))}],
                    ["Add Edd with Euro", function () {characters.push(new EddA(2))}],
                    ["Add Edd with Rupee", function () {characters.push(new EddA(3))}],
                    ["Add Edd with Wong", function () {characters.push(new EddA(4))}]
                ]
                toggleMenuDialog(0, f.clientX, f.clientY, g);
            }else{
                const g = function () {
                    toggleTheatreMode();
                }
                toggleMenuDialog(0, f.clientX, f.clientY, [["Theatre Mode",g]]);
            }
        }
    });
}