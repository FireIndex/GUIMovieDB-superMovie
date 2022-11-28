import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.REACT_APP_firebase_apiKey,
  authDomain: process.env.REACT_APP_firebase_authDomain,
  databaseURL: process.env.REACT_APP_firebase_databaseURL,
  projectId: process.env.REACT_APP_firebase_projectId,
  storageBucket: process.env.REACT_APP_firebase_storageBucket,
  messagingSenderId: process.env.REACT_APP_firebase_messagingSenderId,
  appId: process.env.REACT_APP_firebase_appId,
  measurementId: process.env.REACT_APP_firebase_measurementId,
}

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()
const colRef = collection(db, 'movies')

let dbDocs = []
onSnapshot(colRef, (snapshot) => {
  snapshot.forEach((docs) => {
    dbDocs.push({ ...docs.data(), docId: docs.id })
  })
})

/*
addDoc(colRef, {todo:"gjdhj", date:"20-02-1999"}).then(() => alert('Data store successfully'))
 */

/*
// not geting real time
getDocs(colRef)
  .then((snapshot) => {
    console.log(snapshot.docs)
    let fetchDbValues = []
    snapshot.forEach((docs) => {
      // spread operator is use to fetch rest of the key:value pare od docs
      fetchDbValues.push({ ...docs.data(), docId: docs.id })
    })
    console.log(fetchDbValues)
  })
  .catch((err) => {
    console.log(err.message)
  })
*/

/*
// Real time collecting data (automatically run when any changes occure ex: create, update, delete)
onSnapshot(colRef, (snapshot) => {
  let fetchDbValues = []
  snapshot.forEach((docs) => {
    fetchDbValues.push({ ...docs.data(), docId: docs.id })
  })
  console.log(fetchDbValues)
})
*/

/*
// Get single document
const docRef = doc(db, 'movies', 'VYjNSYi4R0RJJbU1cvJJxxxx')
getDoc(docRef).then((doc) => {
  var docum = { ...doc.data(), docId: doc.id }
  Object.keys(docum).length > 1
    ? console.log(docum)
    : console.log('document id is not valid or data is not available')
})
// realtime get single doc 
onSnapshot(docRef, (doc)=>{
var docum = { ...doc.data(), docId: doc.id }
Object.keys(docum).length > 1
  ? console.log(docum)
  : console.log('document id is not valid or data is not available')
})
*/

/*
const docRef = doc(db, 'movies', 'sdadFsSDw3daDd2ad3')
updateDoc(docRef, {
  title: "updated-title",
  tagline: "this is updating"
})
*/

/*
// delete using document id
const docRef = doc(db, 'movies', 'ads8u89asdu8')
deleteDoc(docRef).then(() => {
  // alert('Delete')
})
*/

/*
// Getting specific document
const q = query(colRef, where('id', '==', '299534tt4154796'))
console.log('q')
console.log(q)
console.log('q')
*/

export { db, colRef, dbDocs }
