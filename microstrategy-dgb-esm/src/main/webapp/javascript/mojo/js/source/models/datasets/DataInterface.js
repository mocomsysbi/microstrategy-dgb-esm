(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash");var $ARR=mstrmojo.array,$HASH=mstrmojo.hash;mstrmojo.models.datasets.DataInterface=mstrmojo.provide("mstrmojo.models.datasets.DataInterface",{getFormsByAttrId:function getFormsByAttrId(attributeID,datasets){var attributeForms=[];datasets=datasets||[];$HASH.forEach(datasets,function(ds){$ARR.forEach(ds.att||[],function(at){if(at.did===attributeID){attributeForms=attributeForms.concat(at.fs||[]);return false;}});});attributeForms=$ARR.filter(attributeForms,function(f){return !!f.obf;});return $ARR.distinct(attributeForms,"fid");}});}());