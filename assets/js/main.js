(function () {
    'use strict'
    const taskListItemSelector = '.task-list-item';
    var taskListItem = document.querySelectorAll('.task-list-item');
    
    //
    taskListItem.forEach(item => item.addEventListener('dragstart', function(event) {
        if(!event.target.matches(taskListItemSelector) || !event.target.closest(taskListItemSelector).matches(taskListItemSelector) ){
            return;
        }
        event.dataTransfer.setData('text/plain', event.target.id);
        event.currentTarget.style.backgroundColor = '#efefef';
    }));

    //
    document.getElementById('progressTaskList').addEventListener('dragover', function(event){
        event.preventDefault();
    });
    
    //
    document.getElementById('progressTaskList').addEventListener('drop', function(event){
        // if(!event.target.matches(taskListItemSelector)) {
        //     return;
        // }
        const id = event.dataTransfer.getData('text');

        const draggableElement = document.getElementById(id);
        const dropzone = event.target.closest('#progressTaskList');

        dropzone.appendChild(draggableElement);

        event.dataTransfer.clearData();
    });

}())