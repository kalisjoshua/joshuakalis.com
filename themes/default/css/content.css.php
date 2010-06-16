<?php require "_variables.php"; ?>

a { color: <?php echo $accent1; ?>; }
a:hover { text-decoration: none; }
h1 { display: none; }
h2 {
	clear: both;
	color: <?php echo $accent1; ?>;
	font-family: Palatino, Serif;
	font-size: 155%;
	position: relative;
	text-transform: uppercase;
}
p { margin: 1em 0em; }
ul, ol { margin: 0px 0px 0px 20px; }
a.external {
	background: url(../images/external.gif) repeat top right;
	background: red;
	padding: 0px 20px 0px 0px;
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
.Portfolio h2 {
	margin: 1.5em 0px 0px;
}

/* **** Resume **** */
.Resume h2 {
	float: left;
	top: .65em;
	width: 150px;
}

.Resume p#downloads {
	padding: 30px 0px;
	text-align: right;
	}

.Resume div.resElement {
	margin-left: 170px;
	}
.Resume div.resElement h3 {
	float: right;
	font-size: 100%;
	}
.Resume div.resElement h4 {
	border-bottom: 1px dotted <?php echo $menuBG1; ?>;
	font-size: 114%;
	margin: .75em 0px .25em;
	}
.Resume div.resElement h5 {
	font-size: 107%;
	margin: 0em 0px .25em;
	text-align: right;
	}
.Resume div.resElement h6 {
	font-size: 100%;
	}
.Resume div.resElement ul { margin-left: 2em; }
.Resume div.resElement div.level2 { margin-left: 2em; }