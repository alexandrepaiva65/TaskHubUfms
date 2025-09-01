/**
 * Realiza uma requisição GET para obter a lista de tarefas do servidor e exibe as tarefas na página.
 * @function
 * @returns {void}
 */
// tasks.js
document.addEventListener('DOMContentLoaded', function () {
  // Realiza uma requisição GET para obter a lista de tarefas do servidor
  fetch('/api/tasks')
    .then(response => response.json())
    .then(tasks => {
      const taskList = document.getElementById('taskList');

      // Limpa a lista de tarefas antes de adicionar as novas
      taskList.innerHTML = '';

      // Adiciona cada tarefa à lista
      tasks.forEach(task => {
        const listItem = document.createElement('li');
        
        // Cria um link para a visualização da tarefa
        const taskLink = document.createElement('a');
        taskLink.href = `/task/${task.id}`;
        taskLink.textContent = `${task.title} - ${task.completed ? 'Concluída' : 'Pendente'}`;
        
        // Cria botão de edição
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => window.location.href = `/tasks/edit/${task.id}`;
        
        // Cria botão de exclusão
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => deleteTask(task.id);
        
        listItem.appendChild(taskLink);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Erro ao obter lista de tarefas:', error));
});

/**
 * Exclui uma tarefa do servidor
 * @param {string} taskId - ID da tarefa a ser excluída
 */
function deleteTask(taskId) {
  if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
    fetch(`/api/task/${taskId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Resposta da API:', data);
      alert(data.message);
      location.reload();
    })
    .catch(error => {
      console.error('Erro ao excluir tarefa:', error);
      alert('Erro ao excluir tarefa: ' + error.message);
    });
  }
}
