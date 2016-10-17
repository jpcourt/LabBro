var buttonWidth = 0;

var AppGrid = React.createClass({
	getInitialState: function() {
		return {
			metadataConfig: metadataConfig,
			language: "fr",
			availableLanguages: availableLanguages,
			metadataStatus: {},
			defaultValue: ""
		}
	},
	componentDidMount: function(){
		var self = this;
		var metadataConfig = this.state.metadataConfig;
		var metadataStatus = {};
		Object.getOwnPropertyNames(metadataConfig).forEach(function(partId){
			var part = metadataConfig[partId];
			metadataStatus[partId] = {};
			Object.getOwnPropertyNames(part.content).forEach(function(metaId){
				var meta = part.content[metaId];
				if(typeof meta.defaultValue != "undefined"){
					var value = meta.defaultValue;
				}else{
					var value = self.state.defaultValue;
				}
				metadataStatus[partId][metaId] = value;
			});
			if(part.hasVariableChildren){
				metadataStatus[partId]["children"] = [];
				if(typeof part.derogativeNumberFormula != "undefined"){
					var startingChildrenNumber = part.derogativeNumberFormula[metadataStatus[partId][part.childrenNumberSpecifyer]];
				}else{
					var startingChildrenNumber = metadataStatus[partId][part.childrenNumberSpecifyer];
				}
				var startingChildrenNumber
				for(var i = 0; i < startingChildrenNumber; i++){
					metadataStatus[partId]["children"][i] = {};
					Object.getOwnPropertyNames(part.childrenTemplate.content).forEach(function(metaId){
						var meta = part.childrenTemplate.content[metaId];
						if(meta.inputType == "automaticNumerotation"){
							var value = i;
						}else{
							if(typeof meta.defaultValue != "undefined"){
								var value = meta.defaultValue;
							}else{
								var value = self.state.defaultValue;
							}							
						}
						metadataStatus[partId]["children"][i][metaId] = value;
					});
				}
			}
		});
		metadataStatus = this.updateConditionalMetas(metadataStatus);
		this.setState({
			metadataStatus: metadataStatus
		});
	},
	componentDidUpdate: function(){
		var $anchor = $("#buttonAnchor");
	    var $scroller = $('#buttonScroller');
	    var move = function() {
	        var st = $(window).scrollTop();
	        var ot = $anchor.offset().top;
	        if(st > ot - 100) {
	            if($(window).width() > 1200){
		            $scroller.css({
		                position: "fixed",
		                top: "100px",
		                width: buttonWidth
		            });
	            }else{
	            	$scroller.css({
	                    position: "static",
	                    top: "",
	                    width: "auto"
	                });
	            }
	        } else {
                $scroller.css({
                    position: "static",
                    top: "",
                    width: "auto"

                });
                buttonWidth = $scroller.width();
	        }
	    };
	    $(window).scroll(move);
	    move();
	},
	updateVariableChildren: function(metadataStatus){
		var self = this;
		Object.getOwnPropertyNames(this.state.metadataConfig).forEach(function(partId){
			var part = self.state.metadataConfig[partId];
			if(part.hasVariableChildren){
				if(typeof part.derogativeNumberFormula != "undefined"){
					var expectedChildrenNumber = part.derogativeNumberFormula[metadataStatus[partId][part.childrenNumberSpecifyer]];
				}else{
					var expectedChildrenNumber = metadataStatus[partId][part.childrenNumberSpecifyer];
				}
				if(metadataStatus[partId]["children"].length > expectedChildrenNumber){
					metadataStatus[partId]["children"].splice(expectedChildrenNumber, metadataStatus[partId]["children"].length - expectedChildrenNumber );
				}else if(metadataStatus[partId]["children"].length < expectedChildrenNumber){
					var i = metadataStatus[partId]["children"].length;
					while(i < expectedChildrenNumber ){
						metadataStatus[partId]["children"][i] = {};
						Object.getOwnPropertyNames(part.childrenTemplate.content).forEach(function(metaId){
							var meta = part.childrenTemplate.content[metaId];
							if(meta.inputType == "automaticNumerotation"){
								var value = i;
							}else{
								if(typeof meta.defaultValue != "undefined"){
									var value = meta.defaultValue;
								}else{
									var value = self.state.defaultValue;
								}
							}
							metadataStatus[partId]["children"][i][metaId] = value;
						});
						i++;
					}
				}
			}
		});
		return metadataStatus;
	},
	updateConditionalMetas: function(metadataStatus){
		var self = this;
		Object.getOwnPropertyNames(this.state.metadataConfig).forEach(function(partId){
			var part = self.state.metadataConfig[partId];
			Object.getOwnPropertyNames(part.content).forEach(function(metaId){
				var meta = part.content[metaId];
				if(typeof meta.conditional != "undefined"){
					if(meta.conditional.values.indexOf(metadataStatus[partId][meta.conditional.key]) != -1){
						if(typeof metadataStatus[partId][metaId] == "undefined"){
							if(typeof meta.defaultValue != "undefined"){
								var value = meta.defaultValue;
							}else{
								var value = self.state.defaultValue;
							}
							metadataStatus[partId][metaId] = value;
						}else{
						}
					}else{
						delete metadataStatus[partId][metaId];
					}
				}
			});
			if(typeof metadataStatus[partId]["children"] != "undefined"){
				for(var i = 0; i < metadataStatus[partId]["children"].length; i++){
					Object.getOwnPropertyNames(part.childrenTemplate.content).forEach(function(metaId){
						var meta = part.childrenTemplate.content[metaId];
						if(typeof meta.conditional != "undefined"){
							if(meta.conditional.values.indexOf(metadataStatus[partId]["children"][i][meta.conditional.key]) != -1){
								if(typeof metadataStatus[partId]["children"][i][metaId] == "undefined"){
									if(typeof meta.defaultValue != "undefined"){
										var value = meta.defaultValue;
									}else{
										var value = self.state.defaultValue;
									}
									metadataStatus[partId]["children"][i][metaId] = value;
								}else{
								}
							}else{
								delete metadataStatus[partId]["children"][i][metaId];
							}
						}
					});
				}
			}
		});
		return metadataStatus;
	},
	manageAction: function(actionType, actionValue){
		var self = this;
		switch(actionType){
			case 'setLanguage' :
				self.setState({
					language : actionValue
				});
				break;
			case 'setValue' : 
				var metadataStatus = self.state.metadataStatus;
				metadataStatus = self.recursiveSetValue(actionValue.url.split("/"), actionValue.value, metadataStatus);
				metadataStatus = self.updateVariableChildren(metadataStatus);
				metadataStatus = self.updateConditionalMetas(metadataStatus);
				bake_cookie("labBroCookie", metadataStatus);
				this.setState({
					metadataStatus: metadataStatus
				});
				break;
		}
	},
	recursiveSetValue: function(steps, value, currentStatus){
		if(steps.length == 1){
			currentStatus[steps[0]] = value;
			return currentStatus;
		}else{
			var nextStep = steps.splice(0, 1);
			currentStatus[nextStep[0]] = this.recursiveSetValue(steps, value, currentStatus[nextStep[0]]);
			return currentStatus;
		}
	},
	createXML: function(){
		var self = this;
		// JSON.parse(JSON.stringify) sert à créer une copie distincte de l'objet this.state.metadataStatus, sans modifier l'original qui est dans le state
		var metadataStatus = JSON.parse(JSON.stringify(this.state.metadataStatus));
		var metadataConfig = this.state.metadataConfig;
		// Vérification de la conformité des données saisies
		console.log("checking conformity...");
		var isConform = true;
		var nonConformityList = checkConformity(metadataStatus, metadataConfig, self.state.language);
		// Message d'information en cas de non conformité
		if(nonConformityList.length > 0){
			console.log("Data not compliant");
			var msg = globalLabels["nonComplianceDisplay"][self.state.language];
			nonConformityList.forEach(function(item){
				msg += "\r"+item;
			});
			alert(msg);
		}else{
			// Lancement de la fabrication du XML
			console.log("Data compliant");
			console.log("creating XML...");
			$.ajax({
				url: 'config/xmlTemplate.xml',
				dataType: "text"
			}).done(function(data){
				// Calcul du "houseId" dans le cas de CANAL+
				if(metadataStatus["fileDescriptionPart"]["broadcaster"] == "CANAL+"){
					if(metadataStatus["videoDescPart"]["resolution"] == "HD"){
						var canalResolRatio = "HD";
					}else{
						if(metadataStatus["videoDescPart"]["aspectRatio"] == "4/3"){
							var canalResolRatio = "4/3";
						}else{
							var canalResolRatio = "16";
						}
					}
					metadataStatus["fileDescriptionPart"]["houseId"] = metadataStatus["fileDescriptionPart"]["prodNumber"]+"_"+
						metadataStatus["fileDescriptionPart"]["progNumber"]+"_"+
						metadataStatus["fileDescriptionPart"]["versionType"]+"_"+
						canalResolRatio;
				}
				// Complément du RevisionId avec un "0" initial si besoin
				if(metadataStatus["fileDescriptionPart"]["revisionId"].length < 2){
					metadataStatus["fileDescriptionPart"]["revisionId"] = "0"+metadataStatus["fileDescriptionPart"]["revisionId"]
				}
				// Calcul de la métadonnée "Duration" déduite des tcIn et tcOut
				metadataStatus["techInfoPart"]["programDuration"] = evalDuration(metadataStatus["techInfoPart"]["tcInProg"], metadataStatus["techInfoPart"]["tcOutProg"]);
				// Suppression des descriptions de pistes audio non exploitées
				var i = 0;
				console.log(JSON.parse(JSON.stringify(metadataStatus)));
				while(i < metadataStatus["audioDescPart"]["children"].length){
					if(metadataStatus["audioDescPart"]["children"][i]["audioType"] == "Non exploité"){
						metadataStatus["audioDescPart"]["children"].splice(i, 1);
					}else{
						i++;
					}
				}
				var xmlTitle = buildXMLTitle(metadataStatus);
				var compiledtemplate = _.template(data);
				var xml = compiledtemplate(metadataStatus);
				// Suppression des sauts de ligne intempestifs du template
				var cleanXml = "";
				var onHold = false;
				var retainedChars = "";
				for(var i = 0; i < xml.length; i++){
					if(xml.charCodeAt(i) == 13){
						onHold = true;
						retainedChars = xml.charAt(i);
					}else{
						if(onHold){
							if([9, 10,32].indexOf(xml.charCodeAt(i)) != -1){
								retainedChars += xml.charAt(i);
							}else{
								cleanXml += retainedChars + xml.charAt(i);
								retainedChars = "";
							}
						}else{
							cleanXml += xml.charAt(i);
						}
					}
				}

				if(navigator.userAgent.indexOf("Chrome") != -1 || navigator.userAgent.indexOf("Firefox") != -1){
					//saveAs(new Blob([cleanXml], {type: "text/plain"}), xmlTitle+".xml");
					var downloadLink = document.createElement('a');
					downloadLink.href = 'data:attachment/xml;charset=utf-8,' + encodeURIComponent(cleanXml);
					downloadLink.target = '_blank';
					downloadLink.download = xmlTitle+".xml";
					document.body.appendChild(downloadLink);
					downloadLink.click();
					document.body.removeChild(downloadLink);					
				}else{
					var fileData = {};
					fileData["fileName"] = xmlTitle+".xml";
					fileData["fileContent"] = cleanXml;
					$.ajax({
						method: "POST",
						url: "safariUpload.php",
						data: JSON.stringify(fileData)
					}).done(function(data){
						if(JSON.parse(data)["result"] == "OK"){
							var downloadLink = document.createElement('a');
							downloadLink.href = "safariDownload.php?fileName="+JSON.parse(data)["message"];
							downloadLink.innerHTML = "<strong>DOWNLOAD YOU FILE</strong>";
							downloadLink.addEventListener("click", function(){document.body.removeChild(document.getElementById("prompterBackground"));}, false);
							var background = document.createElement('div');
							background.setAttribute("style", "position: absolute; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,0.7)");
							background.setAttribute("id", "prompterBackground");
							var prompter = document.createElement('div');
							prompter.setAttribute("style", "position: relative; top:25%; left:25%; width:50%; background-color:white; padding:30; border-style:solid; border-radius:20px");
							prompter.setAttribute("class", "text-center");
							prompter.appendChild(downloadLink);
							background.appendChild(prompter);
							document.body.appendChild(background);
						}else{
							alert("Ecriture du fichier KO");
						}
					});
				}
			});
		}
	},
	resetScreen: function(){
		console.log("resetting form inputs");
		this.componentDidMount();
	},
	reloadPage: function(){
		window.location.reload(0);
	},
	saveCookie: function(){
		console.log("Saving as cookie...");
		bake_cookie("labBroCookie", this.state.metadataStatus);
	},
	loadCookie: function(){
		console.log("reloading cookie data...");
		this.setState({
			metadataStatus: read_cookie("labBroCookie")
		}); 
	},
	render: function(){
		var self = this;
		var languageOptions = [];
		availableLanguages.forEach(function(lang){
			languageOptions.push(<LanguageOption lang={lang} manageAction={self.manageAction} />);
		});
		var layout = [];
		layoutConfig.forEach(function(zone){
			layout[zone.id] = [];
			zone.content.forEach(function(partId){
				layout[zone.id].push(<FileIngestMTDPart 
					config={self.state.metadataConfig[partId]}
					status={self.state.metadataStatus[partId]}
					language={self.state.language}
					manageAction={self.manageAction} 
				/>);
			});
		});
		if(!jQuery.isEmptyObject(this.state.metadataStatus)){
			return (
				<div className='container-fluid'>
					<div className="navbar navbar-inverse navbar-fixed-top" role="navigation" id="navbar">
						<div className="navbar-header">
							<div className="navbar-brand" >File Ingest</div>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav">
								{languageOptions}
							</ul>
						</div>
					</div>
					<div className='row page-header text-center'>
						<h1 style={{fontWeight:'bold'}} >CANAL+ FILE INGEST</h1>
					</div>
					<div className='row'>
						<div className='col-lg-1' />
						<div className='col-lg-3'>
							{layout[1]}
						</div>
						<div className='col-lg-3'>
							{layout[2]}
						</div>
						<div className='col-lg-3'>
							{layout[3]}
						</div>
						<div id="buttonAnchor" className='col-lg-2'>
							<div id="buttonScroller"> 
								<button className="btn btn-lg btn-block btn-primary" onClick={this.createXML} ><br /><br />{globalLabels["createXML"][self.state.language]}<br /><br /><br /></button>
								<button className="btn btn-lg btn-block btn-primary" onClick={this.resetScreen} ><br /><br />{globalLabels["resetScreen"][self.state.language]}<br /><br /><br /></button>
								<button className="btn btn-lg btn-block btn-primary" onClick={this.loadCookie} ><br /><br />{globalLabels["loadCookie"][self.state.language]}<br /><br /><br /></button>
							</div>
						</div>
					</div>
				</div>
			);
		}else{
			return (
				<div className="container" />
			);
		}
	}
});

