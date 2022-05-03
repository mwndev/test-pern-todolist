require('dotenv').config({path: '../.env'})
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const port = process.env.SERVER_PORT

app.use(cors())
app.use(express.json())

app.listen(port, () => {console.log(`listening on port ${port}`)})

app.post('/todolist', async (req, res) => {
    try{

        const {description, creationDate, finishedTargetDate, finishedDate} = req.body
        const newTodo = await pool.query(
            `INSERT INTO todos (description, creation_date, finished_target_date, finished_date) 
            VALUES($1, $2, $3, $4) RETURNING *`,
            [description, creationDate, finishedTargetDate, finishedDate]
            )
            res.json(newTodo.rows)
        }catch(err){
            res.json({message: err})
        }
})

app.get('/todolist', async (req, res) => {
    try {
        const newTodo = await pool.query(
            `SELECT (description, creation_date, finished_target_date, finished_date) FROM todos`
        )
        res.send(newTodo.rows)
    } catch (err) {
        res.json({message: err})
    }
})

app.delete('/todolist/:id', async (req, res) => {
    try {
        const {id} = req.params
        const deletedTodo = await pool.query(
            `DELETE FROM todos WHERE id = $1`,
            [id]
        )
        res.send(deletedTodo.rows)
    } catch (err) {
        res.json({message: err})
    }
})

app.put('/todolist/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {description} = req.body
        const updatedTodo = await pool.query(
            `UPDATE todos SET description = $1 WHERE id = $2 RETURNING *`,
            [description, id]
        )
        res.send(updatedTodo)
    } catch (err) {
        res.json({message: err})
    }
})
