(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.gmaps.MapEnums","mstrmojo.gmaps.layer.BubbleLayer");var $ARR=mstrmojo.array,$HASH=mstrmojo.hash,$GMAPS=mstrmojo.gmaps,ENUM_PROPERTY_TYPE=$GMAPS.EnumPropertyType;var MIN_PATH_BUBBLE_RADIUS=1,MAX_PATH_BUBBLE_RADIUS=2,DEFAULT_PATH_BUBBLE_RADIUS=10;function filterOutPathAndTextGraphics(graphics){return $ARR.filter(graphics,function(graphic){return !graphic.isPath&&!graphic.isText;});}function animateGraphics(graphics,index,gap,isBubble){if(!index){clearTimeout(isBubble?this.bubbleTimer:this.pathTimer);}index=index||0;graphics[index].geometry.setVisibility("visible");if(++index<graphics.length){var me=this,timer=setTimeout(function(){animateGraphics.call(me,graphics,index,gap,isBubble);},gap);if(isBubble){this.bubbleTimer=timer;}else{this.pathTimer=timer;}}}function setGraphicsVisibility(graphics,visibility,timer){clearTimeout(timer);$ARR.forEach(graphics,function(graphic){graphic.geometry.setVisibility(visibility);});}mstrmojo.gmaps.layer.PathLayer=mstrmojo.declare(mstrmojo.gmaps.layer.BubbleLayer,null,{scriptClass:"mstrmojo.gmaps.layer.PathLayer",pathFillColor:"#FF0000",bubbleGraphics:null,pathGraphics:null,bubbleTimer:null,pathTimer:null,zoomLevel:null,initParams:function initParams(){this._super();this.bubbleGraphics=[];this.pathGraphics=[];this.minRadius=MIN_PATH_BUBBLE_RADIUS;this.maxRadius=MAX_PATH_BUBBLE_RADIUS;},loadLayerProps:function loadLayerProps(layerProps){this._super(layerProps);var pathFillColor=layerProps[ENUM_PROPERTY_TYPE.pathColor];if(pathFillColor){this.pathFillColor="#"+pathFillColor;}this.isClustered=false;},initMaxMinSizeRange:function initMaxMinSizeRange(){if(this.hasSizeByMetric()){this.initMaxMinDataRange();this.maxMinSizeRange={min:this.minRadius,max:this.maxRadius};}else{this.maxMinSizeRange={min:DEFAULT_PATH_BUBBLE_RADIUS,max:DEFAULT_PATH_BUBBLE_RADIUS};}},buildGraphics:function buildGraphics(shapeInfoArr){if(!shapeInfoArr||!($ARR.isArray(shapeInfoArr))){return ;}var bubbleGraphics=this.bubbleGraphics,bubbleGraphic,pathGraphic,previousGraphic=null,shapeInfo=shapeInfoArr[0],labelPosition=shapeInfo&&shapeInfo.geoData||{},labelLng=shapeInfo&&shapeInfo.geoData.lng,currentLng,i;for(i=0;i<shapeInfoArr.length;i++){shapeInfo=shapeInfoArr[i];bubbleGraphic=this.buildGraphic(shapeInfo);bubbleGraphics.push(bubbleGraphic);this.addGraphic(bubbleGraphic);if(i>0){pathGraphic=this.buildPathGraphic(previousGraphic,bubbleGraphic,shapeInfo);this.pathGraphics.push(pathGraphic);}previousGraphic=bubbleGraphic;currentLng=shapeInfo.geoData.lng;if(currentLng>labelLng){labelLng=currentLng;labelPosition=shapeInfo.geoData;}}$ARR.forEach(this.pathGraphics,function(graphic){this.addGraphic(graphic);},this);this.buildViewer();},buildPathGraphic:function buildPathGraphic(graphicFrom,graphicTo,shapeInfo){return new $GMAPS.graphic.Graphic({parent:this,type:"Polygon",geoData:[[graphicFrom.geoData,graphicTo.geoData]],graphicFrom:graphicFrom,graphicTo:graphicTo,attributes:$HASH.copy(shapeInfo.attributes,{fillColor:this.pathFillColor}),infoTemplate:this.infoTemplate,isPath:true});},callbackForUpdateGraphics:function callbackForUpdateGraphics(){this._super();setGraphicsVisibility(this.pathGraphics,"hidden",this.pathTimer);this.animatePaths();},animateBubbles:function animateBubbles(){animateGraphics.call(this,this.bubbleGraphics,0,50,true);},animatePaths:function animatePaths(){animateGraphics.call(this,this.pathGraphics,0,150,false);},handleClickEvt:function handleClickEvt(){setGraphicsVisibility(this.bubbleGraphics,"hidden",this.bubbleTimer);},handleGraphicsClick:function handleGraphicsClick(graphicArr,evt,isRMC){if(!this.map){return ;}var clickOnPath=$ARR.filterOne(graphicArr,function(graphic){return graphic.isPath;});if(clickOnPath){var bubbleGraphics=this.bubbleGraphics;clearTimeout(this.bubbleTimer);this.bubbleTimer=setTimeout(function(){setGraphicsVisibility(bubbleGraphics,"visible");},100);return ;}var clickOnText=$ARR.filterOne(graphicArr,function(graphic){return graphic.isText;});if(clickOnText){this.animateBubbles();return ;}this._super(filterOutPathAndTextGraphics(graphicArr),evt,isRMC);},getTooltipContent:function getTooltipContent(graphics){return this._super(filterOutPathAndTextGraphics(graphics));},searchGraphicsContained:function searchGraphicsContained(selectionShape){return filterOutPathAndTextGraphics(this._super(selectionShape));},clearAllSelectedGraphics:function clearAllSelectedGraphics(enableClearAll){setGraphicsVisibility(this.bubbleGraphics,"hidden",this.bubbleTimer);this._super(enableClearAll);},supportDataLabel:function supportDataLabel(){return false;},unrender:function unrender(){clearTimeout(this.bubbleTimer);clearTimeout(this.pathTimer);this._super();},destroy:function destroy(){delete this.bubbleGraphics;delete this.pathGraphics;this._super();}});}());