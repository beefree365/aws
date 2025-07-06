# aws


### 架构图

    Client (Web / Mobile)
        ↓
    API Gateway (RESTful API + guest cognito sign 生成临时凭证) 
        ↓
    AWS Lambda (业务逻辑处理)
        ↓
    DynamoDB (文章存储)
        ↓
    S3 (图片/附件存储)  todo
        ↓
    Cognito (用户认证)  todo
