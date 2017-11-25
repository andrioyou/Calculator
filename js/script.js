"use strict"

$.ready.then(function(){
	var currentEntry = 0,
		prevEntry = null,
		operation = null,
		info = null;

	function updateScreen(displayValue,infoValue) {
		$('.screen').html(displayValue);
		$('.screen-info').html(infoValue);
	};

	function operate(a, b, operation) {
		a = parseFloat(a);
		b = parseFloat(b);
		if (operation == '+') return a + b;
		if (operation == '-') return a - b;
		if (operation == '*') return a * b;
		if (operation == '/') return a / b;
	};

	function ScreenEmpty() {
		if (currentEntry == '') return true;
		return false;
	};

	function ScreenNotEmpty() {
		if (currentEntry !== '') return true;
		return false;
	};

	function ScreenIsZero() {
		if (currentEntry == '0') return true;
		return false;
	};

	function ScreenIsNotZero() {
		if (currentEntry !== '0') return true;
		return false;
	};

	function ClearAll() {
		currentEntry = '0';
		prevEntry = null;
		operation = null;
		info = 'clear';
	};

	function OperationNotEmpty() {
		if (operation !== null) return true;
		return false;
	};

	function NumberLengthExceeded() {
		if ( (currentEntry > 999999999999) | (currentEntry < -999999999999)) {
			ClearAll();
			info = 'number length exceeded'
			return true;
		}
		return false;
	};

	function prevEntryIsNotEmpty() {
		if (prevEntry !== null) return true;
		return false;
	};

	updateScreen(currentEntry,info);

	$('.button').click( function() {
		var buttonPressed = $(this).val();
		info = null;

		// Calculator's logic
		switch(buttonPressed) {
			case 'C':
				ClearAll()
				break;
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				if (ScreenIsZero()) currentEntry = buttonPressed;
				else currentEntry += buttonPressed;
				break;
			case '00':
				if (ScreenIsZero() | ScreenEmpty()) currentEntry = '0';
				else currentEntry += buttonPressed;
				break;
			case '.':
				if (ScreenEmpty()) currentEntry = '0';
				if ( currentEntry.indexOf('.') == -1 ) {
					currentEntry = parseFloat(currentEntry);
					currentEntry += '.';
				}
				break;
			case '+':
			case '-':
			case '*':
			case '/':
				if ( ScreenNotEmpty() & OperationNotEmpty() & prevEntryIsNotEmpty() ) {
					currentEntry = operate(prevEntry, currentEntry, operation);
					if (NumberLengthExceeded()) break;
					prevEntry = currentEntry;
					operation = buttonPressed;
					currentEntry = '';
					info = buttonPressed;
					break;
				}
				if (ScreenNotEmpty()) {
					prevEntry = currentEntry;
					currentEntry = '';
				}
				operation = buttonPressed;
				info = buttonPressed;
				break;
			case '+/-':
				if (ScreenNotEmpty()) currentEntry *= -1;
				break;
			case '%':
				if (ScreenNotEmpty()) currentEntry = currentEntry / 100;
				break;
			case '√':
				if (ScreenNotEmpty()) currentEntry = Math.sqrt(currentEntry);
				break;
			case '=':
				if ( ScreenNotEmpty() & OperationNotEmpty() & prevEntryIsNotEmpty() ) {
					currentEntry = operate(prevEntry, currentEntry, operation);
					if (NumberLengthExceeded()) break;
					operation = null;
					prevEntry = null;
					info = 'result';
				}
				break;
			case '◄':
				if ( ScreenNotEmpty() & ScreenIsNotZero() ) {
					currentEntry = currentEntry.toString();
					currentEntry = currentEntry.substring(0, 12);
					currentEntry = currentEntry.slice(0,-1);
				}
				if (ScreenEmpty()) currentEntry = '0';
				break;
		};

		// Screen update
		currentEntry = currentEntry.toString();
		currentEntry = currentEntry.substring(0, 12);
		updateScreen(currentEntry,info);

		// Button click animation
		$('input[value=\"' + buttonPressed + '\"]').parent('td')
			.animate({
				opacity: '0.7'
			}, {
				duration: 0
			})
			.animate({
				opacity: '1'
			}, {
				duration: 300
		});

	});


	// Text animation
	$('.text')
			.css('opacity', '0')
			.animate({
				opacity: '1',
				right: '0'
			}, {
				duration: 3000
	});

});
