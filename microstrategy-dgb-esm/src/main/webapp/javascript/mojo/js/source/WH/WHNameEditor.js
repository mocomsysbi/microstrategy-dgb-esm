(function(){mstrmojo.requiresCls("mstrmojo.Editor");mstrmojo.WH.WHNameEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.WH.WHNameEditor",cssText:"width:350px;",cssClass:"rrEditor mstrmojo-WHNameEditor",help:mstrApp.helpTopics&&mstrApp.helpTopics.DBRole,children:[{scriptClass:"mstrmojo.Label",alias:"name",cssText:"width:100%; margin-left:5px;margin-top:10px;",text:"Please Enter Name:"},{scriptClass:"mstrmojo.TextBox",alias:"txtbox",cssText:"margin-top:10px;margin-left:5px;margin-right:5px;width:94%;",onvalueChange:function(evt){this.text=mstrmojo.string.encodeHtmlString(evt.value);},onkeyup:function(evt){switch(evt.e.keyCode){case 13:var ret=true;if(this.parent.onOK){this.parent.onOK();}break;case 27:this.parent.close();break;default:break;}}},{scriptClass:"mstrmojo.Label",cssText:"width:100%; padding: 5px;",alias:"error",text:""},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Editor-buttonBox",slot:"buttonNode",children:[{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button rightfloat mstrmojo-Editor-button-OK",text:mstrApp.isCloudPro?"":mstrmojo.desc(1442,"OK"),onclick:function(evt){var e=this.parent.parent;var ret=true;if(e.onOK){e.onOK();}}},{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button mstrmojo-Editor-button-Cancel",text:mstrApp.isCloudPro?"":mstrmojo.desc(221,"Cancel"),cssText:"margin-right:10px",onclick:function(evt){var e=this.parent.parent;if(e.onCancel){e.onCancel();}e.close();}}]}]});})();