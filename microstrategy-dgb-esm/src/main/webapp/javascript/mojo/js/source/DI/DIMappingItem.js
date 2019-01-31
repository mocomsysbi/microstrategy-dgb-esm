(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.InlineEditBox","mstrmojo.Tooltip","mstrmojo.MenuButton","mstrmojo.string","mstrmojo.qb.AttributeMapping","mstrmojo.DI.DIHelpers","mstrmojo.DI.DIInlineEditBox");mstrmojo.requiresDescs(12532,12829,12830,12831);var IDX_ATTR="idx",$STR=mstrmojo.string;var $DOM=mstrmojo.dom;var constants=mstrmojo.DI.DIConstants;var dataTypeMenuItems=constants.dataTypeMenuItems;var $DIHelpers=mstrmojo.DI.DIHelpers;function pToUnused(item){if(!item||!item.data||isNaN(item.data.tp)||!item.data.selected){return ;}var col=item.data;var m=mstrApp.getRootController().model;var i,cols=[];cols=m.findMappingItem(col);for(i=0;i<cols.length;i++){cols[i].selected=false;}mstrApp.getRootController().changeEMMAMappings();}function openContextMenu(evt,hwin){var src=this;src.menuHelper=mstrApp.getRootController().getMappingMenu(src.data.tableId);src.menuHelper.target=src;src.menuHelper.data=[src.data];src.menuHelper.type=constants.contextMenuType.PREVIEW_ITEM_MENU;src.menuHelper.position=$DOM.getMousePosition(evt.e,hwin);var cfg=src.menuHelper.getMenuConfig();cfg.hostId=src.id;cfg.hostElement=this.domNode;cfg.isHostedWithin=false;cfg.position=src.menuHelper.position;cfg.popupHandlers[src.id]={close:function(){this.menuHelper.destroy();}};if(src.scriptClass==="mstrmojo.DI.DIMappingItem"){cfg.alignment.host=1;cfg.alignment.popup=4;}src.openPopup(new mstrmojo.ui.menus.Menu({popupConfig:cfg}));}mstrmojo.DI.DIMappingItem=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasPopup,mstrmojo.ui.menus._HasMenuPopup],{scriptClass:"mstrmojo.DI.DIMappingItem",type:"",subtype:"",georole:null,timerole:null,recursive:null,name:"",allowEdit:true,tooltip:"",markupString:'<div id="{@id}" class="mstrmojo-di-mappingitem {@cssClass}" style="{@cssText}" title="{@itemTitle}" mstrAttach:contextmenu><div class="mappingitem-icon mstrmojo-di-datapreview-headerIcon t{@type} {@subtype}" style="{@iconStyle}"></div><div class="mappingitem-text t{@type}" style="{@textStyle}"></div><div class="mappingitem-menu" style="{@menuStyle}"></div></div>',markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},markupSlots:{iconNode:function(){return this.domNode.children[0];},textNode:function(){return this.domNode.children[1];},menuNode:function(){return this.domNode.children[2];}},useRichTooltip:true,setSubtype:function setSubtype(){if(this.recursive){this.subtype="recursive";}else{if($DIHelpers.isGeo(this)){this.subtype="geo";}else{if($DIHelpers.isTime(this.data)){this.subtype="time";}}}if(this.parent&&this.parent.parent.hasRelationalTable===null){var sources=mstrApp.getRootController().getModel().importSources,i;this.parent.parent.hasRelationalTable=false;this.parent.parent.hierarchyTableIds=[];for(i in sources){if(sources.hasOwnProperty(i)){if(mstrmojo.array.some(sources[i].currentMapping,function(item){return item.recursive&&item.rdcs.length!==0;})){this.parent.parent.hasRelationalTable=true;this.parent.parent.hierarchyTableIds.push(i);}}}}if(this.parent&&this.parent.parent.hasRelationalTable&&!this.data.recursive&&this.parent.parent.hierarchyTableIds.indexOf(this.data.tableId)>=0){this.cssClass+=" donotimport";}},postCreate:function(){if(this._super){this._super();}this.setSubtype();this.itemTitle=0===this.type?mstrmojo.string.decodeHtmlString(this.name,false):"";this.iconStyle=0===this.type?"display:none;":"display:block;";this.textStyle=0===this.type?"display:none;":"display:block;";this.menuStyle=0===this.type?"float:left;":"float:right";},toUnused:function toUnused(){pToUnused(this);},rename:function(linkObjID){if(linkObjID){this.linkObjID=linkObjID;}this.text.rename();},onitemOnSave:function(evt){var controller=mstrApp.getRootController();var src=evt.src;var data=src.data;controller.mappingController.renameTableItem(this.text,data);this.text.set("text",data.alias);return true;},postBuildRendering:function(){this.set("richTooltip",{cssClass:"vi-regular vi-tooltip-V",refNode:this.domNode,posType:mstrmojo.tooltip.POS_BOTTOMLEFT,content:$STR.encodeHtmlString((this.data.ipa?(mstrmojo.desc(13243,"Project Attribute")+": "):"")+this.name)});if(!this._ontooltipover){var id=this.id;this._ontooltipover=function(e){var me=mstrmojo.all[id];if(me.text.textNode.scrollWidth>me.text.textNode.clientWidth){me.showTooltip(e,self);}};this._ontooltipout=function(e){var me=mstrmojo.all[id];me.hideTooltip(e,self);};}$DOM.attachEvent(this.textNode,"mouseover",this._ontooltipover);$DOM.attachEvent(this.textNode,"mouseout",this._ontooltipout);if(this._super){return this._super();}},children:[{slot:"textNode",alias:"text",cssClass:"mstrmojo-di-rename-box mappingitem-text-div",scriptClass:"mstrmojo.DI.DIInlineEditBox",preclick:function preclick(){if(this.parent.data.selected&&this.parent.data.ipa!==1){if(this.editMode!==this.allowEdit){this.set("editMode",this.allowEdit);}}},rename:function(){if(this.editMode!==this.allowEdit){this.set("editMode",this.allowEdit);}},onSave:function(){var value=this.text;this.parent.raiseEvent({name:"itemOnSave",src:this,text:value});},onCancel:function(){this.parent.linkObjID=null;},bindings:{allowEdit:"this.parent.allowEdit",text:"this.parent.name",cssClass:function(){var css="mstrmojo-di-rename-box mappingitem-text-div";if(this.parent.data.ipa){css+=" ipa";}return css;}}},{slot:"textNode",alias:"linkedIcon",iconClass:"mappingitem-linkedIcon",scriptClass:"mstrmojo.Button"},{slot:"menuNode",alias:"menu",scriptClass:"mstrmojo.Button",onclick:function(evt){openContextMenu.call(this.parent,evt);}}],oncontextmenu:function oncontextmenu(evt,hwin){$DOM.stopPropogation(self,evt.e);if(this.dataGrid&&this.dataGrid.hasContextMenu){openContextMenu.call(this,evt,hwin);}$DOM.preventDefault(window,evt.e);}});}());