(function(){mstrmojo.requiresCls("mstrmojo.ui.CheckList","mstrmojo.css","mstrmojo.dom","mstrmojo._HasTooltip");var $DOM=mstrmojo.dom,$TOOLTIP=mstrmojo.tooltip,$CSS=mstrmojo.css;var CSS_ONLY="only";var baseItemMarkup;var onlyItemMarkup;mstrmojo.vi.ui.rw.selectors.CheckList=mstrmojo.declare(mstrmojo.ui.CheckList,[mstrmojo._HasTooltip],{scriptClass:"mstrmojo.vi.ui.rw.selectors.CheckList",isShowOnly:true,tooltip:"",useRichTooltip:true,init:function init(props){this._super(props);$CSS.addWidgetCssClass(this,"mstrmojo-vi-sel-CheckList");if($DOM.isSafari){$CSS.addWidgetCssClass(this,"safari-checklist");}},shouldShowTooltip:function shouldShowTooltip(evt,win){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e);return target.classList.contains("text");},getTooltipContent:function getTooltipContent(evt){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e);return target&&target.innerText;},updateTooltipConfig:function updateTooltipConfig(evt){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),position=$DOM.position(target),leftPadding=35,arrowType="vi-tooltip-C",posType=$TOOLTIP.POS_TOPLEFT;if(!this.multiSelect){leftPadding=6;}var leftOffset=position.w+leftPadding,windowWidth=$DOM.windowDim().w;if(windowWidth<(position.x+leftOffset+300)){arrowType="vi-tooltip-D";leftOffset=-25;posType=$TOOLTIP.POS_TOPRIGHT;}this.richTooltip={content:this.getTooltipContent(evt),top:-4,cssClass:"vi-regular "+arrowType,left:leftOffset,refNode:target,posType:posType};},showTooltip:function showTooltip(evt,win){if(this.shouldShowTooltip(evt,win)){this._super(evt,win);}},getItemMarkup:function getItemMarkup(item,idx){if(!baseItemMarkup){baseItemMarkup=this._super(item).replace('<span class="text">{@en@n}</span>','<span class="icon"></span><span class="text">{@en@n}</span>');onlyItemMarkup=this._super(item).replace('<span class="text">{@en@n}</span>','<span class="'+CSS_ONLY+'">'+mstrmojo.desc(11573,"only")+'</span><span class="icon"></span><span class="text">{@en@n}</span>');}if(this.isShowOnly&&(!this.multiSelect||(idx!==this.allIdx&&idx!==this.noneIdx))){return onlyItemMarkup;}return baseItemMarkup;},getItemProps:function getItemProps(item,idx){var props=this._super(item,idx);if(((this.isHoriz&&(this.orientation!=="v"))||(!this.isHoriz&&this.orientation==="h"))&&this.itemWidthMode===0){var itemCnt=this.items.length,width=100/itemCnt;if(idx===itemCnt-1){width=100-((itemCnt-1)*width);}props.addStyle("width:"+width+"%");}return props;},onclick:function onclick(evt){var target=evt.getTarget(),item=this.getItemFromTarget(target);if(target.className===CSS_ONLY){if(item){this.docSelector.handleActionInSyncPhase(function(){this.clearSelect();},this);this.select([item._renderIdx]);}}else{if(item){this.doItemSelect(item,evt||{});}}}});}());