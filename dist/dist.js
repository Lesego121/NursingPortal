/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "license" as shown below.
 */
var spinner = document.getElementById("overlay");

window.addEventListener("load", function () {
	spinner.style.display = "none";
});
let userInfo = [];

Dynamsoft.DBR.BarcodeReader.license =
	"DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAxMDkwODc2LVRYbFhaV0pRY205cSIsIm9yZ2FuaXphdGlvbklEIjoiMTAxMDkwODc2In0=";

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=9.0.0&utm_source=github#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

// Load the library on page load to speed things up.
(async () => {
	try {
		await Dynamsoft.DBR.BarcodeReader.loadWasm();
		document.getElementById("p-loading").style.display = "none";
	} catch (ex) {
		alert(ex.message);
		throw ex;
	}
})();

// html elements
const iptFile = document.getElementById("ipt-file");
const iptReadonlyLastResult = document.getElementById(
	"ipt-readonly-last-result"
);
const pReading = document.getElementById("p-reading");
const divResults = document.getElementById("div-results");
const divCvsContainer = document.getElementById("div-cvs-container");

// reader for decoding pictures
let pReader = null;
iptFile.addEventListener("change", async function () {
	const file = this.files[0];
	pReading.style.display = "";
	try {
		const reader = await (pReader =
			pReader || Dynamsoft.DBR.BarcodeReader.createInstance());
		reader.ifSaveOriginalImageInACanvas = true;
		const results = await reader.decode(file);

		// show image
		divCvsContainer.innerHTML = "";
		divCvsContainer.appendChild(reader.getOriginalImageInACanvas());

		// show results

		if (0 === results.length) {
			divResults.appendChild(createEl("p", "No Barcode Found!"));
		}
		for (let result of results) {
			console.log(result.barcodeText);
			if (result.barcodeFormatString == "PDF417") {
				console.log("This is PDF417");
				userInfo = result.barcodeText.split("|");
				console.log(userInfo);
				document.getElementById("Surname").value = userInfo[0];
				document.getElementById("Name").value = userInfo[1];
				document.getElementById("gender").value = userInfo[2];
				document.getElementById("citizen").value = userInfo[3];
				document.getElementById("ID").value = userInfo[4];
				document.getElementById("birth").value = userInfo[5];
				var myDiv = document.getElementById("signup");
				myDiv.scrollTop = myDiv.scrollHeight;
			}
		}
	} catch (ex) {
		alert(ex.message);
		throw ex;
	} finally {
		pReading.style.display = "none";
		this.value = "";
	}
});

iptReadonlyLastResult.addEventListener("dblclick", async () => {
	iptReadonlyLastResult.value = "";
});

function createEl(type, txt, className) {
	const el = document.createElement(type);
	el.textContent = txt;
	if (className) {
		el.className = className;
	}
	return el;
}
function login() {
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
			window.location.href = "../profile/profile.html";
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
function createAccount() {
	spinner.style.display = "block";
	var nameUser = document.getElementById("Name").value;
	if (nameUser == "") {
		spinner.style.display = "none";

		swal("Missing Input Error!", "Please enter Name!", "error");
		return false;
	}
	var surname = document.getElementById("Surname").value;
	if (surname == "") {
		spinner.style.display = "none";

		swal("Missing Input Error!", "Please enter Surname!", "error");
		return false;
	}
	var gender = document.getElementById("gender").value;
	if (gender == "") {
		spinner.style.display = "none";

		swal("Missing Input Error!", "Please select gender!", "error");
		return false;
	}
	var citizen = document.getElementById("citizen").value;
	if (citizen == "") {
		spinner.style.display = "none";

		swal("Missing Input Error!", "Please enter Citizen!", "error");
		return false;
	}
	var ID = document.getElementById("ID").value;
	if (ID == "") {
		spinner.style.display = "none";

		swal("Missing Input Error!", "Please enter ID", "error");
		return false;
	}
	var birth = document.getElementById("birth").value;
	if (birth == "") {
		swal("Missing Input Error!", "Enter Cellphone Number", "error");
		spinner.style.display = "none";
		return false;
	}
	var cellnumber = document.getElementById("CellNumber").value;
	if (cellnumber == "") {
		swal("Missing Input Error!", "Enter Cellphone Number", "error");
		spinner.style.display = "none";
		return false;
	}
	if (/^\d{10}$/.test(cellnumber)) {
		// value is ok, use it
	} else {
		swal("Invalid Input Error!", "Enter 10 Digits values only", "error");
		spinner.style.display = "none";

		return false;
	}
	var Pword = document.getElementById("passwordR").value;
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
	var email = document.getElementById("email2").value;
	if (email == "") {
		spinner.style.display = "none";
		swal("Please enter email address!");
		return false;
	}

	auth.createUserWithEmailAndPassword(email, Pword).then(() => {
		db.collection("NURSE")
			.doc(auth.currentUser.uid)
			.set(
				{
					Name: nameUser,
					Surname: surname,
					Gender: gender,
					Citizen: citizen,
					IDnumber: ID,
					Birth: birth,
					Cellnumber: cellnumber,
					Email: email,
					UrlProfile:"http://bootdey.com/img/Content/avatar/avatar1.png"
				},
				(merge = true)
			)
			.then(() => {
				window.location.href = "../profile/profile.html";
			});
	});
}

function sendPasswordReset() {
	const email = document.getElementById("emailVerification").value;
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
  