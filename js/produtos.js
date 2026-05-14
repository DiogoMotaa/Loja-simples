async function carregarProdutos() {
  const resposta = await fetch("./BANCODEDADOS/Produtos.json");

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar Produtos.json");
  }

  return resposta.json();
}

function renderizarAcoes(produto) {
  if (!produto.acoes || 
    produto.acoes.length === 0 || 
    produto.acoes.some(acao => !acao.href || !acao.texto)) {
    return "<div class=\"cartao-produto__overlay\"></div>";
  }

  const botoes = produto.acoes
    .map((acao) => `<a href=\"${acao.href}\" class=\"botao botao--entrar\">${acao.texto}</a>`)
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
