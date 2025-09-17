// Interfaces
interface Usuario {
  id: number;
  nome: string;
  senha: string;
  role: "admin" | "user";
}

interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

// Dados em memória
const usuarios: Usuario[] = [
  { id: 1, nome: "adm", senha: "123", role: "admin" },
  { id: 2, nome: "joao", senha: "123", role: "user" }
];

let tarefas: Tarefa[] = [];
let usuarioLogado: Usuario | null = null;

// Função de login
function login(nome: string, senha: string): boolean {
  const usuario = usuarios.find(u => u.nome === nome && u.senha === senha);
  if (usuario) {
    usuarioLogado = usuario;
    return true;
  }
  return false;
}

// Renderizar tarefas
function listarTarefas(): void {
  const div = document.getElementById("tarefas") as HTMLDivElement;
  div.innerHTML = "";
  tarefas.forEach(t => {
    div.innerHTML += `<p>${t.id} - ${t.titulo} [${t.concluida ? "✔" : "✘"}]</p>`;
  });
}

// Adicionar tarefa
function adicionarTarefa(titulo: string): void {
  if (!usuarioLogado || usuarioLogado.role !== "admin") {
    alert("Somente admin pode adicionar tarefas!");
    return;
  }
  const nova: Tarefa = { id: tarefas.length + 1, titulo, concluida: false };
  tarefas.push(nova);
  listarTarefas();
}




// Event listeners
document.getElementById("loginBtn")?.addEventListener("click", () => {
  const nome = (document.getElementById("nome") as HTMLInputElement).value;
  const senha = (document.getElementById("senha") as HTMLInputElement).value;

  if (login(nome, senha)) {
    (document.getElementById("loginMsg") as HTMLParagraphElement).innerText =
      `Bem-vindo, ${usuarioLogado?.nome} (${usuarioLogado?.role})`;
    listarTarefas();
  } else {
    (document.getElementById("loginMsg") as HTMLParagraphElement).innerText =
      "Usuário ou senha incorretos!";
  }
});

document.getElementById("addTarefaBtn")?.addEventListener("click", () => {
  const titulo = (document.getElementById("novaTarefa") as HTMLInputElement).value;
  adicionarTarefa(titulo);
});
