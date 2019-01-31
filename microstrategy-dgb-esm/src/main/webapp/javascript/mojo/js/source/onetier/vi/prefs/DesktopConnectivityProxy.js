(function(){mstrmojo.requiresCls("mstrmojo.onetier.vi.prefs.DesktopConnectivityProxyBase","mstrmojo.hash");var $HASH=mstrmojo.hash;mstrmojo.onetier.vi.prefs.DesktopConnectivityProxy=mstrmojo.declare(mstrmojo.onetier.vi.prefs.DesktopConnectivityProxyBase,null,{scriptClass:"mstrmojo.onetier.vi.prefs.DesktopConnectivityProxy",showPreferencesEditor:function showPreferencesEditor(params){window.FormWrapper.showPreferencesEditor(JSON.stringify(params));},savePreferences:function savePreferences(preferences){mstrApp.serverRequest({taskId:"updatePreference",value:preferences});},getSavedPreferences:function getSavedPreferences(callback){mstrApp.serverRequest({taskId:"getPreferences"},callback);},deleteServerConnections:function deleteServerConnections(deletedConnections){mstrApp.serverRequest({taskId:"deleteServerConnections",value:deletedConnections});},testServerConnection:function testServerConnection(params,callback){mstrApp.serverRequest($HASH.copy(params,{taskId:"testServerConnection"}),callback);},cancelRequest:function cancelRequest(id,callback){mstrApp.serverRequest({taskId:"cancelRequest",id:id},callback,{});},loginToWebserver:function loginToWebserver(wsn,username,password,callback){mstrApp.serverRequest({taskId:"loginToWebserver",wsn:wsn,username:username,password:password},callback,{doNotHold:true});},loginToProxy:function loginToProxy(proxyUrl,username,password,saveToPrefs,callback){mstrApp.serverRequest({taskId:"loginToProxy",proxyUrl:proxyUrl,username:username,password:password,saveToPrefs:saveToPrefs},callback,{doNotHold:true});},authenticationCancelled:function authenticationCancelled(){var params={taskId:"authenticationCancelled"};if(mstrApp.recoveryIndex!=undefined){params.recoveryIndex=mstrApp.recoveryIndex;}mstrApp.serverRequest(params,null,{doNotHold:true});mstrApp.recoveryIndex=undefined;},resumeDashboardExecution:function resumeDashboardExecution(config){var callback=config&&config.callback;if(callback){delete config.callback;}var params=$HASH.copy(config,{taskId:"resumeDashboardExecution"}),callback=$HASH.copy(callback,{success:function success(res){if(res&&res.statusOnly!==true){mstrApp.start(res);}},failure:function failure(){if(mstrApp.hideWait){mstrApp.hideWait();}}});if(mstrApp.recoveryIndex!=undefined){params.recoveryIndex=mstrApp.recoveryIndex;}mstrApp.serverRequest(params,callback,{doNotHold:true});mstrApp.recoveryIndex=undefined;},checkForDesktopUpdates:function getForDesktopUpdates(){window.FormWrapper.runCheckUpdate();},showProxyEditor:function showProxyEditor(){window.FormWrapper.showProxyEditor();},getProjects:function getProjects(params,callback){mstrApp.serverRequest($HASH.copy(params,{taskId:"getProjectsInfo",dataFlag:2}),callback,{silent:true});},getSessionState:function getSessionState(connectionId,iServer,port,project,callback){mstrApp.serverRequest({taskId:"getSessionState",connectionId:connectionId,isLoginFirst:false,project:project,server:iServer,port:port},callback);},getLoginFirstSessionState:function getLoginFirstSessionState(connectionId,callback){var params={taskId:"getSessionState",connectionId:connectionId,isLoginFirst:true};mstrApp.serverRequest(params,callback);},login:function login(params,callback){mstrApp.serverRequest($HASH.copy(params,{taskId:"login"}),callback,{silent:true,doNotHold:true});},usherLoginWeb:function usherLogin(params,callback){mstrApp.serverRequest($HASH.copy(params,{taskId:"usherLoginWeb"}),callback,{silent:true,doNotHold:true});},loginFirst:function login(params,callback){mstrApp.serverRequest($HASH.copy(params,{taskId:"loginFirst"}),callback,{silent:true,doNotHold:true});},saveToServer:function saveToServer(params,callback){mstrApp.serverRequest($HASH.copy(params,{taskId:"desktopImportSaveDashboard"}),callback,{silent:true});},loadCube:function loadCube(params,callback){mstrApp.serverRequest($HASH.copy(params,{taskId:"loadCube",keepPolling:"true",maxWait:500}),callback,{silent:true});},getCubeInfo:function getCubeInfo(params,callback){mstrApp.serverRequest($HASH.copy(params,{taskId:"checkCube"}),callback,{silent:true});},openFromServer:function openFromServer(params,callback){mstrApp.serverRequest($HASH.copy(params,{taskId:"exportDocument",executionMode:18,keepPolling:"true",executeDefaultPromptOrFail:"true"}),callback,{silent:true});},getPollingStatus:function getPollingStatus(params,callback){mstrApp.serverRequest($HASH.copy(params,{taskId:"getPollingStatus"}),callback,{silent:true});},shutDownDesktop:function shutDownDesktop(callback,forceShutDown){mstrApp.serverRequest({taskId:"shutDownDesktop",force:!!forceShutDown},callback,{silent:true,doNotHold:true});},refreshNativeDialogMenu:function refreshNativeDialogMenu(){mstrApp.serverRequest({taskId:"refreshNativeDlgMenu"},{},{silent:true});},sendWebServerRequest:function sendWebServerRequest(params,callback,extras){mstrApp.serverRequest(params,callback,extras);},saveToPublicCloud:function saveToPublicCloud(sessionState,callback){mstrApp.serverRequest({taskId:"desktopPublishPublicDashboard",sessionState:sessionState},callback);},logout:function logout(params,callback){mstrApp.serverRequest($HASH.copy(params,{taskId:"logout"}),callback);},getPublicCloudSession:function getPublicCloudSession(params,callback){mstrApp.serverRequest($HASH.copy(params,{taskId:"publicCloudLogin"}),callback,{silent:true});},getObjectInfo:function getObjectInfo(params,callback){mstrApp.serverRequest($HASH.copy(params,{taskId:"getObjectInfo"}),callback,{silent:true});},getUserServices:function getUserServices(params,callback){mstrApp.serverRequest($HASH.copy(params,{taskId:"getUserServices"}),callback,{silent:true});},saveObjectACL:function saveObjectACL(params,callback){mstrApp.serverRequest($HASH.copy(params,{taskId:"saveObjectACL"}),callback,{silent:true});},getUserEntityInfo:function getUserEntityInfo(params,callback){mstrApp.serverRequest($HASH.copy(params,{taskId:"getUserEntityInfo"}),callback,{silent:true});},isCurrentProject:function isCurrentProject(currentProject,callback){mstrApp.serverRequest({taskId:"IsCurrentProj",pn:currentProject.project.name,sn:currentProject.iServer.name,isp:currentProject.iServer.port},{success:function(res){callback.success(!!res.ic);},failure:function(res){mstrmojo.error({longDesc:"Failure on IsCurrentProj task "+JSON.stringify(res||{})},undefined,{zIndex:100000});}},{silent:true});},getCleanDocModel:function getCleanDocModel(callback){mstrApp.serverRequest({taskId:"createDocInstance"},$HASH.copy({failure:function(res){mstrmojo.error({longDesc:"Failure on createDocInstance task "+JSON.stringify(res||{})},undefined,{zIndex:100000});}},callback),{silent:true});}});}());