<?php

declare(strict_types=1);

use Nick\App\Translations\En;
use Nick\App\Translations\It;
use Nick\App\Translations\Fr;

require_once __DIR__ . '/../../vendor/autoload.php';

$base = En::get();
$baseKeys = array_keys($base);

$langs = [
    'it' => It::get(),
    'fr' => Fr::get(),
    'en' => En::get(),
];

$hasError = false;

foreach ($langs as $code => $translation) {
    $missing = array_diff($baseKeys, array_keys($translation));
    $extra = array_diff(array_keys($translation), $baseKeys);

    echo "🔍 Checking $code...\n";

    if (!$missing && !$extra) {
        echo "✅ $code is complete.\n";
    } else {
        $hasError = true;
        if ($missing) {
            echo "❌ Missing keys in $code: " . implode(', ', $missing) . "\n";
        }
        if ($extra) {
            echo "🧹 Extra keys in $code: " . implode(', ', $extra) . "\n";
        }
    }
}

exit($hasError ? 1 : 0);
