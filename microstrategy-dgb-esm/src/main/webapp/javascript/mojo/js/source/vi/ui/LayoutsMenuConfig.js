(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.desc","mstrmojo.models.FormatModel","mstrmojo.DocDataService","mstrmojo.vi.controllers.EnumLayoutSelectorPosition");mstrmojo.requiresDescs(15556,15557,15558);var $ARR=mstrmojo.array,$DESC=mstrmojo.desc,LAYOUT_SELECTOR_POSITION=mstrmojo.vi.controllers.EnumLayoutSelectorPosition,FORMAT_MODEL=mstrmojo.models.FormatModel;mstrmojo.vi.ui.LayoutsMenuConfig=mstrmojo.declare(mstrmojo.ui.menus.MenuConfig,null,{scriptClass:"mstrmojo.vi.ui.LayoutsMenuConfig",model:null,view:null,buildLayoutsMenuConfig:function buildLayoutsMenuConfig(){var rootView=this.view,model=this.model,tocPanel=model&&model.controller.tocPanel,docView=rootView.documentView,strip=docView?docView.layoutViewer.getSelector():null,propName=FORMAT_MODEL.ENUM_PROPERTY_NAMES.LAYOUT_TAB_POSITION,alignPosition=model[propName],menuOptions=[{value:LAYOUT_SELECTOR_POSITION.LEFT,text:$DESC(15558,"List View"),cls:"left"},{value:LAYOUT_SELECTOR_POSITION.TOP,text:$DESC(15556,"Tab View - Top"),cls:"top"},{value:LAYOUT_SELECTOR_POSITION.BOTTOM,text:$DESC(15557,"Tab View - Bottom"),cls:"bottom"}],me=this,positionChanged=function(){return function(newValue,oldValue){if(oldValue!==newValue){model.set(propName,newValue);model.saveDocProps(FORMAT_MODEL.getFormatUpdate(propName,newValue),{extras:{params:{suppressData:true}},undo:function(){model.set(propName,oldValue);},redo:function(){model.set(propName,newValue);}},null,true,model.controller.getRefreshCallback());}};};menuOptions=$ARR.filter(menuOptions,function(option){if(!mstrApp.isWSStyling&&option.value===LAYOUT_SELECTOR_POSITION.LEFT){return false;}return true;});me.menuCssClass="mstrmojo-LayoutTabStrip-Menu";me.addRadioMenuGroup(alignPosition,positionChanged(),menuOptions,"",undefined,true);me.addSeparator();if(model[propName]===LAYOUT_SELECTOR_POSITION.LEFT){me.addMenuItem(mstrmojo.desc(11816,"Expand All"),me.id,tocPanel.expandOrCollapseAll.bind(tocPanel,true));me.addMenuItem(mstrmojo.desc(11817,"Collapse All"),me.id,tocPanel.expandOrCollapseAll.bind(tocPanel,false));}me.addMenuItem(mstrmojo.desc(1143,"Help"),me.id,function(){mstrApp.showHelpTopic("Layering_and_organizing_data_for_filtering.htm");});return me;}});}());