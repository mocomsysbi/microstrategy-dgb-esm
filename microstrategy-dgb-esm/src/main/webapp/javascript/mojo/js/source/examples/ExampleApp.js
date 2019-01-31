(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.DynamicClassFactory","mstrmojo.examples.ExampleView","mstrmojo.ui.ScrollableList","mstrmojo.Container","mstrmojo.ui.Pulldown","mstrmojo.ui.CheckList","mstrmojo.Button","mstrmojo._HasPopup","mstrmojo.ui.menus.MenuConfig","mstrmojo.ui.menus.EditorConfig","mstrmojo.ui.editors.controls.ColorPickerButton");var commonItems=[],itemCnt=1;for(itemCnt;itemCnt<26;itemCnt++){commonItems.push(itemCnt);}var examples=[{n:"Custom List",description:"Lists are used for many parts of the interface.  Using getItemMarkup and getItemProps makes it easy for subclasses to provide custom rendering.",fn:function(){var ExCustomList=mstrmojo.declare(mstrmojo.ui.ScrollableList,null,{scriptClass:"ExCustomList",getItemProps:function getItemProps(item,idx){var props=this._super(item,idx);props.addStyle("background:transparent url(../javascript/mojo/css/vi/images/IconTabList/"+item.bg+") left 50% no-repeat;padding-left: 20px;cursor:pointer;");return props;}});var list=new ExCustomList({height:"125px",width:"175px",cssClass:"mojo-theme-light",cssText:"border:1px solid #000;font-size:9pt;line-height:1.5em;padding:5px;",items:["editor","filter","properties"].map(function(name){return{n:name,bg:name+".png"};}),selectionAdded:function(evt){console.log("Selected",this.items[evt.added[0]].n);},selectionRemoved:function(evt){console.log("Unselected",this.items[evt.removed[0]].n);}});list.singleSelect(0);return[list];}},{n:"Pulldown",description:"This is an example of a pulldown.",fn:function(){return[mstrmojo.ui.Pulldown.newPulldown(commonItems.slice().map(function(idx){return{n:"Pulldown Item "+idx};}),function(newItem,oldItem){console.log("New:",newItem,"Old:",oldItem);},0,{width:"175px",cssText:"font-size:9pt;"})];}},{n:"A Sample Container Declaration",description:"How to define, comment and use a widget, including the use of the _HasLayout mixin.",fn:function(){function getLabel(text,slot,color){return{scriptClass:"mstrmojo.Label",text:text,slot:slot,cssText:"background:#"+color+";color:#000;",markupMethods:{onheightChange:mstrmojo.Widget.heightMarkupMethod,onwidthChange:mstrmojo.Widget.widthMarkupMethod,ontextChange:mstrmojo.Label.prototype.markupMethods.ontextChange}};}var ExSampleWidget=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout],{scriptClass:"ExSampleWidget",markupString:'<div id="{@id}" class="mstrmojo-DLC {@cssClass}" style="{@cssText}"><div></div><div style="float:left;"></div><div style="float:left;"></div></div>',markupSlots:{topNode:function(){return this.domNode.firstChild;},leftNode:function(){return this.domNode.childNodes[1];},rightNode:function(){return this.domNode.lastChild;}},layoutConfig:{h:{topNode:"45px",leftNode:"100%",rightNode:"100%"},w:{topNode:"all",leftNode:"175px",rightNode:"100%"},xt:true},markupMethods:{onheightChange:mstrmojo.Widget.heightMarkupMethod,onwidthChange:mstrmojo.Widget.widthMarkupMethod,onvisibleChange:mstrmojo.Widget.visibleMarkupMethod},children:[getLabel("Top","topNode","FEFFCB"),getLabel("Left","leftNode","A9F8FF"),getLabel("Right","rightNode","FFCEE3")]});return[new ExSampleWidget({height:"350px",width:"475px",cssText:"border:2px solid #ffffff;"})];}},{n:"Checklist & Radio List",description:"Check lists and radio lists both use the <i>mstrmojo.ui.CheckList</i> class with different <i>multiSelect</i> property values.",fn:function(){var fnGetList=function(isVertical,isRadio){var h=45,w=480;if(isVertical){h=w=115;}return{scriptClass:"mstrmojo.ui.CheckList",height:h+"px",width:w+"px",orientation:isVertical?"v":"h",multiSelect:!isRadio,cssText:"border:2px solid #fff;margin:8px 0;padding:4px;",items:commonItems.slice(0,5).map(function(idx){return{n:"Item "+idx};}),postselectionChange:function(evt){window.console.log("Selections","added",evt.added,"removed",evt.removed);}};};return[fnGetList(false,false),fnGetList(true,false),fnGetList(false,true),fnGetList(true,true)];}},{n:"Menu Button Widget",description:"A button that will show a menu when it is clicked.",fn:function(){var currentRadioValue=2;var ExMenuButton=mstrmojo.declare(mstrmojo.Container,[mstrmojo.ui.menus._HasMenuPopup],{scriptClass:"ExMenuButton",markupString:'<div id="{@id}" class="mstrmojo-DMB {@cssClass}" style="{@cssText}"><div></div><div style="position:relative;"></div></div>',markupSlots:{containerNode:function(){return this.domNode.firstChild;},menuHostNode:function(){return this.domNode.lastChild;}},children:[mstrmojo.Button.newWebButton("Menu",function(){var menuCfg=new mstrmojo.ui.menus.MenuConfig(),menuButton=this.parent,$CORNERS=mstrmojo.ui.PopupConfig.ENUM_CORNERS,id=this.id,fnLogMessage=function(msg){window.console.log(msg);},fnGetEditor=function(text){return new mstrmojo.ui.menus.EditorConfig({contents:new mstrmojo.Label({text:text}),fnOk:fnLogMessage.bind(fnLogMessage,"Ok clicked"),fnCancel:fnLogMessage.bind(fnLogMessage,"Cancel clicked")});};menuCfg.addMenuItem("Simple Menu Item","",fnLogMessage.bind(fnLogMessage,"Simple Menu Item"));menuCfg.addPopupMenuItem("Sub Menu Item",id,function(){var subMenuCfg=new mstrmojo.ui.menus.MenuConfig();[1,2,3].forEach(function(idx){var itemText="Item "+idx;subMenuCfg.addMenuItem(itemText,"",fnLogMessage.bind(fnLogMessage,itemText));});return subMenuCfg;});menuCfg.addSeparator();menuCfg.addNonInteractiveMenuItem("Non-interactive","",false);menuCfg.addNonInteractiveMenuItem("Disabled","",true);menuCfg.addSeparator();var items=[1,2,3].map(function(idx){return{text:"Radio "+idx,value:idx};}),fnHandleRadio=function(newValue,oldValue,item){currentRadioValue=newValue;console.log("New:",newValue,"Old:",oldValue,"Item:",item);};menuCfg.addRadioMenuGroup(currentRadioValue,fnHandleRadio,items,"",null,false);menuCfg.addSeparator();menuCfg.addRadioMenuGroup(currentRadioValue,fnHandleRadio,items.map(function(item){return{text:"Check "+item.value,value:item.value};}),"",null,true);menuCfg.addSeparator();menuCfg.addPopupMenuItem("Editor Item",id,fnGetEditor.bind(this,"Hi, I'm an editor."));menuCfg.addActionPopupMenuItem("Action Item with Editor",id,fnLogMessage.bind(fnLogMessage,"Action was clicked"),fnGetEditor.bind(this,"Hi, I'm the actions editor."));menuCfg.hostId=menuButton.id;menuCfg.hostElement=menuButton.menuHostNode;menuCfg.setAlignment($CORNERS.BOTTOM_LEFT,$CORNERS.TOP_LEFT);var fnUpdateButtonColor=function(color){menuButton.domNode.style.background=color;};menuCfg.addPopupHandlers(id,fnUpdateButtonColor.bind(fnUpdateButtonColor,"#FFFFA4"),fnUpdateButtonColor.bind(fnUpdateButtonColor,"transparent"));menuButton.openPopup(menuCfg.newInstance());},false,{width:"125px"})]});return[new ExMenuButton({cssText:"padding:5px;"})];}},{n:"Color Pickers",description:"A color picker button.",fn:function(){return[new mstrmojo.ui.editors.controls.ColorPickerButton({selectedValue:"#0000ff",height:"21px",width:"45px"})];}},{n:"A Sample Mixin Declaration",description:"How to define, comment and use a mixin.",fn:function(){var _MakeItYellow=mstrmojo.provide("_MakeItYellow",{_mixinName:"_MakeItYellow",postBuildRendering:function postBuildRendering(){this.domNode.style.background="#FFE839";return this._super();}});return[1,2].map(function(idx){var Clazz=mstrmojo.declare(mstrmojo.Label,[_MakeItYellow],{cssText:"margin:8px;height:100px;width:100px;line-height:100px;color:#000;text-align:center;float:left;",text:"Label "+idx});return new Clazz();});}}];mstrmojo.examples.ExampleApp=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.examples.ExampleApp",view:null,start:function start(){var view=this.view=new mstrmojo.examples.ExampleView({placeholder:"mainApp"});view.render();examples.sort(function(a,b){return a.n>b.n;});view.set("examples",examples);}});mstrmojo.examples.ExampleApp.ExampleType=null;}());