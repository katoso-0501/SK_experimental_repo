"use strict";
{
    class CharBase {
        constructor (duel) {
            this.duel = duel;
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
                agl: 100,
            }
        }

        setStats (stats) {
            Object.entries(stats).forEach(n =>{
                this.stats[n[0]] = n[1];
            });

            this.stats.hp = this.stats.mhp;
            this.stats.hpa = this.stats.mhp;
            this.stats.tp = this.stats.mtp;
            this.stats.tpa = this.stats.mtp;
        }
    }

    class LeadChar extends CharBase {
        constructor (duel, initStat){
            super(duel);
            this.setStats(initStat);
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
            
            document.querySelector('.windowFlexBox').appendChild(this.windowMain);
        }

        normalBash (origin, target) {
            let damage =  Math.floor(Math.random()*120) + 30;
            if(target.stats.isDefending) {
                damage = Math.floor(damage * 0.3);
            }
            this.writeMessage(`${origin.stats.charName} の こうげき！`);
            if(Math.random()*16 <= 1){
                this.writeMessage(`The missed!`);
            }else{
                if(Math.random()*16 <= 1){
                    damage = damage * 3;
                    this.writeMessage(`Critical hit!`);
                }else if(target.stats.isDefending) {
                    damage = Math.floor(damage * 0.3);
                }
                target.stats.hp -= damage;
                this.writeBreakdown(`${damage} ダメージ`);
            }
        }

        parallelProgress () {
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
        }
    }

    class Duel {
        constructor (rules) {
            this.rules = rules;
            this.message = "";
            this.totalMessage = "";
            this.gameFlag = 1;
            this.totalTurn = 0;
            this.sideA = ["*","*","*","*","*","*",];
            this.sideB = ["*","*","*","*","*","*",];
            this.orders = [];

            this.charA = new LeadChar(this, {
                id: 0,
                iff: 0,
                charName: characterNames[Math.floor(Math.random()*characterNames.length)],
                mhp: Math.floor(Math.random()*520) + 350,
                hp: 0,
                hpa: 0,
                tp: 0,
                mtp: this.rules.duelmode !== "nomagic" ? Math.floor(Math.random()*500) + 30 : 0,
                tpa: 0,
                isDefending: 0,
                offense: 100,
                agl: Math.floor(Math.random()*120),
            });

            this.charB = new LeadChar(this,{
                    id: 1,
                    iff: 1,
                    charName: characterNames[Math.floor(Math.random()*characterNames.length)],
                    mhp: Math.floor(Math.random()*520) + 350,
                    hp: 0,
                    hpa: 0,
                    tp: 0,
                    mtp: this.rules.duelmode !== "nomagic" ? Math.floor(Math.random()*500) + 30 : 0,
                    tpa: 0,
                    isDefending: 0,
                    offense: 100,
                    agl: Math.floor(Math.random()*120),
            });

            if(this.charA.stats.charName === this.charB.stats.charName){
                this.charA.stats.charName += "A";
                this.charB.stats.charName += "B";
            }

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

        draw() {
            if(this.gameFlag === 1){
                this.seekTurn();
                setTimeout(this.draw.bind(this), 1000);
            }
        }

        seekTurn () {
            if(this.charB.stats.hpa <= 0 || this.charA.stats.hpa <= 0 ){
                this.orders = [];
                this.terminate();
            }else{
                if(this.orders.length <= 0) {
                    this.totalTurn ++;
                    this.writeBreakdown(` ********** Turn ${this.totalTurn} **********`);
                    this.determineOrder();
                }
            }
            
            if(this.orders.length >= 1){
                if(this.orders[0].stats.id === this.charA.stats.id) {
                    this.charA.stats.isDefending=0;
                    this.charSetAction(this.charA, this.charB);
                }else {
                    this.charB.stats.isDefending=0;
                    this.charSetAction(this.charB, this.charA);
                } 
                this.orders.shift();
            }
        }

        charNormalBash (origin, target) {
            let damage =  Math.floor(Math.random()*120) + 30;
            if(target.stats.isDefending) {
                damage = Math.floor(damage * 0.3);
            }
            this.writeMessage(`${origin.stats.charName} の こうげき！`);
            if(Math.random()*16 <= 1){
                this.writeMessage(`The missed!`);
            }else{
                if(Math.random()*16 <= 1){
                    damage = damage * 3;
                    this.writeMessage(`Critical hit!`);
                }else if(target.stats.isDefending) {
                    damage = Math.floor(damage * 0.3);
                }
                target.stats.hp -= damage;
                this.writeBreakdown(`${damage} ダメージ`);
            }
        }

        charDefend (origin) {
            this.writeMessage(`${origin.stats.charName} は ガードしている`);
            origin.stats.isDefending=1;
        }

        charLifeUp (origin) {
            if(origin.stats.tp>=24){
                this.writeMessage(`${origin.stats.charName} は ライフアップ をこころみた！`);
                origin.stats.tp -= 24;
                origin.stats.hp = origin.stats.mhp;
            }else{
                this.writeMessage(`${origin.stats.charName} は ライフアップ をこころみた！が、ちからがなかった...`);
            }
        }

        charSetAction (origin, target) {
            const action = determineMainCharAction(origin);
            if(action === "bash") {
                this.charNormalBash(origin, target);
            } else if(action === "defend") {
                this.charDefend(origin);
            } else if(action === "lifeup") {
                this.charLifeUp(origin);
            } else {
                this.writeMessage(`${origin.stats.charName} は たちすくんだ！`);
            }
        }

        writeMessage(msg) {
            const board = document.querySelector(".message_container");
            board.innerHTML = msg;
            this.writeBreakdown(msg);
        }

        writeBreakdown(msg) {
            this.totalMessage += msg + "\n";
        }

        updateIndicators () {
        }

        parallelProgress () {
            if(this.gameFlag === 1){
                this.charA.parallelProgress();
                this.charB.parallelProgress();
                this.updateIndicators();
                window.requestAnimationFrame(this.parallelProgress.bind(this));
            }
        }

        terminate () {
            this.gameFlag=0;
            this.orders = [];
            if(this.charB.stats.hpa === 0 && this.charA.stats.hpa === 0) {
                this.charB.stats.hp = 0;
                this.charA.stats.hp = 0;
                this.charB.stats.hpa = 0;
                this.charA.stats.hpa = 0;
                this.writeBreakdown(`りょうしゃとも きずつきたおれた…`);
                this.writeBreakdown(`Draw!`);
            } else if(this.charB.stats.hpa <= 0){
                this.charB.stats.hp = 0;
                this.charB.stats.hpa = 0;
                this.writeMessage(`${this.charB.stats.charName} は きずつきたおれた…`);
                this.writeBreakdown(`${this.charA.stats.charName} Wins!`);
            }else{
                this.charA.stats.hp = 0;
                this.charA.stats.hpa = 0;
                this.writeMessage(`${this.charA.stats.charName} は きずつきたおれた…`);
                this.writeBreakdown(`${this.charB.stats.charName} Wins!`);
            }
            this.updateIndicators();
            document.querySelector(".breakdown_container").innerHTML = 
            String(this.totalMessage).replace(/\n/g, "<br>");
        }
    }
    
    function determineMainCharAction (origin) {
        const opinions = [];
        const player = origin.stats;
        let action;
        for(let i = 0; i<10; i++){
            action = "bash";

            if(Math.random()*10<=1) {
                action = "defend"
            }

            if(player.tp >= 24 && player.hp < player.mhp) {
                if(player.hpa <= (player.mhp * 0.7) && Math.random()*6 <= 1) {
                    action = "lifeup";
                }
                if(player.hpa <= (player.mhp * 0.4) && Math.random()*3 <= 1) {
                    action = "lifeup";
                }

                if(player.hpa <= 100) {
                    action = "lifeup";
                }
            }
            opinions.push(action);
        }

        console.log(origin.stats.charName+"のしこう : " + opinions.join("、"));

        const finalDecision = opinions[Math.floor(Math.random()*opinions.length)];
        return finalDecision;
    }

    const characterNames = [
        "そう",
        "かあさん",
        "メイプル",
        "Dさん",
        "いぶりがっこくん"
    ];
    
    let game = new Duel({duelmode : "normal"});
    setTimeout(()=>{game.draw();}, 1000);
}