![build](https://github.com/Shiven14/url-shortener/actions/workflows/ci.yml/badge.svg)

# 🚀 Serverless URL Shortener (AWS Free Tier)

A simple serverless **URL shortener** built on the AWS Free Tier using:

- **API Gateway (HTTP API)**
- **AWS Lambda (Node.js 20)**
- **DynamoDB (on-demand, pay-per-request)**
- **AWS SAM (Infrastructure as Code)**

---

## ⚡ Features
- Shorten long URLs into unique short codes
- Redirect from short code → original URL (301)
- Track click counts in DynamoDB
- Designed for **AWS Free Tier** (safe to run without charges)
- Deploy with a single command using **AWS SAM**

---

## 📦 Deploy (Free Tier)

### 1. Prerequisites
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) configured  
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)  
- Node.js 20+  

### 2. Install dependencies
```bash
npm ci

