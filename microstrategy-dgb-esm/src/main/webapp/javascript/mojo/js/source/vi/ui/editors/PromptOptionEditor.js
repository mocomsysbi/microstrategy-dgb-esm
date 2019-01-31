(function(){mstrmojo.requiresCls("mstrmojo.Editor","mstrmojo.Button","mstrmojo.Label","mstrmojo.Box","mstrmojo.ui.Checkbox","mstrmojo.ui.CheckList","mstrmojo.ui.editors.controls.TwoColumnContainer","mstrmojo.array");mstrmojo.requiresDescs(15677,15678,15679,15681,15682,15683,15684);var $NWB=mstrmojo.Button.newWebButton,ENUM_PROMPT_OPT={discard:0,open:2,closed:4};mstrmojo.vi.ui.editors.PromptOptionEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.vi.ui.editors.PromptOptionEditor",cssClass:"mstrmojo-PromptOptionEditor-Editor",title:mstrmojo.desc(15681,"Change Prompt Option and Save"),help:null,optVal:ENUM_PROMPT_OPT.open,children:[{scriptClass:"mstrmojo.Box",cssClass:"icon-box"},{scriptClass:"mstrmojo.Box",alias:"box",children:[{scriptClass:"mstrmojo.Label",cssClass:"prompt-confirm",text:mstrmojo.desc(15682,"We have detected that this dossier contains prompts. Please confirm your prompt option.")},{scriptClass:"mstrmojo.ui.editors.controls.TwoColumnContainer",col1Width:"20%",col2Width:"80%",cssClass:"chkBox",alias:"chkBox",children:[{scriptClass:"mstrmojo.ui.Checkbox",cssDisplay:"inline-block",slot:"col1Node",alias:"chk",oncheckedChange:function oncheckedChange(){var box=this.parent.parent,checklist=box.optPrompt,defaultLabel=box.defaultLabel;checklist.set("visible",this.checked);defaultLabel.set("visible",!this.checked);}},{scriptClass:"mstrmojo.Label",slot:"col2Node",text:mstrmojo.desc(15677,"Display prompt when opening this dossier")}]},{scriptClass:"mstrmojo.ui.CheckList",alias:"optPrompt",multiSelect:false,orientation:"v",selectedIndex:0,items:[{n:mstrmojo.desc(15678,"And use current answers as default answers"),v:ENUM_PROMPT_OPT.open},{n:mstrmojo.desc(15679,"And discard current answers"),v:ENUM_PROMPT_OPT.discard}]},{scriptClass:"mstrmojo.Label",alias:"defaultLabel",cssClass:"indent",text:mstrmojo.desc(15683,"It will use current answer as default answer")}]},{alias:"buttonBar",scriptClass:"mstrmojo.Box",slot:"buttonNode",children:[$NWB(mstrmojo.desc(221,"Cancel"),function(){this.parent.parent.close();}),$NWB(mstrmojo.desc(15684,"Confirm and Save"),function(){var editor=this.parent.parent,box=editor.box,chk=box.chkBox.chk;editor.optVal=chk.checked?(box.optPrompt.selectedIndex===0?ENUM_PROMPT_OPT.open:ENUM_PROMPT_OPT.discard):ENUM_PROMPT_OPT.closed;editor.onSave();editor.close();},true)]}],onOpen:function onOpen(){var box=this.box,chk=box.chkBox.chk,optPrompt=box.optPrompt,defaultLabel=box.defaultLabel;chk.set("checked",this.optVal!==ENUM_PROMPT_OPT.closed);optPrompt.set("visible",chk.checked);optPrompt.set("selectedIndex",this.optVal===ENUM_PROMPT_OPT.discard?1:0);defaultLabel.set("visible",!chk.checked);defaultLabel.set("enabled",false);},onSave:mstrmojo.emptyFn,onClose:function onCancel(){this.destroy();}});mstrmojo.vi.ui.editors.PromptOptionEditor.OptValue=ENUM_PROMPT_OPT;}());