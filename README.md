# Injecting secrets and environment variables

Now that we have decoupled our microservices, we might want our "backend" service to communicate with an already existing database.  
In this section, we'll see how we can create secrets and inject environment variables with Copilot.

### Step 1: Creating a secret
For example, if you'd like to inject an API TOKEN or an existing RDS password. You can just run:
```
$ copilot secret init
```
The command will prompt you for the name of your secret and a value for each environment.

### Step 2: Update your manifest
Once the secret is created, you can update your manifest to inject the secret or any other environment variables:
```yaml
# in copilot/backend/manifest.yml
variables:
  LOG_LEVEL: info
secrets: 
  MY_RDS_PASSWORD: /copilot/coffeeshop/test-ohio/secrets/MyRDSPassword
```

### Step 3: Deploy your backend service
```
$ copilot deploy
```
The environment variables `LOG_LEVEL` and `MY_RDS_PASSWORD` will be injected into our container!