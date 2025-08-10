<?php

declare(strict_types=1);

namespace Nick\App\Exceptions\AuthLayer;

use Exception;

class WrongCredentialException extends Exception
{
    protected $message = 'Wrong credentials';
}