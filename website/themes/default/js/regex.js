function update() {
	var source = document.forms.regexTester.src;
	var testex = document.forms.regexTester.regex;
	if( source.value != "" && testex.value != "" ) {
		var sense = ( document.forms.regexTester.getAll.checked )? "g": "";
		sense += ( document.forms.regexTester.sensitive.checked )? "i": "";
		var show = $( "result" );
		show.innerHTML = "";
		
		var regex = RegExp( "" + document.forms.regexTester.regex.value.replace( /\s+/g, "\\s" ) + "", sense );	
		$( "currRegex" ).innerHTML = regex;
		if( regex.test( source.value ) ) {
			show.innerHTML = source.value.replace( regex, "<span class=\"highlight\">" + RegExp.lastMatch + "</span>" );
		}
	}
}