function displayProfile() {
	auth.onAuthStateChanged((user) => {
		if (user) {
			console.log("User logged in");
			db.collection("NURSE")
				.doc(user.uid)
				.onSnapshot((snapshot) => {
					console.log(snapshot.data());
					document.getElementById("inputFirstName").value =
						snapshot.data().Name;
					document.getElementById("inputLastName").value =
						snapshot.data().Surname;
					document.getElementById("ID").value =
						snapshot.data().IDnumber;
					document.getElementById("inputEmailAddress").value =
						snapshot.data().Email;
					document.getElementById("inputPhone").value =
						snapshot.data().Cellnumber;
					document.getElementById("inputBirthday").value =
						snapshot.data().Birth;
						if (typeof snapshot.data().UrlProfile !=="undefined") {
							document.getElementById("myPictureP").src=snapshot.data().UrlProfile	
						}
						
					db.collection("SANC")
						.doc(user.uid)
						.collection("Address")
						.doc(user.uid)
						.get()
						.then((doc) => {
							db.collection("SANC")
								.doc(user.uid)
								.collection("LICENSE")
								.doc(user.uid)
								.get()
								.then((snap) => {
									console.log(snap.data().SANCNumber);
									
									if ( snap.data().SANCNumber !== null) {
										document.getElementById(
											"toApply"
										).style.display = "none";
										var status =
											document.getElementById("MyActive");

										if (
											snap.data().ApplicationStatus ==
											"Active"
										) {
											status.style.display = "block";
											status.innerHTML =
												snap.data().ApplicationStatus;

											document.getElementById(
												"reciept"
											).style.display = "block";

											document
												.getElementById("reciept")
												.addEventListener(
													"click",
													() => {
														var pdfObject =
															jsPDFInvoiceTemplate.default(
																props
															);
														console.log(
															"PDF Created " +
																pdfObject
														);
													}
												);
											var props = {
												outputType:
													jsPDFInvoiceTemplate
														.OutputType.Save,
												returnJsPDFDocObject: true,
												fileName: "SANC License 2022",
												orientationLandscape: true,
												compress: true,

												business: {
													name: "SANC LICENSE",
													address:
														"602 Pretorius St, Arcadia, Pretoria, 0083",
													phone: "012 420-1000",
													email: "customerservice@sanc.co.za",
													email_1:
														"foreign@sanc.co.za",
													website:
														"https://www.sanc.co.za",
												},
												contact: {
													label: "License issued for:",
													name:
														snapshot.data().Name +
														" " +
														snapshot.data().Surname,
													address:
														doc.data()
															.ApplicantsCardBillAddress +
														", " +
														doc.data()
															.ApplicantsCardHomeCity +
														", " +
														doc.data()
															.ApplicantsCardHomeZipCode,
													phone: snapshot.data()
														.Cellnumber,
													email: snapshot.data()
														.Email,
												},
												invoice: {
													label: "Reciept #: ",
													num: snap.data().LicenseNum,
													invDate:
														"Payment Date: " +
														snap.data()
															.GeneratedDate,
													invGenDate:
														"Expirey Date: " +
														snap.data().ValidTill,
													headerBorder: false,
													tableBodyBorder: false,
													header: [
														{
															title: "#",
															style: {
																width: 10,
															},
														},
														{
															title: "Title",
															style: {
																width: 30,
															},
														},
														{
															title: "",
															style: {
																width: 80,
															},
														},
														{
															title: "Generated SANC Number",
															style: {
																width: 80,
															},
														},
													],
													table: Array.from(
														Array(1),
														(item, index) => [
															index + 1,

															"License outcome of a user ",
															"",
															snap.data()
																.SANCNumber,
														]
													),
												},
												footer: {
													text: "The License is created on a computer and is valid without the signature and stamp.",
												},
												pageEnable: true,
												pageLabel: "Page ",
											};
										} else if(snap.data().ApplicationStatus=="Expired"){
											status.style.display = "block";
											status.innerHTML =
												snap.data().ApplicationStatus;
												document.getElementById("toApply2").style.display="block"
										}
										if ( snap.data().ApplicationStatus =="Submitted") {
											document.getElementById(
												"MyActive"
											).style.display="block"
											document.getElementById(
												"MyActive"
											).innerHTML ="Submitted";
											document.getElementById(
												"mySanc"
											).innerHTML ="Pending";
											document.getElementById(
												"expDate"
											).innerHTML ="";
										} else{
											document.getElementById(
												"mySanc"
											).innerHTML = snap.data().SANCNumber;
											document.getElementById(
												"expDate"
											).innerHTML = snap.data().ValidTill;
										}
										
									} else {
										document.getElementById(
											"toApply"
										).style.display = "block";
									}
								});
						});
				});
		} else {
			console.log("user logged out");
		}
	});
}
displayProfile();

