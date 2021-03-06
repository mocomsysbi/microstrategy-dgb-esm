(function(){function xmlToJSON(node){var i,obj={};for(i=0;i<node.attributes.length;i++){var attribute=node.attributes[i];obj[attribute.nodeName]=attribute.value;}for(i=0;i<node.childNodes.length;i++){var child=node.childNodes[i],childName;if(child.nodeType===1){childName=child.localName;obj[childName]=obj[childName]||[];obj[childName].push(xmlToJSON(child));}}return obj;}function parseXML(xmlString){var parser=new window.DOMParser();return parser.parseFromString(xmlString,"text/xml");}mstrmojo.XMLParser=mstrmojo.declare(null,null,{xml2DOM:function parse(xmlString){return parseXML(xmlString);},xml2Object:function xml2Object(xmlString){var xmlDoc=parseXML(xmlString);if(xmlDoc){return xmlToJSON(xmlDoc.documentElement);}return null;},file2Object:function file2Object(filePath){var xmlString=mstrmojo.loadFileSync(filePath);if(xmlString){return this.xml2Object(xmlString);}return null;}});}());