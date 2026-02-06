# Development Guide

This guide provides information for developers who want to work on or contribute to the Luna project.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v14.0.0 or higher
  - Check version: `node --version`
  - Download: https://nodejs.org/
- **npm**: v6.0.0 or higher
  - Check version: `npm --version`
  - Comes with Node.js installation
- **Git**: For version control
  - Check version: `git --version`
  - Download: https://git-scm.com/
- **Text Editor/IDE**: VS Code recommended
  - Download: https://code.visualstudio.com/

### Development Environment Setup

1. **Clone the repository**:
```bash
git clone https://github.com/jakujobi/Kanj.git
cd Kanj
```

2. **Navigate to the Luna application**:
```bash
cd Luna
```

3. **Install dependencies**:
```bash
npm install
```

4. **Configure environment** (see [Configuration](#configuration) below)

5. **Start the development server**:
```bash
npm start
```

6. **Open your browser**:
Navigate to `http://localhost:3000`

## Project Structure

```
Kanj/
├── Luna/                          # Main Node.js application
│   ├── server.js                  # Express server entry point
│   ├── package.json               # Dependencies and npm scripts
│   ├── package-lock.json          # Locked dependency versions
│   ├── public/                    # Static files (HTML, CSS, JS)
│   │   ├── index.html            # Landing page
│   │   ├── dashboard.html        # Main dashboard
│   │   ├── medications.html      # Medication tracking page
│   │   ├── schedule_appt.html    # Appointment scheduling
│   │   ├── pet_list.html        # Pet management
│   │   ├── contact_us.html      # Contact form
│   │   ├── assets/              # Stellar template assets
│   │   │   ├── css/
│   │   │   ├── js/
│   │   │   └── webfonts/
│   │   └── hyperspace/          # Hyperspace template assets
│   │       ├── assets/
│   │       │   ├── css/
│   │       │   └── js/
│   │       ├── LICENSE.txt
│   │       └── README.txt
│   ├── backup/                   # Backup files
│   ├── temp/                     # Temporary files
│   └── node_modules/             # NPM packages (not in Git)
│
├── furluna/                      # WordPress backup/alternative
│   ├── app/
│   ├── conf/
│   └── logs/
│
├── Branding/                     # Brand assets
│   ├── Logo/
│   ├── Colors.txt
│   └── Fonts/
│
├── Images/                       # Stock photos and media
│
├── docs/                         # Documentation
│   ├── ARCHITECTURE.md
│   └── DEVELOPMENT.md (this file)
│
├── README.md                     # Main project README
├── CONTRIBUTING.md               # Contribution guidelines
├── SECURITY.md                   # Security information
├── LICENSE                       # GPL-3.0 license
└── .gitignore                    # Git ignore rules
```

## Configuration

### Environment Variables

Currently, configuration is hardcoded in `server.js`. Future versions should use environment variables.

**Recommended setup** (create `.env` file):
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Google Places API
GOOGLE_PLACES_API_KEY=your_api_key_here

# Location Defaults (San Francisco)
DEFAULT_LATITUDE=37.7749
DEFAULT_LONGITUDE=-122.4194
SEARCH_RADIUS=482803
```

**Note**: `.env` support requires installing `dotenv`:
```bash
npm install dotenv
```

Then add to `server.js`:
```javascript
require('dotenv').config();
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
```

### Current Configuration Values

Located in `server.js`:
- **PORT**: 3000 (or from `process.env.PORT`)
- **GOOGLE_PLACES_API_KEY**: Hardcoded (⚠️ security risk)
- **Default Location**: San Francisco (37.7749, -122.4194)
- **Search Radius**: 482,803 meters (~300 miles)

## Available Scripts

Defined in `Luna/package.json`:

### `npm start`
Starts the development server on port 3000.
```bash
npm start
```

### Custom Scripts (Not Yet Implemented)

**Recommended additions**:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

## Development Workflow

### Making Changes

1. **Create a feature branch**:
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**:
- Edit code in `server.js` for backend changes
- Edit HTML files in `public/` for frontend changes
- Test changes locally

3. **Test your changes**:
```bash
npm start
# Visit http://localhost:3000 and test manually
```

4. **Commit your changes**:
```bash
git add .
git commit -m "Description of changes"
```

5. **Push to GitHub**:
```bash
git push origin feature/your-feature-name
```

6. **Create a Pull Request** on GitHub

### Code Style

**Currently**: No enforced style guide

**Recommendations**:
- Use 2-space indentation
- Use single quotes for strings
- Add semicolons at end of statements
- Use camelCase for variables and functions
- Add comments for complex logic

**Future**: Consider adding ESLint and Prettier:
```bash
npm install --save-dev eslint prettier eslint-config-prettier
```

## Testing

### Current State
❌ No automated tests implemented

### Manual Testing Checklist

Test the following after making changes:

- [ ] Server starts without errors: `npm start`
- [ ] Landing page loads: `http://localhost:3000`
- [ ] Navigation works between pages
- [ ] Dashboard displays correctly: `/dashboard`
- [ ] Medications page renders: `/medications`
- [ ] Schedule appointment page loads: `/schedule_appt`
- [ ] Provider data displays (if API key is valid)
- [ ] All CSS files load correctly
- [ ] No console errors in browser DevTools

### Recommended Testing Setup

**Unit Tests** (Jest):
```bash
npm install --save-dev jest supertest
```

Example test structure:
```javascript
// __tests__/server.test.js
const request = require('supertest');
const app = require('../server');

describe('Server Routes', () => {
  test('GET / returns landing page', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
```

**Integration Tests**:
- Test Google Places API integration
- Test HTML generation functions
- Test file system operations

## Debugging

### Server-Side Debugging

**Using Node.js Debugger**:
```bash
node --inspect server.js
```

Then open Chrome DevTools: `chrome://inspect`

**Using VS Code**:
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/Luna/server.js"
    }
  ]
}
```

### Client-Side Debugging

Use browser DevTools:
- **Chrome**: F12 or Cmd+Option+I (Mac) / Ctrl+Shift+I (Windows)
- **Console**: View JavaScript errors
- **Network**: Monitor HTTP requests
- **Elements**: Inspect HTML/CSS

### Common Issues

**Port already in use**:
```bash
# Find process using port 3000
lsof -ti:3000
# Kill the process
kill -9 <PID>
```

**Dependencies not installed**:
```bash
rm -rf node_modules package-lock.json
npm install
```

**Google API errors**:
- Check API key is valid
- Ensure Places API is enabled in Google Cloud Console
- Check API quota limits

## Database Integration (Future)

**Planned**: PostgreSQL or MongoDB

**Schema Design** (example):
```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pets table
CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(100) NOT NULL,
  species VARCHAR(50),
  breed VARCHAR(100),
  date_of_birth DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Medications table
