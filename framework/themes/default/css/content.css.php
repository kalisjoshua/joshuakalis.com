<?php require "_variables.php"; ?>

a {
    color: <?php echo $accent1; ?>;
    }
a:hover {
    text-decoration: none;
    }
    a.external {
    	background: url(../images/external.gif) repeat top right;
    	background: red;
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
	color: <?php echo $accent1; ?>;
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
    margin: 0px 0px 0px 20px;
    }
p {
    margin: 1em 0em;
    }

/* **** Portfolio **** */
.Portfolio figure {
	border: 1px solid <?php echo $contentFG; ?>;
	float: right;
	height: 190px;
	margin: 20px 0px 2em 1em;
	overflow: hidden;
	position: relative;
	width: 170px;
	z-index: 2;
	}
	.Portfolio figure img {
	    position: relative;
	    z-index: 3;
	    }
	.Portfolio figure ul {
	    background: <?php echo $menuBG1; ?>;
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
		.Portfolio figure ul li a {
			color: #FFFFFF;
			}
    		.Portfolio figure ul li a span {
    			display: none;
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
            background: <?php echo $accent2; ?>;
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
    	border-bottom: 1px dotted <?php echo $menuBG1; ?>;
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
        margin-left: 2em;
        }
    .Resume div.resElement div.level2 {
        margin-left: 2em;
        }