(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._Formattable","mstrmojo._ContainsDocObjects","mstrmojo._HasBuilder");mstrmojo.rw.DocSubsection=mstrmojo.declare(mstrmojo.Container,[mstrmojo._Formattable,mstrmojo._ContainsDocObjects,mstrmojo._HasBuilder],{scriptClass:"mstrmojo.rw.DocSubsection",markupString:'<div id="{@id}" k="{@k}" class="mstrmojo-DocSubsection" style="{@domNodeCssText}"></div>',markupSlots:{containerNode:function(){return this.domNode;}},formatHandlers:{domNode:["D","B","background-color","fx"]},update:function update(node){var thresholdId=node.data.tid;if(this.thresholdId||thresholdId){delete this.fmts;}this.thresholdId=thresholdId;if(this._super){this._super(node);}},postBuildRendering:function postBldRndr(){return(this.renderMode!=="scroll")?this._super():true;},childRenderOnAddCheck:function childRenderOnAddCheck(children){return(this.renderMode!=="scroll")?this._super(children):false;},preserveChildDomOrder:false,performCanGrowCanShrink:mstrmojo.emptyFn});}());