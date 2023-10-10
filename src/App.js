import logo from './logo.svg';
import {API, graphqlOperation} from 'aws-amplify'
import {createTask} from './graphql/mutations'
import {listTasks} from './graphql/queries'
import { withAuthenticator, Button, Heading, Alert } from 
'@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App({signOut, user}) {

   const [task,setTask] = useState({
    name: "",
    description: "",
   })
   const [tasks, setTasks] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(task);
    const result = await API.graphql(graphqlOperation
    (createTask, {input: task}))
    console.log(result)
  }

useEffect(() => {

  async function loadTasks(){
   const result = await API.graphql(graphqlOperation(listTasks))
    console.log(result)
    setTasks(result.data.listTasks.items)
  }
    loadTasks()
}, [])


  return (
   <>

   <Alert variation="info">Welcome</Alert>

   <Heading level={1}>Hello {user.username}</Heading>
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Title"
      onChange={e => setTask({...task, name: e.target.
      value})}/>

      <textarea name="description" placeholder="description"
      onChange={e => setTask({...task, description: e.target.
        value})}></textarea>

      <button>
        Submit
      </button>

    </form>

    {tasks.map(task => {
        return <article className="card card-body">
          <h2>{task.name}</h2>
          <p>{task.description}</p>
        </article>

    })}


    <Button onClick={signOut}>Sign out</Button>
   </>
  );
}

export default withAuthenticator(App);
