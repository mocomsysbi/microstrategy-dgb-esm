(function(){mstrmojo.requiresCls("mstrmojo.ServerProxy");mstrmojo.DI.WorkstationServerProxy=mstrmojo.declare(mstrmojo.ServerProxy,null,{workstationEnv:null,createRequest:function(requestId,callback,params,config){return this._super(requestId,callback,params,config);},serverRequestParallel:function(params,callback,XhrQueue){var _params=mstrmojo.hash.copy(params);_params.taskContentType=_params.taskContentType||"json";_params.taskEnv=_params.taskEnv||"xhr";this.request(callback,params,false,{});},upload:function(callback,params,data,config,override,webSrvParams,useCache){if(data===null){this.request(callback,params,data,config);}else{var reader=new FileReader();var _self=this;var unloader=function(){reader.onload=null;};if(!this.fileReaderUnloader){this.fileReaderUnloader={};}this.fileReaderUnloader[params.tableID]=unloader;reader.onload=function(event){params.myFile=event.target.result.split("base64,")[1];_self.request(callback,params,data,config);};reader.readAsDataURL(data);}},cancelFileReader:function(tableID){var fileReaderUnloader=this.fileReaderUnloader||{};var unloader=fileReaderUnloader[tableID];if(unloader){unloader();}}});}());