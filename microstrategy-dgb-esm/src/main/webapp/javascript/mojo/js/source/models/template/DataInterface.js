(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.string","mstrmojo.models.template.Titles","mstrmojo.models.template.MetricValue","mstrmojo.models.template.Headers","mstrmojo.models.datasets.DataInterface");var $ARR=mstrmojo.array,$HASH=mstrmojo.hash,$STR=mstrmojo.string,$DATASET_INTERFACE=mstrmojo.models.datasets.DataInterface,FN_DECODE_HTML=$STR.decodeHtmlString;var METRIC_OBJECT_TYPE=-1,RESIZE_SCENARIO_FIT_TO_WINDOW=1,RESIZE_SCENARIO_FIT_TO_CONTENT=2,RESIZE_SCENARIO_FIXED=3;var DATA_FORMAT_TREE=1,DATA_FORMAT_ROWS=2,DATA_FORMAT_ROWS_ADV=3;var PROPERTY_SHOW_VALUE_HIDDEN="0";function getFormattedThresholds(allThresholds){var formattedThresholds={};$HASH.forEach(allThresholds,function(metricThreshold,index){var formattedMetricThreshold=[];$ARR.forEach(metricThreshold,function(threshold){formattedMetricThreshold.push({fillColor:threshold.fillclr,text:threshold.n});});formattedThresholds[index]=formattedMetricThreshold;});return formattedThresholds;}function getDataAsRowsArray(params){var rows=this.getTotalRows(),data=this.data,rowsArray=[],cols=data.gts.col[0],col=cols?cols.es:[],colLength=col.length,i=0;params=$HASH.copy(params,{minAttribute:1,minMetric:1});if(rows<params.minAttribute||colLength<params.minMetric){throw"Error";}do{var headers=this.getRowHeaders(i),j,rowNode={},headerSize=headers.size();for(j=0;j<headerSize;j++){while(j<headerSize&&headers.getHeader(j).getFormIndex()!==undefined){j++;}if(j<headerSize){var header=headers.getHeader(j);rowNode[header.t.n]=header.getName();}}for(j=0;j<col.length;j++){var value=this.getMetricValue(i,j).value;rowNode[col[j].n]={v:value.v,rv:value.rv};}rowsArray.push(rowNode);i++;}while(i<rows);return rowsArray;}function getAttColorByIdx(colorByInfo){var result=[],rowItems=this.data.gts.row;$ARR.forEach(rowItems,function(item,idx){$ARR.forEach(colorByInfo,function(itm){if(item.id===itm.id){result[idx]=true;}});});return result;}function getDataAsRowsArrayAdv(params){var rows=this.getTotalRows(),data=this.data,rowsArray=[],cols=data.gts.col[0],col=cols?cols.es:[],colLength=col.length,index,i=0;params=$HASH.copy(params,{minAttribute:1,minMetric:1,colorByInfo:[],hasTitleName:false,hasSelection:false,needDecode:false});if(rows<params.minAttribute||colLength<params.minMetric){throw"Error";}var needDecode=params.needDecode,hasTitleName=params.hasTitleName,hasSelection=params.hasSelection,hasThreshold=params.hasThreshold,colorByInfo=params.colorByInfo;var allThresholds=hasThreshold?getFormattedThresholds(data.th):undefined;index=getAttColorByIdx.call(this,colorByInfo);do{var headers=this.getRowHeaders(i),metricSelector={},j,eids=[],colorByInfoLen=colorByInfo.length,rowNode={headers:[],values:[],colorInfo:[]};for(j=0;j<headers.size();j++){var header=headers.getHeader(j),headerName=header.getName(),title=header.t,rowHeader={name:needDecode?FN_DECODE_HTML(headerName):headerName};if(hasTitleName){var titleName=title&&title.n;rowHeader.tname=needDecode?FN_DECODE_HTML(titleName):titleName;}if(hasSelection){var titleId=title&&title.id,elementId=header.getElementId();rowHeader.attributeSelector={n:headerName,tid:titleId,eid:elementId,isSelectAttr:true};metricSelector[titleId]=[{n:headerName,id:elementId}];}if(colorByInfoLen&&index[j]===true){var eid=header.getElementId();eids.push(eid);}rowNode.headers.push(rowHeader);}if(colorByInfoLen){rowNode.colorInfo=eids;}for(j=0;j<col.length;j++){var value=this.getMetricValue(i,j).value,rowValue={v:value.v,rv:value.rv};if(hasThreshold){var metricThresholds=allThresholds[j],threshold=metricThresholds&&metricThresholds[value.ti];if(threshold){rowValue.threshold=threshold;}}if(hasTitleName){var colName=this.getColTitles().titles[0].es[j].n;rowValue.name=needDecode?FN_DECODE_HTML(colName):colName;}rowNode.values.push(rowValue);}if(hasSelection){rowNode.metricSelector=metricSelector;}rowsArray.push(rowNode);i++;}while(i<rows);return rowsArray;}function getDataAsTree(params){var data=this.data,rows=this.getTotalRows(),cols=data.gts.col[0],col=cols?cols.es:[],colLength=col.length,root={},eids=[],attIndex,i=0,j;params=$HASH.copy(params,{minAttribute:1,minMetric:1,descKey:"name",childrenKey:"children",hasTitleName:false,hasSelection:false,needDecode:false,nestedLevel:undefined,colorByInfo:[]});if(rows<params.minAttribute||colLength<params.minMetric){throw"Error";}var descKey=params.descKey,childrenKey=params.childrenKey,needDecode=params.needDecode,hasTitleName=params.hasTitleName,hasSelection=params.hasSelection,nestedLevel=params.nestedLevel||0,hasThreshold=params.hasThreshold,colorByInfo=params.colorByInfo,colorByInfoLen=colorByInfo.length;var allThresholds=hasThreshold?getFormattedThresholds(data.th):undefined;root[descKey]="root";attIndex=getAttColorByIdx.call(this,colorByInfo);var processRowHeaders=function(node,headers,index,rowIndex,metricSelector){var children=(node[childrenKey]=node[childrenKey]||[]),header=headers.getHeader(index),title=header&&header.t,titleId=title&&title.id,headerName=(header&&header.getName())||"",headerLen=headers&&headers.headers&&headers.headers.length||0,attInColorBy,elementId=header&&header.getElementId(),newNode=$ARR.filterOne(children,function(child){return(child._eid===elementId);});attInColorBy=$ARR.some(attIndex,function(item,idx){return item&&((index-idx)%headerLen===0);});var nextIdx=index+1,headerNames=[headerName];while(nextIdx<headers.size()){var nextHeader=headers.getHeader(nextIdx),nextTitle=nextHeader&&nextHeader.t,nextTitleId=nextTitle&&nextTitle.id;if(nextTitleId===titleId){index++;if(nextHeader&&nextHeader.getName()){headerNames.push(nextHeader.getName());}}else{break;}nextIdx++;}headerName=headerNames.join(" ");if(colorByInfoLen&&attInColorBy){eids.push(elementId);}if(!newNode||(index===nestedLevel-1)){newNode={_eid:elementId};var hasAttribute=(header!==undefined);if(hasAttribute){newNode[descKey]=needDecode?FN_DECODE_HTML(headerName):headerName;}if(hasTitleName&&hasAttribute){var titleName=title&&title.n;newNode.tname=needDecode?FN_DECODE_HTML(titleName):titleName;}if(hasSelection&&hasAttribute){newNode.attributeSelector={n:headerName,tid:titleId,eid:elementId,isSelectAttr:true};}children.push(newNode);}if(hasSelection&&hasAttribute){metricSelector[titleId]=[{n:headerName,id:elementId}];}if(index<headers.size()-1&&(!nestedLevel||(index<nestedLevel-1))){processRowHeaders.call(this,newNode,headers,index+1,rowIndex,metricSelector);}else{var firstValue=this.getMetricValue(rowIndex,0).value;if(firstValue){newNode.value=firstValue.rv;newNode.formattedValue=firstValue.v;}if(colorByInfoLen){newNode.colorInfo=eids;eids=[];}newNode.values=[];for(j=0;j<col.length;j++){var value=this.getMetricValue(rowIndex,j).value,nodeValue={v:value.v,rv:value.rv};if(hasThreshold){var metricThresholds=allThresholds[j],threshold=metricThresholds&&metricThresholds[value.ti];if(threshold){nodeValue.threshold=threshold;}}if(hasTitleName){var colName=this.getColTitles().titles[0].es[j].n;nodeValue[descKey]=needDecode?FN_DECODE_HTML(colName):colName;}newNode.values.push(nodeValue);}if(hasSelection){newNode.metricSelector=metricSelector;}}};do{processRowHeaders.call(this,root,this.getRowHeaders(i),0,i,{});i++;}while(i<rows);return root;}function getUnitDisplayForms(gts,unitId){var displayForms=[];$ARR.forEach((gts.row||[]).concat(gts.col||[]),function(obj){if((obj.id===unitId)&&(obj.fs)){displayForms=displayForms.concat(obj.fs);}});return displayForms;}mstrmojo.models.template.DataInterface=mstrmojo.declare(null,null,{scriptClass:"mstrmojo.models.template.DataInterface",data:null,init:function(data){this.data=data;},getRowTitles:function(){return new mstrmojo.models.template.Titles({data:this.data,isRow:true});},getColTitles:function(){return new mstrmojo.models.template.Titles({data:this.data,isRow:false});},getTotalRows:function getTotalRows(){if(this.data.eg){return 0;}var data=this.data,gridHeaders=data&&data.ghs,rowHeaders=gridHeaders&&gridHeaders.rhs,rowItems=rowHeaders&&rowHeaders.items;return(rowItems&&rowItems.length)||0;},getTotalColHeaderRows:function getTotalColHeaderRows(){var columnHeaderItems=this.data.ghs.chs.items;return(columnHeaderItems&&columnHeaderItems.length)||0;},getTotalCols:function getTotalCols(){return this.getColHeaders(0).size();},getRowHeaders:function getRowHeaders(pos){return new mstrmojo.models.template.Headers({data:this.data,i:pos,isRow:true});},getColHeaders:function getColHeaders(pos){return new mstrmojo.models.template.Headers({data:this.data,i:pos,isRow:false});},getMetricValue:function getMetricValue(row,col){var data=this.data;return new mstrmojo.models.template.MetricValue({data:data,value:data.gvs.items&&data.gvs.items[row].items[col]});},getColumnHeaderCount:function getColumnHeaderCount(){var gridValueItems=this.data.gvs.items;return gridValueItems?gridValueItems[0].items.length:0;},getCSSString:function getCSSString(){return this.data.cssString;},isEmpty:function isEmpty(){var gsi=this.data.gsi;return !gsi||(!gsi.rows.length&&!gsi.cols.length&&!gsi.mx.length);},getAggregatePadding:function getAggregatePadding(){var fmts=this.data.gsi&&this.data.gsi.fmts,fnReduce=function(a,b){return a+b;},fnGetPadding=function(props){var zoneCount=0;return["ch","rh","va"].map(function(axis){var hasPropInZone=false;return props.map(function(p){if(fmts[axis]&&fmts[axis].hasOwnProperty(p)){if(!hasPropInZone){hasPropInZone=true;zoneCount++;}return fmts[axis][p];}return 0;}).reduce(fnReduce)/props.length;}).reduce(fnReduce)/(zoneCount||1);};if(!fmts){return null;}return{v:fnGetPadding(["tp","bp"]),h:fnGetPadding(["rp","lp"])};},getColResizeScenario:function getColResizeScenario(){var data=this.data;if(data.afw){return RESIZE_SCENARIO_FIT_TO_WINDOW;}else{if(data.afc===false){return RESIZE_SCENARIO_FIXED;}else{return RESIZE_SCENARIO_FIT_TO_CONTENT;}}},getColResizeInfo:function getColResizeInfo(datasets){var data=this.data,info={v:this.getColResizeScenario(),widths:null};var gsi=data.gsi,gts=data.gts||{},colWidths=[],tabularWidthModel=data.twm||{},topColWidths=tabularWidthModel.top||[],bottomColWidths=tabularWidthModel.bottom||[],colWidthIdx=0,fnAddColWidth=function(axisName,addOneUnit){if(gsi){gsi[axisName].every(function(unit){var unitId=unit.did,displayForms=getUnitDisplayForms(gts,unitId),formsInfo=$DATASET_INTERFACE.getFormsByAttrId(unitId,datasets);(displayForms.length?displayForms:[]).forEach(function(dispForm,index){var formInfo=formsInfo[$ARR.find(formsInfo,"fid",dispForm.id)],bottomWidthObj=(bottomColWidths&&bottomColWidths[colWidthIdx])||{};colWidths.push({n:unit.n+(formsInfo.length?(" - "+formInfo.fnm):""),did:unitId,depth:index+1,t:unit.t||4,width:parseInt(bottomWidthObj.w||0,10),widthModel:{top:(topColWidths&&topColWidths[colWidthIdx])||{},bottom:bottomWidthObj}});colWidthIdx++;});return !addOneUnit;});}};fnAddColWidth("rows",false);if(colWidths.length===0){fnAddColWidth("cols",false);}fnAddColWidth("mx",gsi.tma===1);info.widths=colWidths;return info;},getRowResizeScenario:function getRowResizeScenario(){return !!this.data.rh?RESIZE_SCENARIO_FIXED:RESIZE_SCENARIO_FIT_TO_CONTENT;},getRowResizeInfo:function getRowResizeInfo(){var data=this.data,rowHeight=data.rh;return{v:this.getRowResizeScenario(),height:(rowHeight===undefined||rowHeight==="")?data.xrh:rowHeight};},getColumnHeaderData:function getColumnHeaderData(excludeHiddenRowHeader){var data=this.data,gridTitlesData=data.gts,shouldRemoveExtraColumn=data.gts.rec,headerObjects=[],metricElements=[],rowTitles=gridTitlesData.row,excludingHRH=data.gsi.prop.rows.shw===PROPERTY_SHOW_VALUE_HIDDEN&&excludeHiddenRowHeader;$ARR.forEach(rowTitles,function(templateUnit){var forms=templateUnit.fs,isMetricObject=templateUnit.otp===METRIC_OBJECT_TYPE;if(!excludingHRH){if(forms&&forms.length>1){$ARR.forEach(forms,function(){headerObjects.push(templateUnit);});}else{headerObjects.push(templateUnit);}}if(isMetricObject){metricElements=templateUnit.es;}});var columnTitles=gridTitlesData.col;if(columnTitles&&columnTitles.length>0){var gridHeaders=data.ghs,colHeaders=gridHeaders.chs,colHeaderItems=colHeaders.items,totalColumns=colHeaderItems[colHeaderItems.length-1].items,findMetricHeader=function findMetricHeader(headerUnit){var parentIndex=headerUnit.pi,columnIndex=parentIndex&&parentIndex.ci,rowIndex=parentIndex&&parentIndex.ri;if(headerUnit.mix!==undefined){return headerUnit;}if(rowIndex===undefined||columnIndex===undefined){return ;}return findMetricHeader(colHeaderItems[rowIndex].items[columnIndex]);};$ARR.forEach(columnTitles,function(templateUnit){var isMetricObject=templateUnit.otp===METRIC_OBJECT_TYPE;if(!excludingHRH&&(isMetricObject&&(!shouldRemoveExtraColumn||rowTitles.length===0))){headerObjects.push(templateUnit);}if(isMetricObject){metricElements=templateUnit.es;}});var rowHeaderCount=headerObjects.length;$ARR.forEach(totalColumns,function(headerUnit){delete headerUnit._ridx;});if(metricElements.length>0){$ARR.forEach(totalColumns,function(headerUnit){var metricParent=findMetricHeader(headerUnit);var metricIndex=metricParent?metricParent.idx:(headerUnit.pi?0:headerUnit.idx),metricElement=metricElements[metricIndex]||metricElements[0];var relatedIndices=metricElement._ridx=metricElement._ridx||[];if(relatedIndices.length===0){$ARR.forEach(totalColumns,function(relatedHeader,relatedIndex){var relatedMetricParent=findMetricHeader(relatedHeader);if(!metricParent||relatedMetricParent.mix===metricIndex){relatedIndices.push(rowHeaderCount+relatedIndex);}});}headerObjects.push(metricElement);});}}else{if(metricElements.length>0){headerObjects.push(metricElements[0]);}}return headerObjects;},getUnitById:function getUnitById(id){var gsi=this.data.gsi,unit=null;[gsi.rows,gsi.cols,gsi.mx].some(function(axisUnits,axis){if(axis===2){axis=-2;}axisUnits.some(function(axisUnit,depth){if(axisUnit.did===id){unit={axis:axis+1,depth:depth+1,unit:axisUnit};}return !!unit;});return !!unit;});return unit;},getRawData:function getRawData(format,params){switch(format){case DATA_FORMAT_ROWS:return getDataAsRowsArray.call(this,params);case DATA_FORMAT_ROWS_ADV:return getDataAsRowsArrayAdv.call(this,params);}return getDataAsTree.call(this,params);}});mstrmojo.models.template.DataInterface.inflateGridData=function(gridData){var gridValues=gridData.gvs,gridHeaders=gridData.ghs;if(gridData.egt===undefined&&(gridData.eg===undefined||gridData.eg===null)&&!!gridValues&&$HASH.isEmpty(gridValues)){var emptyObj={v:"",rv:""},row={items:(gridHeaders.chs.cws||[0]).map(function(){return emptyObj;})};gridValues.items=gridHeaders.rhs.items?gridHeaders.rhs.items.map(function(){return row;}):[];gridValues.show=true;}};mstrmojo.models.template.DataInterface.ENUM_GRID_RESIZE={FIT_TO_WINDOW:RESIZE_SCENARIO_FIT_TO_WINDOW,FIT_TO_CONTENTS:RESIZE_SCENARIO_FIT_TO_CONTENT,FIXED:RESIZE_SCENARIO_FIXED};mstrmojo.models.template.DataInterface.ENUM_RAW_DATA_FORMAT={TREE:DATA_FORMAT_TREE,ROWS:DATA_FORMAT_ROWS,ROWS_ADV:DATA_FORMAT_ROWS_ADV};}());