# Adding databases and more!

The final piece in evolving our applications is creating storage or eventbus components.
In the previous section [04-secrets-and-envars](https://github.com/efekarakus/day2-with-copilot/tree/04-secrets-and-envvars), we saw how to integrate with existing databases. In this section, we'll see how to create ones with AWS Copilot.  
To learn more: https://aws.github.io/copilot-cli/docs/developing/additional-aws-resources/

### Step 1: Creating a DynamoDB table
Copilot provides easy creation of certain types of storage components: Aurora Serverless database, DynamoDB database, S3 bucket. Just run:
```
copilot storage init
```
In the generated CloudFormation template, you'll see:
```yaml
Outputs:
  productsName:
    Description: "The name of this DynamoDB."
    Value: !Ref products
  productsAccessPolicy:
    Description: "The IAM::ManagedPolicy to attach to the task role."
    Value: !Ref productsAccessPolicy
```

Through these outputs, Copilot understand whether it needs to add additional permissions to the task role, inject environment variables or secrets, or finally attach an additional security group.

### Step 2: Define your own addon template
In `copilot/backend/addons/redis.yml`, we've defined a custom redis cluster. Through, the outputs of the cloudformation template, Copilot will automatically add the additional security group to the ECS service.

### Step 3: Deploy
```
$ copilot deploy
```
Run `deploy` to create the addon templates!