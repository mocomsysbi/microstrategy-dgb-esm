(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.gm.DndTooltip","mstrmojo.VisUtility","mstrmojo.vi.models.EnumDragSources");var $MOJO=mstrmojo,$DOM=$MOJO.dom,$VISUTIL=$MOJO.VisUtility,ENUM_SOURCE=$MOJO.vi.models.EnumDragSources,$ARR=$MOJO.array;mstrmojo.gm._SupportDndAsBlackBox=mstrmojo.provide("mstrmojo.gm._SupportDndAsBlackBox",{_mixinName:"mstrmojo.gm._SupportDndAsBlackBox",mainContainerNode:"domNode",handleDndForParentNode:true,dndAsBlackBox:true,allowDrop:function allowDrop(context){var dragData=context.src.data,dragSource=dragData&&dragData.src;if(dragSource===ENUM_SOURCE.DATASETS||dragSource===ENUM_SOURCE.VIZ_EDITOR||dragSource===ENUM_SOURCE.VIZ||dragSource===ENUM_SOURCE.ALL_OBJECT_LIST){return true;}return false;},cleanUpAfterTarget:function cleanUpAfterTarget(context){this._super(context);if(this.domNode.contains(this.dndHighlightCanvas)){this.domNode.removeChild(this.dndHighlightCanvas);}delete this.dndHighlightCanvas;if(this.dndTooltip){this.dndTooltip.destroy();}delete this.dndTooltip;},ondragenter:function ondragenter(context){if(this._super){this._super(context);}var isEmpty=this.isEmpty();if(isEmpty&&!this.excludeData){context.tgt.widget=this;this.raiseEvent({name:"toggleCtrlOverlay",visible:false,controls:this.getVisEmptyMsgControls()});}var node;if(!this.dndHighlightCanvas){var canvas=document.createElement("canvas"),widgetPos=$DOM.position(this.domNode),mainContainerPos=$DOM.position(this[this.mainContainerNode]);this.domNode.appendChild(canvas);canvas.style.position="absolute";canvas.style.zIndex=1000;canvas.width=mainContainerPos.w||widgetPos.w;canvas.height=mainContainerPos.h||widgetPos.h;canvas.style.top=(mainContainerPos.y-widgetPos.y)+"px";canvas.style.left=(mainContainerPos.x-widgetPos.x)+"px";this.dndHighlightCanvas=canvas;}if(!this.dndTooltip){node=document.createElement("div");document.body.appendChild(node);var props={placeholder:node,contentNodeCssClass:"gm-dnd-replace-node-tooltip",boundary:document.body};this.dndTooltip=new mstrmojo.gm.DndTooltip(props);this.dndTooltip.render();this.dndTooltip.parent=this;}this.ondragover(context);},ondragover:function ondragover(context){if(this._super){this._super(context);}if(this.dndAsBlackBox){this.clearHighlightDropZoneOnGraph();this.drawBlackBoxHighlight(context);}},ondragleave:function ondragleave(context){var isEmpty=this.isEmpty();if(isEmpty){this.raiseEvent({name:"toggleCtrlOverlay",visible:true,controls:this.getVisEmptyMsgControls()});}if(this._super){this._super(context);}},ondrop:function ondrop(context){if(this._super){this._super(context);}if(this.dndAsBlackBox){var zonesModel=this.zonesModel,dragData=context.src.data,items=dragData.items,dragSrc=context.getCtxtDragData().src;this.getDocModel().selectVIUnit(this.parent.id);zonesModel.addUnitsFromDataSource(items,dragData.dsid,context.actions,dragSrc===ENUM_SOURCE.ALL_OBJECT_LIST?context.callback:null);}},clearHighlightDropZoneOnGraph:function clearHighlightDropZoneOnGraph(){var canvas=this.dndHighlightCanvas,ctx=canvas.getContext("2d");ctx.clearRect(0,0,canvas.width,canvas.height);this.dndTooltip.toggle(false);},isMetric:function isMetric(item){return item&&item.t===4;},isAttrCategory:function isAttrCategory(item){return item&&(item.t===12||item.t===1||item.t===47);},singleTypeObject:function singleTypeObject(context){var attrCnt=0,metricCnt=0,me=this;$ARR.forEach(context.src.data.items,function(item){if(me.isAttrCategory(item)){attrCnt++;}else{if(me.isMetric(item)){metricCnt++;}}});return !(attrCnt>0&&metricCnt>0);},drawBlackBoxHighlight:function drawBlackBoxHighlight(context){var canvas=this.dndHighlightCanvas,ctx=canvas.getContext("2d"),mainContainerPos=$DOM.position(this[this.mainContainerNode]),widgetPos=$DOM.position(this.domNode),width=mainContainerPos.w||widgetPos.w,height=mainContainerPos.h||widgetPos.h,gapWidth=Math.min(30,0.25*width),gapHeight=Math.min(30,0.25*height);ctx.save();ctx.beginPath();ctx.rect(gapWidth,gapHeight,width-2*gapWidth,height-2*gapHeight);ctx.fillStyle="#bce8ff";ctx.globalAlpha=0.4;ctx.fill();ctx.strokeStyle="#34abeb";ctx.globalAlpha=1;$VISUTIL.drawDashLine(ctx,gapWidth,gapHeight,gapWidth,height-gapHeight,2,2);$VISUTIL.drawDashLine(ctx,gapWidth,gapHeight,width-gapWidth,gapHeight,2,2);$VISUTIL.drawDashLine(ctx,width-gapWidth,gapHeight,width-gapWidth,height-gapHeight,2,2);$VISUTIL.drawDashLine(ctx,gapWidth,height-gapHeight,width-gapWidth,height-gapHeight,2,2);ctx.restore();if(!this.singleTypeObject(context)){var dndTooltip=this.dndTooltip,mousePos={x:context.tgt.e.x,y:context.tgt.e.y,w:0,h:0},draggedItems=context.src.widget.avatar;if(draggedItems){mousePos=$DOM.position(draggedItems);}dndTooltip.placementOrder=[dndTooltip.PLACEMENT_ABOVE];dndTooltip.popupNodeOffset=5;dndTooltip.updateContent(null,mousePos,"Add Attributes and Metrics");}}});}());