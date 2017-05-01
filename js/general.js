document.addEventListener("DOMContentLoaded", function() {
	irregular_verbs.init( getParameterByName('type') );
	document.querySelector('#irregular_verbs_form').addEventListener("submit", irregular_verbs.form_submit);
	document.querySelector('#irregular_verbs_bt').disabled = false;
});

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function(){
	$(".button-collapse").sideNav();
	$('.modal').modal({
		complete: function() {
			irregular_verbs.modal_closed();
		}
	});
	$('#past').focus();
});