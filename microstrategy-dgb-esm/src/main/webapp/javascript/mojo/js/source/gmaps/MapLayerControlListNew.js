(function(){mstrmojo.requiresCls("mstrmojo.css","mstrmojo.dom","mstrmojo.array","mstrmojo.Box","mstrmojo.VBox","mstrmojo.tooltip","mstrmojo.Popup","mstrmojo.RadioList","mstrmojo.CheckBox","mstrmojo.gmaps.MapEnums","mstrmojo.gmaps.MapLayerPortlet","mstrmojo.VisUtility");var $MOJO=mstrmojo,$ARR=$MOJO.array,$CSS=$MOJO.css,$DOM=$MOJO.dom,$TOOLTIP=$MOJO.tooltip,$GMAPS=$MOJO.gmaps,$EnumToolbarState=$GMAPS.EnumToolbarState,$EnumPropertyType=$GMAPS.EnumPropertyType,$EnumClusterMode=$GMAPS.EnumClusterMode,$EnumDataLabelShowOption=$GMAPS.EnumDataLabelShowOption,$EnumDataLabel=$GMAPS.EnumDataLabel,CSS_UNIT_NAME="unit-name",$VisUtility=$MOJO.VisUtility;function getDataLabelShowVal(map,layerKey){var mapViewer=map&&map.mapViewer,graphicLayer=mapViewer&&mapViewer.getGraphicLayer(layerKey);if(graphicLayer){return graphicLayer.getLayerProp($EnumDataLabel.DATA_LABEL_SHOW);}}function truncateUnitname(layerUnitText){var font="10px Arial",maxWidth=220-17-26-10,layerUnitWidth=$VisUtility.measureTextWidth(layerUnitText,font,true),idx=layerUnitText.length-8,newText;while(layerUnitWidth>maxWidth){newText=layerUnitText.slice(0,idx)+"..."+layerUnitText.slice(-5);idx-=1;layerUnitText=newText;layerUnitWidth=$VisUtility.measureTextWidth(layerUnitText,font,true);}return layerUnitText;}mstrmojo.gmaps.MapLayerControlListNew=mstrmojo.declare(mstrmojo.Popup,[mstrmojo._HasPopup],{scriptClass:"mstrmojo.gmaps.MapLayerControlListNew",cssClass:"layerSelectBox",sourceToolbar:null,maxHeight:null,alias:"layerSelectBox",slot:"popupNode",locksHover:true,autoCloses:true,layerCount:null,onOpen:function onOpen(){var sourceToolbar=this.sourceToolbar,layerSelectVBox=this.layerCtrlContentWrapper.layerContentBox.layerSelectVBox,layerCtrlNode=sourceToolbar&&sourceToolbar.layerCtrlNode,parent=this.parent,topSpan;if(!layerCtrlNode||!parent){return ;}sourceToolbar.set("state",$EnumToolbarState.LAYERS_SELECT);this.set("selected",true);$CSS.addClass(layerCtrlNode,"open");topSpan=layerSelectVBox.children[0]&&layerSelectVBox.children[0].children[0];if(topSpan&&topSpan.domNode){topSpan.domNode.style["margin-top"]="4px";}parent.set("useRichTooltip",false);},onClose:function onClose(){var sourceToolbar=this.sourceToolbar,parent=this.parent,layerCtrlNode=sourceToolbar&&sourceToolbar.layerCtrlNode;if(!layerCtrlNode){return ;}this.set("selected",false);$CSS.removeClass(layerCtrlNode,"open");sourceToolbar.set("state",$EnumToolbarState.NORMAL);parent.set("useRichTooltip",true);this.destroy();},children:[{alias:"layerCtrlContentWrapper",scriptClass:"mstrmojo.Box",cssClass:"layerCtrlContentWrapper",children:[{alias:"layerContentBox",scriptClass:"mstrmojo.Box",cssClass:"layerContentBox",children:[{alias:"layerSelectVBox",scriptClass:"mstrmojo.VBox",cssClass:"layerSelectVBox",cssText:"",postCreate:function(){var layerCtrl=this.parent&&this.parent.parent&&this.parent.parent.parent;layerCtrl&&layerCtrl.createLayerListContent(this);}}]}]}],createLayerListContent:function createLayerListContent(parent){var layerItems=this.sourceToolbar&&this.sourceToolbar.getLayerCtrlList(),children=[];if(!layerItems||!parent){return ;}this.layerCount=layerItems.length;this.addLayerItemsNode(children,layerItems);parent.set("children",children);},addLayerItemsNode:function addLayerItemsNode(children,layerItems){if(!$ARR.isArray(children)||!$ARR.isArray(layerItems)){return ;}var layerCtrl=this,me=this,showCls="state-show",hideCls="state-hide",layerItem,layerItemChildren,i,il;for(i=0,il=layerItems.length;i<il;i++){layerItem=layerItems[i];layerItemChildren=this._createSingleLayerControls(layerItem);if(layerItem){children.push({scriptClass:"mstrmojo.gmaps.MapLayerPortlet",isCollapsed:il!==1||i!==0||(layerItemChildren&&layerItemChildren.length===0),title:layerItem.n,layerKey:layerItem.id,isLayerVisible:layerItem.isVisible,isVisFilterSource:layerItem.isVisFilterSource,children:layerItemChildren,canShowLayer:function(){var sourceToolbar=me.sourceToolbar,layer=sourceToolbar&&sourceToolbar.getGraphicLayer(this.layerKey);return !!layer&&layer.isLayerInZoomRange();},addMenuItems:function(cfg){var that=this;cfg.addToolbarBtn(null,"visible-icn "+(this.canShowLayer()&&this.isLayerVisible?showCls:hideCls),function(item,rightToolNode){var sourceToolbar=layerCtrl&&layerCtrl.sourceToolbar;if(!that.canShowLayer()){return ;}that.isLayerVisible=!that.isLayerVisible;that.refreshNodeStatus();if(sourceToolbar){sourceToolbar.setLayerVisibility(that.layerKey,that.isLayerVisible);}});}});}}},_createSingleLayerControls:function _createSingleLayerControls(item){var layerKey=item.id,dlAttr=item.dlAttr,dlMetric=item.dlMetric,sourceToolbar=this.sourceToolbar,dlShowVal=getDataLabelShowVal(sourceToolbar&&sourceToolbar.map,layerKey),me=this,controls=[];if(item.isClustered!==undefined){controls.push({scriptClass:"mstrmojo.CheckBox",label:mstrmojo.desc(15705,"Enable Clustering"),align:"left",cssDisplay:"block",layerKey:layerKey,checked:!!item.isClustered,useRichTooltip:true,updateTooltipConfig:function(){if(!this.checked){this.richTooltip=null;return ;}var position=$DOM.position(this.domNode),sourceToolbar=me.sourceToolbar,layer=sourceToolbar&&sourceToolbar.getGraphicLayer(this.layerKey);if(layer&&!layer.isLayerInClusterRange()){this.richTooltip={content:mstrmojo.desc(15706,"Clustering is not enabled at current zoom level due to clustering settings."),posType:$TOOLTIP.POS_TOPLEFT,cssClass:"vi-warning vi-regular vi-tooltip-C",top:position.y-position.h+2,left:position.x+position.w-10};}else{this.richTooltip=null;}},onclick:function(e){var sourceToolbar=me.sourceToolbar,map=sourceToolbar&&sourceToolbar.map,checked=this.checked;if(!map){return ;}this.set("checked",checked);this.hasOpenTooltip=false;map.writeProperties($EnumPropertyType.clusterMode,checked?$EnumClusterMode.ON:$EnumClusterMode.OFF,this.layerKey);this.showTooltip(e);}});controls.push({scriptClass:"mstrmojo.Label",text:"",cssClass:CSS_UNIT_NAME});}if(dlAttr){controls.push({scriptClass:"mstrmojo.CheckBox",label:mstrmojo.desc(15707,"Show Text Label"),align:"left",cssDisplay:"block",layerKey:layerKey,checked:dlShowVal===$EnumDataLabelShowOption.SHOW_TEXT||dlShowVal===$EnumDataLabelShowOption.SHOW_BOTH,onclick:function(){var sourceToolbar=me.sourceToolbar,map=sourceToolbar&&sourceToolbar.map,layerKey=this.layerKey,dlShowVal=getDataLabelShowVal(map,layerKey),checked=this.checked;if(!map){return ;}this.set("checked",checked);if(checked){switch(dlShowVal){case $EnumDataLabelShowOption.NONE:dlShowVal=$EnumDataLabelShowOption.SHOW_TEXT;break;case $EnumDataLabelShowOption.SHOW_VALUE:dlShowVal=$EnumDataLabelShowOption.SHOW_BOTH;break;default:break;}}else{switch(dlShowVal){case $EnumDataLabelShowOption.SHOW_TEXT:dlShowVal=$EnumDataLabelShowOption.NONE;break;case $EnumDataLabelShowOption.SHOW_BOTH:dlShowVal=$EnumDataLabelShowOption.SHOW_VALUE;break;default:break;}}map.writeProperties($EnumDataLabel.DATA_LABEL_SHOW,dlShowVal,layerKey);}});controls.push({scriptClass:"mstrmojo.Label",text:truncateUnitname(dlAttr.n),cssClass:CSS_UNIT_NAME});}if(dlMetric){controls.push({scriptClass:"mstrmojo.CheckBox",label:mstrmojo.desc(15708,"Show Value Label"),align:"left",cssDisplay:"block",layerKey:layerKey,checked:dlShowVal===$EnumDataLabelShowOption.SHOW_VALUE||dlShowVal===$EnumDataLabelShowOption.SHOW_BOTH,onclick:function(){var sourceToolbar=me.sourceToolbar,map=sourceToolbar&&sourceToolbar.map,layerKey=this.layerKey,dlShowVal=getDataLabelShowVal(map,layerKey),checked=this.checked;if(!map){return ;}this.set("checked",checked);if(checked){switch(dlShowVal){case $EnumDataLabelShowOption.NONE:dlShowVal=$EnumDataLabelShowOption.SHOW_VALUE;break;case $EnumDataLabelShowOption.SHOW_TEXT:dlShowVal=$EnumDataLabelShowOption.SHOW_BOTH;break;default:break;}}else{switch(dlShowVal){case $EnumDataLabelShowOption.SHOW_VALUE:dlShowVal=$EnumDataLabelShowOption.NONE;break;case $EnumDataLabelShowOption.SHOW_BOTH:dlShowVal=$EnumDataLabelShowOption.SHOW_TEXT;break;default:break;}}map.writeProperties($EnumDataLabel.DATA_LABEL_SHOW,dlShowVal,layerKey);}});controls.push({scriptClass:"mstrmojo.Label",text:truncateUnitname(dlMetric.n),cssClass:CSS_UNIT_NAME});}return controls;},destroy:function destroy(ignoreDom){var pr=this.popupRef;if(this.popupToBody&&pr.hasRendered){pr.unrender(false);}delete this.sourceToolbar;this._super(ignoreDom);}});}());