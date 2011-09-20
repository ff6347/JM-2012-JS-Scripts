//JM 2012 changes
#include "change100k.jsx"
main();
function main(){
	
	// check for a doc
	try{ var d = app.activeDocument; }catch(e){
		alert("there is no active document");
		return;
	}

	// change color MIXED BLACK TO Master_buntschwarz value
	try{
		var c = d.swatches.item("MIXEDBLACK");
	}catch(e){
		c.colorValue = d.swatches.item("Master_buntschwarz").colorValue;
		
		
	}
	
	
	// now change the bitmaps color to the mixed black
	try{
		change100k(d);
		
	}catch(e){
		alert("could not change the images black to Master_buntschwarz");
	}
}