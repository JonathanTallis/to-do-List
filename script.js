const inputElement = document.querySelector("#app input");
const buttonElement = document.querySelector("#app button");
const listElement = document.querySelector("#app ul");
let tarefas = JSON.parse(localStorage.getItem("@listatarefas")) || [];

function adicionarTarefas() {
  const tarefa = inputElement.value.trim();

  if (tarefa === "") {
    alert("Digite sua tarefa!");
    return;
  }

  tarefas.push(tarefa);
  inputElement.value = "";
  listarTarefas();
  salvarDados();
}

function listarTarefas() {
  listElement.innerHTML = "";

  tarefas.map((to_do) => {
    const liElement = document.createElement("li");
    const tarefaText = document.createTextNode(to_do);

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", "#");
    const linkText = document.createTextNode("🗑️");
    linkElement.appendChild(linkText);

    const posicao = tarefas.indexOf(to_do);
    linkElement.setAttribute("onclick", `deletarTarefa(${posicao})`);

    liElement.appendChild(tarefaText);
    liElement.appendChild(linkElement);
    listElement.appendChild(liElement);
  });
}

function deletarTarefa(index) {
  tarefas.splice(index, 1);
  listarTarefas();
  salvarDados();
}

function salvarDados() {
  localStorage.setItem("@listatarefas", JSON.stringify(tarefas));
}

inputElement.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    adicionarTarefas();
  }
});

buttonElement.onclick = adicionarTarefas;
listarTarefas();
