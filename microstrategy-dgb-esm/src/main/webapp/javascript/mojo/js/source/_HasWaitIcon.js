(function(){mstrmojo.requiresCls("mstrmojo.EnumReadystate");var $READYSTATE=mstrmojo.EnumReadystate;var DELAY=1200;var fnToggle=function(v,w){if(w){w.style.display=v?"block":"none";}};mstrmojo._HasWaitIcon={waitHandle:null,postBuildRendering:function pstBldRndr(){if(!this._rsl){var id=this.id;this._rsl=this.defn.attachEventListener("readyStateChange",id,function(evt){if(!this.hasRendered){return ;}switch(evt.value){case $READYSTATE.WAITING:if(!this.waitIcon&&this.domNode){var icon=document.createElement("div");icon.className="mojo-overlay-wait";icon.innerHTML='<div class="overlay"></div><div class="icon"></div>';this.domNode.appendChild(icon);this.addSlots({waitIcon:icon});}var wi=this.waitIcon;if(DELAY){this.waitHandle=window.setTimeout(function(){if(mstrmojo.all[id]){mstrmojo.all[id].waitHandle=null;}fnToggle(true,wi);},DELAY);}else{fnToggle(true,wi);}break;case $READYSTATE.IDLE:if(this.waitHandle){window.clearTimeout(this.waitHandle);this.waitHandle=null;}fnToggle(false,this.waitIcon);break;}});}return this._super();}};}());