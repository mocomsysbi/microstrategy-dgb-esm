(function(){mstrmojo.requiresCls("mstrmojo.TreeBrowser","mstrmojo.dnd","mstrmojo.dom","mstrmojo.hash");var $DOM=mstrmojo.dom,$DND=mstrmojo.dnd,$H=mstrmojo.hash,$WRAP=mstrmojo.func.wrapMethods;function createAvatar(k){var w=k.parent;var d=document.createElement("div"),dn=w.parent.parent.domNode;d.className="mstrmojo-wh-avatar";dn.appendChild(d);w.avatar=d;return d;}function setPosition(av,t,l){av.style.left=l;av.style.top=t;}mstrmojo.warehouse.TableTree=mstrmojo.declare(mstrmojo.TreeBrowser,null,{scriptClass:"mstrmojo.warehouse.TableTree",model:null,cssClass:"mstrmojo-TreeBrowser mstrmojo-Architect-WarehouseTablesTree",items:[],draggable:true,multiSelect:true,itemDisplayField:"n",useCache:false,noCheckBox:true,ownAvatar:true,itemIdField:"did",blockCount:1000,selectionAcrossBranch:false,listSelector:mstrmojo.ListSelector,branchClickPolicy:mstrmojo.TreeBrowserEnum.BRANCH_POLICY_SELECT,itemFunction:function ifn(item,idx,w){var tree=w.tree||w;return new mstrmojo.TreeBrowserNode({data:item,state:0,parent:w,tree:tree,multiSelect:w.multiSelect,text:item[w.itemDisplayField],textCssClass:tree.item2textCss(item),items:item[w.itemChildrenField],itemIdField:w.itemIdField,itemDisplayField:"n",itemIconField:w.itemIconField,itemChildrenField:w.itemChildrenField,itemFunction:w.itemFunction,listSelector:w.listSelector,draggable:true,ownAvatar:true,getDragEvent:function getDragEvent(){return"addTable";},getDragData:function(){var parent=this.parent,items=parent.items,data=[];$H.forEach(parent.selectedIndices,function(selected,index){data.push(items[index]);});return data;},onmousedown:function omd(evt){if(tree.selectedIndex>-1){$DND.startDragCheck(evt.hWin,evt.e);}},predblclick:function predblclick(evt){var w=evt.src,e=window.event||evt,target=$DOM.eventTarget(e,$DOM.isFF?e.e:e);if(!target||target.className.indexOf("mstrmojo-TreeNode-state")>-1){return ;}if(target.className.indexOf("t26")>-1&&tree.onColumndblclick){tree.onColumndblclick(evt);}else{if(w.items.length===0){w.getColumns({success:function success(){tree.onTabledblclick({src:w});}});}else{if(tree.onTabledblclick){tree.onTabledblclick({src:w,items:w.items,selDBRole:tree.model.SelDBRoleID});}}}$DOM.stopPropogation(evt.hWin,evt.e);$DOM.clearBrowserHighlights(evt.hWin);return false;},ondragstart:function ondragstart(ctxt){var data=ctxt.src.data;var newNode=this.domNode.childNodes[0].cloneNode(true);this.parent.ownAvatar=true;var a=this.parent.avatar||createAvatar(this);var l=ctxt.src.pos.x+"px";var t=ctxt.src.pos.y+"px";if(data&&(data.length>1)){newNode.childNodes[2].innerHTML=data.length;newNode.childNodes[2].style.cssText="font-size:12px; font-weight:900;color:black;";}while(a.hasChildNodes()){a.removeChild(a.lastChild);}a.appendChild(newNode);setPosition(a,t,l);a.style.display="block";return true;},ondragmove:function ondragmove(ctxt){var t=ctxt.tgt,a=this.parent.avatar;if(a){setPosition(a,t.pos.y-40+"px",t.pos.x+1+"px");}if(tree.onItemdragmove){tree.onItemdragmove(ctxt);}},ondragend:function ondragend(ctxt){this.parent.avatar.style.display="none";this.parent.ownAvatar=false;if(tree.onItemdragend){tree.onItemdragend(ctxt);}},getColumns:function(callback){var widget=this;mstrApp.getRootController().getColumnsForDBTable({n:this.data.n},$WRAP({success:function(res){var items=res.items;widget.set("items",items);widget.data.items=items;}},callback),true);}});},contentRetrieved:true,getContent:function(w,blockBegin){var isRoot=(w===this),tree=this,success=function(res){if(isRoot){mstrmojo.css.removeClass(tree.domNode,["loading"]);}tree.updateTreeContent(w,res);},failure=function(){w.set("items",[tree.failItemCreaterFunc()]);},callbacks={success:success,failure:failure};if(isRoot){mstrmojo.css.addClass(tree.domNode,["loading"]);}this.getContentThroughTaskCall({isRoot:isRoot,data:w.data,blockBegin:blockBegin||0,blockCount:tree.blockCount},callbacks);},getContentThroughTaskCall:function getContentThroughTaskCall(params,callback){var m=this.model;if(params.isRoot){m.getSelectedDBRoleTables(params,callback);}else{mstrApp.getRootController().getColumnsForDBTable({n:params.data.n},callback);}},isBranch:function isBranch(data){return data.items;},item2textCss:function item2textCss(data){return"mstrmojo-ArchitectListIcon "+{"-1":"failed","-2":"loading","-3":"next","-4":"prev","26":"t26","8405":"t15"}[data.st];},onRender:function onR(){if(this.domNode){this.domNode.style.height=this.height;this.domNode.style.width=this.width;}},onheightChange:function heightchange(){if(this.domNode){this.domNode.style.height=parseInt(this.height,10)+"px";}},dbroleSelectHandler:function(){var tr=this;tr.set("items",[]);tr.blockBegin=0;tr.getContent(tr);},setSelectedTables:function(items){var res=mstrmojo.array.findMulti(this.items,this.itemIdField,items);this.select(res.indices);}});}());