(function(){mstrmojo.requiresCls("mstrmojo.ui.PopupButton","mstrmojo._HasTooltip","mstrmojo.ui._IsPulldown","mstrmojo.ui.PopupList","mstrmojo.hash","mstrmojo.dom","mstrmojo.string","mstrmojo.css","mstrmojo.array","mstrmojo._CanAutoClose");var $CSS=mstrmojo.css,$ARR=mstrmojo.array,$DOM=mstrmojo.dom,$STR=mstrmojo.string;function setRichTooltip(content){this.set("richTooltip",{cssClass:"vi-regular vi-tooltip-C",content:$STR.encodeHtmlString(content)});}mstrmojo.ui.Pulldown=mstrmojo.declare(mstrmojo.ui.PopupButton,[mstrmojo.ui._IsPulldown,mstrmojo._HasTooltip],{scriptClass:"mstrmojo.ui.Pulldown",onitemSelected:mstrmojo.emptyFn,onSelectedItemChange:mstrmojo.emptyFn,useRichTooltip:true,allowHTML:false,useDarkTheme:false,init:function init(props){this._super(props);$CSS.addWidgetCssClass(this.getPopupList(),"ctrl-popup-list");},initChildren:function initChildren(){this.children=this.getPopupListConfig();this._super();},postBuildRendering:function postBuildRendering(){if(this._super){this._super();}var selItem=this.getSelectedItem();if(selItem){setRichTooltip.call(this,selItem.n);}},showTooltip:function showTooltip(e,win){var refNode=this.selectedNode,ttp=this.richTooltip;if(refNode.offsetWidth>=refNode.scrollWidth){return ;}if(!ttp.top){var position=$DOM.position(this.selectedNode);ttp.top=position.y-3;ttp.left=position.x+position.w+6;}if(this._super){this._super(e,win);}},getSelectedItem:function getSelectedItem(){var items=this.items;return items&&items[this.selectedIndex];},selectItemByField:function selectItemByField(fieldName,fieldValue){this.set("selectedIndex",$ARR.find(this.items||[],fieldName,fieldValue));},getPopupWidget:function getPopupWidget(){return this.list;},getPopupList:function getPopupList(){return this.list;},_set_items:function _set_items(n,v){var previousItems=this.items;this.items=v;delete this.selectedIndex;if(previousItems!==v){var hr=this.hasRendered;if(hr){this.refresh();}return true;}return false;},onclick:function onclick(evt){this._super(evt);var me=this,popupWidget=me.getPopupWidget();me.mw=me.mw||function(e){if(!$DOM.contains(popupWidget.domNode,$DOM.eventTarget(self,e),true,document.body)){popupWidget.close();$DOM.detachEvent(document,$DOM.isFF?"DOMMouseScroll":"mousewheel",me.mw);}};$DOM.attachEvent(document,$DOM.isFF?"DOMMouseScroll":"mousewheel",me.mw);if(me.focusOnPopup){popupWidget.domNode.focus();}},_set_selectedIndex:function _set_selectedIndex(n,v,suppressEvt){if((v!==0&&!v)||v<0){return false;}var selectedIndex=this.selectedIndex=v,popupList=this.getPopupList(),items=popupList&&popupList.items,selectedItem=items&&items[selectedIndex],selectedNode=this.selectedNode;if(selectedItem&&selectedItem.dsbld){return false;}if(popupList){mstrmojo._ListSelections._set_selectedIndex.call(popupList,"selectedIndex",selectedIndex,suppressEvt);}if(selectedNode&&items&&items[selectedIndex]){selectedNode.innerHTML=this.getPulldownTextInnerHTML(items[selectedIndex]);selectedNode.title=items[selectedIndex].title||"";}if(items&&items[selectedIndex]){if(this.focusOnPopup&&popupList&&!popupList.closeAfterSelection){popupList.itemsContainerNode.children[selectedIndex].style.color="";}else{this.onitemSelected(items[selectedIndex],selectedIndex);}}return true;},getPulldownTextInnerHTML:function getPulldownTextInnerHTML(item){return this.allowHTML?item.n:$STR.encodeHtmlString(item.n,true);},postselectedIndexChange:function postselectedIndexChange(evt){var newValue=evt.value,oldValue=evt.valueWas;if(newValue!==oldValue){var items=this.items,newItem=items[newValue];if(newItem){setRichTooltip.call(this,newItem.n);}this.onSelectedItemChange(newItem,items[oldValue]);}},getPopupConfig:function getPopupConfig(){var config=this._super();config.useDarkTheme=this.useDarkTheme;return config;},getPopupListConfig:function getPopupListConfig(){return{scriptClass:"mstrmojo.ui.PopupList",alias:"list",selectionPolicy:"reselect",locksHover:true,useRichTooltip:true,showTooltipForLargeText:true,scrollNodeMaxHeight:this.scrollNodeMaxHeight,listHooks:{select:function select(el,item,index){this.parent.set("selectedIndex",index);if(this.visible&&this.closeAfterSelection&&!this.selectedItem.dsbld){this.close();}}},getItemProps:function getItemProps(item,idx){var props=mstrmojo._IsList.getItemProps.call(this,item,idx);props.style=this.parent.itemCssText||"";return props;},suppressClose:function suppressClose(target){return mstrmojo._CanAutoClose.suppressClose.call(this,target)||$DOM.contains(this.parent.domNode,target,true,document.body);}};},children:[]});mstrmojo.ui.Pulldown.newPulldown=function newPulldown(items,fnChange,selectedIndex,props,skipInstantiation){props=props||{};props.items=items;var pulldown;if(skipInstantiation===true){pulldown=mstrmojo.hash.copy({scriptClass:"mstrmojo.ui.Pulldown",selectedIndex:selectedIndex||0},props);}else{pulldown=new mstrmojo.ui.Pulldown(props);if(selectedIndex!==undefined){pulldown.set("selectedIndex",selectedIndex);}}pulldown.onSelectedItemChange=fnChange||mstrmojo.emptyFn;return pulldown;};}());