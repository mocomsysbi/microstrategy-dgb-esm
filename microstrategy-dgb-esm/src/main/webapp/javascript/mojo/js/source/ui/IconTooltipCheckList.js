(function(){mstrmojo.requiresCls("mstrmojo.ui.CheckList","mstrmojo.css","mstrmojo.ui._HasListTooltip");var $CSS=mstrmojo.css;var itemMarkup;mstrmojo.ui.IconTooltipCheckList=mstrmojo.declare(mstrmojo.ui.CheckList,[mstrmojo.ui._HasListTooltip],{scriptClass:"mstrmojo.ui.IconTooltipCheckList",markupString:'<div id="{@id}" class="mstrmojo-ui-CheckList {@cssClass}" style="{@cssText}" mstrAttach:click,contextmenu,mouseover><div class="scroll-container"><div class="{@icnCss}" style="{@icnCssText}">{@itemsHtml}</div></div></div>',markupSlots:{scrollboxNode:function scrollboxNode(){return this.domNode.firstChild;},itemsContainerNode:function itemsContainerNode(){return this.domNode.firstChild.firstChild;}},getItemMarkup:function getItemMarkup(item){if(!itemMarkup){var substitute='><span class="text">{@en@n}</span> <span class="{@iconCss}" ttp="{@ttp}"></span><';itemMarkup=this._super(item).replace(">{@en@n}<",substitute);}return itemMarkup;},markupslots:{scrollboxNode:function scrollboxNode(){return this.domNode.firstChild;},itemsContainerNode:function itemsContainerNode(){return this.domNode.firstChild.firstChild;}},getItemProps:function getItemProps(item,idx){var props=this._super(item,idx),lineBreaks={"\r\n":" ","\n":" ","\r":" "};if(item.css){props.addCls(item.css);}props.ttp=item.ttp||"";props.iconCss=item.iconCss||"";item.n=mstrmojo.string.multiReplace(item.n,lineBreaks);props.n=item.n||"";return props;},postBuildRendering:function postBuildRendering(){this.set("richTooltip",{cssClass:"vi-regular vi-tooltip-D",refNode:this.itemsContainerNode,posType:mstrmojo.tooltip.POS_TOPRIGHT,keepArrowXPos:false});},useRichTooltip:true,tooltipOffset:0,tooltipMarkup:'<div class="content" style="{@style}">{@c}</div>',tooltipOrientation:"horizontal",tooltipCss:{leftCssClass:"no-arrow",rightCssClass:"no-arrow"},showTooltip:function showTooltip(evt,win){var me=this,position=mstrmojo.dom.position(evt.target);me.richTooltip.top=Math.max(position.y+position.h);me.richTooltip.left=Math.max(position.x+4,0);this._super(evt,win);},getTooltipText:function getTooltipText(item){return item.ttp;},onmouseover:function onmouseover(evt){var id=this.id,me=mstrmojo.all[id],target=evt.getTarget(),ttp=target.getAttribute("ttp");if(!ttp){return ;}me.richTooltip.content=ttp;me.showTooltip(evt.e,self);}});}());