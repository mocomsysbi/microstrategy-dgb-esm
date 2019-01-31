(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.Container","mstrmojo._BindTargetChildren","mstrmojo.TabButton","mstrmojo.TabStripBase");var _A=mstrmojo.array;function _hideCheck(me,len){if(me.autoHide){me.set("visible",len);}}mstrmojo.TabStrip=mstrmojo.declare(mstrmojo.TabStripBase,[mstrmojo._BindTargetChildren],{scriptClass:"mstrmojo.TabStrip",markupString:'<div id="{@id}" class="mstrmojo-TabStrip {@cssClass}" style="{@cssText}"></div>',markupSlots:{containerNode:function(){return this.domNode;}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},autoHide:true,tabButtonClass:"TabButton",init:function init_TabStrip(props){if(props&&props.autoHide){props.visible=false;}this._super(props);},addTabButtons:function addTabButtons(models,index){var tps=this.targetProps||{},t=tps.childTitle||"n",c=tps.childColor||"tbc",Sc=this.tabButtonClass,btns=[],stack=this.target,oc=function(){stack.set("selected",this.target);};mstrmojo.requiresCls("mstrmojo."+Sc);for(var i=0,len=(models&&models.length)||0;i<len;i++){var b=models[i],ttl=b[t];if(ttl){var btn=mstrmojo.insert({scriptClass:"mstrmojo."+Sc,title:ttl,backgroundColor:b[c],target:b,onclick:oc});btns.push(btn);}}if(btns.length){_hideCheck(this,btns.length);this.addChildren(btns,index);}this.selectionChange();},removeTabButton:function rmvTabBtn(tgt){var btns=_A.filter(this.children,function(btn){return(btn.target===tgt);},{max:1});if(btns&&btns[0]){_hideCheck(this,btns.length-1);this.removeChildren(btns[0]);btns[0].destroy();}},clearButtons:function(){var toDelete=_A.map(this.children,function(item){return item.id;});this.removeChildren();_A.forEach(toDelete,function(id){if(mstrmojo.all[id]){mstrmojo.all[id].destroy();}});}});})();