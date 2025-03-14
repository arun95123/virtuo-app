# virtuo-app

## High Level Architecture

## NestJS Backend

- Initialized the app with Nest Cli
- Main App module with Global Cache and Config services. Cache service is used as persistance layer and Config service is used to fetch external api key and config from .env file.

```
/
│
└── server/              # NestJS backend code
    ├── src/
    │   ├── teams/                       # Teams module
    │   │   ├── dto/                     # Data Transfer Objects used in Apis
    │   │   |── interface/               # Type definition for external apis and other types used
    |   |   |── exceptions               # Custom exceptions to be thrown for api failures( Duplicate Team 
    |   |   |                               name Exception)
    |   |   |── tests                    # Unit tests using jest and mocked modules
    │   └── teams.cache.service.ts       # Layer which interacts with cache for teams key
    │   └── teams.controller.ts          # Api definitions and Entry points
    │   └── teams.module.ts              # Teams Module definition
    │   └── teams.service.ts             # Buisness Logic are placed here.
```
- End to End specs are return to validate the whole flow
- Enabled validation pipe in main.ts globally

### To Improve
- Enabled CORS for local dev. Should be refactored to whitelist.
- No separate service for cache handling since I am using inbuilt cache manager. Had this interacted with DB would have had a separate service for the direct DB handling

### Explanation of migration approach from Rails to NestJS.

The rails controller basically saves a team modal to the persistence layer and returns 201 created response on success and 422 unprocessable entity response on failure. 
The migrated Post endpoint /api/teams also does the same. The only addition is it handles duplicate team names as well and returns 400 bad request to make it easy for testing.

## React Frontend

- Initiliazed the app with vite cli.
```
/
│
└── client/              # NestJS backend code
    ├── src/
    │   ├── components/    # List and Create components. Has granular components broken down within.
    │   └── services/      # Layer which interacts NestJs api using axios
    │   └── types/         # Shared type definitions
    │   └── App.tsx        # Main landing page
    │   └── App.test.tsx   # Test case checking flow using React Testing Library and Vitest
```
### To improve
- Form component currently has all inputs repeated. The component can be refactored to render everything using a single form schema
- Form validations can be moved into Input component and Input component could just output value, isValid. This will reduce code in CreateTeam component
- Validations to be driven by the single sceham rather than having them hardcoded on CreateTeam component
- Proper creation of Toast component. Probably at a higher level and more cleaner approach than the current one.
- Usage of central state with probably Context API for easier state management.
- CSS is used to avoid setup of SCSS or SASS pre compilers. 

## Setup and installation steps

#### Backend Setup
```bash
# Navigate to the backend directory
cd server

# Install dependencies
npm install

# Start the development server
npm run start:dev
```

The backend will be available at http://localhost:3000/api.

#### Frontend Setup
```bash
# From the root directory
npm install

# Start the development server
npm run dev
```

The frontend will be available at http://localhost:5173.

## Testing

The application includes unit tests for both frontend and backend components:

```bash
# Run frontend tests
npm test

# Run backend tests (from the backend directory)
npm test
```