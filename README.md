# Social Media Platform Backend

This is the backend for a social media platform developed using Node.js and integrated with MariaDB for data storage. The API provides CRUD operations for posts and images.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [API Endpoints](#api-endpoints)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- MariaDB installed and running. Make sure to set up your database and update the configuration in `config.js`.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/social-media-backend.git


2. Install dependencies:

   ```bash
   cd social-media-backend
   npm install
   ```

3. Configure the database:

   - Copy the `config.example.js` file to `config.js`.
   - Update the database connection details in `config.js`.

## Usage

### Running the Server

Start the server using the following command:

```bash
npm start
```

The server will be running at `http://localhost:8000` by default.

### API Endpoints

#### Posts

- **GET /posts**: Retrieve all posts.
- **GET /posts/:postId**: Retrieve a specific post.
- **POST /posts**: Create a new post.
- **PUT /posts/:postId**: Update a post.
- **DELETE /posts/:postId**: Delete a post.

#### Images

- **GET /images**: Retrieve all images.
- **GET /images/:imageId**: Retrieve a specific image.
- **POST /images**: Upload a new image.
- **DELETE /images/:imageId**: Delete an image.

## Database

The backend uses MariaDB as its database. Make sure to set up your database and update the configuration in `config.js`.

## Contributing

Feel free to contribute to the project. If you find any issues or have suggestions, please open an issue or create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
