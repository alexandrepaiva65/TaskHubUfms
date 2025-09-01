// task-view.js
document.addEventListener('DOMContentLoaded', function () {
  const markCompletedButton = document.createElement('button');
  // Obtém o ID da tarefa da URL, por exemplo, /task/taskId
  const taskId = window.location.pathname.split('/').pop();


  /**
   * Marca a tarefa como concluída.
   * @returns {void}
   */
  const markAsCompleted = () => {
    fetch(`/api/task/${taskId}/complete`, {
      method: 'PUT', // Utilize o método PUT para atualizar a tarefa
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Não foi possível marcar a tarefa como concluída');
        }
        return response.json();
      })
      .then(updatedTask => {
        // Atualiza a página com os detalhes da tarefa atualizados
        const taskDetailsDiv = document.getElementById('taskDetails');
        taskDetailsDiv.innerHTML = `
          <div class="border-b border-gray-200 pb-4 mb-4">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">${updatedTask.task["title"]}</h3>
            <span class="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
              Concluída
            </span>
          </div>
          <div>
            <h4 class="text-lg font-medium text-gray-700 mb-2">Descrição:</h4>
            <p class="text-gray-600 leading-relaxed">${updatedTask.task["description"]}</p>
          </div>
        `;
        alert('Tarefa marcada como concluída!');
        // Desabilita o botão após marcar como concluída
        markCompletedButton.hidden = true;
      })
      .catch(error => {
        console.error(error);
        // Em caso de erro, exiba uma mensagem adequada na página
        alert('Não foi possível marcar a tarefa como concluída.');
      });
  };

  // Realiza uma solicitação GET para obter os detalhes da tarefa
  fetch(`/api/task/${taskId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Não foi possível obter os detalhes da tarefa');
      }
      return response.json();
    })
    .then(task => {
      // Atualiza o conteúdo da div com os detalhes da tarefa
      const taskDetailsDiv = document.getElementById('taskDetails');
      taskDetailsDiv.innerHTML = `
        <div class="border-b border-gray-200 pb-4 mb-4">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">${task.title}</h3>
          <span class="inline-block px-3 py-1 text-sm font-semibold rounded-full ${
            task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }">
            ${task.completed ? 'Concluída' : 'Pendente'}
          </span>
        </div>
        <div>
          <h4 class="text-lg font-medium text-gray-700 mb-2">Descrição:</h4>
          <p class="text-gray-600 leading-relaxed">${task.description}</p>
        </div>
      `;

      // Adiciona um botão para marcar como concluída apenas se a tarefa estiver pendente
      if (!task.completed) {
        // Cria o botão
        markCompletedButton.id = 'markCompleted';
        markCompletedButton.textContent = 'Marcar como Concluída';
        markCompletedButton.className = 'mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium';

        // Adiciona um ouvinte de evento para chamar a função ao clicar no botão
        markCompletedButton.addEventListener('click', markAsCompleted);

        // Adiciona o botão à página
        document.getElementById('taskDetails').appendChild(markCompletedButton);
      }
    })
    .catch(error => {
      console.error(error);
      // Em caso de erro, você pode exibir uma mensagem adequada na página
      const taskDetailsDiv = document.getElementById('taskDetails');
      taskDetailsDiv.innerHTML = '<div class="text-center py-8"><p class="text-red-600 font-medium">Não foi possível obter os detalhes da tarefa.</p></div>';
    });
});
