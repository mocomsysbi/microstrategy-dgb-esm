mstrPromptMultipleObjSelectorImplScript=true;mstrPromptMultipleObjSelectorImpl.prototype=new mstrEditorImpl();mstrPromptMultipleObjSelectorImpl.prototype.selections=null;mstrPromptMultipleObjSelectorImpl.prototype.addBtn=null;mstrPromptMultipleObjSelectorImpl.prototype.removeBtn=null;mstrPromptMultipleObjSelectorImpl.prototype.selectedList=null;mstrPromptMultipleObjSelectorImpl.prototype.updateManager=microstrategy.updateManager;mstrPromptMultipleObjSelectorImpl.prototype.onload=function(e){try{mstrEditorImpl.prototype.onload.call(this,e);this.selections=new mstrPromptObjSelectionsImpl();this.selections.parentBone=this;this.addBtn=document.getElementById("addBtn");if(this.addBtn!=null){this.addBtn.onclick=new Function("e","return microstrategy.bone('"+this.id+"').addToSelectedList(e);");}this.removeBtn=document.getElementById("removeBtn");if(this.removeBtn!=null){this.removeBtn.onclick=new Function("e","return microstrategy.bone('"+this.id+"').removeFromSelectedList(e);");}this.selectedList=document.getElementById("selectedList");}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptMultipleObjSelectorImpl.prototype.addToSelection=function(obj){try{if(obj==null){return ;}if(obj.tagName.toLowerCase()=="div"){obj=obj.firstChild;}if(obj.getAttribute(microstrategy.HTMLATTR_DSS_TYPE)==null){return ;}if(this.selections){if(this.selections.isSelected(obj)){this.selections.remove(obj);}else{this.selections.clear();this.selections.add(obj);}}}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptMultipleObjSelectorImpl.prototype.addToSelectedList=function(){try{if(!this.selections.isActive){return ;}var si=this.selections.getItems();for(var i=0;i<si.length;i++){this.add(si[i]);}this.selections.clear();}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptMultipleObjSelectorImpl.prototype.updateChanges=function(){try{var ac=this.updateManager.createActionObject(this.elem,mstrUpdateManager.WebEventUpdateSelections,this.beanPath,["94002"],["1"]);this.updateManager.add([ac]);this.updateManager.useIframe=false;this.updateManager.flushAndSubmitChanges();}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptMultipleObjSelectorImpl.prototype.cancelChanges=function(){try{var ac=this.updateManager.createActionObject(this.elem,mstrUpdateManager.WebEventCancelSelector,this.beanPath,[],[]);this.updateManager.add([ac]);this.updateManager.useIframe=false;this.updateManager.flushAndSubmitChanges();}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptMultipleObjSelectorImpl.prototype.add=function(obj){try{if(this.selectedList==null||obj==null){return ;}var dssId=obj.getAttribute(microstrategy.HTMLATTR_DSS_ID);if(this.selectedList.options.namedItem(dssId)!=null){return ;}var option=document.createElement("OPTION");this.selectedList.options.add(option);option.innerHTML=obj.innerHTML;option.id=dssId;option.value=dssId+"~"+obj.getAttribute(microstrategy.HTMLATTR_DSS_TYPE);var selection=option.value+"~"+obj.innerHTML;var ac=this.updateManager.createActionObject(this.elem,mstrUpdateManager.WebEventAddSelections,this.beanPath,["94001"],[selection]);this.updateManager.add([ac]);}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptMultipleObjSelectorImpl.prototype.removeFromSelectedList=function(){try{if(this.selectedList==null){return ;}var selIndex=this.selectedList.selectedIndex;if(selIndex>=0){var option=this.selectedList.options[selIndex];var selection=option.value;this.selectedList.options[selIndex]=null;var ac=this.updateManager.createActionObject(this.elem,mstrUpdateManager.WebEventRemoveSelections,this.beanPath,["94001"],[selection]);this.updateManager.add([ac]);}}catch(err){microstrategy.errors.log(err);return false;}};function mstrPromptMultipleObjSelectorImpl(id){this.inherits=mstrEditorImpl;this.inherits(id);delete this.inherits;return this;}mstrPromptObjSelectionsImplScript=true;mstrPromptObjSelectionsImpl.prototype=new mstrSelectionsImpl();mstrPromptObjSelectionsImpl.prototype.add=function(obj){try{mstrSelectionsImpl.prototype.add.call(this,obj);obj.style.backgroundColor="#cccccc";}catch(err){microstrategy.errors.log(err);}return false;};mstrPromptObjSelectionsImpl.prototype.remove=function(obj){try{mstrSelectionsImpl.prototype.remove.call(this,obj);obj.style.backgroundColor="";}catch(err){microstrategy.errors.log(err);}return false;};mstrPromptObjSelectionsImpl.prototype.clear=function(){try{for(var id in this.items){this.remove(this.items[id]);}mstrSelectionsImpl.prototype.clear.call(this);}catch(err){microstrategy.errors.log(err);}return false;};function mstrPromptObjSelectionsImpl(){this.inherits=mstrSelectionsImpl;this.inherits();delete this.inherits;return this;}