(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.array","mstrmojo.gmaps.MapUtils");var $MUTILS=mstrmojo.gmaps.MapUtils;mstrmojo.gmaps._MapAffinityLine=mstrmojo.provide("mstrmojo.gmaps._MapAffinityLine",{_mixinName:"mstrmojo.gmaps._MapAffinityLine",aftTempFirstAttrIndex:0,aftTempSecondAttrIndex:-1,aftTempSecnodMetricIndex:-1,aftTempMetricMaxVal:-Infinity,affinityLineDefaultColor:undefined,affinityLineGraphicsConfig:undefined,createAffinityLinesConfig:function createAffinityLinesConfig(){if(!this.wpDisPlayAffinityLines){return ;}var secModel=this.secondaryModel;if(!secModel){mstrmojo.alert(mstrmojo.desc(10366,"Secondary data provider could not be found. In order to see the Affinity Lines, please reset the secondary data provider in the design mode."),null,mstrmojo.desc(14815,"Affinity Lines Error"));return ;}if(this.findAftTempAttrIndices()===-1){return ;}if(this.useAttribute&&!this.checkLookUpAttrInAftTemp()){mstrmojo.alert(mstrmojo.desc(10367,"Lookup Attribute must be present in the affinity data provider."),null,mstrmojo.desc(14815,"Affinity Lines Error"));return ;}if(secModel.getColTitles().size()===0){mstrmojo.alert(mstrmojo.desc(10368,"No Metric is present on the secondary data provider."),null,mstrmojo.desc(14815,"Affinity Lines Error"));return ;}this.computeAftTempMetricMaxVal();this.findAftTempSecondMetricIndex();if(!this.affinityLineDefaultColor){this.affinityLineDefaultColor=this.parent.getNextDefaultAffinityLineColor();}var graphicsConfig=this.affinityLineGraphicsConfig=[];var sourceAttrElementID,destAttrElementID,rowIndex,lineColor,lineThickness,rowHeaderElements,firstAttrElementHeader,secondAttrElementHeader,sourceLocation,destLocation,rowCount=secModel.getTotalRows();for(rowIndex=0;rowIndex<rowCount;rowIndex++){rowHeaderElements=secModel.getRowHeaders(rowIndex);firstAttrElementHeader=rowHeaderElements.getHeader(this.aftTempFirstAttrIndex);secondAttrElementHeader=rowHeaderElements.getHeader(this.aftTempSecondAttrIndex);sourceAttrElementID=this.getElementIdWithoutAttributeID(firstAttrElementHeader.getElementId());destAttrElementID=this.getElementIdWithoutAttributeID(secondAttrElementHeader.getElementId());sourceLocation=this.markerElementIDs[sourceAttrElementID];destLocation=this.markerElementIDs[destAttrElementID];if(!sourceLocation||!destLocation){continue;}lineColor=this.getAffinityLineColor(rowIndex);lineThickness=this.getAffinityLineThickness(rowIndex);graphicsConfig.push({sourceLocation:sourceLocation,destLocation:destLocation,strokeColor:lineColor,strokeWidth:lineThickness});}},isAffinityLineShown:function isAffinityLineShown(){if(this._viewer&&(typeof this._viewer.isAffinityLineShown==="function")){return this._viewer.isAffinityLineShown();}return false;},isAffinityLineHide:function isAffinityLineHide(){if(this._viewer&&(typeof this._viewer.isAffinityLineHide==="function")){return this._viewer.isAffinityLineHide();}return true;},showAffinityLineLayer:function showAffinityLineLayer(){var _viewer=this._viewer;if($MUTILS.checkHasFunction(_viewer,"showAffinityLineLayer")){return _viewer.showAffinityLineLayer();}},hideAffinityLineLayer:function hideAffinityLineLayer(){var _viewer=this._viewer;if($MUTILS.checkHasFunction(_viewer,"hideAffinityLineLayer")){return _viewer.hideAffinityLineLayer();}},isAffinityLineLayerEnabled:function isAffinityLineLayerEnabled(){return this.wpDisPlayAffinityLines;},findAftTempAttrIndices:function findAftTempAttrIndices(){var i,attrId,rowAttributes=this.secondaryModel.getRowTitles(),size=rowAttributes.size();if(size<2){return -1;}attrId=rowAttributes.getTitle(0).getUnitId();for(i=1;i<size;i++){if(rowAttributes.getTitle(i).getUnitId()!==attrId){this.aftTempSecondAttrIndex=i;return i;}}return -1;},findAftTempSecondMetricIndex:function findAftTempSecondMetricIndex(){var colAttributes=this.secondaryModel.getColTitles().getTitle(0).getHeaderValues();this.aftTempSecnodMetricIndex=(colAttributes.length>1)?1:-1;},checkLookUpAttrInAftTemp:function checkLookUpAttrInAftTemp(){var rowAttributes=this.secondaryModel.getRowTitles(),numTemplateUnits=rowAttributes.size();for(var i=0;i<numTemplateUnits;i++){if(rowAttributes.getTitle(i).getUnitId()===this.wpLookupAttId){return true;}}return false;},computeAftTempMetricMaxVal:function computeAftTempMetricMaxVal(){var rowIndex,cell,val,cellNumber,rawVal,maxValue=-Infinity,secModel=this.secondaryModel,rowCount=secModel.getTotalRows();for(rowIndex=0;rowIndex<rowCount;rowIndex++){cell=secModel.getMetricValue(rowIndex,0);val=cell.getValue();if(val){rawVal=cell.getRawValue();cellNumber=parseFloat(!rawVal?this.stripNumberFormat(val):rawVal);maxValue=(cellNumber>maxValue)?cellNumber:maxValue;}}this.aftTempMetricMaxVal=maxValue;},getAffinityLineColor:function getAffinityLineColor(rowIndex){var secModel=this.secondaryModel,lineColorObj=this.getThresholdInfo(rowIndex,0,secModel);if(this.aftTempSecnodMetricIndex!==-1){lineColorObj=this.getThresholdInfo(rowIndex,this.aftTempSecnodMetricIndex,secModel);}return lineColorObj?lineColorObj.colorStr:this.affinityLineDefaultColor;},getAffinityLineThickness:function getAffinityLineThickness(rowIndex){var cell=this.secondaryModel.getMetricValue(rowIndex,0),value=cell.getValue(),lineThickness=1,rawVal,metricCellValue;if(value){rawVal=cell.getRawValue();metricCellValue=parseFloat(!rawVal?this.stripNumberFormat(value):rawVal);lineThickness=(metricCellValue*this.wpMaxLineThickness)/this.aftTempMetricMaxVal;}return lineThickness;}});}());