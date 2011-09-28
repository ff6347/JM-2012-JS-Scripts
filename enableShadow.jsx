main();
function main(){


var d = app.activeDocument;

var ds = d.objectStyles.item("BILD_schatten");

ds.objectStyleObjectEffectsCategorySettings.enableDropShadow = true ;

}