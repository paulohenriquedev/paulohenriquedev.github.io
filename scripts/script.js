// --- Carrinho e interações ---
document.addEventListener('DOMContentLoaded', () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    function salvarCarrinho() {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    function atualizarCarrinhoHTML() {
        const container = document.querySelector('.carrinho');
        if (!container) return;

        container.innerHTML = '';
        let total = 0;

        carrinho.forEach((item, index) => {
            total += item.preco;
            const div = document.createElement('div');
            div.className = 'item-carrinho';
            div.innerHTML = `
                <span>${item.nome}</span>
                <span>R$ ${item.preco.toFixed(2)}</span>
                <button data-index="${index}">Remover</button>
            `;
            container.appendChild(div);
        });

        const totalDiv = document.createElement('div');
        totalDiv.className = 'total';
        totalDiv.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
        container.appendChild(totalDiv);

        const finalizarBtn = document.createElement('button');
        finalizarBtn.className = 'finalizar';
        finalizarBtn.textContent = 'Finalizar Pedido';
        container.appendChild(finalizarBtn);

        document.querySelectorAll('.item-carrinho button').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = btn.getAttribute('data-index');
                carrinho.splice(index, 1);
                salvarCarrinho();
                atualizarCarrinhoHTML();
            });
        });
    }

    if (document.querySelector('.adicionar-carrinho')) {
        document.querySelectorAll('.adicionar-carrinho').forEach(btn => {
            btn.addEventListener('click', () => {
                const nome = btn.getAttribute('data-nome');
                const preco = parseFloat(btn.getAttribute('data-preco'));
                carrinho.push({ nome, preco });
                salvarCarrinho();
                alert(`${nome} adicionada ao carrinho!`);
            });
        });
    }

    atualizarCarrinhoHTML();

    // Simulação de login
    if (document.getElementById('form-login')) {
        document.getElementById('form-login').addEventListener('submit', e => {
            e.preventDefault();
            const usuario = document.getElementById('usuario').value;
            const senha = document.getElementById('senha').value;
            if (usuario && senha) {
                alert(`Bem-vindo, ${usuario}!`);
                localStorage.setItem('usuario', usuario);
            } else {
                alert('Preencha todos os campos.');
            }
        });
    }

    // Validação do formulário de cadastro
    const formCadastro = document.getElementById('form-cadastro');

    if (formCadastro) {
        formCadastro.addEventListener('submit', function (e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const rua = document.getElementById('rua').value.trim();
            const numero = document.getElementById('numero').value.trim();
            const bairro = document.getElementById('bairro').value.trim();
            const cidade = document.getElementById('cidade').value.trim();
            const login = document.getElementById('login').value.trim();
            const senha = document.getElementById('senha').value;

            // Validações 
            if (!nome || !rua || !numero || !bairro || !cidade || !login || !senha) {
                alert("Por favor, preencha todos os campos corretamente.");
                return;
            }

            if (senha.length < 6) {
                alert("A senha deve ter pelo menos 6 caracteres.");
                return;
            }

            if (isNaN(numero)) {
                alert("Número da casa deve conter apenas dígitos.");
                return;
            }

            // Mensagem Cadastro simulado
            alert("Cadastro realizado com sucesso!");
            formCadastro.reset();
        });
    }
});
