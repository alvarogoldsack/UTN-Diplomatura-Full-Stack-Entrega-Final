import {Navigate} from 'react-router-dom';
import dotenv from 'dotenv'
import path from 'path'
import express from 'express';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from '../template'

import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import postRoutes from './routes/post.routes'

import * as React from 'react'
import devBundle from './devBundle'

dotenv.config();

const CURRENT_WORKING_DIR = process.cwd()
const app = express();

app.get('/', (req, res) => {
    res.status(200).send(Template())
})

devBundle.compile(app)

app.use('/build', express.static('build'));
app.use(bodyParser.json()) // simplifies parsing request from JSON body objects
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser()) //to parse and set cookies in request objects
app.use(compress()) //compresses response bodies for requests
app.use(helmet()) //secures express apps by setting various HTTP headers
app.use(cors()) //enables cross-origin resource sharing

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError'){
        <Navigate to="/login" />
        res.status(401).json({"error" : err.name + ": " + err.message})
    } else if (err) {
        <Navigate to="/login" />
        res.status(400).json({"error" : err.name + ": " + err.message})
        console.log(err), next
    }
})

app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', postRoutes)

export default app

