document.addEventListener('DOMContentLoaded', function () {
  const taskId = window.location.pathname.split('/').pop();
  const form = document.getElementById('editTaskForm');
  
  // Carrega dados da tarefa
  fetch(`/api/task/${taskId}`)
    .then(response => response.json())
    .then(task => {
      document.getElementById('title').value = task.title;
      document.getElementById('description').value = task.description;
    })
    .catch(error => console.error('Erro ao carregar tarefa:', error));

  // Submete edição
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const taskData = {
      title: formData.get('title'),
      description: formData.get('description')
    };

    fetch(`/api/task/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      window.location.href = '/tasks';
    })
    .catch(error => console.error('Erro ao editar tarefa:', error));
  });
});