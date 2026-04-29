mostrarPacientes();
 
function pegarPacientes() {
  let pacientes = localStorage.getItem("pacientes");
  return pacientes ? JSON.parse(pacientes) : [];
}
 
function salvarNoLocalStorage(lista) {
  localStorage.setItem("pacientes", JSON.stringify(lista));
}
 
function prioridadeValor(prioridade) {
  if (prioridade === "vermelho") return 1;
  if (prioridade === "amarelo") return 2;
  return 3;
}
 
function salvarPaciente() {
  let nome = document.getElementById("nome").value;
  let idade = document.getElementById("idade").value;
  let sintoma = document.getElementById("sintoma").value;
  let prioridade = document.getElementById("prioridade").value;
 
  if (!nome || !idade || !sintoma || !prioridade) {
    alert("Preencha todos os campos!");
    return;
  }
 
  let pacientes = pegarPacientes();
 
  let paciente = {
    nome,
    idade,
    sintoma,
    prioridade
  };
 
  pacientes.push(paciente);
 
  pacientes.sort((a, b) => prioridadeValor(a.prioridade) - prioridadeValor(b.prioridade));
 
  salvarNoLocalStorage(pacientes);
  limparCampos();
  mostrarPacientes();
}
 
function mostrarPacientes() {
  let lista = document.getElementById("listaPacientes");
  let pacientes = pegarPacientes();
 
  lista.innerHTML = "";
 
  if (pacientes.length === 0) {
    lista.innerHTML = "<p>Nenhum paciente na fila</p>";
    return;
  }
 
  pacientes.forEach((p, i) => {
    lista.innerHTML += `
      <div class="${p.prioridade}">
        <p><strong>Nome:</strong> ${p.nome}</p>
        <p><strong>Idade:</strong> ${p.idade}</p>
        <p><strong>Sintoma:</strong> ${p.sintoma}</p>
        <p><strong>Classificação:</strong> ${p.prioridade}</p>
 
        <button onclick="removerPaciente(${i})">Remover</button>
      </div>
    `;
  });
}
 
function chamarProximo() {
  let pacientes = pegarPacientes();
 
  if (pacientes.length === 0) {
    alert("Fila vazia!");
    return;
  }
 
  let paciente = pacientes.shift();
 
  alert(`Chamando: ${paciente.nome}`);
 
  salvarNoLocalStorage(pacientes);
  mostrarPacientes();
}
 
function removerPaciente(index) {
  let pacientes = pegarPacientes();
  pacientes.splice(index, 1);
 
  salvarNoLocalStorage(pacientes);
  mostrarPacientes();
}
 
function limparFila() {
  localStorage.removeItem("pacientes");
  mostrarPacientes();
}
 
function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("sintoma").value = "";
  document.getElementById("prioridade").value = "";
}
 