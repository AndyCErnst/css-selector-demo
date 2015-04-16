var $stylesheets = 
	[$('#style1'), $('#style2')];
var ssRules = 
	[' {\n\tbackground-color: red;\n}',
	' {\n\tbackground-color: green;\n}'];
var $ssLists = 
	[ $('#1st-stylesheet-listing'), 
	$('#2nd-stylesheet-listing')];
var classCounter = [0,0];
var $box = $('#box');


(function init(){
	$ssLists[0].text(ssRules[0]);
	$ssLists[1].text(ssRules[1]);
})()

var addOneClass = function(num) {
	console.log('num is ' + num);
	classCounter[num]++;
	$box.addClass('c'+classCounter[num]);
	ssRules[num] = '.c'+classCounter[num] + ssRules[num];
	$stylesheets[num].text(ssRules[num]);
	$ssLists[num].text(ssRules[num]);
}

$('.add-class').on('click', function(){
	addOneClass($(this).closest('.section').data('id')-1);
});

$('.add-10-classes').on('click', function(){
	var id = $(this).closest('.section').data('id');
	var i = 10;
	while(i--) {
		addOneClass(id-1);
	}
});

