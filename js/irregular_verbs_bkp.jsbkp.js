"use strict";
var irregular_verbs = (function(){
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


	var verbs = [
		['to be', 'was/were', 'been', 'ser/estar'],
		['to beat', 'beat', 'beat', 'bater'],
		['to become', 'became', 'become', 'tornar-se'],
		['to begin', 'began', 'begun', 'começar'],
		['to bend', 'bent', 'bent', 'dobrar'],
		['to bet', 'bet', 'bet', 'apostar'],
		['to bite', 'bit', 'bit', 'morder'],
		['to blow', 'blew', 'blown', 'soprar'],
		['to break', 'broke', 'broken', 'quebrar'],
		['to bring', 'brought', 'brought', 'trazer'],
		['to build', 'built', 'built', 'construir'],
		['to buy', 'bought', 'bought', 'comprar'],
		['to catch', 'caught', 'caught', 'pegar'],
		['to choose', 'chose', 'chosen', 'escolher'],
		['to come', 'came', 'come', 'vir'],
		['to cost', 'cost', 'cost', 'custar'],
		['to cut', 'cut', 'cut', 'cortar'],
		['to deal', 'dealt', 'dealt', 'lidar com'],
		['to dig', 'dug', 'dug', 'cavar'],
		['to do', 'did', 'done', 'fazer'],
		['to draw', 'drew', 'drawn', 'desenhar'],
		['to drink', 'drank', 'drunk', 'beber'],
		['to drive', 'drove', 'driven', 'dirigir'],
		['to eat', 'ate', 'eaten', 'comer'],
		['to fall', 'fell', 'fallen', 'cair'],
		['to feed', 'fed', 'fed', 'alimentar'],
		['to feel', 'felt', 'felt', 'sentir'],
		['to fight', 'fought', 'fought', 'lutar'],
		['to find', 'found', 'found', 'achar'],
		['to fit', 'fit', 'fit', 'servir'],
		['to forget', 'forgot', 'forgotten', 'esquecer'],
		['to fly', 'flew', 'flown', 'voar'],
		['to freeze', 'froze', 'frozen', 'congelar'],
		['to get', 'got', 'gotten', 'pegar'],
		['to give', 'gave', 'given', 'dar'],
		['to go', 'went', 'gone', 'ir'],
		['to grow', 'grew', 'grown', 'crescer'],
		['to have', 'had', 'had', 'ter'],
		['to hear', 'heard', 'heard', 'escutar'],
		['to hide', 'hid', 'hidden', 'esconder'],
		['to hold', 'held', 'held', 'segurar'],
		['to hurt', 'hurt', 'hurt', 'machucar'],
		['to keep', 'kept', 'kept', 'manter'],
		['to know', 'knew', 'known', 'saber'],
		['to learn', 'learnt', 'learnt', 'aprender'],
		['to leave', 'left', 'left', 'sair'],
		['to lend', 'lent', 'lent', 'emprestar'],
		['to let', 'let', 'let', 'deixar'],
		['to lose', 'lost', 'lost', 'perder'],
		['to make', 'made', 'made', 'fazer'],
		//['aaaaaaaa', 'aaaaaaaa', 'aaaaaaaa', 'aaaaaaaa'],
	];
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

