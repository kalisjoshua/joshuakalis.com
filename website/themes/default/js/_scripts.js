$(document).ready(function(){
    //$("a[href*=http://]").not("[href*=http://joshua]").addClass("external");
    $('a.Portfolio').lightBox(); // this is a comment

	// add interactivity to all sections that have more than one item
	$(".Portfolio h2, .Resume h2").click(function () {
		// show/hide all but the first item in a section
	    $("div." + this.innerHTML).slice(1).slideToggle(1000);
	})
		.filter(function (inde) {
			// only apply behavior to sections with more than one item in the section
			return $("div." + this.innerHTML).length > 1;
		})
		.addClass("pointer")
		.filter(function (index) {
			// reduce the list to only the history section for collapse on page-load
        	return /history/i.test(this.innerHTML);
    	}).click();
});