> Feel free to use it, fork it and patch it for your own needs.

## The node.js CRUD with auth app

The node.js example app teaches the very basics of how to work with Contentful:

- consume content from the Contentful Delivery and Preview APIs
- model content
- edit content through the Contentful app

The app demonstrates how the basic auth is work with any application.

## Requirements

- node.js - The node.js to setup the application

Without any changes, this app is connected to a Contentful space with read-only access. To experience the full end-to-end Contentful experience, you need to connect the app to a Contentful space with read _and_ write access. This enables you to see how content editing in the Contentful web app works and how content changes propagate to this app.

## Common setup

Clone the repo and install the dependencies.

```bash
git https://github.com/ddr-dileep/node-crud-with-auth.git
cd node-crud-with-auth
```

```bash

yarn

```

## Steps for read-only access

To start the express server, run the following

```bash

npm run dev

```

