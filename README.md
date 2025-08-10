# Project Name

A brief description of your project. This project is a full-stack application using PHP, Node.js, and Docker. It
integrates tools like Composer (for PHP dependencies), npm (for frontend dependencies), and Webpack (for building
assets).

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Git**: [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Setup Instructions

### 1. Clone the repository

```bash
    git clone https://github.com/nklsrcc/php-npm.git
```

### 2. Navigate to your project folder

Change to your project directory:

```bash
    cd php-npm
```

### 3. Set up environment variables

Copy the default environment configuration file to .env:

```bash
    cp .env.default .env
```

> Note: You may need to edit the .env file to configure any environment variables (like database credentials or API
> keys).

### 4. Start Docker containers

Run the following command to build and start the Docker containers:

```bash
    docker-compose up -d --build
```

This will:

- Build the PHP, Node.js, Nginx, and database containers and even run the npm run build command.
- Start the containers in detached mode (-d), meaning they will run in the background.

### 5. Install dependencies (if not automated)

If needed, you can manually install the dependencies in their respective containers.

#### PHP Dependencies:

Enter the PHP container and install PHP dependencies using Composer:

```bash
    docker exec -it <php_container_name> bash
    composer install
```

#### Node.js Dependencies:

Enter the frontend folder name TS (where package.json is located) and install Node.js dependencies using npm:

```bash
    cd TS
    npm install
```

### 6. Access the application

Once the containers are up and running, you can access the application in your browser:

```bash
    http://localhost:80
```

### 7. Stopping the Docker Containers

To stop the containers when you're done:

```bash
  docker-compose down
```

This will stop and remove the containers, but your data (like databases) will persist.

## Project Structure

.<br>
├── composer.json        # PHP dependencies<br>
├── composer.lock        # Composer lock file<br>
├── docker-compose.yml   # Docker Compose configuration<br>
├── Dockerfile           # PHP Dockerfile for custom image<br>
├── nginx/               # Nginx configuration files<br>
│   └── nginx.conf<br>
├── package.json         # Node.js dependencies<br>
├── package-lock.json    # npm lock file<br>
├── phpunit.xml          # PHPUnit configuration file<br>
├── public/              # Public assets served by Nginx<br>
│   ├── api.php<br>
│   ├── index.php<br>
│   └── static/<br>
│       └── js/<br>
├── src/                 # PHP source code<br>
├── templates/           # Twig templates<br>
└── TS/                  # TypeScript files and related configuration<br>
├── src/<br>
│   └── index.ts<br>
└── tsconfig.json<br>

## Technologies Used

- PHP 8.4: Backend with PHP-FPM for handling requests.
- Node.js & npm: For frontend development and build tooling.
- Docker: Containerization for consistent development environments.
- Nginx: Web server for serving static assets and proxying requests to PHP-FPM.
- Composer: PHP dependency management.
- Webpack: For bundling JavaScript and other frontend assets.
- PHPUnit: For running PHP unit tests.
- Twig: Templating engine for rendering views in PHP.