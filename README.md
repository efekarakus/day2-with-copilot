# Adding a Backend Service

In previous steps, we created a single ECS service on AWS Fargate behind an Application Load Balancer. We updated the endpoint to https://api.efecoffeeshop.com. However, right now the entire logic for our application lives in a single microservice: `frontend`.

In this tutorial, we're going to create a ["Backend Service"](https://aws.github.io/copilot-cli/docs/concepts/services/#backend-service). This is a service that can only be accessed within your VPC and noone from the internet will be able to connect to it.  
Copilot automatically sets up [service discovery](https://aws.github.io/copilot-cli/docs/developing/service-discovery/) for you so that your "frontend" service can reach out to your backend service easily.

### Step 1: Creating your backend service
```
$ copilot svc init
```
Initialize a new service and choose the type "Backend Service", and name "backend".  
Once initialized, just run `copilot deploy` to deploy your private service.  
Copilot will give you an endpoint that's only accessible within your VPC: `backend.coffeeshop.local:3000`.

### Step 2: Update your frontend service code to make requests 

The "frontend" service no longer needs to handle the `/products` and `/inventory` requests.  
Instead, it just forwards all the requests to the new backend service.
```js
app.all(['/products', '/products/*'], async (req, res) => {
    const response = await axios({
        method: req.method,
        url: `http://backend.${process.env.COPILOT_SERVICE_DISCOVERY_ENDPOINT}:3000${req.path}`,
        headers: req.headers,
    });
    res.json(response.data);
});
```
As can be seen above, Copilot automatically injects the `COPILOT_SERVICE_DISCOVERY_ENDPOINT` environment variable to resolve the backend service endpoint.

### Step 3: Deploy the frontend service
```
$ copilot deploy
```
Deploy your new frontend service!

### Step 4: View your logs
You can now tail your service logs:
```
$ copilot svc logs --follow
```
To see logs in both your "backend" and "frontend" services.