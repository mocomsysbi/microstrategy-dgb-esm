(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.hash","mstrmojo.util.ui.ColorPicker","mstrmojo.ui.editors.controls.ColorList","mstrmojo.ui.editors.controls.ColorWheel","mstrmojo.Label","mstrmojo.ui.Pulldown","mstrmojo.TextBoxWithLabel","mstrmojo.ui.ButtonBar","mstrmojo.Button","mstrmojo.css","mstrmojo.util.color");mstrmojo.requiresDescs(16164);var MODES_SWATCH=1,MODES_PALETTE=2,$MOJO=mstrmojo,$CSS=$MOJO.css,$ARR=$MOJO.array,$COLOR_PICKER=mstrmojo.util.ui.ColorPicker,$CLRUTIL=$MOJO.util.color,$ROUND=Math.round,lastPickerMode=MODES_SWATCH,STYLE_FILL=0,STYLE_TRANSPARENT=1,STYLE_GRADIENT=2,TEXT_ALIAS="txtColor",VAL_AUTOMATIC="automatic",DEFAULT_COLOR="#ffffff",VAL_TRANSPARENT="transparent";var colorTypeItems=[{n:mstrmojo.desc(12071,"Color fill"),id:STYLE_FILL},{n:mstrmojo.desc(12072,"No fill"),id:STYLE_TRANSPARENT},{n:mstrmojo.desc(12073,"Gradient"),id:STYLE_GRADIENT}];function getDisplayColor(){return this.color!==VAL_AUTOMATIC?this.color:this.autoPreviewColor;}function getSixDigitColorString(color){return $CLRUTIL.getCSSColorString(color);}function getButtonCfg(text,isHot,fnHandler){return mstrmojo.Button.newWebButton(text,fnHandler,isHot,{slot:"buttonNode",cssDisplay:"inline-block"});}function getSelectedIndices(colors){var selected={},currentColor=getDisplayColor.call(this);if(colors&&(typeof currentColor==="string")){currentColor=getSixDigitColorString(currentColor);var currentColorLowerCase=currentColor.toLocaleLowerCase();colors.forEach(function(item,index){if((currentColorLowerCase===item.id.toLocaleLowerCase())&&(currentColorLowerCase!==VAL_TRANSPARENT)){selected[index]=true;}});}return selected;}function getColorListCfg(colors){return{scriptClass:"mstrmojo.ui.editors.controls.ColorList",items:colors,selectedIndices:getSelectedIndices.call(this,colors),postselectionChange:function(evt){var added=evt.added;if(added){var acp=this.parent,color=this.items[added[0]].id;acp.set("color",color);acp.colorChanged(color);}}};}function addHexHashToColor(color){return"#"+color.replace("#","");}function updatePickerColor(){var firstColor=this.txtColor1,secondColor=this.txtColor2,color=this.color,isGradient=false,stylePulldown=this.colorStyle;switch(stylePulldown.items[stylePulldown.selectedIndex].id){case STYLE_FILL:color=addHexHashToColor(firstColor.value);break;case STYLE_TRANSPARENT:color=VAL_TRANSPARENT;break;case STYLE_GRADIENT:color={or:this.gradientOrientation.getSelectedItems()[0].id,c1:addHexHashToColor(firstColor.value),c2:addHexHashToColor(secondColor.value)};isGradient=true;break;}$CSS.toggleClass(this.containerNode,"grad",isGradient);this.set("color",color);}function activateTextBox(activeColorAlias){this.set("activeColor",activeColorAlias);var activeTxtColor=this[activeColorAlias];$ARR.forEach([1,2],function(idx){var txt=this[TEXT_ALIAS+idx];$CSS.toggleClass(txt.domNode,"on",txt===activeTxtColor);},this);this.colorWheel.set("color",addHexHashToColor(activeTxtColor.value));}function getColorTextBoxCfg(index,lblText,value,bindings){if(typeof value==="string"){if(value===VAL_TRANSPARENT){value=DEFAULT_COLOR;}}else{if(!!value&&value.c1){value=value["c"+index];}else{value=DEFAULT_COLOR;}}value=getSixDigitColorString(value);return{scriptClass:"mstrmojo.TextBoxWithLabel",alias:TEXT_ALIAS+index,cssDisplay:"block",label:lblText,autoCorrect:false,maxLength:6,size:6,value:value.replace("#",""),bindings:bindings,onfocus:function(){activateTextBox.call(this.parent,this.alias);},onvalueChange:function(evt){if(!/^[0-9a-fA-F]{0,6}$/.test(evt.value)){this.value=evt.valueWas;}else{if(this.value.length===6){var picker=this.parent;picker.colorWheel.set("color",addHexHashToColor(this.value));updatePickerColor.call(picker);}}}};}function showPalette(){var currentColor=getDisplayColor.call(this),strSelStyleId="this.parent.colorStyle.items[ this.parent.colorStyle.selectedIndex ].id",gradientBindings=strSelStyleId+" === "+STYLE_GRADIENT,fillColorBindings=strSelStyleId+" !== "+STYLE_TRANSPARENT,colorStyleIdx=(this.showNoFill&&currentColor===VAL_TRANSPARENT)?1:0,typeItems=colorTypeItems.slice(0,this.showGradient?3:2),gradientDirectionIdx=0,showGradient=this.showGradient,currentColorGradient=!!currentColor&&currentColor.c1;if(!this.showNoFill){typeItems.splice(1,1);}if(currentColorGradient){colorStyleIdx=$ARR.find(typeItems,"id",STYLE_GRADIENT);gradientDirectionIdx=currentColor.or?0:1;}this.addChildren([{scriptClass:"mstrmojo.ui.Pulldown",alias:"colorStyle",selectedIndex:colorStyleIdx,items:typeItems,visible:(typeItems.length!=1||(currentColorGradient&&!showGradient)),onRender:function buildRendering(){if(!showGradient&&currentColorGradient){this.selectedNode.innerHTML='<div class="mstrmojo-ui-Pulldown-Gradient" style="color:#C0C0C0">'+mstrmojo.desc(16164,"Gradient (Not supported)")+"</div>";}},onitemSelected:function(){updatePickerColor.call(this.parent);}},{scriptClass:"mstrmojo.ui.ButtonBar",alias:"gradientOrientation",items:[{n:mstrmojo.desc(2066,"Horizontal"),id:1,css:"h"},{n:mstrmojo.desc(2069,"Vertical"),id:0,css:"v"}],selectedIndex:gradientDirectionIdx,bindings:{visible:gradientBindings},postselectionChange:function(evt){if(evt.added){updatePickerColor.call(this.parent);}}},{scriptClass:"mstrmojo.Button",cssClass:"simpleButton",text:mstrmojo.desc(11658,"Swap"),bindings:{visible:gradientBindings},onclick:function(){var picker=this.parent,firstColor=picker.txtColor1,secondColor=picker.txtColor2,firstColorVal=firstColor.value;firstColor.set("value",secondColor.value);secondColor.set("value",firstColorVal);updatePickerColor.call(picker);}},getColorTextBoxCfg(1,mstrmojo.desc(12074,"Color HEX:"),currentColor,{visible:fillColorBindings,label:strSelStyleId+" === "+STYLE_GRADIENT+' ? "'+mstrmojo.desc(12075,"Color 1 HEX:")+'" : "'+mstrmojo.desc(12074,"Color HEX:")+'";'}),getColorTextBoxCfg(2,mstrmojo.desc(12076,"Color 2 HEX:"),currentColor,{visible:gradientBindings}),{scriptClass:"mstrmojo.ui.editors.controls.ColorWheel",alias:"colorWheel",color:(!!currentColor&&!!currentColor.c1)?currentColor.c1:(currentColor||DEFAULT_COLOR),onColorPicked:function(color){var picker=this.parent;picker[picker.activeColor].set("value",color.replace("#",""));},bindings:{visible:fillColorBindings}},getButtonCfg(mstrmojo.desc(1442,"Ok"),true,function(){var picker=this.parent,color=picker.color;if(!color.c1){$COLOR_PICKER.addCustomColor(color);}picker.colorChanged(color);}),getButtonCfg(mstrmojo.desc(2140,"Cancel"),false,function(){this.parent.colorCanceled();})]);activateTextBox.call(this,TEXT_ALIAS+"1");}function showNoFillStyle(noFillNodeStyle){var sampleNode=this.sampleNode,borderSize=sampleNode.offsetWidth-sampleNode.clientWidth,w=sampleNode.clientWidth,h=sampleNode.clientHeight,noFillLineLength=Math.sqrt(w*w+h*h)-borderSize,noFillRotation=Math.atan2(h,w)*(-180)/Math.PI+2;sampleNode.style.backgroundColor="#FFFFFF";noFillNodeStyle.display="block";noFillNodeStyle.top=sampleNode.offsetTop+$ROUND(h/2)+"px";noFillNodeStyle.left=sampleNode.offsetLeft+"px";noFillNodeStyle.width=$ROUND(noFillLineLength)+"px";noFillNodeStyle[mstrmojo.dom.CSS3_TRANSFORM]="rotate("+$ROUND(noFillRotation)+"deg)";}function updatePreview(){var previewColor=getDisplayColor.call(this),sampleNodeStyle=this.sampleNode.style;if(previewColor){if(previewColor.c1){var gradient=$CSS.buildGradient(previewColor.or,previewColor.c1,previewColor.c2);sampleNodeStyle[$CSS.convertCssToCamelCase(gradient.n)]=gradient.v;}else{sampleNodeStyle.background=previewColor;if(this.showNoFill&&this.noFillNode&&this.enabled){var noFillNodeStyle=this.noFillNode.style;if(VAL_TRANSPARENT===previewColor){showNoFillStyle.call(this,noFillNodeStyle);}else{noFillNodeStyle.display="none";}}}}sampleNodeStyle.backgroundOrigin="border-box";}mstrmojo.ui.editors.controls.AdvancedColorPicker=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.ui.editors.controls.AdvancedColorPicker",markupString:'<div id="{@id}" class="mstrmojo-ui-AdvColorPicker {@cssClass}" style="{@cssText}" mstrAttach:click><div class="acpToolbar"><div class="acpBtn acpSwatchBtn"></div><div class="acpBtn acpPaletteBtn"></div><div class="acpColor"></div><div class="slash"></div></div><div class="acpContent" ></div><div class="acpButtons" ></div></div>',markupSlots:{swatchBtnNode:function(){return this.domNode.firstChild.firstChild;},paletteBtnNode:function(){return this.domNode.firstChild.childNodes[1];},sampleNode:function(){return this.domNode.firstChild.childNodes[2];},noFillNode:function(){return this.domNode.firstChild.lastChild;},containerNode:function(){return this.domNode.firstChild.nextSibling;},buttonNode:function(){return this.domNode.lastChild;}},markupMethods:{onvisibleChange:mstrmojo.Widget.visibleMarkupMethod,onpickerModeChange:function onpickerModeChange(){lastPickerMode=this.pickerMode;this.renderContent();},oncolorChange:function oncolorChange(){updatePreview.call(this);},onautoPreviewColorChange:function onautoPreviewColorChange(){updatePreview.call(this);}},color:"#000fff",showGradient:false,showNoFill:true,showAutomatic:false,autoPreviewColor:null,activeColor:TEXT_ALIAS+"1",swatchBtnNode:null,paletteBtnNode:null,colorStyle:null,gradientOrientation:null,txtColor1:null,txtColor2:null,colorWheel:null,pickerMode:MODES_SWATCH,init:function init(props){this._super(props);this.pickerMode=lastPickerMode;},renderContent:function renderContent(){this.showPickerForCurrentMode();},showPickerForCurrentMode:function showPickerForCurrentMode(){var me=this;this.removeChildren();var isSwatchMode=lastPickerMode===MODES_SWATCH;if(isSwatchMode){var basicColors=$COLOR_PICKER.getBasicColors();if(!this.showNoFill){basicColors.shift();if(basicColors[0]._renderIdx!==0){$ARR.forEach(basicColors,function(color,idx){color._renderIdx=idx;});}}if(this.showAutomatic&&this.color!==VAL_AUTOMATIC){this.addChildren([{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(4531,"Automatic"),cssClass:"AutomaticOption",onclick:function onclick(){me.set("color",VAL_AUTOMATIC);me.colorChanged(VAL_AUTOMATIC);}}]);}this.addChildren([mstrmojo.hash.copy({alias:"basicColors"},getColorListCfg.call(me,basicColors)),getColorListCfg.call(me,(mstrApp&&mstrApp.getPreferredColors)?$ARR.map(mstrApp.getPreferredColors(),function(color){return{n:color,id:color};}):[]),getColorListCfg.call(me,$COLOR_PICKER.getCustomColors())]);}else{showPalette.call(this);}$CSS.toggleClass(this.swatchBtnNode,"on",isSwatchMode);$CSS.toggleClass(this.paletteBtnNode,"on",!isSwatchMode);this.buttonNode.style.display=isSwatchMode?"none":"block";},colorChanged:mstrmojo.emptyFn,colorCanceled:mstrmojo.emptyFn,onclick:function onclick(evt){var btn=evt.getTarget(),mode=this.pickerMode;if(btn===this.swatchBtnNode){mode=MODES_SWATCH;this.set("pickerMode",mode);}else{if(btn===this.paletteBtnNode){mode=MODES_PALETTE;this.set("pickerMode",mode);}}}});mstrmojo.ui.editors.controls.AdvancedColorPicker.VAL_AUTOMATIC=VAL_AUTOMATIC;}());