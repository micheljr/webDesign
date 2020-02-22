const setup = () => {
	setupAantalLeerlingen();
	laadLijst("A");
	let letterButtons = document.getElementsByClassName("letterContainer");
	for (var i = 0; i < letterButtons.length; i++) {
		letterButtons[i].addEventListener("click", setupLeerlingen);
	}
	let studentDiv = document.getElementById("classList");
	studentDiv.addEventListener("click", showStudentDetail);
}

const setupAantalLeerlingen = () => {
	let letterButtons = document.getElementsByClassName("letterContainer");
	for (var i = 0; i < letterButtons.length; i++) {
		let aantal = 0;
		for (var j = 0; j < students.length; j++) {
			if (letterButtons[i].getAttribute("Data-value")===students[j].class) {
				aantal++;
			}
		}
		letterButtons[i].children[1].innerHTML = aantal;
	}
}

const setupLeerlingen = (event) => {
	laadLijst(event.currentTarget.getAttribute("Data-value"));
}

const laadLijst = (letter) => {
	let studentDetail = document.getElementById("studentDetail");
	studentDetail.innerHTML = "";
	let classList = document.getElementById("classList");
	classList.innerHTML = "";
	let student;
	for (var i = 0; i < students.length; i++) {
		if (students[i].class === letter) {
			student = maakStudent(students[i]);
			classList.appendChild(student);
		}
	}

	
}

const maakStudent = (student) => {
	let div = document.createElement("div");
	div.setAttribute("class", "student");

	let h1 = document.createElement("h1");
	h1.setAttribute("id", "student_"+student.id);
	h1.innerHTML = student.firstname + " " + student.lastname;
	h1.style.fontSize = "1.125em";
	h1.style.padding = "10px";

	div.appendChild(h1);
	if (student.score === null) {
		div.style.backgroundColor = "#912a65";
		div.style.color = "white";
	}
	return div;
}

/*const showStudentDetailDebug = (event) => {
	let id1 = event.target.getAttribute("id");
	let id2 = event.target.getAttribute("id").slice(8);
	console.log(students[parseInt(event.target.getAttribute("id").slice(8))-1])
	console.log(id1);
	console.log(id2);
}*/

const showStudentDetail = (event) => {
	let studentDetail = document.getElementById("studentDetail");
	studentDetail.innerHTML = "";
	let student = students[parseInt(event.target.getAttribute("id").slice(8))-1];

	let h1 = document.createElement("h1");
	h1.innerHTML = student.firstname + " " + student.lastname;

	let p = document.createElement("p");
	let link = document.createElement("a");
	link.innerHTML = student.email;
	link.setAttribute("href", "mailto:" + student.email);
	p.appendChild(link);
	
	let geb = document.createElement("p");
	geb.innerHTML = student.gebdate;

	let scoreNode;

	let score = student.score;

	if (score !== null) {
		scoreNode = document.createElement("p");
		scoreNode.innerHTML = "Score is: " + student.score;
		scoreNode.style.fontWeight = "bold";
		
		if (score >= 10) {
			scoreNode.style.color = "green";
		} else {
			scoreNode.style.color = "red";
		}
	} else {
		scoreNode = document.createElement("input");
		scoreNode.setAttribute("type", "button");
		scoreNode.setAttribute("value", "Enter Score");
		scoreNode.setAttribute("class", "enterScore");
	}
	scoreNode.style.marginTop = "20px";

	studentDetail.appendChild(h1);
	studentDetail.appendChild(link);
	
	studentDetail.appendChild(geb);
	studentDetail.appendChild(scoreNode);
}


document.addEventListener("load", setup());