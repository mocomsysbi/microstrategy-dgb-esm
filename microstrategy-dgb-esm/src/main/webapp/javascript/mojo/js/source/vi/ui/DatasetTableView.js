(function(){mstrmojo.requiresCls("mstrmojo.vi.ui.UnitList","mstrmojo.vi.ui.PanelPortlet","mstrmojo.vi.ui._HasUnitListAvatar","mstrmojo.vi.models.EnumDragSources","mstrmojo._HasLayout","mstrmojo.dom","mstrmojo.array","mstrmojo.hash","mstrmojo.vi.ui.DatasetUnitMenuUtils");var $ARR=mstrmojo.array,$DOM=mstrmojo.dom,$FUNC=mstrmojo.func,$HASH=mstrmojo.hash,$DU=mstrmojo.vi.ui.DatasetUnitMenuUtils,ALIAS_TABLES="tbl",ALIAS_DERIVED_OBJECTS="dmaList";function getTablePortlet(dataset,table,index){var datasetTableView=this,setting=this.setting&&this.setting.table&&this.setting.table(table.did);return({scriptClass:"mstrmojo.vi.ui.PanelPortlet",title:table.n,tableId:table.did,dataset:dataset,tabelsWidget:this,ignoreLayout:false,showTitleBarContextMenu:true,level:datasetTableView.level+1,getLayoutOffsets:function(){return{h:0,w:0};},setting:setting,isCollapsed:setting?!!(setting.getCollapsed()):false,onclick:function(evt){if($DOM.contains(this.titleBar.leftToolNode,evt.getTarget(),true,this.domNode)){datasetTableView.onTableCollapsedChange(this.tableId,this.isCollapsed);}},updateToolbar:function updateToolbar(cfg){cfg.hostId=this.id;cfg.isHostedWithin=false;cfg.addMenuItem(mstrmojo.desc(1388,"Rename"),"rnm",function(){this.ctxt.titleBar.editTitle();},this);return cfg;},postCreate:function postCreate(){var me=this;datasetTableView.attachEventListener("toggleAllCollapsed",this.id,function(evt){if(evt.isRecover){me.togglePortlet(me.setting?me.setting.getCollapsed():me.defaultCollapsed?me.defaultCollapsed:false);}else{if(evt.changeSetting){me.setting.isCollapsed=evt.isCollapsed;}me.togglePortlet(evt.isCollapsed);}});},layoutConfig:(!!mstrApp.isWSStyling)?{h:{titlebarNode:"26px",containerNode:"100%"},w:{titlebarNode:"100%",containerNode:"100%"},xt:true}:{h:{titlebarNode:"20px",containerNode:"100%"},w:{titlebarNode:"100%",containerNode:"100%"},xt:true},getTitleBarCfg:function getTitleBarCfg(){var cfg=this.constructor.prototype.getTitleBarCfg.call(this),me=this;return $HASH.copy({editTitleOnDoubleClick:true,titleEdited:function titleEdited(titleText,textChanged,oldText){if(textChanged){var fnCancel=function(){me.titleBar.set("title",oldText);},fnOk=function(){var docModel=me.parent.parent.docModel;docModel.warnForEditStandaloneDS(dataset.set,function(){docModel.renameEmmaSrcTable(table.did,dataset.id,titleText.trim(),$FUNC.wrapMethods(docModel.getDatasetsUpdateCallback()),{failure:function(err){mstrApp.onerror(err);me.titleBar.set("title",oldText);}});},fnCancel);};$DU.validateName(titleText,fnOk,fnCancel);}},updateTooltipConfig:function updateTooltipConfig(evt){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e);if(target.scrollWidth<=target.clientWidth){this.richTooltip=null;}else{var position=$DOM.position(this.domNode);this.richTooltip={content:this.getTooltipContent(evt),posType:mstrmojo.tooltip.POS_TOPLEFT,cssClass:"vi-regular vi-tooltip-C",top:position.y-2,left:position.x+position.w+6};}}},cfg);},children:[{alias:"tulist",scriptClass:this.unitListScriptClass,draggable:false,panelId:this.panelId,docModel:this.docModel,bindings:{filterScope:"this.parent.tabelsWidget.filterScope",filterExpr:"this.parent.tabelsWidget.filterExpr",level:"this.parent.level + 1"},postCreate:function postCreate(){this.doubleClickItem=$FUNC.composite([this.doubleClickItem,mstrmojo.all[this.panelId].doubleClickItemHandler]);},dataset:dataset,getAllItems:function(){return[].concat(table.att).concat(table.mx);},onitemsChange:function(){this.parent.set("visible",!!this.items.length);}}]});}function generateContent(){var dataset=this.dataset,children=[];$ARR.forEach(dataset.set.tables,function(table,i){children.push(getTablePortlet.call(this,dataset,table,i));},this);var tbl=this.tbl;var oldChildren=[].concat(tbl.children||[]);tbl.removeChildren();oldChildren.forEach(function(oldChild){oldChild.destroy();});tbl.addChildren(children);tbl.children.forEach(function(c){c.doLayout();});if(!this[ALIAS_DERIVED_OBJECTS]){this.addChildren({alias:ALIAS_DERIVED_OBJECTS,scriptClass:this.unitListScriptClass,draggable:false,dataset:dataset,docModel:this.docModel,panelId:this.panelId,bindings:{filterScope:"this.parent.filterScope",filterExpr:"this.parent.filterExpr",level:"this.parent.level + 1"},postCreate:function postCreate(){this.doubleClickItem=$FUNC.composite([this.doubleClickItem,mstrmojo.all[this.panelId].doubleClickItemHandler]);},getAllItems:function getAllItems(){return[].concat(dataset.set.att).concat(dataset.set.mx).filter(function(item){return $DU.isDocumentLevelItem(item);});}});}}mstrmojo.vi.ui.DatasetTables=mstrmojo.declare(mstrmojo.Box,[mstrmojo._HasLayout],{layoutConfig:{w:{containerNode:"100%"},xt:true}});mstrmojo.vi.ui.DatasetTableView=mstrmojo.declare(mstrmojo.Box,[mstrmojo.vi.ui._HasUnitListAvatar,mstrmojo._HasLayout],{scriptClass:"mstrmojo.vi.ui.DatasetTableView",layoutConfig:{w:{containerNode:"100%"},xt:true},markupMethods:{ondatasetChange:function ondatasetChange(){generateContent.call(this);},onfilterExprChange:function(){var hasAnyItem=false;hasAnyItem=this[ALIAS_TABLES].children.some(function(table){return !!table.tulist.items.length;})||!!(this[ALIAS_DERIVED_OBJECTS].items&&this[ALIAS_DERIVED_OBJECTS].items.length);this.emptyIndicator.set("visible",!hasAnyItem);}},draggable:true,avatarCssClass:"mstrmojo-VIUnitList",dataset:null,unitListScriptClass:"",docModel:null,panelId:"",setting:{},onTableCollapsedChange:mstrmojo.emptyFn,children:[{alias:"emptyIndicator",cssClass:"emptyIndicator",scriptClass:"mstrmojo.Label",bindings:{text:function(){if(!this.visible){return"";}return this.parent.filterExpr?mstrmojo.desc(11904,"No matched object"):mstrmojo.desc(11905,"No object");}}},{alias:ALIAS_TABLES,scriptClass:"mstrmojo.vi.ui.DatasetTables"}],getTableWidgets:function getTableWidgets(){return this[ALIAS_TABLES].children||[];},toggleAllNodesCollapsed:function toggleAllNodesCollapsed(isCollapsed,changeSetting,isRecover){this.raiseEvent({name:"toggleAllCollapsed",isCollapsed:isCollapsed,changeSetting:changeSetting,isRecover:isRecover});},getSelectedItems:function getSelectedItems(){var dmaList=this[ALIAS_DERIVED_OBJECTS];return this[ALIAS_TABLES].children.reduce(function(items,table){$ARR.forEach(table.tulist.getSelectedItems(),function(item){if($ARR.find(items,"did",item.did)<0){items.push(item);}});return items;},[]).concat(dmaList.getSelectedItems());},clearSelect:function(){this[ALIAS_TABLES].children.forEach(function(table){table.tulist.clearSelect();});this[ALIAS_DERIVED_OBJECTS].clearSelect();},isDragValid:function isDragValid(context){return !isNaN(parseInt(context.src.node.getAttribute("idx"),10))||this._super(context)||false;},ondragstart:function ondragstart(context){var list=null,dmaList=this[ALIAS_DERIVED_OBJECTS],inList=function(tulist){return $DOM.contains(tulist.domNode,context.src.node,true,tulist.domNode);};$ARR.forEach(this[ALIAS_TABLES].children,function(table){var tulist=table.tulist;if(inList(tulist)){list=tulist;return false;}});if(!list&&inList(dmaList)){list=dmaList;}if(list){list.selectDragNode(context);}this._super(context);},getDragData:function getDragData(context){var info=this._super(context);info.item=info.items&&info.items[0];info.dsid=this.dataset.id;info.src=mstrmojo.vi.models.EnumDragSources.DATASETS;return info;}});}());