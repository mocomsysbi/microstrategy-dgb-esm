(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo.Button");mstrmap.ESRIMarkerMap=mstrmojo.declare(mstrmap.ESRIMap,null,{scriptClass:"mstrmap.ESRIMarkerMap",iconClass:"",title:"",height:"auto",width:"auto",markupString:'<div id="{@id}" class="tundra mstrmojo-ESRIMap {@cssClass} {@iconClass}" title="{@title}" style="{@cssText};width:{@width};height:{@height};" mstrAttach:click,mousedown,mouseup></div>',selectedMetricIndex:0,onselectedMetricIndexChange:function onselectedMetricIndexChange(){this.debug("selected metric Index Changed");this.adjustColor();},enableClickSelect:false,enableAreaSelect:false,onenableAreaSelectChange:function onenableAreaSelectChange(){if(this.esriToolbar==undefined){return ;}if(this.enableAreaSelect){this.esriToolbar.activate(esri.toolbars.Draw.EXTENT);}else{this.esriToolbar.deactivate(esri.toolbars.Draw.EXTENT);}},enablePopup:true,infoWindowVisible:true,oninfoWindowVisibleChange:function oninfoWindowVisibleChange(){var infoDiv=dojo.byId(this.domNode.id+"_infowindow");if(infoDiv==undefined){console.log("Error: did not find "+this.domNode.id+"_infowindow div.");return ;}if(this.infoWindowVisible){if(infoDiv.style.visibility=="hidden"){infoDiv.style.visibility="";}}else{infoDiv.style.visibility="hidden";}},infoWindowHTML:"",infoWindowUseGrid:true,enableDebug:true,debug:function debug(s){if(this.enableDebug){console.log(s);}},clearMap:function clearMap(){if(this.esriMap!=undefined){this.esriMap.graphics.clear();this.esriMap.infoWindow.hide();}},columnIndices:{Lat:-1,Long:-1},latIndex:-1,longIndex:-1,clearPoints:function cleaPoints(){this.points=new esri.geometry.Multipoint(this.esriMap.spatialReference);},getThresoldString:function getThresoldString(rowIndex,defaultValue){var rowValue=this.data.gvs.items[rowIndex].items;if(rowValue!=undefined&&rowValue instanceof Array){var rowCell=rowValue[this.selectedMetricIndex];if(rowCell!=undefined&&rowCell.ti!=undefined){var thClrIndex=rowCell.ti;var colorArray=this.data.th;if(colorArray!=undefined&&colorArray[thClrIndex]!=undefined){return colorArray[thClrIndex].n;}}}return defaultValue;},minMaxMap:null,maxRadius:60,minRadius:5,bubbleMode:false,populateMinMax:function populateMinMax(metricColumnIndex){if(!this.minMaxMap){this.minMaxMap={};}if(this.minMaxMap.hasOwnProperty(metricColumnIndex)){return ;}var rowHeaders=this.data.ghs.rhs.items;var data=this.data.gvs.items;var rowIndex=0;var minValue=Infinity;var maxValue=-Infinity;for(rowIndex=0;rowIndex<data.length;rowIndex++){var values=data[rowIndex].items;var cell=values[metricColumnIndex];var type=cell.ty;if(!type||type==this.enumNumber){var cellNumber=parseInt(this.stripNumberFormat(cell.v));maxValue=(cellNumber>maxValue)?cellNumber:maxValue;minValue=(cellNumber<minValue)?cellNumber:minValue;}}this.minMaxMap[metricColumnIndex]={min:minValue,max:maxValue};},populateBubbleVariables:function populateBubbleVariables(){if(!this.bubbleMode){return ;}this.populateMinMax(this.selectedMetricIndex);var minMaxObject=this.minMaxMap[this.selectedMetricIndex];this.maxValue=minMaxObject.max;this.validBubble=(this.maxValue!=Infinity);},initESRIMap:function initESRIMap(){this.clearPoints();this.idMarkerMap={};this.populateOriginalPosition();this.populateBubbleVariables();this.longIndex=-1;this.latIndex=-1;var gridBone=microstrategy.bone(this.gridParams.boneId);var props=gridBone.getVisProperties();var data=this.data.gvs.items;var rowAttributes=this.data.gts.row;var numTemplateUnits=rowAttributes.length;var latFormId=props.lat;var longFormId=props.lng;var attrId=props.ma;for(var i=0;i<numTemplateUnits;i++){console.log(i+":"+rowAttributes[i].n);if(rowAttributes[i].id==attrId){var formId=rowAttributes[i].fid;if(formId==latFormId){this.columnIndices.Lat=i;this.latIndex=i;}else{if(formId==longFormId){this.columnIndices.Long=i;this.longIndex=i;}}}}var symbol;var latColumnIndex=this.columnIndices.Lat;var longColumnIndex=this.columnIndices.Long;if(this.longIndex<0||this.latIndex<0){mstrmojo.alert(mstrmojo.desc(8214,"No Mappable attributes present on the report."));return ;}var infoTemplate=new esri.InfoTemplate();infoTemplate.setTitle(" ");var s="";var templateUnitName;for(var j=0;j<rowAttributes.length;j++){if(j==latColumnIndex||j==longColumnIndex){continue;}templateUnitName=rowAttributes[j].n;s+="<b>"+templateUnitName+"</b> :${"+this.replaceSpace(templateUnitName)+"}<br />";}var markerLayer=this.markerLayer;if(markerLayer==undefined){markerLayer=new esri.layers.GraphicsLayer();markerLayer.id="marker";this.markerLayer=markerLayer;}var map=this.esriMap;try{map.addLayer(markerLayer);}catch(e){console.log("error adding layer to map:"+e.name+":"+e.description);}dojo.connect(map,"onMouseMove",this,function(evt){var isIE6=mstrmojo.dom.isIE6;var position=mstrmojo.dom.position(this.domNode,true);if((!this.isAsp||!isIE6)&&(position.y!=this.originalY)){this.esriMap.reposition();this.originalY=position.y;}});this.defaultInfoWindowHTML=this.getDefaultInfoWindowTemplate([latColumnIndex,longColumnIndex]);this.infoWindowHTML=this.defaultInfoWindowHTML;var rowHeaders=this.data.ghs.rhs.items;var validSymbol;for(var rowIndex=data.length-1;rowIndex>=0;rowIndex--){validSymbol=true;var rowHeaderElements=rowHeaders[rowIndex].items;var latitudeElement=rowHeaderElements[latColumnIndex];if(!latitudeElement||latitudeElement.idx<0){continue;}var latitude=this.stripNumberFormat(rowAttributes[latColumnIndex].es[latitudeElement.idx].n);var latitudeId=rowAttributes[latColumnIndex].es[latitudeElement.idx].id;if(latitudeId.indexOf("DB:")==0){continue;}var longitudeElement=rowHeaderElements[longColumnIndex];if(!longitudeElement||longitudeElement.idx<0){continue;}var longitude=this.stripNumberFormat(rowAttributes[longColumnIndex].es[longitudeElement.idx].n);var longitudeId=rowAttributes[longColumnIndex].es[longitudeElement.idx].id;if(longitudeId.indexOf("DB:")==0){continue;}var idkey;if(latitudeId==longitudeId){idkey=latitudeId;}else{idkey=latitudeId+"|"+longitudeId;}if(this.idMarkerMap[idkey]){continue;}var attributes={};for(var i=0;i<rowHeaderElements.length;i++){var rowHeaderElement=rowHeaderElements[i];var titleIndex=rowHeaderElement.tui;var elementValue=rowAttributes[i].es[rowHeaderElement.idx].n;attributes[this.replaceSpace(rowAttributes[i].n)]=elementValue;}var values=data[rowIndex].items;var columnHeaders=this.data.ghs.chs.items;var columnHeaderName;var thresholdType;for(var columnHeaderColumnIndex=0;columnHeaderColumnIndex<values.length;columnHeaderColumnIndex++){columnHeaderName=null;for(var columnHeaderRowIndex=0;columnHeaderRowIndex<columnHeaders.length;columnHeaderRowIndex++){var cellElement=columnHeaders[columnHeaderRowIndex].items[columnHeaderColumnIndex];var cellName=this.data.gts.col[cellElement.tui].es[cellElement.idx].n;if(columnHeaderName==undefined){columnHeaderName=cellName;}else{columnHeaderName+=" "+cellName;}}thresholdType=values[columnHeaderColumnIndex].ty;if(!thresholdType||thresholdType==this.enumNumber){attributes[this.replaceSpace(columnHeaderName)]=values[columnHeaderColumnIndex].v;}else{attributes[this.replaceSpace(columnHeaderName)]=values[columnHeaderColumnIndex].rv;}if(rowIndex==0){s+="<b>"+columnHeaderName+"</b> :${"+this.replaceSpace(columnHeaderName)+"}<br />";}}attributes.rowIndex=rowIndex;attributes.geoIndex=rowIndex;var cell=values[this.selectedMetricIndex];var type=cell.ty;switch(type){case this.enumText:case this.enumQuickSymbol:var colorString=this.getThresoldString(rowIndex,"#ffffff");var dojoColor=new dojo.Color(colorString);dojoColor.a=0.75;symbol=new esri.symbol.TextSymbol(this.getQuickSymbol(cell.v)).setColor(dojoColor).setAlign(esri.symbol.Font.ALIGN_START).setFont(new esri.symbol.Font("12pt").setWeight(esri.symbol.Font.WEIGHT_BOLD));break;case this.enumImage:case this.enumUrl:var imageString=this.getThresoldString(rowIndex,"no");if(imageString!="no"){symbol=new esri.symbol.PictureMarkerSymbol(imageString,20,20);}else{validSymbol=false;}break;case this.enumNumber:default:var colorString=this.getThresoldString(rowIndex,this.DEFAULT_COLOR);var dojoColor=new dojo.Color(colorString);dojoColor.a=0.75;symbol=new esri.symbol.SimpleMarkerSymbol();if(this.bubbleMode){symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE);var cellNumber=parseInt(this.stripNumberFormat(cell.v));if(this.validBubble){var size=this.calculateRadius(cellNumber);symbol.setSize(size);}}else{symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_DIAMOND);}symbol.setColor(dojoColor);symbol.setOutline(this.regularStroke);break;}if(validSymbol){infoTemplate.setContent(s);var point=new esri.geometry.Point(longitude,latitude,this.esriMap.spatialReference);var graphic=new esri.Graphic(point,symbol,attributes,infoTemplate);try{markerLayer.add(graphic);}catch(e){console.log("error added marker to layer:"+e.name+":"+e.description);}if(point!=undefined){this.points.addPoint(point);}this.idMarkerMap[idkey]=graphic;}}this.graphicsLayer=markerLayer;if(this.points!=undefined&&this.points.points.length>0){var extent=this.points.getExtent().expand(1.5);this.esriMap.setExtent(extent);}dojo.connect(markerLayer,"onMouseOver",this,this.showInfoWindow);dojo.connect(map,"onMouseMove",this,function(evt){var isIE6=mstrmojo.dom.isIE6;var position=mstrmojo.dom.position(this.domNode,true);this.esriMap.reposition();this.originalY=position.y;});dojo.connect(map.graphics,"onMouseOut",this,this.hideInfoWindow);dojo.connect(markerLayer,"onClick",this,this.handleSelection);console.log("Done address lookup");},handleExtentDraw:function handleExtentDraw(geometry){var map=this.esriMap;map.graphics.clear();var graphic=map.graphics.add(new esri.Graphic(geometry,new esri.symbol.SimpleLineSymbol()));var point;var selectedGeoIndices=[];var selectedRowIndices=[];var graphics=this.graphicsLayer.graphics;var numGraphics=graphics.length;this.clearHighlight();this.highlightedGraphics=[];for(var i=0;i<numGraphics;i++){var g=graphics[i];if(geometry.contains(g.geometry)){selectedGeoIndices.push(g.attributes.geoIndex);selectedRowIndices.push(g.attributes.rowIndex);g.setSymbol(g.symbol.setOutline(this.selectionStroke));this.highlightedGraphics.push(g);}}this.selectedRowIndices=selectedRowIndices;this.currentSelections=selectedGeoIndices;if(selectedGeoIndices.length>0&&this.enableAreaSelect){var sliceInfo={pos:this.latIndex,elementIndex:selectedGeoIndices.sort(),setViewDataFlag:false,applyControl:true};this.applySelection(sliceInfo);}this.setDrilLButtonEnable();},getGeoIndex:function getGeoIndex(){return this.latIndex;},calculateRadius:function calculateRadius(value){return value*this.maxRadius/this.maxValue;},adjustColor:function adjustColor(){if(this.graphicsLayer==undefined){return ;}this.populateMinMax(this.selectedMetricIndex);this.populateBubbleVariables();var defaultSymbol=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255,255,255,0.35]),1),new dojo.Color([125,125,125,0.35]));var graphics=this.graphicsLayer.graphics;var numGraphics=graphics.length;var symbol;for(var g=0;g<numGraphics;g++){var graphic=graphics[g];symbol=graphic.symbol;var rowIndex=graphic.attributes.rowIndex;var rowValue=this.data.gvs.items[rowIndex].items;var rowCell;var type=this.enumNumber;if(rowValue!=undefined&&rowValue instanceof Array){rowCell=rowValue[this.selectedMetricIndex];type=rowCell.ty;console.log(g+":"+type);}switch(type){case this.enumImage:case this.enumUrl:var imageString=this.getThresoldString(rowIndex,"no");if(imageString!="no"){if(symbol instanceof esri.symbol.PictureMarkerSymbol){symbol.setUrl(imageString);}else{symbol=new esri.symbol.PictureMarkerSymbol(imageString,20,20);}}break;case this.enumText:case this.enumQuickSymbol:var colorString=this.getThresoldString(rowIndex,"#ffffff");var dojoColor=new dojo.Color(colorString);dojoColor.a=0.75;symbol=new esri.symbol.TextSymbol(this.getQuickSymbol(rowCell.v)).setColor(dojoColor).setAlign(esri.symbol.Font.ALIGN_START).setFont(new esri.symbol.Font("12pt").setWeight(esri.symbol.Font.WEIGHT_BOLD));break;case this.enumNumber:default:var colorString=this.getThresoldString(rowIndex,this.DEFAULT_COLOR);var dojoColor=new dojo.Color(colorString);dojoColor.a=0.75;if(this.bubbleMode){symbol=new esri.symbol.SimpleMarkerSymbol();symbol.setColor(dojoColor);symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE);var cellNumber=parseInt(this.stripNumberFormat(rowCell.v));if(this.validBubble){var size=this.calculateRadius(cellNumber);symbol.setSize(size);}else{symbol.setSize(20);}}else{if(symbol instanceof esri.symbol.SimpleMarkerSymbol){symbol=graphic.symbol.setColor(dojoColor);}else{console.log(g+":create new simple marker");symbol=new esri.symbol.SimpleMarkerSymbol();symbol.setColor(dojoColor);}symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_DIAMOND);}break;}graphic.setSymbol(symbol);}this.graphicsLayer.refresh();},getQuickSymbol:function getQuickSymbol(text){var result;switch(text){case"&#9679;":case'<font face="Wingdings">\u006c</font>':result="\u25CF";break;case"&#9632;":case'<font face="Wingdings">\u006e</font>':result="\u25a0";break;case"&#9830;":case'<font face="Wingdings">\u0074</font>':result="\u2666";break;case"&#9670;":case'<font face="Wingdings">\u0075</font>':result="\u25C6";break;case"&#10070;":case'<font face="Wingdings">\u0053</font>':result="\u2756";break;case"&#9784;":case'<font face="Wingdings">\u005D</font>':result="\u2638";break;case"&#10047;":case'<font face="Wingdings">\u007C</font>':result="\u273F";break;case"&#8984;":case'<font face="Wingdings">\u007a</font>':result="\u2318";break;case"&#10003;":case'<font face="Wingdings">\u0009</font>':result="\u2713";break;case"&#10007;":case'<font face="Wingdings">\u000a</font>':result="\u2717";break;case"&#8680;":case'<font face="Wingdings">\u00e8</font>':result="\u21E8";break;case"&#8679;":case'<font face="Wingdings">\u00e9</font>':result="\u21E7";break;case"&#8681;":case'<font face="Wingdings">\u00ea</font>':result="\u21E9";break;default:result=text;}return decodeURI(result);},updateInfoWindowTemplate:function updateInfoWindowTemplate(infoTemplate){if(this.graphicsLayer==undefined){return ;}var graphics=this.queryFeatureSet.features;var numGraphics=graphics.length;for(var g=0;g<numGraphics;g++){var graphic=graphics[g];graphic.setInfoTemplate(infoTemplate);}this.graphicsLayer.refresh();},retrieveDataRows:function retrieveDataRows(sliceInfo){var dataRows=new Array();if(this.columnIndices.Lat<0){return dataRows;}if(sliceInfo){var rowIndex=parseInt(sliceInfo.elementIndex);var cell=this.data.ghs.rhs.items[rowIndex].items[this.columnIndices.Lat];var idx=cell.idx;if(this.viewCache==undefined){this.viewCache=new Object();}if(this.viewCache[idx]){dataRows=this.viewCache[idx];}else{var dataElementIndices;var indexToCheck;var rowHeaders=this.data.ghs.rhs.items;var numRows=rowHeaders.length;for(var k=0;k<numRows;k++){var rowHeader=rowHeaders[k].items;var cellHeader=rowHeader[this.columnIndices.Lat];if(!cellHeader){continue;}if(cellHeader.idx==idx){dataRows.push(k);}}this.viewCache[idx]=dataRows;}}return dataRows;},isIndexGeoPosition:function isIndexGeoPosition(index){var results=false;for(var geoName in this.columnIndices){if(index>=0&&index==this.columnIndices[geoName]){results=true;break;}}return results;}});})();