function displayUser() {
	auth.onAuthStateChanged((user) => {
		if (user) {
			console.log("User logged in");
			db.collection("Admin")
				.doc("96325")
				.collection("Users")
				.doc(user.uid)
				.get()
				.then((snapshot) => {
					console.log(snapshot.data().Email);
					document.getElementById("inputFirstName").innerHTML =
						snapshot.data().Name;
				});
		}
	});
}
function displayUserP() {
	auth.onAuthStateChanged((user) => {
		if (user) {
			console.log("User logged in");
			db.collection("Admin")
				.doc("96325")
				.collection("Users")
				.doc(user.uid)
				.get()
				.then((snapshot) => {
					console.log(snapshot.data().Email);
					document.getElementById("inputFirstName").innerHTML =
						snapshot.data().Name;
					document.getElementById("userName2").innerHTML =
						snapshot.data().Name;
					document.getElementById("useremail").innerHTML =
						snapshot.data().Email;
				});
			db.collection("Admin")
				.doc("96325")
				.get()
				.then((snap) => {
					document.getElementById("pinAdmin").innerHTML =
						snap.data().Pin;
				});
		}
	});
}
function logout() {
	auth.signOut().then(() => {
		console.log("user signed out");
		location.href = "login.html";
	});
}
function displayProfile() {
	auth.onAuthStateChanged((user) => {
		if (user) {
			console.log("User logged in");
			db.collection("Admin")
				.doc("96325")
				.collection("Users")
				.doc(user.uid)
				.get()
				.then((snapshot) => {
					console.log(snapshot.data().Email);
					document.getElementById("inputFirstNameAdmin").value =
						snapshot.data().Name;

					document.getElementById("example-email").value =
						snapshot.data().Email;
					document.getElementById("inputPhone").value =
						snapshot.data().Cellnumber;
					document.getElementById("inputMessage").value =
						snapshot.data().Message;
					document.getElementById("countryS").value =
						snapshot.data().Country;
				});
		} else {
			console.log("user logged out");
		}
	});
}

function updateUserDetails() {
	var Name = document.getElementById("inputFirstNameAdmin").value;

	var Message = document.getElementById("inputMessage").value;
	var email = document.getElementById("example-email").value;
	var CellNumber = document.getElementById("inputPhone").value;
	var country = document.getElementById("countryS").value;
	auth.onAuthStateChanged((user) => {
		if (user) {
			console.log("User logged in");
			db.collection("Admin")
				.doc("96325")
				.collection("Users")
				.doc(user.uid)
				.update(
					{
						Name: Name,
						Message: Message,
						Country: country,
						Cellnumber: CellNumber,
						Email: email,
					},
					(merge = true)
				)
				.then(() => {
					swal("Successful", "Successfully updated", "success");
				});
		}
	});
}
