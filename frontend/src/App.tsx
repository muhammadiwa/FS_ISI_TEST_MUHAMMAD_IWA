"use client"

import { useState, useEffect } from "react"
import TaskForm from "./components/TaskForm.tsx"
import TaskList from "./components/TaskList.tsx"

// Get API URL from environment variable or use default
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";


interface Task {
  id: number
  title: string
  completed: boolean
  created_at: string
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(`Error fetching tasks: ${err instanceof Error ? err.message : String(err)}`);
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const addTask = async (title: string) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      })

      if (!response.ok) {
        throw new Error("Failed to add task")
      }

      fetchTasks()
    } catch (err) {
      setError("Error adding task. Please try again.")
      console.error(err)
    }
  }

  const updateTask = async (id: number, updates: Partial<Task>) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error("Failed to update task")
      }

      fetchTasks()
      setEditingTask(null)
    } catch (err) {
      setError("Error updating task. Please try again.")
      console.error(err)
    }
  }

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete task")
      }

      fetchTasks()
    } catch (err) {
      setError("Error deleting task. Please try again.")
      console.error(err)
    }
  }

  const toggleTaskCompletion = async (id: number, completed: boolean) => {
    await updateTask(id, { completed })
  }

  const startEditing = (task: Task) => {
    setEditingTask(task)
  }

  const cancelEditing = () => {
    setEditingTask(null)
  }

  const ongoingTasks = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

  const completedTasks = tasks
    .filter((task) => task.completed)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Task Management</h1>

          <TaskForm
            editingTask={editingTask}
            onSubmit={editingTask ? (title) => updateTask(editingTask.id, { title }) : addTask}
            onCancel={cancelEditing}
          />

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">{error}</div>}

          {isLoading ? (
            <div className="text-center py-4">Loading tasks...</div>
          ) : (
            <>
              <h2 className="font-semibold mt-6 mb-2">Ongoing Task</h2>
              <TaskList
                tasks={ongoingTasks}
                onEdit={startEditing}
                onDelete={deleteTask}
                onToggleComplete={toggleTaskCompletion}
              />

              <h2 className="font-semibold mt-6 mb-2">Completed Task</h2>
              <TaskList
                tasks={completedTasks}
                onEdit={startEditing}
                onDelete={deleteTask}
                onToggleComplete={toggleTaskCompletion}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
