"use strict";
var IrregularVerbsController = (function(){
	class IrregularVerbsController {

	    answer_game(irregular_verbs) {
	        let answer = {
				past: document.querySelector('#answer_past').value,
				past_participle: document.querySelector('#answer_past_participle').value
	        }

			let result = irregular_verbs.testAnswer(answer);
	        var correctAnswer = irregular_verbs.getAnswer();
			this.showResult( irregular_verbs, result, correctAnswer );
	        this.updatePoints( irregular_verbs.getPoints() );
	        
	    }
	    modal_close(irregular_verbs) {

	        if( irregular_verbs.isFinishedGame() ) {
	            this.finishGame( irregular_verbs.getPoints() );
	        }
	        else {
			    var new_verb_infinitive = irregular_verbs.setNewVerb();
			    this.prepareHtmlForStartGame(new_verb_infinitive)
	        }
	    }

	    showResult(irregular_verbs, result, correctAnswer) {
			document.querySelector('#modal-title').innerHTML = this.getMessageText(irregular_verbs, result);

			console.log(correctAnswer)
			$('.verb-infinitive').html(correctAnswer.infinitive);
			$('.verb-past').html( this.getAnswerText(correctAnswer.past, result.past) );
			$('.verb-past-participle').html( this.getAnswerText(correctAnswer.past_participle, result.past_participle) );
			$('.verb-translate').html( this.getAnswerText(correctAnswer.translate, true) );
			$('#modal-answers').modal('open');
			$('#modal-answers .btn').focus();
	    }

	    updatePoints( points ) {

			$('.points_correct').html(points.correct);
			$('.points_wrong').html(points.wrong);
			$('.points_consective').html(points.consective);

	    }

	    finishGame( points ) {

			$('.points_correct').html(points.correct);
			$('.finish_points_wrong').html(points.wrong);
			$('.points_max_consective').html(points.max_consective);
			$('.points_consective').html(points.consective);
			$('#modal-finish').modal('open');
			$('#modal-finish .btn').focus();

	    }

	    getMessageText(irregular_verbs, answer) {

			if(
					(answer.past && answer.past_participle) ||
					(answer.past && irregular_verbs.isValidatingPast()) ||
					(answer.past_participle && irregular_verbs.isValidatingPastParticiple())
				) {
				return '<span class="green-text text-darken-4">Good Job. All Right.</span>'
			}

			if( !answer.past && !answer.past_participle) {
				return '<span class="red-text text-darken-4">Ops. All Wrong.</span>';
			}

			if( !answer.past && irregular_verbs.isValidatingPast()) {
				return '<span class="orange-text text-darken-4">You wrong the verb in past.</span>';
			}

			if( !answer.past_participle && irregular_verbs.isValidatingPastParticiple) {
				return '<span class="orange-text text-darken-4">You wrong the verb in past participle.</span>';
			}
		}

		getAnswerText(text, is_correct) {
			var myclass = 'red-text text-darken-4';
			if( is_correct ) {
				myclass = 'green-text text-darken-4';
			}
			return '<span class="' + myclass + '">' + text + '</span>';
		}

		getOptions() {
			return {
				validate_past: document.querySelector('#past').checked,
				validate_past_participle: document.querySelector('#past').checked,
				total_verbs: document.querySelector('#total_verbs').value
			}
		}
		prepareHtmlForStartGame(new_verb_infinitive) {

			document.querySelector('#game-options').classList.add('hide');
			document.querySelector('#game-question').classList.remove('hide');
			document.querySelector('#game-result').classList.remove('hide');

			$('.verb-infinitive').html(new_verb_infinitive);
			document.querySelector('#answer_past').value = '';
			document.querySelector('#answer_past_participle').value = '';
			document.querySelector('#answer_past').focus()

		}

		startGame(irregular_verbs) {

			var options = this.getOptions();

			irregular_verbs = new IrregularVerbs(options);
			var new_verb_infinitive = irregular_verbs.setNewVerb();

			this.prepareHtmlForStartGame(new_verb_infinitive);

			return irregular_verbs;

		}
	        
	}

	return IrregularVerbsController;

})();