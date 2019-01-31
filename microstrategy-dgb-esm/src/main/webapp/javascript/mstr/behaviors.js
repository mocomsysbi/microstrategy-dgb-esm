mstr.behaviors.FetchPreview=(function(){var FC={};FC.fireFetchCommand=function FC_fireFetchCommand(viewId,cmdId,cmdValue){var view=mstr.$obj(viewId);var model=view&&view.getModel();model&&model.execCommand(cmdId,cmdValue);};FC.on_set_enabled=function FC_on_set_enabled(view,model,rootTag){var enabled=view.props.enabled;var cells=rootTag.rows[0].cells;var cmds=[null,"FetchFirst","FetchPrevious",null,"FetchNext","FetchLast"];for(var i=0;i<cmds.length;i++){if(!cmds[i]){continue;}var en=enabled&&model&&model.queryCommandEnabled(cmds[i]);mstr.behaviors.ToolButtonRounded.markAsEnabled(cells[i].childNodes[0],en);}var elCaption=cells[0].childNodes[0];elCaption.disabled=!(model&&model.queryCommandEnabled("FetchBlock"));};FC.on_set_visible=function FC_on_set_visible(view,model,rootTag){var vis=!!view.props.visible;mstr.behaviors.Generic.set_css_display(rootTag,"table","none",vis);if(vis){this.updateCaption(view,model,rootTag);}};FC.on_model_set_readyState=function FC_on_model_set_readyState(view,model,rootTag){if(model&&model.get("readyState")==mstr.Enum.Widget.READYSTATE.IDLE){this.updateCaption(view,model,rootTag);}};FC.updateCaption=function FC_updateCaption(view,model,rootTag){var cells=rootTag.rows[0].cells,elPages=cells[3].childNodes[0];var s=(model&&parseInt(model.props.totalSize))||0;var bChangedTotalSize=(view.props.lastRenderedTotalSize!=s);if(bChangedTotalSize){this._renderTotalSize(view,model,rootTag,s);view.props.lastRenderedTotalSize=s;}var c=parseInt(model.props.blockCount)||0;var bChangedBlockCount=(view.props.lastRenderedBlockCount!=c);if(bChangedTotalSize||bChangedBlockCount){this._renderBlockList(view,model,rootTag,elPages,c,s);}if(s){var b=parseInt(model.props.blockBegin)||0;if(b&&b<=s){var j=parseInt(b/c);elPages.childNodes[0].rows[0].cells[j].className="Selected";}}};FC._renderTotalSize=function FC_renderTotalSize(view,model,rootTag,totalSize){var elCaption=rootTag.rows[0].cells[0].childNodes[0];elCaption.innerHTML=(view.props.captionPrefix||"")+" "+String(totalSize)+" "+(view.props.captionSuffix||"");};FC._renderBlockList=function FC_renderBlockList(view,model,rootTag,elPages,blockCount,totalSize){if(!totalSize||!blockCount||(blockCount<0)){elPages.innerHTML="";}else{var arrHtml=["<table><tr>"];var viewId=view.props.id;var tdPart1="<td onmouseover=\"return mstr.behaviors.FetchPreview.hoverpage(this, '"+viewId+"', ",tdPart2=')" onmouseout="return mstr.behaviors.FetchPreview.unhoverpage(this, \''+viewId+"')\"  onmousedown=\"return mstr.behaviors.FetchPreview.onmousedown(this, '"+viewId+"', ",tdPart3=')">',pageCounter=1;for(var i=1;i<=totalSize;i+=blockCount){arrHtml.push(tdPart1+i+tdPart2+i+tdPart3,+pageCounter+++"</td>");}arrHtml.push("</tr></table>");elPages.innerHTML=arrHtml.join("");}};FC.onmousedown=function FC_onmousedown(el,viewId,blockBegin){var view=mstr.$obj(this.timerCtxt.viewId);if(!view){return ;}view.fireCommands(null,blockBegin);this.unhoverpage(el,viewId);};FC.hoverpage=function FC_hoverpage(el,viewId,blockBegin){el.className+="Hover";if(!blockBegin){return true;}if(this.timerCtxt&&this.timerCtxt.id){self.clearTimeout(this.timerCtxt.id);}this.timerCtxt={action:"mouseover",blockBegin:blockBegin,viewId:viewId};var view=mstr.$obj(viewId);if(view&&view.props.showingPreview){this.timerCtxt.id=null;this.ontimeout();}else{this.timerCtxt.id=self.setTimeout("mstr.behaviors.FetchPreview.ontimeout()",100);}return true;};FC.unhoverpage=function FC_unhoverpage(el,viewId){el.className=el.className.replace("Hover","");if(this.timerCtxt&&this.timerCtxt.id){self.clearTimeout(this.timerCtxt.id);}this.timerCtxt={id:viewId?self.setTimeout("mstr.behaviors.FetchPreview.ontimeout()",100):null,action:"mouseout",viewId:viewId};return true;};FC.ontimeout=function FC_ontimeout(){if(this.timerCtxt&&this.timerCtxt.id){self.clearTimeout(this.timerCtxt.id);}var view=mstr.$obj(this.timerCtxt.viewId);if(!view){return ;}switch(this.timerCtxt&&this.timerCtxt.action){case"mouseover":view.props.showingPreview=true;view.fireCommands(view.props.showPreviewCmds,this.timerCtxt.blockBegin);break;default:view.props.showPreview=false;view.fireCommands(view.props.hidePreviewCmds);break;}};return FC;})();mstr.behaviors.Crosstab=(function(){var CT={};CT.on_set_visible=function CT_on_set_visible(view,model,rootTag){mstr.behaviors.Generic.set_css_display(rootTag,"block","none",view.props.visible&&!view.props.mask);};CT.on_preview_model_set_readyState=function CT_on_preview_set_readyState(view,model,rootTag){var cns=rootTag.childNodes,len=cns.length,elReadyState=cns[len-1];if(!model){return ;}var b=model.get("rowBlockBegin"),c=model.get("rowBlockCount"),pageNum=parseInt(b/c)+1;var readyState=model&&model.get("readyState");switch(readyState){case mstr.Enum.Widget.READYSTATE.WAITING:elReadyState.innerHTML="Page: "+pageNum+"<br />Updating...";break;case mstr.Enum.Widget.READYSTATE.IDLE:case mstr.Enum.Widget.READYSTATE.SUCCESS:elReadyState.innerHTML="Page: "+pageNum;break;default:elReadyState.innerHTML="Error generating preview.";break;}};CT.on_model_set_readyState=function CT_on_set_readyState(view,model,rootTag){var cns=rootTag.childNodes,len=cns.length,elReadyState=cns[len-2],elContents=cns[len-1];var readyState=model&&model.get("readyState");if(readyState==mstr.Enum.Widget.READYSTATE.IDLE){elReadyState.style.display="none";elContents.style.display="block";}else{elReadyState.style.display="block";elContents.style.display="none";switch(readyState){case mstr.Enum.Widget.READYSTATE.WAITING:case mstr.Enum.Widget.READYSTATE.SUCCESS:elReadyState.innerHTML="Loading...";break;case mstr.Enum.Widget.READYSTATE.CANCELLED:elReadyState.innerHTML="Request cancelled.";break;case mstr.Enum.Widget.READYSTATE.TIMEOUT:elReadyState.innerHTML="Request timed out.";break;case mstr.Enum.Widget.READYSTATE.ERROR:default:elReadyState.innerHTML="Error fetching data.";break;}}};return CT;})();