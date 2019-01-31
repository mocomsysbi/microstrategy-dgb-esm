(function(){mstrmojo.requiresCls("mstrmojo.ListSelector","mstrmojo.List","mstrmojo.string");mstrmojo.OBList=mstrmojo.declare(mstrmojo.List,null,{scriptClass:"mstrmojo.OBList",cssClass:"mstrmojo-OBList",itemClass:"mstrmojo-OBListItem",iconClass:"mstrmojo-OBListItemIcon",textClass:"mstrmojo-OBListItemText",iconCssPrefx:"mstrmojo-OBIcon_",itemMarkupFunction:function(item,index,me){return'<div class="'+me.itemClass+(item[me.itemType]?" t_"+item[me.itemType]:"")+(item[me.itemSubType]?" st_"+item[me.itemSubType]:"")+(item[this.itemISC]?" isc":"")+(item[me.itemViewMedia]?" vm_"+item[me.itemViewMedia]:"")+'"><table cellspacing="0" cellpadding="0"><tbody><tr><td>'+me.getIcon(item)+'</td><td><div class="'+me.textClass+'" title="'+me.getTooltip(item)+'">'+mstrmojo.string.htmlAngles(item.n)+"</div></td></tr></tbody></table></div>";},getIcon:function(item){var t=item[this.itemType],st=item[this.itemSubType],tc=" t"+t,stc=(parseInt(t,10)===1||parseInt(t,10)===3||parseInt(st,10)===14082)?" st"+st:"",isc=item[this.itemISC]?'class="mstrmojo-ListIcon isc"':"",hvi=(item[this.itemViewMedia]===2048||item[this.itemViewMedia]===8192)?" hvi":"";return'<span class="mstrmojo-ListIcon '+tc+stc+hvi+'"><span '+isc+"></span></span>";},getTooltip:function(item){var tooltip="",ancItems=item.anc&&item.anc.items,ancLength=ancItems&&ancItems.length,i;if(ancLength>0){for(i=0;i<ancLength-1;i++){tooltip+=ancItems[i].n+" > ";}tooltip+=ancItems[ancLength-1].n;}var desc=item.desc,ml=128;if(desc){tooltip+="\r\n\r\n"+mstrmojo.string.encodeHtmlString(desc.substring(0,ml))+(desc.length>ml?"...":"");}return tooltip;},listSelector:mstrmojo.ListSelector,selectionPolicy:"reselect",itemType:"t",itemSubType:"st",itemISC:"isc",itemViewMedia:"dvm",useDblSelect:false});}());