var metadataConfig = {
	"fileDescriptionPart" : {
		"id" : "fileDescriptionPart",
		"labels" : {
			"fr" : "Description du fichier",
			"en" : "File description"
		},
		"content" : {
			"broadcaster" :{
				"id" : "broadcaster",
				"labels" : {
					"fr": "Diffuseur",
					"en" : "Broadcaster"
				},
				"comments" : {
					"fr" : "Le nom du diffuseur cible",
					"en" : "Target broadcaster's name"
				},
				"inputType" : "dropdown",
				"options" : ["CANAL+", "TF1", "M6", "NRJ12", "CHERIE25", "NRJHITS"],
				/*"defaultValue" : "CANAL+",*/
				"mandatory" : true
			},
			"fileProvider" : {
				"id" : "fileProvider",
				"labels" : {
					"fr": "Fournisseur du fichier",
					"en" : "File provider"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "freeText",
				/*"defaultValue" : "Dummy provider",*/
				"mandatory" : true
			},
			"nature" : {
				"id" : "nature",
				"conditional" :{
					"key" : "broadcaster",
					"values" : ["TF1", "M6", "NRJ12", "NRJHITS", "CHERIE25"]
				},
				"labels" : {
					"fr": "Nature du programme",
					"en" : "Program nature"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "dropdown",
				"options" : ["Programme", "Pub", "Autre"],
				"defaultValue" : "Programme",				
				"mandatory" : true
			},
			"natureCplus" : {
				"id" : "natureCplus",
				"conditional" :{
					"key" : "broadcaster",
					"values" : ["CANAL+"]
				},
				"labels" : {
					"fr": "Nature du programme",
					"en" : "Program nature"
				},
				"comments" : {
					"fr" : "Nature du programme (fixé)",
					"en" : "Nature of the program (fixed)"
				},
				"inputType" : "fixedValue",
				"defaultValue" : "Programme",				
				"mandatory" : true
			},
			"prodNumber" : {
				"id" : "prodNumber",
				"conditional" :{
					"key" : "broadcaster",
					"values" : ["CANAL+"]
				},
				"labels" : {
					"fr": "Numéro d'affaire",
					"en" : "Production number"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "integer10",
				/*"defaultValue" : 1111111,*/
				"mandatory" : true
			},
			"progNumber" : {
				"id" : "progNumber",
				"conditional" :{
					"key" : "broadcaster",
					"values" : ["CANAL+"]
				},
				"labels" : {
					"fr": "Numéro de programme",
					"en" : "Program number"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "integer10",
				/*"defaultValue" : 1,*/
				"mandatory" : true
			},
			"houseId" : {
				"id" : "houseId",
				"conditional" :{
					"key" : "broadcaster",
					"values" : ["TF1", "M6", "NRJ12", "NRJHITS", "CHERIE25"]
				},
				"labels" : {
					"fr": "House ID",
					"en" : "House ID"
				},
				"comments" : {
					"fr" : "Numéro d'identification interne du diffuseur",
					"en" : "Broadcaster's internal identification number"
				},
				"inputType" : "freeText",
				"mandatory" : true
			},
			"versionType" : {
				"id" : "versionType",
				"conditional" :{
					"key" : "broadcaster",
					"values" : ["CANAL+", "NRJ12", "NRJHITS", "CHERIE25"]
				},
				"labels" : {
					"fr": "Type de programme (Version audio)",
					"en" : "Program Type (Audio Version)"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "dropdown",
				"options" : ["VM", "VR", "VT", "OT", "VF", "VO", "RE", "RC", "VI", "AF", "AM", "AR", "BO", "RM"],
				"optionComments" :[
					"Version multilingue : Concernent les programmes qui ne sont pas tournés en français (version originale sous-titrée + version française)",
					"Version originale française : Concerne les programmes tournés en français",
					"Version originale sous-titrée : Il s’agit des programmes dont la langue de tournage n’est pas le français ayant un sous-titrage en français brulé dans l'image",
					"Version originale avec sous-titre séparé : Il s'agit de programmes en langue originale non doublés ayant un sous-titrage français séparé (non brûlé)",
					"Version Française : La langue de tournage n’est pas le français. La version française a été fabriquée.",
					"Version Originale : Concerne les programmes non doublés, non sous-titrés dont la langue de tournage n’est pas le français.",
					"Version Remontée",
					"Version remontée Courte",
					"Version Internationale",
					"Version Audiodécrite Française",
					"Version Audiodécrite Multilin.",
					"Version Audiodécrite Orig. Fr.",
					"Version Bonus Intégré",
					"Version Remontée Multilingue"
				],
				"defaultValue" : "VF",				
				"mandatory" : true
			},
			"localProgramTitle" : {
				"id" : "localProgramTitle",
				"labels" : {
					"fr": "Titre programme local",
					"en" : "Local program title"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "freeText",
				/*"defaultValue" : "Dummy title",*/
				"mandatory" : true
			},
			"localEpisodeTitle" : {
				"id" : "localEpisodeTitle",
				"labels" : {
					"fr": "Titre épisode local",
					"en" : "Local episode title"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "freeText",				
				"mandatory" : false
			},
			"originalProgramTitle" : {
				"id" : "originalProgramTitle",
				"labels" : {
					"fr": "Titre programme original",
					"en" : "Original program title"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "freeText",				
				"mandatory" : false
			},
			"originalEpisodeTitle" : {
				"id" : "originalEpisodeTitle",
				"labels" : {
					"fr": "Titre épisode original",
					"en" : "Original episode title"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "freeText",				
				"mandatory" : false
			},
			"revisionId" : {
				"id" : "revisionId",
				"labels" : {
					"fr": "RevisionId",
					"en" : "RevisionId"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "integer",
				"defaultValue" : 1,
				"mandatory" : true
			}
		},
		"hasVariableChildren": false
	},
	"segmentationPart" : {
		"id" : "segmentationPart",
		"labels" : {
			"fr" : "Description de la segmentation",
			"en" : "Segmentation description"
		},
		"content" : {
			"partNumber" : {
				"id" : "partNumber",
				"labels" : {
					"fr": "Nombre de parties",
					"en" : "Number of parts"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "dropdown",
				"options" : [1,2,3,4,5,6,7,8,9,10],
				"defaultValue" : 1,				
				"mandatory" : true
			}
		},
		"hasVariableChildren": true,
		"childrenNumberSpecifyer" : "partNumber",
		"derogativeNumberFormula" : {
			1 : 0,
			2 : 2,
			3 : 3,
			4 : 4,
			5 : 5,
			6 : 6,
			7 : 7,
			8 : 8,
			9 : 9,
			10 : 10
		},
		"childrenTemplate" : {
			"id" : "partDescription",
			"labels" : {
				"fr" : "Description de la partie ",
				"en" : "Description of part "
			},
			"content": {
				"partNumero" : {
					"id" : "partNumero",
					"labels" : {
						"fr": "Numéro de partie",
						"en" : "Part number"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "automaticNumerotation",					
					"mandatory" : true
				},
				"tcIn" : {
					"id" : "tcIn",
					"labels" : {
						"fr": "TC in (Programme ou message)",
						"en" : "TC in (Program or message)"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "timeCode",
					"defaultValue" : "10:00:00:00",					
					"mandatory" : true
				},
				"tcOut" : {
					"id" : "tcOut",
					"labels" : {
						"fr": "TC out (Programme ou message)",
						"en" : "TC out (Program or message)"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "timeCode",
					"defaultValue" : "11:00:00:00",					
					"mandatory" : true
				}
			}
		}
	},
	"techInfoPart" : {
		"id" : "techInfoPart",
		"labels" : {
			"fr" : "Informations techniques",
			"en" : "Technical informations"
		},
		"content" : {
			"tcInFile" : {
				"id" : "tcInFile",
				"labels" : {
					"fr": "TC in Fichier (amorce)",
					"en" : "File TC in (amorce)"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "timeCode",
				"defaultValue" : "10:00:00:00",				
				"mandatory" : true
			},
			"tcOutFile" : {
				"id" : "tcOutFile",
				"labels" : {
					"fr": "TC out Fichier (postroll)",
					"en" : "File TC out (postroll)"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "timeCode",
				"defaultValue" : "11:00:00:00",				
				"mandatory" : true
			},
			"tcInProg" : {
				"id" : "tcInProg",
				"labels" : {
					"fr": "TC in Programme",
					"en" : "Program TC in"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "timeCode",
				"defaultValue" : "10:00:00:00",				
				"mandatory" : true
			},
			"tcOutProg" : {
				"id" : "tcOutProg",
				"labels" : {
					"fr": "TC out Programme",
					"en" : "Program TC out"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "timeCode",
				"defaultValue" : "11:00:00:00",				
				"mandatory" : true
			},
			"fileSpec" : {
				"id" : "fileSpec",
				"labels" : {
					"fr": "Spécification fichier",
					"en" : "File specification"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "dropdown",
				"options" : ["NA", "RDD9", "AS10"],
				"defaultValue" : "NA",				
				"mandatory" : true
			},
			"hashType" : {
				"id" : "hashType",
				"labels" : {
					"fr": "Fonction de hachage",
					"en" : "Hash type"
				},
				"comments" : {
					"fr" : "Utilisation d'un contrôle de cohérence",
					"en" : "Use of consistency control"
				},
				"inputType" : "dropdown",
				"options" : ["NA", "MD5"],
				"defaultValue" : "NA",				
				"mandatory" : true
			},
			"hashCode" : {
				"id" : "hashCode",
				"conditional" :{
					"key" : "hashType",
					"values" : ["MD5"]
				},
				"labels" : {
					"fr": "Empreinte de hachage",
					"en" : "Hash code"
				},
				"comments" : {
					"fr" : "Hashcode utilisé pour le contrôle de cohérence",
					"en" : "Hashcode used for consistency control"
				},
				"inputType" : "freeText",				
				"mandatory" : true
			},
			"videoRemarks" : {
				"id" : "videoRemarks",
				"labels" : {
					"fr": "Remarques vidéo",
					"en" : "Video remarks"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "freeText",				
				"mandatory" : false
			},
			"audioRemarks" : {
				"id" : "audioRemarks",
				"labels" : {
					"fr": "Remarques audio",
					"en" : "Audio remarks"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "freeText",				
				"mandatory" : false
			},
			"otherRemarks" : {
				"id" : "otherRemarks",
				"labels" : {
					"fr": "Autres remarques",
					"en" : "Other remarks"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "freeText",				
				"mandatory" : false
			}
		},
		"hasVariableChildren": false
	},
	"subTitlePart" : {
		"id" : "subTitlePart",
		"labels" : {
			"fr" : "Description des sous-titres",
			"en" : "Subtitles description"
		},
		"content" : {
			"stlNb" : {
				"id" : "stlNb",
				"labels" : {
					"fr": "Nombre de sous-titres",
					"en" : "Number of subtitles"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "dropdown",
				"options" : [0, 1, 2],
				"defaultValue" : "0",				
				"mandatory" : true
			}
		},
		"hasVariableChildren": true,
		"childrenNumberSpecifyer" : "stlNb",
		"childrenTemplate" : {
			"id" : "stlDescription",
			"labels" : {
				"fr" : "Description du sous-titre ",
				"en" : "Description of subtitle "
			},
			"content": {
				"stlNumero" : {
					"id" : "stlNumero",
					"labels" : {
						"fr": "ST id",
						"en" : "ST id"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "automaticNumerotation",					
					"mandatory" : true
				},
				"stlType" : {
					"id" : "stlType",
					"labels" : {
						"fr": "Type de sous-titre",
						"en" : "Subtitle Type"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "dropdown",
					"options" : ["Fichier joint", "VBI_OP47", "Brulé"],
					"defaultValue" : "",
					"mandatory" : true
				},
				"stlVersion" : {
					"id" : "stlVersion",
					"labels" : {
						"fr": "Version de sous-titre",
						"en" : "Subtitle version"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "dropdown",
					"options" : ["Standard", "Malentendant"],
					"defaultValue" : "Malentendant",
					"mandatory" : true
				},
				"languageCode" : {
					"id" : "languageCode",
					"labels" : {
						"fr": "Code langue",
						"en" : "Language code"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "dropdown",
					"specialType" : true,
					"options" : languageList,
					"defaultValue" : "FRA",
					"mandatory" : true
				},
			}
		}
	},
	"videoDescPart" : {
		"id" : "videoDescPart",
		"labels" : {
			"fr" : "Description de la vidéo",
			"en" : "Video description"
		},
		"content" : {
			"picFormat" : {
				"id" : "picFormat",
				"labels" : {
					"fr": "Format d'image",
					"en" : "Picture format"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "dropdown",
				"options" : ["1.33", "1.55", "1.66", "1.77", "1.85", "2.35", "2.40"],
				"defaultValue" : "1.77",				
				"mandatory" : true
			},
			"aspectRatio" : {
				"id" : "aspectRatio",
				"labels" : {
					"fr": "Format vidéo - Aspect Ratio",
					"en" : "Video Format - Aspect Ratio"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "dropdown",
				"options" : ["16/9", "4/3"],
				"defaultValue" : "16/9",				
				"mandatory" : true
			},
			"resolution" : {
				"id" : "resolution",
				"labels" : {
					"fr": "Résolution",
					"en" : "Resolution"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "dropdown",
				"options" : ["HD", "SD"],
				"defaultValue" : "HD",				
				"mandatory" : true
			},
			"3DContent" : {
				"id" : "3DContent",
				"labels" : {
					"fr": "Contenu 3D",
					"en" : "3D content"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "dropdown",
				"options" : ["\u00A0", "True", "False"],
				"defaultValue" : "",				
				"mandatory" : false
			},
			"3DMode" : {
				"id" : "3DMode",
				"conditional" :{
					"key" : "3DContent",
					"values" : ["True"]
				},
				"labels" : {
					"fr": "Mode 3D",
					"en" : "3D mode"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "dropdown",
				"options" : ["SideBySide", "FullWidth"],
				"defaultValue" : "SideBySide",				
				"mandatory" : true
			}
		},
		"hasVariableChildren": false
	},
	"audioDescPart" : {
		"id" : "audioDescPart",
		"labels" : {
			"fr" : "Description de l'audio",
			"en" : "Audio Description"
		},
		"content" : {
			"channelNumber" : {
				"id" : "channelNumber",
				"labels" : {
					"fr" : "Nombre de canaux présents dans le fichier",
					"en" : "Number of file channels (FileChannelCount)"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "dropdown",
				"options" : [2, 4, 8],
				"defaultValue" : 2,				
				"mandatory" : true
			},
			"audioQuant" : {
				"id" : "audioQuant",
				"labels" : {
					"fr" : "Quantification audio, Profondeur d'audio",
					"en" : "Audio quantification, Audio depth"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "dropdown",
				"options" : [16, 24],
				"defaultValue" : 24,				
				"mandatory" : true
			},
			"audioTrackType" : {
				"id" : "audioTrackType",
				"labels" : {
					"fr" : "Type de piste audio",
					"en" : "Audio track type"
				},
				"comments" : {
					"fr" : "",
					"en" : ""
				},
				"inputType" : "dropdown",
				"options" : ["AES3", "BWF"],
				"defaultValue" : "AES3",				
				"mandatory" : false
			}
		},
		"hasVariableChildren": true,
		"childrenNumberSpecifyer" : "channelNumber",
		"derogativeNumberFormula" : {
			2 : 1,
			4 : 2,
			8 : 4
		},
		"childrenTemplate" : {
			"id" : "audioPairDescription",
			"labels" : {
				"fr" : "Description de la paire audio ",
				"en" : "Description of audio pair "
			},
			"content": {
				"audioPairNumero" : {
					"id" : "audioPairNumero",
					"labels" : {
						"fr": "Numéro de paire",
						"en" : "Pair number"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "automaticNumerotation",
					"defaultValue" : "",					
					"mandatory" : true
				},
				"audioType" : {
					"id" : "audioType",
					"labels" : {
						"fr": "Type d'audio",
						"en" : "Audio type"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "dropdown",
					"options" : ["Audio_PCM", "DolbyE", "Non exploité"],
					"defaultValue" : "Audio_PCM",
					"mandatory" : true
				},
				"audioVersion" : {
					"id" : "audioVersion",
					"conditional" :{
						"key" : "audioType",
						"values" : ["Audio_PCM", "DolbyE"]
					},
					"labels" : {
						"fr": "Version",
						"en" : "Version"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "dropdown",
					"options" : ["VF", "VO", "VI", "ADBM", "ADRM", "Unused"],
					"defaultValue" : "VF",
					"mandatory" : true
				},
				"audioLanguage" : {
					"id" : "audioLanguage",
					"conditional" :{
						"key" : "audioType",
						"values" : ["Audio_PCM", "DolbyE"]
					},
					"labels" : {
						"fr": "Langue",
						"en" : "Language"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "dropdown",
					"specialType" : true,
					"options" : languageList,
					"defaultValue" : "FRA",
					"mandatory" : true
				},
				"loudness" : {
					"id" : "loudness",
					"conditional" :{
						"key" : "audioType",
						"values" : ["Audio_PCM", "DolbyE"]
					},
					"labels" : {
						"fr": "Loudness",
						"en" : "Loudness"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "loudness",
					"defaultValue" : -1,
					"mandatory" : true
				},
				"dolbyDialogLevel" : {
					"id" : "dolbyDialogLevel",
					"conditional" :{
						"key" : "audioType",
						"values" : ["DolbyE"]
					},
					"labels" : {
						"fr": "Dolby DialogLevel",
						"en" : "Dolby DialogLevel"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "freeText",
					"mandatory" : false
				},
				"dolbyDialogLevelMetadata" : {
					"id" : "dolbyDialogLevelMetadata",
					"conditional" :{
						"key" : "audioType",
						"values" : ["DolbyE"]
					},
					"labels" : {
						"fr": "Dolby DialogLevel Metadata",
						"en" : "Dolby DialogLevel Metadata"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "freeText",
					"mandatory" : false
				},
				"p1MixType" : {
					"id" : "p1MixType",
					"conditional" :{
						"key" : "audioType",
						"values" : ["DolbyE"]
					},
					"labels" : {
						"fr": "Pgm 1 - Type de mixage",
						"en" : "Pgm 1 - Mix type"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "dropdown",
					"options" : ["Mono", "LoRo", "Lt Rt", "5.0", "5.1"],
					"defaultValue" : "5.1",
					"mandatory" : true
				},
				"p2AudioVersion" : {
					"id" : "p2AudioVersion",
					"conditional" :{
						"key" : "audioType",
						"values" : ["DolbyE"]
					},
					"labels" : {
						"fr": "Version Pgm 2",
						"en" : "Pgm 2 Version"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "dropdown",
					"options" : ["VF", "VO", "VI", "ADBM", "ADRM", "Unused"],
					"defaultValue" : "VF",
					"mandatory" : true
				},
				"p2AudioLanguage" : {
					"id" : "p2AudioLanguage",
					"conditional" :{
						"key" : "audioType",
						"values" : ["DolbyE"]
					},
					"labels" : {
						"fr": "Langue du pgm 2",
						"en" : "Pgm 2 language"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "dropdown",
					"specialType" : true,
					"options" : languageList,
					"defaultValue" : "FRA",
					"mandatory" : true
				},
				"p2Loudness" : {
					"id" : "p2Loudness",
					"conditional" :{
						"key" : "audioType",
						"values" : ["DolbyE"]
					},
					"labels" : {
						"fr": "Loudness du Pgm 2",
						"en" : "Pgm 2 Loudness"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "loudness",
					"defaultValue" : -1,
					"mandatory" : true
				},
				"p2DolbyDialogLevel" : {
					"id" : "p2DolbyDialogLevel",
					"conditional" :{
						"key" : "audioType",
						"values" : ["DolbyE"]
					},
					"labels" : {
						"fr": "Dolby DialogLevel du Pgm 2",
						"en" : "Pgm 2 Dolby DialogLevel"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "freeText",
					"mandatory" : false
				},
				"p2DolbyDialogLevelMetadata" : {
					"id" : "p2DolbyDialogLevelMetadata",
					"conditional" :{
						"key" : "audioType",
						"values" : ["DolbyE"]
					},
					"labels" : {
						"fr": "Dolby DialogLevel Metadata du Pgm 2",
						"en" : "Pgm 2 Dolby DialogLevel Metadata"
					},
					"comments" : {
						"fr" : "",
						"en" : ""
					},
					"inputType" : "freeText",
					"mandatory" : false
				},
			}
		}
	}
};

