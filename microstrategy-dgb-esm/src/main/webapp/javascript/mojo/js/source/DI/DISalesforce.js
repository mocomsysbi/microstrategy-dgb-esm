(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.DI.DIConstants","mstrmojo.List","mstrmojo._HasLayout","mstrmojo.Label");mstrmojo.requiresDescs(39,1975,8338,12807,12808);var sourceType=mstrmojo.DI.DIConstants.sourceType;var operationMode=mstrmojo.DI.DIConstants.operationMode;mstrmojo.DI.DISalesforce=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout],{scriptClass:"mstrmojo.DI.DISalesforce",cssClass:"mstrmojo-di-sf",markupString:'<div id="{@id}" class="{@cssClass}" style="{@cssText}"><div class="cf sf-options"></div><div style="padding-left:20px;"></div><div style="padding-left:20px;"></div><div class="show-preview"></div></div>',markupSlots:{labelNode:function(){return this.domNode.children[0];},listHeaderNode:function(){return this.domNode.children[1];},listBodyNode:function(){return this.domNode.children[2];},previewNode:function(){return this.domNode.children[3];}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";mstrApp.getRootController().showPreview(this.showPrv.checked||(this.model.operationMode===operationMode.create));}},children:[{slot:"labelNode",scriptClass:"mstrmojo.Label",cssClass:"signout",text:mstrmojo.desc(8338,"sign out"),onclick:function(){mstrApp.getRootController().oAuthSignOut(sourceType.salesforce);}},{slot:"labelNode",scriptClass:"mstrmojo.Label",cssClass:"sf-username",alias:"username",bindings:{text:function(){return mstrmojo.desc(12808,"Salesforce User: #### | ").replace("####",this.parent.model.externalSources[sourceType].userDisplayName);}}},{scriptClass:"mstrmojo.List",slot:"listHeaderNode",itemMarkup:'<div><table cellpadding="0" cellspacing="0" style="width: 100%;"><tr><td class="mstrmojo-di-sf-list-header cf" style="width: 40%;"><div style="float:left;">{@n}</div><div class="di-refresh-reports icon-clickable" style="float:right;padding-right:5px;" onclick="mstrApp.getRootController().getOAuthSourceReports(2, false);"></div></td><td class="mstrmojo-di-sf-list-header" style="width: 60%;">{@desc}</td></tr></table></div>',items:[{n:mstrmojo.desc(1975,"Reports"),desc:mstrmojo.desc(39,"Description")}]},{scriptClass:"mstrmojo.List",alias:"sfList",slot:"listBodyNode",cssText:"background-color: 0xffffff; overflow-x: hidden; overflow-y: auto; width: 100%",itemMarkupFunction:function(item,index){var c1=(item.a==="")?' class="mstrmojo-di-sf-list-folder"':' class="mstrmojo-di-sf-list-report"';var c2=(item.a==="")?"":' class="mstrmojo-di-sf-list-desc"';var id=(item.a==="")?"":' id="mstrDiSfItem'+index+'"';return"<div"+id+c1+'><table cellpadding="0" cellspacing="0" style="width: 100%;"><tr><td style="vertical-align: top; width: 40%;">'+item.n+"</td><td"+c2+' style="vertical-align: top; width: 60%;">'+item.d+"</td></tr></table></div>";},prevIndex:-1,onchange:function(){var elem;elem=document.getElementById("mstrDiSfItem"+this.selectedIndex);if(elem){elem.className="mstrmojo-di-sf-list-report-selected";if(this.prevIndex>-1){elem=document.getElementById("mstrDiSfItem"+this.prevIndex);elem.className="mstrmojo-di-sf-list-report";}this.prevIndex=this.selectedIndex;}else{this.selectedIndex=this.prevIndex;}var controller=mstrApp.getRootController();if(this.selectedIndex>=0){controller.sourceSelected(true);}else{controller.sourceSelected(false);}}},{slot:"previewNode",scriptClass:"mstrmojo.ImageCheckBox",alias:"showPrv",label:mstrmojo.desc(12807,"Show a preview of the report"),bindings:{checked:function(){return(this.parent.model.operationMode===operationMode.create);},visible:function(){return(this.parent.model.operationMode!==operationMode.create);}},onclick:function(){mstrApp.getRootController().showPreview(this.checked);}}],populate:function populate(){var res=this.model.externalSources[sourceType.salesforce].reports;var count=0,selected=-1;var report;if(this.model.currentSource){report=this.model.currentSource.sourceInfo.name;}var items=[];for(var i=0;i<res.mi.ftree.fd.length;i++){var fd=res.mi.ftree.fd[i];items.push({n:fd.n,d:"",a:""});count++;for(var j=0;j<fd.fl.length;j++){var fl=fd.fl[j];items.push({n:fl.n,d:fl.des,a:fl.address});if(fl.n===report){selected=count;}count++;}}this.sfList.set("items",items);this.sfList.set("selectedIndex",selected);var d=this.sfList.domNode;if(d!==null){if(selected>1){var elem=document.getElementById("mstrDiSfItem"+selected);if(elem){if(elem.offsetTop+23>d.clientHeight){d.scrollTop=(elem.offsetTop-23);}}}}this.username.set("text",mstrmojo.desc(12808,"Salesforce User: #### | ").replace("####",this.model.externalSources[sourceType.salesforce].userDisplayName));},onNextButtonClick:function onNextButtonClick(){var list=this.sfList,index=list.selectedIndex,showPreview=(this.model.operationMode===operationMode.create)?true:this.showPrv.checked;mstrApp.getRootController().importOAuthReport(sourceType.salesforce,list.items[index].n,list.items[index].d,list.items[index].a,showPreview);},postBuildRendering:function postBuildRendering(){if(this._super){this._super();}mstrApp.getRootController().sourceSelected(false);this.model.externalSources[sourceType.salesforce].attachEventListener("oAuthReportsFetched",this.id,this.populate);},preBuildRendering:function preBuildRendering(){this.setDimensions((parseInt(this.parent.height,10)-65)+"px",this.parent.width);if(this._super){this._super();}},setDimensions:function setDimensions(h,w){var height=parseInt(h,10)+65;var width=parseInt(w,10);if(!this.layoutConfig){this.layoutConfig={h:{},w:{}};}this.layoutConfig.h.listBodyNode=(height-140)+"px";this.layoutConfig.w.listHeaderNode=(width-40)+"px";this.layoutConfig.w.listBodyNode=(width-40)+"px";if(this._super){this._super(height+"px",w);}}});})();