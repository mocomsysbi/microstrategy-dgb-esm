(function(){mstrmojo.requiresCls("mstrmojo.nativeandroid.DocModel","mstrmojo.nativeandroid.DocVisModel","mstrmojo.dom");var SELECTOR_ACTION=2,$DOM=mstrmojo.dom;mstrmojo.nativeandroid._VisSelectionAndLinkDrillHelper={performAction:function performAction(actionObj){var action=this.xtabModel.getAction(actionObj),handler=action&&action.h,cell=actionObj[0]&&actionObj[0].node;if(handler&&this[handler]){this[handler](action.a,cell);return true;}return false;},onVisSelector:function onVisSelector(action,cell){var taskId="setMultiDocSelectorElements",anchorPos="";if(action.anchor){anchorPos=JSON.stringify($DOM.position(action.anchor));}if(action.multiSelect){var selectorObj=JSON.stringify(action.selectorObjects);mstrMobileTransport.applyMultiDocSelection(taskId,action.multiSelect,selectorObj,anchorPos);}else{mstrMobileTransport.applyDocSelection(action.ck,action.tks,action.ctlKey,action.eid,anchorPos);}},onGridSelector:function(action,cell){var anchorPos="";if(action.anchor){anchorPos=JSON.stringify($DOM.position(action.anchor));}mstrMobileTransport.applyDocSelection(action.ck,action.tks,action.ctlKey,action.eid,anchorPos);},onLink:function onLink(action,cell){var eId,strValue;if(cell&&cell._e){eId=cell._e.id;strValue=cell._e.n;}if(cell&&cell._lp&&cell._lp._e){var tempElement=cell._lp._e;eId=tempElement.id;strValue=tempElement.n;}var isIG=(this.model&&this.model.data&&this.model.data.visName==="InteractiveGridAjaxVisualizationStyle");if(isIG&&!strValue){return false;}mstrMobileTransport.hanlderLinkDrilling(JSON.stringify(action.linkInfo),eId,strValue);},onDrill:function onDrill(action,cell){var nodeKey=this.getModelK();mstrMobileTransport.handleDrill(action.drillPathIndex,action.drillPathKey,action.isWithin,JSON.stringify(action.drillElements),nodeKey);}};})();