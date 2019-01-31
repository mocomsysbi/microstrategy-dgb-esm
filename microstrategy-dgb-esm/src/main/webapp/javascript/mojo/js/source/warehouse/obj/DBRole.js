(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.warehouse.dbroles.DBRoleHelper","mstrmojo.warehouse.obj.TableData");mstrmojo.requiresDescs(4572,11138,3651);var $A=mstrmojo.array,$DBHLP=mstrmojo.warehouse.dbroles.DBRoleHelper,hiddenPwd="PWDHIDDEN123!@#",STR_PRIMARY=mstrmojo.desc(4572,"Primary"),ENUM_OT_DBROLE=mstrmojo.warehouse.EnumObjectTypes.DBROLE;mstrmojo.warehouse.obj.DBRole=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.warehouse.obj.DBRole",init:function init(props){var dbRole=this,dbr=(props&&props.mdDBRole);if(dbr){dbRole.mdDBRole=dbr;dbRole.n=dbr.n.toString();dbRole.did=dbr.did;dbRole.des=(!(dbr.des&&mstrApp.rootController.isCloud())?dbr.n:dbr.des||"").toString();dbRole.data=new mstrmojo.warehouse.obj.TableData({id:dbr.did,n:dbr.n,tp:dbr.stp,model:props.mdl});}else{dbRole.mdDBRole={n:$DBHLP.getUniqueName(mstrmojo.desc(11138,"new data source #").replace("#","")),did:"",tp:29,stp:7424,writable:"1",vldbProperties:{}};dbRole.n=dbRole.mdDBRole.n;dbRole.did=dbRole.mdDBRole.did;dbRole.data=new mstrmojo.warehouse.obj.TableData({id:dbRole.mdDBRole.did,n:dbRole.mdDBRole.n,tp:dbRole.mdDBRole.stp,model:props.mdl});var prefs=mstrApp.rootController.getDBObjects().preferences;if(prefs&&prefs.vldbProperties){$A.forEach(prefs.vldbProperties,function(vldbProp){dbRole.mdDBRole.vldbProperties[vldbProp.propset]={};});}dbRole.populated=true;}dbRole.isManagedDBR=props&&props.isManagedDBR;dbRole.data.isPrimary=dbRole.isPrimary();},dbmsCatalogCacheMode:undefined,mdDBRole:{},n:"",did:"",tp:ENUM_OT_DBROLE,supportsNameSpaces:false,avoidColumnCaching:false,displayName:function displayName(){return this.n+(this.isPrimary()?" ("+STR_PRIMARY+")":"");},isPrimary:function isPrimary(){return(this.did===mstrApp.getRootController().getProjectPrimaryDBRoleID());},data:undefined,populated:false,isManagedDBR:false,populate:function populate(callback){var $this=this;if(this.populated){callback($this);}else{mstrApp.getRootController().populateDBRole(this.mdDBRole.did,{success:function(res){$this.populated=true;$this.mdDBRole=res.dbrs[0];if(typeof $this.mdDBRole.vldbProperties==="string"){$this.mdDBRole.vldbProperties=JSON.parse($this.mdDBRole.vldbProperties);}$this.n=$this.mdDBRole.n.toString();$this.did=$this.mdDBRole.did;var dbmsCatMode=parseInt($this.mdDBRole.dbmsCatalogCacheMode,10);$this.supportsNameSpaces=((dbmsCatMode&1)===1);$this.avoidColumnCaching=((dbmsCatMode&2)===2||(dbmsCatMode&4)===4);callback($this);}});}},rename:function rename(newName){var rootController=mstrApp.rootController;this.mdDBRole.n=newName;if(rootController.isCloud()){this.des=newName;this.n=this.des+"___"+new Date().getTime();}else{this.n=newName;}if(this.did!==""){this.mdDBRole.connstr=$DBHLP.cleanDSNConnection(this.mdDBRole.connstr);rootController.saveDBRole(this,false,{success:function(){}});}},duplicate:function duplicate(){var rootController=mstrApp.rootController,newDBRole=new mstrmojo.warehouse.obj.DBRole({mdDBRole:this.mdDBRole,mdl:this.data.model}),pattern=mstrApp.isSingleTier?"copy of ##":mstrmojo.desc(3651,"copy of ##"),newName=$DBHLP.getUniqueName(pattern.replace("##",rootController.isCloud()?this.des:this.n));newDBRole.did="";newDBRole.mdDBRole.did="";newDBRole.rename(newName);newDBRole.mdDBRole.connstr=$DBHLP.cleanDSNConnection(newDBRole.mdDBRole.connstr);newDBRole.mdDBRole.originalID=this.did;if(newDBRole.mdDBRole.password===hiddenPwd){delete newDBRole.mdDBRole.password;}rootController.saveDBRole(newDBRole,true,{success:function(){}});}});}());