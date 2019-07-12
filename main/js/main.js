// Helper functions
const helper = (() => {
	const openModal = (modal) => {
		modal.classList.add("show");
		modal.firstElementChild.classList.add("show");
		modal.setAttribute("aria-hidden", "false");
	}
	const closeModal = (modal) => {
		modal.classList.remove("show");
		modal.firstElementChild.classList.remove("show");
		modal.setAttribute("aria-hidden", "true");
	}
	const showSection = (section) => {

		section.classList.add("show");
	}
	const hideSection = (section) => {
		section.classList.remove("show");
	}


	return {openModal, closeModal, showSection, hideSection};
})();

// Navigation bar
const navigationBar = (() => {
	let header;
	const render = () => {
		header = document.getElementById("main-page-header");
		helper.showSection(header);
	};

	const show = () => {

		helper.showSection(header);
	}

	const hide = () => {

		helper.hideSection(header);
	};

	return {render, show, hide};
})();

// Players storage
const info = (() => {
	let players = [];

	const getPlayer = (index) => {
		return players[index];

	};
	const insertPlayer = (player) => {
		players.push(player);
	}
	const resetPlayers = () => {
		players = [];
	};

	return {getPlayer, insertPlayer, resetPlayers};
})();

// gameboard

const gameBoard = (() => {
	let array = ["", "", "", "", "", "", "", "", ""];
	let board = document.getElementById("board-section");
	let squares = document.querySelectorAll(".board-square");
	const disableButton = (position) => {
		
		squares[position].disabled = true;
	};
	const enableButton = (position) => {
		squares[position].disabled = false;
	}
	const fillSquare = (position, icon) => {
		array.splice(position, 1, icon);
		disableButton(position);
		console.log("Feel square was called ");
	};
	const emptySquares = () => {
		for(let i = 0; i < squares.length; i++) {
			array[i] = "";

		}
		console.log("empty squares was called ");
	}
	const lineFormed = (icon) => {
		if(array[0] === icon && array[1] === icon && array[2] === icon) {
			console.log("Line form return true;");
			return true;
		}
		else if(array[3] === icon && array[4] === icon && array[5] === icon) {
			console.log("Line form return true;");
			return true;
		}
		else if(array[6] === icon && array[7] === icon && array[8] === icon) {
			console.log("Line form return true;");
			return true;
		}
		else if(array[0] === icon && array[3] === icon && array[6] === icon) {
			console.log("Line form return true;");
			return true;
		}
		else if(array[1] === icon && array[4] === icon && array[7] === icon) {
			console.log("Line form return true;");
			return true;
		}
		else if(array[2] === icon && array[5] === icon && array[8] === icon) {
			console.log("Line form return true;");
			return true;
		}
		else if(array[0] === icon && array[4] === icon && array[8] === icon) {
			console.log("Line form return true;");
			return true;
		}
		else if(array[2] === icon && array[4] === icon && array[6] === icon) {
			console.log("Line form return true;");
			return true;
		}
		console.log("Line form return false;");
		return false;

	};

	const isDead = () => {
		let empty = 0;
		let emptySquare = null;
		for(let i = 0; i < array.length; i++) {
			if(array[i] === "") {
				// Make sure that there is only one empty square
				if(empty === 0) {

					empty++;

					// Keep track of a single empty square
					emptySquare = i;
				}
				else{
					// Reset the empty square tracking  if there are more than two empty squares
					emptySquare = null;
					return false;	
				}
			
			}
		}
		
		// Check if filling this Single empty square with either icon wins the game or not
		array[emptySquare] = "X";
		if(lineFormed("X") === true) {
			array[emptySquare] = "";
			return false;
					
		}
		array[emptySquare] = "O";
		if(lineFormed("O") === true) {
			array[emptySquare] = "";
			return false;
		}
		array[emptySquare] = "";
		return true;
	};

	const render = () =>{
		// I'm not sure yet
	}

	const show = () => {
		helper.showSection(board);
	};

	const hide = () => {
		helper.hideSection(board);
	};

	return {disableButton, enableButton, fillSquare, emptySquares, lineFormed, isDead, show, hide};
})();

