import MarkdownEditor from './pages/CreatePostForm'
import './App.css'

function App() {

  return (
    <>
     <div className="App">
      <header className="bg-blue-800 text-white p-4">
        <h1 className="text-3xl font-bold">My Markdown Editor</h1>
      </header>
      <main className="container mx-auto mt-4">
        <MarkdownEditor />
      </main>
    </div>
    </>
  )
}

export default App
