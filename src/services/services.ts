import { Task } from "./interfaces"

export const randomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export const compareColors = (data: Task[] | undefined, inputValue: string) => {
  const res = data?.find(element => element.subjectTitle === inputValue)
  return res ? res.color : randomColor()
}

export const filterBySubject = (item: string, data: Task[] | undefined) => {
  return data?.filter(task => task.subjectTitle.toLowerCase() === item.toLowerCase())
}  
