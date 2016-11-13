(function(){
  var $=function(id){return document.getElementById(id);}
  var _$=function(cls){return document.getElementsByClassName(cls);}
  var msg = "";
  var cookiemsg = "";
  var interval = 10;//unit minute
  var intervalID = "";
  var countDown = 0;
  var intervalCountDownID = "";
  var chatContentLength = 0;
  var actions = {
    cookieName:"ZSMessage",
    $ok:$('ok'),
    $message:$('message'),
    $jssendmsg:$('js-send-msg'),
    addHtml:function(){
      var DyAutoMessageDiv = document.createElement('div');
      DyAutoMessageDiv.className="DyAutoMessageDiv";

      var ipt = document.createElement("textarea");
    	//ipt.setAttribute("type","textarea");
    	ipt.setAttribute("name","DyAutoMessageTxt");
      ipt.setAttribute("class","DyAutoMessageTxt");
      ipt.setAttribute("id","DyAutoMessageTxt");//
      ipt.setAttribute("placeholder","请输入连续发送的弹幕！！！");
      cookiemsg = actions.getCookie(actions.cookieName);
      ipt.value = cookiemsg;

      var btn = document.createElement("input");
      btn.setAttribute("type","button");
      btn.setAttribute("class","DyAutoMessageBtn");
      btn.setAttribute("name","DyAutoMessageBtn");
      btn.setAttribute("id","DyAutoMessageBtn");
      btn.setAttribute("value","确定");

      DyAutoMessageDiv.appendChild(ipt);
      DyAutoMessageDiv.appendChild(btn);

      var hr = document.createElement("hr");
      hr.setAttribute("class", "DyAutoMessageHr");

      var DyAutoMessageConditionDiv = document.createElement("div");
      DyAutoMessageConditionDiv.className = "DyAutoMessageConditionDiv";

      var nlbl = document.createElement("label");
      nlbl.setAttribute("for", "nipt");
      nlbl.innerHTML = "每隔 ";

      var unitlbl = document.createElement("label");
      unitlbl.innerHTML = " 分/次";

      var countdownlbl = document.createElement("label");
      countdownlbl.setAttribute("id", "DyAutoMessageCountDownLbl")
      countdownlbl.setAttribute("class", "DyAutoMessageCountDownLbl")
      //countdownlbl.innerHTML = "还剩:0秒";
      actions.setcountdown(0, countdownlbl);

      var nipt = document.createElement("input");
      nipt.setAttribute("type", "number");
      nipt.setAttribute("id", "nipt");
      nipt.setAttribute("class", "nipt");
      nipt.setAttribute("value", 10);

      DyAutoMessageConditionDiv.appendChild(nlbl);
      DyAutoMessageConditionDiv.appendChild(nipt);
      DyAutoMessageConditionDiv.appendChild(unitlbl);
      DyAutoMessageConditionDiv.appendChild(countdownlbl);

      actions.$jssendmsg.appendChild(hr);
      actions.$jssendmsg.appendChild(DyAutoMessageDiv);
      actions.$jssendmsg.appendChild(DyAutoMessageConditionDiv);

      btn.addEventListener('click', function(){
        console.log(ipt.value);

        msg = ipt.value;
        interval = parseFloat(nipt.value);

        if(intervalID != ""){
          actions.endSend();
        }
        actions.startSend();
      }, true);

      // _$('c-list')[0].onchange = function(){
      //   console.log(1111);
      // };
    },
    findSendBtn: function(){
      var nodes = actions.$jssendmsg.childNodes;
      for(var i = 0 ; i < nodes.length ; i++){
        if(!nodes[i].dataset || nodes[i].dataset.type != 'send')continue;
        console.log(nodes[i]);
        nodes[i].click();
      }
    },
    send : function(){
      countDown = interval*60;
      var dyDmTextAreaDom = document.getElementsByClassName("cs-textarea")[0];
      msg = msg.endWith("~") ? msg.substring(0, msg.length -1) : msg + "~";
      dyDmTextAreaDom.value = msg;
      actions.findSendBtn();
    },
    countdown: function(){
      if(countDown >=0){
        actions.setcountdown(countDown--);
  		}
    },
    setcountdown: function(countDown, lbldom){
      actions.chatContentListener();
      lbldom = lbldom || $('DyAutoMessageCountDownLbl');
      if(countDown == 0){
        lbldom.innerHTML = "已停止";
      }else{
        lbldom.innerHTML = "还剩:" + countDown-- + "秒";
      }
    },
    chatContentListener: function(){
       var children = _$('c-list')[0].childNodes;
       if(children.length != chatContentLength){
         chatContentLength = children.length;
         var ih = children[children.length - 1].getElementsByTagName('a')[1].text;
         console.log(ih);
       }
    },
    startSend: function(){
      if(msg.Trim() != ""){
        if(msg != cookiemsg){
          actions.setCookie(actions.cookieName, msg, "7d");
        }
        countDown = interval*60;
        intervalID = window.setInterval(actions.send, interval*60*1000);
        intervalCountDownID = window.setInterval(actions.countdown, 1000);
      }else{
        actions.setcountdown(0);
      }
    },
    endSend: function(){
      window.clearInterval(intervalID);
      window.clearInterval(intervalCountDownID);
    },
    setCookie: function(name,value,time){
      var strsec = actions.getsec(time);
      var exp = new Date();
      exp.setTime(exp.getTime() + strsec*1);
      document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },
    getCookie: function(name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
      else
      return "";
    },
    delCookie: function(name){
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval=getCookie(name);
      if(cval!="")
      document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    },
    getsec:function(str){
      var str1=str.substring(1,str.length)*1;
      var str2=str.substring(0,1);
      if (str2=="s")
      {
        return str1*1000;
      }
      else if (str2=="h")
      {
        return str1*60*60*1000;
      }
      else if (str2=="d")
      {
        return str1*24*60*60*1000;
      }
    },
    init: function(){
      actions.addHtml();
    }
  }
  actions.init();
})();

String.prototype.endWith=function(str){
  var reg=new RegExp(str+"$");
  return reg.test(this);
}

String.prototype.trimEnd = function(c)
{
    return this.replace(/(\s*$)/g,"");
}

String.prototype.trimStart=function(){
　　return this.replace(/(^\s*)/g,"");
}

String.prototype.Trim= function(c)
{
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
