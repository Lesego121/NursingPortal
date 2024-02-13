function sendPasswordReset() {
	const email = document.getElementById("currentPassword").value;
	// [START auth_send_password_reset]
	auth.sendPasswordResetEmail(email)
	  .then(() => {
		// Password reset email sent!
		// ..
		swal("Successful", "Reset Link sent Successfully to your email", "success");
	  })
	  .catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		// ..
		console.log(errorCode)
		console.log(errorMessage)
        swal(" Error!",errorMessage , "error");
	  });
	// [END auth_send_password_reset]
  }
  function loudUser(){
    auth.onAuthStateChanged((user) => {
		if (user) {
			console.log("User logged in");
			db.collection("NURSE")
				.doc(user.uid)
				.get()
				.then((snapshot) => {
					console.log(snapshot.data().Email);
                    document.getElementById("currentPassword").value = snapshot.data().Email;
                    document.getElementById("twoFactorSMS").value =
                    snapshot.data().Cellnumber;
                })
            }
        })
        

  }loudUser()

  function logout() {
	auth.signOut().then(() => {
		console.log("user signed out");
		location.href = "../dist/index.html";
	});
}