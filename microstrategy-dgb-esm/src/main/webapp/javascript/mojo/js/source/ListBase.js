(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.dom","mstrmojo.Widget","mstrmojo._ListSelections");var $DOM=mstrmojo.dom;mstrmojo.ListBase=mstrmojo.declare(mstrmojo.Widget,[mstrmojo._ListSelections],{scriptClass:"mstrmojo.ListBase",selectionPolicy:null,itemRenderer:null,icnCssText:"",icnCss:"",markupString:'<div id="{@id}" tstid="{@tstid}" class="mstrmojo-ListBase {@cssClass}" style="{@cssText}" mstrAttach:click,dblclick,mousedown,mouseover,mouseout,contextmenu><div class="{@icnCss}" style="{@icnCssText}">{@itemsHtml}</div></div>',markupSlots:{itemsContainerNode:function itemsContainerNode(){return this.domNode.firstChild;},scrollboxNode:function scrollboxNode(){return this.domNode;}},markupMethods:{onvisibleChange:mstrmojo.Widget.visibleMarkupMethod,onheightChange:mstrmojo.Widget.heightMarkupMethod,onwidthChange:mstrmojo.Widget.widthMarkupMethod},autoHide:false,itemsContainerNode:null,_markupPrefix:null,_markupSuffix:null,_itemPrefix:null,_itemSuffix:null,init:function init(props){this._super(props);if(this.autoHide){this.visible=!!(this.items&&this.items.length);}},buildRendering:function buildRendering(){this.itemsHtml="";var len=(this.renderOnScroll?this.items&&((this.renderIndex+1)*this.renderBlockSize):this.items&&this.items.length);if(len){this.itemsHtml=this._buildItemsMarkup(0,len-1,this._markupPrefix&&this._markupPrefix(),this._markupSuffix&&this._markupSuffix(),this._itemPrefix&&this._itemPrefix(),this._itemSuffix&&this._itemSuffix()).join("");}this._super();delete this.itemsHtml;this.addSlots({itemsNode:this.itemsContainerNode.firstChild});},_buildItemsMarkup:function _buildItemsMarkup(start,end,markupPrefix,markupSuffix,itemPrefix,itemSuffix){var markup=[],count=0;markup[count++]=markupPrefix||"";var ir=this.itemRenderer,fn=ir&&ir.render;if(fn&&typeof fn==="function"){var items=this.items,stop=Math.min(end+1,((items&&items.length)||0)),i;for(i=start;i<stop;i++){markup[count++]=itemPrefix||"";markup[count++]=fn(items[i],i,this);markup[count++]=itemSuffix||"";}}markup[count+1]=markupSuffix||"";return markup;},onselectionChange:function onselectionChange(evt){if(!evt){return ;}var ir=this.itemRenderer;if(!ir){return ;}var items=this.items;if(evt.added&&evt.added.length>0&&items.length>0&&!mstrmojo.array.some(evt.added,function(index){return !items[index]||!items[index].dsbld;})){return ;}var unsel=ir.unselect,its=this.items||[],rem=evt.removed,ix,po,el,j,jLen;if(unsel&&rem){for(j=0,jLen=rem.length;j<jLen;j++){ix=rem[j];if(typeof (ix)==="object"){po=(ix.idx==0)?0:ix.positions;ix=ix.idx;}else{po=ix;}el=this._getItemNode(po);if(el){unsel(el,its[ix],po,this);}}}var sel=ir.select,added=evt.added,i,len;if(sel&&added){for(i=0,len=added.length;i<len;i++){ix=added[i];if(typeof (ix)==="object"){po=(ix.idx==0)?0:ix.positions;ix=ix.idx;}else{po=ix;}el=this._getItemNode(po);if(el){sel(el,its[ix],po,this);}}}if(this.onchange){this.onchange({added:evt.added,removed:evt.removed});}},_set_items:function _set_items(n,v){this.renderIndex=0;if(this.autoHide){this.set("visible",!!(v&&v.length));}var was=this.items;this.items=v;if(was!==v){var hr=this.hasRendered;if(hr){this.unrender(false);}this.clearSelect();if(hr){this.render();}return true;}return false;},onItemContextMenu:mstrmojo.emptyFn,oncontextmenu:function oncontextmenu(evt){$DOM.preventDefault(window,evt.e);var target=evt.getTarget(),item=this.getItemFromTarget&&this.getItemFromTarget(target);if(item){if(this.onItemContextMenu(item,evt)){evt.cancel();}}},_getItemNode:function _getItemNode(idx){var itemsNode=this.itemsContainerNode;return(itemsNode&&itemsNode.childNodes[idx])||null;},renderOnScroll:false});}());