import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, CheckCircle, Plus } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card"



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
  const [todoCreator, setTodoCreator] = useState("");

  const addNewTodo = () =>{

    // This condition for disabling the create button from submitting if the input fields are empty
    if(!todoTitle.trim() || !todoCreator.trim()) return;

    // This variable contains the new todo info like id, todo title, todo creator name, and checked as not completed or editable as this variable is for creating the todo
    const newTodo = {
      id:Date.now(),
      title:todoTitle,
      creator:todoCreator,
      completed:false,
      editable:false
    };

    // Updating the state of the todos with the new todo while keeping the old todos
    setTodos([newTodo, ...todos]);
    // After Clicking create button the todo title input and todo creator name become empty to tell the user that he / she can enter a new todo title and creator name
    setTodoTitle("");
    setTodoCreator("");
    // I'm checking here with this console.log if the button submits with the condition if(!todoTitle.trim() || !todoCreator.trim()) return; or not 
    console.log("test");
  };


    const editTodo = (id:number)=>{
      // Here we loop over the todos array and check if the todo.id needed to be edit todo is equal to the id of the todo the user wants to edit then the user can edit the todo. 
      setTodos(todos.map((todo)=> todo.id === id ? {...todo, editTodo:!todo.editable} : todo));
    };

    const deleteTodo = (id:number)=>{
      // Here we check if the todo.id has the same id of the todo the wants to delete, if yes then the todo is deleted.
      setTodos(todos.filter((todo)=> todo.id !== id));
    };
    
    const updateTodo = (id:number, newTodoTitle:string)=>{
      // Here we enable the update button to update the todo with a new title.
      setTodos(todos.map((todo)=> todo.id === id ? {...todo, newTodoTitle, editTodo:!todo.editable, completed:!todo.completed} : todo));
    };

    const completedTodo = (id:number) =>{
      // Here we check the id of the todo that 
      setTodos(todos.map((todo)=> todo.id === id ? {...todo, completed:!todo.completed} : todo));
    };


  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <div className="flex gap-4">
        <Input
          value={todoTitle}
          onChange={(e)=>{setTodoTitle(e.target.value)}}
          placeholder="Todo title"
        />
        <Input
          value={todoCreator}
          onChange={(e)=>{setTodoCreator(e.target.value)}}
          placeholder="Todo Creator"
        />
        <Button onClick={addNewTodo} variant="default">
          <Plus/>
          Create
        </Button>
      </div>
      <div>
        <Card className="flex items-center justify-between">
          <div className="flex gap-4 p-6">
            <Pencil className="cursor-pointer" size={20}/>
            <Trash2 className="cursor-pointer text-red-600" size={20}/>
            <CheckCircle className="cursor-pointer text-green-600" size={20}/>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Home;