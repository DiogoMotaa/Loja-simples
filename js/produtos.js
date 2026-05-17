async function carregarProdutos() {
  let resposta = await fetch("./BANCODEDADOS/Produtos.json");

  if (!resposta.ok) {
    resposta = await fetch("../BANCODEDADOS/Produtos.json");
  }

  if (!resposta.ok) {
    throw new Error(`Não foi possível carregar Produtos.json. Status HTTP: ${resposta.status}`);
  }

  const objeto = await resposta.json();
  // Converter objeto {chave: {...}} em array [{...}, {...}]

  return Object.values(objeto);
}

function renderizarAcoes(produto) {
  if (!produto.acoes || produto.acoes.length === 0) {
    return "<div class=\"cartao-produto__overlay\"></div>";
  }

  // remover ações sem texto; manter ações com href vazio (serão mostradas desabilitadas)
  const acoesValidas = produto.acoes.filter(acao => acao && acao.texto && acao.texto.trim() !== "");
  if (acoesValidas.length === 0) {
    return "<div class=\"cartao-produto__overlay\"></div>";
  }

  const botoes = acoesValidas
    .map((acao) => {
      if (acao.href && acao.href.trim() !== "") {
        return `<button class="overlay__btn botao--entrar" onclick="window.location.href='${acao.href}'">${acao.texto}</button>`;
      }

      // href vazio -> botão desabilitado
      return `<button class="overlay__btn botao--entrar" disabled aria-disabled="true">${acao.texto}</button>`;
    })
    .join("");

  return `
    <div class="cartao-produto__overlay">
      <div class="grade-botao">
        ${botoes}
      </div>
    </div>
  `;
}

function renderizarProduto(produto) {
  return `
    <article class="cartao-produto">
      <span class="etiqueta etiqueta--destaque etiqueta--absoluta">${produto.destaque}</span>
      <div class="cartao-produto__midia">
        <div class="cartao-produto__sobreposicao"></div>
        <span class="cartao-produto__icone">${produto.icone}</span>
      </div>
      <div class="cartao-produto__corpo">
        ${renderizarAcoes(produto)}
        <div class="cartao-produto__categoria">${produto.categoria}</div>
        <div class="cartao-produto__nome">${produto.nome}</div>
        <div class="cartao-produto__rodape">
          <span class="cartao-produto__preco">${produto.preco}</span>
          <span class="cartao-produto__preco cartao-produto__preco--antigo">${produto.precoAntigo}</span>
        </div>
        <span class="etiqueta etiqueta--perigo">${produto.desconto}</span>
      </div>
    </article>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("listaProdutos");

  if (!container) {
    return;
  }

  try {
    const produtos = await carregarProdutos();
    container.innerHTML = produtos.map(renderizarProduto).join("");
  } catch (erro) {
    console.error(erro);
    container.innerHTML = "<p>Erro ao carregar os produtos.</p>";
  }
});
