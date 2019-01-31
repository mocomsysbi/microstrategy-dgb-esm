(function(){mstrmojo.requiresCls("mstrmojo.vi.models.editors.BaseEditorModel","mstrmojo.ui.editors.controls.CharacterGroup","mstrmojo.ui.editors.controls.ContainerGroup","mstrmojo.ui.editors.controls.XtabResizeGroup","mstrmojo.ui.editors.CharacterToolbarPopup","mstrmojo.vi.enums.EnumThemeProperties","mstrmojo.Label","mstrmojo.hash","mstrmojo.array","mstrmojo.VisUtility","mstrmojo.color","mstrmojo.models.FormatModel","mstrmojo.models.template.DataInterface");mstrmojo.requiresDescs(15191,15192,15193,15230,15231,15232,15792);var TARGET_COL=2,TARGET_ROW=3,TARGET_VALUES=4,TARGET_GENERAL=5,MAX_ROWS_OUTLINE_WARNING=5000;var $CONTAINER_FLAGS=mstrmojo.ui.editors.controls.ContainerGroup.CTRL_FLAGS,$ENUM_FORMAT_PROPERTIES=mstrmojo.models.FormatModel.ENUM_PROPERTY_NAMES,$GET_FORMAT_OBJ=mstrmojo.models.FormatModel.getFormatUpdate,$HASH=mstrmojo.hash,$ARR=mstrmojo.array,$VIS_UTILITY=mstrmojo.VisUtility;var targetFormatMap={};targetFormatMap[TARGET_COL]="ch";targetFormatMap[TARGET_ROW]="rh";targetFormatMap[TARGET_VALUES]="va";var FMT_SUBTOTAL_PROPNAME="st";var targetSubtotalFormatPropName={};targetSubtotalFormatPropName[TARGET_ROW]="SUBTOTAL_FORMAT_USE_ROWHEADERS";targetSubtotalFormatPropName[TARGET_COL]="SUBTOTAL_FORMAT_USE_COLUMNHEADERS";targetSubtotalFormatPropName[TARGET_VALUES]="SUBTOTAL_FORMAT_USE_VALUES";var cellAlignValueMap={left:2,center:3,right:4,justify:6};function isEmptyObject(obj){return Object.keys(obj).length===0;}function getGridCellFormats(){var gridData=this.getHost().gridData,gridStructureInfo=gridData&&gridData.gsi;return(gridStructureInfo&&gridStructureInfo.fmts)||{};}function showBanding(){var xtab=this.getHost(),show=xtab.gridInfo&&xtab.gridInfo.prop&&xtab.gridInfo.prop.sb,fnChange=function(show){xtab.showBanding(show);};return this.getCheckboxAndLabel(!!show,mstrmojo.desc(15758,"Enable Banding"),fnChange);}var showOutlinefn=function showOutlinefn(){var xtab=this.getHost();xtab.showOutlineModeOption(true);};function showOutlineModeOption(){var xtab=this.getHost(),gridData=xtab.gridData,me=this,show=gridData.olm&&!(gridData.rw&&gridData.rw.row.bc>0),fnChange=function fnChange(show){var rc=parseInt(xtab.rhsCP&&xtab.rhsCP.rc||0,10);if(show&&rc&&rc>mstrmojo.vi.models.editors.XtabEditorModel.ENUM_MAX_ROWS_OUTLINE){var closeFn=function closeFn(ref){ref.checked=false;};var checkboxRef=this;mstrmojo.confirm(mstrmojo.desc(15792,"The dossier will attempt to display more than 5000 rows in outline mode. This may affect performance and stability. Do you want to continue?"),null,{id:"OutlineModeWarningDialog",title:mstrmojo.desc(15759,"Enable Outline"),allowHTML:false,buttons:[mstrmojo.Button.newWebButton(mstrmojo.desc(212,"Continue"),showOutlinefn.bind(me)),mstrmojo.Button.newWebButton(mstrmojo.desc(3416,"Cancel"),closeFn(checkboxRef))],onPreClose:function(){closeFn();return true;}});}else{xtab.showOutlineModeOption(show);}},outLine=this.getCheckboxAndLabel(!!show,mstrmojo.desc(15759,"Enable Outline"),fnChange);if(mstrApp.isAppStatePause&&mstrApp.isAppStatePause()||xtab.model.hasRecursiveAttribute(gridData)){outLine.set("enabled",false);}return outLine;}function getCellVerticalAlign(formats,fnChange){return this.getButtonBar([{n:mstrmojo.desc(7575,"Top"),v:1,css:"top"},{n:mstrmojo.desc(8631,"Middle"),v:2,css:"middle"},{n:mstrmojo.desc(7576,"Bottom"),v:3,css:"bottom"}],formats[$ENUM_FORMAT_PROPERTIES.VERTICAL_ALIGN]-1,function(newItem,oldItem){fnChange(newItem.v,oldItem&&oldItem.v);},{cssClass:"cellAlign"});}function getCellTextAlign(formats,fnChange){return this.getTextAlign($HASH.keyarray(cellAlignValueMap).filter(function(a){return formats[$ENUM_FORMAT_PROPERTIES.TEXT_ALIGN]===cellAlignValueMap[a];})[0],fnChange,cellAlignValueMap);}function getTargetFormats(targetValue,isSubtotalFormat){var gridCellFormats=getGridCellFormats.call(this),targetFormat=targetFormatMap[targetValue];if(!isSubtotalFormat){return gridCellFormats[targetFormat];}var subtotalFormat=gridCellFormats[FMT_SUBTOTAL_PROPNAME]||{};return subtotalFormat[targetFormat]||gridCellFormats[targetFormat];}function getTargetFormatHandler(targetValue,isSubtotalFormat){var xtab=this.getHost(),isSubtotalFormatUsingGridFormat=xtab.getSubtotalFormatUseGridFormat(targetValue);return function(property,newValue){if(!isSubtotalFormat||(isSubtotalFormat&&!isSubtotalFormatUsingGridFormat)){xtab.formatGridZone(targetFormatMap[targetValue],$GET_FORMAT_OBJ(property,newValue),{isSubtotalFormat:isSubtotalFormat,isSubtotalUseGridFormatting:isSubtotalFormatUsingGridFormat});}else{xtab.UpdatePropAndformatGridZone(targetValue,$GET_FORMAT_OBJ(property,newValue),{isSubtotalFormat:isSubtotalFormat,isSubtotalUseGridFormatting:isSubtotalFormatUsingGridFormat});}};}function getGridCellGroups(targetValue,isSubtotalFormat){var formats=getTargetFormats.call(this,targetValue,isSubtotalFormat),fnChangeProperty=getTargetFormatHandler.call(this,targetValue,isSubtotalFormat),fnGetChangePropFn=function(property){return function(newValue){fnChangeProperty(property,newValue);};};return[this.getCharacterGroup(fnChangeProperty,formats),getCellTextAlign.call(this,formats,fnGetChangePropFn($ENUM_FORMAT_PROPERTIES.TEXT_ALIGN)),getCellVerticalAlign.call(this,formats,fnGetChangePropFn($ENUM_FORMAT_PROPERTIES.VERTICAL_ALIGN)),this.getContainerGroup(formats,fnChangeProperty,$CONTAINER_FLAGS.FILL_COLOR,{showBackgroundNoFill:targetValue===TARGET_VALUES}),this.getContainerGroup(formats,fnChangeProperty,$CONTAINER_FLAGS.BORDER,{borderTitle:mstrmojo.desc(12130,"Horizontal lines"),targetBorder:"bottom"}),this.getContainerGroup(formats,fnChangeProperty,$CONTAINER_FLAGS.BORDER,{borderTitle:mstrmojo.desc(12131,"Vertical lines"),targetBorder:"right"}),this.getWrapText(!!formats[$ENUM_FORMAT_PROPERTIES.TEXT_WRAP],fnGetChangePropFn($ENUM_FORMAT_PROPERTIES.TEXT_WRAP))];}function getSubTotalFormatContent(fmtTarget){var checkBoxDes={};checkBoxDes[TARGET_COL]=mstrmojo.desc(15232,"Same as Column Headers");checkBoxDes[TARGET_ROW]=mstrmojo.desc(15231,"Same as Row Headers");checkBoxDes[TARGET_VALUES]=mstrmojo.desc(15230,"Same as Values");var xtab=this.getHost(),isSubtotalFormatUseGridFormat=xtab.getSubtotalFormatUseGridFormat(fmtTarget),hasSubtotal=xtab.hasSubtotal(fmtTarget),fnCheckBoxChange=function(useGridFormat){xtab.applyGridCellFormatForSubtotalChange(useGridFormat,fmtTarget);},result=[];result.push(this.getCheckboxAndLabel(isSubtotalFormatUseGridFormat,checkBoxDes[fmtTarget],fnCheckBoxChange));if(!isSubtotalFormatUseGridFormat&&hasSubtotal){return result.concat(getGridCellGroups.call(this,fmtTarget,true));}return result;}function getSubTotalGroups(fmtTarget){var titleName={};titleName[TARGET_COL]=mstrmojo.desc(15191,"Subtotal Column Headers");titleName[TARGET_ROW]=mstrmojo.desc(15192,"Subtotal Row Headers");titleName[TARGET_VALUES]=mstrmojo.desc(15193,"Subtotal Values");var controls=[this.getGroupTitle(titleName[fmtTarget])].concat(getSubTotalFormatContent.call(this,fmtTarget)),dependentControls=controls.slice(),host=this.getHost(),hasSubtotal=host.hasSubtotal(fmtTarget);if(!hasSubtotal){$VIS_UTILITY.toggleControlEnabled(dependentControls,false);}return controls;}function getGridCellControls(dynamicCtrlGroup,targetValue){this.replaceChildControls(dynamicCtrlGroup,[this.getEditorGroup(getGridCellGroups.call(this,targetValue)),this.getEditorGroup(getSubTotalGroups.call(this,targetValue))]);}var WHITE="#fff";function getResponsiveFontColor(colorHex){var color=colorHex?colorHex.c1||colorHex:"",luminance=mstrmojo.color.getLuminance(color),luminanceWhite=255,luminanceBlack=121.71921,ratioWhite=Math.max(luminanceWhite/luminance,luminance/luminanceWhite),ratioBlack=Math.max(luminanceBlack/luminance,luminance/luminanceBlack),BLACK="#35383a";if(ratioWhite>=ratioBlack){return WHITE;}return BLACK;}var TARGET_FORMATS={FMT_GROUP_GRID_COLOR:{type:[targetFormatMap[TARGET_COL],"st.ch"],props:[$ENUM_FORMAT_PROPERTIES.BACKGROUND_COLOR,$ENUM_FORMAT_PROPERTIES.BORDER_BOTTOM_COLOR,$ENUM_FORMAT_PROPERTIES.BORDER_BOTTOM_COLOR]},FMT_GROUP_GRID_STYLE:{type:[targetFormatMap[TARGET_COL],targetFormatMap[TARGET_ROW],targetFormatMap[TARGET_VALUES],"st.ch","st.rh","st.va"],props:[$ENUM_FORMAT_PROPERTIES.BORDER_BOTTOM_STYLE,$ENUM_FORMAT_PROPERTIES.BORDER_RIGHT_STYLE]}};var ENUM_COLOR_NAME={GRAY:mstrmojo.desc(null,"Gray"),BLUE:mstrmojo.desc(null,"Blue"),NAVY:mstrmojo.desc(null,"Navy Blue"),EMERALD:mstrmojo.desc(null,"Emerald"),ORANGE:mstrmojo.desc(null,"Orange")},ENUM_COLOR_CSS={GRAY:"gray",BLUE:"blue",NAVY:"navy",EMERALD:"emerald",ORANGE:"orange"},ENUM_STYLE_DESC={FLAT:mstrmojo.desc(7805,"Flat"),CLASSIC:mstrmojo.desc(125,"Classic"),CUSTOM:"Custom"},ENUM_STYLE_NAME={FLAT:"flat",CLASSIC:"classic",CUSTOM:"custom"};var COLOR_ITEMS={},responsiveFCWhite=getResponsiveFontColor(WHITE);COLOR_ITEMS[ENUM_STYLE_NAME.FLAT]=[{n:ENUM_COLOR_NAME.GRAY,css:ENUM_COLOR_CSS.GRAY,iconBc:"#d1d1d1",fc:responsiveFCWhite,bc:WHITE,bbc:"#ababab",brc:"#ebebeb",stbc:"#f8f8f8"},{n:ENUM_COLOR_NAME.BLUE,css:ENUM_COLOR_CSS.BLUE,iconBc:"#1c8dd4",fc:responsiveFCWhite,bc:WHITE,bbc:"#1c8dd4",brc:"#ebebeb",stbc:"#f1f9f2"},{n:ENUM_COLOR_NAME.NAVY,css:ENUM_COLOR_CSS.NAVY,iconBc:"#193b67",fc:responsiveFCWhite,bc:WHITE,bbc:"#193b67",brc:"#ebebeb",stbc:"#f2f4f6"},{n:ENUM_COLOR_NAME.EMERALD,css:ENUM_COLOR_CSS.EMERALD,iconBc:"#38ae6f",fc:responsiveFCWhite,bc:WHITE,bbc:"#38ae6f",brc:"#ebebeb",stbc:"#f4fbf6"},{n:ENUM_COLOR_NAME.ORANGE,css:ENUM_COLOR_CSS.ORANGE,iconBc:"#e69912",fc:responsiveFCWhite,bc:WHITE,bbc:"#e69912",brc:"#ebebeb",stbc:"#fef8f1"}];COLOR_ITEMS[ENUM_STYLE_NAME.CLASSIC]=[{n:ENUM_COLOR_NAME.GRAY,css:ENUM_COLOR_CSS.GRAY,iconBc:"#d1d1d1",bc:"#f5f5f5",bbc:"#ebebeb",brc:"#ebebeb",fc:getResponsiveFontColor("#f5f5f5"),stbc:"#f8f8f8"},{n:ENUM_COLOR_NAME.BLUE,css:ENUM_COLOR_CSS.BLUE,iconBc:"#1c8dd4",bc:"#1c8dd4",bbc:"#187ab8",brc:"#187ab8",fc:getResponsiveFontColor("#1c8dd4"),stbc:"#f1f9fe"},{n:ENUM_COLOR_NAME.NAVY,css:ENUM_COLOR_CSS.NAVY,iconBc:"#193b67",bc:"#193b67",bbc:"#50698b",brc:"#50698b",fc:getResponsiveFontColor("#193b67"),stbc:"#f2f4f6"},{n:ENUM_COLOR_NAME.EMERALD,css:ENUM_COLOR_CSS.EMERALD,iconBc:"#38ae6f",bc:"#38ae6f",fc:getResponsiveFontColor("#38ae6f"),bbc:"#29965d",brc:"#29965d",stbc:"#f4fbf6"},{n:ENUM_COLOR_NAME.ORANGE,css:ENUM_COLOR_CSS.ORANGE,iconBc:"#e69912",bc:"#e69912",fc:getResponsiveFontColor("#e69912"),bbc:"#ca850a",brc:"#ca850a",stbc:"#fef8f1"}];var defaultTemplateProps={rh:{bc:"#fff",bbc:"#ebebeb",brc:"#ebebeb"},va:{bc:"#fff",bbc:"#ebebeb",brc:"#ebebeb"},st:{rh:{bc:"#f8f8f8",bbc:"#ebebeb",brc:"#ebebeb"},va:{bc:"#f8f8f8",bbc:"#ebebeb",brc:"#ebebeb"}}};var COLOR_HEXEncode_MAP={};function getColorEncode(color){if(!COLOR_HEXEncode_MAP[color]){COLOR_HEXEncode_MAP[color]=mstrmojo.color.encodeColor(color);}return COLOR_HEXEncode_MAP[color];}function isPropValueEqual(value1,value2){return(value1.substring&&value1.substring(0,1)==="#")?getColorEncode(value1)===getColorEncode(value2):value1===value2;}function isIn(sub,target){var isSub=true;$HASH.forEach(sub,function(value,key){if(target[key]===undefined){isSub=false;}else{if(typeof target[key]==="object"){if(isEmptyObject(target[key])){isSub=true;}else{isSub=isIn(value,target[key]);}}else{isSub=isPropValueEqual(target[key],value);}}if(!isSub){return false;}});return isSub;}function getSelectedColorIndex(fmts,colors){var defaultIndex=-1,selectedIndex=defaultIndex,type=TARGET_FORMATS.FMT_GROUP_GRID_COLOR.type,props=TARGET_FORMATS.FMT_GROUP_GRID_COLOR.props;if(!isIn(defaultTemplateProps,fmts)){return selectedIndex;}$ARR.forEach(colors,function(item,index){selectedIndex=index;$ARR.forEach(type,function(t){var fmt=$HASH.walk(t,fmts);$ARR.forEach(props,function(prop){if(!isPropValueEqual(fmt[prop],item[prop])){selectedIndex=defaultIndex;return false;}});if(selectedIndex===defaultIndex){return false;}});if(selectedIndex!==defaultIndex){return false;}});return selectedIndex;}var STYLE_ITEMS=[],STYLE_ITEM_INDEX_MAP={};STYLE_ITEM_INDEX_MAP[ENUM_STYLE_NAME.FLAT]=0;STYLE_ITEM_INDEX_MAP[ENUM_STYLE_NAME.CLASSIC]=1;STYLE_ITEM_INDEX_MAP[ENUM_STYLE_NAME.CUSTOM]=-1;var THIN="1pt solid",NONE="none";STYLE_ITEMS[STYLE_ITEM_INDEX_MAP[ENUM_STYLE_NAME.FLAT]]={id:ENUM_STYLE_NAME.FLAT,n:ENUM_STYLE_DESC.FLAT,css:ENUM_STYLE_NAME.FLAT,brs:NONE,bbs:THIN};STYLE_ITEMS[STYLE_ITEM_INDEX_MAP[ENUM_STYLE_NAME.CLASSIC]]={id:ENUM_STYLE_NAME.CLASSIC,n:ENUM_STYLE_DESC.CLASSIC,css:ENUM_STYLE_NAME.CLASSIC,brs:THIN,bbs:THIN};function getSelectedGridStyle(fmts){var TARGET_FMT_STYLE=TARGET_FORMATS.FMT_GROUP_GRID_STYLE,PROPS=TARGET_FMT_STYLE.props,TYPES=TARGET_FMT_STYLE.type,style=null,borderStyleMap=function(value){if(value===THIN){return 1;}else{if(value===NONE){return 0;}}return -1;};$ARR.forEach(STYLE_ITEMS,function(item){style=item.id;$ARR.forEach(TYPES,function(t){var v=$HASH.walk(t,fmts);if(isEmptyObject(v)){return true;}$ARR.forEach(PROPS,function(prop){if(v[prop]!==borderStyleMap(item[prop])){style=null;return false;}});if(!style){return false;}});if(style){return false;}});return style||ENUM_STYLE_NAME.CUSTOM;}function isColumnHeaderFillColor(fmts,color){var types=[targetFormatMap[TARGET_COL],"st.ch"],prop=$ENUM_FORMAT_PROPERTIES.BACKGROUND_COLOR,propFillColor;return types.every(function(t){propFillColor=$HASH.walk(t,fmts)[prop];return propFillColor&&isPropValueEqual(propFillColor,color);});}function getGridTemplateGroup(){var editorModel=this,xtab=this.getHost(),gridData=xtab.gridData,fmts=gridData&&gridData.gsi&&gridData.gsi.fmts,isColumnHeaderWhite=isColumnHeaderFillColor(fmts,WHITE),gridStyle=getSelectedGridStyle(fmts),colorMode=gridStyle===ENUM_STYLE_NAME.CUSTOM?(isColumnHeaderWhite?ENUM_STYLE_NAME.FLAT:ENUM_STYLE_NAME.CLASSIC):gridStyle,colorItems=COLOR_ITEMS[colorMode],selectedColorIndex=getSelectedColorIndex(fmts,colorItems),boxCSSStyle=selectedColorIndex<0?colorItems[0].css:colorItems[selectedColorIndex].css,colorCtrl=editorModel.getLabelAndControl(mstrmojo.desc(6242,"Color"),new mstrmojo.ui.CheckList({items:colorItems,selectedIndex:selectedColorIndex,hideCheckMark:true,cssClass:"color",orientation:"h",multiSelect:false,itemMarkup:null,postselectionChange:function postselectionChange(evt){var selectedIdx=evt.added[0],colorProps=this.items[selectedIdx];xtab.formatGridColor(defaultTemplateProps,colorProps);},getItemMarkup:function getItemMarkup(item){if(!this.itemMarkup){this.itemMarkup=mstrmojo.ui.List.prototype.getItemMarkup.apply(this,item).replace('title="{@title}">{@en@n}<','title="{@en@n}"><div class="color" style="background-color: {@en@iconBc}"></div><');}return this.itemMarkup;},getItemProps:function getItemProps(item,idx){var props=mstrmojo.ui.CheckList.prototype.getItemProps.call(this,item,idx);props.iconBc=item.iconBc;return props;}}),"30%","70%",false,{cssClass:"gt-color",showIcon:true,alias:"gtColor"}),styleCtrl=editorModel.getLabelAndControl(mstrmojo.desc(1400,"Style"),new mstrmojo.ui.CheckList({items:STYLE_ITEMS,selectedIndex:STYLE_ITEM_INDEX_MAP[gridStyle],cssClass:"style",orientation:"v",multiSelect:false,postselectionChange:function postselectionChange(evt){var selectedIdx=evt.added[0],styleProps=this.items[selectedIdx],selectedColorProps=(selectedColorIndex)>-1?COLOR_ITEMS[styleProps.id][selectedColorIndex]:null;xtab.formatGridStyle(styleProps,selectedColorProps,defaultTemplateProps);}}),"30%","70%",false,{cssClass:"gt-style",showIcon:true,alias:"gtStyle"}),gridTemplate=new mstrmojo.Box({alias:"gt",cssClass:"gt "+boxCSSStyle,children:[colorCtrl,styleCtrl]});return gridTemplate;}function getGeneralControls(dynamicCtrlGroup){var xtab=this.getHost(),gridData=xtab.gridData,xtabInterface=new mstrmojo.models.template.DataInterface(gridData);var resizeGroup=new mstrmojo.ui.editors.controls.XtabResizeGroup({});resizeGroup.setFormatSource(xtab);xtab.attachEventListener("xtabColsMeasured",resizeGroup.id,function(){resizeGroup.setFormatSource(xtab);});var padding=xtabInterface.getAggregatePadding(),GRID_PROPS=mstrApp.getThemeProps(mstrmojo.vi.enums.EnumThemeProperties.SUBTYPE.GRID),paddingSize=GRID_PROPS.paddingSize,paddingIdx=0,paddingValues=[paddingSize,paddingSize],max=paddingSize,enablePadding=false;if(padding){paddingValues=[padding.h,padding.v].sort(function(a,b){return a-b;});max=paddingValues[1];paddingIdx=Math.max(Math.min(Math.round((max-paddingSize)/paddingSize),2),0);enablePadding=true;}var ctrlPadding=this.getLabelAndControl(mstrmojo.desc(13579,"Padding"),this.getButtonBar([{n:mstrmojo.desc(12141,"S"),v:paddingSize,css:"small"},{n:mstrmojo.desc(12142,"M"),v:paddingSize*GRID_PROPS.mRatio,css:"medium"},{n:mstrmojo.desc(12140,"L"),v:paddingSize*GRID_PROPS.lRatio,css:"large"}],paddingIdx,function(newValue){xtab.formatPadding(newValue.v,newValue.v*(paddingValues[0]/max),{isSubtotalUseGridFormatting:true});},{cssClass:"cellPadding",showIcon:false}));ctrlPadding.set("enabled",enablePadding);var me=this,fnChangeAllGridFontsProperty=function(property,newValue){xtab.batchFormatGridZones([TARGET_COL,TARGET_ROW,TARGET_VALUES].map(function(targetValue){return targetFormatMap[targetValue];}),$ARR.isArray(newValue)?newValue.map(function(value){return $GET_FORMAT_OBJ(property,value);}):[TARGET_COL,TARGET_ROW,TARGET_VALUES].map(function(){return $GET_FORMAT_OBJ(property,newValue);}),{isSubtotalUseGridFormatting:true});},fnGetAllGridFontsFormat=function(){var format=null,gridCellFormats=getGridCellFormats.call(me),gridSubtotalFormats=gridCellFormats[FMT_SUBTOTAL_PROPNAME];[TARGET_COL,TARGET_ROW,TARGET_VALUES].forEach(function(targetValue){[gridCellFormats,gridSubtotalFormats].forEach(function(formats){var f=formats&&formats[targetFormatMap[targetValue]]||{},enFontSize=$ENUM_FORMAT_PROPERTIES.FONT_SIZE,enFontFamily=$ENUM_FORMAT_PROPERTIES.FONT_FAMILY,enFontColor=$ENUM_FORMAT_PROPERTIES.COLOR,enFontWeight=$ENUM_FORMAT_PROPERTIES.FONT_WEIGHT,enUnderLine=$ENUM_FORMAT_PROPERTIES.UNDERLINE,enFontStyle=$ENUM_FORMAT_PROPERTIES.FONT_STYLE,enLineThrough=$ENUM_FORMAT_PROPERTIES.LINE_THROUGH;if(isEmptyObject(f)){return ;}if(!format){format=$HASH.copy(f);format[enFontSize]=$ARR.ensureArray(format[enFontSize]);}else{format[enFontSize].push(f[enFontSize]);if(format[enFontFamily]!==f[enFontFamily]){format[enFontFamily]=-1;}if(format[enFontColor]!==f[enFontColor]){delete format[enFontColor];}[enFontWeight,enUnderLine,enFontStyle,enLineThrough].forEach(function(key){format[key]=format[key]||f[key];});}});});return format;},childControls=[],ctrlGroup=[this.getEditorGroup([]),this.getEditorGroup([showBanding.call(this),showOutlineModeOption.call(this)]),GRID_PROPS.gridTemplateVisible?this.getEditorGroup([this.getGroupTitle(mstrmojo.desc(16044,"Grid Template")),getGridTemplateGroup.call(this)]):null,this.getEditorGroup([this.getGroupTitle(mstrmojo.desc(14006,"All Grid Fonts")),this.getCharacterGroup(fnChangeAllGridFontsProperty,fnGetAllGridFontsFormat(),23),this.getGroupTitle(mstrmojo.desc(12129,"Grid Size")),ctrlPadding,resizeGroup]),this.getEditorGroup([this.getMoreOptionsEditorLink(gridData&&gridData.gsi&&gridData.gsi.prop,true,gridData&&gridData.lhv)])];childControls=childControls.concat(ctrlGroup);this.replaceChildControls(dynamicCtrlGroup,childControls);}mstrmojo.vi.models.editors.XtabEditorModel=mstrmojo.declare(mstrmojo.vi.models.editors.BaseEditorModel,null,{scriptClass:"mstrmojo.vi.models.editors.XtabEditorModel",help:"format_panel_grid.htm",getInitialTarget:function getInitialTarget(){return TARGET_GENERAL;},getTargetPulldownItems:function getTargetPulldownItems(dynamicCtrlGroup){var xtab=this.getHost(),gridInfo=xtab.gridInfo,pulldownItems=this._super(dynamicCtrlGroup);if(gridInfo&&(gridInfo.rows.length||gridInfo.cols.length)){var formats=xtab.getFormats(),selectionHandler=getGridCellControls.bind(this,dynamicCtrlGroup);pulldownItems.unshift({n:mstrmojo.desc(6560,"General Settings"),v:TARGET_GENERAL,h:getGeneralControls.bind(this,dynamicCtrlGroup)});if(formats){var gridFormats=getGridCellFormats.call(this);if(gridFormats){if(gridFormats.ch){pulldownItems.push({n:mstrmojo.desc(12132,"Column Headers"),v:TARGET_COL,h:selectionHandler});}if(gridFormats.rh){pulldownItems.push({n:mstrmojo.desc(12133,"Row Headers"),v:TARGET_ROW,h:selectionHandler});}if(gridFormats.va){pulldownItems.push({n:mstrmojo.desc(12134,"Values"),v:TARGET_VALUES,h:selectionHandler});}}}}return pulldownItems;},getFormattingToolbar:function getFormattingToolbar(fmtTarget,anchorEl,props){var xtab=this.getHost(),model=xtab.model,cell=xtab.getCellForNode(anchorEl),isTotalValue=(fmtTarget===TARGET_VALUES&&model.isSubtotalValue(cell)),isTotal=(cell&&cell.stt===1)||isTotalValue,formats=getTargetFormats.call(this,fmtTarget,isTotal);if(formats){var toolbar=new mstrmojo.ui.editors.CharacterToolbarPopup($HASH.copy({onGroupValueChange:getTargetFormatHandler.call(this,fmtTarget,isTotal),textAlignValueMap:cellAlignValueMap,anchorElement:anchorEl},props));toolbar.setFormatSource(formats);return toolbar;}return this._super(fmtTarget,anchorEl,props);}});mstrmojo.vi.models.editors.XtabEditorModel.ENUM_EDITOR_TARGETS={GENERAL:TARGET_GENERAL,COLUMNS:TARGET_COL,ROWS:TARGET_ROW,VALUES:TARGET_VALUES};mstrmojo.vi.models.editors.XtabEditorModel.ENUM_TARGET_FORMAT=targetFormatMap;mstrmojo.vi.models.editors.XtabEditorModel.ENUM_TARGET_SUBTOTAL_FORMAT_PROPNAME=targetSubtotalFormatPropName;mstrmojo.vi.models.editors.XtabEditorModel.ENUM_MAX_ROWS_OUTLINE=MAX_ROWS_OUTLINE_WARNING;}());