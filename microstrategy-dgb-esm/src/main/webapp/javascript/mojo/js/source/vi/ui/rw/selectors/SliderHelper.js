(function(){mstrmojo.requiresCls("mstrmojo.Base","mstrmojo.desc","mstrmojo.dom","mstrmojo.elementHelper","mstrmojo.hash");var $HASH=mstrmojo.hash,$MAX=Math.max,$MIN=Math.min,$ROUND=Math.round;mstrmojo.vi.ui.rw.selectors.SliderHelper=mstrmojo.declare(mstrmojo.Base,null,{scriptClass:"mstrmojo.vi.ui.rw.selectors.SliderHelper",_children:[{scriptClass:"mstrmojo.Label",slot:"controlNode",alias:"summary"}],init:function init(props){if(!props.slider){throw new Error(this.scriptClass+"must be initialized with a slider instance.");}if(this._children){props.slider.set("children",this._children.slice(0));}return this._super(props);},getUnit:function getUnit(){var sl=this.slider;return sl._effectiveLength/$MAX((sl.items.length-1),1);},getIdxByPx:function getIdxByPx(px,alignRight){var unit=this.slider.unit||this.getUnit();return $MAX(Math[alignRight?"ceil":"floor"](px/unit+0.5),0);},updateThumb:function updateThumb(){var sl=this.slider,cs1Idx=sl.cs1Idx,cs2Idx=sl.cs2Idx;if(this.notNull(cs1Idx,cs2Idx)){var unit=sl.unit;$HASH.copy(this.positionSliderElements(sl,$ROUND(cs1Idx*unit),$ROUND(cs2Idx*unit)),sl);}},updateHandleNodeStyle:function updateHandleNodeStyle(ui,position,handle1,handle2,px){ui.handle1Node.style[position]=handle1+px;ui.handle2Node.style[position]=handle2+px;},positionSliderElements:function positionSliderElements(ui,handle1,handle2){var slider=this.slider,px="px",isMulti=slider.multiSelect,effectiveLength=slider._effectiveLength,handleSize=slider.thumbWidth,borderWidth=slider.cssBkBW,orCfg=slider.orCfg,position=orCfg.posCssP,length=orCfg.lenCssP,OPACITY="opacity";handle1=$MIN($MAX(handle1,-1),effectiveLength);handle2=$MAX($MIN(handle2,effectiveLength),0);var min=$MIN(handle1,handle2),max=$MAX(handle1,handle2),lowerPosition=0,thumbPosition=min+(isMulti?handleSize:0),upperPosition=max+handleSize-borderWidth,lowerLength=$MAX(min,0),thumbLength=$MAX(max-thumbPosition,0),upperLength=$MAX(effectiveLength-max,0);if(slider.hasRendered){this.updateHandleNodeStyle(ui,position,handle1,handle2,px);var lowerStyle=ui.lowerRange.style,thumbStyle=ui.thumbNode.style,upperStyle=ui.upperRange.style;lowerStyle[position]=lowerPosition+px;thumbStyle[position]=thumbPosition+px;upperStyle[position]=upperPosition+px;lowerStyle[length]=lowerLength+px;thumbStyle[length]=thumbLength+px;upperStyle[length]=upperLength+px;lowerStyle[OPACITY]=lowerLength?1:0;}else{px+=";";position+=":";length+=":";slider.handle1CssText=position+handle1+px;slider.handel2CssText=position+handle2+px;slider.lowerRangeCssText=length+lowerLength+px;slider.thumbCssText=position+thumbPosition+px+length+thumbLength+px;slider.upperRangeCssText=position+upperPosition+px+length+upperLength+px;slider.lowerRangeCssText+=OPACITY+":"+(lowerLength?1:0)+";";}return{handle1:handle1,handle2:handle2};},updateSummary:function updateSummary(){var sl=this.slider,items=sl.items,include=sl.include,idx,idxCnt,txt="";if(sl.multiSelect){idx=$HASH.keyarray(sl.selectedIndices,true);idxCnt=idx&&idx.length||0;var allDescriptor=mstrmojo.desc(2058,"All");try{var deletedItem=sl.parent.node.data.del.elem;if(deletedItem.v===mstrmojo.elementHelper.ELEM_ALL_ID){allDescriptor=deletedItem.n;}}catch(e){}if(idxCnt===0){txt=include?mstrmojo.desc(2057,"None"):allDescriptor;}else{if(idxCnt===items.length){txt=allDescriptor;}else{txt=(include?"":mstrmojo.desc(1099,"Not")+" ")+items[idx[0]].n+(idxCnt>1?(" - "+items[idx[idxCnt-1]].n):"");}}}else{idx=sl.selectedIndex;if(idx>=0){txt=(include?"":mstrmojo.desc(1099,"Not")+" ")+items[idx].n;}}sl.summary.set("text",txt);},initialSlider:function initialSlider(){var sl=this.slider,items=sl.items,itemCnt=items.length,itm,cs1Idx,cs2Idx;if(itemCnt>0){if(sl.multiSelect){var idx=sl.selectedIndices;cs1Idx=$HASH.min(idx,false,true)||0;cs2Idx=$HASH.max(idx,false,true)||0;}else{cs1Idx=0;cs2Idx=$MAX(sl.selectedIndex,0);}sl.cs1Idx=cs1Idx;itm=items[cs1Idx];sl.cs1Vl=itm.v;sl.cs1Nm=itm.n;sl.cs2Idx=sl.currentZoomLevel?sl.getIndexByValue(sl.currentZoomLevel):cs2Idx;itm=items[sl.cs2Idx];sl.cs2Vl=itm.v;sl.cs2Nm=itm.n;sl.set("lowText",items[0].n);sl.set("highText",items[itemCnt-1].n);}sl.include=sl.parent.include;sl.unit=this.getUnit();},updateSelection:function updateSelection(){var sl=this.slider,items=sl.items,cs1Idx=sl.cs1Idx,cs2Idx=sl.cs2Idx,min=$MIN(cs1Idx,cs2Idx),max=$MAX(cs1Idx,cs2Idx),selections={},i;if(sl.multiSelect){for(i=min;i<=max;i++){if(items[i]){selections[i]=true;}}sl.selectedIndices=selections;}else{sl.selectedIndex=cs2Idx;}},notNull:function(){var check=function(v){return v===undefined||v===null;},i;for(i=0;i<arguments.length;i++){if(check(arguments[i])){return false;}}return true;}});}());