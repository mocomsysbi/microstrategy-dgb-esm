(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.dom","mstrmojo.Editor","mstrmojo.SaveAsEditor","mstrmojo.UUID","mstrmojo._FormatDefinition","mstrmojo.ME.MetricDataService","mstrmojo.ME.MetricFormatEditor","mstrmojo.ColorPicker","mstrmojo.ME.MetricEditBox","mstrmojo.InlineEditBox","mstrmojo.MenuButton","mstrmojo.ME._MetricEditorHelper","mstrmojo.ME.FunctionSelector","mstrmojo.mstr.EnumDSSXMLObjectTypes","mstrmojo.mstr.EnumDSSXMLObjectSubTypes","mstrmojo.fe.FilterUtils","mstrmojo.ExpressionToolbar");mstrmojo.requiresDescs(517,1907,2213,2827,9559,9562,11897);var $DESC=mstrmojo.desc,ARR=mstrmojo.array,DOM=mstrmojo.dom,HASH=mstrmojo.hash,UUID=mstrmojo.UUID,OBJECT_TYPE=mstrmojo.mstr.EnumDSSXMLObjectTypes,OBJECT_SUBTYPE=mstrmojo.mstr.EnumDSSXMLObjectSubTypes,$GET_EXPR_XML=mstrmojo.fe.FilterUtils.getExprXml;var EDIT_TYPE={functionSelector:0,advanced:65536,simple:131072,func:196608},_VSTATUS=mstrmojo.ME.MetricEditBox.VALIDATION_STATUS;function _clearTokenSection(me,meb){var empty=[];me.oi.tks.met=EDIT_TYPE.functionSelector;me.oi.tks.items=empty;meb.oi=me.oi;meb.clearTokens(empty);}mstrmojo.ME.MetricEditor=mstrmojo.declare(mstrmojo.Editor,[mstrmojo.ME._MetricEditorHelper],{scriptClass:"mstrmojo.ME.MetricEditor",cssClass:"mstrmojo-MetricEditor",zIndex:10,title:$DESC(517,"Metric"),help:"Metric_Formula_Editor.htm",init:function init(prop){this._super(prop);this.formulaLabel.set("visible",mstrApp&&mstrApp.isWSStyling);},getMetricEditBox:function getMetricEditBox(){return this.metricEditBox;},getTokenInputBox:function getMetricEditBox(){return this.metricEditBox.inputBox;},isEmpty:function isEmpty(){return this.getMetricDefAsTokens().length===0;},onObjectInsert:function onObjectInsert(oi){var tib=this.metricEditBox.inputBox,t={v:mstrmojo.ME.MetricToken.brackets(oi.n),oi:oi,isNew:true};tib.insertTokens([t]);this.closePopup();},onOpen:function onOpen(){var oi=this.oi,meb=this.metricEditBox,tib=meb.inputBox;this._setupCandidatesCache(tib);tib.noCache=this.noCache;tib.useKeyDelay=this.useKeyDelay;this.set("title",$DESC(9559,"Formula Editor:")+" "+oi.n);if(oi&&oi.tks){this.preprocessTokenStram(oi.tks);tib.oi=oi;tib.set("items",oi.tks.items);this.originTks=HASH.clone(oi.tks.items);this.originAfb=oi.mps&&oi.mps.afb;this.originSfb=oi.mps&&oi.mps.sfb;}meb.set("iStatus","");meb.set("vStatus",oi.tks.items.length>0?this.vStatus:mstrmojo.ME.MetricEditBox.VALIDATION_STATUS.UNKNOWN);if(tib.items.length===0){this.set("cValid",false);}},getMetricDefAsTokens:function getMetricDefAsTokens(){return(this.oi.tks.items);},onClose:function onClose(){if(this._super){this._super();}this.vStatus=mstrmojo.ME.MetricEditBox.VALIDATION_STATUS.UNKNOWN;this.metricEditBox.inputBox.oi=null;this.metricEditBox.inputBox.editNode.onblur=null;this.metricEditBox.inputBox.resetTokensCache();},handleValidation:function handleValidation(tks){this.metricEditBox.handleValidation(tks);},clientSideValidation:function clientSideValidation(tks){this.metricEditBox.clientSideValidation(tks);},children:[mstrmojo.ME._MetricEditorHelper.formatAndOptionsBarRef,mstrmojo.ME._MetricEditorHelper.nameEditBoxRef,{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-ME-formula-label",alias:"formulaLabel",text:$DESC(1907,"Formula")},{scriptClass:"mstrmojo.ExpressionToolbar",alias:"metricEditorOperators",onmouseup:function(evt){var el=mstrmojo.dom.eventTarget(evt.hWin,evt.e),idx=el.getAttribute("idx")||-1;this.validate(evt,idx);},validate:function(evt,idx){this.set("selectedIndex",idx);var me=this.parent,meb=me.metricEditBox,tib=meb.inputBox,symbol=this.selectedItem,vs=symbol&&symbol.v.split(""),tokens=[];if(!symbol){return ;}if(DOM.getButton(evt.hWin,evt.e)===DOM.MOUSE_BUTTON.LEFT){switch(symbol.t){case 1:ARR.forEach(vs,function insertSymbols(v){tokens.push({v:v,isDelimiter:true,isNew:true});},this);var lastTokenIdx=tib.insertTokens(tokens);if(tokens.length===2){tib._delaySetTextCaretPos(tib.itemsContainerNode.childNodes[lastTokenIdx-1],1);}break;case 2:meb.set("vStatus",_VSTATUS.VALIDATING);me.tbValidate=this;me.validateSyntax(this);break;case 3:_clearTokenSection(me,tib);tib.raiseChangeEvent({type:"clear"});break;}}}},{scriptClass:"mstrmojo.ME.MetricEditBox",alias:"metricEditBox",bindings:{browseItemVisible:"!this.parent.isDME",candidates:"this.parent.candidates"},ontokensModify:function(evt){this.parent.onmetricModify();var len=this.inputBox.items.length;this.parent.set("cValid",len>0);if(len===0){this.parent.btnSwitch.set("enabled",true);}},continueValidataion:function(){var editor=this.parent;editor.validateSyntax(editor.tbValidate);},validateFunc:function(evt){this.parent.parent.metricEditorOperators.validate(evt,7);},editEmbeddedFilterToken:function(token){var metricEditor=this.parent;if(metricEditor.openConditionMetricFilterEditor){var dsUnits=metricEditor.dsUnits,att=[],mx=[],docModel=mstrApp.getRootController().docCtrl.model,dataService=docModel&&docModel.getDataService(),filter;ARR.forEach(dsUnits&&dsUnits.items,function(unit){if(unit.t===OBJECT_TYPE.Attribute){att.push(unit);}else{if(unit.t===OBJECT_TYPE.Metric){mx.push(unit);}}});var objectInfo=token.data&&token.data.oi;var condition=objectInfo&&objectInfo.condition||docModel.getEmbeddedFilter(objectInfo&&objectInfo.did);filter=condition&&condition.exp;var fnOk=function(filterModel){filter=filterModel.expr;var filterDid=UUID.create(),filterName=filterDid;var embeddedFilterCreated=function(){var data=token.data;if(filter){data.oi={did:filterDid,n:filterName,t:OBJECT_TYPE.Filter,st:OBJECT_SUBTYPE.Filter,isEmbedded:true,condition:{did:filterDid,exp:filter}};data.v=filterName;}else{data.v=" ";data.oi=null;}token.set("data",data);metricEditor.onmetricModify();};if(filter){dataService.createEmbeddedFilter({expr:$GET_EXPR_XML(filter),expJson:filter,filterId:filterDid,filterName:filterName},{success:function(){embeddedFilterCreated();}});}else{embeddedFilterCreated();}};metricEditor.openConditionMetricFilterEditor({filter:filter,att:att,mx:mx,docModel:docModel,invalidItems:[],fnOk:fnOk,onCancel:mstrmojo.emptyFn,browseParam:function(params){params.messageID=docModel.mid;params.datasetID=docModel.findDatasetIdFromUnit(params.attributeID);}});}}},{scriptClass:"mstrmojo.Button",alias:"btnSwitch",cssClass:"mstrmojo-ME-switch mstrmojo-Editor-button mstrmojo-WebButton",text:$DESC(9562,"Switch to Function Editor"),bindings:{enabled:function(){var error=this.parent.metricEditBox.vStatus===_VSTATUS.ERROR&&!this.parent.cValid,met=parseInt(this.parent.oi.tks.met,10),noerror=!error&&(!met||(met&&met!==EDIT_TYPE.advanced));return noerror;}},onclick:function(){var editor=this.parent;var cb=function(editor){var oi=editor.oi,met=oi.tks.met||EDIT_TYPE.functionSelector,cfg={zIndex:editor.zIndex+1,candidates:editor.candidates,oi:oi,did:oi.did,insertMode:false},toEditorRef={0:"functionSelector",131072:"simpleMetricRef",196608:"wizard"}[met],toEditorId={0:"mstrFSE",131072:"mstrSME",196608:"mstrFE"}[met];if(met===EDIT_TYPE.functionSelector||met===EDIT_TYPE.func){cfg.functions=editor.functions;}if(toEditorRef){if(editor.dirty){cfg.dirty=editor.dirty;}if(editor.mptf){cfg.mptf=editor.mptf;}editor.switch2Editor(toEditorId,cfg);}};if(editor.metricEditBox.inputBox.items.length===0){editor.close();editor.ide.browsersContainer.funcBrowser.handleSelectedFunction();}else{editor.cbSwtichEditor=cb;editor.tbValidate=this;editor.validateSyntaxAndSwitch(this,"switch");}},slot:"buttonNode"},mstrmojo.ME._MetricEditorHelper.buttonBarRef]});}());