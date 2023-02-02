import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');
  
  // add new todo item to database
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5500/api/items', {item: itemText})
      setListItems(prev => [...prev, res.data])
      setItemText('');
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    const getItemsList = async () => {
      try {
        const res = await axios.get('http://localhost:5500/api/items')
        setListItems(res.data)
        console.log("render")
      } catch (err) {
        console.log(err)
      }
    }
    getItemsList()
  }, [])

// Delete Items

const deleteItem = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:5500/api/items/${id}`)
    const newListItems = listItems.filter(item => item._id !== id);
    setListItems(newListItems)
  } catch (error) {
    console.log(error)
  }
}

// Update
const updateItem = async(e) => {
  e.preventDefault();
  try {
    const res = await axios.put(`http://localhost:5500/api/items/${isUpdating}`, {item: updateItemText})
    console.log(res.data)
    const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
    const updatedItem = listItems[updatedItemIndex].item = updateItemText;
    setUpdateItemText('');
    setIsUpdating('');
  } catch (error) {
    console.log(error)
  }
}
const renderUpdateForm = () => (
  <form className="update-form" onSubmit={(e)=> {updateItem(e)}}>
    <input className='update-new-input' type="text" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText}/>
    <button className='update-new-btn' type="submit">Update</button>
  </form>
)

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form className="form" onSubmit={e => addItem(e)}>
        <input type="text" 
          placeholder='Add Todo Item' 
          onChange={e => {setItemText(e.target.value)}} value={itemText}/>
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {
          listItems.map(item => (
          <div className="todo-item">
            {
              isUpdating === item._id ? renderUpdateForm() :
              <>
                <p className="item-content">{item.item}</p>
                <button className="update-item" onClick={()=>{setIsUpdating(item._id)}}>Update</button>
                <button className="delete-item" onClick={() => deleteItem(item._id)}>Delete</button>
              </>
            }
          </div>
          ))
        }
        
      </div>
    </div>
  );
}

export default App;


