var stylesheets = [];
var $box = $('#box');
var sheetDisplayTemplate = _.template($('#sheet-section-template').text());
var currentSheetNum = 0;
var randomColor = new RandomColorGenerator();
var currentDepth = 1;

var addStylesheet = function(){
	currentSheetNum++;
	var color = randomColor();
	var newRule = ' {\n\tbackground-color: ' + color + ';\n}';
	var sheetDisplay = sheetDisplayTemplate({number: currentSheetNum, rule: newRule, color: color});
	var newSheet = {
		classes: [],
		elements: [],
		rule: newRule,
		sheet: $('<style>'+newRule+'</style>').appendTo('head'),
		display: $(sheetDisplay).appendTo($('#stylesheet-section')).find('.sheet-display')
	};
	stylesheets.push(newSheet);
};

$('#add-stylesheet').on('click', addStylesheet);

var findBoxElementDepth = function(){
	return $('#box-container div').length;
};
var addOneClass = function(num) {
	var stylesheet = stylesheets[num];
	var className = 'c'+(stylesheet.classes.length+1)
	stylesheet.classes.push('.' + className);
	var selectorAndRule = stylesheet.classes.join('') + stylesheet.rule;
	stylesheet.sheet.text(selectorAndRule);
	stylesheet.display.text(selectorAndRule);
	$box.addClass(className);
};

var removeOneClass = function(num) {
	var stylesheet = stylesheets[num];
	stylesheet.classes.pop();
	var selectorAndRule = stylesheet.classes.join('') + stylesheet.rule;
	stylesheet.sheet.text(selectorAndRule);
	stylesheet.display.text(selectorAndRule);
};

var addOneElement = function(num) {
	var stylesheet = stylesheets[num];
	stylesheet.elements.push('.' + className);
	$('#box-container').html('<div>'+$('#box-container').html()+'</div>')
};

var removeOneElement = function(num) {

};

$('#stylesheet-section').on('click', '.add-class', function(){
	var id = getSectionId(this);
	addOneClass(id);
});

$('#stylesheet-section').on('click', '.add-10-classes', function(){
	var id = getSectionId(this);
	var i = 10;
	while(i--) {
		addOneClass(id);
	}
});

$('#stylesheet-section').on('click', '.remove-class', function(){
	var id = getSectionId(this);
	removeOneClass(id);
});


$('#stylesheet-section').on('click', '.add-element', function(){
	var id = getSectionId(this);
	addOneElement(id);
});

$('#stylesheet-section').on('click', '.add-10-elements', function(){
	var id = getSectionId(this);
	var i = 10;
	while(i--) {
		addOneElement(id);
	}
});

$('#stylesheet-section').on('click', '.remove-element', function(){
	var id = getSectionId(this);
	removeOneElement(id);
});

function getSectionId(context) {
	return $(context).closest('.section').data('id')-1;
}
function RandomColorGenerator() {
	var defaultColors = ['gray', 'pink', 'green', 'blue', 'purple', 'orange', 'yellow', 'red'];
	var randomColor = function() { return Math.floor(Math.random() * 255); }
	var get3random = function(){ return [randomColor(),randomColor(),randomColor()]; }
	var checkSpread = function(colorArr) {
		return Math.abs(colorArr[1] - colorArr[0]) + Math.abs(colorArr[2] - colorArr[0]) > 100;
	};
	return function(){
		var color = defaultColors.pop();
		if (color) return color;
		do{
			color = get3random();
			console.log('color was rgb(' + color.join(',') + ')');
		}
		while(!checkSpread(color))

		color = 'rgb('+color.join(',')+')';
		console.log('returning color ' + color);
		return color
	}
};

(function init(){
	addStylesheet();
})();