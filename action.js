(function(){
  var $=function(id){return document.getElementById(id);}
  var msg = "";
  var interval = 10;//unit minute
  var intervalID = "";
  var actions = {
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
      unitlbl.innerHTML = " 分 发送一次";

      var nipt = document.createElement("input");
      nipt.setAttribute("type", "number");
      nipt.setAttribute("id", "nipt");
      nipt.setAttribute("value", 10);

      DyAutoMessageConditionDiv.appendChild(nlbl);
      DyAutoMessageConditionDiv.appendChild(nipt);
      DyAutoMessageConditionDiv.appendChild(unitlbl);

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
    },
    findSendBtn: function(){
      var nodes = actions.$jssendmsg.childNodes;
      for(var i = 0 ; i < nodes.length ; i++){
        if(!nodes[i].dataset || nodes[i].dataset.type != 'send')continue;
        console.log(nodes[i]);
        nodes[i].click();
      }
      //console.log(nodes);
    },
    send : function(){
      if(msg.Trim() != ""){
        var dyDmTextAreaDom = document.getElementsByClassName("cs-textarea")[0];
        msg = msg.endWith("~") ? msg.substring(0, msg.length -1) : msg + "~";
        dyDmTextAreaDom.value = msg;
        actions.findSendBtn();
      }
    },
    startSend: function(){
      //actions.send();
      intervalID = window.setInterval(actions.send, interval*60*1000);
    },
    endSend: function(){
      window.clearInterval(intervalID);
    },
    init: function(){
      // actions.$ok.addEventListener('click', function(){
      //   console.log(actions.$test);
      // }, true);
      actions.addHtml();
      // actions.startSend();
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
