(function(){mstrmojo.requiresCls("mstrmojo.Base");mstrmojo.chart.GraphAxisGeneral=mstrmojo.declare(mstrmojo.Base,null,{scriptClass:"mstrmojo.chart.GraphAxisGeneral",mAxisLabelsLocation:-1,mAxisDrawInReverse:false,mShowAxisLine:true,mShowAxisLabels:true,mShowAxisTitle:false,mAxisDirection:-1,mUseInterlacedGrids:false,init:function init(props){if(props.AxisLabelsLocation!==undefined){this.mAxisLabelsLocation=props.AxisLabelsLocation;}if(props.AxisDrawInReverse!==undefined){this.mAxisDrawInReverse=props.AxisDrawInReverse;}if(props.ShowAxisLine!==undefined){this.mShowAxisLine=props.ShowAxisLine;}if(props.ShowAxisLabels!==undefined){this.mShowAxisLabels=props.ShowAxisLabels;}if(props.ShowAxisTitle!==undefined){this.mShowAxisTitle=props.ShowAxisTitle;}if(props.AxisDirection!==undefined){this.mAxisDirection=props.AxisDirection;}if(props.UseInterlacedGrids!==undefined){this.mUseInterlacedGrids=props.UseInterlacedGrids;}}});}());