(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.architect.ui.panels.UnitsPanel","mstrmojo.architect.ui.ElementList");var $A=mstrmojo.array,$H=mstrmojo.hash,$DOM=mstrmojo.dom,STR_PROJECT_TABLES="Filters";mstrmojo.architect.ui.panels.ElementsPanel=mstrmojo.declare(mstrmojo.architect.ui.panels.UnitsPanel,null,{scriptClass:"mstrmojo.architect.ui.panels.ElementsPanel",title:STR_PROJECT_TABLES,cssClass:"elementsPanel",init:function init(props){this._super(props);var searchBox=this.children[0];searchBox.set("cssClass","mstrmojo-ar-elementsPanel-searchBox");},onPanelSearch:function onPanelSearch(evt){var result=[],searchValue=evt.searchValue,contentWidget=this.contentWidget,oldItems=contentWidget._oldItems=contentWidget._oldItems||contentWidget.items,input=searchValue.toUpperCase();if(input.length>0){$A.forEach(oldItems,function(attribute){if(attribute.n.toUpperCase().indexOf(input)>-1){result.push($H.clone(attribute));}});}else{result=oldItems;}contentWidget.set("items",result);},getContentWidget:function getContentWidget(){return{scriptClass:"mstrmojo.architect.ui.ElementList",cssText:"overflow-y: auto; max-height:223px;",onclick:function onclick(evt){try{if(evt.hWin){$DOM.stopPropogation(evt.hWin,evt.e);}var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),item=$DOM.findAncestorByAttr(target,"idx",true,this.domNode),idx=item&&parseInt(item.value,10);if(idx!==null&&!isNaN(idx)){if(!($DOM.ctrlKey(evt.hWin,evt.e)||$DOM.isMetaKey(evt.hWin,evt.e))){this.singleSelect(idx);}else{var m=(this.selectedIndices[idx])?"remove":"add";this[m+"Select"](idx);}}}catch(ex){mstrApp.onerror(ex);}},ondblclick:function ondblclick(evt){var elementPanel=this.parent;this.onclick(evt);if(elementPanel.alias==="AvailablePanel"){elementPanel.parent.buttonBox.Add.onclick();}else{elementPanel.parent.buttonBox.Remove.onclick();}}};},setElementsList:function setElementsList(elements){var list=this.contentWidget;list.setElementsList(elements);},selectedElementIndex:function selectedElementIndex(){var list=this.contentWidget;return list.selectedIndex;},selectedElementItem:function selectedElementItem(){var list=this.contentWidget;return list.getSelectedItems();}});}());