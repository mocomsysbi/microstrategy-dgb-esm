(function(){mstrmojo.requiresCls("mstrmojo.ui.menus.MenuPopup","mstrmojo.Button","mstrmojo.dom","mstrmojo.ui._HasScroller");mstrmojo.requiresDescs(1442,2140);var $DOM=mstrmojo.dom,$ARR=mstrmojo.array;function getButtonReference(isOk,config){var captionId=2140,captionText="Cancel",path="this.parent.popupConfig."+(isOk?"ok":"cancel"),btnTxt=config&&config[(isOk?"ok":"cancel")+"BtnText"];if(isOk){captionId=1442;captionText="Ok";}return mstrmojo.Button.newWebButton(btnTxt||mstrmojo.desc(captionId,captionText),function(evt){var editor=this.parent,popupConfig=editor.popupConfig;editor.closeAllMenus();popupConfig["fn"+captionText](popupConfig.data,editor);$DOM.stopPropogation(evt.hWin,evt.e);},isOk,{slot:"btnNode",bindings:{enabled:path+"Enabled",visible:path+"Visible"},cssDisplay:"inline-block"});}mstrmojo.ui.menus.MenuEditor=mstrmojo.declare(mstrmojo.ui.menus.MenuPopup,[mstrmojo.ui._HasScroller],{scriptClass:"mstrmojo.ui.menus.MenuEditor",markupString:'<div id="{@id}" class="mstrmojo-ui-MenuEditor {@cssClass}" style="{@cssText}" mstrAttach:mouseover,mouseout,click><div class="scroll-container" style="{@scCssText}"><div class="me-content"></div><div class="me-buttons"></div><div class="me-bottom"></div></div></div>',markupSlots:{containerNode:function containerNode(){return this.domNode.firstChild.firstChild;},btnNode:function btnNode(){return this.domNode.firstChild.children[1];},bottomNode:function btnNode(){return this.domNode.firstChild.children[2];},scrollNode:function(){return this.domNode.firstChild;},scrollbarHostNode:function(){return this.domNode;}},popupConfig:null,postBuildRendering:function postBuildRendering(props){this._super(props);if(this.popupConfig&&this.popupConfig.supportsScroll){var me=this;window.setTimeout(function(){me.updateScrollbars();},10);}},onmouseover:function onmouseover(evt){var popupConfig=this.popupConfig;if(popupConfig&&!popupConfig.isHostedWithin&&this.opener){this.opener.raiseEvent(mstrmojo._HasMarkup.newDomEvent(evt.name,evt.hWin,evt.e,{targetHostElement:popupConfig.hostElement}));}},updateScrollbars:function(){this._super();if(this.popupConfig&&this.popupConfig.supportsScroll){var scrollNode=this.scrollNode;if(!scrollNode){return ;}var scrollbarWidth=$DOM.getComputedScrollbarWidth(scrollNode);scrollNode.style.marginRight=-scrollbarWidth+"px";scrollNode.style.paddingRight=0;}},monitorWindow:function monitorWindow(){var activeElement=document.activeElement,focusedChild=null;if(activeElement!==null&&activeElement.id!==""){focusedChild=this.domNode.querySelector("#"+activeElement.id)?activeElement:null;}this._super();if(focusedChild){focusedChild.focus();}},init:function init(props){this._super(props);var config=this.popupConfig,bottomNode=config.bottomNode;if(config&&config.supportsScroll&&config.maxHeight>0){if(config.cssClass.indexOf("RoleMenu")>-1){config.maxHeight=360;}this.cssText=(this.cssText||"")+";max-height:"+config.maxHeight+"px";this.scCssText=(this.scCssText||"")+";max-height:"+config.maxHeight+"px";}if(!!mstrApp.isWSStyling){this.themeClassName="mojo-theme-light";}this.data=config.data||{};if(config.onOpen){this.onOpen=config.onOpen;}this.addChildren([getButtonReference(true,config),getButtonReference(false)]);if(bottomNode){bottomNode.slot="bottomNode";this.addChildren(bottomNode);}},onOpen:function onOpen(){$ARR.forEach(this.children,function(child){if(child.scriptClass==="mstrmojo.ui.ScrollableContainer"&&child.onOpen){child.onOpen();}});}});}());