(function(){mstrmojo.requiresCls("mstrmojo.ui.PopupButton","mstrmojo.ui.PopupWidget","mstrmojo.Tooltip","mstrmojo.Slider","mstrmojo.RadioList","mstrmojo.Refine.SampleSlider","mstrmojo.css","mstrmojo.Refine.RefineValidateStepper");mstrmojo.requiresDescs(1302,547,14703,14697,14697,14699,14700,14701,14704,14724,14753,14754,14755,14756,14757,14758,14759,4046,14816,14897,134,14818);var $WIDGET=mstrmojo.Widget;var USECOMMA=false;var $NWB=mstrmojo.Button.newWebButton,$CSS=mstrmojo.css,$DES=mstrmojo.desc;function handleClickButtonsForWS(isFinish){var ctrl=mstrApp.getRootController(),refineCtrl=ctrl.refineApp.rootController,m=refineCtrl.model,tbid=refineCtrl.tableID,pw=this,value=pw.itembox.steper.textInput.value;value=decomma(pw.itembox.steper.textInput.value);value=parseInt(value,10);if(isFinish&&!isNaN(value)){if(m.hasUploadData){refineCtrl.setSampleData(value,!parseInt(pw.itembox.randomType.selectedIndex,10));}else{ctrl.dataService.startRefineStage({success:function(){m.hasUploadData=true;refineCtrl.setSampleData(value,!parseInt(pw.itembox.randomType.selectedIndex,10));},failure:function(res){ctrl.displayError(res&&res.message);}},{did:tbid,flag:4});}}pw.close();}function comma(value){return USECOMMA?value.toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,"):value;}function decomma(value){return USECOMMA?parseInt(value.toString().replace(/,/g,""),10):value;}function getPopupWidgetRefForWS(){return{alias:"popupWidget",scriptClass:"mstrmojo.ui.PopupWidget",visible:false,cssClass:"mstrmojo-Refine-RefineSampleButton-Popup",children:[{scriptClass:"mstrmojo.HBox",cssText:" margin: 20px,20px,20px,0",alias:"itembox",bindings:{cssClass:function(){if(!!mstrApp.isWorkstation){return"workstation box";}else{return"box";}}},children:[{scriptClass:"mstrmojo.ui.Pulldown",title:"",alias:"randomType",cssText:"height:20px; width:80px;",select:true,selectedIndex:0,items:[{n:mstrmojo.desc(4046,"First"),v:0},{n:mstrmojo.desc(14816,"Random"),v:1}],onSelectedItemChange:function(){this.parent.parent.parent.toggleRefresh(true);}},{scriptClass:"mstrmojo.Refine.RefineValidateStepper",alias:"steper",vflag:true,onvflagChange:function(e){this.parent.parent.bottom_buttons.children[0].set("enabled",e.value);},width:null,height:null,provider:new mstrmojo.NumStepperContentProvider({item:{interval:1000,value:1000}})},{scriptClass:"mstrmojo.Label",alias:"label",text:mstrmojo.desc(14897,"rows"),cssDisplay:"inline-block"}]},{scriptClass:"mstrmojo.Box",cssClass:"box",alias:"bottom_buttons",cssDisplay:"inline-block",children:[$NWB($DES(134,"Apply"),function(){handleClickButtonsForWS.call(this.parent.parent,true);},true,{alias:"finish",cssDisplay:"inline-block",height:"22px"}),$NWB($DES(2140,"Cancel"),function(){handleClickButtonsForWS.call(this.parent.parent,false);},false,{cssDisplay:"inline-block",height:"22px"})]}]};}function onPopupWidgetOpenedForWS(){var ctrl=mstrApp.getRootController(),refineCtrl=ctrl.refineApp.rootController,m=refineCtrl.model,samples=m.sampleStatus,pw=this.getPopupWidget(),current,total,value=0;if(!samples){value=1000;}else{current=samples.current;total=samples.total;value=Math.max(current,0);}pw.itembox.steper.textInput.set("max",!total||total>10000?10000:parseInt(total,10));pw.itembox.steper.textInput.set("value",value);pw.itembox.steper.provider.set("curVal",value);}mstrmojo.Refine.RefineSampleButton=mstrmojo.declare(mstrmojo.ui.PopupButton,null,{scriptClass:"mstrmojo.Refine.RefineSampleButton",markupString:'<div id="{@id}" style="{@cssText}" class="mstrmojo-Refine-RefineSampleButton {@cssClass}" mstrAttach:mousedown,click><div class="mstrmojo-Refine-RefineSampleButton-text mstrmojo-Button-text mstrmojo-Button mstrmojo-WebHoverButton" title="{@title}" style="{@labelCssText}">{@text}</div><div class="container"></div></div>',markupSlots:{textNode:function textNode(){return this.domNode.firstChild;},containerNode:function containerNode(){return this.domNode.lastChild;}},markupMethods:{onvisibleChange:$WIDGET.visibleMarkupMethod,onheightChange:$WIDGET.heightMarkupMethod,onwidthChange:$WIDGET.widthMarkupMethod},text:$DES(14818,"Sample Size"),anchorSlot:"textNode",children:[],initChildren:function initChildren(){this.children=this.getPopupWidgetRef();this._super();},getPopupWidget:function(){return this.popupWidget;},onPopupWidgetOpened:onPopupWidgetOpenedForWS,getPopupWidgetRef:getPopupWidgetRefForWS,postBuildRendering:function(){if(this._super){this._super();}var ctrl=mstrApp.getRootController(),refineCtrl=ctrl.refineApp.rootController,source=ctrl.getModel().currentSource;this.m=refineCtrl.model;this.h4LessThan1k=this.m.attachEventListener("dataChange",this.id,this.lessThanOneKRows);this.h1KandLoaded=this.m.attachEventListener("sampleStatusChange",this.id,this.OneKandAllLoaded);this.m.attachEventListener("sampleStatusChange",this.id,this.refreshToggle);this.attachEventListener("renderComplete",this.id,this.onuseRichTooltipChange);if(!(source&&source.canRandomSample())){this.set("visible",false);}},lessThanOneKRows:function(evt){var dataNumInitial=parseInt(evt.value.totalInitial,10);if(dataNumInitial<1000){this.toggleButton(false);}this.m.detachEventListener(this.h4LessThan1k);},OneKandAllLoaded:function(){var ctrl=mstrApp.getRootController(),value=this.popupWidget.itembox.steper.textInput.value;if(this.m.sampleStatus.total===1000){this.toggleButton(false);ctrl.displayError($DES(14724,"All data from the source has been added in the data wrangler preview"));}else{if(this.m.sampleStatus.total<=value){ctrl.displayError($DES(14724,"All data from the source has been added in the data wrangler preview"));this.toggleRefresh(true);}else{this.toggleRefresh(true);}}this.m.detachEventListener(this.h1KandLoaded);},toggleButton:function(bool){var flag=!!bool;this.set("useRichTooltip",!flag);this.set("enabled",flag);if(flag){$CSS.removeClass(this.textNode,"_disable-Button");}else{$CSS.addClass(this.textNode,"_disable-Button");}},toggleRefresh:function(bool){var flag=!!bool;this.parent.refreshButton.set("visible",!!(flag&&this.m.hasAddSample()&&!!parseInt(this.popupWidget.itembox.randomType.selectedIndex,10)));},refreshToggle:function(evt){var sampleState=evt.value,total=parseInt(sampleState.total,10),flag=false;if(sampleState.random===true&&total>1000){flag=true;}this.toggleRefresh(flag);}});}());