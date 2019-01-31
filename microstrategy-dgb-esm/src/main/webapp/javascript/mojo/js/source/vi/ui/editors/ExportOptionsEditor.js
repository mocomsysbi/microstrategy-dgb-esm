(function(){mstrmojo.requiresCls("mstrmojo.Editor","mstrmojo.Button","mstrmojo.Label","mstrmojo.List","mstrmojo.Pulldown","mstrmojo.ui.ButtonBar","mstrmojo.Box","mstrmojo.ui.Checkbox","mstrmojo.ui.CheckList","mstrmojo.ui.IconTooltipCheckList","mstrmojo.ui.LabelWithIconTooltip","mstrmojo.ValidationTextBox","mstrmojo.hash","mstrmojo.func","mstrmojo.desc","mstrmojo.css","mstrmojo.array","mstrmojo.form","mstrmojo.date","mstrmojo.dom","mstrmojo.alert","mstrmojo.NumberFormat");mstrmojo.requiresDescs(15140,15141,15147,15148,15149,15158,6,7,15535,15160,295,3437,15139,15150,15151,15152,15153,15154,15155,15156,2879,15157,2140,5212,5592,15560,15561,8365,6203,6204,6205,1345,34,5374,5875,29,32,6213,6209,6210,6211,15580,15581,15582,5876,35,15583,15266,15267,15268,15269,15270,15388,15389,15592,15593,2696,18,15631,15632,15633,15634);var $DESC=mstrmojo.desc,$HASH=mstrmojo.hash,$ARR=mstrmojo.array,$NWB=mstrmojo.Button.newWebButton,$CSS=mstrmojo.css;var DEFAULT_EXPORT_OPTIONS={range:1,overviewViz:3,htmlDelayTime:0,paperHeight:"8.5",paperWidth:"11",pageOrientation:-1,mode:0,enableFooter:1,enableHeader:1,pdfPwd:"",selectedTabIndex:0,hideTabIndex:undefined};function validateOptions(){if(this.security.createPassword.checkbox.checked){var security=this.security.content;if(security.password.value.length<=0){this.tabBar.tabs.singleSelect(1);mstrmojo.alert($DESC(15634,"Please fill in a password to encrypt your PDF."));return false;}}return true;}function getExportOptions(){var exOpts={},generalBox=this.general,layoutBox=this.layout;exOpts.range=generalBox.exportPages.ctrlLyt.selectedItem.v;exOpts.overviewViz=generalBox.exportContent.vizDetails.selectedItem.v;exOpts.htmlDelayTime=generalBox.htmlContanier.timeBox.delayTime.textInput.value;exOpts.paperHeight=layoutBox.exportPages.paperSize.sizeOptions.getSelectedItem().eph;exOpts.paperWidth=layoutBox.exportPages.paperSize.sizeOptions.getSelectedItem().epw;exOpts.pageOrientation=layoutBox.exportPages.pageOrientation.oriCheckList.selectedItem.v;exOpts.mode=0;exOpts.enableHeader=layoutBox.pageInformation.pdfHeaderFooter.selectedIndices[0]?1:0;exOpts.enableFooter=layoutBox.pageInformation.pdfHeaderFooter.selectedIndices[1]?1:0;if(this.security.createPassword.checkbox.checked){exOpts.pdfPwd=this.security.content.password.value;}else{exOpts.pdfPwd="";}return exOpts;}function setExportOptions(exOpts){var generalBox=this.general,layoutBox=this.layout;this.exOpts=exOpts;generalBox.exportPages.ctrlLyt.set("selectedIndex",getSelectIndexFromValue(ctrlLytItems,exOpts.range));generalBox.exportContent.vizDetails.set("selectedIndex",getSelectIndexFromValue(vizDetailsItems,exOpts.overviewViz));generalBox.htmlContanier.timeBox.delayTime.provider.setVal(exOpts.htmlDelayTime);generalBox.htmlContanier.timeBox.delayTime.updateDisplayText();layoutBox.exportPages.paperSize.sizeOptions.set("selectedIndex",getSelectIndexFromValue(sizeOptionsItems,getSizeOptions(exOpts.paperWidth,exOpts.paperHeight)));layoutBox.exportPages.pageOrientation.oriCheckList.set("selectedIndex",getSelectIndexFromValue(oriCheckListItems,exOpts.pageOrientation));layoutBox.pageInformation.pdfHeaderFooter.set("selectedIndices",getHeaderFooterIndices(exOpts.enableHeader,exOpts.enableFooter));}var ctrlLytItems=[{n:$DESC(15140,"Export current sheet only"),v:1},{n:$DESC(15141,"Export all sheets in this documents"),v:0}];var vizDetailsItems=[{n:$DESC(15148,"Overviews only"),v:1},{n:$DESC(15149,"Detailed pages only"),v:2},{n:$DESC(15147,"Overviews and detailed pages"),v:3}];var ctrlLytItemsWS={1:{n:$DESC(15266,"Export current Chapter"),v:1},0:{n:$DESC(15267,"Export all Chapters"),v:0}};var vizDetailsItemsWS={1:{n:$DESC(15268,"Dossier Page"),v:1},2:{n:$DESC(15270,"Individual Visualizations"),v:2},3:{n:$DESC(15269,"Dossier Page plus Individual Visualizations"),v:3,ttp:$DESC(15592,"Besides Dossier Pages, each Visualization on the Page will be fully exported separately."),iconCss:"info-icon"}};var sizeOptionsItems=[{n:$DESC(1345,'A3 11.69" x 16.54"'),eph:"11.69",epw:"16.54"},{n:$DESC(34,'A4 8.27" x 11.69"'),eph:"8.27",epw:"11.69"},{n:$DESC(5875,'A5 5.83" x 8.27"'),eph:"5.83",epw:"8.27"},{n:$DESC(29,'Letter 8.5" x 11"'),eph:"8.5",epw:"11"},{n:$DESC(32,'Legal 8.5" x 14"'),eph:"8.5",epw:"14"},{n:$DESC(6213,'Ledger 11" x 17"'),eph:"11",epw:"17"},{n:$DESC(15581,'B4 13.9" x 9.8"'),eph:"13.9",epw:"9.8"},{n:$DESC(15582,'B5 9.8" x 6.9"'),eph:"9.8",epw:"6.9"},{n:$DESC(5876,'Executive 7.25" x 10.5"'),eph:"7.25",epw:"10.5"},{n:$DESC(35,'Folio 8.5" x 13"'),eph:"8.5",epw:"13"},{n:$DESC(15583,'Statement 5.5" x 8.5"'),eph:"5.5",epw:"8.5"}];var oriCheckListItems=[{n:$DESC(15158,"Auto (recommended)"),v:-1},{n:$DESC(7,"Landscape"),v:1},{n:$DESC(6,"Portrait"),v:0}];var ENABLE_HEADER=0,ENABLE_FOOTER=1,headerFooterItems=[{n:$DESC(15388,"Display Dossier, Chapter, and Page names"),v:1},{n:$DESC(15389,"Show PDF page numbers"),v:2}],getHeaderFooterIndices=function(enableHeader,enableFooter){var idxs={};if(enableHeader){idxs[ENABLE_HEADER]=true;}if(enableFooter){idxs[ENABLE_FOOTER]=true;}return idxs;};function getSizeOptions(width,height){if(parseFloat(width)<parseFloat(height)){return{eph:width,epw:height};}return{eph:height,epw:width};}function getSelectIndexFromValue(items,selectedValue){var selectedIndex=0;if(typeof selectedValue==="object"){var props=$HASH.keyarray(selectedValue);$HASH.forEach(items,function(element,index){if($HASH.equals($HASH.copyProps(props,element),selectedValue)){selectedIndex=index;return false;}});}else{$HASH.forEach(items,function(element,index){if(element.v===selectedValue){selectedIndex=index;return false;}});}return parseInt(selectedIndex);}function getChildren(exOpts){var editor=this;if(mstrApp.isWSStyling){applyWSOptionLabels(ctrlLytItems,vizDetailsItems);}return[{scriptClass:"mstrmojo.Box",alias:"tabBar",cssClass:"tabBar",children:[{scriptClass:"mstrmojo.ui.ButtonBar",renderOnScroll:false,showIcon:false,alias:"tabs",selectedIndex:0,postselectionChange:function(evt){var exportEditor=this.parent.parent,selectedTab=exportEditor.tabBar.tabs.selectedItem.v,tabs=[exportEditor.general,exportEditor.security,exportEditor.layout];for(var i=0;i<tabs.length;i++){tabs[i].set("visible",i+1==selectedTab);}},items:[{n:$DESC(295,"General"),v:1},{n:$DESC(2696,"Security"),v:2},{n:$DESC(3437,"Layout"),v:3}]}]},{scriptClass:"mstrmojo.Box",alias:"general",cssClass:"general",children:[{scriptClass:"mstrmojo.Box",alias:"exportPages",children:[{scriptClass:"mstrmojo.Label",cssClass:"ExportEditor-title",allowHTML:true,text:mstrApp.isWSStyling?$DESC(15127,"Chapter"):$DESC(15139,"Export Pages")},{scriptClass:"mstrmojo.ui.CheckList",alias:"ctrlLyt",multiSelect:false,orientation:"v",selectedIndex:getSelectIndexFromValue(ctrlLytItems,exOpts.range),items:ctrlLytItems}]},{scriptClass:"mstrmojo.Box",alias:"exportContent",children:[{scriptClass:"mstrmojo.Label",cssClass:"ExportEditor-title",allowHTML:true,text:mstrApp.isWSStyling?$DESC(5374,"Content"):$DESC(15150,"Export Content")},{scriptClass:"mstrmojo.ui.IconTooltipCheckList",alias:"vizDetails",multiSelect:false,orientation:"v",tooltipOffset:-310,selectedIndex:getSelectIndexFromValue(vizDetailsItems,exOpts.overviewViz),items:vizDetailsItems}]},{scriptClass:"mstrmojo.Box",alias:"htmlContanier",children:[{scriptClass:"mstrmojo.Label",cssClass:"ExportEditor-title",text:$DESC(15151,"HTML Container Pre-loading")},{scriptClass:"mstrmojo.ui.LabelWithIconTooltip",text:$DESC(15152,"Set a time to render each HTML Container before exporting"),alis:"iconTooltipLabel",iconCss:"info-icon",tooltip:$DESC(15593,"HTML Container contents may take extra time to render before exporting")},{scriptClass:"mstrmojo.Box",alias:"timeBox",cssClass:"time-setting",children:[{scriptClass:"mstrmojo.ui.editors.controls.Stepper",alias:"delayTime",width:null,height:null,provider:new mstrmojo.NumStepperContentProvider({item:{interval:1,value:exOpts.htmlDelayTime,maxLength:2,min:0,max:30}})},{scriptClass:"mstrmojo.Label",cssClass:"unit",text:$DESC(15153,"sec")},{scriptClass:"mstrmojo.Label",text:$DESC(15154,"(Duration between 0 to 30 sec)")}]}]}]},{scriptClass:"mstrmojo.Box",alias:"security",cssClass:"security",visible:false,children:[{scriptClass:"mstrmojo.Box",cssClass:"controlSwitch",alias:"createPassword",children:[{scriptClass:"mstrmojo.CheckBox",alias:"checkbox",checked:exOpts.pdfPwd?true:false,label:$DESC(15631,"Create a password to protect this PDF."),oncheckedChange:function(){var panel=this.parent.parent.content;panel.set("visible",this.checked);}},{scriptClass:"mstrmojo.Label",cssClass:"tips",text:$DESC(15632,"Only the viewers with credentials can open it."),}]},{scriptClass:"mstrmojo.Table",cssClass:"mainContent",alias:"content",visible:exOpts.pdfPwd?true:false,rows:2,cols:2,children:[{slot:"0,0",scriptClass:"mstrmojo.Label",text:mstrmojo.desc(18,"Enter Password")},{slot:"0,1",scriptClass:"mstrmojo.TextBox",alias:"password",type:"password",value:exOpts.pdfPwd},{slot:"1,1",scriptClass:"mstrmojo.CheckBox",alias:"showPassword",checked:false,label:$DESC(15633,"Show Password"),oncheckedChange:function(){if(this.checked){this.parent.password.type="text";this.parent.password.domNode.setAttribute("type","text");}else{this.parent.password.type="password";this.parent.password.domNode.setAttribute("type","password");}}}]}]},{scriptClass:"mstrmojo.Box",alias:"layout",cssClass:"layout",visible:false,children:[{scriptClass:"mstrmojo.Box",alias:"exportPages",children:[{scriptClass:"mstrmojo.Label",cssClass:"ExportEditor-title large-title",text:mstrApp.isWSStyling?$DESC(15560,"Paper"):$DESC(15155,"Paper Settings")},{scriptClass:"mstrmojo.Box",alias:"paperSize",cssClass:"paper-size",children:[{scriptClass:"mstrmojo.Label",allowHTML:true,text:$DESC(15156,"Paper Size")},{scriptClass:"mstrmojo.ui.Pulldown",alias:"sizeOptions",selectedIndex:getSelectIndexFromValue(sizeOptionsItems,getSizeOptions(exOpts.paperWidth,exOpts.paperHeight)),items:sizeOptionsItems}]},{scriptClass:"mstrmojo.Box",alias:"pageOrientation",cssClass:"page-orientation",children:[{scriptClass:"mstrmojo.Label",text:$DESC(2879,"Orientation")},{scriptClass:"mstrmojo.ui.CheckList",alias:"oriCheckList",multiSelect:false,orientation:"v",selectedIndex:getSelectIndexFromValue(oriCheckListItems,exOpts.pageOrientation),items:oriCheckListItems}]}]},{scriptClass:"mstrmojo.Box",alias:"pageInformation",children:[{scriptClass:"mstrmojo.Label",cssClass:"ExportEditor-title",text:$DESC(15157,"Page Information")},{scriptClass:"mstrmojo.ui.CheckList",alias:"pdfHeaderFooter",multiSelect:true,orientation:"v",selectedIndices:getHeaderFooterIndices(exOpts.enableHeader,exOpts.enableFooter),items:headerFooterItems}]}]},{scriptClass:"mstrmojo.Box",alias:"buttonNode",slot:"buttonNode",children:[$NWB($DESC(2140,"Cancel"),function(){this.parent.parent.close();}),$NWB(editor.exportDisplayText,function(){var editor=this.parent.parent;if(!validateOptions.call(editor)){return ;}var newExOpts=getExportOptions.call(editor);editor.exOpts=newExOpts;editor.exportHandler(newExOpts);editor.close();},true)]}];}function parseExportOptions(srcExOpts){var destExOpts=$HASH.copy(DEFAULT_EXPORT_OPTIONS);if(typeof srcExOpts==="object"){if(srcExOpts.hasOwnProperty("range")){destExOpts.range=parseInt(srcExOpts.range);}if(srcExOpts.hasOwnProperty("overviewViz")){destExOpts.overviewViz=parseInt(srcExOpts.overviewViz);}if(srcExOpts.hasOwnProperty("htmlDelayTime")){destExOpts.htmlDelayTime=parseInt(srcExOpts.htmlDelayTime);}if(srcExOpts.hasOwnProperty("paperHeight")){destExOpts.paperHeight=srcExOpts.paperHeight.toString();}if(srcExOpts.hasOwnProperty("paperWidth")){destExOpts.paperWidth=srcExOpts.paperWidth.toString();}if(srcExOpts.hasOwnProperty("pageOrientation")){destExOpts.pageOrientation=parseInt(srcExOpts.pageOrientation);}if(srcExOpts.hasOwnProperty("mode")){destExOpts.mode=parseInt(srcExOpts.mode);}if(srcExOpts.hasOwnProperty("enableFooter")){destExOpts.enableFooter=parseInt(srcExOpts.enableFooter);}if(srcExOpts.hasOwnProperty("enableHeader")){destExOpts.enableHeader=parseInt(srcExOpts.enableHeader);}if(srcExOpts.hasOwnProperty("pdfPwd")){destExOpts.pdfPwd=srcExOpts.pdfPwd.toString();}if(srcExOpts.hasOwnProperty("selectedTabIndex")){destExOpts.selectedTabIndex=parseInt(srcExOpts.selectedTabIndex);}destExOpts.hideTabIndex=srcExOpts.hideTabIndex;}return destExOpts;}function applyWSOptionLabels(ctrlLytItems,vizDetailsItems){ctrlLytItems.forEach(function(item,idx){ctrlLytItems[idx]=ctrlLytItemsWS[item.v];});vizDetailsItems.forEach(function(item,idx){vizDetailsItems[idx]=vizDetailsItemsWS[item.v];});}mstrmojo.vi.ui.editors.ExportOptionsEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.vi.ui.editors.ExportOptionsEditor",cssClass:"mstrmojo-ExportOptionsEditor",title:$DESC(5212,"Export to PDF"),help:"intro_export_dossier.htm",exportHandler:mstrmojo.emptyFn,exportDisplayText:$DESC(5592,"Export"),exOpts:DEFAULT_EXPORT_OPTIONS,useCache:false,zIndex:12,init:function init(props){this._super(props);this.exOpts=parseExportOptions.call(this,props.exOpts);this.set("children",getChildren.call(this,this.exOpts));},updatePopupConfig:function updatePopupConfig(config,opener){setExportOptions.call(this,this.exOpts);},onOpen:function onOpen(){var exOpts=this.exOpts,tabs=this.tabBar.tabs.itemsContainerNode.childNodes;if(!(mstrApp&&mstrApp.featureFlagsCache&&mstrApp.featureFlagsCache["EE/PDFEncrypt"])){$CSS.addClass(tabs[1],"hidden");}if(exOpts.hideTabIndex!==undefined&&0<=exOpts.hideTabIndex&&exOpts.hideTabIndex<tabs.length){$CSS.addClass(tabs[exOpts.hideTabIndex],"hidden");}var tabCount=tabs.length;for(var i=0;i<tabs.length;i++){if(tabs[i].className.match(/\bhidden\b/)){tabCount--;}}if(tabCount<=1){this.tabBar.set("visible",false);}this.tabBar.tabs.set("selectedIndex",exOpts.selectedTabIndex);},onClose:function onClose(){if(!this.useCache){this.destroy();}}});}());