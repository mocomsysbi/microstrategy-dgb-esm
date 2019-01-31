(function(){mstrmojo.requiresCls("mstrmojo.Base","mstrmojo.array","mstrmojo.dom","mstrmojo.gmaps.MapUtils","mstrmojo.gmaps.MapEnums","mstrmojo.color","mstrmojo.VisUtility");var $MOJO=mstrmojo,$ARR=$MOJO.array,$DOM=$MOJO.dom,$GMAPS=$MOJO.gmaps,$MUTIL=$GMAPS.MapUtils,$AlignOption=$GMAPS.MarkerAlignOption,$EnumGeometryType=$GMAPS.EnumGeometryType,$EnumGeomertyDefaultShapeFormat=$GMAPS.EnumDefaultShapeFormatStyle,EMPTYFN=$MOJO.emptyFn,RADIUS_IN_METER=6378137,$COLOR=$MOJO.color,$U=$MOJO.VisUtility;mstrmojo.gmaps.geometry.Geometry=mstrmojo.declare(mstrmojo.Base,null,{scriptClass:"mstrmojo.gmaps.geometry.Geometry",type:null,node:null,useSvg:true,nodeTag:null,defaultClass:"mstrMap-geometry",defaultFillColor:$EnumGeomertyDefaultShapeFormat.FILL_COLOR,fillColor:null,fillOpacity:$EnumGeomertyDefaultShapeFormat.FILL_OPACITY_VALUE,strokeColor:$EnumGeomertyDefaultShapeFormat.BORDER_COLOR,strokeWidth:$EnumGeomertyDefaultShapeFormat.BORDER_WIDTH,strokeOpacity:0.8,strokeDashArray:null,visibility:null,currentFillOpacity:null,_isSelected:false,_isHover:false,strokeScale:2,mXMLNS:"http://www.w3.org/2000/svg",init:function init(props){this._super(props);this.fillColor=this.fillColor||this.defaultFillColor;this.currentFillOpacity=this.fillOpacity;this.node=this.createNode(this.nodeTag);this.initNodeStyles();this._addEventListeners();this.update(props);},_addEventListeners:function _addEventListeners(){var nd=this.getNode();if(nd){$DOM.attachEvent(nd,"mousedown",this.handleMouseDownEvt.bind(this));}},_removeEventListeners:function _removeEventListeners(){var nd=this.getNode();if(nd){$DOM.detachEvent(nd,"mousedown",this.handleMouseDownEvt);}},handleMouseDownEvt:function handleMouseDownEvt(evt){if(evt){evt.preventDefault();}},createNode:function createNode(nodeTag){return(this.useSvg!==true)?$MUTIL.createNormalNode(nodeTag):$MUTIL.createSvgNode(nodeTag);},initNodeStyles:function initNodeStyles(){$MUTIL.setNodeAttributes(this.node,{"class":this.defaultClass,fill:this.fillColor,"fill-opacity":this.fillOpacity,visibility:this.visibility});this.setStrokeStyles();},setStrokeStyles:function setStrokeStyles(){if(!!this.skipStrokeProperty){return ;}$MUTIL.setNodeAttributes(this.node,{stroke:this.strokeColor,"stroke-width":this.strokeWidth,"stroke-opacity":this.strokeOpacity,"stroke-dasharray":this.strokeDashArray});},setStrokeColor:function setStrokeColor(color){if(!this.skipStrokeProperty){$MUTIL.setNodeAttributes(this.node,{stroke:color});}this.strokeColor=color;},setStrokeWidthAndStyle:function setStrokeStyle(width,style,dashArr){if(!this.skipStrokeProperty){$MUTIL.setNodeAttributes(this.node,{"stroke-width":width,"stroke-style":style,"stroke-dasharray":dashArr});}this.strokeWidth=width;this.strokeStyle=style;this.strokeDashArray=dashArr;},setFillColor:function setFillColor(colorStr){$MUTIL.setNodeAttributes(this.node,{fill:colorStr});this.fillColor=colorStr;},setFillOpacity:function setFillOpacity(opacity){$MUTIL.setNodeAttributes(this.node,{"fill-opacity":opacity});this.fillOpacity=opacity;this.currentFillOpacity=this.fillOpacity;},setVisibility:function setVisibility(visibility){$MUTIL.setNodeAttributes(this.node,{visibility:visibility});this.visibility=visibility;},setSelection:function setSelection(isSelected){var strokeWidth=(isSelected!==true)?this.strokeWidth:(this.strokeWidth*this.strokeScale),strokeColor=(isSelected!==true)?this.strokeColor:"#000000",node=this.node,nodeAttr;if(!node){return ;}this.currentFillOpacity=(isSelected!==true)?this.fillOpacity:1;nodeAttr={"stroke-width":strokeWidth,"fill-opacity":this.currentFillOpacity,fill:this.fillColor};if($MUTIL.checkDefined($U.getPropertyByPath(this,"node.attributes.stroke",undefined))){nodeAttr.stroke=strokeColor;}$MUTIL.setNodeAttributes(this.node,nodeAttr);},setUnSelection:function setUnSelection(){var strokeWidth=this.strokeWidth,strokeColor=this.strokeColor,node=this.node,nodeAttr;if(!node){return ;}this.currentFillOpacity=this.fillOpacity*0.5;nodeAttr={"stroke-width":strokeWidth,"fill-opacity":this.currentFillOpacity,fill:this.fillColor};if($MUTIL.checkDefined($U.getPropertyByPath(this,"node.attributes.stroke",undefined))){nodeAttr.stroke=strokeColor;}$MUTIL.setNodeAttributes(this.node,nodeAttr);},setContextMenuSelection:function setContextMenuSelection(isSelected,isContextMenuSelected){var strokeWidth,fillColor,nodeAttr;if(isContextMenuSelected){fillColor=this.fillColorAjustForCMSelection(isContextMenuSelected);this.currentFillOpacity=1;strokeWidth=(isSelected!==true)?this.strokeWidth:(this.strokeWidth*this.strokeScale);nodeAttr={fill:fillColor,"stroke-width":strokeWidth,"fill-opacity":this.currentFillOpacity};if($MUTIL.checkDefined($U.getPropertyByPath(this,"node.attributes.stroke",undefined))){if(isSelected){nodeAttr.stroke="#000000";}else{nodeAttr.stroke=this.fillColor;}}$MUTIL.setNodeAttributes(this.node,nodeAttr);}else{this.setSelection(isSelected);}},fillColorAjustForCMSelection:function fillColorAjustForCMSelection(isContextMenuSelected){var R,G,B,HSV,RGB,RStr,GStr,BStr,colorStr=this.fillColor;if(isContextMenuSelected){if(colorStr.length===7){R=parseInt(colorStr.substring(1,3),16);G=parseInt(colorStr.substring(3,5),16);B=parseInt(colorStr.substring(5,7),16);}else{if(colorStr.length===4){R=parseInt(colorStr.substring(1,2)+colorStr.substring(1,2),16);G=parseInt(colorStr.substring(2,3)+colorStr.substring(2,3),16);B=parseInt(colorStr.substring(3,4)+colorStr.substring(3,4),16);}else{return colorStr;}}HSV=$COLOR.rgb2hsv(R,G,B);HSV[1]=HSV[1]*0.5;HSV[2]=parseInt(HSV[2]*1.2>100?100:HSV[2]*1.2,10);RGB=$COLOR.hsv2rgb(HSV[0],HSV[1],HSV[2]);R=parseInt(RGB[0],10);G=parseInt(RGB[1],10);B=parseInt(RGB[2],10);RStr=R<16?"0"+R.toString(16):R.toString(16);GStr=G<16?"0"+G.toString(16):G.toString(16);BStr=B<16?"0"+B.toString(16):B.toString(16);colorStr="#"+RStr+GStr+BStr;}return colorStr;},setHover:function setHover(isHovered){var fillOpacity=(isHovered!==true)?this.currentFillOpacity:(this.currentFillOpacity*0.5);$MUTIL.setNodeAttributes(this.node,{"fill-opacity":fillOpacity});},intersect:function intersect(geometry,geoData){var type=geometry&&geometry.type,isIntersect=false;switch(type){case $EnumGeometryType.Point:isIntersect=this.contains(geometry,geoData);break;case $EnumGeometryType.Extent:isIntersect=this.intersectExtent(geometry);break;case $EnumGeometryType.Polygon:isIntersect=this.intersectPolygon(geometry,geoData);break;default:break;}return isIntersect;},coolWPDistance:function coolWPDistance(lat1,lng1,lat2,lng2){if(!$MUTIL.checkVal(lat1)||!$MUTIL.checkVal(lng1)||!$MUTIL.checkVal(lat2)||!$MUTIL.checkVal(lng2)){return ;}var distance,c,w,r,d,h1,h2,f=this._getRad((lat1+lat2)/2),g=this._getRad((lat1-lat2)/2),l=this._getRad((lng1-lng2)/2),sf=Math.sin(f),sg=Math.sin(g),sl=Math.sin(l),fl=1/298.257;sg=sg*sg;sl=sl*sl;sf=sf*sf;distance=sg*(1-sl)+(1-sf)*sl;c=(1-sg)*(1-sl)+sf*sl;w=Math.atan(Math.sqrt(distance/c));r=Math.sqrt(distance*c)/w;d=2*w*RADIUS_IN_METER;h1=(3*r-1)/2/c;h2=(3*r+1)/2/distance;distance=d*(1+fl*(h1*sf*(1-sg)-h2*(1-sf)*sg));distance/=1000;return distance;},_getRad:function _getRad(d){if($MUTIL.checkVal(d)){return d*Math.PI/180;}},getGeometrySize:function getGeometrySize(){if($MUTIL.checkVal(this.width)&&$MUTIL.checkVal(this.height)){return{width:this.width,height:this.height};}else{return null;}},getGeometryAlignOption:function getGeometryAlignOption(){return $AlignOption.CENTER;},getNode:function getNode(){return this.node;},getPercentage:function getPercentage(){return"100%";},isSelected:function isSelected(){return this._isSelected;},containVertexInPolylineArr:function containVertexInPolylineArr(polylineArr){var isIntersect=false;$ARR.forEach(polylineArr,function(polyline){isIntersect=this.containVertexInPolyline(polyline);if(isIntersect===true){return false;}},this);return isIntersect;},containVertexInPolyline:function containVertexInPolyline(pointArr){var isIntersect=false;$ARR.forEach(pointArr,function(point){isIntersect=this.contains(point);if(isIntersect===true){return false;}},this);return isIntersect;},update:function update(props){this.loadProps(props);},loadProps:EMPTYFN,getScreenExtent:EMPTYFN,contains:EMPTYFN,intersectExtent:EMPTYFN,intersectPolygon:EMPTYFN,destroy:function destroy(){$MUTIL.destroyNode(this.node);delete this.node;if(this.geoExtent&&this.geoExtent.destroy instanceof Function){this.geoExtent.destroy();}this.geoExtent=null;this._removeEventListeners();}});}());