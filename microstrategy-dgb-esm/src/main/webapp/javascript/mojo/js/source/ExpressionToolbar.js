(function(){mstrmojo.requiresClsP("mstrmojo","List","desc");mstrmojo.requiresDescs(2827,11897);var $DESC=mstrmojo.desc,EnumSymbolTypes={OPERATOR:1,VALIDATE:2,CLEAR:3};mstrmojo.ExpressionToolbar=mstrmojo.declare(mstrmojo.List,null,{scriptClass:"mstrmojo.ExpressionToolbar",cssClass:"mstrmojo-ExpressionToolbar",items:[{t:EnumSymbolTypes.OPERATOR,v:"+",cls:"plus"},{t:EnumSymbolTypes.OPERATOR,v:"-",cls:"minus"},{t:EnumSymbolTypes.OPERATOR,v:"*",cls:"multi"},{t:EnumSymbolTypes.OPERATOR,v:"/",cls:"divide"},{t:EnumSymbolTypes.OPERATOR,v:"()",cls:"par"},{t:EnumSymbolTypes.OPERATOR,v:"<>",cls:"bra"},{t:EnumSymbolTypes.CLEAR,v:"V",cls:"clear right",n:$DESC(2827,"Clear")},{t:EnumSymbolTypes.VALIDATE,v:"",cls:"validate right",n:$DESC(11897,"Validate")}],itemMarkupFunction:function(item,index){var cls=item.cls,n=item.n||"",t=item.t;if(t===EnumSymbolTypes.OPERATOR){return'<div class="mstrmojo-item '+cls+'" idx='+index+' title="'+n+'">'+n+"</div>";}if(t===EnumSymbolTypes.VALIDATE){return"";}return'<div class="mstrmojo-Button mstrmojo-WebHoverButton '+cls+' hoverLink"><div class="mstrmojo-Button-text" idx='+index+">"+n+"</div></div>";}});}());