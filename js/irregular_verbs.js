"use strict";
class IrregularVerbs {

	constructor(options) {
		this.is_validating_past = options.validate_past;
		this.is_validating_past_participle = options.validate_past_participle;
		this.total_verbs = options.total_verbs;



		this.verbs = [
			{ infinitive: 'to be', past: 'was/were', past_participle: 'been', translate: 'ser/estar'},
			{ infinitive: 'to beat', past: 'beat', past_participle: 'beat', translate: 'bater'},
			{ infinitive: 'to become', past: 'became', past_participle:'become', translate: 'tornar-se'},
			{ infinitive: 'to begin', past: 'began', past_participle:'begun', translate: 'começar'},
			{ infinitive: 'to bend', past: 'bent', past_participle:'bent', translate: 'dobrar'},
			{ infinitive: 'to bet', past: 'bet', past_participle:'bet', translate: 'apostar'},
			{ infinitive: 'to bite', past: 'bit', past_participle:'bit', translate: 'morder'},
			{ infinitive: 'to blow', past: 'blew', past_participle:'blown', translate: 'soprar'},
			{ infinitive: 'to break', past: 'broke', past_participle:'broken', translate: 'quebrar'},
			{ infinitive: 'to bring', past: 'brought', past_participle:'brought', translate: 'trazer'},
			{ infinitive: 'to build', past: 'built', past_participle:'built', translate: 'construir'},
			{ infinitive: 'to buy', past: 'bought', past_participle:'bought', translate: 'comprar'},
			{ infinitive: 'to catch', past: 'caught', past_participle:'caught', translate: 'pegar'},
			{ infinitive: 'to choose', past: 'chose', past_participle:'chosen', translate: 'escolher'},
			{ infinitive: 'to come', past: 'came', past_participle:'come', translate: 'vir'},
			{ infinitive: 'to cost', past: 'cost', past_participle:'cost', translate: 'custar'},
			{ infinitive: 'to cut', past: 'cut', past_participle:'cut', translate: 'cortar'},
			{ infinitive: 'to deal', past: 'dealt', past_participle:'dealt', translate: 'lidar com'},
			{ infinitive: 'to dig', past: 'dug', past_participle:'dug', translate: 'cavar'},
			{ infinitive: 'to do', past: 'did', past_participle:'done', translate: 'fazer'},
			{ infinitive: 'to draw', past: 'drew', past_participle:'drawn', translate: 'desenhar'},
			{ infinitive: 'to drink', past: 'drank', past_participle:'drunk', translate: 'beber'},
			{ infinitive: 'to drive', past: 'drove', past_participle:'driven', translate: 'dirigir'},
			{ infinitive: 'to eat', past: 'ate', past_participle:'eaten', translate: 'comer'},
			{ infinitive: 'to fall', past: 'fell', past_participle:'fallen', translate: 'cair'},
			{ infinitive: 'to feed', past: 'fed', past_participle:'fed', translate: 'alimentar'},
			{ infinitive: 'to feel', past: 'felt', past_participle:'felt', translate: 'sentir'},
			{ infinitive: 'to fight', past: 'fought', past_participle:'fought', translate: 'lutar'},
			{ infinitive: 'to find', past: 'found', past_participle:'found', translate: 'achar'},
			{ infinitive: 'to fit', past: 'fit', past_participle:'fit', translate: 'servir'},
			{ infinitive: 'to forget', past: 'forgot', past_participle:'forgotten', translate: 'esquecer'},
			{ infinitive: 'to fly', past: 'flew', past_participle:'flown', translate: 'voar'},
			{ infinitive: 'to freeze', past: 'froze', past_participle:'frozen', translate: 'congelar'},
			{ infinitive: 'to get', past: 'got', past_participle:'gotten', translate: 'pegar'},
			{ infinitive: 'to give', past: 'gave', past_participle:'given', translate: 'dar'},
			{ infinitive: 'to go', past: 'went', past_participle:'gone', translate: 'ir'},
			{ infinitive: 'to grow', past: 'grew', past_participle:'grown', translate: 'crescer'},
			{ infinitive: 'to have', past: 'had', past_participle:'had', translate: 'ter'},
			{ infinitive: 'to hear', past: 'heard', past_participle:'heard', translate: 'escutar'},
			{ infinitive: 'to hide', past: 'hid', past_participle:'hidden', translate: 'esconder'},
			{ infinitive: 'to hold', past: 'held', past_participle:'held', translate: 'segurar'},
			{ infinitive: 'to hurt', past: 'hurt', past_participle:'hurt', translate: 'machucar'},
			{ infinitive: 'to keep', past: 'kept', past_participle:'kept', translate: 'manter'},
			{ infinitive: 'to know', past: 'knew', past_participle:'known', translate: 'saber'},
			{ infinitive: 'to learn', past: 'learnt', past_participle:'learnt', translate: 'aprender'},
			{ infinitive: 'to leave', past: 'left', past_participle:'left', translate: 'sair'},
			{ infinitive: 'to lend', past: 'lent', past_participle:'lent', translate: 'emprestar'},
			{ infinitive: 'to let', past: 'let', past_participle:'let', translate: 'deixar'},
			{ infinitive: 'to lose', past: 'lost', past_participle:'lost', translate: 'perder'},
			{ infinitive: 'to make', past: 'made', past_participle:'made', translate: 'fazer'},
		].splice(0, this.total_verbs);
	}

	isValidatingPast() {
		return this.is_validating_past;
	}
	isValidatingPastParticiple() {
		return this.is_validating_past_participle;
	}

