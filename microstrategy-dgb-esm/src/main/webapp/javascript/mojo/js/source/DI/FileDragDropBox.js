(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.Label","mstrmojo.DI.DIHelpers");mstrmojo.requiresDescs(1064,1825,13252,12813,12814,13142,13143,2121,14135,12741,14142,14622,14623,14792,14793,15339);var constants=mstrmojo.DI.DIConstants,$DOM=mstrmojo.dom,$ARR=mstrmojo.array,$CSS=mstrmojo.css,$FUNC=mstrmojo.func,$HELPER=mstrmojo.DI.DIHelpers,MAX_FILE_SIZE=4*1024*1024,MAX_UPLOAD_SIZE=4*1024*1024*1024;var fileObjectConfig={scriptClass:"mstrmojo.Container",slot:"tableNode",cssClass:"",markupString:"<div class='mstrmojo-FileDragDropBox-file {@cssClass}' mstrAttach:click ><div></div><div></div><div></div></div>",markupSlots:{containerNode:function(){return this.domNode;},deleteNode:function(){return this.domNode.children[0];},imageNode:function(){return this.domNode.children[1];},contentNode:function(){return this.domNode.children[2];}},name:"",isFailed:false,children:[{scriptClass:"mstrmojo.Label",alias:"fileName",slot:"contentNode",cssClass:"mstrmojo-FileDragDropBox-file-name"},{scriptClass:"mstrmojo.Button",slot:"deleteNode",cssClass:"mstrmojo-file-delete-button",innerIconClass:"close-button"},{slot:"imageNode",alias:"fileImg",cssClass:"mstrmojo-FileDragDropBox-file-img",scriptClass:"mstrmojo.Label"}],preBuildRendering:function(){if(this._super){this._super();}this.fileName.set("text",this.name);},onclick:function(evt){var fileObject=this;var originalSrc=evt.e.srcElement||evt.e.target,dndBox=this.parent;if(originalSrc.className!=="mstrmojo-Button-text close-button"){return ;}var afterDelete=function(){var index=-1,i;var files=dndBox.files;if(!fileObject.isFailed){for(i=0;i<files.length;i++){if(!$HELPER.isOnetier()){if(files[i].name===fileObject.name){index=i;break;}}else{if(files[i]===fileObject.file){index=i;break;}}}if(index>=0){files.splice(index,1);}if(!($HELPER.isOnetier()||$HELPER.isWS())){dndBox.fileNode.value="";}dndBox.set("files",files);}else{if(--dndBox.failedFilesCount<0){dndBox.failedFilesCount=0;}if(!($HELPER.isOnetier()||$HELPER.isWS())){dndBox.fileNode.value="";}}dndBox.removeChildren(fileObject);};var tableID=this.tableID;if(tableID){var cb={success:function(res){if(res&&res.msgid){mstrApp.getRootController().dataService.set("messageID",res.msgid);}mstrApp.getRootController().model.resetImportSource(tableID);afterDelete();},failure:function(){mstrApp.getRootController().displayError(mstrmojo.desc(13142,"Delete file error."));}};var params={did:this.tableID,progressText:mstrmojo.desc(13143,"Deleting file...")};mstrApp.getRootController().removeEMMASourceTable(cb,params);}else{afterDelete();}}};var urlObjectConfig={scriptClass:"mstrmojo.Container",slot:"tableNode",cssClass:"",markupString:"<div class='mstrmojo-url-list {@cssClass}' mstrAttach:click ><div></div><div></div><div></div></div>",markupSlots:{containerNode:function(){return this.domNode;},deleteNode:function(){return this.domNode.children[0];},imageNode:function(){return this.domNode.children[1];},contentNode:function(){return this.domNode.children[2];}},allowEdit:true,url:"",dbr:"",children:[{slot:"contentNode",alias:"text",cssClass:"urlItem-text-div",scriptClass:"mstrmojo.InlineEditBox",rename:function(){if(this.editMode!==this.allowEdit){this.set("editMode",this.allowEdit);}},onSave:function(){this.parent.set("url",this.inputNode.value);this.parent.parent.raiseEvent({name:"urlChanged",src:this,url:this.url});},bindings:{text:"this.parent.url"}},{slot:"contentNode",scriptClass:"mstrmojo.Label",cssClass:"urlItem-dbrole",bindings:{text:"this.parent.dbr"}},{scriptClass:"mstrmojo.Button",slot:"deleteNode",cssClass:"mstrmojo-url-delete-button",innerIconClass:"close-button"},{slot:"imageNode",alias:"fileImg",cssClass:"mstrmojo-FileDragDropBox-file-img",scriptClass:"mstrmojo.Label"}],onclick:function(evt){var urlObject=this;var originalSrc=evt.e.srcElement||evt.e.target;if(originalSrc.className!=="mstrmojo-Button-text close-button"){return ;}var i;var afterDelete=function(){var urls=urlObject.parent.urls;var dbrs=urlObject.parent.dbrs;for(i=0;i<urls.length;i++){if(urls[i]===urlObject.url){if(urlObject.parent.urlTableID){delete urlObject.parent.urlTableID[urls[i]];}urls.splice(i,1);if(dbrs&&dbrs.length>i){dbrs.splice(i,1);}break;}}urlObject.parent.set("urls",urls.concat());urlObject.parent.removeChildren(urlObject);};var tableID=this.tableID;if(this.tableID){var cb={success:function(res){if(res&&res.msgid){mstrApp.getRootController().dataService.set("messageID",res.msgid);}mstrApp.getRootController().model.resetImportSource(tableID);afterDelete();},failure:function(){mstrApp.getRootController().displayError(mstrmojo.desc(13142,"Delete file error."));}};var params={did:this.tableID,progressText:mstrmojo.desc(13143,"Deleting file...")};mstrApp.getRootController().removeEMMASourceTable(cb,params);}else{afterDelete();}}};function isValidFile(transferObj){var rootCtrl=mstrApp.getRootController(),size=transferObj.size,fileNameSplit=transferObj.name.split("."),fileExt;if(size===0){rootCtrl.displayError(mstrmojo.desc(13252,"The import process cannot proceed with an empty file"));return false;}if(size>MAX_UPLOAD_SIZE&&!$HELPER.isOnetier()){rootCtrl.displayError(mstrmojo.desc(14792,"Files larger than 4GB are only supported through Data from URL connector"),false,mstrmojo.desc(14793,'The "File from Disk" connector only allows users to upload files that are upto 4GB in size. For files that are larger, please place the file on a webserver or a network location and use the "Data from URL" connector to access the file.'));return false;}fileExt=fileNameSplit[fileNameSplit.length-1].toLowerCase();if(size%4096===0&&!transferObj.type&&!(fileExt==="sas7bdat"||fileExt==="xls")){rootCtrl.displayError(mstrmojo.desc(14135,"The import process cannot proceed with a folder"));return false;}return true;}function addFiletoBox(files){var currFiles=this.files,i=0,fileTable;var operationMode=this.parent.operationMode;var model=mstrApp.getRootController().model;var currentSource=this.parent.currentSource||model.currentSource;var partition=currentSource&&currentSource.sourceInfo.partition;if(operationMode!==constants.operationMode.create&&!model.isAddingNewTable){this.removeChildren();currFiles=[];this.failedFilesCount=0;}for(i=0;i<files.length;i++){if(isValidFile(files[i])){currFiles.push(files[i]);var name=mstrmojo.DI.DIHelpers.truncate(files[i].name,60,true);fileObjectConfig.name=name;fileTable=this.addChildren(mstrmojo.insert(fileObjectConfig));fileTable.render();}}this.set("files",currFiles);this.textNode.style.display="none";}mstrmojo.DI.FileDragDropBox=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.DI.FileDragDropBox",action:mstrConfig.taskURL,markupString:'<div ><form target="{@id}_iframe" enctype="multipart/form-data" method="post" action="{@action}"><div class="mstrmojo-di-fileHolder {@cssClass}" mstrAttach:dragover,dragleave,drop,click><div class="mstrmojo-FileDragDropBox-text {@textcssClass}">{@text}</div><div class="mstrmojo-FileDragDropBox-content {@maxHeight}"></div><div class="mstrmojo-FileDragDropBox-count"></div></div><div class="mstrmojo-di-dragLabel">{@descriptor}<div class="or">'+mstrmojo.desc(1064,"or")+'</div></div><div class="mstrmojo-FileDragDropBox-buttonDiv"><div class="mstrmojo-Button mstrmojo-di-button mstrmojo-WebButton hot file-button"><div class="mstrmojo-Button-text">{@browseLabel}</div></div><div><input class="mstrmojo-FileUploadBox-file" id="file'+this.id+'upload" type="file" accept=".csv,.txt,.xlsx,.xls,.json,.sas7bdat,.tsv,.prn" {@multiple} size="30" style="font-size:4em;" name="{@fileFieldName}" onchange="mstrmojo.all.{@id}.synFile();"/><label for="file'+this.id+'upload" style="width:100px;height:30px;position:absolute;opacity:0;">hackForNoFileChosenTooltip</label></div></div><div style="display:none;"></div></form><iframe id="{@id}_iframe" + name="{@id}_iframe" style="display:none;" src="about:blank"></iframe></div>',markupSlots:{formNode:function(){return this.domNode.firstChild;},dnDNode:function(){return this.domNode.firstChild.children[0];},textNode:function(){return this.domNode.firstChild.children[0].children[0];},tableNode:function(){return this.domNode.firstChild.children[0].children[1];},countNode:function(){return this.domNode.firstChild.children[0].children[2];},dragLabelNode:function(){return this.domNode.firstChild.children[1];},buttonNode:function(){return this.domNode.firstChild.children[2];},inputNode:function(){return this.domNode.firstChild.children[2].lastChild;},fileNode:function(){return this.domNode.firstChild.children[2].lastChild.firstChild;},paramsNode:function(){return this.domNode.firstChild.children[3];}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";this.buttonNode.style.display=this.fileUpload?"block":"none";this.textNode.style.display=this.fileUpload?"block":"none";this.dragLabelNode.style.display=this.fileUpload?"block":"none";}},visible:true,files:[],failedFilesCount:0,urls:[],dbrs:[],allFileNode:[],fileFieldName:"myFile",descriptor:mstrmojo.desc(15339,"Drag and drop files here"),text:mstrmojo.desc(12691,"Data can be in crosstab or tabular format"),browseLabel:mstrmojo.desc(13865,"Choose files"),multiple:"",droppable:true,fileUpload:true,jsonp:"parent.mstrmojo.all.{@id}.uploadCallback(@R@)",adjustSize:function adjustSize(size){if(size.urlpage){this.dnDNode.style.width=size.w;this.dnDNode.style.height=size.h;return ;}var width=parseInt(size.w,10);var height=parseInt(size.h,10);if(isNaN(width)){return ;}this.dnDNode.style.width=width-60+"px";if(!!mstrApp.isWorkstation){this.dnDNode.style.height=height-105-(constants.workstation.utils.shouldShowTitleBar()?35:0)+"px";this.buttonNode.style.top=height-160+"px";}this.dragLabelNode.style.width=width+"px";this.buttonNode.style.left=width/2-(this.buttonNode.clientWidth/2+10)+"px";},init:function init(props){this._super(props);if(!!mstrApp.isWorkstation&&!mstrApp.isPopup){this.set("maxHeight","maxHeightStandLone");}else{if(!!mstrApp.isWorkstation&&!!mstrApp.isPopup){this.set("maxHeight","maxHeightEmbed");}}},postCreate:function(){if(this._super){this._super();}this.files=[];this.urls=[];this.dbrs=[];if(($HELPER.isOnetier()||$HELPER.isWS())){this.set("text","");this.set("droppable",false);}if($DOM.isIE){if($DOM.isIE8||$DOM.isIE9){this.set("droppable",false);this.cssClass=this.cssClass+" solid";}}},postBuildRendering:function postBuildRendering(){if(this._super){this._super();}$DOM.detachEvent(this.fileNode,"mouseover",this.onmouseover);$DOM.detachEvent(this.fileNode,"mouseout",this.onmouseout);$DOM.attachEvent(this.fileNode,"mouseover",this.onmouseover);$DOM.attachEvent(this.fileNode,"mouseout",this.onmouseout);$DOM.detachEvent(this.fileNode,"mousedown",this.onmousedown);$DOM.detachEvent(this.fileNode,"mouseup",this.onmouseup);$DOM.attachEvent(this.fileNode,"mousedown",this.onmousedown);$DOM.attachEvent(this.fileNode,"mouseup",this.onmouseup);if(!!mstrApp.isWSStyling){$CSS.addClass(this.dnDNode,"solid");}},onmouseover:function onmouseover(evt){var node=$DOM.eventTarget(window,evt),widget=$DOM.findWidget(node),button=widget.buttonNode.firstChild;$CSS.addClass(button,"hover");$CSS.removeClass(button,"active");},onmouseout:function onmouseout(evt){var node=$DOM.eventTarget(window,evt),widget=$DOM.findWidget(node),button=widget.buttonNode.firstChild;$CSS.removeClass(button,"hover");},onmousedown:function onmousedown(evt){var node=$DOM.eventTarget(window,evt),widget=$DOM.findWidget(node),button=widget.buttonNode.firstChild;$CSS.addClass(button,"active");$CSS.removeClass(button,"hover");},onmouseup:function onmouseup(evt){var node=$DOM.eventTarget(window,evt),widget=$DOM.findWidget(node),button=widget.buttonNode.firstChild;$CSS.removeClass(button,"active");},ondragover:function ondragover(evt){if(!this.droppable){return ;}evt.e.stopPropagation();evt.e.preventDefault();mstrmojo.css.addClass(this.dnDNode,"dragging");mstrmojo.css.addClass(this.dragLabelNode,"dragging");},ondragleave:function ondragleave(){if(!this.droppable){return ;}this.className="";mstrmojo.css.removeClass(this.dnDNode,"dragging");mstrmojo.css.removeClass(this.dragLabelNode,"dragging");},ondrop:function ondrop(evt){if(!this.droppable){return ;}var e=evt.e;e.preventDefault();var files=e.dataTransfer.files;mstrmojo.css.removeClass(this.dnDNode,"dragging");mstrmojo.css.removeClass(this.dragLabelNode,"dragging");if(files){var model=mstrApp.getRootController().model,operationMode=model.operationMode;var currentSource=this.parent.currentSource||model.currentSource;var partition=currentSource&&currentSource.sourceInfo.partition;if(files.length>1&&operationMode!==constants.operationMode.create&&(!partition||!partition.isPartition&&!model.isAddingNewTable)){var headerNode=this.parent.parent.headerNode;var headerPos=mstrmojo.dom.position(headerNode);mstrmojo.notify(mstrmojo.desc(12741,"You can upload only one file when refresh a table."),{top:headerPos.y+headerPos.h+"px"});}else{addFiletoBox.call(this,files);}}},synFile:function(){var files=[],axFile;$DOM.detachEvent(this.fileNode,"mouseover",this.onmouseover);$DOM.detachEvent(this.fileNode,"mouseout",this.onmouseout);$DOM.detachEvent(this.fileNode,"mousedown",this.onmousedown);$DOM.detachEvent(this.fileNode,"mouseup",this.onmouseup);var fileNode=this.buttonNode.removeChild(this.inputNode);if(mstrmojo.dom.supports(mstrmojo.dom.htmlFeatures.FILE_READER)){files=this.fileNode.files;}else{try{var oas=new ActiveXObject("Scripting.FileSystemObject");axFile=oas.getFile(this.fileNode.value);var file={size:axFile.size,name:axFile.name,fileNode:fileNode};files.push(file);}catch(err){mstrApp.getRootController().displayError(mstrmojo.desc(14142,"Please enable ActiveX and put our website to the trust list to upload the file.Please try using Chrome, Firefox if you are still having problem with Internet Explorer."));}}if(files&&files.length>0){addFiletoBox.call(this,files);}this.inputNode=document.createElement("div");this.inputNode.innerHTML='<input class="mstrmojo-FileUploadBox-file" id="file'+this.id+'upload" type="file" accept=".csv,.txt,.xlsx,.xls,.json,.sas7bdat,.tsv,.prn"'+this.multiple+' size="30" style="font-size:4em;" name='+this.fileFieldName+' onchange="mstrmojo.all.'+this.id+'.synFile();"/>                 <label for="file'+this.id+'upload" style="width:100px;height:30px;position:absolute;opacity:0;">hackForNoFileChosenTooltip</label>';this.fileNode=this.inputNode.firstChild;this.buttonNode.appendChild(this.inputNode);$DOM.attachEvent(this.fileNode,"mouseover",this.onmouseover);$DOM.attachEvent(this.fileNode,"mouseout",this.onmouseout);$DOM.attachEvent(this.fileNode,"mousedown",this.onmousedown);$DOM.attachEvent(this.fileNode,"mouseup",this.onmouseup);},_set_urls:function(n,v){this.urls=v||[];this.toggleBorderSolid(this.files.length||this.urls.length);return true;},_set_files:function(n,v){this.files=v||[];this.toggleBorderSolid(this.files.length||this.urls.length);return true;},addURL:function(url){var urls=this.urls||[];urlObjectConfig.url=url;urlObjectConfig.dbr="";var urlList=this.addChildren(mstrmojo.insert(urlObjectConfig));urlList.render();urls.push(url);this.set("urls",urls);},addAuthURL:function(url,dbrole){var urls=this.urls||[];var dbrs=this.dbrs||[];urlObjectConfig.url=url;urlObjectConfig.dbr=dbrole.n;var urlList=this.addChildren(mstrmojo.insert(urlObjectConfig));urlList.render();urls.push(url);dbrs.push(dbrole);this.set("urls",urls);this.set("dbrs",dbrs);},addFile:function addFile(name,file){var files=this.files||[];fileObjectConfig.name=name;fileObjectConfig.file=file;var fileTable=this.addChildren(mstrmojo.insert(fileObjectConfig));fileTable.render();files.push(file);this.set("files",files);this.textNode.style.display="none";},submit:function(ps,callbacks,config){if($HELPER.isOnetier()){mstrApp.showProgress();mstrApp.getRootController().oneTierImportFile(callbacks,mstrmojo.hash.copy(ps,{datasource:this.files[ps.__index],dict:constants.backendSourceSubtype.localFile}));return ;}if(config.showProgress){mstrApp.showProgress(config);}function handleFileLoaded(e){var array=[];array.push(e.target.result);var blob=new Blob(array);mstrApp.upload(callbacks,ps,blob,config);}function handleFileLoadError(retRes){var res={code:0,message:mstrmojo.desc(12814,"Cannot read file content")};if(callbacks.failure){callbacks.failure(retRes||res);}if(callbacks.complete){callbacks.complete();}}var r=true;if(this.onsubmit){r=this.onsubmit();}if(r){ps=ps||{};ps.fileFieldName=this.fileFieldName;ps.jsonp=this.jsonp.replace("{@id}",this.id);if(mstrmojo.dom.supports(mstrmojo.dom.htmlFeatures.FILE_READER)){config=mstrmojo.hash.copy(config,{async:true});if(this.params){ps=this.params;}if(ps.__index!==undefined){(function(file){var filename=file.name,start;function uploadChunk(){var end,blob;ps.fileName=filename;ps.index++;end=Math.min(file.size,start+MAX_FILE_SIZE);blob=file.slice(start,end);if(ps.index===ps.numberOfChunks){mstrApp.upload(callbacks,ps,blob,config);}else{mstrApp.upload({success:function(){start=start+MAX_FILE_SIZE;uploadChunk();},failure:function(res){handleFileLoadError(res);}},ps,blob,config);}}if(file.size>MAX_FILE_SIZE){var numOfChunks=Math.ceil(file.size/MAX_FILE_SIZE);start=0;ps.index=0;ps.numberOfChunks=numOfChunks;ps.chunkSize=MAX_FILE_SIZE;ps.fileSize=file.size;ps.fileType="application/octet-stream";mstrApp.upload({success:function(){uploadChunk();},failure:function(res){handleFileLoadError(res);}},ps,null,config);}else{ps.fileName=filename;mstrApp.upload(callbacks,ps,file.slice(0,file.size),config);}})(this.files[ps.__index]);}else{var i;for(i=0;i<this.files.length;i++){var file=this.files[i];var filename=file.name;var reader=new FileReader();ps.fileName=filename;reader.onload=handleFileLoaded;reader.readAsArrayBuffer(file);}}}else{ps.taskEnv="jsonp2";var h=[],p;for(p in ps){h.push('<input type="hidden" name="'+p+'" value="'+mstrmojo.string.encodeHtmlString(ps[p].toString())+'"/>');}if(this.params){ps=this.params;for(p in ps){h.push('<input type="hidden" name="'+p+'" value="'+mstrmojo.string.encodeHtmlString(ps[p])+'"/>');}}this.buttonNode.removeChild(this.inputNode);this.buttonNode.appendChild(this.files[ps.__index].fileNode);this.inputNode=this.buttonNode.lastChild;this.paramsNode.innerHTML=h.join("");if(callbacks){this.onSuccess=callbacks.complete?$FUNC.composite([callbacks.success,callbacks.complete]):callbacks.success;this.onFailed=callbacks.complete?$FUNC.composite([callbacks.failure,callbacks.complete]):callbacks.failure;}this.formNode.submit();}this.set("status","loading");}},uploadCallback:function(d){var success=(d.status===200);if(success&&this.onSuccess){this.onSuccess(d);}if(!success&&this.onFailed){this.onFailed(d);}},preBuildRendering:function(){if(this._super){this._super();}this.attachEventListener("urlChanged",this.id,"updateURLs");},getFilesCnt:function(){var count=0;if(this.files){count=this.files.length;}return count;},getFileName:function(idx){var name="";if(idx<this.files.length){if($HELPER.isOnetier()){name=this.files[idx];}else{name=this.files[idx].name;}}return name;},getFileTableID:function(idx){if(this.urls&&idx<this.urls.length){return this.urlTableID&&this.urlTableID[this.urls[idx]];}if(this.files&&idx<this.files.length){return this.files[idx].tableID;}return null;},updatePageConfig:function(config){var i,child,cnt;var toRemovedChild=[];var tableID=config.properties.tableID;var currentSource=config.properties.model.importSources[tableID],partition,urls=[],newConfig,cssClass,me=this;if(config.name&&config.properties&&config.properties.sourceSubtype===constants.sourceSubtype.localFile){toRemovedChild=[];for(i=0;this.children&&i<this.children.length;i++){child=this.children[i];if(child.domNode&&child.domNode.parentNode===this.tableNode){toRemovedChild.push(child);}}cnt=toRemovedChild.length;for(i=0;i<cnt;i++){this.removeChildren(toRemovedChild[i]);}this.set("files",[]);config=mstrmojo.hash.copy(config,mstrmojo.hash.copy(fileObjectConfig));if(this.parent.getOperationMode()!==constants.operationMode.create){config.cssClass="fake";}if(!$HELPER.isOnetier()){this.set("files",[{name:config.properties.currentSource.fileName,tableID:config.properties.tableID}]);}else{config.file=config.name;this.set("files",[config.name]);}this.addChildren([mstrmojo.insert(config)]);mstrmojo.css.toggleClass(this.dnDNode,"refresh",this.parent.getOperationMode()===constants.operationMode.edit);mstrmojo.css.toggleClass(this.buttonNode,"refresh",this.parent.getOperationMode()===constants.operationMode.edit);this.textNode.style.display="none";}if(config.properties&&config.properties.sourceSubtype===constants.sourceSubtype.url){toRemovedChild=[];var url;if(currentSource){url=currentSource.sourceInfo.url;}for(i=0;this.children&&i<this.children.length;i++){child=this.children[i];if(child.domNode&&child.domNode.parentNode===this.tableNode){toRemovedChild.push(child);}}cnt=toRemovedChild.length;for(i=0;i<cnt;i++){this.removeChildren(toRemovedChild[i]);}this.set("urls",[]);partition=currentSource&&currentSource.sourceInfo.partition;if(partition&&partition.isPartition){$ARR.forEach(partition.tables,function(table){urls.push(table.name);});}else{if(url){urls.push(url);}}if(urls.length>0){this.set("visible",true);cssClass=(this.parent.getOperationMode()!==constants.operationMode.create)?"fake":"";$ARR.forEach(urls,function(url){newConfig=mstrmojo.hash.copy(config,mstrmojo.hash.copy(urlObjectConfig));newConfig.url=url;newConfig.cssClass=cssClass;me.addChildren([mstrmojo.insert(newConfig)]);});this.urlTableID={};}}},setFilesObject:function(files){var i,child,cnt;var toRemovedChild=[],cfg=mstrmojo.hash.copy(fileObjectConfig,{});for(i=0;this.children&&i<this.children.length;i++){child=this.children[i];if(child.domNode&&child.domNode.parentNode===this.tableNode){toRemovedChild.push(child);}}cnt=toRemovedChild.length;for(i=0;i<cnt;i++){this.removeChildren(toRemovedChild[i]);}this.set("files",[]);for(i=0;files&&i<files.length;i++){cfg.name=files[i];cfg.isFailed=true;this.addChildren([mstrmojo.insert(cfg)]);}this.failedFilesCount=files?files.length:0;},setURLsObject:function(urls){var i,child,cnt;var toRemovedChild=[];for(i=0;this.children&&i<this.children.length;i++){child=this.children[i];if(child.domNode&&child.domNode.parentNode===this.tableNode){toRemovedChild.push(child);}}cnt=toRemovedChild.length;for(i=0;i<cnt;i++){this.removeChildren(toRemovedChild[i]);}for(i=0;i<urls.length;i++){urlObjectConfig.url=urls[i];this.addChildren([mstrmojo.insert(urlObjectConfig)]);}this.set("urls",urls);},onclick:function(evt){var originalSrc=evt.e.srcElement||evt.e.target;var i,cnt=0,child;if(originalSrc.className!=="mstrmojo-Button-text close-button"){return ;}for(i=0;this.children&&i<this.children.length;i++){child=this.children[i];if(child.domNode&&child.domNode.parentNode===this.tableNode){cnt++;}}if(cnt===0&&this.fileUpload){this.textNode.style.display="block";}},getURLCnt:function(){if(this.urls){return this.urls.length;}else{return 0;}},updateItemsCount:function(cnt){if(cnt>1){this.countNode.style.display="block";$CSS.toggleClass(this.countNode,"countPosition",mstrApp.getRootController().rootView.currentPage.pageType===constants.pageType.file);}else{this.countNode.style.display="none";}this.countNode.textContent=mstrmojo.desc(2121,"Total")+": "+cnt;},onurlsChange:function(){this.updateItemsCount(this.getURLCnt());},onfilesChange:function(){this.updateItemsCount(this.getFilesCnt());},updateURLs:function(evt){var children=evt.src.children;var newURLs=[],i;for(i=0;i<children.length;i++){newURLs.push(children[i].url);}this.set("urls",newURLs);},toggleBorderSolid:function(solid){if(this.dnDNode){$CSS.toggleClass(this.dnDNode,"solid",solid);}}});}());