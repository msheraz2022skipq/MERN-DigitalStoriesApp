import { Duration } from 'aws-cdk-lib';
import * as lambda_ from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import * as path from "path";
import * as cdk from 'aws-cdk-lib';

export class SherazBackendApiGatewayDsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let role = this.create_role();
    let lambda_layer = this.createLayer('lambda_layer',path.join(__dirname,'../layers'))
    let lambda_api_backend = this.createLambda('sheraz_lambda_stories_api_backend',path.join(__dirname,'../resources'),'backend.handler',role,lambda_layer)

    const api = new apigateway.LambdaRestApi(this,'SherazDigitalStoriesAPI',{handler: lambda_api_backend});
   
  }
  createLambda(id:string, asset:string,handler:string,role:any,layer:any){
    return new lambda_.Function(this,id,{
        code: lambda_.Code.fromAsset(asset),
        runtime: lambda_.Runtime.NODEJS_14_X,
        handler: handler,
        timeout: Duration.minutes(5),
        layers: [layer],
        role: role
    });
}


  create_role(this:any){
    const role = new iam.Role(this,"lambda_role",{assumedBy:new iam.ServicePrincipal("lambda.amazonaws.com")});
    const s3ReadWritePolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        's3:GetObject',
        's3:PutObject',
        's3:DeleteObject',
      ],
      resources: [
        'arn:aws:s3:::digital-stories-sheraz/*',
      ],
    });
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"));
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("CloudWatchFullAccess"));
    role.addToPolicy(s3ReadWritePolicy);
    return role;
 
  }


  createLayer(id:string, asset:string){
    return new lambda_.LayerVersion(this,id,{code:lambda_.Code.fromAsset(asset),compatibleRuntimes:[lambda_.Runtime.NODEJS_14_X]});
  } 
}
