(function(){mstrmojo.requiresCls("mstrmojo.alert","mstrmojo.css","mstrmojo.desc","mstrmojo.dom","mstrmojo.Label","mstrmojo.ui.editors.ToolbarPopup","mstrmojo.vi.models.EnumFieldTypes");var $DOM=mstrmojo.dom,timeoutId=null;function getReportViewMode(object){var __result=1;if(object.tstp===769){__result=2;}else{if(object.tstp===774){__result=3;}}return __result;}function getUrlWithExecution(target){var ctxt=mstrApp.name,url=ctxt+"?",reportViewMode=-1,addArg=function(argName,val){url+=argName+"="+val+"&";};if(!!target){switch(target.ttp){case 3:addArg("evt","4001");addArg("reportID",target.tid);reportViewMode=getReportViewMode(target);if(reportViewMode!==-1){addArg("reportViewMode",reportViewMode);}break;case 55:if(target.tstp===14080){addArg("evt","32001");addArg("documentID",target.tid);}else{if(target.tvmd&(8192|2048)&&!((target.tvmd&2048&&mstrApp.features["run-vi-flash"]))){addArg("evt","3140");addArg("documentID",target.tid);if($DOM.isIE6||$DOM.isIE7||$DOM.isIE8){mstrmojo.alert(mstrmojo.desc(15474,"To work with HTML5 dossiers, please turn off your browser Compatibility View or update your browser to one of the following browser versions: Chrome, Firefox, Safari, Internet Explorer 9 or above."));return null;}}else{addArg("evt","2048001");addArg("objectID",target.tid);addArg("visMode","0");}}break;}}return url;}mstrmojo._HasDocLink=mstrmojo.provide("mstrmojo._HasDocLink",{_mixinName:"mstrmojo._HasDocLink",url:"",target:"",linkEnabled:true,ifw:"",update:function update(node){var d=node.defn;this.url=node.data.url||d.url;if(d.target){this.target=d.target;}if(d.ifw){this.ifw=d.ifw;}this._super(node);},postBuildRendering:function postBuildRendering(){if(this.url||this.ifw){mstrmojo.css.addClass(this.domNode,"hasLink");}var doc=this.controller&&this.controller.view,layout=doc&&doc.getCurrentLayout&&doc.getCurrentLayout();if(layout&&layout.addLinkInfo){layout.addLinkInfo(this.id,{url:this.url,target:this.target,src:this});}return this._super();},setLinkEnabled:function setLinkEnabled(value){this.linkEnabled=value;var node=this.domNode;if(!node){return ;}var childNodes=node.childNodes,lastChild=childNodes[childNodes.length-1],maskId=this.id+"_mask",mask=(lastChild.id===maskId)?lastChild:null;if(value){if(mask){node.removeChild(mask);delete this._mask;}}else{if(!mask){mask=document.createElement("div");mask.className="mstrmojo-DocLinkMask";mask.id=maskId;mask.innerHTML="&nbsp;";node.appendChild(mask);}}},cancelDocLink:false,onclick:function(evt){if(timeoutId===null){var that=this,cl=function(){if(that.linkEnabled&&!that.isEditing){var drillLinkItems=that.drillLinkItems,defaultLink=drillLinkItems&&drillLinkItems[0],url=that.url||(defaultLink&&defaultLink.url),nodeData=that.node&&that.node.data,navPage=nodeData&&nodeData.navpage,model=that.model,linkText=mstrmojo.desc(15704,'Go to "#"'),action;if(that.ifw){model.showInfoWin(that.ifw,(that.getAnchor&&that.getAnchor())||that.domNode,"v",true);}else{if(url){linkText=linkText.replace("#",url);action=function(){model.executeLink(url,that.target,that);};}else{if(nodeData&&nodeData.tid&&!mstrApp.isSingleTier){url=getUrlWithExecution(nodeData);if(!!url){linkText=linkText.replace("#",nodeData.tnm);action=function(){model.executeLink(url,that.target,that);};}}else{if(navPage){linkText=linkText.replace("#",nodeData.navpagenm);action=function(){model.raiseEvent({name:"layoutSelected",panelKey:navPage,layoutKey:model.getLayoutKeyByUnitKey(navPage)});};}}}}if(action){if(!mstrApp.isVI||mstrApp.isAppStatePresentation()){action();return ;}var parent=that.parent,menu=that._menu,getEditText=function(hostType){if(hostType===mstrmojo.vi.models.EnumFieldTypes.IMAGE){return mstrmojo.desc(10502,"Edit image");}return mstrmojo.desc(16163,"Edit text");};if(!menu){menu=that._menu=new mstrmojo.ui.editors.ToolbarPopup({anchorElement:parent,autoCloses:true,cssClass:"link-action-cfg",children:[{scriptClass:"mstrmojo.Label",alias:"nav",cssClass:"link nav",cssDisplay:"inline",text:linkText,onclick:function(){action();this.parent.close();}},{scriptClass:"mstrmojo.Label",cssClass:"separator",cssDisplay:"inline-block",text:"|"},{scriptClass:"mstrmojo.Label",alias:"edit",cssClass:"link",cssDisplay:"inline-block",popupHost:parent,text:getEditText(parent.hostType),onpopupHostChange:function(){this.set("text",getEditText(this.popupHost.hostType));},onclick:function(){this.parent.close();this.popupHost.switchToEditMode();}}]});}else{menu.nav.set("text",linkText);menu.nav.set("onclick",function(){action();this.parent.close();});menu.edit.set("popupHost",parent);}menu.popupConfig.position=$DOM.getMousePosition(evt.e,evt.hWin);parent.openPopup(menu);}}};timeoutId=window.setTimeout(function(){if(!that.cancelDocLink){cl();}that.cancelDocLink=false;timeoutId=null;},200);}},hasActiveLink:function(){if(this.linkEnabled){var drillLinkItems=this.drillLinkItems,defaultLink=drillLinkItems&&drillLinkItems[0],url=this.url||(defaultLink&&defaultLink.url),nodeData=this.node&&this.node.data;if(nodeData){if(nodeData.tid&&!mstrApp.isSingleTier){return true;}if(nodeData.navpage){return true;}}if(url){return true;}}return false;}});}());