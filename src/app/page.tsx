   


    "use client";

import { useState } from "react";
import { useTodos } from "./store/todos";
import Image from 'next/image';

export default function Home() {
    const [todo, setTodo] = useState("");
    const addTodos = useTodos(state => state.addTodo);
    const todos = useTodos(state => state.todos);
    const toggleTodos = useTodos(state => state.toggleTodo);
    const deleteTodos = useTodos(state => state.deleteTodo);

    const addTodosHandler = () => {
        if (todo.length > 0) {
            addTodos({
                todo: todo,
                id: randomId(),
                isDone: false
            });
            setTodo("");
        }
    };

    const randomId = (): number => {
        const min = 1000;
        const max = 9999;
        return Math.round(Math.random() * (max - min + 1) + min);
    };

    return (
        <>
            <div className="flex items-center justify-center px-4 md:px-0">
                <div className="w-full md:w-3/4 lg:w-1/2 bg-slate-600 p-4 m-5 rounded-lg">
                    <h1 className="font-bold text-xl lg:text-2xl text-center">Todos</h1>
                    <h3 className="text-sm lg:text-base text-center mb-4">Add Your Task</h3>

                    <input
                        type="text"
                        className="w-full text-black p-2 rounded-md mb-2"
                        placeholder="Enter a new task..."
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                    <button
                        className="w-full bg-green-600 my-2 p-2 rounded-lg text-white hover:bg-green-700"
                        onClick={addTodosHandler}
                    >
                        ADD TODO
                    </button>

                    {todos.map((item) => (
                        <div
                            className="border-2 items-center justify-between p-2 bg-white text-black flex flex-col md:flex-row gap-2 mt-2 rounded-lg"
                            key={item.id}
                        >
                            <div className="flex items-center justify-between gap-2">
                                <input
                                    type="checkbox"
                                    checked={item.isDone}
                                    onChange={(e) => toggleTodos(item.id, e.target.checked)}
                                />
                                <h1 className={`text-sm md:text-base ${item.isDone ? "line-through" : ""}`}>
                                    {item.todo}
                                </h1>
                            </div>
                            <Image
                                onClick={() => deleteTodos(item.id)}
                                src="/del-icon.webp"
                                width={30}
                                height={50}
                                alt="Delete Todo"
                                className="cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
