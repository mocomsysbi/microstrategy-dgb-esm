(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo.hash");function animatePage(start,stop,duration,props){var cfg=mstrmojo.hash.copy(props,{props:{left:{isStyle:true,start:start,stop:stop,suffix:"px",ease:mstrmojo.ease.linear}},duration:duration});(new mstrmojo.fx.AnimateProp(cfg)).play();}function turnPage(me,curr,prev,direction){var dn=me.domNode,sw=dn.offsetWidth,sif=me.scrollableIncFetch;var animate=me.hasAnimation&&(!(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))||Number(RegExp.$1)>3.5),d=direction?1:-1,wf=parseInt(sw,10)*d,duration=animate?500:0;animatePage(0,-wf,duration,{target:prev,duration:duration,preStart:function(){this.target.style.overflowY="hidden";},onEnd:function(){this.target.style.display="none";}});animatePage(wf,0,duration,{target:curr,preStart:function(){this.target.style.display="block";this.target.style.overflowY=(sif?"visible":"auto");}});if(me.waiting){animatePage(0,-wf,duration,{widget:me,slot:"loaderNode",onEnd:function(){this.widget.waiting=false;}});}}var logicPageSwitch=function(me){var cp=me.currentPage;if(cp===me.p1Node){cp=me.p2Node;}else{cp=me.p1Node;}me.currentPage=cp;};mstrmojo.Booklet=mstrmojo.declare(mstrmojo.Widget,null,{scriptClass:"mstrmojo.Booklet",pageClass:"mstrmojo-BookletPage",markupString:'<div id="{@id}" class="mstrmojo-Booklet {@cssClass}" style="{@cssText}"><div id="{@id}_p1" class="mstrmojo-BookletPage" ></div><div id="{@id}_p2" class="mstrmojo-BookletPage" style="left:-100%;"></div><div id="{@id}_ldr" class="mstrmojo-BookletLoader" ></div></div>',markupSlots:{containerNode:function(){return this.domNode;},p1Node:function(){return this.domNode.firstChild;},p2Node:function(){return this.domNode.childNodes[1];},loaderNode:function(){return this.domNode.childNodes[2];}},markupMethods:{onnextChange:function(){var n=this.next;if(!n){return ;}var prev=this.currentPage,p1=this.p1Node,curr=this.currentPage=(prev==p1)?this.p2Node:p1;if(!(n instanceof mstrmojo.Obj)){n=this.next=mstrmojo.insert(n);}if(!n.hasRendered){n.placeholder=curr.appendChild(document.createElement("span"));n.render();}else{if(curr.firstChild){curr.replaceChild(n.domNode,curr.firstChild);}else{curr.appendChild(n.domNode);}}this.set("waiting",false);if(curr&&prev){turnPage(this,curr,prev,this.turnDirFwd);}else{if(this.scrollableIncFetch){curr.style.overflowY="visible";}}},onwaitingChange:function(evt){this.loaderNode.style.left=(this.waiting)?0:"-100%";},onheightChange:function(evt){if(this.height){this.domNode.style.height=this.height;}},onwidthChange:function(evt){if(this.width){this.domNode.style.width=this.width;}}},enabled:true,waiting:false,next:null,currentPage:null,turnDirFwd:true,hasAnimation:true,scrollableIncFetch:false,FORWARD:true,REVERSE:false,turnFwd:function(w){this.turn(w,this.FORWARD);},turnBack:function(w){this.turn(w,this.REVERSE);},turn:function(w,direction){this.set("turnDirFwd",direction);this.set("next",w);}});})();