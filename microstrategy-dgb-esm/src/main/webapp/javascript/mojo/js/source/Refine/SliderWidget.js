(function(){mstrmojo.requiresCls("mstrmojo.Widget");mstrmojo.Refine.SliderWidget=mstrmojo.declare(mstrmojo.Widget,null,{scriptClass:"mstrmojo.Refine.SliderWidget",sliderNode:null,options:null,range:{min:0,max:1,step:1,from:0,to:0},drag:null,postCreate:function(){var self=this;this._mouseMoveHandler=function(evt){return self._onMouseMove(evt);};this._mouseUpHandler=function(evt){return self._onMouseUp(evt);};this.initializeUI();this.updateRange();},initializeUI:function(){var self=this;this.leftTintedRect=document.createElement("div");this.leftTintedRect.className="slider-widget-tint left";this.sliderNode.appendChild(this.leftTintedRect);this.rightTintedRect=document.createElement("div");this.rightTintedRect.className="slider-widget-tint right";this.sliderNode.appendChild(this.rightTintedRect);this.highlightRect=document.createElement("div");this.highlightRect.className="slider-widget-highlight slider-widget-draggable";this.highlightRect.setAttribute("part","highlight");this.sliderNode.appendChild(this.highlightRect);this.highlightRect.addEventListener("mousedown",function(evt){return self._onMouseDown(evt,this.getAttribute("part"));},false);this.leftBracket=document.createElement("div");this.leftBracket.className="slider-widget-bracket slider-widget-draggable left";this.leftBracket.setAttribute("part","left");this.sliderNode.appendChild(this.leftBracket);this.leftBracket.addEventListener("mousedown",function(evt){return self._onMouseDown(evt,this.getAttribute("part"));},false);this.rightBracket=document.createElement("div");this.rightBracket.className="slider-widget-bracket slider-widget-draggable right";this.rightBracket.setAttribute("part","right");this.sliderNode.appendChild(this.rightBracket);this.rightBracket.addEventListener("mousedown",function(evt){return self._onMouseDown(evt,this.getAttribute("part"));},false);},_onMouseDown:function(evt,part){if(this.drag){return ;}document.addEventListener("mousemove",this._mouseMoveHandler,false);document.addEventListener("mouseup",this._mouseUpHandler,false);var overlay=document.createElement("div");overlay.className="slider-widget-overlay";document.body.appendChild(overlay);this.drag={sureDrag:false,overlay:overlay};if("highlight"===part){this.drag.elmt=this.highlightRect;this.drag.value=this.range.from;this.drag.overlay.style.cursor="move";}else{if("left"===part){this.drag.elmt=this.leftBracket;this.drag.overlay.style.cursor="e-resize";}else{if("right"===part){this.drag.elmt=this.rightBracket;this.drag.overlay.style.cursor="w-resize";}}}this.drag.what=part;this.drag.from=this.range.from;this.drag.to=this.range.to;this.drag.down={x:evt.pageX,y:evt.pageY};},_onMouseUp:function(){if(!(this.drag)){return ;}document.removeEventListener("mousemove",this._mouseMoveHandler,false);document.removeEventListener("mouseup",this._mouseUpHandler,false);if(this.drag.sureDrag){this.updateRange();this.trigger("stop");}document.body.removeChild(this.drag.overlay);this.drag=null;},_onMouseMove:function(evt){if(!(this.drag)){return true;}var drag=this.drag;var range=this.range;var xDiff=evt.pageX-drag.down.x;if(Math.abs(xDiff)>=2){drag.sureDrag=true;}var pixelWidth=this.sliderNode.clientWidth;var scale=pixelWidth/(range.max-range.min);var vDiff=xDiff/scale;var adjustFrom=function(){range.from=drag.from+Math.floor(vDiff/range.step)*range.step;range.from=Math.max(Math.min(range.from,range.max),range.min);};var adjustTo=function(){range.to=drag.to+Math.floor(vDiff/range.step)*range.step;range.to=Math.max(Math.min(range.to,range.max),range.min);};if(drag.what==="left"){adjustFrom();range.to=Math.min(Math.max(range.to,range.from+range.step),range.max);}else{if(drag.what==="right"){adjustTo();range.from=Math.max(Math.min(range.from,range.to-range.step),range.min);}else{adjustFrom();adjustTo();}}this.updateRange();this.trigger("slide");evt.preventDefault();return false;},trigger:function(eventaName){this.parent.raiseEvent({name:eventaName,from:this.range.from,to:this.range.to});},updateRange:function(){var range=this.range;var pixelWidth=this.sliderNode.clientWidth;var scale=pixelWidth/(range.max-range.min);var valueToPixel=function(x){return(x-range.min)*scale;};var fromPixel=Math.floor(valueToPixel(range.from));var toPixel=Math.floor(valueToPixel(range.to));if(range.from===range.min&&range.to===range.max){this.leftTintedRect.style.display="none";this.rightTintedRect.style.display="none";}else{this.leftTintedRect.style.display="block";this.leftTintedRect.style.width=fromPixel+"px";this.rightTintedRect.style.display="block";this.rightTintedRect.style.width=(pixelWidth-toPixel)+"px";}this.highlightRect.style.width=(toPixel-fromPixel)+"px";this.highlightRect.style.left=fromPixel+"px";this.leftBracket.style.left=fromPixel+"px";this.rightBracket.style.left=toPixel+"px";},update:function(min,max,step,from,to){if(step<=0){step=1;}max=Math.max(max,min+step);from=from!==null?Math.max(min,from):min;to=to!==null?Math.min(max,to):max;this.range={min:min,max:max,step:step,from:from,to:to};this.updateRange();}});}());