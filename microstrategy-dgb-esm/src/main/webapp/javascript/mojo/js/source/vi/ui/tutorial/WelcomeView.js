(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.Button","mstrmojo._HasLayout","mstrmojo.vi.ui.tutorial.WelcomeContent","mstrmojo.css");var $CSS=mstrmojo.css;mstrmojo.vi.ui.tutorial.WelcomeView=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout],{scriptClass:"mstrmojo.vi.ui.tutorial.WelcomeView",markupString:'<div id="{@id}" class="mstrmojo-vi-welcome {@cssClass}"><div class="vi-wel-content"></div><div class="vi-wel-footer"><label mstrAttach:click>'+mstrmojo.desc(13407,"Don't show this again")+"</label><div></div></div></div>",markupSlots:{contentNode:function(){return this.domNode.firstChild;},footerNode:function(){return this.domNode.childNodes[1];},footerCustomNode:function(){return this.domNode.childNodes[1].childNodes[1];}},markupMethods:{onheightChange:mstrmojo.Widget.heightMarkupMethod,onwidthChange:mstrmojo.Widget.widthMarkupMethod,onshowAtStartupChange:function(){$CSS.toggleClass(this.footerNode,"selected",!this.showAtStartup);},onhasSamplesChange:function(){$CSS.toggleClass(this.domNode,"no-samples",!this.hasSamples);}},layoutConfig:{h:{contentNode:"100%",footerNode:"57px"},w:{contentNode:"100%",footerNode:"all"},xt:true},showAtStartup:true,hasSamples:false,welcomeContent:undefined,samplesData:undefined,init:function(props){var userPreference=mstrApp.getShowVIWelcome();this._super(props);this.addCustomFooter();if(userPreference===2){this.set("showAtStartup",false);}else{this.showAtStartup=!!userPreference;}},onclick:function onclick(){this.set("showAtStartup",!this.showAtStartup);},children:[{scriptClass:"mstrmojo.vi.ui.tutorial.WelcomeContent",slot:"contentNode",alias:"welcomeContent"}],addCustomFooter:function(){this.addChildren(mstrmojo.Button.newWebButton(mstrmojo.desc(2102,"Close"),function(){this.parent.parent.close();},false,{cssClass:"vi-footer-close",slot:"footerCustomNode"}));},onshowAtStartupChange:function onshowAtStartupChange(){mstrApp.serverRequest({taskId:"setPreference",prefs:"showVIWelcome\u001E"+(this.showAtStartup?"1":"0")},{success:mstrmojo.emptyFn,failure:function(res){mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));}});}});}());