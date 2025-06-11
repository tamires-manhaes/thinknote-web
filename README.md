# ThinkNote App

✨ Create, Update, and Delete Notes with Title & Description

⚙️ Rate Limiting with Upstash Redis

🚀 Completely Responsive UI

# Getting Started

### Installation

1. Clone the repository:

```sh
git clone https://github.com/tamires-manhaes/thinknote-web.git

cd thinknote-web

```

2. Install dependencies:

```sh
npm install
```

3. Set up environment variables:

Create a .env file in the root directory with the following content:

```sh
VITE_API_URL=<api_url>
```

### 💻 Run the app

- For development (with hot reload):

  ```sh
  npm run dev
  ```

- For production:
  ```sh
  npm start
  ```

### Rate Limiting:

All requests are rate limited using Upstash Redis (e.g., 100 requests per 60 seconds).
