(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.FieldSet","mstrmojo.txEditor.CommonComponent","mstrmojo.txEditor.CSISelectManipulationPanel","mstrmojo.txEditor.CSIStatementManipulationPanel");var $H=mstrmojo.hash,_TC=mstrmojo.txEditor.CommonComponent,_ST=_TC.STATEMENT_TYPE;mstrmojo.txEditor.CSIStatementPanel=mstrmojo.declare(mstrmojo.FieldSet,null,{scriptClass:"mstrmojo.txEditor.CSIStatementPanel",cssClass:"mstrmojo-TransactionEditor-CSIStatementPanel",markupMethods:$H.copy({onheightChange:function(){if(this.height){this.domNode.style.height=this.height+"px";this.csSta.set("height",this.height-this.csSel.getHeight());}}},$H.copy(mstrmojo.FieldSet.prototype.markupMethods)),bindings:{statementType:function(){var offTxs=mstrmojo.all.offModel.offTxs,tknstrm=offTxs&&offTxs.tknstrm,csType=tknstrm&&tknstrm.csType;if(offTxs&&!tknstrm){offTxs.tknstrm={csType:this.statementType,clauses:[]};}return csType?parseInt(csType):_ST.STATEMENT_UPDATE;}},onstatementTypeChange:function(){var model=mstrmojo.all.offModel,offTxs=model&&model.offTxs,tknstrm=offTxs&&offTxs.tknstrm;if(tknstrm&&tknstrm.csType!==this.statementType){tknstrm.csType=this.statementType;tknstrm.clauses=[];}},children:[{scriptClass:"mstrmojo.txEditor.CSISelectManipulationPanel",alias:"csSel",height:38,getHeight:function(){return this.height;}},{scriptClass:"mstrmojo.txEditor.CSIStatementManipulationPanel",alias:"csSta"},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-txEditor-CSIStatementError",bindings:{visible:"!!mstrmojo.all.offModel.validationError",text:"mstrmojo.all.offModel.validationError"}}]});}());