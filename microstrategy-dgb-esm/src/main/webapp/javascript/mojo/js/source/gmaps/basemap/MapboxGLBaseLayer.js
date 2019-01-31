(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.xhr","mstrmojo.array","mstrmojo.gmaps.MapUtils","mstrmojo.gmaps.layer.BaseLayer","mstrmojo.gmaps.geometry.Extent","mstrmojo.gmaps.basemap._CanLoadMapboxScript","mstrmojo.PerformanceLogOutput","mstrmojo.hash","mstrmojo.gmaps.MapEnums");var $MOJO=mstrmojo,$DOM=$MOJO.dom,$ARR=$MOJO.array,$GMAPS=$MOJO.gmaps,$EnumLanguageType=$GMAPS.EnumLanguageType,$MUTIL=$GMAPS.MapUtils,$PerfLog=$MOJO.PerformanceLogOutput,LABEL_GROUP_NAME="all-label-group",$HASH=$MOJO.hash;var $API_VERSION="0.40.1",MAP_LABEL=mstrmojo.desc(7736,"Map"),POS_NAVIGATOR="bottom-right",STYLE_TML="mapbox://styles/microstrategy/{$style}",STYLES_MAP=[{id:STYLE_TML.replace("{$style}","cj4huc3z734b32sqpcyursd8s"),rn:"Basic",n:mstrmojo.desc(7227,"Basic")},{id:STYLE_TML.replace("{$style}","cj8o35v4u8ayz2rqutqgwhvxp"),rn:"White",n:mstrmojo.desc(2293,"White")},{id:STYLE_TML.replace("{$style}","cj4fnd0xu1ax82rnuq287rwvu"),rn:"Light",n:mstrmojo.desc(8959,"Light")},{id:STYLE_TML.replace("{$style}","cj4gonmj72rih2ss2n132hwla"),rn:"Dark",n:mstrmojo.desc(8958,"Dark")},{id:STYLE_TML.replace("{$style}","cj4fdoz771jrx2rmhajhl8yxv"),rn:"Street",n:mstrmojo.desc(13821,"Street")},{id:STYLE_TML.replace("{$style}","cj4gpwfca95l52so2gkz3y2is"),rn:"Topographic",n:mstrmojo.desc(11852,"Topographic")},{id:STYLE_TML.replace("{$style}","cj4grefys96zg2smv7okfp8c5"),rn:"Physical",n:mstrmojo.desc(13824,"Physical")},{id:STYLE_TML.replace("{$style}","cj4guy8nn2y7e2so0c9h2uiav"),rn:"Relief",n:mstrmojo.desc(13823,"Relief")},{id:STYLE_TML.replace("{$style}","cj621ujgo32ve2rmpuxixebjq"),rn:"Satellite",n:mstrmojo.desc(8068,"Satellite")},{id:STYLE_TML.replace("{$style}","cj4gnpv6t2r9m2rpe417d51s1"),rn:"SatelliteStreet",n:mstrmojo.desc(15716,"Satellite Street")}],EVENTS={"extent-change":"moveend","zoom-start":"zoomstart","zoom-end":"zoomend",load:"load"},PADDING={top:80,bottom:80,left:80,right:80};function ResetZoomCtrl(parent){this._parent=parent;}function setCompassAngle(elem,val){if(elem){elem.setAttribute("style","transform: rotate("+val*(180/Math.PI)+"deg); margin: 0");}}function getCompassNode(context,prefix,suffix){return $HASH.walk(prefix+"parent.toolbar.compassBtn.domNode"+suffix,context);}function dispatchCompassEvent(elem,evt){var event=document.createEvent("MouseEvents");event.initEvent(evt,false,false);elem.dispatchEvent(event);}ResetZoomCtrl.prototype.onAdd=function(map){var _container=this._container=document.createElement("button");_container.className="mapboxgl-ctrl mapboxgl-ctrl-reset";this._onClick=(function(){var _parent=this._parent,map=this._map,mapViewer=_parent&&_parent.parent,displayCompass=getCompassNode(this,"_parent.",".firstChild");if(mapViewer&&map){if(displayCompass){dispatchCompassEvent(displayCompass,"click");}_parent.updateExtent(mapViewer.getMapGeoExtent(),true);}}).bind(this);$DOM.attachEvent(_container,"click",this._onClick);this._map=map;return this._container;};ResetZoomCtrl.prototype.onRemove=function(){var _container=this._container;$DOM.detachEvent(_container,"click",this._onClick);if(_container.parentNode){_container.parentNode.removeChild(_container);}this._map=undefined;this._parent=undefined;};ResetZoomCtrl.prototype.getDefaultPosition=function(){return"bottom-right";};function getMapboxSuggestionResults(features){if(!features||features.length<1){return ;}var results=[];$ARR.forEach(features,function(v){results.push({n:v.place_name,cls:"geo",geo:v});});return{label:MAP_LABEL,isCloud:true,items:results};}function isNameStringField(property){return typeof property==="string"&&property.indexOf("{name")>-1;}function isNameFunctionField(property){return property.stops&&property.stops.filter(function(stop){return stop[1].indexOf("{name")>-1;}).length>0;}function resetLang(oldLang,newValue){var newLang;if(oldLang.indexOf($EnumLanguageType.Both)>-1){newLang=oldLang.replace($EnumLanguageType.Both,newValue);}else{if(oldLang.indexOf($EnumLanguageType.Local)>-1){newLang=oldLang.replace($EnumLanguageType.Local,newValue);}else{newLang=oldLang.replace($EnumLanguageType.English,newValue);}}return newLang;}mstrmojo.gmaps.basemap.MapboxGLBaseLayer=mstrmojo.declare(mstrmojo.gmaps.layer.BaseLayer,[mstrmojo.gmaps.basemap._CanLoadMapboxScript],{scriptClass:"mstrmojo.gmaps.basemap.MapboxGLBaseLayer",navigationCtrl:null,resetCtrl:null,typeForThumbnail:"_MAPBOX_",maxZoom:22,labelGroupExist:false,init:function init(props){this._super(props);this.supportLayerZoomRange=true;this.cssUrl=this.getURL("//api.tiles.mapbox.com/mapbox-gl-js/v"+$API_VERSION+"/mapbox-gl.css");},initBaseMap:function initBaseMap(){var config=this.getConfig();this.isSupport=this.checkSupport(config);if(this.isSupport!==true){console.log("Fail to init mapbox map.");this.updateMapExtent();return ;}$MUTIL.showWait();if(this.isLibLoaded()){this.loadBaseMap();}},isLibLoaded:function isLibLoaded(){return !!(window.mapboxgl&&typeof (mapboxgl.Map)!=="undefined");},loadBaseMap:function loadBaseMap(){this._super();this.createMapObj();},createMapObj:function createMapObj(){if(!mapboxgl){console.log("Fail to load mapbox resources.");this.updateMapExtent();return ;}var config=this.getConfig(),defaultCenter=this.getDefaultCenter(),mapOptions={container:this.domId,center:[defaultCenter.lng,defaultCenter.lat],minZoom:this.minZoom,maxZoom:this.maxZoom,zoom:this.defaultZoom,attributionControl:false};mapboxgl.accessToken=config.token;this._baseMap=new mapboxgl.Map(mapOptions).addControl(new mapboxgl.AttributionControl({compact:true}),"bottom-left");this.addNavigationCtrl();this.addEventListeners(EVENTS);var me=this,panel=$HASH.walk("map.parent.parent",me);if(panel){this.panelDisplayListener=panel.attachEventListener("panelDisplaying",me.id,function(evt){if(me._baseMap.getCanvas().height!==me.map.getHeight()||me._baseMap.getCanvas().width!==me.map.getWidth()){me._baseMap.resize();}});}this.setMapStyle(this.mapStyle);$MUTIL.hideWait();},handleOnLoad:function handleOnLoad(){this._super();this.setCompassButton();},setCompassButton:function setCompassButton(){var div_=this.getNode(),btns=div_&&div_.getElementsByClassName("mapboxgl-ctrl-compass"),btn=btns&&btns[0];if(btn&&!this.isForPremium()){$MUTIL.setCssStyles(btn,{display:"none"});}},attachClickDisplayEvent:function(){if(this.clickDisplayListener){return ;}var _baseMap=this._baseMap,displayCompass=getCompassNode(this,"",".firstChild");this.clickDisplayListener=function(){var resetNorthTimeout;if(_baseMap){_baseMap.easeTo({bearing:0,pitch:0});resetNorthTimeout=setInterval(function(){if(_baseMap.transform.angle!==0){setCompassAngle(displayCompass,_baseMap.transform.angle);}else{clearInterval(resetNorthTimeout);}},10);}};if(displayCompass){$DOM.attachEvent(displayCompass,"click",this.clickDisplayListener,true);}},attachDownDisplayEvent:function(){if(this.downDisplayListener){return ;}var _baseMap=this._baseMap,displayCompass=getCompassNode(this,"",".firstChild"),hiddenCompass=$HASH.walk("navigationCtrl._compassArrow",this);this.downDisplayListener=function(){if(_baseMap){dispatchCompassEvent(hiddenCompass,"mousedown");this.rotateMoveListener=function(){setCompassAngle(displayCompass,_baseMap.transform.angle);};$DOM.attachMouseMoveEvents(this.rotateMoveListener);}};if(displayCompass){$DOM.attachEvent(displayCompass,"mousedown",this.downDisplayListener,true);}},attachMapRotateEvent:function(){if(this.mapRotateListener){return ;}var _baseMap=this._baseMap,mapDiv=this.div_,displayCompass=getCompassNode(this,"",".firstChild");this.mapRotateListener=function(evt){if(_baseMap){if(evt.ctrlKey||(evt.which===3)){this.mapRotateMoveListener=function(){setCompassAngle(displayCompass,_baseMap.transform.angle);};$DOM.attachMouseMoveEvents(this.mapRotateMoveListener);}}};if(mapDiv){$DOM.attachEvent(mapDiv,"mousedown",this.mapRotateListener,true);}},detachCompassEvent:function detachCompassEvent(){var mapDiv=this.div_,displayCompass=getCompassNode(this,"",".firstChild");if(this.clickDisplayListener){$DOM.detachEvent(displayCompass,"click",this.clickDisplayListener,true);delete this.clickDisplayListener;}if(this.downDisplayListener){$DOM.detachEvent(displayCompass,"mousedown",this.downDisplayListener,true);delete this.downDisplayListener;}if(this.mapRotateListener){$DOM.detachEvent(mapDiv,"mousedown",this.mapRotateListener,true);delete this.mapRotateListener;}},addNavigationCtrl:function addNavigationCtrl(){var me=this,layerDiv=this.getNode(),nd=layerDiv&&layerDiv.getElementsByClassName("mapboxgl-ctrl-bottom-right")[0],_baseMap=this._baseMap,displayDiv=getCompassNode(this,"","");if(!_baseMap){return ;}this.navigationCtrl=new mapboxgl.NavigationControl();this.resetCtrl=new ResetZoomCtrl(this);_baseMap.addControl(this.navigationCtrl,POS_NAVIGATOR);if(displayDiv){var angle=me.originalBearing?(0-me.originalBearing):0;displayDiv.innerHTML='<span class="mapboxgl-ctrl-compass-arrow" style="transform: rotate('+angle+'deg); margin: 0"></span>';this.attachClickDisplayEvent();this.attachDownDisplayEvent();this.attachMapRotateEvent();nd.setAttribute("style","visibility: hidden");}_baseMap.addControl(this.resetCtrl,POS_NAVIGATOR);if(nd){nd.style["z-index"]=$GMAPS.ZOOMBTN_ZINDEX;}},addEventListeners:function addEventListeners(events){if(this.isForPremium()){this._addPremiumMapListeners();}else{this._addBaseTypeMapListeners();}},_addPremiumMapListeners:function _addPremiumMapListeners(){var map=this._baseMap,me=this,eventListenerArr;if(!map){return ;}eventListenerArr=this.eventListenerArr=[{type:"render",listener:(function(){var visMap=me.map;if(me._baseMap.loaded()){if(!me.isJsHeapRecorded){$PerfLog.endTimer("timerid_handleExtentChange");$PerfLog.endTimer("timerid_fromBuildtoEnd");$PerfLog.endTimer("timerid_fromResponsetoEnd");$PerfLog.recordJSHeapMemory("PremiumMapbox Memory usage at the end");me.isJsHeapRecorded=true;}if($MUTIL.checkHasFunction(visMap,"checkForMapReady")){visMap.checkForMapReady();}$PerfLog.endTimer("timerid_VisFilter_updateSelections");$PerfLog.endTimer("timerid_VisFilter_unsetFilter");$PerfLog.endTimer("timerid_Vis_keepOnly");$PerfLog.endTimer("timerid_Vis_drill");$PerfLog.endTimer("timerid_Vis_exclude");}}).bind(this)},{type:"style.load",listener:(function(){var visMap=me.map,mapViewer=me.parent,key;this.setLanguage(this.languageType);this.toggleBaseMapLabels(this.showMapLabels);if(visMap&&mapViewer){this._active=true;var layerMapping=mapViewer.graphicLayerMapping;if(Object.keys(layerMapping).length===0){mapViewer.initGraphicLayers();visMap.postViewerInit();}else{for(key in layerMapping){if(layerMapping.hasOwnProperty(key)){layerMapping[key].buildViewer();}}mapViewer.toolbar.refreshMapStyleCtrl();}}}).bind(this)},{type:EVENTS["extent-change"],listener:(function(){me.updateForResizing();me.autoSaveZoomAndPos();}).bind(this)},{type:EVENTS["zoom-end"],listener:(function(){me.raiseEvent({name:"zoomLevelChanged",zoomLevel:me.getZoom()});}).bind(this)}];$ARR.forEach(eventListenerArr,function(listener){map.on(listener.type,listener.listener);});},_addBaseTypeMapListeners:function _addBaseTypeMapListeners(){var map=this._baseMap,vismap=this.map,me=this,eventListenerArr;if(!map){return ;}eventListenerArr=this.eventListenerArr=[{type:EVENTS["extent-change"],listener:this.handleExtentChangeEvt.bind(this)},{type:EVENTS["zoom-start"],listener:this.handleZoomStart.bind(this)},{type:EVENTS["zoom-end"],listener:(function(){if(vismap.needMapReadyEvent()){me.isBaseMapReady=false;vismap.graphicsReady=false;}me.handleZoomChange();}).bind(this)},{type:EVENTS.load,listener:this.handleOnLoad.bind(this)},{type:"resize",listener:(function(){me.toUpdateLayers=true;}).bind(this)}];$ARR.forEach(eventListenerArr,function(listener){map.on(listener.type,listener.listener);});},handleMouseWheel:function handleMouseWheel(params){if(!params||!params.zoomDelta){return ;}var _baseMap=this._baseMap,geoPoint=this.pixelXYtoLatLng(params.position),sensitivity=3,around;if(geoPoint){around=[geoPoint.lng,geoPoint.lat];}if(!!_baseMap){_baseMap.easeTo({zoom:this.validateZoomLevel(_baseMap.getZoom()+params.zoomDelta/sensitivity),around:around,animate:false});}},navToInHouseLocation:function navToInHouseLocation(item){var map=this._baseMap,graphic=item.v,bbox;if(!map||!graphic){return ;}if(graphic.attributes.geoId){bbox=graphic.attributes.bbox;if(bbox){map.fitBounds([[bbox[0],bbox[1]],[bbox[2],bbox[3]]],{padding:PADDING,linear:true});}}else{if(graphic.getGeoCenter instanceof Function){this.centerAndZoom(graphic.getGeoCenter(),10);}}},setExtent:function setExtent(geoExtent,forceReset){var _baseMap=this._baseMap;if(_baseMap&&geoExtent){this._super(geoExtent);var s=geoExtent.latSouth<geoExtent.latNorth?geoExtent.latSouth:geoExtent.latNorth,n=geoExtent.latSouth<geoExtent.latNorth?geoExtent.latNorth:geoExtent.latSouth,w=geoExtent.lngWest<geoExtent.lngEast?geoExtent.lngWest:geoExtent.lngEast,e=geoExtent.lngWest<geoExtent.lngEast?geoExtent.lngEast:geoExtent.lngWest;s=s<=-90?-89:s;n=n>=90?89:n;if(forceReset===undefined){if(this.clickDisplayListener){this.clickDisplayListener();}}_baseMap.fitBounds([[w,s],[e,n]],{padding:PADDING});}},setCenter:function setCenter(geoPoint){var _baseMap=this._baseMap;if(_baseMap&&geoPoint&&$MUTIL.checkVal(geoPoint.lat)&&$MUTIL.checkVal(geoPoint.lng)){_baseMap.setCenter([geoPoint.lng,geoPoint.lat]);}},centerAndZoom:function centerAndZoom(geoPoint,zoomLevel){var map=this._baseMap;if(map&&geoPoint&&$MUTIL.checkVal(geoPoint.lat)&&$MUTIL.checkVal(geoPoint.lng)&&$MUTIL.checkVal(zoomLevel)){map.easeTo({zoom:zoomLevel,center:[geoPoint.lng,geoPoint.lat]});}},supportBearingAndPitch:function supportBearingAndPitch(){return true;},getBearing:function getBearing(){var _baseMap=this._baseMap;if(_baseMap&&(_baseMap.getBearing instanceof Function)){return _baseMap.getBearing();}},setBearing:function setBearing(bearing){var _baseMap=this._baseMap;if(_baseMap&&_baseMap.setBearing instanceof Function&&$MUTIL.checkVal(bearing)){_baseMap.setBearing(bearing);}},getPitch:function getPitch(){var _baseMap=this._baseMap;if(_baseMap&&(_baseMap.getPitch instanceof Function)){return _baseMap.getPitch();}},setPitch:function setPitch(pitch){var _baseMap=this._baseMap;if(_baseMap&&_baseMap.setPitch instanceof Function&&$MUTIL.checkVal(pitch)){_baseMap.setPitch(pitch);}},panBy:function panBy(offset){var _baseMap=this._baseMap;if(!!_baseMap&&!!offset&&$MUTIL.checkVal(offset.x)&&$MUTIL.checkVal(offset.y)){_baseMap.panBy([-offset.x,-offset.y],{animate:false});}},getMapStyles:function getMapStyles(){return STYLES_MAP;},getDefaultMapStyle:function getDefaultMapStyle(){return STYLES_MAP[2].id;},getDefaultStyleIdx:function getDefaultStyleIdx(){return 2;},getStyleIdForToolbar:function getStyleIdForToolbar(styleItem){return styleItem.rn+"";},setMapStyle:function setMapStyle(dv){var _baseMap=this._baseMap,mapViewer=this.parent;if(!_baseMap||!mapViewer){return ;}if(this.isForPremium()){mapViewer.destroyAllGraphicLayerViewers();}dv=dv||this.getDefaultMapStyle();_baseMap.setStyle(dv);this.mapStyle=dv;},setLanguage:function setLanguage(newValue){var _baseMap=this._baseMap,mapViewer=this.parent;if(!_baseMap||!mapViewer){return ;}var layers=_baseMap.getStyle().layers,textField,newTextField,newStops;$ARR.forEach(layers,function(layer){textField=layer.layout&&layer.layout["text-field"];if(textField){if(isNameStringField(textField)){newTextField=resetLang(textField,newValue);_baseMap.setLayoutProperty(layer.id,"text-field",newTextField);}else{if(isNameFunctionField(textField)){newStops=textField.stops.map(function(stop){if(stop[1].indexOf("{name")>-1){newTextField=resetLang(stop[1],newValue);return[stop[0],newTextField];}return stop;});textField.stops=newStops;_baseMap.setLayoutProperty(layer.id,"text-field",textField);}}}});this.languageType=newValue;},resize:function resize(width,height){this._super(width,height);var map=this._baseMap,mapViewer=this.parent,resetBtn=$HASH.walk("resetCtrl._container",this);if(map&&map.resize){map.resize();var displayDiv=getCompassNode(this,"","");if(displayDiv&&(!displayDiv.querySelector("span"))){displayDiv.innerHTML='<span class="mapboxgl-ctrl-compass-arrow" style="transform: rotate(0deg); margin: 0"></span>';this.attachClickDisplayEvent();this.attachDownDisplayEvent();this.attachMapRotateEvent();}if(resetBtn&&mapViewer&&(mapViewer.isDynamicZoom()===true)){dispatchCompassEvent(resetBtn,"click");}}},getLngLatCenter:function getLngLatCenter(){var _baseMap=this._baseMap,mapCenter=_baseMap&&_baseMap.getCenter();return mapCenter&&mapCenter.wrap();},getConfig:function getConfig(){var map=this.map,mapConfig=map&&map.getMapConfig();if(mapConfig){return mapConfig.mapbox;}},getToken:function getToken(){var config=this.getConfig();if(config){return config.token;}},latLngToPixelXY:function latLngToPixelXY(point,needRaw){var _baseMap=this._baseMap,screenPoint;if(!_baseMap||!point||!$MUTIL.checkVal(point.lat)||!$MUTIL.checkVal(point.lng)){$MUTIL.log("Catch invalid point");return ;}screenPoint=_baseMap.project([point.lng,point.lat]);if(needRaw!==true){screenPoint=this.adjustPointInsideViewer(screenPoint,this._xCoordsMin);}if(screenPoint&&$MUTIL.checkVal(screenPoint.x)&&$MUTIL.checkVal(screenPoint.y)){return{x:parseInt(screenPoint.x),y:parseInt(screenPoint.y)};}},pixelXYtoLatLng:function pixelXYtoLatLng(pixel){var _baseMap=this._baseMap,latLng;if(!_baseMap||!pixel||!$MUTIL.checkVal(pixel.x)||!$MUTIL.checkVal(pixel.y)){$MUTIL.log("Catch invalid map/point/projection");return ;}latLng=_baseMap.unproject(pixel);if(latLng){return{lat:latLng.lat,lng:latLng.lng};}},checkSupport:function checkSupport(config){if(!config||!config.token){this.displayError(mstrmojo.desc(11726,"Please contact MicroStrategy Technical Support to obtain a map key."));return false;}return true;},showMapTools:function showMapTools(){var navigationCtrl=this.navigationCtrl=this.navigationCtrl||new mapboxgl.NavigationControl(),resetCtrl=this.resetCtrl,_baseMap=this._baseMap;if(_baseMap){_baseMap.addControl(navigationCtrl,POS_NAVIGATOR);_baseMap.addControl(resetCtrl,POS_NAVIGATOR);}},hideMapTools:function hideMapTools(){var _baseMap=this._baseMap,navigationCtrl=this.navigationCtrl,resetCtrl=this.resetCtrl;if(_baseMap&&navigationCtrl){if(navigationCtrl){_baseMap.removeControl(navigationCtrl);}if(resetCtrl){_baseMap.removeControl(resetCtrl);}}},getSearchSuggestions:function getSearchSuggestions(pattern,callback){var blocks=this.getInHouseResults(pattern)||[],token=this.getToken(),xhr;if(!token||!pattern){return ;}xhr=new mstrmojo.SimpleXHR({isTask:false,async:true});xhr.request("GET","https://api.mapbox.com/geocoding/v5/mapbox.places/"+pattern+".json",{success:function(res){var result=getMapboxSuggestionResults(res&&res.features);if(result){blocks.push(result);}callback(blocks);},failure:function(res){console.log("Fail to search using Mapbox api...",res);callback(blocks);}},{access_token:token});},navToCloudLocation:function navToCloudLocation(item){var map=this._baseMap,geo=item&&item.geo,bbox,center;if(!map||!geo){return ;}bbox=geo.bbox;center=geo.center;if(bbox){map.fitBounds([[bbox[0],bbox[1]],[bbox[2],bbox[3]]],{padding:PADDING,linear:true});}else{if(center){map.easeTo({center:center,zoom:12});}}},removeEventListeners:function removeEventListeners(){var listeners=this.eventListenerArr,map=this._baseMap;$ARR.forEach(listeners,function(listener){map.off(listener.type,listener.listener);});this.eventListenerArr=null;},getAllLabelsGroupId:function getAllLabelsGroupId(){var map=this._baseMap,style=map&&map.getStyle(),metadata=style&&style.metadata,mbxGroups=metadata&&metadata["mapbox:groups"],key,group,groupId;if(mbxGroups){for(key in mbxGroups){group=mbxGroups[key];if(group.name===LABEL_GROUP_NAME){groupId=key;break;}}}return groupId;},toggleBaseMapLabels:function toggleBaseMapLabels(isVisible){var map=this._baseMap,style=map&&map.getStyle(),layers=style&&style.layers,groupId=this.getAllLabelsGroupId(),metadata,layerGid;if(isVisible!==undefined){this.showMapLabels=isVisible;}else{isVisible=this.showMapLabels;}if(groupId){this.labelGroupExist=true;$ARR.forEach(layers,function(layer){metadata=layer.metadata;layerGid=metadata&&metadata["mapbox:group"];if(layerGid===groupId){map.setLayoutProperty(layer.id,"visibility",isVisible?"visible":"none");}});}else{this.labelGroupExist=false;}},isLabelGroupExist:function isLabelGroupExist(){return this.labelGroupExist;},getBottomExistLayerKey:function getBottomExistLayerKey(allMapLayers){var mapViewer=this.parent,host=mapViewer&&mapViewer.parent,idxMap=host&&host.layerIdxMappingArr,searchIndex,layerKey;if(!idxMap||idxMap.length<1||!allMapLayers){return undefined;}searchIndex=idxMap.length-1;while(searchIndex>=0){layerKey=idxMap[searchIndex];if($ARR.find(allMapLayers,"id",layerKey)>=0){return layerKey;}searchIndex--;}return undefined;},toggleBaseMapLabelsPos:function toggleBaseMapLabelsPos(onTop){var map=this._baseMap,style=map&&map.getStyle(),layers=style&&style.layers,groupId=this.getAllLabelsGroupId(),metadata,layerGid,bottomGridKey;if(onTop!==undefined){this.mapLabelsOnTop=onTop;}else{onTop=this.mapLabelsOnTop;}if(groupId){if(!onTop){bottomGridKey=this.getBottomExistLayerKey(layers);}$ARR.forEach(layers,function(layer){metadata=layer.metadata;layerGid=metadata&&metadata["mapbox:group"];if(layerGid===groupId){if(onTop){map.moveLayer(layer.id);}else{if(bottomGridKey){map.moveLayer(layer.id,bottomGridKey);}}}});}},isLabelGropOnTop:function isLabelGropOnTop(){return this.mapLabelsOnTop;},removeControls:function removeControls(){var _baseMap=this._baseMap;if(!_baseMap){return ;}$ARR.forEach([this.navigationCtrl,this.resetCtrl],function(item){if(item){_baseMap.removeControl(item);}});this.navigationCtrl=null;this.resetCtrl=null;},destroy:function destroy(ignoreDom){var _baseMap=this._baseMap;this.detachCompassEvent();this.removeControls();var panel=$HASH.walk("map.parent.parent",this);if(panel&&this.panelDisplayListener){panel.detachEventListener(this.panelDisplayListener);this.panelDisplayListener=null;}if($MUTIL.checkHasFunction(_baseMap,"remove")){_baseMap.remove();}mstrmojo.mapbox.loadScriptListeners=[];this._super(ignoreDom);}});})();