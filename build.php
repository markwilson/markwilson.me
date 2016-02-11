<?php

require_once __DIR__ . '/vendor/autoload.php';

$loader = new Twig_Loader_Filesystem([__DIR__ . '/pages', __DIR__ . '/layouts']);
$twig = new Twig_Environment($loader, [
    'cache' => __DIR__ . '/cache'
]);

$pages = glob(__DIR__ . '/pages/*.html.twig');

foreach ($pages as $page) {
    $templateFile = substr($page, strlen(__DIR__ . '/pages/'));
    $pathInfo = pathinfo($templateFile);

    $template = $twig->loadTemplate($templateFile);

    // TODO: pass variables through to the template engine
    file_put_contents(__DIR__ . '/public/' . $pathInfo['filename'], $template->render([]));
}

// TODO: move this to a better place
`rsync -a static/ public/assets/`;

// TODO: test with sub-directories
// TODO: upload lambda function to AWS automatically on each deploy
