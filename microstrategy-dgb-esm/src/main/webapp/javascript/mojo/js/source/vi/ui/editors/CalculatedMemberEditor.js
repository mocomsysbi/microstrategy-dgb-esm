(function(){mstrmojo.requiresClsP("mstrmojo","Editor","desc","css","func","dom","string","hash");mstrmojo.requiresCls("mstrmojo.warehouse.EnumDatabaseType","mstrmojo.mstr.EnumDSSXMLObjectTypes");mstrmojo.requiresDescs(221,118,13355);var $DESC=mstrmojo.desc,$CSS=mstrmojo.css,$FUNC=mstrmojo.func,$DOM=mstrmojo.dom,$STR=mstrmojo.string,$HASH=mstrmojo.hash,$DBT=mstrmojo.warehouse.EnumDatabaseType,$OTP=mstrmojo.mstr.EnumDSSXMLObjectTypes,$EID;mstrmojo.vi.ui.editors.CalculatedMemberEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.vi.ui.editors.CalculatedMemberEditor",cssClass:"mstrmojo-CalculatedMemberEditor",title:$DESC(13355,"Calculated Member"),help:"create_derived_element_mdx_hierarchy_reports.htm",init:function init(props){this._super(props);$EID=this.id;},onOpen:function onOpen(){this.cmPanel.resetDisplay();},onClose:function onClose(){delete this.mptf;},addDE:function addDE(ceid,cid){var view=this.view,action=this.action,controller=this.controller,docModel=view.model.docModel,actions=[],callbacks={},extras={},isFirst=action.oTp===$OTP.Attribute,cmPanel=this.cmPanel,parentElement=cmPanel.parentElement;action.exp=cmPanel.inputBox().getExpression();if(parentElement){action.peId=parentElement.v;action.peName=parentElement.n;}action.deName=cmPanel.deNameTB().value;action.ceid=ceid;if(isFirst){action.cid=cid;}docModel.addUpdateObjects(action,{id:action.oId,type:action.oTp,flag:mstrmojo.DocDataService.PARTIAL_UPDATE_FLAGS.DATA_CHANGE});actions.push(controller.dataService().getUpdateTemplateAction(view.k,action));if(this.mptf){actions.push(controller.dataService().getSetMDXPassThroughOptionsForCMAction({mptf:this.mptf,cid:isFirst?action.cid:action.oId,ceid:action.ceid}));}if(docModel.hasSelectionOnVisFilter()&&action.act!=="editQuickDECalculation"){actions=docModel.wrapUnsetVisualizationFilterAction(actions);docModel.clearSelectionOnVisFilter(true);}callbacks=$FUNC.wrapMethods(callbacks,docModel.getDatasetsUpdateCallback(),controller._getXtabCallback(view),docModel.getUpdateHiddenPanelsCallback(),docModel.getUpdateHiddenLayoutsCallback(),docModel.getHighLightNDECallback());if(action.isRA){extras=mstrmojo.DocDataService.REQUEST_DEFN_DATA;}controller.submitUndoRedoUpdates(actions,{},callbacks,extras);},children:[{scriptClass:"mstrmojo.vi.ui.editors.CalculatedMemberPanel",alias:"cmPanel",isNew:true,slot:"containerNode",getPeInModel:function(){var action=this.parent.action;return action&&{n:action.peName,v:action.peId};},getCmNameInModel:function(){return this.parent.action&&this.parent.action.deName;},getDocModel:function(){return this.parent.controller&&this.parent.controller.model;},getAttributeId:function(){var docModel=this.getDocModel(),oId=this.parent.action&&this.parent.action.oId,unit=docModel.findUnitInDataSet(oId);return unit&&(unit.attId||unit.did);}},{scriptClass:"mstrmojo.Button",slot:"buttonNode",cssClass:"mstrmojo-WebButton",text:$DESC(221,"Cancel"),onclick:function(){mstrmojo.all[$EID].close();}},{scriptClass:"mstrmojo.Button",slot:"buttonNode",alias:"okBtn",cssClass:"mstrmojo-WebButton",iconClass:"hot",bindings:{enabled:function(){return this.parent.cmPanel.rootVBox.definitionBox.defnPanel.inputBox.expValid&&this.parent.cmPanel.rootVBox.definitionBox.defnPanel.deNameBox.deNameTB.value;}},text:$DESC(118,"Save"),onclick:function(){if(this.enabled){var me=mstrmojo.all[$EID],deName=me.cmPanel.deNameTB().value,ptExpr=me.cmPanel.inputBox().getExpression();if(mstrmojo.vi.ui.editors.DerivedElementsEditor.validateElementName(deName)){var isFirst=me.action.oTp===$OTP.Attribute;mstrApp.serverRequest({taskId:"getGUIDs",count:isFirst?2:1},{success:function(res){me.addDE.apply(me,res);me.close();}});}}}}]});}());