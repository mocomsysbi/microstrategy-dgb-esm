(function(){mstrmojo.requiresCls("mstrmojo.PerformanceLogOutput");var isPremier=false,premiereKey=null,mstrLang=null,mstrRegion=null,trialKey=null,channel=null,$GOOGLE_VERSION="quarterly",$PerfLog=mstrmojo.PerformanceLogOutput;mstrmojo.gmaps.basemap._CanLoadGoogleMapScript=mstrmojo.provide("mstrmojo.gmaps.basemap._CanLoadGoogleMapScript",{_mixinName:"mstrmojo.gmaps.basemap._CanLoadGoogleMapScript",callback:null,setPremiere:function setPremiere(val){isPremier=val;},isPremiere:function isPremiere(){return isPremier;},setPremiereKey:function setPremiereKey(id){premiereKey=id;},getPremiereKey:function getPremiereKey(){return premiereKey;},setTrialKey:function setTrialKey(id){trialKey=id;},getTrialKey:function getTrialKey(){return trialKey;},setLocaleLang:function setLocaleLang(lang){mstrLang=lang;},getLocaleLang:function getLocaleLang(){return mstrLang;},setLocaleRegion:function setLocaleRegion(region){mstrRegion=region;},getLocaleRegion:function getLocaleRegion(){return mstrRegion;},setChannel:function setChannel(val){channel=val;},getChannel:function getChannel(){return channel;},loadExternalScript:function loadScript(callBackFunc){$PerfLog.visPrint("Load Google Map modules start");timerid_loadExternalScript=$PerfLog.startTimer({functionName:"_CanLoadGoogleMapScript.loadExternalScript: ",purpose:"load Google external script"});var urlBase,_channel=this.getChannel();if(window.location.protocol==="https:"){urlBase="https://maps-api-ssl.google.com/maps/api/js?v="+$GOOGLE_VERSION+"&libraries=drawing,geometry";}else{urlBase="http://maps.google.com/maps/api/js?v="+$GOOGLE_VERSION+"&libraries=drawing,geometry";}urlBase+="&language="+this.getLocaleLang()+"&region="+this.getLocaleRegion();if(this.isPremiere()){urlBase=urlBase+"&client="+this.getPremiereKey();}else{urlBase=urlBase+"&key="+this.getTrialKey();}if(!!_channel){urlBase+="&channel="+_channel;}this.callback=callBackFunc;mstrmojo._LoadsScript.requiresExternalScripts([{url:urlBase,callbackParamName:"callback",forceReload:true,onError:{callback:this.loadMap,params:mstrmojo.gmaps}}],this.loadMainModule,this);},loadMainModule:function loadMainModule(){var me=this,intervalId;mstrmojo.googleMapLibLoaded=true;if(mstrmojo._LoadsScript.esScritsContext===this){mstrmojo._LoadsScript.esScritsContext=null;}$PerfLog.endTimer("timerid_callback_LoadMainModule");$PerfLog.endTimer(timerid_loadExternalScript);$PerfLog.visPrint("load Google external script end");intervalId=window.setInterval(function(){window.clearInterval(intervalId);me.loadMap(mstrmojo.gmaps);},50);},loadCoreCss:function loadCoreCss(){var currentStyles=document.styleSheets;if(currentStyles){var i,style;for(i=0;i<currentStyles.length;i++){style=currentStyles[i];if(style.id==="mojocore"){return ;}}}var css=document.createElement("link");css.setAttribute("rel","stylesheet");css.setAttribute("type","text/css");css.setAttribute("href",mstrmojo.getJsRoot()+"mojo/css/core.css"+((window.mstrConfig&&mstrConfig.webVersion)?"?v="+mstrConfig.webVersion:""));css.setAttribute("id","mojocore");document.getElementsByTagName("head")[0].appendChild(css);}});}());