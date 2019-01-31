(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.array","mstrmojo.expr","mstrmojo.elementHelper","mstrmojo.mstr.EnumNodeProperties","mstrmojo.EnumSelectionType");var $ARR=mstrmojo.array,$HASH=mstrmojo.hash,$EXPR=mstrmojo.expr,$EH=mstrmojo.elementHelper,$ET=$EXPR.ET,$FN=$EXPR.FN,$DTP=$EXPR.DTP,$NODE=mstrmojo.mstr.EnumNodeProperties,$TYPE=mstrmojo.EnumSelectionType;var RELATION_EQUAL=0,RELATION_UNEQUAL=1,RELATION_SUBSET=2,RELATION_SUPER_SET=3,RELATION_INTERSECTION=4,RELATION_DISJOINT_SET=5;var ALL_SELECTION_POS=0,ELEM_ALL_ID="u;",LEVEL_NUMBER_NAME="LEVEL_NUMBER",DEFAULT_ALL_SELECTION=false,ELEMENT_TYPE_CONSOLIDATION=7;function isConsolidation(objInfo){return objInfo.t===47&&objInfo.st===12033;}function isComponentItem(item,group){if(item&&group&&group.t===ELEMENT_TYPE_CONSOLIDATION){return item.parent===group&&item.lv===group.lv;}return false;}function getComponentItems(item){if(item&&item.t===ELEMENT_TYPE_CONSOLIDATION){return $ARR.filter(item.children,function(child){return child.lv===item.lv;});}return[];}function isNotNode(node){return !!node.not||node.fn===$FN.NOT_IN_LIST||node.fn===$FN.NOT_EQUAL;}function getAttrNode(objInfo){return $HASH.copyProps(["did","n","t","st"],objInfo);}function getElementNode(item,objInfo){var isCond=isConsolidation(objInfo),itemValue=isCond?item.v:$EH.terseLong2OldShort(item.v),node={v:itemValue.replace(/\\:/g,"*:"),n:item.n};if(isCond){node.t=item.t;node.conid=objInfo.did;}return node;}function getLevelNode(level,objInfo){if(parseInt(level,10)>=0){var levelForms=objInfo.lvfs||[],levelName=levelForms[level]&&levelForms[level].lvfn||"";return{v:levelName?level+";"+levelName:level,dtp:levelName?$DTP.CHAR:$DTP.INTEGER};}return null;}function getItemValue(value,itemType,attribute){var type=$EH.getIdPresentation(value),isCond=isConsolidation(attribute);value=value.replace(/\*:/g,"\\:");switch(itemType){case"old":case"oldLong":switch(type){case"old":case"oldLong":return value;case"terse":case"terseLong":switch(value[0]){case"V":return value.substring(1).split(";")[0];case"n":return"HF:"+ +$EH.terseLong2OldShort(value)+":47";default:return $EH.terseLong2OldShort(value);}}break;case"terse":case"terseLong":switch(type){case"old":return isCond?("V"+value+";"+attribute.did):$EH.oldShort2terseLong(value,"h");case"oldLong":switch(value.substring(0,2)){case"HF":var es=value.substr(3).split(":");if(es.length>3){es.pop();}return $EH.oldShort2terseLong(es.join(":"),"n");default:return value;}case"terse":case"terseLong":return value;}break;default:return value;}}function getLevelValue(value){if(isNaN(value)&&typeof value==="string"){return parseInt(value.split(";")[0],10);}return parseInt(value,10);}function isItemIsolated(item){return !item||item.lv>0&&!item.parent;}function getSelectionRelation(src,dest,itemConfig){var cacheItem=itemConfig.item,ancestorMap=itemConfig.ancestorMap,descendantMap=itemConfig.descendantMap,srcItem=this.getItemByValue(src.itemValue),destItem=this.getItemByValue(dest.itemValue),isAncestorOf=function(ancestor,descendant){if(cacheItem&&cacheItem===ancestor&&descendantMap){return descendantMap[descendant.v];}if(cacheItem&&cacheItem===descendant&&ancestorMap){return ancestorMap[ancestor.v];}while(descendant){if(ancestor===descendant){return true;}descendant=descendant.parent;}return false;};switch(src.func){case $TYPE.ALL:return dest.func===$TYPE.ALL?RELATION_EQUAL:RELATION_SUPER_SET;case $TYPE.ELEMENT:switch(dest.func){case $TYPE.ALL:return RELATION_SUBSET;case $TYPE.ELEMENT:return srcItem===destItem?RELATION_EQUAL:isComponentItem(srcItem,destItem)?RELATION_SUBSET:isComponentItem(destItem,srcItem)?RELATION_SUPER_SET:RELATION_DISJOINT_SET;case $TYPE.BRANCH:return isAncestorOf(destItem,srcItem)?RELATION_SUBSET:isComponentItem(destItem,srcItem)?RELATION_INTERSECTION:isItemIsolated(srcItem)?RELATION_UNEQUAL:RELATION_DISJOINT_SET;case $TYPE.LEVEL:return srcItem.lv===dest.level?RELATION_SUBSET:RELATION_DISJOINT_SET;case $TYPE.BRANCH_LEVEL:return srcItem.lv!==dest.level?RELATION_DISJOINT_SET:isItemIsolated(srcItem)?RELATION_UNEQUAL:isAncestorOf(destItem,srcItem)?RELATION_SUBSET:RELATION_DISJOINT_SET;}break;case $TYPE.BRANCH:switch(dest.func){case $TYPE.ALL:return RELATION_SUBSET;case $TYPE.ELEMENT:return isAncestorOf(srcItem,destItem)?RELATION_SUPER_SET:isComponentItem(srcItem,destItem)?RELATION_INTERSECTION:isItemIsolated(destItem)?RELATION_UNEQUAL:RELATION_DISJOINT_SET;case $TYPE.BRANCH:return srcItem===destItem?RELATION_EQUAL:(isItemIsolated(srcItem)||isItemIsolated(destItem))?RELATION_UNEQUAL:isAncestorOf(destItem,srcItem)?RELATION_SUBSET:isAncestorOf(srcItem,destItem)?RELATION_SUPER_SET:RELATION_DISJOINT_SET;case $TYPE.LEVEL:return srcItem.lv<=dest.level?RELATION_INTERSECTION:RELATION_DISJOINT_SET;case $TYPE.BRANCH_LEVEL:return srcItem===destItem?RELATION_SUPER_SET:(isItemIsolated(srcItem)||isItemIsolated(destItem))?RELATION_UNEQUAL:isAncestorOf(srcItem,destItem)?RELATION_SUPER_SET:(isAncestorOf(destItem,srcItem)&&dest.level>=srcItem.lv)?RELATION_INTERSECTION:RELATION_DISJOINT_SET;}break;case $TYPE.LEVEL:switch(dest.func){case $TYPE.ALL:return RELATION_SUBSET;case $TYPE.ELEMENT:return destItem.lv===src.level?RELATION_SUPER_SET:RELATION_DISJOINT_SET;case $TYPE.BRANCH:return destItem.lv<=src.level?RELATION_INTERSECTION:RELATION_DISJOINT_SET;case $TYPE.LEVEL:return src.level===dest.level?RELATION_EQUAL:RELATION_DISJOINT_SET;case $TYPE.BRANCH_LEVEL:return src.level===dest.level?RELATION_SUPER_SET:RELATION_DISJOINT_SET;}break;case $TYPE.BRANCH_LEVEL:switch(dest.func){case $TYPE.ALL:return RELATION_SUBSET;case $TYPE.ELEMENT:return destItem.lv!==src.level?RELATION_DISJOINT_SET:isItemIsolated(destItem)?RELATION_UNEQUAL:isAncestorOf(srcItem,destItem)?RELATION_SUPER_SET:RELATION_DISJOINT_SET;case $TYPE.BRANCH:return srcItem===destItem?RELATION_SUBSET:(isItemIsolated(srcItem)||isItemIsolated(destItem))?RELATION_UNEQUAL:isAncestorOf(destItem,srcItem)?RELATION_SUBSET:(isAncestorOf(srcItem,destItem)&&src.level>=destItem.lv)?RELATION_INTERSECTION:RELATION_DISJOINT_SET;case $TYPE.LEVEL:return src.level===dest.level?RELATION_SUBSET:RELATION_DISJOINT_SET;case $TYPE.BRANCH_LEVEL:return src.level!==dest.level?RELATION_DISJOINT_SET:srcItem===destItem?RELATION_EQUAL:(isItemIsolated(srcItem)||isItemIsolated(destItem))?RELATION_UNEQUAL:isAncestorOf(destItem,srcItem)?RELATION_SUBSET:isAncestorOf(srcItem,destItem)?RELATION_SUPER_SET:RELATION_DISJOINT_SET;}break;}return RELATION_UNEQUAL;}function getExprNode(objInfo,func,items,level,isNot){var levelForm=(objInfo.fs||[]).filter(function(f){return(f.n||f.fnm)===LEVEL_NUMBER_NAME;})[0],elementNodes=$ARR.ensureArray(items).map(function(item){return getElementNode(item,objInfo);});switch(func){case $TYPE.ELEMENT:if(elementNodes.length>0){return{et:$ET.AE,fn:isNot?$FN.NOT_IN_LIST:$FN.IN_LIST,a:getAttrNode(objInfo),es:elementNodes};}break;case $TYPE.BRANCH:if(elementNodes.length>0){return{et:$ET.AE,fn:$FN.DESCENDANT,not:isNot,a:getAttrNode(objInfo),es:elementNodes};}break;case $TYPE.LEVEL:if(levelForm&&parseInt(level,10)>=0){return{et:$ET.AQ,fn:$FN.EQUAL,not:isNot,a:getAttrNode(objInfo),fm:{did:levelForm.did||levelForm.fid,n:LEVEL_NUMBER_NAME,dtp:$EXPR.mapBaseFormTypeToDataType(levelForm.bftp)},cs:[getLevelNode(level,objInfo)]};}break;case $TYPE.BRANCH_LEVEL:if(elementNodes.length>0&&parseInt(level,10)>=0){return{et:$ET.AE,fn:$FN.DESCENDANT,not:isNot,a:getAttrNode(objInfo),es:elementNodes,cs:[getLevelNode(level,objInfo),{v:18,dtp:$DTP.INTEGER}]};}break;}return null;}function getElementSelectionPosMap(){var elementPosMap={};this.selectionList.forEach(function(selection,idx){if(selection.func===$TYPE.ELEMENT){elementPosMap[selection.itemValue]=idx;var item=this.getItemByValue(selection.itemValue);$ARR.forEach(getComponentItems(item),function(component){elementPosMap[component.v]=idx;});}},this);return elementPosMap;}function getBranchSelectionPosMap(){var branchPosMap={};this.selectionList.forEach(function(selection,idx){if(selection.func===$TYPE.BRANCH){branchPosMap[selection.itemValue]=idx;}});return branchPosMap;}function getLevelSelectionPosMap(){var levelPosMap={};this.selectionList.forEach(function(selection,idx){if(selection.func===$TYPE.LEVEL){levelPosMap[selection.level]=idx;}});return levelPosMap;}function getBranchLevelSelectionPosMap(){var branchLevelPosMap={};this.selectionList.forEach(function(selection,idx){if(selection.func===$TYPE.BRANCH_LEVEL){var itemValue=selection.itemValue,level=selection.level,levelPosMap=branchLevelPosMap[itemValue];if(!levelPosMap){levelPosMap=branchLevelPosMap[itemValue]={};}levelPosMap[level]=idx;}});return branchLevelPosMap;}function getBranchSelectionPos(item){var branchPosMap=getBranchSelectionPosMap.call(this),branchPos=ALL_SELECTION_POS;while(item&&item.v){branchPos=Math.max(branchPos,branchPosMap[item.v]||ALL_SELECTION_POS);item=item.parent;}return branchPos;}function getLevelInBranchSelectionPosMap(branchItem,isBranchLevel){var branchLevelPosMap=getBranchLevelSelectionPosMap.call(this),levelPosMap=getLevelSelectionPosMap.call(this),branchPos=isBranchLevel?ALL_SELECTION_POS:getBranchSelectionPos.call(this,branchItem),branchLevel=branchItem&&branchItem.lv||0,levelInBranchPosMap={};if(!isBranchLevel){$HASH.forEach(levelPosMap,function(pos,level){if(level>=branchLevel&&pos>branchPos){levelInBranchPosMap[level]=pos;}});}while(branchItem&&branchItem.v){$HASH.forEach(branchLevelPosMap[branchItem.v],function(pos,level){if(level>=branchLevel&&pos>branchPos){levelInBranchPosMap[level]=Math.max(pos,levelInBranchPosMap[level]||branchPos);}});branchItem=branchItem.parent;}return levelInBranchPosMap;}mstrmojo.ui._HierarchyListSelection=mstrmojo.provide("mstrmojo.ui._HierarchyListSelection",{_mixinName:"mstrmojo.ui._HierarchyListSelection",init:function init(props){this._super(props);this.clearSelections();},getAllSelection:function getAllSelection(){return !this.selectionList[ALL_SELECTION_POS].isNot;},setAllSelection:function setAllSelection(isSelected){this.selectionList[ALL_SELECTION_POS].isNot=!isSelected;},clearSelections:function clearSelections(){this.selectionList=[{func:$TYPE.ALL,isNot:!DEFAULT_ALL_SELECTION}];return this.selectionList;},addSelection:function addSelection(newSelection){var selectionList=this.selectionList,newItem=this.getItemByValue(newSelection.itemValue),itemConfig={item:newItem,ancestorMap:newItem&&this.getItemAncestorMap(newItem),descendantMap:newItem&&this.getItemDescendantMap(newItem)},shouldAdd=true;if(!newItem&&(newSelection.func===$TYPE.ELEMENT||newSelection.func===$TYPE.BRANCH||newSelection.func===$TYPE.BRANCH_LEVEL)){return ;}selectionList=this.selectionList=selectionList.filter(function(curSelection){var relation=getSelectionRelation.call(this,curSelection,newSelection,itemConfig),isOperatorEqual=curSelection.isNot===newSelection.isNot;if(relation===RELATION_SUPER_SET||relation===RELATION_INTERSECTION&&!isOperatorEqual){shouldAdd=!isOperatorEqual;}return !(relation===RELATION_EQUAL||relation===RELATION_SUBSET);},this);if(shouldAdd){selectionList.push(newSelection);}},updateSiblingItemSelection:function updateSiblingItemSelection(items){var selectionList=this.selectionList,elementPosMap=getElementSelectionPosMap.call(this),branchPosMap=getBranchSelectionPosMap.call(this);$ARR.forEach(items,function(item){var parentItem=item.parent,parentBranchPos=parentItem?getBranchSelectionPos.call(this,parentItem):ALL_SELECTION_POS,levelInBranchPos=parentItem?getLevelInBranchSelectionPosMap.call(this,parentItem):getLevelSelectionPosMap.call(this),branchPos=Math.max(branchPosMap[item.v]||ALL_SELECTION_POS,parentBranchPos),itemSelectionPos=Math.max(elementPosMap[item.v]||ALL_SELECTION_POS,branchPos,levelInBranchPos[item.lv]||ALL_SELECTION_POS);item.isSelected=!selectionList[itemSelectionPos].isNot;item.isBranchSelected=!selectionList[branchPos].isNot;},this);},updateItemSelection:function updateItemSelection(branchItem){var selectionList=this.selectionList,elementPosMap=getElementSelectionPosMap.call(this),branchPosMap=getBranchSelectionPosMap.call(this),levelPosMap=getLevelSelectionPosMap.call(this),branchLevelPosMap=getBranchLevelSelectionPosMap.call(this),rootItems=branchItem?[branchItem]:this.getRootItems(),isolatedItems=branchItem?[]:this.getItems().filter(function(item){return item&&isItemIsolated(item);}),curBranchPos=branchItem?getBranchSelectionPos.call(this,branchItem):ALL_SELECTION_POS,curLevelInBranchPosMap=branchItem?getLevelInBranchSelectionPosMap.call(this,branchItem,true):{};(rootItems.concat(isolatedItems)).forEach(function walkDescendants(item){var tempBranchPos=curBranchPos,tempLevelPosMap=$HASH.copy(curLevelInBranchPosMap);curBranchPos=Math.max(curBranchPos,branchPosMap[item.v]||ALL_SELECTION_POS);$HASH.forEach(branchLevelPosMap[item.v],function(pos,level){curLevelInBranchPosMap[level]=Math.max(pos,curLevelInBranchPosMap[level]||ALL_SELECTION_POS);});var itemSelectionPos=Math.max(elementPosMap[item.v]||ALL_SELECTION_POS,levelPosMap[item.lv]||ALL_SELECTION_POS,curBranchPos,curLevelInBranchPosMap[item.lv]||ALL_SELECTION_POS);item.isSelected=!selectionList[itemSelectionPos].isNot;item.isBranchSelected=!selectionList[curBranchPos].isNot;$ARR.forEach(item.children,function(child){walkDescendants.call(this,child);},this);var components=getComponentItems(item);if(components.length>0){var isSelected=$ARR.find(components,"isSelected",true)>=0;if(item.isSelected!==isSelected){this.addSelection({func:$TYPE.ELEMENT,itemValue:item.v,isNot:!isSelected});item.isSelected=isSelected;}}curBranchPos=tempBranchPos;curLevelInBranchPosMap=tempLevelPosMap;},this);},updateDescendantsStatus:function updateDescendantsStatus(){var selectionList=this.selectionList,maxLevel=this.getMaxLevel(),branchPosMap=getBranchSelectionPosMap.call(this),branchLevelPosMap=getBranchLevelSelectionPosMap.call(this),curBranchPos=ALL_SELECTION_POS,curLevelPosMap=getLevelSelectionPosMap.call(this);this.getRootItems().forEach(function walkDescendants(item){var children=item.children||[],displayChildren=item.displayChildren||[],tempBranchPos=curBranchPos,tempLevelPosMap=$HASH.copy(curLevelPosMap),hasDsctSelected=false;curBranchPos=Math.max(curBranchPos,branchPosMap[item.v]||ALL_SELECTION_POS);$HASH.forEach(branchLevelPosMap[item.v],function(pos,level){curLevelPosMap[level]=Math.max(pos,curLevelPosMap[level]||ALL_SELECTION_POS);});children.forEach(function(child){if(walkDescendants(child)||!child.hid&&child.isSelected){hasDsctSelected=true;}});if(item.hcd&&displayChildren.length===0){var isBranchSelected=!selectionList[curBranchPos].isNot,levelPos,isLevelSelected;for(var i=item.lv+1;i<=maxLevel;i++){levelPos=curLevelPosMap[i]||ALL_SELECTION_POS;isLevelSelected=levelPos>curBranchPos&&!selectionList[levelPos].isNot;if(isLevelSelected||isBranchSelected&&levelPos<=curBranchPos){hasDsctSelected=true;break;}}}item.hasDsctSelected=hasDsctSelected;curBranchPos=tempBranchPos;curLevelPosMap=tempLevelPosMap;return hasDsctSelected;});},getMaxLevel:function getMaxLevel(){var maxLevel=0;this.getItems().forEach(function(item){var level=item.lv;if(level>maxLevel&&!item.hid){maxLevel=level;}});this.selectionList.forEach(function(selection){if(selection.func===$TYPE.LEVEL||selection.func===$TYPE.BRANCH_LEVEL){maxLevel=Math.max(maxLevel,selection.level);}});return maxLevel;},getLevelSelection:function getLevelSelection(branchItem){var selectionList=this.selectionList,levelPosMap=branchItem?getLevelInBranchSelectionPosMap.call(this,branchItem):getLevelSelectionPosMap.call(this),allSelection=branchItem?branchItem.isBranchSelected:this.getAllSelection(),levels={};$HASH.forEach(levelPosMap,function(pos,level){var isSelected=!selectionList[pos].isNot;if(isSelected!==allSelection){levels[level]=isSelected;}});return $HASH.copy({allLevel:allSelection,isLevelSelected:function(level){return this[level]||this.allLevel&&this[level]!==false;}},levels);},buildSelectionExprJSON:function buildSelectionExprJSON(objInfo){var allSelection=this.getAllSelection(),exprNodes=[],exprJSON=null,elementCollection={selected:[],unselected:[]},addExprJSON=function(nodes,node){if(!$HASH.isEmpty(node)&&(nodes.length>0||allSelection===isNotNode(node))){nodes.push(node);}};this.selectionList.forEach(function(selection){var func=selection.func,isNot=selection.isNot,level=selection.level,itemValue=selection.itemValue,item=itemValue?this.getItemByValue(itemValue):null;if((item||{}).fetcher){return ;}if(selection.func===$TYPE.ELEMENT&&!isItemIsolated(item)){elementCollection[isNot?"unselected":"selected"].push(item);}else{if(selection.func!==$TYPE.ALL){addExprJSON(exprNodes,getExprNode(objInfo,func,item,level,isNot));}}},this);addExprJSON(exprNodes,getExprNode(objInfo,$TYPE.ELEMENT,elementCollection.selected));addExprJSON(exprNodes,getExprNode(objInfo,$TYPE.ELEMENT,elementCollection.unselected,null,true));if(exprNodes.length>0){exprJSON=exprNodes[0];exprNodes.forEach(function(node,idx,nodes){var isNot=isNotNode(node);if(idx>0){if(isNot===isNotNode(nodes[idx-1])&&exprJSON.nds){exprJSON.nds.push(node);}else{exprJSON={et:$ET.ANDOR,fn:isNot?$FN.AND:$FN.OR,nds:[exprJSON,node]};}}});}if(exprJSON){if(exprJSON.et===$ET.ANDOR){exprJSON.node=$NODE.CONDITION;}else{exprJSON={et:$ET.ANDOR,fn:$FN.AND,nds:[exprJSON],node:$NODE.CONDITION};}}return exprJSON;},setSelectionByExprJSON:function setSelectionByExprJSON(exprJSON){var selectionList=this.clearSelections(),hasSetAllSelection=false,items=this.getItems(),itemType=$EH.getIdPresentation(items[0]&&items[0].v),walkExprJSON=function(node,selectionList){if($HASH.isEmpty(node)){return ;}if(node.et===$ET.ANDOR){(node.nds||[]).forEach(function(nd){walkExprJSON.call(this,nd,selectionList);},this);}else{var isNot=isNotNode(node);if(!hasSetAllSelection){hasSetAllSelection=true;this.setAllSelection(isNot);}if(node.et===$ET.AQ&&node.fm&&node.fm.n===LEVEL_NUMBER_NAME){(node.cs||[]).forEach(function(c){var level=getLevelValue(c.v);if(level>=0){selectionList.push({func:$TYPE.LEVEL,level:level,isNot:isNot});}});}if(node.et===$ET.AE){(node.es||[]).forEach(function(e){var itemValue=getItemValue(e.v,itemType,node.a),level=getLevelValue(node.cs&&node.cs[0].v);if(!this.getItemByValue(itemValue)){this.addItems([$HASH.copy({v:itemValue,dhid:true},$HASH.clone(e))],true);}if(node.fn===$FN.DESCENDANT){if(level>=0){selectionList.push({func:$TYPE.BRANCH_LEVEL,itemValue:itemValue,level:level,isNot:isNot});}else{selectionList.push({func:$TYPE.BRANCH,itemValue:itemValue,isNot:isNot});}}else{selectionList.push({func:$TYPE.ELEMENT,itemValue:itemValue,isNot:isNot});}},this);}}};walkExprJSON.call(this,exprJSON,selectionList);this.updateItemSelection();},setSelectionByList:function setSelectionByList(newItems,include){var selections=[],isUnset=false;$ARR.forEach(newItems,function(item){var itemValue=item.v;if(itemValue===ELEM_ALL_ID){isUnset=true;return false;}if(!this.getItemByValue(itemValue)){this.addItems([item],true);}selections.push({func:$TYPE.ELEMENT,itemValue:itemValue,isNot:!include});},this);this.clearSelections();if(!isUnset){this.setAllSelection(!include);this.selectionList=this.selectionList.concat(selections);}this.updateItemSelection();},onSelectionChange:function onSelectionChange(type,isSelected,item,level){if(type===$TYPE.ALL){this.clearSelections();this.setAllSelection(isSelected);}else{this.addSelection({func:type,itemValue:item&&item.v,level:level,isNot:!isSelected});}if(this.postSelectionChange){this.postSelectionChange();}},postAddItems:function postAddItems(addedItems){this.updateItemSelection();},postAddSiblingItems:function postAddSiblingItems(addedItems,parentItem){this.updateSiblingItemSelection(addedItems);},postAddBranchItems:function postAddBranchItems(addedItems,branchItem){this.updateItemSelection(branchItem);}});}());