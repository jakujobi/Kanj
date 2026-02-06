# Contributing to Luna

Thank you for your interest in contributing to Luna! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates.

**When submitting a bug report, include**:
- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce the behavior
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: 
  - OS (Windows/macOS/Linux)
  - Node.js version (`node --version`)
  - npm version (`npm --version`)
  - Browser (if frontend issue)
- **Screenshots**: If applicable
- **Error Messages**: Full error messages or stack traces

**Bug Report Template**:
```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., macOS 12.0]
- Node.js: [e.g., v16.13.0]
- npm: [e.g., v8.1.0]
- Browser: [e.g., Chrome 96]

## Additional Context
Any other relevant information
```

### Suggesting Enhancements

Enhancement suggestions are welcome! Please:
- **Check existing issues** to avoid duplicates
- **Provide clear use cases** for the enhancement
- **Explain the benefit** to users or developers
- **Consider implementation complexity**

**Enhancement Template**:
```markdown
## Feature Description
Clear description of the proposed feature

## Use Case
Who would benefit and why

## Proposed Solution
How the feature could be implemented

## Alternatives Considered
Other approaches you've thought about

## Additional Context
Mockups, examples, or references
```

### Code Contributions

We welcome code contributions! Here's how to get started:

## Development Process

### 1. Set Up Development Environment

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Kanj.git
cd Kanj

# Add upstream remote
git remote add upstream https://github.com/jakujobi/Kanj.git

# Install dependencies
cd Luna
npm install
```

### 2. Create a Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
```

**Branch naming conventions**:
- `feature/` - New features (e.g., `feature/add-user-auth`)
- `fix/` - Bug fixes (e.g., `fix/api-error-handling`)
- `docs/` - Documentation changes (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/clean-routes`)
- `test/` - Test additions/changes (e.g., `test/add-api-tests`)

### 3. Make Your Changes

**Follow these guidelines**:

#### Code Style
- Use **2 spaces** for indentation (no tabs)
- Use **single quotes** for strings
- Add **semicolons** at end of statements
- Use **camelCase** for variables and functions
- Use **PascalCase** for classes
- Add **meaningful comments** for complex logic
- Keep functions **small and focused**

**Example**:
```javascript
// Good
function calculateMedicationSchedule(pet, medication) {
  const dosageAmount = medication.dosage;
  const frequency = medication.frequency;
  
  // Calculate next dose based on last administration
  const nextDose = calculateNextDose(frequency);
  
  return {
    petId: pet.id,
    medicationId: medication.id,
    nextDose: nextDose
  };
}

// Avoid
function calc(p,m){let d=m.dosage;let f=m.frequency;return {pid:p.id,mid:m.id,nd:calcND(f)}}
```

#### File Organization
- Keep related code together
- One responsibility per file/module
- Use clear, descriptive file names
- Add file header comments for purpose

#### Commit Messages

Write clear, descriptive commit messages:

**Format**:
```
<type>: <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Add or update tests
- `chore`: Maintenance tasks

**Examples**:
```bash
# Good
git commit -m "feat: add medication reminder notifications"
git commit -m "fix: resolve API timeout in provider search"
git commit -m "docs: update installation instructions in README"

# Detailed commit
git commit -m "feat: implement user authentication

- Add login and signup endpoints
- Integrate Passport.js for session management
- Add password hashing with bcrypt
- Create user database schema

Closes #42"
```

### 4. Test Your Changes

Before submitting, ensure:

- [ ] Code runs without errors: `npm start`
- [ ] All existing functionality still works
- [ ] New features work as expected
- [ ] No console errors in browser DevTools
- [ ] Code follows style guidelines
- [ ] Comments added for complex logic

**Manual Testing Checklist**:
```bash
# Start the server
cd Luna
npm start

# Test in browser
# - http://localhost:3000 (landing page)
# - http://localhost:3000/dashboard
# - http://localhost:3000/medications
# - http://localhost:3000/schedule_appt

# Check for errors
# - Server console
# - Browser console (F12)
```

### 5. Update Documentation

If your changes affect:
- **User-facing features**: Update README.md
- **API endpoints**: Update docs/ARCHITECTURE.md
- **Development setup**: Update docs/DEVELOPMENT.md
- **New dependencies**: Update package.json and README

### 6. Submit a Pull Request

```bash
# Push your branch to your fork
git push origin feature/your-feature-name
```

Then on GitHub:
1. Navigate to your fork
2. Click "New Pull Request"
3. Select your branch
4. Fill out the PR template

**Pull Request Template**:
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
How was this tested?
- [ ] Manual testing
- [ ] Automated tests
- [ ] No testing needed (docs only)

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Tested locally

## Related Issues
Closes #(issue number)
```

## Code Review Process

### What to Expect

1. **Initial Review**: Maintainers will review within 1-7 days
2. **Feedback**: You may receive comments or change requests
3. **Revisions**: Make requested changes and push updates
4. **Approval**: Once approved, PR will be merged
5. **Merge**: Maintainer will merge your contribution

### Review Criteria

Reviewers will check:
- **Functionality**: Does it work as intended?
- **Code Quality**: Is the code clean and maintainable?
- **Performance**: Are there performance concerns?
- **Security**: Does it introduce security risks?
- **Documentation**: Is it well-documented?
- **Tests**: Are changes adequately tested?

## Project-Specific Guidelines

### Working with HTML Files

- **Location**: All HTML files go in `Luna/public/`
- **Templates**: Use existing HTML5 UP templates for consistency
- **Styling**: Add styles to existing CSS files, don't create new ones unless necessary
- **Scripts**: Place JavaScript in `Luna/public/assets/js/` or inline

### Working with Express Routes

**Adding routes in `server.js`**:
```javascript
// Group related routes together
// Pet management routes
app.get('/pets', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pets.html'));
});

app.get('/pets/:id', (req, res) => {
  const petId = req.params.id;
  // Handle pet detail view
});
```

### API Integration

- **API Keys**: Never commit API keys
- **Environment Variables**: Use `.env` for configuration
- **Error Handling**: Always handle API errors gracefully
- **Rate Limiting**: Be mindful of API rate limits

### Security Considerations

**Before submitting**:
- [ ] No hardcoded credentials
- [ ] Input validation for user data
- [ ] Error messages don't expose system details
- [ ] No SQL injection vulnerabilities (when DB is added)
- [ ] XSS prevention measures in place

## Areas Needing Contributions

### High Priority
- [ ] User authentication system
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Environment variable configuration
- [ ] Input validation and sanitization
- [ ] Error handling improvements

### Medium Priority
- [ ] Automated testing (Jest/Mocha)
- [ ] API endpoint for dynamic medication management
- [ ] Real-time location-based provider search
- [ ] Email/SMS notifications
- [ ] Mobile responsive improvements

### Low Priority
- [ ] Code linting setup (ESLint)
- [ ] Code formatting (Prettier)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Docker containerization
- [ ] Performance optimization

## Questions?

If you have questions:
- **Check Documentation**: Review `docs/` folder
- **Search Issues**: Look through existing GitHub issues
- **Ask in Issues**: Create a new issue with the `question` label
- **Contact Maintainers**: Open a discussion on GitHub

## Recognition

Contributors will be:
- Listed in the project README
- Credited in release notes
- Acknowledged in commits and PRs

Thank you for contributing to Luna! 🐾
