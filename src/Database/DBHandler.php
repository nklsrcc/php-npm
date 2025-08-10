<?php

declare(strict_types=1);

namespace Nick\App\Database;

use Nick\App\Database\Traits\HomeLayer;

class DBHandler extends DBConnectionLayer
{
    use HomeLayer;

    private static ?self $instance = null;

    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
}