const scoreBoard = (() => {

	let playerOneScore;
	let playerTwoScore;
	let playerOneNameElement;
	let playerTwoNameElement;
	let playerOneScoreElement;
	let playerTwoScoreElement;
	let scoreBoardElement;

	const render = () => {
		// Variable assignment for the elements
		playerOneNameElement = document.getElementById("player-one-name");
		playerTwoNameElement = document.getElementById("player-two-name");
		playerOneScoreElement = document.getElementById("player-one-score");
		playerTwoScoreElement = document.getElementById("player-two-score");
		scoreBoardElement = document.getElementById("score-section-container");

		helper.showSection(scoreBoardElement);

		playerOneScore = info.getPlayer(0).getPoints();
		playerTwoScore = info.getPlayer(1).getPoints();
		playerOneScoreElement.innerText = playerOneScore;
		playerTwoScoreElement.innerText = playerTwoScore;
		playerOneNameElement.innerText = info.getPlayer(0).getName();
		playerTwoNameElement.innerText = info.getPlayer(1).getName();

	};

	const updateScores = () => {
		playerOneScore = info.getPlayer(0).getPoints();
		playerOneScoreElement.innerText = playerOneScore;

		playerTwoScore = info.getPlayer(1).getPoints();
		playerTwoScoreElement.innerText = playerTwoScore;
	};

	const restartScores = () => {
		playerOneScore = 0;
		playerOneScoreElement.innerText = playerOneScore;
		playerTwoScore = 0;
		playerTwoScoreElement.innerText = playerTwoScore;
	};

	const show = () => {
		helper.showSection(scoreBoardElement);
	};

	const hide = () => {
		helper.hideSection(scoreBoardElement);
	};

	return {render, updateScores, restartScores, show, hide};
})();

// Gameboard to display on the Dom

const displayController = (() => {
	
	let playerTurn = null;
	let turn = 1;
	let icon = "cross";
	let squares = document.querySelectorAll(".board-square");
	let surrenderElement = document.getElementById("surrender-button");

	let turnModal = document.getElementById("turn-backdrop");
	let turnHeader = document.getElementById("turn-modal-header");
	let winModal = document.getElementById("win-backdrop");
	let winHeader = document.getElementById("win-modal-header");

	const getTurnNumber = () => {
		
		return turn;
	};
	const getPlayerTurnNumber = () => {
		
		return playerTurn;
	}
	const getIcon = () => {
		let currentIcon = icon;
		return currentIcon;
	};

	const startTurn = () => {
		// Display the modal or backdrop that states whose turn it is
		if(getPlayerTurnNumber() % 2 === 0) {
			turnHeader.innerText = `${info.getPlayer(1).getName()}'s Turn`;
			console.log(turnHeader.innerText);
		}
		else{
			turnHeader.innerText = `${info.getPlayer(0).getName()}'s Turn`;
			console.log(turnHeader.innerText);
		}

		helper.openModal(turnModal);
		
		for(let i = 0; i < squares.length; i++) {
			if(!(squares[i].classList.contains("cross") || squares[i].classList.contains("circle"))) { 
				gameBoard.enableButton(i);
			}
		}
		setTimeout(function() {

			helper.closeModal(turnModal);
		}, 800);
	};

	const startGame = () => {
		turn = 1;
		icon = "cross";
		playerTurn = playerTurn || (Math.floor((Math.random() * 2) + 1));

		if(playerTurn % 2 !== 0) {
			info.getPlayer(0).setIcon(1);
			info.getPlayer(1).setIcon(2);
		}
		else{
			info.getPlayer(0).setIcon(2);
			info.getPlayer(1).setIcon(1);
		}
		
		for(let i = 0; i < squares.length; i++) {
			squares[i].classList.remove("cross");
			squares[i].classList.remove("circle");
			gameBoard.enableButton(i);
		}
		gameBoard.emptySquares();
		startTurn();
	};

	const endTurn = () => {
		playerTurn++;
		turn++;
		if((getTurnNumber()) % 2 === 0) {
			icon = "circle";
		}
		else{
			icon = "cross";
		}
		for(let i = 0; i < squares.length; i++) {
			gameBoard.disableButton(i);
		}
	};
	const endGame = (winner) => {
		// State the winner of the game
		console.log("endgame was called ");
		if(winner === null) {
			winHeader.innerText = `Draw! No one wins...`;

		}
		else{
			winHeader.innerText = `${winner} Wins!`;
		}
		
		helper.openModal(winModal);

	}
	 
	for(let i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function(){
			if(!(squares[i].classList.contains("cross") || squares[i].classList.contains("circle"))) {
				squares[i].classList.add(getIcon());
				if((getPlayerTurnNumber()) % 2 === 0) {
					info.getPlayer(1).placeIcon(i);
				}
				else{
					info.getPlayer(0).placeIcon(i);
				}

			}			
		});
	}

	surrenderElement.addEventListener("click", function(){
		if((getPlayerTurnNumber()) % 2 === 0) {
			info.getPlayer(1).surrender(getPlayerTurnNumber());	
			console.log(getPlayerTurnNumber());		
			console.log("Player 2 has already surrendered ");
		}
		else{
			info.getPlayer(0).surrender(getPlayerTurnNumber());
			console.log(getPlayerTurnNumber());
			console.log("Player 1 has already surrendered ");
		}
	});


	return {startGame, startTurn, endTurn, endGame};
})();


