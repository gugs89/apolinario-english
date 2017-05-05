var irregular_verbs = new irregular_verbs();
var irregular_verbs_controller = new irregular_verbs_controller();

$(function(){
	document.querySelector('#irregular_verbs_form').addEventListener("submit", irregular_verbs_controller.form_submit);
	document.querySelector('#irregular_verbs_bt').disabled = false;

	$(".button-collapse").sideNav();
	$('.modal').modal({
		complete: function() {
			irregular_verbs_controller.modal_close(irregular_verbs);
		}
	});
	$('#past').focus();
});


