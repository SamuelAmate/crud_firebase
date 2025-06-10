// Configuração do Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAeVWsKwR6WHkVEP04VUrYLXZbuUa9Qfm8',
  authDomain: 'jquery-7d0fc.firebaseapp.com',
  databaseURL: 'https://jquery-7d0fc-default-rtdb.firebaseio.com',
  projectId: 'jquery-7d0fc',
  storageBucket: 'jquery-7d0fc.firebasestorage.app',
  messagingSenderId: '409203111505',
  appId: '1:409203111505:web:e0b915e3aad682c4652a70',
  measurementId: 'G-EEVCLC2T2J',
}

// Inicializa Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.database().ref('alunos')

// Carregar usuários
function carregaralunos() {
  db.on('value', (snapshot) => {
    const tbody = $('#tabelaalunos')
    tbody.empty()
    snapshot.forEach((child) => {
      const user = child.val()
      const key = child.key
      tbody.append(`
        <tr>
          <td>${user.nome}</td>
          <td>${user.email}</td>
          <td>${user.telefone}</td>
          <td>
            <button class="btn btn-warning btn-sm edit-btn" data-id="${key}">Editar</button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${key}">Excluir</button>
          </td>
        </tr>
      `)
    })
  })
}

// Salvar aluno (create/update)
$('#formAlunos').submit(function (e) {
  e.preventDefault()

  const id = $('#id').val()
  const nome = $('#txtnome').val()
  const email = $('#txtemail').val()
  const telefone = $('#txttelefone').val()

  if (id) {
    db.child(id).update({ nome, email, telefone })
  } else {
    db.push({ nome, email, telefone })
  }

  this.reset()
  $('#id').val('')
})

// Editar
$(document).on('click', '.edit-btn', function () {
  const id = $(this).data('id')
  db.child(id)
    .get()
    .then((snapshot) => {
      const user = snapshot.val()
      $('#id').val(id)
      $('#txtnome').val(user.nome)
      $('#txtemail').val(user.email)
      $('#txttelefone').val(user.telefone)
    })
})

// Excluir
$(document).on('click', '.delete-btn', function () {
  const id = $(this).data('id')
  if (confirm('Tem certeza que deseja excluir?')) {
    db.child(id).remove()
  }
})

// Inicializar
carregaralunos()
