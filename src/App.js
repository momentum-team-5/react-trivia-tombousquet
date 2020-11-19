/* globals fetch */

import 'tachyons'
import './App.css'
import { useEffect, useState } from 'react'
import CategoryData from './components/CategoryData'

function App () {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(data => setCategories(data.trivia_categories))
  }, [])

  if (selectedCategory) {
    return (
      <CategoryData
        category={selectedCategory}
        clearSelectedCategory={() => setSelectedCategory(null)}
      />
    )
  }

  return (
    <div className='App'>
      <h1 className='ma4'>Choose from any of the below categories</h1>
      <ol>
        {categories.map((category) => (
          <li className='ma3 ba pa3 blue bg-light-yellow category' key={category.id}>
            <button
              onClick={() => setSelectedCategory(category)}
              className='pl0 bw0 bg-light-yellow underline blue'
            >
              {category.name}
            </button>
          </li>
        ))}
      </ol>
    </div>

  )
}

export default App
