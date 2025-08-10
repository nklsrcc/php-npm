<?php

declare(strict_types=1);

namespace Nick\App\Controllers;

use Exception;
use Nick\App\Database\DBHandler;

class HomeController
{
    /**
     * @throws Exception
     */
    public static function index(): void
    {
        header('Content-Type: application/json');

        $data = DBHandler::getInstance()->HomeLayerIndex();

        echo json_encode([
            'status' => 'success',
            'data' => $data,
        ]);
    }
}