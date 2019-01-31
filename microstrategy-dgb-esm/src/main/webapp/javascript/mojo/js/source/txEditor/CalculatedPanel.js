(function(){mstrmojo.requiresCls("mstrmojo.Table","mstrmojo.txEditor.CommonComponent","mstrmojo.txEditor.Container","mstrmojo.txEditor.Table");mstrmojo.requiresDescs(2099,2100,7580,11187);var _TC=mstrmojo.txEditor.CommonComponent,_TCIV=_TC.INPUT_VALUES,_TCCT=_TC.CTRL_TYPES,_N=mstrmojo.num,_S=mstrmojo.string,_SC=mstrmojo.validation.STATUSCODE,_VAL=mstrmojo.locales.validation,_DTP=mstrmojo.expr.DTP;mstrmojo.txEditor.CalculatedPanel=mstrmojo.declare(mstrmojo.txEditor.Container,null,{scriptClass:"mstrmojo.txEditor.CalculatedPanel",cssClass:"mstrmojo-TransactionEditor-Panel calculated",onvisibleChange:function(){if(this.parent.visible&&!this.visible){var pr=mstrmojo.all.teModel.currentTxInput.ctl.pr;pr.set("max",100);pr.set("min",0);pr.set("itv",10);}},getVisibility:function(){var pr=mstrmojo.all.teModel.currentTxInput.ctl.pr;return pr.t===_TCCT.CTRL_STEPPER||pr.ipt===_TCIV.INPUT_VALUES_CALCULATED;},children:[{scriptClass:"mstrmojo.txEditor.Table",rows:3,cols:2,children:[_TC.createLabel({slot:"0,0"},mstrmojo.desc(2100)),_TC.createTextInput({slot:"0,1",size:7,dtp:_DTP.DOUBLE,_initValue:function(){this.set("value",_N.toLocaleString(mstrmojo.all.teModel.currentTxInput.ctl.pr.min));},updateModel:function(v){mstrmojo.all.teModel.currentTxInput.ctl.pr.min=(v?_N.toString(v,true):null);}},"min"),_TC.createLabel({slot:"1,0"},mstrmojo.desc(2099)),_TC.createTextInput({slot:"1,1",size:7,dtp:_DTP.DOUBLE,_initValue:function(){this.set("value",_N.toLocaleString(mstrmojo.all.teModel.currentTxInput.ctl.pr.max));},updateModel:function(v){mstrmojo.all.teModel.currentTxInput.ctl.pr.max=(v?_N.toString(v,true):null);}},"max"),_TC.createLabel({slot:"2,0"},mstrmojo.desc(7580)),_TC.createTextInput({slot:"2,1",size:7,dtp:_DTP.DOUBLE,min:0,_initValue:function(){this.set("value",_N.toLocaleString(mstrmojo.all.teModel.currentTxInput.ctl.pr.itv));},doValidation:function(v){if(_S.isEmpty(v)){return{code:_SC.INVALID_EMPTY,msg:_VAL.requiredFieldError};}if(!_N.isNumeric(v)){return{code:_SC.INVALID_CHAR,msg:_VAL.invalidCharError.replace("#",_VAL.numericDataType)};}if(parseFloat(v)<=this.min){var _msg=mstrmojo.desc(11187);return{code:_SC.INVALID_OUTOFRANGE,msg:_msg.replace("#",this.min)};}return{code:_SC.VALID};},updateModel:function(v){mstrmojo.all.teModel.currentTxInput.ctl.pr.itv=(v?_N.toString(v,true):null);}},"itv")]}]});}());