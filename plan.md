# Full-Stack Encryption/Decryption Web Application Plan

## Overview
A responsive web utility for encrypting/decrypting confidential text using hybrid RSA+AES encryption. Users provide a password for access control. No authentication required. Deployed on AWS serverless with local development support.

## Technology Stack
- **Frontend**: React with TypeScript (Vite for build/dev), hosted on S3/CloudFront.
- **Backend**: Java with Quarkus (for fast Lambda cold starts), REST API on AWS Lambda.
- **Database**: DynamoDB (for key storage with 3-day TTL).
- **Infrastructure**: AWS CDK (TypeScript) for IaC.
- **Other**: Git for version control, GitHub Actions for CI/CD.

## C4 Architecture Diagram

### Context Diagram (Level 1)
```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

Person(user, "User", "Internet user wanting to encrypt/decrypt confidential text")
System(encryptDecryptApp, "Encrypt/Decrypt Web App", "Provides encryption/decryption utility with password-based access")

Rel(user, encryptDecryptApp, "Uses", "HTTPS")
@enduml
```

### Container Diagram (Level 2)
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

### Component Diagram (Level 3) - Backend
```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

Container_Boundary(backend, "Quarkus Backend") {
    Component(encryptEndpoint, "Encrypt Endpoint", "REST API", "POST /encrypt: Generates keys, encrypts data")
    Component(decryptEndpoint, "Decrypt Endpoint", "REST API", "POST /decrypt: Retrieves keys, decrypts data")
    Component(encryptionService, "Encryption Service", "Java", "Handles RSA/AES encryption logic")
    Component(dynamoService, "DynamoDB Service", "AWS SDK", "Manages key storage/retrieval")
}

Rel(encryptEndpoint, encryptionService, "Uses")
Rel(decryptEndpoint, encryptionService, "Uses")
Rel(encryptionService, dynamoService, "Stores keys")
Rel(dynamoService, database, "Reads/Writes", "AWS SDK")
@enduml
```

## Encryption Process
1. User inputs plaintext + password.
2. Generate random RSA key pair.
3. Encrypt plaintext with RSA public key.
4. Encrypt RSA private key with AES (key from password via PBKDF2).
5. Store encrypted private key in DynamoDB with ID and TTL (3 days).
6. Return Base64(ID::encrypted_data).
7. For decrypt: User inputs Base64 string + password → Extract ID, retrieve key, decrypt.

## Frontend Features
- Two pages: Encrypt and Decrypt.
- Validation, loading states, error handling.
- Responsive UI.

## Backend Features
- Endpoints: POST /encrypt, POST /decrypt.
- Input validation, secure logging.
- Error handling.

## Security & Best Practices
- HTTPS, CORS, rate limiting.
- No password storage; keys encrypted in DB.
- TTL auto-deletion.

## Local Development
- Prerequisites: Java 17+, Node.js 18+, Docker.
- Backend: Quarkus dev with local DynamoDB.
- Frontend: Vite dev server.

## Deployment & CI/CD
- IaC: AWS CDK.
- CI/CD: GitHub Actions.

## Implementation Checklist
#### Phase 1: Project Setup
- [x] Check/install prerequisites (Java, Node, Docker, etc.)
- [x] Initialize git repository
- [x] Create project structure: `frontend/` (React), `backend/` (Quarkus), `infra/` (CDK), `.github/workflows/` (CI/CD).
- [x] Set up frontend: Create React app with TypeScript, install dependencies (axios, react-router, etc.).
- [x] Set up backend: Create Quarkus project with Maven, add dependencies (AWS SDK, Bouncy Castle for crypto).
- [x] Configure gitignore for secrets and build artifacts.

#### Phase 2: Backend Implementation
- [x] Implement encryption logic: RSA key generation, AES encryption of private key with PBKDF2.
- [x] Create /encrypt endpoint: Accept plaintext + password, return Base64(ID::encrypted).
- [x] Create /decrypt endpoint: Accept Base64 string + password, return plaintext.
- [x] Integrate DynamoDB: Store/retrieve encrypted keys with TTL.
- [x] Add validation, error handling, secure logging.
- [x] Write unit/integration tests.

#### Phase 3: Frontend Implementation
- [x] Build encrypt page: Form for text + password, API call, display result.
- [x] Build decrypt page: Form for encrypted string + password, API call, display result.
- [x] Add routing, validation, loading states, error messages.
- [x] Style responsively (CSS/Tailwind).
- [x] Write tests.

#### Phase 4: Local Development & Testing
- [x] Set up local configs (application-local.properties, DynamoDB Local).
- [ ] Test full flow locally.
- [ ] Debug and fix issues.

#### Phase 5: Infrastructure & Deployment
- [ ] Implement AWS CDK: Define Lambda, API Gateway, DynamoDB, S3, CloudFront.
- [ ] Add security: HTTPS, CORS, rate limiting.
- [ ] Set up CI/CD: GitHub Actions for build/test/deploy.
- [ ] Test deployment to AWS.

#### Phase 6: Finalization
- [ ] End-to-end testing on AWS.
- [ ] Documentation: README with setup/deploy instructions.
- [ ] Code review and optimizations.