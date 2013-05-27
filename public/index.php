<?php

if (!defined('APPLICATION_ENV')) {
    $env = getenv('APPLICATION_ENV');

    if (!$env) {
        $env = 'production';
    }

    define('APPLICATION_ENV', $env);
}

require_once '../vendor/autoload.php';

// include the constants - i.e. define(GOOGLE_ANALYTICS_CODE, ...);
require_once '../constants.php';

$loader = new Twig_Loader_Filesystem('../src/Resources/views');

$twigOptions = array();
if (APPLICATION_ENV === 'production') {
    $twigOptions['cache'] = '../app/cache';
}

$twig = new Twig_Environment(
    $loader,
    $twigOptions
);

echo $twig->render(
    'home.html',
    array(
        'APPLICATION_ENV'       => APPLICATION_ENV,
        'GOOGLE_ANALYTICS_CODE' => GOOGLE_ANALYTICS_CODE
    )
);
