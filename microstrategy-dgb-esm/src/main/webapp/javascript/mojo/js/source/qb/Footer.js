(function(){mstrmojo.requiresCls("mstrmojo.Box","mstrmojo.hash","mstrmojo.Button","mstrmojo.MenuButton");mstrmojo.requiresDescs(212,2140);var CSS_CLASS_FBICON="mstrmojo-qb-footerIcon",CSS_CLASS_CANCEL="cancel",CSS_CLASS_SAVE="publish",CSS_CLASS_DISABLED="disabled",CSS_CLASS_NEW="new",CSS_SEP=" ";function createFootbarButton(params){return mstrmojo.hash.copy(params,{scriptClass:"mstrmojo.Button",onclick:function onclick(){if(this.cmd){mstrApp.getRootController()[this.cmd]();}}});}mstrmojo.qb.Footer=mstrmojo.declare(mstrmojo.Box,null,{hidePublish:function h(){this.publish.set("visible",false);},children:[createFootbarButton({cmd:"publish",enabled:false,text:mstrmojo.desc(212,"Continue"),alias:"publish",postBuildRendering:function postBuildRendering(){mstrApp.getRootController().attachEventListener("allowSave",this.id,function(evt){this.set("enabled",evt.value);});}}),createFootbarButton({cmd:"cancel",iconClass:[CSS_CLASS_FBICON,CSS_CLASS_CANCEL].join(CSS_SEP),text:mstrmojo.desc(2140,"Cancel")})],addChildren:function addChildren(c,idx,silent){var firstChild=c[0];if(firstChild.alias==="publish"){firstChild.iconClass=[CSS_CLASS_FBICON,CSS_CLASS_SAVE,(mstrApp.reportID?"":CSS_CLASS_NEW),CSS_CLASS_DISABLED].join(CSS_SEP);}this._super(c,idx,silent);}});}());