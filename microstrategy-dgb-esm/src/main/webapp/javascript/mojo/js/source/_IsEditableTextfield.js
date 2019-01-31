(function(){mstrmojo.requiresCls("mstrmojo.css","mstrmojo.hash","mstrmojo.string","mstrmojo.DICFactory");var TX_ELEM_TEXTFIELD=3,CLEAR_DDIC_CHANGES=8,FIELDGROUP=2,DATA_DRIVEN_CONTROL=2,$CSS=mstrmojo.css,MASK="********",$H=mstrmojo.hash,$ARR=mstrmojo.array,$STR=mstrmojo.string;var tf_formatHandlers=null;function setDirtyFlag(c,d){if(c){var dicWidget=this.dicWidget;if(dicWidget&&dicWidget.setDirtyFlag){dicWidget.setDirtyFlag(c,d);}else{if(c.className!=="flag-container"){var f=document.createElement("div");f.className="flag-container";f.style.right="10px";f.innerHTML='<div class="dirty-cell"/>';d.insertBefore(f,c);}}}}function clearDirtyFlag(c,d){if(c.className==="flag-container"){d.removeChild(c);}}function getUpdateXML(udv,k,t,v){return'<rwf rw_tree_type="'+this.tt+'" rw_node_key="'+this.fgk+'" rw_field_key="'+this.k+'" key="'+this.key+'" columns="'+this.cls+'" types="'+t+'" '+k+v+' dt="'+udv.dt+'" />';}mstrmojo._IsEditableTextfield={_mixinName:"mstrmojo._IsEditableTextfield",preBuildRendering:function preBldRnd(){if(!this.edb){var d=this.node.data,defn=this.node.defn,di=d.dic||defn.txi.dic,rv=(this.rv==="")?this.value:this.rv;if(di.psw){this.v=MASK;rv=this.rv="";}if(di.ipt===DATA_DRIVEN_CONTROL){di.vls=this.vls||[];this.dk=di.k;this.ddic=true;}this.dt=di.dt;this.dicWidget=mstrmojo.DICFactory.createDIC({dic:$H.copy(di,{req:this.req}),enabled:!!this.enabled,owner:this,k:0,dv:this.value,value:rv,openerType:FIELDGROUP,popupTitle:defn.n});if(this.shouldReplaceValueNode()){if(!tf_formatHandlers){tf_formatHandlers=$H.clone(this.formatHandlers);}this.formatHandlers.domNode=["T","z-index","D","B","F","P","text-align","background-color","fx","white-space","overflow"];delete this.formatHandlers.valueNode;}}this.set("cssClass",this.edb?"":"editable-field");this._super();},shouldReplaceValueNode:function shouldReplaceValueNode(){return this.dicWidget.showByDefault||this.dicWidget.hasPreview;},postBuildRendering:function pstBldRnd(){this._super();if(this.edb){return ;}var w=this.dicWidget,text=this.valueNode.innerHTML;if($STR.isEmpty(text)){this.valueNode.innerHTML=text+"1";this.valueNode.style.height=this.valueNode.clientHeight+"px";this.valueNode.innerHTML=text;}if(w.showByDefault){w.render();}else{if(this.enabled){if(w.hasPreview){w.openerNode=this.domNode;w.renderPreview(this.value);}else{w.openerNode=this.valueNode;}mstrmojo.dom.attachEvent(w.openerNode,mstrApp.isMobile?mstrmojo.dom.TOUCHEND:"click",function(){w.showInPopup();});}else{$CSS.addClass(this.domNode,"disabled");return ;}}if(this.shouldReplaceValueNode()){$H.copy(tf_formatHandlers,this.formatHandlers);}this.registerTxWidget();this.addToTraversalList();if(this.mdf&&this.sci){var domNode=this.domNode;setDirtyFlag.call(this,domNode.firstChild,domNode);}},getKeyContext:function getKeyContext(){return{dt:this.dt||0,k:this.dk||undefined};},getUpdates:function getUpdates(){var udv=this.getUpdatedValues()[0],idx=$ARR.find(this.vls,"v",udv.v),w=this.dicWidget,isRevert=this.ddic&&(idx===-1),k,xml="";if(w.canSlice||isRevert){xml=getUpdateXML.call(this,udv,"",CLEAR_DDIC_CHANGES,"");}if(!isRevert){k=udv.k?('rw_control_key="'+udv.k+'" element_id="'+$STR.encodeXMLAttribute(this.vls[idx].eid)+'" '):"";xml+=getUpdateXML.call(this,udv,k,TX_ELEM_TEXTFIELD,'value="'+$STR.encodeXMLAttribute(String(udv.v))+'"');}return xml;},updateValue:function updateValue(idx,vo){if(this._super){this._super(idx,vo);}var t=this.valueNode,d=this.domNode,w=this.dicWidget,v=vo.v,dv=vo.dv,m=$ARR.find(this.vls,"v",v),isRevert=this.ddic&&(m===-1);if(this.rv!==v){if(this.req){$CSS.removeClass(d,"required");}this.rv=v;this.v=dv;this.mdf=isRevert?0:1;if(!w.showByDefault){if(w.hasPreview){w.renderPreview();}else{t[t.innerText!==undefined?"innerText":"textContent"]=this.psw?MASK:(!dv?"\u00a0":$STR.decodeHtmlString(dv,false));}}if(this.req){$CSS.removeClass(d,"required");}if(this.sci&&!isRevert){setDirtyFlag.call(this,d.firstChild,d);}else{clearDirtyFlag.call(this,d.firstChild,d);}}if(this.txar){return true;}return false;},applyPasswordMask:function applyPasswordMask(){this.psw=true;this.v=MASK;this.rv="";},getUpdateObject:function getUpdateObject(){var changedObj={fieldKey:this.k,wid:this.wid,newValue:$STR.encodeXMLAttribute(String(this.rv)),dataType:this.dt},idx=-1,udv=this.getUpdatedValues()[0];if(udv.k!==undefined){changedObj.controlKey=udv.k;idx=mstrmojo.array.find(this.vls,"v",udv.v);changedObj.elementId=idx>=0?this.vls[idx].eid:"";}return{nodeKey:this.fgk,cells:[changedObj],retrieveData:false,autoRefresh:false};},autoRefresh:function(evt){this.model.sendTransactionUpdates(evt);},update:function update(node){if(this._super){this._super(node);}var d=node.data,df=node.defn;if(d.vls){this.vls=d.vls;}else{delete this.vls;}this.cell=node.data;this.value=d.v||"";this.rv=(d.rv===undefined)?this.value:d.rv;this.tca=d.tca||0;this.dt=d.dt;this.key=d.key||"";this.cls=d.cls||"";this.wid=d.wid;this.edb=d.edb;this.mdf=d.mdf;this.sci=df.txi.sci;this.req=this.required||df.txi.dic.req;this.tt=df.tt;this.fgk=df.fgk;this.txar=df.txi.txar;this.txck=df.txi.dic.ckey;},addToTraversalList:function addToTraversalList(){if(mstrmojo.DICConfig.isKeyNavigable(this.dicWidget.dic)){var traversalList=this.parent.traversalList,dom=this.domNode;if(!traversalList){traversalList=this.parent.traversalList=[];}var fieldKey=this.k,isAdded=false;$ARR.forEach(traversalList,function(item){if(item.refField.k===fieldKey){isAdded=true;return false;}});if(!isAdded){traversalList.push({x:dom.offsetLeft,y:dom.offsetTop,h:dom.offsetHeight,refField:this});}}},editNext:function editNext(){var traversalList=this.parent.traversalList,i,len,avgHeight,sumHeight=0;if(!traversalList){return false;}if(!traversalList.isSorted){for(i=0,len=traversalList.length;i<len;i++){sumHeight+=traversalList[i].h;}avgHeight=sumHeight/len;traversalList.sort(function(a,b){var r1=Math.floor(a.y/avgHeight),r2=Math.floor(b.y/avgHeight);if(r1<r2){return -1;}if(r1>r2){return 1;}if(a.x<b.x){return -1;}if(a.x>b.x){return 1;}return(a.y<b.y)?-1:1;});traversalList.isSorted=true;}for(i=0,len=traversalList.length;i<len;i++){if(traversalList[i].refField.k===this.k){break;}}if(i<len){do{i++;if(i>=len){i%=len;}if(i===parseInt(this.k,10)){return false;}var dicWidget=traversalList[i].refField.dicWidget;if(dicWidget){if(!dicWidget.showByDefault){dicWidget.showInPopup();}else{dicWidget.focus();}return true;}}while(true);}},checkRequiredObjects:function checkRequiredObjects(){if(this.req&&!this.mdf&&!this.edb){$CSS.addClass(this.domNode,"required");return false;}return true;}};}());