CREATE TABLE medications (
  id SERIAL PRIMARY KEY,
  pet_id INTEGER REFERENCES pets(id),
  name VARCHAR(255) NOT NULL,
  dosage VARCHAR(100),
  frequency VARCHAR(100),
  start_date DATE,
  end_date DATE,
  notes TEXT
);
```

**Recommended ORM**: Sequelize (PostgreSQL) or Mongoose (MongoDB)

## API Development

### Adding New Routes

1. **Define route in server.js**:
```javascript
app.get('/new-route', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'new-page.html'));
});
```

2. **Create corresponding HTML file**:
```bash
touch Luna/public/new-page.html
```

3. **Test the route**:
```bash
curl http://localhost:3000/new-route
```

### Adding API Endpoints

Example JSON API endpoint:
```javascript
app.get('/api/pets', (req, res) => {
  // TODO: Fetch from database
  const pets = [
    { id: 1, name: 'Rocky', species: 'dog' },
    { id: 2, name: 'Whiskers', species: 'cat' }
  ];
  res.json(pets);
});
```

## Performance Optimization

### Current Bottlenecks
1. Synchronous file I/O in `appendHospitalsToListFile`
2. No caching of API responses
3. No compression of static assets
4. No CDN for static files

### Recommended Improvements

**Enable compression**:
```javascript
const compression = require('compression');
app.use(compression());
```

**Add response caching**:
```javascript
const cache = require('memory-cache');

app.get('/api/providers', (req, res) => {
  const cachedData = cache.get('providers');
  if (cachedData) {
    return res.json(cachedData);
  }
  // Fetch and cache data
});
```

**Use async file operations**:
```javascript
const fsPromises = require('fs').promises;

async function updateProvidersFile() {
  const html = await generateProvidersHTML();
  await fsPromises.writeFile(filePath, html, 'utf8');
}
```

## Security Best Practices

### For Development

1. **Never commit secrets**:
   - Use `.env` files (add to `.gitignore`)
   - Use environment variables
   - Rotate exposed API keys immediately

2. **Input validation**:
```javascript
const { body, validationResult } = require('express-validator');

app.post('/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process signup
  }
);
```

3. **Use HTTPS in production**:
```javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(443);
```

## Deployment

### Local Deployment
Already covered in "Getting Started" section.

### Production Deployment

**Recommended Platforms**:
- **Heroku**: Easy Node.js deployment
- **DigitalOcean**: App Platform or Droplet
- **AWS**: Elastic Beanstalk or EC2
- **Vercel**: Serverless deployment
- **Railway**: Modern hosting platform

**Heroku Example**:
```bash
# Install Heroku CLI
heroku login
heroku create luna-pet-health
git push heroku main
heroku config:set GOOGLE_PLACES_API_KEY=your_key
heroku open
```

**Environment Variables** (production):
- Set in hosting platform dashboard
- Never hardcode in source code
- Use secrets management tools

## Tools & Extensions

### Recommended VS Code Extensions

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **GitLens** - Git integration
- **REST Client** - API testing
- **Live Server** - Static file serving
- **Node.js Extension Pack** - Node.js development tools

### Useful NPM Packages

**Development**:
- `nodemon` - Auto-restart server on changes
- `eslint` - Code linting
- `prettier` - Code formatting
- `jest` - Testing framework

**Production**:
- `dotenv` - Environment variable management
- `helmet` - Security headers
- `morgan` - HTTP request logging
- `compression` - Response compression
- `express-rate-limit` - API rate limiting

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed contribution guidelines.

## Getting Help

- **Issues**: Check [GitHub Issues](https://github.com/jakujobi/Kanj/issues)
- **Documentation**: Review `docs/` folder
- **Code**: Read inline comments in `server.js`

## Resources

### Node.js & Express
- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [npm Documentation](https://docs.npmjs.com/)

### Google APIs
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service)
- [Google Cloud Console](https://console.cloud.google.com/)

### Frontend
- [HTML5 UP Templates](https://html5up.net/)
- [jQuery Documentation](https://api.jquery.com/)

### Best Practices
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
