import { config } from 'dotenv'
config()
import admin from 'firebase-admin'
admin.initializeApp({
  credential: admin.credential.cert('./secrets/firebase.json'),
})
import app from './app'

app.listen(process.env['SERVER_PORT'] || 8080)
