<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8" />
<title><?php echo ucfirst($page)." - $siteTitle"; ?></title>
<meta name="description" content="<?php echo $siteDesc;?>" />

<link rel="stylesheet" href="<?php echo $resources; ?>/css/css.min.php" type="text/css" />
<link rel="stylesheet" href="<?php echo $resources; ?>/css/print.css" type="text/css" media="print" />
</head>

<body class="<?php echo ucfirst($page); ?>">
    <p id="SkipToContent"><a href="#content">Skip to main content</a></p>

    <header role="banner">
        <a href="<?php echo $siteURL;?>"><?php echo $siteTitle; ?></a>
        <h1><?php echo ucfirst($page)." - $siteTitle"; ?></h1>
    </header>
    
    <nav role="navigation">
        <ul>
<?php foreach( $siteMenu as $item ) { ?>
            <li<?php if( strcasecmp($page, $item) == 0 ) { echo " class=\"active\""; } ?>><a href="<?php echo "$siteURL/$item"; ?>"><?php echo $item; ?></a></li>
<?php } ?>
        </ul>
    </nav>
    
    <section>
        <article id="content" role="main">
        <?php include $document; ?>
        </article>
    </section>
 	
    <footer role="contentinfo">
        <a href="http://validator.w3.org/check?uri=<?php echo "$siteURL/$page"; ?>" title="run HTML validator">HTML 5</a> :
        <a href="http://jigsaw.w3.org/css-validator/check/referer" title="run CSS validator">css 3.0</a> :
        <a href="http://www.w3.org/WAI/WCAG2AAA-Conformance" title="Explanation of WCAG 2.0 Level Triple-A Conformance">W3C WAI-AAA WCAG 2.0</a>
    </footer>
    
<!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
<script src="<?php echo $resources; ?>/js/js.min.php"></script>
</body>
</html>