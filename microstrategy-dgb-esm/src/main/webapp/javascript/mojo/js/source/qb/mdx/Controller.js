(function(){mstrmojo.requiresCls("mstrmojo.qb.mdx.DataService","mstrmojo.warehouse.WHController","mstrmojo.qb.QBHelpers","mstrmojo.DI.DIHelpers");var $H=mstrmojo.hash,$Help=mstrmojo.DI.DIHelpers,$QBHelpers=mstrmojo.qb.QBHelpers,$DIConstants=mstrmojo.DI.DIConstants;function toggleFinishButton(isVisible){var showFooter=mstrApp.diShowFooterFunction;if(showFooter){showFooter({finish:{visible:isVisible}});}}function getDefaultName(model){var selDBRoleID=model.SelDBRoleID;var dbRoles=model.dbrs;var i;var sourceName;var cubeName;for(i=0;i<dbRoles.length;i++){if(selDBRoleID===dbRoles[i].did){sourceName=dbRoles[i].n;break;}}cubeName=model.cubes[0].n;return{name:cubeName,desc:sourceName};}mstrmojo.qb.mdx.Controller=mstrmojo.declare(mstrmojo.warehouse.WHController,null,{start:function start(){var rootView=this.rootView,model=this.model,footerID,footer,contButton,finishButton;this.dataService=mstrmojo.qb.mdx.DataService;rootView.render();this.toggleDatabaseView(true);model.loadDBTypeFilters({success:function success(){model.loadDBRoles({success:function success(){toggleFinishButton(true);model.initialize();}});}});footerID=mstrApp.diFooterID;footer=footerID?mstrmojo.all[footerID]:undefined;if(footer){contButton=footer.next;finishButton=footer.finish;model.attachEventListener("refreshTables",contButton.id,footer.enableButton);model.attachEventListener("refreshTables",finishButton.id,footer.enableButton);setTimeout(function(){footer.mdxRA.update();},0);}},getDataService:function getDataService(){return this.dataService;},toggleDatabaseView:function toggleDatabaseView(show){this.rootView.toggleDatabaseView(show);},addCubes:function addCubes(cubes){this.model.addCubes(cubes);},addTables:function addTables(cubes){this.model.addCubes(cubes);},removeCube:function removeCube(idx){this.model.removeCube(idx);},updateCube:function updateCube(idx){this.model.updateCube(idx);},handleDBTableRefresh:function handleDBTableRefresh(){var model=this.model,dbroleID=model.SelDBRoleID;model.catalogRefresh=true;model.onSelNameSpaceIDChange({value:model.SelNameSpaceID});},attachDataChangeListeners:function attachDataChangeListeners(eventsConfig){var model=this.model;$H.forEach(eventsConfig,function(config,id){$H.forEach(config,function(callback,eventName){model.attachEventListener(eventName,id,callback);});});},detachDataChangeListeners:function detachDataChangeListeners(eventSubs){var model=this.model;mstrmojo.array.forEach(eventSubs,function(eventSub){model.detachEventListener(eventSub);});},onCancelButtonClick:function onCancelButtonClick(){mstrApp.container.unloadQB();mstrApp.getRootController().onCancelButtonClick();},onFinishButtonClick:function onFinishButtonClick(){var model=this.model,callback={};callback.onOK=function(params){if(params){model.folderID=params.folderID;model.cubeDesc=params.objDesc;model.cubeName=params.objName;}model.commitChanges({success:function success(res){var messageID=mstrApp.msgid,isManagedCube=model.isManagedCube,diController,diModel;mstrApp.container.unloadQB();mstrApp.messageID=messageID;mstrApp.isDDA=true;mstrApp.saveCubeParams=params;mstrApp.isManagedCube=isManagedCube;diController=mstrApp.getRootController();if(model.isNew){diController.getDDAController().setDirectDataAccess(mstrApp.isDDA);diController.dataService.set("messageID",mstrApp.messageID);diController.model.isManagedCube=mstrApp.isManagedCube;diModel=diController.model;diModel.cubeName=getDefaultName(model).name;if(mstrApp.isSingleTier){var diparams={isDirectDataAccess:diModel.isDirectDataAccess},dicallback={success:function(res){if(res.objectId){diModel.cubeID=res.objectId;}diController.wrapUpDataImport();},failure:function(res){mstrApp.hideProgress();diController.displayError(mstrmojo.desc(13061,"Error in creating the dataset."),false,res&&res.message);}},postMergeDupIDCallback={success:function(){diController.dataService.createOneTierDoc(dicallback,diparams);},failure:function(res){mstrApp.hideProgress();diController.displayError(mstrmojo.desc(13062,"Error in merging the duplicate report instance."),false,res&&res.message);}};if(diModel.operationMode===$DIConstants.operationMode.edit||diModel.operationMode===$DIConstants.operationMode.refresh){diController.dataService.duplicateReportInstance(postMergeDupIDCallback,{messageID:diModel.analysisID,datasetID:diModel.cubeID,duplicateRIMsgID:diController.dataService.messageID});}else{if(mstrApp.isSingleTier&&!model.isManagedCube){if(res&&res.objectId){diModel.cubeID=res.objectId;}diController.wrapUpDataImport();return ;}diController.dataService.createOneTierDoc(dicallback,diparams);}return ;}if(isManagedCube){diController.wrapUpDataImport();return ;}diModel=diController.model;if(res&&res.objectId){diModel.cubeID=res.objectId;}diModel.path=params&&params.objPath;if(params&&params.folderID&&params!==""){diModel.folderID=params.folderID;}diController.wrapUpDataImport();}else{if($Help.isServerBasedWS()){diModel=diController.model;diModel.path="serverBased";}diController.wrapUpDataImport();return ;}}});};if(!model.isManagedCube&&model.isNew&&!$Help.isOnetier()){$QBHelpers.showSaveAsDialog(callback,getDefaultName(this.model));}else{callback.onOK();}},onBackButtonClick:function onBackButtonClick(){mstrApp.container.unloadQB();mstrApp.getRootController().backFromQB();},exitApplication:function exitApplication(){mstrApp.container.unloadQB();mstrApp.getRootController().exitApplication();},onHelpButtonClick:function onHelpButtonClick(){mstrApp.showHelpTopic("Creating_a_data_source_connection_to_an_OLAP_source.htm");},getProjectPrimaryDBRoleID:function getProjectPrimaryDBRoleID(){return this.model.SelDBRoleID;},setRecursive:function setRecursive(recursive){this.model.set("recursive",recursive);},getRecursive:function getRecursive(){return this.model.recursive;}});}());