import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, CheckCircle, Plus,  } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reorder } from "motion/react"

interface todoProps{
  id:number;
  title:string;
  creator:string;
  completed:boolean;
  editable:boolean;
};


const Home = () => {

  const [todos,setTodos] = useState<todoProps[]>([]);
  const [todoTitle, setTodoTitle] = useState("");
  // const [todoCreator, setTodoCreator] = useState("");
  const [editTodoTitle, setEditTodoTitle] = useState("");

  const parsedData = localStorage.getItem("user");
  const userData = parsedData ? JSON.parse(parsedData) : null;

  

  useEffect(()=>{
    if(!userData?.name) return;
    const savedTodos = localStorage.getItem(`todos-list-${userData.name}`);
    if(savedTodos){
      setTodos(JSON.parse(savedTodos));
    }
  },[userData?.name]);
  

  useEffect(()=>{
    if(!userData?.name) return;
    localStorage.setItem(`todos-list-${userData.name}`,JSON.stringify(todos));
  },[todos, userData?.name]);

  const addNewTodo = () =>{

    // This condition for disabling the create button from submitting if the input fields are empty
    if(!todoTitle.trim() || !userData.name.trim()) return;

    // This variable contains the new todo info like id, todo title, todo creator name, and checked as not completed or editable as this variable is for creating the todo
    const newTodo = {
      id:Date.now(),
      title:todoTitle,
      creator:userData.name || "User",
      completed:false,
      editable:false
    };

    // Updating the state of the todos with the new todo while keeping the old todos
    setTodos([newTodo, ...todos]);
    // After Clicking create button the todo title input and todo creator name become empty to tell the user that he / she can enter a new todo title and creator name
    setTodoTitle("");
    // setTodoCreator("");
    // I'm checking here with this console.log if the button submits with the condition if(!todoTitle.trim() || !todoCreator.trim()) return; or not 
    console.log("test");
  };


  const editTodo = (id:number)=>{
  
    // Here we check if the todo we want to target exist or not by comparing the todo id with the todo id the user wants to edit.
    const todoToEdit = todos.find((todo)=> todo.id === id);
    // If todo exists
    if(todoToEdit){
      // Then set the state of the todo with the edited todo.
      setEditTodoTitle(todoToEdit.title);
      setTodos(todos.map((todo)=> todo.id === id ? {...todo, editable:!todo.editable} : todo));
    }
  };

  const deleteTodo = (id:number)=>{
    // Here we check if the todo.id has the same id of the todo the wants to delete, if yes then the todo is deleted.
    setTodos(todos.filter((todo)=> todo.id !== id));
  };
  
  const updateTodo = (id:number)=>{
    // Here we enable the update button to update the todo with a new title.
    // Here the update button won't work until the editTodo input has something written in it.
    if(editTodoTitle.trim() === ""){
      return;
    }
    // return all of the todos available in todos array, the title of the todo is updated with editTodoTitle and disabling the edit button as returning it as false. if there's no edit then return the original todos.
    else{
    setTodos(todos.map((todo)=> todo.id === id ? {...todo, title:editTodoTitle, editable:false} : todo));
    }
  };

  const completedTodo = (id:number) =>{
    // Here we check the id of the todo that the user wants to mark as completed, if it matches then the todo is marked as a completed todo
    setTodos(todos.map((todo)=> todo.id === id ? {...todo, completed:!todo.completed} : todo));
  };


  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">{userData?.name} todoList</h1>
      {/* Section that contains the todo title input and the todo creator input with a button to create a todo  */}
      <div className="flex gap-4">
        <Input
          value={todoTitle}
          onChange={(e)=>{setTodoTitle(e.target.value)}}
          placeholder="Todo title"
        />
        {/* <Input
          value={todoCreator}
          onChange={(e)=>{setTodoCreator(e.target.value)}}
          placeholder="Todo Creator"
        /> */}
        <Button onClick={addNewTodo} variant="default">
          <Plus/>
          Create
        </Button>
      </div>

      <div className="flex flex-col gap-10">
        {/* We loop over the todos array so we can display the todo contents of the user such as the todo title and todo creator. */}
        <Reorder.Group axis="y" values={todos} onReorder={setTodos} className="space-y-10">
          {
            todos.map((todo)=>(
              <Reorder.Item key={todo.id} value={todo}>
                <Card className="cursor-pointer">
                  {
                    todo.editable ? 
                    // If the user clicked on the pencil icon to edit a todo, this opens a new div with an input and an update button to edit the targeted todo.
                      <CardContent className="flex-1 flex gap-4 items-center">
                        {/* Input to let user update the todo title */}
                        <Input
                          className="flex-1"
                          placeholder="Update the todo"
                          value={editTodoTitle}
                          onChange={(e)=>setEditTodoTitle(e.target.value)}
                        />
                        {/* Update button to update the todo */}
                        <Button className="w-1/3" onClick={()=>updateTodo(todo.id)}>Update</Button>
                      </CardContent>
                      :
                      // Here display the todos of the user.
                      <CardContent className="flex justify-between items-center">
                        <CardHeader>
                          {/* The title of the todo */}
                          <CardTitle className={`text-xl font-bold ${todo.completed && "line-through"}`}>
                            {todo.title}
                          </CardTitle>
                          {/* The creator name of the todo */}
                          <CardDescription className={`text-base font-semibold`}>
                            By {todo.creator}
                          </CardDescription>
                        </CardHeader>
                        <div className="flex gap-4 p-6">
                          {/* Pencil icon that contains the editTodo function to let the user edit the todo he / she wants. */}
                        <Pencil onClick={()=>editTodo(todo.id)} className="cursor-pointer" size={18}/>
                          {/*  */}
                        <Trash2 onClick={()=> deleteTodo(todo.id)} className="cursor-pointer text-red-600" size={18}/>
                        <CheckCircle onClick={()=> completedTodo(todo.id)} className="cursor-pointer text-green-600" size={18}/>
                        </div>
                      </CardContent>
                    }
                </Card>
              </Reorder.Item>
            ))
          } 
        </Reorder.Group>
      </div>
    </div>
  );
}

export default Home;