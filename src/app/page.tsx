"use client";

import { useState } from "react";
import { todoType, useTodos } from "./store/todos";






export default function Home(){
    const  [todo,setTodo]=useState("");
    // const  [isDone,setIsDone]=useState<boolean>(false);

const  addTodos =useTodos(state=> state.addTodo) ;
const  todos =useTodos(state=> state.todos) ;
const  toggleTodos =useTodos(state=> state.toggleTodo);
const  deleteTodos =useTodos(state=> state.deleteTodo);

   const addTodosHandler=()=>{
    if(todo.length > 0 ){

    addTodos({
          todo :todo,
          id : randomId() ,
          isDone :false
        })                          
        setTodo("")
    }
   }

   const randomId=():number=>{
        const min =1000;
        const max=9999;
        
        return Math.round(Math.random() * (max-min) + 1)
   }

return(
    <>
    
        <div className="flex items-center justify-center">
            <div className="w-1/2 bg-slate-600 p-4 m-5">
               <h1 className="font-bold">Todos :</h1>
               <h3>Add Your task</h3>

               <input type="text" className="text-black p-1 " value={todo} onChange={(e)=>{
                     setTodo(e.target.value)
               }}/><br />
               <button className="bg-green-600 my-2 p-1 rounded-lg" onClick={addTodosHandler}>ADD TODO</button>
                    {
                       todos.map((item)=>(
                            
                           <div className="border-2 items-center justify-between p-1 bg-white text-black flex gap-2 mt-2 " key={item.todo + item.id}>
                            <div className="flex gap-2">
                            <input type="checkbox" onChange={(e)=>{
                                   toggleTodos(item.id , e.target.checked)}} />
                              <h1 className={item.isDone ? "line-through" : ""}>{item.todo}</h1>
                            </div>
                            
                             <img className="h-6 hover:scale-105" src="https://thumbs.dreamstime.com/b/computer-generated-illustration-recycle-bin-icon-isolated-white-background-suitable-logo-delete-icon-button-175612353.jpg" alt=""  onClick={()=>{
                                 deleteTodos(item.id)
                             }} />
                                

                            </div>    
                           
                       ))
                    }   
            </div>

        </div>
           
           

    </>
)
    
}