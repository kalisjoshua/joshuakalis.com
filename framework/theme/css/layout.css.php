<?php require "_variables.php"; ?>

p#SkipToContent { display: none; }

article {
	padding-top: 50px;
	}
	
body {
	color: <?php echo $text; ?>;
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
	background: <?php echo $body; ?> url(theme/images/bg_<?php echo $activeScheme; ?>.jpg) <?php echo $attachment; ?> repeat-x 0px 30px;
	text-align: center;
	}
	
nav {
	position: absolute;
	right: 0px;
	top: 10px;
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
				color: <?php echo $light; ?>;
				margin: 0px 4px;
				padding: 15px 10px;
				text-decoration: none;
				}
			nav ul li a:hover,
			body.About nav ul li.about a,
			body.Downloads nav ul li.downloads a,
			body.Portfolio nav ul li.portfolio a,
			body.Projects nav ul li.projects a,
			body.Resume nav ul li.resume a {
				color: #FFFFFF;
				background: <?php echo $menu; ?>;
				}