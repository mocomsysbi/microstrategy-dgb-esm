(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.Label","mstrmojo.mstr.EnumDSSXMLObjectTypes","mstrmojo.ui.PulldownCheckList");var $ARR=mstrmojo.array,$HASH=mstrmojo.hash,TYPE_ALL=mstrmojo.mstr.EnumDSSXMLObjectTypes.Dimension;mstrmojo.ui.SearchablePulldownCheckList=mstrmojo.declare(mstrmojo.ui.PulldownCheckList,null,{scriptClass:"mstrmojo.ui.SearchablePulldownCheckList",_changeList:null,useRichTooltip:true,showTooltipForLargeText:true,children:[{scriptClass:"mstrmojo.Label",alias:"noResults",cssClass:"nores",text:mstrmojo.desc(15559,"No result matches your search.")}].concat(mstrmojo.ui.PulldownCheckList.prototype.children),onOpen:function onOpen(){var pulldown=this.parent;if(this._super){this._super();}this._changeList=$HASH.copy(pulldown.selectedIndices);},onClose:function onClose(config){if(this._super){this._super(config);}this._changeList=null;},showTooltip:function showTooltip(evt,win){var target=evt.target||mstrmojo.dom.eventTarget(evt.hWin,evt.e);target=this.getItemNodeFromTarget(target);if(target){evt=$HASH.copy(evt);evt.srcElement=target;}this._super(evt,win);},saveSelection:function saveSelection(){this.toggleCacheMode(true);this.parent.set("selectedIndices",$HASH.copy(this._changeList));this.toggleCacheMode(false);},getChanges:function getChanges(){return this._changeList;},onclearSelection:function(){var listWidget=this.list,changeList=this._changeList,listSelection=listWidget.selectedIndices,canon=this.parent.items,items=listWidget.items,foundIdx;if($HASH.isEmpty(listSelection)){listSelection={};$HASH.forEach(changeList,function(isChecked,idx){if(isChecked){foundIdx=$ARR.find(items,"v",canon[idx].v);if(foundIdx>=0){listSelection[foundIdx]=changeList[idx];}}});listWidget.selectedIndices=listSelection;}},onvisibleChange:function(){this.list.set("visible",this.visible);},postselectionChange:function postselectionChange(evt){if(this._super){this._super(evt);}if(this._restoreSelection){delete this._restoreSelection;return ;}var canon=this.parent.items,items=this.list.items,isFullList=(canon.length===items.length),added=evt.added||[],removed=evt.removed||[],changeList=this._changeList,allIdx=this.parent.allIdx,allItem=items[allIdx],idx,handleToggle=function(){$ARR.forEach(added,function(index){idx=$ARR.find(canon,"v",items[index].v);changeList[idx]=true;});$ARR.forEach(removed,function(index){idx=$ARR.find(canon,"v",items[index].v);delete changeList[idx];});};if(!changeList){return ;}if(allItem&&(allItem.t===TYPE_ALL)){if(allIdx===added[0]){$ARR.forEach(items,function(item){if(item.t!==TYPE_ALL||isFullList){idx=$ARR.find(canon,"v",item.v);if(idx!==-1&&!changeList[idx]){changeList[idx]=true;}}});return ;}if(allIdx===removed[0]){$ARR.forEach(items,function(item){idx=$ARR.find(canon,"v",item.v);if(idx!==-1&&changeList[idx]){delete changeList[idx];}});return ;}}if(changeList[allIdx]){delete changeList[allIdx];}handleToggle();},onitemsChange:function onitemsChange(){var items=this.list.items;this.noResults.set("visible",items&&items.length===0);},toggleCacheMode:function toggleCacheMode(useCachedSelection){this._restoreSelection=useCachedSelection;}});}());