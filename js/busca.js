let catalogoProdutos = [];  // Variável global para armazenar dados

async function carregarCatalogoProdutos() {
    try {
        const resposta = await fetch('./BANCODEDADOS/produtos.json');
        
        if (!resposta.ok) {
            throw new Error('Erro ao carregar JSON: ' + resposta.status);
        }
        
        const objeto = await resposta.json();
        
        catalogoProdutos = Object.values(objeto).map(produto => ({
                nome: produto.nome,
                categoria: produto.categoria,
                icone: produto.icone,
                slug: Object.keys(objeto).find(key => (objeto[key] === produto))
            }));

        console.log("✓ Catálogo carregado com sucesso:", catalogoProdutos.length, "produtos");
    } catch (erro) {
        console.error("❌ Erro ao carregar catálogo:", erro);
    }
}

document.addEventListener("DOMContentLoaded", carregarCatalogoProdutos);

const btnLupa      = document.getElementById('btnLupa');
const inputBusca   = document.getElementById('inputBusca');
const listaSugests = document.getElementById('listaSugestoes');

btnLupa.addEventListener('click', function () {
    inputBusca.classList.toggle('ativo');
    if (inputBusca.classList.contains('ativo')) {
        inputBusca.focus();
    } else {
        inputBusca.value = '';
        fecharSugestoes();
    }
});

inputBusca.addEventListener('input', function () {
    const termo = this.value.trim().toLowerCase();
    if (termo.length === 0) {
        fecharSugestoes();
        return;
    }
    const resultados = catalogoProdutos.filter(function (produto) {
        return produto.nome.toLowerCase().includes(termo)
            || produto.categoria.toLowerCase().includes(termo);
    });
    renderizarSugestoes(resultados);
});

document.addEventListener('click', function (evento) {
    const wrapper = document.querySelector('.busca__wrapper');
    if (!wrapper.contains(evento.target)) {
        fecharSugestoes();
    }
});

function renderizarSugestoes(resultados) {
    listaSugests.innerHTML = '';
    if (resultados.length === 0) {
        listaSugests.innerHTML = '<p class="busca__vazio">Nenhum produto encontrado.</p>';
        listaSugests.classList.add('visivel');
        return;
    }
    const limite = resultados.slice(0, 6);
    limite.forEach(function (produto) {
        const item = document.createElement('div');
        item.classList.add('busca__item');
        item.innerHTML =
            '<span class="busca__item-icone">' + produto.icone + '</span>' +
            '<div class="busca__item-info">' +
                '<span class="busca__item-nome">' + produto.nome + '</span>' +
                '<span class="busca__item-cat">'  + produto.categoria  + '</span>' +
            '</div>';
        item.addEventListener('click', function () {
            window.location.href = '/produto/especificacoes.html?produto=' + produto.slug;
        });
        listaSugests.appendChild(item);
    });
    listaSugests.classList.add('visivel');
}

function fecharSugestoes() {
    listaSugests.innerHTML = '';
    listaSugests.classList.remove('visivel');
}