var sActiveGoTo=null;var sActiveFetch=null;var fetchPosition=null;var oriOnMouseDownHandler=null;function removeGoTo(){var dialog=sActiveGoTo;if(dialog){getCurrentPage(dialog).open=false;var fetch=getFetch(dialog);if(fetch&&fetchPosition){fetch.style.position=fetchPosition;fetchPosition=null;}dialog.id=dialog.id.substring(0,dialog.id.length-7);removeObj(dialog);fetch.appendChild(dialog);}sActiveGoTo=null;sActiveFetch=null;if(oriOnMouseDownHandler){document.onmousedown=oriOnMouseDownHandler;}return true;}function onOut(oTarget){if(!getCurrentPage(oTarget).open){getCurrentPage(oTarget).className="currentPage";}}function onOver(oTarget){getCurrentPage(oTarget).className="currentPage-selected";}function getDialog(oTarget){if(!oTarget.dialog){var fetch=getFetch(oTarget);if(fetch==sActiveFetch){oTarget.dialog=sActiveGoTo;}else{oTarget.dialog=(fetch)?microstrategy.findChildWithAtt(fetch,"div",microstrategy.HTMLATTR_OBJTYPE,"d"):null;}}return oTarget.dialog;}function getSubmitApply(oTarget){var dialog=getDialog(oTarget);return(dialog)?microstrategy.findChildWithAtt(dialog,"input",microstrategy.HTMLATTR_OBJTYPE,"ap"):null;}function getField(oTarget){if(!oTarget.field){var dialog=getDialog(oTarget);if(dialog){oTarget.field=(dialog)?microstrategy.findChildWithAtt(dialog,"input",microstrategy.HTMLATTR_OBJTYPE,"in"):null;}}return oTarget.field;}function getCurrentPage(oTarget){if(!oTarget.currentPage){var fetch=getFetch(oTarget);oTarget.currentPage=(fetch)?microstrategy.findChildWithAtt(fetch,"span",microstrategy.HTMLATTR_OBJTYPE,"pg"):null;}return oTarget.currentPage;}function getFetch(oTarget){var fetch=microstrategy.findAncestorWithAtt(oTarget,microstrategy.HTMLATTR_OBJTYPE,"if");if(!fetch){var dialog=microstrategy.findAncestorWithAtt(oTarget,microstrategy.HTMLATTR_OBJTYPE,"d");if(dialog==sActiveGoTo){fetch=sActiveFetch;}}return fetch;}function showGoToDialog(oTarget,forceToBody){if(getCurrentPage(oTarget).open){removeGoTo();return ;}var fetch=getFetch(oTarget);if(fetch){if(fetch.currentStyle){fetchPosition=fetch.currentStyle.position;}fetch.style.position="relative";fetch.style.zIndex=1;}var dialog=getDialog(oTarget);if(dialog&&oTarget){var top=getObjSumTopScrolled(oTarget);var left=getObjSumLeft(oTarget);dialog.id=dialog.id+"_active";sActiveGoTo=dialog;sActiveFetch=fetch;var field=getField(oTarget);field.style.width=parseInt(field.getAttribute("size"))*7+"px";field.onkeydown=new Function("e","return processGoToInput(e)");if(bIsW3C&&!bIsIE4){field.onkeypress=field.onkeydown;}field.value="";getCurrentPage(dialog).open=true;var el=microstrategy.getViewerBone()&&microstrategy.getViewerBone().elem;if(el&&!forceToBody){top-=getObjSumTopScrolled(el)-el.scrollTop;left-=getObjSumLeft(el);mstr.utils.Dom.insertNode(dialog,el);}else{document.body.appendChild(dialog);}displayObj(dialog);var dialogHeight=dialog.offsetHeight;var objHeight=getObjHeight(oTarget);if(top+objHeight+dialogHeight<document.documentElement.clientHeight){top=top+objHeight-1;}else{top=top-dialogHeight+1;}moveObjTo(dialog,left,top);dialog.style.zIndex=200;field.focus();if(!oriOnMouseDownHandler){oriOnMouseDownHandler=document.onmousedown;}document.onmousedown=new Function("e","hideIncFetchGoToDialog(e); return true;");}}function processGoToInput(e){if(!e){e=window.event;}var oInput=getEventTarget(e);var rtVal=true;if(e){if(e.keyCode==13){var apply=getSubmitApply(oInput);if(apply){rtVal=submitGoToForm(apply);}else{rtVal=submitGoToLink(oInput);}}else{if(e.keyCode==27){rtVal=removeGoTo();}}}if(!rtVal){stopEventBubbling(e);}return rtVal;}function getArgumentName(eventID,argID){if(mstrUpdateManager){var eventInfo=mstrUpdateManager.actions[eventID];if(eventInfo){for(var i=0;i<eventInfo.paramID.length;i++){if(eventInfo.paramID[i]==argID){return eventInfo.paramName[i];}}}}return null;}function submitGoToForm(oApply){var oInput=getField(oApply);if(!mstrEditorImpl.validateInputs(getDialog(oApply))){oInput.focus();return false;}if(sActiveGoTo){removeGoTo();}var name=oInput.getAttribute("nm");if(name!=null&&name.length>0){var oForm=findTargetTag(oInput,"form");if(oForm){var formSubmit=true;if(mstrUpdateManager&&(oApply.name==mstrUpdateManager.PROCESS_ALL_PROMPTS)){var argumentName=getArgumentName(mstrUpdateManager.PROCESS_ALL_PROMPTS,"8231");if(argumentName){var argIndex=oInput.getAttribute("idx");createHiddenInput(oForm,argIndex?argumentName+"_"+argIndex:argumentName,"true");}updateDynamicInput(oForm,name+"_"+getGoToValue(oInput),"1");if(oForm.onsubmit){formSubmit=oForm.onsubmit();}}else{updateDynamicInput(oForm,name,getGoToValue(oInput));}var newInput=createHiddenInput(oForm,oApply.id,oApply.value?oApply.value:"OK");if(formSubmit){submitForm(oForm);}if(oForm.id){newInput.setAttribute("id",oForm.id+"_"+oApply.id);window.setTimeout("clearIncrementalFetchGotoEvent('"+oForm.id+"_"+oApply.id+"')",0);}}}return false;}function clearIncrementalFetchGotoEvent(id){var input=document.getElementById(id);if(input){input.parentNode.removeChild(input);}}function getGoToValue(oTarget){var oInput=getField(oTarget);var elemBasedDisplay="1"==oInput.getAttribute("eld");var elemBasedFetch="1"==oInput.getAttribute("elf");var intValue=parseInt(oInput.value,10);if(elemBasedDisplay){var pg=Math.floor(intValue/oInput.getAttribute("block"));if(intValue%parseInt(oInput.getAttribute("block"))>=parseInt(oInput.getAttribute("index"))){pg++;}if(elemBasedFetch){return(pg-1)*oInput.getAttribute("block")+parseInt(oInput.getAttribute("index"));}else{return pg;}}else{if(elemBasedFetch){return(intValue-1)*oInput.getAttribute("block")+parseInt(oInput.getAttribute("index"));}}return intValue;}function submitGoToLink(oTarget){var oInput=getField(oTarget);if(mstrEditorImpl.validateInputs(getDialog(oTarget))){oInput.value=getGoToValue(oInput);var oNewAnchor=document.createElement("a");oNewAnchor.href=oInput.getAttribute("href");var target=oInput.getAttribute("target");var eventID=oInput.getAttribute("evt");if(target!=null&&target.length>0){oNewAnchor.target=target;}oNewAnchor.onclick=new Function("submitLink(this);");microstrategy.eventManager.notifyOrphanBones("onIncrementalFetch",eventID);document.body.insertAdjacentElement("beforeEnd",oNewAnchor);addArgument(oInput,oNewAnchor);oInput.value="";removeGoTo();if(microstrategy.bones.UniqueReportID&&microstrategy.bones.UniqueReportID.submitIncrementalFetch){return microstrategy.bones.UniqueReportID.submitIncrementalFetch(oNewAnchor);}var submit=submitLink(oNewAnchor);if(submit){if(oNewAnchor.click){oNewAnchor.click();}else{if(oNewAnchor.target==null||oNewAnchor.target.length==0){oNewAnchor.target="_self";}openLink(oNewAnchor);}}return true;}else{oInput.focus();return false;}}function hideIncFetchGoToDialog(e){if(!sActiveGoTo){return true;}if(!e){e=window.event;}var obj=getEventTarget(e);var activeCurrentPage=getCurrentPage(sActiveGoTo);if(microstrategy.findAncestorWithAtt(obj,microstrategy.HTMLATTR_OBJTYPE,"d")!=sActiveGoTo&&obj!=activeCurrentPage){removeGoTo();onOut(activeCurrentPage);}return true;}