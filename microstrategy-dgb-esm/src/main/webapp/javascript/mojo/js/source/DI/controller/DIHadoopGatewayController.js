(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.DI.DIModel","mstrmojo.DI.DIConstants");mstrmojo.requiresDescs(14959,14960,1162,9935,14968,14969,14970,14971,14972,14973,14974,14975,14976,14977,14978,14979,14980,14981,14982,14983,14984,14985,14986,14987,14988,14989,14990,14991,14992,14993,14994,14995,14996,14997,14998,1149,14999);var constants=mstrmojo.DI.DIConstants;var errorMessage={HGoS_CONFIG_HAS_EXIT:{TITLE:mstrmojo.desc(14968,"Configuration Conflict"),MSG:mstrmojo.desc(14969,"Please specfiy gateway propertoes"),DETAIL:mstrmojo.desc(14970,"Hadoop gateway with same host name and port number already exists;")+"\n"+mstrmojo.desc(14971,"please modify the gateway definition.")},CONNOT_AUTHENTICATE:{TITLE:mstrmojo.desc(14972,"Gateway Authentication Error"),MSG:mstrmojo.desc(14973,"You may solve this problem by checking followings:"),DETAIL:mstrmojo.desc(14974,"1. Username or password is not correct.")+"\n"+mstrmojo.desc(14975,"2. Gateway host is down.")+"\n"+mstrmojo.desc(14976,"3. Network problem (Gateway host is unreachable, firewall blocking, etc.).")+"\n"+mstrmojo.desc(14977,"4. Connection time out.")},SPACE_OVER:{TITLE:mstrmojo.desc(14978,"Failed to deploy Hadoop Gateway"),MSG:mstrmojo.desc(14979,"Insufficient disk space to deploy Hadoop Gateway. Minimum required disk space is 200M.")},FAIL_COPY_TO_HOST:{TITLE:mstrmojo.desc(14978,"Failed to deploy Hadoop Gateway"),MSG:mstrmojo.desc(14980,"Unable to copy application files to host. It may be caused by:"),DETAIL:mstrmojo.desc(14981,"1. Insufficient permissions")+"\n"+mstrmojo.desc(14982,"2. Gateway host being down")+"\n"+mstrmojo.desc(14983,"3. Network problem (Gateway host is unreachable, firewall blocking, etc.)")+"\n"+mstrmojo.desc(14984,"4. Connection time out")},INSUFFICIENT:{TITLE:mstrmojo.desc(14978,"Failed to deploy Hadoop Gateway"),MSG:mstrmojo.desc(14985,"Insufficient disk space on host. Minimum required disk space is 200M.")},DIRECTORY_NO_EXIST:{TITLE:mstrmojo.desc(14978,"Failed to deploy Hadoop Gateway"),MSG:mstrmojo.desc(14997,"Folder '####' does not exist. This may be caused by insufficient permission to create the folder.")},HGOS_DEPLOYED:{TITLE:mstrmojo.desc(14978,"Failed to deploy Hadoop Gateway"),MSG:mstrmojo.desc(14986,"Hadoop Gateway has been already deployed.")},HGOS_DEPLOYING:{TITLE:mstrmojo.desc(14978,"Failed to deploy Hadoop Gateway"),MSG:mstrmojo.desc(14987,"Hadoop Gateway is being deployed. Please wait the operation complete.")},CONNOT_AUTHENTICATE2:{TITLE:mstrmojo.desc(14972,"Gateway Authentication Error"),MSG:mstrmojo.desc(14973,"You may solve this problem by checking followings:"),DETAIL:mstrmojo.desc(14974,"1. Username or password is not correct")+"\n"+mstrmojo.desc(14975,"2. Gateway host is down")+"\n"+mstrmojo.desc(14976,"3. Network problem (Gateway host is unreachable, firewall blocking, etc)")+"\n"+mstrmojo.desc(14977,"4. Connection time out")},HGOS_RUNNING:{TITLE:mstrmojo.desc(14988,"Failed to start Hadoop Gateway"),MSG:mstrmojo.desc(14989,"Hadoop Gateway is already running.")},HGOS_STOPPED:{TITLE:mstrmojo.desc(14990,"Failed to stop Hadoop Gateway"),MSG:mstrmojo.desc(14991,"Hadoop Gateway has already stopped.")},HGOS_NOT_DEPLOYING:{TITLE:mstrmojo.desc(14992,"Failed to start/stop Hadoop Gateway"),MSG:mstrmojo.desc(14993,"Failed to start/ stop Hadoop Gateway. This may be due to Hadoop Gateway not being deployed, or been removed.")},HGOST_TAR_NOT_EXIST:{TITLE:mstrmojo.desc(14978,"Failed to deploy Hadoop Gateway"),MSG:mstrmojo.desc(14994,"Unable to copy tar file to host. Please make sure that the tar file exists under the folder:")+"\n"+mstrmojo.desc(14999,"[MicroStrategy Install Path]/IntelligenceServer/hgos-manager.")},HGOS_CONF_NOT_EXIST:{TITLE:mstrmojo.desc(14978,"Failed to deploy Hadoop Gateway"),MSG:mstrmojo.desc(14995,"Hadoop Gateway configuration file is not found.")},DEFAULT:{TITLE:mstrmojo.desc(14996,"Operation failed"),MSG:mstrmojo.desc(15617,"Unknown error.")}};function enCode(str){return encodeURI(str);}mstrmojo.DI.controller.DIHadoopGatewayController=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.DI.controller.DIHadoopGatewayController",submitActions:function(actions,callback,cfg){var controller=this.rootController||mstrApp.getRootController(),ds=controller.dataService;var $this=this;var HGCallBack={actions:actions,success:function(res,request){if(res&&(typeof (res[0].success)!=="undefined")&&res[0].success===true){callback.success(res);}else{if(res&&(typeof (res[0].success)!=="undefined")&&res[0].success===false){$this.popUpErrorWin4HGW(res[0],JSON.parse(request.params.json));callback.success(res);}else{controller.displayError(mstrmojo.desc(null,"IServer returns a invalid result"),false,"");}}},failure:function(res){controller.displayError(mstrmojo.desc(null,"Failed to connect to webServer"),false,"");callback.failure(res);}};ds.DIManageHadoopGateway(HGCallBack,{json:JSON.stringify(actions)},cfg);},popUpErrorWin4HGW:function(res,params){var dirootCtrl=mstrApp.diRootCtrl,code=res.code||null,title,msg,detial;switch(code){case constants.hadoopGateWay.HGoS_CONFIG_HAS_EXIT:title=errorMessage.HGoS_CONFIG_HAS_EXIT.TITLE,msg=errorMessage.HGoS_CONFIG_HAS_EXIT.MSG,detial=errorMessage.HGoS_CONFIG_HAS_EXIT.DETAIL;break;case constants.hadoopGateWay.CONNOT_AUTHENTICATE:title=errorMessage.CONNOT_AUTHENTICATE.TITLE,msg=errorMessage.CONNOT_AUTHENTICATE.MSG,detial=errorMessage.CONNOT_AUTHENTICATE.DETAIL;break;case constants.hadoopGateWay.SPACE_OVER:title=errorMessage.SPACE_OVER.TITLE,msg=errorMessage.SPACE_OVER.MSG;break;case constants.hadoopGateWay.FAIL_COPY_TO_HOST:title=errorMessage.FAIL_COPY_TO_HOST.TITLE,msg=errorMessage.FAIL_COPY_TO_HOST.MSG,detial=errorMessage.FAIL_COPY_TO_HOST.DETAIL;break;case constants.hadoopGateWay.INSUFFICIENT:title=errorMessage.INSUFFICIENT.TITLE,msg=errorMessage.INSUFFICIENT.MSG;break;case constants.hadoopGateWay.DIRECTORY_NO_EXIST:title=errorMessage.DIRECTORY_NO_EXIST.TITLE;msg=errorMessage.DIRECTORY_NO_EXIST.MSG.replace("####",params[0]["remoteDir"]);break;case constants.hadoopGateWay.HGOS_DEPLOYED:title=errorMessage.HGOS_DEPLOYED.TITLE,msg=errorMessage.HGOS_DEPLOYED.MSG;break;case constants.hadoopGateWay.HGOS_DEPLOYING:title=errorMessage.HGOS_DEPLOYING.TITLE,msg=errorMessage.HGOS_DEPLOYING.MSG;break;case constants.hadoopGateWay.CONNOT_AUTHENTICATE2:title=errorMessage.CONNOT_AUTHENTICATE2.TITLE,msg=errorMessage.CONNOT_AUTHENTICATE2.MSG,detial=errorMessage.CONNOT_AUTHENTICATE2.DETAIL;break;case constants.hadoopGateWay.HGOS_RUNNING:title=errorMessage.HGOS_RUNNING.TITLE,msg=errorMessage.HGOS_RUNNING.MSG;break;case constants.hadoopGateWay.HGOS_STOPPED:title=errorMessage.HGOS_STOPPED.TITLE,msg=errorMessage.HGOS_STOPPED.MSG;break;case constants.hadoopGateWay.HGOS_NOT_DEPLOYING:title=errorMessage.HGOS_NOT_DEPLOYING.TITLE,msg=errorMessage.HGOS_NOT_DEPLOYING.MSG;break;case constants.hadoopGateWay.HGOST_TAR_NOT_EXIST:title=errorMessage.HGOST_TAR_NOT_EXIST.TITLE,msg=errorMessage.HGOST_TAR_NOT_EXIST.MSG;break;case constants.hadoopGateWay.HGOS_CONF_NOT_EXIST:title=errorMessage.HGOS_CONF_NOT_EXIST.TITLE,msg=errorMessage.HGOS_CONF_NOT_EXIST.MSG;break;default:title=errorMessage.DEFAULT.TITLE,msg=errorMessage.DEFAULT.MSG,msg=mstrmojo.desc(1149,"Error Code")+" : "+code;break;}dirootCtrl.displayError(msg,false,detial,null,title);},createGateway:function(cfg,callback){var actions=[];if(cfg.sparkConfig===undefined){var sparkConfig={props:null};cfg.sparkConfig=sparkConfig;}if(cfg.sparkConfig.props["spark.master"]===undefined||cfg.sparkConfig.props["spark.master"].trim()===""){cfg.sparkConfig.props["spark.master"]="local[*]";}actions.push({path:"hgosmgr/conf/hgos/",method:"POST",body:cfg});this.submitActions(actions,callback);},updateSparkConfig:function(cfg,callback){var actions=[];if(cfg.sparkConfig===undefined){var sparkConfig={props:null};cfg.sparkConfig=sparkConfig;}if(cfg.sparkConfig.props["spark.master"]===undefined||cfg.sparkConfig.props["spark.master"].trim()===""){cfg.sparkConfig.props["spark.master"]="local[*]";}cfg.httpPort=4020;actions.push({path:"hgosmgr/deploy/update/hgosConf/"+enCode(cfg.name),method:"PUT",body:cfg.passwd});this.submitActions(actions,callback);},updateGateway:function(cfg,callback){var actions=[];if(cfg.sparkConfig===undefined){var sparkConfig={props:null};cfg.sparkConfig=sparkConfig;}cfg.httpPort=4020;actions.push({path:"hgosmgr/conf/hgos/"+enCode(cfg.name),method:"PUT",body:cfg});this.submitActions(actions,callback);},deleteGateway:function(cfg,callback){var actions=[];actions.push({path:"hgosmgr/conf/hgos/"+enCode(cfg.name),method:"DELETE",body:cfg});this.submitActions(actions,callback);},listGateways:function(callback,cfg){var actions=[];actions.push({path:"hgosmgr/status/hgos",method:"GET"});this.submitActions(actions,callback,cfg);},startGateway:function(cfg,callback){var actions=[];actions.push({path:"hgosmgr/launch/start/"+enCode(cfg.name),method:"POST",body:cfg.passwd});this.submitActions(actions,callback);},stopGateway:function(cfg,callback){var actions=[];actions.push({path:"hgosmgr/launch/stop/"+enCode(cfg.name),method:"POST",body:cfg.passwd});this.submitActions(actions,callback);},installGateway:function(cfg,callback){var actions=[];actions.push({path:"hgosmgr/deploy/install/"+enCode(cfg.name),method:"POST",remoteDir:cfg.remoteDir,body:cfg.passwd});this.submitActions(actions,callback);},uninstallGateway:function(cfg,callback){var actions=[];actions.push({path:"hgosmgr/deploy/uninstall/"+enCode(cfg.name),method:"POST",body:cfg.passwd});this.submitActions(actions,callback);},showGatewayListDialog:function(){var controller=this.rootController||mstrApp.getRootController();this.listGateways({success:function(res){controller.showDialog(constants.dialogType.hadoopGatewayManagerDialog,{controller:controller,items:res[0].entity});},failure:function(){controller.showDialog(constants.dialogType.hadoopGatewayManagerDialog,{controller:controller});}});},confirmAuthentication:function(okFn){var cfg,editor,user,password;cfg={scriptClass:"mstrmojo.Editor",cssClass:"mstrmojo-di-ui-dialogs-DIHadoopGatewayDialog-AuthenticationEditor",zIndex:10000,title:mstrmojo.desc(14959,"Gateway Authentication"),visible:true,check:function(){var enabled=user&&user.length&&password!==undefined;this.btnHbox.children[0].set("enabled",enabled);},children:[{scriptClass:"mstrmojo.Box",cssClass:"ctrl-box cf",children:[{scriptClass:"mstrmojo.Label",cssClass:"ctrl-label",text:mstrmojo.desc(14960,"Username:")},{scriptClass:"mstrmojo.TextBox",onvalueChange:function(){user=this.value;this.parent.parent.check();}}]},{scriptClass:"mstrmojo.Box",cssClass:"ctrl-box cf",children:[{scriptClass:"mstrmojo.Label",cssClass:"ctrl-label",text:mstrmojo.desc(1162,"Password:")},{scriptClass:"mstrmojo.TextBox",type:"password",onvalueChange:function(){password=this.value;this.parent.parent.check();}}]}],buttons:[mstrmojo.Button.newWebButton(mstrmojo.desc(9935,"Log In"),function(){okFn.call(this.parent.parent,user,password);},true,{enabled:false})]};editor=new mstrmojo.Editor(cfg);editor.render();}});}());