(function(){mstrmojo.requiresCls("mstrmojo.Base","mstrmojo.chart.TripleId","mstrmojo.chart.model.enums.EnumDSSGraphObject");var $C=mstrmojo.chart,$M=mstrmojo.chart.model,$MODEL_ENUMS=$M.enums,$GO=$MODEL_ENUMS.EnumDSSGraphObject,$NOID=$C.gNullObjectId;function hMapObjectIdToTripleId(objectId){return new $C.TripleId({ObjectId:objectId});}mstrmojo.chart.AxisObject=mstrmojo.declare(mstrmojo.Base,null,{scriptClass:"mstrmojo.chart.AxisObject",mLabelId:-1,mMajorId:-1,mMinorId:-1,mTitleId:-1,mCustomLineId:-1,mCustomLabelId:-1,init:function init(props){this.mLabelId=props.LabelId;this.mMajorId=props.MajorId;this.mMinorId=props.MinorId;this.mTitleId=props.TitleId;this.mCustomLineId=props.CustomLineId;this.mCustomLabelId=props.CustomLabelId;}});var AxisObj=mstrmojo.chart.AxisObject;var ao=$C.gAxisObjects=[];ao.push(new AxisObj({LabelId:hMapObjectIdToTripleId.call(this,$GO.DssGraph2DO1Label),MajorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphO1Major),MinorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphO1Minor),TitleId:hMapObjectIdToTripleId.call(this,$GO.DssGraphXTitle),CustomLineId:hMapObjectIdToTripleId.call(this,$NOID),CustomLabelId:hMapObjectIdToTripleId.call(this,$NOID)}));ao.push(new AxisObj({LabelId:hMapObjectIdToTripleId.call(this,$GO.DssGraph2DO2Label),MajorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphO2Major),MinorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphO2Minor),TitleId:hMapObjectIdToTripleId.call(this,$GO.DssGraphSeriesTitle),CustomLineId:hMapObjectIdToTripleId.call(this,$NOID),CustomLabelId:hMapObjectIdToTripleId.call(this,$NOID)}));ao.push(new AxisObj({LabelId:hMapObjectIdToTripleId.call(this,$GO.DssGraphX1Label),MajorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphX1Major),MinorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphX1Minor),TitleId:hMapObjectIdToTripleId.call(this,$GO.DssGraphXTitle),CustomLineId:hMapObjectIdToTripleId.call(this,$GO.DssGraphUserLine3),CustomLabelId:hMapObjectIdToTripleId.call(this,$GO.DssGraphUserLabel3)}));ao.push(new AxisObj({LabelId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY1Label),MajorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY1Major),MinorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY1Minor),TitleId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY1Title),CustomLineId:hMapObjectIdToTripleId.call(this,$GO.DssGraphUserLine1),CustomLabelId:hMapObjectIdToTripleId.call(this,$GO.DssGraphUserLabel1)}));ao.push(new AxisObj({LabelId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY2Label),MajorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY2Major),MinorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY2Minor),TitleId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY2Title),CustomLineId:hMapObjectIdToTripleId.call(this,$GO.DssGraphUserLine2),CustomLabelId:hMapObjectIdToTripleId.call(this,$GO.DssGraphUserLabel2)}));ao.push(new AxisObj({LabelId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY3Label),MajorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY3Major),MinorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY3Minor),TitleId:hMapObjectIdToTripleId.call(this,$NOID),CustomLineId:hMapObjectIdToTripleId.call(this,$GO.DssGraphUserLine3),CustomLabelId:hMapObjectIdToTripleId.call(this,$NOID)}));ao.push(new AxisObj({LabelId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY4Label),MajorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY4Major),MinorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY4Minor),TitleId:hMapObjectIdToTripleId.call(this,$NOID),CustomLineId:hMapObjectIdToTripleId.call(this,$GO.DssGraphUserLine4),CustomLabelId:hMapObjectIdToTripleId.call(this,$NOID)}));ao.push(new AxisObj({LabelId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY1Label),MajorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY1Major),MinorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphY1Minor),TitleId:hMapObjectIdToTripleId.call(this,$GO.DssGraphSeriesTitle),CustomLineId:hMapObjectIdToTripleId.call(this,$GO.DssGraphUserLine1),CustomLabelId:hMapObjectIdToTripleId.call(this,$GO.DssGraphUserLabel1)}));ao.push(new AxisObj({LabelId:hMapObjectIdToTripleId.call(this,$GO.DssGraphX2Label),MajorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphX2Major),MinorId:hMapObjectIdToTripleId.call(this,$GO.DssGraphX2Minor),TitleId:hMapObjectIdToTripleId.call(this,$GO.DssGraphX2Title),CustomLineId:hMapObjectIdToTripleId.call(this,$GO.DssGraphUserLine4),CustomLabelId:hMapObjectIdToTripleId.call(this,$GO.DssGraphUserLabel4)}));}());