/** @format */

const form = document.querySelector(".form");
const todoitems = document.querySelector(".todosItems");

// Function to display todos
function displayTodos() {
	const todolists = JSON.parse(localStorage.getItem("todos"));
	if (todolists && todolists.length > 0) {
		let displayTodos = "";
		todolists.forEach((todo, index) => {
			displayTodos += `<li class="todoitem">
								<span>${index + 1}. ${todo.todo}</span>
								<span class="deleteBtn" data-index="${index}"> Delete</span>
							</li>`;
		});
		todoitems.innerHTML = displayTodos;

		// Attach event listeners to delete buttons
		const deleteBtns = document.querySelectorAll(".deleteBtn");
		deleteBtns.forEach(button => {
			button.addEventListener("click", function(e) {
				e.preventDefault();
				const index = this.getAttribute("data-index");
				deleteTodoItem(index);
			});
		});
	} else {
		todoitems.innerHTML = "No todos found";
	}
}

// Function to delete a todo item
function deleteTodoItem(index) {
	let storedtodos = JSON.parse(localStorage.getItem("todos")) || [];
	storedtodos.splice(index, 1);
	localStorage.setItem("todos", JSON.stringify(storedtodos));
	displayTodos();
}

form.addEventListener("submit", function (e) {
	e.preventDefault();
	const inputValue = form.querySelector("input").value;
	form.reset();

	let storedtodos = JSON.parse(localStorage.getItem("todos")) || [];
	storedtodos.push({ todo: inputValue });
	localStorage.setItem("todos", JSON.stringify(storedtodos));

	displayTodos();
});

// Initial display of todos on page load
displayTodos();


