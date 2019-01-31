mstrBoneImpl.prototype={};mstrBoneImpl.prototype.features={};mstrBoneImpl.prototype.isDormant=false;mstrBoneImpl.prototype.winListeners={};mstrBoneImpl.prototype.onload=function(){try{this.initBone();return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrBoneImpl.prototype.onreload=function(){try{this.inReload=true;var retValue=true;if(!this.isBoneInPage()){microstrategy.unRegisterBone(this.id);}else{if(!this.isLoaded){retValue=this.onload();}else{if(getElementById(this.id)!=this.elem&&!this.disabled){this.onunload();retValue=this.onload();}}}}catch(err){microstrategy.errors.log(err);retValue=false;}this.inReload=false;return retValue;};mstrBoneImpl.prototype.isBoneInPage=function(){try{var src=getElementById(this.id);return(src&&(src.getAttribute("dialog")!="true"||src.childNodes.length>0));}catch(err){microstrategy.errors.log(err);return true;}};mstrBoneImpl.prototype.onrepostload=function(){try{if(!this.isPostLoaded){return this.onpostload();}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrBoneImpl.prototype.onpostload=function(e){try{this.isPostLoaded=true;return true;}catch(err){microstrategy.errors.log(err);}return true;};mstrBoneImpl.prototype.onmove=function(e){};mstrBoneImpl.prototype.onunload=function(e){try{for(var listenerId in this.winListeners){this.detachWinListener(this.winListeners[listenerId]);delete mstr.controllers.Factory._objs[listenerId];}delete this.elem;this.isLoaded=false;}catch(err){microstrategy.errors.log(err);}return true;};mstrBoneImpl.prototype.initBone=function(){try{this.elem=getElementById(this.id);if(!this.elem){this.onunload();return false;}this.winListeners={};this.isLoaded=true;this.isPostLoaded=false;return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrBoneImpl.prototype.absorbObject=function(obj,append){try{for(var method in obj){if(append&&typeof (obj[method])=="object"){if(typeof this[method]=="undefined"){this[method]={};}if(typeof this[method]=="object"){for(var value in obj[method]){this[method][value]=obj[method][value];}}}else{this[method]=obj[method];}}}catch(err){microstrategy.errors.log(err);}};mstrBoneImpl.prototype.updateFeatures=function(obj){try{var featuresObj=obj&&obj.features;if(featuresObj){for(var featureName in featuresObj){this.setFeature(featureName,featuresObj[featureName]);}}}catch(err){microstrategy.errors.log(err);}};mstrBoneImpl.prototype.setTimeout=function(condition,methodToExecute,timeOut){try{if(eval(condition)){eval(methodToExecute);}else{methodToExecute=methodToExecute.replace(/"/g,'\\"');condition=condition.replace(/"/g,'\\"');window.setTimeout('microstrategy.bone("'+this.id+'").setTimeout("'+condition+'", "'+methodToExecute+'",'+timeOut+");",timeOut);}}catch(err){microstrategy.errors.log(err);return false;}};mstrBoneImpl.prototype.isFeatureAvailable=function(name){try{var __result=true;if((this.features!=null)&&typeof (this.features[name])!="undefined"){__result=this.features[name];}return __result;}catch(err){microstrategy.errors.log(err);return false;}};mstrBoneImpl.prototype.hasFeatures=function(){try{for(var id in this.features){return true;}return false;}catch(err){microstrategy.errors.log(err);return false;}};mstrBoneImpl.prototype.setFeature=function(name,value){try{if(this.features!=null){this.features[name]=value;}}catch(err){microstrategy.errors.log(err);return false;}};mstrBoneImpl.prototype.attachWinListener=function(listener,eventName,callbackMethodName,replace){try{if((!listener.id||!microstrategy.bone(listener.id))){if(!listener.id&&listener.path){listener.id=listener.path;}mstr.controllers.Factory.add(listener);}if(!this.winListeners[listener.id]){this.winListeners[listener.id]={};}if(typeof (replace)=="undefined"||replace||(!this.winListeners[listener.id][eventName])){this.winListeners[listener.id][eventName]=callbackMethodName;if(typeof (mstr)!="undefined"){mstr.controllers.Factory.registerWindow(window);mstr.controllers.EventManager.attachWindowEventListener(listener,eventName,callbackMethodName);}}}catch(err){microstrategy.errors.log(err);return false;}};mstrBoneImpl.prototype.bindingEvents=function(t,e){if(typeof (mstr)!="undefined"){for(var i in e){this.attachWinListener(t,i,e[i].s);}}else{for(var i in e){document["on"+i]=new Function("e",e[i].a);}}};mstrBoneImpl.prototype.detachWinListener=function(listener,eventName){try{var listenerId=(listener.id)?listener.id:listener;if(!this.winListeners[listenerId]){return ;}if(eventName){mstr.controllers.EventManager.detachWindowEventListenerById(listenerId,eventName);delete this.winListeners[listenerId][eventName];}else{for(var event in this.winListeners[listenerId]){if(typeof (mstr)!="undefined"){mstr.controllers.EventManager.detachWindowEventListenerById(listenerId,event);}}delete this.winListeners[listenerId];}}catch(err){microstrategy.errors.log(err);return false;}};mstrBoneImpl.prototype.initEvent=function(e,mouse){e=e||window.event;if(e.e){e=e.e;}if(mouse){getMouse(e);}return e;};function mstrBoneImpl(id){try{this.isLoaded=false;this.inReload=false;this.isPostLoaded=false;this.primaryBone=false;this.features={};this.id=id;return this;}catch(err){microstrategy.errors.log(err);return false;}}