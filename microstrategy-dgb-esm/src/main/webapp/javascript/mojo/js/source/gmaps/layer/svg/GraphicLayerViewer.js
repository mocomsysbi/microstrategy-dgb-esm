(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.gmaps.MapUtils","mstrmojo.gmaps.MapEnums","mstrmojo.gmaps.layer.AbstractGraphicLayerViewer","mstrmojo.gmaps.layer.svg._DataLabelViewerWrapper","mstrmojo.gmaps.layer.svg._AffinityLineViewerWrapper");var $MOJO=mstrmojo,$ARR=$MOJO.array,$GMAPS=$MOJO.gmaps,$MUTIL=$GMAPS.MapUtils,$GEOMETRY=$GMAPS.geometry,$EnumGraphicType=$GMAPS.EnumGraphicType,$EnumGeomertyDefaultShapeFormat=$GMAPS.EnumDefaultShapeFormatStyle,FMTS_DEFAULT={fillColor:$EnumGeomertyDefaultShapeFormat.FILL_COLOR,strokeColor:$EnumGeomertyDefaultShapeFormat.BORDER_COLOR};mstrmojo.gmaps.layer.svg.GraphicLayerViewer=mstrmojo.declare(mstrmojo.gmaps.layer.AbstractGraphicLayerViewer,[mstrmojo.gmaps.layer.svg._DataLabelViewerWrapper,mstrmojo.gmaps.layer.svg._AffinityLineViewerWrapper],{scriptClass:"mstrmojo.gmaps.layer.svg.GraphicLayerViewer",parentDom:null,div_:null,svgNode:null,gNode:null,_gNodeForGraphics:null,init:function init(props){this._super(props);this._initLayerDomTree();this.setVisibility(false);this.buildGeometries();this.createAffinityLineLayer();},_initLayerDomTree:function _initLayerDomTree(){var div_=this.div_,parentDom=this.parentDom,svgNode,gNode;if(!div_){div_=this.div_=document.createElement("div");$MUTIL.setLayerNodeProps(div_,null,"mstrMap-graphicLayer",this.getWidth(),this.getHeight());}svgNode=this.svgNode=$MUTIL.appendSvgNode(div_);if(svgNode){gNode=this.gNode=$MUTIL.appendGNode(svgNode);$MUTIL.setCssTransform(gNode,this.getGraphicsOffset());this._gNodeForGraphics=$MUTIL.appendGNode(gNode);}if(parentDom){parentDom.appendChild(div_);}},getNode:function getNode(){return this.div_;},buildGeometries:function buildGeometries(){$ARR.forEach(this.graphics,function(graphic){if(this.isClusterGraphic(graphic)){$ARR.forEach(graphic.points,function(point){if($MUTIL.checkHasFunction(point,"setGeometry")){point.setGeometry(this.buildGeometry(point));}},this);}else{if(!this.isPieBubble){graphic.setGeometry(this.buildGeometry(graphic));}}graphic.setSelection(graphic.isSelected());this.appendGraphicNode(graphic);},this);},appendGeometries:function appendGeometries(){$ARR.forEach(this.graphics,function(graphic){this.appendGraphicNode(graphic);},this);},buildGeometry:function buildGeometry(graphic){var GmtClass=this.getGmtCls(graphic.attributes);if(GmtClass instanceof Function){var props=this.getGeometryParams(graphic);return new GmtClass(props);}return graphic.geometry;},appendGraphicNode:function appendGraphicNode(graphic,force){var _gNodeForGraphics=this._gNodeForGraphics,gmtArray;if(!_gNodeForGraphics||!$MUTIL.checkHasFunction(graphic,"getGeometryArr")){return ;}gmtArray=graphic.getGeometryArr();$ARR.forEach(gmtArray,function(geometry){var node=geometry&&geometry.getNode();if(node&&(force||!node.parentNode)){_gNodeForGraphics.appendChild(node);}});},appendGraphicNodeToBottom:function appendGraphicNodeToBottom(graphic){var _gNodeForGraphics=this._gNodeForGraphics,firstChild=_gNodeForGraphics&&_gNodeForGraphics.firstChild,gmtArray;if(!firstChild||!$MUTIL.checkHasFunction(graphic,"getGeometryArr")){return ;}gmtArray=graphic.getGeometryArr();$ARR.forEach(gmtArray,function(geometry){var node=geometry&&geometry.getNode();if(node){_gNodeForGraphics.insertBefore(node,firstChild);}});},setTransform:function setTransform(cssTransform){$MUTIL.setCssTransform(this.gNode,cssTransform);},getGmtCls:function getGmtCls(){switch(this.graphicType){case $EnumGraphicType.Area:return $GEOMETRY.Polygon;}},getGeometryParams:mstrmojo.emptyFn,isClusterGraphic:function isClusterGraphic(graphic){var attributes=graphic&&graphic.attributes;if(attributes){return attributes.clusterCount>1;}},setShapeFillColor:function setShapeFillColor(newVal,graphics){newVal=newVal===undefined?FMTS_DEFAULT.fillColor:newVal;$ARR.forEach(graphics,function(graphic){if(graphic&&graphic.geometry){graphic.geometry.setFillColor(newVal);}});},setShapeFillOpacity:function setShapeFillOpacity(newVal,graphics){if(newVal){$ARR.forEach(graphics,function(graphic){if(graphic&&graphic.geometry){graphic.geometry.setFillOpacity(newVal);}});}},setShapeStrokeColor:function setShapeStrokeColor(newVal,graphics){newVal=newVal===undefined?FMTS_DEFAULT.strokeColor:newVal;$ARR.forEach(graphics,function(graphic){if(graphic&&graphic.geometry){graphic.geometry.setStrokeColor(newVal);}});},setShapeStrokeStyle:function setShapeStrokeStyle(newVal,graphics){if(newVal){$ARR.forEach(graphics,function(graphic){if(graphic&&graphic.geometry){graphic.geometry.setStrokeWidthAndStyle(newVal.shapeBorderWidth,newVal.shapeBorderStyle,newVal.shapeBorderLineDash);}});}},moveGraphicToTop:function moveGraphicToTop(graphic){var parentGraphic=graphic.parentGraphic;if(parentGraphic){this.appendGraphicNode(parentGraphic,true);parentGraphic.moveGraphicToTop(graphic);}else{this.appendGraphicNode(graphic,true);}},moveGraphicToBottom:function moveGraphicToBottom(graphic){var parentGraphic=graphic.parentGraphic;if(parentGraphic){parentGraphic.moveGraphicToBottom(this._gNodeForGraphics,graphic);}else{this.appendGraphicNodeToBottom(graphic);}},update:function update(){this.updateDataLabelLayer();this.updateAffinityLineLayer();},destroyGeometries:function destroyGeometries(){$ARR.forEach(this.graphics,function(graphic){if($MUTIL.checkHasFunction(graphic,"getGeometryArr")){var geometries=graphic&&graphic.getGeometryArr();$ARR.forEach(geometries,function(gmt){if($MUTIL.checkHasFunction(gmt,"destroy")){gmt.destroy();delete graphic.gmt;}});}else{console.log("Graphic has already been destroyed.");}},this);},clean:function clean(){$MUTIL.emptyDomElement(this._gNodeForGraphics);},destroy:function destroy(){this.removeDataLabelLayer();delete this.parentDom;$MUTIL.destroyNode(this.div_);delete this.div_;delete this.svgNode;delete this.gNode;delete this._gNodeForGraphics;this.destroyGeometries();this._super();},clearHighlights:function clearHighlights(){$ARR.forEach(this.graphics,function(graphic){var allSubGraphics=graphic.getGraphicsForSelection();$ARR.forEach(allSubGraphics,function(subGraphic){subGraphic.setSelection(false);});});}});}());