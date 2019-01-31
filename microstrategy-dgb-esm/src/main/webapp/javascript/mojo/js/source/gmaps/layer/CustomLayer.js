(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.string","mstrmojo.gmaps.MapUtils","mstrmojo.gmaps.GraphicUtils","mstrmojo.gmaps.layer.PolygonLayer");var $MOJO=mstrmojo,$ARR=$MOJO.array,$STR=$MOJO.string,$GMAPS=$MOJO.gmaps,$MUTIL=$GMAPS.MapUtils,$GUTIL=$GMAPS.GraphicUtils,$EnumPropertyType=$GMAPS.EnumPropertyType,$EnumShapeType=$GMAPS.EnumShapeType,GET_BOUNDARY_TASK_ID="getMapBoundaryConfig";mstrmojo.gmaps.layer.CustomLayer=mstrmojo.declare(mstrmojo.gmaps.layer.PolygonLayer,null,{scriptClass:"mstrmojo.gmaps.layer.CustomLayer",initGraphics:function initGraphics(toRefresh){if(!this._super()){return ;}$MUTIL.showWait();var shapeId=this.getLayerProp($EnumPropertyType.shapeFile),geoPosition=this.geoPosition,_shapeInfoArrCache=this._shapeInfoArrCache;if(!$MUTIL.checkVal(geoPosition)||geoPosition<0||($MUTIL.isSingleTier()&&!$MUTIL.isWSLiveMode())){this.updateMapExtent();return ;}if(toRefresh&&$ARR.isArray(_shapeInfoArrCache)&&_shapeInfoArrCache.length>0){this.buildLayerContent(_shapeInfoArrCache,geoPosition,null,toRefresh);}else{this.requestAndInitShapeInfo(geoPosition,shapeId);}},requestAndInitShapeInfo:function requestAndInitShapeInfo(geoPosition,shapeId){if(!$MUTIL.checkVal(geoPosition)){this.updateMapExtent();return ;}try{$MUTIL.showWait();this.createShapesUsingIncrementFetching(geoPosition,shapeId);}catch(err){$MUTIL.log("error: "+err);$MUTIL.hideWait();this.updateMapExtent();}},createShapesUsingNormalFetching:function createShapesUsingNormalFetching(shapeId,queryField,offset,onSuccess,onError){var taskParams=this._generateTaskParams(shapeId,queryField,offset);if(!taskParams){throw"createShapesUsingNormalFetching(): failed";}if(mstrApp.isDossier){mstrmojo.xhr.request("POST",mstrConfig.taskURL,{success:onSuccess,failure:function(res){console.log("Polygon data request failed! "+res.getResponseHeader("X-MSTR-TaskFailureMsg"));if(onError&&res){onError(res);}}},taskParams);}else{mstrApp.serverRequest(taskParams,{success:onSuccess,failure:function(res){console.log("Polygon data request failed!");if(onError&&res){onError(res);}}});}},getQueryField:function getQueryField(geoPosition){var dataLookup=this.createLookup(geoPosition),geoCount=$MUTIL.checkDefined(dataLookup)&&Object.keys(dataLookup).length;if(!$MUTIL.checkVal(geoCount)){throw"createShapesUsingIncrementFetching(): failed";}return Object.keys(dataLookup).join("\u001E").toLowerCase();},createShapesUsingIncrementFetching:function createShapesUsingIncrementFetching(geoPosition,shapeId){var layerId=this.id;this._returnedQuery=this.getQueryField(geoPosition);this.reqOffset=0;this._features=[];function _doIncrementalFetch(){var _this=$MUTIL.getGraphicLayerById(layerId);if(!_this||isNaN(_this.reqOffset)||_this.reqOffset<0){return ;}_this.createShapesUsingNormalFetching(shapeId,_this._returnedQuery,_this.reqOffset,function onSuccess(res){var layer=$MUTIL.getGraphicLayerById(layerId);if(layer){layer.reqOffset=parseInt(res.offset);_doIncrementalFetch();layer.onIncrementalQueryFeaturesComplete(res.features,geoPosition);}else{$MUTIL.hideWait();}},function onError(err){$MUTIL.log("Error incremental fetching: "+err);var layer=$MUTIL.getGraphicLayerById(layerId);if(layer){layer.reqOffset=-1;layer.onIncrementalQueryFeaturesComplete([],geoPosition);}else{$MUTIL.hideWait();}});}_doIncrementalFetch();},onIncrementalQueryFeaturesComplete:function onIncrementalQueryFeaturesComplete(features,geoPosition){this._features=(this._features||[]).concat(features);if(this.reqOffset<0){this.buildLayerContent(this._features,geoPosition);delete this._features;$MUTIL.hideWait();}},createLookup:function createLookup(geoPosition){var dataLookup={},rowHeader=this.getDataRowHeaders(),rows=this.getDataRows(),rowIndex,len,rowGeoHeader,name;for(rowIndex=0,len=rowHeader.length;rowIndex<len;rowIndex++){rowGeoHeader=rowHeader[rowIndex].items[geoPosition];name=$STR.decodeHtmlString(rows[geoPosition].es[rowGeoHeader.idx].n);name=$MUTIL.trimString(name);name=name.toLowerCase?name.toLowerCase():name;if(!!dataLookup[name]){continue;}dataLookup[name]={rowIndex:rowIndex,geoIndex:rowGeoHeader.idx};}return dataLookup;},getSingleShapeInfo:function getSingleShapeInfo(shapeItem,dataLookup,geoPosition){if(!shapeItem){return ;}var attributes=this.populateGraphicAttributes(this.data,dataLookup,geoPosition,shapeItem.name)||{},coordArray=this._extractPolygonData(shapeItem),centroidOfPolygon=$GUTIL.getCentroidOfPolygon(coordArray);if(coordArray&&centroidOfPolygon){return{type:"Polygon",geoData:coordArray,attributes:attributes,lat:centroidOfPolygon[1],lng:centroidOfPolygon[0]};}},_extractPolygonData:function _extractPolygonData(shapeItem){if(!shapeItem){return ;}var coordArray=[],shapeType=shapeItem.type,shapeData,i,il;shapeType=(shapeType&&shapeType.toLowerCase)?shapeType.toLowerCase():shapeType;if(shapeType===$EnumShapeType.multiPolygon){shapeData=shapeItem.data;for(i=0,il=shapeData.length;i<il;i++){this.getCoordinateArr(shapeData[i],coordArray);}}else{this.getCoordinateArr(shapeItem.data,coordArray);}return coordArray;},_generateTaskParams:function _generateTaskParams(lid,queryField,offset){if($MUTIL.checkDefined(lid)&&$MUTIL.checkDefined(queryField)){return{taskId:GET_BOUNDARY_TASK_ID,shapeId:lid,queryField:queryField,offset:offset};}},isGeoAttribute:function isGeoAttribute(geoAttributeId,attribute){return $MUTIL.checkDefined(geoAttributeId)&&!!attribute&&(geoAttributeId===attribute.id);}});}());