var _a, _b;
// Dados em memória
var usuarios = [
    { id: 1, nome: "adm", senha: "123", role: "admin" },
    { id: 2, nome: "joao", senha: "123", role: "user" }
];
var tarefas = [];
var usuarioLogado = null;
// Função de login
function login(nome, senha) {
    var usuario = usuarios.find(function (u) { return u.nome === nome && u.senha === senha; });
    if (usuario) {
        usuarioLogado = usuario;
        return true;
    }
    return false;
}
// Renderizar tarefas
function listarTarefas() {
    var div = document.getElementById("tarefas");
    div.innerHTML = "";
    tarefas.forEach(function (t) {
        div.innerHTML += "<p>".concat(t.id, " - ").concat(t.titulo, " [").concat(t.concluida ? "✔" : "✘", "]</p>");
    });
}
// Adicionar tarefa
function adicionarTarefa(titulo) {
    if (!usuarioLogado || usuarioLogado.role !== "admin") {
        alert("Somente admin pode adicionar tarefas!");
        return;
    }
    var nova = { id: tarefas.length + 1, titulo: titulo, concluida: false };
    tarefas.push(nova);
    listarTarefas();
}
// Event listeners
(_a = document.getElementById("loginBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var nome = document.getElementById("nome").value;
    var senha = document.getElementById("senha").value;
    if (login(nome, senha)) {
        document.getElementById("loginMsg").innerText =
            "Bem-vindo, ".concat(usuarioLogado === null || usuarioLogado === void 0 ? void 0 : usuarioLogado.nome, " (").concat(usuarioLogado === null || usuarioLogado === void 0 ? void 0 : usuarioLogado.role, ")");
        listarTarefas();
    }
    else {
        document.getElementById("loginMsg").innerText =
            "Usuário ou senha incorretos!";
    }
});
(_b = document.getElementById("addTarefaBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    var titulo = document.getElementById("novaTarefa").value;
    adicionarTarefa(titulo);
});
