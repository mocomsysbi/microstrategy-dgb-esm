(function(){mstrmojo.requiresCls("mstrmojo.Editor","mstrmojo.ui.SearchablePulldown","mstrmojo.vi.ui.DatasetUnitMenuUtils","mstrmojo.hash","mstrmojo.array","mstrmojo.string","mstrmojo.DataGrid");var ITEM_CSS=" ReplaceObjectEditor-item ",ACTIONS={REMOVE:1,KEEP:2,NO_REPLACE:3},$H=mstrmojo.hash,$A=mstrmojo.array,$S=mstrmojo.string,$DS_UTILS=mstrmojo.vi.ui.DatasetUnitMenuUtils,ID="did";function isNDE(item){return item.t===47&&item.st===12033;}function extraManipulation(unit,editor){var result=[],isInCubes=function(did){return $A.find(unit.cubes,"did",did)>-1;};if(unit.da||unit.um||unit.de||isNDE(unit)){result.push({n:mstrmojo.desc(11832,"Keep existing definition"),did:ACTIONS.KEEP,cls:ITEM_CSS});}if(!editor.source.all&&unit.cubes.length>1&&!(unit.cubes.length===2&&isInCubes(editor.source.did)&&isInCubes(editor.target.did))){result.push({n:mstrmojo.desc(11834,"Do not replace"),did:ACTIONS.NO_REPLACE,cls:ITEM_CSS});}result.push({n:(typeof (mstrApp)!=="undefined"&&mstrApp.pageName==="rwd")?mstrmojo.desc(14556,"Remove from document"):mstrmojo.desc(15472,"Remove from dossier"),did:ACTIONS.REMOVE,cls:ITEM_CSS});return result;}function autoMatch(unit,items){var matched={id:null,n:null,k:null,nr:null,r:null},item,did,i;for(i=0;i<items.length;i++){item=items[i];did=item.did;if(item.did===unit.did){matched.id=item;break;}else{if(!matched.n&&item.n===unit.n){matched.n=item;}else{switch(item.did){case ACTIONS.KEEP:matched.k=item;break;case ACTIONS.NO_REPLACE:matched.nr=item;break;case ACTIONS.REMOVE:matched.r=item;break;}}}}return matched.id||matched.n||matched.k||matched.nr||matched.r;}function getObjectCssClass(item){return" ReplaceObjectUnit-icon ReplaceObjectUnit-"+$DS_UTILS.getUnitCssClass(item)+" ";}function join(array,prop,separator){var props=array.map(function(item){return item[prop];});return props.join(separator);}mstrmojo.vi.ui.ReplaceObjectEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.vi.ui.ReplaceObjectEditor",source:null,target:null,conciliation:{},clearaf:false,showUnitTooltip:false,onOk:mstrmojo.emptyFn,onCancel:mstrmojo.emptyFn,onBack:mstrmojo.emptyFn,title:mstrmojo.desc(11674,"Replace Objects"),help:"replace_objects_dialog_box.htm",cssClass:"mstrmojo-ReplaceObject",getResizeHandler:function getResizeHandler(){var me=this,parentHandler=this._super();return mstrmojo.func.composite([parentHandler,function(){(me.dataGrid.ctxtBuilder.itemWidgets||[]).forEach(function(dataRow){var popup=dataRow.newObjSelector.selector.getPopupWidget();if(popup.visible){popup.adjustCornersForPopupOverflow();}});}]);},setUnits:function(obj){var me=this;["source","target"].forEach(function(key){if(obj[key]){me[key]=obj[key];}});this.conciliation={};var tgtitems=$H.cloneArray(this.target.units);$A.forEach(tgtitems,function(item){item.cls=(item.cls||"")+getObjectCssClass(item)+ITEM_CSS;});this.dataGrid.set("tgtitems",tgtitems);this.dataGrid.set("items",$H.cloneArray(this.source.units));this.dataGrid.updateScrollbars();},onPreClose:function(){this.onCancel();return true;},onClose:function(){this.unrender();},children:[{scriptClass:"mstrmojo.Label",cssClass:"ReplaceObject-ExplainText",text:(typeof (mstrApp)!=="undefined"&&mstrApp.pageName==="rwd")?mstrmojo.desc(14554,"Replace or remove objects currently used in the document."):mstrmojo.desc(15485,"Replace or remove objects currently used in the dossier.")},{scriptClass:"mstrmojo.DataGrid",alias:"dataGrid",cssClass:"ReplaceObject-DataGrid",columns:[{headerText:mstrmojo.desc(11675,"Current Objects"),headerCss:"left-unit",dataWidget:{scriptClass:"mstrmojo.Label",bindings:{text:"this.data.n",cssClass:function(){return getObjectCssClass(this.data)+" left-unit ReplaceObject-Unit ";},useRichTooltip:"!!this.parent.dataGrid.parent.showUnitTooltip"},updateTooltipConfig:function(){var currentObjects=this.parent.dataGrid.parent.source.units,thisObject=this.data;if(currentObjects.some(function(obj){return(obj.n===thisObject.n)&&(obj.did!==thisObject.did);})){this.richTooltip={posType:mstrmojo.tooltip.POS_TOPLEFT,cssClass:"vi-regular vi-tooltip-A",top:28,refNode:this.domNode,content:this.data.n+" ("+join(this.data.cubes,"name",", ")+")"};}else{this.richTooltip=null;}}}},{headerText:mstrmojo.desc(11676,"New Objects"),dataWidget:{scriptClass:"mstrmojo.HBox",alias:"newObjSelector",children:[{scriptClass:"mstrmojo.ui.SearchablePulldown",alias:"selector",hostedCSSClass:"ReplaceObject-Pulldown-Popup",isHostedWithin:false,getPopupConfig:function(){var popupConfig=this.constructor.prototype.getPopupConfig.call(this);popupConfig.popupHandlers[this.list.id]={open:function(){var node=this.domNode;if(node.parentNode){node.parentNode.removeChild(node);}}};return popupConfig;},onitemSelected:function(item){this.selectedNode.className="mstrmojo-ui-Pulldown-text "+(item.cls||"");},postCreate:function(){var d=this.parent.data;var items=[];var editor=this.parent.dataGrid.parent;var dataGrid=this.parent.dataGrid;items=mstrmojo.array.filter(dataGrid.tgtitems,function(item){return item.t===d.t&&!(isNDE(d)&&d.did===item.did);});if(items.length){items[items.length-1]=$H.clone(items[items.length-1]);items[items.length-1].cls+=" ReplaceObjectEditor-item-delimeter-above ";}var extraItems=extraManipulation(d,editor);if(extraItems.length){extraItems[0].cls+=" ReplaceObjectEditor-item-delimeter-below ";}items=items.concat(extraItems);var item=autoMatch(d,items);this.set("items",items);this.selectedIndex=$A.find(items,ID,item[ID]);},postselectedIndexChange:function postselectedIndexChange(){var source=this.parent.data,target=this.items[this.selectedIndex];var editor=this.parent.dataGrid.parent;editor.conciliation[source[ID]]={source:source,target:target};}}]}}]},{scriptClass:"mstrmojo.Box",cssClass:"ReplaceObject-overwrite",children:[{scriptClass:"mstrmojo.CheckBox",label:(typeof (mstrApp)!=="undefined"&&mstrApp.pageName==="rwd")?mstrmojo.desc(14555,"Clear object alias and number format on document"):mstrmojo.desc(15473,"Clear object alias and number format on dossier"),bindings:{checked:"this.parent.parent.clearaf"},oncheckedChange:function(){var isChecked=this.isChecked();this.parent.parent.set("clearaf",isChecked);}}]}],buttons:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton hot",text:mstrmojo.desc(1442,"OK"),onclick:function(){var editor=this.parent.parent,members=[],userSelection={},removeDependency=[],allRemoveDependOn={},allRemoveDependent={};$H.forEach(editor.conciliation,function(map){var target=map.target,source=map.source;userSelection[source[ID]]={source:source,target:target};if(target[ID]===ACTIONS.REMOVE){var dependents=source.dependentObjects;if(dependents){dependents.forEach(function(obj){removeDependency.push({dependOn:source,dependent:obj});});}}});removeDependency.forEach(function(dependency){var dependOn=dependency.dependOn,dependent=dependency.dependent,map=userSelection[dependent.did],dependentSelection=map.target;if(dependentSelection[ID]!==ACTIONS.REMOVE){map.target={ID:ACTIONS.REMOVE};allRemoveDependent[dependent.did]=dependent;allRemoveDependOn[dependOn.did]=dependOn;}});$H.forEach(userSelection,function(map){var target=map.target,source=map.source;function wrapMember(member,tgt){if(source.cont_did){member.srcContDid=source.cont_did;member.srcContType=source.cont_tp;}if(tgt&&tgt.cont_did){member.tgtContDid=tgt.cont_did;member.tgtContType=tgt.cont_tp;}return member;}switch(target[ID]){case ACTIONS.REMOVE:members.push(wrapMember({srcid:source[ID],srct:source.t}));break;case ACTIONS.KEEP:case ACTIONS.NO_REPLACE:break;default:members.push(wrapMember({tgtid:target[ID],tgtt:target.t,srcid:source[ID],srct:source.t},target));}});var dependOn=$H.valarray(allRemoveDependOn),dependent=$H.valarray(allRemoveDependent),onOk=function onOk(){editor.onOk(members,editor.clearaf);editor.close();};if(dependent.length){var dependOnObjLength=dependOn.length,dependOnObjNames=dependOnObjLength>=2?mstrmojo.desc(13367,"### and ##").replace("###",dependOn.slice(0,dependOnObjLength-1).map(function(obj){return $S.encodeHtmlString(obj.n);}).join(", ")).replace("##",$S.encodeHtmlString(dependOn[dependOnObjLength-1].n)):$S.encodeHtmlString(dependOn[0].n),message=mstrmojo.desc(13368,"Deleting ## will result in removal of the following dependent objects:").replace("##",dependOnObjNames)+"</br>"+dependent.map(function(obj){return $S.encodeHtmlString(obj.n)+"</br>";}).join("")+mstrmojo.desc(13369,"Do you wish to continue?");mstrmojo.warn(message,{confirmBtn:{t:mstrmojo.desc(1442,"OK"),fn:function(){onOk();}},cancelBtn:{t:mstrmojo.desc(221,"Cancel"),fn:function(){editor.open();}}},{cssClass:"removeDependentConfirm",onPreClose:function(){editor.open();return true;}});}else{onOk();}}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton",text:mstrmojo.desc(221,"Cancel"),onclick:function(){this.parent.parent.onCancel();this.parent.parent.close();}}]});}());