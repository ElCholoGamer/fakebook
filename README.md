# Fakebook

![Build](https://github.com/ElCholoGamer/fakebook/workflows/Build/badge.svg)

Ah yes, yet another way of procrastinating homework whilst feeling productive

### (DISCLAIMER: For obvious reasons, this project has no intent of ganing profit and all that stuff, all credit goes to [Facebook](https://facebook.com) for the idea)

<br />

## Usage

Clone the repo:

```
$ git clone https://github.com/ElCholoGamer/fakebook.git
$ cd fakebook
```

Install dependencies (Yarn):

```
$ yarn install
```

Add a `.env` file with the following:

```
ATLAS_URI="your-mongodb-uri"
SESSION_SECRET="some-secret"
MAILER_EMAIL="some-email@test.com"
MAILER_PASSWORD="some-password"
```

Finally, build project and run server:

```
$ yarn build
$ yarn serve
```
