(function(){mstrmojo.requiresClsP("mstrmojo.chart.enums","EnumGraphMajorType","EnumValueAxis","EnumDSSGraphObjectManager");mstrmojo.requiresClsP("mstrmojo.chart.model.enums","EnumDSSGraphType","EnumDSSGraphProperty","EnumDSSGraphObject");mstrmojo.requiresClsP("mstrmojo.chart","PlotManager","ValuePlot","GraphObjectManager");var $C=mstrmojo.chart,$CHART_ENUMS=$C.enums,$GMT=$CHART_ENUMS.EnumGraphMajorType,$AXIS_DIRECTION=$CHART_ENUMS.EnumAxisDirection,$OR=$CHART_ENUMS.EnumOrientation,$VA=$CHART_ENUMS.EnumValueAxis,$GOM=$CHART_ENUMS.EnumDSSGraphObjectManager,$NTID=$C.gNullTripleId,$M=mstrmojo.chart.model,$MODEL_ENUMS=$M.enums,$GT=$MODEL_ENUMS.EnumDSSGraphType,$GP=$MODEL_ENUMS.EnumDSSGraphProperty,$GO=$MODEL_ENUMS.EnumDSSGraphObject;var perfTempRect2=new $C.Rect2D(),perfTempRect1=new $C.Rect2D();function checkMirroredPrimary(isX){var chartCtx=this.mChartContextPtr;return chartCtx.mirrorPrimaryInBubbleScatter(isX);}function hPickAxisKeyAndIndex(suggestedKey,suggestIndex,isX){var chartCtx=this.mChartContextPtr;if(chartCtx.mIsGraphMatrix===false){return suggestedKey;}if(suggestedKey==="X1"||suggestedKey==="Y1"){if(checkMirroredPrimary.call(this,isX)){suggestedKey=suggestedKey[0]+"2";suggestIndex=(suggestedKey==="X2")?4:2;}}return{Key:suggestedKey,Index:suggestIndex};}function hIsDualAxis(){var graphType=this.mChartContextPtr.GetGraphType();return((graphType===$GT.DssGraphTypeDualAxis_X_Y_Scatter)||(graphType===$GT.DssGraphTypeDualAxis_X_Y_Scatter_with_Labels)||(graphType===$GT.DssGraphTypeBubble_DualAxis)||(graphType===$GT.DssGraphTypeBubble_DualAxis_With_Labels));}function hIsMultipleYAxis(){return(this.mChartAreaOptions.orientation===$OR.OR_VERTICAL);}function hSetDataAreaValueAxis(chartArea,axisId){var y1Axis=this.Y1Axis[axisId],y2Axis,rect=new $C.Rect2D({Rect2D:chartArea}),DataAreaY1,AreaWithTicks,DataAreaY2;y1Axis.TrimDeviceDataArea(rect);y1Axis.SetDeviceDataArea(rect);DataAreaY1=new $C.Rect2D({Rect2D:rect});y1Axis.AdjustDeviceDataArea(DataAreaY1,true);AreaWithTicks=new $C.Rect2D({Rect2D:DataAreaY1});if(hIsDualAxis.call(this)){y2Axis=this.Y2Axis[axisId];y2Axis.TrimDeviceDataArea(rect);y2Axis.SetDeviceDataArea(rect);DataAreaY2=new $C.Rect2D({Rect2D:rect});y2Axis.AdjustDeviceDataArea(DataAreaY2,true);this.RectangleUnion(DataAreaY1,DataAreaY2,AreaWithTicks);}y1Axis.UpdateTitleAndLabelArea(AreaWithTicks);if(hIsDualAxis.call(this)){y2Axis.UpdateTitleAndLabelArea(AreaWithTicks);}}function hGetValueAxis(chartAreaID,valueAxisType){var SubScript=0,ArrayValueAxis=[this.XAxis,this.Y1Axis,this.Y2Axis];if(((valueAxisType===1||valueAxisType===2)&&hIsMultipleYAxis.call(this))||(valueAxisType===0&&!hIsMultipleYAxis.call(this))){SubScript=chartAreaID;}return ArrayValueAxis[valueAxisType][SubScript];}function hGetMinMaxValueWithChartArea(chartAreaID,vaType){var i=0,Offset=0,Min=Number.MAX_VALUE,Max=-Min,Metrics,GroupCount,SeriesCount=0,Series=[],SeriesIndex=0,SeriesLength,CellData,TempData,isValid=false;if(this.mChartContextPtr.mIsUniformAxisMode){var uaCtx=this.mChartContextPtr.getUniformAxisContext(),uaVA=uaCtx.ValueAxis;switch(vaType){case 0:Min=uaVA.X1.Min;Max=uaVA.X1.Max;Metrics=uaVA.X1.Metrics.concat();break;case 1:Min=uaVA.Y1.Min;Max=uaVA.Y1.Max;Metrics=uaVA.Y1.Metrics.concat();break;case 2:Min=uaVA.Y2.Min;Max=uaVA.Y2.Max;Metrics=uaVA.Y2.Metrics.concat();break;case 3:Min=uaVA.Z.Min;Max=uaVA.Z.Max;Metrics=[];break;case 4:Min=uaVA.X2.Min;Max=uaVA.X2.Max;Metrics=uaVA.X2.Metrics.concat();break;default:Min=uaVA.Y1.Min;Max=uaVA.Y1.Max;Metrics=uaVA.Y1.Metrics.concat();break;}return{Min:Min,Max:Max,Metrics:Metrics};}if(vaType===1||vaType===2){Offset=1;}else{if(vaType===3){Offset=2;}}GroupCount=this.mDatasetPtr.GetGroupCount();if(chartAreaID===-3){SeriesCount=this.mDatasetPtr.GetSeriesCount();for(i=0;i<SeriesCount;++i){Series.push(i);}}else{Series=this.mChartAreaOptions.seriesDistribution[chartAreaID];}SeriesLength=Series.length;for(i=0;i<GroupCount;++i){for(SeriesIndex=0;SeriesIndex<SeriesLength;++SeriesIndex){if((vaType===0||vaType===3)||((vaType===1||vaType===2)&&((vaType-1)===this.VecSeriesVAIndex[Series[SeriesIndex]]))){CellData=this.mDatasetPtr.GetData(Series[SeriesIndex],i,Offset);}if(CellData!==null){TempData=CellData;if(!isValid){isValid=true;}if(Min>TempData){Min=TempData;}if(Max<TempData){Max=TempData;}}}}if(Min>Max){Min=0;Max=0;}if(isValid){return{Min:Min,Max:Max};}}function hReserveHorizontalArea(DataArea){var rectVector=[],isDualAxis,i,y1AxisLength=this.Y1Axis.length,rectVectorLength,initArea1,initArea2;isDualAxis=hIsDualAxis.call(this);for(i=0;i<y1AxisLength;++i){initArea1=new $C.Rect2D({Rect2D:DataArea});initArea2=new $C.Rect2D({Rect2D:DataArea});if(isDualAxis){this.Y2Axis[i].ReserveTitleAndLabels(initArea2,this.mBottomMargin,this.mTopMargin);initArea1=initArea2;initArea1.y=DataArea.y;initArea1.height=DataArea.height;}this.Y1Axis[i].ReserveTitleAndLabels(initArea1,this.mBottomMargin,this.mTopMargin);if(isDualAxis){initArea2=initArea1;initArea2.y=DataArea.y;initArea2.height=DataArea.height;}this.Y1Axis[i].AdjustDeviceDataArea(initArea1,false);rectVector.push(initArea1);if(isDualAxis){this.Y2Axis[i].AdjustDeviceDataArea(initArea2,false);}rectVector.push(initArea2);}rectVectorLength=rectVector.length;perfTempRect1.ResetRect(rectVector[0]);perfTempRect2.Reset(0,0,0,0);var result;for(i=1;i<rectVectorLength;++i){if(!this.RectangleIntersection(perfTempRect1,rectVector[i],perfTempRect2)){perfTempRect1.Reset(0,0,0,0);break;}perfTempRect1=perfTempRect2;}return perfTempRect1;}function hReserveVerticalArea(DataArea){var rectVector=[],i,xAxisLength=this.XAxis.length,rectVectorLength,initArea,xAxis;for(i=0;i<xAxisLength;++i){xAxis=this.XAxis[i];initArea=new $C.Rect2D({Rect2D:DataArea});xAxis.ReserveTitleAndLabels(initArea,this.mLeftMargin,this.mRightMargin);xAxis.AdjustDeviceDataArea(initArea,false);rectVector.push(initArea);}perfTempRect1.ResetRect(rectVector[0]);perfTempRect2.Reset(0,0,0,0);rectVectorLength=rectVector.length;for(i=1;i<rectVectorLength;++i){if(!this.RectangleIntersection(perfTempRect1,rectVector[i],perfTempRect2)){perfTempRect1.Reset(0,0,0,0);break;}perfTempRect1=perfTempRect2;}return perfTempRect1;}function hGenerateGridLines(ChartAreas){var i,j,y1AxisLength=this.Y1Axis.length,xAxisLength=this.XAxis.length,chartAreaNumber=this.mChartAreaOptions.chartAreaNumber;for(i=0;i<y1AxisLength;++i){if(hIsMultipleYAxis.call(this)){this.Y1Axis[i].GenerateGridLines(ChartAreas[i],i,this.mGraphObjectList);if(hIsDualAxis.call(this)){this.Y2Axis[i].GenerateGridLines(ChartAreas[i],i,this.mGraphObjectList);}}else{for(j=0;j<chartAreaNumber;++j){this.Y1Axis[i].GenerateGridLines(ChartAreas[j],j,this.mGraphObjectList);if(hIsDualAxis.call(this)){this.Y2Axis[i].GenerateGridLines(ChartAreas[j],j,this.mGraphObjectList);}}}}for(i=0;i<xAxisLength;++i){if(hIsMultipleYAxis.call(this)){for(j=0;j<chartAreaNumber;++j){this.XAxis[i].GenerateGridLines(ChartAreas[j],j,this.mGraphObjectList);}}else{this.XAxis[i].GenerateGridLines(ChartAreas[i],i,this.mGraphObjectList);}}}function hGenerateInterlacedGrids(ChartAreas){}function hGenerateAxisLines(){var i,Y1AxisLength=this.Y1Axis.length,Y2AxisLength=this.Y2Axis.length,XAxisLength=this.XAxis.length;for(i=0;i<Y1AxisLength;++i){this.Y1Axis[i].generateAxisLine(this.mGraphObjectList);}if(hIsDualAxis.call(this)){for(i=0;i<Y2AxisLength;++i){this.Y2Axis[i].generateAxisLine(this.mGraphObjectList);}}for(i=0;i<XAxisLength;++i){this.XAxis[i].generateAxisLine(this.mGraphObjectList);}}function hCheckDataset(){var graphMajorType=this.mChartContextPtr.GetGraphMajorType(),seriesCount=0,graphType;if(graphMajorType===$GMT.GMT_SCATTER||graphMajorType===$GMT.GMT_BUBBLE){seriesCount=this.mDatasetPtr.GetSeriesCount();graphType=this.mChartContextPtr.GetGraphType();if(graphType===$GT.DssGraphTypeX_Y_Scatter||graphType===$GT.DssGraphTypeX_Y_Scatter_with_Labels||graphType===$GT.DssGraphTypeBubble||graphType===$GT.DssGraphTypeBubble_With_Labels){return seriesCount>=1;}if(graphType===$GT.DssGraphTypeDualAxis_X_Y_Scatter||graphType===$GT.DssGraphTypeDualAxis_X_Y_Scatter_with_Labels||graphType===$GT.DssGraphTypeBubble_DualAxis||graphType===$GT.DssGraphTypeBubble_DualAxis_With_Labels){return seriesCount>=2;}}return false;}function hCreateOneValueAxis(axisKey,props,valueAxisDirection,shouldBeShown){var axisTripleId=this.mChartContextPtr.getAxisTripleId(axisKey),axis=new $C.ValueAxis({TripleId:axisTripleId,GraphObjectManager:this,Min:props.Min,Max:props.Max,LargerGridInterval:false,PrimaryMetricIndex:props.Metrics,IsPercent:false,AxisDirection:valueAxisDirection,IsShown:shouldBeShown,Key:axisKey});var chartCtx=this.mChartContextPtr;if(chartCtx.mIsGraphMatrix&&axis.mIsUniformAxis===false){var axisInfo=chartCtx.getUniformAxisInformation(axisTripleId.mObjectId),condense=axisInfo.CondenseEnforced;axis.checkCondense(!!condense);}return axis;}function hPrepareValueAxis(axisKey,chartAreaID,vaType,valueAxisDirection,shouldBeShown,container){var minMaxVal=hGetMinMaxValueWithChartArea.call(this,chartAreaID,vaType);if(minMaxVal){var axis=hCreateOneValueAxis.call(this,axisKey,minMaxVal,valueAxisDirection,shouldBeShown);container.push(axis);this.mGraphObjectManagerList.push(axis);}}mstrmojo.chart.ValuePlotManager=mstrmojo.declare(mstrmojo.chart.PlotManager,null,{scriptClass:"mstrmojo.chart.ValuePlotManager",ValuePlot:[],XAxis:[],Y1Axis:[],Y2Axis:[],ZAxis:[],VecSeriesVAIndex:[],init:function init(props){this._super(props);this.ValuePlot=[];this.XAxis=[];this.Y1Axis=[];this.Y2Axis=[];this.ZAxis=[];this.VecSeriesVAIndex=[];},Draw:function Draw(){var i,j=0,axes=[this.XAxis,this.Y2Axis,this.Y1Axis],curAxis,valuePlot=this.ValuePlot;$C.GraphObjectManager.prototype.Draw.apply(this,[]);for(i=0;i<=2;++i){curAxis=axes[i];for(j=0;j<curAxis.length;++j){curAxis[j].Draw();}}for(i=0;i<valuePlot.length;++i){valuePlot[i].Draw();}},GenerateMapAndList:function GenerateMapAndList(){var chartCtx=this.mChartContextPtr,plotArea=this.mPlotArea,gomList=this.mGraphObjectManagerList,isUAOutput=chartCtx.isUADataAreaOutput(),minMaxVal,axisKeyAndIndex,xAxis,y1Axis,y2Axis,zAxis,Id,i=0,UACtx,dataArea,rect,lX,lY,lHeight,lWidth,chartAreas=[],frame,valuePlot;if(plotArea.width<=0||plotArea.height<=0){return ;}this.LoadProperties();if(!hCheckDataset.call(this)){return ;}if(hIsMultipleYAxis.call(this)){axisKeyAndIndex=hPickAxisKeyAndIndex.call(this,"X1",0,true);hPrepareValueAxis.call(this,axisKeyAndIndex.Key,-3,axisKeyAndIndex.Index,$AXIS_DIRECTION.AD_X,!isUAOutput,this.XAxis);for(i=0;i<this.mChartAreaOptions.chartAreaNumber;++i){axisKeyAndIndex=hPickAxisKeyAndIndex.call(this,"Y1",1,false);hPrepareValueAxis.call(this,axisKeyAndIndex.Key,i,axisKeyAndIndex.Index,$AXIS_DIRECTION.AD_Y,!isUAOutput,this.Y1Axis);if(hIsDualAxis.call(this)){axisKeyAndIndex=hPickAxisKeyAndIndex.call(this,"Y2",2,false);hPrepareValueAxis.call(this,axisKeyAndIndex.Key,i,axisKeyAndIndex.Index,$AXIS_DIRECTION.AD_Y,!isUAOutput,this.Y2Axis);}}}else{axisKeyAndIndex=hPickAxisKeyAndIndex.call(this,"Y1",1,false);hPrepareValueAxis.call(this,axisKeyAndIndex.Key,-3,axisKeyAndIndex.Index,$AXIS_DIRECTION.AD_Y,!isUAOutput,this.Y1Axis);if(hIsDualAxis.call(this)){axisKeyAndIndex=hPickAxisKeyAndIndex.call(this,"Y2",2,false);hPrepareValueAxis.call(this,axisKeyAndIndex.Key,-3,axisKeyAndIndex.Index,$AXIS_DIRECTION.AD_Y,!isUAOutput,this.Y2Axis);}for(i=0;i<this.mChartAreaOptions.chartAreaNumber;++i){axisKeyAndIndex=hPickAxisKeyAndIndex.call(this,"X1",0,true);hPrepareValueAxis.call(this,axisKeyAndIndex.Key,i,axisKeyAndIndex.Index,$AXIS_DIRECTION.AD_X,!isUAOutput,this.XAxis);}}if(chartCtx.GetGraphMajorType()===$GMT.GMT_BUBBLE){if(chartCtx.isUADataAreaOutput()){UACtx=chartCtx.getUniformAxisContext();minMaxVal={Metrics:[]};minMaxVal.Min=UACtx.ValueAxis.Z.Min;minMaxVal.Max=UACtx.ValueAxis.Z.Max;}else{minMaxVal=hGetMinMaxValueWithChartArea.call(this,-3,3);}if(minMaxVal){zAxis=hCreateOneValueAxis.call(this,"Z",minMaxVal,$AXIS_DIRECTION.AD_Z,false);this.ZAxis.push(zAxis);gomList.push(zAxis);}}rect=hReserveVerticalArea.call(this,plotArea);this.mLeftMargin+=rect.x-plotArea.x;this.mRightMargin+=plotArea.x+plotArea.width-(rect.x+rect.width);this.mTopMargin+=rect.y-plotArea.y;this.mBottomMargin+=plotArea.y+plotArea.height-(rect.y+rect.height);rect.width=Math.max(0,rect.width);rect.height=Math.max(0,rect.height);dataArea=hReserveHorizontalArea.call(this,rect);dataArea.width=Math.max(0,dataArea.width);dataArea.height=Math.max(0,dataArea.height);lY=plotArea.y+Math.max(rect.y-plotArea.y,dataArea.y-rect.y);lHeight=plotArea.y+plotArea.height-Math.max(plotArea.y+plotArea.height-(rect.y+rect.height),rect.y+rect.height-(dataArea.y+dataArea.height))-lY;dataArea.y=lY;dataArea.height=lHeight;lX=plotArea.x+Math.max(rect.x-plotArea.x,dataArea.x-rect.x);lWidth=plotArea.x+plotArea.width-Math.max(plotArea.x+plotArea.width-(rect.x+rect.width),rect.x+rect.width-(dataArea.x+dataArea.width))-lX;dataArea.x=lX;dataArea.width=lWidth;if(chartCtx.mManualLayoutMode&&!this.mRecalculateFrame){dataArea=plotArea;}else{}this.CalculateChartAreas(dataArea,chartAreas);if(chartCtx.isUADataAreaOutput()){var uaCtx=chartCtx.getUniformAxisContext();chartAreas[0].x=uaCtx.mDataAreaLeftMargin;chartAreas[0].y=uaCtx.mDataAreaTopMargin;chartAreas[0].width=chartCtx.mGraphWidth-chartAreas[0].x-uaCtx.mDataAreaRightMargin;chartAreas[0].height=chartCtx.mGraphHeight-chartAreas[0].y-uaCtx.mDataAreaBottomMargin;dataArea=chartAreas[0];}if(hIsMultipleYAxis.call(this)){rect=new $C.Rect2D({Rect2D:dataArea});xAxis=this.XAxis[0];xAxis.TrimDeviceDataArea(rect);xAxis.SetDeviceDataArea(rect);xAxis.AdjustDeviceDataArea(rect,true);xAxis.UpdateTitleAndLabelArea(rect);for(i=0;i<this.mChartAreaOptions.chartAreaNumber;++i){hSetDataAreaValueAxis.call(this,chartAreas[i],i);}}else{hSetDataAreaValueAxis.call(this,dataArea,0);for(i=0;i<this.mChartAreaOptions.chartAreaNumber;++i){xAxis=this.XAxis[i];rect=new $C.Rect2D({Rect2D:chartAreas[i]});xAxis.TrimDeviceDataArea(rect);xAxis.SetDeviceDataArea(rect);xAxis.AdjustDeviceDataArea(rect,true);xAxis.UpdateTitleAndLabelArea(rect);}}if(chartCtx.mManualLayoutMode&&!this.mRecalculateFrame){dataArea=plotArea;}for(i=0;i<this.mChartAreaOptions.chartAreaNumber;++i){if(!chartCtx.mIsGraphMatrix){Id=new $C.TripleId({ObjectId:$GO.DssGraphFrame,SeriesId:i});frame=new $C.RectangleObject({TripleId:Id,GraphObjectManager:this,Area:chartAreas[i]});this.AddToMapAndList(frame);}hGenerateInterlacedGrids.call(this,chartAreas);hGenerateGridLines.call(this,chartAreas);hGenerateAxisLines.call(this);xAxis=hGetValueAxis.call(this,i,0);y1Axis=hGetValueAxis.call(this,i,1);if(hIsDualAxis.call(this)){y2Axis=hGetValueAxis.call(this,i,2);}if(chartCtx.mIsGraphMatrix){Id=$C.PlotId0;}else{Id=new $C.TripleId({ObjectId:$GOM.DssPlot,SeriesId:i});}valuePlot=new $C.ValuePlot({TripleId:Id,GraphObjectManager:this,Area:chartAreas[i]});this.ValuePlot.push(valuePlot);gomList.push(valuePlot);valuePlot.SetDataset(this.mDatasetPtr);valuePlot.mLegendPtr=this.mLegendPtr;valuePlot.AssignValueAxis(xAxis,0);valuePlot.AssignValueAxis(y1Axis,1);if(hIsDualAxis.call(this)){valuePlot.AssignValueAxis(y2Axis,2);}if(chartCtx.GetGraphMajorType()===$GMT.GMT_BUBBLE){valuePlot.AssignValueAxis(this.ZAxis[0],3);}valuePlot.AssignSeriesInfo(this.mChartAreaOptions.seriesDistribution[i],this.VecSeriesVAIndex);valuePlot.GenerateMapAndList();}if(chartCtx.isUADataAreaOutput()){UACtx=chartCtx.getUniformAxisContext();chartAreas[0].x=UACtx.mDataAreaLeftMargin;chartAreas[0].y=UACtx.mDataAreaTopMargin;chartAreas[0].width=chartCtx.mGraphWidth-chartAreas[0].x-UACtx.mDataAreaRightMargin;chartAreas[0].height=chartCtx.mGraphHeight-chartAreas[0].y-UACtx.mDataAreaBottomMargin;dataArea.ResetRect(chartAreas[0]);}},LoadProperties:function LoadProperties(){var chartCtx=this.mChartContextPtr,vectorSeriesVAIndex=this.VecSeriesVAIndex,seriesCount,i,value,tripleId,val;this._super();seriesCount=this.mDatasetPtr.GetSeriesCount();vectorSeriesVAIndex.splice(0,vectorSeriesVAIndex.length);for(i=0;i<seriesCount;++i){tripleId=new $C.TripleId({ObjectId:$GO.DssGraphRiser,SeriesId:i});vectorSeriesVAIndex[i]=$VA.VA_Y1;if(hIsDualAxis.call(this)){val=chartCtx.GetProperty($GP.DssGraph2DSplitYAutomatic,$NTID);if(val){value=chartCtx.GetProperty($GP.DssGraph2DSDSplitY,tripleId);if(value){vectorSeriesVAIndex[i]=(value===false)?$VA.VA_Y1:$VA.VA_Y2;}}else{vectorSeriesVAIndex[i]=(i%2===0)?$VA.VA_Y1:$VA.VA_Y2;}}}}});}());