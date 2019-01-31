(function(){var $ARR=mstrmojo.array,ENUM_MENU_ACTIONS={NONE:0,EDIT:1,DELETE:2};function handleQueryFn(fnName,item){var data=this.data,queryData=(data&&data.length)?data[0]:data;return(queryData&&queryData[fnName])?queryData[fnName](data,item):true;}mstrmojo.qb.menu.SimpleGridMenu=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.qb.menu.SimpleGridMenu",dynamicUpdate:true,queryEnabled:function queryEnabled(item){return handleQueryFn.call(this,"isEnabled",item);},queryVisible:function queryVisible(item){return handleQueryFn.call(this,"isVisible",item);},queryChecked:function queryChecked(item){return handleQueryFn.call(this,"isChecked",item);},executeCommand:function executeCommand(item){var data=this.data,rootController=mstrApp.getRootController();switch(item.action){case ENUM_MENU_ACTIONS.EDIT:rootController.editColumn(data);break;case ENUM_MENU_ACTIONS.DELETE:rootController.deleteColumn(data);break;}},getMenuConfig:function getMenuConfig(menuItems){var menuCfg=new mstrmojo.ui.menus.MenuConfig({menuCssClass:"mstrmojo-qb-simplegrid-menu"}),allAvailableMenuItems=menuItems||this.cm,gridMenu=this;$ARR.forEach(allAvailableMenuItems,function(menuItem){if(this.queryVisible(menuItem)){var cssClasses=["xt "+(menuItem.icn||"")],execFn=function execFn(){gridMenu.executeCommand(menuItem);};menuCfg.addMenuItem(menuItem.n||"",cssClasses.join(" "),execFn);}},this);return menuCfg;},cm:[{action:ENUM_MENU_ACTIONS.EDIT,n:mstrmojo.desc(1088,"Edit"),icn:"edit"},{action:ENUM_MENU_ACTIONS.DELETE,n:mstrmojo.desc(629,"Delete"),icn:"del"}]});}());