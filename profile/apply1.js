function formatString(event) {
	var inputChar = String.fromCharCode(event.keyCode);
	var code = event.keyCode;
	var allowedKeys = [8];
	if (allowedKeys.indexOf(code) !== -1) {
		return;
	}

	event.target.value = event.target.value
		.replace(
			/^([1-9]\/|[2-9])$/g,
			"0$1/" // 3 > 03/
		)
		.replace(
			/^(0[1-9]|1[0-2])$/g,
			"$1/" // 11 > 11/
		)
		.replace(
			/^([0-1])([3-9])$/g,
			"0$1/$2" // 13 > 01/3
		)
		.replace(
			/^(0?[1-9]|1[0-2])([0-9]{2})$/g,
			"$1/$2" // 141 > 01/41
		)
		.replace(
			/^([0]+)\/|[0]+$/g,
			"0" // 0/ > 0 and 00 > 0
		)
		.replace(
			/[^\d\/]|^[\/]*$/g,
			"" // To allow only digits and `/`
		)
		.replace(
			/\/\//g,
			"/" // Prevent entering more than 1 `/`
		);
}
function formats(ele, e) {
	if (ele.value.length < 19) {
		ele.value = ele.value.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
		return true;
	} else {
		return false;
	}
}

function getAddressdetails() {
	auth.onAuthStateChanged((user) => {
		if (user) {
			console.log("User logged in");

			db.collection("NURSE")
				.doc(user.uid)
				.collection("PAYMENT")
				.doc("dOxRUBiFqOo97vWuxCAJ")
				.get()
				.then((snap) => {
					document.getElementById("billingAddress").value =
						snap.data().BillAddress;
					document.getElementById("City").value =
						snap.data().HomeCity;
					document.getElementById("province").value =
						snap.data().HomeProvince;
					document.getElementById("zipCode").value =
						snap.data().HomeZipCode;

					document
						.getElementById("processAddress")
						.addEventListener("click", () => {
							db.collection("SANC")
								.doc(user.uid)
								.collection("Address")
								.doc(user.uid)
								.set({
									ApplicantsCardBillAddress:
										snap.data().BillAddress,
									ApplicantsCardHomeCity:
										snap.data().HomeCity,
									ApplicantsCardHomeProvince:
										snap.data().HomeProvince,

									ApplicantsCardHomeZipCode:
										snap.data().HomeZipCode,
								})
								.then(() => {
									db.collection("NURSE")
										.doc(user.uid)
										.collection("LICENSE")
										.doc(user.uid)
										.set({
											ApplicationStatus: "Submitted",
										})
										.then(() => {
											db.collection("SANC")
											.doc(user.uid).set({
												Status: "Submitted"
											}).then(() => {
						
					
											db.collection("SANC")
												.doc(user.uid)
												.collection("LICENSE")
												.doc(user.uid)
												.set({
													ApplicationStatus:
														"Submitted",
												})
												.then(() => {
													db.collection("Admin")
														.doc("96325")
														.collection(
															"SubmittedApplication"
														)
														.add({
															ID: user.uid,
														})
														.then(() => {
															location.href =
																"apply3.html";
														});
												});
										});});
								});
						});
				});
		}
	});
}

function getCarddetails() {
	auth.onAuthStateChanged((user) => {
		if (user) {
			console.log("User logged in");

			db.collection("NURSE")
				.doc(user.uid)
				.collection("PAYMENT")
				.doc("dOxRUBiFqOo97vWuxCAJ")
				.get()
				.then((snap) => {
					document.getElementById("name-card").value =
						snap.data().CardName;
					document.getElementById("number-card").value =
						snap.data().CardNumber;
					document.getElementById("date-expirey").value =
						snap.data().ExpireyDate;
					document.getElementById("holder-card").value =
						snap.data().AccountHolder;
					document.getElementById("type-card").value =
						snap.data().TypeofAccount;
					document.getElementById("the-cvv").value = snap.data().CVV;

					document
						.getElementById("processCard")
						.addEventListener("click", () => {
							var min = 10000;
							var max = 90000;
							var num = Math.floor(Math.random() * min) + max;

							var date = new Date();
							var day = date.getDate();
							var month = date.getMonth() + 1;
							var year = date.getFullYear();
							var paidDate = day + " / " + month + " / " + year;
							db.collection("SANC")
								.doc(user.uid)
								.collection("PAYMENT")
								.doc(user.uid)
								.set({
									ApplicantsCardName: snap.data().CardName,
									ApplicantsCardNumber:
										snap.data().CardNumber,
									ApplicantsCardExpireyDate:
										snap.data().ExpireyDate,
									ApplicantsCardAccountHolder:
										snap.data().AccountHolder,
									ApplicantsCardTypeofAccount:
										snap.data().TypeofAccount,
									ApplicantsCardCVV: snap.data().CVV,
								})
								.then(() => {
									db.collection("SANC")
										.doc(user.uid)
										.collection("HISTORY")
										.add({
											PaidAmount: 460,
											DatePaidON: paidDate,
											Reference: num,
											Status: "Paid",
										})
										.then(() => {
											location.href = "apply2.html";
										});
								});
						});
				});
		}
	});
}
function logout() {
	auth.signOut().then(() => {
		console.log("user signed out");
		location.href = "../dist/index.html";
	});
}