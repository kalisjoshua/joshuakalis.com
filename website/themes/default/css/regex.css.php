<?php require "_variables.php"; ?>

form#regexTester,
form#XMLtagger { margin-top: 1em; text-align: center; }
form#regexTester textarea,
form#XMLtagger textarea,
form#regexTester div,
form#regexTester input.text,
form#XMLtagger input {
	margin: .25em auto;
	padding: 2px 4px;
	width: 95%;
	border: 1px solid #80A39D;
}
form#XMLtagger textarea,
form#regexTester textarea {
	padding: 4px;
	height: 10em;
}
form#regexTester label,
form#XMLtagger label {
	text-align: left;
	display: block;
}
form#regexTester div { position: relative; }
form#regexTester div span#currRegex {
	position: absolute;
	top: 0px;
	right: 5px;
}
form#regexTester div#result {
	margin-top: .5em;
	text-align: left;
	height: 20em;
	overflow: auto;
}
form#regexTester span.highlight { background: lightBlue; }