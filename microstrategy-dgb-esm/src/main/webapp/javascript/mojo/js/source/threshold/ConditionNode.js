(function(){mstrmojo.requiresCls("mstrmojo.ConditionNode","mstrmojo.dom");var $DOM=mstrmojo.dom;mstrmojo.threshold.ConditionNode=mstrmojo.declare(mstrmojo.ConditionNode,null,{scriptClass:"mstrmojo.threshold.ConditionNode",emptyText:mstrmojo.desc(5893,"New Condition"),cssClass:"adv-threshold",avatarCssCls:"mstrmojo-thresholdRow",markupString:'<div id="{@id}" class="mstrmojo-cond mstrmojo-ConditionNode {@cssClass} mstrAttach:mousedown"><div class="mstrmojo-onhoverparent mstrmojo-cond-prefix {@cssClass}"><span class="mstrmojo-textset mstrmojo-cond-prefix-text" mstrAttach:click></span><span class="mstrmojo-onhover-in mstrmojo-andor-tools {@cssClass}">{@_prefixAndOrToolsMarkup}</span></div><div class="mstrmojo-onhoverparent mstrmojo-cond-contents {@cssClass}"><span class="mstrmojo-textset mstrmojo-cond-text {@cssClass}" mstrAttach:click></span><span class="mstrmojo-cond-text-postfix {@cssClass}"></span><span class="mstrmojo-rel mstrmojo-cond-popupNode {@cssClass}"></span><span class="mstrmojo-onhover-bl mstrmojo-abs mstrmojo-topright mstrmojo-cond-tools {@cssClass}"><img class="mstrmojo-del" src="../images/1ptrans.gif" tooltip="'+mstrmojo.desc(7931,"Delete condition")+'" onclick="mstrmojo.all[\'{@id}\'].del()" /></span><span class="mstrmojo-add-cond" mstrAttach:click>'+mstrmojo.desc(1994,"Add Condition")+"</span></div></div>",markupSlots:{prefixHoverNode:function(){return this.domNode.firstChild;},prefixNode:function(){return this.domNode.firstChild.firstChild;},prefixAndOrToolsNode:function(){return this.domNode.firstChild.childNodes[1];},condNode:function(){return this.domNode.childNodes[1];},textNode:function(){return this.domNode.childNodes[1].firstChild;},textPostfixNode:function(){return this.domNode.childNodes[1].childNodes[1];},popupNode:function(){return this.domNode.childNodes[1].childNodes[2];},addConditionNode:function(){return this.domNode.childNodes[1].childNodes[4];}},preclick:function pc(evt){var p=null,t=$DOM.eventTarget(evt.hWin,evt.e),_result=this._super(evt);if($DOM.contains(this.addConditionNode,t,true)){p="addCondition";}evt.part=p||evt.part;return _result;},onmouseover:function(){this.toggleGroupBorder(true);},onmouseout:function(){this.toggleGroupBorder(false);}});})();