function updateUserDetails() {
	var Name = document.getElementById("inputFirstName").value;
	var Surname = document.getElementById("inputLastName").value;
	var ID = document.getElementById("ID").value;
	var email = document.getElementById("inputEmailAddress").value;
	var CellNumber = document.getElementById("inputPhone").value;
	var birth = document.getElementById("inputBirthday").value;
	auth.onAuthStateChanged((user) => {
		if (user) {
			console.log("User logged in");
			db.collection("NURSE")
				.doc(user.uid)
				.update(
					{
						Name: Name,
						Surname: Surname,
						IDnumber: ID,
						Birth: birth,
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
function uploadQualification() {
	auth.onAuthStateChanged((user) => {
		if (user) {
			var QualificationName = document.getElementById("filename").value;

			const ref = firebase.storage().ref("Qualification/");
			const file = document.querySelector("#myfile").files[0];

			if (file == "") {
				swal("Please Select Qualification before you can Upload!");
				return;
			}
			var fname = "QualificationDocs";
			var today = new Date();
			var time = today.getTime();

			const name = +new Date() + "-" + file.name;
			const theName = file.name;
			const metadata = {
				contentType: file.type,
			};

			const task = ref.child(name).put(file, metadata);
			task.on("state_changed", function progress(snapshot) {
				var percentage =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				document.getElementById("progress-status").value = percentage;
				document.getElementById("per-up2").innerHTML =
					"Upload " + percentage.toFixed(0) + "%";
			});

			task.then((snapshot) => snapshot.ref.getDownloadURL())
				.then((url) => {
					console.log(url);

					db.collection("NURSE")
						.doc(user.uid)
						.collection("DOCUMENT")
						.add({
							File_name: theName,
							Time: time,
							Url: url,
							TitleofDocument: QualificationName,
						})
						.then(() => {
							swal("Successful", "Document added", "success");
						});
				})
				.catch(console.error);
		}
	});
}
function getDocs() {
	auth.onAuthStateChanged((user) => {
		if (user) {
			db.collection("NURSE")
				.doc(user.uid)
				.collection("DOCUMENT")
				.onSnapshot((snapshot) => {
					const listofDocs = document.getElementById("listofdocs");
					var div = "";
					var html = "";
					snapshot.forEach((element) => {
						div = `
						 
						<li>
						<div class=row>
						<div class="col-md-6">
						<a href="${element.data().Url}" target="_blank">${element.data().File_name}</a>	
									</div>
									<div class="col-md-6">
									<Button class="btn btn-sm btn-danger" type="button" onclick="remove('${
										element.id
									}')">Delete</Button>
									
									</div>
						</div>
					<br/>
						</li>
						`;
						html += div;
						listofDocs.innerHTML = html;
					});
				});
		}
	});
}
function upload(event) {
	auth.onAuthStateChanged((user) => {
		if (user) {

			
				var reader = new FileReader();
				reader.onload = function(){
					var output = document.getElementById('myPictureP');
					output.src = reader.result ;
				}
				reader.readAsDataURL(event.target.files[0]);
			
		document.getElementById("uploader").addEventListener(("click"),()=>{


		

			const ref = firebase.storage().ref("profile/");
			const file = document.querySelector("#fileimg").files[0];

			if (file == "") {
				swal("Please Select Qualification before you can Upload!");
				return;
			}
			var fname = "QualificationDocs";
			var today = new Date();
			var time = today.getTime();

			const name = +new Date() + "-" + file.name;
			const theName = file.name;
			const metadata = {
				contentType: file.type,
			};

			const task = ref.child(name).put(file, metadata);
			task.on("state_changed", function progress(snapshot) {
				var percentage =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			//	document.getElementById("progress-status").value = percentage;
				document.getElementById("per-up3").innerHTML =
					"Upload " + percentage.toFixed(0) + "%";
			});

			task.then((snapshot) => snapshot.ref.getDownloadURL())
				.then((url) => {
					console.log(url);

					db.collection("NURSE")
						.doc(user.uid)
						
						.update({
							
							UrlProfile: url,
							
						},merge=true)
						.then(() => {
							swal("Successful", "Profile updated", "success");
						});
				})
				.catch(console.error);
			})
			}
		})
}
getDocs();
function remove(subjectkey) {
	auth.onAuthStateChanged((user) => {
		if (user) {
			db.collection("NURSE")
				.doc(user.uid)
				.collection("DOCUMENT")
				.doc(subjectkey)
				.delete();

			getDocs();
			swal(
				"Successful",
				"Document Deleted (If not removed reload page)",
				"success"
			);
		}
	});
}

function applyNow() {
	auth.onAuthStateChanged((user) => {
		if (user) {
			var docsss = "";
			console.log("User logged in");
			db.collection("NURSE")
				.doc(user.uid)
				.get()
				.then((snapshot) => {
					db.collection("NURSE")
				.doc(user.uid)
				.collection("PAYMENT")
				.doc("dOxRUBiFqOo97vWuxCAJ")
				.get().then((info5)=>{ 
					let arrayDocs = [];
					db.collection("NURSE")
						.doc(user.uid)
						.collection("DOCUMENT")
						.onSnapshot((snapshot1) => {
							const listofDocs =
								document.getElementById("listinTable");
							var div = "";
							var html = "";
							console.log(snapshot.data().Email);
							document.getElementById("inputFirstName2").value =
								snapshot.data().Name;
							document.getElementById("inputLastName2").value =
								snapshot.data().Surname;
							document.getElementById("ID2").value =
								snapshot.data().IDnumber;
							document.getElementById(
								"inputEmailAddress2"
							).value = snapshot.data().Email;
							document.getElementById("inputPhone2").value =
								snapshot.data().Cellnumber;
							document.getElementById("inputBirthday2").value =
								snapshot.data().Birth;
							document.getElementById("Gender2").value =
								snapshot.data().Gender;
							document.getElementById("Citizenship2").value =
								snapshot.data().Citizen;
							document.getElementById("AmountOwed").innerHTML =
								"R" + 460;

							snapshot1.forEach((element) => {
								let addedDoc = {
									TitleDoc: element.data().TitleofDocument,
									LInk: element.data().Url,
									ID: element.id,
								};
								div = `
								<tr>
								<td>${element.data().TitleofDocument}</td>
								
								<td><span><a class="btn btn-sm btn-secondary" href="${
									element.data().Url
								}" target="_blank">View</a> </span> <span><button class="btn btn-sm btn-danger" type="button" onclick="remove('${
									element.id
								}')">Remove</button></span></td>
								<td> <button class="btn btn-sm btn-primary">Uploaded</button></td>
							</tr>
								
									`;
								html += div;
								listofDocs.innerHTML = html;
								arrayDocs.push(addedDoc);
								 docsss= element.data().Url;
							});
							console.log(arrayDocs);
							console.log(docsss);
							
							
					var cardyes = 
								document.getElementById("processPersonal")
								.addEventListener("click", () => {
									if ( docsss==""){
										swal('Error!',"Please upload DOCUMENT before you can apply", 'error');
										
										return false;
									}
									console.log(info5.data());
									if( typeof info5.data()==="undefined"){
										swal('Error!',"Please Add payment card to billing page first, before you can apply", 'error');
										
										return false;
									}
									db.collection("SANC")
										.doc(user.uid)
										.collection("PERSONAL")
										.doc(user.uid)
										.set({
											ApplicantsName:
												snapshot.data().Name,
											ApplicantsSurname:
												snapshot.data().Surname,
											ApplicantsID:
												snapshot.data().IDnumber,
											ApplicantsEmail:
												snapshot.data().Email,
											ApplicantsCell:
												snapshot.data().Cellnumber,
											ApplicantsBirth:
												snapshot.data().Birth,
											ApplicantsGender:
												snapshot.data().Gender,
											ApplicantsCitezen:
												snapshot.data().Citizen,
											ApplicantMoneyOwed: 460,
											ApplicantsDocs: arrayDocs,
										})
										.then(() => {
											var email5 = snapshot.data().Email;
											Email.send({
												Host: "smtp.gmail.com",
												Username:
													"systemhteam@gmail.com",
												Password: "phshaznvnwakjbbs",
												To: "chris.adomtech@gmail.com",
												From: email5,
												Subject: `${
													snapshot.data().Name
												} Submitted an Application for SANC number`,
												Body: `<p style="font-weight:bold;">From: ${
													snapshot.data().Name
												} </p><br /> Status: Submitted Application<p>Login Details<br /> Username: ${email5} <br /></p>  <br /> <p>Kind Regards<br />${
													snapshot.data().Name
												}  `,
											}).then(() => {
												location.href = "apply1.html";
											});
										});
								});})
						});
				});
		} else {
			console.log("user logged out");
		}
	});
}

function logout() {
	auth.signOut().then(() => {
		console.log("user signed out");
		location.href = "../dist/index.html";
	});
}