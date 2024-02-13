/*
Template Name: Admin Pro Admin
Author: Wrappixel
Email: niravjoshi87@gmail.com
File: js
*/
$(function () {
	"use strict";
	// ==============================================================
	// Newsletter
	// ==============================================================

	//ct-visits
	new Chartist.Line(
		"#ct-visits",
		{
			labels: [
				"2008",
				"2009",
				"2010",
				"2011",
				"2012",
				"2013",
				"2014",
				"2015",
			],
			series: [
				[5, 2, 7, 4, 5, 3, 5, 4],
				[2, 5, 2, 6, 2, 5, 2, 4],
			],
		},
		{
			top: 0,
			low: 1,
			showPoint: true,
			fullWidth: true,
			plugins: [Chartist.plugins.tooltip()],
			axisY: {
				labelInterpolationFnc: function (value) {
					return value / 1 + "k";
				},
			},
			showArea: true,
		}
	);

	var chart = [chart];

	var sparklineLogin = function () {
		$("#sparklinedash").sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
			type: "bar",
			height: "30",
			barWidth: "4",
			resize: true,
			barSpacing: "5",
			barColor: "#84b8b8",
		});
		$("#sparklinedash2").sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
			type: "bar",
			height: "30",
			barWidth: "4",
			resize: true,
			barSpacing: "5",
			barColor: "#84b8b8",
		});
		$("#sparklinedash3").sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
			type: "bar",
			height: "30",
			barWidth: "4",
			resize: true,
			barSpacing: "5",
			barColor: "#11a0f8",
		});
		$("#sparklinedash4").sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
			type: "bar",
			height: "30",
			barWidth: "4",
			resize: true,
			barSpacing: "5",
			barColor: "#f33155",
		});
	};
	var sparkResize;
	$(window).on("resize", function (e) {
		clearTimeout(sparkResize);
		sparkResize = setTimeout(sparklineLogin, 500);
	});
	sparklineLogin();
});
let totalUsers =[];
let totalUsers2 =[];
let totalUsers3 =[];
let UserList ='';
var coun1 =0;
function users(){
	db.collection("NURSE").get().then((info)=>{
		const list = document.getElementById("allmyU")
		var count =0;
		var div="";
		var html="";
		var total = document.getElementById("toto")
		info.forEach(element => {
			count++;
			let user={myName:element.data().Name+" "+element.data().Surname,
				myGender:element.data().Gender,
				myCitizen:element.data().Citizen}
			totalUsers.push(user)
			div=`
			<tr>
												<td>${count}</td>
												<td class="txt-oflo nameListSearch" >
													${element.data().Name+" "+element.data().Surname}
												</td> 
												<td>${element.data().Gender}</td>
												
												<td>
													<span class="text-info"
														>${element.data().Citizen}</span
													>
												</td>
											</tr>
			`;
		total.innerHTML=count;
		html+=div;
		list.innerHTML=html;
		
		});
		
		document.getElementById("getInvoice").addEventListener('click',()=>{
			var pdfObject = jsPDFInvoiceTemplate.default(props); 
		})
		
		var props = {
			outputType: jsPDFInvoiceTemplate.OutputType.Save,
			returnJsPDFDocObject: true,
			fileName: "Total Users Report",
			orientationLandscape: false,
			compress: true,
		
			business: {
				name: "System H Group",
				address: "37 Bunting Road, Johannesburg, 2006",
				phone: "(+27) 069 11 11 111",
				email: "enquery@systemh.com",
				email_1: "customer@systemh.com",
				website: "www.systemh.co.za",
			},
			contact: {
				label: "Report issued for:",
				name: "All Users",
				
			},
			invoice: {
				
				headerBorder: false,
				tableBodyBorder: false,
				header: [
				  {
					title: "#", 
					style: { 
					  width: 10 
					} 
				  }, 
				  { 
					title: "Name & Surname",
					style: {
					  width: 80
					} 
				  }, 
				  { 
					title: "Gender",
					style: {
					  width: 30
					} 
				  }, 
				  { title: "Citizen"},
				  
				],
				table: Array.from(Array(totalUsers.length), (item, index)=>([
					index + 1,
					totalUsers[index].myName,
					totalUsers[index].myGender,
					totalUsers[index].myCitizen,
					
				])),
				
				invDescLabel: "Report Note",
				invDesc: "We reserve the right to discontinue or alter any or all of our website services, and to stop publishing our website, at any time in our sole discretion without notice or explanation; and save to the extent expressly provided otherwise in these terms and conditions, you will not be entitled to any compensation or other payment upon the discontinuance or alteration of any website services, or if we stop publishing the website.",
			},
			footer: {
				text: "The report is created on a computer and is valid without the signature and stamp.",
			},
			pageEnable: true,
			pageLabel: "Page ",
		};
		
	})
	db.collection("SANC").where("Status","==","Active").get().then((info)=>{
		var count =0;
		let IDs = [];
		var total = document.getElementById("acti")
		info.forEach(element => {
			count++;
			IDs.push(element.id)
		total.innerHTML=count

		});
		
		for (let index = 0; index < IDs.length; index++) {
			const element = IDs[index];
		
		
			db.collection("NURSE").doc(element).get().then((info)=>{
				console.log(info.data().Name);
				let userActive={myName:info.data().Name+" "+info.data().Surname,
				myGender:info.data().Gender,
				myCitizen:info.data().Citizen}
			
			
			
			db.collection("Admin").doc("96325").collection("Active").doc("96325"+index).set({userActive})
			
			})
			
		}
		
		
	})
	db.collection("SANC").where("Status","==","Submitted").get().then((info)=>{
		var count =0;
		let IDs = [];
		var total = document.getElementById("sub")
		info.forEach(element => {
			count++;
			IDs.push(element.id)
		total.innerHTML=count
		});
		for (let index = 0; index < IDs.length; index++) {
			const element = IDs[index];
		
		
			db.collection("NURSE").doc(element).get().then((info)=>{
				console.log(info.data().Name);
				let userActive={myName:info.data().Name+" "+info.data().Surname,
				myGender:info.data().Gender,
				myCitizen:info.data().Citizen}
			
			
			
			db.collection("Admin").doc("96325").collection("SuBApplication").doc("96325"+index).set({userActive})
			
			})
			
		}
		
	})


	
}


		
		function ActiveUser() {
			db.collection("Admin").doc("96325").collection("Active").get().then((info)=>{
				info.forEach(element => {
					let user=element.data().userActive
				totalUsers2.push(user)
						});
						console.log(totalUsers2);
					
			document.getElementById("getInvoice2").addEventListener('click',()=>{
				var pdfObject = jsPDFInvoiceTemplate.default(props); 
		
			})
			
			var props = {
				outputType: jsPDFInvoiceTemplate.OutputType.Save,
				returnJsPDFDocObject: true,
				fileName: "Total Active SANC NO. Users Report",
				orientationLandscape: false,
				compress: true,
			
				business: {
					name: "System H Group",
					address: "37 Bunting Road, Johannesburg, 2006",
					phone: "(+27) 069 11 11 111",
					email: "enquery@systemh.com",
					email_1: "customer@systemh.com",
					website: "www.systemh.co.za",
				},
				contact: {
					label: "Report issued for:",
					name: "All Users with Active SANC Number",
					
				},
				invoice: {
					
					headerBorder: false,
					tableBodyBorder: false,
					header: [
					  {
						title: "#", 
						style: { 
						  width: 10 
						} 
					  }, 
					  { 
						title: "Name & Surname",
						style: {
						  width: 80
						} 
					  }, 
					  { 
						title: "Gender",
						style: {
						  width: 30
						} 
					  }, 
					  { title: "Citizen"},
					  
					],
					table: Array.from(Array(totalUsers2.length), (item, index)=>([
						index + 1,
						totalUsers2[index].myName,
						totalUsers2[index].myGender,
						totalUsers2[index].myCitizen,
						
					])),
					
					invDescLabel: "Report Note",
					invDesc: "We reserve the right to discontinue or alter any or all of our website services, and to stop publishing our website, at any time in our sole discretion without notice or explanation; and save to the extent expressly provided otherwise in these terms and conditions, you will not be entitled to any compensation or other payment upon the discontinuance or alteration of any website services, or if we stop publishing the website.",
				},
				footer: {
					text: "The report is created on a computer and is valid without the signature and stamp.",
				},
				pageEnable: true,
				pageLabel: "Page ",
			};
		})
			
		}
		ActiveUser()

		function SubUser() {
			db.collection("Admin").doc("96325").collection("SuBApplication").get().then((info)=>{
				info.forEach(element => {
					let user=element.data().userActive
				totalUsers3.push(user)
						});
						
					
			document.getElementById("getInvoice3").addEventListener('click',()=>{
				var pdfObject = jsPDFInvoiceTemplate.default(props); 
		console.log(totalUsers3);
			})
			
			var props = {
				outputType: jsPDFInvoiceTemplate.OutputType.Save,
				returnJsPDFDocObject: true,
				fileName: "Total Submitted Users Report",
				orientationLandscape: false,
				compress: true,
			
				business: {
					name: "System H Group",
					address: "37 Bunting Road, Johannesburg, 2006",
					phone: "(+27) 069 11 11 111",
					email: "enquery@systemh.com",
					email_1: "customer@systemh.com",
					website: "www.systemh.co.za",
				},
				contact: {
					label: "Report issued for:",
					name: "All Users Submitted Application for SANC Number",
					
				},
				invoice: {
					
					headerBorder: false,
					tableBodyBorder: false,
					header: [
					  {
						title: "#", 
						style: { 
						  width: 10 
						} 
					  }, 
					  { 
						title: "Name & Surname",
						style: {
						  width: 80
						} 
					  }, 
					  { 
						title: "Gender",
						style: {
						  width: 30
						} 
					  }, 
					  { title: "Citizen"},
					  
					],
					table: Array.from(Array(totalUsers3.length), (item, index)=>([
						index + 1,
						totalUsers3[index].myName,
						totalUsers3[index].myGender,
						totalUsers3[index].myCitizen,
						
					])),
					
					invDescLabel: "Report Note",
					invDesc: "We reserve the right to discontinue or alter any or all of our website services, and to stop publishing our website, at any time in our sole discretion without notice or explanation; and save to the extent expressly provided otherwise in these terms and conditions, you will not be entitled to any compensation or other payment upon the discontinuance or alteration of any website services, or if we stop publishing the website.",
				},
				footer: {
					text: "The report is created on a computer and is valid without the signature and stamp.",
				},
				pageEnable: true,
				pageLabel: "Page ",
			};
		})
			
		}
		SubUser()
document.querySelector("#search-input").
addEventListener('input',filterList);

function filterList() {
	const searchInput = document.querySelector("#search-input");
	const filter = searchInput.value.toLowerCase();
	const listItems = document.querySelectorAll('nameListSearch');
	
	listItems.forEach((item)=>{
		let text = item.textContent;
		if(text.toLowerCase().includes(filter.toLowerCase())){
			item.style.display ="";
		}else{
			item.style.display="none"
		}
	})
}

function check() {
	var sanc =document.getElementById("search-input").value;
	console.log(sanc);
	db.collection("Admin").where("SANCNumber","==",sanc).get().then((snap)=>{
		
		snap.forEach(element => {
			console.log(element.data().SANCNumber);
			swal("Success", "SANC number is Valid","success")
		});
	})
	
}