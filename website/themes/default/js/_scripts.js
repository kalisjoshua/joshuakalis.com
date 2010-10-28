$(document).ready(function(){
    //$("a[href*=http://]").not("[href*=http://joshua]").addClass("external");
    $('a.Portfolio').lightBox(); // this is a comment

	$(".Portfolio h2, .Resume h2").click(function () {
	    $("div." + this.innerHTML).slideToggle(1000);
	})
		.addClass("pointer")
		.filter(function (index) {
        	return /history/i.test(this.innerHTML);
    	})
		.click();
});