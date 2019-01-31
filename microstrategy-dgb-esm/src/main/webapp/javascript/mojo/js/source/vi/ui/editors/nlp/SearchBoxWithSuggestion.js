(function(){mstrmojo.requiresCls("mstrmojo.css","mstrmojo.dom","mstrmojo.string","mstrmojo.ui.SearchBox","mstrmojo._HasSuggestion","mstrmojo.vi.ui.editors.nlp.RichSuggestionList");var $CSS=mstrmojo.css,$DOM=mstrmojo.dom,$STR=mstrmojo.string,CLEAR_ICON_CSS_CLASS="clear";function triggerSearch(){this.searchTriggered(this.inputNode.value);}mstrmojo.vi.ui.editors.nlp.SearchBoxWithSuggestion=mstrmojo.declare(mstrmojo.ui.SearchBox,[mstrmojo._HasSuggestion],{scriptClass:"mstrmojo.vi.ui.editors.nlp.SearchBoxWithSuggestion",markupString:'<div id={@id} class="mstrmojo-ui-SearchBox cf {@cssClass}" style="{@cssText}"><div class="pre-icon"></div><input class="mstrmojo-ui-sb-input" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" mstrAttach:keydown,keyup,blur,focus/><div class="mstrmojo-ui-sb-btn" mstrAttach:click ></div></div>',markupSlots:{inputNode:function inputNode(){return this.domNode.children[1];},searchNode:function searchNode(){return this.domNode.lastChild;}},layoutConfig:{h:{inputNode:"43px",searchNode:"20px"},w:{inputNode:"100%",searchNode:"0px"},xt:true},cssClass:"searchBoxWithSuggest",suggestionListClass:"mstrmojo.vi.ui.editors.nlp.RichSuggestionList",onkeydown:function onkeydown(evt){var hWin=evt.hWin,e=evt.e||hWin.event;if(e.keyCode===9||e.keyCode===13){var selectedItem=this.getSelected();if(selectedItem){this.preventSearch=true;this.onSuggestionItemSelect(selectedItem);}else{this.preventSearch=false;}evt.preventDefault();}else{if(e.keyCode===40){this.nextHighlight(true);}else{if(e.keyCode===38){this.preHighlight(true);}}}},pattern:"",getSearchPattern:function(){return this.pattern;},onkeyup:function onkeyup(evt){var hWin=evt.hWin,e=evt.e||hWin.event;if(e.keyCode===27){if(this.inputNode.value==""){this.hideSuggestion();this.raiseEvent({name:"quitWatermelon"});}this.clearSearch(true);return ;}if(e.keyCode===13&&!this.preventSearch){triggerSearch.call(this);return ;}var me=this,oldText=this.text,inputText=this.text=this.inputNode.value,hasText=this._hasText=inputText.length>0;var tokens=(inputText||"").split(" ").reverse();if(oldText!==inputText){$CSS.toggleClass(this.searchNode,[CLEAR_ICON_CSS_CLASS],hasText);window.clearTimeout(this._searchTimeoutId);this._searchTimeoutId=window.setTimeout(function(){var tokenToSearchCnt=1;var tokenToSearch=[tokens[0]];for(var i=1;i<tokens.length;i++){tokenToSearch.splice(0,0,tokens[i]);var candidates=me.getSuggestion(tokenToSearch.join(" "));if(candidates.length>0){tokenToSearchCnt+=1;}else{tokenToSearch.splice(0,1);break;}}me.pattern=tokenToSearch.join(" ");me.tokenToSearchCnt=tokenToSearchCnt;me.showSuggestion(me.pattern);},this.searchDelay);}},onclick:function onclick(evt){var targetNode=evt.getTarget();if(targetNode===this.searchNode){if(this._hasText){this.clearSearch(true);}else{triggerSearch.call(this);}}},searchTriggered:function searchTriggered(pattern){this.pattern="";},getSuggestionPos:function getSuggestionPos(){var p=$DOM.position(this.inputNode,true);return{left:Math.round(p.x-41)+"px",top:Math.round(p.y+p.h+4)+"px",zIndex:102};},onSuggestionItemSelect:function onSuggestionItemSelect(item){var SPLIT_CHAR="\u200C";var tokens=(this.inputNode.value||"").split(" ").reverse();tokens.splice(0,this.tokenToSearchCnt);tokens=tokens.reverse();var isSampleQuestion=item.type==="sample-question";if(isSampleQuestion){tokens.push(item[this.itemField]);}else{tokens.push(SPLIT_CHAR+item[this.itemField]+SPLIT_CHAR);}this.text=this.inputNode.value=tokens.join(" ");this.pattern="";this.tokenToSearchCnt=0;this.hideSuggestion();this.inputNode.focus();},postApplyProperties:function postApplyProperties(){var suggestionPopup=mstrmojo.hash.clone(this.suggestionPopup);suggestionPopup.cssClass="mstrmojo-ObjectInputBox-suggest nlpSuggestionPopUp";suggestionPopup.children=[{scriptClass:this.suggestionListClass,alias:"list",cssClass:"mstrmojo-suggest-list in-searchbox",updateTooltipConfig:function(){var pos=mstrmojo.dom.position(this.domNode),rtt=this.richTooltip;rtt.cssClass="vi-regular vi-tooltip-C";rtt.posType=mstrmojo.tooltip.POS_TOPLEFT;rtt.left+=pos.x;rtt.top-=40;},getTooltipText:function getTooltipText(item){return item&&$STR.encodeHtmlString(item.n||"");}}];this.suggestionPopup=suggestionPopup;},updateSuggestionPos:function(){if(this.suggestionShown){var me=this;setTimeout(function(){var popup=me._lastOpened,pos=me.getSuggestionPos();popup.set("left",pos.left);popup.set("top",pos.top);},0);}}});}());