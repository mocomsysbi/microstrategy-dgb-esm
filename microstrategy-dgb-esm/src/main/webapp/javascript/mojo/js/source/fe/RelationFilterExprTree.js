(function(){mstrmojo.requiresCls("mstrmojo.expr","mstrmojo.mstr.EnumNodeProperties","mstrmojo.fe.FilterExprTree","mstrmojo.fe.AndOrNode","mstrmojo.fe.RelationNode","mstrmojo.fe.DynamicNode","mstrmojo.fe.ConditionNode");var _ET=mstrmojo.expr.ET,_NODE=mstrmojo.mstr.EnumNodeProperties;mstrmojo.fe.RelationFilterExprTree=mstrmojo.declare(mstrmojo.fe.FilterExprTree,null,{scriptClass:"mstrmojo.fe.RelationFilterExprTree",nodeClassMap:{14:mstrmojo.fe.AndOrNode,15:mstrmojo.fe.RelationNode,ph:mstrmojo.fe.DynamicNode,"*":mstrmojo.fe.ConditionNode},getItemIdentityProp:function(item){if(item.node&_NODE.CONDITION){return"*";}if(item.ph){return"ph";}if((item.et===10||item.et===12)&&item.dmt===4){return _ET.RLS;}return item.et;},isEditable:function isedt(item){var _result=false;switch(item&&item.et){case _ET.RLS:_result=true;break;}return _result||this._super(item);},getItemConfig:function getItemConfig(item,idx,widget){var config=this._super(item,idx,widget),relation=(item.et===_ET.RLS||!!item.relation);if(relation){config.itemFunction=widget.itemFunction;}return config;},newCondition:function nc(c){var sel=this.getSelectedItemWidget(),nextPHIndex=0;if((typeof microstrategy!=="undefined")&&microstrategy.bones&&microstrategy.bones.rwb_viewer){nextPHIndex=microstrategy.bones.rwb_viewer.nextPhIndex;}else{if(mstrApp&&mstrApp.docModelData&&mstrApp.docModelData.phIndex){nextPHIndex=mstrApp.docModelData.phIndex;}}if(c&&c.ph&&!c.ph.idx){c.ph.idx=nextPHIndex++;}if(sel&&sel.selected&&sel.newCondition){return sel.newCondition(c);}else{return this._super(c);}},createSet:function createSet(idxs,cfg){var rq=cfg.rq,bq=cfg.cq;if(rq&&bq){this.remove(bq);if(cfg.isMetric){mstrmojo.hash.copyProps(["applySubExpr","dmy","dmt","relation","useSchema"],rq,bq);rq=bq;}else{rq.nds=[bq];}this.add([rq],idxs[0]);}},removeSet:function removeSet(rq){var d=rq.data,addNds=[d];this.remove(d);if(d.nds&&d.nds.length>0){addNds=d.nds;}else{delete d.dmy;delete d.relation;delete d.applySubExpr;delete d.relation;delete d.useSchema;delete d.dmt;}this.add(addNds,0);},nameFactory:{counter:1,names:{},clear:function(){this.resetCounter();this.names={};},resetCounter:function resetCounter(){this.counter=1;},isNameExist:function isNameExist(name){return !!this.names[name];},setName:function setName(name,widget){this.names[name]=widget;},changeName:function changeName(originalName,name,widget){this.removeName(originalName);this.setName(name,widget);},getNewName:function getNewName(treeNode,prefix,subfix){var pre=prefix||"",sub=subfix||"",name;while(this.isNameExist(pre+this.counter+sub)){this.counter++;}name=pre+this.counter+++sub;this.names[name]=treeNode;return name;},removeName:function removeName(name){delete this.names[name];this.resetCounter();}}});})();