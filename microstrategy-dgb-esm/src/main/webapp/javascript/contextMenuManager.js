mstrContextMenuManagerImpl.prototype=new Object();contextMenuManagerScript=true;mstrContextMenuManagerImpl.prototype.id=null;mstrContextMenuManagerImpl.prototype.dynamic_menus=new Array;mstrContextMenuManagerImpl.prototype.menu_items=new Array;microstrategy.contextMenuManagers=new Array;microstrategy.unloadContextMenuManager=function(key){for(var i=0;i<microstrategy.contextMenuManagers.length;i++){if(microstrategy.contextMenuManagers[i].id==key){microstrategy.contextMenuManagers.splice(i,1);}}};microstrategy.getContextMenuManager=function(key){for(var i=0;i<microstrategy.contextMenuManagers.length;i++){if(microstrategy.contextMenuManagers[i].id==key){return microstrategy.contextMenuManagers[i];}}var cmm=new mstrContextMenuManagerImpl(key);microstrategy.contextMenuManagers.push(cmm);return cmm;};mstrContextMenuManagerImpl.prototype.getMenu=function(key){var i,j;try{if(key){for(i=0;i<this.dynamic_menus.length;i++){if(this.dynamic_menus[i]!=null){if(this.dynamic_menus[i][0]==key){return new mstrContextMenuImpl(this.id,this.menu_items,this.dynamic_menus[i][1]);}}}}var size=this.dynamic_menus.length;this.dynamic_menus[size]=new Array;this.dynamic_menus[size][0]=key;this.dynamic_menus[size][1]=new Array;return new mstrContextMenuImpl(this.id,this.menu_items,this.dynamic_menus[size][1]);}catch(err){microstrategy.errors.log(err);return false;}};mstrContextMenuManagerImpl.prototype.findMenuItem=function(label,subMenu){try{var result=new Array();if(subMenu!=null){for(i=0;i<subMenu.length;i++){if(this.menu_items[subMenu[i]][0]==label){result.push(this.menu_items[subMenu[i]]);}}}else{for(i=0;i<this.menu_items.length;i++){if(this.menu_items[i][0]==label){result.push(this.menu_items[i]);}}}return result;}catch(err){microstrategy.errors.log(err);return false;}};function mstrContextMenuManagerImpl(key){try{if(key){if(window[key]!==undefined){this.menu_items=window[key];}if(window[key+"_dyn"]!==undefined){this.dynamic_menus=window[key+"_dyn"];}this.id=key;}return this;}catch(err){microstrategy.errors.log(err);return false;}}