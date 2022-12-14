import dayjs from "./day-js"
import type {
    Task,
    TaskType
} from "./types"

export const TASKS: Readonly<{
    [key in TaskType]: string
}> = Object.freeze({
    "eating": "π",
    "working": "βοΈ",
    "break": "βΈοΈ",
    "symptom": "π©Ί",
    "default": "ποΈ",
    "todo": "β",
    "dancing": "π",
    "reading": "π",
    "night-out": "π",
    "cooking": "π³",
    "cleaning": "π§Ή",
    "relaxing": "ποΈ",
    "programming": "π»"
})

export function generateNewTask(
    date: dayjs.Dayjs = dayjs(),
    title: string = "",
    type: TaskType = "default",
    description: string = ""): Task {
    return {
        date,
        title,
        description,
        type,
        timestamp: new Date()
    }
}