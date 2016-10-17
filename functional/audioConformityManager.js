function checkAudioConformity(programVersion, resolution, audioConfiguration){
	var conformityCheck;
	var conformityMessage = "";
	
	if(typeof conformityMatrix[resolution][programVersion] == "undefined" || conformityMatrix[resolution][programVersion].length == 0){
		conformityCheck = "ok";
	}else{
		var audioAnalysis = "";
		var isFirst = true;
		audioConfiguration.forEach(function(audioPair){
			if(isFirst){
				isFirst = false;
			}else{
				audioAnalysis += "/";
			}
			if(audioPair.audioType == "Non exploité"){
				audioAnalysis += "unused";
			}else{
				audioAnalysis += audioPair.audioType+'-'+audioPair.audioVersion;
			}
		});
		for(var i = audioConfiguration.length; i < 4; i++){
			audioAnalysis += "/unused";
		}
		//console.log("audioAnalysis : "+audioAnalysis);
		if( (conformityMatrix[resolution][programVersion]).indexOf(audioAnalysis) != -1){
			conformityCheck = 'ok';
		}else{
			conformityCheck = 'ko';
			conformityMessage = "- Configuration des paires audio ("+audioAnalysis+") incohérente avec la nature du programme ("+resolution+" "+programVersion+")";
		}
	}
	console.log("Conformité des audios : "+conformityCheck);
	return {"conformityCheck" : conformityCheck, "conformityMessage" : conformityMessage};
}

var conformityMatrix = {	
	"HD" : {
		// VF : uniquement de la VF, soit que stéréo, soit stéréo+5.1 (pas d'AD)
		"VF" : [
			"Audio_PCM-VF/unused/unused/unused",
			"Audio_PCM-VF/unused/DolbyE-VF/unused"
		],
		// VR : pareil que VF
		"VR" : [
			"Audio_PCM-VF/unused/unused/unused",
			"Audio_PCM-VF/unused/DolbyE-VF/unused"
		],
		// VM : VF+VO, soit que stéréo, soit stéréo+5.1 (pas d'AD)
		"VM" : [
			"Audio_PCM-VF/Audio_PCM-VO/unused/unused",
			"Audio_PCM-VF/Audio_PCM-VO/DolbyE-VF/DolbyE-VO"
		],
		// VO : comme la VF, mais avec VO à la place de VF
		"VO" : [
			"Audio_PCM-VO/unused/unused/unused",
			"Audio_PCM-VO/unused/DolbyE-VO/unused"
		],
		// VT : pareil que la VO
		"VT" : [
			"Audio_PCM-VO/unused/unused/unused",
			"Audio_PCM-VO/unused/DolbyE-VO/unused"
		],
		// OT : pareil que la VO
		"OT" : [
			"Audio_PCM-VO/unused/unused/unused",
			"Audio_PCM-VO/unused/DolbyE-VO/unused"
		],
		// RE : pareil que VF/VR
		"RE" : [
			"Audio_PCM-VF/unused/unused/unused",
			"Audio_PCM-VF/unused/DolbyE-VF/unused"
		],
		// RC : pareil que VF/VR
		"RC" : [
			"Audio_PCM-VF/unused/unused/unused",
			"Audio_PCM-VF/unused/DolbyE-VF/unused"
		],
		// VI : pas de contrôle
		"VI" : [],
		// AF / AR : comme VF avec nécessairement du DolbyE qui est soit ADBM soit ADRM
		"AF" : [
			"Audio_PCM-VF/unused/DolbyE-ADBM/unused",
			"Audio_PCM-VF/unused/DolbyE-ADRM/unused"
		],
		"AR" : [
			"Audio_PCM-VF/unused/DolbyE-ADBM/unused",
			"Audio_PCM-VF/unused/DolbyE-ADRM/unused"
		],
		// AM : comme VM avec nécessairement du DolbyE qui est soit ADBM soit ADRM
		"AM" : [
			"Audio_PCM-VF/Audio_PCM-VO/DolbyE-ADBM/DolbyE-VO",
			"Audio_PCM-VF/Audio_PCM-VO/DolbyE-ADRM/DolbyE-VO"
		],
		// BO : pas de contrôle
		"BO" : [],
		// RM : pareil que VM
		"RM" : [
			"Audio_PCM-VF/Audio_PCM-VO/unused/unused",
			"Audio_PCM-VF/Audio_PCM-VO/DolbyE-VF/DolbyE-VO"
		]
	},
	"SD" : {
		// VF : uniquement de la VF stéréo
		"VF" : [
			"Audio_PCM-VF/unused/unused/unused"
		],
		// VR : pareil que VF
		"VR" : [
			"Audio_PCM-VF/unused/unused/unused"
		],
		// VM : VF+VO stéréo
		"VM" : [
			"Audio_PCM-VF/Audio_PCM-VO/unused/unused"
		],
		// VO : comme la VF, mais avec VO à la place de VF
		"VO" : [
			"Audio_PCM-VO/unused/unused/unused"
		],
		// VT : pareil que la VO
		"VT" : [
			"Audio_PCM-VO/unused/unused/unused"
		],
		// OT : pareil que la VO
		"OT" : [
			"Audio_PCM-VO/unused/unused/unused"
		],
		// RE : pareil que VF/VR
		"RE" : [
			"Audio_PCM-VF/unused/unused/unused"
		],
		// RC : pareil que VF/VR
		"RC" : [
			"Audio_PCM-VF/unused/unused/unused"
		],
		// VI : pas de contrôle
		"VI" : [],
		// AF / AR : pas possible en SD (autre contrôle à ajouter)
		"AF" : [],
		"AR" : [],
		// AM : pas possible en SD (autre contrôle à ajouter)
		"AM" : [],
		// BO : pas de contrôle
		"BO" : [],
		// RM : pareil que VM
		"RM" : [
			"Audio_PCM-VF/Audio_PCM-VO/unused/unused"
		]		
	}
};
