(function(){mstrmojo._Fetchable=mstrmojo.provide("mstrmojo._Fetchable",{_mixinName:"mstrmojo._Fetchable",blockBegin:1,blockCount:-1,concat:false,items:null,size:function size(){var items=this.items;return(items&&items.length)||0;},next:function(callbacks){if(this.hasNext()){this.getItems(this.blockBegin+this.blockCount,callbacks);}},previous:function(callbacks){if(this.hasPrevious()){var bb=this.blockBegin-this.blockCount;bb=bb<0?0:bb;this.getItems(bb,callbacks);}},getItems:function(bb,callbacks,config){callbacks=callbacks||{};var me=this,fnEmpty=mstrmojo.emptyFn,fnSuccess=callbacks.success||fnEmpty,fnFail=callbacks.failure||fnEmpty,fnComplete=callbacks.complete||fnEmpty;this._retrieveItems(bb,{success:function(res){me.blockBegin=bb;me.blockCount=res.bc||30;me.set("items",(me.concat?(me.items||[]).concat(res.items||[]):(res.items||[])));if(res.totalSize){me.totalSize=res.totalSize;}fnSuccess(res);},failure:function(res){fnFail(res);},complete:function(res){fnComplete(res);}},config);},_retrieveItems:function(bb,callbacks,config){alert("Object which mixes in this mixin has not implemented this method - _retrieveItems().");},hasNext:function(){return(((this.concat?1:this.blockBegin)+((this.items&&this.items.length)||0))<((mstrApp.isAppStatePause&&mstrApp.isAppStatePause())?this.totalSize:(this.totalSize+1)));},hasPrevious:function(){return this.blockBegin>1;}});}());