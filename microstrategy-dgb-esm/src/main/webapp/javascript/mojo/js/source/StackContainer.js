(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.Container","mstrmojo._CanRenderChildrenOnShow");var _A=mstrmojo.array;mstrmojo.StackContainer=mstrmojo.declare(mstrmojo.Container,[mstrmojo._CanRenderChildrenOnShow],{scriptClass:"mstrmojo.StackContainer",isStack:true,markupString:'<div id="{@id}" class="mstrmojo-StackContainer {@cssClass}" style="{@cssText}"></div>',markupMethods:{onwidthChange:function(){if(!isNaN(parseInt(this.width))){this.domNode.style.width=this.width;}},onheightChange:function(){if(!isNaN(parseInt(this.height))){this.domNode.style.height=this.height;}},onborderChange:function(){this.domNode.style.border=this.border||"";},onbackgroundChange:function(){this.domNode.style.background=this.background||"";}},markupSlots:{containerNode:function(){return this.domNode;}},_set_selected:function stsel(n,v){var was=this.selected;if(was===v){return false;}if(was){was.set("visible",false);}this.selected=v;if(v){v.set("visible",true);}return true;},addChildren:function ac(ch,idx,silent){var sel=this.selected,c;for(var i=0,len=(ch&&ch.length)||0;i<len;i++){c=ch[i];if(c&&c.set){c.set("visible",c===sel);}}return this._super(ch,idx,silent);},removeChildren:function rc(c,silent){var ret=this._super(c,silent);if(!c||(c===this.selected)){this.set("selected",null);}return ret;},destroy:function dst(skipCleanup){this._super(skipCleanup);this.selected=null;},renderMode:"onshow"});})();