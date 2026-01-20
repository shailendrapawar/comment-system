import { useState } from 'react'

import './App.css'
import { useTheme } from './contexts/ThemeContext'
import useGetPosts from './hooks/useGetPosts';

function App() {
  const [count, setCount] = useState(0)
  const { theme } = useTheme();
  console.log(theme)

  const { posts, loading, error, refetch } = useGetPosts({ page: 1, limit: 10 })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <main className=' h-screen bg-green-500'>

      </main>
    </>
  )
}

export default App
