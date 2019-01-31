(function(){mstrmojo.requiresCls("mstrmojo.vi.models.BaseVisDropZones","mstrmojo.vi.models.EnumDragSources","mstrmojo.vi.viz.EnumDSSDropZones","mstrmojo.vi.viz.EnumWidgetTypes","mstrmojo.array","mstrmojo.hash","mstrmojo.func");var $ARR=mstrmojo.array,$HASH=mstrmojo.hash,$FUNC=mstrmojo.func,EMPTY_FN=mstrmojo.emptyFn,TEMPLATE_METRICS_ID="-1",ENUM_TARGET_POSITION=mstrmojo.vi.models.DropZonesModel.ENUM_TARGET_POSITION,ENUM_DROP_ZONES=mstrmojo.vi.viz.EnumDSSDropZones,ENUM_WIDGET_TYPES=mstrmojo.vi.viz.EnumWidgetTypes;var ENUM_ALLOW_ATTRIBUTE_AND_METRIC=0,ENUM_ALLOW_ATTRIBUTE=1,ENUM_ALLOW_METRIC=2,ENUM_ALLOW_ATTRIBUTE_OR_METRIC=3;var DROP_ZONE_MAP=["XAxis","YAxis","BreakBy","SliceBy","ColorBy","SizeBy","AdditionalMetrics","Angle","Grouping","GeoAttribute","Layout","FromItem","ToItem","ItemSize","Latitude","Longitude"];function mapZoneNameToJSONName(name){switch(name){case"Angle":return"AngleBy";case"Grouping":return"Grp";case"GeoAttribute":return"Geo";case"Layout":return"layout";case"FromItem":return"from";case"ToItem":return"to";case"ItemSize":return"itemsz";case"Latitude":return"Lat";case"Longitude":return"Long";}return name;}function isTemplateDropZone(zoneId){return zoneId===-1||zoneId===ENUM_DROP_ZONES.Rows||zoneId===ENUM_DROP_ZONES.Columns;}function getClearTemplateUnitsAction(){var actions=[],model=this.getHost().model,xtabStructure=this.getHostStructure(),templateZones=[{n:"rows",axis:ENUM_DROP_ZONES.Rows},{n:"cols",axis:ENUM_DROP_ZONES.Columns},{n:"mx",axis:-1}];$ARR.forEach(templateZones,function(zone){$ARR.forEach(xtabStructure[zone.n],function(item,idx){if(item.did!==TEMPLATE_METRICS_ID){actions.push(model.getRemoveTemplateUnitAction($HASH.copy(item,{axis:zone.axis,unitPos:idx+1})));}});});return actions;}function getAddItemActions(zone,items,idx,replaceItem,datasetId){var host=this.getHost(),model=host.model,zoneId=zone.id,isTemplate=isTemplateDropZone(zoneId),extras={datasetId:datasetId},actions=[];if(!isTemplate){var isDropZonesEmpty=true;$ARR.forEach(this.dropZones,function(zone){if(zone.items.length>0){isDropZonesEmpty=false;return false;}});if(isDropZonesEmpty){actions.push({act:"createDefaultDropZones",nodeKey:host.k,treeType:host.defn.tt,datasetId:model.data.datasetId,datasetType:3,widgetType:ENUM_WIDGET_TYPES.CUSTOM,partialUpdate:{nodes:[host.k]}});actions=actions.concat(getClearTemplateUnitsAction.call(this));}}if(replaceItem){if(isTemplate){actions.push(model.getRemoveTemplateUnitAction(replaceItem));}else{actions=actions.concat(this.getRemoveDropZoneUnitActions(zone,replaceItem));}}if(isTemplate){$ARR.forEach(items,function(item){actions.push(model.getAddTemplateUnitAction(item,datasetId,zoneId,idx));});}else{actions=actions.concat(this.getAddDropZoneUnitsActions(zone,items,idx,extras)||[]);}return actions;}function generateDropZoneItems(dropZones){var length=dropZones&&dropZones.length;if(!length){return null;}var maxLength=DROP_ZONE_MAP.length;if(length>maxLength){throw"ERROR: Defined drop zones exceeds max capacity: "+maxLength+"!";}var me=this,zones=[],zoneNames=[];var getDisabledFn=function(disabledValue){var result=false;try{if(disabledValue){result=(new Function("return "+disabledValue)).call(this);}}catch(exception){result=false;}return result;};$ARR.forEach(dropZones,function(zone,index){var zoneName=zone.name,zoneDSSName=DROP_ZONE_MAP[index];if($ARR.indexOf(zoneNames,zoneName)>-1){throw"ERROR: More than one drop zones have same name!";}zoneNames.push(zoneName);zones.push(me.getZone(zoneName,ENUM_DROP_ZONES[zoneDSSName],me.getDZFlatStruct()[mapZoneNameToJSONName(zoneDSSName)],getDisabledFn.call(me,zone.disabled),{title:zone.title,allowSingle:zone.maxCapacity===1}));});return zones;}function getCustomDropZoneIndexByName(zoneName){var index=-1;$ARR.forEach(this.getCustomDropZones(),function(zone,i){if(zone.name===zoneName){index=i;return false;}});return index;}function getAllowedDropItems(zone,dragItems,edge){var me=this,allowObjectType=ENUM_ALLOW_ATTRIBUTE_AND_METRIC,maxCapacity=Number.MAX_VALUE,index=-1;$ARR.forEach(this.getCustomDropZones(),function(zoneDef,i){if(zoneDef.name===zone.n){allowObjectType=zoneDef.allowObjectType;maxCapacity=zoneDef.maxCapacity;index=i;return false;}});if(index===-1){return dragItems;}var isReplacing=this.isReplacing(edge),itemsInZone=this.getDropZoneObjectsByIndex(index),itemsCount=itemsInZone.length;if(!isReplacing&&itemsCount>=maxCapacity){return[];}return $ARR.filter(dragItems,function(item){var isMetric=me.isMetric(item);switch(allowObjectType){case ENUM_ALLOW_ATTRIBUTE:return !isMetric;case ENUM_ALLOW_METRIC:return isMetric;case ENUM_ALLOW_ATTRIBUTE_OR_METRIC:return !itemsCount?true:((itemsCount===1&&isReplacing)||(me.isMetric(itemsInZone[0])===isMetric));}return true;});}function calculateObjectTransition(zone,source,disallowType){var me=this,allowObjectType=zone.allowObjectType;if(allowObjectType!==disallowType&&source.length>0){if(allowObjectType===ENUM_ALLOW_ATTRIBUTE_OR_METRIC&&disallowType===ENUM_ALLOW_ATTRIBUTE&&$ARR.filterOne(this._dropZoneTransitions,function(info){return info.toZoneId===ENUM_DROP_ZONES[DROP_ZONE_MAP[getCustomDropZoneIndexByName.call(me,zone.name)]]&&!me.isMetric(info.obj);})){return ;}var i=Math.min(zone.maxCapacity||Number.MAX_VALUE,source.length);this.transitionObjectsToZone(zone.name,source.splice(0,i));}}mstrmojo.vi.models.CustomVisDropZones=mstrmojo.declare(mstrmojo.vi.models.BaseVisDropZones,null,{scriptClass:"mstrmojo.vi.models.CustomVisDropZones",getDropZones:function getDropZones(){var xtabStructure=this.getHostStructure(),host=this.getHost(),customDropZones=generateDropZoneItems.call(this,this.getCustomDropZones()),zones=xtabStructure?(customDropZones||this._super().zones):[];this.dropZones=zones;return{n:host.defn.ttl,zones:zones};},getAllowDropInfo:function getAllowDropInfo(zone,dragItems,idx,edge,context){dragItems=getAllowedDropItems.call(this,zone,dragItems,edge);return $HASH.copy(this.shouldAllowObjectsInDropZone(zone,dragItems,idx,edge,context),{allowedItems:dragItems.concat(),removeReplaced:edge===ENUM_TARGET_POSITION.ON&&$ARR.find(dragItems,"did",zone.items[idx].did)===-1});},unitsDropped:function unitsDropped(zone,context,dropInfo){var viz=this.getHost(),dragData=context.src.data,actions=context.actions||[],idx=dropInfo.idx,submittedActions,deferredExecuteGenerator,me=this,docModel=me.docModel,allowedItems=dropInfo.allowedItems,replaceItem=(this.isReplacing(dropInfo.edge)&&dropInfo.removeReplaced)?zone.items[idx]:null,templateActions=getAddItemActions.call(this,zone,allowedItems,this.getDropTargetIndex(zone,dropInfo),replaceItem,dragData.dsid);templateActions=templateActions.concat(this.getActionsForObjectsDropped(zone,allowedItems,this.getDropTargetIndex(zone,dropInfo),replaceItem,{datasetId:dragData.dsid})||[]);submittedActions=actions.concat(this.getUpdateTemplateAction(templateActions));deferredExecuteGenerator=function(hookVFUnset){return function(){var _submittedActions=hookVFUnset?viz.model.wrapUnsetVisualizationFilterAction(submittedActions):submittedActions;me.submitDropZoneUpdates(_submittedActions,$FUNC.wrapMethods(context.callback,viz.model.docModel.controller._getXtabCallback(viz)));};};docModel.checkAndNotifyVFChangeOnDZUnitsUpdate({actions:submittedActions,zm:me},deferredExecuteGenerator(true),deferredExecuteGenerator(false));},deleteItems:function deleteItems(zone,items){var me=this,templateActions=[];$ARR.forEach(items,function(item){if(isTemplateDropZone(zone.id)){templateActions.push(me.getHost().model.getRemoveTemplateUnitAction(item));}else{templateActions=templateActions.concat(me.getRemoveDropZoneUnitActions(zone,item));}});templateActions=templateActions.concat(this.getActionsForObjectsRemoved(zone,items)||[]);this.submitDropZoneTemplateUpdates(templateActions);},getUnitMenuItems:function getUnitMenuItems(cfg,zone,item,el){this._super(cfg,zone,item,el);var xtabHost=this.getHost(),menuItems=cfg.getMenuItems(true),idx=$ARR.find(menuItems,"n","Edit Groups..."),idxCreateGroup=$ARR.find(menuItems,"n","Create Groups..."),rows=$HASH.walk("model.data.gts.row",xtabHost),unitId=rows?$ARR.find(rows,"id",item.did):-1;if(rows&&unitId!==-1){var menuItem,menuFunc=function(){var cell={otp:item.t,id:item.did,n:item.n,axis:1,ui:unitId};xtabHost.derivedElementsEdit(cell);};if(idx!==-1){menuItem=menuItems[idx];menuItem.fn=menuFunc;}if(idxCreateGroup!==-1){menuItem=menuItems[idxCreateGroup];menuItem.fn=menuFunc;}}this.getDropZoneContextMenuItems(cfg,zone,item,el);},getClearAllUnitsActions:function getClearAllUnitsActions(){return mstrmojo.vi.models.DropZonesModel.prototype.getClearAllUnitsActions.call(this);},transitionDropZones:function transitionDropZones(attributes,metrics){this._dropZoneTransitions=[];this.customDropZonesTransition(attributes,metrics);return this._dropZoneTransitions;},getColorByAttributes:function getColorByAttributes(){var customDZ=this.getCustomDropZones(),zoneItems,me=this;$ARR.forEach(customDZ,function(zone){if(zone.isColorBy===true){zoneItems=me.getDropZoneObjectsByName(zone.name);}});return zoneItems;},getCustomDropZones:EMPTY_FN,getActionsForObjectsDropped:EMPTY_FN,getActionsForObjectsRemoved:EMPTY_FN,getDropZoneContextMenuItems:EMPTY_FN,shouldAllowObjectsInDropZone:EMPTY_FN,getHostStructure:function getHostStructure(){var modelData=this.getHostModel();return modelData&&modelData.gsi;},getDropZoneObjectsByIndex:function getDropZoneItems(index){return this.getDZFlatStruct()[mapZoneNameToJSONName(DROP_ZONE_MAP[index])]||[];},getAddDropZoneObjectsActions:function getAddDropZoneObjectsActions(actions,zoneName,objects,idx,extras){$ARR.insert(actions,undefined,this.getAddDropZoneUnitsActions(this.getZoneModelByName(zoneName),objects||[],idx,extras));},getRemoveDropZoneObjectsActions:function getRemoveDropZoneObjectsActions(actions,zoneName,objects){var me=this;$ARR.forEach($ARR.ensureArray(objects),function(object){Array.prototype.push.apply(actions,me.getRemoveDropZoneUnitActions(me.getZoneModelByName(zoneName),object));});},getDropZoneObjectsByName:function getDropZoneObjectsByName(zoneName){return this.getDropZoneObjectsByIndex(getCustomDropZoneIndexByName.call(this,zoneName));},isMetric:function isMetric(object){return object&&object.t===4;},isSameObject:function isSameObject(obj1,obj2){return obj1&&obj2&&(obj1.did||obj1.oid||obj1.id)===(obj2.did||obj2.oid||obj2.id);},isReplacing:function isReplacing(edge){return edge===ENUM_TARGET_POSITION.ON;},isObjectInZone:function isObjectInZone(object,zoneName){var me=this;return $ARR.filter(me.getDropZoneObjectsByName(zoneName),function(dzItem){return me.isSameObject(dzItem,object);}).length>0;},isZoneEmpty:function isZoneEmpty(zoneName){return(this.getDropZoneObjectsByName(zoneName)||[]).length===0;},getZoneModelByName:function getZoneModelByName(zoneName){return this.getZoneModelByZoneId(ENUM_DROP_ZONES[DROP_ZONE_MAP[getCustomDropZoneIndexByName.call(this,zoneName)]]);},getAvatarIconClass:function getAvatarIconClass(){return"viXtab";},getDropZoneName:function getDropZoneName(zone){return zone&&zone.n;},transitionObjectsToZone:function transitionObjectsToZone(zoneName,objects){var dropZoneTransitions=this._dropZoneTransitions,zoneIndex=getCustomDropZoneIndexByName.call(this,zoneName);if(dropZoneTransitions&&zoneIndex!==-1&&objects){$ARR.ensureArray(objects).forEach(function(object){dropZoneTransitions.push({obj:object,toZoneId:ENUM_DROP_ZONES[DROP_ZONE_MAP[zoneIndex]]});});}},customDropZonesTransition:function customDropZonesTransition(attributes,metrics){var me=this,customDropZones=this.getCustomDropZones()||[];customDropZones.forEach(function(zone){calculateObjectTransition.call(me,zone,attributes,ENUM_ALLOW_METRIC);calculateObjectTransition.call(me,zone,metrics,ENUM_ALLOW_ATTRIBUTE);});}});mstrmojo.vi.models.CustomVisDropZones.ENUM_ALLOW_DROP_TYPE={ATTRIBUTE_AND_METRIC:ENUM_ALLOW_ATTRIBUTE_AND_METRIC,ATTRIBUTE:ENUM_ALLOW_ATTRIBUTE,METRIC:ENUM_ALLOW_METRIC,ATTRIBUTE_OR_METRIC:ENUM_ALLOW_ATTRIBUTE_OR_METRIC};}());