mstrSecurityFilterFrameImplScript=true;mstrSecurityFilterFrameImpl.prototype=new mstrEditorImpl();mstrSecurityFilterFrameImpl.prototype.folderPath=null;mstrSecurityFilterFrameImpl.prototype.sfPath=null;mstrSecurityFilterFrameImpl.prototype.entityPath=null;mstrSecurityFilterFrameImpl.prototype.dfnDivider=null;mstrSecurityFilterFrameImpl.prototype.elemDivider=null;mstrSecurityFilterFrameImpl.prototype.onload=function(e){try{this.initEditor();this.btdRemove=document.getElementById("sf_tbRemove");}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityFilterFrameImpl.prototype.getSecurityFilterDisplay=function(){try{return microstrategy.subObjectFind(this.elem,"div","sfdfn");}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityFilterFrameImpl.prototype.applyChanges=function(){try{var event=mstrUpdateManager.MODIFY_SECURITY_FILTERS;var argNames=new Array();var argValues=new Array();var sArgValues="";argNames.push("32768005");if(this.securityFilters){for(var id in this.securityFilters){var pId=id.substr(2);var sfId=this.securityFilters[id];if(sfId.length>0){sArgValues+=pId+this.dfnDivider+sfId+this.elemDivider;}}}if(sArgValues.length>0){sArgValues=sArgValues.substr(0,sArgValues.length-this.elemDivider.length);}argValues.push(sArgValues);var action=microstrategy.updateManager.createActionObject(this.elem,event,this.entityPath,argNames,argValues);microstrategy.updateManager.add([action]);}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityFilterFrameImpl.prototype.getBrowserBone=function(){try{var oBrowser=microstrategy.subObjectFind(this.elem,"div","fileList");if(oBrowser){return microstrategy.findBone(oBrowser);}return null;}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityFilterFrameImpl.prototype.updateSecurityFilters=function(sFilterId){try{var browser=this.getBrowserBone();var projectId=(browser)?browser.projectId:null;if(!this.securityFilters){this.securityFilters=new Array();}if(projectId){this.securityFilters["p_"+projectId]=sFilterId;}}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityFilterFrameImpl.prototype.add=function(e){try{var browser=this.getBrowserBone();if(browser){if(browser.selected){if(this.btdRemove){this.btdRemove.className=this.btdRemove.className.replace("Disabled","");}var sel=browser.selected;this.updateSecurityFilters(sel.getAttribute("oid"));var action=microstrategy.updateManager.createActionObject(this.elem,mstrUpdateManager.SET_OBJECT_ID,this.sfPath,["1001"],[sel.getAttribute("oid")]);microstrategy.updateManager.add([action]);microstrategy.updateManager.flushAndSubmitChanges();}}}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityFilterFrameImpl.prototype.changeProject=function(oCombo){try{var projId=oCombo.value;var action=microstrategy.updateManager.createActionObject(this.elem,mstrUpdateManager.SET_SECURITY_FILTER_FOLDER,this.folderPath,["2023"],["69"]);microstrategy.updateManager.add([action]);action=microstrategy.updateManager.createActionObject(this.elem,mstrUpdateManager.UPDATE_PROJECT_ID,this.beanPath,["97001"],[projId]);microstrategy.updateManager.add([action]);var sfEventId=mstrUpdateManager.INIT_AS_NEW;var sfId="";if(this.securityFilters&&this.securityFilters["p_"+projId]){sfEventId=mstrUpdateManager.SET_OBJECT_ID;sfId=this.securityFilters["p_"+projId];}action=microstrategy.updateManager.createActionObject(this.elem,sfEventId,this.sfPath,["1001"],[sfId]);microstrategy.updateManager.add([action]);microstrategy.updateManager.flushAndSubmitChanges();}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityFilterFrameImpl.prototype.cleanSecurityFilterDisplay=function(e){try{var display=this.getSecurityFilterDisplay();if(display){display.innerHTML="";}}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityFilterFrameImpl.prototype.remove=function(e){try{if(this.btdRemove){this.btdRemove.className=this.btdRemove.className.replace("Disabled","")+"Disabled";}this.cleanSecurityFilterDisplay();this.updateSecurityFilters("");}catch(err){microstrategy.errors.log(err);return false;}};function mstrSecurityFilterFrameImpl(id){this.inherits=mstrEditorImpl;this.inherits(id);delete this.inherits;return this;}