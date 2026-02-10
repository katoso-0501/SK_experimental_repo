"use strict";
{ 
    class CharBase {
        constructor (duel) {
            this.duel = duel;
            this.actable = 0;
            this.actionTime = 0;
            this.charPos = [0,0];
            this.takenDamage = 0;
            this.stats =
            {
                id: 0,
                iff: 999,
                charName: "Dummy",
                mhp: 100,
                hp: 100,
                mtp: 100,
                tp: 100,
                offense: 100,
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
                },
                shielding: {type:"", duration: 0},
                reviveEnchanted: this.duel.rules.duelmode === "withrevive" ? 1 : 0,
                parameterAlteration: {
                    offense : 0,
                    defense : 0,
                },
            }
        }

        setStats (stats) {
            Object.entries(stats).forEach(n =>{this.stats[n[0]] = n[1];});
            this.stats.hp = this.stats.mhp;
            this.stats.hpa = this.stats.mhp;
            this.stats.tp = this.stats.mtp;
            this.stats.tpa = this.stats.mtp;
        }
        
        initAction () {
            this.actionTime = 0;
            this.stats.isDefending = 0;
            this.windowMain.classList.add("acting");
            if(this.stats.ailments.poisoned) {
                this.poisonDamage();
            } else if(this.stats.ailments.asleep) {
                this.asleep();
            } else {
                this.setAction();
            }
        }

        asleep () {
            this.duel.writeMessage(`${this.stats.charName} は ねむっている…`);

            if(Math.random()*4 <= 1 && this.duel.rules.duelmode !== "poisonrelying") {
                setTimeout(()=>{
                    this.stats.ailments.asleep=0;
                    this.duel.writeMessage(`${this.stats.charName} は めをさました！`);
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

        poisonDamage () {
            this.stats.hp -= Math.floor(Math.random()*50) + 50;
            this.duel.writeMessage(`${this.stats.charName} は どくで ${Math.floor(Math.random()*50) + 50} の ダメージ！`);
            setTimeout(()=>{
                 if(this.stats.ailments.asleep) {
                    this.asleep();
                }else{
                    this.setAction();
                }
            },1000);
        }
        
        setAction () {
            this.duel.writeMessage('わたしもいつかこうどうできるようになってみたい。');
            setTimeout(()=>{
                this.endTurn();
            }, 2000);
        }

        endTurn () {
            if(Math.random()*30 <= 1 && this.stats.ailments.poisoned && this.duel.rules.duelmode !== "poisonrelying"){
                this.stats.ailments.poisoned=0;
                this.duel.promisedMessage.push(`${this.stats.charName} のからだから どくがきえた！`);
            }
            let to = 17;
            if(this.duel.promisedMessage.length>0){
                this.duel.promisedMessage.forEach(m => {
                    this.duel.writeMessage(m);
                });
                to = 1000 * this.duel.promisedMessage.length;
            }
            this.duel.promisedMessage = [];
            this.windowMain.classList.remove("acting");
            setTimeout(()=>{
                this.duel.seekTurn();
            },to);
        }

        takeDamage(dmg, type) {
            if(type==="physical"){
                if(
                this.stats.shielding.type==="shield"
                &&
                this.stats.shielding.duration>0){
                    dmg = Math.ceil(dmg / 2);
                    this.stats.hp -= dmg;
                    this.stats.shielding.duration--;
                    if(this.stats.shielding.duration<=0){
                        this.duel.writeMessage(`${this.stats.charName}のシールドはきえてなくなった！`);
                    }
                }else{
                    this.stats.hp -= dmg;
                }
                this.duel.writeBreakdown(`${dmg} ダメージ`);
                popDamage(dmg, "damage", this.duel.duelScreen, this.charPos);
                
                if(Math.random()*1.6 <= 1 && this.stats.ailments.asleep) {
                    this.duel.writeMessage(`${this.stats.charName} は めをさました！`);
                    this.stats.ailments.asleep = 0;
                }

            }else if(type==="psi"){
                this.stats.hp -= dmg;
                this.duel.writeBreakdown(`${dmg} ダメージ`);
                popDamage(dmg, "damage", this.duel.duelScreen, this.charPos);
            }

            if(this.stats.hp<=0) {
                this.duel.shakeScreen(1,this);
            }else{
                this.duel.shakeScreen(0,this);
            }

            this.takenDamage += dmg;
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

            this.windowMain = document.createElement('div');
            this.windowMain.classList.add('windowMain');
            this.windowMain.classList.add(`window${this.stats.id}`);
            
            this.nameindicator = document.createElement('span');
            this.nameindicator.classList.add('indicator_name');
            this.nameindicator.innerHTML = this.stats.charName;
            this.windowMain.appendChild(this.nameindicator);

            this.hpindicator = document.createElement('p');
            this.hpindicator.classList.add('indicator_hp');
            this.hpindicator.innerHTML = "HP <span>"+this.stats.hpa+"</span>";
            this.windowMain.appendChild(this.hpindicator);

            this.tpindicator = document.createElement('p');
            this.tpindicator.classList.add('indicator_tp');
            this.tpindicator.innerHTML = "TP <span>"+this.stats.tpa+"</span>";
            this.windowMain.appendChild(this.tpindicator);

            this.ailmentIndicator = document.createElement('div');
            this.ailmentIndicator.classList.add("ailmentBalloon");
            this.windowMain.appendChild(this.ailmentIndicator);
            
            this.duel.windowContainer.appendChild(this.windowMain);

            this.ailmentJog = 0;
            this.seeking = setInterval(()=>{this.seekAilmentState ();}, 2000);
            this.seekAilmentState ();

            this.charPos =
            [
                this.windowMain.offsetLeft,
                this.windowMain.offsetTop,
            ];
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
            const action = determineMainCharAction(this);
            if(action === "bash") {
                this.normalBash(this.opponent);
            } else if(action === "defend") {
                this.defend();
            } else if(action === "lifeup") {
                this.lifeUp();
            } else if(action === "psimagnet") {
                this.psiMagnet();
            } else if(action === "hypnosis-alpha") {
                this.hypnosisAlpha();
            } else {
                this.duel.writeMessage(`${this.stats.charName} は たちすくんだ！`);
            }
        }

        normalBash (target) {
            let damage =  Math.floor(Math.random()*80) + 60;
            const chanceOfMiss = this.stats.ailments.crying ? 1.65 : 16;
            this.duel.writeMessage(`${this.stats.charName} の こうげき！`);

            target.recognize('opponentSleeping', 0);

            setTimeout(()=>{
                if(Math.random()*chanceOfMiss <= 1){
                    this.duel.writeMessage(`The missed!`);
                }else{
                    if(Math.random()*16 <= 1){
                        damage = damage * 3;
                        if(target.stats.shielding.type === "shield" && target.stats.shielding.duration>0){
                            target.stats.shielding.duration = 1;
                        }
                        this.duel.writeBreakdown(`SMEEEEEEEESH!!`);
                        popsmesh(this.duel.duelScreen, target.charPos);
                        this.stats.tp += 4;
                    }else if(target.stats.isDefending) {
                        damage = Math.floor(damage * 0.3);
                    }
                    this.stats.tp++;
                    target.takeDamage(damage, "physical");
                }
            }, 500);

            setTimeout(() => {
                this.endTurn();
            }, 1200);
        }

        defend () {
            this.duel.writeMessage(`${this.stats.charName} は ガードしている`);
            this.stats.isDefending=1;

            setTimeout(()=>{
                this.endTurn();
            }, 1000);
        }
        
        lifeUp () {
            this.psiTrial(this, spellBook.lifeup, 0);
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
                        this.recognize('rule','nomagic');
                    } else if(this.stats.ailments.silenced) {
                        this.duel.writeMessage(`しかし PSIは ふうじこまれている！`);
                    } else {
                        this.duel.writeMessage(`しかし TPがたりなかった！`);
                    }
                }, 800);
            }
                
            setTimeout(() => {
                this.endTurn();
            }, (2000 + animationTime));
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
            this.ailmentIndicator.classList.remove("expanded");
            // this.duel.terminate();
        }

        invokeRevive () {
            this.duel.writeMessage(`しかし ${this.stats.charName} に かかっていたリヴァイブまほうが ${this.stats.charName} に ちからをくれた！`);

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
            this.hpindicator.innerHTML = "HP <span>"+this.stats.hpa+"</span>";
            this.tpindicator.innerHTML = "TP <span>"+this.stats.tpa+"</span>";
            if(this.stats.hpa < this.stats.hp) {
                this.stats.hpa++;
            } else if(this.stats.hpa > this.stats.hp) {
                this.stats.hpa--;
            }
            if(this.stats.tpa < this.stats.tp) {
                this.stats.tpa++;
            } else if(this.stats.tpa > this.stats.tp) {
                this.stats.tpa--;
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
                this.ailmentJog = 0;
            }

            const ailments =
            [
                this.stats.ailments.poisoned,
                this.stats.ailments.asleep,
                this.stats.ailments.paralysed,
                this.stats.ailments.crying,
                this.stats.ailments.silenced,
            ];
            
            if(ailments.join("-") === "0-0-0-0-0") {
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
                }
            }
            
            this.ailmentJog++;
            if(this.ailmentJog > ailments.length - 1 && ailments.join("-") !== "0-0-0-0-0"){
                this.ailmentJog = -1;
                this.seekAilmentState();
            }
        }
    }

    class Duel {
        constructor (rules) {
            // Initialize Duel Screen
            this.duelScreen = document.createElement("div");
            this.duelScreen.classList.add("duelScreen");
            this.messageBox = document.createElement('div');
            this.messageBox.classList.add('messageContainer');
            this.duelScreen.appendChild(this.messageBox);
            this.windowContainer = document.createElement('div');
            this.windowContainer.classList.add('windowFlexBox');
            this.duelScreen.appendChild(this.windowContainer);
            document.querySelector("main").appendChild(this.duelScreen);

            this.startTime = performance.now();
            this.rules = rules;
            this.message = "";
            this.totalMessage = "";
            this.gameFlag = 1;
            this.totalTurn = 0;
            this.hitPointSetting = [];
            this.technicalPointSetting = [];
            this.promisedMessage = [];
            for(let k = 0; k < 2; k++){
                if(this.rules.duelmode === "suddendeath") {
                    this.hitPointSetting.push(1);
                }else if(this.rules.duelmode === "poisonrelying"){
                    this.hitPointSetting.push(Math.floor(Math.random()*99) + 900);
                }else{
                    this.hitPointSetting.push(Math.floor(Math.random()*520) + 350);
                }
        
                if(this.rules.duelmode === "suddendeath" || this.rules.duelmode === "nomagic" || this.rules.duelmode === "poisonrelying") {
                    this.technicalPointSetting.push(0);
                }else{
                    this.technicalPointSetting.push(Math.floor(Math.random()*500) + 250);
                }
            }
            this.sideA = [new LeadChar(this, {
                id: 0,
                iff: 0,
                charName: characterNames[Math.floor(Math.random()*characterNames.length)],
                mhp: this.hitPointSetting[0],
                hp: 0,
                hpa: 0,
                tp: 0,
                mtp: this.technicalPointSetting[0],
                tpa: 0,
                isDefending: 0,
                offense: 100,
                agl: Math.floor(Math.random()*120),
            }),"*","*","*","*","*"];
            this.sideB = [new LeadChar(this,{
                    id: 1,
                    iff: 1,
                    charName: characterNames[Math.floor(Math.random()*characterNames.length)],
                    mhp: this.hitPointSetting[1],
                    hp: 0,
                    hpa: 0,
                    tp: 0,
                    mtp: this.technicalPointSetting[1],
                    tpa: 0,
                    isDefending: 0,
                    offense: 100,
                    agl: Math.floor(Math.random()*120),
            }),"*","*","*","*","*",];
            this.orders = [];

            this.charA = this.sideA[0];
            this.charB = this.sideB[0];

            this.charA.opponent = this.charB;
            this.charB.opponent = this.charA;

            if(this.charA.stats.charName === this.charB.stats.charName){
                this.charA.stats.charName += "A";
                this.charB.stats.charName += "B";
            }

            this.writeBreakdown(`ルール：${this.rules.japanname}`);

            this.writeMessage("The engage!");
            this.parallelProgress();
        }

        determineOrder () {
            // this.orders = [this.charA, this.charB];
            const tempAgl = [
                this.charA.stats.agl + Math.random()*5 - 2,
                this.charB.stats.agl + Math.random()*5 - 2,
            ];
            // tempAgl.sort((a, b) => b - a);
            this.orders = [];
            if(tempAgl[0] <= tempAgl[1]) {
                this.orders.unshift(this.charA);
                this.orders.push(this.charB);
            }else{
                this.orders.unshift(this.charB);
                this.orders.push(this.charA);
            }
        }

        test () {
            const newOrder = [];
            const a = [{ name: "hitani", agl: 53},{name: "sakuma", agl: 18 }];
            const b = [{ name: "saraqui", agl: 25},{name: "paserja", agl: 42 }];
            const c = [...a,...b];

            c.forEach(v=>{v.tempAgl = v.agl + Math.floor(Math.random()*15) - 7});
            for(let agl = 999; agl > 0; agl --){
                c.forEach(v=>{
                    if(v.tempAgl === agl){
                        newOrder.push(v);
                        console.log("Yes "+ v.name +", yer are in order " + newOrder.length + ".");
                    }
                });
            }
            console.log(newOrder);

        }

        seekTurn () {
            if(this.charB.stats.hpa<=0 && this.charA.stats.hpa<=0) {
                this.charA.faint();
                this.charB.faint();
                if(!this.charB.stats.reviveEnchanted && !this.charA.stats.reviveEnchanted){
                    this.terminate();
                }else if(this.charA.stats.reviveEnchanted) {
                    this.writeMessage(`${this.charA.stats.charName} は きずつきたおれた…`);
                    this.charA.invokeRevive();
                }else if(this.charB.stats.reviveEnchanted) {
                    this.writeMessage(`${this.charB.stats.charName} は きずつきたおれた…`);
                    this.charB.invokeRevive();
                }
            }else if(this.charB.stats.hpa <= 0 ){
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
                    this.determineOrder();
                }
            }
            
            if(
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
                this.charA.parallelProgress();
                this.charB.parallelProgress();
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
            )
            // setTimeout(()=>{
            // }, 17);
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
            } else if(this.charB.stats.hpa <= 0){
                this.writeMessage(`${this.charB.stats.charName} は きずつきたおれた…`);
                this.writeBreakdown("---------------------");
                this.writeBreakdown(`${this.charA.stats.charName} Wins!`);
            }else if(this.charA.stats.hpa <= 0){
                this.writeMessage(`${this.charA.stats.charName} は きずつきたおれた…`);
                this.writeBreakdown("---------------------");
                this.writeBreakdown(`${this.charB.stats.charName} Wins!`);
            } else {
                this.writeMessage(`しあいは ちゅうしされた！`);
                this.writeBreakdown("---------------------");
                this.writeBreakdown(`Draw!`);
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
            const brkdwnContainer = document.createElement("div");
            brkdwnContainer.classList.add("breakdownContainer");
            brkdwnContainer.innerHTML = String(this.totalMessage).replace(/\n/g, "<br>");
            this.duelScreen.appendChild(brkdwnContainer);
            showBrkdwnBtn.addEventListener('click', ()=>{
                brkdwnContainer.classList.toggle("expanded");
                this.duelScreen.classList.toggle("scrollable");
            });
        }
    }
    
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
            if(
            Math.random()*3 <= 1 &&
            origin.recognizing.opponentSleeping === 0 &&
            !player.ailments.silenced &&
            origin.recognizing.rule !== "nomagic") {
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

    function popDamage(dmg, type, duelScreen, target) {
        const dmgInd = document.createElement("div");
        dmgInd.textContent = dmg;
        dmgInd.classList.add('damage-indicator');
        if(type === "damage") {
            dmgInd.style.color = "red";
        }else if(type === "heal") {
            dmgInd.style.color = "green";
        }
        dmgInd.style.left = target[0]+"px";
        dmgInd.style.top = target[1]+"px";
        duelScreen.appendChild(dmgInd);
        setTimeout(()=>{dmgInd.remove();}, 1000);
    }

    function popsmesh(duelScreen, target) {
        const flasher = document.createElement("div");
        flasher.classList.add('duelScreenFlashing');
        duelScreen.appendChild(flasher);
        const smesh = document.createElement("div");
        smesh.textContent = "SMEEEEEEESH!!";
        smesh.classList.add('damage-smesh');
        smesh.style.left = target[0]+"px";
        smesh.style.top = target[1] - 30 +"px";
        duelScreen.appendChild(smesh);
        setTimeout(()=>{flasher.remove();smesh.remove();}, 1000);
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
            }
        },
        "hypnosis-alpha" : {
            "title" : "さいみんじゅつα",
            "cost" : 10,
            "desc" : "あいてひとりを ねむらせる",
            "func" : function (caster, target, duel) {
                const chance = 1.66 + 2 * (target.stats.hp / target.stats.mhp);
                const dicing = Math.random()*chance;
                console.log(`${dicing} <= 1`);
                if(dicing <= 1 && target.stats.ailments.asleep === 0) {
                    target.stats.ailments.asleep = 1;
                    duel.writeMessage(`${target.stats.charName} は ねむってしまった！`);
                    caster.recognize("opponentSleeping", 1);
                } else {
                    duel.writeMessage(`${target.stats.charName} には こうかがなかった！`);
                }
            }
        },
    };
    
    const duelMain = [];

    document.querySelector('.normalDuelBtn').addEventListener('click', ()=>{
        const a = new Duel({duelmode: "normal", japanname: "ふつうのデュエル", background : 0});
        duelMain.push(a);
        setTimeout(()=>{a.seekTurn();}, 1000);
    });

    document.querySelector('.noMagDuelBtn').addEventListener('click', ()=>{
        const a = new Duel({duelmode : "nomagic", japanname: "PSIなしデュエル", background : 0});
        duelMain.push(a);
        setTimeout(()=>{a.seekTurn();}, 1000);
    });

    document.querySelector('.withReviveBtn').addEventListener('click', ()=>{
        const a = new Duel({duelmode : "withrevive", japanname: "リヴァイブつき", background : 0});
        duelMain.push(a);
        setTimeout(()=>{a.seekTurn();}, 1000);
    });

    document.querySelector('.suddenDeath').addEventListener('click', ()=>{
        const a = new Duel({duelmode : "suddendeath", japanname: "サドンデス", background : 0});
        duelMain.push(a);
        setTimeout(()=>{a.seekTurn();}, 1000);
    });

    document.querySelector('.poisonRelying').addEventListener('click', ()=>{
        const a = new Duel({duelmode : "poisonrelying", japanname: "どくまかせ！？", background : 0});
        duelMain.push(a);
        setTimeout(()=>{a.seekTurn();}, 1000);
    });

    document.querySelector('.thirtySecondsBtn').addEventListener('click', ()=>{
        const a = new Duel({duelmode: "normal", japanname: "30びょうでちゅうし", background : 0});
        duelMain.push(a);
        setTimeout(()=>{a.seekTurn();}, 1000);
        setTimeout(()=>{a.terminate();}, 30000);
    });
}