(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo.FieldSet","mstrmojo.hash","mstrmojo.css","mstrmojo.dom","mstrmojo.Button","mstrmojo.txEditor.CommonComponent","mstrmojo.txEditor.MappingTxPanel","mstrmojo.txEditor.LocalTxPanel","mstrmojo.css");mstrmojo.requiresDescs(221,1442,13210,13211);var $C=mstrmojo.css,$D=mstrmojo.dom,$H=mstrmojo.hash,_TC=mstrmojo.txEditor.CommonComponent,PANEL_MAP=0,PANEL_LOCL=1;function setActivation(el,isActive){$C.toggleClass(el,"active",isActive);}function applyChangesConfirmDialog(model,cb){mstrmojo.confirm(mstrmojo.desc(13729,"You need to apply changes first."),{confirmBtn:{t:mstrmojo.desc(1442,"OK"),fn:function(){_TC.applyChanges(model,cb);}},cancelBtn:{t:mstrmojo.desc(221,"Cancel")}},{cssClass:"mstrmojo-TransactionEditor-ConfirmEditor",zIndex:999});}function checkMappingTxnStatus(){var model=mstrmojo.all.teModel,offModel=mstrmojo.all.offModel,me=this;if(!model.txRpt){_TC.showError(mstrmojo.desc(13730,"You need to configure transaction mapping first."));}else{if(model.isPropertiesValid()&&model.isAllInputsMapped()){if(model.hasDirtyTscObjs()){applyChangesConfirmDialog(model,function(res){if(!!res.localTxnCleared&&offModel&&!offModel.isRemoved()){_TC.showError(mstrmojo.desc(13727,"Local transaction deleted since it is no longer valid."));offModel.set("tgtDs",null);offModel.reset();}me.set("activePanel",PANEL_LOCL);});}else{return true;}}}return false;}function checkLocalTxnStatus(){var model=mstrmojo.all.offModel,me=this;if(model.isDirtyState()){applyChangesConfirmDialog(model,function(res){model.reset();me.set("activePanel",PANEL_MAP);});}else{return true;}return false;}mstrmojo.txEditor.TapSelector=mstrmojo.declare(mstrmojo.Widget,null,{scriptClass:"mstrmojo.txEditor.TapSelector",fstTapName:mstrmojo.desc(13210,"Transaction Mapping"),secTapName:mstrmojo.desc(13211,"Local Transaction"),markupString:'<table class="mstrmojo-TransactionEditor-TapSelector {@cssClass}" style="{@cssStyle}" cellspacing="0" cellpadding="0"><tbody><tr><td class="first"></td><td class="selector left"><div mstrAttach:click>{@fstTapName}</div></td><td class="selector right"><div mstrAttach:click>{@secTapName}</div></td><td class="last"></td></tr></tbody></table>',markupSlots:{firstTapNode:function(){return this.domNode.tBodies[0].rows[0].cells[1].firstChild;},secondTapNode:function(){return this.domNode.tBodies[0].rows[0].cells[2].firstChild;}},markupMethods:{onactivePanelChange:function(){setActivation(this.firstTapNode,this.activePanel===PANEL_MAP);setActivation(this.secondTapNode,this.activePanel===PANEL_LOCL);this.switchActivePanel(this.activePanel);}},switchActivePanel:mstrmojo.emptyFn,preclick:function preclick(evt){this._super&&this._super(evt);var target=$D.eventTarget(evt.hWin,evt.e),mappingPanelActive=(this.activePanel===PANEL_MAP);if(target===this.firstTapNode&&!mappingPanelActive&&checkLocalTxnStatus.call(this)){this.set("activePanel",PANEL_MAP);}else{if(target===this.secondTapNode&&mappingPanelActive&&checkMappingTxnStatus.call(this)){this.set("activePanel",PANEL_LOCL);}}}});mstrmojo.txEditor.TapContentPanel=mstrmojo.declare(mstrmojo.FieldSet,null,{scriptClass:"mstrmojo.txEditor.TapContentPanel",cssClass:"mstrmojo-TransactionEditor-TapContentPanel",minHeight:280,minWidth:524,markupMethods:{onminHeightChange:function(){this.domNode.style.minHeight=this.minHeight+"px";this.txLtp.set("height",this.minHeight);},onminWidthChange:function(){this.domNode.style.minWidth=this.minWidth+"px";this.txLtp.set("width",this.minWidth);},onactivePanelChange:function(){if(this.hasRendered){var activePanel=this.activePanel;if(activePanel===PANEL_LOCL){var child=this.txMap,w=child.getInitRenderWidth(),h=child.getInitRenderHeight();if(w>this.minWidth){this.set("minWidth",w);}if(h>this.minHeight){this.set("minHeight",h);}}}}},children:[{scriptClass:"mstrmojo.txEditor.MappingTxPanel",alias:"txMap",bindings:{visible:function(){return this.parent.activePanel===PANEL_MAP;}}},{scriptClass:"mstrmojo.txEditor.LocalTxPanel",alias:"txLtp",bindings:{visible:function(){return this.parent.activePanel===PANEL_LOCL;}}}]});mstrmojo.txEditor.TapPanel=mstrmojo.declare(mstrmojo.FieldSet,null,{scriptClass:"mstrmojo.txEditor.TapPanel",cssClass:"mstrmojo-TransactionEditor-TapPanel",activePanel:PANEL_MAP,onactivePanelChange:function(){this.txTcp.set("activePanel",this.activePanel);},children:[{scriptClass:"mstrmojo.txEditor.TapSelector",alias:"txTps",bindings:{activePanel:"this.parent.activePanel"},switchActivePanel:function switchActivePanel(panel){this.parent.set("activePanel",panel);}},{scriptClass:"mstrmojo.txEditor.TapContentPanel",alias:"txTcp",bindings:{activePanel:"this.parent.activePanel"}}]});}());