import { create } from "zustand";
import { devtools,persist } from "zustand/middleware";


  export type todoType={
    id : number; 
    todo : string ;
    isDone : boolean
  }

  type state={
    todos : Array<todoType> | [] 
  }

 type action={
     addTodo :(todo:todoType)=> void;
     toggleTodo:(id:number ,isChecked :boolean)=> void
     deleteTodo:(id:number )=> void
 }

 export const useTodos=create<action  & state>()(
 
  devtools(
    persist((set)=>({
      
        todos : [],
        addTodo :(todo : todoType)=> set((state)=> ({todos : [...state.todos , todo]}) ),
        toggleTodo :(id:number ,isChecked :boolean)=> set((state)=> ({
                
            todos: state.todos.map((item)=>{
                 if (item.id === id) {
                     item.isDone=isChecked 
                 }

                 return item
            })

        })) ,

        deleteTodo : (id:number)=> set((state)=> ({
                    
          todos: state.todos.filter((del)=>del.id !== id)
        }))
  

    })
    ,{name : "todoStore"}
    )
  )

 );
    
    



