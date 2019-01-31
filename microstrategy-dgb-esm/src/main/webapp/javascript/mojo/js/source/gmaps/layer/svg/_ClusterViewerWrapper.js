(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.array","mstrmojo.gmaps.MapUtils","mstrmojo.gmaps.graphic.ImageClusterGraphic","mstrmojo.gmaps.graphic.PieClusterGraphic");var $MOJO=mstrmojo,$ARR=$MOJO.array,$HASH=$MOJO.hash,$GMAPS=$MOJO.gmaps,$MUTILS=$GMAPS.MapUtils,$EnumClusterMode=$GMAPS.EnumClusterMode;function desolveGraphic(c,graphics){delete c.clusterId;graphics.push(c);}function _updateClusterPos(cluster,p){if(!cluster||!p){return ;}var pGeoPos=p.geoData,pScreenPos=p.screenData,cGeoPos=cluster.geoData,cScreenPos=cluster.screenData,count=cluster.attributes.clusterCount;if(pGeoPos&&pScreenPos&&cGeoPos&&cScreenPos){cScreenPos.x=(pScreenPos.x+(cScreenPos.x*count))/(count+1);cScreenPos.y=(pScreenPos.y+(cScreenPos.y*count))/(count+1);cGeoPos.lat=(pGeoPos.lat+(cGeoPos.lat*count))/(count+1);cGeoPos.lng=(pGeoPos.lng+(cGeoPos.lng*count))/(count+1);}}mstrmojo.gmaps.layer.svg._ClusterViewerWrapper=mstrmojo.provide("mstrmojo.gmaps.layer.svg._ClusterViewerWrapper",{_mixinName:"mstrmojo.gmaps.layer.svg._ClusterViewerWrapper",buildClusterGraphics:function buildClusterGraphics(){var graphics=this.graphics,parent=this.parent;if(parent&&$ARR.isArray(graphics)&&graphics.length>0){this._createAndAddClusters(graphics);if($MUTILS.checkHasFunction(parent,"highlightFromViSelection")){parent.highlightFromViSelection();}}},_createAndAddClusters:function(graphics){var clusters=this._createAllClusters(graphics);this._addAllClusters(clusters);},_createAllClusters:function(pointsData){var point,clustered,numClusters,cluster,clusters=[],i,j,jl=pointsData.length;for(j=0;j<jl;j++){point=pointsData[j];clustered=false;numClusters=clusters.length;for(i=0;i<numClusters;i++){cluster=clusters[i];if(this._clusterTest(point,cluster)){this._clusterAddPoint(point,cluster);clustered=true;break;}}if(!clustered){clusters.push(this._clusterCreate(point,clusters.length+1));}}return clusters;},_clusterTest:function(p,cluster){var pPosition=p&&(p.screenData||p.getPositionInfo()),cPosition=cluster&&cluster.screenData,distance,checkValid=function(pos){return pos&&!isNaN(pos.x)&&!isNaN(pos.y);};if(checkValid(pPosition)||checkValid(cPosition)){distance=Math.sqrt(Math.pow((cPosition.x-pPosition.x),2)+Math.pow((cPosition.y-pPosition.y),2));return distance<=this.clusterRadius;}else{return false;}},_clusterAddPoint:function(p,cluster){var pAttributes=p.attributes,clusterAttributes=cluster.attributes;_updateClusterPos(cluster,p);clusterAttributes.clusterCount++;if(!p.hasOwnProperty("attributes")){pAttributes={};}pAttributes.clusterId=clusterAttributes.clusterId;if(!clusterAttributes.geoIndices){clusterAttributes.geoIndices=[];}if(!clusterAttributes.longGeoIndices){clusterAttributes.longGeoIndices=[];}clusterAttributes.geoIndices.push(pAttributes.geoIndex);clusterAttributes.longGeoIndices.push(pAttributes.longGeoIndex);if(!clusterAttributes.rowIndices){clusterAttributes.rowIndices=[];}clusterAttributes.rowIndices=clusterAttributes.rowIndices.concat(pAttributes.rowIndices);if(!clusterAttributes.columnIndices){clusterAttributes.columnIndices=pAttributes.columnIndices;}if(this.isCluster){cluster.points.push(p);}},_clusterCreate:function(p,clusterId){var pAttributes=p.attributes,screenData=p.getPositionInfo(),cluster,attributes;if(!pAttributes){pAttributes={};}pAttributes.clusterId=clusterId;cluster={parent:p.parent,geoData:$HASH.clone(p.geoData),screenData:$HASH.clone(screenData),points:[p]};attributes=$HASH.clone(pAttributes);attributes.clusterCount=1;attributes.clusterId=clusterId;attributes.geoIndices=[pAttributes.geoIndex];attributes.longGeoIndices=[pAttributes.longGeoIndex];attributes.dlTextName=pAttributes.dataLabelText;cluster.attributes=attributes;return cluster;},_addAllClusters:function(clusters){var ClusterGraphicCls=this.getClusterGraphicCls(this.clusterMode),graphics=this.graphics=[],graphic;$ARR.forEach(clusters,function(c){graphic=this._createAndAddGraphic(c,ClusterGraphicCls);if(graphic){graphics.push(graphic);}},this);},_createAndAddGraphic:function(c,ClusterGraphicCls){if(!c||!ClusterGraphicCls){return ;}if(!this.isClusterGraphic(c)){return c.points[0];}else{return new ClusterGraphicCls(c);}},getClusterGraphicCls:function getClusterGraphicCls(clusterMode){if(clusterMode===$EnumClusterMode.PIE){return $GMAPS.graphic.PieClusterGraphic;}else{return $GMAPS.graphic.ImageClusterGraphic;}},desolveClusterGraphics:function desolveClusterGraphics(){var clusters=this.graphics,parent=this.parent;if(!parent){return ;}$ARR.forEach(clusters,function(c){if((c instanceof $GMAPS.graphic.ImageClusterGraphic)&&this.isClusterGraphic(c)){c.points=null;if($MUTILS.checkHasFunction(c,"destroy")){c.destroy();}}},this);this.graphics=parent.graphics;}});}());