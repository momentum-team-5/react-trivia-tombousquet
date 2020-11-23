
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
      <h1>KnowYourStuff!</h1>
      <ul className='container'>
        {categories.map((category) => (
          <li className='pa3 category' key={category.id}>
            <button
              onClick={() => setSelectedCategory(category)}
              className='underline white cat-button'
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>

  )
}

export default App
