(function(){mstrmojo.requiresCls("mstrmojo.EnumReadystate");var $RS=mstrmojo.EnumReadystate;function getViewKey(view){return(view.getKey&&view.getKey())||view.k;}mstrmojo._IsDocController={_mixinName:"mstrmojo._IsDocController",_getXtabCallback:function(xtab,updateDefn){var targetDefinitions={},defn=targetDefinitions[getViewKey(xtab)]=xtab.defn,me=this,model=me.model;return model.newCallback({submission:function(){if(defn.set){defn.set("readyState",$RS.WAITING);}},success:function(res){var puKeys=res.pukeys,puKeysArr=puKeys&&puKeys.split("\u001E");if(puKeys){targetDefinitions=model.getUnitDefinitions(puKeys);}model.partialUpdate(res.data,targetDefinitions,updateDefn===false?undefined:res.defn,puKeysArr,res.puFilters);},failure:function(details){if(!(mstrApp.isSingleTier&&details.code===403)){mstrmojo.alert(details.code+": "+details.message);}},complete:function(){if(defn.set){defn.set("readyState",$RS.IDLE);}me.docRequestComplete();}});},_addNodeKeyToAction:function(view,action){action.nodeKey=getViewKey(view);return action;},onGridSelector:function(view,action){var m=this.model,ifws=[].concat(m.getTargetInfoWin(action.ifw)).concat(m.getTargetInfoWin(action.tks));action.sid=view.sid;if(view.isInFilterPanel&&view.isInFilterPanel()&&view.filterCtrl){view.filterCtrl.cacheUpdateAction(action);}else{m.slice(action);}if(ifws&&ifws.length){var i;for(i=0;i<ifws.length;i++){m.showInfoWin(ifws[i],action.anchor,"h",true,null,action.sid);}}},onVisSelector:function(view,action){if(action.anchor){var m=this.model,ifws=m.getTargetInfoWin(action.tks);if(ifws&&ifws.length){m.showInfoWin(ifws[0],action.anchor,"h",true);}}if(view.xtabModel&&view.xtabModel.docModel&&view.xtabModel.docModel.slice){view.xtabModel.docModel.slice(action);}},isInRequest:function isInRequest(){var inProcess=!!this._inProcess;if(!inProcess){this._inProcess=true;}return inProcess;},docRequestComplete:function docRequestComplete(){this._inProcess=false;},nudgeWidget:mstrmojo.emptyFn,getGroupByElements:function getGroupByElements(w){var gbelems=[],keys;while(w){keys=w.node&&w.node.data&&w.node.data.pbes;if(keys){break;}w=w.parent;}if(keys){var dataElems=this.model.data.elems;var len=keys.length,i;for(i=0;i<len;i++){var idx=keys[i];gbelems.push(isNaN(idx)?idx:dataElems&&dataElems[idx]);}}return gbelems;},setData:function setData(res,isNewData){var view=this.view,unloadCache=isNewData;if(isNewData&&view&&view.unloadLayouts){view.unloadLayouts(null,false);unloadCache=false;}this.model.loadLayout(res,unloadCache);if(this.hasPageBy&&this.hasPageBy()){this.getPageByTree(true);}}};}());