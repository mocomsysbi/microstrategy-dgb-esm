(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.hash");mstrmojo.requiresDescs(889);var $H=mstrmojo.hash;var WAIT_MSG=mstrmojo.desc(889,"Please wait...");function submitServerRequest(callback,params){var showWait=params.showWait,suppressErrorMsg=params.suppressError,waitMsg=params.waitMsg;delete params.showWait;delete params.suppressError;delete params.waitMsg;mstrApp.serverRequest(params,callback,showWait,suppressErrorMsg,waitMsg);}mstrmojo.qb.mdx.DataService=mstrmojo.provide("mstrmojo.qb.mdx.DataService",{submitRequest:function submitRequest(callback,params){submitServerRequest.call(this,callback,params);},pollingStatus:function pollingStatus(callback,result,message){var me=this;if(mstrApp.isSingleTier){if(callback.success){callback.success(result);}return ;}submitServerRequest.call(me,{success:function success(res){if(res.status==="1"){if(callback.success){callback.success(result);}}else{me.pollingStatus(callback,result,message);}},failure:function failure(res){if(callback.failure){callback.failure(res);}}},{taskId:"pollStatus",resultSetType:3,pollingFrequency:500,maxWait:60000,taskEnv:"xhr",taskContentType:"json",showWait:true,waitMsg:message});},addCubes:function addCubes(callback,params){var me=this;submitServerRequest.call(this,{success:function success(res){mstrApp.msgid=res.msgid;me.pollingStatus(callback,res,WAIT_MSG);}},$H.copy(params,{taskId:"qBuilder.AddMDXCubes",showWait:true,waitMsg:WAIT_MSG}));},updateCubes:function updateCubes(callback,params){var me=this;submitServerRequest.call(this,{success:function success(res){mstrApp.msgid=res.msgid;me.pollingStatus(callback,res,WAIT_MSG);}},$H.copy(params,{taskId:"qBuilder.UpdateMDXCubes",showWait:true,waitMsg:WAIT_MSG}));},setDBRole:function setDBRole(callback,params){var me=this;submitServerRequest.call(this,{success:function success(res){mstrApp.msgid=res.msgid;me.pollingStatus(callback,res,WAIT_MSG);}},$H.copy(params,{taskId:"qBuilder.SetDBRole",showWait:true,waitMsg:WAIT_MSG}));},search:function search(callback,params){submitServerRequest.call(this,callback,$H.copy(params,{taskId:"arch.search",showWait:true}));},searchFolderContents:function searchFolderContents(callback,params){submitServerRequest.call(this,callback,$H.copy(params,{taskId:"searchMetadata",styleName:"MojoFolderStyle",includeAncestorInfo:false,includeObjectDesc:false,fields:"name",recursive:0}),{showProgress:true,showProgressText:true,progressText:WAIT_MSG});},createEmmaTable:function createEmmaTable(callback,params){var me=this;submitServerRequest.call(me,{success:function success(res){mstrApp.msgid=res.msgid;me.pollingStatus(callback,res,WAIT_MSG);}},$H.copy(params,{taskId:"DICreateEMMASourceTable",showWait:true,waitMsg:WAIT_MSG}));},createEmmaInstance:function createEmmaInstance(callback,params){var me=this;submitServerRequest.call(me,{success:function success(res){mstrApp.msgid=res.msgid;me.pollingStatus(callback,res,WAIT_MSG);}},$H.copy(params,{taskId:"DICreateEMMAReportInstance",showWait:true,waitMsg:WAIT_MSG}));},getObjectFolder:function getObjectFolder(callback,params){submitServerRequest.call(this,callback,$H.copy(params,{taskId:"DIGetObjectFolder",showWait:true,waitMsg:WAIT_MSG}));},getObjectInfo:function getObjectInfo(callback,params){submitServerRequest.call(this,callback,$H.copy(params,{taskId:"getObjectInfo"}),{showProgress:true,showProgressText:true,progressText:WAIT_MSG});}});}());