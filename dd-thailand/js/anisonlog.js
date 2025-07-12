
class Log {
    constructor(rcm=0){
      this.recordingMode = rcm;
      this.log="";
      this.arrayer = [];
      console.log(this.log);
      this.reset();
    }
    update(){
      const timers = new Date;
      const a =(timers.getHours() + ':' + String(timers.getMinutes()).padStart(2,'0') + ':' + String(timers.getSeconds()).padStart(2,'0'));
      const b = $('.wrap .anison_info .next_on_air .orders_list .item').length;
      const c = voteSum - 98 * $('.wrap .anison_info .next_on_air .premium').length;
      const d = Math.round((c / noOfOrders) * 1000 ) / 1000;
      const e = yourPos;
      const j = $('.anison_info .next_on_air .trackingTune').length === 1 ? parseInt($('.anison_info .next_on_air .trackingTune .num').text()) : 0;
      const f = $('.anison_info .premiere').length;
      const g = String($('.wrap .anison_info .top_on_air span.anime').text()).replace(/,/g,'.') + ' / ' + String($('.wrap .anison_info .top_on_air span.title').text()).replace(/,/g,'.');
      const h = remT ;
      const i = ( faultyTime > faultyMaximum ? '> System failure shall be considered ' : ' ' ) + ( yourPos >= 1 ? '> Your Order: ' + String($('.anison_info .next_on_air .yourRequest .anime').text()).replace(/,/g,'.') + ' / ' + $('.anison_info .next_on_air .yourRequest .track').text() : '' ) + ($('.anison_info .next_on_air .trackingTune').length === 1 ? '> You are tracking : ' + String($('.anison_info .next_on_air .trackingTune .anime').text()).replace(/,/g,'.') + ' / ' +  String($('.anison_info .next_on_air .trackingTune .track').text()).replace(/,/g,'.') : '') + ($('.next_on_air .premium').length >= 1 ? ' > There are some premium votes applied by :' + $('.next_on_air .premium').text() : '') + additionalRemark;
 
      if(this.recordingMode===0){
                this.log += a + ',' + b + ',' + c + ',' + d + ',' + e + ',' + j + ',' + f + ',' + g + ',' + h + ',' + i + '\n';
          } else if(this.recordingMode>=1){
                this.log += a + ',' + b + ',' + c + ',' + d + ',' + e + ',' + j + ',' + f + ',' + g + ',' + h + ',' + i + '\n';
                this.arrayer = this.log.split(' \n');
                // Array Limit up to 50
                if(this.arrayer.length > 50 ) {
                         while(this.arrayer.length>50){
                                   this.arrayer.shift();
                         }
                }
                this.encoded = encodeURI(this.arrayer.join("EOL"));
                document.cookie= "logbackup_"+ String(this.recordingMode).padStart(3,"0") +"=" + this.encoded + ";max-age=20000;";
         }
    }
 
    reset(){
      if(this.recordingMode===0){
              this.log = 'Time,Orders,Votes,Voting ratio,Your Pos,Target Pos,Premiums,Series / Song Name,Rem. Time,Remarks\n';
      }
      if(this.recordingMode>=1){
              this.log = 'Time,Orders,Votes,Voting ratio,Your Pos,Target Pos,Premiums,Series / Song Name,Rem. Time,Remarks\n';
              this.arrayer = "";
              this.encoded = "";
      }
    }
 
