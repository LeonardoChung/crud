document.addEventListener('DOMContentLoaded', (event) => {
    let data = [];
    let selectedRow = null;

    function criar() {
        document.getElementById('create-container').style.display = 'block';
    }

    function criarItem() {
        const nomeProduto = document.getElementById('nome-produto').value;
        const quantidade = document.getElementById('quantidade').value;
        const valor = document.getElementById('valor').value;

        if (selectedRow === null) {
            data.push({
                nomeProduto,
                quantidade,
                valor
            });
        } else {
            data[selectedRow] = {
                nomeProduto,
                quantidade,
                valor
            };
            selectedRow = null;
        }

        document.getElementById('nome-produto').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('valor').value = '';

        read();
        document.getElementById('create-container').style.display = 'none';
    }

    function read() {
        const table = document.querySelector('.table table tbody');
        table.innerHTML = '';

        data.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${row.nomeProduto}</td>
            <td>${row.quantidade}</td>
            <td>${row.valor}</td>
            <td class="operations">
                <span class="operations-text">Operações</span>
                <button class="update-button">Atualizar</button>
                <button class="delete-button">Excluir</button>
            </td>
            `;
            table.appendChild(tr);

            tr.querySelector('.update-button').addEventListener('click', function () {
                update(index);
            });

            tr.querySelector('.delete-button').addEventListener('click', function () {
                del(index);
            });
        });
    }

    function update(index) {
        const row = data[index];
        document.getElementById('nome-produto').value = row.nomeProduto;
        document.getElementById('quantidade').value = row.quantidade;
        document.getElementById('valor').value = row.valor;

        selectedRow = index;
        document.getElementById('create-container').style.display = 'block';
    }

    function del(index) {
        data.splice(index, 1);
        read();
    }

    document.getElementById('criar').addEventListener('click', criar);
    document.getElementById('gravar').addEventListener('click', criarItem);

    read();
});