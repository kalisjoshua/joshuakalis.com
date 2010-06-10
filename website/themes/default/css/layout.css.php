<?php require "_variables.php"; ?>

p#SkipToContent { display: none; }

article {
	padding-top: 50px;
	}
	
body {
	color: <?php echo $contentFG; ?>;
	font-family: Arial, Verdana, Helvetica, sans-serif;
	font-size: .9em;
	line-height: 1.35em;
	margin: 0px auto;
	padding: 5px 0px 0px;
	position: relative;
	text-align: left;
	width: <?php echo $contentWidth; ?>px;
	}

footer {
	clear: both;
	font-size: .8em;
	padding: 2em 0px;
	}

header {
	position: relative;
	z-index: 1;
	}
	header a {
		font-size: 16px;
		text-decoration: none;
		}

html {
	background: <?php echo $bodyBG; ?> url(../images/bg_<?php echo $activeScheme; ?>.jpg) scroll repeat-x 0px 30px;
	text-align: center;
	}
	
nav {
	position: absolute;
	right: 0px;
	top: 0px;
	z-index: 10;
	}
	nav ul {
		list-style-type: none;
		margin: 0px;
		padding: 0px;
		}
		nav ul li {
			display: inline;
			}
			nav ul li a {
				color: <?php echo $menuFG1; ?>;
				margin: 0px 4px;
				padding: 15px 10px 3px;
				text-decoration: none;
				}
			nav ul li.active a,
			nav ul li a:hover {
				color: #FFFFFF;
				background: <?php echo $menuBG1; ?>;
				}