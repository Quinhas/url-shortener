<div align="center">
  <h1>Url Shortener</h1>
</div>

<p align="center">
  <a href="https://github.com/Quinhas/url-shortener/fork" target="_blank">
    <img src="https://img.shields.io/github/forks/Quinhas/url-shortener?style=flat-square&" alt="Badge showing the total of project forks"/>
  </a>

  <a href="https://github.com/Quinhas/url-shortener/stargazers" target="_blank">
    <img src="https://img.shields.io/github/stars/Quinhas/url-shortener?style=flat-square&" alt="Badge showing the total of project stars"/>
  </a>

  <a href="https://github.com/Quinhas/url-shortener/commits/main" target="_blank">
    <img src="https://img.shields.io/github/commit-activity/m/Quinhas/url-shortener?style=flat-square&" alt="Badge showing average commit frequency per month"/>
  </a>

  <a href="https://github.com/Quinhas/url-shortener/commits/main" target="_blank">
    <img src="https://img.shields.io/github/last-commit/Quinhas/url-shortener?style=flat-square&" alt="Badge showing when the last commit was made"/>
  </a>

  <a href="https://github.com/Quinhas/url-shortener/issues" target="_blank">
    <img src="https://img.shields.io/github/issues/Quinhas/url-shortener?style=flat-square&" alt="Badge showing the total of project issues"/>
  </a>

  <a href="https://github.com/Quinhas/url-shortener/pulls" target="_blank">
    <img src="https://img.shields.io/github/issues-pr/Quinhas/url-shortener?style=flat-square&" alt="Badge showing the total of project pull-requests"/>
  </a>

  <a href="https://github.com/Quinhas/url-shortener/blob/main/LICENSE.md" target="_blank">
    <img alt="Badge showing project license type" src="https://img.shields.io/github/license/Quinhas/url-shortener?style=flat-square&color=f85149">
  </a>
</p>

## 🧑🏻‍💻 Environment Settings

- For development, you need to have [Node](https://nodejs.org/en/) and [Docker Compose](https://github.com/docker/compose) installed.
- Create `.env` file based on `.env.default` file.

```bash
# Run the Docker Composer:
$ docker-compose up -d

# To create the database, run the command:
$ yarn prisma db pull
```

## 🚀 Get Started

```bash
# Clone this project and access the folder
$ git clone git@github.com:Quinhas/url-shortener.git && cd url-shortener

# Install the dependencies
$ yarn install

# Build the application
$ yarn build

# Start
$ yarn start

# Open http://localhost:3033 in your browser to see the application running!
```

## 🎮 Scripts

- `dev`: starts the application at `localhost:3033`
- `build`: creates an optimized production build of application
- `start`: starts the application in production mode at `localhost:3033` (have run the build before)
- `test`: run the tests
- `lint`: run eslint in /src
- `format`: run prettier in /src
- `commit`: CLI to create a commit message in the conventional format

## ✨ Technologies

This project was developed using the following technologies:

- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 📝 License

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.

Made with ❤️ by <a href="https://github.com/Quinhas" target="_blank">Lucas Santana</a>

---
