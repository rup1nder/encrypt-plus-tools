# Contributing to Secure Encrypt/Decrypt Web Application

Thank you for your interest in contributing to this project! We welcome contributions from the community. Please read this document to understand how to contribute effectively.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Security Considerations](#security-considerations)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:
- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## Getting Started

### Prerequisites
- **Java 21+** (for backend development)
- **Node.js 18+** (for frontend development)
- **Docker** (for local database)
- **Git** (for version control)
- **AWS CLI** (for deployment, optional)

### Development Setup

1. **Fork and Clone the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/encryptdecrypt2.git
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

4. **Start Local Development Environment**
   ```bash
   # Start DynamoDB Local (in separate terminal)
   docker run -d -p 8000:8000 amazon/dynamodb-local

   # Start Backend (in separate terminal)
   cd backend
   mvn quarkus:dev

   # Start Frontend
   cd ../frontend
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080

## How to Contribute

### Types of Contributions
- **Bug fixes**: Fix existing issues
- **Features**: Add new functionality
- **Documentation**: Improve documentation
- **Tests**: Add or improve test coverage
- **Security**: Report or fix security issues

### Development Workflow

1. **Choose an Issue**
   - Check existing [issues](https://github.com/YOUR_USERNAME/encryptdecrypt2/issues)
   - Comment on the issue to indicate you're working on it

2. **Create a Branch**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Write clear, focused commits
   - Test your changes thoroughly
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   # Backend tests
   cd backend
   mvn test

   # Frontend tests
   cd ../frontend
   npm test
   ```

5. **Submit a Pull Request**
   - Push your branch to GitHub
   - Create a pull request with a clear description
   - Reference any related issues

## Coding Standards

### Backend (Java/Quarkus)
- Follow Java naming conventions
- Use meaningful variable and method names
- Add JavaDoc comments for public methods
- Handle exceptions appropriately
- Write unit tests for new functionality

### Frontend (React/TypeScript)
- Use TypeScript for type safety
- Follow React best practices
- Use meaningful component and variable names
- Add comments for complex logic
- Ensure responsive design

### General
- Write clear, concise commit messages
- Use conventional commit format:
  ```
  feat: add new encryption feature
  fix: resolve decryption bug
  docs: update API documentation
  test: add unit tests for encryption service
  ```

## Testing

### Backend Testing
```bash
cd backend
mvn test                    # Run unit tests
mvn verify                  # Run integration tests
mvn test -Dtest=TestClass   # Run specific test class
```

### Frontend Testing
```bash
cd frontend
npm test                    # Run test suite
npm run test:coverage      # Run tests with coverage
```

### Test Coverage Requirements
- Maintain minimum 80% code coverage
- Test both happy path and error scenarios
- Include integration tests for API endpoints

## Security Considerations

### Before Contributing
- **Never commit sensitive data** (API keys, passwords, personal information)
- **Use environment variables** for configuration
- **Follow secure coding practices**
- **Test for common vulnerabilities** (XSS, CSRF, injection attacks)

### Security Testing
- Run security linters before committing
- Test for input validation
- Verify encryption/decryption works correctly
- Check for information leakage

## Submitting Changes

### Pull Request Process
1. **Ensure tests pass** locally
2. **Update documentation** if needed
3. **Write clear commit messages**
4. **Create descriptive PR title and description**
5. **Reference related issues** with `#issue-number`
6. **Request review** from maintainers

### PR Template
Please use this template for pull requests:
```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Security improvement
- [ ] Performance improvement

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project standards
- [ ] Documentation updated
- [ ] Tests pass
- [ ] Security review completed
```

## Reporting Issues

### Bug Reports
When reporting bugs, please include:
- **Clear title** describing the issue
- **Steps to reproduce** the problem
- **Expected behavior** vs actual behavior
- **Environment details** (OS, browser, versions)
- **Screenshots** if applicable
- **Error messages** or logs

### Feature Requests
For new features, please include:
- **Clear description** of the proposed feature
- **Use case** and benefits
- **Implementation suggestions** (optional)
- **Mockups or examples** (optional)

### Security Issues
For security-related issues:
- **DO NOT** create public issues
- **Email** the maintainer directly
- **DO NOT** include sensitive details in public

## Recognition

Contributors will be:
- Listed in repository contributors
- Acknowledged in release notes
- Recognized for significant contributions

Thank you for contributing to make this project better! 🚀