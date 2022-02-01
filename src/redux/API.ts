import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Task, createTask } from '../services/interfaces'

export const todosApi = createApi({
  reducerPath: 'todosApi',
  tagTypes: ['Task'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004' }),
  endpoints: (build) => ({
    fetchAllTasks: build.query<Task[], string>({
      query: () => ({
        url: '/tasks'
      }),
      providesTags: ['Task'],
    }),
    createNewTask: build.mutation<Task, createTask>({
      query: (body) => ({
        url: `/tasks`,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body 
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: build.mutation<Task, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Task']
    }),
    updateTask: build.mutation<Task, Task>({
      query: (body) => ({
        url: `/tasks/${body.id}`,
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: body
      }),
      invalidatesTags: ['Task']
    }),
  })
})

export const { useFetchAllTasksQuery, useCreateNewTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = todosApi