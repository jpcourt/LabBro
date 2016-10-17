var layoutConfig = [
	{
		"id" : 1,
		"comment" : "left panel",
		"content" : [
			"fileDescriptionPart",
			"techInfoPart"
		]
	},
	{
		"id" : 2,
		"comment" : "middle panel",
		"content" : [
			"videoDescPart",
			"segmentationPart",
			"subTitlePart"
		]
	},
	{
		"id" : 3,
		"comment" : "right panel",
		"content" : [
			"audioDescPart"
		]
	}
];

function getLayoutZone(partId){
	var res = "";
	layoutConfig.forEach(function(zone){
		if(zone.content.indexOf(partId) != -1){
			res = zone.id;
		}
	});
	return res;
}