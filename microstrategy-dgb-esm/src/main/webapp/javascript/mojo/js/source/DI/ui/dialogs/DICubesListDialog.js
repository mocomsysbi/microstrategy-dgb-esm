(function(){mstrmojo.requiresCls("mstrmojo.Editor","mstrmojo.DI.DICubesList");mstrmojo.requiresDescs(13058,13240,14192);mstrmojo.DI.ui.dialogs.DICubesListDialog=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.DI.ui.dialogs.DICubesListDialog",title:mstrmojo.desc(13058,"Data Storage"),showTitle:true,cssClass:"mstrmojo-di-diCubesListDialog",_evt:null,help:"Data_Storage_page.htm",children:[{scriptClass:"mstrmojo.DI.DICubesList",alias:"cubes"}],buttons:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-button mstrmojo-WebButton hot",text:mstrmojo.desc(2102,"Close"),onclick:function(){this.parent.parent.close();}}],onOpen:function onOpen(){var model=mstrApp.getRootController().getModel();this._evt=model.attachEventListener("cubesFinishPublishing",this.id,this.close);if(mstrApp.diParams.userName!==undefined&&!mstrApp.refreshMultipleCubes){this.set("title",mstrmojo.desc(13240,"###'s Data Storage").replace("###",mstrApp.diParams.userName));}if(mstrApp.refreshMultipleCubes){this.set("title",mstrmojo.desc(15829,"Republish Datasets"));}this.cubes.set("visible",true);this.cubes.update();if(this._super){this._super();}},onClose:function(){if(this._evt){var model=mstrApp.getRootController().getModel();model.detachEventListener(this._evt);}if(mstrApp.refreshMultipleCubes){mstrApp.getRootController().exitApplicationRefreshMultipleCubes();}}});}());