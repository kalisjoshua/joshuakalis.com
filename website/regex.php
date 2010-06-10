<form name="regexTester" id="regexTester">
	<textarea name="src"></textarea>
	<input class="text" type="text" name="regex" />
	<div class="noBorder">
		<label><input type="checkbox" name="sensitive" /> case insensitive</label>
		<label><input type="checkbox" name="getAll" id="getAll" /> global find</label>
		<span id="currRegex"></span>
	</div>
	
	<div id="result"></div>
</form>