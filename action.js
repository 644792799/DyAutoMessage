(function(){
  var $=function(id){return document.getElementById(id);}
  var msg = "";
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

      actions.$jssendmsg.appendChild(DyAutoMessageDiv);

      btn.addEventListener('click', function(){
        console.log(ipt.value);
        msg = ipt.value;

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
      intervalID = window.setInterval(actions.send, 600000);
    },
    endSend: function(){
      window.clearInterval(intervalID);
    },
    init: function(){
      // actions.$ok.addEventListener('click', function(){
      //   console.log(actions.$test);
      // }, true);
      actions.addHtml();
      actions.startSend();
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
