(function () {
    'use strict'
    const taskListItemSelector = '[data-draggable="item"]';
    const taskListsSelector = '[data-draggable="target"]';
    var taskListItem = document.querySelectorAll('[data-draggable="item"]');
    
    //exclude older browsers by the features we need them to support
    //and legacy opera explicitly so we don't waste time on a dead browser
    if(
        !document.querySelectorAll || !('draggable' in document.createElement('span')) || window.opera
    ) { return; }
    
    //get the collection of draggable items and add their draggable attribute
    document.querySelectorAll(taskListItemSelector).forEach(items => 
        items.setAttribute('draggable', 'true')
    );

    //variable for storing the dragging item reference 
    //this will avoid the need to define any transfer data 
    //which means that the elements don't need to have IDs 
    var item = null;

    //dragstart event to initiate mouse dragging
    taskListItem.forEach(items => items.addEventListener('dragstart', function(e){

        // Prevent other draggable content of this item from working
        if(!(e.target.getAttribute('data-draggable') == 'item')) return;
        e.target.style.opacity = '0.5';
        //set the item reference to this element
        item = e.target;
        
        //we don't need the transfer data, but we have to define something
        //otherwise the drop action won't work at all in firefox
        e.dataTransfer.setData('text/plain', '');
        
        // 

        //create an image and use it for the drag image
        var img = new Image();
        img.src = 'assets/images/drag-img.png';

        e.dataTransfer.setDragImage(item, 50, 50)

    }, false));

    //dragover event to allow the drag by preventing its default
    //ie. the default action of an element is not to allow dragging 
    document.querySelectorAll(taskListsSelector).forEach(items => items.addEventListener('dragover', function(e){
        e.preventDefault();

    }, false));  

    // 
    document.querySelectorAll(taskListItemSelector).forEach(items => items.addEventListener('dragenter', function(e){
        if(item){
            e.preventDefault();
            if(e.target.getAttribute('data-draggable') == 'item' || e.target.closest(taskListItemSelector).matches(taskListItemSelector)){
                var target = e.target;
                var bounding = target.getBoundingClientRect()
                var offset = bounding.y + (bounding.height/2);
                if ( e.clientY - offset > 0 ) {
                    target.closest(taskListItemSelector).style['border-bottom'] = 'solid 8px #f0f0f0';
                    target.closest(taskListItemSelector).style['border-top'] = '';
                } else {
                    target.closest(taskListItemSelector).style['border-top'] = 'solid 8px #f0f0f0';
                    target.closest(taskListItemSelector).style['border-bottom'] = '';
                }
            }
        }
    }, false));  

    // 
    document.querySelectorAll(taskListItemSelector).forEach(items => items.addEventListener('dragleave', function(e){
        if(item){
            e.preventDefault();
            if(e.target.getAttribute('data-draggable') == 'item' || e.target.closest(taskListItemSelector).matches(taskListItemSelector)){
                var target = e.target;
                target.closest(taskListItemSelector).style['border-bottom'] = '';
                target.closest(taskListItemSelector).style['border-top'] = '';
            }
        }
    }, false));  

    //drop event to allow the element to be dropped into valid targets
    document.addEventListener('drop', function(e){
        //if this element is a drop target, move the item here 
        //then prevent default to allow the action (same as dragover)
        if(item == null){
            return;
        }
        if(e.target.getAttribute('data-draggable') == 'target' || e.target.closest(taskListsSelector).matches(taskListsSelector)){
            // if(e.target.closest(taskListItemSelector).matches(taskListItemSelector)){
            //     //console.log('sfdf');
            // }
            // var target = e.target;
            
            if(e.target.getAttribute('data-draggable') == 'item'){
                console.log(e.target.closest(taskListsSelector));
                if ( e.target.style['border-bottom'] !== '' ) {
                    e.target.style['border-bottom'] = '';
                    e.target.insertBefore(item, e.target.nextSibling);
                } else {
                    e.target.style['border-top'] = '';
                    e.target.insertBefore(item, e.target);
                }
                e.target.style['border'] = '';
            }
            e.target.style['border'] = '';
            e.target.closest(taskListsSelector).appendChild(item);  

            e.preventDefault();
        }
    }, false);
    
    //dragend event to clean-up after drop or abort
    //which fires whether or not the drop target was valid
    document.addEventListener('dragend', function(e){
        e.target.style.opacity = '1.0';
        item = null;
    }, false);

}())