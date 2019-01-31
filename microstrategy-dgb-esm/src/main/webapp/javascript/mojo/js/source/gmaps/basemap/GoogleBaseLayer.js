(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.dom","mstrmojo.hash","mstrmojo.gmaps.MapEnums","mstrmojo.gmaps.MapUtils","mstrmojo.gmaps.layer.BaseLayer","mstrmojo.gmaps.basemap._CanLoadGoogleMapScript","mstrmojo.PerformanceLogOutput");var $MOJO=mstrmojo,$ARR=$MOJO.array,$DOM=$MOJO.dom,$HASH=$MOJO.hash,$GMAPS=$MOJO.gmaps,$MUTIL=$GMAPS.MapUtils,$PerfLog=$MOJO.PerformanceLogOutput,ZOOMBTN_ZINDEX=$GMAPS.ZOOMBTN_ZINDEX;var TILE_SIZE=256;function project(latLng){var siny=Math.sin(latLng.lat()*Math.PI/180);siny=Math.min(Math.max(siny,-0.9999),0.9999);return new google.maps.Point(TILE_SIZE*(0.5+latLng.lng()/360),TILE_SIZE*(0.5-Math.log((1+siny)/(1-siny))/(4*Math.PI)));}function getBoundsInPixelCoord(){var _baseMap=this._baseMap,bounds=_baseMap.getBounds(),zoomLevel=_baseMap.getZoom(),scale=1<<zoomLevel,sw=project(bounds.getSouthWest()),ne=project(bounds.getNorthEast());return{swx:sw.x*scale,swy:sw.y*scale,nex:ne.x*scale,ney:ne.y*scale};}function isBoundsInRange(range,bounds){if(!range||!bounds){return false;}return bounds.swx>=range.swx&&bounds.swy<=range.swy&&bounds.nex<=range.nex&&bounds.ney>=range.ney;}function isGoogleLibReady(){try{return !!google;}catch(e){return false;}}mstrmojo.gmaps.basemap.GoogleBaseLayer=mstrmojo.declare(mstrmojo.gmaps.layer.BaseLayer,[mstrmojo.gmaps.basemap._CanLoadGoogleMapScript],{scriptClass:"mstrmojo.gmaps.basemap.GoogleBaseLayer",mapStylesCache:null,mapStyleIds:null,typeForThumbnail:"_GOOGLE_",_overlay:null,lastZoom:null,tileRangeInPixelCoord:null,processConfigInfo:function processConfigInfo(){this._super();var mapConfig=this.map&&this.map.getMapConfig(),googleConfig=mapConfig&&mapConfig.google;if(!googleConfig){return ;}this.mstProp=googleConfig.mstProp;},initBaseMap:function initBaseMap(){var googleConfig=this.map.getMapConfig().google;this.isSupport=this.checkSupport(googleConfig);if(this.isSupport!==true){console.log("Fail to init google map.");this.updateMapExtent();return ;}if(!!googleConfig.clientId){this.setPremiere(true);this.setPremiereKey(googleConfig.clientId);}else{this.setTrialKey(googleConfig.trialKey);}this.setLocaleLang(googleConfig.lang);this.setLocaleRegion(googleConfig.region);if(!!googleConfig.channel){this.setChannel(googleConfig.channel);}this.loadGoogleScripts();},loadGoogleScripts:function loadGoogleScripts(){$MUTIL.showWait();try{var me=this;if(mstrmojo.googleMapLib===undefined){mstrmojo.googleMapLib={};mstrmojo.gmaps.loadScriptListeners=[];this.loadExternalScript(this.loadBaseMap,mstrmojo.gmaps);}else{if(typeof (mstrmojo.googleMapLibLoaded)!=="undefined"&&mstrmojo.googleMapLibLoaded==true){this.loadBaseMap();}else{mstrmojo.gmaps.loadScriptListeners.push({caller:me,method:this.loadBaseMap});$MUTIL.hideWait();}}}catch(err){$MUTIL.log("BaseLayer.loadExternalScripts(): "+err);this.displayError(mstrmojo.desc(15715,"Failed to load google map"));this.updateMapExtent();$MUTIL.hideWait();}},loadBaseMap:function loadBaseMap(){this._super();$MUTIL.hideWait();if(!isGoogleLibReady()){this.handleNoInternet();return ;}$MUTIL.showWait();var mapTypeIdsCustomized=[google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.TERRAIN,google.maps.MapTypeId.HYBRID],defaultCenter=this.getDefaultCenter(),myOptions,controlOptions,i;for(i in this.mstProp){mapTypeIdsCustomized.push(i);}this.mapStyleIds=mapTypeIdsCustomized;if(this.isDHTMLinIE()||!this._baseMap){myOptions={center:new google.maps.LatLng(defaultCenter.lat,defaultCenter.lng),minZoom:this.minZoom,maxZoom:this.maxZoom,zoom:this.defaultZoom,zoomControlOptions:{style:google.maps.ZoomControlStyle.SMALL,position:google.maps.ControlPosition.RIGHT_BOTTOM},mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:false,panControl:false,zoomControl:!!this.showZoomBtns,streetViewControl:false,fullscreenControl:false};this.mapStylesCache=[];this.mapStylesCache.push({n:"Road Map",id:google.maps.MapTypeId.ROADMAP});this.mapStylesCache.push({n:"Satellite",id:google.maps.MapTypeId.SATELLITE});this.mapStylesCache.push({n:"Terrain",id:google.maps.MapTypeId.TERRAIN});this.mapStylesCache.push({n:"Hybrid",id:google.maps.MapTypeId.HYBRID});if(this.mvo&&this.mvo!=="0"){controlOptions={style:google.maps.MapTypeControlStyle.DROPDOWN_MENU,mapTypeIds:mapTypeIdsCustomized};myOptions.mapTypeControlOptions=controlOptions;}if(this.showZoomBtns==="0"){myOptions.zoomControl=false;}this._baseMap=new google.maps.Map(this.div_,myOptions);this._overlay=new google.maps.OverlayView();this._overlay.draw=function(){};this._overlay.setMap(this._baseMap);this.loadMapTheme();this.addEventListeners();}this.setMapStyle(this.mapStyle);this.updateMapExtent();$MUTIL.hideWait();},getMapStyles:function getMapStyles(){var styles=[{n:mstrmojo.desc(7736,"Map"),id:0},{n:mstrmojo.desc(8068,"Satellite"),id:1},{n:mstrmojo.desc(8102,"Terrain"),id:2},{n:mstrmojo.desc(8069,"Hybrid"),id:3}],customThemes=this.mstProp,customThemeName,customNameList,i;if(customThemes){customNameList={4:mstrmojo.desc(9237,"Desert"),5:mstrmojo.desc(2797,"Blank"),6:mstrmojo.desc(11845,"Ice"),7:mstrmojo.desc(8958,"Dark"),8:mstrmojo.desc(11846,"Nature"),9:mstrmojo.desc(11847,"Arctic")};for(i in customThemes){customThemeName=customNameList[i];if(!!customThemeName){styles.push({n:customThemeName,id:i});}}}return styles;},getDefaultMapStyle:function getDefaultMapStyle(){return 0;},getDefaultStyleIdx:function getDefaultStyleIdx(){return 0;},setMapStyle:function setMapStyle(dv){var mapStyleIds=this.mapStyleIds,mapStyleIdx=parseInt(dv),mapStyleId;if(!mapStyleIds||!$ARR.isArray(mapStyleIds)){return ;}if(isNaN(mapStyleIdx)){mapStyleIdx=0;}mapStyleId=mapStyleIds[mapStyleIdx]||mapStyleIds[0];if($MUTIL.checkDefined(mapStyleId)){this._baseMap.setMapTypeId(mapStyleId);}this.mapStyle=dv;this.updateMapToolbar();},loadMapTheme:function loadMapTheme(){var mstProp=this.mstProp;var nameList={4:"Desert",5:"Blank",6:"Ice",7:"Dark",8:"Nature",9:"Arctic"};var orderList=["4","5","6","8","9","7"],mapTypeList={},i,id;for(i in mstProp){mapTypeList[i]=new google.maps.StyledMapType(JSON.parse(mstProp[i]),{name:nameList[i]});}for(i in orderList){id=orderList[i];this._baseMap.mapTypes.set(id,mapTypeList[id]);this._baseMap.setMapTypeId(id);this.mapStylesCache.push({n:mapTypeList[id].name,id:id});}},addEventListeners:function addEventListeners(){var me=this,vismap=me.map,_baseMap=this._baseMap,eventListenerArr=this.eventListenerArr=[];if(!_baseMap){return ;}eventListenerArr.push(google.maps.event.addListener(_baseMap,"idle",function(){$PerfLog.endTimer("timerid_callback_handleExtentChange");$PerfLog.visPrint("handleExtentChange() start");$PerfLog.startTimer({functionName:"GoogleBaseLayer.this.handleExtentChange: ",purpose:"render all graphic layers"},"timerid_handleExtentChange");me.updateGraphicLayers();me.handleExtentChange();me.lastZoom=me.getZoom();}));eventListenerArr.push(google.maps.event.addListener(_baseMap,"bounds_changed",function(){var map=me._baseMap,visMap=me.map,tileRangeInPixelCoord;google.maps.event.trigger(map,"resize");me.updateForResizing();if(vismap.needMapReadyEvent()){tileRangeInPixelCoord=me.tileRangeInPixelCoord;if(tileRangeInPixelCoord&&isBoundsInRange(tileRangeInPixelCoord,getBoundsInPixelCoord.call(me))){me.isBaseMapReady=true;visMap.checkForMapReady();}}}));eventListenerArr.push(google.maps.event.addListener(_baseMap,"zoom_changed",function(){me.handleZoomChange();}));eventListenerArr.push(google.maps.event.addListenerOnce(_baseMap,"tilesloaded",function(){var mapNode=me.getNode(),gmNodes=mapNode&&mapNode.getElementsByClassName("gm-style"),gmNode=gmNodes&&gmNodes.length>0&&gmNodes[0];if(gmNode){mapNode.style.removeProperty("transform");gmNode.style.removeProperty("z-index");}if($MUTIL.isWorkstation()&&$DOM.isMac()){var iframeNodes=gmNodes&&gmNode.getElementsByTagName("iframe"),iframe=iframeNodes&&iframeNodes.length>0&&iframeNodes[0];if(iframe){iframe.style.display="none";}}}));eventListenerArr.push(google.maps.event.addListener(_baseMap,"tilesloaded",function(){if(vismap.needMapReadyEvent()){var map=me.map,getTileRange=function(x,ceil){var tileIndex=x/TILE_SIZE;return(ceil?Math.ceil(tileIndex):Math.floor(tileIndex))*TILE_SIZE;},boundsInPixelCoord=getBoundsInPixelCoord.call(me);me.isBaseMapReady=true;if($MUTIL.checkHasFunction(map,"checkForMapReady")){map.checkForMapReady();}me.tileRangeInPixelCoord={swx:getTileRange(boundsInPixelCoord.swx,false),swy:getTileRange(boundsInPixelCoord.swy,true),nex:getTileRange(boundsInPixelCoord.nex,true),ney:getTileRange(boundsInPixelCoord.ney,false)};}}));this.attachMapRemoveEvent();},attachMapRemoveEvent:function attachMapRemoveEvent(){var element=this.div_,me=this,mapViewer=this.parent;this.mapRemovehandler=function(e){if(e.target&&e.target.parentNode===element){if(mapViewer){mapViewer.hideAllGraphicLayers();}$DOM.detachEvent(element,"DOMNodeRemoved",me.mapRemovehandler);}};$DOM.attachEvent(element,"DOMNodeRemoved",this.mapRemovehandler);},handleZoomChange:function handleZoomChange(){var mapViewer=this.parent;if(mapViewer&&this.mapZoom!==this.getZoom()){mapViewer.hideAllGraphicLayers();}this._super();},resize:function resize(width,height){var map=this._baseMap;this._super(width,height);if(map){var baseLayer=$HASH.walk("parent.baseLayer",this);if(baseLayer){baseLayer.toUpdateLayers=true;}google.maps.event.trigger(map,"resize");}},panBy:function panBy(offset){var _baseMap=this._baseMap,scale,project,center;if(!!_baseMap&&!!offset&&$MUTIL.checkVal(offset.x)&&$MUTIL.checkVal(offset.y)){scale=Math.pow(2,_baseMap.getZoom());project=_baseMap.getProjection();center=project.fromLatLngToPoint(_baseMap.getCenter());center.x-=offset.x/scale;center.y-=offset.y/scale;_baseMap.setCenter(project.fromPointToLatLng(center));}},getLngLatCenter:function getLngLatCenter(){var _baseMap=this._baseMap,mapCenter,lngLatCenter;if(!_baseMap){return ;}mapCenter=_baseMap.getCenter();lngLatCenter=mapCenter&&new google.maps.LatLng(mapCenter.lat(),mapCenter.lng(),false);return !!lngLatCenter&&{lat:lngLatCenter.lat(),lng:lngLatCenter.lng()};},setExtent:function setExtent(geoExtent){if(!geoExtent||!$MUTIL.checkVal(geoExtent.latSouth)||!$MUTIL.checkVal(geoExtent.latNorth)||!$MUTIL.checkVal(geoExtent.lngWest)||!$MUTIL.checkVal(geoExtent.lngEast)){return ;}this._super(geoExtent);var southWest=new google.maps.LatLng(geoExtent.latSouth,geoExtent.lngWest),northEast=new google.maps.LatLng(geoExtent.latNorth,geoExtent.lngEast),bounds=new google.maps.LatLngBounds(southWest,northEast);this.mstrFitBounds(bounds);},setCenter:function setCenter(geoPoint){if(!this._baseMap||!geoPoint||!$MUTIL.checkVal(geoPoint.lat)||!$MUTIL.checkVal(geoPoint.lng)){return ;}var center=new google.maps.LatLng(geoPoint.lat,geoPoint.lng);this._baseMap.setCenter(center);},mstrFitBounds:function mstrFitBounds(bounds){var map=this._baseMap,lastBounds;if(!map||!bounds){console.log("Invalid bounds/baseMap");return ;}lastBounds=map.getBounds();map.fitBounds(bounds);if(lastBounds&&lastBounds.equals(bounds)&&$MUTIL.checkVal(this.lastZoom)){map.setZoom(this.lastZoom);}},latLngToPixelXY:function latLngToPixelXY(point){var projection=this._getMapProjection(),screenPoint;if(!point||!this.isProjectionReady()||!$MUTIL.checkVal(point.lat)||!$MUTIL.checkVal(point.lng)){$MUTIL.log("Catch invalid point/projection");return ;}screenPoint=projection.fromLatLngToContainerPixel(new google.maps.LatLng(point.lat,point.lng));if(!!screenPoint){return{x:screenPoint.x,y:screenPoint.y};}},pixelXYtoLatLng:function pixelXYtoLatLng(pixel){var projection=this._getMapProjection(),latLng;if(!pixel||!this.isProjectionReady()||!$MUTIL.checkVal(pixel.x)||!$MUTIL.checkVal(pixel.y)){$MUTIL.log("Catch invalid point/projection");return ;}latLng=projection.fromContainerPixelToLatLng(new google.maps.Point(pixel.x,pixel.y));return{lat:latLng.lat(),lng:latLng.lng()};},isProjectionReady:function isProjectionReady(){var projection=this._getMapProjection();return $MUTIL.checkHasFunction(projection,"fromContainerPixelToLatLng");},getGeoScreenRange:function getGeoScreenRange(){var projection=this._getMapProjection();return projection&&projection.getWorldWidth();},_getMapProjection:function _getMapProjection(){return this._overlay&&this._overlay.getProjection();},showMapTools:function(){var _baseMap=this._baseMap;if(!_baseMap){return ;}if(!_baseMap.panControl){_baseMap.setOptions({panControl:true});}if(!_baseMap.zoomControl){_baseMap.setOptions({zoomControl:true});}},hideMapTools:function(){var _baseMap=this._baseMap;if(!_baseMap){return ;}if(_baseMap.panControl){_baseMap.setOptions({panControl:false});}if(_baseMap.zoomControl){_baseMap.setOptions({zoomControl:false});}},checkSupport:function checkSupport(config){if(!config||(config.clientId==="InvalidPremierKey")||(!config.clientId&&!config.trialKey)){this.displayError(mstrmojo.desc(11186,"The Google map requires a valid key"));return false;}return true;},removeEventListeners:function removeEventListeners(){this._super();$DOM.detachEvent(this.div_,"DOMNodeRemoved",this.mapRemovehandler);delete this.mapRemovehandler;},destroy:function destroy(){if(!!this._overlay){this._overlay.draw=function(){};}delete this._overlay;this._super();}});})();