mstrDataExplorerImplScript=true;mstrDataExplorerImpl.prototype=new mstrReportObjectsImpl();mstrDataExplorerImpl.prototype.onload=function(e){try{mstrReportObjectsImpl.prototype.onload.call(this,e);this.adjustTopCotainer=false;delete this.selections;this.selections=new mstrDataExplorerSelectionsImpl();this.selections.parentBone=this;this.selections.path="microstrategy.bone('"+this.id+"').selections";this.searchBox=document.getElementById("searchPattern");if(this.files){this.files.onmousedown=new Function("e","return microstrategy.bone('"+this.id+"').onmousedown(e);");}}catch(err){microstrategy.errors.log(err);return false;}};mstrDataExplorerImpl.prototype.getTabContainer=function(){return microstrategy.findAncestorWithAtt(this.elem,microstrategy.HTMLATTR_SUBOBJTYPE,microstrategy.SUBOBJTYPE_TAB_CONTAINER);};mstrDataExplorerImpl.prototype.selectOrExecute=function(e){try{if(!e){e=window.event;}if(e.ctrlKey){if(e.stopPropagation){e.stopPropagation();}e.cancelBubble=true;return false;}else{var spanObj=getEventTarget(e);if(spanObj){var anchorObj=microstrategy.findAncestorWithTag(spanObj,"A");if(anchorObj){return submitLink(anchorObj);}}}}catch(err){microstrategy.errors.log(err);return false;}};function mstrDataExplorerImpl(id){this.inherits=mstrReportObjectsImpl;this.inherits(id);delete this.inherits;return this;}mstrFilterDataExplorerImpl.prototype=new mstrDataExplorerImpl();function mstrFilterDataExplorerImpl(id){this.inherits=mstrDataExplorerImpl;this.inherits(id);delete this.inherits;return this;}mstrFilterDataExplorerImpl.prototype.onload=function(e){mstrDataExplorerImpl.prototype.onload.call(this,e);this.resize();this.initResize();};mstrFilterDataExplorerImpl.prototype.onwinresize=function(){try{this.ondialogresize();}catch(err){microstrategy.errors.log(err);}};mstrFilterDataExplorerImpl.prototype.ondialogresize=function(){try{this.resize();this.moveResizeHandles();}catch(err){microstrategy.errors.log(err);}};mstrFilterDataExplorerImpl.prototype.resize=function(){try{mstrFilterObjectsImpl.prototype.resizeContents.call(this);}catch(err){microstrategy.errors.log(err);}};mstrDataExplorerSelectionsImplScript=true;mstrDataExplorerSelectionsImpl.prototype=new mstrReportObjSelectionsImpl();mstrDataExplorerSelectionsImpl.prototype.onmousedown=function(e){try{var mstrSrc=microstrategy.eventManager.getSource(e);if(microstrategy.checkACL(this.clickedSrc,[microstrategy.ACL_EXECUTE,microstrategy.ACL_USE])){mstrSelectionsImpl.prototype.onmousedown.call(this,e);var verifiedPath=microstrategy.getEventHandlerString(this.path);if(typeof (mstr)!="undefined"){this.parentBone.attachWinListener(this,"mousemove","ondragstart");this.parentBone.attachWinListener(this,"mouseup","onmouseup",false);}else{if(document.onmouseup==null){document.onmouseup=new Function("e",verifiedPath+" { return "+this.path+".onmouseup(e); }");}document.onmousemove=new Function("e",verifiedPath+" { return "+this.path+".ondragstart(e); }");}}return false;}catch(err){microstrategy.errors.log(err);}return false;};function mstrDataExplorerSelectionsImpl(){this.inherits=mstrReportObjSelectionsImpl;this.inherits();delete this.inherits;return this;}