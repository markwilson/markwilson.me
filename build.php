<?php

use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;

require_once __DIR__ . '/vendor/autoload.php';

$loader = new Twig_Loader_Filesystem([__DIR__ . '/pages', __DIR__ . '/layouts']);
$twig = new Twig_Environment($loader, [
    'cache' => __DIR__ . '/cache'
]);

echo 'Clearing template cache ...' . PHP_EOL;
$twig->clearCacheFiles();

$fs = new Filesystem();

if ($fs->exists(__DIR__ . '/public')) {
   echo 'Removing existing public folder ...' . PHP_EOL;
   $fs->remove(__DIR__ . '/public'); 
}

echo 'Creating public ...' . PHP_EOL;
$fs->mkdir(__DIR__ . '/public');

$finder = new Finder();
$finder->files()->in(__DIR__ . '/pages')->name('*.html.twig');

foreach ($finder as $page) {
    $templateFile = $page->getRelativePathname();
    $generatedFilePath = $page->getRelativePath() . '/' . $page->getBasename('.' . $page->getExtension());

    $template = $twig->loadTemplate($templateFile);

    echo 'Generating ' . $generatedFilePath . ' from ' . $templateFile . ' ...' . PHP_EOL;

    // TODO: pass variables through to the template engine
    $fs->dumpFile(__DIR__ . '/public/' . $generatedFilePath, $template->render([]));
}

// TODO: move this to a better place
echo 'Copying assets to public/assets ...' . PHP_EOL;
`rsync -a static/ public/assets/`;

// TODO: test with sub-directories
// TODO: upload lambda function to AWS automatically on each deploy

echo 'Done.' . PHP_EOL;
