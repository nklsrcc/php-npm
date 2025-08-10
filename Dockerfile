FROM php:8.4-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
        git \
        curl \
        zip \
        vim \
        unzip \
        libcurl4-openssl-dev \
        libpng-dev \
        libonig-dev \
        libxml2-dev \
        libzip-dev \
        libpq-dev \
        dos2unix \
        libsqlite3-dev \
        && docker-php-ext-install \
            curl \
            pdo \
            pdo_mysql \
            pdo_pgsql \
            pgsql \
            zip \
            bcmath \
            mbstring \
            opcache \
        && apt-get clean \
        && rm -rf /var/lib/apt/lists/*

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www

COPY start.sh /usr/local/bin/start.sh
RUN dos2unix /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

CMD ["start.sh"]