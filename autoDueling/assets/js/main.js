"use strict";
{
    class DrumMeter {
        constructor (location, initialParam = 0, label = "HP") {
            this.drumContainer = document.createElement('div');
            this.drumContainer.classList.add('drum_container');
            
            this.labeller = document.createElement("span");
            this.labeller.classList.add("labeller")
            this.labeller.textContent = label;
            this.drumContainer.appendChild(this.labeller);
            this.drumContainerInner = document.createElement('div');
            this.drumContainerInner.classList.add('drum_container_inner');
            this.drumContainer.appendChild(this.drumContainerInner);
            location.appendChild(this.drumContainer);
            
            this.drumMeters
            = [
                document.createElement("div"),
                document.createElement("div"),
                document.createElement("div"),
                document.createElement("div"),
            ];
            for(let i = 0; i < 4; i ++) {
                if(i !== 3) {
                    this.drumMeters[i].style.background = "linear-gradient(rgb(255, 255, 255) 0px, rgb(215, 215, 215) 118px, rgba(255, 120, 120, 0) 118px) left top no-repeat,url(./assets/images/drummeter.png) left top repeat-y";
                } else {
                    this.drumMeters[i].style.background = "url(./assets/images/drummeter.png) left top repeat-y";
                }
                this.drumMeters[i].style.backgroundSize = "80px";
                this.drumMeters[i].style.width = "80px";
                this.drumMeters[i].style.position = "absolute";
                this.drumMeters[i].style.left = (80 * i) + "px";
                this.drumMeters[i].style.top = "0";
                this.drumMeters[i].style.height = (120 * (10000 / 10 ** (3 - i))) + "px";
                this.drumMeters[i].style.transition = "transform 0.1s ease-in-out";
                if(i < 3) {
                    this.drumMeters[i].style.transitionDelay = "0.1s";
                }
                this.drumContainerInner.appendChild(this.drumMeters[i]);
            }
            this.syncronize(initialParam);
        }
        syncronize (param) {
            let destParam = param;
            if(destParam < 0) {
                destParam=0;
            }else if(destParam>9999) {
                destParam=9999;
            }
            this.drumMeters[0].style.transform = 
            `translateY(${(Math.floor(destParam / 1000) * 120) * -1}px)`;
            this.drumMeters[1].style.transform = 
            `translateY(${(Math.floor(destParam / 100) * 120) * -1}px)`;
            this.drumMeters[2].style.transform = 
            `translateY(${(Math.floor(destParam / 10) * 120) * -1}px)`;
            this.drumMeters[3].style.transform = 
            `translateY(${(destParam * 120) * -1}px)`;
        }
    }
        
    class Background {
        static maximumBgs = 2;

        constructor (duel, bgSettings) {
            this.duel = duel;
            this.bgSettings = bgSettings;
            

            this.mat = document.createElement('div');
            this.mat.classList.add('duelBg');
            this.duel.duelScreen.appendChild(this.mat);

            if(this.bgSettings.bgId === 0) {
                this.mat.classList.add('duelBg_00');
                const sprite00 = document.createElement('div');
                sprite00.classList.add('duelBg_00__sprites01');
                const sprite00Inner = document.createElement('div');
                sprite00Inner.classList.add('duelBg_00__sprites01__inner');
                sprite00.appendChild(sprite00Inner);
                this.mat.appendChild(sprite00);
            }

            if(this.bgSettings.bgId === 1) {
                this.mat.classList.add('duelBg_01');
                this.gimmickWorking = 0;
                setTimeout(()=>{
                    this.moveBg01();
                }, 1000);
            }
        }

        moveBg01 () {
            const probabilityOfThunder = 300;
            if(
                Math.random()*probabilityOfThunder <= 1
                && this.gimmickWorking===0
                && this.duel.charA.stats.hpa>0
                && this.duel.charB.stats.hpa>0
            ) {
                this.gimmickWorking = 1;
                const target = this.duel.field[Math.floor(Math.random()*this.duel.field.length)];
                // const target = Math.random()*2 <= 1 ? this.duel.charA : this.duel.charB;
                this.duel.writeMessage("らくらいだ！");
                flashScreen("#ffef00", this.duel.duelScreen);

                setTimeout(()=>{
                    this.gimmickWorking = 0;
                    target.takeDamage(Math.floor(Math.random()*80) + 80, "thunder", true);
                    if(Math.random()*8 <= 1) {
                        target.stats.ailments.paralysed = 1;
                        this.duel.writeMessage(`${target.stats.charName} の からだは しびれてしまった！`);
                    }
                },600);
            }
            if(
                this.duel.gameFlag===1
            ){
                window.requestAnimationFrame(this.moveBg01.bind(this));
            }
        }
    }

    class CharBase {
        constructor (duel, initStat = null) {
            this.duel = duel;
            this.duel.charID++;
            this.actable = 0;
            this.actionTime = 0;
            this.charPos = [this.duel.duelScreen.offsetWidth / 2,0];
            this.takenDamage = 0;
            this.opponent = this.duel.charA;
            this.customMessages = {};
            this.stats =
            {
                id: this.duel.charID,
                iff: 999,
                coreName: "Dummy",
                charName: "",
                mhp: 100,
                hp: 100,
                mtp: 100,
                tp: 100,
                offense: 100,
                defense: 100,
                isDefending: 0,
                agl: 0,
                ailments: {
                    // Every turn, decreasing HP by 50-100
                    poisoned: this.duel.rules.duelmode === "poisonrelying" ? 1 : 0,
                    // Cannot act till he/she awakens
                    asleep: this.duel.rules.duelmode === "poisonrelying" ? 1 : 0,
                    // Cannot do physical actions
                    paralysed: 0,
                    // Often missing physical bash
                    crying: this.duel.rules.duelmode === "suddendeath" ? 1 : 0,
                    // Cannot do PSI actions
                    silenced: 0,
                    // Sometimes confused who to attack
                    strange: 0,
                },
                shielding: {type:"", duration: 0},
                reviveEnchanted: this.duel.rules.duelmode === "withrevive" ? 1 : 0,
                parameterAlteration: {
                    offense : 0,
                    defense : 0,
                },
            }
            this.stats.charName = this.stats.coreName;

            if(initStat) {
                this.setStats(initStat);
            }

            this.defineStatusIndi();
        }

        defineStatusIndi () {
            this.windowMain = document.createElement("div");
            this.windowMain.classList.add("subChar");
            this.windowMain.textContent = `${this.stats.charName}`;
            if(this.stats.iff === 0) {
                this.duel.sides[0].appendChild(this.windowMain);
            } else if(this.stats.iff === 1) {
                this.duel.sides[1].appendChild(this.windowMain);
            } else {
                this.duel.sides[2].appendChild(this.windowMain);
            }
            this.charPos =
            [
                this.windowMain.offsetLeft + this.windowMain.offsetWidth / 2,
                this.windowMain.offsetTop,
            ];
        }

        setStats (stats) {
            Object.entries(stats).forEach(n =>{this.stats[n[0]] = n[1];});
            this.stats.hp = this.stats.mhp;
            this.stats.hpa = this.stats.mhp;
            this.stats.tp = this.stats.mtp;
            this.stats.tpa = this.stats.mtp;
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZイロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス";
            if(this.stats.coreName ===  "narazu") {
                this.stats.charName = "ならずもの " + alphabet[this.duel.namesakes.narazu];
                this.customMessages.fainted = `${this.stats.charName} は こうさんした！`;
                this.duel.namesakes.narazu++;
            }
            if(this.stats.coreName ===  "starman") {
                this.stats.charName = "スターマン " + alphabet[this.duel.namesakes.starman];
                this.customMessages.fainted = `${this.stats.charName} を たおした！`;
                this.duel.namesakes.starman++;
            }
        }

        whereAreYou () {
            return this.duel.field.indexOf(this);
        }
        
        initAction () {
            this.actionTime = 0;
            this.stats.isDefending = 0;
            this.windowMain.classList.add("acting");
            this.duel.centralCharContainer.scrollTo (
                { top: this.windowMain.offsetTop,
                    behavior: "smooth"
                }
            );
            if(this.stats.ailments.poisoned) {
                this.poisonDamage();
            } else if(this.stats.ailments.asleep) {
                this.asleep();
            } else {
                this.setAction();
            }
        }

        poisonDamage () {
            const poisonDmg = Math.floor(Math.random()*50) + 50;
            this.stats.hp -= poisonDmg;
            this.duel.writeMessage(`${this.stats.charName} は どくで ${poisonDmg} の ダメージ！`);
            this.takenDamage += poisonDmg;
            setTimeout(()=>{
                 if(this.stats.ailments.asleep) {
                    this.asleep();
                }else{
                    this.setAction();
                }
            },1000);
        }
        
        asleep () {
            this.duel.writeMessage(`${this.stats.charName} は ねむっている…`);
            if(this.stats.mtp>=1) {
                this.stats.tp += Math.floor(Math.random()*3);
            }
            if(Math.random()*4 <= 1 && this.duel.rules.duelmode !== "poisonrelying") {
                setTimeout(()=>{
                    this.recover("asleep");
                }, 1000);
                setTimeout(()=>{
                    this.endTurn();
                }, 2000);
            }else{
                setTimeout(()=>{
                    this.endTurn();
                }, 1000);
            }
        }

        paralysing () {
            this.duel.writeMessage(`${this.stats.charName} は しびれてうごけない！`);
            setTimeout(()=>{
                this.endTurn()
            },1000);
        }

        recover (ailment) {
            if(ailment === "poisoned") {
                this.stats.ailments.poisoned = 0;
                this.duel.writeMessage(`${this.stats.charName} の からだから どくがきえた！`);
            }
            if(ailment === "crying") {
                this.stats.ailments.crying = 0;
                this.duel.writeMessage(`${this.stats.charName} の なみだは ようやくとまった…`);
            }
            if(ailment === "asleep") {
                this.stats.ailments.asleep = 0;
                this.duel.writeMessage(`${this.stats.charName} は めをさました！`);
            }
            if(ailment === "paralysed") {
                this.stats.ailments.paralysed = 0;
                this.duel.writeMessage(`${this.stats.charName} の からだから しびれがきえた！`);
            }
            if(ailment === "silenced") {
                this.stats.ailments.silenced = 0;
                this.duel.writeMessage(`${this.stats.charName} は コンセントレーションが できるようになった！`);
            }
            if(ailment === "strange") {
                this.stats.ailments.strange = 0;
                this.duel.writeMessage(`${this.stats.charName} は もとに もどった！`);
            }
        }

        setAction () {
            let lag  = 17;

            let targetAlly = this;
            if(this.stats.ailments.strange === 1) {
                if(Math.random()*2 <= 1) {
                    targetAlly = this.duel.field.filter (p => p !== "*" && p.stats.iff !== this.stats.iff)[0];
                    this.opponent = this;
                }
            } else {
                const playerIff = this.stats.iff;
                const opponentCandidate = this.duel.field.filter(p => p !== "*" && p.stats.iff !== playerIff);
                this.opponent = opponentCandidate[Math.floor(Math.random()*opponentCandidate.length)];
            }

            if(this.stats.coreName === "narazu") {
                if(this.stats.ailments.paralysed) {
                    this.paralysing();
                }else {
                    if(this.stats.ailments.strange) {
                        this.duel.writeMessage(`${this.stats.charName} は すこしヘンに なっている…`);
                        lag = 1000;
                    }
                    setTimeout(()=>{
                        otherCharAction.narazu(this, this.duel);
                    }, lag);
                }
            } else if(this.stats.coreName === "starman") {
                if(this.stats.ailments.strange) {
                    this.duel.writeMessage(`${this.stats.charName} は すこしヘンに なっている…`);
                    lag = 1000;
                }
                setTimeout(()=>{
                    otherCharAction.starman(this, this.duel);
                }, lag);
                
            }else{
                this.duel.writeMessage(this.stats.charName  + ' : わたしもいつかこうどうできるようになってみたい。');
                setTimeout(()=>{
                    this.endTurn();
                }, 2000);
            }
        }

        endTurn () {
            let to = 17;
            if(
                Math.random()*30 <= 1 &&
                this.stats.ailments.poisoned &&
                this.duel.rules.duelmode !== "poisonrelying"
            ){
                this.recover("poisoned");
                to = 1000;
            }

            if(
                !this.stats.ailments.poisoned &&
                this.stats.ailments.paralysed &&
                Math.random()*10 <= 1 
            ) {
                this.recover('paralysed');
                to = 1000;
            }
            // if(this.duel.promisedMessage.length>0){
            //     this.duel.promisedMessage.forEach(m => {
            //         this.duel.writeMessage(m);
            //     });
            //     to = 1000 * this.duel.promisedMessage.length;
            // }
            this.duel.promisedMessage = [];
            this.windowMain.classList.remove("acting");
            
            setTimeout(()=>{
                this.duel.seekTurn();
            },to);
        }

        defend () {
            if(!this.stats.ailments.paralysed){
                this.duel.writeMessage(`${this.stats.charName} は ガードしている`);
                this.stats.isDefending=1;
                
                setTimeout(()=>{
                    this.endTurn();
                }, 1000);
            }else{
                this.paralysing();
            }
        }
        
        lifeUp (target) {
            this.psiTrial(target, spellBook.lifeup, 0);
        }

        psiMagnet () {
            this.psiTrial(this.opponent, spellBook.psiMagnet, 0);
        }

        hypnosisAlpha () {
            this.psiTrial(this.opponent, spellBook["hypnosis-alpha"], 0);
        }

        psiTrial (target, spell, animationTime) {
            let success = 0;
            this.duel.writeMessage(`${this.stats.charName} は ${spell.title} をこころみた！`);

            if(
                this.duel.rules.duelmode !== "nomagic" && 
                this.stats.tp >= spell.cost && 
                this.stats.ailments.silenced === 0
            ){
                success = 1;
                this.stats.tp -= spell.cost;
            }

            if(success){
                setTimeout(()=>{
                    spell.func(this, target, this.duel);
                },(1200 + animationTime));
            }else{
                setTimeout(()=>{
                    if(this.duel.rules.duelmode === "nomagic"){
                        this.duel.writeMessage(`だが せいやくで PSIは つかえない！`);
                        if(this instanceof LeadChar) {
                            this.recognize('rule','nomagic');
                        } 
                    } else if(this.stats.ailments.silenced) {
                        this.duel.writeMessage(`しかし PSIは ふうじこまれている！`);
                    } else {
                        this.duel.writeMessage(`しかし TPがたりなかった！`);
                    }
                }, 800);
                setTimeout(() => {
                    this.endTurn();
                }, 1800);
            }
        }

        takeDamage(dmg, type, byGimic = false) {
            if(type==="physical"){
                if(
                this.stats.shielding.type==="shield"
                &&
                this.stats.shielding.duration>0){
                    dmg = Math.ceil(dmg / 2);
                    this.stats.hp -= dmg;
                    this.stats.shielding.duration--;
                    if(this.stats.shielding.duration<=0){
                        this.duel.writeMessage(`${this.stats.charName} の シールドは きえてなくなった！`);
                    }
                }else{
                    this.stats.hp -= dmg;
                }
                this.duel.writeBreakdown(`${dmg} ダメージ`);
                popDamage(dmg, "damage", this.duel.duelScreen, this.charPos, byGimic);
            }else if(type==="psi"){
                this.stats.hp -= dmg;
                this.duel.writeBreakdown(`${dmg} ダメージ`);
                popDamage(dmg, "damage", this.duel.duelScreen, this.charPos, byGimic);
            } else if(type==="thunder") {
                if(
                this.stats.shielding.type==="shield"
                &&
                this.stats.shielding.duration>0){
                    dmg = Math.ceil(dmg / 2);
                    this.stats.hp -= dmg;
                    this.stats.shielding.duration=0;
                    this.duel.writeMessage(`${this.stats.charName} の シールドは きえてなくなった！`);
                }else{
                    this.stats.hp -= dmg;
                }
                this.duel.writeBreakdown(`${dmg} ダメージ`);
                popDamage(dmg, "damage", this.duel.duelScreen, this.charPos, byGimic);
            }

            if(!(this instanceof LeadChar)) {
                    this.duel.writeMessage(`${this.stats.charName} は ${dmg} ダメージを うけた！`);
            }

            if(this.stats.hp<=0) {
                this.duel.shakeScreen(1,this);
            }else{
                this.duel.shakeScreen(0,this);
            }

            this.takenDamage += dmg;
        }
        
        parallelProgress () {
            this.stats.hpa= this.stats.hp;
            this.stats.tpa= this.stats.tp;


            if(this.stats.hp < 0) {
                this.stats.hp = 0;
            }else if(this.stats.hp > this.stats.mhp) {
                this.stats.hp = this.stats.mhp;
            }

            if(this.stats.tp < 0) {
                this.stats.tp = 0;
            }else if(this.stats.tp > this.stats.mtp) {
                this.stats.tp = this.stats.mtp;
            }

            const a = this.stats.ailments;
            const ailmentSuffix
            = `${a.poisoned ? "どく " : ""}${a.paralysed ? "まひ " : ""}${a.asleep ? "ねむり " : ""}${a.strange ? "へん " : ""}${a.crying ? "なみだとまらない " : ""}${a.silenced ? "PSIふういん" : ""}`;

            this.windowMain.textContent = 
            `${this.stats.charName} - HP:${this.stats.hp} IFF:${this.stats.iff} ${ailmentSuffix}`;
        }

        faint () {
            if(this.customMessages.fainted) {

                this.duel.writeMessage(`${this.customMessages.fainted}`);
            }else{
                this.duel.writeMessage(`${this.stats.charName}はきずつきたおれた…`);

            }
            this.windowMain.remove();

            setTimeout(()=>{
                if(this.actable){
                    this.duel.orders.splice(this.duel.orders.indexOf(this),1);
                }
                this.duel.field.splice(this.duel.field.indexOf(this),1);
                this.duel.seekTurn();
            },1000);
        }
    }

    class LeadChar extends CharBase {
        constructor (duel, initStat){
            super(duel);
            this.setStats(initStat);
            this.actable = 1;
            this.opponent = [];
            this.recognizing = {
                "rule" : ""
            }
            if(this.duel.rules.duelmode==="nomagic"){
                this.recognizing.rule = "nomagic";
            }else if(this.duel.rules.duelmode==="suddendeath"){
                this.recognizing.rule = "suddendeath";
            }

            this.charPos =
            [
                this.windowMain.offsetLeft,
                this.windowMain.offsetTop,
            ];
        }
        
        defineStatusIndi () {
            this.windowMain = document.createElement('div');
            this.windowMain.classList.add('windowMain');
            this.windowMain.classList.add(`window${this.stats.id}`);
            
            this.nameindicator = document.createElement('span');
            this.nameindicator.classList.add('indicator_name');
            this.nameindicator.innerHTML = this.stats.charName;
            this.windowMain.appendChild(this.nameindicator);

            this.hpindicator = new DrumMeter(this.windowMain, this.stats.hpa, "HP");
            this.tpindicator = new DrumMeter(this.windowMain, this.stats.tpa, "TP");

            this.ailmentIndicator = document.createElement('div');
            this.ailmentIndicator.classList.add("ailmentBalloon");
            this.windowMain.appendChild(this.ailmentIndicator);
            
            this.duel.windowContainer.appendChild(this.windowMain);

            this.ailmentJog = 0;
            this.seeking = setInterval(()=>{this.seekAilmentState ();}, 2000);
            this.seekAilmentState ();
            this.reductionLagger = 0;
        }

        adjustCharPos (x, y) {
            this.charPos[0] = x;
            this.charPos[1] = y;
        }

        recognize (name, val) {
            this.recognizing[name] = val;
        }

        forget(name) {
            this.recognizing[name] = "";
        }

        setAction () {
            const lag = this.stats.ailments.strange ? 1000 : 17;
            let targetAlly = this;
            if(this.stats.ailments.strange === 1) {
                if(Math.random()*2 <= 1) {
                    targetAlly = this.duel.field.filter (p => p !== "*" && p.stats.iff !== this.stats.iff)[0];
                    this.opponent = this;
                }
            } else {
                const playerIff = this.stats.iff;
                const opponentCandidate = this.duel.field.filter(p => p !== "*" && p.stats.iff !== playerIff);
                this.opponent = opponentCandidate[Math.floor(Math.random()*opponentCandidate.length)];
            }

            if(this.stats.ailments.strange) {
                this.duel.writeMessage(`${this.stats.charName} は すこしヘンに なっている…`);
            }

            setTimeout(()=>{
                const action = determineMainCharAction(this);
                if(action === "bash") {
                    this.normalBash(this.opponent);
                } else if(action === "defend") {
                    this.defend();
                } else if(action === "lifeup") {
                    this.lifeUp(targetAlly);
                } else if(action === "psimagnet") {
                    this.psiMagnet();
                } else if(action === "hypnosis-alpha") {
                    this.hypnosisAlpha();
                } else {
                    this.duel.writeMessage(`${this.stats.charName} は たちすくんだ！`);
                }
            }, lag);
        }

        normalBash (target) {
            if(!this.stats.ailments.paralysed){
                let damage = calcDamage(this.stats.offense, target.stats.defense);
                const chanceOfMiss = this.stats.ailments.crying ? 1.65 : 16;
                this.duel.writeMessage(`${this.stats.charName} の こうげき！`);

                if(target instanceof LeadChar) {
                    target.recognize('opponentSleeping', 0);
                }

                setTimeout(()=>{
                    if(Math.random()*chanceOfMiss <= 1){
                        this.duel.writeMessage(`The missed!`);
                    }else{
                        /* SMEEEEESH */
                        if(Math.random()*16 <= 1){
                            damage = damage * 3;
                            if(target.stats.shielding.type === "shield" && target.stats.shielding.duration>0){
                                target.stats.shielding.duration = 1;
                            }
                            this.duel.writeBreakdown(`SMEEEEEEEESH!!`);
                            popsmesh(this.duel.duelScreen, target.charPos);
                            this.stats.tp += 4;
                        /* Target is defending */
                        } else if(target.stats.isDefending) {
                            damage = Math.floor(damage * 0.3);
                        } else {
                        /* Other cases, wakes target up when hit */
                            if(Math.random()*1.6 <= 1 && target.stats.ailments.asleep) {
                                this.duel.writeMessage(`${target.stats.charName} は めをさました！`);
                                target.stats.ailments.asleep = 0;
                            }
                            if(Math.random()*1.6 <= 1 && target.stats.ailments.strange) {
                                this.duel.writeMessage(`${target.stats.charName} は もとに もどった！`);
                                target.stats.ailments.strange = 0;
                            }
                        }
                        this.stats.tp++;
                        target.takeDamage(damage, "physical");
                    }
                }, 500);

                setTimeout(() => {
                    this.endTurn();
                }, 1200);
            }else{
                this.paralysing();
            }
        }

        faint () {
            this.windowMain.classList.add("fainted");
            this.stats.hp = 0;
            this.stats.hpa = 0;
            this.stats.tp = 0;
            this.stats.tpa = 0;
            Object.entries(this.stats.ailments).forEach(([key,_]) => {
                this.stats.ailments[key] = 0;
            });
            clearInterval(this.seeking);
            if(this.stats.reviveEnchanted) {
                this.ailmentIndicator.classList.remove("poisoned");
                this.ailmentIndicator.classList.remove("asleep");
                this.ailmentIndicator.classList.remove("paralysed");
                this.ailmentIndicator.classList.remove("crying");
                this.ailmentIndicator.classList.remove("silenced");
                this.ailmentIndicator.classList.remove("strange");
            } else {
                this.ailmentIndicator.classList.remove("expanded");
            }
        }

        invokeRevive () {
            this.duel.writeMessage(`しかし ${this.stats.charName} に かかっていたリヴァイブまほうが ${this.stats.charName} に ちからをくれた！`);
            this.ailmentIndicator.classList.remove("expanded");

            setTimeout(()=>{
                this.duel.writeMessage(`${this.stats.charName} は カムバックした！`);
                this.stats.reviveEnchanted = 0;
                this.stats.hp = this.stats.mhp;
                this.stats.tp = Math.floor(this.stats.mtp * 0.3);
                this.windowMain.classList.remove("fainted");
                this.seeking = setInterval(()=>{this.seekAilmentState ();}, 2000);
            },1000);
            
            setTimeout(()=>{
                this.duel.seekTurn();
            },1800);
        }

        parallelProgress () {
            this.actionTime++;
            this.adjustCharPos (
                this.windowMain.offsetLeft + (this.windowMain.offsetWidth / 2),
                this.windowMain.offsetTop
            );
            this.nameindicator.innerHTML = this.stats.charName;
            this.hpindicator.syncronize(this.stats.hpa);
            this.tpindicator.syncronize(this.stats.tpa);
            
            if(this.stats.hpa < this.stats.hp) {
                this.stats.hpa++;
            } else if(this.stats.hpa > this.stats.hp) {
                if(this.stats.isDefending && this.duel.rules.duelmode !== "nomagic") {
                    this.reductionLagger++;
                    if(this.reductionLagger>=4) {
                        this.stats.hpa--;
                        this.reductionLagger=0;
                    }
                }else{
                    this.stats.hpa--;
                }
            }
            if(this.stats.tpa < this.stats.tp) {
                this.stats.tpa++;
            } else if(this.stats.tpa > this.stats.tp) {
                this.stats.tpa--;
            }

            if(this.duel.rules.duelmode === "poisonrelying"){
                this.stats.hpa = this.stats.hp;
                this.stats.tpa = this.stats.tp;
            }

            if(this.stats.hp < 0) {
                this.stats.hp = 0;
            }else if(this.stats.hp > this.stats.mhp) {
                this.stats.hp = this.stats.mhp;
            }

            if(this.stats.tp < 0) {
                this.stats.tp = 0;
            }else if(this.stats.tp > this.stats.mtp) {
                this.stats.tp = this.stats.mtp;
            }
        }

        seekAilmentState () {
            if(this.ailmentJog===-1) {
                this.ailmentIndicator.classList.remove("poisoned");
                this.ailmentIndicator.classList.remove("asleep");
                this.ailmentIndicator.classList.remove("paralysed");
                this.ailmentIndicator.classList.remove("crying");
                this.ailmentIndicator.classList.remove("silenced");
                this.ailmentIndicator.classList.remove("strange");
                this.ailmentIndicator.classList.remove("revive");
                this.ailmentJog = 0;
            }

            const ailments =
            [
                this.stats.ailments.poisoned,
                this.stats.ailments.asleep,
                this.stats.ailments.paralysed,
                this.stats.ailments.crying,
                this.stats.ailments.silenced,
                this.stats.ailments.strange,
                this.stats.reviveEnchanted,
            ];
            
            if(ailments.join("-") === "0-0-0-0-0-0-0") {
                this.ailmentIndicator.classList.remove('expanded');
            }else {
                this.ailmentIndicator.classList.add('expanded');
            }

            if(this.ailmentJog === 0) {
                if(ailments[0]) {
                    this.ailmentIndicator.classList.add("poisoned");
                } else {
                    this.ailmentIndicator.classList.remove("poisoned");
                    this.ailmentJog++;
                }
            }

            if(this.ailmentJog === 1) {
                if(ailments[1]) {
                    this.ailmentIndicator.classList.add("asleep");
                } else {
                    this.ailmentIndicator.classList.remove("asleep");
                    this.ailmentJog++;
                }
            }

            if(this.ailmentJog === 2) {
                if(ailments[2]) {
                    this.ailmentIndicator.classList.add("paralysed");
                }else {
                    this.ailmentIndicator.classList.remove("paralysed");
                    this.ailmentJog++;
                }
            }

            if(this.ailmentJog === 3) {
                if(ailments[3]) {
                    this.ailmentIndicator.classList.add("crying");
                }else {
                    this.ailmentIndicator.classList.remove("crying");
                    this.ailmentJog++;
                }
            }

            if(this.ailmentJog === 4) {
                if(ailments[4]) {
                    this.ailmentIndicator.classList.add("silenced");
                }else {
                    this.ailmentIndicator.classList.remove("silenced");
                    this.ailmentJog++;
                }
            }

            if(this.ailmentJog === 5) {
                if(ailments[5]) {
                    this.ailmentIndicator.classList.add("strange");
                }else {
                    this.ailmentIndicator.classList.remove("strange");
                    this.ailmentJog++;
                }
            }
            if(this.ailmentJog === 6) {
                if(ailments[6]) {
                    this.ailmentIndicator.classList.add("revive");
                }else {
                    this.ailmentIndicator.classList.remove("revive");
                }
            }
            
            this.ailmentJog++;
            if(this.ailmentJog > ailments.length - 1 && ailments.join("-") !== "0-0-0-0-0-0-0"){
                this.ailmentJog = -1;
                // console.log(ailments.join("-") !== "0-0-0-0-0-0" ? "Continue" : "End");
                // if(ailments.join("-") !== "0-0-0-0-0-0") {
                    // this.seekAilmentState();
                // }
            }
        }
    }

    class Duel {
        constructor (rules) {
            this.rules = rules;
            this.namesakes = {
                narazu: 0,
                starman: 0,
            };

            // ************************
            // Initialize Duel Screen
            // ************************
            this.duelScreen = document.createElement("div");
            this.duelScreen.classList.add("duelScreen");
            if(this.rules.background===-1) {
                this.rules.background = Math.floor(Math.random()*Background.maximumBgs);
            }
            this.duelBg = new Background(this, {bgId: this.rules.background});

            this.messageBox = document.createElement('div');
            this.messageBox.classList.add('messageContainer');
            this.duelScreen.appendChild(this.messageBox);
            
            this.centralCharContainer = document.createElement('div');
            this.centralCharContainer.classList.add('centralCharContainer');
            this.duelScreen.appendChild(this.centralCharContainer);
            this.sides = [
                document.createElement('div'),
                document.createElement('div'),
                document.createElement('div'),
            ];
            for (let i = 0; i < 3; i++) {
                this.sides[i].classList.add("centralCharContainer__side"+i);
                this.centralCharContainer.appendChild(this.sides[i]);
            }

            this.windowContainer = document.createElement('div');
            this.windowContainer.classList.add('windowFlexBox');
            this.duelScreen.appendChild(this.windowContainer);
            document.querySelector("main").appendChild(this.duelScreen);

            // Various Variables
            // ************************
            this.charID = 0;
            this.skipper = 0;
            this.startTime = performance.now();
            this.message = "";
            this.totalMessage = "";
            this.gameFlag = 1;
            this.totalTurn = 0;
            this.hitPointSetting = [];
            this.technicalPointSetting = [];
            this.promisedMessage = [];

            /* Character Settings */
            for(let k = 0; k < 2; k++){
                if(this.rules.duelmode === "suddendeath") {
                    this.hitPointSetting.push(1);
                }else if(this.rules.duelmode === "poisonrelying"){
                    this.hitPointSetting.push(999);
                }else{
                    this.hitPointSetting.push(Math.floor(Math.random()*520) + 350);
                }
        
                if(this.rules.duelmode === "suddendeath" || this.rules.duelmode === "nomagic" || this.rules.duelmode === "poisonrelying") {
                    this.technicalPointSetting.push(0);
                }else{
                    this.technicalPointSetting.push(Math.floor(Math.random()*500) + 250);
                }
            }
            this.field = 
            [
                new LeadChar(this, {
                iff: 0,
                coreName : characterNames[Math.floor(Math.random()*characterNames.length)],
                charName: "",
                mhp: this.hitPointSetting[0],
                hp: 0,
                hpa: 0,
                tp: 0,
                mtp: this.technicalPointSetting[0],
                tpa: 0,
                isDefending: 0,
                offense: Math.floor(Math.random()*115) + 140,
                defense: Math.floor(Math.random()*115) + 140,
                agl: Math.floor(Math.random()*200) + 10,
            }),new LeadChar(this, {
                iff: 1,
                coreName : characterNames[Math.floor(Math.random()*characterNames.length)],
                charName: "",
                mhp: this.hitPointSetting[1],
                hp: 0,
                hpa: 0,
                tp: 0,
                mtp: this.technicalPointSetting[1],
                tpa: 0,
                isDefending: 0,
                offense: Math.floor(Math.random()*115) + 140,
                defense: Math.floor(Math.random()*115) + 140,
                agl: Math.floor(Math.random()*200) + 10,
            }),
            ];

            if(document.querySelector('.noOfNarazu').value>=1) {
                for( let i = 0; i< parseInt(document.querySelector('.noOfNarazu').value); i ++){
                    this.field.push(new CharBase(this, 
                        {
                            coreName: "narazu",
                            iff: Math.floor(Math.random()*4),
                            agl: Math.floor(Math.random()*30) + 30,
                            offense: Math.random()* 32 <= 1 ?
                            65536
                            : Math.floor(Math.random()*40) + 80,
                            defense: 36,
                            mhp: Math.floor(Math.random()*440) + 60,
                            mtp: 0,
                        }));
                    this.field[this.field.length-1].actable = 1;
                }
            }

            if(document.querySelector('.noOfStarman').value >= 1) {
                for( let i = 0; i< parseInt(document.querySelector('.noOfStarman').value); i ++){
                    this.field.push(new CharBase(this, {
                        coreName: "starman",
                        iff: Math.floor(Math.random()*4),
                        mhp: Math.floor(Math.random()*200) + 500,
                        agl: Math.floor(Math.random()*40) + 80,
                        mtp: 1000
                    }));
                    this.field[this.field.length-1].actable = 1;
                }
            }
            

            this.orders = [];
            this.charA = this.field[0];
            this.charB = this.field[1];
            this.charA.opponent = this.charB;
            this.charB.opponent = this.charA;
            if(this.charA.stats.coreName === this.charB.stats.coreName){
                this.charA.stats.charName =  this.charA.stats.coreName + "A";
                this.charB.stats.charName = this.charB.stats.coreName + "B";
            }else {
                this.charA.stats.charName = this.charA.stats.coreName;
                this.charB.stats.charName = this.charB.stats.coreName;
            }
            
            /* Duel Title and menus */
            this.duelTitle = `${this.charA.stats.charName} VS ${this.charB.stats.charName}`;
            this.writeBreakdown(`ルール：${this.rules.japanname}`);
            this.writeMessage("The engage!");

            this.duelMenuHp = 0;
            this.composeMenu();

            this.parallelProgress();
        }

        composeMenu () {
            this.duelMenuHp = 30;
            this.duelMenu = document.createElement('div');
            this.duelMenu.classList.add('duelMenu');
            this.duelMenu.innerHTML = `<span class="duelTitle">${this.duelTitle}</span>`;

            const a = function () {
                if(document.querySelector('.duelPippingIndicator')) {
                    document.querySelector('.duelPippingIndicator').remove();
                }
                if(!this.duelScreen.classList.contains('pseudoPipper')) {
                    this.popOut();
                } else {
                    this.duelScreen.classList.remove("pseudoPipper");
                    
                    window.scrollTo({
                        top: this.duelScreen.offsetTop,
                        behavior: "smooth"
                    });
                }
            }

            const d = function () {
                if(this.gameFlag) {
                    this.terminatedOnHalfway = true;
                    this.terminate();
                }
            }
            
            const hamburgerer = document.createElement("div");
            hamburgerer.classList.add("duelMenuExpander");
            hamburgerer.innerHTML = "&#9776;";
            this.duelMenu.appendChild(hamburgerer);
            
            hamburgerer.addEventListener('click',e=>{
                toggleMenuDialog(0, e.clientX, e.clientY, [["ピップする",a.bind(this)],["デュエルを ちゅうしする",d.bind(this)]]);
            });

            this.duelScreen.appendChild(this.duelMenu);

            this.duelScreen.addEventListener('mousemove', ()=>{
                this.duelMenuHp = 30;
                this.duelMenu.classList.add("expanded");
            });
            this.duelScreen.addEventListener('click', ()=>{
                this.duelMenuHp = 30;
                this.duelMenu.classList.add("expanded");
            });

            setInterval(()=>{
                this.duelMenuHp--;
                if(this.duelMenuHp <= 0) {
                    this.duelMenu.classList.remove("expanded");
                }
            }, 100);
        }

        newDetermineOrder () {
            try {
                const newOrder = [];
                const a = this.field.filter(char => char !== "*" && char.actable);
    
                a.forEach(v=>{
                    v.stats.tempAgl = v.stats.agl + Math.floor(Math.random()*15) - 7;
                    v.stats.tempAgl = v.stats.tempAgl < 1 ? 1 : v.stats.tempAgl;
                });
                for(let agl = 999; agl > 0; agl --){
                    a.forEach(char=>{
                        if(char.stats.tempAgl === agl){
                            newOrder.push(char);
                        }
                    });
                }
                this.orders = newOrder;
            } catch (err){
                console.log("おやおや、どっかもんだいがあるみたいだよ？！ メッセージ:" + err.message);
            }

        }

        seekTurn () {
            let othersFainted = 0;
            if(this.charB.stats.hpa<=0 && this.charA.stats.hpa<=0) {
                othersFainted = 1;
                this.charA.faint();
                this.charB.faint();
                if(!this.charB.stats.reviveEnchanted && !this.charA.stats.reviveEnchanted){
                    this.terminate();
                }else if(this.charA.stats.reviveEnchanted) {
                othersFainted = 1;
                    this.writeMessage(`${this.charA.stats.charName} は きずつきたおれた…`);
                    this.charA.invokeRevive();
                }else if(this.charB.stats.reviveEnchanted) {
                othersFainted = 1;
                    this.writeMessage(`${this.charB.stats.charName} は きずつきたおれた…`);
                    this.charB.invokeRevive();
                }
            }else if(this.charB.stats.hpa <= 0 ){
                othersFainted = 1;
                this.charB.faint();
                if(this.charB.stats.reviveEnchanted === 0){
                    this.terminate();
                }else{
                    this.writeMessage(`${this.charB.stats.charName} は きずつきたおれた…`);
                    setTimeout(()=>{
                        this.charB.invokeRevive();
                    }, 1000);
                }
            }else if (this.charA.stats.hpa <= 0 ){
                othersFainted = 1;
                this.charA.faint();
                if(this.charA.stats.reviveEnchanted === 0){
                    this.terminate();
                }else{
                    this.writeMessage(`${this.charA.stats.charName} は きずつきたおれた…`);
                    setTimeout(()=>{
                        this.charA.invokeRevive();
                    }, 1000);
                }
            }else{
                if(this.orders.length <= 0 && this.gameFlag) {
                    this.totalTurn ++;
                    this.writeBreakdown(` ********** Turn ${this.totalTurn} **********`);
                    this.newDetermineOrder();
                }
            }

            
            if(
                othersFainted === 0 
                &&
                this.charB.stats.hpa>0 
                &&
                this.charA.stats.hpa>0
            ){
                const j = this.field.filter(f => !(f instanceof LeadChar));
                j.forEach(k => { 
                    if(k.stats.hpa <= 0 && othersFainted === 0) {
                        othersFainted=1;
                        k.faint();
                    }
                });
            }
            
            if(
                othersFainted === 0 
                &&
                this.orders.length >= 1
                &&
                this.charB.stats.hpa>0 
                &&
                this.charA.stats.hpa>0
            ){
                if(this.orders[0].actable){
                    this.orders[0].initAction();
                    this.orders.shift();
                }else{
                    this.orders.shift();
                    this.seekTurn();
                }
            }
        }

        writeMessage(msg) {
            this.messageBox.innerHTML = msg;
            this.writeBreakdown(msg);
        }

        writeBreakdown(msg) {
            this.totalMessage += msg + "\n";
        }

        parallelProgress () {
            if(this.gameFlag === 1){
                this.skipper++;
                if(this.skipper > maximumSkip) {
                    // this.charA.parallelProgress();
                    // this.charB.parallelProgress();
                    this.field.forEach(f=>f.parallelProgress());
                    this.skipper = 0;
                }
                window.requestAnimationFrame(this.parallelProgress.bind(this));
            }
        }

        shakeScreen (type, target) {
            this.duelScreen.classList.remove("damageShakeNormal");
            this.duelScreen.classList.remove("damageShakeCritical");
            if(type===1) {
                this.writeMessage(`${target.stats.charName} はちめいてきなダメージをうけた！`);
            }
            window.requestAnimationFrame(
                ()=>{
                    if(type===0) {
                        this.duelScreen.classList.add("damageShakeNormal");
                    }
                    if(type===1) {
                        this.duelScreen.classList.add("damageShakeCritical");
                    }
                }
            );
        }

        terminate () {
            const endTime = performance.now() - this.startTime;
            this.gameFlag=0;
            this.orders = [];
            if(this.charB.stats.hpa === 0 && this.charA.stats.hpa === 0) {
                this.charB.stats.hp = 0;
                this.charA.stats.hp = 0;
                this.charB.stats.hpa = 0;
                this.charA.stats.hpa = 0;
                this.writeMessage(`りょうしゃとも きずつきたおれた…`);
                this.writeBreakdown("---------------------");
                this.writeBreakdown(`Draw!`);
                duelOutcomeNotify(`${this.duelTitle} - ひきわけに なった！`, [this.duelScreen.offsetTop,this.duelScreen.offsetTop + this.duelScreen.offsetHeight], this.duelScreen.classList.contains('pseudoPipper'));
            } else if(this.charB.stats.hpa <= 0){
                this.writeMessage(`${this.charB.stats.charName} は きずつきたおれた…`);
                this.writeBreakdown("---------------------");
                this.writeBreakdown(`${this.charA.stats.charName} Wins!`);
                duelOutcomeNotify(`${this.duelTitle} - ${this.charA.stats.charName} のしょうり！`, [this.duelScreen.offsetTop,this.duelScreen.offsetTop + this.duelScreen.offsetHeight], this.duelScreen.classList.contains('pseudoPipper'));
            }else if(this.charA.stats.hpa <= 0){
                this.writeMessage(`${this.charA.stats.charName} は きずつきたおれた…`);
                this.writeBreakdown("---------------------");
                this.writeBreakdown(`${this.charB.stats.charName} Wins!`);
                duelOutcomeNotify(`${this.duelTitle} - ${this.charB.stats.charName} のしょうり！`, [this.duelScreen.offsetTop,this.duelScreen.offsetTop + this.duelScreen.offsetHeight], this.duelScreen.classList.contains('pseudoPipper'));
            } else {
                this.writeMessage(`しあいは ちゅうしされた！`);
                this.writeBreakdown("---------------------");
                this.writeBreakdown(`Draw!`);
                duelOutcomeNotify(`${this.duelTitle} - けっちゃくは つかなかった！`, [this.duelScreen.offsetTop,this.duelScreen.offsetTop + this.duelScreen.offsetHeight], this.duelScreen.classList.contains('pseudoPipper'));
            }
            this.charA.parallelProgress();
            this.charB.parallelProgress();
            this.writeBreakdown(`せんとうじかん : ${Math.floor(endTime / 1000 / 60)} ふん ${Math.floor(endTime / 1000 % 60)} びょう`);
            this.writeBreakdown(
                `${this.charA.stats.charName} が うけた ダメージ : ${this.charA.takenDamage}`
            );
            this.writeBreakdown(
                `${this.charB.stats.charName} が うけた ダメージ : ${this.charB.takenDamage}`
            );

            const showBrkdwnBtn = document.createElement('div');
            showBrkdwnBtn.textContent = "うちわけを ひょうじする";
            showBrkdwnBtn.classList.add("showBreakdownBtn");
            this.duelScreen.appendChild(showBrkdwnBtn);
            const closeDuelBtn = document.createElement('div');
            closeDuelBtn.textContent = "デュエルを とじる";
            closeDuelBtn.classList.add("closeDuelBtn");
            this.duelScreen.appendChild(closeDuelBtn);

            const brkdwnTitle = document.querySelector('.overlayingBreakdownContainer__main h2');
            const brkdwnContainer = document.querySelector('.overlayingBreakdownContainer__main p');
            showBrkdwnBtn.addEventListener('click', ()=>{
                brkdwnTitle.textContent = this.duelTitle;
                brkdwnContainer.innerHTML = String(this.totalMessage).replace(/\n/g, "<br>");
                document.querySelector('.overlayingBreakdownContainer').classList.add('expanded');
            });

            closeDuelBtn.addEventListener('click', ()=>{
                this.exitDuel();
            })
        }

        popOut () {
            document.querySelectorAll(".pseudoPipper").forEach((el)=>{
                el.classList.remove("pseudoPipper");
            });
            const pippingIndi = document.createElement('div');
            pippingIndi.innerHTML = "いま このデュエルは ピップしてあるよ";
            pippingIndi.classList.add('duelPippingIndicator');
            document.querySelector('main').insertBefore(pippingIndi, this.duelScreen);
            this.duelScreen.classList.add('pseudoPipper');
        }

        exitDuel () {
            if(this.gameFlag === 1){
                this.terminate();
            }

            if(this.duelScreen.classList.contains("pseudoPipper")) {
                document.querySelector('.duelPippingIndicator').remove();
            }
            this.duelScreen.classList.add('animating_shrinkingOut');

            setTimeout(()=>{
                duelMain.splice(duelMain.indexOf(this), 1);
                this.duelScreen.remove();
            },1000)

        }
    }
    
    /* Action Determination */
    function determineMainCharAction (origin) {
        const opinions = [];
        const player = origin.stats;

        if(Math.random()*200 <= 1){
            origin.forget("rule");
        }

        let action;
        for(let i = 0; i<10; i++){
            action = "bash";

            // Hypnosis
            const hypnoticIntention 
            = player.tp <= 39 ? 10 : 4;
            if(
                Math.random()*hypnoticIntention <= 1 &&
                player.tp >= spellBook["hypnosis-alpha"].cost && 
                !origin.recognizing.opponentSleeping &&
                !player.ailments.silenced &&
                origin.recognizing.rule !== "nomagic"
            ) {
                action = "hypnosis-alpha";
            }

            // Defend
            if(Math.random()*10<=1) {
                action = "defend"
            }
            
            // PSI Magnet
            if(
                Math.random()*5 <= 1 &&
                player.tp < (player.mtp * 0.3) &&
                !player.ailments.silenced &&
                origin.recognizing.rule !== "nomagic"
            ) {
                action = "psimagnet";
            }

            // Lifeup
            if(
                player.tp >= spellBook.lifeup.cost && 
                player.hp < (player.mhp * 0.7) &&
                !player.ailments.silenced &&
                origin.recognizing.rule !== "nomagic"
            ) {
                if(player.hpa <= (player.mhp * 0.7) && Math.random()*6 <= 1) {
                    action = "lifeup";
                }
                if(player.hpa <= (player.mhp * 0.4) && Math.random()*3 <= 1) {
                    action = "lifeup";
                }

                if(player.hpa <= Math.floor(Math.random()*40) + 100) {
                    action = "lifeup";
                }
            }
            
            // SuddenDeath
            if(origin.recognizing.rule === "suddendeath") {
                action = "bash";
            }

            opinions.push(action);
        }

        // console.log(opinions.join("-"));

        const finalDecision = opinions[Math.floor(Math.random()*opinions.length)];
        return finalDecision;
    }

    /* Pop Damage */
    function popDamage(dmg, type, duelScreen, target, byGimic = false) {
        const dmgInd = document.createElement("div");
        dmgInd.textContent = dmg;
        dmgInd.classList.add('damage-indicator');
        if(type === "damage") {
            dmgInd.style.color =  byGimic ? "orange" : "red";
        }else if(type === "heal") {
            dmgInd.style.color = "green";
        }

        dmgInd.style.left = target[0]+"px";
        dmgInd.style.top = byGimic ?  target[1] - 35 +"px" : target[1]+"px";
        duelScreen.appendChild(dmgInd);
        setTimeout(()=>{dmgInd.remove();}, 1000);
    }

    /* Pop Smeeesh */
    function popsmesh(duelScreen, target) {
        flashScreen("#FFFFFF", duelScreen);
        const smesh = document.createElement("div");
        smesh.textContent = "SMEEEEEEESH!!";
        smesh.classList.add('damage-smesh');
        smesh.style.left = target[0]+"px";
        smesh.style.top = target[1] - 30 +"px";
        duelScreen.appendChild(smesh);
        setTimeout(()=>{smesh.remove();}, 1000);
    }

    /* Flash Screen */
    function flashScreen(color, duelScreen) {
        const flasher = document.createElement("div");
        flasher.classList.add('duelScreenFlashing');
        flasher.style.backgroundColor = color;
        duelScreen.appendChild(flasher);
        setTimeout(()=>{flasher.remove();}, 1000);
    }

    function duelOutcomeNotify (msg, duelScreenPosition, isPipped = 0) {
        const vport = [window.scrollY, window.scrollY + window.innerHeight];
        if(
            vport[0] < duelScreenPosition[0]
            &&
            vport[1] > duelScreenPosition[1]
        ) {
            // console.log("表示しません");
        }else{
            if(!isPipped)
            {
                const popup = document.createElement('div');
                popup.classList.add('duelOutcomePopup');
                popup.textContent = msg;
                popup.addEventListener('click', ()=>{
                    window.scrollTo({
                        top: duelScreenPosition[0],
                        behavior: 'smooth'
                    });
                    popup.classList.remove("expanded");
                });
                document.querySelector('main').appendChild(popup);
                if(
                vport[0] < duelScreenPosition[0]
                ) {
                    popup.classList.add('onBottom');
                }
                setTimeout(()=>{
                    popup.classList.add('expanded');
                },17);
                setTimeout(()=>{
                    popup.classList.remove('expanded');
                }, 4700);
                setTimeout(()=>{
                    popup.remove();
                }, 5000);
            }
        }
    }

    const characterNames = [
        "そう",
        "かあさん",
        "しゅん",
        "メイプル",
        "せんし",
        "Dさん",
        "いぶりがっこくん",
        "ネッス",
        "しのだ",
        "きし",
        "ラルフ",
    ];

    /* Spell Book */
    const spellBook = {
        "lifeup" : {
            "title" : "ライフアップ",
            "cost": 24,
            "desc": "ヒットポイントをぜんかいふくする",
            "func": function (caster, target, duel) {
                target.stats.hp = target.stats.mhp;
                popDamage(target.stats.mhp, "heal", duel.duelScreen, target.charPos);

                setTimeout(()=>{caster.endTurn()}, 1000);
            }
        },
        "psiMagnet" : {
            "title" : "サイマグネット",
            "cost" : 0,
            "desc" : "あいてから TPをうばう",
            "func" : function (caster, target, duel) {
                let drainValue = Math.floor(Math.random()*10) + 1;
                if(target.stats.tp < drainValue) {
                    drainValue = target.stats.tp;
                }
                if(drainValue>0){
                    duel.writeMessage(`${target.stats.charName}のTPを ${drainValue} ポイント すいとった！`);
                }else{
                    duel.writeMessage(`${target.stats.charName} は TPをもっていなかった！`);
                }
                target.stats.tp -= drainValue;
                caster.stats.tp += drainValue;
                
                setTimeout(()=>{caster.endTurn()}, 1000);
            }
        },
        "hypnosis-alpha" : {
            "title" : "さいみんじゅつα",
            "cost" : 10,
            "desc" : "あいてひとりを ねむらせる",
            "func" : function (caster, target, duel) {
                const chance = 1.66 + 2 * (target.stats.hp / target.stats.mhp);
                const dicing = Math.random()*chance;
                if(dicing <= 1 && target.stats.ailments.asleep === 0) {
                    target.stats.ailments.crying = 0;
                    target.stats.ailments.asleep = 1;
                    duel.writeMessage(`${target.stats.charName} は ねむってしまった！`);
                    caster.recognize("opponentSleeping", 1);
                } else {
                    duel.writeMessage(`${target.stats.charName} には こうかがなかった！`);
                }
                
                setTimeout(()=>{caster.endTurn()}, 1000);
            }
        },
        "revive" : {
            "title" : "リヴァイブ",
            "cost" : 80,
            "desc" : "リヴァイブのじゅもんをじぶんにふよする",
            "func" : function (caster, target, duel) {
                if(Math.random()*4 <= 3) {
                    caster.stats.reviveEnchanted=1;
                    duel.writeMessage(`${caster.stats.charName}にリヴァイブのまほうがかかった！`);
                } else {
                    duel.writeMessage(` * しっぱい！ * `);
                }

                setTimeout(()=>{caster.endTurn()}, 1000);
            }
        },
        "psi-starstorm-alpha" : {
            "title" : "PKスターストームα",
            "cost" : 36,
            "desc" : "ほしをおとし　てきぜんいんに　ダメージ",
            "func" : function (caster, target, duel) {
                let lag = 1000;
                console.log(target);
                try {
                    const enemyList = target === caster ? duel.field.filter(enemy => enemy.stats.iff === caster.stats.iff) : duel.field.filter(enemy => enemy.stats.iff !== caster.stats.iff);
                    
                    if(enemyList.length >= 1) {
                        lag = 517 + (300 * enemyList.length);
                        for(let i = 0; i < enemyList.length; i++) {
                            setTimeout(()=>{
                                let dmg = Math.floor(Math.random()*300) + 200;
                                enemyList[i].takeDamage(dmg, "psi", false);
                            }, (17 + (300 * i))
                            );
                        }
                    }
                } catch (err) {
                    duel.writeMessage(`じゅもんは　ふはつにおわった！`);
                    duel.writeBreakdown(`げんいん : ${err.message}`);
                }
                setTimeout(()=>{caster.endTurn()}, lag);
            }
        },
    };

    const otherCharAction = {
        starman : function (myself, duel) {
            if(Math.random () * 3 >= 1 || duel.totalTurn <= 1) {
                myself.psiTrial(myself.opponent, spellBook["psi-starstorm-alpha"], 0);
            } else {
                const i = !myself.stats.ailments.strange ? duel.field.filter(e => e.stats.hp>0) : duel.field.filter(e=> e.stats.iff === myself.stats.iff);
            
                myself.lifeUp(i[Math.floor(Math.random()*i.length)]);
            }
        },
        narazu : function (myself, duel) {
            const targetCandidates = [];
            targetCandidates.push(...duel.field.filter(v=>v.stats.iff !== myself.stats.iff));

            if(myself.stats.ailments.strange) {
                targetCandidates.push(...duel.field.filter(v=>v.stats.id >= 3));
            }
            const target = targetCandidates[Math.floor(Math.random()*targetCandidates.length)];
            duel.writeMessage(`${myself.stats.charName}は ${target.stats.charName} を ひっぱたいた！`);

            setTimeout(()=>{
                let damage = calcDamage(myself.stats.offense, target.stats.defense);
                const chanceOfMiss = myself.stats.ailments.crying ? 1.65 : 16;

                if(target instanceof LeadChar) {
                    target.recognize('opponentSleeping', 0);
                }

                if(Math.random()*chanceOfMiss <= 1){
                    duel.writeMessage(`The missed!`);
                }else{
                    /* SMEEEEESH */
                    if(Math.random()*16 <= 1){
                        damage = damage * 3;
                        if(target.stats.shielding.type === "shield" && target.stats.shielding.duration>0){
                            target.stats.shielding.duration = 1;
                        }
                        duel.writeBreakdown(`SMEEEEEEEESH!!`);
                        popsmesh(duel.duelScreen, target.charPos);
                        myself.stats.tp += 4;
                    /* Target is defending */
                    } else if(target.stats.isDefending) {
                        damage = Math.floor(damage * 0.3);
                    } else {
                    /* Other cases, wakes target up when hit */
                        if(Math.random()*1.6 <= 1 && target.stats.ailments.asleep) {
                            duel.writeMessage(`${target.stats.charName} は めをさました！`);
                            target.stats.ailments.asleep = 0;
                        }
                        if(Math.random()*1.6 <= 1 && target.stats.ailments.strange) {
                            duel.writeMessage(`${target.stats.charName} は もとに もどった！`);
                            target.stats.ailments.strange = 0;
                        }
                    }
                    target.takeDamage(damage, "physical");
                }
            }, 700);

            setTimeout(()=>{
                myself.endTurn();
            }, 1700);
        }
    };
    
    const duelMain = [];

    /* Back Ground Settings */
    const bgSwitcher = document.querySelector('.bgSwitcher_input');
    bgSwitcher.addEventListener('change', ()=>{
        const bgNo = parseInt(bgSwitcher.value);
        if(bgNo === -1) {
            document.querySelector('.bgLabel').textContent = "ランダム"
        }
        if(bgNo === 0) {
            document.querySelector('.bgLabel').textContent = "オーソドックス"
        }
        if(bgNo === 1) {
            document.querySelector('.bgLabel').textContent = "らくらい"
        }

        if(bgNo >= Background.maximumBgs || bgNo <= -2) {
            bgSwitcher.value = -1;
            document.querySelector('.bgLabel').textContent = "ランダム";
        }
    });

    function setBg (bgNo) {
        if(typeof bgNo === "string" && parseInt(bgNo) <= Background.maximumBgs - 1 && parseInt(bgNo) >= -1) {
            return parseInt(bgNo);
        } else {
            return -1;
        }
    }

    /* Left-side Menu */
    document.querySelector('.starterAndMenu__spMenu').addEventListener('click', ()=>{
        document.querySelector('.wrapperLeft').classList.add('expanded');
    });

    document.querySelector('.wrapperLeftClose').addEventListener('click', ()=>{
        document.querySelector('.wrapperLeft').classList.remove('expanded');
    });
    
    document.querySelector('.showDuellingList').addEventListener('click', ()=>{
        document.querySelector('.wrapperLeft').classList.remove('expanded');
        document.querySelector('.duellingList').classList.add('expanded');
        acquireDuels();
    });
    
    /* Chkbox Settings */
    document.querySelector('.bgAnimationDisabler').addEventListener("change", chk=>{
        if(chk.target.checked) {
                document.querySelector('main').classList.add('noBgAnimation');
        } else {
            document.querySelector('main').classList.remove('noBgAnimation');
        }
    });
    document.querySelector('.framePerSecondShower').addEventListener("change", chk=>{
        if(chk.target.checked) {
            document.querySelector('.textFramer').classList.add('expanded');
        } else {
            document.querySelector('.textFramer').classList.remove('expanded');
        }
    });

    /* Duel starters */
    document.querySelector('.normalDuelBtn').addEventListener('click', ()=>{
        const a = new Duel({duelmode: "normal", japanname: "ふつうのデュエル", background : setBg(bgSwitcher.value)});
        duelMain.push(a);
        setTimeout(()=>{a.seekTurn();}, 1000);
    });

    document.querySelector('.noMagDuelBtn').addEventListener('click', ()=>{
        const a = new Duel({duelmode : "nomagic", japanname: "PSIなしデュエル", background : setBg(bgSwitcher.value)});
        duelMain.push(a);
        setTimeout(()=>{a.seekTurn();}, 1000);
    });

    document.querySelector('.withReviveBtn').addEventListener('click', ()=>{
        const a = new Duel({duelmode : "withrevive", japanname: "リヴァイブつき", background : setBg(bgSwitcher.value)});
        duelMain.push(a);
        setTimeout(()=>{a.seekTurn();}, 1000);
    });

    document.querySelector('.suddenDeath').addEventListener('click', ()=>{
        const a = new Duel({duelmode : "suddendeath", japanname: "サドンデス", background : setBg(bgSwitcher.value)});
        duelMain.push(a);
        setTimeout(()=>{a.seekTurn();}, 1000);
    });

    document.querySelector('.poisonRelying').addEventListener('click', ()=>{
        const a = new Duel({duelmode : "poisonrelying", japanname: "どくまかせ！？", background : setBg(bgSwitcher.value)});
        duelMain.push(a);
        setTimeout(()=>{a.seekTurn();}, 1000);
    });


    // Frame-skip settings
    let fps = 0;
    let maximumSkip = 0;
    const f = function(){
       fps++;
       requestAnimationFrame(f);
    }
    requestAnimationFrame(f);
    let k = setInterval(()=>{
        const skipSetting = Math.ceil(fps / 10);
        maximumSkip = skipSetting;
        document.querySelector('.textFramer').textContent = (`${fps * 2} fps / スキップするべきフレーム ${skipSetting}`);
        fps=0;
    },500);

    // Overlay closer
    document.querySelectorAll('.overlayCloser').forEach(x=>{
        x.addEventListener('click', e=>{
            e.preventDefault();
            document.querySelectorAll('.overlay').forEach(f=>f.classList.remove('expanded'));
        });
    });

    document.querySelector('.duellingList__purger').addEventListener("click", e => {
        e.preventDefault();

        if(document.querySelector('.duellingList').classList.contains('expanded')) {
            const k = duelMain.filter(duel => duel.gameFlag !== 1);
            k.forEach(l => l.exitDuel());
        }
    });

    // Duel list Maker
    function acquireDuels () {
        const list = document.querySelector('.duellingListContainer');
        if(duelMain.length <= 0) {
            list.innerHTML = "まだ デュエルが かいさいされてないようです";
        } else {
            list.innerHTML = "";
            duelMain.forEach(duel => {
                const p = document.createElement('p');
                const progress = document.createElement('span');

                if(duel.gameFlag) {
                    progress.innerHTML = `<span class="duellingListCurrentProgress__ongoing">デュエルちゅう</span>`;
                }else{
                    if(duel.terminatedOnHalfway) {

                        progress.innerHTML = `<span class="duellingListCurrentProgress__cancelled">しあいちゅうし</span>`;
                    }else{

                        progress.innerHTML = `<span class="duellingListCurrentProgress__end">しゅうりょう</span>`;
                    }
                }
                p.appendChild(progress);

                const charA = document.createElement("span");
                const charB = document.createElement("span");
                charA.innerHTML = `${duel.charA.stats.charName}`;
                charB.innerHTML = `${duel.charB.stats.charName}`;

               
                if(!duel.gameFlag) {
                    if(duel.charA.stats.hpa <= 0 || duel.charB.stats.hpa <= 0)
                    {
                        
                        if(duel.charA.stats.hpa <= 0) {
                            charA.classList.add('loser');
                        } else {
                            charA.classList.add('winner');
                        }
                        
                        if(duel.charB.stats.hpa <= 0) {
                            charB.classList.add('loser');
                        }else{
                            charB.classList.add('winner');
                        }
                    }
                }

               p.appendChild(charA);
               p.innerHTML += " VS ";
               p.appendChild(charB);

               p.addEventListener('click', () => {
                window.scrollTo(0, duel.duelScreen.offsetTop);
                document.querySelectorAll('.overlay').forEach(f=>f.classList.remove('expanded'));
               });

               list.appendChild(p);
            });
        }

        if(document.querySelector('.duellingList').classList.contains('expanded')) {
            setTimeout(acquireDuels,2000);
        }
    }

    
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
        if(
            !e.target.classList.contains("popup_menu") &&
            !e.target.classList.contains("duelMenuExpander") 
        ) {
            document.querySelector('.popup_menu').classList.remove("expanded");
        }
    });

    const url = String(window.location.href).slice(0,4);
    if(url !== "http") {
        duelOutcomeNotify("これは ほんばんかんきょう じゃないよ！", [99999, 100000], 0);
    }

    function calcDamage (o, d) {
        let off = o;
        let def = d;

        console.log("Attacker Off : " + off +  "    Defender Def : " + def);

        
        let minimum =  (off * 1.13) - (def * 0.77);
        let maximum = (off - (def * 0.37)) + minimum;

        let dmg = Math.floor((Math.random() * (maximum - minimum) ) + minimum);
        
        console.log(`${minimum} ～ ${maximum}`);

        // console.log(`Math.floor(Math.random() * ${maximum - minimum} ) + ${minimum})`);
        
        if(dmg<1){dmg=1;}
        
        return dmg;
    }
}