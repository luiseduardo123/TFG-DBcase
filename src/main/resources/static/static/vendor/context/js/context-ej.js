$(document).ready(function(){
	
	context.init({preventDoubleContext: false});
	
	var box = [
		{text: $("#addNewAttribute").text(), action: function(e){
			$( "[functioninsert='addAtribute']").click();
		}},
		{text: $("#renameEntity").text(), href: '#', target:'_blank', action: function(e){
			_gaq.push(['_trackEvent', 'ContextJS Download', this.pathname, this.innerHTML]);
		}},
		{text: $("#removeEntity").text(), href: '#', target:'_blank', action: function(e){
			_gaq.push(['_trackEvent', 'ContextJS Download', this.pathname, this.innerHTML]);
		}},
		{text: $("#constraints").text(), href: '#', target:'_blank', action: function(e){
			_gaq.push(['_trackEvent', 'ContextJS Download', this.pathname, this.innerHTML]);
		}},
		{text: $("#tableUnique").text(), href: '#', target:'_blank', action: function(e){
			_gaq.push(['_trackEvent', 'ContextJS Download', this.pathname, this.innerHTML]);
		}},
	];
	
var box1 = [
		
		{header: 'Downloa1d'},
		{text: 'The Script', subMenu: [
			{header: 'Requires jQuery'},
			{text: 'context.js', href: '#', target:'_blank', action: function(e){
				_gaq.push(['_trackEvent', 'ContextJS Download', this.pathname, this.innerHTML]);
			}}
		]},
		{text: 'The Styles', subMenu: [
		
			{text: 'context.bootstrap.css', href: '#', target:'_blank', action: function(e){
				_gaq.push(['_trackEvent', 'ContextJS Bootstrap CSS Download', this.pathname, this.innerHTML]);
			}},
			
			{text: 'context.standalone.css', href: '#', target:'_blank', action: function(e){
				_gaq.push(['_trackEvent', 'ContextJS Standalone CSS Download', this.pathname, this.innerHTML]);
			}}
		]},
		{divider: true},
		{header: 'Meta'},
		{text: 'The Author', subMenu: [
			{header: '@jakiestfu'},
			{text: 'Website', href: 'http://jakiestfu.com/', target: '_blank'},
			{text: 'Forrst', href: 'http://forrst.com/people/jakiestfu', target: '_blank'},
			{text: 'Twitter', href: 'http://twitter.com/jakiestfu', target: '_blank'},
			{text: 'Donate?', action: function(e){
				e.preventDefault();
				$('#donate').submit();
			}}
		]},
		{text: 'Hmm?', subMenu: [
			{header: 'Well, thats lovely.'},
			{text: '2nd Level', subMenu: [
				{header: 'You like?'},
				{text: '3rd Level!?', subMenu: [
					{header: 'Of course you do'},
					{text: 'MENUCEPTION', subMenu: [
						{header:'FUCK'},
						{text: 'MAKE IT STOP!', subMenu: [
							{header: 'NEVAH!'},
							{text: 'Shieeet', subMenu: [
								{header: 'WIN'},
								{text: 'Dont Click Me', href: 'http://omglilwayne.com/', target:'_blank', action: function(){
									_gaq.push(['_trackEvent', 'ContextJS Weezy Click', this.pathname, this.innerHTML]);
								}}
							]}
						]}
					]}
				]}
			]}
		]}
	];
	context.attach('#diagram', box);
	
	context.settings({compress: true});
	
	
	$(document).on('mouseover', '.me-codesta', function(){
		$('.finale h1:first').css({opacity:0});
		$('.finale h1:last').css({opacity:1});
	});
	
	$(document).on('mouseout', '.me-codesta', function(){
		$('.finale h1:last').css({opacity:0});
		$('.finale h1:first').css({opacity:1});
	});
	
});