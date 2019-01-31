(function(){mstrmojo.requiresCls("mstrmojo.Label","mstrmojo.TextBox","mstrmojo.Button","mstrmojo.EditorAttachKeyDown","mstrmojo._HasLayout","mstrmojo.Pulldown","mstrmojo.Container","mstrmojo.VBox","mstrmojo.HBox","mstrmojo.DI.DIProjectSource");mstrmojo.requiresDescs(20,221,806,1161,4035,5369,8878,11508,11509);var projects=[],populateProjectList,setProjects,showDatasetPicker;populateProjectList=function(pullDownNode){var controller=mstrApp.getRootController();controller.loadProject(projects,pullDownNode);};mstrmojo.DI.DIAllProjectSource=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout],{scriptClass:"mstrmojo.DI.DIAllProjectSource",selectedIndex:1,markupString:'<div id="{@id}" class="{@cssClass}" style="{@cssText}"><div class="mstrmojo-di-pl-listNode"></div><div class="mstrmojo-di-pl-listNode"></div></div>',markupSlots:{listHeaderNode:function(){return this.domNode.children[0];},listNode:function(){return this.domNode.children[1];}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},children:[{slot:"listHeaderNode",scriptClass:"mstrmojo.HBox",children:[{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-di-pl-label",text:mstrmojo.desc(11508,"Select a Project")},{scriptClass:"mstrmojo.Pulldown",cssClass:"mstrmojo-di-pl-Pulldown",popupToBody:true,itemField:"nt",itemIdField:"id",preBuildRendering:function preBuildRendering(){populateProjectList(this);},onvalueChange:function(){var list=this,selectedIndex=list.selectedIndex,pName=list.items[selectedIndex].n,pServer=list.items[selectedIndex].sn,port=list.items[selectedIndex].port,loginEditor=mstrmojo.all.loginEditor,loginErrorBox,plNode=this.parent.parent;if(projects[selectedIndex].ls&&projects[selectedIndex].ss){plNode.set("selectedIndex",selectedIndex);return ;}if(!port){port=0;}if(loginEditor){loginErrorBox=loginEditor.vBoxAlias.loginErrorBoxAlias;loginErrorBox.set("visible",false);loginEditor.set("projectName",pName);loginEditor.set("serverName",pServer);loginEditor.set("selectedIndex",selectedIndex);loginEditor.set("port",port);loginEditor.vBoxAlias.mstrUserAlias.set("value","");loginEditor.vBoxAlias.mstrPasswordAlias.set("value","");loginEditor.open();}else{mstrmojo.insert({scriptClass:"mstrmojo.EditorAttachKeyDown",title:mstrmojo.desc(20,"Login"),id:"loginEditor",help:"Select_Objects_dialog_box_.htm",cssClass:"mstrmojo-project-login",projectName:pName,serverName:pServer,projectListNode:plNode,selectedIndex:selectedIndex,port:port,onClose:function(){if(!projects[this.selectedIndex].ss){list.set("value",null);list.set("text",list.defaultText);}},onkeydown:function(evt){if(!evt){evt=window.event;}if(evt.e.keyCode===13){this.vBoxAlias.footerHBoxAlias.submitButtonAlias.onclick();}},children:[{scriptClass:"mstrmojo.VBox",alias:"vBoxAlias",cssClass:"login_Vbox",children:[{scriptClass:"mstrmojo.Box",cssClass:"mstr_alert",id:"loginErrorBox",alias:"loginErrorBoxAlias",visible:false,children:[{scriptClass:"mstrmojo.Label",cssClass:"mstr_alert_title",text:mstrmojo.desc(806,"Error in Login")},{scriptClass:"mstrmojo.Label",cssClass:"mstr_alert_message",text:mstrmojo.desc(8878,"Display Error Message"),alias:"errorMsgAlias"}]},{scriptClass:"mstrmojo.Label",alias:"mstrProjectAlias",cssClass:"mstr_project",bindings:{text:"this.parent.parent.projectName"}},{scriptClass:"mstrmojo.Label",alias:"mstrServerAlias",cssClass:"mstr_server",bindings:{text:"this.parent.parent.serverName"}},{scriptClass:"mstrmojo.Label",cssClass:"login_label",text:mstrmojo.desc(1161,"User Name:")},{scriptClass:"mstrmojo.TextBox",cssClass:"input_textbox",alias:"mstrUserAlias"},{scriptClass:"mstrmojo.Label",cssClass:"login_label",text:mstrmojo.desc(4035,"Password:")},{scriptClass:"mstrmojo.TextBox",type:"password",cssClass:"input_textbox",alias:"mstrPasswordAlias"},{scriptClass:"mstrmojo.HBox",cssClass:"footer_button",alias:"footerHBoxAlias",children:[{scriptClass:"mstrmojo.Button",alias:"submitButtonAlias",cssClass:"mstrmojo-di-button mstrmojo-WebButton hot",text:mstrmojo.desc(5369,"Submit"),onclick:function(){var controller=mstrApp.getRootController(),domNode=this.parent.parent;controller.loginProjects(domNode,projects);}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-button mstrmojo-WebButton",text:mstrmojo.desc(221,"Cancel"),onclick:function(){var loginEditor=this.parent.parent.parent;loginEditor.close();}}]}]}]}).render();}}}]},{slot:"listNode",scriptClass:"mstrmojo.DI.DIProjectSource",bindings:{sessionState:function(){return projects[this.parent.selectedIndex].ss;}}}],preBuildRendering:function preBuildRendering(){this.setDimensions(parseInt(this.parent.layoutNode.offsetHeight,10),this.parent.layoutNode.offsetWidth);if(this._super){this._super();}},setDimensions:function setDimensions(h,w){var height=parseInt(h,10);var width=parseInt(w,10);if(!this.layoutConfig){this.layoutConfig={h:{},w:{}};}this.layoutConfig.h.listNode=(height-70)+"px";this.layoutConfig.w.listNode=(width-40)+"px";if(this._super){this._super(height+"px",w);}}});}());