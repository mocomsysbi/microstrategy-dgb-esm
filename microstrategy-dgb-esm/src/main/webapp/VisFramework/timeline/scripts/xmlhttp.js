SimileAjax.XmlHttp=new Object();SimileAjax.XmlHttp._onReadyStateChange=function(xmlhttp,fError,fDone){switch(xmlhttp.readyState){case 4:try{if(xmlhttp.status==0||xmlhttp.status==200){if(fDone){fDone(xmlhttp);}}else{if(fError){fError(xmlhttp.statusText,xmlhttp.status,xmlhttp);}}}catch(e){SimileAjax.Debug.exception("XmlHttp: Error handling onReadyStateChange",e);}break;}};SimileAjax.XmlHttp._createRequest=function(){if(SimileAjax.Platform.browser.isIE){var programIDs=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];for(var i=0;i<programIDs.length;i++){try{var programID=programIDs[i];var f=function(){return new ActiveXObject(programID);};var o=f();SimileAjax.XmlHttp._createRequest=f;return o;}catch(e){}}}try{var f=function(){return new XMLHttpRequest();};var o=f();SimileAjax.XmlHttp._createRequest=f;return o;}catch(e){throw new Error("Failed to create an XMLHttpRequest object");}};SimileAjax.XmlHttp.get=function(url,fError,fDone){var xmlhttp=SimileAjax.XmlHttp._createRequest();xmlhttp.open("GET",url,true);xmlhttp.onreadystatechange=function(){SimileAjax.XmlHttp._onReadyStateChange(xmlhttp,fError,fDone);};xmlhttp.send(null);};SimileAjax.XmlHttp.post=function(url,body,fError,fDone){var xmlhttp=SimileAjax.XmlHttp._createRequest();xmlhttp.open("POST",url,true);xmlhttp.onreadystatechange=function(){SimileAjax.XmlHttp._onReadyStateChange(xmlhttp,fError,fDone);};xmlhttp.send(body);};SimileAjax.XmlHttp._forceXML=function(xmlhttp){try{xmlhttp.overrideMimeType("text/xml");}catch(e){xmlhttp.setrequestheader("Content-Type","text/xml");}};