(function(){mstrmojo.requiresCls("mstrmojo.dom");var $DOM=mstrmojo.dom;mstrmojo._FillsBrowser=mstrmojo.provide("mstrmojo._FillsBrowser",{_mixinName:"mstrmojo._FillsBrowser",getBrowserDimensions:function getBrowserDimensions(hWin){if(hWin){return{w:hWin.innerWidth,h:hWin.innerHeight};}var winDim=$DOM.windowDim(),browserOffset=($DOM.isFF||$DOM.isWK)?0:2;return{w:Math.max(winDim.w,0)+"px",h:Math.max(winDim.h-browserOffset,0)+"px"};},preBuildRendering:function preBuildRendering(){var rtn=this._super(),browserDimensions=this.getBrowserDimensions();if(!this.browserResized||this.browserResized(browserDimensions)!==true){this.height=browserDimensions.h;this.width=browserDimensions.w;}if(!this._listenerProc){var id=this.id,timeoutId=null,fn=this._listenerProc=function(e){if(mstrApp&&mstrApp.isExporting){var evt=e||window.event;mstrmojo.all[id].monitorWindow(evt);}else{window.clearTimeout(timeoutId);timeoutId=window.setTimeout(function(){var evt=e||window.event;mstrmojo.all[id].monitorWindow(evt);},150);}};$DOM.attachEvent(window,"resize",fn);}return rtn;},destroy:function destroy(ignoreDom){if(this._listenerProc){$DOM.detachEvent(window,"resize",this._listenerProc);}this._super(ignoreDom);},getResizeDimensions:function getResizeDimensions(evt){var currentTarget=evt.currentTarget,browserDimensions=this.getBrowserDimensions(),size={w:(currentTarget?currentTarget.innerWidth+"px":browserDimensions.w),h:(currentTarget?currentTarget.innerHeight+"px":browserDimensions.h)};return size;},monitorWindow:function monitorWindow(evt){var size=this.getResizeDimensions(evt);if((size.h===this.height&&size.w===this.width)||parseInt(size.h,10)<=20||parseInt(size.w,10)<=20){return ;}if(!this.browserResized||this.browserResized(size,true)!==true){if(size.h!==this.height){this.set("height",size.h);}if(size.w!==this.width){this.set("width",size.w);}}}});}());