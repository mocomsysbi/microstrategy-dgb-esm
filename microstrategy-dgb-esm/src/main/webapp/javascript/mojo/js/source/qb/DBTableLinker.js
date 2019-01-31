(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo.dom","mstrmojo.array","mstrmojo.hash");mstrmojo.requiresDescs(8126);var $D=mstrmojo.dom,$H=mstrmojo.hash,$A=mstrmojo.array,$LINKER,$ENUM_JOIN_TYPE=mstrmojo.qb.EnumJoinTypes,$ENUM_DATA_CHANGE_EVENTS=mstrmojo.qb.EnumDataChangeEvents,SUPPORTS_CANVAS,CANVAS_WIDTH=1500,CANVAS_HEIGHT=900;function createVMLFrameElement(){var vmlRectangle=document.createElement("v:rect"),vmlRectangleStyle=vmlRectangle.style;vmlRectangle.setAttribute("id","vmlFrame");vmlRectangle.setAttribute("stroke","true");vmlRectangle.setAttribute("strokecolor","red");vmlRectangleStyle.width=this.width;vmlRectangleStyle.height=this.height;vmlRectangleStyle.zindex="-1";document.getElementById("vmlCanvas").appendChild(vmlRectangle);}function createVMLElement(){var pixelWidth=parseInt(this.width,10),pixelHeight=parseInt(this.height,10),vmlGroup=document.createElement("v:group"),vmlGroupStyle=vmlGroup.style;vmlGroup.setAttribute("id","vmlCanvas");vmlGroup.setAttribute("coordorigin","0, 0");vmlGroup.setAttribute("coordsize",pixelWidth+", "+pixelHeight);vmlGroupStyle.width=this.width;vmlGroupStyle.height=this.height;this.domNode.appendChild(vmlGroup);createVMLFrameElement.call(this);}function clearHighLightCanvas(){this.highlight.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);this.hl_link=null;this.highlight.beginPath();}function clearLinks(){if(SUPPORTS_CANVAS){var context=this.context;context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);context.beginPath();}else{var canvas=document.getElementById("vmlCanvas");if(canvas&&canvas.hasChildNodes()){while(canvas.childNodes.length>=1){canvas.removeChild(canvas.firstChild);}createVMLFrameElement.call(this);}}clearHighLightCanvas.call(this);}function highLightLink(linkID){if(SUPPORTS_CANVAS){if(this.hl_link&&this.hl_link!==linkID){clearHighLightCanvas.call(this);}var linkMarker=this.linksInfo[linkID].marker,context=this.highlight,ARC=Math.PI*2;this.hl_link=linkID;context.strokeStyle="blue";$A.forEach(linkMarker,function(position){context.beginPath();context.arc(position.x,position.y,3,0,ARC,true);context.closePath();context.stroke();});}}function drawLine(x1,y1,x2,y2){if(SUPPORTS_CANVAS){var context=this.context=this.context||this.canvas.getContext("2d");context.moveTo(x1,y1);context.lineTo(x2,y2);}else{var line=document.createElement("v:line");line.setAttribute("from",[x1," ",y1].join(""));line.setAttribute("to",[x2," ",y2].join(""));document.getElementById("vmlCanvas").appendChild(line);}}function inPoly(poly,px,py){var polygonPoints=poly.length,newX,newY,oldX,oldY,x1,y1,x2,y2,i,inside=false;if(polygonPoints/2<3){return false;}oldX=poly[polygonPoints-2];oldY=poly[polygonPoints-1];for(i=0;i<polygonPoints;i=i+2){newX=poly[i];newY=poly[i+1];if(newX>oldX){x1=oldX;x2=newX;y1=oldY;y2=newY;}else{x1=newX;x2=oldX;y1=newY;y2=oldY;}if((newX<px)===(px<=oldX)&&((py-y1)*(x2-x1)<(y2-y1)*(px-x1))){inside=!inside;}oldX=newX;oldY=newY;}return inside;}function getRelationLink(x,y){var returnVal=null;$H.forEach(this.linksInfo,function(link,elem){if(inPoly(link.coords,x,y)){returnVal=elem;return false;}return true;},this);return returnVal;}mstrmojo.qb.DBTableLinker=mstrmojo.declare(mstrmojo.Widget,null,{scriptClass:"mstrmojo.qb.DBTableLinker",markupString:'<div id="{@id}" class="mstrmojo-DBTableLinker" mstrAttach:click><canvas height="'+CANVAS_HEIGHT+'" width="'+CANVAS_WIDTH+'"></canvas><canvas height="'+CANVAS_HEIGHT+'" width="'+CANVAS_WIDTH+'"></canvas></div>',markupMethods:{onvisibleChange:function onvisibleChange(){this.domNode.style.display=(this.visible)?"block":"none";},onheightChange:function onheightChange(){this.domNode.style.height=this.height||"";},onwidthChange:function onwidthChange(){this.domNode.style.width=this.width||"";}},markupSlots:{canvas:function canvas(){return this.domNode.firstChild;},highlightCanvas:function highlightCanvas(){return this.domNode.childNodes[1];}},init:function init(props){this._super(props);this.linksInfo={};var evtConfig={},linkerConfig=evtConfig[this.id]={};},postBuildRendering:function postBuildRendering(){this._super();var canvas=this.canvas;if(SUPPORTS_CANVAS===undefined){SUPPORTS_CANVAS=canvas&&canvas.getContext&&canvas.getContext("2d");}if(SUPPORTS_CANVAS){this.context=canvas.getContext("2d");this.highlight=this.highlightCanvas.getContext("2d");}else{if($D.isIE8){createVMLElement.call(this);}else{this.renderErrorMessage(mstrmojo.desc(8126));}}},handleClick:function handleClick(evt){var pos=$D.position(this.domNode),x=evt.clientX,y=evt.clientY,linkID=getRelationLink.call(this,x-pos.x,y-pos.y);if(linkID){highLightLink.call(this,linkID);var linkInfo=this.linksInfo[linkID];$LINKER.showPopupMenu(this,{data:$H.copy({columnIndex:linkInfo.columnIndex,isChecked:function isChecked(data,item){return(data.type===item.type);}},linkInfo.joinObj),pos:{x:x+2,y:y+2}});}else{clearHighLightCanvas.call(this);}},drawLinks:function drawLinks(evt){clearLinks.call(this);var joinInfos=this.joins=evt?evt.joins:this.joins,canvasPosition=$D.position(this.domNode),MARGIN=8;var me=this,sourceTableWidget,targetTableWidget,sourceRowContainer,targetRowContainer,sourcePos,targetPos,sourceX,sourceY,targetX,targetY,isSourceLeftToTarget,padding,type,isSourceArrow,isTargetArrow,count=0,tables=this.parent.tableContainer.children,getTableWidget=function getTableWidget(tables,tableId){var tableWidget=null;$A.forEach(tables,function(table){if(table.tableData.id===tableId){tableWidget=table;return false;}});return tableWidget;},linksInfo=me.linksInfo={};$A.forEach(joinInfos,function(joinInfo){sourceTableWidget=getTableWidget(tables,joinInfo.sourceTable);targetTableWidget=getTableWidget(tables,joinInfo.targetTable);type=joinInfo.type;if(sourceTableWidget&&targetTableWidget){$A.forEach(joinInfo.links,function(link,index){sourceRowContainer=sourceTableWidget.rows.getRowNode("did",link.source.did);targetRowContainer=targetTableWidget.rows.getRowNode("did",link.target.did);sourcePos=$D.position(sourceRowContainer);targetPos=$D.position(targetRowContainer);sourceX=sourcePos.x+sourceRowContainer.clientWidth-canvasPosition.x;sourceY=sourcePos.y+0.5*sourceRowContainer.clientHeight-canvasPosition.y;targetX=targetPos.x-canvasPosition.x;targetY=targetPos.y+0.5*targetRowContainer.clientHeight-canvasPosition.y;isSourceLeftToTarget=sourceX<targetX;padding=isSourceLeftToTarget?MARGIN:-MARGIN;sourceX-=isSourceLeftToTarget?0:sourcePos.w;targetX+=isSourceLeftToTarget?0:targetPos.w;linksInfo[count++]={joinObj:joinInfo,columnIndex:index,coords:[sourceX+MARGIN,sourceY+MARGIN,sourceX+MARGIN,sourceY-MARGIN,targetX-MARGIN,targetY-MARGIN,targetX-MARGIN,targetY+MARGIN],marker:[{x:sourceX,y:sourceY},{x:sourceX+MARGIN,y:sourceY},{x:targetX-MARGIN,y:targetY},{x:targetX,y:targetY}]};drawLine.call(me,sourceX,sourceY,sourceX+padding,sourceY);drawLine.call(me,sourceX+padding,sourceY,targetX-padding,targetY);drawLine.call(me,targetX-padding,targetY,targetX,targetY);isSourceArrow=type===$ENUM_JOIN_TYPE.OUTER||type===$ENUM_JOIN_TYPE.RIGHT;isTargetArrow=type===$ENUM_JOIN_TYPE.OUTER||type===$ENUM_JOIN_TYPE.LEFT;padding=padding/2;if(isSourceArrow){drawLine.call(me,sourceX,sourceY,sourceX+padding,sourceY+padding);drawLine.call(me,sourceX,sourceY,sourceX+padding,sourceY-padding);}if(isTargetArrow){drawLine.call(me,targetX-padding,targetY-padding,targetX,targetY);drawLine.call(me,targetX-padding,targetY+padding,targetX,targetY);}});}});if(SUPPORTS_CANVAS){this.context.stroke();}}});$LINKER=mstrmojo.qb.DBTableLinker;$LINKER.showPopupMenu=function showPopMenu(linkerWidget,linkInfo){var contextMenu=$LINKER.linkMenu;if(!contextMenu){contextMenu=$LINKER.linkMenu=mstrmojo.insert({scriptClass:"mstrmojo.qb.JoinMenu",zIndex:45});}contextMenu.set("cmPos",linkInfo.pos);contextMenu.target=linkerWidget;contextMenu.data=linkInfo.data;contextMenu.domNode=linkerWidget.domNode;contextMenu.showContextMenu();};}());