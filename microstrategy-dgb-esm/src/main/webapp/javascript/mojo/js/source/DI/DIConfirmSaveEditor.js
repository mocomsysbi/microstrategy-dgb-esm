(function(){mstrmojo.requiresCls("mstrmojo.Editor");mstrmojo.DI.DIConfirmSaveEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.DI.DIConfirmSaveEditor",cssClass:"workstation mstrmojo-ConfirmSave-Editor",title:"Application Schema",help:null,children:[{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Warning-Box",children:[{scriptClass:"mstrmojo.Box",cssClass:"icon"},{scriptClass:"mstrmojo.Label",text:"Do you want to save the changes you made before you close Application Schema?",cssClass:"message"}]},{scriptClass:"mstrmojo.HBox",slot:"buttonNode",cssClass:"mstrmojo-Editor-buttonBar",children:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton nosave",text:mstrmojo.desc(11814,"Don't Save"),onclick:function(){this.editor.onDonotSave();this.editor.destroy();},bindings:{editor:"this.parent.parent"}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton hot",text:mstrmojo.desc(118,"Save"),onclick:function(){this.editor.onSave();this.editor.destroy();},bindings:{editor:"this.parent.parent"}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton",text:mstrmojo.desc(221,"Cancel"),onclick:function(){this.editor.destroy();},bindings:{editor:"this.parent.parent"}}]}],onSave:mstrmojo.emptyFn,onDonotSave:mstrmojo.emptyFn});}());