(function(){mstrmojo.requiresCls("mstrmojo.dom");var $DOM=mstrmojo.dom;mstrmojo.ui.pathbar._PreAppExit=mstrmojo.provide("mstrmojo.ui.pathbar._PreAppExit",{_mixinName:"mstrmojo.ui.pathbar._PreAppExit",onmouseover:function onmouseover(evt){if(this._super){this._super(evt);}if(this.handleMouseOver){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),item=$DOM.findAncestorByAttr(target,"idx",true,this.domNode),idx=item&&parseInt(item.value,10),selectedItem=this.items[idx];this.handleMouseOver(evt,selectedItem);}},onclick:function onclick(evt){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),item=$DOM.findAncestorByAttr(target,"idx",true,this.domNode),idx=item&&parseInt(item.value,10),selectedItem=this.items[idx];if(this.handleClick){var exit=this.handleClick(evt,selectedItem);if(exit){evt.cancel();return ;}}if(this._super){this._super(evt);}if(!target.attributes.menu&&selectedItem&&selectedItem.en!==false){var execFn=function(){mstrmojo.form.sendLink(selectedItem.href,selectedItem.target);};if(mstrApp.onNavigateOut(selectedItem,execFn)!==true){execFn();}return false;}return true;}});}());