<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->safeLoad();

// Initialize Twig
$loader = new FilesystemLoader(dirname(__DIR__) . '/templates');
$twig = new Environment($loader);

// Parse and normalize the current URI path
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = trim($uri, '/');

// Simple routing: map URI to template
$routes = [
    '' => 'Partials/index.html.twig',
    // Add more route => template mappings here
];

// Match the template for the path
$template = $routes[$uri] ?? null;

if ($template === null) {
    http_response_code(404);
    echo $twig->render('404.html.twig', [
        'title' => 'Page Not Found',
        'path' => $uri,
    ]);
    exit;
}

$context = [
    'appTitle' => 'php-npm',
    'appBEUrl' => $_ENV['URL'] . '/api',
    'getMainJS' => 'static/js/main.js',
    'year' => date('Y'),
    'devName' => 'Nick',
];

// Render the matched template
echo $twig->render($template, $context);
