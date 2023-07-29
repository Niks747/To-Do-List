$(document).ready(function(){
$("#addTask").on('click',function() {
      let taskText = $("#taskInput").val();
      if (taskText !== "") {
        addTaskToList(taskText);
        $("#taskInput").val("");
      }
    });

    // Add a new task when the Add key is pressed
    $("#addTask").on('click', function() {
       
        let taskText = $("#taskInput").val();
        
          $(taskText).append('ul');
      
    });

    // Delete a task when the delete button is clicked
    $(document).on("click", ".delete-btn", function() {
      $(this).closest("li").remove();
      updateTaskNumbers();
    });

    // Edit a task on click
    $(document).on("click", ".edit-btn", function() {
      let taskTextSpan = $(this).siblings(".task-text");
      let taskText = taskTextSpan.text();
      let taskNumber = taskText.substr(0, taskText.indexOf("."));
      let updatedText = prompt("Edit task:", taskText.substring(taskText.indexOf(" ") + 1));
      if (updatedText !== null && updatedText.trim() !== "") {
        taskTextSpan.text(taskNumber + ". " + updatedText);
      }
    });

    // Make the task list sortable
    $("#taskList").sortable({
      update: function() {
        updateTaskNumbers();
      },
    });
    $("#taskList").disableSelection();

    // Function to add a new task to the list
    function addTaskToList(taskText) {
      let taskItem = $("<li></li>");
      let taskNumber = $("#taskList li").length + 1;
      let taskTextSpan = $("<span class='task-text'></span>").text(taskNumber + ". " + taskText);
      let editBtn = $("<span class='edit-btn'><i class='fas fa-edit'></i></span>");
      let deleteBtn = $("<span class='delete-btn'><i class='fas fa-trash'></i></span>");
      taskItem.append(taskTextSpan).append(editBtn).append(deleteBtn);
      $("#taskList").append(taskItem);
      updateTaskNumbers();
    }

    // Function to update task numbers after sorting or deletion
    function updateTaskNumbers() {
      $("#taskList li").each(function(index) {
        let taskText = $(this).find(".task-text").text();
        $(this).find(".task-text").text((index + 1) + ". " + taskText.substring(taskText.indexOf(" ") + 1));
      });
    }
  });