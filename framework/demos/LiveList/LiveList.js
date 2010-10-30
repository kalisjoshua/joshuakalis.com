var jkdLib = new function() {

	var Debug = {
		IE: 3,
		FF: 3
	};
	// end Debug Collection
	
	var Browser = {
		FF:           navigator.userAgent.indexOf( 'Firefox' ) > -1,
		Gecko:        navigator.userAgent.indexOf( 'Gecko' ) > -1 && navigator.userAgent.indexOf( 'KHTML' ) == -1,
		IE:           !!( window.attachEvent && !window.opera ),
		IE6:          /MSIE\s6/.test( navigator.appVersion ),
		IE7:          /MSIE\s7/.test( navigator.appVersion ),
		MobileSafari: !!navigator.userAgent.match( /Apple.*Mobile.*Safari/ ),
		Opera:        !!window.opera,
		WebKit:       navigator.userAgent.indexOf( 'AppleWebKit/' ) > -1
	};
	// end Browser Collection
	
	var Exception = {
		create: function( name, message ) {
			this.getName 		= function() { return name; };
			this.getMessage 	= function() { return message; };
			this.toString 		= function() { return '[' + name + ']\n' + message + '\n' + location; };
		},
		formatter: function( e ) {
			var message = 'Error Object {';
			for( var i in e ) message += '\n' + i + ': ' + e[i];
			return message + '\n}';
		}
	};
	Exception.DataError = new Exception.create( 'DataError', 'Data does not match fields.', '' );
	Exception.RequiredArgumentError = new Exception.create( 'RequiredArgumentError', 'Required argument to function/object not supplied.', '' );
	// end Exception Object
	
	var Logger = new function() {
		function Message( level, message, t ) {
			this.level = ( /^\d+$/.test( level ) )? level: 1;
			this.console = function( prefix ) {
				switch( this.level ) {
					case 1:
						console.log( prefix + this.toString() );
						break;
					case 2:
						console.warn( prefix + this.toString() );
						break;
					case 3:
					case 4:
					default:
						console.error( prefix + this.toString() );
						break;
				}
			};
			this.toString = function() { return message; };
		}
		// end Message Class
		var log = [ new Message( 0, 'Start of Logger...') ];
		var add = function( level, message ) { log.push( new Message( level, message ) ); };
		
		this.clear = function() { log = [ new Message( 0, 'Log cleared...' ) ]; };
		
		this.error = function( message ) { add( 3, message ); };
		this.errorObject = function( e ) { add( 4, Exception.formatter( e ) ); };
		this.info = function( message ) { add( 1, message ); };
		this.warn = function( message ) { add( 2, message ); };
		
		this.output = function() {
			function pad( i, p ) {
				var r = '' + i;
				while( r.length < p ) { r = '0' + r; }
				return r;
			}
			var p = parseInt( log.length / 10 );
		
			if( Browser.FF && Debug.FF ) {
				console.clear();
				for( var i = 0; i < log.length; i++ ) {
					if( log[i].level >= Debug.FF ) { log[i].console( pad( i, p ) + ' ~ ' ); }
				}
			}
			var msg = '';				
			if( Browser.IE && Debug.IE ) {
				for( var i = 0; i < log.length; i++ ) {
					if( log[i].level >= Debug.IE ) { msg += '\n' + pad( i, p ) + ' ~ ' + log[i].toString(); }
				}
				if( msg !== '' ) { alert( msg ); }
			}
			this.clear();
		};
	}();
	// end Logger Object
	
	this.addEvent = function( obj, evType, fn ) {
		if( obj.addEventListener ) {
			obj.addEventListener( evType, fn, false );
			return true;
		}
		else if( obj.attachEvent ) {
			return obj.attachEvent( "on" + evType, fn );
		}
		else { return false; }
	};
	// end addEvent function
	
	/* **** LiveList 
		documentation...
	*/
	this.LiveList = function( _name, _fields, _source, _div, _options ) {
		var that = this;
		Logger.info( 'LiveList ' + _name + ' started.' );
		for( var i = 0; i < _fields.length; i++ ) { if( !_fields[i].filter ) { _fields[i].filter = function( q ) { return q; }; } }
		
		var dataTypes = {
			names: [ 'CSV', 'JSON' ],
			pattern: function() {
				var result = '^(?:';
				for( var i = 0; i < this.names.length; i++ ) { result += '(?:' + this.names[i] + ')|'; }
				return new RegExp( result.substr( 0, result.length - 1 ) + ')$', 'i' );
			}
			,test: function( q ) { return this.pattern().test( q ); }
		};
		
		var Data = new function( type, persist, values, fields ) {
			Logger.info( '###########################################' );
			Logger.info( 'LiveList.Data object start' );
			
			var initialize = {
				CSV: function( raw, count ) {
					Logger.info( 'Starting initialize.CSV' );
					var result = [];
					if( raw.indexOf( ',' ) > 0 ) raw = raw.split( ',' );
					
					if( raw.length % fields.length !== 0 && raw.length !== 0 ) {
						Logger.error( 'CSV count does not match fields count.' );
						throw Exception.DataError;
					}
					else {
						Logger.info( 'Begin chunking raw data into local object' );
						while( raw.length ) {
							var temp = raw.slice( 0, fields.length );
							result.push( raw.slice( 0, fields.length ) );
							raw = raw.slice( fields.length );
						}
					}
					Logger.info( 'CSV: ' + result );
					return result;
				},
				JSON: function( raw, count ) {
					Logger.info( 'Starting initialize.JSON' );
					if( raw === '' ) return [];
					
					var str = raw.toString();
					if( !raw.shift ) raw = eval( raw );
					
					for( var i = 0; i < raw.length; i++ ) {
						if( raw[i].length !== fields.length ) {
							Logger.error( 'Object ' + i + ' in the JSON evaluation does not have the same number of values as fields.' );
							throw Exception.DataError;
						}
					}
					if( str !== toJSON( raw ) ) {
						Logger.error( 'The parsed JSON string does not match the original JSON string.' );
						throw Exception.DataError;
					}
					Logger.info( 'JSON: ' + toJSON( raw ) );
					return raw;
				}
			}
			// end initialize function Collection
			
			var toJSON = function( ar ) {
				var result = '';
				for( var i = 0; i < ar.length; i++ ) {
					result += ',' + ( ( ar[i].shift )? toJSON( ar[i] ): /^-?\d+(?:\.\d+)?$/.test( ar[i] )? ar[i]: '"' + ar[i] + '"' );
				}
				return '[' + result.slice( 1 ) + ']';
			};
			// end toJSON function
			
			this.add = function( ar ) {
				Logger.info( 'Data.add( ' + ar + ' ) ' );
				
				if( ar.length % fields.length !== 0 ) {
					Logger.error( 'CSV count does not match fields count.' );
					throw Exception.DataError;
				}
				else {
					var insertAt = values.length + 1;
					if( _options.sequencing ) {
						if( !/^\d{1,2}$/.test( ar[0] ) || ar[0] < 0 ) { ar[0] = insertAt; }
						else { insertAt = ar[0] > 0? ar[0] - 1: 0; }
					}
					
					// trim input
					for( var i = 0; i < ar.legnth; i++ ) { ar[i] = ar[i].replace( /(?:^\s+)|(?:\s+$)/g, '' ); }
					// unique entry
					var isDuplicate = false;
					for( var i = 0; i < values.length; i++ ) {
						if( _options.sequencing? ar.slice( 1 ).join() === values[i].slice( 1 ).join(): ar.join() === values[i].join() ) {
							isDuplicate = true;
							break;
						}
					}
					
					if( !isDuplicate ) {
						values.splice( insertAt, 0, ar );
						this.update();
						Logger.info( 'Data.values = ' + toJSON( values ) );
						return true;
					}
					return false;
				}
			};
			// end add method
			
			this.empty = function() {
				Logger.warn( 'Data.values emptied ' + toJSON( values ) );
				values = [];
				this.update();
			};
			// end empty method
			
			this.getJSON = function() {
				return values;
			};
			// end getJSON method
			
			this.getValues = function() {
				return values;
			};
			// end getValues method
			
			this.modify = function( indx, ar ) {
				if( _options.sequencing && values[indx][0] != ar[0] ) {
					// sequencing changed
					this.remove( indx );
					this.add( ar );
				}
				else {
					values[indx] = ar;
				}
				this.update();
			};
			// end modify method
			
			this.remove = function( indx ) {
				if( indx < 0 || indx >= values.length ) return;
				Logger.warn( 'Data.remove( ' + indx + ' ) = ' + toJSON( values[indx] ) );
				values = values.slice( 0, indx ).concat( values.slice( indx + 1 ) );
				Logger.info( 'Remaining values: ' +  this.toString() );
				this.update();
			};
			// end remove method
			
			this.resequence = function() {
				if( _options.sequencing ) {
					for( var i = 0; i < values.length; i++ ) { values[i][0] = i + 1; }
				}
			};
			// end resequence method
			
			this.toString = function( alt ) {
				var serialize = {
					CSV: function() { return values.toString(); },
					JSON: function() { return toJSON( values ); }
				};
				// end values function Collection
				
				if( alt === 'undefined' )
					alt = type;
				else
					alt = ( dataTypes.test( alt ) )? alt.toUpperCase(): type;
				
				Logger.info( 'Output format ' + alt );
				return serialize[alt]();
			};
			// end toString method
			
			this.update = function() {
				this.resequence()
				persist.value = this.toString();
				Logger.info( persist.value );
				Display.redraw();
			};
			// end persist method
			
			values = initialize[type]( values, fields.length ) || [];
			Logger.info( 'Data.values initialized successfully' );
			
		}( _source.type, _source.input, _source.input.value, _fields );
		// end Data Object
		
		var Display = new function( div, Data, fields, options ) {
			Logger.info( '===========================================' );
			Logger.info( 'LiveList.Display object start' );
			
			var Editor = new function( options ) {
				function actionLink( text, title, cssClass, func ) {
					if( actionLink.arguments.length !== 4 ) {
						var args = '';
						for( var i = 0, ar = Array.slice( arguments ); i < ar.length; i++ ) { args +=  ', ' + ar[i]; }
						Logger.error( 'Required argument not supplied to function "actionLink". Arguments passed in: ' + args );
						throw Exception.RequiredArgumentError;
					}
					else {
						var link = document.createElement( 'A' );
						link.className = cssClass;
						link.innerHTML = text;
						link.title = title;
						link.onclick = func;
						return link;
					}
				}
			
				var div = document.createElement( 'DIV' );
				div.timer = 3; // seconds to leave open if mouse leaves the area
				div.onmouseout = (function( d ) { return function() {
					d.closer = setTimeout( (function( _d ) { return function() {
						if( _d.parentNode ) { _d.parentNode.removeChild( _d ); } };
					})( d ), d.timer * 1000 );
				}})( div );
				div.onmouseover = (function( d ) { return function() {
					if( d.closer ) clearTimeout( d.closer );
				}})( div );
				
				div.className = 'LiveList-Editor';
				div.style.overflow = 'hidden'; // leave to hide scrollbars completely
				
				// insert placeholder
				div.placeholder = document.createElement( 'DIV' );
				div.placeholder.className = 'placeholder';
				div.placeholder.innerHTML = 'House music';
				div.appendChild( div.placeholder );
				
				var buttons = document.createElement( 'DIV' );
				buttons.className = 'Editor-buttons';
				
				// Create close link for editor window
				buttons.appendChild(
					actionLink(
						'close',
						'Close the editor without changes',
						'Editor-close',
						function( d ) {
							return function() {
								d.close();
							};
						}( div )
					)
				);
				
				// Create copy link for editor window
				if( options.copy ) {
					buttons.appendChild(
						actionLink(
							'copy',
							'Create a new entry with these values to start with',
							'Editor-copy',
							function( d ) {
								return function() {
									var ar = [], inputs = d.getElementsByTagName( 'INPUT' );
									for( var i = 0; i < inputs.length; i++ ) { ar.push( inputs[i].value ); }
									Display.fill( ar );
									d.close();
								};
							}( div )
						)
					);
				}
				
				// Create edit/complete link for editor window
				if( options.edit ) {
					buttons.appendChild(
						actionLink(
							'complete',
							'Done making changes',
							'Editor-edit',
							function( d ) {
								return function() {
									var ar = [];
									for( var i = 0, nodes = d.getElementsByTagName( 'INPUT' ); i < nodes.length; i++ ) {
										ar.push( nodes[i].value );
									}
									Data.modify( d.placeholder.index, ar );
									d.close();
								};
							}( div )
						)
					);
				}
				
				// Create remove link for editor window
				if( options.remove ) {
					buttons.appendChild(
						actionLink(
							'remove',
							'Remove this item from the list',
							'Editor-remove',
							function( d ) {
								return function() {
									Data.remove( d.placeholder.index );
									d.close();
								};
							}( div )
						)
					);
				}
				
				div.appendChild( buttons );
				
				this.open = function( row ) {
					if( div.closer ) clearTimeout( div.closer );
					var scroll = row.parentNode;
					while( scroll.nodeName !== 'TD' && ( scroll = scroll.parentNode ) ) {}
					
					div.style.height = row.offsetHeight + 15 + 'px';
					div.style.width = row.offsetWidth + 'px';
					div.style.top = ( row.offsetTop - scroll.childNodes[0].scrollTop ) + ( Browser.IE? -12: +5 ) + 'px';
					
					div.placeholder.innerHTML = '';
					div.placeholder.index = row.index;
					var editTable = document.createElement( 'TABLE' );
					editTable.cellPadding = '0px';
					editTable.cellSpacing = '0px';
					div.placeholder.editTable = editTable;
					editTable.body = document.createElement( 'TBODY' );
					editTable.body.appendChild( document.createElement( 'TR' ) );
					
					for( var i = 0; i < row.childNodes.length; i++ ) {
						var td = document.createElement( 'TD' );
						td.className = 'LiveList-column-' + ( i < 10? '0' + i: i );
						td.style.width = row.childNodes[i].style.width;
						
						td.appendChild( document.createElement( 'INPUT' ) );
						td.childNodes[0].style.width = parseInt( row.childNodes[i].style.width, 10 ) - ( fields.length * 2 ) + 'px';
						td.childNodes[0].value = Data.getJSON()[row.index][i];
						
						editTable.body.childNodes[0].appendChild( td );
					}
					
					editTable.appendChild( editTable.body );
					div.placeholder.appendChild( editTable );
					
					scroll.appendChild( div );
					
					editTable.getElementsByTagName( 'INPUT' )[0].focus();
					div.onmouseout();
				};
				
				div.close = function() {
					div.parentNode.removeChild( div );
				};
			}( options );
			// end Editor Object; Editor is the popup div holding the editing functions
				
			var UIFrame = function() {
				div.innerHTML = '';
				
				function scrollbarCell( optionalLink ) {
					var node = document.createElement( 'TD' );
					node.appendChild( optionalLink || document.createTextNode( ' ' ) );
					node.className = 'scrollbarCell';
					return node;
				}
				
				var table = document.createElement( 'TABLE' );
				table.cellPadding = '0px';
				table.cellSpacing = '0px';
				table.body = document.createElement( 'TBODY' );
				table.className = 'LiveList ' + _name.replace( /\s+/g, '_' );
				table.appendChild( table.body );
				
				// Create table headers
				var row = document.createElement( 'TR' );
				row.className = 'LiveList-UI-header';
				row.className = '';
				for( var i = 0; i < fields.length; i++ ) {
					var node = document.createElement( 'TH' );
					node.className = 'LiveList-column-' + ( i < 10? '0' + i: i );
					node.style.width = fields[i].width + 'px';
					node.appendChild( document.createTextNode( fields[i].title ) );
					row.appendChild( node );
				}
				row.appendChild( scrollbarCell() );
				table.body.appendChild( row );
				// *** end headers
				
				
				// Create TD with scroller DIV inside
				var row = document.createElement( 'TR' ),
					node = document.createElement( 'TD' );
				node.className = 'LiveList-scroller';
				node.colSpan = fields.length + 1;
				node.appendChild( document.createElement( 'DIV' ) );
				node.childNodes[0].className = 'scrollerDIV';
				row.appendChild( node );
				table.body.appendChild( row );
				table.scroller = node.childNodes[0];
				// *** end scroller DIV
				
				
				// Create data entry row as footer
				var row = document.createElement( 'TR' );
				row.className = 'LiveList-UI-footer';
				row.className = '';
				for( var i = 0; i < fields.length; i++ ) {
					var node = document.createElement( 'TD' ),
						input = document.createElement( 'INPUT' );
					node.className = 'LiveList-column-' + ( i < 10? '0' + i: i );
					node.style.width = fields[i].width + 'px';
					input.type = 'text';
					input.name = fields[i].title.replace( ' ' , '_' );
					input.style.width = fields[i].width + 'px';
					node.appendChild( input );
					row.appendChild( node );
				}
				
					// Create append link
					var aLink = document.createElement( 'A' );
					aLink.className = 'Sprites Sprites-append';
					aLink.innerHTML = '+';
					aLink.title = 'Append this entry to the list above';
					aLink.onclick = function( row ) {
						return function() {
							var ar = [];
							for( var i = 0, nodes = row.getElementsByTagName( 'INPUT' ); i < nodes.length; i++ ) {
								ar.push( nodes[i].value.replace( /(?:^\s+)|(?:\s+$)/g, '' ) );
							}
							if( ar.join( '' ) !== '' ) {
								if( Data.add( ar ) ) { Display.clear(); }
							}
						};
					}( row );
					aLink.tableRow = row;
					row.appendChild( scrollbarCell( aLink ) );
				
				table.body.appendChild( row );
				// *** end footer
				
				div.appendChild( table );
				return table;
			}();
			// end UIFrame Object; UIFrame is a table object for the whole UI of the LiveList
			
			this.clear = function() {
				for( var i = 0, nodes = div.getElementsByTagName( 'INPUT' ); i < nodes.length; i++ ) {
					nodes[i].value = '';
				}
			};
			// end clear method
			
			this.fill = function( ar ) {
				if( ar.length !== fields.length ) {
					Logger.error( 'Array length doesn\'t match number of fields.' );
					throw Exception.DataError;
				}
				for( var i = 0, nodes = div.getElementsByTagName( 'INPUT' ); i < ar.length; i++ ) {
					nodes[i + ar.length].value = ar[i];
				}
			};
			// end fill method
			
			this.redraw = function() {
				UIFrame.scroller.innerHTML = '';
				
				var table = document.createElement( 'TABLE' );
				table.cellPadding = '0px';
				table.cellSpacing = '0px';
				table.appendChild( document.createElement( 'TBODY' ) );
				var headerRow = UIFrame.scroller.parentNode.parentNode.parentNode.childNodes[0];
				for( var i = 0; i < Data.getJSON().length; i++ ) {
					var row = document.createElement( 'TR' );
					row.className = 'row' + ( i % 2 === 0? 'Even': 'Odd' );
					row.index = i;
					row.onmouseover = function() { this.className += ' hover'; };
					row.onmouseout = function() { this.className = this.className.replace( ' hover', '' ); };
					if( options.copy || options.edit || options.modify || options.remove ) { row.onclick = function() { Editor.open( this ); }; }
					for( var j = 0; j < Data.getJSON()[i].length; j++ ) {
						var td = document.createElement( 'TD' ),
							pc = document.createElement( 'DIV' );
						pc.className = 'cellPadding';
						pc.appendChild( document.createTextNode( fields[j].filter( Data.getJSON()[i][j] ) ) );
						td.appendChild( pc );
						td.style.width = parseInt( headerRow.childNodes[j].clientWidth, 10 ) + 'px';
						td.className = 'col' + ( j %2 === 0? 'Even': 'Odd' );
						row.appendChild( td );
					}
					table.childNodes[0].appendChild( row );
				}
				UIFrame.scroller.appendChild( table );
			};
			// end redraw method
			
			this.redraw();
		}( _div, Data, _fields, _options );
		// end Display Object
		
		this.add = function( v ) {
			Data.add( v );
			Display.redraw();
		};
		this.empty = function() {
			Data.empty();
			Display.redraw();
		};
		this.remove = function( i ) {
			Data.remove( i );
			Display.redraw();
		};
		this.toString = function() { return Data.toString(); };
		
		Logger.info( 'LiveList ' + _name + ' complete.' );
	};
	// end LiveList Class
	
	this.Log = function() { return Logger; };
	
}();
// end jkLib Object