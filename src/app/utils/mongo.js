import { MongoClient } from 'mongodb';
const uri = process.env.MONGO_DB_URI;

if (!uri) throw new Error('Please add MONGO_URI')
  
let client = new MongoClient(uri)
let clientPromise

clientPromise = client.connect()

export default clientPromise;