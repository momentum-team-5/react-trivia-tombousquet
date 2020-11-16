/* globals fetch */

import 'tachyons'
import './App.css'
import { useEffect, useState } from 'react'

function App () {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(data => setCategories(data.trivia_categories))
  }, [])
  return (
    <div className='App'>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
