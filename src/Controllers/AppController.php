<?php

declare(strict_types=1);

namespace Nick\App\Controllers;

class AppController
{
    public static function get_strings(): void
    {
        header('Content-Type: application/json');

        if (empty($_GET['lang_code'])) {
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'message' => "Request language missing. You must provide a valid language. ?lang_code=en",
            ]);
        }

        $lang_code = $_GET['lang_code'];

        $lang_code = ucfirst(strtolower($lang_code)); // e.g., "en" → "En"
        $class = "Nick\\App\\Translations\\$lang_code";

        if (class_exists($class) && method_exists($class, 'get')) {
            $data = call_user_func([$class, 'get']);
            echo json_encode([
                'status' => 'success',
                'data' => $data
            ]);
        } else {
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'message' => "Language '$lang_code' not supported."
            ]);
        }
    }
}
