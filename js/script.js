const form = document.getElementById('form');
const results = document.getElementById('results');
const searchInput = document.getElementById('search');
const deleteInput = document.getElementById('delete');
const btnSearch = document.getElementById('btnSearch');
const btnDelete = document.getElementById('btnDelete');

// Salvar cadastro
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const person = { name, dob, phone, email };

    const existingData = JSON.parse(localStorage.getItem('cadastros')) || [];
    existingData.push(person);
    localStorage.setItem('cadastros', JSON.stringify(existingData));

    alert('Cadastro realizado com sucesso!');
    form.reset();
});

// Buscar cadastro
btnSearch.addEventListener('click', () => {
    const searchName = searchInput.value.toLowerCase();
    const data = JSON.parse(localStorage.getItem('cadastros')) || [];
    const filtered = data.filter(person => person.name.toLowerCase().includes(searchName));

    results.innerHTML = '';

    if (filtered.length > 0) {
        filtered.forEach(person => {
            const div = document.createElement('div');
            div.textContent = `Nome: ${person.name}, Data de Nascimento: ${person.dob}, Telefone: ${person.phone}, Email: ${person.email}`;
            results.appendChild(div);
        });
    } else {
        results.textContent = 'Nenhum registro encontrado.';
    }
});

// Excluir cadastro
btnDelete.addEventListener('click', () => {
    const deleteName = deleteInput.value.toLowerCase();
    let data = JSON.parse(localStorage.getItem('cadastros')) || [];

    const filtered = data.filter(person => person.name.toLowerCase() !== deleteName);

    if (data.length !== filtered.length) {
        localStorage.setItem('cadastros', JSON.stringify(filtered));
        alert('Cadastro excluído com sucesso!');
    } else {
        alert('Cadastro não encontrado.');
    }

    deleteInput.value = '';
});