var LanguageOption = React.createClass({
	setLanguage: function(){
		this.props.manageAction("setLanguage", this.props.lang.id);
	},
	render: function(){
		return (
			<li>
				<a role="button"><img width="30px" height="20px" src={this.props.lang.img} onClick={this.setLanguage} /></a>
			</li>
		);
	}
});

var FileIngestMTDPart = React.createClass({
	manageAction: function(actionType, actionValue){
		this.props.manageAction(actionType, actionValue);
	},
	render: function(){
		var self = this;
		var metadatas = [];
		var currentUrl = this.props.config.id;
		Object.getOwnPropertyNames(this.props.config.content).forEach(function(metaId){
			var meta = self.props.config.content[metaId];
			if( 
				(typeof meta.conditional != "undefined" && meta.conditional.values.indexOf(self.props.status[meta.conditional.key]) != -1)
				|| typeof meta.conditional == "undefined" 
			){				
				metadatas.push(<FileIngestMetadata 
					config={meta} 
					url={currentUrl+"/"+metaId}
					status={self.props.status[metaId]} 
					isVariable="false" 
					language={self.props.language} 
					manageAction={self.manageAction} 
				/>);
			}
		});
		var children = [];
		if(this.props.config.hasVariableChildren){
			for(var i = 0; i < self.props.status['children'].length; i++){
				children.push(<FileIngestMTDVariablePart 
					config={self.props.config.childrenTemplate} 
					url={currentUrl+"/children/"+i}
					status={this.props.status['children'][i]} 
					language={self.props.language} 
					manageAction={self.manageAction} 
				/>);
			}	
		}
		return (
			<div>
				<table className="table">
					<tr><td style={partTitleStyle} >{this.props.config.labels[self.props.language]}</td></tr>
				</table>
				<table className="table">
					<tbody>
						{metadatas}
					</tbody>
				</table>
				{children}
			</div>
		);
	}
});

