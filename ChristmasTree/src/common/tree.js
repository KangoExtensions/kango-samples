// ==UserScript==
// @name jQueryDemo
// @include http://*
// @include https://*
// ==/UserScript==

function init() {
	var tree = $(document.createElement('img')).attr({
		src: 'http://kangoextensions.com/misc/tree.png',
		title: 'Christmas tree'
	}).css({
		position: 'absolute',
		top: '10px',
		left: document.body.clientWidth - 280 + 'px',
		'z-index': '10000'
	}).appendTo(document.body);

	tree.click(function() {
		alert('Tree click');
	});
}

// Ignore frames
if(window == window.top) {
	init();
}