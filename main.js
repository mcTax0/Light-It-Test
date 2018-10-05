var CARDS = [six, seven, eight, nine, ten, V, D, K, T]; // array with cards
var SUITS = ["Clubs","Hearts","Spades","Diamonds"];     // name of suits
var HAND_LIMIT = 6;										// max cards when dealing
var TRUMP_WEIGHT = 10;									// add 10 point if the card is trump

var get_number_players = function() {
	var number = prompt("Введите количество игроков");  
	while (isNaN(number)) {
		alert('Необходимо ввести число, попробуйте еще раз'); 
		number = prompt("Введите количество игроков");	
	}
	Math.round(number);
	while (number > 6) {								// the game can't start if there more than 6 players
		alert('Максимальное количество игроков не может превышать 6 человек');
		number = prompt("Введите количество игроков");
	} 
	return number;
};


var get_random_number = function() { 					// shuffle of the array
	return Math.random()*40 - 5;
};

var shuffle_array = function(array_to_shuffle) {
	array_to_shuffle.sort(get_random_number);
	return array_to_shuffle;
};

var distrib = function() {								// card creation with each suit and adding to the array
	var new_deck = [];
	for (var i = 0; i < CARDS.length; i++) {			
		for (var j = 0; j < SUITS.length; j++) {       
			var template = {name: null, suit: null};
			var obj = $.extend(true,{},template);
			obj.name = CARDS[i].name;
			obj.weight = CARDS[i].weight;
			obj.suit = SUITS[j];
			new_deck.push(obj);
		}
	}
	return new_deck;
};

var give_players_cards = function(number_players, deck) {	
	var hands = [];
	for (var i = 0; i < number_players; i++) {
		hands[i] = [];
		for (var j = 0; j < HAND_LIMIT; j++) {	
			hands[i][j] = deck.pop();
		}
	}
	return hands;
};

var change_trump_weight = function(hands, trump) {		// if the card is the trump,add extra points
	for (var i = 0; i < hands.length; i++) {
		for (var j = 0; j < HAND_LIMIT; j++) {
			if (hands[i][j].suit === trump) {
				hands[i][j].weight += TRUMP_WEIGHT;
			}
		}
	}
	return hands;
};


var get_strongest_hand_id = function(hands) {			// winning hand with the most points
	var max = 0;
	var id = null;
	for (var i = 0; i < hands.length; i++) {
		var hands_sum = 0;
		for (var j = 0; j < HAND_LIMIT; j++) {
			hands_sum += hands[i][j].weight;
		}
		if (hands_sum > max) {
			id = i;
			max = hands_sum;
		}
	}
	return id;
};


var game = function() {
	var number_players = get_number_players();
	var deck = shuffle_array(distrib());				// get deck with 36 cards
	var trump = shuffle_array(SUITS).pop();
	var hands = give_players_cards(number_players, deck);
	var change_hands = change_trump_weight(hands, trump);
	var strongest_hand_id = get_strongest_hand_id(change_hands);
	console.log('Game trump is '+ trump);
	console.log("Players hands  : ");
	console.log(change_hands);
	console.log("Winner's hand : ");
	console.log(change_hands[strongest_hand_id]);
	console.log('Thanks for game');
};

game();