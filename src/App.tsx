import React,  {useState, FormEvent} from 'react'
import './App.css'

import {BsFillTrashFill, BsPenFill} from "react-icons/bs"

type DataType = {
  id: number,
  txt: string
}

function App() {

  const [data, setData] = useState<DataType[]>([])
  const [text, setText] = useState("")
  const [edit, setEdit] = useState(false)
  const [idOfItem, setIdOfItem] = useState<number | null>(null)

  const editTask = () => {
    const updateItem = data.map(item => {
      if (item.id == idOfItem){
        return {...item, ...{id: idOfItem, txt: text}}
      }
      return item
    })

    setData(updateItem)
    setEdit(false)
    setText("")
  }

  const handleCreateTask = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (text == "" || text == null){
      alert("Digite algo que você vai fazer!")
      return
    }

    if (edit){
      editTask()
      return
    }
    const objData = {id: data.length + 1, txt: text}
    setData([...data, objData])
    setText("")
  }

  const handleDelete = (id: number): void => {
    const newData = data.filter(item => {
      return item.id != id
    })
    setData(newData)
  }

  const handleEdit = (id: number, itemText: string): void => {
    setText(itemText)
    setIdOfItem(id)
    setEdit(true)
  }

  return (
    <div className="App">
      <div className='content'>

        <h2>Lista de Tarefas</h2>

        <form className="inputContainer" onSubmit={handleCreateTask}>
          <input 
            type="text" 
            placeholder='O que vamos fazer hoje?'
            onChange={e => setText(e.target.value)}
            value={text}
          />
          <input type="submit" value={edit ? "Editar Tarefa" : "Criar Tarefa"} />
        </form>

        <div className='taskContainer'>
          <ul className='tasks'>
            
            {
              data.map(item => (

                <li className='task' key={item.id}>
              
                  <p>{item.txt}</p>
                  <div className='taskActions'>
                    <button onClick={() => handleEdit(item.id, item.txt)} className='btn editBtn'><BsPenFill/></button>
                    <button onClick={() => handleDelete(item.id)} className='btn deleteBtn'><BsFillTrashFill/></button>
                  </div>

                </li>

              ))
            }
            
          </ul>
        </div>

      </div>
    </div>
  )
}

export default App
