(function(){mstrmojo.requiresCls("mstrmojo.vi.ui.TitleBar","mstrmojo.Image","mstrmojo.css");mstrmojo.vi.ui.CollapsibleTitleBar=mstrmojo.declare(mstrmojo.vi.ui.TitleBar,null,{scriptClass:"mstrmojo.vi.ui.CollapsibleTitleBar",btnCollapse:null,canCollapse:false,isCollapsed:false,collapse:mstrmojo.emptyFn,onToggleCollapseByUI:mstrmojo.emptyFn,setToolbarVisibility:function setToolbarVisibility(isVisible){if(!isVisible||!this.isCollapsed){this._super(isVisible);}},onisCollapsedChange:function onisCollapsedChange(){if(this.canCollapse){var isCollapsed=this.isCollapsed;this.parent.set("isCollapsed",isCollapsed);}},getLeftToolbarChildren:function getLeftToolbarChildren(){var me=this;return[{scriptClass:"mstrmojo.Image",slot:"leftToolNode",alias:"btnCollapse",onclick:function(evt){var toolbar=this.parent,w=toolbar.parent;if(toolbar.canCollapse){toolbar.set("isCollapsed",!toolbar.isCollapsed);me.onToggleCollapseByUI();var e=evt.e;if(e&&e.stopPropagation){e.stopPropagation();}}if(w&&w.clickToCollapse){w.clickToCollapse();}}}];}});mstrmojo._HasMarkup.addMarkupMethods(mstrmojo.vi.ui.CollapsibleTitleBar,{oncanCollapseChange:function(){this.btnCollapse.set("visible",this.canCollapse);},onisCollapsedChange:function(){mstrmojo.css.toggleClass(this.domNode,"collapsed",this.isCollapsed);}});}());