"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface Task {
  id: number
  title: string
  completed: boolean
  created_at: string
}

interface TaskFormProps {
  editingTask: Task | null
  onSubmit: (title: string) => void
  onCancel: () => void
}

export default function TaskForm({ editingTask, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState("")

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
    } else {
      setTitle("")
    }
  }, [editingTask])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onSubmit(title.trim())
      setTitle("")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="flex justify-center space-x-2">
        {editingTask ? (
          <>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Update Task
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Task
          </button>
        )}
      </div>
    </form>
  )
}
