(function(){mstrmojo.requiresCls("mstrmojo.array");mstrmojo.CallbackList=mstrmojo.declare(null,null,{scriptClass:"mstrmojo.CallbackList",_calls:null,add:function add(callback){if(!callback){return ;}if(!this._calls){this._calls=[];}this._calls.push(callback);},remove:function remove(callback){if(this._calls){mstrmojo.array.removeItem(this._calls,callback);}},fire:function fire(){var arr=this._calls,args=arguments||[];for(var i=0,cnt=arr&&arr.length||0;i<cnt;i++){var cb=this._calls[i];cb.fire.apply(cb,args);}}});})();