mstrSecurityRoleEditorImplScript=true;mstrSecurityRoleEditorImpl.prototype=new mstrEditorImpl();mstrSecurityRoleEditorImpl.prototype.initializing=false;mstrSecurityRoleEditorImpl.prototype.updatingPrivileges=false;mstrSecurityRoleEditorImpl.prototype.categoryInfo=null;mstrSecurityRoleEditorImpl.prototype.onload=function(){try{this.initializing=true;this.initEditor();this.initSettings();this.initializing=false;}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityRoleEditorImpl.prototype.addSettings=function(oCol){try{if(oCol){for(var i=0;i<oCol.length;i++){var oObj=oCol[i];if(oObj.getAttribute(microstrategy.HTMLATTR_CMD_ID)){this.settings.push(oObj);if(oObj.onclick){oObj.onclick();}if(oObj.onchange){oObj.onchange();}}}}}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityRoleEditorImpl.prototype.initSettings=function(){try{this.settings=new Array();this.categoryInfo=new Object();var oInputs=this.elem.getElementsByTagName("input");this.addSettings(oInputs);oInputs=this.elem.getElementsByTagName("textarea");this.addSettings(oInputs);var categories=microstrategy.objectListFind(this.elem,"div","cat");if(categories){for(var i=0;i<categories.length;i++){var categoryDiv=categories[i];var privileges=microstrategy.subObjectListFind(categoryDiv,"input","p");this.categoryInfo[categoryDiv.name]=privileges;if(privileges&&privileges.length>0){this.updateParentCategory(privileges[0]);}}}}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityRoleEditorImpl.prototype.updateParentCategory=function(oPrivilege){try{var catDiv=microstrategy.findAncestor(oPrivilege);if(catDiv&&this.categoryInfo){var privileges=this.categoryInfo[catDiv.name];var category=microstrategy.subObjectFind(catDiv,"img","c");this.updateParentCheckboxImage(category,privileges);}}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityRoleEditorImpl.prototype.getPrivilegeRow=function(privId){try{return document.getElementById("pr"+privId);}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityRoleEditorImpl.prototype.updateCheck=function(obj){try{if(obj&&!this.initializing){switch(obj.getAttribute(microstrategy.HTMLATTR_CMD_ID)){case"priv":this.updateParentCategory(obj);var privilege=new mstrPrivilegesImpl(obj.value,this);privilege.syncDependencies();break;}}}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityRoleEditorImpl.prototype.toggleCategory=function(catDiv){try{if(!this.updatingPrivileges){var expand=catDiv.getAttribute("xp")=="0";var privDiv=catDiv.nextSibling;if(privDiv){privDiv.style.display=(expand)?"block":"none";}if(expand){catDiv.setAttribute("xp","1");catDiv.className="cte";}else{catDiv.setAttribute("xp","0");catDiv.className="ctc";}}else{this.updatingPrivileges=false;}}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityRoleEditorImpl.prototype.updateCategory=function(obj){try{if(obj){var catNextState=(obj.className==this.CHECKBOX_PARTIALLY_SELECTED||obj.className==this.CHECKBOX_UNSELECTED)?this.CHECKBOX_SELECTED:this.CHECKBOX_UNSELECTED;var id=obj.attributes.getNamedItem("value").value;var privDiv=microstrategy.findChildWithAtt(this.elem,"div","name","cat_"+id);if(privDiv){var checkboxes=privDiv.getElementsByTagName("input");this.updateCategoryChildren(checkboxes,catNextState==this.CHECKBOX_SELECTED);obj.className=catNextState;}this.updatingPrivileges=true;}}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityRoleEditorImpl.prototype.updateCategoryChildren=function(checkboxes,bChecked){try{if(checkboxes){this.adjustCheckboxes(checkboxes,bChecked);for(var i=0;i<checkboxes.length;i++){var privilege=new mstrPrivilegesImpl(checkboxes[i].value,this);privilege.syncDependencies();}}}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityRoleEditorImpl.prototype.updateText=function(obj){try{if(obj){switch(obj.getAttribute(microstrategy.HTMLATTR_CMD_ID)){}}}catch(err){microstrategy.errors.log(err);return false;}};mstrSecurityRoleEditorImpl.prototype.applyChanges=function(){try{var argNames=new Array();var argValues=new Array();for(var i=0;i<this.settings.length;i++){var setting=this.settings[i];var evtId=mstrUpdateManager.MODIFY_SECURITY_ROLE;var argId=null;var argValue=setting.value;switch(setting.getAttribute(microstrategy.HTMLATTR_CMD_ID)){case"id":argId="4105001";break;case"desc":argId="4105002";break;case"priv":if(setting.checked){argId="4105004";}break;}if(argId!=null&&argId.length>0){argNames.push(argId);argValues.push(argValue);}}var action=microstrategy.updateManager.createActionObject(this.elem,evtId,this.beanPath,argNames,argValues);microstrategy.updateManager.add([action]);}catch(err){microstrategy.errors.log(err);return false;}};function mstrSecurityRoleEditorImpl(id){this.inherits=mstrEditorImpl;this.inherits(id);delete this.inherits;return this;}