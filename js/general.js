$(function() {

	var irregular_verbs;
	var irregular_verbs_controller = new IrregularVerbsController();


	document.querySelector('#options_form').addEventListener("submit", function(e) {
		e.preventDefault();
		
		irregular_verbs = irregular_verbs_controller.startGame(irregular_verbs)

		return false;
	});

	document.querySelector('#irregular_verbs_form').addEventListener("submit", function(e) {
		e.preventDefault();

		irregular_verbs_controller.answer_game(irregular_verbs);

		return false;
	})
	
	document.querySelector('#irregular_verbs_bt').disabled = false;

	$('#total_verbs').attr('max', IrregularVerbs.getTotalVerbs());

	$(".button-collapse").sideNav();
	$('#modal-answers').modal({
		complete: function() {
			irregular_verbs_controller.modal_close(irregular_verbs);
		}
	});
	$('#modal-finish').modal({
		complete: function() {
			location.reload();
		}
	});
	$('#past').focus();

});


