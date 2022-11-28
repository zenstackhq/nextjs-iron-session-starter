This is a starter project for using [ZenStack](https://github.com/zenstackhq/zenstack) with [Next.js](https://nextjs.org/) and [Iron Session](https://www.npmjs.com/package/iron-session).

It's extended from [Prisma's Next.js Starter](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes).

## Getting Started

First create a project from this starter:

```bash
npx create-next-app --use-npm -e https://github.com/zenstackhq/nextjs-iron-session-starter [project-name]

cd [project-name]
```

Run ZenStack generator:

```
npm run generate
```

You'll also need to bootstrap your database and create the initial migration (a local sqlite db by default):

```
npm run db:migrate -- -n init
```

Finally it's time to run your app locally:

```
npm run dev
```

## Code Structure

### Data Model

The data model is located at [/zenstack/schema.zmodel](zenstack/schema.zmodel).

### Iron-session Integration

You can find integration with iron-session at [/pages/api/auth](pages/api/auth/).

### Mounted Data Services

The generated RESTful data access services are mounted at: [/pages/api/zenstack/[...path].ts](pages/api/zenstack/[...path].ts).

## Learn More

To learn more about ZenStack, visit [ZenStack Home](https://zenstack.dev).
