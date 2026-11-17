import { getTasks, createTask, updateTask, deleteTask } from "./tasks-api";

// Recupera as missões salvas no navegador ou inicia uma lista vazia.
let todos = [];

//
async function loadTasks() {
    buttonAddTask.hidden = true
  getTasks().then((data) => {
    console.table(data);
    todos = data;
    renderAll();
  })
  .finally(() => {
    buttonAddTask.hidden = false
  })
}

// Seleciona os elementos da interface usados pela lista de missões.
const form = document.querySelector(".task-form");
const formLabel = document.querySelector(".task-form__label");
const todoTextarea = document.querySelector("#task-input");
const todosList = document.querySelector(".task-list");
const taskBoard = document.querySelector(".task-board");

// Seleciona os controles gerais da lista e do formulário.
const menu = document.querySelector(".task-menu");
const buttonAddTask = document.querySelector(".add-task-button");
const buttonDeleteTask = document.querySelector("#btn-delete");

// Guarda a missão que está sendo editada, quando houver uma.
let editingTodo = null;

// Exibe ou oculta o formulário e o botão de adicionar missão.
function toggleForm() {
  form.hidden = !form.hidden;
  buttonAddTask.hidden = !buttonAddTask.hidden;
}

// Limpa os campos e retorna o formulário ao estado de criação.
function resetFormState() {
  form.reset();
  formLabel.textContent = "Adicionando tarefa";
  editingTodo = null;
  buttonDeleteTask.hidden = true;
}

// Cancela a criação ou edição atual.
function cancelTodo() {
  toggleForm();
  resetFormState();
}

// Exclui a missão em edição e atualiza a lista exibida.
async function deleteTodo() {
  if (!editingTodo) return;

  await deleteTask(editingTodo.id);
  await loadTasks();
  resetFormState();
  toggleForm();
}

// Remove somente as missões marcadas como concluídas.
async function clearCompletedTodos() {
  menu.open = false;
  await Promise.all(
    todos
      .filter((t) => t.completed)
      .map((t) => {
        return deleteTask(t.id);
      }),
  );
  loadTasks();
}

// Remove todas as missões e limpa a lista na tela.
async function clearAllTodos() {
  menu.open = false;
  await Promise.all(
    todos.map((t) => {
      return deleteTask(t.id);
    }),
  );
  loadTasks();
}

// Cria uma missão nova ou salva as alterações de uma missão existente.
async function saveTodo(event) {
  event.preventDefault();

  // Lê o texto preenchido no formulário.
  const formData = new FormData(form);
  const description = formData.get("task");

  // Atualiza a missão editada ou adiciona uma nova missão à lista.
  if (editingTodo) {
    editingTodo.description = formData.get("task");
    await updateTask(editingTodo.id, editingTodo);
    loadTasks();
    toggleForm();
    resetFormState();
  } else {
    await createTask(description);
    loadTasks();
    toggleForm();
    resetFormState();
  }
}

// Localiza a missão relacionada ao botão que foi acionado.
function findTodo(actionElement) {
  return todos.find((todo) => String(todo.id) === actionElement.dataset.todoId);
}

// Alterna o status de conclusão da missão selecionada.
async function toggleTodo(event, actionElement) {
  const todo = findTodo(actionElement);

  if (!todo) return;

  todo.completed = !todo.completed;
  await updateTask(todo.id, todo);
  loadTasks();
}

// Abre o formulário preenchido com os dados da missão selecionada.
function editTodo(event, actionElement) {
  const todo = findTodo(actionElement);

  if (!todo) return;

  if (form.hidden) {
    toggleForm();
  }
  buttonDeleteTask.hidden = false;
  formLabel.textContent = "Editando tarefa";
  todoTextarea.value = todo.description;
  editingTodo = todo;
}

// Mapeia cada valor de data-action para sua função correspondente.
const actions = {
  "toggle-form": toggleForm,
  "cancel-todo": cancelTodo,
  "delete-todo": deleteTodo,
  "clear-completed": clearCompletedTodos,
  "clear-all": clearAllTodos,
  "save-todo": saveTodo,
  "toggle-todo": toggleTodo,
  "edit-todo": editTodo,
};

// Descobre a ação do elemento clicado e executa o handler registrado.
function dispatchAction(event) {
  const actionElement = event.target.closest("[data-action]");

  // Ignora eventos fora do quadro ou cliques comuns dentro do formulário.
  if (!actionElement || !taskBoard.contains(actionElement)) return;
  if (event.type === "click" && actionElement === form) return;

  // Busca a função pela chave data-action e executa somente se ela existir.
  const action = actionElement.dataset.action;
  const handler = actions[action];

  if (handler) {
    handler(event, actionElement);
  }
}

// Usa delegação para tratar todos os cliques e submits com o mesmo dispatcher.
taskBoard.addEventListener("click", dispatchAction);
taskBoard.addEventListener("submit", dispatchAction);

// Monta o elemento visual de uma missão individual.
function renderTodoListItem(todo) {
  // Cria o item e aplica a classe de missão concluída quando necessário.
  const listItem = document.createElement("li");

  listItem.classList.add("task-list__item");

  if (todo.completed) {
    listItem.classList.add("task-list__item--complete");
  }

  // Cria o botão que alterna o status da missão.
  const statusButton = document.createElement("button");
  statusButton.type = "button";

  statusButton.classList.add("task-list__status");
  statusButton.dataset.action = "toggle-todo";
  statusButton.dataset.todoId = todo.id;

  statusButton.setAttribute("aria-pressed", todo.completed);

  if (todo.completed) {
    statusButton.setAttribute("aria-label", "Marcar tarefa como concluída");
  } else {
    statusButton.setAttribute("aria-label", "Marcar tarefa como pendente");
  }

  // Define o ícone visual de acordo com o status atual.
  const statusIcon = document.createElement("img");
  statusIcon.src = todo.completed
    ? "/icons/check_circle.svg"
    : "/icons/check_circle_pending.svg";

  // Cria o texto descritivo da missão.
  const paragraph = document.createElement("p");
  paragraph.classList.add("task-list__description");
  paragraph.textContent = todo.description;

  // Cria o botão de edição e associa a missão ao dispatch table.
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.classList.add("task-list__edit");
  editButton.dataset.action = "edit-todo";
  editButton.dataset.todoId = todo.id;
  editButton.setAttribute("aria-label", "Editar tarefa");

  // Adiciona o ícone visual ao botão de edição.
  const editIcon = document.createElement("span");
  editIcon.classList.add("icon", "icon--edit", "icon--lg");
  editIcon.setAttribute("aria-hidden", "true");
  editButton.appendChild(editIcon);

  // Organiza os elementos dentro do item da lista.
  statusButton.appendChild(statusIcon);
  listItem.appendChild(statusButton);
  listItem.appendChild(paragraph);
  listItem.appendChild(editButton);

  return listItem;
}

// Salva as missões, limpa a lista atual e renderiza todos os itens novamente.
function renderAll() {
  todosList.innerHTML = "";

  // Cria e adiciona cada missão ao elemento <ul>.
  todos.forEach((todo) => {
    const element = renderTodoListItem(todo);
    todosList.appendChild(element);
  });
}

loadTasks()