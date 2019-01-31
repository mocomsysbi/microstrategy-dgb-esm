(function(){mstrmojo.requiresCls("mstrmojo.Box","mstrmojo.Label","mstrmojo.Button","mstrmojo.Editor");mstrmojo.requiresDescs(221);var $ENUM_DATA_CHANGE_EVENTS=mstrmojo.warehouse.EnumDataChangeEvents,$CSS=mstrmojo.css;mstrmojo.warehouse.ui.WaitBoxTip=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.warehouse.ui.WaitBoxTip",cssClass:"mstrmojo-WaitBoxTip",visible:false,draggable:false,showTitle:false,zIndex:9997,displayMsg:null,position:null,cancelCallback:null,extraCls:undefined,width:null,isHostedWithin:false,adjustCorners:null,children:[{scriptClass:"mstrmojo.Box",cssClass:"waitBoxTip-icon",alias:"icon"},{scriptClass:"mstrmojo.Label",cssClass:"waitBoxTip-msg",alias:"msgfield"},{scriptClass:"mstrmojo.Label",cssClass:"waitBoxTip-cancel",alias:"cancelBtn",text:mstrmojo.desc(221,"Cancel")}],postBuildRendering:function postBuildRendering(){var rtn=this._super();var me=mstrmojo.all.WaitBoxTip;me.closeWait();if(!me.isHostedWithin){var node=me.parentDomNode=document.body;me.domNode&&node.appendChild(me.domNode);}mstrmojo.dom.attachEvent(window,"resize",function(){if(me&&me.adjustCorners){me.adjustCorners();}});return rtn;},ondisplayMsgChange:function ondisplayMsgChange(){var maxLength=10,msg=this.displayMsg.length>maxLength?"":this.displayMsg;this.msgfield.set("text",msg);},onwidthChange:function onwidthChange(){if(this.domNode){this.domNode.firstElementChild.style.width=this.width;}},onpositionChange:function onpositionChange(){this.set("left",this.position.left);this.set("top",this.position.top);},showWait:function showWait(config){this.cancelCallback=config.cancelCallback;this.cancelBtn.set("visible",!!(config&&config.showCancel));this.cancelBtn.onclick=function(){if(this.parent.cancelCallback){this.parent.cancelCallback();}this.parent.closeWait();};if(config&&config.position){this.set("position",config.position);}if(config&&config.extraCls){if(this.domNode){$CSS.addClass(this.domNode.firstElementChild,config.extraCls);}else{this.cssClass+=" "+config.extraCls;}}else{if(this.domNode){$CSS.removeClass(this.domNode.firstElementChild,"extraCls-.*?");}}this.set("displayMsg",(config&&config.message)||mstrmojo.desc(11960,"Loading Data..."));this.open();if(config&&config.width){this.set("width",config.width);this.onwidthChange();}return this;},closeWait:function closeWait(){this.close();}});}());