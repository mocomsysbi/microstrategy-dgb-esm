(function(){mstrmojo.requiresCls("mstrmojo.ui.PopupButton","mstrmojo._HasLayout");mstrmojo.ui.editors.controls.PreviewButton=mstrmojo.declare(mstrmojo.ui.PopupButton,[mstrmojo._HasLayout],{scriptClass:"mstrmojo.ui.editors.controls.PreviewButton",markupString:'<div id="{@id}" class="mstrmojo-ui-PreviewButton {@cssClass}" style="{@cssText}"><div class="cf" mstrAttach:click><div class="preview"></div><div class="btn">&nbsp;</div></div><div class="host"></div></div>',markupSlots:{previewNode:function(){return this.domNode.firstChild.firstChild;},btnNode:function(){return this.domNode.firstChild.lastChild;},widgetHostNode:function(){return this.domNode.lastChild;},clickableNode:function(){return this.domNode.firstChild;}},markupMethods:{onvisibleChange:mstrmojo.Widget.visibleMarkupMethod},layoutConfig:{h:{previewNode:"100%",btnNode:"100%",widgetHostNode:"0px"},w:{previewNode:"100%",btnNode:"20px",widgetHostNode:"all"},xt:true},isHostedWithin:false,getLayoutOffsets:function getLayoutOffsets(){return{h:2,w:2};},anchorSlot:"clickableNode",updatePreview:function updatePreview(){throw new Error(this.scriptClass+" must implement updatePreview.");},getPopupHostNode:function getPopupHostNode(){return this.widgetHostNode;}});}());