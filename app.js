var stylesheets = [];
var $box = $('#box');
var sheetDisplayTemplate = _.template($('#sheet-section-template').text());
var currentSheetNum = 0;
var randomColor = new RandomColorGenerator();

var addStylesheet = function(){
	currentSheetNum++;
	var color = randomColor();
	var newRule = ' {\n\tbackground-color: ' + color + ';\n}';
	var sheetDisplay = sheetDisplayTemplate({number: currentSheetNum, rule: newRule, color: color});
	var newSheet = {
		sheet: $('<style>'+newRule+'</style>').appendTo('head'),
		rule: newRule,
		counter: 0,
		display: $(sheetDisplay).appendTo($('#stylesheet-section')).find('.sheet-display')
	};
	stylesheets.push(newSheet);
};

$('#add-stylesheet').on('click', addStylesheet);

var addOneClass = function(num) {
	console.log('num is ' + num);
	var stylesheet = stylesheets[num];
	console.log('sheet is ');
	console.dir(stylesheet);
	stylesheet.counter++;
	$box.addClass('c'+stylesheet.counter);
	stylesheet.rule = '.c'+stylesheet.counter + stylesheet.rule;
	stylesheet.sheet.text(stylesheet.rule);
	stylesheet.display.text(stylesheet.rule);
};

$('#stylesheet-section').on('click', '.add-class', function(){
	console.log(this);
	addOneClass($(this).closest('.section').data('id')-1);
});

$('#stylesheet-section').on('click', '.add-10-classes', function(){
	var id = $(this).closest('.section').data('id')-1;
	var i = 10;
	while(i--) {
		addOneClass(id);
	}
});

function RandomColorGenerator() {
	var colors = ['gray', 'pink', 'green', 'blue', 'purple', 'orange', 'yellow', 'red'];
	var random = function() { return Math.floor(Math.random() * 255); }
	var get3random = function(){ return [random(),random(),random()]; }
	var checkSpread = function(colorArr) {
		return Math.abs(colorArr[1] - colorArr[0]) + Math.abs(colorArr[2] - colorArr[0]) > 100;
	};
	return function(){
		var color = colors.pop();
		if (color) return color;
		color = get3random();
		while(!checkSpread(color)) {
			console.log('color was ' + color.join(',') + ' trying again');
			color = get3random();
		}
		color = 'rgb('+color.join(',')+')';
		console.log('returning color ' + color);
		return color
	}

};
(function init(){
	addStylesheet();
})();