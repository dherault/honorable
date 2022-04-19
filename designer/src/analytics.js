import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCDg9_keH0SM-fXN95PYIwF6PKfh3g783s',
  authDomain: 'honorable-designer.firebaseapp.com',
  projectId: 'honorable-designer',
  storageBucket: 'honorable-designer.appspot.com',
  messagingSenderId: '904190845229',
  appId: '1:904190845229:web:88c52e08ef0eca9b00f3a4',
  measurementId: 'G-5147SFKM5Y',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default getAnalytics(app)
