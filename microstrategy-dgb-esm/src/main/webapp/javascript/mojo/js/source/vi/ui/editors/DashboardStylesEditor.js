(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.css","mstrmojo.dom","mstrmojo.HBox","mstrmojo.Label","mstrmojo.Button","mstrmojo.Editor","mstrmojo.DocDataService","mstrmojo.models.FormatModel","mstrmojo.chart.model.enums.EnumDSSDefaultFormats","mstrmojo.vi.ui.TextAlignButtonBar","mstrmojo.vi.ui.editors.EditorGroup","mstrmojo.vi.enums.EnumThemeProperties","mstrmojo.ui.editors.controls.ContainerGroup","mstrmojo.ui.editors.controls.CharacterGroup","mstrmojo.gm.GMProperty");mstrmojo.requiresDescs(221,1442,2172,3297,7940,11917,13622,13640,15499,13764,14861,14962);var EnumLayoutStyle={RESERVED:0,CARD:1,BASIC:2};var $HASH=mstrmojo.hash,$ARR=mstrmojo.array,$CSS=mstrmojo.css,$DOM=mstrmojo.dom,$FMT_MODEL=mstrmojo.models.FormatModel,$PROP_NAME=$FMT_MODEL.ENUM_PROPERTY_NAMES,$EDF=mstrmojo.chart.model.enums.EnumDSSDefaultFormats,$CONTAINER_GROUP_CTRL=mstrmojo.ui.editors.controls.ContainerGroup.CTRL_FLAGS;var CSS_CARD="card";var titleInitSettings={};titleInitSettings[$PROP_NAME.FONT_SIZE]=8;titleInitSettings[$PROP_NAME.FONT_FAMILY]="Arial";var overallInitSettings={};overallInitSettings[$PROP_NAME.FONT_FAMILY]="Arial";var FMT_GROUP_OVERALL="overall",FMT_GROUP_TITLE="title",FMT_GROUP_CONTAINER_Fill="containerFill",FMT_GROUP_CONTAINER_Border="containerBorder",FMT_GROUP_CANVAS_Fill="canvasFill",titleFmtTypes=[$EDF.GridTitle,$EDF.ControlTitle],containerFmtTypes=[$EDF.Crosstab,$EDF.Control,$EDF.Text,$EDF.Image,$EDF.HTML],widgetFmtTypes=[$EDF.GraphMatrix,$EDF.HeatMap,$EDF.Network],canvasFmtTypes=[$EDF.Panel],TARGET_FORMATS={overall:{types:[$EDF.Crosstab,$EDF.Control,$EDF.Label,$EDF.Text,$EDF.Image,$EDF.Line,$EDF.Shape,$EDF.HTML,$EDF.Panel,$EDF.PanelStack,$EDF.MetricsHeader,$EDF.MetricsGrid,$EDF.MetricsSubtotalHeader,$EDF.MetricsSubtotalGrid,$EDF.RowHeader,$EDF.RowGrid,$EDF.RowSubtotalHeader,$EDF.RowSubtotalGrid,$EDF.ColumnHeader,$EDF.ColumnGrid,$EDF.ColumnSubtotalHeader,$EDF.ColumnSubtotalGrid].concat(titleFmtTypes).concat(widgetFmtTypes),props:[$PROP_NAME.FONT_FAMILY],initSettings:overallInitSettings},title:{types:titleFmtTypes,props:[$PROP_NAME.FONT_FAMILY,$PROP_NAME.FONT_WEIGHT,$PROP_NAME.FONT_STYLE,$PROP_NAME.UNDERLINE,$PROP_NAME.LINE_THROUGH,$PROP_NAME.FONT_SIZE,$PROP_NAME.COLOR,$PROP_NAME.BACKGROUND_COLOR,$PROP_NAME.TEXT_ALIGN],initSettings:titleInitSettings},containerFill:{types:containerFmtTypes.concat(),props:[$PROP_NAME.BACKGROUND_COLOR]},containerBorder:{types:containerFmtTypes.concat(),props:[$PROP_NAME.BORDER_STYLE,$PROP_NAME.BORDER_COLOR,$PROP_NAME.BORDER_TOP_STYLE,$PROP_NAME.BORDER_TOP_COLOR]},canvasFill:{types:canvasFmtTypes.concat(),props:[$PROP_NAME.BACKGROUND_COLOR,$PROP_NAME.FILL_STYLE,$PROP_NAME.GRADIENT_COLOR,$PROP_NAME.GRADIENT_ANGLE]}};function getTextBoxDefaultColor(){var defaultFmt=$ARR.filterOne(this.controller.model.defmts,function(fmtSet){return fmtSet.dft===$EDF.Text;}),propertyName=$PROP_NAME.COLOR,propInfo=$FMT_MODEL.getFormatPropertyInfo(propertyName),propertyValue=defaultFmt.props[propInfo.ps][propInfo.pn];return $FMT_MODEL.decodeValue(propertyName,propertyValue);}function getLabel(text,cssClass,formatGroup){return{scriptClass:"mstrmojo.Label",text:text,cssClass:cssClass||"",formatGroup:formatGroup};}function getTextsWidget(texts,cssClass){var textsMarkup=texts.map(function(txt){return'<div class="text">'+txt+"</div>";}).join("");return{scriptClass:"mstrmojo.Widget",markupString:'<div class="TextContainer '+(cssClass||"")+'">'+textsMarkup+"</div>"};}function onGroupValueChange(name,newValue){this.parent.parent.parent.onFormatChange(this.formatGroup,name,newValue);}function synchronizeControls(){var defaultFormats=this.controller.model.defmts,cachedSettings={},container=this.container;container.controls.children.concat(container.rc.allfont.children).filter(function(ch){return !!ch.formatGroup;}).forEach(function(ch){var fmtGrp=ch.formatGroup,fmtSetting=cachedSettings[fmtGrp],tgtFmt=TARGET_FORMATS[fmtGrp];if(!fmtSetting){var result={},subset=defaultFormats.filter(function(fmtSet){return tgtFmt.types.indexOf(fmtSet.dft)>-1;});tgtFmt.props.forEach(function(propName){var pInfo=$FMT_MODEL.getFormatPropertyInfo(propName),pn=pInfo.pn,pValues=subset.map(function(fmtSet){var propSets=fmtSet.props,propertySet=propSets[pInfo.ps];return propertySet&&propertySet[(pn instanceof Array)?pn[0]:pn];}),firstVal=pValues[0];if(firstVal!==null&&firstVal!==undefined&&pValues.every(function(value,i){var dft=subset[i].dft;return(fmtGrp==="overall"&&(dft===15||dft===18))?true:value===firstVal;})){result[propName]=firstVal;}else{if(pInfo.pt===2){result[propName]="conflict";}}});fmtSetting=cachedSettings[fmtGrp]=$HASH.copy(result,$HASH.copy(tgtFmt.initSettings));}ch.setFormatSource(fmtSetting);});return cachedSettings;}function updatePreview(settings,encoded,resetPreviews){var container=this.container,preview=container.rc.preview,allTgtPreviews=preview.children.filter(function(w){return !!w.formatGroup;});if(resetPreviews){allTgtPreviews.forEach(function(prev){prev.domNode.style.cssText="";});}$CSS.toggleClass(preview.domNode,CSS_CARD,this.layoutStyle===EnumLayoutStyle.CARD);$HASH.forEach(settings,function(fmts,fmtGrp){var formatTgts=allTgtPreviews.filter(function(ch){return ch.formatGroup===fmtGrp;});$ARR.forEach(formatTgts,function(tgt){var tgtStyle=tgt.domNode.style;if(fmts.bgs&&fmts.bc){fmts={bc:$FMT_MODEL.getGradientValues(fmts)};}$HASH.forEach(fmts,function(value,propertyName){var sn="",sv=encoded&&typeof (value)!=="object"?$FMT_MODEL.decodeValue(propertyName,value):value;if(propertyName===$PROP_NAME.FONT_FAMILY){sn="fontFamily";sv="'"+sv+"'";}else{if(propertyName===$PROP_NAME.FONT_SIZE){sn="fontSize";sv=parseInt(sv,10).toString()+"pt";}else{if(propertyName===$PROP_NAME.COLOR){sn="color";}else{if(propertyName===$PROP_NAME.BACKGROUND_COLOR){if(sv.c1){sv=$FMT_MODEL.decodeGradientValue(sv);tgtStyle.backgroundColor="transparent";sn="background";var gradient=$CSS.buildGradient(sv.or,sv.c1,sv.c2);sv=(gradient&&gradient.v)||sv;}else{tgtStyle.background="";sn="backgroundColor";}}else{if(propertyName===$PROP_NAME.FONT_WEIGHT){sn="fontWeight";sv=value?"bold":"";}else{if(propertyName===$PROP_NAME.FONT_STYLE){sn="fontStyle";sv=value?"italic":"";}else{if(propertyName===$PROP_NAME.TEXT_ALIGN){sn="textAlign";sv=container.controls.txtAlign.items.filter(function(item){return item.v===value;})[0].id;}else{if(propertyName===$PROP_NAME.BORDER_COLOR){sn="borderColor";}else{if(propertyName===$PROP_NAME.BORDER_STYLE){sn="border";sv=sv+" "+(tgtStyle.borderColor||"transparent");}else{if(propertyName===$PROP_NAME.UNDERLINE||propertyName===$PROP_NAME.LINE_THROUGH){sn="textDecoration";var valStr=propertyName===$PROP_NAME.UNDERLINE?"underline":"line-through";sv=(tgtStyle[sn].replace(valStr,"")+" "+(value?valStr:"")).trim();}}}}}}}}}}tgtStyle[sn]=sv;});});},this);}function parseSingleQuoteJSON(jsonStr){return JSON.parse((jsonStr||"{}").replace(/\'/g,'"'));}function stringifyToSingleQuote(jsonObj){return JSON.stringify(jsonObj).replace(/\"/g,"'");}function getUpdateWidgetFontActions(defaultFormats,widgetFmtTypes,fontFamily){var actions=[],buildWidgetPropsXML=function buildWidgetPropsXML(vp){var xml=new mstrmojo.XMLBuilder();xml.addChild("props");xml.addChild("widgetProps");xml.addChild("fmt");$HASH.forEach(vp,function(v,n){xml.addChild(n);xml.addAttribute("value",v);xml.closeElement();});xml.closeElement();xml.closeElement();xml.closeElement();return xml.toString();};widgetFmtTypes.forEach(function(ft){var vp=$HASH.copy(defaultFormats.filter(function(defFmt){return defFmt.dft===ft;})[0].props.FormattingWidget.props.widgetProps.fmt),mergeObj=function mergeObj(srcObj,destObj){destObj=destObj||{};$HASH.forEach(srcObj,function(val,key){if(typeof val==="object"){destObj[key]=mergeObj(val,destObj[key]);}else{destObj[key]=val;}});return destObj;},mergeSettingsToVP=function mergeSettingsToVP(vpProp,newSettings){vp[vpProp]=stringifyToSingleQuote(mergeObj(newSettings,parseSingleQuoteJSON(vp[vpProp])));};if(ft===$EDF.GraphMatrix){var gmFontFamilyProps=mstrmojo.gm.GMProperty.getUnderlyingPropertyNameWithAll("allTxtFntFml");gmFontFamilyProps.forEach(function(fntProp){vp[fntProp]=fontFamily;});}else{if(ft===$EDF.Network){vp.lgFntFml=fontFamily;mergeSettingsToVP("BubFnt",{fontFamily:fontFamily});}else{if(ft===$EDF.HeatMap){vp.lgFntFml=fontFamily;mergeSettingsToVP("fts",{headerOnMiddle:{family:fontFamily},headerOnTop:{header:{family:fontFamily},cell:{family:fontFamily}}});}}}actions.push({act:"setDefaultFormat",dssFormatTypes:ft.toString(),format:{FormattingWidget:{WidgetProps:buildWidgetPropsXML(vp)}}});});return actions;}mstrmojo.vi.ui.editors.DashboardStylesEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.vi.ui.DashboardStylesEditor",title:mstrmojo.desc(15499,"Dossier Formatting Properties"),controller:null,help:"Defining_default_fonts_and_colors_for_the_objects_.htm",oldLayoutStyle:EnumLayoutStyle.RESERVED,layoutStyle:EnumLayoutStyle.RESERVED,useRichTooltip:true,shouldShowTooltip:function shouldShowTooltip(evt,win){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e);return target&&target.className&&(target.className.indexOf("mstrmojo-Label")>-1)&&(target.scrollWidth>target.clientWidth);},getTooltipContent:function getTooltipContent(evt){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),content=target.innerHTML;return content;},showTooltip:function showTooltip(evt,win){if(this.shouldShowTooltip(evt,win)){this.updateTooltipConfig(evt);mstrmojo.tooltip.open(this,evt,win);}},updateTooltipConfig:function updateTooltipConfig(evt){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),position=$DOM.position(target);this.richTooltip={posType:mstrmojo.tooltip.POS_TOPLEFT,content:this.getTooltipContent(evt),top:position.y+position.h+3,left:position.x+4,cssClass:"vi-regular vi-tooltip-A"};},init:function init(props){this._super(props);$CSS.addWidgetCssClass(this,"DashboardStyles");if(mstrApp.isWSStyling){this.set("title",mstrmojo.desc(14861,"Dossier Formatting Properties"));}},onlayoutStyleChange:function onlayoutStyleChange(evt){var fillColor=this.layoutStyle==EnumLayoutStyle.CARD?"#f6f6f6":"#fff",cavasColorPicker=this.container.controls.canvasFill.fillColor.children[1].colorPicker;cavasColorPicker.set("color",fillColor);cavasColorPicker.colorChanged(fillColor);},onOpen:function onOpen(){var preview=this.container.rc.preview;preview.domNode.setAttribute("themeClassName",this.controller.rootCtrl.view.themeClassName);this.layoutStyle=this.oldLayoutStyle=this.controller.model.getCurrentLayoutStyle();var layoutstyleCtrl=this.container.controls.layoutstyle;if(this.layoutStyle){layoutstyleCtrl.set("selectedIndex",this.layoutStyle==EnumLayoutStyle.CARD?0:1);layoutstyleCtrl.set("visible",true);$CSS.toggleClass(this.domNode,"spatial",true);}else{layoutstyleCtrl.set("visible",false);$CSS.toggleClass(this.domNode,"spatial",false);}var LAYOUT_PROPS=mstrApp.getThemeProps(mstrmojo.vi.enums.EnumThemeProperties.SUBTYPE.LAYOUT);TARGET_FORMATS.overall["initSettings"][$PROP_NAME.FONT_FAMILY]=LAYOUT_PROPS.allFF;TARGET_FORMATS.title["initSettings"][$PROP_NAME.FONT_FAMILY]=LAYOUT_PROPS.titleFF;this._initSettings=synchronizeControls.call(this);updatePreview.apply(this,[this._initSettings,true,true]);preview.textBox.domNode.style.color=getTextBoxDefaultColor.call(this);this._settings={};},onFormatChange:function onFormatChange(formatGroup,formatName,newValue){var groupSettings=this._settings[formatGroup]=this._settings[formatGroup]||{};groupSettings[formatName]=newValue;updatePreview.call(this,this._settings);},onOK:function onOK(){var actions=[],docCtrl=this.controller,settings=this._settings,model=docCtrl.model;if(this.layoutStyle!==this.oldLayoutStyle){actions.push(model.getDocPropsActions($FMT_MODEL.getFormatUpdate($FMT_MODEL.ENUM_PROPERTY_NAMES.LAYOUT_STYLE,this.layoutStyle)));}[FMT_GROUP_OVERALL,FMT_GROUP_TITLE,FMT_GROUP_CONTAINER_Fill,FMT_GROUP_CONTAINER_Border,FMT_GROUP_CANVAS_Fill].forEach(function(fmtGrp){var fmts=settings[fmtGrp];if(fmts){var fmtObj={};if(fmtGrp===FMT_GROUP_OVERALL){actions=actions.concat(getUpdateWidgetFontActions(model.defmts,widgetFmtTypes,fmts[$PROP_NAME.FONT_FAMILY]));}$HASH.forEach(fmts,function(value,propName){$FMT_MODEL.getFormatUpdate(propName,value,fmtObj);});actions.push({act:"setDefaultFormat",dssFormatTypes:TARGET_FORMATS[fmtGrp].types.join("\u001E"),format:fmtObj});}});if(actions.length){docCtrl.submitUndoRedoUpdates(actions,null,mstrmojo.func.wrapMethods({success:function(res){model.defmts=res.defmts;var layoutStyle=res.layoutstyle;model.layoutstyle=layoutStyle;docCtrl.rootCtrl.view.set("layoutStyle",layoutStyle);}},docCtrl.getRefreshCallback()),mstrmojo.DocDataService.REQUEST_DEFN_DATA);}},children:[{scriptClass:"mstrmojo.HBox",alias:"container",children:[{scriptClass:"mstrmojo.vi.ui.editors.EditorGroup",alias:"controls",width:"156px",showDivider:false,children:[getLabel(mstrmojo.desc(16045,"Page Style"),"canvas"),{scriptClass:"mstrmojo.ui.CheckList",cssClass:"layoutstyle",alias:"layoutstyle",orientation:"h",multiSelect:false,items:[{n:mstrmojo.desc(16046,"Card"),cls:"card",v:1},{n:mstrmojo.desc(7805,"Flat"),cls:"basic",v:2}],onchange:function onchange(evt){this.parent.parent.parent.set("layoutStyle",this.items[evt.added[0]].v);}},{scriptClass:"mstrmojo.ui.editors.controls.ContainerGroup",cssClass:"bg",visibleControls:$CONTAINER_GROUP_CTRL.FILL_COLOR,secondColumnWidth:50,fillColorTitle:mstrmojo.desc(3905,"Background"),formatGroup:FMT_GROUP_CANVAS_Fill,alias:"canvasFill",onGroupValueChange:onGroupValueChange,showBackgroundNoFill:false,showBackgroundGradient:true},getLabel(mstrmojo.desc(16047,"Container Title Bar"),"title"),{scriptClass:"mstrmojo.ui.editors.controls.ContainerGroup",visibleControls:$CONTAINER_GROUP_CTRL.FILL_COLOR,showBackgroundNoFill:false,secondColumnWidth:50,formatGroup:FMT_GROUP_TITLE,onGroupValueChange:onGroupValueChange},getLabel(mstrmojo.desc(3433,"Font"),"font-container"),{scriptClass:"mstrmojo.ui.editors.controls.CharacterGroup",alias:"titleFontFmt",formatGroup:FMT_GROUP_TITLE,onGroupValueChange:onGroupValueChange},{scriptClass:"mstrmojo.vi.ui.TextAlignButtonBar",alias:"txtAlign",formatGroup:FMT_GROUP_TITLE,setFormatSource:function(formats){this._inSync=true;this.singleSelect($ARR.find(this.items,"v",formats[$PROP_NAME.TEXT_ALIGN]));this._inSync=false;},onValueChange:function(newValue){if(!this._inSync){onGroupValueChange.apply(this,[$PROP_NAME.TEXT_ALIGN,newValue]);}}},getLabel(mstrmojo.desc(16048,"Container Body"),"container"),{scriptClass:"mstrmojo.ui.editors.controls.ContainerGroup",visibleControls:$CONTAINER_GROUP_CTRL.FILL_COLOR,secondColumnWidth:50,formatGroup:FMT_GROUP_CONTAINER_Fill,onGroupValueChange:onGroupValueChange,showBackgroundNoFill:false},{scriptClass:"mstrmojo.ui.editors.controls.ContainerGroup",borderTitle:mstrmojo.desc(9736,"Border"),secondColumnWidth:50,visibleControls:$CONTAINER_GROUP_CTRL.BORDER,formatGroup:FMT_GROUP_CONTAINER_Border,onGroupValueChange:onGroupValueChange}]},{scriptClass:"mstrmojo.Box",alias:"rc",width:"564px",children:[{scriptClass:"mstrmojo.ui.editors.controls.TwoColumnContainer",cssClass:"allfonts",alias:"allfont",formatGroup:FMT_GROUP_OVERALL,col1Width:"20%",col2Width:"40%",children:[$HASH.copy(getLabel(mstrmojo.desc(16049,"All Fonts"),"fontLabel"),{slot:"col1Node"}),{scriptClass:"mstrmojo.ui.editors.controls.CharacterGroup",visibleControls:mstrmojo.ui.editors.controls.CharacterGroup.CTRL_FLAGS.FONT_FAMILY,formatGroup:FMT_GROUP_OVERALL,slot:"col2Node",onGroupValueChange:function(name,newValue){onGroupValueChange.call(this.parent,name,newValue);this.parent.parent.parent.controls.titleFontFmt.fontFamily.selectItemByField("id",newValue);}}]},{scriptClass:"mstrmojo.Box",alias:"preview",cssClass:"mstrmojo-DashboardStylesEditor-preview",children:[getLabel("","canvasPrev",FMT_GROUP_CANVAS_Fill),getLabel("","containerFillPrev cfp1",FMT_GROUP_CONTAINER_Fill),getLabel("","containerFillPrev cfp2",FMT_GROUP_CONTAINER_Fill),getLabel("","containerFillPrev cfp3",FMT_GROUP_CONTAINER_Fill),getLabel("","themePrev"),{scriptClass:"mstrmojo.Box",cssClass:"visTextsPrev",formatGroup:FMT_GROUP_OVERALL,alias:"textBox",children:[getTextsWidget([mstrmojo.desc(16051,"Analytics and Mobility for the Intelligent Enterprise."),"</BR>",mstrmojo.desc(16052,"We provide powerful software solutions and expert services that empower every individual with actionable intelligence, helping enterprises unleash the full potential of their people and investments.")],"textbox")]},getLabel(mstrmojo.desc(11917,"Container"),"titlePrev tp1",FMT_GROUP_TITLE),getLabel(mstrmojo.desc(11917,"Container"),"titlePrev tp2",FMT_GROUP_TITLE),getLabel("","containerBorderPrev cbp1",FMT_GROUP_CONTAINER_Border),getLabel("","containerBorderPrev cbp2",FMT_GROUP_CONTAINER_Border),getLabel("","containerBorderPrev cbp3",FMT_GROUP_CONTAINER_Border)]},getLabel(mstrmojo.desc(16050,"This is a sample preview"),"tip"),{scriptClass:"mstrmojo.Box",alias:"btns",cssClass:"mstrmojo-btns",children:[mstrmojo.Button.newWebButton(mstrmojo.desc(1442,"OK"),function(){var editor=this.parent.parent.parent.parent;editor.onOK();editor.close();},true,{cssDisplay:"inline-block"}),mstrmojo.Button.newWebButton(mstrmojo.desc(221,"Cancel"),function(){this.parent.parent.parent.parent.close();},false,{cssDisplay:"inline-block"})]}]}]}]});mstrmojo.vi.ui.editors.DashboardStylesEditor.ENUM_LAYOUT_STYLE=EnumLayoutStyle;}());