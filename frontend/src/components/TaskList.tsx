"use client"

import { Pencil, X, CheckCircle, Circle } from "lucide-react"

interface Task {
  id: number
  title: string
  completed: boolean
  created_at: string
}

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
  onToggleComplete: (id: number, completed: boolean) => void
}

export default function TaskList({ tasks, onEdit, onDelete, onToggleComplete }: TaskListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getDate()} Mar ${date.getFullYear()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`
  }

  if (tasks.length === 0) {
    return <div className="text-gray-500 text-center py-2">No tasks found</div>
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between p-3 bg-gray-200 rounded-md">
          <div>
            <div className="flex items-center">
              <span className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </span>
              <Pencil size={16} className="ml-2 text-gray-600 cursor-pointer" onClick={() => onEdit(task)} />
            </div>
            <div className="text-xs text-gray-500">{formatDate(task.created_at)}</div>
          </div>

          <div className="flex space-x-2">
            <button 
              onClick={() => onDelete(task.id)} 
              className="text-gray-600 hover:text-red-600"
            >
              <X size={20} className="border border-current rounded-full p-1" />
            </button>

            <button
              onClick={() => onToggleComplete(task.id, !task.completed)}
              className="text-gray-600 hover:text-green-600"
            >
              {task.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
