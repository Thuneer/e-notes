# Sett opp firebase og firestore

Om du ønskjer å sette dette repoet opp lokalt, så må firebase og firestore settast opp.

- Gå til firebase console og lag eit nytt prosjekt.
- Under `Get started by adding Firebase to your app`, trykk på `web` (</>) knappen og lag ein ny app.
- Kopier firebaseConfig variablane inn i `src/firebase.ts` fila.
- Trykk på `Authentication` og `Get Started`.
- Velg `Email/Password` provideren og skru denne på. Trykk på `Save`.
- Trykk på `Users` i tab menyen og legg til ein ny brukar med e-post og passord. Du kan bruke denne for å logge inn i react appen.
- Gå tilbake til `Project Overview` og trykk på `Cloud Firestore`.
- Trykk på `Create Database` og trykk `Next`.
- Trykk `Enable` til slutt for å lage databasen.
- Trykk på `Rules` tabben og bytt `allow read, write: if false;` til `allow read, write: if request.auth.uid != null;`. No vil innlogga brukarar få tilgang til å lese og skrive til databasen.

# Lokal server

### `npm install`

Kjøyr denne kommandoen for å installere avhengigheitar.

### `npm start`

Kjøyr denne komamndoen for å starte lokal dev server på `http://localhost:3000`
