(function(){mstrmojo.requiresCls("mstrmojo.TouchScroller","mstrmojo.hash");var $HASH=mstrmojo.hash;mstrmojo._HasTouchScroller=mstrmojo.provide("mstrmojo._HasTouchScroller",{_meta_usesSuper:true,scrollerConfig:{},allowTouchBubble:true,scrollerSetupDelay:undefined,init:function init(props){this._super(props);this.scrollerConfig=$HASH.clone(this.scrollerConfig);},updateScrollerConfig:function updateScrollerConfig(){return this.scrollerConfig;},updateScroller:function updateScroller(noScrollToOrigin,duration){var scroller=this._scroller;if(scroller){var cfg=this.updateScrollerConfig();scroller.initScroller(cfg);if(!noScrollToOrigin){var origin=cfg.origin;if(origin){scroller.scrollTo(origin.x,origin.y,duration);}}scroller.updateScrollBars();}},initScroller:mstrmojo.emptyFn,useSelectScroll:false,postBuildRendering:function postBuildRendering(){var scroller=this._scroller;if(!scroller){scroller=this._scroller=new mstrmojo.TouchScroller();this.initScroller(scroller);}else{scroller.haltScroller();}if(!this.layoutConfig){var id=this.id,delay=this.scrollerSetupDelay;if(!isNaN(delay)){window.setTimeout(function(){mstrmojo.all[id].updateScroller();},delay);}else{this.updateScroller();}}this._super();},afterLayout:function afterLayout(){this._super();this.updateScroller();},getScrollPos:function getScrollPos(){return $HASH.copy(this._scroller.origin||{x:0,y:0});},shouldTouchBubble:function shouldTouchBubble(touch){if(!this.allowTouchBubble){return false;}var scroller=this._scroller,isVertical=touch.isVertical,axis=isVertical?"y":"x";return(!scroller[(isVertical?"v":"h")+"Scroll"]||scroller.offset[axis][touch.direction[axis]?"end":"start"]===scroller.origin[axis]);},touchBegin:function touchBegin(touch){this._scroller.haltScroller();return(this._super&&this._super(touch))||true;},touchSwipeBegin:function touchSwipeBegin(touch){if(this.shouldTouchBubble(touch)){if(this.bubbleTouchEvent(touch)===false){this._touchCanceled=true;}return ;}if(this._super){this._super(touch);}this._scroller.toggleScrollBars(true);},touchSelectBegin:function touchSelectBegin(touch){if(this._super){this._super(touch);}if(this.useSelectScroll){this.touchSwipeBegin(touch);}},touchSwipeMove:function touchSwipeMove(touch){if(!this._touchCanceled){if(this._super){this._super(touch);}}this._scroller.scroll(touch);},touchSelectMove:function touchSelectMove(touch){if(!this._touchCanceled){if(this._super){this._super(touch);}}if(this.useSelectScroll){this.touchSwipeMove(touch);}},touchSwipeEnd:function touchSwipeEnd(touch){touch.evt.handled=true;if(!this._touchCanceled){if(this._super){this._super(touch);}}this._scroller.scrollEnd(touch);},touchSelectEnd:function touchSelectEnd(touch){if(this._touchCanceled){return ;}if(this._super){this._super(touch);}if(this.useSelectScroll){this.touchSwipeEnd(touch);}},touchEnd:function touchEnd(touch){if(this._touchCanceled){delete this._touchCanceled;return ;}if(this._super){this._super(touch);}},unrender:function unrender(ignoreDom){var scroller=this._scroller;if(scroller){scroller.unrender();}delete this.scrollerConfig.scrollEl;this._super(ignoreDom);},destroy:function destroy(){if(this._scroller){this._scroller.destroy();delete this._scroller;}if(this._super){this._super();}}});}());