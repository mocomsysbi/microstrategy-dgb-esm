(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.gm.GMEnums","mstrmojo.ngm.NewGMEnums","mstrmojo.VisUtility","mstrmojo.gm.GMUtility");var $ARR=mstrmojo.array,$HASH=mstrmojo.hash,$VISUTIL=mstrmojo.VisUtility,$GMUTIL=mstrmojo.gm.GMUtility,EnumGraphType=mstrmojo.ngm.EnumGraphType,EnumGraphDirection=mstrmojo.ngm.EnumGraphDirection,ENUM_XML_TAG=mstrmojo.gm.WidgetPropertyTag,STK_EX=mstrmojo.gm.StackExetrmeId,PRP_SHAPE=mstrmojo.gm.EnumShape,PRP_AXIS_SCALE=mstrmojo.gm.EnumAxisScale,PRP_SUBTYPE=mstrmojo.gm.EnumSubtype,EnumETP=mstrmojo.ngm.EnumETP;var INVALID_METRIC_IDX=-20;function getMetricIndexFromID(oid,gts){var col=gts.col,lastObj,mcnt,i,es;if(col){lastObj=col[col.length-1];if(lastObj&&lastObj.otp===-1&&lastObj.es){es=lastObj.es;mcnt=es.length;for(i=0;i<mcnt;i++){if(es[i].oid===oid){return i;}}}}return INVALID_METRIC_IDX;}function tranformAndUpper(ax){var candidate;if(ax==="x1"){candidate="x";}else{if(ax==="y1"){candidate="y";}else{candidate=ax;}}return candidate.toUpperCase();}function getShapesForAxisName(axisName){var hostNameIsMetric=isMetricID(axisName),metricsOnCurrentAxis,shpsOnAx=[],midx,r=0,c=0,me=this;if(hostNameIsMetric){midx=this.getMetricIndexFromID(axisName);return[this.getOnTheFlyShapeForMetric(midx)];}metricsOnCurrentAxis=getMetricsOnCurrentAxis.call(this,r,c,axisName);$ARR.forEach(metricsOnCurrentAxis,function(mi){shpsOnAx.push(me.getOnTheFlyShapeForMetric(mi));});return shpsOnAx;}function getGlobalExtremeForMetric(metricId,sizeByOnly){var temp,exObj,mids,etp,gExOfMetric,mIdx=getMetricIndexFromID.call(this,metricId,this.gts);temp=getExObjAndMids.call(this,PRP_AXIS_SCALE.GLOBAL);exObj=temp.exObj;mids=temp.mids;etp=temp.etp;if(sizeByOnly===true){gExOfMetric=mergeAndGetExtremes(exObj,mids,[mIdx],etp,EnumETP.SIZEBY);}else{gExOfMetric=mergeAndGetExtremes(exObj,mids,[mIdx],etp,EnumETP.SCALE);}return gExOfMetric;}function getGlobalExtremeForAxisOrMetric(hostName,sizeByOnly,ignoreCustom){var me=this,chtInfo=this.getChartInfo(),temp=getExObjAndMids.call(this,PRP_AXIS_SCALE.GLOBAL),exObj,mids,etp,extreme,szBMetrics,hostNameIsMetric=isMetricID(hostName);function inner(hostName,sizeByOnly,ignoreCustom){var scaleType;var extra={};if(hostNameIsMetric){var midx=getMetricIndexFromID.call(this,hostName,this.gts);scaleType=getAxisScaleModeForSingleMetric.call(this,midx,undefined,extra);}else{scaleType=getAxisScaleModeForSingleMetric.call(this,undefined,hostName,extra);}if(!ignoreCustom){if(scaleType===PRP_AXIS_SCALE.CUSTOM){return{min:extra.min,max:extra.max,scaleType:scaleType};}}if(!hostNameIsMetric){if(hostName==="SizeBy"){exObj=temp.exObj;mids=temp.mids;etp=temp.etp;if(chtInfo.isMetVsMet){szBMetrics=$GMUTIL.filterInValidMetricIndex(this.getMetricsOnAxisOfChart(0,0,"z"));}else{szBMetrics=this.getSizeByMetrics();}extreme=mergeAndGetExtremes(exObj,mids,szBMetrics,etp,EnumETP.SIZEBY);}else{var func=(chtInfo.isAttVsMet||chtInfo.isMetOnly)?getMinMaxForABLOnAxis:getMinMaxForBubbleOnAxis;extreme=func.call(this,0,0,hostName,PRP_AXIS_SCALE.GLOBAL);}}else{extreme=getGlobalExtremeForMetric.call(this,hostName,sizeByOnly);}if(extreme){if(chtInfo.isABL&&scaleType!==PRP_AXIS_SCALE.CUSTOM){extreme=correctExtremeForABL.call(me,extreme,getShapesForAxisName.call(me,hostName));}return{min:extreme.min,max:extreme.max,scaleType:scaleType};}$VISUTIL.visPrint("getGlobalExtremeForAxisOrMetric getting faked extreme");return{min:0,max:99999999,scaleType:scaleType};}var ex=inner.call(this,hostName,sizeByOnly,ignoreCustom);if(chtInfo.isABL){ex=correctExtremeForABL.call(me,ex,getShapesForAxisName.call(me,hostName));}return ex;}function getAxisScaleModeForSingleMetric(mtsIdx,dropZone,extraInfo){var i,n,NAME=0,TYPE=1,MIN=2,MAX=3,members,allMetricsType,axisScale=this.axisScale,mtsId,zoneScaleType,singleMetricScaleType,axisScaleData;if(mtsIdx!==undefined){mtsId=(this.jsonModel.getMetricIDsFromIndex([mtsIdx]))[0];}if(axisScale!==PRP_AXIS_SCALE.CUSTOM){return axisScale;}axisScaleData=this.view.getWidgetPropertyValue(ENUM_XML_TAG.AXIS_SCALE_DATA);allMetricsType=parseInt(axisScaleData[0][TYPE],10);if(allMetricsType!==PRP_AXIS_SCALE.DIFFERENT){if(extraInfo!==undefined){extraInfo.min=parseFloat(axisScaleData[0][MIN]);extraInfo.max=parseFloat(axisScaleData[0][MAX]);}return allMetricsType;}for(i=1,n=axisScaleData.length;i<n;i++){members=axisScaleData[i];var hostName=members[NAME];if(dropZone!==undefined&&hostName===dropZone){zoneScaleType=parseInt(members[TYPE],10);if(extraInfo!==undefined){extraInfo.min=parseFloat(members[MIN]);extraInfo.max=parseFloat(members[MAX]);}break;}if(mtsId!==undefined&&mtsId===hostName){singleMetricScaleType=parseInt(members[TYPE],10);if(extraInfo!==undefined){extraInfo.min=parseFloat(members[MIN]);extraInfo.max=parseFloat(members[MAX]);}}}return zoneScaleType!==undefined?zoneScaleType:singleMetricScaleType;}function isMetricID(hostName){var nonMetricNames=["AllMetrics","XAxis","X2Axis","YAxis","Y2Axis","SizeBy"];return(nonMetricNames.indexOf(hostName)<0);}function isDigitInArray(dig,arr){var len=arr.length,i;for(i=0;i<len;i++){if(dig===arr[i]){return true;}}return false;}function getPosOfMids(mids,mIdx,etp,etpType){var i,len=mids.length;for(i=0;i<len;i++){if(mIdx===mids[i]&&(etpType===undefined||etpType===etp[i])){return i;}}return -1;}function getExObjAndMids(hostType,whichAxis,r,c){var extrs=this.extrs,mids,exObj,etp,iLdsIdx,rLds,cLds;if(hostType!==PRP_AXIS_SCALE.GLOBAL){iLdsIdx=this.mapFromChartToLDSIndex(r,c);rLds=iLdsIdx.r;cLds=iLdsIdx.c;}if(whichAxis==="XAxis"||whichAxis==="X2Axis"){whichAxis="x";}else{if(whichAxis==="YAxis"||whichAxis==="Y2Axis"){whichAxis="y";}else{if(whichAxis==="SizeBy"){whichAxis="z";}}}if(hostType===PRP_AXIS_SCALE.GLOBAL){if(extrs.g){exObj=extrs.g.ex;mids=extrs.g.mids;etp=extrs.g.etp;}}else{if(hostType===PRP_AXIS_SCALE.PERROWCOL){if(whichAxis!=="z"){var rOrC=(whichAxis==="y"?extrs.r:extrs.c);if(rOrC){mids=rOrC.mids;exObj=rOrC.ex[(whichAxis==="y"?rLds:cLds)];etp=rOrC.etp;}}else{if(extrs.all){mids=extrs.all.mids;exObj=extrs.all.ex[rLds][cLds];etp=extrs.all.etp;}}}else{if(hostType===PRP_AXIS_SCALE.PERCELL){if(extrs.all){mids=extrs.all.mids;exObj=extrs.all.ex[rLds][cLds];etp=extrs.all.etp;}}}}return{mids:mids,exObj:exObj,etp:etp};}function mergeAndGetExtremes(extrObjCollection,mids,mtsIdxArr,etp,etpType){var i,min=Infinity,max=-Infinity,len=mtsIdxArr.length,exObj,mIdx,pos;if(len>0&&(extrObjCollection===undefined||mids===undefined)){$VISUTIL.visPrint("the extreme is likely missing");return{min:0,max:99999999};}if(len===0){return undefined;}var assigned=false;for(i=0;i<len;i++){mIdx=mtsIdxArr[i];if(mIdx===undefined||mIdx===INVALID_METRIC_IDX){return undefined;}pos=getPosOfMids(mids,mIdx,etp,etpType);if(pos>=0){exObj=extrObjCollection[pos];if(!assigned&&exObj.length>=1){min=$GMUTIL.parseNumeric(exObj[0]);max=$GMUTIL.parseNumeric(exObj[1]);assigned=true;}else{if(min>$GMUTIL.parseNumeric(exObj[0])){min=$GMUTIL.parseNumeric(exObj[0]);}if(max<$GMUTIL.parseNumeric(exObj[1])){max=$GMUTIL.parseNumeric(exObj[1]);}}}else{$VISUTIL.visPrint("the metric "+mIdx+" Not Found in extremes from back end");return{min:0,max:99999999};}}return{min:min,max:max};}function getMetricsOnCurrentAxis(r,c,axisName){var metricsOnCurrentAxis;if(axisName==="YAxis"){metricsOnCurrentAxis=$GMUTIL.filterInValidMetricIndex(this.getMetricsOnAxisOfChart(r,c,"y",true,true));}else{if(axisName==="Y2Axis"){metricsOnCurrentAxis=$GMUTIL.filterInValidMetricIndex(this.getMetricsOnAxisOfChart(r,c,"y",false,true));}else{if(axisName==="XAxis"){metricsOnCurrentAxis=$GMUTIL.filterInValidMetricIndex(this.getMetricsOnAxisOfChart(r,c,"x",true,true));}else{if(axisName==="X2Axis"){metricsOnCurrentAxis=$GMUTIL.filterInValidMetricIndex(this.getMetricsOnAxisOfChart(r,c,"x",false,true));}else{$VISUTIL.visPrint("to support");}}}}return metricsOnCurrentAxis;}function getAxisScaleFromCache(r,c,axisName,axisScale){var tag=axisName[0];if(tag!=="X"&&tag!=="Y"){return null;}this.axisScaleCache=this.axisScaleCache||{};this.axisScaleCache[axisScale]=this.axisScaleCache[axisScale]||{};this.axisScaleCache[axisScale][axisName]=this.axisScaleCache[axisScale][axisName]||{};var scaleType=axisScale,theTarget=null,horvCache=this.axisScaleCache[axisScale][axisName];horvCache=horvCache||{};if(axisName[0]==="X"){if(scaleType===PRP_AXIS_SCALE.GLOBAL||scaleType===PRP_AXIS_SCALE.PERROWCOL){theTarget=horvCache[c];}}else{if(axisName[0]==="Y"){if(scaleType===PRP_AXIS_SCALE.GLOBAL||scaleType===PRP_AXIS_SCALE.PERROWCOL){theTarget=horvCache[r];}}}if(!!theTarget){return theTarget;}return null;}function updateAxisScaleToCache(r,c,axisName,minMax,axisScale){var tag=axisName[0];if(tag!=="X"&&tag!=="Y"){return ;}this.axisScaleCache=this.axisScaleCache||{};this.axisScaleCache[axisScale]=this.axisScaleCache[axisScale]||{};this.axisScaleCache[axisScale][axisName]=this.axisScaleCache[axisScale][axisName]||{};var scaleType=axisScale,horvCache=this.axisScaleCache[axisScale][axisName];horvCache=horvCache||{};if(axisName[0]==="X"){if(scaleType===PRP_AXIS_SCALE.GLOBAL||scaleType===PRP_AXIS_SCALE.PERROWCOL){horvCache[c]=minMax;}}else{if(axisName[0]==="Y"){if(scaleType===PRP_AXIS_SCALE.GLOBAL||scaleType===PRP_AXIS_SCALE.PERROWCOL){horvCache[r]=minMax;}}}}function getMinMaxForABLOnAxis(r,c,axisName,axisScale){var chtInfo=this.getChartInfo(),me=this,dirc=chtInfo.dirc,eDIRC=EnumGraphDirection,exObj,mids,etp,minMax,gExtrsOnX,gExtrsOnY,gExtrsOnX2,gExtrsOnY2,metricsOnCurrentAxis,shpsOnAx=[],temp;if(axisScale===undefined){axisScale=this.axisScale;}minMax=getAxisScaleFromCache.call(this,r,c,axisName,axisScale);if(!!minMax){return minMax;}metricsOnCurrentAxis=getMetricsOnCurrentAxis.call(me,r,c,axisName);$ARR.forEach(metricsOnCurrentAxis,function(mi){shpsOnAx.push(me.getOnTheFlyShapeForMetric(mi));});temp=getExObjAndMids.call(this,axisScale,dirc===eDIRC.VERTICAL?"y":"x",r,c);exObj=temp.exObj;mids=temp.mids;etp=temp.etp;minMax={};if(dirc===eDIRC.VERTICAL){if(this.isStacked&&!this.splitPlottingMetrics){gExtrsOnY=(axisName==="YAxis")&&mergeAndGetExtremes(exObj,mids,[STK_EX.PRIMARY_Y_AXIS],etp,EnumETP.SCALE);gExtrsOnY2=(axisName==="Y2Axis")&&mergeAndGetExtremes(exObj,mids,[STK_EX.SECONDARY_Y_AXIS],etp,EnumETP.SCALE);}else{gExtrsOnY=(axisName==="YAxis")&&mergeAndGetExtremes(exObj,mids,metricsOnCurrentAxis,etp,EnumETP.SCALE);gExtrsOnY2=(axisName==="Y2Axis")&&mergeAndGetExtremes(exObj,mids,metricsOnCurrentAxis,etp,EnumETP.SCALE);}if(gExtrsOnY){gExtrsOnY=correctExtremeForABL.call(me,gExtrsOnY,shpsOnAx);minMax.min=minMax.YMin=gExtrsOnY.min;minMax.max=minMax.YMax=gExtrsOnY.max;}if(gExtrsOnY2){gExtrsOnY2=correctExtremeForABL.call(me,gExtrsOnY2,shpsOnAx);minMax.min=minMax.Y2Min=gExtrsOnY2.min;minMax.max=minMax.Y2Max=gExtrsOnY2.max;}}else{if(this.isStacked&&!this.splitPlottingMetrics){gExtrsOnX=(axisName==="XAxis")&&mergeAndGetExtremes(exObj,mids,[STK_EX.PRIMARY_X_AXIS],etp,EnumETP.SCALE);gExtrsOnX2=(axisName==="X2Axis")&&mergeAndGetExtremes(exObj,mids,[STK_EX.SECONDARY_X_AXIS],etp,EnumETP.SCALE);}else{gExtrsOnX=(axisName==="XAxis")&&mergeAndGetExtremes(exObj,mids,metricsOnCurrentAxis,etp,EnumETP.SCALE);gExtrsOnX2=(axisName==="X2Axis")&&mergeAndGetExtremes(exObj,mids,metricsOnCurrentAxis,etp,EnumETP.SCALE);}if(gExtrsOnX){gExtrsOnX=correctExtremeForABL.call(me,gExtrsOnX,shpsOnAx);minMax.min=minMax.XMin=gExtrsOnX.min;minMax.max=minMax.XMax=gExtrsOnX.max;}if(gExtrsOnX2){gExtrsOnX2=correctExtremeForABL.call(me,gExtrsOnX2,shpsOnAx);minMax.min=minMax.X2Min=gExtrsOnX2.min;minMax.max=minMax.X2Max=gExtrsOnX2.max;}}updateAxisScaleToCache.call(this,r,c,axisName,minMax,axisScale);return minMax;}function getMinMaxForBubbleOnAxis(r,c,axisName,axisScale){var minMax,etpX,etpY,tempX,tempY,metricsOnCurrentAxis,exObjX,exObjY,midsX,midsY,gExtrsOnAx;if(axisScale===undefined){axisScale=this.axisScale;}minMax=getAxisScaleFromCache.call(this,r,c,axisName,axisScale);if(!!minMax){return minMax;}tempX=getExObjAndMids.call(this,axisScale,"x",r,c);exObjX=tempX.exObj;midsX=tempX.mids;etpX=tempX.etp;tempY=getExObjAndMids.call(this,axisScale,"y",r,c);exObjY=tempY.exObj;midsY=tempY.mids;etpY=tempY.etp;metricsOnCurrentAxis=getMetricsOnCurrentAxis.call(this,r,c,axisName);if(axisName==="YAxis"){gExtrsOnAx=mergeAndGetExtremes(exObjY,midsY,metricsOnCurrentAxis,etpY,EnumETP.SCALE);minMax={YMin:gExtrsOnAx&&gExtrsOnAx.min,YMax:gExtrsOnAx&&gExtrsOnAx.max};}else{if(axisName==="Y2Axis"){gExtrsOnAx=mergeAndGetExtremes(exObjY,midsY,metricsOnCurrentAxis,etpY,EnumETP.SCALE);minMax={Y2Min:gExtrsOnAx&&gExtrsOnAx.min,Y2Max:gExtrsOnAx&&gExtrsOnAx.max};}else{if(axisName==="XAxis"){gExtrsOnAx=mergeAndGetExtremes(exObjX,midsX,metricsOnCurrentAxis,etpX,EnumETP.SCALE);minMax={XMin:gExtrsOnAx&&gExtrsOnAx.min,XMax:gExtrsOnAx&&gExtrsOnAx.max};}else{if(axisName==="X2Axis"){gExtrsOnAx=mergeAndGetExtremes(exObjX,midsX,metricsOnCurrentAxis,etpX,EnumETP.SCALE);minMax={X2Min:gExtrsOnAx&&gExtrsOnAx.min,X2Max:gExtrsOnAx&&gExtrsOnAx.max};}else{$VISUTIL.visPrint("to support");}}}}minMax.min=gExtrsOnAx&&gExtrsOnAx.min;minMax.max=gExtrsOnAx&&gExtrsOnAx.max;updateAxisScaleToCache.call(this,r,c,axisName,minMax,axisScale);return minMax;}function getMinMaxOnNumericAxis(r,c){var chtInfo=this.getChartInfo(),res={},me=this,axisNames=["YAxis","Y2Axis","XAxis","X2Axis"],axEx,func;func=chtInfo.isABL?getMinMaxForABLOnAxis:getMinMaxForBubbleOnAxis;axisNames.forEach(function(ax){axEx=func.call(me,r,c,ax);$HASH.copy(axEx,res);});return res;}function correctExtremeForABL(originEx,shapes){var subType=this.chartSubType,hasBar=false,shapeBar=PRP_SHAPE.BAR;shapes=shapes||[];$ARR.forEach(shapes,function(sp){if(sp===shapeBar){hasBar=true;}});if(originEx&&(originEx.min!==undefined&&originEx.max!==undefined)){if(originEx.min>0){if(hasBar){originEx.min=0;}if(subType===PRP_SUBTYPE.PERCENT){originEx.max=1;originEx.min=0;}}if(originEx.max<0){if(hasBar){originEx.max=0;}if(subType===PRP_SUBTYPE.PERCENT){originEx.min=-1;originEx.max=0;}}}return originEx;}function getCustomMinMaxForAxis(axisName,r,c,pairs){var chtInfo=this.getChartInfo(),me=this,NAME=0,TYPE=1,MIN=2,MAX=3,RMIN=4,RMAX=5,AUTO_MIN=7,AUTO_MAX=8,len=pairs.length,i,members,hostName,hostType,groupTogether=false,min,max,autoMin,autoMax,exObj,mids,etp,extreme,temp,gts,szBMetrics,metricIdx,shortAxisName,shortAxisMapping=["Dumy","x","y","z","x2","y2"],axisMapping=["Dumy","XAxis","YAxis","SizeBy","X2Axis","Y2Axis"];shortAxisName=shortAxisMapping[axisMapping.indexOf(axisName)];var isPrimary=true,func;if(shortAxisName==="x2"){shortAxisName="x";isPrimary=false;}if(shortAxisName==="y2"){shortAxisName="y";isPrimary=false;}for(i=1;i<len;i++){members=pairs[i];hostName=members[NAME];if(hostName===axisName){groupTogether=true;hostType=parseInt(members[TYPE],10);if(hostType===PRP_AXIS_SCALE.CUSTOM){max=parseFloat(members[MAX]);min=parseFloat(members[MIN]);autoMin=$GMUTIL.isTrueForBoolValue(members[AUTO_MIN]);autoMax=$GMUTIL.isTrueForBoolValue(members[AUTO_MAX]);return{max:max,min:min,autoMin:autoMin,autoMax:autoMax};}if(axisName==="SizeBy"){temp=getExObjAndMids.call(this,hostType,axisName,r,c);exObj=temp.exObj;mids=temp.mids;etp=temp.etp;if(chtInfo.tp===EnumGraphType.BUBBLE||chtInfo.tp===EnumGraphType.SCATTER){szBMetrics=$GMUTIL.filterInValidMetricIndex(this.getMetricsOnAxisOfChart(r,c,"z"));}else{szBMetrics=this.getSizeByMetrics();}extreme=mergeAndGetExtremes(exObj,mids,szBMetrics,etp,EnumETP.SIZEBY);}else{func=chtInfo.isABL?getMinMaxForABLOnAxis:getMinMaxForBubbleOnAxis;extreme=func.call(this,r,c,axisName,hostType);}return{max:extreme.max,min:extreme.min,autoMin:false,autoMax:false};}}gts=this.jsonModel.getData().gts;var singleMetricMin,singleMetricMax,singleAutoMin,singleAutoMax,metricsOnAxis=$GMUTIL.filterInValidMetricIndex(this.getMetricsOnAxisOfChart(r,c,shortAxisName,isPrimary));if(groupTogether===false){var firstMetric=true;max=min=undefined;for(i=1;i<len;i++){members=pairs[i];hostName=members[NAME];hostType=parseInt(members[TYPE],10);if(isMetricID(hostName)){metricIdx=getMetricIndexFromID.call(this,hostName,gts);if(isDigitInArray(metricIdx,metricsOnAxis)){if(hostType===3){singleAutoMin=$GMUTIL.isTrueForBoolValue(members[AUTO_MIN]);singleAutoMax=$GMUTIL.isTrueForBoolValue(members[AUTO_MAX]);singleMetricMax=singleAutoMax?parseFloat(members[RMAX]):parseFloat(members[MAX]);singleMetricMin=singleAutoMin?parseFloat(members[RMIN]):parseFloat(members[MIN]);}else{temp=getExObjAndMids.call(this,hostType,axisName,r,c);exObj=temp.exObj;mids=temp.mids;etp=temp.etp;extreme=mergeAndGetExtremes(exObj,mids,[metricIdx],etp,axisName==="SizeBy"?EnumETP.SIZEBY:EnumETP.SCALE);if(chtInfo.isABL&&axisName!=="SizeBy"){var sp=me.getOnTheFlyShapeForMetric(metricIdx);extreme=correctExtremeForABL.call(me,extreme,[sp]);}singleMetricMax=extreme.max;singleMetricMin=extreme.min;singleAutoMin=false;singleAutoMax=false;}if(firstMetric){min=singleMetricMin;max=singleMetricMax;autoMin=singleAutoMin;autoMax=singleAutoMax;}else{min=min<singleMetricMin?min:singleMetricMin;max=max>singleMetricMax?max:singleMetricMax;autoMin=autoMin===singleAutoMin?autoMin:false;autoMax=autoMax===singleAutoMax?autoMax:false;}firstMetric=false;}}}return{max:max,min:min,autoMin:autoMin,autoMax:autoMax};}}function getCustomMinMaxForDP(r,c,axisScaleData){var TYPE=1,MIN=2,MAX=3,RMIN=4,RMAX=5,AUTO_MIN=7,AUTO_MAX=8,members,minMax,allMetricsType;members=axisScaleData[0];allMetricsType=parseInt(members[TYPE],10);if(allMetricsType===PRP_AXIS_SCALE.CUSTOM){var gMin,gMax,gAutoMin,gAutoMax;gAutoMin=$GMUTIL.isTrueForBoolValue(members[AUTO_MIN]);gAutoMax=$GMUTIL.isTrueForBoolValue(members[AUTO_MAX]);gMin=gAutoMin?parseFloat(members[RMIN]):parseFloat(members[MIN]);gMax=gAutoMax?parseFloat(members[RMAX]):parseFloat(members[MAX]);minMax={XMin:gMin,XMax:gMax,YMin:gMin,YMax:gMax,ZMin:gMin,ZMax:gMax,X2Min:gMin,X2Max:gMax,Y2Min:gMin,Y2Max:gMax,XAutoMin:gAutoMin,XAutoMax:gAutoMax,X2AutoMin:gAutoMin,X2AutoMax:gAutoMax,YAutoMin:gAutoMin,YAutoMax:gAutoMax,Y2AutoMin:gAutoMin,Y2AutoMax:gAutoMax,ZAutoMin:gAutoMin,ZAutoMax:gAutoMax};}else{var xEx,yEx,zEx,x2Ex,y2Ex;xEx=getCustomMinMaxForAxis.call(this,"XAxis",r,c,axisScaleData);yEx=getCustomMinMaxForAxis.call(this,"YAxis",r,c,axisScaleData);x2Ex=getCustomMinMaxForAxis.call(this,"X2Axis",r,c,axisScaleData);y2Ex=getCustomMinMaxForAxis.call(this,"Y2Axis",r,c,axisScaleData);zEx=getCustomMinMaxForAxis.call(this,"SizeBy",r,c,axisScaleData);minMax={XMin:xEx.min,XMax:xEx.max,YMin:yEx.min,YMax:yEx.max,ZMin:zEx.min,ZMax:zEx.max,X2Min:x2Ex.min,X2Max:x2Ex.max,Y2Min:y2Ex.min,Y2Max:y2Ex.max,XAutoMin:xEx.autoMin,XAutoMax:xEx.autoMax,X2AutoMin:x2Ex.autoMin,X2AutoMax:x2Ex.autoMax,YAutoMin:yEx.autoMin,YAutoMax:yEx.autoMax,Y2AutoMin:y2Ex.autoMin,Y2AutoMax:y2Ex.autoMax,ZAutoMin:zEx.autoMin,ZAutoMax:zEx.autoMax};}return minMax;}function getMinMaxForDP(r,c){var props,chtInfo=this.getChartInfo(),eGT=EnumGraphType,axisScale=this.axisScale,exObjSB,midsSB,etpSB,minMax,realMax,realMin,gSizeByExtrs,tempSB,sizeByMetricsOnCurrentChart,axisScaleData,sizeByMetrics=this.getSizeByMetrics(),hasSizeBy=sizeByMetrics.length>0;if(axisScale===PRP_AXIS_SCALE.CUSTOM){axisScaleData=this.property.readItem(ENUM_XML_TAG.AXIS_SCALE_DATA);}if(chtInfo.isABL){if(axisScale===PRP_AXIS_SCALE.CUSTOM){minMax=getCustomMinMaxForDP.call(this,r,c,axisScaleData);if(chtInfo.isABL&&this.chartSubType===PRP_SUBTYPE.PERCENT){if(hasSizeBy){var sbMetricIdx=sizeByMetrics[0];if(getAxisScaleModeForSingleMetric.call(this,sbMetricIdx,"SizeBy")===PRP_AXIS_SCALE.CUSTOM){realMax=this.jsonModel.getData().gsi.mx[sbMetricIdx].max;realMin=this.jsonModel.getData().gsi.mx[sbMetricIdx].min;minMax.ZMin=minMax.ZMin*(realMax-realMin)+realMin;minMax.ZMax=minMax.ZMax*(realMax-realMin)+realMin;}}}}else{minMax=getMinMaxOnNumericAxis.call(this,r,c);if(hasSizeBy){var temp=getExObjAndMids.call(this,axisScale,"z",r,c);exObjSB=temp.exObj;midsSB=temp.mids;etpSB=temp.etp;gSizeByExtrs=mergeAndGetExtremes(exObjSB,midsSB,sizeByMetrics,etpSB,EnumETP.SIZEBY);if(gSizeByExtrs){minMax.ZMin=gSizeByExtrs.min;minMax.ZMax=gSizeByExtrs.max;}}}}else{if(chtInfo.tp===eGT.BUBBLE||chtInfo.tp===eGT.SCATTER){sizeByMetricsOnCurrentChart=$GMUTIL.filterInValidMetricIndex(this.getMetricsOnAxisOfChart(r,c,"z"));if(axisScale===PRP_AXIS_SCALE.CUSTOM){minMax=getCustomMinMaxForDP.call(this,r,c,axisScaleData);}else{minMax=getMinMaxOnNumericAxis.call(this,r,c);if(hasSizeBy){tempSB=getExObjAndMids.call(this,axisScale,"z",r,c);exObjSB=tempSB.exObj;midsSB=tempSB.mids;etpSB=tempSB.etp;gSizeByExtrs=mergeAndGetExtremes(exObjSB,midsSB,sizeByMetricsOnCurrentChart,etpSB,EnumETP.SIZEBY);if(gSizeByExtrs){minMax.ZMin=gSizeByExtrs.min;minMax.ZMax=gSizeByExtrs.max;}}}if(hasSizeBy&&sizeByMetricsOnCurrentChart.length>0&&minMax.ZMin===undefined&&minMax.ZMax===undefined){var szmInAxis=this.sizeByMetricsSharedInAxis;if(szmInAxis.length>1){var minArr=[],maxArr=[];szmInAxis.forEach(function(ax){minArr.push(minMax[tranformAndUpper(ax)+"Min"]);maxArr.push(minMax[tranformAndUpper(ax)+"Max"]);});minMax.ZMin=minArr.sort()[0];minMax.ZMax=maxArr.sort()[maxArr.length-1];}else{if(szmInAxis.length===1){var collisionSizeByMetric=this.collisionSizeByMetric;var szMAxScaleTp=getAxisScaleModeForSingleMetric.call(this,collisionSizeByMetric[0],tranformAndUpper(szmInAxis[0])+"Axis");if(szMAxScaleTp===PRP_AXIS_SCALE){minMax.ZMin=minMax[tranformAndUpper(szmInAxis[0])+"Min"];minMax.ZMax=minMax[tranformAndUpper(szmInAxis[0])+"Max"];}else{if(szMAxScaleTp!==PRP_AXIS_SCALE.GLOBAL){szMAxScaleTp=PRP_AXIS_SCALE.PERCELL;}tempSB=getExObjAndMids.call(this,szMAxScaleTp,"z",r,c);exObjSB=tempSB.exObj;midsSB=tempSB.mids;etpSB=tempSB.etp;gSizeByExtrs=mergeAndGetExtremes(exObjSB,midsSB,sizeByMetricsOnCurrentChart,etpSB,undefined);if(gSizeByExtrs){minMax.ZMin=gSizeByExtrs.min;minMax.ZMax=gSizeByExtrs.max;}}}}}}else{if(chtInfo.tp===eGT.GRID){if(axisScale===PRP_AXIS_SCALE.CUSTOM){minMax=getCustomMinMaxForDP.call(this,r,c,axisScaleData);}else{tempSB=getExObjAndMids.call(this,axisScale,"z",r,c);exObjSB=tempSB.exObj;midsSB=tempSB.mids;etpSB=tempSB.etp;gSizeByExtrs=mergeAndGetExtremes(exObjSB,midsSB,sizeByMetrics,etpSB,EnumETP.SIZEBY);if(gSizeByExtrs){minMax={ZMin:gSizeByExtrs.min,ZMax:gSizeByExtrs.max};}else{minMax={};}}}}}props={YMinValue:minMax.YMin,YMaxValue:minMax.YMax,Y2MinValue:minMax.Y2Min,Y2MaxValue:minMax.Y2Max,XMinValue:minMax.XMin,XMaxValue:minMax.XMax,X2MinValue:minMax.X2Min,X2MaxValue:minMax.X2Max,ZMinValue:minMax.ZMin,ZMaxValue:minMax.ZMax};$HASH.copyProps(["XAutoMin","XAutoMax","X2AutoMin","X2AutoMax","YAutoMin","YAutoMax","Y2AutoMin","Y2AutoMax","ZAutoMin","ZAutoMax"],minMax,props);return props;}mstrmojo.ngm._NewGMJSONExtremes=mstrmojo.provide("mstrmojo.ngm._NewGMJSONExtremes",{getExtremes:function(rIdx,cIdx){return getMinMaxForDP.call(this,rIdx,cIdx);},getGlobalExtremeForAxisOrMetric:function(hostName,sizeByOnly,ignoreCustom){return getGlobalExtremeForAxisOrMetric.call(this,hostName,sizeByOnly,ignoreCustom);},getChartInfo:function(){return this.gmCtr?this.gmCtr.getChartInfo():{};}});}());