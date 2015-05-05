'use strict';
var stylesheets = [];
var sheetDisplayTemplate = _.template($('#sheet-section-template').text());
var currentSheetNum = 1;
var randomColor = new RandomColorGenerator();

var StyleSheet = function(color){
	this.number = currentSheetNum++;
	this.color = color;
	this.rule = '{\n    background-color: ' + this.color + ';\n}';
	this.classes = [];
	this.elements = [];
	this.sheet = $('<style>'+this.rule+'</style>').appendTo('head');
	this.displayArea = null;
};
StyleSheet.prototype.update = function() {
	var selector =
		this.elements.join(' ') + ' ' + 
		this.classes.join('')  ;

	if(!this.elements.length && !this.classes.length) {
		this.sheet.text('');
	} else{
		this.sheet.text(selector + '#box' + this.rule);
	}
	if(this.displayArea){
		this.displayArea.text(selector + ' ' + this.rule);
	} else {
		console.err('Stylesheet ' + this.number + ' has no display area associated with it');
	}
};
var addStylesheet = function(){
	var sheet = new StyleSheet(randomColor());
	var sheetDisplay = sheetDisplayTemplate(sheet);
	var sheetControlBox = $(sheetDisplay).appendTo($('#stylesheet-section'));
	sheet.displayArea = sheetControlBox.find('.sheet-display');
	stylesheets.push(sheet);
};

var getBoxElementDepth = function(){
	return $('#box-container div').length;
};

var getSectionId = function(context) {
	return $(context).closest('.stylesheet-control-box').data('id')-1;
}

var addOneClass = function(num) {
	var stylesheet = stylesheets[num];
	var className = 'c'+(stylesheet.classes.length+1);
	stylesheet.classes.push('.' + className);
	stylesheet.update();
	$('#box').addClass(className);
};

var removeOneClass = function(num) {
	var stylesheet = stylesheets[num];
	stylesheet.classes.pop();
	stylesheet.update();
};

var addOneElement = function(num) {
	var stylesheet = stylesheets[num];
	stylesheet.elements.push('div');
	stylesheet.update();
	if(getBoxElementDepth() < stylesheet.elements.length)
		$('#box-container').html('<div>'+$('#box-container').html()+'</div>');
};

var removeOneElement = function(num) {
	var stylesheet = stylesheets[num];
	stylesheet.elements.pop();
	stylesheet.update();
};

$('#add-stylesheet').on('click', addStylesheet);


$('#stylesheet-section').on('click', '.add-class', function(){
	addOneClass(getSectionId(this));
});

$('#stylesheet-section').on('click', '.remove-class', function(){
	removeOneClass(getSectionId(this));
});

$('#stylesheet-section').on('click', '.add-10-classes', function(){
	var id = getSectionId(this);
	var i = 10;
	while(i--) {
		addOneClass(id);
	}
});


$('#stylesheet-section').on('click', '.add-element', function(){
	addOneElement(getSectionId(this));
});

$('#stylesheet-section').on('click', '.remove-element', function(){
	removeOneElement(getSectionId(this));
});

$('#stylesheet-section').on('click', '.add-10-elements', function(){
	var id = getSectionId(this);
	var i = 10;
	while(i--) {
		addOneElement(id);
	}
});

// May turn this into a direct edit mode
$('#stylesheet-section').on('click', '.sheet-display', function(){
	$(this).toggleClass('dark');
});

function RandomColorGenerator() {
	var defaultColors = ['gray', 'pink', 'green', 'blue', 'purple', 'orange', 'yellow', 'red'];
	var randomColor = function() { return Math.floor(Math.random() * 255); };
	var get3random = function(){ return [randomColor(),randomColor(),randomColor()]; };
	var checkSpread = function(colorArr) {
		return Math.abs(colorArr[1] - colorArr[0]) + Math.abs(colorArr[2] - colorArr[0]) > 100;
	};
	return function(){
		var color = defaultColors.pop();
		if (color) return color;
		do {
			color = get3random();
		}
		while(!checkSpread(color));

		return 'rgb('+color.join(',')+')';
	};
}

(function init(){
	addStylesheet();
})();