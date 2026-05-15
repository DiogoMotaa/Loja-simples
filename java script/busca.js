const catalogoProdutos = [
    { nome: 'Headset Pro 7.1',       cat: 'Áudio',          emoji: '🎧', slug: 'headset-pro-71'      },
    { nome: 'Notebook Positivo',     cat: 'Notebooks',      emoji: '💻', slug: 'notebook-positivo'   },
    { nome: 'Smartphone Z15',        cat: 'Mobile',         emoji: '📱', slug: 'smartphone-z15'      },
    { nome: 'Monitor 4K 144Hz',      cat: 'Monitores',      emoji: '🖥️', slug: 'monitor-4k-144hz'    },
    { nome: 'Teclado RGB X',         cat: 'Periféricos',    emoji: '⌨️', slug: 'teclado-rgb-x'       },
    { nome: 'Mouse Gamer Pro',       cat: 'Periféricos',    emoji: '🖱️', slug: 'mouse-gamer-pro'     },
    { nome: 'Controle X-Pro',        cat: 'Games',          emoji: '🎮', slug: 'controle-x-pro'      },
    { nome: 'Cadeira Elite',         cat: 'Cadeiras',       emoji: '💺', slug: 'cadeira-elite'       },
    { nome: 'Gabinete Gamer',        cat: 'Computadores',   emoji: '🗄️', slug: 'gabinete-gamer'      },
    { nome: 'Webcam HD',             cat: 'Periféricos',    emoji: '📷', slug: 'webcam-hd'           },
    { nome: 'Arcade Mini',           cat: 'Games',          emoji: '🕹️', slug: 'arcade-mini'         },
    { nome: 'SSD 1TB',               cat: 'Armazenamento',  emoji: '💾', slug: 'ssd-1tb'             },
    { nome: 'Roteador AX',           cat: 'Internet',       emoji: '📡', slug: 'roteador-ax'         },
    { nome: 'PowerBank Pro',         cat: 'Energia',        emoji: '🔋', slug: 'powerbank-pro'       },
    { nome: 'Watch Gamer',           cat: 'Wearables',      emoji: '⌚', slug: 'watch-gamer'         },
    { nome: 'Notebook Titan i7',     cat: 'Computadores',   emoji: '💻', slug: 'notebook-titan-i7'   },
    { nome: 'Notebook Fury Z15',     cat: 'Computadores',   emoji: '🖥️', slug: 'notebook-fury-z15'   },
    { nome: 'Smartphone Z20',        cat: 'Mobile',         emoji: '📱', slug: 'smartphone-z20'      },
    { nome: 'Phone Lite',            cat: 'Mobile',         emoji: '📲', slug: 'phone-lite'          },
    { nome: 'Controle Pro X',        cat: 'Games',          emoji: '🎮', slug: 'controle-pro-x'      },
    { nome: 'Headset Storm 7.1',     cat: 'Games',          emoji: '🎧', slug: 'headset-storm-71'    },
    { nome: 'Mouse RGB Fury',        cat: 'Games',          emoji: '🖱️', slug: 'mouse-rgb-fury'      },
    { nome: 'Cadeira Gamer Pro',     cat: 'Games',          emoji: '🪑', slug: 'cadeira-gamer-pro'   },
    { nome: 'Teclado Mecânico X',    cat: 'Games',          emoji: '⌨️', slug: 'teclado-mecanico-x'  },
];

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
            || produto.cat.toLowerCase().includes(termo);
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
            '<span class="busca__item-icone">' + produto.emoji + '</span>' +
            '<div class="busca__item-info">' +
                '<span class="busca__item-nome">' + produto.nome + '</span>' +
                '<span class="busca__item-cat">'  + produto.cat  + '</span>' +
            '</div>';
        item.addEventListener('click', function () {
            window.location.href = 'especificacoes.html?produto=' + produto.slug;
        });
        listaSugests.appendChild(item);
    });
    listaSugests.classList.add('visivel');
}

function fecharSugestoes() {
    listaSugests.innerHTML = '';
    listaSugests.classList.remove('visivel');
}