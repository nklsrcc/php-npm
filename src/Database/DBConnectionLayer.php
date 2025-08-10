<?php

declare(strict_types=1);

namespace Nick\App\Database;

use PDO;

abstract class DBConnectionLayer
{
    protected PDO $pdo;

    protected function __construct()
    {
        $_ENV['DB_DSN'] = "{$_ENV['DB_MANAGMENT_SYSTEM']}:dbname={$_ENV['DB_DATABASE_MYSQL']};host={$_ENV['DB_HOST']}";
        $this->pdo = new PDO($_ENV['DB_DSN'], $_ENV['DB_USER_MYSQL'], $_ENV['DB_PASSWORD_MYSQL']);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }
}