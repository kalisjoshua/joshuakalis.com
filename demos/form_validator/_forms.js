/* Validator v2.1
	universal form validator
	
	for any item needing validation add to the class variable of the element "validate-" + the arguments
	to validate against. The arguments are as follows:
		a     - ALPHA
		d#    - DATETIME
		e     - EMAIL
		f     - FIELDSET
		g#    - GROUPING
		l#-#  - LENGTH
		      - NULLITY (renamed to REQUIRED)
		n     - NUMERIC
		p     - PAIRING
		r     - REQUIRED
		s#    - SELECT MULTIPLE
		      - TIME (see DATETIME)
		z     - HUMANITY

	These arguments are not pattern dependant so they can come in any order in the class vairable of the
	element. (eg. validate-neg1 is the same as validate-g1ne and/or validate-eng1)
	
	Also any element can be a part of a group and can also be part of multiple groups and be validated 
	for each group independantly, except of course if two group rules contradict but I don't know how
	that would happen but I guess we'll see.
*/

var Validator = {
	d: {
	/* - DATE formats in _scripts.js under Patterns
		*/
		name: "DATE",
		check: function( rowObj ) { return /d\d\d/.test( rowObj.rule ); },
		isValid: function( rowObj ) {
			var flavor = parseInt( rowObj.rule.match( /d(\d\d)/ )[1], 10 );
			return ( !/^\s*$/.test( rowObj.src[0].value ) )? Patterns.DateTime.regex( Patterns.DateTime.Defaults[flavor] ).test( rowObj.src[0].value ): true;
		}
	},
	e: {
	/* - EMAIL if the field is an email address field. The regular expression will check to see
			if the form element's value is a standard email address.
		*/
		name: "EMAIL",
		check: function( rowObj ) { return /e/.test( rowObj.rule ); },
		isValid: function( rowObj ) {
			return ( !/^\s*$/.test( rowObj.src[0].value ) )? Patterns.email.test( rowObj.src[0].value ): true;
		}
	},
	f: {
	/* - FIELDSET to verify that radio/check boxes have a value.
			this is like "validate-n" for the text boxes; if there is not a single checkbox/radio button
			checked in the fieldset the validation will be negative (there will be an error) if nothing 
			is selected.
			
			if this is to be an optional field dependant on another option do not use the "validate-f"
			command, instead use the group #; "validate-g#"
		*/
		name: "FIELDSET",
		check: function( rowObj ) { return /f/.test( rowObj.rule ); },
		isValid: function( rowObj ) {
			valued = true;
			if( /r/.test( rowObj.rule ) ) {
				valued = false;
				var opts = rowObj.src[0].getElementsByTagName( "input" );
				for( var i = 0; i < opts.length; i++ ) { if( opts[i].checked ) { valued = true; } }
			}
			return valued;
		}
	},
	g: {
	/* - GROUP the number indicates what grouping this element should be verified against.
			Set the id property, of an optional element in the form, similar to this example:
				<input id="validate-g0" type="checkbox"...
				or
				<input id="validate-g0" type="radio"...
			
			Then any input elements with this as its class name will be validated according
			to this option.
		*/
		name: "GROUP",
		check: function( rowObj ) { return /(g\d+)/g.test( rowObj.rule ); },
		isValid: function( rowObj ) {
			return false;
		}
	},
	l: {
	/* - LENGTH (in characters) of an element. The integers following the l will define
			what the length-range of the field will be.
		*/
		name: "LENGTH",
		check: function( rowObj ) { return /l\d+(?:-\d+)/.test( rowObj.rule ); },
		isValid: function( rowObj ) {
			var range = /(\d+)(?:-(\d+))?/.exec( rowObj.rule );
			if( range[2] == undefined ) { range[2] = 0; range.shift(); range.sort(); }
			l = rowObj.src[0].value.length;
			return ( !/^\s*$/.test( rowObj.src[0].value ) )? range[0] <= l && l <= range[1]: true;
		}
	},
	n: {
	/* - NUMERIC float or integer values only
		*/
		name: "NUMERIC",
		check: function( rowObj ) { return /n/.test( rowObj.rule ); },
		isValid: function( rowObj ) {
			return /^(?:-?(?:\d+\.?\d*)|(?:\d*\.?\d+))$/.test( rowObj.src[0].value );
		}
	},
	p: {
	/* - PAIRS for matching 2 fields against each other; such as email validation.
		*/
		name: "PAIRS",
		check: function( rowObj ) { return /p/.test( rowObj.rule ); },
		isValid: function( rowObj ) {
			return ( !/^\s*$/.test( rowObj.src[0].value ) )? rowObj.src[0].value === rowObj.src[1].value: true;
		}
	},
	r: {
	/* - REQUIRED if the field is required regardless of any rules for the form. This element will 
			throw an error if it is null or only contains whitespace characters.
		*/
		name: "REQUIRED",
		check: function( rowObj ) { return /n/.test( rowObj.rule ); },
		isValid: function( rowObj ) {
			return !/^\s*$/.test( rowObj.src[0].value );
		}
	},
	s: {
	/* - MULTI-SELECT boxes
			The number(s) following the s should be the range select-able
		*/
		name: "MULTI-SELECT",
		check: function( rowObj ) { return /s\d+(?:-\d+)?/.test( rowObj.rule ); },
		isValid: function( rowObj ) {
			var range = /(\d+)(?:-(\d+))?/.exec( rowObj.rule );
			if( range[2] == undefined ) { range[2] = 0; range.shift(); range.sort(); }
			for( var i = 0, num = 0; i < rowObj.src[0].options.length; i++ ) { if( rowObj.src[0].options.selected ) { num++; } }
			alert( rowObj.src[0].value );
			return false;
		}
	},
	z: {
	/* - HUMANITY simply a text box that is hidden from the user so it should never be filled
			unless stylesheets are turned off and they can't read or the form was filled in by a program.
		*/
		name: "HUMANITY",
		check: function( rowObj ) { return /z/.test( rowObj.rule ); },
		isValid: function( rowObj ) {
			return rowObj.src[0].value == "";
		}
	}
};

