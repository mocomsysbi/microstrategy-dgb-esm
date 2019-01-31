(function(){mstrmojo.requiresCls("mstrmojo.css","mstrmojo._HasPopup","mstrmojo.string","mstrmojo.Pulldown","mstrmojo.Container");var _C=mstrmojo.css;mstrmojo.CustomGroupEl=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasPopup],{scriptClass:"mstrmojo.CustomGroupEl",markupString:'<div id="{@id}" class="mstrmojo-onhoverparent mstrmojo-CustomGroupEl {@cssClass}" style="{@cssText}" mstrAttach:mouseover><div class="mstrmojo-CustomGroupEl-title {@cssClass}" mstrAttach:click><img class="mstrmojo-CustomGroupEl-state {@cssClass}" src="../images/1ptrans.gif" align="absmiddle" onclick="var w = mstrmojo.all[\'{@id}\']; w.set(\'state\', !w.state)" /><span class="mstrmojo-text"></span></div><div class="mstrmojo-onhover mstrmojo-abs mstrmojo-topright mstrmojo-CustomGroupEl-tools {@cssClass}"><img class="mstrmojo-dup" src="../images/1ptrans.gif" title="'+mstrmojo.desc(3397,"Duplicate")+'" onclick="mstrmojo.all[\'{@id}\'].dup()" /><img class="mstrmojo-ops" src="../images/1ptrans.gif"onclick="var w = mstrmojo.all[\'{@id}\'].showOps();" title="'+mstrmojo.desc(7932,"Element display options")+'" /><img class="mstrmojo-del" src="../images/1ptrans.gif" onclick="mstrmojo.all[\'{@id}\'].del()" title="'+mstrmojo.desc(7933,"Delete element")+'"/></div><div class="mstrmojo-CustomGroupEl-details {@cssClass}"><div class="mstrmojo-CustomGroupEl-expr {@cssClass}"></div><div class="mstrmojo-CustomGroupEl-expr-tools {@cssClass}"></div></div></div>',markupSlots:{stateNode:function(){return this.domNode.firstChild.firstChild;},titleNode:function(){return this.domNode.firstChild.lastChild;},detailsNode:function(){return this.domNode.lastChild;},exprNode:function(){return this.domNode.lastChild.firstChild;},exprToolsNode:function(){return this.domNode.lastChild.lastChild;},titlebarNode:function(){return this.domNode.firstChild;}},markupMethods:{ondataChange:function(){var d=this.data,t=d&&d.n;this.titleNode.innerHTML=(t!=null)?mstrmojo.string.encodeHtmlString(t):"";},onstateChange:function(){var s=this.stateNode;s.className="mstrmojo-CustomGroupEl-state "+(this.state?"opened":"closed");this.detailsNode.style.display=this.state?"block":"none";},onselectedChange:function(){_C.toggleClass(this.domNode,["selected"],this.selected);},onshowaddChange:function(){this.exprToolsNode.style.display=this.showadd?"block":"none";}},_set_data:function stdt(n,v){var vWas=this.data;this.data=v;this.set("expr",v&&v.expr);return vWas!==v;},optionsRef:{scriptClass:"mstrmojo.Editor",title:mstrmojo.desc(7934,"Element Options"),contentNodeCssClass:"mstrmojo-balloon",cssClass:"mstrmojo-CGEOptionsEditor",help:"element_options_dialog_box.htm",ce:false,isp:false,onOpen:function(){var data=this.opener.data,d=this.ops.dsplb.dspl;d.set("value",data.ce?2:(data.isp?1:0));},save:function(){var v=this.ops.dsplb.dspl.value,d=this.opener.data;d.ce=(v==2);d.isp=(v==1);this.close();},children:[{scriptClass:"mstrmojo.VBox",cssClass:"mstrmojo-ElementOptions",alias:"ops",children:[{scriptClass:"mstrmojo.HBox",alias:"dsplb",children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(168,"Display:"),cssText:"margin: 0 5px;"},{alias:"dspl",scriptClass:"mstrmojo.Pulldown",itemIdField:"v",items:[{n:mstrmojo.desc(7935,"Display element name only (Default)"),v:0},{n:mstrmojo.desc(7936,"Display individual items only"),v:1},{n:mstrmojo.desc(7937,"Display element name and individual items"),v:2}]}]},{scriptClass:"mstrmojo.HBox",alias:"btns",cssText:"float:right;width:150px;margin:5px;",children:[{scriptClass:"mstrmojo.HTMLButton",alias:"ok",text:mstrmojo.desc(118,"Save"),cssClass:"mstrmojo-Editor-button",cssText:"width:72px;",onclick:function(){this.parent.parent.parent.save();}},{scriptClass:"mstrmojo.HTMLButton",alias:"cancel",text:mstrmojo.desc(221,"Cancel"),cssClass:"mstrmojo-Editor-button",cssText:"width:72px;margin: 5px;",onclick:function(){this.parent.parent.parent.close();}}]}]}]},showOps:function(){var n=this.titlebarNode,p=mstrmojo.dom.position(n,true);this.openPopup("optionsRef",{zIndex:30,left:Math.round(p.x+p.w-300)+"px",top:Math.round(p.y+p.h)+"px"});},init:function init(props){this._super(props);var d=this.data;if(d){delete this.data;this._set_data(null,d);}},del:function del(){var p=this.parent;if(p&&p.remove){p.remove(this.data);}},dup:function dup(){var p=this.parent;if(p&&p.duplicate){var d=this.data,items=p.items,did=d.did,pos=1,re=new RegExp(d.n+"_(\\d+)");for(var i=0,len=items.length;i<len;i++){var it=items[i],m=it.n&&it.n.match(re);if(m){pos=Math.max(pos,m[1]);}did=Math.max(did,parseInt(it.did,10));}p.duplicate(this.data,null,{n:mstrmojo.desc(3651,"Copy of ##").replace("##",d.n),did:p.getNextId(),state:1});}},onmouseover:function(e){this.set("showadd",this.state?true:false);}});})();