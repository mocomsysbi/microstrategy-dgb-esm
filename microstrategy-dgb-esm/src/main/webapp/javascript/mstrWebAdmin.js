microstrategy.modifyLogins=function(){var loginTable=document.getElementsByClassName("mstrAdminPropertiesLogin")[0],checkboxes=microstrategy.findChildrenWithAtt(loginTable,"input","type","checkbox"),radios=microstrategy.findChildrenWithAtt(loginTable,"input","type","radio"),loginFirst=document.getElementById("loginFirst"),trustedIndex=mstr.$A.findByForm(checkboxes,64,"value",true),trustedOptions=document.getElementById("trustedAuthProvider").options,samlIndex=mstr.$A.findByForm(trustedOptions,7,"value",true),isSaml=samlIndex>-1&&trustedOptions[samlIndex].selected,isTrusted=trustedIndex>-1&&checkboxes[trustedIndex].checked,size=checkboxes.length;if(isSaml&&isTrusted){radios[trustedIndex].checked=true;for(var i=0;i<size;i++){if(i!==trustedIndex){var check=checkboxes[i];check.checked=false;check.disabled=true;radios[i].disabled=true;}}loginFirst.options[1].selected=true;loginFirst.disabled=true;loginFirst.style="opacity: 0.5";if(!document.getElementById("loginFirstHidden")){var input=document.createElement("input");input.setAttribute("id","loginFirstHidden");input.setAttribute("type","hidden");input.setAttribute("name","loginFirst");input.setAttribute("value","1");loginFirst.parentElement.appendChild(input);}}else{if(checkboxes[0]){for(var i=0;i<size;i++){if(i!==trustedIndex){checkboxes[i].disabled=false;radios[i].disabled=false;}}loginFirst.disabled=false;loginFirst.style="";}}};