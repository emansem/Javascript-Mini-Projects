/** @format */

const form = document.querySelector(".form");

function validateForm(username, email, phone, password, cfpassword) {
	if (!username.match(/^[a-z0-9]{5,10}$/)) {
		console.log("Enter the correct username");
	} else if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
		console.log("Enter the correct email");
	} else if (!phone.match(/^\d{10}$/)) {
		console.log("Enter the correct phone number");
	} else if (password === "" || !password.match(/^[a-zA-Z0-9]{6,50}$/)) {
		console.log("Enter the correct password");
	} else if (cfpassword !== password || cfpassword === "") {
		console.log("Passwords do not match");
	} else {
		console.log("Congratulations! You are logged in.");
	}
}

form.addEventListener("submit", function (e) {
	e.preventDefault();

	const username = form.userName.value;
	const email = form.email.value;
	const phone = form.phone.value;
	const password = form.password.value;
	const cfpassword = form.cfpassword.value;

	validateForm(username, email, phone, password, cfpassword);
});
