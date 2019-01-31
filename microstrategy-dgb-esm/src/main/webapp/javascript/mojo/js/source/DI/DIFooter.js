(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.Button","mstrmojo.MenuButton","mstrmojo.Label","mstrmojo.Image","mstrmojo.CheckBox","mstrmojo.ui.Checkbox","mstrmojo.DI.DIHelpers","mstrmojo.DI.DIConstants","mstrmojo.css","mstrmojo.dom","mstrmojo.tooltip");mstrmojo.requiresDescs(172,212,373,1059,1279,1302,2140,2400,3345,15452,9115,10236,12300,12387,12647,12693,12694,12695,13195,13587,13612,13850,13852,14417,14195,14458,14597,14598,15244,15245,15246,15247,15248,15249,12250);var KEY_ENTER=13,KEY_TAB=9,$CSS=mstrmojo.css,$DOM=mstrmojo.dom,constants=mstrmojo.DI.DIConstants,$HELPER=mstrmojo.DI.DIHelpers;var buttonStatus={UNVISIBLE:1,UNENABLED:2,ENABLED:3};var QUOTA_STATUS_ENUM={ERROR:-1,LOADING:0,NORMAL:1,NONE:2,UNLIMITED:3,EXCEED:4};function display(control,config){if(config){if(config.hasOwnProperty("visible")){control.set("visible",config.visible);}if(config.hasOwnProperty("enabled")){control.set("enabled",config.enabled);}if(config.hasOwnProperty("text")){control.set("text",config.text);}}}mstrmojo.DI.DIFooter=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.DI.DIFooter",markupString:'<div id="{@id}" class="{@cssClass}" tabIndex="0"><div class="footer-buttons back"></div><div class="footer-buttons"></div><div class="footer-buttons"></div><div class="footer-buttons"></div><div class="footer-managed-checkbox"></div><div class="footer-managed-label"></div><div class="footer-dda-checkbox"></div><div class="footer-dda-label"></div><div class="footer-buttons"></div><div class="cube-quota"></div></div>',markupSlots:{containerNode:function(){return this.domNode;},backNode:function(){return this.domNode.children[0];},cancelNode:function(){return this.domNode.children[1];},saveNode:function(){return this.domNode.children[2];},nextNode:function(){return this.domNode.children[3];},managedNode:function(){return this.domNode.children[4];},managedLabelNode:function(){return this.domNode.children[5];},ddaNode:function(){return this.domNode.children[6];},ddaLabelNode:function(){return this.domNode.children[7];},finishNode:function(){return this.domNode.children[8];},cubeQuotaNode:function(){return this.domNode.children[9];}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";},onquotaVisibleChange:function(){this.cubeQuotaNode.style.display=this.quotaVisible?"block":"none";$CSS.toggleClass(this.parent.domNode,"show-quota",this.quotaVisible);if(!$HELPER.isWS()){$CSS.addClass(this.cubeQuotaNode,"cube-quota-web");}}},init:function init(props){var rtn;if(this._super){rtn=this._super(props);}this.initButtons();return rtn;},destroy:function(ignoreDom){if(this.next&&this.next.richTooltip){this.next.richTooltip.refNode=null;}if(this._super){this._super(ignoreDom);}},controlButtons:[],hotButtonIndex:-1,quotaVisible:false,toggleButtonHOTStyle:function toggleButtonHOTStyle(index,flag){$CSS.toggleClass(this.controlButtons[index].obj.domNode,["select"],flag);},initButtons:function initButtons(){this.controlButtons=[];this.controlButtons.push({obj:this.back,status:buttonStatus.UNVISIBLE});this.controlButtons.push({obj:this.finish,status:buttonStatus.UNVISIBLE});this.controlButtons.push({obj:this.next,status:buttonStatus.UNVISIBLE});this.controlButtons.push({obj:this.save,status:buttonStatus.UNVISIBLE});this.controlButtons.push({obj:this.cancel,status:buttonStatus.UNVISIBLE});},refreshControlButtonsStatus:function refreshControlButtonsStatus(){mstrmojo.array.forEach(this.controlButtons,function(button){var obj=button.obj;if(obj&&obj.visible&&obj.visible===true){if(obj.enabled&&obj.enabled===true){button.status=buttonStatus.ENABLED;}else{button.status=buttonStatus.UNENABLED;}}else{button.status=buttonStatus.UNVISIBLE;}});},selectNextButton:function selectNextButton(){var new_index=(this.hotButtonIndex+1)%this.controlButtons.length;var end_index=this.hotButtonIndex;while(new_index!==end_index&&this.controlButtons[new_index].status!==buttonStatus.ENABLED){new_index=(new_index+1)%this.controlButtons.length;}if(new_index!==end_index){this.toggleButtonHOTStyle(this.hotButtonIndex,false);this.hotButtonIndex=new_index;this.toggleButtonHOTStyle(this.hotButtonIndex,true);}},initSelectedButton:function initSelectedButton(){var selected_index=0;while(selected_index<this.controlButtons.length&&this.controlButtons[selected_index].status!==buttonStatus.ENABLED){selected_index+=1;}if(selected_index<this.controlButtons.length){this.hotButtonIndex=selected_index;this.toggleButtonHOTStyle(this.hotButtonIndex,true);}},showControls:function show(config){if(config.next){display.call(this,this.next,config.next);}if(config.back){display.call(this,this.back,config.back);}if(config.cancel){display.call(this,this.cancel,config.cancel);}if(config.dda){display.call(this,this.ddaCheckbox,config.dda);display.call(this,this.ddaLabel,config.dda);}if(config.finish){display.call(this,this.finish,config.finish);}if(!mstrApp.diParams.disableQuota&&!$HELPER.isOnetier()&&config.cubeQuota){this.set("quotaVisible",!!config.cubeQuota.visible);}if(config.save){display.call(this,this.save,config.save);}if(config.managedCheckbox){display.call(this,this.managedCheckbox,config.managedCheckbox);display.call(this,this.managedLabel,config.managedCheckbox);}if(config.mdxRACheckbox){display.call(this,this.mdxRA,config.mdxRACheckbox);}this.refreshControlButtonsStatus();},enableButton:function enableButton(evt){var value;if(!this.visible){return ;}switch(evt.name){case"allowSave":value=evt.value;break;case"refreshTables":value=evt.items.length>0;if(evt.hasOwnProperty("tablesEnabled")){value=value&&evt.tablesEnabled;}break;}if(value!==undefined){this.set("enabled",value);}},getQuotaIconClassByStatus:function(status){var cssClass="cube-quota-icon ";switch(status){case QUOTA_STATUS_ENUM.LOADING:cssClass+="loading-icon";break;case QUOTA_STATUS_ENUM.UNLIMITED:cssClass+="unlimited-icon";break;case QUOTA_STATUS_ENUM.NONE:cssClass+="no-quota-icon";break;case QUOTA_STATUS_ENUM.EXCEED:case QUOTA_STATUS_ENUM.ERROR:cssClass+="error-icon";break;default:break;}return cssClass;},getQuotaStatus:function(){var quota=this.model.cubesInfo;if(quota===-1){return QUOTA_STATUS_ENUM.ERROR;}else{if(!quota||!quota.cubes){return QUOTA_STATUS_ENUM.LOADING;}else{if(quota.cubes.cquota===-1){return QUOTA_STATUS_ENUM.UNLIMITED;}else{if(quota.cubes.cquota===0){return QUOTA_STATUS_ENUM.NONE;}else{if(quota.cubes.cusage>quota.cubes.cquota){return QUOTA_STATUS_ENUM.EXCEED;}else{return QUOTA_STATUS_ENUM.NORMAL;}}}}}},displayQuota:function(){var status=this.getQuotaStatus();var text="";if(status===QUOTA_STATUS_ENUM.LOADING){return ;}var quota=this.model.cubesInfo;this.cubeQuota.set("visible",status===QUOTA_STATUS_ENUM.NORMAL);this.cubeQuotaIcon.set("visible",status!==QUOTA_STATUS_ENUM.NORMAL);this.cubeSeeMoreContainer.set("visible",status===QUOTA_STATUS_ENUM.EXCEED);this.cubeQuotaIcon.set("cssClass",this.getQuotaIconClassByStatus(status));if(status===QUOTA_STATUS_ENUM.ERROR){text=mstrmojo.desc(14195,"We are unable to retrieve the information about your cubes.");}else{if(status===QUOTA_STATUS_ENUM.UNLIMITED){this.cubeQuota.updateProgress(0);text=mstrmojo.desc(15244,"You have been allocated ##### storage quota.").replace("#####","<span class='bold-font'>"+mstrmojo.desc(15245,"Unlimited")+"</span>");}else{if(status===QUOTA_STATUS_ENUM.EXCEED){text=mstrmojo.desc(15247,"##### MB out of @@@@@ MB (*****%) used for your storage quota.").replace("#####",Math.round(quota.cubes.cusage)).replace("*****",Math.round(quota.cubes.cusage/quota.cubes.cquota*10000)/100).replace("@@@@@",Math.round(quota.cubes.cquota));this.cubeSeeMoreContainer.set("visible",true);}else{this.cubeQuota.updateProgress(Math.round(quota.cubes.cusage/quota.cubes.cquota*10000)/100);text=mstrmojo.desc(15248,"You have used ##### MB out of @@@@@ MB (*****%) of your allocated storage quota.").replace("#####",Math.round(quota.cubes.cusage)).replace("*****",Math.round(quota.cubes.cusage/quota.cubes.cquota*10000)/100).replace("@@@@@",Math.round(quota.cubes.cquota));}}}if(!$HELPER.isWS()&&status!==QUOTA_STATUS_ENUM.ERROR){text=text+" "+mstrmojo.desc(13195,"Manage Your Datasets...");}this.cubeQuotaLabel.set("text",text);},onQuotaChange:function(){this.displayQuota();},preBuildRendering:function preBuildRendering(){if(this._super){this._super();}mstrApp.getRootController().model.attachEventListener("cubesInfoChange",this.id,"onQuotaChange");if(this.model.cubesInfo&&!$HELPER.isOnetier()){this.displayQuota();}},postBuildRendering:function postBuildRendering(){if(this._super){this._super();}if(this.model.cubesInfo&&!$HELPER.isOnetier()){var quota=this.model.cubesInfo;if(!quota.cubes){console.error("error in get quota info");}else{if(quota.cubes.cquota===-1){this.cubeQuota.updateProgress(0);}else{this.cubeQuota.updateProgress(Math.round(quota.cubes.cusage/quota.cubes.cquota*10000)/100);}}}this.next.richTooltip.refNode=this.nextNode;},onkeydown:function onkeydown(event){if(event.e.keyCode===KEY_ENTER){this.controlButtons[this.hotButtonIndex].obj.onclick(event);}else{if(event.e.keyCode===KEY_TAB){this.selectNextButton();}}mstrmojo.dom.preventDefault(event.hWin,event.e);return false;},children:[{scriptClass:"mstrmojo.ui.Checkbox",slot:"ddaNode",text:mstrmojo.desc(12387,"Direct Data Connection"),alias:"ddaCheckbox",oncheckedChange:function oncheckedChange(){mstrApp.getRootController().getDDAController().onToggleDDA(this.checked);},preBuildRendering:function prebuildRendering(){if(this._super){this._super();}},bindings:{visible:function(){return !mstrApp.isSingleTier&&!mstrApp.diParams.disableDDA;}},postCreate:function postCreate(){if(this._super){this._super();}this.markupMethods=mstrmojo.hash.copy(this.markupMethods);this.markupMethods.onenabledChange=function(){$CSS.toggleClass(this.domNode,"disabled",!this.enabled);$CSS.toggleClass(this.parent.ddaLabel.domNode,"disabled",!this.enabled);};}},{scriptClass:"mstrmojo.Label",slot:"ddaLabelNode",text:mstrmojo.desc(12387,"Direct Data Connection"),alias:"ddaLabel",bindings:{visible:function(){return !mstrApp.isSingleTier&&!mstrApp.diParams.disableDDA;}}},{scriptClass:"mstrmojo.CheckBox",cssClass:"managedCheckbox",slot:"managedNode",alias:"managedCheckbox",visible:false,oncheckedChange:function oncheckedChange(){mstrApp.getRootController().model.set("isManagedCube",this.checked);},onenabledChange:function(){this.set("checked",mstrApp.getRootController().model.isManagedCube);},postBuildRendering:function(){var model=mstrApp.getRootController().model;model.attachEventListener("isManagedCubeChange",this.id,"update");},update:function(){var model=mstrApp.getRootController().model;this.set("checked",model.isManagedCube);},bindings:{enabled:function(){return mstrApp.getRootController().model.operationMode===constants.operationMode.create;},checked:function(){if(mstrApp.getRootController().model.isCalledByFlex){return false;}return mstrApp.getRootController().model.isManagedCube;}}},{scriptClass:"mstrmojo.Label",slot:"managedLabelNode",text:"Managed Cube",alias:"managedLabel",visible:false,bindings:{enabled:function(){return mstrApp.getRootController().model.operationMode===constants.operationMode.create;}}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-button mstrmojo-WebButton",text:mstrmojo.desc(2140,"Cancel"),slot:"cancelNode",alias:"cancel",onclick:function(){mstrApp.getRootController().onCancelButtonClick();}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-button mstrmojo-WebButton",text:mstrmojo.desc(2400,"Save"),slot:"saveNode",alias:"save",useRichTooltip:true,richTooltip:{cssClass:"vi-regular vi-tooltip-V",posType:mstrmojo.tooltip.POS_BOTTOMLEFT,keepArrowXPos:true},updateTooltipConfig:function(){if(!this.enabled){this.richTooltip.refNode=this.domNode;this.richTooltip.content=mstrmojo.desc(12647,"You do not have the permission to modify this object");this.set("richTooltip",this.richTooltip);}},onclick:function(){mstrApp.getRootController().onSaveButtonClick();},bindings:{visible:function(){return !mstrApp.isSingleTier;}}},{slot:"backNode",scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-button back mstrmojo-WebButton ",text:mstrmojo.desc(373,"Back"),alias:"back",onclick:function(){mstrApp.getRootController().onBackButtonClick();}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-button mstrmojo-WebButton",alias:"next",slot:"nextNode",text:mstrmojo.desc(212,"Continue"),useRichTooltip:true,richTooltip:{cssClass:"vi-regular vi-tooltip-V"},updateTooltipConfig:function(){this.richTooltip.top=-this.domNode.offsetHeight-this.richTooltip.refNode.offsetTop+"px";if(this.text===mstrmojo.desc(13850,"Update Dataset")&&!this.enabled){this.richTooltip.content=mstrmojo.desc(12647,"You do not have the permission to modify this object");}this.set("richTooltip",this.richTooltip);},ontextChange:function(){if(this.text!==mstrmojo.desc(13852,"Prepare Data")){this.richTooltip.content="";}else{this.richTooltip.content=mstrmojo.desc(13587,"Edit data and add more tables.");}if(this.text===mstrmojo.desc(1302,"Finish")||this.text===mstrmojo.desc(13850,"Update Dataset")){$CSS.addClass(this.domNode,"hot");}},onclick:function(){mstrApp.getRootController().onNextButtonClick();}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-button mstrmojo-WebButton hot",alias:"finish",slot:"finishNode",text:mstrmojo.desc(1302,"Finish"),visible:false,onclick:function(){mstrApp.getRootController().onFinishButtonClick();}},{scriptClass:"mstrmojo.ProgressBar",alias:"cubeQuota",slot:"cubeQuotaNode",visible:false,cssClass:"mstrmojo-di-user-quota"},{scriptClass:"mstrmojo.Image",alias:"cubeQuotaIcon",slot:"cubeQuotaNode",visible:true,cssClass:"cube-quota-icon loading-icon",},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-di-user-quota-text",alias:"cubeQuotaLabel",slot:"cubeQuotaNode",text:mstrmojo.desc(12695,"Fetching Cube Quota Information..."),allowHTML:true,onclick:function(event){if($HELPER.isWS()){return ;}var controller=mstrApp.getRootController();controller.getCubeQuota({complete:function(){controller.displayCubesInfo(event,true);}},{showProgress:true,showProgressText:true,progressText:mstrmojo.desc(12955,"Getting information about your cubes...")});}},{scriptClass:"mstrmojo.Box",cssClass:"quota-see-more-container",alias:"cubeSeeMoreContainer",slot:"cubeQuotaNode",visible:false,children:[{scriptClass:"mstrmojo.Label",cssClass:"quota-see-more",alias:"cubeSeeMore",text:mstrmojo.desc(15249,"See More..."),onclick:function(){this.parent.cubeSeeMorePopDiv.set("visible",!this.parent.cubeSeeMorePopDiv.visible);}},{scriptClass:"mstrmojo.Box",cssClass:"quota-see-more-click-pop V-center mstrmojo-Tooltip vi-regular vi-tooltip-V",alias:"cubeSeeMorePopDiv",visible:true,children:[{scriptClass:"mstrmojo.Label",cssClass:"quota-see-more-pop-label",alias:"cubeSeeMoreContent",text:mstrmojo.desc(15250,"Please try to free some used in-memory space. For more information, contact your administrator.")},{scriptClass:"mstrmojo.Image",cssClass:"cube-see-more-close-icon",alias:"cubeSeeMorePopClose",onclick:function(){this.parent.set("visible",false);}},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-Tooltip-arrow"}]}]},{scriptClass:"mstrmojo.Label",allowHTML:true,cssClass:"mstrmojo-di-source-admin cf",alias:"sourceAdmin",visible:false,text:'<span class="icon"></span><span class="text">'+mstrmojo.desc(14417,"Customize")+"</span>",onclick:function(){mstrApp.getRootController().showPage(constants.pageType.sourceAdmin);}},{scriptClass:"mstrmojo.Box",alias:"mdxRA",visible:false,cssClass:"mstrmojo-di-mdx-ra-checkbox cf",useRichTooltip:true,tooltipOpenDelay:1500,updateTooltipConfig:function(){var pos=$DOM.position(this.domNode);this.set("richTooltip",{top:Math.max(pos.y+18,0),left:Math.max(pos.x+pos.w/2,0),cssClass:"vi-regular A-center vi-tooltip-V mstrmojo-di-mdx-ra-checkbox-tooltip",posType:mstrmojo.tooltip.POS_BOTTOMCENTER,content:this.content,enableHover:true});},content:mstrmojo.desc(14598,"MicroStrategy provides two types of attributes: normal attributes and hierarchical attributes. A normal attribute represents a single hierarchy level, e.g., Month. A hierarchical attribute represents an entire hierarchy and its levels, e.g., Time. If a hierarchy is imported as a single hierarchical attribute, then the entire hierarchy can be placed on a report at once, and operations like filtering and sorting can be performed respecting the hierarchy. If a hierarchy is imported as multiple normal attributes to represent each hierarchy level, then each level can be placed on a report separately, and filters can be created on specific levels."),update:function(isVisible){this.children[0].update();this.set("visible",!!isVisible);},onvisibleChange:function onvisibleChange(){if(this.raCheckbox){this.raCheckbox.set("checked",false);}},children:[{scriptClass:"mstrmojo.ui.Checkbox",alias:"raCheckbox",oncheckedChange:function oncheckedChange(){var rc;try{rc=mstrApp.getRootController();}catch(e){}if(rc&&typeof rc.setRecursive==="function"){rc.setRecursive(this.checked?1:0);}},update:function(){var me=this,evtConfig={},listConfig=evtConfig[this.id]={};listConfig.recursiveChange=function(evt){me.set("checked",evt.value?true:false);};mstrApp.getRootController().attachDataChangeListeners(evtConfig);me.set("enabled",!mstrApp.tableID);}},{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(14597,"Import hierarchy as hierarchical attribute")}]}]});}());