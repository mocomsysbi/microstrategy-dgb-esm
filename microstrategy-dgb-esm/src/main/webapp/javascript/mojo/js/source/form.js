(function(){mstrmojo.requiresCls("mstrmojo.array");function createInput(doc,n,v){var el=doc.createElement("input");el.name=n;el.type="hidden";el.value=v;return el;}function addURLAsHiddenInputsToForm(oForm,URL){URL=URL.substring(URL.indexOf("?")+1,URL.length);var URLParameters=URL.split("&"),parameterName="",parameterValue="";var myRegExp=/\+/g,i,cnt;for(i=0,cnt=URLParameters.length;i<cnt;i++){var loc=URLParameters[i].indexOf("=");if(loc>=0){parameterName=URLParameters[i].substring(0,loc);parameterValue=URLParameters[i].substring(loc+1);}else{parameterName=URLParameters[i];parameterValue="";}if(parameterValue){parameterValue=decodeURIComponent(parameterValue.replace(myRegExp," "));}var oNewItem=document.createElement("INPUT");oNewItem.type="HIDDEN";oNewItem.name=parameterName;oNewItem.value=parameterValue;oForm.appendChild(oNewItem);}return false;}mstrmojo.form={createDynamicForm:function createDynamicForm(sAction,method){var oNewForm=document.createElement("FORM"),hasParameters=sAction.indexOf("?")>0;oNewForm.name="dynamic_form";oNewForm.method=method||"POST";oNewForm.action=(hasParameters?sAction.substring(0,sAction.indexOf("?")):sAction);if(hasParameters){addURLAsHiddenInputsToForm(oNewForm,sAction);}document.body.appendChild(oNewForm);return oNewForm;},sendLinkAsForm:function(href,target,method){var f=this.createDynamicForm(href,method);this.send({},f.action,f.method,target,null,null,f);},sendLink:function(href,target,method){var openInNewWindow=mstrmojo.array.indexOf(["_new","_blank"],target)>-1,isInternalUrl=!mstrmojo.isUrlExternal(href);if(!openInNewWindow&&isInternalUrl){mstrApp.showWait&&mstrApp.showWait({showCancel:true,onCancel:mstrApp.hideWait});}if(!mstrmojo.isUrlExternal(href)){mstrmojo.form.sendLinkAsForm(href,target,method);}else{if(openInNewWindow){window.open(href);}else{window.location.href=href;}}},send:function send(params,action,method,target,config,addUxts,form){var doc=((config&&config.hWin)||window).document,f=form||doc.createElement("form"),app=mstrApp;params=mstrmojo.addCSRFTokenToTaskParams(params);f.method=method||"POST";if(target){f.target=target;}f.action=action||app.name;addUxts=(addUxts!==undefined)?addUxts:!(f.action&&f.action.indexOf("aspx")>0)&&mstrConfig.addTimeStampToPreventCaching;if(!!app.addJSessionIdToURL&&app.httpSessionId){f.action+=";jsessionid="+app.httpSessionId;}if(addUxts){f.action+=";uxts"+mstrmojo.now();}f.appendChild(createInput(doc,"xts",String(mstrmojo.now())));var key,temp_params=app.persistTaskParams||microstrategy.persistParams;for(key in temp_params){params[key]=temp_params[key];}if(app.servletState&&app.name){params[app.name]=app.servletState;}if(params){var n;for(n in params){if(params[n].constructor===Array){mstrmojo.array.forEach(params[n],function(item){f.appendChild(createInput(doc,n,item));});}else{f.appendChild(createInput(doc,n,params[n]));}}}doc.body.appendChild(f);try{f.submit();}catch(ex){if(target&&ex.result===2147500037&&!window.open("","","width=1,height=1,left=0,top=0,scrollbars=no")){mstrmojo.alert("*This action requires popups to be allowed in the browser.*");}else{mstrmojo.err("Form submission failed for an unknown reason.");}}doc.body.removeChild(f);},addURLAsHiddenInputsToForm:addURLAsHiddenInputsToForm};}());