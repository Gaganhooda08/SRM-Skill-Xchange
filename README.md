
# SRM Skill Exchange

SRM Skill Exchange is a platform for students to register, share their skills, and network with others at SRM Institute. It provides functionalities for user registration, displaying skills, and searching for other students based on name, registration number, or skills.

## Features

- **User Registration**: Sign up with your name, registration number, branch, section, year, and skills.
- **Skill Display**: Showcase your skills and view others' skills.
- **Contact Links**: Add social media links (Instagram, LinkedIn, GitHub, Discord) and a "Buy Me a Coffee" link for tips.
- **Search**: Filter users by name, registration number, or skills.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abuzarcodes/SRM-Skill-Xchange
   ```

2. Install Dependencies

   Ensure you have Node.js installed, then run:

   ```bash
   npm install
   ```

3. Firebase Setup

    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Create a new Firebase project.
    - Enable Firestore and Authentication (Email/Password method).
    - Copy your Firebase configuration from the Firebase project settings and add it to \`firebase/firebase.js\`.

Here's an example of how \`firebase.js\` should look:

   ```javascript
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";
   import { getAuth } from "firebase/auth";

   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id",
   };

   const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   export const auth = getAuth(app);
   ```

4. Run the Project

   Start the development server:

   ```bash
   npm start
   ```

   The app will run on [http://localhost:3000](http://localhost:3000).

## Project Structure

\`\`\`
src/
│
├── components/
│   ├── Auth/
│   │   ├── SignIn.js
│   │   ├── SignUp.js
│   ├── UserCard.js
│   └── RegisteredUsersPage.js
│
├── firebase/
│   └── firebase.js      # Firebase configuration
│
├── App.js               # Main app component
├── index.js             # Entry point
├── App.css              # Global styles
└── RegisteredUsersPage.css  # Styles for the users page
\`\`\`

## Firebase Setup

Make sure you have set up Firebase correctly:

- Add your Firestore rules in Firebase Console under Rules to secure your data.
- Enable Email/Password Authentication under Authentication > Sign-in method.

## Usage

- **Sign Up**: Users can sign up by providing their name, email, registration number, branch, section, year, and skills.
- **Sign In**: Users can sign in using their registered email and password.
- **View Registered Users**: After signing in, users can view the list of all registered users, including their skills and social links.
- **Search Users**: Use the search bar to find users by their name, registration number, or skills.

## Contributing

Contributions are welcome! If you find any issues or want to enhance the project, feel free to submit a pull request.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-branch
   ```

3. Commit your changes:

   ```bash
   git commit -m 'Add some feature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature-branch
   ```

5. Open a pull request.

## License

This project is licensed under the MIT License.

---

### Key Points

- Replace \`"your-api-key"\` and other Firebase configuration details with the actual values from your Firebase console.
- Customize the repository URL in the \`git clone\` command if you're using GitHub or any other platform.
- Adjust the file structure in the \`Project Structure\` section according to your actual project layout.
