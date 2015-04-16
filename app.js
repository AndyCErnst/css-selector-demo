var $stylesheets = 
	[$('#style1'), $('#style2')];
var ssRules = 
	[' {\n\tbackground-color: red;\n}',
	' {\n\tbackground-color: green;\n}'];
var $ssLists = 
	[ $('#1st-stylesheet-listing'), 
	$('#2nd-stylesheet-listing')];
var classCounter = [1,1];
var $box = $('#box');


(function init(){
	$ssLists[0].text(ssRules[0]);
	$ssLists[1].text(ssRules[1]);
})()

var addOneClass = function(num) {
	var newClass = 'c'+ classCounter[0]++;
	$box.addClass(newClass);
	newClass = '.' + newClass;
	ssRules[1] = newClass + ssRules[1];
	$stylesheets[1].text(ssRules[1]);
	$ssLists[1].text(ssRules[1]);
}

$('#add-class').on('click', addOneClass);

$('#add-10-classes').on('click', function(){
	var i = 10;
	while(i--) {
		addOneClass();
	}
});

