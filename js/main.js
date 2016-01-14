(function () {

	var computerChoice = '<img src="img/bane.svg" alt="bane">';
	var playerTotal = 0;
	var playersTurn = true;
	var computersTurn = false;
	var computerTotal = 0;
	var ties = 0;
	var moves = 0;
	var board = [ 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var winningArraysIndexes = [
	[0, 1, 2],
	[0, 3, 6],
	[0, 4, 8],
	[1, 4, 7],
	[2, 5, 8],
	[2, 4, 6],
	[3, 4, 5],
	[6, 7, 8],
	];

	function render() {
		$('.chooseType').show();
		$('.gameBoard div').removeClass('inlineB');
		$('.gameBoard').removeClass('inlineB');
		$('.computerIcon').hide();
		$('.playerIcon').hide();
		$('.gameBoard div').html('').css('background-color', 'black');
		$('b').removeClass('winner');
		moves = 0;
		console.log(board);
	};

	function newGame() {
		render();
		playersTurn = true;
		computersTurn = false;
		play();
	};

	function play() {
		
		var playerChoice = '';
		var index = 0;

		function computerTurn() {

			var i;

			for (i=0; i<winningArraysIndexes.length; i++) {
				if (computersTurn) {
					var one = winningArraysIndexes[i][0];
					var two = winningArraysIndexes[i][1];
					var three = winningArraysIndexes[i][2];
					console.log(one + ', ' + two + ', ' + three)
					if (board[4] == 0) {
						board[4] = 2;
						$('.gameBoard div:eq(4)').html(computerChoice);
						index = 4;
						computersTurn = false;
					} else if ((board[one] == board[two]) && (board[two] == 2) && (board[three] == '')) {
						board[three] = 2;
						$('.gameBoard div:eq('+ three + ')').html(computerChoice);
						index = three;
						computersTurn = false;
					} else if ((board[one] == board[three]) && (board[three] == 2) && (board[two] == '')) {
						board[two] = 2;
						$('.gameBoard div:eq('+ two + ')').html(computerChoice);
						index = two;
						computersTurn = false;
					} else if ((board[two] == board[three]) && (board[three] == 2) && (board[one] == '')) {
						board[one] = 2;
						$('.gameBoard div:eq('+ one + ')').html(computerChoice);
						index = one;
						computersTurn = false;
					} else if ((board[one] == board[two]) && (board[two] == 1) && (board[three] == '')) {
						board[three] = 2;
						$('.gameBoard div:eq('+ three + ')').html(computerChoice);
						index = 3;
						computersTurn = false;
					} else if ((board[one] == board[three]) && (board[three] == 1) && (board[two] == '')) {
						board[two] = 2;
						$('.gameBoard div:eq('+ two + ')').html(computerChoice);
						index = two; 
						computersTurn = false;
					} else if ((board[two] == board[three]) && (board[three] == 1) && (board[one] == '')) {
						board[one] = 2;
						$('.gameBoard div:eq('+ one + ')').html(computerChoice);
						index = one;
						computersTurn = false;
					} 
				}
			}
			
			for (i=0; i<9; i++) {
				if (computersTurn){
					if (board[i] == '') {
						$('.gameBoard div:eq('+ i + ')').html(computerChoice);
						index = i;
						board[i] = 2;
						computersTurn = false;
					}
				}
			}

			if (testWin(index) === true) {
				computerTotal += 1;
				$('.computer b').html(computerTotal);
				$('.computer b').addClass('winner');
				setTimeout(function() {
					render();
					}, 2000);
			} else {
				moves += 1;
				playersTurn = true;
				playerTurn();
			}
		};

		function testWin(idx) {

			var i;

			for (i=0; i<winningArraysIndexes.length; i++) {

				if ($.inArray(idx, winningArraysIndexes[i]) != -1) {

					var one = winningArraysIndexes[i][0];
					var two = winningArraysIndexes[i][1];
					var three = winningArraysIndexes[i][2];

					if ((board[one] == board[two]) && (board[two] == board[three]) && (board[one] !== '')) {
						return true;
					}
				}
			}
		};

		$('.chooseType ul li').click(function (){
			$('.chooseType').css('display', 'none');
			playerChoice = ($(this).html());
			if (playerChoice === computerChoice) {
				computerChoice = '<img src="img/batman.svg" alt="batman">';
			}
			if (playerChoice === '<img src="img/batman.svg" alt="batman">') {
				computerChoice = '<img src="img/bane.svg" alt="bane">';
			}
			$('.playerIcon').html('<h2>Player</h2>' + playerChoice).show();
			$('.computerIcon').html('<h2>Computer</h2>' + computerChoice).show();
			$('.gameBoard div').addClass('inlineB');
			$('.gameBoard').addClass('inlineB');
			playersTurn = true;
			computersTurn = false;
			board = [ 0, 0, 0, 0, 0, 0, 0, 0, 0];
			playerTurn();
		});

		function playerTurn() {
			$('.gameBoard div').click(function() {
				if (playersTurn === true) {
					var index = ($('.gameBoard div').index(this));
					if ($(this).html() === '') {
						$(this).html(playerChoice);
						moves++;
						board[index] = 1;
						console.log(board);

						if (testWin(index)) {
							playerTotal++;
							playersTurn = false;
							$('.player b').html(playerTotal);
							$('.player b').addClass('winner');
							setTimeout(function(){
								render();
							}, 2000);
						} else if (moves < 9){
							playersTurn = false;
							computersTurn = true;
							computerTurn(index);
						} else {
							$('.gameBoard div').css('background-color', 'red');
							ties++;
							$('.tie b').html(ties);
							setTimeout(function(){
								render();
							}, 2000);
						}
						
					} 
				}
			});
		};
	};


	$('button').click(newGame);

	newGame();

})();