function initForm( formObj ) {
	formObj.onsubmit = function() { return validForm( this ); };
	
	var rows = formObj.getElementsByTagName( "div" );
	LabelIndex = Browser.IE? 0: 1; // this is here to keep the logic from executing for each row
	
	formObj.validationRows = [];
	
	for( var r = 0; r < rows.length; r++ ) {
		if( /formRow/.test( rows[r].className ) ) {
			node = rows[r];
			validate = /validate/.test( node.className );
			
			if( !/\*$/.test( ( nodeLabel = node.childNodes[LabelIndex] ).innerHTML ) ) {
				// add asterisk to validation-r rows and hidden asterisks to non-validation rows
				nodeLabel.innerHTML += /validate-[^\s]*r[^\s]*/.test( node.className )? " *": " <span style=\"visibility: hidden;\">*</span>";
			}
			
			if( validate ) {
			/*
				initialize div.formRow objects with:
					rule		- type of validation to perform on source objects
					src[]		- form elements to be validated
					checks[]	- validation rules to be applied
					valid()		- performs the validation and returns the result
				*/
				formObj.validationRows.push( node );
				
				node.rule = node.className.match( /validate-([^\s]+)/ )[1];
				node.checks = node.rule.match( /[a-z]/g );
				
				node.src = [];
				for( var j = 0; j < node.childNodes.length; j++ ){
					// wire-up form elements in the div to the div itself
					if( /(?:input)|(?:select)|(?:textarea)|(?:fieldset)/i.test( node.childNodes[j].nodeName ) ) {
						node.src.push( node.childNodes[j] );
					}
				}
				
				node.valid = function() {
					// wire-up function to perform validation based on assigned rules
					this.className = this.className.replace( "error", "" ).trim();
					
					var isValid = true;
					for( var c = 0; c < this.checks.length; c++ ) { if( !Validator[this.checks[c]].isValid( this ) ) { isValid = false; }; }
					
					if( !isValid ) { this.className += " error"; }
					return isValid;
				}
				
				// **** what to do from here ****
				// wire-up event handlers for blur() of a formRow
				// wire-up blur and focus for rows (div)
				// write (port from previous version) validators
				// textarea character count display
				// multi-select items selected display
			}
		}
	}
}

function validForm( formObj ) {
/* check the entire form for errors before passing it on to the server
	*/
	formObj.isValid = false;
	
	fullCheck = true;
	for( var i = 0; i < formObj.validationRows.length; i++ ) {
		if( !formObj.validationRows[i].valid() ) { fullCheck = false; }
	}
	
	// next
	// check groups' validities
	
	formObj.isValid = fullCheck;
	return formObj.isValid;
}



