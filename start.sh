#!/bin/bash

# Allow Git to access /var/www
git config --global --add safe.directory /var/www

# Install PHP Composer dependencies
composer install

# Navigate to the TS directory
cd /var/www/TS || { echo "Impossible to install npm dependencies. Please check the TS directory before continuing."; exit 1; }

# Install Node.js dependencies (from the TS/package.json)
npm install

npm run build

echo "go to: localhost:8080 to see the magic";

# Keep PHP-FPM running in foreground so container stays alive
exec php-fpm