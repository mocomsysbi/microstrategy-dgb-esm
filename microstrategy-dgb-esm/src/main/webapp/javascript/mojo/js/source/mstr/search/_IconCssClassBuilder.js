(function(){mstrmojo.mstr.search._IconCssClassBuilder=mstrmojo.provide("mstrmojo.mstr.search._IconCssClassBuilder",{_mixinName:"mstrmojo.mstr.search._IconCssClassBuilder",getIconCssClass:function getIconCssClass(item){item=item||this.data;return item.ccss||("t"+item.t+(item.st?" st"+item.st:"")+(item.isc?" isc":"")+(item.dvm?" dvm"+item.dvm:""));}});}());