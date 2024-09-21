document.addEventListener('DOMContentLoaded', function () {
    const noteInput = document.getElementById('noteInput');
    const saveButton = document.getElementById('saveButton');
    const notesContainer = document.getElementById('notesContainer');

    // Carregar as notas armazenadas
    loadNotes();

    // Salvar uma nova nota
    saveButton.addEventListener('click', function () {
        const noteText = noteInput.value.trim();
        if (noteText) {
            saveNote(noteText);
            noteInput.value = ''; // Limpar o campo de entrada
        }
    });

    // Função para salvar a nota localmente
    function saveNote(noteText) {
        chrome.storage.local.get({ notes: [] }, function (data) {
            const notes = data.notes;
            notes.push(noteText);
            chrome.storage.local.set({ notes }, function () {
                displayNotes(notes);
            });
        });
    }

    // Função para carregar e exibir as notas
    function loadNotes() {
        chrome.storage.local.get({ notes: [] }, function (data) {
            displayNotes(data.notes);
        });
    }

    // Função para exibir as notas no container
    function displayNotes(notes) {
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.textContent = note;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', function () {
                deleteNote(index);
            });

            noteElement.appendChild(deleteButton);
            notesContainer.appendChild(noteElement);
        });
    }

    // Função para excluir uma nota
    function deleteNote(index) {
        chrome.storage.local.get({ notes: [] }, function (data) {
            const notes = data.notes;
            notes.splice(index, 1); // Remove a nota pelo índice
            chrome.storage.local.set({ notes }, function () {
                displayNotes(notes);
            });
        });
    }
});
