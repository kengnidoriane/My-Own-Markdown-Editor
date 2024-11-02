// CreatePostForm.jsx
import { useState } from 'react';
import { marked } from 'marked'
import { Bold,Code, Italic,ListOrdered, List, Image, Link, Heading,Quote,EllipsisVertical,Table, Underline,Strikethrough, CircleHelp } from 'lucide-react';
import { Button } from '../components/Button'; 

const toolbarActions = [
  {
    icon: <Bold size={20} />,
    name: 'Bold',
    action: (insertText) => insertText('**', '**')
  },
  {
    icon: <Italic size={20} />,
    name: 'Italic',
    action: (insertText) => insertText('_', '_')
  },
  {
    icon: <ListOrdered size={20} />,
    name: 'unordered List',
    action: (insertText) => insertText('\n1. ')
  },
  {
    icon: <List size={20} />,
    name: 'ordered List',
    action: (insertText) => insertText('\n- ')
  },
  {
    icon: <Image size={20} />,
    name: 'Image',
    action: (insertText) => insertText('![alt](', ')'),
  },
  {
    icon: <Link size={20} />,
    name: 'Link',
    action: (insertText) => insertText('[texte](', ')')
  },
  {
    icon: <Heading size={20}/>,
    name: 'Heading',
    action: (insertText) => insertText('#', '')
  },
  {
    icon: <Quote size={20}/>,
    name: 'Quote',
    action: (insertText) => insertText('> ', '')
  },
  {
    icon: <Code size={20}/>,
    name: 'Code',
    action: (insertText) => insertText('`', '`')
  },
  {
    icon: <Underline size={20}/>,
    name: 'Underline',
    action: (insertText) => insertText('__', '__')
  },
  {
    icon: <Strikethrough size={20}/>,
    name: 'Barré',
    action: (insertText) => insertText('~~', '~~')
  },
  {
    icon: <CircleHelp size={20}/>,
    name: 'Help',
    action: (insertText) => insertText('?', '')
  },
  {
    icon: <Table size={20} />, 
    name: 'Table',
    action: (insertText) => insertText('| Colonne 1 | Colonne 2 |\n|-----------|-----------|\n| Donnée 1  | Donnée 2  |\n')
  },
];


function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showMore, setshowMore] = useState(false);


  const insertText = (before, after = '') => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
      const newText = before + selectedText + after;
      
      const newContent = 
        textarea.value.substring(0, start) +
        newText +
        textarea.value.substring(end);
      
      setContent(newContent);

      // Attendre le prochain cycle pour définir la sélection
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + before.length,
          start + before.length + selectedText.length
        );
      }, 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const html = marked(content)
    console.log({ title, html });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Créer un article</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de l'article"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contenu
            </label>
            <div className="relative flex justify-between gap-2 p-2 bg-gray-50 rounded-t-md border border-gray-300">
              <div>
                {toolbarActions.slice(0, 7).map((action, index) => (
                  <Button
                    key={index}
                    onClick={() => action.action(insertText)}
                    title={action.name}
                    variant="outline"
                    className="p-2 hover:bg-green-200"
                  >
                    {action.icon}
                  </Button>
                ))}
              </div>
              <button onClick = {() =>setshowMore(!showMore)}>
                 <EllipsisVertical size={20}/>
              </button>
              {
                showMore && (
                  <div className= 'absolute top-full right-0 mt-1 bg-gray border rounded-md shadow-lg z-10'>
                    {
                      toolbarActions.slice(7).map((action, index) => (
                        <Button
                          key={index}
                          onClick={() => action.action(insertText)}
                          title={action.name}
                          variant="outline"
                          className="p-3 hover:bg-green-200"
                        >
                         {action.icon}
                        </Button>
                      ))
                    }
                  </div>
                )
              }
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onClick={() => setshowMore(false)}
              placeholder="Contenu de l'article (format Markdown)"
              className="w-full h-64 p-4 border border-gray-300 rounded-b-md font-mono focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <Button 
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Publier
            </Button>
          </div>
        </form> 

        {content && (
          <div className="mt-8 p-4 border rounded-md">
            <h3 className="text-lg font-semibold mb-4">Aperçu :</h3>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md"  >
              {marked(content)}
              </pre>
               
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePostForm;
