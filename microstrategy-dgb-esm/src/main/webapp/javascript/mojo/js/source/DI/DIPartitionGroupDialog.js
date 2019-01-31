(function(){mstrmojo.requiresCls("mstrmojo.Editor","mstrmojo.Box","mstrmojo.ui.CheckListWithDesc","mstrmojo.hash","mstrmojo.ui._HasScroller");mstrmojo.requiresDescs(212,221,1442,1911,12389,12999,15035,15036,15324,15325,15326,16055,16056);var $ARR=mstrmojo.array,$H=mstrmojo.hash,$DESC=mstrmojo.desc;mstrmojo.DI.DIPartitionGroupDialog=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.DI.DIPartitionGroupDialog",cssClass:"mstrmojo-di-partitiongroup-dialog",title:mstrmojo.desc(16055,"Group Tables"),groups:null,callback:null,zIndex:1000,isEditMode:false,onOpen:function onOpen(){var groups=this.groups,items=[];$ARR.forEach(groups,function(group,index){items.push({n:$DESC(1911,"Group"),desc:group.tableNames.join("\n"),index:index,});});this.contentBox.content.set("items",items);this.contentBox.content.set("multiSelect",!this.isEditMode);if(!this.isEditMode){this.contentBox.content.set("selectedIndices",$ARR.map(items,function(i){return i.index;}));}},onPreClose:function onPreClose(){this.onCancel();return true;},onCancel:function onCancel(){var callback=this.callback;if(callback&&callback.onCancel){callback.onCancel();}},children:[{scriptClass:"mstrmojo.Label",alias:"webTitle2",cssClass:"webTitle2",text:$DESC(16056,"The grouped tables have the same set of objects, please select the tables you want to group.")},{scriptClass:"mstrmojo.Box",cssClass:"partition-items",alias:"contentBox",children:[{scriptClass:"mstrmojo.ui.CheckListWithDesc",alias:"content",orientation:"v",}]}],buttons:[{scriptClass:"mstrmojo.Button",alias:"okButton",cssClass:"mstrmojo-di-button mstrmojo-WebButton hot",text:$DESC(212,"Continue"),bindings:{enabled:function(){if(!this.parent.parent.isEditMode){return true;}var indices=this.parent.parent.contentBox.content.selectedIndices;if(indices&&Object.keys(indices).length>0){return true;}return false;}},onclick:function onclick(){var dialog=this.parent.parent,selectedIndices,tablesLeftByPartition,tidsToDelete=[];selectedIndices=dialog.contentBox.content.selectedIndices;for(var i=dialog.groups.length-1;i>=0;i--){if(!selectedIndices[i]){tablesLeftByPartition=dialog.groups.splice(i,1);tidsToDelete=tidsToDelete.concat(tablesLeftByPartition[0].tableIds);}}if(dialog.groups.length>0){if(dialog.isEditMode){var tids=tidsToDelete.join(","),model=mstrApp.getRootController().model,callback;callback={success:function(){mstrApp.getRootController().partitionController.setPartition(model.editingTableId,dialog.groups[0].tableIds,dialog.callback);},failure:function(){dialog.callback.onCancel();}};mstrApp.getRootController().dataService.removeEMMASourceTable(callback,{did:tids});}else{mstrApp.getRootController().partitionController.addMultiPartitions(dialog.groups,dialog.callback);}}else{if(dialog.callback&&dialog.callback.onCancel){dialog.callback.onCancel();}}dialog.close();}}]});}());