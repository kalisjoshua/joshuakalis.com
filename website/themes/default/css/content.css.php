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
	color: <?php echo $accent1; ?>;
	font-family: Palatino, Serif;
	font-size: 155%;
	position: relative;
	text-transform: uppercase;
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
	height: 250px;
	margin: 0px 0px 2em 1em;
	overflow: hidden;
	position: relative;
	width: 250px;
	}
	.Portfolio figure a {
		background: <?php echo $menuFG1; ?>;
		border-top: 1px solid <?php echo $contentFG; ?>;
		bottom: 0px;
		color: #FFFFFF;
		font-size: .8em;
		display: block;
		position: absolute;
		right: 0px;
		text-align: center;
		text-decoration: none;
		width: 100%;
		}
		.Portfolio figure a span {
			display: none;
			}

/* **** Resume **** */
.Resume h2 {
    clear: left;
	float: left;
	width: 150px;
}
.Resume div.resElement {
	margin-bottom: 1em;
	margin-left: 170px;
	}
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