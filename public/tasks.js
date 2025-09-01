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
        listItem.className = 'flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow';
        
        // Container para informações da tarefa
        const taskInfo = document.createElement('div');
        taskInfo.className = 'flex-1';
        
        // Cria um link para a visualização da tarefa
        const taskLink = document.createElement('a');
        taskLink.href = `/task/${task.id}`;
        taskLink.className = 'text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors';
        taskLink.textContent = task.title;
        
        // Status da tarefa
        const statusSpan = document.createElement('span');
        statusSpan.className = `inline-block px-2 py-1 text-xs font-semibold rounded-full ml-2 ${
          task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`;
        statusSpan.textContent = task.completed ? 'Concluída' : 'Pendente';
        
        // Container para botões
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'flex space-x-2';
        
        // Cria botão de edição
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors';
        editButton.onclick = () => window.location.href = `/tasks/edit/${task.id}`;
        
        // Cria botão de exclusão
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.className = 'px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors';
        deleteButton.onclick = () => deleteTask(task.id);
        
        taskInfo.appendChild(taskLink);
        taskInfo.appendChild(statusSpan);
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        listItem.appendChild(taskInfo);
        listItem.appendChild(buttonContainer);
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