var FileIngestMTDVariablePart = React.createClass({
	manageAction: function(actionType, actionValue){
		this.props.manageAction(actionType, actionValue);
	},
	render: function(){
		var self = this;
		var metadatas = [];
		var currentUrl = this.props.url;
		Object.getOwnPropertyNames(this.props.config.content).forEach(function(metaId){
			var meta = self.props.config.content[metaId];
			if( 
				(typeof meta.conditional != "undefined" && meta.conditional.values.indexOf(self.props.status[meta.conditional.key]) != -1)
				|| typeof meta.conditional == "undefined" 
			){
				metadatas.push(<FileIngestMetadata 
					config={meta} 
					url={currentUrl+"/"+metaId}
					status={self.props.status[metaId]} 
					isVariable="true" 
					language={self.props.language} 
					manageAction={self.manageAction} 
				/>);
			}
		});
		var childNumber = parseInt(this.props.url.split('/')[this.props.url.split('/').length-1]) + 1;
		return (
			<div>
				<table className="table">
					<tr><td style={variablePartTitleStyle} >{this.props.config.labels[this.props.language]}{childNumber}</td></tr>
				</table>
				<table className="table">
					<tbody>
						{metadatas}
					</tbody>
				</table>
			</div>
		);
	}
});

var FileIngestMetadata = React.createClass({
	componentDidMount: function(){
		$("#"+(this.props.url.replace(/\//gi, "_"))).attr("original-title", this.props.config.comments[this.props.language]);
		$("#"+(this.props.url.replace(/\//gi, "_"))).tipsy({fade: true, gravity: 'nw'});
	},
	componentDidUpdate: function(){
		$("#"+(this.props.url.replace(/\//gi, "_"))).attr("original-title", this.props.config.comments[this.props.language]);
		$("#"+(this.props.url.replace(/\//gi, "_"))).tipsy({fade: true, gravity: 'nw'});
	},
	setValue: function(actionValue){
		this.props.manageAction("setValue", {"url" : this.props.url, "value" : actionValue});
	},
	render: function(){
		var language = this.props.language;
		var statusDisplay = [];
		var self = this;
		switch(getValidity(self.props.status, self.props.config.inputType, self.props.config.mandatory)){
			case 'OK' :
				var style = {color:"green"};
				statusDisplay.push(<span style={style} className="glyphicon glyphicon-ok" aria-hidden="true"></span>);
				break;
			case 'KO' :
				var style = {color:"red"};
				statusDisplay.push(<span style={style} className="glyphicon glyphicon-remove" aria-hidden="true"></span>);
				break;
			case 'optional' :
				var style = {color: "green"};
				statusDisplay.push(<span style={style}>{globalLabels["optional"][language]}</span>);
				break;
			case 'mandatory' :
				var style = {color: "red", fontWeight: "bold"};
				statusDisplay.push(<span style={style}>{globalLabels["mandatory"][language]}</span>);
				break;
		}
		return (
			<tr>
				<td id={this.props.url.replace(/\//gi, "_")} >{this.props.config.labels[language]}</td>
				<td>
					<FileIngestMetadataInputSelector 
						config={this.props.config} 
						url={this.props.url}
						setValue={this.setValue} 
						status={this.props.status}
						language={this.props.language}
					/>
				</td>
				<td>{statusDisplay}</td>
			</tr>
		);
	}
});

var FileIngestMetadataInputSelector = React.createClass({
	setValue: function(actionValue){
		this.props.setValue(actionValue);
	},
	render: function(){
		var self = this;
		switch(this.props.config.inputType){
			case 'timeCode' :
			case 'integer' :
			case 'integer10' :
			case 'loudness' :
			case 'freeText' : 
				return (
					<FileIngestInput 
						url={self.props.url}
						config={self.props.config}
						status={self.props.status} 
						setValue={self.setValue}
						language={self.props.language}
					/>
				);
				break;
			case 'automaticNumerotation' :
			case 'fixedValue' :
				return (
					<FileIngestStaticInput 
						url={self.props.url}
						config={self.props.config}
						status={self.props.status} 
						setValue={self.setValue}
						language={self.props.language}
					/>
				);
				break;
			case 'dropdown' :
				return (
					<FileIngestDropdown 
						url={self.props.url}
						config={self.props.config}
						status={self.props.status} 
						setValue={self.setValue}
						language={self.props.language}
					/>
				);
				break;
		}
	}
});

var FileIngestInput = React.createClass({
	setValue: function(){
		var value = this.refs[this.props.url].getDOMNode().value;
		this.props.setValue(value);
	},
	render: function(){
		if(typeof this.props.status != "undefined"){
			var value = this.props.status;
		}else{
			var value = "";
		}
		return (
			<input ref={this.props.url} type="text" className="form-control" onChange={this.setValue} value={value} />
		);
	}
});

var FileIngestStaticInput = React.createClass({
	render: function(){
		var self = this;
		switch(this.props.config.inputType){ 
			case "fixedValue" :
				var value = self.props.status;
				break;
			case "automaticNumerotation" :
				var value = parseInt(this.props.status)+1;
				break;
		}
		return (
			<input type="text" className="form-control" value={value} disabled />
		);
	}
});

var FileIngestDropdown = React.createClass({
	setValue: function(value){
		this.props.setValue(value);
	},
	render: function(){
		var options = [];
		var self = this;
		this.props.config.options.forEach(function(option){
			if(typeof self.props.config.optionComments != "undefined"){
				var optionComment = self.props.config.optionComments[self.props.config.options.indexOf(option)];
			}else{
				var optionComment = "";
			}
			if(self.props.config.specialType == true){
				options.push(<SpecialDropdownOption url={self.props.url+"/"+option.code} value={option} setValue={self.setValue} language={self.props.language} optionComment={optionComment}/>);
			}else{
				options.push(<DropdownOption url={self.props.url+"/"+option} value={option} setValue={self.setValue} optionComment={optionComment}/>);
			}
		});
		if(this.props.status != "" || parseInt(this.props.status) == 0){
			var value = this.props.status;
		}else{
			var value = '\u00A0';
		}
		return (
			<div className="dropdown">
				<button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
					<span>{value}</span>
					<span className="caret"></span>
				</button>
				<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
				   {options}
				</ul>
			</div>
		);
	}
});

var DropdownOption = React.createClass({
	componentDidMount: function(){
		$("#"+(this.props.url.replace(/\//gi, "_"))).attr("original-title", this.props.optionComment);
		$("#"+(this.props.url.replace(/\//gi, "_"))).tipsy({fade: true, gravity: 'nw'});
	},
	componentDidUpdate: function(){
		$("#"+(this.props.url.replace(/\//gi, "_"))).attr("original-title", this.props.optionComment);
		$("#"+(this.props.url.replace(/\//gi, "_"))).tipsy({fade: true, gravity: 'nw'});
	},
	setValue: function(){
		this.props.setValue(this.props.value);
	},
	render: function(){
		return (
			<li id={this.props.url.replace(/\//gi, "_")}><a role="button" onClick={this.setValue}>{this.props.value}</a></li>
		);
	}
});

var SpecialDropdownOption = React.createClass({
	componentDidMount: function(){
		$("#"+(this.props.url.replace(/\//gi, "_"))).attr("original-title", this.props.optionComment);
		$("#"+(this.props.url.replace(/\//gi, "_"))).tipsy({fade: true, gravity: 'nw'});
	},
	componentDidUpdate: function(){
		$("#"+(this.props.url.replace(/\//gi, "_"))).attr("original-title", this.props.optionComment);
		$("#"+(this.props.url.replace(/\//gi, "_"))).tipsy({fade: true, gravity: 'nw'});
	},
	setValue: function(){
		this.props.setValue(this.props.value.code);
	},
	render: function(){
		return (
			<li id={this.props.url.replace(/\//gi, "_")}><a role="button" onClick={this.setValue}>{this.props.value.labels[this.props.language]}</a></li>
		);
	}
});

React.render(<AppGrid />, document.getElementById('body'));