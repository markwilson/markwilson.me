<?php

if (!defined('APPLICATION_ENV')) {
    $env = getenv('APPLICATION_ENV');

    if (!$env) {
        $env = 'production';
    }

    define('APPLICATION_ENV', $env);
}

require_once '../vendor/autoload.php';

use Symfony\Component\Config\FileLocator;
use Symfony\Component\Yaml\Yaml;

// initialise whoops exception handling
$run = new \Whoops\Run();
$run->pushHandler(new \Whoops\Handler\PrettyPageHandler());
$run->register();

$configDirectories = array('../app/config');
$locator           = new FileLocator($configDirectories);
$parametersFile    = $locator->locate('parameters.yml');
$parameters        = Yaml::parse($parametersFile);

switch ($_SERVER['REQUEST_URI']) {
    case '/':
        $template = 'home';
        break;
    case '/contact':
        require '../src/Resources/scripts/contact.php';
        exit;
    default:
        // 404
        $template = '404';
}

$loader = new Twig_Loader_Filesystem('../src/Resources/views');

$twigOptions = array();
if (APPLICATION_ENV === 'production') {
    $twigOptions['cache'] = '../app/cache';
}

$twig = new Twig_Environment(
    $loader,
    $twigOptions
);

// load in any parameters
$context = $parameters;
$content['APPLICATION_ENV'] = APPLICATION_ENV;

echo $twig->render(
    $template . '.html',
    $context
);
