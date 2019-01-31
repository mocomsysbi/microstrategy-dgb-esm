(function(){mstrmojo.requiresCls("mstrmojo.DataGrid","mstrmojo.ui.menus._HasMenuPopup","mstrmojo.DI.DIHelpers","mstrmojo.qb.menu.SimpleGridMenu","mstrmojo.hash");var $STR=mstrmojo.string,$DIHELPER=mstrmojo.DI.DIHelpers,$DOM=mstrmojo.dom,$ARR=mstrmojo.array,$H=mstrmojo.hash;var $SIMPLE_GRID;function getColumnHeaderText(exprArr){var tokens=[];$ARR.forEach(exprArr,function(item){tokens.push(item.v);});return tokens.join("");}mstrmojo.qb.QBSimplePreview=mstrmojo.declare(mstrmojo.DataGrid,[mstrmojo.ui.menus._HasMenuPopup],{scriptClass:"mstrmojo.qb.QBSimplePreview",resizeColumnBehavior:mstrmojo.RESIZE_ALL_COLUMN_MODE,dataset:null,mappings:null,selectedColumns:null,visible:false,cssClass:"lockHeader mstrmojo-qb-simplepreview",lockHeader:true,markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},menuButton:null,adjustSize:function(columnCount){var COLUMN_WIDTH=60,p=this.parent&&this.parent.domNode,calculateWidth=COLUMN_WIDTH*columnCount;if(!p||!this.scrollboxNode){return ;}this.scrollboxNode.style.overflow="hidden";this.contentWidth="auto";var cw=this.contentWidth,hc=this.headerContainerNode,ic=this.itemsContainerNode;if(cw&&hc&&ic){hc.style.width=cw;ic.style.width=cw;}this.onheightChange();},onmouseover:function(){var tableWidth=mstrmojo.hash.walk("itemsContainerNode.firstChild.clientWidth",this)||0,p=this.parent&&this.parent.domNode;this.scrollboxNode.style.overflowX=(tableWidth>p.clientWidth)?"auto":"hidden";this.scrollboxNode.style.overflowY="auto";},onmouseout:function(){this.scrollboxNode.style.overflow="hidden";},onheightChange:function onheightChange(){var currentHeight=this.height,containerNode=this.headerContainerNode,scrollboxNode=this.scrollboxNode;if(currentHeight&&containerNode&&scrollboxNode){scrollboxNode.style.height=parseInt(currentHeight,10)-containerNode.clientHeight-1+"px";}this.domNode.style.height=parseInt(this.height,10)-($DIHELPER.getEnvObj().isWSDossierLocalMode()?60:0)+"px";},onwidthChange:function onwidthChange(){if(this.domNode&&this.mappings){this.domNode.style.width="100%";this.adjustSize(this.mappings.length);}},postBuildRendering:function postBuildRendering(){if(this._super){this._super();}mstrmojo.dom.attachMarkupEvent(this.id,this.domNode,"mouseover");mstrmojo.dom.attachMarkupEvent(this.id,this.domNode,"mouseout");if($DIHELPER.getEnvObj().isWS()){this.hasCustomScrollbar=true;}},populatePreview:function populatePreview(){var mappings=this.mappings,selectedColumns=this.selectedColumns,scrollLeft=0,scrollboxNode=this.scrollboxNode,i,len,dataset,j,simpleGrid=this;this.columns=[];if(scrollboxNode){scrollLeft=scrollboxNode.scrollLeft||0;}this.unrender();if(this.isRefined&&!mstrApp.isFFSQLMode){$ARR.forEach(selectedColumns,function(tag,i){var columnIndex=tag.colo,headerText,hw;headerText=mstrApp.isFFSQLMode?tag.n:getColumnHeaderText(selectedColumns[i].expr);hw={tag:tag,headerWidget:{scriptClass:"mstrmojo.Box",cssClass:"mstrmojo-qb-simplegrid-header",columnIndex:i,headerText:headerText,menuCssClass:mstrApp.isFFSQLMode?"":"mstrmojo-qb-simplegrid-itemmenu",markupString:'<div id="{@id}" class="mstrmojo-Box {@cssClass}" style="{@cssText}"><span class="mstrmojo-qb-simplegrid-headertext">{@en@headerText}</span><span class="{@menuCssClass}" mstrAttach:click></span></div>',useRichTooltip:true,postBuildRendering:function postBuildRendering(){if(this._super){this._super();}this.set("richTooltip",{cssClass:"vi-regular vi-tooltip-V",refNode:this.domNode,posType:mstrmojo.tooltip.POS_BOTTOMLEFT,content:headerText});if(!this._ontooltipover){var id=this.id;this._ontooltipover=function(e){var me=mstrmojo.all[id];me.showTooltip(e,self);};this._ontooltipout=function(e){var me=mstrmojo.all[id];me.hideTooltip(e,self);};}mstrmojo.dom.attachEvent(this.domNode,"mouseover",this._ontooltipover);mstrmojo.dom.attachEvent(this.domNode,"mouseout",this._ontooltipout);},onclick:function onclick(){var index=this.columnIndex,isFFSQL=mstrApp.isFFSQLMode;if(isFFSQL){return ;}$SIMPLE_GRID.showPopupMenu(simpleGrid,{menuNode:this.domNode.lastChild,data:{columnIndex:index,isVisible:function isVisible(data,menuItem){return isFFSQL?false:true;}}});}},colWidth:"60",dataFunction:function(d,idx,datagrid){var txt=d[this.dataField],css="mstrmojo-di-datapreview-DataRow-text";css+=(idx%2===1)?" odd":" even";return'<div class="'+css+'" title="'+txt+'">'+txt+"</div>";},dataField:i.toString()};simpleGrid.columns.push(hw);});}else{$ARR.forEach(mappings,function(tag,i){var columnIndex=mstrApp.isFFSQLMode?$H.walk("dicl.clix",tag):tag.colo,headerText,hw;headerText=mstrApp.isFFSQLMode?tag.cln:getColumnHeaderText(selectedColumns[columnIndex].expr);hw={tag:tag,headerWidget:{scriptClass:"mstrmojo.Box",cssClass:"mstrmojo-qb-simplegrid-header",columnIndex:columnIndex,headerText:headerText,menuCssClass:mstrApp.isFFSQLMode?"":"mstrmojo-qb-simplegrid-itemmenu",markupString:'<div id="{@id}" class="mstrmojo-Box {@cssClass}" style="{@cssText}"><span class="mstrmojo-qb-simplegrid-headertext">{@en@headerText}</span><span class="{@menuCssClass}" mstrAttach:click></span></div>',useRichTooltip:true,postBuildRendering:function postBuildRendering(){if(this._super){this._super();}this.set("richTooltip",{cssClass:"vi-regular vi-tooltip-V",refNode:this.domNode,posType:mstrmojo.tooltip.POS_BOTTOMLEFT,content:headerText});if(!this._ontooltipover){var id=this.id;this._ontooltipover=function(e){var me=mstrmojo.all[id];me.showTooltip(e,self);};this._ontooltipout=function(e){var me=mstrmojo.all[id];me.hideTooltip(e,self);};}mstrmojo.dom.attachEvent(this.domNode,"mouseover",this._ontooltipover);mstrmojo.dom.attachEvent(this.domNode,"mouseout",this._ontooltipout);},onclick:function onclick(){var index=this.columnIndex,isFFSQL=mstrApp.isFFSQLMode;if(isFFSQL){return ;}$SIMPLE_GRID.showPopupMenu(simpleGrid,{menuNode:this.domNode.lastChild,data:{columnIndex:index,isVisible:function isVisible(data,menuItem){return isFFSQL?false:true;}}});}},colWidth:"178",dataFunction:function(d,idx,datagrid){var txt=d[this.dataField],css="mstrmojo-di-datapreview-DataRow-text";css+=(idx%2===1)?" odd":" even";return'<div class="'+css+'" title="'+txt+'">'+txt+"</div>";},dataField:i.toString()};simpleGrid.columns.push(hw);});}dataset=this.dataset;if(dataset.length===0&&this.columns.length>0){var _row_height=21;var count=parseInt(parseInt(this.parent.height,10)/_row_height,10)-1;count=count>0?count:1;var row;for(i=0;i<count;i++){row=[];for(j=0,len=this.columns.length;j<len;j++){row.push("");}dataset.push(row);}}this.items=dataset;this.render();this.adjustSize(mappings.length);this.scrollboxNode.scrollLeft=scrollLeft;if($DIHELPER.isIEOrEdge()||$DOM.isFF){this.disableScroll(false);}},onvisibleChange:function(e){if(e.value){this.populatePreview();}}});$SIMPLE_GRID=mstrmojo.qb.QBSimplePreview;$SIMPLE_GRID.showPopupMenu=function showPopMenu(simpleGrid,itemInfo){var menuHelper=$SIMPLE_GRID.menuHelper=$SIMPLE_GRID.menuHelper||new mstrmojo.qb.menu.SimpleGridMenu();menuHelper.target=simpleGrid;menuHelper.data=itemInfo.data;var cfg=menuHelper.getMenuConfig();cfg.hostId=simpleGrid.id;cfg.hostElement=itemInfo.menuNode;cfg.isHostedWithin=false;cfg.position=mstrmojo.dom.position(itemInfo.menuNode,true);simpleGrid.openPopup(cfg.newInstance());};}());