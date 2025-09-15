# Secure Encrypt/Decrypt Web Application

A full-stack web application for encrypting and decrypting confidential text messages using RSA asymmetric encryption with password-based access control.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Functional Requirements](#functional-requirements)
- [Non-Functional Requirements](#non-functional-requirements)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features
- 🔒 **Text Encryption**: Securely encrypt plaintext messages
- 🔓 **Text Decryption**: Decrypt messages with password authentication
- 📋 **Copy to Clipboard**: Easy copying of encrypted/decrypted results
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- ⏰ **Automatic Cleanup**: Encrypted keys deleted after 3 days
- 🔒 **Password Protection**: No user accounts, password-based access

## Architecture

### C4 Diagrams

#### Context Diagram
```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

Person(user, "User", "Internet user wanting to encrypt/decrypt confidential text")
System(encryptDecryptApp, "Encrypt/Decrypt Web App", "Provides encryption/decryption utility with password-based access")

Rel(user, encryptDecryptApp, "Uses", "HTTPS")
@enduml
```

#### Container Diagram
```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Person(user, "User", "Internet user")

System_Boundary(aws, "AWS Cloud") {
    Container(frontend, "React Frontend", "TypeScript, React", "Serves UI pages for encrypt/decrypt")
    Container(backend, "Quarkus Backend", "Java, Quarkus", "Handles encryption/decryption logic")
    ContainerDb(database, "DynamoDB", "NoSQL", "Stores encrypted private keys with TTL")
    Container(infra, "AWS Infrastructure", "CDK", "Manages Lambda, API Gateway, etc.")
}

Rel(user, frontend, "Uses", "HTTPS")
Rel(frontend, backend, "Makes API calls", "JSON/HTTPS")
Rel(backend, database, "Stores/Retrieves keys", "AWS SDK")
Rel(infra, backend, "Deploys", "CDK")
@enduml
```

## Functional Requirements

### Core Functionality
1. **Encryption Process**
   - User inputs plaintext message and password
   - System generates RSA key pair
   - Encrypts message with RSA public key
   - Encrypts private key with password-derived AES key
   - Stores encrypted private key in database with unique ID
   - Returns Base64-encoded encrypted message + ID

2. **Decryption Process**
   - User inputs encrypted message, ID, and password
   - System retrieves encrypted private key from database
   - Decrypts private key using password
   - Decrypts message with private key
   - Returns original plaintext

3. **User Interface**
   - Two-page application: Encrypt and Decrypt
   - Form validation and error handling
   - Loading states during API calls
   - Copy-to-clipboard functionality
   - Responsive design for all devices

### Security Features
- Password-based authentication (no user accounts)
- Automatic key deletion after 3 days
- No sensitive data logging
- HTTPS encryption for all communications

## Non-Functional Requirements

### Performance
- **Response Time**: API responses < 2 seconds
- **Concurrent Users**: Support 100+ simultaneous users
- **Scalability**: Serverless architecture auto-scales

### Security
- **Encryption**: RSA 2048-bit asymmetric encryption
- **Data Protection**: AES encryption for key storage
- **Compliance**: No personal data storage
- **Audit**: Secure logging without sensitive information

### Usability
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile Support**: Responsive design for all screen sizes
- **Intuitive UI**: Clean, professional interface
- **Error Handling**: Clear error messages and recovery

### Reliability
- **Availability**: 99.9% uptime target
- **Data Integrity**: Automatic key cleanup prevents data accumulation
- **Error Recovery**: Graceful handling of failures

### Maintainability
- **Code Quality**: Well-documented, tested code
- **Modularity**: Separated concerns (frontend/backend/infrastructure)
- **CI/CD**: Automated testing and deployment

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Bootstrap 5** for responsive UI
- **React Router** for navigation
- **Axios** for HTTP requests

### Backend
- **Java 21** with Quarkus 3+
- **Maven** for dependency management
- **AWS SDK** for DynamoDB integration
- **REST API** with JSON communication

### Infrastructure
- **AWS Lambda** for serverless compute
- **API Gateway** for REST API management
- **DynamoDB** for key storage with TTL
- **S3 + CloudFront** for static hosting
- **AWS CDK** for infrastructure as code

### Development Tools
- **Git** for version control
- **GitHub Actions** for CI/CD
- **Docker** for local development
- **DynamoDB Local** for testing

## Installation

### Prerequisites
- Java 17+ (for backend)
- Node.js 18+ (for frontend)
- Docker (for local database)
- AWS CLI (for deployment)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd encryptdecrypt2
   ```

2. **Backend Setup**
   ```bash
   cd backend
   mvn clean install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start Local Services**
   ```bash
   # Start DynamoDB Local
   docker run -d -p 8000:8000 amazon/dynamodb-local

   # Start Backend
   cd ../backend
   mvn quarkus:dev

   # Start Frontend (new terminal)
   cd ../frontend
   npm run dev
   ```

5. **Access Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080

## Usage

### Encrypting a Message
1. Navigate to the Encrypt page
2. Enter your confidential message
3. Choose a strong password
4. Click "Encrypt Message"
5. Copy the encrypted result

### Decrypting a Message
1. Navigate to the Decrypt page
2. Paste the encrypted message
3. Enter the password used for encryption
4. Click "Decrypt Message"
5. View the original message

## API Documentation

### POST /api/encrypt
Encrypt a plaintext message.

**Request Body:**
```json
{
  "plaintext": "Your secret message",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "encrypted": "BASE64_ENCODED_ENCRYPTED_DATA"
}
```

### POST /api/decrypt
Decrypt an encrypted message.

**Request Body:**
```json
{
  "encrypted": "BASE64_ENCODED_ENCRYPTED_DATA",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "plaintext": "Your original message"
}
```

## Security

### Encryption Details
- **Algorithm**: RSA 2048-bit asymmetric encryption
- **Key Management**: Keys generated per encryption, stored encrypted
- **Password Protection**: PBKDF2 key derivation with AES encryption
- **Data Lifecycle**: Keys automatically deleted after 3 days

### Best Practices
- Use strong, unique passwords
- Keep passwords secure (not shared)
- Encrypted data expires automatically
- No personal information stored

## Deployment

### AWS Deployment
1. **Configure AWS Credentials**
   ```bash
   aws configure
   ```

2. **Deploy Infrastructure**
   ```bash
   cd infra
   npm install
   npm run build
   cdk deploy
   ```

3. **Deploy Application**
   - GitHub Actions handles automated deployment
   - Frontend deployed to S3/CloudFront
   - Backend deployed to Lambda

### Environment Variables
- `AWS_REGION`: AWS region
- `DYNAMODB_TABLE`: Table name for key storage
- `CORS_ORIGIN`: Frontend URL for CORS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is provided "as is" for educational and utility purposes. While we strive for security, users should not rely on this for highly sensitive information without additional security measures. Always use strong passwords and understand that encrypted data is only as secure as your password.

The application does not store any personal information or user data. All encryption keys are temporary and automatically deleted.