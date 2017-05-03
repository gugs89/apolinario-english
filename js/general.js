var irregular_verbs_init = function() {
	document.addEventListener("DOMContentLoaded", function() {
		irregular_verbs.init();
		document.querySelector('#irregular_verbs_form').addEventListener("submit", irregular_verbs.form_submit);
		document.querySelector('#irregular_verbs_bt').disabled = false;
	});

	$(function(){
		$(".button-collapse").sideNav();
		$('.modal').modal({
			complete: function() {
				irregular_verbs.modal_closed();
			}
		});
		$('#past').focus();
	});

};