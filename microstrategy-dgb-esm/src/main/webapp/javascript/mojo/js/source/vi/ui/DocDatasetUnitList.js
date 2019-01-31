(function(){mstrmojo.requiresCls("mstrmojo.DocDataService","mstrmojo.array","mstrmojo.dom","mstrmojo.hash","mstrmojo.Button");mstrmojo.requiresClsP("mstrmojo.mstr","EnumFunction","EnumDSSXMLBaseFormType","EnumDSSXMLObjectTypes","EnumDSSXMLObjectSubTypes","EnumDSSConsolidationType","EnumDataType","EnumWebAPIErrorCodes");mstrmojo.requiresClsP("mstrmojo.ME","AttributeEditBox","MetricToken");mstrmojo.requiresClsP("mstrmojo.vi.ui","DatasetUnitList","DatasetUnitMenuUtils");mstrmojo.requiresClsP("mstrmojo.ui.menus","MenuConfig","Menu","EditorConfig");mstrmojo.requiresDescs(190,1388,2213,2453,2789,3323,3329,5188,9748,11490,11491,11492,11493,11614,11615,14717);var $ARR=mstrmojo.array,$DOM=mstrmojo.dom,$FUNC=mstrmojo.func,$HASH=mstrmojo.hash,$MSTR=mstrmojo.mstr,$EDT=$MSTR.EnumDataType,$EBFT=$MSTR.EnumDSSXMLBaseFormType,$EOBT=$MSTR.EnumDSSXMLObjectTypes,$EOBST=$MSTR.EnumDSSXMLObjectSubTypes,$ECT=$MSTR.EnumDSSConsolidationType,$EF=$MSTR.EnumFunction,$ERR=$MSTR.EnumWebAPIErrorCodes,$FEATURES=mstrmojo.vi.enums.EnumFeatures,$DU=mstrmojo.vi.ui.DatasetUnitMenuUtils,DOC_UNIT_PROP_ALIAS=1,ITEM_SEPARATOR="\u001E",PU_FLAGS=mstrmojo.DocDataService.PARTIAL_UPDATE_FLAGS,TOOLTIP_OPEN_DELAY=mstrmojo._HasTooltip.TOOLTIP_OPEN_DELAY,itemMarkup,onlyDefExtras={style:{params:{treesToRender:1}}};function submit(actions,callback,extras){var docModel=this.docModel,controller=docModel.controller;callback=$FUNC.wrapMethods({failure:function(res,xhr){this.canceled(xhr.id);}},callback);$HASH.copy({skipUICmdMgrOnFailure:[$ERR.E_INVALID_EXPRESSION]},extras);controller.cmdMgr.execute({execute:function(){this.submit(actions,callback,extras);},urInfo:{callback:callback}});}function getAggregateByShortcutMetricMenu(unitList,item,dsid){var docModel=unitList.docModel;return $DU.getAggregateByMenu(item,function(baseUnit,func){docModel.addShortcutMetric({dsid:dsid,funcType:func,items:[{did:baseUnit.did,t:baseUnit.t}]},docModel.getDatasetsUpdateCallback());});}function getMetricCalculationEditor(unitList,item,dsid){var mx=unitList.dataset.set.mx,newMx=$ARR.filter(mx,function(x){return !x.hide;});return $DU.getCalculationMetricEditor(newMx,item,function(m1,m2,op,op2){var docModel=unitList.docModel,action={act:"addShortcutMetric",dsid:dsid,funcType:op,funcType2:op2,units:[m1,m2]};submit.call(unitList,action,docModel.getDatasetsUpdateCallback(),onlyDefExtras);});}function populateInDocAttributeLinkInfo(als){if(!als){return ;}if(!als.links){als.links={};var links=als.links;$ARR.forEach(als,function(pair){$HASH.forEach(pair,function(p2,p1){if(!links[p1]){links[p1]=[];}links[p1].push(p2);if(!links[p2]){links[p2]=[];}links[p2].push(p1);});});}}function addAttributeLinkingMenu(menuCfg,unitList,item){if(item.t!==$EOBT.Attribute){return ;}var srcDatasetId=unitList._dsetId,docModel=unitList.docModel,controller=docModel.controller,notSupportCb=function(res){var errorCode=res.code||res.getResponseHeader("X-MSTR-TaskErrorCode");if(errorCode==="-2147156975"){mstrmojo.confirm(mstrmojo.desc(14148,"For this dataset, this action can only be performed in the Dataset Editor. Click OK to open the editor now."),{confirmBtn:{t:mstrmojo.desc(1442,"OK"),fn:function(){openDatasetEditor(unitList);}},cancelBtn:{t:mstrmojo.desc(221,"Cancel")}});}},incubeLinkFn=function(actions){var callback=$FUNC.wrapMethods(controller.getRefreshCallback(),{success:function(){controller.cmdMgr.reset();},failure:notSupportCb});docModel.getDataService().submitUpdates(actions,callback,{config:{showProgress:true,hideProgress:true,progressStateText:[mstrmojo.desc(8445,"Loading")],silent:true}});};populateInDocAttributeLinkInfo(docModel.als);$DU.getAttributeLinkMenu(menuCfg,item,srcDatasetId,docModel,incubeLinkFn);}function openDatasetEditor(me){var dsPanel=mstrmojo.all[me.panelId],curDS=me.dataset.set,datasetId=me._dsetId,docModel=me.docModel;dsPanel.showDataImport({isEdit:true,isNewAnalysis:false,isManagedCube:curDS.mngd,AnalysisId:docModel.mid,ReportId:datasetId,CubeName:curDS.name,CubeDesc:curDS.dsc,StatusCode:1});}function getAlsLink(als,itemId,formId){return als.links[itemId+" "+formId];}function addAttributeUnlinkMenu(menuCfg,unitList,item){if(!hasInDocLinking(item,unitList.docModel.als).isLinked){return ;}menuCfg.addMenuItem(mstrmojo.desc(9748,"Unlink"),"",function(){var docModel=unitList.docModel,itemId=item.did,srcForms=[],tgtAttrs=[],tgtForms=[],action;$ARR.forEach(item.fs,function(form){var links=getAlsLink(docModel.als,itemId,form.fid);$ARR.forEach(links,function(al){srcForms.push(form.fid);var tgt=al.split(" ");tgtAttrs.push(tgt[0]);tgtForms.push(tgt[1]);});});action={act:"applyAttributeLinking",srcAttrId:itemId,srcFormId:srcForms.join(ITEM_SEPARATOR),tgtAttrId:tgtAttrs.join(ITEM_SEPARATOR),tgtFormId:tgtForms.join(ITEM_SEPARATOR),unlink:true};submit.call(unitList,action,docModel.controller.getRefreshCallback(),{style:{params:{treesToRender:3}}});});}function hasTacitLink(itemId){if(!this.docModel){return false;}var count=0,threshold=2;$HASH.forEach(this.docModel.datasets,function(dataset){if(count>=threshold){return false;}$ARR.forEach(dataset.att,function(unit){if(unit.did===itemId){count++;return false;}});});return count>=threshold;}function hasInDocLinking(item,als){var result={isLinked:false,isId:false},hasOtherLink=hasTacitLink.call(this,item.did);if(item.t===$EOBT.Attribute){if(hasOtherLink){return{isLinked:true,isId:true};}if(als){populateInDocAttributeLinkInfo(als);$ARR.forEach(item.fs,function(form){if(getAlsLink(als,item.did,form.fid)){result={isLinked:true,isId:!!form.idf};return false;}});}}return result;}function hasIncubeLinking(item,tables){var count=0;$ARR.forEach(tables,function(tb){if($ARR.find(tb.att,"did",item.did)>=0){count++;}});return count>=2;}function addReplaceReferenceMenu(menuCfg,unitList,item){var datasets=mstrmojo.all[unitList.panelId].data,docModel=unitList.docModel,replacableSubType=[{3072:true,3077:true}],isReplacableSubType=function(a,b){var result=false;if(a.st===b.st){result=true;}else{replacableSubType.some(function(sameSubType){if(sameSubType[a.st]&&sameSubType[b.st]){result=true;return true;}});}return result;},units=[];$HASH.forEach(datasets,function(dataset){$ARR.forEach(dataset.mx.concat(dataset.att),function(unit){if(unit.did!==item.did&&unit.t===item.t&&isReplacableSubType(unit,item)&&!unit.hide&&$ARR.find(units,"did",unit.did)===-1){units.push(unit);}});});if(units.length===0){return ;}units=$DU.getSortedDatasetUnits(units);menuCfg.addEditorMenuItem(mstrmojo.desc(11490,"Replace Reference With"),"",function(){return new mstrmojo.ui.menus.EditorConfig({data:{},cssClass:"replaceReference",okVisible:false,cancelVisible:false,contents:[{scriptClass:"mstrmojo.ui.ScrollableContainer",children:[{scriptClass:"mstrmojo.vi.ui.InteractiveUnitList",draggable:false,CLS_HAS_MENU:"",items:units,listHooks:{select:function select(el,unit){var action={act:"applyReconciliation",is_rr:true,members:[{srcid:item.did,srct:item.t,tgtid:unit.did,tgtt:unit.t}]};docModel.submitDataDefnUpdate(docModel.addUpdateObjects(action,{id:unit.did,type:unit.t,flag:PU_FLAGS.DATA_CHANGE}),$FUNC.wrapMethods(docModel.getDatasetsUpdateCallback(),docModel.controller.getPartialUpdateCallback()),mstrmojo.DocDataService.REQUEST_DEFN_DATA);}}}]}]});});}function getDocumentController(){return mstrApp.rootCtrl.docCtrl;}function derivedMetric(view,unit,cmd,type){if(unit.t===$EOBT.Metric){var controller=getDocumentController(),dataService=controller.model.getDataService(),config,actionParams={dsid:view._dsetId,alias:unit.alias||unit.n},callback=null;if(cmd==="edit"){config={metricId:unit.did,metric:unit,editorId:type,action:{cmd:"edit",n:unit.n}};actionParams.did=unit.did;callback=dataService.getEditDerivedMetricSubmitFunc(actionParams);}else{config={metricId:"",editorId:type,action:{cmd:cmd,refOi:{did:unit.did,n:unit.n}}};callback=dataService.getAddNewDerivedMetricToDatasetSubmitFunc(actionParams);}if(controller.model.isFromSolrCube(unit.did)||controller.model.isFromMDXCube(unit.did)){config.disableAFB=true;}controller.openDME(view,config,callback);}}function derivedAttribute(view,el){var unit=this.ctxt,elUnit=el.parentNode,wIcon=new mstrmojo.WaitIcon({placeholder:elUnit.appendChild(document.createElement("span")),markupString:'<span id="{@id}" class="mstrmojo-WaitIcon {@cssClass}" style="{@cssText}"></span>',cssText:"z-index:1; position:absolute; top:0;; right:3px;"});wIcon.render();if(unit.t===$EOBT.Attribute&&unit.da){var controller=getDocumentController(),config={dsid:view._dsetId,did:unit.did,n:unit.n,forms:unit.fs};var callback=function(v){wIcon.set("visible",v);};var forms=config.forms||[];if(isDynamicLink(unit)){controller.openDynamicLinkEditor(view,config,callback);}else{controller.openDAE(view,config,callback);}}}function getRemoveUnitsFromDatasetFunc(du,items){var docModel=du.docModel,controller=docModel.controller,dsid=du._dsetId,actions=[];var puObjs=[];items.forEach(function(item){var uid=item.did,type=item.t;if(type===4&&item.um){actions.push({act:"removeDerivedMetricFromDataset",dsid:dsid,metricId:uid});}else{if(type===12&&item.da){actions.push({act:"removeDAFromDS",dsid:dsid,attrId:uid});}else{if(item.st===12033){actions.push({act:"removeNDEFromDS",dsid:dsid,oid:uid});}else{actions.push({act:"removeBaseUnitFromDataset",dsid:dsid,unitId:uid,unitType:type});}}}puObjs.push({id:uid,type:type,flag:PU_FLAGS.DATA_CHANGE});});return function(){controller.cmdMgr.execute({execute:function(){this.submit(actions,controller.getRefreshCallback(),mstrmojo.DocDataService.REQUEST_DEFN_DATA);},urInfo:{treesToRender:3,undo:function(){this.urInfo.puObjs=puObjs;this.urInfo.callback=$FUNC.wrapMethods(docModel.getDatasetsUpdateCallback(),{success:function(res){if(res.pukeys){docModel.getRebuildCallback().success(res);}}});},redo:function(){this.urInfo.puObjs=null;this.urInfo.callback=controller.getRefreshCallback();}}});};}function shouldShowRemoveMenu(items){if(mstrApp.isInVFConfigMode){return false;}return items.every(function(item){return(item.t===$EOBT.Metric&&item.um)||(item.t===$EOBT.Attribute&&item.da)||item.st===12033;});}function getDatasetsDefChangePUCallBack(){var docModel=this.docModel,zonesModel=docModel.getSelectedViUnit().getZonesModel();return $FUNC.wrapMethods(docModel.getDatasetsUpdateCallback(),{success:function(res){if(res.pukeys){var puKeys=res.pukeys&&res.pukeys.split("\u001E"),unitDefns=docModel.getUnitDefinitions(puKeys),updatedDataCache=docModel.partialUpdate(res.data,unitDefns,res.defn,puKeys),unitsNotUpdated=Object.keys(unitDefns).filter(function(unitKey){return Object.keys(updatedDataCache.def).indexOf(unitKey)===-1;});unitsNotUpdated.forEach(function(unitKey){var widgetId=docModel.getWidgetId({k:unitKey,wid:1}),widget=widgetId&&mstrmojo.all[widgetId],defn;while(widget){defn=widget.defn;if(defn&&defn.t===mstrmojo.EnumRWUnitType.PANEL&&widget.setDirty){widget.setDirty(true);break;}widget=widget.parent;}});}}},docModel.getUpdateHiddenLayoutsCallback(),zonesModel&&zonesModel.getUpdateCallback());}function getReFocusRenamedUnitCallBack(panelId,unitId,datasetId){return{success:function(){var datasetObjects=mstrmojo.all[panelId],portlet=datasetObjects.getDatasetPanel(datasetId),ulist=portlet.ulist,tableView=portlet.tableView,mdxView=portlet.mdxView;var fnHasUnitInList=function fnHasUnitInList(list){return !!$ARR.filterOne(list.items,function(item){return item.did===unitId;});};if(tableView){$ARR.filterOne(tableView.tbl.children,function(table){ulist=table.tulist;return fnHasUnitInList(ulist);});}else{if(mdxView){$ARR.forEach(mdxView.dimensions.children,function(dimension){var recursiveAttributes=dimension.recursiveAttributes;if(fnHasUnitInList(recursiveAttributes)){ulist=recursiveAttributes;return false;}$ARR.forEach(dimension.multiLevelHierarchies.children,function(hierarchy){var levels=hierarchy.levels;if(fnHasUnitInList(levels)){ulist=levels;}return !ulist;});return !ulist;});if(!ulist&&fnHasUnitInList(mdxView.derivedObjects)){ulist=mdxView.derivedObjects;}if(!ulist&&fnHasUnitInList(mdxView.metricFolder.metrics)){ulist=mdxView.metricFolder.metrics;}if(!ulist){$ARR.filterOne(mdxView.metricFolder.folders.children,function(folder){ulist=folder.metrics;return fnHasUnitInList(ulist);});}}}var item=$ARR.filterOne(ulist.items,function(item){return item.did===unitId;});if(item){var idx=item._renderIdx;ulist.singleSelect(idx);ulist._getItemNode(idx).scrollIntoView();}}};}function renameUnit(du,unit,name,datasetId){var m=du.docModel,action;if(unit.t===$EOBT.Metric&&unit.um){action={act:"updateDerivedMetricOnDataset",dsid:datasetId,did:unit.did,name:name};}else{if(unit.t===$EOBT.Attribute&&unit.da){action={act:"updateDA",dsid:datasetId,attrId:unit.did,name:name};}else{if(unit.t===$EOBT.Consolidation&&unit.st===12033){action={act:"applyDEChanges",deId:unit.did,attId:unit.attId,actions:[{act:"updateDeObject",name:name}]};}else{action={act:"editDocUnitProp",dsid:unit.t===$EOBT.Metric?datasetId:null,unitId:unit.did,unitType:unit.t,prop:DOC_UNIT_PROP_ALIAS,value:name};}}}submit.call(du,m.addUpdateObjects(action,{id:unit.did,type:unit.t,flag:PU_FLAGS.FORMAT_CHANGE}),$FUNC.wrapMethods(getDatasetsDefChangePUCallBack.call(du),getReFocusRenamedUnitCallBack(du.panelId,unit.did,datasetId)),mstrmojo.DocDataService.REQUEST_DEFN_DATA);}function checkAndRenameUnit(du,unit,newName,datasetId,fnOnCancel){var isMetric=unit.t===$EOBT.Metric,datasets=isMetric?$HASH.copyProps([datasetId],du.docModel.datasets,{}):du.docModel.datasets,prop=isMetric?"mx":"att",local=[],global=[],fnRename=function(){renameUnit(du,unit,newName,datasetId);};$HASH.forEach(datasets,function(ds){var hasUnit=false,hasOtherUnit=false;$ARR.forEach(ds[prop],function(u){if(u.did===unit.did){hasUnit=true;}else{if(u.t===unit.t&&u.n===newName){hasOtherUnit=true;}}});if(hasOtherUnit){if(hasUnit){local.push(ds.name);}else{global.push(ds.name);}}});if(local.length){mstrmojo.alert(mstrmojo.desc(11650,'Cannot rename: "##" already exists in dataset ###.').replace("###",local.join(", ")).replace("##",newName),fnOnCancel,mstrmojo.desc(1388,"Rename"));return ;}if(global.length){mstrmojo.warn(mstrmojo.desc(11654,'"##" already exists in dataset ###. Do you want to proceed?').replace("###",global.join(", ")).replace("##",newName),{confirmBtn:{fn:fnRename},cancelBtn:{fn:fnOnCancel}},{title:mstrmojo.desc(1388,"Rename")});return ;}if((unit.t===$EOBT.Metric&&unit.um)||(unit.t===$EOBT.Attribute&&unit.da)||(unit.t===$EOBT.Consolidation)){$DU.validateName(newName,fnRename,fnOnCancel);}else{fnRename();}}function hideSelectedItems(du,items){var newItems=$ARR.filter(du.items,function(item){return $ARR.find(items,"did",item.did)<0;});du.clearSelect();du.set("items",newItems);}function hideDocumentUnit(du,items){var actions=[],docModel=du.docModel,datasetId=du._dsetId,createActionForHidden=function(item){return docModel.getToggleHiddenObjectAction(datasetId,item,true);};$ARR.forEach(items,function(item){actions.push(createActionForHidden(item));});return function(){hideSelectedItems(du,items);submit.call(du,actions,docModel.getDatasetsUpdateCallback(),onlyDefExtras);};}function getConvertToMetricAction(item){return{act:"addShortcutMetric",funcType:item.formType===2?$EF.FunctionSum:$EF.FunctionCount,units:[{id:item.did,type:item.t}],prs:[{n:"UseLookupForAttributes",v:"0"}]};}function allowDACreation(did,datasets){var result=true,dataset,units;$ARR.forEach($HASH.keyarray(datasets),function(datasetId){dataset=datasets[datasetId];units=dataset.att.concat(dataset.mx);if($ARR.find(units,"did",did)!==-1&&$DU.hasCGorCon(dataset)){result=false;return false;}});return result;}function isDynamicLink(item){var forms=item.fs||[];return item.t===$EOBT.Attribute&&item.da&&forms.length===2&&forms[1].bftp===$EBFT.DssXmlBaseFormHTMLTag&&forms[1].fnm==="DYNAMICLINK";}mstrmojo.vi.ui.DocDatasetUnitList=mstrmojo.declare(mstrmojo.vi.ui.DatasetUnitList,null,{scriptClass:"mstrmojo.vi.ui.DocDatasetUnitList",docModel:null,addMenuProp:true,multiSelect:true,useListModKeys:true,getItemTooltip:function(item,itemNode){var position=$DOM.position(itemNode);return $HASH.copy({cssClass:"vi-regular vi-tooltip-C",posType:mstrmojo.tooltip.POS_TOPLEFT,top:position.y-2,left:position.x+position.w+6},this._super(item,itemNode));},hasTooltipContent:function(item,itemNode){return true;},tooltipOpenDelay:TOOLTIP_OPEN_DELAY,showMultiSelectionMenu:function showMultiSelectionMenu(items,el,position){var menuCfg=new mstrmojo.ui.menus.MenuConfig({supportsScroll:true,isHostedWithin:false,alignWithAnchor:true,maxHeight:$DOM.getMaxScrollHeight()}),id=this.id,docModel=this.docModel,fns=$DU.getMultiSelectionShortcutMetricFunctions(items),amccItems=items.filter(function(itm){return itm.t===$EOBT.Attribute||itm.t===$EOBT.Metric||itm.t===$EOBT.Filter||itm.t===$EOBT.Consolidation;});if(!mstrApp.isInVFConfigMode&&fns&&fns.length&&mstrmojo.resolveFeature($FEATURES.INSERT_NEW_METRIC)){menuCfg.addSubMenuItem(mstrmojo.desc(5188,"Calculation"),"",id,function(){return $DU.getMultipleMetricsCalculationMenus(items,mstrmojo.all[id]._dsetId,function(data){docModel.addShortcutMetric(data,docModel.getDatasetsUpdateCallback());});});menuCfg.addSeparator();}if(amccItems.length>0&&!mstrApp.isInVFConfigMode){$DU.insertAddUnitToFilterMenu(menuCfg,this.docModel,amccItems);}menuCfg.addMenuItem(mstrmojo.desc(1995,"Hide"),"",hideDocumentUnit(this,items));if(shouldShowRemoveMenu(items)&&((this.dataset.set.att||[]).length+(this.dataset.set.mx||[]).length)>items.length){menuCfg.addMenuItem(mstrmojo.desc(629,"Delete"),"",getRemoveUnitsFromDatasetFunc(this,items));}this.configurePopup(menuCfg,el);menuCfg.position=position;if(menuCfg.hasMenuItems()){this.openPopup(menuCfg.newInstance());}},ondragstart:function ondragstart(context){this.isIgnoreTooltipCloseDelay=true;this.hideTooltip();if(this._super){this._super(context);}},showItemMenu:function showItemMenu(item,el,position){var datasetId=this._dsetId,me=this,docModel=me.docModel,controller=docModel.controller,menuCfg=new mstrmojo.ui.menus.MenuConfig({position:position,isHostedWithin:false,supportsScroll:true,alignWithAnchor:true,maxHeight:$DOM.getMaxScrollHeight()}),id=me.id,highlight=mstrmojo.vi.ui.DatasetUnitMenuUtils.getHighlightElementHandler,getTimeCfg=function(){return $DU.getCreateTimeDAEditorCfg(item,function(actions){for(var i in actions){actions[i].act="addDAToDataset";actions[i].dsid=datasetId;}submit.call(mstrmojo.all[id],actions,docModel.getDatasetsUpdateCallback(),onlyDefExtras);});},curDS=this.dataset.set,isEmmaDataCube=curDS.st===779,isRecursiveAttribute=item.t===$EOBT.Attribute&&item.st===3076,isDynamicLinkAttr=isDynamicLink(item),isMDX=docModel.isMDXDataset(curDS),isDDA=docModel.isDDADataset(curDS),isSparkDataset=docModel.isSparkDataset(curDS),isFromPushApi=docModel.isDatasetFromPushApi(curDS);if(item.t===$EOBT.Attribute){if(!mstrApp.isInVFConfigMode){if(item.da&&!(isDDA&&isMDX)){menuCfg.addMenuItem(mstrmojo.desc(3224,"Edit..."),"",function(){derivedAttribute.call(this,me,el);},item);menuCfg.addSeparator();}if(!item.da&&mstrmojo.resolveFeature($FEATURES.INSERT_NEW_METRIC)){menuCfg.addMenuItem(mstrmojo.desc(13236,"Duplicate as Metric"),"",function(){submit.call(mstrmojo.all[id],[$HASH.copy(getConvertToMetricAction(item),{dsid:datasetId})],docModel.getDatasetsUpdateCallback(),onlyDefExtras);},item);}}if(!$DU.isCGorCon(item,curDS)&&!isRecursiveAttribute&&!isDynamicLinkAttr&&mstrmojo.resolveFeature($FEATURES.INSERT_NEW_METRIC)){menuCfg.addEditorMenuItem(mstrmojo.desc(9918,"Data Type"),id,function(){return $DU.getConfDataTypeMenuCfg(docModel,item,datasetId,function(toCreate,forms){var action;if(toCreate){action={act:"addDAToDataset",isTokenStream:true,dsid:datasetId,forms:forms,name:item.n};}else{action={act:"updateDA",isTokenStream:true,dsid:datasetId,attrId:item.did,update:forms};}submit.call(me,docModel.addUpdateObjects(action,{id:item.did,type:item.t,flag:PU_FLAGS.DATA_CHANGE}),$FUNC.wrapMethods(docModel.getDatasetsUpdateCallback(),controller.getPartialUpdateCallback()),mstrmojo.DocDataService.REQUEST_DEFN_DATA);});},item);if(!mstrApp.isInVFConfigMode&&!(isDDA&&isMDX)&&!isDynamicLinkAttr&&mstrmojo.resolveFeature($FEATURES.INSERT_NEW_METRIC)){menuCfg.addMenuItem(mstrmojo.desc(13625,"Create Attribute..."),"",function(){getDocumentController().openDAE(me,{dsid:datasetId},mstrmojo.emptyFn,item);},item);menuCfg.addMenuItem(mstrmojo.desc(14717,"Create Links..."),"",function(){getDocumentController().openDynamicLinkEditor(me,{dsid:datasetId},mstrmojo.emptyFn,item);},item);}}menuCfg.addSeparator();}else{if(item.t===$EOBT.Metric&&!mstrApp.isInVFConfigMode){if(item.um){menuCfg.addMenuItem(mstrmojo.desc(3224,"Edit..."),"",function(){derivedMetric.call(this,me,this.ctxt,"edit");},item);menuCfg.addSeparator();}if(!item.um&&!item.rdm&&allowDACreation(item.did,docModel.datasets)&&!docModel.isMDXDataset(this.dataset.set)&&mstrmojo.resolveFeature($FEATURES.INSERT_NEW_METRIC)){menuCfg.addMenuItem(mstrmojo.desc(13235,"Duplicate as Attribute"),"",function(){var dt=item.dt,needToRound=(dt===$EDT.DataTypeDouble||dt===$EDT.DataTypeFloat||dt===$EDT.DataTypeReal),getTokenStreamXML=function(needToRound){var tks=[],itemToken={v:mstrmojo.ME.MetricToken.brackets(item.n),tp:266,lv:1,oi:{did:item.did,t:item.t,n:item.n}};tks.push({v:"!",tp:33,lv:4});if(needToRound){tks.push({v:"Round2(",tp:"2",lv:1});tks.push(itemToken);tks.push({v:mstrConfig.listSep+"2)",tp:"2",lv:1});}else{tks.push(itemToken);}tks.push({v:"",tp:-1,lv:4});return mstrmojo.ME.AttributeEditBox.getTokenStreamXML({items:tks});},action={act:"addDAToDataset",dsid:datasetId,isTokenStream:true,forms:[{bft:$EBFT.convertDataType2BaseFormType(dt),formula:getTokenStreamXML(needToRound)}],name:item.n};submit.call(me,action,docModel.getDatasetsUpdateCallback(),onlyDefExtras);},item);}if(docModel.findDatasetIdFromUnit(item.did)&&!docModel.isFromSolrCube(item.did)&&!docModel.isFromMDXCube(item.did)&&mstrmojo.resolveFeature($FEATURES.INSERT_NEW_METRIC)){menuCfg.addSubMenuItem(mstrmojo.desc(11806,"Aggregate By"),"",id,function(){var cfg=getAggregateByShortcutMetricMenu(me,item,datasetId);return cfg;});}menuCfg.addSeparator();if(mstrmojo.resolveFeature($FEATURES.INSERT_NEW_METRIC)){menuCfg.addEditorMenuItem(mstrmojo.desc(5188,"Calculation"),id,function(){return getMetricCalculationEditor(me,item,datasetId);},item);menuCfg.addMenuItem(mstrmojo.desc(13624,"Create Metric..."),"",function(){derivedMetric.call(this,me,this.ctxt,"editNew");},item);menuCfg.addSeparator();}}else{if(!mstrApp.isInVFConfigMode&&item.t===$EOBT.Consolidation&&item.st===12033){menuCfg.addMenuItem(mstrmojo.desc(13296,"Edit Groups..."),"",function(){controller.openDEEditor(me,{dsId:datasetId,attId:null,attName:null,deObj:item,elemId:null,dispName:item.n,fromDatasetPanel:true});},item);menuCfg.addSeparator();}}}var applicableFormTypes=[1,2,8,9,11];if(item.t===$EOBT.Metric||(item.t===$EOBT.Attribute&&!isDynamicLinkAttr&&(item.fs||[]).some(function(form){return applicableFormTypes.indexOf(form.bftp)!==-1;}))){menuCfg.addEditorMenuItem(mstrmojo.desc(13237,"Number Format"),id,function(){var submitNumberFormatAction=function(action){submit.call(me,docModel.addUpdateObjects(action,{id:item.did,type:item.t,flag:PU_FLAGS.FORMAT_CHANGE}),getDatasetsDefChangePUCallBack.call(me),mstrmojo.DocDataService.REQUEST_DEFN_DATA);};if(item.um){var normalizeFormatValue=function nfv(formatValue){var props=["Format","Category","DecimalPlaces","ThousandSeparator","CurrencySymbol","CurrencyPosition","NegativeNumbers"],name=null,result={};$HASH.forEach(formatValue,function(v,k){name=props.filter(function(prop){return prop.toLowerCase()===k.toLowerCase();})[0];if(name){result[name]=v;}});return result;};return $DU.getNumberFormatEditor(item,item.nf||{},function(formatValue){var action={act:"formatDerivedMetric",dsid:datasetId,mid:item.did,format:{FormattingNumber:normalizeFormatValue(formatValue)}};submitNumberFormatAction(action);});}else{return $DU.getNumberFormatEditor(item,item.nf||{},function(data){var action=docModel.getNumberFormatAction(item.did,item.t,data);if(item.t===$EOBT.Metric){action.datasetId=datasetId;action.datasetType=me.dataset.set.type;}submitNumberFormatAction(action);});}});menuCfg.addSeparator();}if(item.t===$EOBT.Attribute){if(!item.da&&docModel.allowManageDocumentDataset()&&(!isEmmaDataCube||(isEmmaDataCube&&docModel.hasPrivilegesForAllTables(this.dataset.set.tables)))&&!isDDA){var tables=$ARR.filter(this.dataset.set.tables,function(tb){return $ARR.find(tb.attRefs,"did",item.did)!==-1;}),mngd=this.dataset.set.mngd,getGeoCfg;if(tables&&tables.length>0){getGeoCfg=function(){return $DU.getMarkGeoRoleEditorCfg(docModel,item,datasetId,mngd,tables,function(actions,disablePU){if(disablePU){docModel.getDataService().submitUpdates(actions,controller.getRefreshCallback());}else{docModel.getDataService().submitUpdates(docModel.addUpdateObjects(actions,{id:item.did,type:item.t,flag:PU_FLAGS.DATA_CHANGE}),$FUNC.wrapMethods(docModel.getDatasetsUpdateCallback(),controller.getPartialUpdateCallback()),mstrmojo.DocDataService.REQUEST_DEFN_DATA);}});};if(getGeoCfg()&&!docModel.isFromSolrCube(item.did)&&!(mstrApp.isSingleTier&&curDS.hcs)){var DssDataImportColumnDeriveFlagIsDerived=-2147483648,enabled=true,itemForms=$ARR.filter(item.fs,function(f){return(f.bftp===2||f.bftp===3)&&(Number(f.der&2147483648)!==DssDataImportColumnDeriveFlagIsDerived);});for(i=0;i<itemForms.length;i++){if(itemForms[i].fnm==="Latitude"||itemForms[i].fnm==="Longitude"){enabled=false;break;}}enabled=enabled&&!isSparkDataset&&!isFromPushApi;if(enabled){menuCfg.addEditorMenuItem(mstrmojo.desc(13526,"Define Geography"),id,getGeoCfg,item);}else{menuCfg.addDisabledMenuItem(mstrmojo.desc(13526,"Define Geography"),"");}}}}if(!mstrApp.isInVFConfigMode&&!(isDDA&&isMDX)&&!$DU.isCGorCon(item,curDS)&&getTimeCfg()&&mstrmojo.resolveFeature($FEATURES.INSERT_NEW_METRIC)){menuCfg.addEditorMenuItem(mstrmojo.desc(12701,"Create Time Attributes"),id,getTimeCfg,item);}menuCfg.addSeparator();}if(docModel.allowManageDocumentDataset()&&!isDynamicLinkAttr){addAttributeLinkingMenu(menuCfg,me,item);addAttributeUnlinkMenu(menuCfg,me,item);if(item.t===$EOBT.Attribute&&hasIncubeLinking(item,this.dataset.set.tables)){var dsPanel=mstrmojo.all[this.panelId],curDS=this.dataset.set;if(this.dataset.set.hcs!==true&&!isSparkDataset){menuCfg.addMenuItem(mstrmojo.desc(13173,"Unmap Attributes..."),"",function(){openDatasetEditor(me);});}}menuCfg.addSeparator();}addReplaceReferenceMenu(menuCfg,me,item);if((!mstrApp.isInVFConfigMode)&&(item.t===$EOBT.Attribute||item.t===$EOBT.Metric||item.t===$EOBT.Filter||item.t===$EOBT.Consolidation)){$DU.insertAddUnitToFilterMenu(menuCfg,docModel,item);}if(item.t===$EOBT.Attribute||(item.t===$EOBT.Metric)||item.t===$EOBT.Filter||item.t===$EOBT.Consolidation||item.t===$EOBT.Dimension){var itemLabelNode=this.getLabelNode(this.getItemNodeFromTarget(el));menuCfg.addMenuItem(mstrmojo.desc(1388,"Rename"),"",function(){$DU.renameItem(itemLabelNode,item,function(renameWidget){var oldName=item.n,fnOnCancel=function(){renameWidget.set("text",oldName);},renamedText=!renameWidget.allowTrimming?renameWidget.text:renameWidget.text.trim();checkAndRenameUnit(me,item,renamedText,datasetId,fnOnCancel);},{allowEmptyText:true,allowTrimming:false,cssClass:itemLabelNode.className});},item);menuCfg.addMenuItem(mstrmojo.desc(1995,"Hide"),"",hideDocumentUnit(me,[item]));if(shouldShowRemoveMenu([item])&&((this.dataset.set.att||[]).length+(this.dataset.set.mx||[]).length)>1){menuCfg.addMenuItem(mstrmojo.desc(629,"Delete"),"",getRemoveUnitsFromDatasetFunc(me,[item]));}}this.configurePopup(menuCfg,el);menuCfg.addPopupHandlers("highlight",highlight(true,el),highlight(false,el));menuCfg.position=position;this.openPopup(menuCfg.newInstance());},doItemSelect:function(item,evt){var hWin=evt.hWin,e=evt.e,dsPanel=mstrmojo.all[this.panelId],isMetaKey=$DOM.isMetaKey(hWin,e),shiftKey=$DOM.shiftKey(hWin,e),oldItems=dsPanel.getPanelSelectedItems(),oldDsid=oldItems[0]&&oldItems[0].ulist.dataset.set.did,newDsid=this.dataset.set.did,crossDataset=oldDsid&&oldDsid!==newDsid,crossList=oldItems.some(function(item){return item.ulist!==this;},this);if(crossList){if(shiftKey){if(!this.getSelectedItems().length){return ;}}else{if(isMetaKey){if(crossDataset){return ;}}else{dsPanel.getDatasetPanel(oldDsid).clearSelect();}}}this._super(item,evt);},getItemMarkup:function getItemMarkup(item){if(!itemMarkup){itemMarkup=this._super(item).replace("</{@tag}>",'<div class="mark"></div></{@tag}>');}return itemMarkup;},getItemProps:function getItemProps(item,idx){item.useAvailGeoFmsOnly=true;var props=this._super(item,idx),linkInfo=hasInDocLinking.call(this,item,this.docModel.als);if(item.t===$EOBT.Attribute&&linkInfo.isLinked){if(!linkInfo.isId){props.addCls("noId");}props.addCls("isAttrLink");}props.addCls(item.ne?"hilight":"");item.ne=false;if(item.t===$EOBT.Consolidation&&item.st===$EOBST.ConsolidationManaged&&item.ndetype===$ECT.DssRecursiveDerivedElement){props.addCls("nde4ra");}return props;},deleteItem:function deleteItem(item){var dataset=this.dataset;window.alert('Delete item "'+(item.n||item.did)+'" from dataset "'+((dataset&&dataset.id)||"unknown")+'".');},doubleClickItem:function doubleClickItem(item){getDocumentController().model.getSelectedViUnit().getZonesModel().addUnitsFromDataSource([item],this._dsetId);},twoClicksItem:function twoClicksItem(item,evt){if(item.t===$EOBT.Attribute||(item.t===$EOBT.Metric)||item.t===$EOBT.Filter||item.t===$EOBT.Consolidation||item.t===$EOBT.Dimension){var me=this,datasetId=this._dsetId;var itemLabelNode=this.getLabelNode(this.getItemNodeFromTarget(evt.getTarget()));$DU.renameItem(itemLabelNode,item,function(renameWidget){var oldName=item.n,fnOnCancel=function(){renameWidget.set("text",oldName);},renamedText=!renameWidget.allowTrimming?renameWidget.text:renameWidget.text.trim();checkAndRenameUnit(me,item,renamedText,datasetId,fnOnCancel);},{allowEmptyText:true,allowTrimming:false,cssClass:itemLabelNode.className});}}});}());