"use strict";
class IrregularVerbsEvents {

    form_submit(e, irregular_verbs) {
		e.preventDefault();

        let answer = {
            past: document.querySelector('#past'),
            past_participle: document.querySelector('#past_participle')
        }

		let result = irregular_verbs.testAnswer(past, past_participle);
        var correctAnswer = irregular_verbs.getAnswer();
		this.showResult(result, correctAnswer);
        this.updatePoints( irregular_verbs.getPoints() );
		return false;
    }
    modal_close(irregular_verbs) {
		if(irregular_verbs.isValidatingPastParticiple()) $('#past_participle').focus();
		if(irregular_verbs.isValidatingPast()) $('#past').focus();


        if( irregular_verbs.isFinishedGame() ) {
            this.finishGame( irregular_verbs.getPoints() );
        }
        else {
		    irregular_verbs.randNewVerb();
        }
    }

    showResult(result, correctAnswer) {
		document.querySelector('#modal-title').innerHTML = this.getMessageText(correctAnswer);

		document.querySelector('#answer_infinitive').innerHTML = correctAnswer.infinitive;
		document.querySelector('#answer_past').innerHTML = getAnswerText(correctAnswer.past, result.past);
		document.querySelector('#answer_past_participle').innerHTML = getAnswerText(correctAnswer.past_participle, result.past_participle);
		document.querySelector('#answer_translated').innerHTML = getAnswerText(correctAnswer.translate, true);
		$('#modal-answers').modal('open');
		$('#modal-answers .btn').focus();
    }

    updatePoints( points ) {

		$('#points_correct').html(points.correct);
		$('#points_wrong').html(points.wrong);
		$('#points_consective').html(points.consective);

    }

    finishGame( points ) {

		document.querySelector('#finish_points_correct').innerHTML = points.correct;
		document.querySelector('#finish_points_wrong').innerHTML = points.wrong;
		document.querySelector('#finish_points_max_consective').innerHTML = points.max_consective;
		document.querySelector('#finish_points_consective').innerHTML = points.consective;
		$('#modal-finish').modal('open');
		$('#modal-finish .btn').focus();

    }

    getMessageText(answer) {

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

	getAnswerText(text, is_correct) {
		var myclass = 'red-text text-darken-4';
		if( is_correct ) {
			myclass = 'green-text text-darken-4';
		}
		return '<span class="' + myclass + '">' + text + '</span>';
	}

        
}
module.exports = IrregularVerbsEvents;