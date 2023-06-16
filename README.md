# GitHub User Search App

This is a React application built with Vite, SWR, and uses the GitHub API to search for GitHub users and display their repositories.

## Features

- Search for GitHub users by username
- Display user information including avatar, username, and bio
- Display user's repositories with repository name, description, and star count

## Technologies Used

- React
- Vite
- SWR
- Vitest
- Testing Library

## Installation

1. Clone the repository:

```bash
git clone https://github.com/suryakun/github-discover.git
```

2. Install the dependencies:

```bash
npm install
```

## Usage

1. Open the src/config/config.ts and provide your GitHub API token. You can obtain a token from your GitHub account settings.

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`.

## Testing

To run the tests using Vitest and Testing Library, use the following command:

```bash
npm run test
```

## License

This project is licensed under the [MIT License](LICENSE).