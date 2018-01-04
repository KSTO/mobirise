var cartCount=0;

$(window).on("load",function() {
	$(".detail_info").hide();
	$st=$("#prop_list").offset().top-100;
	$('html, body').animate({
    scrollTop: $st
	}, 500);
	interrogate_session("get_cart_size");
	$("._kst_bg-title").first().focus();
	$("._kst_cart-button_small").find("a").removeClass("hidden").removeClass("animated").show();
});

function toggle_details(d) {
	if ( $("#"+d+"_info").css("display").toLowerCase()=="none" ) {
		$("#"+d+"_info").show(300);
		$("#"+d+"_info").attr("aria-hidden","false");
		$("#"+d+"_info_toggle .fa").addClass("fa-chevron-up").removeClass("fa-chevron-down");
		$("#"+d+"_info_toggle").attr("aria-expanded","true");
	}
	else {
		$("#"+d+"_info").hide(300);
		$("#"+d+"_info").attr("aria-hidden","true");
		$("#"+d+"_info_toggle .fa").addClass("fa-chevron-down").removeClass("fa-chevron-up");
		$("#"+d+"_info_toggle").attr("aria-expanded","false");
	}
}

function clear_properties(props) {
	$(props).each(function(index,element) {
		if ( typeof props[index]=="number" ) {
			$("#add_to_cart_icon_"+props[index].toString()).hide();
			$("#add_to_cart_button_"+props[index].toString()).hide();
		}
		else {
			$("#add_to_cart_icon_"+element.toString()).hide();
			$("#add_to_cart_button_"+element.toString()).hide();
		}
	});
}

function interrogate_session(t) { 
	var formData=$("#up_search_form").serializeArray(); 
	formData.push({name: "frm_action", value: "interrogate_session"});
	var ajax_call=$.ajax({
		datatype: "json",
		method: "POST",
		url: "/kansasstatetreasurer/ajax/up_search.php",
		data: formData,
		timeout: 15000,
		async: true
	});
	ajax_call.done(function( data, textStatus, jqXHR ) {
		var items=JSON.parse(data);
		if ( items['success'] ) {
			if ( t=="get_cart_size" ) {
				cartCount=items['cart_count'];
				$("#itemsInCart-text").text(items['cart_count']);
				$("#itemsInCart-aria").text(("Request "+items['cart_count']+" Claim Packets"));
				if ( items['cart_count']>0 ) {
					clear_properties(items['cart_properties']);
					$("#page_cart_icon .mbr-iconfont").removeClass("mbri-shopping-cart");
					$("#page_cart_icon .mbr-iconfont").addClass("mbri-cart-full");
				}
				else {
					$("#page_cart_icon .mbr-iconfont").removeClass("mbri-cart-full");
					$("#page_cart_icon .mbr-iconfont").addClass("mbri-shopping-cart");
				}
			}
		}
	});
	ajax_call.fail(function( jqXHR, textStatus, errorThrown ) {
		alert("Search not available ( INT: "+errorThrown+" ), please try later")
	});
}

function update_session(t,v) { 
	var formData=$("#up_search_form").serializeArray(); 
	formData.push({name: "frm_action", value: "update_session"});
	if ( t=="add_to_cart" ) {
		formData.push({name: "frm_add_to_cart", value: "1"});
		formData.push({name: "frm_pr_code", value: v});
	}
	var ajax_call=$.ajax({
		datatype: "json",
		method: "POST",
		url: "/kansasstatetreasurer/ajax/up_search.php",
		data: formData,
		timeout: 15000,
		async: true
	});
	ajax_call.done(function( data, textStatus, jqXHR ) {
		var items=JSON.parse(data);
		if ( items['success'] ) {
			cartCount=items['cart_count'];
			if ( t=="add_to_cart" ) {
				$("#itemsInCart-text").text(items['cart_count']);
				$("#itemsInCart-aria").text(("Request "+items['cart_count']+" Claim Packets"));
				if ( items['cart_count']>0 ) {
					clear_properties(items['cart_properties']);
				}
			}
		}
	});
	ajax_call.fail(function( jqXHR, textStatus, errorThrown ) {
		alert("Search not available ( UPD: "+errorThrown+" ), please try later")
	});
}

function add_to_cart(e) {
	if ( cartCount>29 ) {
		alert("Your cart will only hold 30 properties");
	}
	else {
		$pr=$(e).attr("data-propertyNumber");
		update_session("add_to_cart",$pr);
		if ( $("#moving_cart").length>0 ) {}
		else {
			$buffer ="<div aria-hidden=\"true\" id=\"moving_cart\" style=\"font-weight: bolder; position: absolute; color: #002366; left: 0px; top: 500px; z-index: 100;\">\n";
				$buffer+="<span class=\"mbri-shopping-cart mbr-iconfont mbr-iconfont-btn mr-3\" aria-hidden=\"true\"></span>\n";
			$buffer+="</div>\n";
			$("body").append($buffer);
		}
		$cart=$("#page_cart_icon").offset();
		$element=$(e).offset();
		$("#moving_cart").css("left",($element.left.toString()+"px")).css("top",($element.top.toString()+"px"));
		$("#moving_cart span").animate({"font-size": "3rem"},500,function() {
			$("#moving_cart").animate({"left": ($cart.left.toString()+"px"), "top": ($cart.top.toString()+"px")},750,function() {
				$("#moving_cart").remove();
				$("#page_cart_icon .mbr-iconfont").removeClass("mbri-shopping-cart");
				$("#page_cart_icon .mbr-iconfont").addClass("mbri-cart-full");
			});
		});
	}
}