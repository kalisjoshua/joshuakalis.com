<?php require "_variables.php"; ?>

a {
    color: <?php echo $link; ?>;
    }
a:hover {
    text-decoration: none;
    }
a.external {
	background: url(../images/external.gif) no-repeat top right;
	padding: 0px 20px 0px 0px;
	}

div.resElement {
    clear: both;
	margin-bottom: 1em;
	margin-left: 170px;
	}
	
dl {
    margin: 1.25em;
    }
    dl dt {
        font-weight: bold;
        }
    dl dd {
        margin: 0.5em 1.5em;
        }

figure.book {
    margin: 1.0em 0px 1.5em;
    }
    figure.book h1,
    figure.book h2,
    figure.book h3 {
        display: block;
        font-family: Palatino, Serif;
        font-size: 100%;
        text-transform: none;
        }
    figure.book h2 {
        font-size: 100%;
        }
    figure.book h3 {
        font-size: 100%;
        }
    figure.book img.cover {
        background: <?php echo $link; ?>;
        border: 6px solid gray;
        padding: 2px;
        }

figure.thmb {
	border: 1px solid <?php echo $text; ?>;
	float: right;
	height: 190px;
	margin: 20px 0px 2em 1em;
	overflow: hidden;
	position: relative;
	width: 170px;
	z-index: 2;
	}
	figure.thmb img {
	    position: relative;
	    z-index: 3;
	    }
	figure.thmb ul {
	    background: <?php echo $menu; ?>;
	    bottom: 0px;
	    list-style-type: none;
	    margin: 0;
	    position: absolute;
	    text-align: center;
	    width: 100%;
	    z-index: 4;
	    
	    <?php $opacity = 80; ?>
	    -moz-opacity:.<?php echo $opacity; ?>;
	    filter:alpha(opacity=<?php echo $opacity; ?>);
	    opacity:.<?php echo $opacity; ?>;
		}
		figure.thmb ul li a {
			color: #FFFFFF;
			}
    		figure.thmb ul li a span {
    			display: none;
    			}

h1,
h2,
h3,
h4,
h5,
h6 {
    }
h1 {
    display: none;
    }
h2 {
    clear: both;
	color: <?php echo $section; ?>;
	font-family: Palatino, Serif;
	font-size: 140%;
	position: relative;
	text-transform: uppercase;
    }
h2.accordion {
    background: url(../images/accordion_expand.jpg) scroll no-repeat right 2px;
    cursor: pointer;
    float: left;
    padding-right: 20px;
    }
h2.accordion:hover {
    background-image: url(../images/accordion_collapse.jpg);
    }
    h2.accordion.open {
        background-image: url(../images/accordion_collapse.jpg);
        }
    h2.accordion.open:hover {
        background-image: url(../images/accordion_expand.jpg);
        }

ol, 
ul {
    margin: 1.0em 0px 1.0em 20px;
    }
p {
    margin: 1em 0em;
    }

/* **** RegExp **** */
.RegExp form {
    text-align: center;
    }
    .RegExp form div,
    .RegExp form input[type=text],
    .RegExp form textarea {
        margin: 0 auto;
        width: 100%;
        }
    .RegExp form div {
        border: 1px solid lightGray;
        margin: 0 -1em;
        padding: 1em;
        text-align: left;
        }
        .RegExp form div span {
            background: <?php echo $section; ?>;
            }
    .RegExp form fieldset {
        text-align: right;
        }
        .RegExp form fieldset label {
            display: inline;
            padding-left: 5px;
            position: relative;
            top: 2px;
            }
    .RegExp form label {
        display: block;
        text-align: left;
        }
    .RegExp form textarea {
        height: 200px;
        }

/* **** Resume **** */
    .Resume div.resElement h3 {
    	float: right;
    	font-size: 100%;
    	}
    .Resume div.resElement h4 {
    	border-bottom: 1px dotted <?php echo $menu; ?>;
    	font-size: 114%;
    	margin: 0 0 .25em;
    	}
    .Resume div.resElement h5 {
    	font-size: 107%;
    	margin: 0em 0px .25em;
    	text-align: right;
    	}
    .Resume div.resElement h6 {
    	font-size: 100%;
    	}
    .Resume div.resElement ul {
        margin: 0px 0px 0px 2em;
        }
    .Resume div.resElement div.level2 {
        margin-left: 2em;
        }