(function(){mstrmojo.requiresCls("mstrmojo.gmaps.MapEnums","mstrmojo.gmaps.MapUtils","mstrmojo.gmaps.geometry.Geometry");var $GMAPS=mstrmojo.gmaps,$MUTIL=$GMAPS.MapUtils,$EnumGeometryType=$GMAPS.EnumGeometryType;mstrmojo.gmaps.geometry.Extent=mstrmojo.declare(mstrmojo.gmaps.geometry.Geometry,null,{scriptClass:"mstrmojo.gmaps.geometry.Extent",nodeTag:"rect",type:$EnumGeometryType.Extent,x:null,y:null,width:null,height:null,latSouth:null,latNorth:null,lngWest:null,lngEast:null,isGeo:true,update:function update(props){this._super(props);this.setPosition(props);this.setDimension(props);},setPosition:function setPosition(props){if(props&&$MUTIL.checkVal(props.x)&&$MUTIL.checkVal(props.y)){this.x=props.x;this.y=props.y;}if($MUTIL.checkVal(this.x)&&$MUTIL.checkVal(this.y)){$MUTIL.setNodeAttributes(this.node,{x:this.x,y:this.y});}},setDimension:function setDimension(props){if(props&&$MUTIL.checkVal(props.width)&&$MUTIL.checkVal(props.height)){this.width=props.width;this.height=props.height;}if($MUTIL.checkVal(this.width)&&$MUTIL.checkVal(this.height)){$MUTIL.setNodeAttributes(this.node,{width:this.width,height:this.height});}},union:function union(extExtent){if(extExtent&&$MUTIL.checkVal(extExtent.latSouth)&&$MUTIL.checkVal(extExtent.latNorth)&&$MUTIL.checkVal(extExtent.lngWest)&&$MUTIL.checkVal(extExtent.lngEast)){this.mergePoint(extExtent.latSouth,extExtent.lngWest);this.mergePoint(extExtent.latNorth,extExtent.lngEast);}},eql:function eql(extExtent){return(!!extExtent)&&(this.latSouth===extExtent.latSouth&&this.latNorth===extExtent.latNorth&&this.lngWest===extExtent.lngWest&&this.lngEast===extExtent.lngEast);},mergePoint:function mergePoint(lat,lng){this._mergePointLat(lat);this._mergePointLng(lng);},_mergePointLat:function _mergePointLat(lat){if($MUTIL.checkVal(lat)){this.latSouth=(!$MUTIL.checkVal(this.latSouth)||lat<this.latSouth)?lat:this.latSouth;this.latNorth=(!$MUTIL.checkVal(this.latNorth)||lat>this.latNorth)?lat:this.latNorth;}},_mergePointLng:function _mergePointLng(lng){if(!$MUTIL.checkVal(lng)){return ;}var lngEast=this.lngEast,lngWest=this.lngWest;if(!this.isGeo){this.lngWest=(!$MUTIL.checkVal(this.lngWest)||lng<this.lngWest)?lng:this.lngWest;this.lngEast=(!$MUTIL.checkVal(this.lngEast)||lng>this.lngEast)?lng:this.lngEast;return ;}if(!$MUTIL.checkVal(this.lngWest)){this.lngWest=this.lngEast=lng;}else{if(!this._containsLng(lng)){if(this._distBetweenPointLng(lng,lngWest)<this._distBetweenPointLng(lngEast,lng)){this.lngWest=lng;}else{this.lngEast=lng;}}}},_distBetweenPointLng:function _distBetweenPointLng(lng1,lng2){var tmp=lng2-lng1;return tmp>=0?tmp:(tmp+360);},_containsLng:function _containsLng(lng){lng=(lng===-180)?180:lng;if(this.lngWest>this.lngEast){return(lng>=this.lngWest||lng<=this.lngEast);}else{return(lng>=this.lngWest&&lng<=this.lngEast);}},contains:function contains(point){if(!point||!$MUTIL.checkVal(point.x)||!$MUTIL.checkVal(point.y)||!$MUTIL.checkVal(this.x)||!$MUTIL.checkVal(this.y)||!$MUTIL.checkVal(this.width)||!$MUTIL.checkVal(this.height)){console.log("Extent.contains(): invalid params");return false;}var x=point.x,y=point.y,xmin=this.x,xmax=this.x+this.width,ymin=this.y,ymax=this.y+this.height;return(x<=xmax&&x>=xmin&&y<=ymax&&y>=ymin);},intersectPolygon:function intersectPolygon(polygon){if(!polygon||!polygon.screenPolylineArr||!(polygon.containVertexInPolyline instanceof Function)){console.log("intersectPolygon(): invalid polygon");return false;}return !!polygon.containVertexInPolyline([{x:this.x,y:this.y},{x:this.x+this.width,y:this.y},{x:this.x,y:this.y+this.height},{x:this.x+this.width,y:this.y+this.height}])||!!this.containVertexInPolylineArr(polygon.screenPolylineArr);}});}());