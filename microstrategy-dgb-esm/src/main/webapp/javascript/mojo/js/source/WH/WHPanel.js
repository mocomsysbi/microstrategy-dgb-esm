(function(){mstrmojo.requiresCls("mstrmojo.Box","mstrmojo.Table","mstrmojo.WH.DBRoleSelector","mstrmojo.WH.WHModel","mstrmojo.WH.TableTree","mstrmojo.qb.VSplitPanel","mstrmojo.SearchableDropDownList");var _C=mstrmojo.css,_A=mstrmojo.array;mstrmojo.WH.WHPanel=mstrmojo.declare(mstrmojo.qb.VSplitPanel,null,{scriptClass:"mstrmojo.WH.WHPanel",markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},model:null,sptCache:false,catalogStamp:"   ",marginSpan:10,minSpan:100,allowdragstart:function(ctxt){return false;},children:[{scriptClass:"mstrmojo.WH.DBRoleSelector",slot:"topItem",alias:"topPanel"},{scriptClass:"mstrmojo.Box",slot:"bottomItem",alias:"bottomPanel",cssClass:"mstrmojo-qb-WarehouseTableSection",children:[{scriptClass:"mstrmojo.Table",rows:2,cols:2,cssClass:"mstrmojo-qb-DBRoleSelector-header",layout:[{cells:[{cssText:"padding-left: 5px; padding-right: 5px;"},{cssText:"height: 20px; padding-right: 3px;"}]}],children:[{scriptClass:"mstrmojo.Label",slot:"0,0",cssClass:"mstrmojo-qb-DBRoleSelector-header",text:mstrmojo.desc(9142,"Available Tables")},{scriptClass:"mstrmojo.Button",slot:"0,1",iconClass:"mstrmojo-ArchitectListIcon info",cssText:"float:right;",ontitleChange:function(){this.render();},bindings:{visible:function(){return this.parent.parent.parent.sptCache;},title:function(){return this.parent.parent.parent.catalogStamp;}}}]},{scriptClass:"mstrmojo.Table",rows:1,cols:2,alias:"actionbar",cssClass:"mstrmojo-Architect-SearchBoxContainer",children:[{scriptClass:"mstrmojo.SearchableDropDownList",cssDisplay:"block",alias:"NameSpaces",popupCssClass:"mstrmojo-qb-ScrollingPulldown",cssText:"margin-top:5px;margin-bottom:5px;margin-left:5px;padding:0px; 5px;",slot:"0,0",itemField:"ns",itemIdField:"ns",visible:true,searchEnabled:true,fixWidth:true,applyChange:function(){if(!this.visible||this.value===null){return ;}var model=this.parent.parent.parent.model;if(this.value!=model.SelNameSpaceID){model.set("SelNameSpaceID",this.value);}else{this.items=this.allItems;this.set("text",this.value);}},onblur:function(evt){this.applyChange&&this.applyChange();},onEnter:function(){this.applyChange&&this.applyChange();},onEsc:function(){this.items=this.allItems;this.set("value",this.parent.parent.parent.model.SelNameSpaceID);this.set("text",this.value);},getDisplayValue:function(){return this.items.length&&this.items[this.selectedIndex===-1?0:this.selectedIndex].n;},loadNameSpaces:function(evt){var gpr=this.parent.parent,mdl=gpr.parent.model,items=mdl.namespaces,usecCache=mdl.usecCache;this.set("visible",usecCache);this.parent.actionBarRefresh.set("visible",usecCache);gpr.searchbar.searchBarRefresh.set("visible",(!this.visible));gpr.searchbar.SearchBox.onwidthChange();gpr.onheightChange();this.set("allItems",items);this.set("items",items);if(this.visible){this.set("value",mdl.namespaces[0].ns);}},onvalueChange:function(evt){var mdl=this.parent.parent.parent.model;mdl.set("SelNameSpaceID",evt.value);this.defaultText=evt.value;},onwidthChange:function(e){if(this.domNode){this.domNode.style.width=parseInt(this.parent.parent.width)-36+"px";}},onRender:function(){this.domNode.style.width=parseInt(this.parent.parent.width)-36+"px";var model=this.parent.parent.parent.model;if(!model||!model.usecCache){var gpr=this.parent.parent;this.set("visible",false);this.parent.actionBarRefresh.set("visible",false);gpr.searchbar.searchBarRefresh.set("visible",true);gpr.searchbar.SearchBox.onwidthChange();gpr.onheightChange();}}},{alias:"actionBarRefresh",scriptClass:"mstrmojo.Button",slot:"0,1",title:mstrmojo.desc(773,"Refresh"),iconClass:"mstrmojo-ArchitectListIcon refresh",cssText:"float:right;",visible:false,onclick:function(evt){var parentContainer=this.parent.parent,mdl=parentContainer.parent.model;parentContainer.searchbar.SearchBox.clearSearch(true);if(mdl){if(mdl.SelDBRoleID!=null){mdl.catalogRefresh=true;var tree=parentContainer.DBTableTree;tree.clearSelect();tree.set("items",[]);tree.blockBegin=0;tree.getContent(tree,0);}}}}]},{scriptClass:"mstrmojo.Table",rows:1,cols:2,alias:"searchbar",cssClass:"mstrmojo-Architect-SearchBoxContainer",children:[{alias:"SearchBox",slot:"0,0",cssClass:"searchbox",scriptClass:"mstrmojo.Widget",markupString:'<table id={@id} cellspacing=0 cellpadding=0 class="mstrmojo-Architect-SearchBox {@cssClass}" style="{@cssText};"><tr><td><div class="mstrmojo-SearchBox" mstrAttach:click ><input class="mstrmojo-SearchBox-input" type="text" style="width:{@width};" mstrAttach:keyup,blur/></div></td><td><div class="mstrmojo-SearchBox-bg"><div class="mstrmojo-Architect-SearchBox-search" id="{@id}sbClear" mstrAttach:click ></div></div></td></tr></table>',markupSlots:{inputNode:function(){return this.domNode.rows[0].cells[0].firstChild.firstChild;},clearNode:function(){return this.domNode.rows[0].cells[1].firstChild.firstChild;}},onclick:function(evt){var hWin=evt.hWin,e=evt.e||hWin.event,tgt=e.target||e.srcElement,id=tgt&&tgt.id;switch(id.replace(this.id,"")){case"sbSearch":if(this.onEnter&&e.keyCode===13){this.onEnter();}this._onsearch();break;case"sbClear":this.clearSearch();break;}},clearSearch:function(silent){this.inputNode.value="";this.parent.parent.parent.model.filterText="";_C.removeClass(this.clearNode,["show"]);if(!silent){this._onsearch(true);}},onkeyup:function onkeyup(evt){var hWin=evt.hWin,e=evt.e||hWin.event;var input=mstrmojo.string.trim(this.inputNode.value);if(this.clearNode){_C.toggleClass(this.clearNode,["show"],input.length>0);}if(this._searchTimer){self.clearTimeout(this._searchTimer);}var me=this;this._searchTimer=self.setTimeout(function(){me._onsearch();},500);},_onsearch:function(toRoot){var grandparent=this.parent.parent,tree=grandparent.DBTableTree,model=grandparent.parent.model;tree.clearSelect();tree.set("items",[]);tree.blockBegin=0;if(model.SelDBRoleID!=null){model.filterText=mstrmojo.string.trim(this.inputNode.value+"").toUpperCase();tree.getContent(tree,0);}},enableMatchCase:false,onwidthChange:function(e){if(this.domNode){this.inputNode.style.width=parseInt(this.parent.parent.width)-63+"px";}},onRender:function(){this.inputNode.style.width=parseInt(this.parent.parent.width)-63+"px";}},{alias:"searchBarRefresh",scriptClass:"mstrmojo.Button",slot:"0,1",title:mstrmojo.desc(773,"Refresh"),iconClass:"mstrmojo-ArchitectListIcon refresh",cssText:"float:right;",visible:true,onclick:function(evt){var parentContainer=this.parent.parent,mdl=parentContainer.parent.model;this.parent.SearchBox.clearSearch(true);if(mdl){if(mdl.SelDBRoleID!=null){mdl.catalogRefresh=true;var tree=parentContainer.DBTableTree;tree.clearSelect();tree.set("items",[]);tree.blockBegin=0;tree.getContent(tree,0);}}}}]},{alias:"DBTableTree",scriptClass:"mstrmojo.WH.TableTree",bindings:{allowdragstart:"this.parent.parent.allowdragstart",onItemdragmove:"this.parent.parent.onItemdragmove",onItemdragend:"this.parent.parent.onItemdragend",onTabledblclick:"this.parent.parent.onTabledblclick",onColumndblclick:"this.parent.parent.onColumndblclick"}}],onheightChange:function(e){var delta=(this.actionbar.NameSpaces.visible)?88:57,val=(e)?parseInt(e.value,10):parseInt(this.height,10);this.DBTableTree.set("height",val-delta+"px");},onwidthChange:function(e){var val=parseInt(e.value,10);this.searchbar.SearchBox.set("width",val+"px");this.actionbar.NameSpaces.set("width",val+"px");}}],toggleLoadingStatus:function toggleLoadingStatus(evt){_C.toggleClass(this.bottomPanel.DBTableTree.domNode,["loading"],evt.value);},clearBottomPanel:function clearBottomPanel(evt){var bottomPanel=this.bottomPanel,namespacePulldown=bottomPanel.actionbar.NameSpaces;bottomPanel.DBTableTree.set("items",[]);namespacePulldown.set("items",[]);namespacePulldown.set("text","");namespacePulldown.value=null;bottomPanel.searchbar.SearchBox.clearSearch(true);},updatecatalogStamp:function(evt){var timestamp=evt.value;this.set("sptCache",!!timestamp);this.set("catalogStamp",timestamp);},setDBRoleID:function(dbrid){this.model&&this.model.set("SelDBRoleID",dbrid);},getDBRoleID:function(){return this.model.SelDBRoleID;},getDBRole:function(dbrid){var idx=_A.find(this.model.dbrs,"did",dbrid);return(idx>=0)?this.model.dbrs[idx]:null;},getDBRoles:function(){return this.model.dbrs;},setSelectedTables:function(items){var tr=this.bottomPanel.DBTableTree;tr.setSelectedTables(items);},getSelectedTables:function(){var tr=this.bottomPanel.DBTableTree;return tr.getSelectedItems();},getTableColumns:function(srcw,callbacks){this.model.getColumnsForDBTable(srcw,callbacks);},load:function(){this.model=new mstrmojo.WH.WHModel({});var mdl=this.model;if(!mdl){mstrmojo.alert("You need to define a model!");return ;}this.topPanel.initModel(mdl);this.bottomPanel.DBTableTree.set("model",mdl);mdl.attachEventListener("dbrsChange",this.topPanel.id,"load");var namespaceid=this.bottomPanel.actionbar.NameSpaces.id;mdl.attachEventListener("namespacesChange",namespaceid,"loadNameSpaces");mdl.loadDBRoles();var panelID=this.id;mdl.attachEventListener("dbroleSelection",panelID,"clearBottomPanel");mdl.attachEventListener("loadNamespaces",panelID,"toggleLoadingStatus");mdl.attachEventListener("namespaceSelection",this.bottomPanel.DBTableTree.id,"dbroleSelectHandler");mdl.attachEventListener("namespaceSelection",this.bottomPanel.searchbar.SearchBox.id,function clear(){this.clearSearch(true);});mdl.attachEventListener("catalogStampChange",panelID,"updatecatalogStamp");if(this.onDBRoleSelection){mdl.attachEventListener("dbroleSelection",panelID,this.onDBRoleSelection);}if(this.onDBTablesChange){mdl.attachEventListener("dbTablesChange",panelID,this.onDBTablesChange);}}});})();