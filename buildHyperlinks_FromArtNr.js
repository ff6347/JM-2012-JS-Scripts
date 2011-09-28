// This script builds hyperlinks from what it found using a FC Query
// Copyright (C) 2011 Fabian "fabiantheblind" Morón Zirfas
// http://www.the-moron.net
// info [at] the - moron . net

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/.


// **************************************



//this is the FC Querie you need
// Save it under the name: "JM_ArtNr_only.xml"
/*
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Query>
<Header>
<Version major="5" minor="1">
</Version>
<Application value="Adobe InDesign">
</Application>
<QueryType value="Grep" qid="1">
</QueryType>
</Header>
<Description>
<FindExpression value="(?i)\d{6}|(?i)J\d{7}">
</FindExpression>
<ReplaceExpression value="">
</ReplaceExpression>
<FindChangeOptions>
<IncludeLockedLayers value="0">
</IncludeLockedLayers>
<IncludeLockedStories value="0">
</IncludeLockedStories>
<IncludeMasterPages value="0">
</IncludeMasterPages>
<IncludeHiddenLayers value="0">
</IncludeHiddenLayers>
<IncludeFootnotes value="1">
</IncludeFootnotes>
<KanaSensitive value="1">
</KanaSensitive>
<WidthSensitive value="1">
</WidthSensitive>
</FindChangeOptions>
<FindFormatSettings>
</FindFormatSettings>
<ReplaceFormatSettings>
<TextAttribute type="changecondmode" value="0">
</TextAttribute>
</ReplaceFormatSettings>
</Description>
</Query>
*/
// **************************************
// THE CODE
{
var mh_data = new Object();
	mh_data.hl = new Array();
	mh_data.errNoDoc  = "Please select an InDesign document";
	mh_data.errNoQuery  = "You need to install the Grep Query \"JM_ArtNr_only.xml\"";
	
	mh_data.hlNum = 0;
	mh_data.doc = app.activeDocument;
	mh_data.scrptVersion = 0.04;
	mh_data.buildHlsNum = 0;
	mh_data.debug = false;


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
			mh_data.query= app.loadFindChangeQuery ("JM_ArtNr_only", SearchModes.grepSearch);

			}catch(e){
			alert(mh_data.errNoDoc);
			return;
			}
		}
	
	
	
function main(){
	
	// unlock all layers
	var d  = mh_data.doc;
	d.layers.everyItem().locked = false;
	find(d);
	if(mh_data.debug==true){
		alert(
		// "You already have "+ mh_data.curHlsNum +
		" hyperlinks in your document\n"+ mh_data.buildHlsNum
		// " hyperlinks were build\nthere are "+ mh_data.doubleHlsNum +
		// " double links in your document"
		);
	}
	
}
	
	
function find(d){
		
		// empty out everythings hat still in ther FC Panel
		setFCopt();
		emptyFC();
		
		// load the query
		app.loadFindChangeQuery ("JM_ArtNr_only", SearchModes.grepSearch);
	
		// and get all its results into an array
		var result = d.findGrep();
		
		// some debugging stuff
		if(mh_data.debug == true)alert(result.length);
		
		// loop thru the results
		for(var i = result.length-1; i >=0 ; i--){
			
			// get the textcontent of what we found
			var aNr = result[i].contents;
			
				// this is the part of the text that will be the hyperlink
				try{
				var hlTxtSrc = d.hyperlinkTextSources.add(result[i].lines[0]);

				// this is just for counting what happens
				mh_data.curHlsNum ++;
	
				// build the hyperlink
				str = "http://www.justmusic.de/"+ aNr;
				if(mh_data.debug){
				// this could be a debug thingy	
				}
				//The destination of the hyperlink
				try{
				var hlDst = d.hyperlinkURLDestinations.add({destinationURL:str});
				// the hyperlink
				var hl = d.hyperlinks.add({source:hlTxtSrc, destination:hlDst, highlight: HyperlinkAppearanceHighlight.NONE});
				// this is for the report at end
				}catch(e){
					
					
				}
				mh_data.buildHlsNum ++;
				// give the hyperlink a accurate name
				hl.name = aNr+"_"+i;
			}catch(e){
				
				
			}
				// if you are in debug mode you can see the hyperlinks in indesign and the PDF
				if(mh_data.debug==true){
					hl.visible = true; 
				}else{	
					hl.visible = false;
				}//close if else visible hyperlinks
			}// close i for loop	
		} // close functio nfind
	
	
		//Set the find options.
		// we do this for every run of the find change
		// better that way!
function setFCopt(){


		app.findChangeGrepOptions.includeFootnotes = false;
		app.findChangeGrepOptions.includeHiddenLayers = true;
		app.findChangeGrepOptions.includeLockedLayersForFind = true;
		app.findChangeGrepOptions.includeLockedStoriesForFind = true;
		app.findChangeGrepOptions.includeMasterPages = false;

	}

	//Clear the find/change grep preferences.
	// also every run
function emptyFC(){
	
		app.findGrepPreferences = NothingEnum.nothing;
		app.changeGrepPreferences = NothingEnum.nothing;


	}

// run all the code!
docTest();
queryTest();
main();
}