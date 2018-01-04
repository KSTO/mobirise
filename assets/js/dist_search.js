$(window).on("load",function() {
});

function reload_entities() {
	var formData=[{name: "frm_action", value: "reload_entities"}];
	if ( $("#who_am_i")=="nongov" ) {
		formData.push({name: "frm_en_type", value: "business"})
	}
	var ajax_call=$.ajax({
		datatype: "json",
		method: "POST",
		url: "/kansasstatetreasurer/ajax/dist_search.php",
		data: formData,
		timeout: 15000,
		async: true
	});
	ajax_call.done(function( data, textStatus, jqXHR ) {
		alert(data);
		var items=JSON.parse(data);
		if ( items['success'] ) {
			$("#select_en_code").html(items['entities']);
		}
	});
	ajax_call.fail(function( jqXHR, textStatus, errorThrown ) {
		alert("Search not available ( INT: "+errorThrown+" ), please try later")
	});
}

function change_who_am_i(r) {
	if ( r ) $("#select_who_am_i").val("");
	$c1=$("#select_who_am_i").val().toUpperCase();
	$(".section_criteria").show();
	$(".section_result_type").show();
	if ( $c1=="PUBLIC" ) {
		$("#display_who_am_i").text("I am a public citizen")
		$("#hidden_who_am_i").val("public");
		$("#section_di_warrno").hide();
		$("#section_di_warrno").hide();
		$("#section_make_confirmation").hide();
		$(".section_result_type").hide();
	}
	else if ( $c1=="STATEEMP" ) {
		$("#display_who_am_i").text("I am a state employee")
		$("#hidden_who_am_i").val("stateemp");
		$("#section_req_email").hide();
	}
	else if ( $c1=="CITYEMP" ) {
		$("#display_who_am_i").text("I work for a city")
		$("#hidden_who_am_i").val("cityemp");
		$("#section_req_email").hide();
	}
	else if ( $c1=="CNTYEMP" ) {
		$("#display_who_am_i").text("I work for a county")
		$("#hidden_who_am_i").val("cntyemp");
		$("#section_req_email").hide();
	}
	else if ( $c1=="NONGOV" ) {
		$("#display_who_am_i").text("I work for a non-government entity")
		$("#hidden_who_am_i").val("nongov");
	}
	else {
		$("#display_who_am_i").text("")
		$("#hidden_who_am_i").val("");
	}

	if ( $("#hidden_who_am_i").val().length ) {
		$("#section_select_identity").hide(500,function() {
			$("#section_display_identity").show(100,function() {
				$("#section_select_criteria").show(500);
			});
		});
	}
	else {
		$("#section_display_identity").hide();
		$("#section_select_criteria").hide(500,function() {
			$("#section_select_identity").show(100);
		});
	}
/*	if ( !r ) reload_entities(); */
}