    publish(){
      return this.log;
    }
 }
 
 var faultyTime = 0;
 var faultyMaximum = (180 * 1.2);
 var noOfOrders = 0;
 var voteSum = 0;
 var yourPos = 0;
 var remT = '0:00';
 var trackID = -1
 var additionalRemark = "";
 var watchedTime = 0;
 var prevPos = [];
 var anisonlog2 = [new Log(), new Log(), new Log(1)];
 var backuplength = 0;
 var dimmeringOpacity = 0;
 
 for(var i=0; i<150000;i++){
    prevPos.push([i,0]);
 }
 
 var myOwnSettings = {
    disablePoster : 1,
    scrollString : 35,
    autoResizeString: 1,
    slimMode: 0,
    hideLesserStats: 0,
    darkMode: 0,
    playlistLayout: 0,
    dimmeringMode: 0,
    soundNotifier: 1,
    dimAwaker: {
         yourOrder: 1,
         targetPos: 1,
         every15min: 0,
         mouseMove: 1,
         keyPress: 1,
         systemFailure: 0,
    },
 }
 
 // Delete some elements
 $('.wrap .next_on_air img')[0].remove();
 $('.on_air_window_10').find('input,label').remove();
 $('.nav a.local_link').remove();
 $('.links a').removeAttr('href');
 $('.wrap .anison_info .top_on_air .on_air_text img').remove();
 $('.next_on_air.open_fulllist img').remove();
 
 //Create some elements
 $('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=settings" />');
 $('.bot_panel .btns').append('<a href="#" class="btn showLogBtn">Show log</a>');
 $('.wrap .anison_info').append('<div class="whenSystemFailure"><h3>Do These Actions:</h3><ul><li>Verify that the streamer itself is working</li><li>Consider cancelling a current order</li><li>If possible, change streaming channels that the sound bitrate is degraded</li></div><div class="orderLengths">21 ORDERS, RATIO 1.553</div>');
 $('body').append('<div class="anison_log" style="display:flex;"><h1>Log</h1><div class="anison_log__btn"><span id="anison_log__resetBtn">Reset</span></div><p class="anison_log__container"></p><div class="anison_log__remarks"><label>Additional Remark:<br><input type="text" placeholder="Remark will be recorded on the end of the log" id="anison_log__additionalRemark"></div></div><div class="dimmeringMat"></div>');
 $('.anison_log').hide();
 $('<h2>Now On Air</h2>').insertBefore($('.wrap .anison_info .top_on_air .on_air_text .time'));
 var audio_notifier = new Audio('https://osabisi.sakura.ne.jp/m2/tm4/se/tm2_pon002.wav');
 audio_notifier.volume = 0.1;
 $('.next_on_air.open_fulllist ').text("View full list");
 
 // My own settings
 $('body').append('<div class="settingBtn"><span class="material-symbols-outlined">settings</span></div>');
 $('body').append('<div class="myownsettings"><div class="myownsettings_inner"><ul></ul></div></div>');
 $('.myownsettings ul').append('<li><label><input class="myownsettings__disablePoster" type="checkbox" checked> <span>Disable Poster</span></label></li>');
 $('.myownsettings ul').append('<li><label><input class="myownsettings__autoScroll" type="checkbox" checked> <span>Auto scroll adjustments</span></label></li>');
 $('.myownsettings ul').append('<li><label>Enables scroll when text is less than <input class="myownsettings__scrollString" type="number"> chars</label></li>');
 $('.myownsettings ul').append('<li><label><input class="myownsettings__slimmode" type="checkbox"><span>Slim mode</span></label></li>');
 $('.myownsettings ul').append('<li><label><input class="myownsettings__hidelesser" type="checkbox"> <span>Hide Lesser Info</span></label></li>');
 $('.myownsettings ul').append('<li><label><input class="myownsettings__darkmode" type="checkbox"> <span>Dark Mode</span></label></li>');
 $('.myownsettings ul').append('<li><label><input class="myownsettings__soundNotifier" type="checkbox" checked> <span>Sound Notifier</span></label></li>');
 $('.myownsettings ul').append('<li><p>Playlist Layout:</p><label><input type="radio" name="layoutsetting" class="myownsettings__layoutnormal" checked><span> Normal</span></label> <label><input type="radio" name="layoutsetting" class="myownsettings__layoutcenter"><span> Centering</span></label> <label><input type="radio" name="layoutsetting" class="myownsettings__layoutlarge"><span> Large</span></label></li>');
 $('.myownsettings ul').append('<li><p>Screen Dimming:</p><label><input type="radio" name="dimmering" class="myownsettings__dimmeringoff" checked><span> None</span></label> <label><input type="radio" name="dimmering" class="myownsettings__dimmeringauto"><span> Automatic</span></label> <label><input type="radio" name="dimmering" class="myownsettings__dimmeringon"><span> Always</span></label><div class="factors_for_brightening"><p>Factors for brightening :</p><label><input type="checkbox" class="myownsettings__dimawaker01" checked><span> Your Order</span></label><label><input type="checkbox" class="myownsettings__dimawaker02" checked><span> Target Pos</span></label><label><input type="checkbox" class="myownsettings__dimawaker03" ><span> Every 15 minutes</span></label><label><input type="checkbox" class="myownsettings__dimawaker04" checked><span> Mouse move</span></label><label><input type="checkbox" class="myownsettings__dimawaker05" checked><span> Key Press</span></label><label><input type="checkbox" class="myownsettings__dimawaker06" ><span> System Failure</span></label></div></li>');
 $('.myownsettings ul').append('<li><h3>Log</h3><button class="myownsettings__addnewlog">Add a new backup log</button> <span>No. of backup : 0</span></li>');
 
 $('.myownsettings__scrollString').attr('value',myOwnSettings.scrollString);
 
 $('.myownsettings__disablePoster').on('click',function(){
     myOwnSettings.disablePoster = $(this).prop('checked');
 });
 
 $('.myownsettings__autoScroll').on('click',function(){
     myOwnSettings.autoResizeString = $(this).prop('checked');
 });
 
 $('.myownsettings__soundNotifier').on('click',function(){
     myOwnSettings.soundNotifier = $(this).prop('checked');
 });
 
 $('.myownsettings__slimmode').on('click',function(){
     myOwnSettings.slimMode = $(this).prop('checked');
         if($(this).prop('checked')){
         $('.wrap .anison_info').addClass('slimmode');
         }else{
         $('.wrap .anison_info').removeClass('slimmode');
         }
 });
 
 $('.myownsettings__layoutnormal').on('click',function(){
     $('.wrap .anison_info').removeClass("centering");
     $('.wrap .anison_info').removeClass("largescale");
 });
 
 $('.myownsettings__layoutcenter').on('click',function(){
     $('.wrap .anison_info').addClass("centering");
     $('.wrap .anison_info').removeClass("largescale");
 });
 
 $('.myownsettings__layoutlarge').on('click',function(){
     $('.wrap .anison_info').removeClass("centering");
     $('.wrap .anison_info').addClass("largescale");
 });
 
 $('.myownsettings__dimmeringoff').on('click',function(){
     myOwnSettings.dimmeringMode = 0;
 });
 
 $('.myownsettings__dimmeringauto').on('click',function(){
     myOwnSettings.dimmeringMode = 1;
 });
 
 $('.myownsettings__dimmeringon').on('click',function(){
     myOwnSettings.dimmeringMode = 2;
 });
 
 $('.myownsettings__scrollString').on('change',function(){
             if(!myOwnSettings.autoResizeString){
         myOwnSettings.scrollString = parseInt($(this).prop('value'));
     }
 });
 
 $('#anison_log__additionalRemark').on('change',function(){
     additionalRemark = $(this).prop('value');
 });
 
 $('.myownsettings__hidelesser').on('click',function(){
     myOwnSettings.hideLesserStats = $(this).prop('checked');
             if(myOwnSettings.hideLesserStats){
                    $('body').addClass('hideLesserInfo');
             } else {
                    $('body').removeClass('hideLesserInfo');
             }
 });
 
 $('.myownsettings__darkmode').on('click',function(){
         var a = $('.wrap .anison_info, .myownsettings, .settingBtn, .anison_log, .wind_vote,#bot_panel');
     myOwnSettings.darkMode = $(this).prop('checked');
         if($(this).prop('checked')){
         $(a).addClass('darkmode');
         }else{
         $(a).removeClass('darkmode');
         }
 });
 
 $('.myownsettings__dimawaker01').on('click',function(){
         if($(this).prop('checked')){
                 myOwnSettings.dimAwaker.yourOrder = 1;
         }else{
                 myOwnSettings.dimAwaker.yourOrder = 0;
         }
 });
 $('.myownsettings__dimawaker02').on('click',function(){
         if($(this).prop('checked')){
                 myOwnSettings.dimAwaker.targetPos = 1;
         }else{
                 myOwnSettings.dimAwaker.targetPos = 0;
         }
 });
 
 var fifteen_min;
 $('.myownsettings__dimawaker03').on('click',function(){
         if($(this).prop('checked')){
                 myOwnSettings.dimAwaker.every15min = 1;
                 fifteen_min = setInterval(()=>{
                           $('.dimmeringMat').css('opacity',"0");
                           dimmeringOpacity = 0;
                 },900000);
         }else{
                 myOwnSettings.dimAwaker.every15min = 0;
                 clearInterval(fifteen_min);
         }
 });
 
 $('.myownsettings__dimawaker04').on('click',function(){
         if($(this).prop('checked')){
                 myOwnSettings.dimAwaker.mouseMove = 1;
         }else{
                 myOwnSettings.dimAwaker.mouseMove = 0;
         }
 });
 
 $('.myownsettings__dimawaker05').on('click',function(){
         if($(this).prop('checked')){
                 myOwnSettings.dimAwaker.keyPress = 1;
         }else{
                 myOwnSettings.dimAwaker.keyPress = 0;
         }
 });
 
 $('.myownsettings__dimawaker06').on('click',function(){
         if($(this).prop('checked')){
                 myOwnSettings.dimAwaker.systemFailure = 1;
         }else{
                 myOwnSettings.dimAwaker.systemFailure = 0;
         }
 });
 
 $('.myownsettings__addnewlog').on('click',function(){
       anisonlog2.push(new Log(backuplength+2));
       backuplength++;
 
       $('.myownsettings__addnewlog + span').text('No. of backup : '+ backuplength);
 });
 
 // Log resetting confirmation
 $('#anison_log__resetBtn').on('click',function(){
    $('div.wind_vote, .overlay_vote').css({'opacity':'1','display':'block', 'visibility':'visible'});
    $('.wind_vote .voteform').html(`<div style="width: 100%; justify-content: space-between; align-items: center; display:flex">Are you sure you want to reset a log? <div class="authform" style="width: min-content"><button class="log_resetter btn" style="margin: 10px 0;" onclick=""> <span class="text">Reset</span></button></div></div>`);
         resize_popup('.wind_vote');
 
    $('.log_resetter').on('click',function(){
         anisonlog2[0].reset();
         anisonlog2[2].reset();
                 $('.anison_log__container').html(String(anisonlog2[0].publish()).replace(/\n/g,'<br>'));
                 $('div.wind_vote, .overlay_vote').css({'display':'none', 'visibility':'hidden'});
    });
 });
 
 // Show Log
 $('.showLogBtn').on('click',function(){
        $('.anison_log__container').html(String(anisonlog2[0].publish()).replace(/\n/g,'<br>'));
        $('.myownsettings').removeClass("expanded");
        $('.anison_log').fadeToggle(400);
        return false;
 });
 
 // My Own Settings
 $('.settingBtn').on('click',function(){
        $('.anison_log').fadeOut(400);
        $('.myownsettings').toggleClass("expanded");
        return false;
 });
 
 setInterval(function(){
     voteSum = 0;
     yourPos = 0;
     if(j_air_pause != 0){
        faultyTime++;
     }else{
        faultyTime=0;
     }
 
         var d = '.item[data-song="' + trackID + '"]';
                   if(trackID>=0){
                           if(trackID>=1){
                                 if($('.wrap .anison_info .next_on_air .orders_list').find(d).length <= 0){
                           trackID=0;
                           }else{
             $('.wrap .anison_info .next_on_air .orders_list').find(d).addClass('trackingTune');
                           }
                           }else if(trackID === 0){
                                 console.log('Nothing to track, tracking system ends.');
                                 trackID = -1;
                           }
                   }
     for(var a = 0; a < $('.wrap .anison_info .next_on_air .orders_list .item').length; a++){
         var b = $('.wrap .anison_info .next_on_air .orders_list .item')[a];
                                     var c = ( parseInt($(b).find('.votes .vnum').text())) ;
                                     voteSum += c;
             if($(b).find('.icon-minus').length >= 1){
             $(b).addClass('yourRequest');
                                                       yourPos = a+1;
         }
         if($(b).find('.premium').length >= 1){
             $(b).addClass('premiere');
         }
     }
                   
 if(faultyTime > faultyMaximum){
    $('.on_air_text span.time').removeClass('minimums');
    $('.on_air_text span.time').removeClass('toStation');
    $('.on_air_text span.time,.wrap .anison_info .next_on_air .orders_list,.whenSystemFailure').addClass('systemFailure');
    if(myOwnSettings.dimAwaker.systemFailure){
            dimmeringOpacity = 0;
    }
 }else{
   $('.on_air_text span.time,.wrap .anison_info .next_on_air .orders_list,.whenSystemFailure').removeClass('systemFailure');
 }
 
 if(myOwnSettings.dimmeringMode === 0 ){
     dimmeringOpacity = 0;
 }
 
 if(myOwnSettings.dimmeringMode === 1 ){
     dimmeringOpacity = dimmeringOpacity >= 0.9 ? 0.95 : dimmeringOpacity+0.01;
         if(yourPos === 1 && myOwnSettings.dimAwaker.yourOrder === 1){
                dimmeringOpacity = 0;
         }
         if($('.anison_info .next_on_air .trackingTune').length === 1 && myOwnSettings.dimAwaker.targetPos === 1){
                if(parseInt($('.anison_info .next_on_air .trackingTune .num').text()) === 1){
                           dimmeringOpacity = 0;
                }
         }
 }
     if(myOwnSettings.dimmeringMode === 2 ){
     dimmeringOpacity = 0.95;
     }
 
     $('.dimmeringMat').css('opacity',dimmeringOpacity);
     // If black mat's opacity exceeds 90 percent, animaton easings will be omitted
     if(dimmeringOpacity>=0.9){
           $('.wrap .anison_info').addClass('transitionOmitted');
     }else{
           $('.wrap .anison_info').removeClass('transitionOmitted');
     }
 },800);
 
 $('body').on('mousemove click',function(){
      if(myOwnSettings.dimmeringMode === 1 && myOwnSettings.dimAwaker.mouseMove === 1 ){
                if(dimmeringOpacity>0.1){
                        $('.dimmeringMat').css('opacity',"0");
                }
                dimmeringOpacity = 0;
      }
 });
 
 //0327 Update status
 function update_status (data, textStatus) {
     // Define variables for make DOMs easy to use
     var j_orders_list = $("#orders_list, .wind1 #orders_list");
     var orders_list = data.orders_list;
     var dP = myOwnSettings.disablePoster;
 
         for(var i in orders_list) {
         data.orders_list[i].prevNum=prevPos[data.orders_list[i].song_id][1];
         
         if(dP){
             orders_list[i].poster_link = '';
         }
         orders_list[i].uri = urlencode(orders_list[i].anime);
     }
     
     //Define scripts for transition
     setTimeout(()=>{
     for(var i in orders_list) {
         var gg = (parseInt(data.orders_list[i].num - prevPos[data.orders_list[i].song_id][1]) * - 73 )+ "px";
         var ee = $('.next_on_air .item')[i];
         if(prevPos[data.orders_list[i].song_id][1] !== 0){
            
             if(!$('.wrap .anison_info').hasClass('transitionOmitted')){
 
            $(ee).find("table").css({"top":gg});
            $(ee).find("table").animate({"top":"0"},500);
            }
         }else{
             if(!$('.wrap .anison_info').hasClass('transitionOmitted')){
                     $(ee).find("table").addClass("translationNewcomer");
             }
         }
             prevPos[data.orders_list[i].song_id][1] = data.orders_list[i].num;
         }
     },100);
 
 
     var orders_template = $("#orders_list_template");
     if(orders_list.length) {
         j_orders_list.html(orders_template.tmpl(orders_list));
         if(preplaying > 1) $('.item[data-song="' + preplaying + '"] .preplay').addClass('active');
     } else {
           // if nothing ordered
           j_orders_list.html("<div class='no_orders'>Нет заказов ...<br/><img src='/images/no-orders.png'></div>");
     }
 
     // Create Image Elements  0919
     if(dP && data.orders_list.length > 0){
         var poster_preload = new Image();
         poster_preload.src = '';
         data.poster = '<img src>';
     }
 
     // Update history
     var j_history = $("#history");
     var history_template = $("#history_template");
     // add uri variable with urlencode
     for(var i in data.history) {
         data.history[i].uri = urlencode(data.history[i].anime)
     }
     var history = history_template.tmpl(data.history);
     j_history.html(history);
 
     // Update listeners
     var j_listeners = $("#listeners, .topbar #listeners");
     var listeners = parseInt(data.listeners);
     j_listeners.html(listeners);
 
     // Update current track in air
     var j_on_air = $("#on_air, .wind1 #on_air");
     // anime name
     var on_air_anime = data.on_air.anime;
     var on_air_link = data.on_air.link;
     if (on_air_link.length) {
       var on_air_al = '<a href="/catalog/' + on_air_link + '/' + urlencode(on_air_anime) + '">' + on_air_anime + '</a>';
     } else {
       var on_air_al = on_air_anime;
     }
     j_on_air.find(".anime").html(on_air_al);
     // track description
     var on_air_track = data.on_air.track;
     j_on_air.find(".title").html(on_air_track);
 
     // Update track information
     var j_order_by = $("#order_by");
     var order_by_id = data.on_air.order_by;
     var order_by_login = data.on_air.order_by_login;
     var order_by_comment = data.on_air.comment;
     var order_by_comment_length = data.on_air.comment.length;
 
     var dataItems = [
     {
         id: order_by_id,
         login: order_by_login,
         comment: order_by_comment,
         length: order_by_comment_length,
     }];
 
     var order_by_template = $("#order_by_template");
     j_order_by.html(order_by_template.tmpl(dataItems));
 
     if(order_by_id == 0) {
         j_order_by.hide(1000);
     } else {
         j_order_by.show(1000);
     }
 
     // Update time
     var duration = data.duration;
     f_timer(parseInt(duration));
 
     // Poster in the front of page
     var j_poster = $('#curent_poster');
     j_poster.attr('href', '/catalog/' + on_air_link + '/' + urlencode(on_air_anime));
     var poster = data.poster;
     if(dP){
         j_poster.html('<div style="width:204px;height:166px;"></div>');
     }else{
         j_poster.html(poster);
     }
     // Update poster in the full list
     var j_poster_full = $('.wrap #curent_poster');
     j_poster_full.attr('href', '/catalog/' + on_air_link + '/' + urlencode(on_air_anime));
     
     if(dP){
         j_poster_full.html('<div style="width:50px;height:50px"></div>');
     }else{
         j_poster_full.html('<img src="/resources/poster/50/' + on_air_link + '.jpg" id="current_poster_img">');
     }
     // Update premium
     window.ups = data.ups;
 
     // Update Kuroneko
     update_kuroneko();
 
     if(myOwnSettings.autoResizeString){
         myOwnSettings.scrollString=Math.floor( ($('.wrap .anison_info .item .info').innerWidth() - 12) / 8);
 
         $('.myownsettings__scrollString').attr('value',Math.floor( ($('.wrap .anison_info .item .info').innerWidth() - 12) / 8));
     }
 
     // Begin tracking a song by double-click - altered 211128
     document.querySelectorAll('.next_on_air .item').forEach((a)=>{
         const songid=a.dataset.song;
         a.addEventListener('dblclick',()=>{
             $('.next_on_air .item').addClass('transitionBG--once');
             $('.next_on_air .item').removeClass('trackingTune');
             if(trackID!==songid){
                 trackID=songid;
                 $(a).addClass('trackingTune');
             }else{trackID=-1;}
         });
     });
 
     // Make marquee for long text
     $('.next_on_air .item').each(function(){        
         var c = $(this).find('.anime a').text();
         if(c.length>=myOwnSettings.scrollString){
             $(this).addClass('is--scrollEnabled');
         }
                                     if(dP){
                                          $(this).addClass('posterDisabled');
                                     }else{
                                          $(this).removeClass('posterDisabled');
                                     }
     });
 
         // Added in 2025-02
     $('<div class="trackMask"></div>').insertBefore($('.wrap .orders_list .track'));
     $('.wrap .orders_list .track').each(function(){
         $(this).appendTo($(this).parent().find('.trackMask'));
 
                 var c = $(this).text();
                 if(c.length>=(myOwnSettings.scrollString * 1.3)){
             $(this).addClass('is--scrollEnabled');
         }
     });
         
         $('.topOnAir_trackMask .title, .topOnAir_trackMask .anime').each(function(){
                 var c = $(this).text();
                 var d = myOwnSettings.slimMode ? 28 : 50;
                 if(c.length>=d){
             $(this).addClass('is--scrollEnabled');
         }else{
             $(this).removeClass('is--scrollEnabled');
                 }
     });
 
     // Optimize Queue width in slim-mode
     if(myOwnSettings.slimMode){
         $('.wrap .anison_info').addClass('slimmode');
     }else{
         $('.wrap .anison_info').removeClass('slimmode');
     }
     // Darkening the next song's list layout when darkmode is on
     if(myOwnSettings.darkMode){
         $('.wrap .anison_info').addClass('darkmode');
     }else{
         $('.wrap .anison_info').removeClass('darkmode');
     }
 }
 
 function f_duration(j_duration) {
 var j_time = "";
 var j_hours = Math.floor(j_duration / 3600);
 var j_mod_mins = j_duration % 3600;
 var j_mins = Math.floor(j_mod_mins / 60);
 var j_secs = Math.floor(j_mod_mins % 60);
 if (j_hours > 0){j_time += j_hours + ":";
if (j_mins < 10) {j_mins = "0" + j_mins;}}
if (j_secs < 10) {j_secs = "0" + j_secs;}
j_time += j_mins + ":" + j_secs;
 
 noOfOrders = $('.wrap .anison_info .next_on_air .orders_list .item').length;
 
 $('.orderLengths').text('Next  |  ' + noOfOrders + ' ORDERS, RATIO ' + Math.round(((voteSum - (98 * $('.wrap .anison_info .next_on_air .orders_list .premiere').length)) / noOfOrders)*1000)/1000);
 
 if(j_mins === 0 && j_secs === 12){
      f_update(1);
 }
 
 if(j_mins < 1 && faultyTime <= faultyMaximum){
    if(j_secs <= 12){
             $('.on_air_text span.time').addClass('minimums');
             $('.on_air_text span.time').removeClass('toStation');
    }else{
             $('.on_air_text span.time').addClass('toStation');
             $('.on_air_text span.time').removeClass('minimums');
    }
 } else{
    $('.on_air_text span.time').removeClass('minimums');
    $('.on_air_text span.time').removeClass('toStation');
 }
 
 if(yourPos===1){
     $('.wrap .anison_info .top_on_air').addClass('incoming');
 }else{
     $('.wrap .anison_info .top_on_air').removeClass('incoming');
 }
 
   remT = j_time;
   return j_time;
 }
 
 // Every minute, log will be refreshed
 setInterval(function(){
       anisonlog2.forEach(f=>{f.update();});
 
       if(myOwnSettings.soundNotifier){
             audio_notifier.play();
       }
 },60000);
 
 // Key Shortcut
 $(document).on('keypress',function(e){
   if(dimmeringOpacity>0.1 && myOwnSettings.dimmeringMode === 1 && myOwnSettings.dimAwaker.keyPress === 1){
       $('.dimmeringMat').css('opacity',"0");
   }
   if(myOwnSettings.dimAwaker.keyPress === 1 ) {
           dimmeringOpacity = 0;
    }
   var inputFocused = 0;
   $('input[type="text"],input[type="password"]').each(function(){
       if($(this).is(':focus')){
           inputFocused=1;
       }
   });
   if(inputFocused===0){
           keyboardShortcuts(e.key);
   }
 });
 
 function keyboardShortcuts(pressedKey){
    if(pressedKey==="k"||pressedKey==="K"){
        
    }

   if(pressedKey==='r'||pressedKey==='R'){
         if(window.fullorderlist){
                  $('.overlay, .wrap').click();
         }else{
                  $('a.open_fulllist').click(); 
                 $('.anison_log').fadeOut(400);
         }
   }
 
   if(pressedKey==='l'||pressedKey==='L'){
        $('.overlay, .wrap').click();
        $('.showLogBtn').click();
   }
 
   if(pressedKey==='s'||pressedKey==='S'){
        $('.settingBtn').click();
   }
 
   if(pressedKey==='9'){
        if(myOwnSettings.dimmeringMode === 1 ){
            $('.dimmeringMat').css('opacity',"0.92");
            dimmeringOpacity = 0.92;
      }
   }
 }
 
 // Replace text pictures to real text on the category box
 var catalogInitials = String("#,0-9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z").split(",");
 $('.anison_catalog > a').each(function(index){
     var b = catalogInitials[index];
     $(this).find('i').remove();
     $(this).text(b);
 });
 
 // Extend width of search suggestions
 $('body').on('keyup.autocomplete', '#search', function() {
         $(this).autocomplete({
             open: function() { $('.ui-menu').width('480px'); $('.ui-menu').css({"left": "initial","right": "calc(50% - 480px)"});  }
         });
 });
 
 // Load fonts from Google Fonts
 var fontHind = $('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@600&display=swap" rel="stylesheet">');
 $("body").append($(fontHind));
 
 // Scroll Pos
 var prevScrollPos = $('html,body').scrollTop();
 $(window).on('scroll',function(){    
     if($("html,body").scrollTop() > prevScrollPos){
         $('#bot_panel').addClass('expanded');
     }else{
         $('#bot_panel').removeClass('expanded');
     }
     prevScrollPos = $('html,body').scrollTop();
 });
 
 // Fix the information hidden when the visibility is changed
 $(document).on('visibilitychange',function(){
     if($('.myownsettings__hidelesser').prop('checked')){
         $('body').addClass('hideLesserInfo');
     }
 });
 
 // Applying transition effects on modal at every confirmation 
 jQuery("body").on("click", 'a.local_link[href$="up"]', function() {
     $('div.wind_vote, .overlay_vote').css('display','block');
     return false;
 });
 
 $('.popup .close_window_vote, .overlay_vote').click(function (){
     $('div.wind_vote, .overlay_vote').css('display','none');
     return false;
 });
 
 // Wrap the title on Now on air section with scrollable mask
 $('<div class="topOnAir_trackMask topOnAir_songTitle"></div>').insertBefore($('.wrap .top_on_air .title'));
 $('<div class="topOnAir_trackMask topOnAir_seriesTitle"></div>').insertBefore($('.wrap .top_on_air .anime'));
 $('.wrap .top_on_air .anime').each(function(){
     $(this).appendTo($(this).parent().find('.topOnAir_seriesTitle'));
 
         var c = $(this).text();
         if(c.length>=(myOwnSettings.scrollString * 1.3)){
             $(this).addClass('is--scrollEnabled');
     }
 });
 $('.wrap .top_on_air .title').each(function(){
     $(this).appendTo($(this).parent().find('.topOnAir_songTitle'));
 
         var c = $(this).text();
         var d = myOwnSettings.slimMode ? 32 : 60;
         if(c.length>=d){
         $(this).addClass('is--scrollEnabled');
     }else{
         $(this).removeClass('is--scrollEnabled');
         }
 });
 
 // Minified style sheet shall contain here
 var minifiedCss = `.dimmeringMat,.myownsettings{pointer-events:none;opacity:0}.hideLesserInfo .info .time,.hideLesserInfo .orders_list .votes,.orders_list .local_link.preplay{display:none!important}.album_details .album .title,.anime_details .alt_title span.title,.anime_details .alt_title span.title_alt,.anison_info .orders_list .item .info .anime,.favorites .anime_detail .head .alt a,.favorites .anime_detail .head .title a,.profile-wrapper .anison_history a,.wrap .anison_info .next_on_air .orders_list .item table .anime{text-transform:initial}body{font:14px/1.3 'CartoGothic Std','Hind Siliguri',Hind,'Bahnschrift Condensed',Yu Gothic UI,Avenir,sans-serif!important}.material-symbols-outlined{font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24}#logofw,.footer .fw,.main_radio_block.fw{width:1280px}.header .top_panel{background:linear-gradient(0deg,#151515 0,#303030 100%)}.header .top_panel .fw{width:1280px;margin:0 0 0 8px;display:flex;flex-flow:row;justify-content:flex-start;align-items:center;gap:12px;padding:.3rem 0}.header .top_panel .listeners,.header .top_panel .nav,.header .top_panel .topbar{padding:0;float:none;margin:0}.header .top_panel .nav{order:-2}.header .top_panel .anison_player_container{float:none;order:-1;left:0;margin:0;padding:0}.header .top_panel .topbar .listeners,.header .top_panel .topbar .time_info{vertical-align:top;margin-left:8px}.header .top_panel .topbar .track_info{max-width:600px}.anison_info .on_air{background:#5c0074;border-radius:10px;top:0}.anison_info .on_air .descr{width:320px;padding:10px 0 0 16px}.anison_info .on_air .descr .div_btn .btn{position:relative;display:block;width:100%;height:auto;padding:5px 0;margin:0;color:#fff;box-shadow:0 2px 4px #202020;text-shadow:none;background:linear-gradient(90deg,#7d3a70 0,#93394d 50%,#c87137 100%);transition:.4s;border-radius:10px;overflow:hidden}.anison_info .on_air .descr .div_btn .btn:before{content:"";display:block;position:absolute;background:linear-gradient(90deg,rgba(255,255,255,.3) 0,rgba(255,255,255,0) 100%);width:200%;height:100%;left:-250%;top:0;transition:.4s}.anison_info .on_air .descr .div_btn .btn:hover:before{left:0}.main_radio_block .anison_info{height:350px;background:0 0;box-shadow:none}.main_radio_block .anison_info .next_on_air.open_fulllist{border-radius:5px;left:205px;background:#303030;padding:5px 16px;top:initial;bottom:16px;color:#fff}.main_radio_block .anison_info .orders_list{width:540px;height:286px;margin-left:0;padding:8px;border-radius:8px;background:#303030;box-shadow:0 0 12px #303030}.top_on_air .minimums:before,.top_on_air .toStation:before{left:-5px;top:-5px;height:calc(100% + 5px);position:absolute;content:""}.main_radio_block .anison_info .orders_list .item .info span{width:360px!important;max-width:none!important}.anison_catalog{margin:0;border-radius:10px;padding:8px}.anison_catalog a{font-size:18px;font-weight:700;width:fit-content;background-color:#b95b38;border-radius:3px;display:inline-block;text-align:center;padding:0 1px 0 3px;line-height:22px;height:22px;color:#fff;text-decoration:none;transition:.4s}.anison_catalog a:hover{transform:scale(1.2);background-color:#ff4815}.anison_catalog .search .textbox{font-family:inherit;font-size:14px;font-weight:700}#bot_panel .fw,.anison_log__remarks,.factors_for_brightening p,.ui-menu .ui-menu-item{width:100%}.ui-menu .ui-menu-item a{width:calc(100% - 100px - .8em)}#bot_panel{width:840px;left:4px;bottom:-80px;border-radius:12px;background:#e8e8e8;box-shadow:0 4px 8px #404040;transition:.4s}#bot_panel.darkmode,.wrap .anison_info.darkmode .next_on_air .orders_list .item table{background:#202020}#bot_panel.expanded{bottom:4px}#bot_panel .btns{float:right;padding-right:0;margin-top:-1px}.bot_panel .btns .btn.btn1{border-radius:0 12px 12px 0;background:linear-gradient(180deg,#a0d75e 0,#2b5100 100%);color:#fff!important}.bot_panel .btns .btn.btn2{background:linear-gradient(180deg,#990f99 0,#230033 100%);color:#fff!important}.bot_panel .user_info{width:171px}.bot_panel .user_info .ava img{border:1px solid silver;border-radius:5px;box-shadow:3px 3px 7px #404040}.bot_panel .user_info .name,.bot_panel .user_info .text{font:inherit;font-size:14px;font-style:italic}.bot_panel .user_info .name{font-size:16px;color:#202020}.anison_log.darkmode h1,.bot_panel.darkmode .user_info .name,.darkmode .next_on_air .orders_list .item .info span,.darkmode .next_on_air .orders_list .item .num,.darkmode .next_on_air .orders_list .item .votes,.next_on_air .orders_list .item.trackingTune .info span,.next_on_air .orders_list .item.trackingTune .num,.next_on_air .orders_list .item.trackingTune .votes,.next_on_air .orders_list .item.yourRequest .info span,.next_on_air .orders_list .item.yourRequest .num,.next_on_air .orders_list .item.yourRequest .votes{color:#fff}.bot_panel .btns .btn{background:0 0;border-left:1px solid #bbb;color:#91581a}.bot_panel.darkmode .btns .btn{border-left:1px solid #fff;color:#fff799}.footer{background:#151515;text-align:left}.footer .note,.wind_vote .authform .btn,.wind_vote .authform .btn .text{font-family:inherit}.footer .col_l{width:820px}.footer .col_r{width:305px}.wrap{font-weight:400}.wrap .anison_info .next_on_air .orders_list.systemFailure .item,.wrap .orders_list .item.posterDisabled .poster{display:none}.whenSystemFailure{display:none;position:absolute;top:150px;left:85px;width:250px}.whenSystemFailure h3{color:#ff8100}.whenSystemFailure.systemFailure{display:block}.wrap .top_on_air .on_air_text h2{position:absolute;right:8px;bottom:0;background:0 0;border:none;text-transform:none;color:#fff;font-size:35px;font-weight:100;margin:0;opacity:.15;z-index:0}.top_on_air .toStation:before{border:2px solid #40ccff;width:calc(100% + 7px);animation:100s linear larax2;border-radius:5px}.top_on_air .minimums:before{border:2px solid #ff8100;width:calc(100% + 5px);border-radius:5px}.top_on_air .systemFailure{color:red!important;font-size:0!important}.top_on_air .systemFailure:after{content:"CONSIDER SYSTEM FAILURE";display:block;width:500px!important;font-size:20px!important}.orderLengths{position:absolute;top:88px;left:6px;background:#f0f0f0;color:#202020;border-radius:6px;padding:2px 5px;transition:.4s}.myownsettings_inner,.settingBtn{padding:16px;box-shadow:0 0 7px #909090}.darkmode .orderLengths{color:#f0f0f0;background-color:#202020}.transitionOmitted .orderLengths,.wrap .anison_info.transitionOmitted,.wrap .anison_info.transitionOmitted .next_on_air .orders_list .item table,.wrap .anison_info.transitionOmitted .top_on_air .on_air_text .time{transition:none}.wrap .anison_info .top_on_air.incoming{background:#f20}.wrap .anison_info .top_on_air.incoming .anime a,.wrap .anison_info .top_on_air.incoming .title,.wrap .orders_list .item .votes{color:#202020}.next_on_air>div{padding-top:0}.next_on_air .item.is--scrollEnabled .info span{width:100%;max-width:100%}.next_on_air .item.is--scrollEnabled .info span.anime{display:block;width:100%;max-width:100%;overflow:hidden;text-overflow:initial}.next_on_air .item.is--scrollEnabled .info span.anime a{display:inline-block;white-space:nowrap;overflow:visible;animation:12s linear scrolling1}.transitionOmitted .next_on_air .item.is--scrollEnabled .info span.anime a,.transitionOmitted .yourRequest table:after,.wrap .anison_info.transitionOmitted .next_on_air .orders_list .trackMask span.track.is--scrollEnabled,.wrap .anison_info.transitionOmitted .top_on_air #on_air .topOnAir_trackMask span.is--scrollEnabled,.wrap .anison_info.transitionOmitted .top_on_air .on_air_text .time.minimums{animation:none}.transitionBG--once table{transition:background .5s}.translationNewcomer{opacity:0;animation:.3s ease-out .9s forwards floatApp}@keyframes floatApp{0%{transform:scale(.001);opacity:0}100%{transform:scale(1);opacity:1}}@keyframes larax1{0%,49%{opacity:1}100%,50%{opacity:0}}@keyframes larax2{0%,9.99%{opacity:1}10%,100%{opacity:0}}@keyframes scrolling1{0%,100%{transform:translateX(0)}60%{transform:translateX(-100%);opacity:1}60.1%{transform:translateX(-100%);opacity:0}60.2%{transform:translateX(500px);opacity:0}60.5%{transform:translateX(500px);opacity:1}}.wrap .anison_info{max-width:500px;width:100%;margin:0;padding:0;transform:translate(0);transition:1s;left:2px;top:2px;background:0}.wrap .anison_info.slimmode{max-width:270px}.wrap .anison_info.centering{top:0;left:0;bottom:0;right:0;margin:15px auto}.wrap .anison_info.largescale{transform-origin:left top;transform:scale(1.6,1.6)}.wrap .anison_info .top_on_air{background:#400050;width:100%;max-width:550px;margin:0 0 20px;padding:5px 0 10px;border-radius:7px;height:70px}.wrap .anison_info .top_on_air .poster{float:none;display:none;position:absolute}.wrap .anison_info .top_on_air #on_air{float:none;width:100%;position:relative;z-index:9}.wrap .top_on_air{width:calc(100% - 33px);color:#fff;text-align:left}.wrap .anison_info .top_on_air img.text{margin-left:10px}.wrap .anison_info .top_on_air #on_air .anime{padding-top:26px;padding-left:0}.wrap .anison_info .top_on_air #on_air .topOnAir_trackMask{display:block;width:calc(100% - 20px);margin-left:10px;margin-right:10px;overflow:hidden}.wrap .anison_info .top_on_air #on_air .topOnAir_trackMask span{width:max-content;float:none;display:inline-block;white-space:nowrap;overflow:visible}.wrap .anison_info .top_on_air #on_air .topOnAir_trackMask span.is--scrollEnabled{animation:12s linear infinite scrolling1}.wrap .top_on_air .anime{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.wrap .anison_info .top_on_air .on_air_text .time{display:block;top:4px;left:10px;width:fit-content;min-width:50%;text-align:left;font-size:20px;transition:.2s linear}.wrap .anison_info .top_on_air .on_air_text .time.toStation{font-weight:800;font-size:24px!important;padding:0 4px;color:#40ccff!important;background:#002;border-radius:5px}.wrap .anison_info .top_on_air .on_air_text .time.minimums{font-weight:800;color:#ff8100!important;animation:.2s linear infinite larax1;font-size:24px!important;border-radius:5px}.overlay{background:#000000aa!important}.wrap .anison_info .next_on_air{width:100%;max-width:550px;background:0 0}.wrap .anison_info .next_on_air .orders_list{background:0;width:100%}.wrap .anison_info .next_on_air .orders_list .item{width:100%;background:0!important;padding:0;margin-bottom:5px;border-radius:7px;position:relative;height:73px}.wrap .anison_info .next_on_air .orders_list .item table{width:100%;top:0;left:0;background:#f0f0f0;padding:0;margin-bottom:5px;border-radius:7px;position:relative;height:73px;transition:background .4s}.wrap .anison_info .next_on_air .orders_list .item.trackingTune table{background:#2b83e3!important}.next_on_air .orders_list .item.premiere .info span,.next_on_air .orders_list .item.premiere .num,.next_on_air .orders_list .item.premiere .votes{color:#202020!important}.next_on_air .orders_list .item.premiere .info a{color:#916a00}.next_on_air .orders_list .item.trackingTune .info a,.next_on_air .orders_list .item:first-child.yourRequest .info a{color:#f9ff8f}.wrap .anison_info .next_on_air .orders_list .item:first-child.yourRequest table{transition:none;background:red!important}.wrap .anison_info .next_on_air .orders_list .item.yourRequest table{background:#114!important}.orders_list .info{display:flex;flex-flow:column;height:45px;justify-content:center}.wrap .anison_info .orders_list .info{display:flex;flex-flow:column;height:100%;align-items:center;justify-content:center}.orders_list .item{box-shadow:none!important}.wrap .anison_info .next_on_air .orders_list .item.premiere table{background:#ffeb34!important;position:relative}.yourRequest table:after{position:absolute;content:"";width:calc(100% - 6px);height:calc(100% - 3px);left:0;top:0;border:3px solid #8ef;border-radius:6px;background:rgba(106,230,255,.4);pointer-events:none;animation:90ms linear infinite alternate larax1}.wrap .orders_list .item .num{color:#202020;text-align:left;padding-left:5px;width:17px;overflow:hidden}.wrap .orders_list .item .poster{flex-basis:50px;padding:0}.wrap .orders_list .item .poster img{border-radius:6px;overflow:hidden;height:50px;width:50px;box-shadow:1px 1px 6px #777}.wrap .orders_list .item table{display:flex;width:100%;align-items:center}.wrap .orders_list .item table tbody{display:block;width:100%}.wrap .orders_list .item table tr{display:flex;align-items:center;justify-content:space-between}.wrap .anison_info .next_on_air .orders_list .item .info{flex:1;padding:0 0 0 10px;overflow:hidden}.wrap .anison_info .next_on_air .orders_list .item .info span{max-width:100%;width:100%}.wrap .anison_info .next_on_air .orders_list .trackMask{display:block;width:100%;height:17px;overflow:hidden}.wrap .anison_info .next_on_air .orders_list .trackMask span.track{text-overflow:unset;width:max-content!important;max-width:max-content!important;display:block}.wrap .anison_info .next_on_air .orders_list .trackMask span.track.is--scrollEnabled{overflow:visible;animation:12s linear scrolling1}.wrap .anison_info .next_on_air .orders_list .item .minus,.wrap .anison_info .next_on_air .orders_list .item .up{width:20px;padding:0}.wrap .anison_info .next_on_air .orders_list .item .minus a,.wrap .anison_info .next_on_air .orders_list .item .up a{padding:0}.wrap .orders_list .item .votes .vnum{color:#2ad014}.wrap .next_on_air .info span{font-weight:400;color:#121212}.wrap .next_on_air .info a{color:#bb7402}.settingBtn{position:fixed;z-index:999999;right:8px;bottom:8px;color:#202020;background-color:#fff;font-size:16px;line-height:0;border-radius:32px;cursor:pointer;transition:background .4s;user-select:none}.myownsettings.darkmode .myownsettings_inner,.myownsettings.darkmode h3,.settingBtn.darkmode{background-color:#202020;color:#fff}.settingBtn span{transition:.2s linear}.settingBtn:hover{background-color:#e9e9e9}.settingBtn:hover span{transform:rotate(35deg)}.settingBtn:active span{transform:rotate(180deg)}.myownsettings{position:fixed;z-index:999998;left:0;top:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;transition:.4s}.myownsettings.expanded{opacity:1;pointer-events:all}.myownsettings_inner{border-radius:5px;background:#fff;color:#303030;width:calc(90% - 32px);max-width:370px;height:calc(90% - 32px);max-height:540px;transition:.4s}.myownsettings ul{list-style:none;padding:0;overflow-y:auto;height:100%}.myownsettings ul li{margin:10px 0}.myownsettings ul li input{margin:0}.myownsettings ul li input[type=number]{width:38px;border:1px solid #a0a0a0;padding:3px;border-radius:3px;font-family:inherit}.myownsettings__label{display:flex;flex-flow:row-reverse;margin-top:16px}.myownsettings__label input{margin-right:4px}.myownsettings input[type=checkbox]+span{display:block;position:relative;cursor:pointer;user-select:none;padding-left:60px}.myownsettings button,.myownsettings input[type=radio]+span{position:relative;user-select:none;height:24px;padding:0 16px;cursor:pointer;transition:.4s}.myownsettings input[type=checkbox]:focus+span,.myownsettings input[type=radio]:focus+span{filter:drop-shadow(0 0 5px #20D9FF)}.myownsettings input[type=checkbox],.myownsettings input[type=radio]{position:absolute;appearance:none}.myownsettings input[type=checkbox]+span:before{content:"";display:block;position:absolute;top:0;left:0;width:32px;height:16px;border-radius:24px;background-color:#303030;transition:.4s}.myownsettings input[type=checkbox]+span:after{content:"";display:block;position:absolute;top:1px;left:2px;width:14px;height:14px;border-radius:50%;background-color:#707070;transition:.4s}.myownsettings input[type=checkbox]:checked+span:before{background-color:#0069ff}.myownsettings input[type=checkbox]:checked+span:after{left:16px;background-color:#adf}.myownsettings input[type=radio]+span{display:inline-flex;width:fit-content;align-items:center;justify-content:center;color:#a0a0a0;border:1px solid #a0a0a0;border-radius:4px}.myownsettings input[type=radio]:checked+span{background-color:#36c1ff;border-color:#36c1ff;color:#202020}.factors_for_brightening{display:flex;flex-flow:wrap}.factors_for_brightening label{display:block;width:48%}.myownsettings .factors_for_brightening input[type=checkbox]+span{padding-left:24px}.myownsettings .factors_for_brightening input[type=checkbox]+span:before{content:"";display:block;position:absolute;top:0;left:0;width:14px;height:14px;border-radius:3px;background-color:#303030;border:1px solid #fff;transition:.4s}.myownsettings .factors_for_brightening input[type=checkbox]+span:after{content:"";display:block;position:absolute;top:-4px;left:5px;width:7px;height:14px;border-radius:1px;transform:rotate(45deg);border-bottom:2px solid #fff;border-right:2px solid #fff;opacity:0;transition:.4s}.myownsettings .factors_for_brightening input[type=checkbox]:checked+span{color:#36c1ff}.myownsettings .factors_for_brightening input[type=checkbox]:checked+span:before{background-color:#36c1ff}.myownsettings .factors_for_brightening input[type=checkbox]:checked+span:after{opacity:1;background:0 0}.myownsettings button{display:inline-flex;width:fit-content;align-items:center;justify-content:center;color:#202020;border:1px solid #202020;background:#fff;border-radius:4px;font-family:inherit}.myownsettings.darkmode button{color:#fff;background:#202020;border:1px solid #fff}.anison_log{display:flex;position:fixed;width:40%;left:25%;top:15%;z-index:2000;background:#fff;box-shadow:3px 3px 10px #909090;padding:15px 2.5%;overflow:hidden;border-radius:5px;flex-flow:wrap}.anison_log.darkmode{background:#202020;color:#fff;box-shadow:3px 3px 10px #101010}.icon-minus:before,.icon-plus:before{position:absolute;font-size:20px;color:#19ff80;width:12px;line-height:12px;height:12px;display:block;left:0;top:0}.anison_log h1{width:80%;margin:0;vertical-align:middle}.anison_log__btn{width:20%;display:flex;justify-content:end;align-items:center}.anison_log__btn span{display:block;padding:4px 8px;border:1px solid grey;border-radius:4px;cursor:pointer}.anison_log__container{width:96%;padding:2%;margin:10px auto;height:calc(140px + 10vh);overflow-y:scroll;font-family:inherit;border:1px solid grey;border-radius:4px}.anison_log__remarks input[type=text]{width:calc(96% - 2px);font-family:inherit;padding:1% 2%;border:1px solid grey;border-radius:4px}.darkmode .anison_log__remarks input[type=text]{border:1px solid #b0b0b0;background-color:#202020;color:#fff}.dimmeringMat{z-index:3000000;position:fixed;width:100%;height:100%;background:#000;transition:opacity 1s;left:0;top:0}.anime_list .item a,.icon-minus,.icon-plus{background:0 0;position:relative}.icon-plus:before{content:"+"}.icon-minus:before{content:"-"}.anime_list .item a{padding-left:0;transition:.4s}.anime_list .item.active{border:none}.anime_list .item.active a{color:#f90}.anime_list .item a:hover,.anime_list .item.active a{background:0 0;position:relative;padding-left:8px}.anime_list .item a:before{content:"";display:block;position:absolute;left:0;top:0;background-color:#f90;border-radius:4px;width:2px;height:100%;transition:.4s;transform-origin:top;transform:scale(0)}.anime_list .item a:hover:before,.anime_list .item.active a:before{transform:scale(1)}.anison_info .on_air{left:620px}.anison_info .orders_list{width:610px}.anison_info .order_by{left:870px}.main_radio_block .anison_info .track_info a{display:-webkit-box;overflow:hidden;max-height:52px;-webkit-box-orient:vertical;box-orient:vertical;-webkit-line-clamp:2}.anison_catalog .search .textbox{width:400px}.anison_catalog .search .searchbutton.anime{right:127px}.anison_catalog .search .searchbutton.track{right:86px}.wind_vote{animation:.4s cubic-bezier(0,.77,.58,.99) forwards popup_appearance}.darkmode.wind_vote,.darkmode.wind_vote .btn,.darkmode.wind_vote a{background:#202020;color:#fff}@keyframes popup_appearance{0%{transform:scale(.01)}40%{transform:scale(1.2)}90%{transform:scale(.95)}100%{transform:scale(1)}}`;
 var newcss = document.createElement("style");
 newcss.textContent = minifiedCss;
 document.querySelector("body").appendChild(newcss);
 
 setTimeout(()=>{
    console.clear('');
    $('#bot_panel').addClass('expanded');
    $('div.wind_vote, .overlay_vote').css('display','none');
    console.log('Welcome to anison.fm modifier!\nLast modified: 2025-05-17');
    setTimeout(()=>{anisonlog2.forEach(f=>{f.update();});},1000);
 },200);
 
 // JS ENDS 
 