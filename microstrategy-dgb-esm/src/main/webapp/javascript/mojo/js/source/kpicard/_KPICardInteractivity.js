(function(){mstrmojo.requiresCls("mstrmojo.func","mstrmojo.array","mstrmojo.hash","mstrmojo.css","mstrmojo.dom","mstrmojo.VisUtility","mstrmojo.kpicard.KPICardEnum","mstrmojo.vi.enums.EnumFeatures","mstrmojo.vi.viz.EnumDSSDropZones");var $ARR=mstrmojo.array,$HASH=mstrmojo.hash,$CSS=mstrmojo.css,$DOM=mstrmojo.dom,$FEATURES=mstrmojo.vi.enums.EnumFeatures,$VISUTIL=mstrmojo.VisUtility,$DROP_ZONES=mstrmojo.vi.viz.EnumDSSDropZones;function rectIntersection(a,b){var x=Math.max(a.x,b.x),y=Math.max(a.y,b.y),w=Math.min(a.x+a.w,b.x+b.w)-x,h=Math.min(a.y+a.h,b.y+b.h)-y;if(w<0||h<0){return{x:NaN,y:NaN,w:NaN,h:NaN};}return{x:x,y:y,w:w,h:h};}function getSelectionDataMenuConfig(){var showDataMenu=this.breakByAttrSupportsViewFilter,filterCfg=new mstrmojo.ui.menus.MenuConfig(),showDataCfg=new mstrmojo.ui.menus.MenuConfig(),result={filter:filterCfg,showData:showDataCfg},me=this,contextMenuSelections=this.contextMenuSelections,getDrillSubMenu=function(drillAction){var contextMenuSelections=me.contextMenuSelections,firstCard=contextMenuSelections[0],dataModel=firstCard&&firstCard.dataModel,attrId=dataModel&&dataModel.attrId,categoryName=dataModel&&dataModel.categoryName,drillFromUnit={id:attrId,n:categoryName};return $VISUTIL.getDrillMenu.bind($VISUTIL,me,attrId,drillAction,{drillFromUnit:drillFromUnit});},fnApplyFilter,i,cardsCount=contextMenuSelections&&contextMenuSelections.length,isDrillCandidatesValid,singleCard;if(!contextMenuSelections||cardsCount<=0){return result;}if(showDataMenu){if(this.isLinkedFilterEnabled()){fnApplyFilter=function(){me.handleContextMenuSelectionData(true);};filterCfg.addMenuItem(mstrmojo.desc(15070,"Go to Targets"),"",fnApplyFilter);filterCfg.addSeparator();}filterCfg.addMenuItem(mstrmojo.desc(11701,"Keep only"),"xt",this.getMenuHandler("keepOnly"));filterCfg.addMenuItem(mstrmojo.desc(3946,"Exclude"),"xt",this.getMenuHandler("exclude"));if(!mstrApp.isInVFConfigMode&&mstrmojo.resolveFeature($FEATURES.WEB_DRILL_AND_LINK)){isDrillCandidatesValid=false;for(i=0;i<cardsCount;i+=1){singleCard=contextMenuSelections[i];if(singleCard&&$VISUTIL.getDrillCandidates(this,singleCard.dataModel.attrId).length>0){isDrillCandidatesValid=true;break;}}if(isDrillCandidatesValid){filterCfg.addPopupMenuItem(mstrmojo.desc(145,"Drill"),this.id,getDrillSubMenu(this.getMenuHandler("drill")),"xt");}else{filterCfg.addNonInteractiveMenuItem(mstrmojo.desc(145,"Drill"),"",true);}}if(!mstrApp.isDossier&&!this.excludeData){showDataCfg.addMenuItem(mstrmojo.desc(13537,"Show Data..."),"xt",this.getMenuHandler("showData"));}}return result;}function getSelectionGroupMenuConfig(){if(mstrApp.isAppStatePresentation()||mstrApp.isInVFConfigMode){return{};}var cfg={},contextMenuSelections=this.contextMenuSelections,data,getCellName=function(cell){return cell.dataModel.categoryElemName;};if(contextMenuSelections&&contextMenuSelections.length>0){data=this.getCellForNode(contextMenuSelections[0]);cfg=$VISUTIL.getGroupAndCalculationContextMenu(this,data,{selection:contextMenuSelections,skipSingleAttrCheck:true,fnCellName:getCellName});}return cfg;}function showMenu(menuCfg,event){var anchor=this.menuAnchor,menuInstance,me=this;if(!anchor){anchor=document.createElement("div");anchor.id=this.id+"-kpicard-menu-anchor";anchor.style.position="absolute";document.body.appendChild(anchor);this.menuAnchor=anchor;}anchor.style.left=event.pageX+"px";anchor.style.top=event.pageY+"px";anchor.style.zIndex=101;this.configurePopup(menuCfg,anchor);menuInstance=menuCfg.newInstance();if(menuInstance){menuInstance.onCloseMenuCallBack=function(){me.clearMenuData();me.prepareRMCSelectionData();me.contextMenuDismiss=true;};this.openPopup(menuInstance);}}function updateDropZoneInDrill(drillUnit,params){var me=this,updateTemplateActions={act:"updateTemplate",keyContext:me.k,actions:[]},tplActArr=updateTemplateActions.actions,unitItem=[$VISUTIL.pick(drillUnit,["did","t"])],fromUnitId=params.drillFromUnit.id,argumentZone={id:$DROP_ZONES.BreakBy},dzModel=me.zonesModel,zone=dzModel.getZoneModelByZoneId(argumentZone.id),zoneItems=zone.items||[],fromUnitItem,zoneIdx=$VISUTIL.findInArray(zoneItems,function(z){return z.did===fromUnitId;});if(zoneIdx!==-1){fromUnitItem=zoneItems[zoneIdx];}if(fromUnitItem){Array.prototype.push.apply(tplActArr,dzModel.getRemoveDropZoneUnitActions(argumentZone,fromUnitItem));Array.prototype.push.apply(tplActArr,dzModel.getAddDropZoneUnitsActions(argumentZone,unitItem,fromUnitItem.idx));}return updateTemplateActions;}function rectPointIntersection(rect,x,y){var left=rect.x,right=left+rect.w,top=rect.y,bottom=top+rect.h;return x<=right&&x>=left&&y<=bottom&&y>=top;}mstrmojo.kpicard._KPICardInteractivity=mstrmojo.provide("mstrmojo.kpicard._KPICardInteractivity",{_mixinName:"mstrmojo.kpicard._KPICardInteractivity",contextMenuDismiss:false,handleLMCSelection:function handleLMCSelection(event,singleCard){this.noHighlightAfterKeepOnlyExcludeDrill=false;var ctrlKey=event.ctrlKey||event.metaKey,selectedCards=this.selectedCards,selectedCardsCount=selectedCards&&selectedCards.length,hasMultipleSelections=selectedCardsCount&&selectedCardsCount>1,clearAllEnabled=this.isClearAllEnabled();if(!ctrlKey){if(!singleCard.selected||(singleCard.selected&&hasMultipleSelections)){this.clearSelectedCards();this.addToSelectedCards(singleCard);}else{if(clearAllEnabled){this.clearSelectedCards();}}}else{if(singleCard.selected){if(hasMultipleSelections||clearAllEnabled){this.removeCardFromSelectedCards(singleCard);}}else{this.addToSelectedCards(singleCard);}}this.displayVizBoxVisFilterIndicator(true,this.parent);this.clearMenuData();this.prepareLMCSelectionData();this.endSelections();this.contextMenuDismiss=false;},addToSelectedCards:function addToSelectedCards(singleCard){if(singleCard.selected===false){singleCard.selected=true;this.selectedCards.push(singleCard);singleCard.updateHighlight();}},removeCardFromSelectedCards:function removeCardFromSelectedCards(singleCard){var selectedCards=this.selectedCards,cardsCount=selectedCards&&selectedCards.length,i=selectedCards.indexOf(singleCard);if(!cardsCount){return ;}if(i!==-1){singleCard.selected=false;singleCard.updateHighlight();selectedCards[i]=selectedCards[cardsCount-1];selectedCards.pop();}},clearSelectedCards:function clearSelectedCards(){var i,selectedCard,selectedCards=this.selectedCards,cardsCount=selectedCards&&selectedCards.length;if(!cardsCount){return ;}for(i=0;i<cardsCount;i+=1){selectedCard=selectedCards[i];selectedCard.selected=false;selectedCard.updateHighlight();}this.selectedCards=[];},lassoSelecting:function lassoSelecting(){$CSS.removeClass(this.lassoSelector,"lasso-selector-hasContent");this.onLassoSelection=true;},lassoSelected:function lassoSelected(params){if($DOM.supportsTouches===true){return ;}this.areaSelect({x:params.left,y:params.top,w:params.width,h:params.height},params);if(this.selectedCards.length){$CSS.addClass(this.lassoSelector,"lasso-selector-hasContent");}this.noHighlightAfterKeepOnlyExcludeDrill=false;this.dismissLassoSelector();this.displayVizBoxVisFilterIndicator(true,this.parent);},dismissLassoSelector:function dismissLassoSelector(){if(this._super){this._super();}this.onLassoSelection=false;},areaSelect:function areaSelect(rect,info){var me=this;var layoutor=this.layoutor;if(isNaN(rect.x)||isNaN(rect.y)||isNaN(rect.w)||isNaN(rect.h)){return ;}if(!info.ctrlKey){this.clearSelectedCards();}this.clearMenuData();layoutor.forEachChild(function(singleCard){var rectInfo=singleCard.getSize();if(rectInfo){var bound=$HASH.copy(rectInfo,{});if(layoutor.scrollNode){bound.x-=layoutor.scrollNode.scrollLeft;bound.y-=layoutor.scrollNode.scrollTop;}if(!isNaN(rectIntersection(bound,rect).x)){me.addToSelectedCards(singleCard);}}});this.prepareLMCSelectionData();this.endSelections();},handleRMCEvent:function handleRMCEvent(event,singleCard){this.noHighlightAfterKeepOnlyExcludeDrill=false;if(mstrApp.isInVFInteractMode){$DOM.stopPropogation(window,event);$DOM.preventDefault(window,event);return ;}event.preventDefault();event.cancel();this.clearMenuData();this.addCardToMenuData(singleCard);if(singleCard.selected){this.copySelectedCardsToMenuData();}this.prepareRMCSelectionData();this.showSelectionMenu(event.e);this.contextMenuDismiss=false;},addCardToMenuData:function addCardToMenuData(singleCard){if(singleCard.useAsMenuData===false){singleCard.useAsMenuData=true;this.contextMenuSelections.push(singleCard);singleCard.updateHighlight();}},copySelectedCardsToMenuData:function copySelectedCardsToMenuData(){var i,selectedCard,selectedCards=this.selectedCards,cardsCount=selectedCards&&selectedCards.length;if(!cardsCount){return ;}for(i=0;i<cardsCount;i+=1){selectedCard=selectedCards[i];this.addCardToMenuData(selectedCard);}},clearMenuData:function clearMenuData(){var i,singleCard,contextMenuSelections=this.contextMenuSelections,cardsCount=contextMenuSelections&&contextMenuSelections.length;if(!cardsCount){return ;}for(i=0;i<cardsCount;i+=1){singleCard=contextMenuSelections[i];singleCard.useAsMenuData=false;singleCard.updateHighlight();}this.contextMenuSelections=[];},getCellForNode:function getCellForNode(singleCard){var dataModel=singleCard.dataModel,elem=dataModel.elemData;return{at:elem.at,dei:elem.dei,dpt:elem.dpt,o:elem.o,n:dataModel.categoryName,tui:elem.tui,ui:elem.ui,axis:1,v:dataModel.categoryElemName,tid:dataModel.attr.id};},getCellUnitIndex:function getCellUnitIndex(cell){return cell.o;},getSelectionMenuConfig:function getSelectionMenuConfig(){var cfg=$VISUTIL.mergeHashes(getSelectionDataMenuConfig.call(this),getSelectionGroupMenuConfig.call(this)),menuOrder=[{name:"filter"},{name:"editGroup"},{name:"editCalculation"},{name:"createDe"},{name:"showData"},{name:"renameDe"}];return $VISUTIL.mergeMenuConfigs(cfg,menuOrder);},showSelectionMenu:function showSelectionMenu(event){var cfg;if(!$VISUTIL.isOnExpressMode()){cfg=this.getSelectionMenuConfig();if(cfg.hasMenuItems()){showMenu.call(this,cfg,event);}}},configurePopup:function configurePopup(config,itemBtn){config.hostId=this.id;config.hostElement=itemBtn;},getMenuHandler:function getMenuHandler(name){var me=this,handler=this._super(name),handlers;if(handler!==mstrmojo.emptyFn){return handler;}handlers={keepOnly:function selectionKeepOnly(){me.updateAfterKeepOnly(true);me.noHighlightAfterKeepOnlyExcludeDrill=true;},exclude:function selectionExclude(){me.updateAfterKeepOnly(false);me.noHighlightAfterKeepOnlyExcludeDrill=true;},drill:function selectionDrill(menuItem){$VISUTIL.doDrill(me,menuItem.ctxt.drillUnit,updateDropZoneInDrill,menuItem.ctxt);me.noHighlightAfterKeepOnlyExcludeDrill=true;},showData:function selectionShowData(){me.showData(me.getContextMenuSelectedCardsInfo());}};if(handlers.hasOwnProperty(name)){return handlers[name];}return mstrmojo.emptyFn;},getActionInfo:function getActionInfo(singleCard){var info=[],dataModel=singleCard.dataModel;info.push({n:dataModel.categoryName,tid:dataModel.attrId,v:dataModel.categoryElemName,eid:dataModel.elemId});return info;},getContextMenuSelectedCardsInfo:function getContextMenuSelectedCardsInfo(){var info=[],me=this;$ARR.forEach(this.contextMenuSelections,function(singleCard){info.push(me.getActionInfo(singleCard));});return info;},getCardInfoByElementId:function getCardInfoByElementId(elemId){var ret={};if(this.layoutor){this.layoutor.forEachChild(function(singleCard,idx){if(singleCard.dataModel&&singleCard.dataModel.elemId===elemId){ret={card:singleCard,index:idx};return false;}});}return ret;},singleSelectMobile:function singleSelectMobile(x,y,type){var singleCard,singleCardDataModel,layoutor=this.layoutor,slideIndex,rectInfo,message,selection,toolTipTriggered=false,relativeX,relativeY,inStackedMode=this.isInStackedMode();this.hideAllToolTip();if(inStackedMode){slideIndex=layoutor.getCurrentSlickSlideIndex();singleCard=layoutor.getChildByIndex(slideIndex);}else{singleCard=this.getCardByAix(x,y);}rectInfo=singleCard&&singleCard.getSize();if(inStackedMode){rectInfo.x=0;}if((type===1||type===2)&&rectInfo){relativeX=x-rectInfo.x;relativeY=y-rectInfo.y;toolTipTriggered=singleCard.mobileShowToolTip(relativeX,relativeY);}if(inStackedMode){if(this.isStackedAutoPlay()){if(type===0||(type===1&&toolTipTriggered)||type===2){this.layoutor.toggleSlick(false);}}}message={type:type,toolTipTriggered:toolTipTriggered};if(singleCard&&type!==1&&!toolTipTriggered){singleCardDataModel=singleCard.dataModel;if(singleCardDataModel){selection={rowIndex:singleCardDataModel.rowIdx,colIndex:singleCardDataModel.colIdx,elemId:singleCardDataModel.elemId,rectInfo:rectInfo};}}message.selection=!!selection?selection:{};window.webkit.messageHandlers.cardMobileInteraction.postMessage(message);},multiSelectMobile:function multiSelectMobile(x,y,width,height,type){var rect={x:x,y:y,w:width,h:height},selections=this.mobileAreaSelect(rect),message;this.hideAllToolTip();message={type:type,selections:selections};window.webkit.messageHandlers.cardMobileInteraction.postMessage(message);},getCardByAix:function getCardByAix(x,y){var ret=null,cardRect;this.layoutor.forEachChild(function(singleCard){cardRect=singleCard.getSize();if(cardRect&&rectPointIntersection(cardRect,x,y)){ret=singleCard;return false;}});return ret;},mobileAreaSelect:function mobileAreaSelect(rect){var selections=[],singleCardDataModel,rectInfo,selection,layoutor=this.layoutor;if(isNaN(rect.x)||isNaN(rect.y)||isNaN(rect.w)||isNaN(rect.h)){return selections;}layoutor.forEachChild(function(singleCard){rectInfo=singleCard.getSize();if(rectInfo){var bound=$HASH.copy(rectInfo,{});if(layoutor.scrollNode){bound.x-=layoutor.scrollNode.scrollLeft;bound.y-=layoutor.scrollNode.scrollTop;}if(!isNaN(rectIntersection(bound,rect).x)){singleCardDataModel=singleCard.dataModel;if(singleCardDataModel){selection={rowIndex:singleCardDataModel.rowIdx,colIndex:singleCardDataModel.colIdx,elemId:singleCardDataModel.elemId,rectInfo:rectInfo};}selections.push(selection);}}});return selections;},mobileHideAllToolTip:function mobileHideAllToolTip(){this.hideAllToolTip();},hideAllToolTip:function hideAllToolTip(){this.layoutor.forEachChild(function(singleCard){singleCard.mobileHideToolTip();});},slickPlayMobile:function slickPlayMobile(isPause){if(this.isInStackedMode()){this.layoutor.toggleSlick(!isPause);}},initialHighlightMobile:function initialHighlightMobile(elements,type){var selections=[],layoutor=this.layoutor,singleCard,singleCardInfo,singleCardDataModel,elementCount=elements.length,message,rectInfo,selection,i;for(i=0;i<elementCount;i+=1){singleCardInfo=this.getCardInfoByElementId(elements[i]);singleCard=singleCardInfo.card;if(singleCard){rectInfo=singleCard.getSize();if(this.isInStackedMode()){layoutor.manualSlickGoto(singleCardInfo.index);layoutor.toggleSlick(false);rectInfo.x=0;}singleCardDataModel=singleCard.dataModel;if(singleCardDataModel){selection={rowIndex:singleCardDataModel.rowIdx,colIndex:singleCardDataModel.colIdx,elemId:singleCardDataModel.elemId,rectInfo:rectInfo};}selections.push(selection);}}message={type:type,selections:selections};window.webkit.messageHandlers.cardMobileInteraction.postMessage(message);},syncStackAutoPlayMobile:function syncStackAutoPlayMobile(slideIndex){var layoutor=this.layoutor,elemId,singleCard,singleCardDataModel;singleCard=layoutor.getChildByIndex(slideIndex);if(singleCard){singleCardDataModel=singleCard.dataModel;if(singleCardDataModel){elemId=singleCardDataModel.elemId;}}var message={type:9,elemId:elemId,slideIndex:slideIndex};window.webkit.messageHandlers.cardMobileInteraction.postMessage(message);},swipeMobile:function swipeMobile(isNext,type){var layoutor=this.layoutor,slideIndex,singleCard,singleCardDataModel,message,rectInfo,selection;if(this.isInStackedMode()){if(!isNext){layoutor.manualSlickPrev();}else{layoutor.manualSlickNext();}}slideIndex=layoutor.getCurrentSlickSlideIndex();singleCard=layoutor.getChildByIndex(slideIndex);if(singleCard){rectInfo=singleCard&&singleCard.getSize();if(this.isInStackedMode()){rectInfo.x=0;}singleCardDataModel=singleCard.dataModel;if(singleCardDataModel){selection={rowIndex:singleCardDataModel.rowIdx,colIndex:singleCardDataModel.colIdx,elemId:singleCardDataModel.elemId,rectInfo:rectInfo};}}message={type:type,selection:selection};window.webkit.messageHandlers.cardMobileInteraction.postMessage(message);},updateTooltipPos:function updateTooltipPos(x,y){this.tooltipPos.x=x;this.tooltipPos.y=y;},showTooltip:function showTooltip(content){var tooltipWin=this.tooltipWin,tooltipNode=tooltipWin&&tooltipWin.domNode;if(!tooltipNode){return ;}if(!tooltipNode.parentNode){document.body.appendChild(tooltipNode);}tooltipWin.toggle(true);if($HASH.equals(content,this.tooltipCont)){tooltipWin.moveTo(this.tooltipPos.x,this.tooltipPos.y);}else{tooltipWin.displayInfo(content,this.tooltipPos);this.tooltipCont=content;}},hideTooltip:function hideTooltip(){if(this.tooltipWin){this.tooltipWin.toggle(false);}}});}());