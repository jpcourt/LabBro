function getValidity(value, inputType, mandatoryStatus){
	if(value == "" && parseInt(value) != 0){
		if(mandatoryStatus){
			return "mandatory";
		}else{
			return "optional";
		}
	}else{
		switch(inputType){
			case 'automaticNumerotation' :
			case 'fixedValue' : 
			case 'freeText' :
				return "OK";
				break;
			case 'loudness' :
				if(isNaN(value)){
					return "KO";
				}else{
					if(parseInt(value) < 0){
						return "OK";
					}else{
						return "KO";
					}
				}
				break;
			case 'integer' :
				if(isNaN(value)){
					return 'KO';
				}else{
					return 'OK';
				}
				break;
			case 'integer10' :
				if(isNaN(value) || value > 9999999999){
					return 'KO';
				}else{
					return 'OK';
				}
				break;
			
			case 'timeCode' :
				var splitValue = value.split(":");
				if(splitValue.length != 4){
					return "KO";
				}else{
					if(
						(parseInt(splitValue[0]) >= 0 && parseInt(splitValue[0]) < 24 && splitValue[0].length >= 1) &&
						(parseInt(splitValue[1]) >= 0 && parseInt(splitValue[1]) < 60 && splitValue[1].length == 2) &&
						(parseInt(splitValue[2]) >= 0 && parseInt(splitValue[2]) < 60 && splitValue[2].length == 2) &&
						(parseInt(splitValue[3]) >= 0 && parseInt(splitValue[3]) < 25 && splitValue[3].length == 2)
					){
						return "OK";
					}else{
						return "KO";
					}
				}
				break;
			case 'dropdown' :
				return "OK";
				break;
		}
	}
}

function buildXMLTitle(data){
	switch(data.fileDescriptionPart.broadcaster){
		case "CANAL+" :
			if(data.videoDescPart.resolution == "HD"){
				var canalResolRatio = "HD";
			}else{
				if(data.videoDescPart.aspectRatio == "4/3"){
					var canalResolRatio = "43";
				}else{
					var canalResolRatio = "16";
				}
			}
			return data.fileDescriptionPart.prodNumber+"_"+
			data.fileDescriptionPart.progNumber+"_"+
			data.fileDescriptionPart.versionType+"_"+
			canalResolRatio+"_"+
			sanitizeData(data.fileDescriptionPart.localProgramTitle, 20)+"_"+
			sanitizeData(data.fileDescriptionPart.fileProvider, 10)+"_"+
			data.fileDescriptionPart.revisionId;
			break;
		case "NRJ12" :
			return data.fileDescriptionPart.houseId+"_"+
			data.fileDescriptionPart.versionType+"_"+
			data.videoDescPart.resolution+"_"+
			sanitizeData(data.fileDescriptionPart.localProgramTitle, 20)+"_"+
			sanitizeData(data.fileDescriptionPart.fileProvider, 10)+"_"+
			data.fileDescriptionPart.revisionId;
			break;
		case "NRJHITS" :
		case "CHERIE25" :
			return data.fileDescriptionPart.houseId+"_"+
			sanitizeData(data.fileDescriptionPart.localProgramTitle, 20)+"_"+
			sanitizeData(data.fileDescriptionPart.fileProvider, 10)+"_"+
			data.fileDescriptionPart.revisionId;
			break;
		case "TF1" :
		case "M6" :
			return data.fileDescriptionPart.houseId;
			break;
	}
}

function sanitizeData(rawData, length){
	var i = 0;
	var cleanData = "";
	while(i < rawData.length && cleanData.length < length){
		if(rawData.charAt(i).match(/[a-z,0-9]/i)){
			cleanData += rawData.charAt(i);
		}
		i++;
	}
	// A COMPLETER
	return cleanData;
}

function evalDuration(tcA, tcB){
	return convertIntToTc(convertTcToInt(tcB) - convertTcToInt(tcA) + 1);
}

function convertTcToInt(tcA){
	var splittedTcA = tcA.split(":");
	return (( parseInt(splittedTcA[0]) * 60 + parseInt(splittedTcA[1]) ) * 60 +parseInt(splittedTcA[2]) ) * 25 + parseInt(splittedTcA[3]);
}

function convertIntToTc(intA){
	var splittedTcA = [];
	splittedTcA[3] = intA % 25;
	splittedTcA[2] = ((intA - splittedTcA[3]) / 25) % 60;
	splittedTcA[1] = ((intA - splittedTcA[3] - splittedTcA[2] * 25) / (25*60)) % 60;
	splittedTcA[0] = ((intA - splittedTcA[3] - splittedTcA[2] * 25 - splittedTcA[1] * 25 * 60) / (25*60*60));
	for(var i = 0; i < 4; i++){
		if(splittedTcA[i].toString().length == 1){
			splittedTcA[i] = "0"+splittedTcA[i];
		}
	}
	return splittedTcA.join(":");
}

function getLayoutZone(partId){
	var res = "";
	layoutConfig.forEach(function(zone){
		if(zone.content.indexOf(partId) != -1){
			res = zone.id;
		}
	});
	return res;
}