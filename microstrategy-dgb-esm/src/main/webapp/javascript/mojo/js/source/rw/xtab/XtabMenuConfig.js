(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.dom","mstrmojo.hash","mstrmojo.express.ui.SubtotalsWidget","mstrmojo.mstr.EnumDSSXMLDrillType","mstrmojo.ui.menus.EditorConfig","mstrmojo.vi.enums.EnumFeatures");var $H=mstrmojo.hash,$ARR=mstrmojo.array,EnumDSSXMLDrillType=mstrmojo.mstr.EnumDSSXMLDrillType,ENUM_ACTION_TYPE={STATIC:0,DRILLING:1,SELECTOR_CONTROL:2,HYPERLINK:4,SORT:8,PIVOT:16,EDIT:32,GROUP:64,CALCULATION:128,GROUP_EDIT:256,KEEP_ONLY:512,TOTAL_HEADER:1024},$FEATURES=mstrmojo.vi.enums.EnumFeatures;function shouldShowAdvancedSort(data){return mstrmojo.resolveFeature("web-sort")&&!!(data&&(data.mix!==undefined&&data._e&&data._e.otp===4));}function getPivotMenu(cellContext){var menuCfg=new mstrmojo.ui.menus.MenuConfig(),data=cellContext.data,cfg=cellContext.cfg,pivotConfig=[{n:mstrmojo.desc(1893,"Left"),btp:"l"},{n:mstrmojo.desc(1894,"Right"),btp:"r"},{n:mstrmojo.desc(13834,"To Beginning"),btp:"b"}],delegateActionToXtab=this.delegateActionToXtab;if(!cfg.tabularGrid){pivotConfig.push({n:mstrmojo.desc(152,"Up"),btp:"u"},{n:mstrmojo.desc(153,"Down"),btp:"d"},{n:mstrmojo.desc(1891,"To Columns"),btp:"2"},{n:mstrmojo.desc(1890,"To Rows"),btp:"1"});}$ARR.forEach(pivotConfig,function(pivotMenuCfg){if(cellContext.xtab.model.isPvtButtonVisible(data,pivotMenuCfg.btp)){menuCfg.addMenuItem(pivotMenuCfg.n,"xt",function(){delegateActionToXtab(cellContext,"pivot",[pivotMenuCfg.btp]);});}});return menuCfg;}function requestOnDemandDrill(xtab,selectedNodeId){if(!xtab.onDemandDrillDynamicItems){xtab.onDemandDrillDynamicItems={};}var drillNodeId="drill"+selectedNodeId,drillItems=xtab.onDemandDrillItems,dynamicItems=xtab.onDemandDrillDynamicItems[drillNodeId];if((!xtab.onDemandDrillItems||xtab.shouldUpdateDrillMenus)&&!xtab.loadingDCM&&xtab.gridData.odd){xtab.loadingDCM=true;delete xtab.shouldUpdateDrillMenus;var xhr=new mstrmojo.SimpleXHR({async:false});xhr.request("POST",mstrConfig.taskURL,{success:function success(res){$ARR.forEach(res.dynamicMenus,function(itm){xtab.onDemandDrillDynamicItems[itm.n]=itm.items;if(itm.n===drillNodeId){dynamicItems=itm.items;}});drillItems=res.menuItems;xtab.onDemandDrillItems=drillItems;delete xtab.loadingDCM;}},{taskId:"RWOnDemandDrill",styleName:"OndemandDrillContextMenusStyle",viewMode:1,usePartDisplay:1,docGridKey:xtab.k,rwb:xtab.model.docModel.bs});}var items=[];$ARR.forEach(dynamicItems,function(itm){var idx=itm.idx,level1Item=drillItems[idx],indices=JSON.parse(level1Item.subMenuIndices||"[]");if(indices.length>0){var subItems=[];$ARR.forEach(indices,function(idx){subItems.push(drillItems[idx]);});level1Item.items=subItems;}items.push(level1Item);});return items;}function getDrillCss(drillType){var css="";switch(drillType){case EnumDSSXMLDrillType.DssXmlDrillToChild:css="drillDown";break;case EnumDSSXMLDrillType.DssXmlDrillToParent:css="drillUp";break;case EnumDSSXMLDrillType.DssXmlDrillToTemplate:css="drillTemplate";break;}return css;}function getDrillMenuCssClass(drillItems){var found=$ARR.filter(drillItems,function(itm){return[EnumDSSXMLDrillType.DssXmlDrillToChild,EnumDSSXMLDrillType.DssXmlDrillToParent].indexOf(itm.dt)>-1;});return found.length>0?"drill":"";}function isMetricHeader(data){return data&&data.mix!==undefined&&!!data._e;}function isAttributeHeader(data){return data&&data.otp===12;}mstrmojo.rw.xtab.XtabMenuConfig=mstrmojo.declare(mstrmojo.ui.menus.MenuConfig,null,{scriptClass:"mstrmojo.rw.xtab.XtabMenuConfig",xtab:undefined,data:undefined,isActionAvailable:function isActionAvailable(data,actionType){return((((data&&data.at)||0)&actionType)>0);},delegateActionToXtab:function delegateActionToXtab(cellContext,mth,args){var xtab=cellContext.xtab;xtab[mth].apply(xtab,[cellContext.data].concat(args||[]));},buildXtabMenuConfig:function buildXtabMenuConfig(cfg){var xtab=this.xtab=cfg.xtab,xtabID=xtab.id,data=this.selectedData=cfg.data=cfg.data||(xtab&&cfg.td&&xtab.getCellForNode(cfg.td)),cellTitleInfo=xtab.model.getCellTitleInfo(data),cellContext={xtab:xtab,data:data,cfg:cfg},delegateActionToXtab=this.delegateActionToXtab;this.selectedNode=cfg.td;if(cfg.onClose){this.addPopupHandlers(xtabID,mstrmojo.emptyFn,cfg.onClose);}var linksInfo=xtab.model.getCellLinksInfo(data)||{},hyperLinks=linksInfo.links||[],hasLinks=this.isActionAvailable(data,ENUM_ACTION_TYPE.HYPERLINK)&&hyperLinks.length>0&&(data.slm==undefined),hasDrill=this.isActionAvailable(data,ENUM_ACTION_TYPE.DRILLING)&&(data.sdm==undefined)&&!!mstrmojo.resolveFeature($FEATURES.WEB_DRILL_AND_LINK),hasShowTotals=(data&&data.mix===undefined&&cellTitleInfo.isSrcTitle&&data.otp!==-1&&data.avst>0);if(hasDrill){hasDrill=this.addDrillMenuItem(cellContext)?true:false;}if(hasLinks){hyperLinks.forEach(function(hyperLinkItem,index){this.addMenuItem(hyperLinkItem.n||hyperLinkItem.url||(hyperLinkItem.target&&(hyperLinkItem.target.n||hyperLinkItem.target.did)),"",function(){delegateActionToXtab(cellContext,"link",[index]);});},this);}if(hasDrill||hasLinks){this.addSeparator();}if(!mstrApp.isDossier){this.addPivotMenuItem(cellContext);}this.addSortMenuItem(cellContext);if(hasShowTotals){this.addSeparator();this.addShowTotalMenuItem(cellContext);}if(!mstrApp.isInVFConfigMode&&!mstrApp.isInVFInteractMode&&(mstrApp.isOIVM&&mstrApp.isOIVM()&&(isAttributeHeader(data)||isMetricHeader(data)))){this.addViewFilterEditor(cellContext);}this.addRemoveMenuItem(cellContext);},addPivotMenuItem:function addPivotMenuItem(cellContext){if(this.isActionAvailable(cellContext.data,ENUM_ACTION_TYPE.PIVOT)){var pivotMenuConfig=getPivotMenu.call(this,cellContext);if(pivotMenuConfig.menus.length){this.addSubMenuItem(mstrmojo.desc(1889,"Move"),"",this.id,function(){return pivotMenuConfig;},cellContext);this.addSeparator();}}},addDrillMenuItem:function addDrillMenuItem(cellContext,drillItem){var xtab=cellContext.xtab,data=cellContext.data,delegateActionToXtab=this.delegateActionToXtab,clearCachedDrillMenus=function(xtab){xtab.onDemandDrillItems=null;xtab.onDemandDrillDynamicItems=null;};var drillList=drillItem?[drillItem]:xtab.model.getAllDrillPathsForCell(data),cellTitleInfo=xtab.model.getCellTitleInfo(this.selectedData),onDemandDrillItems=requestOnDemandDrill(xtab,cellTitleInfo.title.id);if(drillList.length<1&&onDemandDrillItems.length<1){return ;}this.addPopupMenuItem(mstrmojo.desc(145,"Drill"),this.id,function(){var drillMenuCfg=new mstrmojo.ui.menus.MenuConfig({menuCssClass:getDrillMenuCssClass(drillList),isHostedWithin:false,supportsScroll:true,alignWithAnchor:true,maxHeight:mstrmojo.dom.windowDim().h-50});$ARR.forEach(drillList,function(dItm){if(dItm&&dItm.k){if(mstrApp.isDossier&&!dItm.within){return ;}drillMenuCfg.addMenuItem(dItm.n||"",getDrillCss(dItm.dt),function(){xtab.shouldUpdateDrillMenus=true;delegateActionToXtab(cellContext,"drill",[dItm]);clearCachedDrillMenus(xtab);});}});$ARR.forEach(onDemandDrillItems,function(itm){if(mstrApp.isDossier){var within=$ARR.filter(itm.items,function(value){return value.within;});if(within.length===0){return ;}}drillMenuCfg.addPopupMenuItem(itm.n,"",function(){var drillSubMenuCfg=new mstrmojo.ui.menus.MenuConfig({supportsScroll:true,maxHeight:350,isHostedWithin:false,alignWithAnchor:true,menuCssClass:getDrillMenuCssClass(itm.items)});$ARR.forEach(itm.items,function(subItm){if(mstrApp.isDossier&&!subItm.within){return ;}drillSubMenuCfg.addMenuItem(subItm.n,getDrillCss(subItm.dt),function(){xtab.shouldUpdateDrillMenus=true;delegateActionToXtab(cellContext,"drill",[subItm]);clearCachedDrillMenus(xtab);});});return drillSubMenuCfg;});});return drillMenuCfg;});},addViewFilterEditor:function addViewFilterEditor(cellContext){if(!mstrmojo.resolveFeature("use-view-filter-editor")){return ;}this.addMenuItem(mstrmojo.desc(3938,"edit view filter..."),"xt",this.delegateActionToXtab.bind(this,cellContext,"showViewFilter"),cellContext);},addRemoveMenuItem:function addRemoveMenuItem(cellContext){if(!mstrmojo.resolveFeature("modify-grid-level-in-documents")){return ;}if(cellContext.data._e){if(cellContext.data._e.otp!==4){return ;}}if(cellContext.data.otp===-1){return ;}if(cellContext.data._tp){var _e=cellContext.data._tp._e;if(_e){if(_e.otp===4){return ;}}}this.addSeparator();this.addMenuItem(mstrmojo.desc(190,"Remove"),"xt",this.delegateActionToXtab.bind(this,cellContext,"removeUnit"),cellContext);},addSortMenuItem:function addSortMenuItem(cellContext){var data=cellContext.data,delegateActionToXtab=this.delegateActionToXtab,isSortActionAvailable=this.isActionAvailable(data,ENUM_ACTION_TYPE.SORT),xtabModel=cellContext.xtab.model,isRecursiveAttribute=xtabModel.isRecursiveAttribute&&xtabModel.isRecursiveAttribute(data.id),isCustomSortAvailable=isRecursiveAttribute&&mstrApp.isAppStateDefault&&mstrApp.isAppStateDefault()&&!mstrApp.isDossier;if(isSortActionAvailable){this.addMenuItem(mstrmojo.desc(7974,"Sort Ascending"),"xt",function(){delegateActionToXtab(cellContext,"sort",[true]);},cellContext);this.addMenuItem(mstrmojo.desc(7975,"Sort Descending"),"xt",function(){delegateActionToXtab(cellContext,"sort",[false]);},cellContext);if(isCustomSortAvailable){this.addMenuItem(mstrmojo.desc(15676,"Custom Sort..."),"xt",function(){delegateActionToXtab(cellContext,"customSort",[data.axis]);},cellContext);}}if(!cellContext.cfg.hideAdvancedSort&&(isSortActionAvailable||shouldShowAdvancedSort(data))&&!mstrApp.isDossier){this.addMenuItem(mstrmojo.desc(11099,"Advanced Sort..."),"xt",function(){delegateActionToXtab(cellContext,"advSort",[data.axis,cellContext.ndeInfo]);},cellContext);}},addShowTotalMenuItem:function addShowTotalMenuItem(cellContext){this.addEditorMenuItem(mstrmojo.desc(6193,"Show Totals"),this.id,this.getSubtotalEditorConfig,$H.copy(cellContext,{isTotals:true}));},getSubtotalEditorConfig:function getSubtotalEditorConfig(cellContext){var data=cellContext.data,xtab=cellContext.xtab,cfgEditor=xtab.getBasicSubtotalEditorConfig(data.ast);cfgEditor.fnOk=function fnOk(){var types=cfgEditor.contents.getSubtotalTypes(),model=xtab.model;xtab.controller.onShowTotals(xtab,model.getShowTotalsUnitAction(data.id,data.otp,types[0],types[1]));};return cfgEditor;}});mstrmojo.rw.xtab.XtabMenuConfig.ACTION_TYPES=ENUM_ACTION_TYPE;mstrmojo.rw.xtab.XtabCellMenuItemContextType=null;}());