(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.css","mstrmojo.array","mstrmojo.Model","mstrmojo.IncFetch","mstrmojo.Label","mstrmojo.ui.ButtonBar","mstrmojo.ui.List","mstrmojo.mstr.search.SearchIconView","mstrmojo.mstr.search.SearchGridView","mstrmojo.mstr._ObjectActions");mstrmojo.requiresDescs(3364,3366,9202,14557);var $DESC=mstrmojo.desc,$CSS=mstrmojo.css,$HASH=mstrmojo.hash;mstrmojo.mstr.search.SearchResults=mstrmojo.declare(mstrmojo.Container,[],{scriptClass:"mstrmojo.mstr.search.SearchResults",markupString:'<div id="{@id}" class="mstrmojo-SearchResults {@cssClass}"><div class="mstrmojo-SearchResults-list"></div><div class="mstrmojo-SearchResults-toolbar"></div><div class="mstrmojo-SearchResults-if"></idv></div>',markupSlots:{listNode:function(){return this.domNode.firstChild;},toolbarNode:function(){return this.domNode.childNodes[1];},incFetchNode:function(){return this.domNode.lastChild;}},markupMethods:{onresultsChange:function(){if(this.hasRendered){this.listNode.style.height=this.results&&this.results.items&&this.results.items.length>0?"":0;}}},height:"430px",supportIncFetch:true,results:{},iconView:false,init:function init(props){if(this._super){this._super(props);}this.addChildren([this.getViewRef(),{scriptClass:"mstrmojo.Label",alias:"notFoundMsg",cssText:"text-align: center",allowHTML:true,visible:false,ontextChange:function(){this.set("visible",!mstrmojo.string.isEmpty(this.text));},slot:"listNode"},{scriptClass:"mstrmojo.ui.ButtonBar",items:[{n:"Icon View",v:1,css:"iconView"},{n:"Grid View",v:2,css:"gridView"}],showIcon:true,cssClass:"viewModesButtonBar",selectedIndex:1,postselectionChange:function(evt){var items=this.items,newItem=items[evt.added[0]],oldItem=items[evt.removed&&evt.removed[0]];if(newItem.v!==oldItem.v){this.parent.set("iconView",newItem.v===1);}},bindings:{visible:function(){return !this.parent.notFoundMsg.visible&&this.parent.list.visible;}},slot:"toolbarNode"}]);if(this.supportIncFetch){var me=this;this.addChildren([{scriptClass:"mstrmojo.IncFetch",alias:"incFetch",slot:"incFetchNode",np:0,cp:0,ds:{f:mstrmojo.desc(4046,"First"),p:mstrmojo.desc(1058,"Previous"),n:mstrmojo.desc(1059,"Next"),l:mstrmojo.desc(4049,"Last"),pgs:mstrmojo.desc(5972,"## of ### pages"),gt:mstrmojo.desc(5878,"Go to:"),v:mstrmojo.desc(6079,"This field should be # between ## and ###.")},onifsChange:function onifsChange(evt){mstrmojo.hash.copy(evt.value,this);if(this.np>1){this.children=null;this.refresh();}$CSS.toggleClass(this.domNode,"show",this.np>1);},onfetch:function onfetch(evt){me.onfetch(evt);}}]);}},getViewRef:function getViewRef(){var widgetClass=this.iconView?"mstrmojo.mstr.search.SearchIconView":"mstrmojo.mstr.search.SearchGridView";return{scriptClass:widgetClass,alias:"list",slot:"listNode",bindings:{visible:function(){return this.items&&this.items.length>0;}}};},oniconViewChange:function oniconViewChange(){this.removeChildren(this.list);this.addChildren([this.getViewRef()]);this.renderChildren();this.onresultsChange();},onresultsChange:function onresultsChange(){this.list.set("items",this.results&&this.results.items);this.updateNotFoundMsg();this.updateIncFetch();},updateNotFoundMsg:function updateNotFoundMsg(){var p=this.parent,msg=p?p.getNotFoundMsg():"";this.notFoundMsg.set("text",p.hasUserInput()&&$HASH.isEmpty(this.results&&this.results.items)?msg:"");},updateIncFetch:function updateIncFetch(){var results=this.results;if(this.supportIncFetch){var ts=this.getTotalSize(),bb=results.bb,bc=results.bc;this.incFetch.set("ifs",{np:Math.floor(ts/bc)+((ts%bc>0)?1:0),cp:Math.floor(bb/bc)+((bb%bc>0)?1:0)});}},getTotalSize:function getTotalSize(){return Math.min(this.maxSearchResults,this.results.sz);}});}());