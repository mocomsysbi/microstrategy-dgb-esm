(function(){function measureDimension(d,w){if(!w.domNode){return 0;}var cn="_fixed"+d;if(w[cn]){return w[cn];}var f=w.getFormats(),p=d.toLowerCase();if(f&&f.hasOwnProperty(p)){var v=f[p];if(v.charAt(v.length-1)!=="%"){var px=parseInt(v,10);if(!isNaN(px)){w[cn]=px;return px;}}}return(w.domNode["client"+d]||0);}mstrmojo._ContainsDocObjects=mstrmojo.provide("mstrmojo._ContainsDocObjects",{getHeight:function getHeight(){return measureDimension("Height",this);},getWidth:function getWidth(){return measureDimension("Width",this);},getMaxZIndex:function getMaxZIndex(){var mx=0;mstrmojo.array.forEach(this.children,function getMaxObjectZIndex(c){mx=Math.max(mx,c.getFormats()["z-index"]);});return mx;}});}());