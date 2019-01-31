(function(){mstrmojo.requiresCls("mstrmojo.maps.androidmap.AndroidMap","mstrmojo.maps.androidmap.AndroidDocMapInfoWindow","mstrmojo.Image","mstrmojo.DynamicClassFactory","mstrmojo.Box","mstrmojo._HasLayout","mstrmojo.DocPanel","mstrmojo.hash","mstrmojo.array","mstrmojo.dom");var $DOM=mstrmojo.dom;var mapId;var REGULAR_SIZE=0,FULL_SCREEN=1,$H=mstrmojo.hash;function adjustFormat(fmt){if(!fmt||!fmt.p_fmts){return fmt;}var panel_fmt=fmt.p_fmts;var panel_top=parseInt(panel_fmt.top)||0;var panel_height=parseInt(panel_fmt.height)||0;var height=parseInt(fmt.height)||0;return{top:(panel_top+panel_height-height)+"px",left:panel_fmt.left,width:fmt.width,height:fmt.height,"z-index":panel_fmt["z-index"]};}function compareFormats(fmt1,fmt2){if(fmt1&&fmt2){if(fmt1["z-index"]>fmt2["z-index"]){return false;}var x1=parseInt(fmt1.left),y1=parseInt(fmt1.top),w1=parseInt(fmt1.width),h1=parseInt(fmt1.height),x2=parseInt(fmt2.left),y2=parseInt(fmt2.top),w2=parseInt(fmt2.width)||0,h2=parseInt(fmt2.height)||0;return((((x1<=x2)&&(x2<x1+w1))||((x2<x1)&&(x1<x2+w2)))&&(((y1<=y2)&&(y2<y1+h1))||((y2<y1)&&(y1<y2+h2))));}return false;}function registerMapRendering(){if(!mstrApp.renderingMap||(mstrApp.renderingMap===this.id)){mstrApp.renderingMap=this.id;return true;}else{return false;}}function deregisterMapRendering(){if(mstrApp.renderingMap===this.id){delete mstrApp.renderingMap;return true;}return false;}mstrmojo.maps.androidmap.AndroidDocMap=mstrmojo.declare(mstrmojo.maps.androidmap.AndroidMap,[mstrmojo._Formattable],{scriptClass:"mstrmojo.maps.androidmap.AndroidDocMap",markupString:'<div id="{@id}" class="mstrmojo-Box {@cssClass}" style="{@domNodeCssText}" mstrAttach:touchstart></div>',formatHandlers:{domNode:["left","top","z-index","height","width","border","border-color","border-style","border-width"]},sc:null,domNodeCssText:"position:relative;",lastSelectedRow:null,hasTarget:function hasTarget(){var sc=this.getInfoWindowSelectorControl(this.gridData);return !!(sc&&sc.tks);},postBuildRendering:function postBuildRendering(){window.mapId=this.id;this._touchListener=mstrmojo.touchManager.attachEventListener("touchesBegin",this.id,function(evt){var openInfoWindow=this.openedInfoWindow;if(openInfoWindow){if(!$DOM.contains(this.domNode,evt.touch.target,true,document.body)){openInfoWindow.close();}}});return this._super();},destroy:function destroy(ignoreDom){var listener=this._touchListener;if(listener){mstrmojo.touchManager.detachEventListener(listener);delete this._touchListener;}if(this.mapRendered){this.removeMap();}this._super(ignoreDom);},setModel:function setModel(d){this.doc=d.controller.view;this._super(d);},getController:function getController(){return this.doc.controller;},initFromVisProps:function initFromVisProps(vp){this._super(vp);if(!vp){return ;}this.iwDocLayout=(parseInt(vp.dl,10)===1);if(vp.lyt){this.iwLayoutKey=vp.lyt;}},findSelectorTarget:function findSelectorTarget(sc){if(sc&&sc.tks){var dm=this.xtabModel.docModel,targets=sc.tks.split("\u001E"),i=0,len=targets.length;for(i=0;i<len;++i){var d=dm.getTargetDefn(targets[i]);if(d[targets[i]].ifw){return targets[i];}}}return null;},findIntersectingComponents:function findIntersectingComponents(){var container=this,skipNode,fmt=this.getFormats();while(container.scriptClass!="mstrmojo.DocSubsection"||container.scriptClass!="mstrmojo.DocInfoWindow"){skipNode=container;container=container.parent;if(!container){break;}var children=container.children,numChild=(children&&children.length)||0,comp=null,idx;for(idx=0;idx<numChild;idx++){comp=children[idx];if(comp!=skipNode&&comp.getFormats&&compareFormats(adjustFormat(fmt),adjustFormat(comp.getFormats()))){return true;}}}return false;},getGridModel:function(){var gridModel=this._super();delete gridModel.layoutModel;delete gridModel.layoutNode;return gridModel;},dispatchMapData:function dispatchMapData(){if(!registerMapRendering.call(this)){this.domNode.innerHTML=mstrmojo.desc(9480,"Only one map visualization is supported at a time");mstrmojo.css.addClass(this.domNode,"noMapVis");return ;}var doc=this.doc,m=doc.model,viewTree=this.getViewHierarchy(),mapModel=this.getMapModel(),gridModel=this.simplifyGridData(),layouts=(doc.getSupportedLayouts&&doc.getSupportedLayouts())||doc.getLayouts(),fullScreen=!!this.isFullScreenWidget?FULL_SCREEN:REGULAR_SIZE,isActive=false,curLyt=doc.getCurrentLayout(),docData;docData=JSON.stringify({did:doc.did,ttl:doc.ttl,st:doc.st,mid:m.mid,ci:m.ci,bs:m.bs,zt:m.zt,defn:m.defn,currlaykey:m.currlaykey});delete mapModel.model;if(curLyt.setMapID){curLyt.setMapID(this.id);}if(!fullScreen){isActive=this.findIntersectingComponents();}mstrMobileApp.loadMap(JSON.stringify($H.copy({fullScreen:fullScreen,infoWindow:this.getInfoWindowConfig(),viewTree:viewTree,mapPath:this.mapPath,active:isActive,docModelId:this.xtabModel.docModel.id,hasTarget:this.hasTarget(),zt:m.zt,gdProp:gridModel.prop},mapModel)),gridModel.es,gridModel.data,docData);this.mapRendered=true;},getViewHierarchy:function(){var mapPath=[];var p=this.parent,w=[],c=$H.copy(this.fmts,{}),me=this;w.push(c);while(p){c=$H.copy(p.fmts,{});c.id=p.id;mapPath.push(c.id);if(p.scriptClass==="mstrmojo.MobileDocLayoutViewer"){delete c.width;delete c.height;}else{if(p instanceof mstrmojo.DocPanel){var left=parseInt(p.domNode.style.left,10);if(left>0){p.parent._scrollOffsetLeft=left;}}else{if(p.scriptClass==="mstrmojo.DocSection"){if(p.domNode.offsetTop){c.top=p.domNode.offsetTop+"px";}}else{if(p.scriptClass==="mstrmojo.DocInfoWindow"){if(p.containerNode){c.top=p.containerNode.offsetTop+"px";c.left=p.containerNode.offsetLeft+"px";}p.onClose=function(){mstrMobileApp.hideMapView(1);};}}}}if(p._scroller){if(!p._scroller.scrollMoveListener){var scrollerUpdate=function(e){mstrMobileApp.scrollerUpdated(JSON.stringify({id:this.id,x:e.x-(this._scrollOffsetLeft||0),y:e.y}));};p._scroller.attachEventListener("scrollMoved",p.id,scrollerUpdate);p._scroller.attachEventListener("scrollDone",p.id,scrollerUpdate);p._scroller.attachEventListener("transformAnim",p.id,scrollerUpdate);p._scroller.scrollMoveListener=true;}c.scroller=true;}w.splice(0,0,c);p=p.parent;}this.mapPath=mapPath.join("")+":"+JSON.stringify(w);return w;},getInfoWindowConfig:function useDefaultInfoWindow(){if(!this.iwConfig){if(this.iwDocLayout){this.iwConfig={dft:false};}else{var d=this.gridData,sc=this.getInfoWindowSelectorControl(d);if(sc){var dm=this.xtabModel.docModel,tgtDefs=dm.getTargetDefn(sc.tks),ifwTarget=this.findSelectorTarget(sc);if(ifwTarget){this.iwConfig={dft:false};var fmt=dm.getTargetDefn(ifwTarget)[ifwTarget].fmts;this.iwConfig.size={w:parseInt(fmt.width,10),h:parseInt(fmt.height,10)};return this.iwConfig;}}this.iwConfig={dft:true};}}return this.iwConfig;},switchToImage:function switchToImage(src,width,height){var imgPreview=this.imgPreview;if(src&&imgPreview.hasRendered){if(imgPreview.src!==src){togglePreviewCtrl(imgPreview,0);imgPreview.domNode.className=PREVIEW_CLS_NAME;imgPreview.set("src",src);imgPreview.set("width",width);imgPreview.set("height",height);imgPreview.set("visible",true);}else{if(mstrMobileApp&&mstrMobileApp.hideMapView){togglePreviewCtrl(this.imgPreview,1);window.setTimeout(function(){mstrMobileApp.hideMapView(0);},100);}}}else{mstrMobileApp.hideMapView(0);}},hidePreview:function hidePreview(){togglePreviewCtrl(this.imgPreview,0);},resetLayout:function resetLayout(){if(this.iwDocLayout&&this.preIWLayout){this.doc.selectLayout(this.preIWLayout,true,null,true);this.preIWLayout=null;}},closeInfoWindow:function closeInfoWindow(){do{mstrApp.closeDialog();}while(mstrmojo.all.mstrMapInfoWindow);this.resetLayout();},removeMarkerAnchor:function removeMarkerAnchor(){var anchor=mstrmojo.all.mstrMapMarkerAnchor;if(anchor){anchor.destroy();}anchor=document.getElementById("mstrMapMarkerAnchor");if(anchor){anchor.parentNode.removeChild(anchor);anchor.undrender();}anchor=undefined;var me=this;if(this.iwDocLayout){window.setTimeout(function(){console.log("calling resetLayout");me.resetLayout();},0);}},beforeViewHidden:function beforeViewHidden(isBackOperation){this.unrender();},handleMarkerSelection:function handleMarkerSelection(ri,dir,mH,mW,rD){console.log("handleMarkerSlection: ri="+ri+"dir="+dir+"mH="+mH+"mW="+mW+"rD="+rD);var anchor=this.anchor,aPt,rp=20,mapView=this.domNode;if(!anchor){this.anchor=mstrmojo.insert({scriptClass:"mstrmojo.Box",cssClass:"androidMap-anchorBox"});anchor=this.anchor;}else{mstrmojo.css.removeClass(anchor.domNode,"bottomAnchor");mstrmojo.css.removeClass(anchor.domNode,"leftAnchor");anchor.unrender();}mW=(mW<(parseInt(mapView.style.width,10)))?mW:(parseInt(mapView.style.width));mH=(mH<(parseInt(mapView.style.height,10)))?mH:(parseInt(mapView.style.height));if(dir==="v"){aPt="bottomAnchor";rP=Math.round((rD/mH)*100);anchor.set("width",mW+"px");mH=(mH/2)-rD;anchor.set("height",mH+"px");}else{aPt="leftAnchor";rP=Math.round((rD/mW)*100);mW=(mW/2)-rD;anchor.set("width",mW+"px");anchor.set("height",mH+"px");}anchor.set("zoom","1");anchor.render();mstrmojo.css.addClass(anchor.domNode,aPt);mapView.appendChild(anchor.domNode);if(this.iwDocLayout){this.handleMarkerInfoWindowLayoutSelection(ri,dir,anchor,mH,mW,rD,rP);}else{this.handleMarkerTargetSelection(ri,dir,anchor,mH,mW,rD,rP);}},handleMarkerInfoWindowLayoutSelection:function handleMarkerInfoWindowLayoutSelection(ri,dir,anchor,mH,mW,rD,rP){var d=this.gridData,att=d.gts.row[0],attrid=att.id,r=d.ghs.rhs.items[ri],c=r&&r.items[0].idx,ths=this,eid=(c>=0)?att.es[c].id:-1;if(this.iwDocLayout){var doc=this.doc,layouts=doc.getLayouts(),lyt=this.iwLayoutKey,layout=layouts[mstrmojo.array.find(layouts,"k",lyt)],sep="\x1F",dssXmlTypeAttribute="12",gbIDs=attrid+sep+dssXmlTypeAttribute+sep+eid;var taskParams={layoutKey:lyt,groupByIDs:gbIDs,reload:true};if(!this.preIWLayout){this.preIWLayout=layouts[mstrmojo.array.find(layouts,"k",this.defn._lkz)];}console.log("Obscuring non map view");mstrMobileApp.obscureNonMapView();(function(params,layouts){var me=doc,model=me.model,dataService=model.getDataService(),key=params.layoutKey,layout=layouts[mstrmojo.array.find(layouts,"k",key)];if(layout.defn&&(params.reload||layout.defn.loaded===false)){dataService.loadDocLayout(params,{success:function(res){var model=ths.xtabModel.docModel,key=lyt,newLayout;res.key=key;res.isSelected=false;model.replaceLayout(key,res);newLayout=doc.rebuildLayout(key,layouts);ths.lastSelectedRow=ri;var node=newLayout.node,dimensions=mstrApp.getScreenDimensions(),mw=dimensions.w*0.85,mh=dimensions.h*0.9,dw=dimensions.w*0.6,dh=dimensions.h*0.5,w=node.defn.fmts.width||(dw+"px"),h=node.defn.fmts.height||node.data.mh||(dh+"px"),zf=1,mapView=ths.domNode,overlay=new mstrmojo.Overlay({cssClass:"iwOverlay",children:[newLayout]});dw=parseInt(anchor.width,10)>parseInt(w,10)?parseInt(anchor.width,10):parseInt(w,10);dh=parseInt(anchor.height,10)>parseInt(h,10)?parseInt(anchor.height,10):parseInt(h,10);overlay.set("width",anchor.width);overlay.set("height",anchor.height);overlay.render();anchor.domNode.appendChild(overlay.domNode);var left=0,top=0,oneSection,infWnd=overlay.domNode.getElementsByClassName("mstrmojo-DocLayout")[0],sections=overlay.domNode.getElementsByClassName("mstrmojo-DocSubsection"),s;if(dw>dh){zf=(parseInt(anchor.width,10)/parseInt(w,10));}else{zf=(parseInt(anchor.height,10)/parseInt(h,10));}zf=(zf<=1)?zf:1;if(dir==="v"){left=(parseInt(anchor.width,10)-parseInt(w,10))/2;left=left>0?Math.floor(left/zf):0;for(s=0;s<sections.length;s++){sections[s].style.left=left+"px";}}else{top=(parseInt(anchor.height,10)-parseInt(h,10))/2;top=top>0?Math.floor(top/zf):0;for(s=0;s<sections.length;s++){sections[s].style.top=top+"px";}}infWnd.style.zoom=zf;doc.selectLayout(layout,true);}});}else{me.selectLayout(layout,true);}})(taskParams,layouts);return true;}return false;},handleMarkerTargetSelection:function handleMarkerTargetSelection(ri,dir,anchor,mH,mW,rD,rP){var d=this.gridData,att=d.gts.row[0],attrid=att.id,r=d.ghs.rhs.items[ri],c=r&&r.items[0].idx,ths=this,eid=(c>=0)?att.es[c].id:-1;var sc=this.getInfoWindowSelectorControl(d),firstInfoWinKey=this.findSelectorTarget(sc);if(sc&&sc.tks){var dataCacheUpdate=null,dm=ths.xtabModel.docModel,dataService=dm.getDataService(),action=dataService.getSelectorElementsAction({ck:sc.ck,eid:eid,ctlKey:sc.ckey,include:sc.include});dataService.submitUpdates(action,{success:function(res){var tgtDefs=dm.getTargetDefn(sc.tks);if(res.pukeys){tgtDefs=dm.getTargetDefn(res.pukeys);}dataCacheUpdate=dm.updateDataCache(res.data,tgtDefs);var firstInfoWinKey=ths.findSelectorTarget(sc);if(firstInfoWinKey){var targetDef=dm.getTargetDefn(firstInfoWinKey),id=firstInfoWinKey+"_ifw",w=mstrmojo.all[id],psId="*l"+res.currlaykey+"*k"+firstInfoWinKey+"*x1*t"+dm.buildTime;if(w){w.destroy();}var ifw=new mstrmojo.maps.androidmap.AndroidDocMapInfoWindow({id:id,builder:ths.doc.builder,model:dm,psKey:firstInfoWinKey,psId:psId});var fmts=targetDef[firstInfoWinKey].fmts,iw=parseInt(fmts.width,10)||width,ih=parseInt((fmts.p_fmts&&fmts.p_fmts.height)||fmts.height,10)||height,zf=1,mapView=ths.domNode,ifwWrapper=anchor.domNode;ifw.set("width",mW+"px");ifw.set("height",mH+"px");ifw.render();ifwWrapper.appendChild(ifw.domNode);var left,top,infWnd=ifw.domNode;var maxW=mW>iw?mW:iw,maxH=mH>ih?mH:ih;if(maxW>maxH){zf=(parseInt(anchor.width,10)/parseInt(iw,10));}else{zf=(parseInt(anchor.height,10)/parseInt(ih,10));}zf=(zf<=1)?zf:1;if(dir==="v"){if(mW>iw){left=(mW-iw)/2;left=left>0?left:0;infWnd.style.left=Math.floor(left/zf)+"px";}}else{if(mH>ih){top=(mH-ih)/2;top=top>0?top:0;infWnd.style.top=Math.floor(top/zf)+"px";}}infWnd.style.zoom=zf;infWnd.style.position="absolute";var docWnd=infWnd.getElementsByClassName("mstrmojo-DocSubPanel-content")[0];ifwWrapper.style.backgroundColor=docWnd.style.backgroundColor;}var ue={name:"partialUpdate",tree:res.data,ids:dataCacheUpdate,anchor:anchor.domNode};if(!mstrmojo.hash.isEmpty(ue.ids.ifws)){delete ue.ids.ifws[firstInfoWinKey];}dm.raiseEvent(ue);}},{config:mstrmojo.DocDataService.PROGRESS_CONFIG,params:{onAndroid:true}});}},slice:function slice(colIndex,indexes){console.log("slice method called"+colIndex+" indexes="+indexes);var rows=this.gridData.gts.row,sc,itemSep="\x1e",elementIds,i,elementsList,sliceInfo,numElements=indexes.length;sc=rows[colIndex].sc;if(sc===undefined||sc.tks===undefined){colIndex=0;sc=rows[colIndex].sc;if(sc===undefined||sc.tks===undefined){return ;}}elementIds=[];for(i=0;i<numElements;i++){elementIds.push(rows[colIndex].es[indexes[i]].id);}elementsList=elementIds.join(itemSep);sliceInfo={ck:sc.ck,ctlKey:sc.ckey,eid:elementsList,tks:sc.tks,include:true,suppressIW:true,type:mstrmojo.EnumRWUnitType.GRID};this.xtabModel.docModel.slice(sliceInfo);},ontouchstart:function ontouchstart(){if(this.mapRendered){mstrMobileApp.showMapView(0);}},getInfoWindowSelectorControl:function getInfoWindowSelectorControl(d){if(!this.sc&&!d.eg){this.sc=d.gts.row[0].sc;}return this.sc;},afterViewVisible:function afterViewVisible(){window.setTimeout(function(){mstrMobileApp.showMapView(1);},300);},removeMap:function removeMap(){console.log("remove map");this.closeInfoWindow();this.removeMarkerAnchor();this.resetLayout();if(deregisterMapRendering.call(this)){console.log("will call hideMapView soon");mstrMobileApp.hideMapView(1);}console.log("done with remove map");},unrender:function(){this.imgPreview.src="";this.lastSelectedRow=null;if(this.anchor){this.anchor.destroy();}this._super();}});}());