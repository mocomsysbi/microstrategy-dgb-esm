(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo.TabContainer","mstrmojo.ScrollingTabStrip","mstrmojo.Doc","mstrmojo.CMS.CMSDataService");mstrmojo.CMS.DocViewer=mstrmojo.declare(mstrmojo.Widget,null,{scriptClass:"mstrmojo.DocViewer",markupString:'<div id="{@id}" class="mstrmojo-DocViewer {@cssClass}" style="{@cssText}"></div>',markupMethods:{onwidthChange:function(){if(!isNaN(parseInt(this.width))){this.domNode.style.width=this.width;}},onheightChange:function(){if(!isNaN(parseInt(this.height))){this.domNode.style.height=this.height;}},onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},onwidthChange:function(evt){var dv=this.docViewer;if(dv){dv.set("width",this.width);}},onheightChange:function(evt){var dv=this.docViewer;if(dv){dv.set("height",this.height);}},_set_docId:function(n,v){var was=this.docId,changed=(was!==v);this.docId=v;if(changed){this.refreshDoc();}return changed;},postBuildRendering:function(){if(this._super){this._super();}this.refreshDoc();},destroy:function(skipCleanup){if(this.docViewer){this.docViewer.destroy();this.docViewer=null;}this._super(skipCleanup);},getDocResult:function(params,callbacks){mstrmojo.CMS.CMSDataService.getRWResult(params,callbacks);},refreshDoc:function(){if(this.docViewer){this.docViewer.destroy();this.docViewer=null;}if(this.docId==null){return ;}var dn=this.domNode,w=dn.offsetWidth,h=dn.offsetHeight,ph=dn.appendChild(document.createElement("div")),docViewer=mstrmojo.insert({scriptClass:"mstrmojo.TabContainer",placeholder:ph,width:w+"px",height:h+"px",layoutConfig:{h:{top:"auto",stack:"100%"},w:{top:"100%",stack:"100%"}},children:[{scriptClass:"mstrmojo.ScrollingTabStrip",slot:"top",cssClass:"mstrmojo-layout-tabs",visible:false,bindings:{width:"this.parent.width"}},{scriptClass:"mstrmojo.Doc",alias:"doc",slot:"stack",builder:mstrmojo.DocBuilder}]});this.docViewer=docViewer;docViewer.render();var doc=docViewer.doc,success=function(res){doc.model=new mstrmojo.DocModel(res);doc.buildChildren();mstrmojo.css.removeClass(dn,"loading");},failure=function(res){mstrmojo.css.removeClass(dn,"loading");mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));},callbacks={success:success,failure:failure};mstrmojo.xhr.cancel();mstrmojo.css.addClass(dn,"loading");this.getDocResult({docId:this.docId},callbacks);}});})();