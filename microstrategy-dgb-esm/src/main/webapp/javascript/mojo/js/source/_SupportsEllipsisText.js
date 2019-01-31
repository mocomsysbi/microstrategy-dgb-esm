(function(){mstrmojo.requiresCls("mstrmojo.css","mstrmojo.dom");var $DOM=mstrmojo.dom,$POS=$DOM.position,$MTH=Math;function getCloneInfo(key,srcNode,isMultiLine){var ellCollection=this._ellTestNodes||{},info=ellCollection[key],compStyle=mstrmojo.css.getComputedStyle(srcNode),dimensions=["width","height"];if(isMultiLine){dimensions.reverse();}var testDimension=dimensions[0],oppositeDimension=dimensions[1];if(!info||!$DOM.contains(this.domNode,info.n,true,document.body)){var node=srcNode.cloneNode(true);node.removeAttribute("id");node.removeAttribute("onclick");var nodeStyle=node.style;nodeStyle.position="absolute";nodeStyle.top="-10000px";nodeStyle.maxHeight=nodeStyle.maxWidth="none";nodeStyle[testDimension]="auto";srcNode.parentNode.appendChild(node);var max=parseInt(compStyle["max-"+testDimension],10);if(isNaN(max)){max=parseInt(compStyle[testDimension],10);}info=ellCollection[key]={n:node,m:max,d:testDimension.substr(0,1)};if(info.m>0){this._ellTestNodes=ellCollection;}}else{info.n.innerHTML=srcNode.innerHTML;}info.n.style[oppositeDimension]=compStyle[oppositeDimension];return info;}function addEllipsis(textArray,length){var ellipsisText=this.ellipsisText;switch(this.ellipsisPosition){case"middle":var mid=$MTH.floor(length/2);return textArray.slice(0,mid).join("")+ellipsisText+textArray.slice(-mid).join("");case"end":return textArray.slice(0,length).join("")+ellipsisText;default:return textArray.join("");}}var COMPARE_THRESHOLD=4;mstrmojo._SupportsEllipsisText=mstrmojo.provide("mstrmojo._SupportsEllipsisText",{_mixinName:"mstrmojo._SupportsEllipsisText",ellipsisText:"\u2026",ellipsisPosition:"end",ellipsize:function ellipsize(key,element,isMultiLine){var text=element.innerHTML;if(!text){return false;}var info=getCloneInfo.call(this,key,element,isMultiLine),fnTestFit=function(){var cloneDimension=$POS(info.n)[info.d];return(cloneDimension<=info.m);};if(fnTestFit()){return false;}var node=info.n,textArray=text.split(""),low=0,high=textArray.length,ellipsizedText,x;while(low<high){var mid=$MTH.floor((low+high)/2);text=node.innerHTML=addEllipsis.call(this,textArray,mid);if(fnTestFit()){low=mid+1;}else{high=mid-1;}if(high-low<COMPARE_THRESHOLD){for(x=low-1;x<high+1;x++){text=node.innerHTML=addEllipsis.call(this,textArray,x);if(!fnTestFit()){break;}ellipsizedText=text;}}if(ellipsizedText){element.innerHTML=ellipsizedText;break;}}return true;},ellipsizeElements:function truncating(key,element,isMultiLine){var info=getCloneInfo.apply(this,arguments),fnTestFit=function(){var cloneDimension=$POS(info.n)[info.d];return(cloneDimension<=info.m);};if(fnTestFit()){return false;}var ellipsisText=this.ellipsisText;var me=this;var ellipsisNode=document.createElement("span");ellipsisNode.innerHTML=ellipsisText;var fnAddEllipsisNode=function(nodeArray,length){var nodes=nodeArray.slice(0,length).concat([ellipsisNode]);var dummyNode=document.createElement("div");for(var i=0;i<nodes.length;i++){dummyNode.appendChild(nodes[i]);}return dummyNode.innerHTML;};var fnBinarySearch=function(node,childArray,fnAddEllipsis,isTextNode){var low=0,high=childArray.length,ellipsizedText,text,x;var fnRemoveAllChildren=function(node){while(node.hasChildNodes()){node.removeChild(node.lastChild);}};while(low<high){var mid=$MTH.floor((low+high)/2);if(isTextNode){text=fnAddEllipsis.call(me,childArray,mid);node.nodeValue=text;}else{fnRemoveAllChildren(node);text=fnAddEllipsis.call(me,childArray,mid);node.innerHTML=text;}if(fnTestFit()){low=mid+1;}else{high=mid-1;}if(high-low<COMPARE_THRESHOLD){x=low==0?0:low-1;for(;x<high+1;x++){if(isTextNode){text=fnAddEllipsis.call(me,childArray,x);node.nodeValue=text;}else{fnRemoveAllChildren(node);text=fnAddEllipsis.call(me,childArray,x+1);node.innerHTML=text;}if(!fnTestFit()){if(!isTextNode){node.removeChild(node.lastChild);ellipsizedText=text=node.innerHTML;}break;}if(!isTextNode){node.removeChild(node.lastChild);text=node.innerHTML;}ellipsizedText=text;}}if(ellipsizedText){if(isTextNode){node.nodeValue=ellipsizedText;}else{node.innerHTML=ellipsizedText;}break;}}};var fnTruncating=function(node){if(node.nodeType==3){var text=node.nodeValue;if(!text){return false;}fnBinarySearch(node,text.split(""),addEllipsis,true);return true;}else{var children=node.childNodes;if(!children||children.length===0){return false;}var nodeArray=[];for(var i=0;i<children.length;i++){nodeArray[i]=children[i];}if(nodeArray.length!=1||nodeArray[0].nodeType!=3){fnBinarySearch(node,nodeArray,fnAddEllipsisNode,false);}return fnTruncating(node.lastChild);}};element.style.visibility="visible";info.n.style.visibility="hidden";fnTruncating(info.n);element.style.visibility="hidden";info.n.style.visibility="visible";return true;},unrender:function unrender(ignoreDom){delete this._ellTestNodes;this._super(ignoreDom);}});}());