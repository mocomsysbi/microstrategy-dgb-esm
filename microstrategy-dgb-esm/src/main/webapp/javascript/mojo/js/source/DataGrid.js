(function(){mstrmojo.requiresCls("mstrmojo.dnd","mstrmojo.ui._HasScroller","mstrmojo.DI.DIConstants");var constants=mstrmojo.DI.DIConstants;function _createAvatar(w){var d=document.createElement("div"),s=d.style,dn=w.domNode;d.className="mstrmojo-DataGrid-avatar";s.height=dn.clientHeight+"px";dn.appendChild(d);w.avatar=d;return d;}function _getMyX(w){var p=mstrmojo.dom.position(w.domNode,true);return p.x;}function _RHString(i){return'<div class="mstrmojo-DataGrid-resizeHandle" unselectable="on" onselectstart="return false" rh="'+i+'"></div>';}function _getRHIndex(t){var rs=t.getAttribute("rh"),result=rs&&parseInt(rs,10);return result;}function _doNothing4Resizing(w,_super,ctxt){var s=ctxt.src,d=s&&s.data,rsIdx=d&&d.resizingIdx;if(!(rsIdx&&rsIdx>0)){return _super&&_super.apply(w,[ctxt]);}}mstrmojo.RESIZE_NEXT_COLUMN_MODE={getRange:function _getRange(me,rsIdx){var sa=me.colSizeArray;var range=[-sa[rsIdx-1]+me.minColWidth,(rsIdx==sa.length-1)?sa[rsIdx]-me.resizeHandleWidth-me.minColWidth:sa[rsIdx]-me.minColWidth];return range;},updateSize:function _updateSize(me,rsIdx,deltaX){var sa=me.colSizeArray;sa[rsIdx-1]=sa[rsIdx-1]+deltaX;sa[rsIdx]=sa[rsIdx]-deltaX;},updateColumnWidth:function _updateColumnWidth(me,cls,dcls,rsIdx){var sa=me.colSizeArray;cls[rsIdx-1].style.width=sa[rsIdx-1]+"px";dcls[rsIdx-1].style.width=sa[rsIdx-1]+"px";cls[rsIdx].style.width=sa[rsIdx]+"px";dcls[rsIdx].style.width=sa[rsIdx]+"px";}};mstrmojo.RESIZE_ALL_COLUMN_MODE={getRange:function _getRange(me,rsIdx){var mw=me.minColWidth+me.resizeHandleWidth,sa=me.colSizeArray,rr=0;for(var i=rsIdx;i<sa.length;++i){rr+=sa[i]-mw;}var range=[-sa[rsIdx-1]+mw,rr];return range;},updateSize:function _updateSize(me,rsIdx,deltaX){var mw=me.minColWidth+me.resizeHandleWidth,sa=me.colSizeArray;sa[rsIdx-1]=sa[rsIdx-1]+deltaX;var ia=[];for(var i=0;i<sa.length-rsIdx;++i){ia[i]=rsIdx+i;}ia.sort(function(x,y){return sa[x]-sa[y];});for(var i=0;i<ia.length;++i){var sdx=deltaX/(ia.length-i);var ccw=sa[ia[i]];deltaX-=(ccw>=sdx+mw)?sdx:ccw-mw;sa[ia[i]]=(ccw>=sdx+mw)?ccw-sdx:mw;}},updateColumnWidth:function _updateColumnWidth(me,cls,dcls,rsIdx){var sa=me.colSizeArray;for(var i=rsIdx-1;i<sa.length;++i){cls[i].style.width=sa[i]+"px";dcls[i].style.width=sa[i]+"px";}}};mstrmojo.RESIZE_CURRENT_COLUMN_MODE={getRange:function _getRange(me,rsIdx){var mw=me.minColWidth+me.resizeHandleWidth,sa=me.colSizeArray,rr=0;for(var i=rsIdx;i<sa.length;++i){rr+=sa[i]-mw;}var range=[-sa[rsIdx-1]+mw,rr];return range;},updateSize:function _updateSize(me,rsIdx,deltaX){var sa=me.colSizeArray;sa[rsIdx-1]=sa[rsIdx-1]+deltaX;},updateColumnWidth:function _updateColumnWidth(me,cls,dcls,rsIdx){var sa=me.colSizeArray;cls[rsIdx-1].style.width=sa[rsIdx-1]+"px";dcls[rsIdx-1].style.width=sa[rsIdx-1]+"px";me.widgetResized();}};mstrmojo._CanResizeColumn=mstrmojo.provide("mstrmojo._CanResizeColumn",{draggable:true,dropZone:false,avatar:null,colSizeArray:null,resizableColumns:true,resizeHandleWidth:10,minColWidth:5,resizeColumnBehavior:mstrmojo.RESIZE_NEXT_COLUMN_MODE,createColSizeArray:function createColSizeArray(){var sa,hc,ht,cls,i,len;hc=this.headerContainerNode;ht=hc&&hc.getElementsByTagName("table")[0];cls=ht.rows[0].cells;sa=[];for(i=0,len=cls.length;i<len;i++){sa.push(cls[i].offsetWidth);}return sa;},postBuildRendering:function postBuildRendering(){if(this._super){this._super();}if(this.avatar){this.domNode.appendChild(this.avatar);}this.colSizeArray=null;},getDragData:function getDragData(ctxt){var s=ctxt.src,n=s.node,rsIdx=_getRHIndex(n);if(rsIdx&&rsIdx>0){return{resizingIdx:rsIdx,startingX:s.pos.x,baseX:_getMyX(this)};}if(this._super){return this.dropZone&&this._super(ctxt);}return null;},allowDrop:function allowDrop(ctxt){var s=ctxt.src,d=s&&s.data,rsIdx=d&&d.resizingIdx;if(rsIdx&&rsIdx>0){return true;}return this.dropZone;},ondragenter:function ondragenter(ctxt){_doNothing4Resizing(this,this._super,ctxt);},ondragover:function ondragover(ctxt){_doNothing4Resizing(this,this._super,ctxt);},ondragleave:function ondragleave(ctxt){_doNothing4Resizing(this,this._super,ctxt);},ondrop:function ondrop(ctxt){_doNothing4Resizing(this,this._super,ctxt);},isDragValid:function isDragValid(context){var s=context.src,d=s&&s.data,rsIdx=d&&d.resizingIdx;if(rsIdx&&rsIdx>0){return true;}if(this._super){return this._super(context);}return false;},ondragstart:function ondragstart(ctxt){var s=ctxt.src,d=s&&s.data,rsIdx=d&&d.resizingIdx;if(rsIdx&&rsIdx>0){var a=this.avatar||_createAvatar(this);this.ownAvatar=true;a.style.left=(d.startingX-d.baseX)+"px";a.style.display="block";document.body.style.cursor="col-resize";if(!this.colSizeArray){this.colSizeArray=this.createColSizeArray();this._firstTimeResize=true;}d.resizingRange=this.resizeColumnBehavior.getRange(this,rsIdx);return ;}if(this._super){this._super(ctxt);}},ondragmove:function ondragmove(ctxt){var s=ctxt.src,d=s&&s.data,rsIdx=d&&d.resizingIdx;if(rsIdx&&rsIdx>0){var t=ctxt.tgt,a=this.avatar,rg=d.resizingRange,mx=t.pos.x-d.startingX,deltaX=Math.min(rg[1],Math.max(mx,rg[0]));d.deltaX=deltaX;if(a){a.style.left=(d.startingX-d.baseX+deltaX)+"px";}}else{if(this._super){this._super(ctxt);}}},ondragend:function ondragend(ctxt){var s=ctxt.src,d=s&&s.data,rsIdx=d&&d.resizingIdx;if(rsIdx&&rsIdx>0){var cg=this.titleColGroup,cls=cg&&cg.childNodes,dcg=this.dataColGroup,dcls=dcg&&dcg.childNodes,len=cls.length,sa=this.colSizeArray,deltaX=d.deltaX;this.resizeColumnBehavior.updateSize(this,rsIdx,deltaX);if(this._firstTimeResize){var i;for(i=0;i<len;i++){cls[i].style.width=sa[i]+"px";dcls[i].style.width=sa[i]+"px";}this._firstTimeResize=false;}else{this.resizeColumnBehavior.updateColumnWidth(this,cls,dcls,rsIdx);}this.avatar.style.display="none";document.body.style.cursor="";this.ownAvatar=false;}else{if(this._super){this._super(ctxt);}}}});mstrmojo.requiresCls("mstrmojo._CanResizeColumn","mstrmojo.ListMapperTable","mstrmojo.WidgetList");function _buildColGroup(cls){var cg=document.createElement("colgroup"),len=cls.length,cl,i;for(i=0;i<len;i++){var col=document.createElement("col");cl=cls[i];if(cl.colWidth){col.style.width=cl.colWidth+"px";}col.className=cl.colCss||("col"+i);cg.appendChild(col);}return cg;}function _destroyHeaderWidgets(w){var hws=w._headerWidgets_,len=hws&&hws.length;if(len>0){var i;for(i=0;i<len;i++){hws[i].destroy(true);}}}function buildColumnHtml(column,resizeHandleIndex,tdAttributes,headerWidgetArray,headerAttributes){var out=[],headerWidget=column.headerWidget;tdAttributes=tdAttributes?(" "+tdAttributes):"";headerWidgetArray=headerWidgetArray||this._headerWidgets;headerAttributes=headerAttributes?(" "+headerAttributes):' w="1"';out.push("<td"+tdAttributes+">");if(resizeHandleIndex>0&&this.resizableColumns){out.push(_RHString(resizeHandleIndex));}out.push('<div class="mstrmojo-DataGrid-headerText');out.push(column.headerCss?" "+column.headerCss:"");if(headerWidget){headerWidgetArray.push(mstrmojo.hash.copy(headerWidget));out.push('"'+headerAttributes+">");}else{out.push('">');}out.push(column.headerText||"&nbsp");out.push("</div>");out.push("</td>");return out.join("");}function renderHeaderWidgets(hwTypeString,hwAttributeValue){var hws,len,divs,phs,w,i,mojoWidgets=[];hwTypeString=hwTypeString||"_headerWidgets";hwAttributeValue=hwAttributeValue||"1";hws=this[hwTypeString];len=hws.length;if(len>0){divs=this.headerContainerNode.getElementsByTagName("div");phs=mstrmojo.array.filter(divs,function(div){return div.getAttribute("w")==hwAttributeValue;});for(i=0;i<len;i++){hws[i].placeholder=phs[i].firstChild;hws[i].dataGrid=this;w=mstrmojo.registry.ref(hws[i]);w.render();mojoWidgets.push(w);}}this[hwTypeString+"_"]=mojoWidgets;}mstrmojo.DataGrid=mstrmojo.declare(mstrmojo.WidgetList,[mstrmojo._CanResizeColumn,mstrmojo.ui._HasScroller],{scriptClass:"mstrmojo.DataGrid",banding:true,resizableColumns:true,columns:null,items:null,listMapper:mstrmojo.WidgetListMapperTable,lockHeader:false,contentWidth:"",renderHook:{},shouldDisableItem:function(){return false;},markupString:'<div id="{@id}" class="mstrmojo-DataGrid {@cssClass}" style="{@cssText}" mstrAttach:mousedown,mouseup><div class="mstrmojo-DataGrid-headerContainer">{@headerHtml}</div><div class="mstrmojo-DataGrid-itemsScrollBox" style="position:relative;"><div class="mstrmojo-DataGrid-itemsContainer" style="{@itemsContainerCssText}">{@itemsHtml}</div><div class="mstrmojo-ListBase2-dropCue"><div class="mstrmojo-ListBase2-dropCue-inner"></div></div></div></div>',markupSlots:{scrollboxNode:function(){return this.domNode.lastChild;},itemsContainerNode:function(){return this.domNode.lastChild.firstChild;},dropCueNode:function(){return this.domNode.lastChild.lastChild;},headerContainerNode:function(){return this.domNode.firstChild;},headerRows:function(){return this.domNode.firstChild.firstChild.rows;},bodyRows:function(){return this.domNode.lastChild.firstChild.firstChild.rows;}},markupMethods:{oncontentWidthChange:function(){var cw=this.contentWidth,hc=this.headerContainerNode,ic=this.itemsContainerNode;if(cw&&hc&&ic){hc.style.width=cw;ic.style.width=cw;}},onlockHeaderChange:function(){mstrmojo.css.toggleClass(this.domNode,"lockHeader",this.lockHeader);},onvisibleChange:function(){this.domNode.style.display=this.visible?this.cssDisplay:"none";}},setupScrollNodes:function setupScrollNodes(){this.scrollNode=this.scrollboxNode;},itemFunction:function(item,idx,w){var c=new mstrmojo.DataRow({columns:w.columns,data:item,disable:w.shouldDisableItem(item),idx:idx,dataGrid:w,parent:w});return c;},preBuildRendering:function preBuildRendering(){var renderHook=this.renderHook;if(renderHook&&renderHook.pre){renderHook.pre.apply(this,[buildColumnHtml]);}else{var cls=this.columns,len=cls.length,out=['<table class="mstrmojo-DataGrid-headerTable" cellspacing="0" cellpadding="0"><tr>'],colHtml;this._headerWidgets=[];var i;for(i=0;i<len;i++){colHtml=buildColumnHtml.apply(this,[cls[i],i]);out.push(colHtml);}out.push("</tr></table>");this.headerHtml=out.join("");}if(this._super){this._super();}},postBuildRendering:function postBuildRendering(){if(this._super){this._super();}var renderHook=this.renderHook;if(renderHook&&renderHook.post){renderHook.post.apply(this,[_buildColGroup,renderHeaderWidgets]);}else{renderHeaderWidgets.apply(this);this.titleColGroup=_buildColGroup(this.columns);}var cg=this.titleColGroup,dcg=cg.cloneNode(true),hc=this.headerContainerNode,ht=hc&&hc.getElementsByTagName("table")[0],dc=this.itemsContainerNode,sb=this.scrollboxNode,dn=this.domNode,dt=dc&&dc.getElementsByTagName("table")[0];this.dataColGroup=dcg;if(ht&&dt){ht.insertBefore(cg,ht.firstChild);dt.insertBefore(dcg,dt.firstChild);}if(this.lockHeader){sb.style.height=dn.offsetHeight-hc.offsetHeight+"px";mstrmojo.dom.attachEvent(sb,"scroll",function(e){hc.style.left=-sb.scrollLeft+"px";});}},refresh:function refresh(postUnrender){_destroyHeaderWidgets(this);if(this._super){this._super(postUnrender);}},destroy:function dst(skipCleanup){_destroyHeaderWidgets(this);this._super(skipCleanup);},unrender:function unrn(ignoreDom){var hws=this._headerWidgets_,len=hws&&hws.length,hw;if(len>0){var i;for(i=0;i<len;i++){hw=hws[i];if(hw&&hw.hasRendered){hw.unrender(true);}}}this._super(ignoreDom);}});mstrmojo.requiresCls("mstrmojo.css","mstrmojo.hash","mstrmojo.Container");mstrmojo.DataRow=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.DataRow",cssClass:"mstrmojo-DataRow",dataTextCSSClass:"mstrmojo-DataRow-text",columns:null,disable:false,markupMethods:{onselectedChange:function(){mstrmojo.css.toggleClass(this.domNode,"selected",this.selected);}},buildDom:function(){this.children=[];var ph=document.createElement("tr"),d=this.data,idx=this.idx,dataGrid=this.dataGrid,css=this.cssClass,cls=this.columns,ch=this.children,disabled=this.disable,td,cn=-1,cl,w;ph.setAttribute("id",this.id);if(dataGrid.banding){css+=(idx%2==1)?" odd":" even";}ph.className=css+(mstrmojo.string.isEmpty(d[dataGrid.itemDisplayField||"n"])?" empty-row":"")+(" "+d[dataGrid.itemCSSField||"itemCss"]||"")+(disabled?" disabled":"");var i,len;for(i=0,len=cls.length;i<len;i++){cl=cls[i];w=(cl.dataWidgetBuilder&&cl.dataWidgetBuilder(d))||cl.dataWidget;td=document.createElement("td");if(cl.applyStyle2Cell&&cl.colCss){td.setAttribute("class",cl.colCss);}ph.appendChild(td);if(w){td.setAttribute("w","1");cn++;ch.push(mstrmojo.hash.copy(w,{slot:"slot"+cn,data:d,idx:idx,dataGrid:dataGrid}));}else{if(cl.dataFunction){td.innerHTML=cl.dataFunction(d,idx,dataGrid);}else{var txt=mstrmojo.string.htmlAngles(d[cl.dataField||"n"])||"&nbsp",atts=cl.tooltip?' title="'+txt+'"':"";td.innerHTML='<div class="'+this.dataTextCSSClass+'" '+atts+">"+txt+"</div>";}}}this.initChildren();ph.mstrmojoId=this.id;return ph;},buildRendering:function bldRn(){this._super();var tds=this.domNode.childNodes,len=tds.length,slots={},ct=0,td,i;for(i=0;i<len;i++){td=tds[i];if(td.getAttribute("w")=="1"){slots["slot"+ct]=td;ct++;}}this.addSlots(slots);}});}());