	getTotalVerbs() {
		return this.total_verbs;
	}

	randNewVerb() {

		var rand = Math.floor( Math.random() * ( this.verbs.length ) );

		this.current_verb = this.verbs[ rand ];
		this.in_game = true;

		this.verbs.splice(rand, 1);

		return this.current_verb.infinitive;
	}

	getInfinitiveVerb() {
		return this.current_verb.infinitive;
	}

	getAnswer() {
		this.in_game = false;
		return this.current_verb;
	}

	testAnswer(answer) {
		if( this.in_game ) {
			// @TODO: calculate points
		}

		this.in_game = false;

		return {
			past: answer.past == this.current_verb.past,
			past_participle: answer.past_participle == this.current_verb.past_participle
		}
	}

	isFinishedGame() {
		if( this.verbs.length == 0 ) {
			return true;
		}
		return false;
	}

}
module.exports = IrregularVerbs;


var irregular_verbs2 = (function(){
	var in_infinitive = "";
	var in_past = "";
	var in_past_participle = "";
	var translated = "";

	var is_validating_past = true;
	var is_validating_past_participle = true;

	var points_correct = 0;
	var points_wrong = 0;
	var points_consective = 0;
	var points_max_consective = 0;


	var latest_verbs = [];

	var randomNewVerb = function() {

		if( verbs.length == 0 ) {
			finishedGame();
			return;
		}


		var rand = Math.floor( Math.random() * ( verbs.length ) );

		[in_infinitive, in_past, in_past_participle, translated] = verbs[ rand ];

		document.querySelector('#infinitive').innerHTML = in_infinitive;
		document.querySelector('#past').value = '';
		document.querySelector('#past_participle').value = '';

		latest_verbs.push(verbs[ rand ]);
		verbs.splice(rand, 1);

	};

	var finishedGame = function() {

		verbs = latest_verbs;
		latest_verbs = [];

		document.querySelector('#finish_points_correct').innerHTML = points_correct;
		document.querySelector('#finish_points_wrong').innerHTML = points_wrong;
		document.querySelector('#finish_points_max_consective').innerHTML = points_max_consective;
		document.querySelector('#finish_points_consective').innerHTML = points_consective;
		$('#modal-finish').modal('open');
		$('#modal-finish .btn').focus();
	};

	var init = function() {

		if( type == 'past' || type == 'past-participle' ) {

			if( type == 'past' ) {
				is_validating_past_participle = false;
				$('#past_participle').removeAttr('required');
				$('.for-past-participle').hide();
			}
			if( type == 'past-participle' ) {
				is_validating_past = false;
				$('#past').removeAttr('required');
				$('.for-past').hide();
			}
		}

		randomNewVerb();

	};

	var verify = function() {

		return {
			past: document.querySelector('#past').value.toLowerCase().trim() == in_past,
			past_participle: document.querySelector('#past_participle').value.toLowerCase().trim() == in_past_participle,
		}
	}

	var form_submit = function(e) {
		e.preventDefault();

		var answer = verify();
		showResult(answer);
		calculatePoints(answer)
		return false;
	};

	var getMessageText = function(answer) {

		if(
				(answer.past && answer.past_participle) ||
				(answer.past && is_validating_past) ||
				(answer.past_participle && is_validating_past_participle)
			) {
			return '<span class="green-text text-darken-4">Good Job. All Right.</span>'
		}

		if( !answer.past && !answer.past_participle) {
			return '<span class="red-text text-darken-4">Ops. All Wrong.</span>';
		}

		if( !answer.past && is_validating_past) {
			return '<span class="orange-text text-darken-4">You wrong the verb in past.</span>';
		}

		if( !answer.past_participle && is_validating_past_participle) {
			return '<span class="orange-text text-darken-4">You wrong the verb in past participle.</span>';
		}
	}

	var getAnswerText = function(text, is_correct) {
		var myclass = 'red-text text-darken-4';
		if( is_correct ) {
			myclass = 'green-text text-darken-4';
		}
		return '<span class="' + myclass + '">' + text + '</span>';
	}

	var showResult = function (answer) {

		document.querySelector('#modal-title').innerHTML = getMessageText(answer);

		document.querySelector('#answer_infinitive').innerHTML = in_infinitive;
		document.querySelector('#answer_past').innerHTML = getAnswerText(in_past, answer.past);
		document.querySelector('#answer_past_participle').innerHTML = getAnswerText(in_past_participle, answer.past_participle);
		document.querySelector('#answer_translated').innerHTML = getAnswerText(translated, true);
		$('#modal-answers').modal('open');
		$('#modal-answers .btn').focus();
	};

	var calculatePoints = function (answer) {

		var is_correct = true;

		if( answer.past ) {
			points_correct++;
		}
		else
		if( is_validating_past ) {
			points_wrong++;
			is_correct = false;
		}

		if( answer.past_participle ) {
			points_correct++;
		}
		else 
		if( is_validating_past_participle ) {
			points_wrong++;
			is_correct = false;
		}

		if( is_correct ) {
			points_consective++;
		}
		else {
			points_consective = 0;
		}

		$('#points_correct').html(points_correct);
		$('#points_wrong').html(points_wrong);
		$('#points_consective').html(points_consective);

		if( points_consective > points_max_consective ) {
			points_max_consective = points_consective;
		}
	};

	var modal_closed = function() {
		if(is_validating_past_participle) $('#past_participle').focus();
		if(is_validating_past) $('#past').focus();
		randomNewVerb();
	};

	return {
        init: init,
        form_submit: form_submit,
        modal_closed: modal_closed
    }
})()

