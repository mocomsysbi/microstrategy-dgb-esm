(function(){mstrmojo.requiresCls("mstrmojo.warehouse.ui.BasePanel","mstrmojo.warehouse.ui.SearchBox");mstrmojo.architect.ui.panels.UnitsPanel=mstrmojo.declare(mstrmojo.warehouse.ui.BasePanel,null,{scriptClass:"mstrmojo.architect.ui.panels.UnitsPanel",contentWidget:undefined,searchBox:undefined,onPanelSearch:mstrmojo.emptyFn,getContentWidget:mstrmojo.emptyFn,init:function init(props){var contentWidget=this.getContentWidget();contentWidget.alias="contentWidget";this.children=[{scriptClass:"mstrmojo.warehouse.ui.SearchBox",alias:"searchBox"},contentWidget];this._super(props);this.searchBox.attachEventListener("searchTriggered",this.id,"onPanelSearch");},onheightChange:function onheightChange(evt){var contentWidget=this.contentWidget,contentNode=contentWidget.domNode,height=parseInt(evt.value,10)-60;contentWidget.height=height+"px";if(contentNode){contentNode.style.height=height+"px";}},onwidthChange:function onwidthChange(e){if(this.domNode){this.searchBox.set("width",e.value);}},postBuildRendering:function postBuildRendering(){if(this._super){this._super();}this.onheightChange({value:this.height});this.onwidthChange({value:this.width});}});}());