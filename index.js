import express from "express" //importanto o express
import path from "path" //define caminhos padroes
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.resolve(path.dirname(''))
console.log(__dirname)
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs") 
app.use(express.static(path.join(__dirname, "public")))

const port = 3001

app.listen(port, () => { 
    console.log(`Servidor rodando em https://localhost:${port}`)
})

const tarefas = [
    {
        id: 1,
        nome_tarefa: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    }, {
        id: 2,
        nome_tarefa: "Fazer comida",
    }
]

let editarTarefa = ""
let tarefaAtual = ""

app.get('/', (req, res) => {
    res.render('index.ejs', { tarefas, editarTarefa })
})

app.post("/cadastro", (req, res) => {
    const { nome_tarefa } = req.body
    tarefas.push({ id: tarefas.length + 1, nome_tarefa })
    res.redirect('/')
})

app.get("/editar/:id", (req, res) => {
    const id = +req.params.id
    editarTarefa = tarefas.find((editarTarefa) => editarTarefa.id == id)
    res.render('editar.ejs', {editarTarefa})
})

app.post("/editar/:id", (req, res) => {
    const id = +req.params.id-1
    const novaTarefa = req.body
    novaTarefa.id = id +1
    tarefas[id]=novaTarefa
    
    res.redirect('/')
})

app.get("/delete/:id", (req, res) => {
    const id = +req.params.id-1
    delete tarefas[id]
    res.redirect("/")
})



