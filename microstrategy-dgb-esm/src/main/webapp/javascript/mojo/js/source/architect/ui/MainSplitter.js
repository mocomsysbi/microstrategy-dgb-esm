(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.ui.Splitter","mstrmojo.architect.ui.EnumViewTypes","mstrmojo.architect.ui.panels.ContentsPanel","mstrmojo.architect.ui.factories.LayerViewFactory","mstrmojo.architect.ui.factories.LogicalViewViewFactory","mstrmojo.architect.ui.factories.SystemDimensionViewFactory","mstrmojo.architect.ui.factories.UserHierarchyViewFactory","mstrmojo.architect.ui.factories.TransformationViewFactory","mstrmojo.architect.ui._HasSplitterStoredLayout");var $A=mstrmojo.array,$H=mstrmojo.hash,FIRST_ITEM_SLOT="firstSplitNode",SECOND_ITEM_SLOT="secondSplitNode",$ENUM_VIEW_TYPES=mstrmojo.architect.ui.EnumViewTypes,$VIEW_FACTORIES=[{type:$ENUM_VIEW_TYPES.LAYER,scriptClass:"mstrmojo.architect.ui.factories.LayerViewFactory"},{type:$ENUM_VIEW_TYPES.SYS_HIERARCHY,scriptClass:"mstrmojo.architect.ui.factories.SystemDimensionViewFactory"},{type:$ENUM_VIEW_TYPES.TRANSFORMATION,scriptClass:"mstrmojo.architect.ui.factories.TransformationViewFactory"},{type:$ENUM_VIEW_TYPES.LOGICAL_VIEWS,scriptClass:"mstrmojo.architect.ui.factories.LogicalViewViewFactory"},{type:$ENUM_VIEW_TYPES.USER_HIERARCHY,scriptClass:"mstrmojo.architect.ui.factories.UserHierarchyViewFactory"}];function handleSwitchView(previousViewType){var contentSplitter=this.contentSplitter,editorSplitter=this.contentSplitter.editorSplitter,viewFactories=this.viewFactories;if(previousViewType!==undefined){var previousFactory=viewFactories[$A.find(viewFactories,"type",previousViewType)],oldViews=previousFactory.views||{},previousViewConfig=previousFactory.viewConfig;if(previousFactory.beforeLeave){previousFactory.beforeLeave();}Object.keys(oldViews).forEach(function(key){oldViews[key].unrender();});if(previousViewConfig.editorLeft){this.removeChildren(this.leftPanel,true);}if(previousViewConfig.editorTop||previousViewConfig.editorBottom){editorSplitter.removeChildren(undefined,true);}if(previousViewConfig.editorRight){contentSplitter.removeChildren(contentSplitter.rightPanel,true);}}var currentFactory=viewFactories[$A.find(viewFactories,"type",this.currentViewType)],currentViewConfig=currentFactory.viewConfig,newViews=currentFactory.views=currentFactory.views||{},hasLeftPanel=currentViewConfig.editorLeft,hasTopPanel=currentViewConfig.editorTop,hasBottomPanel=currentViewConfig.editorBottom,hasRightPanel=currentViewConfig.editorRight,isLeftVisible=currentViewConfig.leftVisible||mstrApp.rootController.showProjectTableView,isTopVisible=currentViewConfig.topVisible,isBottomVisible=currentViewConfig.bottomVisible,isRightVisible=currentViewConfig.rightVisible;currentViewConfig.showDB=currentViewConfig.showDB||mstrApp.rootController.showDatabaseView;if(hasLeftPanel){newViews.editorLeft=newViews.editorLeft||currentFactory.newLeftNavigationPanel({alias:"leftPanel",slot:FIRST_ITEM_SLOT});this.addChildren(newViews.editorLeft);}if(hasTopPanel){newViews.editorTop=newViews.editorTop||currentFactory.newTopEditorPanel({slot:FIRST_ITEM_SLOT});editorSplitter.addChildren(newViews.editorTop);}if(hasBottomPanel){newViews.editorBottom=newViews.editorBottom||currentFactory.newBottomEditorPanel({slot:SECOND_ITEM_SLOT});editorSplitter.addChildren(newViews.editorBottom);}if(hasRightPanel){newViews.editorRight=newViews.editorRight||currentFactory.newRightItemsPanel({alias:"rightPanel",slot:SECOND_ITEM_SLOT});contentSplitter.addChildren(newViews.editorRight);}this.toggleFirstItemVisibility(isLeftVisible);editorSplitter.toggleSecondItemVisibility(isBottomVisible);editorSplitter.toggleFirstItemVisibility(isTopVisible);contentSplitter.toggleSecondItemVisibility(isRightVisible);this.parent.parent.toolbarWidget.update({isLeftVisible:isLeftVisible,showDB:currentViewConfig.showDB,currentView:this.currentViewType});if(hasBottomPanel&&editorSplitter.resizeHandleNode){editorSplitter.resizeHandleNode.style.display=(isTopVisible?"block":"none");}if(this.hasRendered){$H.forEach(newViews,function(widget){widget.render();});this.doLayout();}}mstrmojo.architect.ui.MainSplitter=mstrmojo.declare(mstrmojo.ui.Splitter,[mstrmojo.architect.ui._HasSplitterStoredLayout],{scriptClass:"mstrmojo.architect.ui.MainSplitter",alias:"mainSplitter",contentSplitter:undefined,leftPanel:undefined,rightPanel:undefined,lastLeftPanel:undefined,viewFactories:undefined,currentViewType:$ENUM_VIEW_TYPES.LAYER,getLayoutOffsets:function getLayoutOffsets(){return{h:2,w:2};},init:function init(props){var wls=window.localStorage,browserSettings=(wls&&wls.getItem("initialSettings"))||null,settings=JSON.parse(browserSettings);if(settings){this.currentViewType=settings.cv||$ENUM_VIEW_TYPES.LAYER;if(settings.splittersLayouts&&settings.splittersLayouts.mainSplitter){this.config=settings.splittersLayouts.mainSplitter;}}this._super(props);var viewFactories=this.viewFactories=[];$VIEW_FACTORIES.forEach(function(factoryDefn,idx){var factory=viewFactories[idx]=mstrmojo.insert(factoryDefn);this.addDisposable(factory);},this);handleSwitchView.call(this);},switchView:function switchView(newViewType){var previousViewType=this.currentViewType;this.currentViewType=newViewType;handleSwitchView.call(this,previousViewType);},closeViewObject:function closeViewObject(){var currentFactory=this.viewFactories[$A.find(this.viewFactories,"type",this.currentViewType)],currentViewConfig=currentFactory.viewConfig;if(currentViewConfig.editorRight){currentFactory.viewListVisible=true;currentFactory.closeObject();this.contentSplitter.toggleSecondItemVisibility(currentFactory.viewListVisible);}},updateViewObjectName:function updateViewObjectName(itemID,itemName){this.viewFactories[$A.find(this.viewFactories,"type",this.currentViewType)].updateViewObjectName(itemID,itemName);},toggleViewList:function toggleViewList(){var currentFactory=this.viewFactories[$A.find(this.viewFactories,"type",this.currentViewType)],currentViewConfig=currentFactory.viewConfig;if(currentViewConfig.editorRight){currentFactory.viewListVisible=!currentFactory.viewListVisible;this.contentSplitter.toggleSecondItemVisibility(currentFactory.viewListVisible);}},children:[{scriptClass:"mstrmojo.architect.ui.panels.ContentsPanel",alias:"contentSplitter",slot:SECOND_ITEM_SLOT}]});}());