# Getting started

To get started with [AWS Copilot](https://aws.github.io/copilot-cli/) all we need is a Dockerfile and running the `copilot init` command.

However, in this demo we will break down exactly what `init` does under the hood by running sub-commands individually.

### What are we building?
A simple REST API for a coffee shop ☕️ that will be hosted on a single ECS service.
```
GET /products     -- lists all available drinks
GET /products/:id -- get details about a coffee drink
GET /inventory    -- list quantities of products
POST /inventory   -- update quantity of a drink
GET /orders       -- list all orders
POST /orders      -- create an order decrementing the drink quantity
```

<img src="https://user-images.githubusercontent.com/879348/85873802-800c1e80-b786-11ea-8b2c-779b01abbaf4.png" width="500" />

### Step 1: Initializing an application
```
$ copilot app init --domain efecoffeeshop.com
```
An application is just a logical name for your product.

### Step 2: Initializing an environment
```
$ copilot env init
```
Create the shared infrastructure for your microservices: VPC, subnets, security groups, the Application Load Balancer.

### Step 3: Initialize your service
```
$ copilot svc init
```
Choose a "Load Balanced Web Service" to create an ECS service frontend by a load balancer to accept requests from the internet.

### Step 4: Deploy your service
```
$ copilot svc deploy
```
Done! Copilot will give you an HTTPS endpoint for your service.