// Player factory function
const Player = (name) => {
	
	let icon;
	let points = 0;

	const thisPlayer = this;
	const getName = () => name;
	const setIcon = (turn) => {
		if((turn % 2) !== 0) {icon = "X";}
		else if((turn % 2) === 0) {icon = "O";}
	};
	
	
	
	const getPoints = () => {
		return points;
	};
	const earnPoint = () =>{
		// Temporary placeholder
		console.log("earn point was called;");
		console.log(`${name} wins the round, and earns a point`);
		points++;
		scoreBoard.updateScores();
		displayController.endGame(getName());
	};
	
	const surrender = (turn) =>{
		// Temporary placeholder
		console.log(`${name} Has surrendered`);
		if((turn % 2) !== 0) {
			setTimeout(function () {
				console.log("Player 2 earns a point");
				console.log(turn);
				info.getPlayer(1).earnPoint();
			}, 750);
			

		}
		else {
			setTimeout(function () {
				console.log("Player 1 earns a point");
				console.log(turn);
				info.getPlayer(0).earnPoint();	
			}, 750);
			
		}
		
	};
	
	const placeIcon = (position) => {
		gameBoard.fillSquare(position, icon);
		console.log("checking between earned point or not ");
		displayController.endTurn();
		if(gameBoard.isDead()) {
			

				displayController.endGame(null);
			
			

		}
		else if(gameBoard.lineFormed(icon)) {
			setTimeout(function () {

				earnPoint();
			}, 750);
			

		}
		else{
			console.log("turn ended without earning a point ");
			

			setTimeout(function(){
				displayController.startTurn();
			}, 750);
			
		}
	};

	return {getName, getPoints, setIcon, placeIcon, surrender, earnPoint};
}

const mainMenu = (() => {
	let menuScreen;

	const render = () => {
		menuScreen = document.getElementById("main-menu");
		helper.showSection(menuScreen);
		menuScreen.addEventListener("click", function(){
			helper.hideSection(menuScreen);
			promptNames.openIntro();

		});
	};

	const show = () => {
		gameBoard.hide();
		scoreBoard.hide();
		helper.showSection(menuScreen);

	};

	return {render, show};
})();

const promptNames = (() => {
	const render = () => {
           let content = document.createElement("div");
	};
		let introModal = document.getElementById("intro-backdrop");
		let introHeader = document.getElementById("intro-modal-header");
		let nameField = document.getElementById("player-name-field");
		let submitButton = document.getElementById("intro-submit");
		let playerNumber = 1;
		let done = false;
		let namePlaceHolder = [];

		const openIntro = () => {
			helper.openModal(introModal);
		};

		function submitIntro() {

			if(nameField.value === "") {
				nameField.value = `Anonymous ${playerNumber}`;

			}
			let playerName = nameField.value;
			nameField.value = "";
			// namePlaceHolder.push(playerName);

			let challenger = Player(playerName);
			info.insertPlayer(challenger);
			playerNumber++;

			
		}

		function nextPlayer() {

			if(playerNumber > 2) {
				playerNumber = 1;
				done = true;
			}
			introHeader.innerText = `Player ${playerNumber}'s Name`;
		}
		
		submitButton.addEventListener("click", function(event){
			event.preventDefault();
			submitIntro();
			helper.closeModal(introModal);
			nextPlayer();
			if(done === false) {
				helper.openModal(introModal);

			}
			else {
				displayController.startGame();
				scoreBoard.render();	
				helper.showSection(document.getElementById("board-section"));
				navigationBar.render();
				done = false;
			}

		}); 

	return {openIntro};
})();

const promptPlayMore = (() => {
	let winModal = document.getElementById("win-backdrop");
	let winHeader = document.getElementById("win-modal-header");
	let againButton = document.getElementById("again-modal-button");
	let quitButton = document.getElementById("quit-modal-button");

	againButton.addEventListener("click", function(){
		displayController.startGame();
		helper.closeModal(winModal);

	});

	quitButton.addEventListener("click", function(){
		// Stop playing games and show the main menu
		helper.closeModal(winModal);
		navigationBar.hide();
		info.resetPlayers();
		mainMenu.show();
	});

	// helper.openModal(winModal);
})();

// This guarantees a reset before any future commands
info.resetPlayers();
mainMenu.render();







