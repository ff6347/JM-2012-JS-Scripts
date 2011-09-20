{
var mh_data = new Object();
	mh_data.hl = new Array();
	mh_data.errNoDoc  = "Please select an InDesign document";
	mh_data.errNoQuery  = "You need to install the Grep Query \"Brenner_ArtNrGrep.xml\"";
	
	mh_data.hlNum = 0;
	mh_data.doc = app.documents.item(0);
	mh_data.scrptVersion = "0.03";
	mh_data.curHlsNum = "0";
	mh_data.buildHlsNum = "0";
	mh_data.doubleHlsNum = "0";
	mh_data.debug = falsexy;
	mh_data.query;
	mh_data.resArtNr;

// check if there is an existing doc
function docTest(){
	
		try{
		var td_name = mh_data.doc.name;
		
		}catch(e){
		alert(mh_data.errNoDoc);
		return;
		}
	}
function queryTest(){

			try{
			mh_data.query= app.loadFindChangeQuery ("Brenner_ArtNrGrep", SearchModes.grepSearch);

			}catch(e){
			alert(mh_data.errNoDoc);
			return;
			}
		}
	
	
	
function main(){
	
	find();
	if(mh_data.debug==true){
		alert("You already have "+ mh_data.curHlsNum +
		" hyperlinks in your document\n"+ mh_data.buildHlsNum +
		" hyperlinks were build\nthere are "+ mh_data.doubleHlsNum +
		" double links in your document");
	}
	
}
	
	
function find(){
		
		// empty out everythings hat still in ther FC Panel
		setFCopt();
		emptyFC();
		
		var findGrepPref  = app.findGrepPreferences;
		var chngGrepPref = app.changeGrepPreferences;
		
		// this needs to be installed: Brenner_ArtNrGrep.xml
		// at this place:
		//
		//
		//
		//
		//
		// the FC query looks for this: "(\d{3}[^\s|[:punct:]]+)"
		// with Myriad Pro Bold 7pt
		//
		var d  = mh_data.doc;
		d.layers.everyItem().locked = false;
		// app.loadFindChangeQuery ("JM_ArtNr_only", SearchModes.grepSearch);
		// 
		// 	mh_data.resArtNr = d.findGrep();
		// 	
		// 	setFCopt();
		// 	emptyFC();
		
		app.loadFindChangeQuery ("JM_ArtNr_only", SearchModes.grepSearch);
		
		var result = d.findGrep();
		
		
		//alert(result.length);
		
		// loop thru the resiults
		for(var i = result.length-1; i >=0 ; i--){
			
			// get the textcontent of what we found
			var aNr = result[i].contents;
			
			
			
	
				 try{
				app.findGrepPreferences.findWhat = "";
				var fullLine = app.findGrepPreferences.findWhat = aNr+".+"; 
				//alert(fullLine);
				//app.changeGrepPreferences.changeTo = "Snafu"; 
				//app.documents.item(0).changeGrep();
					
					
				var hlTxtSrc = app.activeDocument.hyperlinkTextSources.add(d.findGrep()[0]);
				
				
				 }catch(e){
				//alert("continue");
				 mh_data.curHlsNum ++;
				 continue;
				 }

			//	str = "http://www.justmusic.de/"+ result[i].contents;
			str = "http://www.justmusic.de/"+ aNr;
				if(mh_data.debug){
					
					// alert("RESULT "+ i +" -->" + result[i] + "\n"
					// 				+ "URL String --> " + mh_data.resArtNr[i].contents + "\n"
					// 				+ "aNr -->" + aNr);
				}
				var hlDst = app.activeDocument.hyperlinkURLDestinations.add({destinationURL:str});
				var hl = app.activeDocument.hyperlinks.add({source:hlTxtSrc, destination:hlDst, highlight: HyperlinkAppearanceHighlight.NONE});
				mh_data.buildHlsNum ++;
				// try{
				// 				hl.name = aNr;
				// 			}catch(e){
				// 				
				// 				hl.name = aNr + "_" + Math.random()*100;	
				// 				mh_data.doubleHlsNum ++;
				// 			}
				if(mh_data.debug==true){
					hl.visible = true; 
				}else{	
					hl.visible = false;
				}
			}	
		}
	


	
	// check for existing links
// function testHls(aNr){
// 	var d  = mh_data.doc;
// 	var bool = false;
// 	for(j= 0; j < d.hyperlinks.length; j++ ){
// 		var hl  = d.hyperlinks.item(j);
// 		
// 		if(aNr.match(hl.name)){
// 			bool = true;
// 			break;	
// 		}else{
// 			bool = false;	
// 		}
// 		
// 	}
// 	
// 
// return bool;
// }
// 
	
	
function setFCopt(){

		emptyFC();
		//Set the find options.
		app.findChangeGrepOptions.includeFootnotes = false;
		app.findChangeGrepOptions.includeHiddenLayers = true;
		app.findChangeGrepOptions.includeLockedLayersForFind = true;
		app.findChangeGrepOptions.includeLockedStoriesForFind = true;
		app.findChangeGrepOptions.includeMasterPages = false;

	}

function emptyFC(){
		//Clear the find/change grep preferences.
		app.findGrepPreferences = NothingEnum.nothing;
		chngGrepPref = NothingEnum.nothing;


	}


docTest();
//queryTest();
main();
}