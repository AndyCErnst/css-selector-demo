var $stylesheet = $('#style');
var stylesheetRules = ' {\n\tbackground-color: green;\n}';
var $stylesheetListing = $('#stylesheet-listing');
var classCounter = 1;
var $box = $('#box');

$('#add-class').on('click', function(){
	var newClass = '.c'+ classCounter++;
	$box.addClass(newClass);
	stylesheetRules = newClass + stylesheetRules;
	$stylesheet.text(stylesheetRules);
	$stylesheetListing.text(stylesheetRules);
});
