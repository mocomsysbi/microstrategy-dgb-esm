(function(){mstrmojo.requiresCls("mstrmojo.Popup","mstrmojo.css");var $WIDGET=mstrmojo.Widget,cueWidth="14px";mstrmojo.vi.ui.rw.VizDropCue=mstrmojo.declare(mstrmojo.Popup,null,{scriptClass:"mstrmojo.vi.ui.rw.VizDropCue",markupString:'<div id="{@id}" class="mstrmojo-VizDropCue {@cssClass}"><div class="mstrmojo-VizDropCue-line"><div></div></div><div class="mstrmojo-VizDropCue-tooltip"><div class="mstrmojo-Tooltip vi-regular vi-tooltip-V V-center"><div class="mstrmojo-Tooltip-contentWrapper"><div class="mstrmojo-Tooltip-content"></div></div></div></div></div>',markupSlots:{containerNode:function(){return this.domNode;},tooltipNode:function(){return this.domNode.lastChild;}},markupMethods:{ontopChange:$WIDGET.topMarkupMethod,onleftChange:$WIDGET.leftMarkupMethod,onheightChange:$WIDGET.heightMarkupMethod,onwidthChange:$WIDGET.widthMarkupMethod,onvisibleChange:$WIDGET.visibleMarkupMethod,oncueConfigChange:function(){var cfg=this.cueConfig;this.set("visible",!!cfg);if(!cfg){return ;}var isVertical=cfg.or==="v";mstrmojo.css.toggleClass(this.domNode,"v",isVertical);this.set("top",cfg.top);this.set("left",cfg.left);var cueSize=cfg.size;this.set("height",isVertical?cueSize:cueWidth);this.set("width",isVertical?cueWidth:cueSize);var tooltipText=cfg.tip,tooltip=this.tooltipNode;tooltip.firstChild.firstChild.firstChild.innerHTML=tooltipText||"";tooltip.style.display=tooltipText?"block":"none";}},cueConfig:null});mstrmojo.vi.ui.rw.VizDropCue.CueConfigType=null;}());