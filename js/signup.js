var spinner = document.getElementById("overlay");

window.addEventListener("load", function () {
	spinner.style.display = "none";
});
function createAccount() {
	db.collection("Admin")
		.doc("96325")
		.get()
		.then((snap) => {
			spinner.style.display = "block";
			var nameUser = document.getElementById("Name").value;
			if (nameUser == "") {
				spinner.style.display = "none";

				swal(
					"Missing Input Error!",
					"Please enter Name & Surname!",
					"error"
				);
				return false;
			}
			var email = document.getElementById("email").value;
			if (email == "") {
				spinner.style.display = "none";
				swal("Please enter email address!");
				return false;
			}

			var pin = document.getElementById("pin").value;
			if (pin == "") {
				spinner.style.display = "none";

				swal("Missing Input Error!", "Please enter pin code!", "error");
				return false;
			}
			if (pin !== snap.data().Pin) {
				spinner.style.display = "none";

				swal(
					"Missing Input Error!",
					"Please enter correct pin code!",
					"error"
				);
				return false;
			}

			var Pword = document.getElementById("password").value;
			if (Pword == "") {
				spinner.style.display = "none";
				swal("Please enter password!");
				return false;
			}
			var confPassword = document.getElementById("confirmP").value;
			if (confPassword == "") {
				swal("Missing Input Error!", "Confirm Password", "error");
				spinner.style.display = "none";
				return false;
			}
			if (Pword !== confPassword) {
				swal("Missing Input Error!", "Password dont match", "error");
				spinner.style.display = "none";
				return false;
			}

			auth.createUserWithEmailAndPassword(email, Pword).then(() => {
				db.collection("Admin")
					.doc("96325")
					.collection("Users")
					.doc(auth.currentUser.uid)
					.set(
						{
							Name: nameUser,

							Email: email,
						},
						(merge = true)
					)
					.then(() => {
						window.location.href = "dashboard.html";
					});
			});
		});
}
