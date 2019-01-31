(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.Widget","mstrmojo.Button","mstrmojo.TextBox","mstrmojo.ui.PopupButton","mstrmojo.DI.DIConstants","mstrmojo.DI.DIAuthenticationList","mstrmojo.architect.menu.EnumMenuActions","mstrmojo.DI.DIHelpers","mstrmojo.string");mstrmojo.requiresDescs(531,641,3398,7778,8473,12933,14887,14898,14925);var $WIDGET=mstrmojo.Widget,$HASH=mstrmojo.hash,$ARR=mstrmojo.array,$CSS=mstrmojo.css,$DOM=mstrmojo.dom,$DES=mstrmojo.desc,constants=mstrmojo.DI.DIConstants,$H=mstrmojo.DI.DIHelpers,$S=mstrmojo.string;var $Anonymous=mstrmojo.desc(7778,"Anonymous"),$ENUM_MENU_ACTIONS=mstrmojo.architect.menu.EnumMenuActions;function editDBRole(item){var pw=this;var controller=mstrApp.getRootController();var srcTableID=$HASH.walk("parent.parent.tableID",pw);if(!item||!item.did){return ;}controller.dataService.loadDBRoles({success:function(res){pw.close();controller.getDialogController().show(constants.dialogType.authenticationDialog,{dbrole:res.dbrs&&res.dbrs[0],srcTableID:srcTableID});}},{objectID:item.did});}function deleteDBRoles(items){var controller=mstrApp.getRootController(),len=items&&items.length,cnt=0;var callback={success:function(){cnt++;if(cnt>=len){controller.getAuthenticationDBRoles();}},failure:function(res){cnt++;if(res&&parseInt(res.code,10)===constants.backendError.notFullyControl){controller.displayError(mstrmojo.desc(12933,"You don't have enough privileges to perform this operation"),false,res&&res.message);}else{controller.displayError(mstrmojo.desc(641,"Please try again. If the problem persists, contact the server Administrator."),false,res&&res.message);}}};if(!len){return ;}$ARR.forEach(items,function(item){controller.dataService.deleteDBRole(callback,{objectid:item.did,objecttype:29});});}function confirmDeleteDBRole(data){var pw=this,msg=$DES(14898,'Are you sure to delete connection "###"?'),button=pw.parent,sel=button.selectedIndex>=0?button.items[button.selectedIndex]:null,delSel=false;if(sel){delSel=sel.did===data.did;}mstrmojo.confirm(msg.replace("###",data.n),{confirmBtn:{hot:false,fn:function(){deleteDBRoles.call(pw,[data]);if(delSel){pw.list.set("selectedIndex",0);}}},cancelBtn:{hot:true}});}function shareDBRole(dbrole){var pw=this;var controller=mstrApp.getRootController(),oi;function openEditor(){pw.close();controller.showDialog(constants.dialogType.sharingDialog,{oi:oi,showSharingOptions:false});}if(!dbrole){return ;}if($H.isServerBasedWS()){var params={taskId:"openNativeWindow",did:dbrole.did,windowType:2};pw.close();mstrApp.serverRequest(params,null,{});}else{controller.getDataService().getObjectInfo({success:function(res){oi=res.objects[0];openEditor();}},{objectIDs:dbrole.did,objectTypes:29,includeACL:true});}}function updateTooltipConfig4Label(label){var pos;if(!label.enabled){pos=$DOM.position(label.domNode);label.set("richTooltip",{cssClass:"vi-regular A-center vi-tooltip-A",top:Math.max(pos.y+pos.h+5,0),left:Math.max(pos.x+pos.w/2,0),posType:mstrmojo.tooltip.POS_TOPCENTER,content:mstrmojo.desc(12933,"You don't have enough privileges to perform this operation")});}}mstrmojo.DI.DIAuthenticationButton=mstrmojo.declare(mstrmojo.ui.PopupButton,null,{markupString:'<div id="{@id}" style="{@cssText}" class="mstrmojo-DI-DIAuthenticationButton mstrmojo-ui-Pulldown {@cssClass}" mstrAttach:mousedown,click><div class="mstrmojo-DI-DIAuthenticationButton-text mstrmojo-ui-Pulldown-text" title="{@title}" style="{@labelCssText}">{@value}</div><div class="container"></div></div>',markupSlots:{textNode:function textNode(){return this.domNode.firstChild;},containerNode:function containerNode(){return this.domNode.lastChild;}},markupMethods:{onvisibleChange:$WIDGET.visibleMarkupMethod,onheightChange:$WIDGET.heightMarkupMethod,onwidthChange:$WIDGET.widthMarkupMethod,onvalueChange:function(){if(this.textNode){this.textNode.innerHTML=$S.encodeHtmlString(this.value)||"";}}},value:$Anonymous,selectedIndex:0,items:null,anchorSlot:"textNode",isHostedWithin:false,hostedCSSClass:"",isWaiting:false,children:[],init:function init(props){this._super(props);$CSS.addWidgetCssClass(this.popupWidget,"ctrl-popup-list");},initChildren:function initChildren(){this.children=this.getPopupWidgetRef();this._super();},onselectedIndexChange:function(){var item=this.items&&this.items[this.selectedIndex];if(this.selectedIndex===-1||this.selectedIndex>this.items.length-1){this.set("value",$Anonymous);return ;}if(item&&item.n){this.set("value",item.n);}},updateSelectedItemById:function(did){var idx=$ARR.find(this.items,"did",did),pw=this.getPopupWidget();if(idx>-1){this.set("selectedIndex",idx);if(pw){pw.set("selectedIndex",idx);}}},postBuildRendering:function(){var controller=mstrApp.getRootController(),model=controller.getModel();if(!model.authDBRoles||model.authDBRoles.length===0){controller.getAuthenticationDBRoles();}this._super();controller.getModel().attachEventListener("authDBRolesChange",this.id,"update");this.update();},filteringMDBR:function(items){var model=mstrApp.getRootController("DI").getModel(),DIURLUpload=this.parent,tableID=DIURLUpload.tableID,editingSrc=model.getImportSource(tableID),editingMDBRID=$HASH.walk("sourceInfo.dbRoleId",editingSrc);return $ARR.filter(items,function(dbr){if(!dbr.isManagedDBR){return true;}else{if(!editingMDBRID){return false;}else{if(dbr.did!==editingMDBRID){return false;}}}return true;});},update:function(){var controller=mstrApp.getRootController("DI"),dbroles=controller.getModel().authDBRoles,pw,idx,items=[];if(dbroles&&dbroles.length>0){dbroles=$HASH.clone(dbroles);$ARR.forEach([constants.urlAuthDBRoles.anonymous,constants.urlAuthDBRoles.windows,constants.urlAuthDBRoles.kerberos,constants.urlAuthDBRoles.integrated],function(id){idx=$ARR.find(dbroles,"did",id);if(idx>-1){items.push(dbroles[idx]);dbroles.splice(idx,1);}});dbroles.sort(function(a,b){if(a.n<b.n){return -1;}if(a.n>b.n){return 1;}return 0;});items=items.concat(dbroles);}items=this.filteringMDBR(items);var mdbrIx=$ARR.find(items,"isManagedDBR",true);this.set("items",items);this.set("selectedIndex",mdbrIx>=0?mdbrIx:this.selectedIndex);if(mdbrIx===this.selectedIndex){this.set("value",items[mdbrIx].n);}pw=this.getPopupWidget();pw.list.set("items",$ARR.map(items,function(item){if((!!mstrApp.diParams.useDatabaseInstanceManager||mstrApp.isSingleTier)&&item.did!==-1&&item.did!==constants.urlAuthDBRoles.anonymous&&item.did!==constants.urlAuthDBRoles.windows&&item.did!==constants.urlAuthDBRoles.kerberos&&item.did!==constants.urlAuthDBRoles.integrated){item.cls="edit";}return item;}));pw.list.set("selectedIndex",mdbrIx>=0?mdbrIx:this.selectedIndex);if(this.isWaiting){mstrApp.hideProgress();this.isWaiting=false;this.openPopup(pw);}},getSelectedDBRole:function(){var idx=this.selectedIndex,dbrole;if(idx<0){dbrole={did:-1,n:$Anonymous};}else{dbrole=this.items[this.selectedIndex];}return dbrole;},getPopupWidget:function(){return this.popupWidget;},getPopupWidgetRef:function(){return{alias:"popupWidget",scriptClass:"mstrmojo.ui.PopupWidget",cssClass:"mstrmojo-DI-DIAuthenticationButton-Popup",visible:false,autoCloses:false,children:[{scriptClass:"mstrmojo.Label",cssClass:"title",text:mstrmojo.desc(14887,"Connection List")},{alias:"list",cssClass:"list",scriptClass:"mstrmojo.DI.DIAuthenticationList",hasCustomScrollbar:true,executeCommand:function(action,data){switch(action){case $ENUM_MENU_ACTIONS.EDIT:editDBRole.call(this.parent,data);break;case $ENUM_MENU_ACTIONS.DELETE:confirmDeleteDBRole.call(this.parent,data);break;case $ENUM_MENU_ACTIONS.SHARE:shareDBRole.call(this.parent,data);break;}},listHooks:{select:function select(el,item,index){var pw=this.parent;pw.parent.set("selectedIndex",index);pw.close();}}},{scriptClass:"mstrmojo.Box",cssClass:"bottom",alias:"bottom",children:[{scriptClass:"mstrmojo.Label",cssClass:"add",cssDisplay:"inline-block",text:$DES(14925,"Add a new connection..."),enabled:!!mstrApp.diParams.useDatabaseInstanceManager||mstrApp.isSingleTier,useRichTooltip:true,updateTooltipConfig:function(){updateTooltipConfig4Label(this);},onclick:function(){var pw=this.parent.parent;if(!this.enabled){return ;}pw.close();mstrApp.getRootController().getDialogController().show(constants.dialogType.authenticationDialog);}}]}]};},onPopupWidgetOpened:function(){var model=mstrApp.getRootController().getModel(),pw=this.getPopupWidget();if(!model.authDBRolesFetched){mstrApp.showProgress();this.isWaiting=true;this.closePopup();return ;}pw.list.set("mode","");pw.list.set("items",this.items);pw.list.set("selectedIndex",this.selectedIndex);if(!pw.visible){this.openPopup(pw);}pw.list.updateScrollbars();}});}());