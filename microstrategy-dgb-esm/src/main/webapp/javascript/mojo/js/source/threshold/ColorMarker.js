(function(){mstrmojo.requiresClsP("mstrmojo","Widget","css","dom","num");var $CSS=mstrmojo.css,$DOM=mstrmojo.dom,$NUM=mstrmojo.num;mstrmojo.threshold.ColorMarker=mstrmojo.declare(mstrmojo.Widget,[mstrmojo.ui.menus._HasMenuPopup],{scriptClass:"mstrmojo.threshold.ColorMarker",markupString:'<div class = "marker {@cssClass}" id="{@id}" style="{@cssText}" mstrAttach:contextmenu,mousedown,mouseover,mouseout></div>',markupMethods:{onleftChange:mstrmojo.Widget.leftMarkupMethod},hovered:false,selected:false,index:undefined,position:0,updatePosition:function updatePosition(pos){this.set("position",pos);},compValue:undefined,updateCompValue:function updateCompValue(val){this.set("compValue",val);},realValue:undefined,updateRealValue:function updateRealValue(val){this.set("realValue",val);},select:function(){this.set("selected",true);},unselect:function(){this.set("selected",false);},onselectedChange:function onselectedChange(v){if(v.valueWas===false&&v.value===true){$CSS.toggleClass(this.domNode,"selected",true);this.parent.onMarkerSelected(this.index);}else{$CSS.toggleClass(this.domNode,"selected",false);this.parent.onMarkerUnselected(this.index);}this.parent.onMarkerUnhovered(this.index);},oncontextmenu:function oncontextmenu(evt){$DOM.preventDefault(window,evt.e);var marker=this,colorSlider=marker.parent.parent;var menuCfg=new mstrmojo.ui.menus.MenuConfig({position:$DOM.getMousePosition(evt.e,evt.hWin),isHostedWithin:false});menuCfg.addMenuItem(mstrmojo.desc(629,"Delete"),"",function(){colorSlider.bands.remove(marker.index);colorSlider.markers.remove(marker.index);colorSlider.update();});this.openPopup(menuCfg.newInstance());},onmousedown:function onmousedown(evt){this.set("selected",!this.selected);},onmouseover:function onmouseover(){this.set("hovered",true);},onmouseout:function onmouseout(){this.set("hovered",false);},onhoveredChange:function onhoveredChange(v){if(!this.selected){if(v.valueWas===false&&v.value===true){$CSS.toggleClass(this.domNode,"selected",true);this.parent.onMarkerHovered(this.index);}else{$CSS.toggleClass(this.domNode,"selected",false);this.parent.onMarkerUnhovered(this.index);}}}});}());