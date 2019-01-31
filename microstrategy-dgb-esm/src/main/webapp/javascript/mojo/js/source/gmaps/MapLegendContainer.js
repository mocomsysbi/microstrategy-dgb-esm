(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.css","mstrmojo.dom","mstrmojo.Vis","mstrmojo.gmaps.MapEnums","mstrmojo.gmaps.MapLegendEnums","mstrmojo.gmaps.MapSingleLegend","mstrmojo._HasOwnAvatar","mstrmojo.gmaps.MapUtils");var $MOJO=mstrmojo,$CSS=$MOJO.css,$DOM=$MOJO.dom,$GMAPS=$MOJO.gmaps,$MUTIL=$GMAPS.MapUtils,$ARR=$MOJO.array,LEGEND_CON_STYLE=$GMAPS.LegendContainerStyles,LGD_CON_PADDING_RIGHT=LEGEND_CON_STYLE.PADDING_RIGHT,LEGEND_SIZE_LIMIT=$GMAPS.LegendSizeLimits,MAX_CON_WIDTH=LEGEND_SIZE_LIMIT.MAX_CON_WIDTH,MIN_TEXT_WIDTH=LEGEND_SIZE_LIMIT.MIN_TEXT_WIDTH,LEGEND_STYLE=$GMAPS.LegendStyles,LGD_CONTENT_DATA_MARGIN_LEFT=LEGEND_STYLE.CONTENT_DATA_MARGIN_LEFT,LGD_CONTENT_DATA_COLOR_BLOCK_WIDTH=LEGEND_STYLE.CONTENT_DATA_COLOR_BLOCK_WIDTH,LGD_CONTENT_DATA_TEXT_MARGIN_LEFT=LEGEND_STYLE.CONTENT_DATA_TEXT_MARGIN_LEFT,DEFAULT_ANCHOR_LEFT_X=6,DEFAULT_ANCHOR_BOTTOM_Y=34,LEGEND=$GMAPS.MapSingleLegend,HALF_SPLITTER_THICKNESS=4,TOP_PADDING=60,TOP_PADDING_TITLE_BAR=38,MIN_HEIGHT_PADDING=30,MIN_SECTION_HEIGHT=44,LGD_TITLE_BAR_HEIGHT=18,LGD_SLOT_BOTTOM_THICKNESS=6,LGD_SLOT_BOTTOM_ALTER_THICKNESS=7,LGD_CON_BORDER_HEIGHT=1,LGD_CON_BOTTOM_PADDING=2,PX="px",LGDS=$GMAPS.EnumPropertyType.legendSize;function removeNode(node,parentNode){if(node.parentNode===parentNode){parentNode.removeChild(node);return true;}return false;}function removeMapLegendNode(layerKey){var lgdConBody=this.lgdConBody,lgdSlots=this.legendSlots,lgdNode;if(!this.isLegendExist(layerKey)){return false;}lgdNode=lgdSlots[layerKey].domLgd;if(removeNode(lgdNode,lgdConBody)){this.lgdDisplayCount-=1;if(this.lgdDisplayCount<=0){this.hideLegendCon();}}return true;}function findInsertionPos(layerKey){var map=this.widget,layerKeyArr=map.layerIdxMappingArr,idx,layerIdx=-1,curLayerKey;for(idx=0;idx<layerKeyArr.length;idx+=1){curLayerKey=layerKeyArr[idx];if(layerIdx<0&&layerKey===curLayerKey){layerIdx=idx;}else{if(layerIdx>=0&&this.checkLegendDisplay(curLayerKey)){return curLayerKey;}}}return null;}function appendMapLegendNode(layerKey){var lgdConBody=this.lgdConBody,lgdNode,lgdSlots=this.legendSlots,nextLayerKey;if(!this.isLegendExist(layerKey)){return false;}lgdNode=lgdSlots[layerKey].domLgd;if(!$DOM.contains(lgdConBody,lgdNode)){nextLayerKey=findInsertionPos.call(this,layerKey);if(nextLayerKey){lgdConBody.insertBefore(lgdNode,lgdSlots[nextLayerKey].domLgd);}else{lgdConBody.appendChild(lgdNode);}this.lgdDisplayCount+=1;this.showLegendCon();}return true;}function appendMapLegend(legend,layerKey){var lgdSlots=this.legendSlots;if(!legend||this.isLegendExist(layerKey)){return ;}lgdSlots[layerKey]=legend;}function positionAdjust(position,info){var min=info&&info.min,max=info&&info.max;if(min!==undefined){position=Math.max(position,min);}if(max!==undefined){position=Math.min(position,max);}return position;}mstrmojo.gmaps.MapLegendContainer=mstrmojo.declare(mstrmojo.Vis,[mstrmojo._HasOwnAvatar],{scriptClass:"mstrmojo.gmaps.MapLegendContainer",widget:null,defaultAnchorPoint:null,legendSlots:null,lgdDisplayCount:0,conPosition:null,manualConHeight:-1,manualConHeightCollapse:-1,zoomLevelSub:null,markupString:'<div id="@id" class="map-legend-container-dockedNode" mstrAttach:click,mouseover,mouseout><div class="map-legend-container"><div class="map-legend-container-title-bar"><div class="map-legend-container-close-button"></div></div><div class="map-legend-container-content"></div></div><div class="map-legend-right-splitter"></div><div class="map-legend-top-splitter"></div><div class="map-legend-resizeRect"></div></div>',markupSlots:{dockedDom:function(){return this.domNode;},domLgdCon:function(){return this.domNode.firstChild;}},isDragValid:function isDragValid(context){return !mstrApp.isInVFInteractMode;},init:function init(props){this._super(props);this.legendSlots={};this.defaultAnchorPoint={left:DEFAULT_ANCHOR_LEFT_X,bottom:DEFAULT_ANCHOR_BOTTOM_Y};},destroyLegendCon:function destroyLegendCon(){var map=this.widget,layerKeyArr=map.layerIdxMappingArr,idx,layerKey,baseLayer=map&&map.mapViewer&&map.mapViewer.baseLayer;for(idx=0;idx<layerKeyArr.length;idx+=1){layerKey=layerKeyArr[idx];delete this.legendSlots[layerKey];}if(baseLayer){baseLayer.detachEventListener(this.zoomLevelSub);}this.zoomLevelSub=null;this.widget=null;},initializeLgdCon:function initializeLgdCon(map){var maxWidth,minWidth,baseLayer=map.mapViewer.baseLayer,me=this,legendSizeProp=map.getPropertyValue(LGDS),domStyle=this.dockedDom.style;this.widget=map;maxWidth=Math.max(map.getWidth()*0.2,MAX_CON_WIDTH);minWidth=MIN_TEXT_WIDTH+LGD_CONTENT_DATA_MARGIN_LEFT+LGD_CONTENT_DATA_COLOR_BLOCK_WIDTH+LGD_CONTENT_DATA_TEXT_MARGIN_LEFT+LGD_CON_PADDING_RIGHT;domStyle.maxWidth=maxWidth+PX;domStyle.minWidth=minWidth+PX;this.setLegendConSizeByProp(legendSizeProp);$MUTIL.setNodeAttributes(this.closeBtn,{title:mstrmojo.desc(12002,"Hide Legend")});this.zoomLevelSub=baseLayer.attachEventListener("zoomLevelChanged",this.id,function(){me.refreshMapLegendNodes();});if(this.lgdDisplayCount<=0){this.hideLegendCon();}},setLegendConSizeByProp:function setLegendConSizeByProp(legendSizeProp){var legendSize=legendSizeProp?JSON.parse(legendSizeProp):{},propWidth=legendSize.w,propHeight=legendSize.h,propCollapseHeight=legendSize.ch,domStyle=this.dockedDom.style;if(propWidth&&propWidth>0){domStyle.width=propWidth+PX;}else{domStyle.width="auto";}if(propHeight&&propHeight>0){this.manualConHeight=propHeight;domStyle.height=propHeight+PX;}else{this.manualConHeight=-1;domStyle.height="auto";}if(propCollapseHeight&&propCollapseHeight>0){this.manualConHeightCollapse=propCollapseHeight;}else{this.manualConHeightCollapse=-1;}},handleLegendConSizePropChange:function handleLegendConSizePropChange(legendSizeProp){this.setLegendConSizeByProp(legendSizeProp);this.resetAndHandleLayerLegendsHeight();},calDefaultDockedPositions:function calDefaultDockedPositions(){var anchorPoint=this.defaultAnchorPoint;this.conPosition={left:anchorPoint.left,bottom:anchorPoint.bottom};this.updateLegendContainerPosition();},updateLegendContainerPosition:function updateLegendContainerPosition(){var dockedDom=this.dockedDom,conPosition=this.conPosition;dockedDom.style.left=conPosition.left+PX;dockedDom.style.bottom=conPosition.bottom+PX;},postBuildRendering:function postBuildRendering(){this._super();var dockedDom=this.dockedDom,lgdCon=this.domLgdCon,titleBar=lgdCon.firstChild,closeBtn=titleBar.lastChild,lgdConBody=lgdCon.childNodes[1],rightSplitter=dockedDom.childNodes[1],topSplitter=dockedDom.childNodes[2],resizeRect=dockedDom.lastChild;this.addSlots({titleBar:titleBar,closeBtn:closeBtn,lgdConBody:lgdConBody,rightSplitter:rightSplitter,topSplitter:topSplitter,resizeRect:resizeRect});$CSS.addClass(this.closeBtn,"disable");},createSingleMapLegend:function createSingleMapLegend(layerKey,display){var legend,map=this.widget,layer=map.getGraphicLayer(layerKey),lgdId=layerKey+"-legend",lgdTitle=layer.getLayerName(),lgdData={colorByData:layer.colorByInfo,sizeByData:layer.sizeByInfo};if(this.isLegendExist(layerKey)){return false;}legend=new LEGEND();legend.render();legend.initializeLegend(lgdId,lgdTitle,lgdData,layer,map.id,display);appendMapLegend.call(this,legend,layerKey);this.refreshSingleMapLegendNode(layerKey);return true;},refreshSplitter:function refreshSplitter(){this.rightSplitter.style.height=this.dockedDom.offsetHeight+PX;this.rightSplitter.style.left=this.dockedDom.offsetWidth-HALF_SPLITTER_THICKNESS+PX;this.topSplitter.style.width=this.dockedDom.offsetWidth+PX;this.topSplitter.style.bottom=this.dockedDom.offsetHeight-HALF_SPLITTER_THICKNESS+PX;},getMaxConHeight:function getMaxConHeight(){var map=this.widget,dockedDom=this.dockedDom,dockedDomOffsetBottom=map.getHeight()-dockedDom.offsetTop-dockedDom.offsetHeight,padding=map.isTitleBarVisible()?TOP_PADDING_TITLE_BAR:TOP_PADDING;return map.getHeight()-dockedDomOffsetBottom-padding;},checkLegendDisplay:function checkLegendDisplay(layerKey){var map=this.widget,layer;layer=map.getGraphicLayer(layerKey);return this.isLegendExist(layerKey)&&this.isLegendVisible(layerKey)&&layer&&layer.isVisible()&&layer.isLayerInZoomRange();},refreshSingleMapLegendNode:function refreshSingleMapLegendNode(layerKey){if(!this.isLegendExist(layerKey)){return ;}if(this.checkLegendDisplay(layerKey)){appendMapLegendNode.call(this,layerKey);}else{removeMapLegendNode.call(this,layerKey);}this.resetAndHandleLayerLegendsHeight();},refreshMapLegendNodes:function refreshMapLegendNodes(){var map=this.widget,layerKeyArr=map.layerIdxMappingArr,idx,layerKey,lgdConBody=this.lgdConBody,lgdSlots=this.legendSlots,lgdNode;this.lgdDisplayCount=0;for(idx=0;idx<layerKeyArr.length;idx+=1){layerKey=layerKeyArr[idx];if(this.isLegendExist(layerKey)){lgdNode=lgdSlots[layerKey].domLgd;removeNode(lgdNode,lgdConBody);}}for(idx=0;idx<layerKeyArr.length;idx+=1){layerKey=layerKeyArr[idx];if(this.checkLegendDisplay(layerKey)){lgdNode=lgdSlots[layerKey].domLgd;lgdConBody.appendChild(lgdNode);this.lgdDisplayCount+=1;}}if(this.lgdDisplayCount>0){this.showLegendCon();}else{this.hideLegendCon();}this.resetAndHandleLayerLegendsHeight();},hideAllMapLegendNodes:function hideAllMapLegendNodes(){var map=this.widget,layerKeyArr=map.layerIdxMappingArr,idx,layerKey;for(idx=0;idx<layerKeyArr.length;idx+=1){layerKey=layerKeyArr[idx];this.hideSingleLegend(layerKey);}},showSingleLegend:function showSingleLegend(layerKey){if(!this.isLegendExist(layerKey)||this.isLegendVisible(layerKey)){return ;}this.legendSlots[layerKey].showLegend();this.refreshSingleMapLegendNode(layerKey);},hideSingleLegend:function hideSingleLegend(layerKey){if(!this.isLegendExist(layerKey)||!this.isLegendVisible(layerKey)){return ;}this.legendSlots[layerKey].hideLegend();this.refreshSingleMapLegendNode(layerKey);},hideLegendCon:function hideLegendCon(){$CSS.addClass(this.dockedDom,"disable");},showLegendCon:function showLegendCon(){$CSS.removeClass(this.dockedDom,"disable");},isLegendExist:function isLegendExist(layerKey){return !!this.legendSlots[layerKey];},isLegendVisible:function isLegendVisible(layerKey){if(this.isLegendExist(layerKey)){return this.legendSlots[layerKey].isShown();}return false;},handleWidgetResize:function handleWidgetResize(){this.resetAndHandleLayerLegendsHeight();},resetLegendColorByData:function resetLegendColorByData(layerKey,cbData){var map,layer,lgd;if(this.isLegendExist(layerKey)){map=this.widget;layer=map.getGraphicLayer(layerKey);lgd=this.legendSlots[layerKey];lgd.resetColorByData(cbData,layer,map.id);this.refreshSingleMapLegendNode(layerKey);}},resetLegendSizeByData:function resetLegendSizeByData(layerKey,sbData){var lgd;if(this.isLegendExist(layerKey)){lgd=this.legendSlots[layerKey];lgd.resetSizeByData(sbData);this.refreshSingleMapLegendNode(layerKey);}},removeLegendBySwitchProp:function removeLegendBySwitchProp(layerKey){var lgdSlots;if(this.isLegendExist(layerKey)){lgdSlots=this.legendSlots;removeMapLegendNode.call(this,layerKey);delete lgdSlots[layerKey];}},destroyLegend:function destroyLegend(layerKey){if(this.isLegendExist(layerKey)){removeMapLegendNode.call(this,layerKey);delete this.legendSlots[layerKey];this.resetAndHandleLayerLegendsHeight();}},resetLegendConHeight:function resetLegendConHeight(){this.manualConHeight=-1;this.manualConHeightCollapse=-1;this.resetLayerLegendsHeight();},resetAndHandleLayerLegendsHeight:function resetAndHandleLayerLegendsHeight(){this.resetLayerLegendsHeight();if(this.lgdDisplayCount>0){this.handleHeight();}},resetLayerLegendsHeight:function resetLayerLegendsHeight(){var lgdSlots=this.legendSlots,lgd,sizeBySlot,colorBySlot,i,key,keys=Object.keys(lgdSlots);for(i=0;i<keys.length;i+=1){key=keys[i];lgd=lgdSlots[key];if(lgd){colorBySlot=lgd.colorBySlot;if(colorBySlot){colorBySlot.initTableOffsetHeight=-1;colorBySlot.contentElementTable.style.height="auto";}sizeBySlot=lgd.sizeBySlot;if(sizeBySlot){sizeBySlot.initTableOffsetHeight=-1;sizeBySlot.contentElementTable.style.height="auto";}}}this.dockedDom.style.height="auto";},resetSize:function resetSize(){this.dockedDom.style.width="auto";this.resetLegendConHeight();},onclick:function(evt){var target=evt.getTarget();if(target===this.closeBtn){this.hideAllMapLegendNodes();this.resetSize();this.widget.closeLegendConWithSizeUpdate();}$DOM.stopPropogation(null,evt.e);},getHSplitterInfo:function getHSplitterInfo(splitter,isRight){if(!splitter){return{};}var rtn={},startLeft=splitter.offsetLeft,curWidth=this.dockedDom.offsetWidth,maxWidth=Math.min(this.widget.getWidth()*0.25,MAX_CON_WIDTH),minWidth=MIN_TEXT_WIDTH+LGD_CONTENT_DATA_MARGIN_LEFT+LGD_CONTENT_DATA_COLOR_BLOCK_WIDTH+LGD_CONTENT_DATA_TEXT_MARGIN_LEFT+LGD_CON_PADDING_RIGHT;if(isRight){rtn.min=minWidth-HALF_SPLITTER_THICKNESS;rtn.max=maxWidth-HALF_SPLITTER_THICKNESS;}else{rtn.min=curWidth-maxWidth;rtn.max=curWidth-minWidth;}rtn.startLeft=startLeft;return rtn;},getSectionCount:function getSectionCount(){var lgdSlots=this.legendSlots,lgd,count=0,i,key,keys=Object.keys(lgdSlots);for(i=0;i<keys.length;i+=1){key=keys[i];lgd=lgdSlots[key];if(lgd.colorBySlot){count+=1;}if(lgd.sizeBySlot){count+=1;}}return count;},getTopSplitterInfo:function getTopSplitterInfo(splitter){if(!splitter){return{};}var rtn={},dockedDom=this.dockedDom,startBottom=-splitter.offsetTop+dockedDom.offsetHeight;rtn.max=this.getMaxConHeight()-HALF_SPLITTER_THICKNESS;rtn.min=this.getSectionCount()*MIN_SECTION_HEIGHT+MIN_HEIGHT_PADDING-HALF_SPLITTER_THICKNESS;rtn.startBottom=startBottom;return rtn;},positionHResizeRect:function positionHResizeRect(target,isRight){var offsetLeft=target.offsetLeft,left=isRight?0:offsetLeft,width=isRight?offsetLeft+HALF_SPLITTER_THICKNESS:0;this.resizeRect.style.bottom="0px";this.resizeRect.style.left=left+PX;this.resizeRect.style.width=width+PX;},positionTopResizeRect:function positionTopResizeRect(target){var offsetBottom=-target.offsetTop+this.dockedDom.offsetHeight;this.resizeRect.style.bottom="0px";this.resizeRect.style.left="0px";this.resizeRect.style.height=offsetBottom-HALF_SPLITTER_THICKNESS+PX;},ondragstart:function ondragstart(evt){var target=evt.src.e.target;if(target===this.rightSplitter){evt.src.posInfo=this.getHSplitterInfo(target,true);this.positionHResizeRect(target,true);this.resizeRect.style.height=this.dockedDom.offsetHeight+PX;$CSS.addClass(this.resizeRect,"resizing");}else{if(target===this.topSplitter){evt.src.posInfo=this.getTopSplitterInfo(target);this.positionTopResizeRect(target);this.resizeRect.style.width=this.dockedDom.offsetWidth+PX;$CSS.addClass(this.resizeRect,"resizing");}}},getHSplitterPosition:function getHSplitterPosition(evt){var info=evt.src.posInfo,position=info.startLeft+evt.tgt.pos.x-evt.src.pos.x;return positionAdjust(position,info);},getTopSplitterPosition:function getTopSplitterPosition(evt){var info=evt.src.posInfo,position=info.startBottom-evt.tgt.pos.y+evt.src.pos.y;return positionAdjust(position,info);},ondragmove:function ondragmove(evt){var target=evt.src.e.target,left,bottom;if(target===this.rightSplitter){left=this.getHSplitterPosition(evt);target.style.left=left+PX;this.positionHResizeRect(target,true);}else{if(target===this.topSplitter){bottom=this.getTopSplitterPosition(evt);target.style.bottom=bottom+PX;this.positionTopResizeRect(target);}}},ondragend:function ondragend(evt){var target=evt.src.e.target,offsetBottom,height;if(target===this.rightSplitter){$CSS.removeClass(this.resizeRect,"resizing");this.dockedDom.style.width=target.offsetLeft+HALF_SPLITTER_THICKNESS+PX;this.handleHeight();this.writeLegendSize();}else{if(target===this.topSplitter){$CSS.removeClass(this.resizeRect,"resizing");if(!this.isAllLegendsCollapse()){offsetBottom=-1*target.offsetTop+this.dockedDom.offsetHeight;height=offsetBottom-HALF_SPLITTER_THICKNESS;if(!this.hasLegendCollapse()){this.manualConHeight=height;}else{this.manualConHeightCollapse=height;}this.handleHeight(true);this.writeLegendSize();}}}},onmouseover:function onmouseover(evt){$CSS.removeClass(this.closeBtn,"disable");},onmouseout:function onmouseout(evt){$CSS.addClass(this.closeBtn,"disable");},isManualHeight:function isManualHeight(){return this.manualConHeight>0;},isManualHeightCollapse:function isManualHeightCollapse(){return this.manualConHeightCollapse>0;},getAllLgdContentSlots:function getAllLgdContentSlots(){var lgdSlots=this.legendSlots,lgd,cSlots=[],sizeBySlot,colorBySlot,sSlots=[],lgdCount=0,cSlotCount=0,sSlotCount=0,curHeight,curMaxHeight=0,i,j,key,keys=Object.keys(lgdSlots);for(i=0;i<keys.length;i+=1){key=keys[i];if(!this.checkLegendDisplay(key)){continue;}lgd=lgdSlots[key];if(!lgd.isCollapse()){colorBySlot=lgd.colorBySlot;if(colorBySlot){if(colorBySlot.initTableOffsetHeight<0){colorBySlot.initTableOffsetHeight=colorBySlot.contentElementTable.offsetHeight;}curHeight=colorBySlot.initTableOffsetHeight;if(curHeight>=curMaxHeight){curMaxHeight=curHeight;cSlots.push(colorBySlot);}else{for(j=cSlotCount-1;j>=0;j-=1){if(cSlots[j].initTableOffsetHeight<=curHeight){$ARR.insert(cSlots,j+1,colorBySlot);break;}}if(j===-1){$ARR.insert(cSlots,0,colorBySlot);}}cSlotCount+=1;}sizeBySlot=lgd.sizeBySlot;if(sizeBySlot){if(sizeBySlot.initTableOffsetHeight<0){sizeBySlot.initTableOffsetHeight=sizeBySlot.contentElementTable.offsetHeight;}sSlots.push(sizeBySlot);sSlotCount+=1;}}lgdCount+=1;}return{lgdCount:lgdCount,slotCount:cSlotCount+sSlotCount,cSlots:cSlots,sSlots:sSlots};},adjustHeightConst:function adjustHeightConst(height){this.heightAdjust(height);},adjustHeightManual:function adjustHeightManual(heightResize){var finalHeight=this.heightAdjust(this.manualConHeight);if(heightResize===true){this.manualConHeight=finalHeight;}},adjustHeightManualCollapse:function adjustHeightManualCollapse(heightResize){var finalHeight=this.heightAdjust(this.manualConHeightCollapse);if(heightResize===true){this.manualConHeightCollapse=finalHeight;}if(this.isManualHeight()&&this.manualConHeightCollapse>this.manualConHeight){this.manualConHeight=this.manualConHeightCollapse;}},handleHeight:function handleHeight(heightResize){var dockedDom=this.dockedDom,maxHeight=this.getMaxConHeight(),heightBuffer=2;if(this.hasLegendCollapse()){if(this.isManualHeightCollapse()){this.adjustHeightManualCollapse(heightResize);if(dockedDom.offsetHeight>maxHeight+heightBuffer){this.resetLegendConHeight();this.adjustHeightConst(maxHeight);}}else{if(dockedDom.offsetHeight>maxHeight){this.adjustHeightConst(maxHeight);}}}else{if(this.isManualHeight()){this.adjustHeightManual(heightResize);if(dockedDom.offsetHeight>maxHeight+heightBuffer){this.resetLegendConHeight();this.adjustHeightConst(maxHeight);}}else{if(dockedDom.offsetHeight>maxHeight){this.adjustHeightConst(maxHeight);}}}this.refreshSplitter();},heightAdjust:function heightAdjust(targetHeight){var titleBarHeight=this.titleBar.offsetHeight,lgdContentSlots=this.getAllLgdContentSlots(),lgdCount=lgdContentSlots.lgdCount,slotCount=lgdContentSlots.slotCount,cSlots=lgdContentSlots.cSlots,sSlots=lgdContentSlots.sSlots,lgdTitleHeight=LGD_TITLE_BAR_HEIGHT*lgdCount,lgdContentWSHeight=(slotCount-1)*LGD_SLOT_BOTTOM_ALTER_THICKNESS+LGD_SLOT_BOTTOM_THICKNESS,slotTitleHeight=0,realHeight,i,sizeBySlot,colorBySlot,sSlotCount=sSlots.length,cSlotCount=cSlots.length,sSlotCalCount=sSlotCount+cSlotCount*2,adjustedSHeight,idealCHeight,cTable,restCount,oldCSlotIdx=0,curCSlotIdx=0,finalHeight;realHeight=targetHeight-LGD_CON_BORDER_HEIGHT*2-lgdContentWSHeight-lgdTitleHeight-titleBarHeight-LGD_CON_BOTTOM_PADDING;if(sSlotCalCount>0){for(i=0;i<sSlotCount;i+=1){sizeBySlot=sSlots[i];slotTitleHeight+=sizeBySlot.contentName.offsetHeight;}for(i=0;i<cSlotCount;i+=1){colorBySlot=cSlots[i];slotTitleHeight+=colorBySlot.contentName.offsetHeight;}realHeight-=slotTitleHeight;if(sSlotCount>0){adjustedSHeight=Math.min(realHeight/sSlotCalCount,sSlots[0].initTableOffsetHeight);for(i=0;i<sSlotCount;i+=1){sizeBySlot=sSlots[i];sizeBySlot.contentElementTable.style.height=adjustedSHeight+PX;}realHeight-=adjustedSHeight*sSlotCount;}restCount=cSlotCount;while(curCSlotIdx<cSlotCount){idealCHeight=realHeight/restCount;for(i=curCSlotIdx;i<cSlotCount;i+=1){colorBySlot=cSlots[i];cTable=colorBySlot.contentElementTable;if(colorBySlot.initTableOffsetHeight<idealCHeight){realHeight-=colorBySlot.initTableOffsetHeight;cTable.style.height=colorBySlot.initTableOffsetHeight+PX;curCSlotIdx+=1;restCount-=1;}}if(oldCSlotIdx===curCSlotIdx){for(i=oldCSlotIdx;i<cSlotCount;i+=1){colorBySlot=cSlots[i];cTable=colorBySlot.contentElementTable;realHeight-=idealCHeight;cTable.style.height=idealCHeight+PX;}break;}oldCSlotIdx=curCSlotIdx;}}finalHeight=targetHeight-realHeight;this.dockedDom.style.height=finalHeight+PX;return finalHeight;},checkFirstCollapse:function checkFirstCollapse(){if(!this.hasLegendCollapse()){this.manualConHeightCollapse=this.manualConHeight;}},checkLastCollapse:function checkLastCollapse(){if(!this.hasLegendCollapse()){this.manualConHeightCollapse=-1;}},handleLegendCollapsePropChange:function handleLegendCollapsePropChange(layerKey,collapse){var lgdSlots=this.legendSlots,lgd=lgdSlots&&layerKey&&lgdSlots[layerKey];if(lgd){lgd.handleLegendCollapsePropChange(collapse);}},hasLegendCollapse:function hasLegendCollapse(){var lgdSlots=this.legendSlots,lgd,i,key,keys=Object.keys(lgdSlots),keyLength=keys.length;for(i=0;i<keyLength;i+=1){key=keys[i];lgd=lgdSlots[key];if(lgd.isCollapse()){return true;}}return false;},isAllLegendsCollapse:function isAllLegendsCollapse(){var lgdSlots=this.legendSlots,lgd,i,key,keys=Object.keys(lgdSlots),keyLength=keys.length;if(!(keys&&keyLength>0)){return false;}for(i=0;i<keyLength;i+=1){key=keys[i];lgd=lgdSlots[key];if(!lgd.isCollapse()){return false;}}return true;},updateLegendTitle:function updateLegendTitle(layerKey,lgdTitle){if(this.isLegendExist(layerKey)){this.legendSlots[layerKey].updateLegendTitle(lgdTitle);}},writeLegendSize:function writeLegendSize(){var map=this.widget,key=map.getPropertyBelongingKey(LGDS);map.writeProperties(LGDS,this.getLegendConSizeProp(),key);},getLegendConSizeProp:function getLegendConSizeProp(){var dockedDom=this.dockedDom,domWidth=dockedDom.style.width,isManualWidth=domWidth&&domWidth!==""&&domWidth!=="auto",width=isManualWidth?dockedDom.offsetWidth:-1;return JSON.stringify({w:width,h:this.manualConHeight,ch:this.manualConHeightCollapse});},handleLayerVisibleChange:function handleLayerVisibleChange(layerKey){this.refreshSingleMapLegendNode(layerKey);}});}());