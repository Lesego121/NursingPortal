function getlistAllApplicants() {
	var html = "";
	var div = "";

	db.collection("Admin")
		.doc("96325")
		.collection("SubmittedApplication")
		.get()
		.then((snaps) => {
			var count = -1;
			let list = [];
			snaps.forEach((snap) => {
				count++;
				list[count] = snap.data().ID;
			});
			console.log(list);
			getUsersApplied(list);
		});
}
function getUsersApplied(L) {
	for (let i = 0; i < L.length; i++) {
		const list = document.querySelector("#appliedList");
		var html = "";
		var div = "";
		var count = 0;
		db.collection("SANC")
			.doc(L[i])
			.collection("LICENSE")
			.doc(L[i])
			.get()
			.then((snap) => {
				db.collection("SANC")
					.doc(L[i])
					.collection("PERSONAL")
					.doc(L[i])
					.get()
					.then((snapshot) => {
						count++;
						console.log(snapshot.data().ApplicantsEmail);

						div = `
                <tr  onclick="View('${L[i]}')">
                    <td>${count}</td>
                    <td>${snapshot.data().ApplicantsName}</td>
                    <td>${snapshot.data().ApplicantsSurname}</td>
                    <td>${snapshot.data().ApplicantsEmail}</td>
                    <td>${snap.data().ApplicationStatus}</td>
                </tr>
                `;
						html += div;
						list.innerHTML = html;
					});
			});
	}
}
function View(i) {
	window.location.href = "preview.html?User=" + i + "";
}

function userLoaded() {
	const query = window.location.search;
	const url = new URLSearchParams(query);
	const userkey = url.get("User");
	db.collection("SANC")
		.doc(userkey)
		.collection("PERSONAL")
		.doc(userkey)
		.get()
		.then((snapshot) => {
			document.getElementById("thename").innerHTML =
				snapshot.data().ApplicantsName;
			document.getElementById("thesurname").innerHTML =
				snapshot.data().ApplicantsSurname;
			document.getElementById("myID").innerHTML =
				snapshot.data().ApplicantsID;
			document.getElementById("myEmail").innerHTML =
				snapshot.data().ApplicantsEmail;
			document.getElementById("myCell").innerHTML =
				snapshot.data().ApplicantsCell;
			document.getElementById("myBirth").innerHTML =
				snapshot.data().ApplicantsBirth;
			document.getElementById("myGender").innerHTML =
				snapshot.data().ApplicantsGender;
			document.getElementById("myCitizen").innerHTML =
				snapshot.data().ApplicantsCitezen;
			document.getElementById("myAmount").innerHTML =
				snapshot.data().ApplicantMoneyOwed;
			const array = snapshot.data().ApplicantsDocs;
			const listofDocs = document.getElementById("listOfDocsUploaded");
			var div = "";
			var html = "";
			for (let index = 0; index < array.length; index++) {
				const element = array[index];
				div = `
				<div class="col-sm-6">
					<p
						class="m-b-10 f-w-600"
					>
						${array[index].TitleDoc}
					</p>
					<h6
						class="text-muted f-w-400"
					>
						<a
							href="${array[index].LInk}"
							target="_blank"
							rel="noopener noreferrer"
							>View</a
						>
					</h6>
				</div>
				`;
				html += div;
				listofDocs.innerHTML = html;
			}

			db.collection("SANC")
				.doc(userkey)
				.collection("Address")
				.doc(userkey)
				.get()
				.then((snapshot) => {
					document.getElementById("myAddress").innerHTML =
						snapshot.data().ApplicantsCardBillAddress;
					document.getElementById("myHomeCity").innerHTML =
						snapshot.data().ApplicantsCardHomeCity;
					document.getElementById("myProvince").innerHTML =
						snapshot.data().ApplicantsCardHomeProvince;
					document.getElementById("myZipCode").innerHTML =
						snapshot.data().ApplicantsCardHomeZipCode;
				});
		});

	db.collection("SANC")
		.doc(userkey)
		.collection("LICENSE")
		.doc(userkey)
		.onSnapshot((sn) => {
			
			if(typeof sn.data().SANCNumber ==="undefined"){
				
			document.getElementById("SANC").value = "";
			document.getElementById("ValidDateTill").value =""
		
			}else{
				
				document.getElementById("SANC").value = sn.data().SANCNumber;
				document.getElementById("ValidDateTill").value =
					sn.data().ValidTill;
			}
			document.getElementById("mySt").value = sn.data().ApplicationStatus;
			document
				.getElementById("saveStatus")
				.addEventListener("click", () => {
					var selectedUpdate =
						document.getElementById("changeStatus").value;
					if (selectedUpdate == "") {
						swal("Please Select update before saving!");
						return;
					}
					var min = 10000000;
					var max = 90000000;
					var num = Math.floor(Math.random() * min) + max;

					var date = new Date();
					var day = date.getDate();
					var month = date.getMonth() + 1;
					var year = date.getFullYear() + 1;
					var day2 = date.getDate();
					var month2 = date.getMonth() + 1;
					var year2 = date.getFullYear();
					var expiryDate = day + " / " + month + " / " + year;
					var genDate = day2 + " / " + month2 + " / " + year2;
					db.collection("SANC")
						.doc(userkey)
						.collection("LICENSE")
						.doc(userkey).get().then((snapshot)=>{
							console.log(snapshot.data().SANCNumber);
if(snapshot.data().SANCNumber =="" || typeof snapshot.data().SANCNumber == "undefined"){

if(selectedUpdate=="Reject"){
	db.collection("SANC")
						.doc(userkey)
						.collection("LICENSE")
						.doc(userkey)
						.set({
							ApplicationStatus: selectedUpdate,
							
							
						}).then(()=>{
							db.collection("SANC")
					.doc(userkey).set({
						Status: "Reject"
					}).then(()=>{
						swal(
							"Successful",
							"Reject status updated successfully " ,
							"success"
						);
					})
				})
} else if(selectedUpdate=="Active"){
	db.collection("SANC")
	.doc(userkey)
	.collection("LICENSE")
	.doc(userkey)
	.set({
		ApplicationStatus: selectedUpdate,
		SANCNumber: num,
		ValidTill: expiryDate,
		GeneratedDate: genDate,
		
	}).then(()=>{
		db.collection("SANC")
.doc(userkey).set({
	Status: "Active"
}).then(() => {
	db.collection("Admin").add({
		SANCNumber:num,
	}).then(()=>{
		swal(
			"Successful",
			"Generated SANC Number " + num,
			"success"
		);
	})
});
	})


}
					
					} else{
						swal(
							"Error",
							"SANC Number already exist",
							"error"
						);
					}
						
				});
			});
		});
}
