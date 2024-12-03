# Superhero React Project

## Instructions

- [Confluence page](https://adkgroup.atlassian.net/wiki/spaces/SUP/overview?homepageId=1172865406)
- [JIRA board](https://adkgroup.atlassian.net/jira/software/c/projects/SO/boards/430)
- Design

## Getting Started

1. Copy env sample

   ```bash
   cp .env.sample .env
   ```

2. Get api access token in [superheroapi.com](https://www.superheroapi.com/) and fill value in .env for `API_ACCESS_TOKEN`

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

5. You can start editing the page by modifying `src/App.tsx`. The page auto-updates as you edit the file.

## Starter Technology Stack

- [React](https://es.react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

## Recommended Standards

Network

- [Axios](https://github.com/axios/axios)

State management

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux Saga](https://redux-saga.js.org/docs/introduction/GettingStarted)

UI component library

- [MUI](https://mui.com/getting-started/installation/)

Testing

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

Deployment

- [Deployment](https://bitbucket.org/adkgroup/buildtools/src/master/)

Styling framework

- [Emotion](https://emotion.sh/docs/introduction)
- [Styled Components](https://styled-components.com/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)

# Deployment on Vercel

Vercel is a platform for frontend frameworks and static sites, built to integrate with your headless content, commerce, or database.

## Setup

Signup for an account on [Vercel](https://vercel.com/). Choose the Signup with email option and Sign up with amdocs email.

Make a fork of this repository and import your project from your Bitbucket account. [See documentation](https://vercel.com/docs/concepts/git/vercel-for-bitbucket)\
_<small>Make sure you have forked the repository to your personal Bitbucket account. If ADK Group is the owner of the repository you will need to login to Vercel via the ADK Group admin login, not your adkgroup email.</small>_

If you have environment variables, you need to set them in vercel [See documentation](https://vercel.com/docs/concepts/projects/environment-variables)

Also you can use [Vercel CLI](https://vercel.com/cli)

```bash
 npm i -g vercel
 vercel
```
