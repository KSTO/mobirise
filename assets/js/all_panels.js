$(window).on("load",function() {
});

function toggle_panels(p) {
	if ( $("#panel_a_"+p).attr("aria-expanded").toLowerCase()=="false" ) {
		$("#panel_a_"+p).attr("aria-expanded","true");
		$("#collapse_"+p).show(500);
		$("#panel_"+p).find("span.fa").removeClass("fa-chevron-down");
		$("#panel_"+p).find("span.fa").addClass("fa-chevron-up");
	}
	else {
		$("#panel_a_"+p).attr("aria-expanded","false");
		$("#collapse_"+p).hide(500);
		$("#panel_"+p).find("span.fa").removeClass("fa-chevron-up");
		$("#panel_"+p).find("span.fa").addClass("fa-chevron-down");
	}
	$st=$("#panel_"+p).offset().top-100;
	$('html, body').animate({
    scrollTop: $st
	}, 500);
}
