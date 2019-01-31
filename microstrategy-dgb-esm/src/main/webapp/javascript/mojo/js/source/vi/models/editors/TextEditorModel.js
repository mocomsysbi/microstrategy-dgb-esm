(function(){mstrmojo.requiresCls("mstrmojo.vi.models.editors.EditorModel","mstrmojo.ui.editors.CharacterToolbarPopup","mstrmojo.ui.editors.controls.CharacterGroup","mstrmojo.ui.editors.controls.ContainerGroup","mstrmojo.hash");var $FORMAT_MODEL=mstrmojo.models.FormatModel,$ENUM_FORMAT_PROPERTIES=$FORMAT_MODEL.ENUM_PROPERTY_NAMES;mstrmojo.vi.models.editors.TextEditorModel=mstrmojo.declare(mstrmojo.vi.models.editors.EditorModel,null,{scriptClass:"mstrmojo.vi.models.TextEditorModel",help:"format_panel_text.htm",getEditorContents:function getEditorContents(){var host=this.getHost(),hostFormats=host.getFormats(),quill=host.quillInstance;if(quill){try{var formats=quill.getFormat();if(host.cacheGProps){hostFormats["background-color"]=host.cacheGProps;}hostFormats.font="";if(!formats.size){hostFormats.font="10pt 'Arial'";}else{var size=(formats.size).replace(/\D/g,"");hostFormats.font=size+"pt 'Arial'";}var fontNames=host.stringsOfFonts,fontClasses=host.arrayOfFonts;if(formats.font){var index=fontClasses.indexOf(formats.font);if(index>-1){if(hostFormats.font.includes("'Arial'")){var newString=(hostFormats.font).replace("Arial",fontNames[index]);hostFormats.font=newString;}else{var arrayOfFontItems=(hostFormats.font).split(" ");for(var i=0;i<arrayOfFontItems.length;i++){if(arrayOfFontItems[i].includes("pt")&&(""+arrayOfFontItems[i]).length<=4){hostFormats.font=arrayOfFontItems[i]+" "+fontNames[index];}}}}}if(formats.bold&&!(hostFormats.font).includes("bold")){hostFormats.font="bold "+hostFormats.font;}if(formats.color){hostFormats.color=formats.color;}else{hostFormats.color="#000000";}if(formats.italic===true&&!(hostFormats.font).includes("italic")){hostFormats.font="italic "+hostFormats.font;}if(formats.underline===true){hostFormats["text-decoration"]="underline";}else{hostFormats["text-decoration"]="";}if(formats.strike===true&&!(hostFormats["text-decoration"]).includes("line-through")){hostFormats["text-decoration"]="line-through "+hostFormats["text-decoration"];}if(formats.align==="left"){hostFormats["text-align"]="left";}else{if(formats.align==="center"){hostFormats["text-align"]="center";}else{if(formats.align==="right"){hostFormats["text-align"]="right";}else{if(formats.align==="justify"){hostFormats["text-align"]="justify";}else{if(!formats.align){hostFormats["text-align"]="left";}}}}}}catch(e){}}var fnGroupHandler=this.getChangeGroupPropertyFn(),characterGroup=new mstrmojo.ui.editors.controls.CharacterGroup({onGroupValueChange:fnGroupHandler,showNoFillInColor:false}),me=this,containerGroup=new mstrmojo.ui.editors.controls.ContainerGroup({showBackgroundNoFill:false,showBackgroundGradient:true,showBorderNoFill:false,onGroupValueChange:function(){me.getHost().parent.clearCache();fnGroupHandler.apply(null,arguments);}});if(!mstrApp.allowWebDashboardDesign()){return[];}characterGroup.setFormatSource(hostFormats);containerGroup.setFormatSource(hostFormats);return[this.getEditorGroup([characterGroup]),this.getEditorGroup([this.getTextAlign(hostFormats["text-align"]||"left",this.getChangeFormatPropertyFn($ENUM_FORMAT_PROPERTIES.TEXT_ALIGN)),this.getWrapText(hostFormats["white-space"]!=="nowrap",this.getChangeFormatPropertyFn($ENUM_FORMAT_PROPERTIES.TEXT_WRAP)),this.getTextDirection(hostFormats.fx&&hostFormats.fx.rt,this.getChangeFormatPropertyFn($ENUM_FORMAT_PROPERTIES.TEXT_DIRECTION)),this.getOverflow(hostFormats.overflow==="auto",this.getChangeFormatPropertyFn($ENUM_FORMAT_PROPERTIES.TEXT_OVERFLOW))]),this.getEditorGroup([containerGroup])];},getChangeFormatPropertyFn:function getChangeFormatPropertyFn(propertyName,formatType){var id=this.id;return function(newValue,oldValue){var editor=mstrmojo.all[id],unit=editor.getHost().parent,docModel=editor.docModel,formats=[{formatType:formatType||1,propertyName:propertyName,newValue:newValue,oldValue:oldValue}],host=editor.getHost();if(host.isQuill){if(host.hlText){host.renderRVText();host.formatHlText(formats);host.parent.hideControlOverlay();host.updatedirCachDel();host.onUnselected();}else{host.processLocalFormat(formats);}}else{docModel.saveUnitFormatProperty(unit,formats,{success:function(res){if(!(unit&&unit.parent)){unit=docModel.getSelectedViUnit();}var panel=unit.parent,unitKey=unit.k,textField=unit.boxContent;docModel.partialUpdate(null,docModel.getTargetDefn(unitKey),res.defn,[unitKey]);textField.update(textField.node);unit.refresh();panel.selectVIUnit(unit,true);}},mstrmojo.DocDataService.REQUEST_ONLY_DEFINITION);}};},getFormattingToolbar:function getFormattingToolbar(fmtTarget,anchorEl,props){var toolbar=new mstrmojo.ui.editors.CharacterToolbarPopup(mstrmojo.hash.copy({onGroupValueChange:this.getChangeGroupPropertyFn(),anchorElement:anchorEl},props));toolbar.setFormatSource(this.getHost().getFormats());return toolbar;}});}());