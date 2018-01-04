$(window).on("load",function() {
});

function change_paperless() {
	if ( $("#cl_paperless_0").prop("checked") ) {
		$("#cl_paymethod_1").prop("checked",true);
		$("#personal_information").show(300,function() {
			$("#paymethod_pref").show(300,function() {
				change_paymethod();
			});
		});
	}
	else {
		$("#bank_information").hide(300,function() {
			$("#paymethod_pref").hide(300,function() {
				$("#personal_information").hide(300);
			});
		});
	}
}

function change_paymethod() {
	if ( $("#cl_paymethod_1").prop("checked") ) $("#bank_information").show(300);
	else $("#bank_information").hide(300);
}

function remove_property(p) {
	if ( p ) {
		var formData=[{name: "frm_action", value: "remove_property"}];
		formData.push({name: "pr_code", value: p});
		var ajax_call=$.ajax({
			datatype: "json",
			method: "POST",
			url: "/kansasstatetreasurer/ajax/request_claims.php",
			data: formData,
			timeout: 15000,
			async: false
		});
		ajax_call.done(function( data, textStatus, jqXHR ) {
			var items=JSON.parse(data);
			if ( items['success'] ) {
				$("#prop_"+p).hide();
			}
		});
		ajax_call.fail(function( jqXHR, textStatus, errorThrown ) {
			alert("Process not available ( "+errorThrown+" ), please try later")
		});
	}
}

function remove_properties() {
	var formData=[{name: "frm_action", value: "remove_all"}];
	var ajax_call=$.ajax({
		datatype: "json",
		method: "POST",
		url: "/kansasstatetreasurer/ajax/request_claims.php",
		data: formData,
		timeout: 15000,
		async: false
	});
	ajax_call.done(function( data, textStatus, jqXHR ) {
		var items=JSON.parse(data);
		if ( items['success'] ) {
			$("#prop_list").html("<span class=\"text-danger\">Your shopping cart is empty.  You may <a href=\"up_search.php\">search for your name</a> and return back here if you find something.</span>");
		}
	});
	ajax_call.fail(function( jqXHR, textStatus, errorThrown ) {
		alert("Process not available ( "+errorThrown+" ), please try later")
	});
}

function submit_form() {
	$('[data-toggle="popover"]').popover('dispose');
	$("._kst_entry-error").removeClass("_kst_entry-error");
	var formData=$("#request_claims").serializeArray(); 
	formData.push({name: "frm_action", value: "file_claims"});
	var ajax_call=$.ajax({
		datatype: "json",
		method: "POST",
		url: "/kansasstatetreasurer/ajax/request_claims.php",
		data: formData,
		timeout: 15000,
		async: false
	});
	ajax_call.done(function( data, textStatus, jqXHR ) {
		var items=JSON.parse(data);
		if ( items['success'] ) {
			alert("No errors were found, rfis/claims would get filed and page would display results");
		}
		else {
			$(items['errors']).each(function(index,element) {
				$("#"+element.id).attr("data-toggle","popover").attr("data-content",element.message).attr("data-placement","top").attr("data-trigger","focus").popover();
/*				$("#"+element.id).popover('show'); */
				$("#"+element.id).addClass("_kst_entry-error");
				if ( typeof $last_id=="undefined" ) $last_id=element.id;
			});
			$(".arrow").addClass("_kst_popover-arrow");
			$st=$("#"+$last_id).offset().top-100;
			$('html, body').animate({
		    scrollTop: $st
			}, 500);
			$("#"+$last_id).select().focus();
		}
	});
	ajax_call.fail(function( jqXHR, textStatus, errorThrown ) {
		alert("Claim filing not available ( INT: "+errorThrown+" ), please try later")
	});
	
}
/*
function help_aba() {
	$("#help_aba_modal").modal();
	$("#help_aba_button").focus();
}

function help_acct() {
	$("#help_acct_modal").modal();
	$("#help_acct_button").focus();
}
*/