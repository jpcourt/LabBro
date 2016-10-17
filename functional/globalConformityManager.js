function checkConformity(data, config, language){
	var nonConformityList = [];
	//Vérification de la conformité générale des données (données conformes selon leur type, et données obligatoires présentes)
	Object.getOwnPropertyNames(data).forEach(function(partId){
		Object.getOwnPropertyNames(data[partId]).forEach(function(metaId){
			if(metaId == "children"){
				for(var i = 0; i < data[partId]["children"].length; i++){
					Object.getOwnPropertyNames(data[partId]["children"][i]).forEach(function(metaId){
						var value = data[partId]["children"][i][metaId];
						var meta = config[partId].childrenTemplate.content[metaId];
						switch(getValidity(value, meta.inputType, meta.mandatory)){
							case "KO" :
								nonConformityList.push("- "+meta.labels[language]+" n° "+(i+1)+" : "+globalLabels['nonCompliantData'][language]);
								break;
							case "mandatory" :
								nonConformityList.push("- "+meta.labels[language]+" n° "+(i+1)+" : "+globalLabels['absentData'][language]);
								break;
						}
					});
				}
			}else{
				var value = data[partId][metaId];
				var meta = config[partId].content[metaId];
				switch(getValidity(value, meta.inputType, meta.mandatory)){
					case "KO" :
						nonConformityList.push("- "+meta.labels[language]+" : "+globalLabels['nonCompliantData'][language]);
						break;
					case "mandatory" :
						nonConformityList.push("- "+meta.labels[language]+" : "+globalLabels['absentData'][language]);
						break;
				}
			}
		});	
	});
	// Vérification spécifiques sur la cohérence des TC
	if(convertTcToInt(data["techInfoPart"]["tcInFile"]) >= convertTcToInt(data["techInfoPart"]["tcOutFile"])){
		nonConformityList.push("- TC in et out du fichier incohérents");
	}
	if(convertTcToInt(data["techInfoPart"]["tcInProg"]) >= convertTcToInt(data["techInfoPart"]["tcOutProg"])){
		nonConformityList.push("- TC in et out du programme incohérents");
	}
	if(convertTcToInt(data["techInfoPart"]["tcInFile"]) > convertTcToInt(data["techInfoPart"]["tcInProg"])){
		nonConformityList.push("- TC in du programme inférieur au TC in du fichier");
	}
	if(convertTcToInt(data["techInfoPart"]["tcOutFile"]) < convertTcToInt(data["techInfoPart"]["tcOutProg"])){
		nonConformityList.push("- TC out du programme supérieur au TC out du fichier");
	}
	if(data["segmentationPart"]["partNumber"] > 1){
		if(data["segmentationPart"]["children"][0]["tcIn"] != data["techInfoPart"]["tcInProg"]){
			nonConformityList.push("- TC in la 1e partie incohérent avec le TC in du programme");
		}
		if(data["segmentationPart"]["children"][data["segmentationPart"]["children"].length-1]["tcOut"] != data["techInfoPart"]["tcOutProg"]){
			nonConformityList.push("- TC out de la dernière partie incohérent avec le TC out du programme");
		}
		data["segmentationPart"]["children"].forEach(function(segment){
			if(segment["tcIn"] >= segment["tcOut"]){
				nonConformityList.push("- TC in et out de la partie "+(data["segmentationPart"]["children"].indexOf(segment)+1)+" incohérents");
			}
		});
		for(var i = 0; i < data["segmentationPart"]["children"].length-1; i++){
			if(convertTcToInt(data["segmentationPart"]["children"][i]["tcOut"])+1 != convertTcToInt(data["segmentationPart"]["children"][i+1]["tcIn"])){
				nonConformityList.push("- TC out de la partie "+(i+1)+" incohérent avec le TC in de la partie "+(i+2) );
			}
		}
	}
	// Vérification spécifique sur l'exploitation des pistes audio
	if(data["videoDescPart"]["resolution"] == "SD" && data["audioDescPart"]["channelNumber"] != 8){
		nonConformityList.push("- Un fichier SD doit nécessairement posséder 8 canaux (qui peuvent être non exploités)");
	}
	if(data["techInfoPart"]["fileSpec"] == "AS10" && data["audioDescPart"]["channelNumber"] != 8){
		nonConformityList.push("- Un fichier HD suivant la spécification AS10 doit nécessairement posséder 8 canaux (qui peuvent être non exploités)");
	}
	var audioConformity = checkAudioConformity(data["fileDescriptionPart"]["versionType"], data["videoDescPart"]["resolution"], data["audioDescPart"]["children"]);
	if(audioConformity.conformityCheck == "ko"){
		nonConformityList.push(audioConformity.conformityMessage);
	}
	// Vérification spécifique sur la résolution de la vidéo
	if(data["videoDescPart"]["resolution"] == "SD"){
		switch(data["videoDescPart"]["aspectRatio"]){
			case "16/9" :
				if(["1.66", "1.77", "1.85", "2.35"].indexOf(data["videoDescPart"]["picFormat"]) == -1){
					nonConformityList.push("- Le format d'image "+data["videoDescPart"]["picFormat"]+" n'est pas autorisé pour une vidéo "+data["videoDescPart"]["resolution"]+" "+data["videoDescPart"]["aspectRatio"]);
				}
				break;
			case "4/3" :
				if(data["videoDescPart"]["picFormat"] != "1.33"){
					nonConformityList.push("- Le format d'image "+data["videoDescPart"]["picFormat"]+" n'est pas autorisé pour une vidéo "+data["videoDescPart"]["resolution"]+" "+data["videoDescPart"]["aspectRatio"]);
				}
				break;
		}
	}else{
		if(["1.33", "1.66", "1.77", "1.85", "2.35"].indexOf(data["videoDescPart"]["picFormat"]) == -1){
			nonConformityList.push("- Le format d'image "+data["videoDescPart"]["picFormat"]+" n'est pas autorisé pour une vidéo "+data["videoDescPart"]["resolution"]);
		}
	}
	return nonConformityList;
}