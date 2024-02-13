var spinner = document.getElementById("overlay");

window.addEventListener("load", function () {
	spinner.style.display = "none";
});

function LoginUser() {
	spinner.style.display = "block";
	var email = document.getElementById("username").value;
	if (email == "") {
		spinner.style.display = "none";
		swal("Please enter email address!");
		return false;
	}
	var Pword = document.getElementById("password").value;
	if (Pword == "") {
		spinner.style.display = "none";
		swal("Please enter password!");
		return false;
	}
	auth.signInWithEmailAndPassword(email, Pword)
		.then((cred) => {
			window.location.href = "dashboard.html";
		})
		.catch(function (error) {
			swal(
				"Error!",
				error +
					" Email or Password is wrong! or User not Permitted to log in! ",
				"error"
			);
			spinner.style.display = "none";
		});
}

function sendPasswordReset() {
	const email = document.getElementById("username").value;
	// [START auth_send_password_reset]
	auth.sendPasswordResetEmail(email)
	  .then(() => {
		// Password reset email sent!
		// ..
		alert("Password Reser link sent")
	  })
	  .catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		// ..
		console.log(errorCode)
		console.log(errorMessage)
	  });
	// [END auth_send_password_reset]
  }