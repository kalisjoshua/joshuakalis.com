<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8" />
<title><?php echo ucfirst($page)." - $siteTitle"; ?></title>
<meta name="description" content="<?php echo $siteDesc;?>" />

<link rel="stylesheet" href="<?php echo $siteURL; ?>/themes/default/css/css.min.php" type="text/css" />
<link rel="stylesheet" href="<?php echo $siteURL; ?>/themes/default/css/print.css" type="text/css" media="print" />
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
            <li<?php if( strcasecmp($page, $item) == 0 ) { echo " class=\"active\""; } ?>><a href="<?php echo $item; ?>.php"><?php echo $item; ?></a></li>
<?php } ?>
        </ul>
    </nav>
    
    <section>
        <article id="content" role="main">
        <?php article(); ?>
        </article>
    </section>
 	
    <footer role="contentinfo">
        <a href="http://validator.w3.org/check?uri=<?php echo $siteURL.$_SERVER['REQUEST_URI']; ?>" title="run HTML validator">HTML 5</a> :
        <a href="http://jigsaw.w3.org/css-validator/check/referer" title="run CSS validator">css 3.0</a> :
        <a href="http://www.w3.org/TR/1999/WAI-WEBCONTENT-19990505" title="Web Content Accessibility Guidelines 1.0">W3C WCAG 1.0 Triple-A</a> :
        <a class="pdf" href="resumes/resume_kalisjoshua.pdf" title="my Resume as a PDF">Resume [PDF]</a> :
        <a class="doc" href="resumes/resume_kalisjoshua.doc" title="my Resume as a Word document">Resume [Doc]</a>
    </footer>
    
<!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
<script src="<?php echo $siteURL; ?>/themes/default/js/js.min.php"></script>
</body>
</html>