(function(){mstrmojo.requiresCls("mstrmojo.string","mstrmojo.vi.ui.toolbars.Toolbar","mstrmojo.hash","mstrmojo.vi._MonitorsAppState");mstrmojo.requiresDescs(118,1013,1143,2919,2922,3473,3482,4538,6189,10096,11500,11694,11780,11783,13032,14494,15280,15281,15282,15283);var itemMarkup,$HASH=mstrmojo.hash,pickerButtonMarkup;mstrmojo.vi.ui.toolbars.RootToolbar=mstrmojo.declare(mstrmojo.vi.ui.toolbars.Toolbar,[mstrmojo.vi._MonitorsAppState],{scriptClass:"mstrmojo.vi.ui.toolbars.RootToolbar",tooltipOffset:7,tooltipOpenDelay:500,keepArrowXPos:true,tooltipCss:{getItemCssClass:function(item){return item&&item.cls;}},getTooltipThemeClass:function(){return"root-toolbar-tooltip";},getTooltipText:function getTooltipText(item){if(!item){return ;}var tooltip=item.ttp||item.n;if(item.disallowHTML){tooltip=mstrmojo.string.encodeHtmlString(tooltip);}return tooltip;},getItemMarkup:function getItemMarkup(item){var currentItemMkp;if(item.tp==="pb"){currentItemMkp=pickerButtonMarkup=pickerButtonMarkup||this._super(item).replace("{@en@n}",'<div class="btn"><span class="text {@midTruncateCssClass}">{@en@n}</span><div class="icn"></div><div class="pdl"></div></div>').replace("{@midTruncateCssClass}",this.midTruncateCssClass);}else{currentItemMkp=itemMarkup=itemMarkup||this._super(item).replace("{@en@n}",'<div class="btn"><span class="text {@midTruncateCssClass}">{@en@n}</span><div class="icn"></div></div>').replace("{@midTruncateCssClass}",this.midTruncateCssClass);}return currentItemMkp;},postBuildRendering:function postBuildRendering(){if(this._super){this._super();}this.widgetResized();},getItemProps:function getItemProps(item,idx){var props=this._super(item,idx);if(item.active){props.addCls("active");}var menuLen=$HASH.walk("toolbarCfg.disposables."+item._renderIdx+".menus.length",this);if(menuLen===0){props.addCls("disabledMenuItem");}return props;},onAppStateChange:function onAppStateChange(evt){this._super(evt);this.set("isMasked",mstrApp.isAppStateSelection());},openMenu:function openMenu(menuCfg,item){if(menuCfg.menus.length===0){return ;}var rootCtl=this.parent.controller;if(rootCtl.lastMenuOpener===item){rootCtl.lastMenuOpener=null;return ;}rootCtl.lastMenuOpener=item;menuCfg.useTooltip=true;this._super(menuCfg,item);},onPopupAutoClosed:function onPopupAutoClosed(e,hWin){var selectedItem=this.getItemFromTarget(mstrmojo.dom.eventTarget(hWin,e)),rootCtl=this.parent.controller;if(!selectedItem||selectedItem!==rootCtl.lastMenuOpener){rootCtl.lastMenuOpener=null;}}});}());