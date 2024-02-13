function addBankCard() {
	auth.onAuthStateChanged((user) => {
		if (user) {
			console.log("User logged in");
			var cardName = document.getElementById("name-card").value;
			var cardNumber = document.getElementById("number-card").value;
			var dateExpirey = document.getElementById("date-expirey").value;
			var accountHolder = document.getElementById("holder-card").value;
			var typeAccount = document.getElementById("type-card").value;
			var cvv = document.getElementById("the-cvv").value;
			var billAddress = document.getElementById("billingAddress").value;
			var City = document.getElementById("City").value;
			var Province = document.getElementById("province").value;
			var ZipCode = document.getElementById("zipCode").value;

			db.collection("NURSE")
				.doc(user.uid)
				.collection("PAYMENT")
				.doc("dOxRUBiFqOo97vWuxCAJ")
				.set(
					{
						CardName: cardName,
						CardNumber: cardNumber,
						ExpireyDate: dateExpirey,
						CVV: cvv,
						AccountHolder: accountHolder,
						TypeofAccount: typeAccount,
						BillAddress: billAddress,
						HomeCity: City,
						HomeProvince: Province,
						HomeZipCode: ZipCode,
					},
					(merge = true)
				)
				.then(() => {
					swal("Successful", "Successfully added card", "success");
				});
		}
	});
}
function viewCard() {
	auth.onAuthStateChanged((user) => {
		if (user) {
			console.log("User logged in");
		

			db.collection("NURSE")
				.doc(user.uid)
				.collection("PAYMENT")
				.doc("dOxRUBiFqOo97vWuxCAJ")
				.get().then((info)=>
					{
						document.getElementById("name-card").value = info.data().CardName;
						document.getElementById("number-card").value = info.data().CardNumber;
						document.getElementById("date-expirey").value = info.data().ExpireyDate;
						document.getElementById("holder-card").value = info.data().AccountHolder;
						document.getElementById("type-card").value = info.data().TypeofAccount;
						document.getElementById("the-cvv").value = info.data().CVV;
						document.getElementById("billingAddress").value = info.data().BillAddress;
						document.getElementById("City").value = info.data().HomeCity;
						document.getElementById("province").value = info.data().HomeProvince
						document.getElementById("zipCode").value = info.data().HomeZipCode
						
						
					}
				)
				
		}
	});
}




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
function getCard() {
	auth.onAuthStateChanged((user) => {
		if (user) {
			db.collection("NURSE")
				.doc(user.uid)
				.collection("PAYMENT")
				.onSnapshot((snap) => {
					const listofCards = document.getElementById("listofcards");
					var div = "";
					var html = "";
					snap.forEach((element) => {
						let cardNum = element.data().CardNumber;
						let fourDigits = cardNum.substr(-4);
						div = `
                        <div
						class="d-flex align-items-center justify-content-between px-4"
					>
						<div class="d-flex align-items-center">
							<i class="fab fa-cc-visa fa-2x cc-color-visa"></i>
							<div class="ms-4">
								<div class="small">Visa ending in ${fourDigits}</div>
								<div class="text-xs text-muted">
									Expires ${element.data().ExpireyDate}
								</div>
							</div>
						</div>
						<div class="ms-4 small">
							<div class="badge bg-light text-dark me-3">
								Default
							</div>
							<a href="#!" data-bs-toggle="modal"
							data-bs-target="#exampleModal" onclick="viewCard()">Edit</a>
						</div>
					</div>
					<hr />
                        `;
						html += div;
						listofCards.innerHTML = html;
					});
				});

				db.collection("SANC")
										.doc(user.uid)
										.collection("HISTORY").get().then((info)=>{
											const listofSales = document.getElementById("salLi");
					var div = "";
					var html = "";
					info.forEach((element) => {
						
						div = `
						<tr>
						<td>#${element.data().Reference}</td>
						<td>${element.data().DatePaidON}</td>
						<td>R${element.data().PaidAmount}</td>
						<td>
							<span class="badge bg-light text-dark"
								>${element.data().Status}</span
							>
						</td>
					</tr>
                        `;
						html += div;
						listofSales.innerHTML = html;
										})
									})

									db.collection("SANC")
								.doc(user.uid)
								.collection("LICENSE")
								.doc(user.uid)
								.get()
								.then((snap) => {
									document.getElementById(
										"expDate"
									).innerHTML = snap.data().ValidTill;
								})
		}
	});

	
}
getCard();
function logout() {
	auth.signOut().then(() => {
		console.log("user signed out");
		location.href = "../dist/index.html";
	});
}