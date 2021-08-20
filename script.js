const form = document.querySelector("#new-todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const template = document.querySelector("#list-item-template")
const toggleBtn = document.querySelector(".toggle-btn")
const filterBtn = document.querySelector(".filter-btn")
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST"
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`
let todos = loadTodos()
todos.forEach(renderTodo)

todoList.addEventListener("change", e => {
  if (!e.target.matches(`[data-list-item-checkbox]`)) return

  const parent = e.target.closest(".list-item")
  const todoId = parent.dataset.todoId
  const todo = todos.find(t => t.id === todoId)
  todo.complete = e.target.checked
  saveTodos()
})

todoList.addEventListener("click", e => {
  if (!e.target.matches(`[data-button-delete]`)) return

  const parent = e.target.closest(".list-item")
  const todoId = parent.dataset.todoId
  parent.remove()
  todos = todos.filter(todo => todo.id !== todoId)
  saveTodos()
})

form.addEventListener("submit", e => {
  e.preventDefault()

  const todoName = todoInput.value
  if (todoName === "") return
  const newTodo = {
    name: todoName,
    complete: false,
    id: new Date().valueOf().toString(),
  }
  todos.push(newTodo)
  renderTodo(newTodo)
  saveTodos()
  todoInput.value = ""
})

function renderTodo(todo) {
  const templateClone = template.content.cloneNode(true)
  const listItem = templateClone.querySelector(".list-item")
  listItem.dataset.todoId = todo.id
  const textElement = templateClone.querySelector("[data-list-item-text]")
  textElement.innerText = todo.name
  const checkbox = templateClone.querySelector("[data-list-item-checkbox]")
  checkbox.checked = todo.complete
  todoList.appendChild(templateClone)
}

function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}

function loadTodos() {
  const todosString = localStorage.getItem(TODOS_STORAGE_KEY)
  return JSON.parse(todosString) || []
}

function today() {
  const dateInput = document.querySelector(`#date-input`)
  let today = new Date()
  let date = today.getDate().toString().toString().padStart(2, 0)
  let month = (today.getMonth() + 1).toString().padStart(2, 0)
  let year = today.getFullYear().toString()

  today = `${year}-${month}-${date}`

  dateInput.value = today
  // return dateInput.value
}

today()

toggleBtn.addEventListener("click", () => {
  filterBtn.classList.add("open")
  filterBtn.classList.remove("open")
  filterBtn.children.classList.remove("open")
})
