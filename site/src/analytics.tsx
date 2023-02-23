import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCWoG1fSy-Cf8UG0rXr8IxJxkwiS3Jbkig',
  authDomain: 'honorable-landing.firebaseapp.com',
  projectId: 'honorable-landing',
  storageBucket: 'honorable-landing.appspot.com',
  messagingSenderId: '246948299765',
  appId: '1:246948299765:web:3c18f7694e3981ae7096bc',
  measurementId: 'G-7HL48K0L5L',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default getAnalytics(app)
