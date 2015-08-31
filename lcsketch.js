var pickban;
var champs;
var teams;
var stats;

var input1;
var input2;
var focused;

var currWeek = 1; //1-9
var currDay = 1; //1-2
var currGame = 0; //1-90

var fwd;
var bkwd;

var cnv;
var div;

var mode = 0;//0 - > score screens

var maxNum;

var t1Name;//team info
var t2Name;
var t1Pic;
var t2Pic;
var t1R;//records
var t2R;
var graphImage;

var playerNames = [];
var champPictures = [];
var champPickOrder = [];
var bans = [];
var banPictures = [];
var c1s, c2s, c3s, c4s, c5s, c6s, c7s, c8s, c9s, c10s;//kda put in [k,d,a]
var giAll = [];
var giAllPaths = [];

var teamDD1, teamDD2;


var dd1Value = "ALL";
var dd2Value = "ALL";
var dd1Value2 = "ALL";
var dd2Value2 = "ALL";

var q = 0;

var gameList;//table of games
var banImg;

var player;

var playersrc;

var spoiler = false;//true - > spoilers off
var spoilerBtn;

var selectDDNum = 0;
var champInput;
var minNumInput2;
var minNumInput;
var list1Max = 0;

var selectedString;
var savedSelectedString = "";
var selectedImage;

var clrBtn;

var closeDD;
var regionDD;
var regionDD2;
var modeDD;
var roleDD;

var bg;

var regionValue;
var reg;
var crown;
var top10 = [];

var pickBanData;

var top10 = [];
var visitedTop10 = [];

var currReg2;
var currRole;
var currMin;

var maxRounded = 0;

var end = false;

var euMax = 91;
var naMax = 93
var totalMax = 91 + 93;

var changeMax;

var dict;

var minDayInput;
var maxDayInput;

var minDay;
var maxDay;

var t1Top = [];
var t2Top = [];
var t1Jun = [];
var t2Jun = [];
var t1Mid = [];
var t2Mid = [];
var t1Adc = [];
var t2Adc = [];
var t1Sup = [];
var t2Sup = [];

var t1TopI = [];
var t1JunI = [];
var t1MidI = [];
var t1AdcI = [];
var t1SupI = [];
var t2TopI = [];
var t2JunI = [];
var t2MidI = [];
var t2AdcI = [];
var t2SupI = [];

var t1TopS = [];
var t1JunS = [];
var t1MidS = [];
var t1AdcS = [];
var t1SupS = [];
var t2TopS = [];
var t2JunS = [];
var t2MidS = [];
var t2AdcS = [];
var t2SupS = [];


var team1 = [];
var team2 = [];

var playerData;
var banData;
var bMax1;
var bMax2;

var team1Bans = [];
var team1BansVs = [];
var team1BansP = [];
var team1BansVsP = [];
var team2Bans = [];
var team2BansVs = [];
var team2BansP = [];
var team2BansVsP = [];

var modeFix = 0;

function preload() {
	champs = loadTable("data/champs.tsv", "tsv", "header");
	pickban = loadTable("data/pickban.tsv", "tsv", "header");
	teams = loadTable("data/teams.tsv", "tsv", "header");
	stats = loadTable("data/stats.tsv", "tsv", "header");
	gameList = loadTable("data/empty.tsv", "tsv", "header");
	banImg = loadImage("pics/ban.png");
	bg = loadImage("pics/bg.jpg");
	crown = loadImage("pics/crown.png");
	pickBanData = loadTable("data/emptyPB.tsv", "tsv", "header");
	playerData = loadTable("data/empty3.tsv", "tsv", "header");
	banData = loadTable("data/emptyBan.tsv", "tsv", "header");
}

function flipSpoilerBtn() {
	if (spoiler == false) {
		document.getElementById("spBtn").parentNode.removeChild(document.getElementById("spBtn")); //removes button
		spoilerBtn = createButton("Disable Spoilers");
		spoilerBtn.position(35, 640);
		spoilerBtn.attribute("id", "spBtn");
		spoilerBtn.mousePressed(flipSpoilerBtn);
	}
	else {
		document.getElementById("spBtn").parentNode.removeChild(document.getElementById("spBtn")); //removes button
		spoilerBtn = createButton("Enable Spoilers");
		spoilerBtn.position(35, 640);
		spoilerBtn.attribute("id", "spBtn");
		spoilerBtn.mousePressed(flipSpoilerBtn);
	}
	spoiler = !spoiler;
	calcRecords();
}
function setup() {
	cnv = createCanvas(960, 684);
	//cnv.parent("myStuff");
	div = createDiv("");
	//div.id("theID");
	cnv.parent(div);
	spoilerBtn = createButton("Enable Spoilers");
	spoilerBtn.position(35, 640);
	spoilerBtn.attribute("id", "spBtn");
	fwd = createButton("->");
	fwd.attribute("id", "fwd");
	modeDD = document.getElementById("modeDD");
	teamDD1 = document.getElementById("teamDD1");
	teamDD2 = document.getElementById("teamDD2");
	fwd.position(115, 610);
	bkwd = createButton("<-");
	bkwd.attribute("id", "bkwd");
	bkwd.position(35, 610);

	champInput = createInput("");
	champInput.attribute("id", "champInput");
	champInput.position(35, 420);
	champInput.size(100, 22);

	minNumInput2 = createSlider(0, 110, 0);
	minNumInput2.attribute("id", "minNumInput");
	minNumInput2.position(40, 420);

	minDayInput = createSlider(1, 9, 0);
	minDayInput.attribute("id", "minDayInput");
	minDayInput.position(40, 480);
	maxDayInput = createSlider(1, 9, 0);
	maxDayInput.attribute("id", "maxDayInput");
	maxDayInput.position(40, 500);

	clrBtn = createButton("Clear Champ Filter");
	clrBtn.position(35, 580);
	clrBtn.mousePressed(clearChamp);
	clrBtn.attribute("id", "clrBtn");

	fwd.mousePressed(next);
	bkwd.mousePressed(prev);
	spoilerBtn.mousePressed(flipSpoilerBtn);
	document.getElementById("teamDD1").selectedIndex = 0;
	document.getElementById("teamDD2").selectedIndex = 0;
	document.getElementById("team2DD1").selectedIndex = 0;
	document.getElementById("team2DD2").selectedIndex = 0;
	document.getElementById("regionDD").selectedIndex = 0;


	regionDD = document.getElementById("regionDD");
	reg = regionDD.options[regionDD.selectedIndex].value;
	closeDD = false;
	resetTable();
	newScore();
	maxNum = gameList.getRowCount();
	//banImg.resize(44, 44);
	banImg.resize(60,60);

	player = document.getElementById("player");
	player.style.zIndex = 2;

	modeDD.selectedIndex = 0;
	crown.resize(80, 80);

	fwd = document.getElementById("fwd");
	bkwd = document.getElementById("bkwd");
	clrBtn = document.getElementById("clrBtn");
	spoilerBtn = document.getElementById("spBtn");
	champInput = document.getElementById("champInput");
	minNumInput = document.getElementById("minNumInput");
	regionDD2 = document.getElementById("regionDD2");
	roleDD = document.getElementById("roleDD");

	minDayInput = document.getElementById("minDayInput");
	maxDayInput = document.getElementById("maxDayInput");

	regionDD2.value = "ALL";
	currReg2 = regionDD2.value;
	currRole = roleDD.value;
	minNumInput.value = 0;

	minDayInput.value = 0;
	maxDayInput.value = 9;
	minDay = 0;
	maxDay = 9;

	currMin = minNumInput.value;
	regionValue = regionDD.options[regionDD.selectedIndex].value;
	//calculateTeams();
	calculatePBGraph();
	calculateBanChart();
}
function fixRegion() {
	if (regionValue != reg) {
		if (regionValue == "NA") {
			document.getElementById("teamDD1").selectedIndex = 0;
			document.getElementById("teamDD2").selectedIndex = 0;
		}
		else {
			document.getElementById("team2DD1").selectedIndex = 0;
			document.getElementById("team2DD2").selectedIndex = 0;
		}
		reg = regionValue;
	}
}

function draw() {
	background(220);
	regionValue = regionDD.options[regionDD.selectedIndex].value;
	fixRegion();
	//image(bg,0,0); //other background image
	
	fill(255);
	rect(0, 0, width, height / 10);
	mode = modeDD.selectedIndex;
	drawUI();
	if (mode == 0) {
		if (player.style.zIndex != 2) {
			player.style.zIndex = 2;
			spoilerBtn.style.zIndex = 2;
			champInput.style.zIndex = 2;
			clrBtn.style.zIndex = 2;
			regionDD2.style.zIndex = -2;
			regionDD.style.zIndex = 2;
			teamDD1.style.zIndex = 2;
			teamDD2.style.zIndex = 2;
			roleDD.style.zIndex = -2;
			minNumInput.style.zIndex = -2;
			minDayInput.style.zIndex = -2;
			maxDayInput.style.zIndex = -2;
			fwd.style.zIndex = 2;
			bkwd.style.zIndex = 2;


			regionDD.selectedIndex = 0;
			modeFix = 0;
		}
		if (gameList.getRowCount() > 0) {
			if ((teams.findRow(gameList.getRow(currGame).getString(2), "Tag").getString(1) != t1Name) ||
				(teams.findRow(gameList.getRow(currGame).getString(3), "Tag").getString(1) != t2Name)) {
				newScore();
			}
		}
		dd1Value = teamDD1.options[teamDD1.selectedIndex].value;
		dd2Value = teamDD2.options[teamDD2.selectedIndex].value;

		resetTable();
		maxNum = gameList.getRowCount();
		if (gameList.getRowCount() == 0) {
			currGame = 0;
		}
		showScore();
		mouseOver();
		fill(0);
		document.body.onmousedown = function () {
			q++;
			if (document.activeElement.id == "teamDD1") {
				currGame = 0;
			}
			if (document.activeElement.id == "teamDD2") {
				currGame = 0;
			}
		}
		if (document.activeElement.id == "champInput") {
			createTypeBox(6, 424);
		}
		if (champInput.value == "") {
			savedSelectedString = "";
			champInput.value = "";
		}
		checkRegion();
		if (currGame > gameList.getRowCount()) {
			currGame = 0;
		}
	}
	else if (mode == 1) {
		if (minDayInput.style.zIndex != 2) {
			player.style.zIndex = -2;
			spoilerBtn.style.zIndex = -2;
			champInput.style.zIndex = -2;
			clrBtn.style.zIndex = -2;
			regionDD2.style.zIndex = 2;
			regionDD.style.zIndex = -2;
			teamDD1.style.zIndex = -2;
			teamDD2.style.zIndex = -2;
			roleDD.style.zIndex = 2;
			roleDD.selectedIndex = 0;
			minNumInput.style.zIndex = 2;
			regionDD2.selectedIndex = 0;
			minDayInput.style.zIndex = 2;
			maxDayInput.style.zIndex = 2;
			modeFix = 0;
			fwd.style.zIndex = 2;
			bkwd.style.zIndex = 2;
		}
		if (currReg2 != regionDD2.value) {
			visitedTop10 = [];
			calculatePBGraph();
			currReg2 = regionDD2.value;

		}
		if (currRole != roleDD.value) {
			visitedTop10 = [];
			calculatePBGraph();
			currRole = roleDD.value;
		}
		if (currMin != minNumInput.value) {
			visitedTop10 = [];
			calculatePBGraph();
			currMin = minNumInput.value;
		}
		if (minDay != parseInt(minDayInput.value)) {
			visitedTop10 = [];
			calculatePBGraph();
			minDay = parseInt(minDayInput.value);
		}
		if (maxDay != parseInt(maxDayInput.value)) {
			visitedTop10 = [];
			calculatePBGraph();
			maxDay = parseInt(maxDayInput.value);
		}
		drawMainGraph();
	}
	else if (mode == 2) {
		checkRegion();
		
		spoilerBtn.style.zIndex = -2;//FIX ME
		
		if (modeFix == 0) {//minDayInput.style.zIndex != -2) {
			player.style.zIndex = -2;
			spoilerBtn.style.zIndex = -2;
			champInput.style.zIndex = -2;
			clrBtn.style.zIndex = -2;
			regionDD2.style.zIndex = -2;
			regionDD.style.zIndex = 2;
			teamDD1.style.zIndex = 2;
			teamDD2.style.zIndex = 2;
			roleDD.style.zIndex = -2;
			minNumInput.style.zIndex = -2;
			minDayInput.style.zIndex = -2;
			maxDayInput.style.zIndex = -2;
			fwd.style.zIndex = -2;
			bkwd.style.zIndex = -2;

			regionDD2.selectedIndex = 0;
			roleDD.selectedIndex = 0;
			calculateTeams();
			modeFix = 1;
		}
		if (dd1Value != teamDD1.options[teamDD1.selectedIndex].value) {
			calculateTeams();
		}
		if (dd2Value != teamDD2.options[teamDD2.selectedIndex].value) {
			calculateTeams();
		}
		dd1Value = teamDD1.options[teamDD1.selectedIndex].value;
		dd2Value = teamDD2.options[teamDD2.selectedIndex].value;
		showTeams();
	}
	if (document.activeElement.id == "maxDayInput" && parseInt(maxDayInput.value) <= parseInt(minDayInput.value)) {
		var tempM = parseInt(maxDayInput.value);
		minDayInput.value = tempM;
	}
	if (document.activeElement.id == "minDayInput" && parseInt(maxDayInput.value) <= parseInt(minDayInput.value)) {
		var tempM = parseInt(minDayInput.value);
		maxDayInput.value = tempM;
	}
	if (giAll[0] == undefined) {
		prev();
	}
}

function checkRegion() {  //improve runtime here?
	if (document.getElementById("regionDD").value == "EU") {
		document.getElementById("teamDD1").style.zIndex = 2;
		document.getElementById("teamDD2").style.zIndex = 2;
		document.getElementById("team2DD1").style.zIndex = -2;
		document.getElementById("team2DD2").style.zIndex = -2;
		teamDD1 = document.getElementById("teamDD1");
		teamDD2 = document.getElementById("teamDD2");
	}
	else {
		document.getElementById("teamDD1").style.zIndex = -2;
		document.getElementById("teamDD2").style.zIndex = -2;
		document.getElementById("team2DD1").style.zIndex = 2;
		document.getElementById("team2DD2").style.zIndex = 2;
		teamDD1 = document.getElementById("team2DD1");
		teamDD2 = document.getElementById("team2DD2");
	}
}
function mouseOver() {
	if (document.activeElement.id == "champInput" && mouseX >= 6 && mouseX <= 145 && mouseY >= 414 && mouseY <= 414 + (list1Max * 12)) {
		var tempY = Math.floor((mouseY - 414) / 12);
		selectDDNum = tempY;
	}

}
function drawUI() {
	push();
	textSize(28);
	fill(0);
	strokeWeight(4);
	line(1, 1, 1, height - 1);
	line(1, 1, width - 1, 0);
	line(1, height - 1, width - 1, height - 1);
	line(width - 1, 1, width - 1, height - 1);
	line(1, height / 10, width - 1, height / 10);
	if (mode == 0) {
		if (currDay != 3) {
			var st = document.getElementById("regionDD").value + " LCS Week : " + currWeek + " Day: " + currDay;
		}
		else {// tiebreakers currDay = 3
			var st = document.getElementById("regionDD").value + "LCS Week : " + currWeek + " Day: " + 2 + " Tiebreakers";
		}
		text(st, 512 - textWidth(st) / 2, 35);
		textSize(13);
		if (gameList.getRowCount() != 0) {
			var st2 = "Game : " + (currGame + 1) + " / " + (maxNum);
		}
		else {
			var st2 = "Game : 0 / 0";
		}
		text(st2, 512 - textWidth(st2) / 2, 62);
		textSize(16);
		textStyle(BOLD);
		text("Patch : ", 560, 400);
		text("Disabled Champs : ", 560, 430);
		if (currGame < gameList.getRowCount() && gameList.getRowCount() > 0) {
			text(gameList.getRow(currGame).getString(13), 710, 400);
			textSize(12);
			if (gameList.getRow(currGame).getString(14).indexOf("Week") == -1) {
				text("None", 710, 430);
			}
			else {
				text(gameList.getRow(currGame).getString(14), 710, 430);
			}
		}

		strokeWeight(2);
		line(150, height / 10, 150, height);
		push()
		textSize(20);
		text("Filters", 16 + textWidth("Filters") / 2, 280);
		textSize(16);
		textStyle(BOLD);
		text("Teams :", 6, 334)

		strokeWeight(1);
		fill(76, 0, 153);// selection colors(purple ,green );
		rect(64, 345, 10, 10);
		fill(0, 153, 0);
		rect(136, 345, 10, 10);
		strokeWeight(2);

		fill(0);
		text("Champion :", 6, 384)
		textStyle(BOLD);
		textSize(20);
		text("Youtube VOD ", 550 + textWidth("Youtube VOD "), 94);
		strokeWeight(3);
		line(550, 104, width, 104);

		if (savedSelectedString != "") {
			selectedImage.resize(20, 20);
			image(selectedImage, 95, 368);
		}

	}
	else if (mode == 2 || mode == 1) {
		textStyle(BOLD);
		//var st = "Detailed " + document.getElementById("regionDD").value + " LCS Statistics";
		var st = "Detailed LCS Statistics";
		text(st, 480 - textWidth(st) / 2, 35);
		if (mode == 2) {
			line(555, height / 10, 555, 700);
			strokeWeight(1);
			fill(76, 0, 153);// selection colors(purple,green);
			rect(64, 345, 10, 10);
			fill(0, 153, 0);
			rect(136, 345, 10, 10);
			fill(0);
		}
		if (mode == 1) {
			textSize(20);
			var st2 = "Champion Pick/Ban/Win Rates";
			text(st2, 555 - textWidth(st2) / 2, 125);
			textSize(16);
			var st3 = "Champion";
			text(st3, 555 - textWidth(st3) / 2, 660);
			push();
			translate(215, 420);
			rotate(-PI / 2.0);
			translate(-1 * (215), -420);
			text("Percent", 215, 420);
			pop();
			//fill(113, 150, 180);
			fill(173, 216, 230);
			strokeWeight(1);
			rect(8, 390, 136, 20);
			rect(8, 445, 136, 46);
			//fill(173, 216, 230);
			fill(255);
			rect(116, 367, 30, 20);
			rect(106, 413, 40, 20);
			fill(0);
			text("Role :", 6, 334)
			text("Min. Picked #:", 6, 384)
			text(minNumInput.value, 6 + textWidth("Min. Picked # :") + textWidth("155") - textWidth(minNumInput.value), 384);
			text("Week Range: ", 6, 430);
			var tString = minDay + " - " + maxDay;
			text(tString, 6 + textWidth("Week Range: "), 430);
			textSize(10);
			text("Min", 85 - textWidth("Min"), 456);
			text("Max", 85 - textWidth("Min"), 474);
		}
	}
	textSize(20);
	textStyle(BOLD);
	//fill(255, 203, 203);//red
	//rect(350, 68, 200, 36);
	//fill(203, 203, 255);//blue
	//rect(150, 68, 200, 36);
	strokeWeight(3);
	text("Mode", 26 + textWidth("Mode") / 2, 94);
	line(0, 104, 150, 104);
	//strokeWeight(2);
	line(0, 260, 150, 260);
	line(0, 284, 150, 284);
	line(150, height / 10, 150, height);
	text("Filters", 16 + textWidth("Filters") / 2, 280);
	textSize(16);
	text("Region :", 6, 304);
	if (mode == 0 || mode == 2) {
		text("Teams :", 6, 334);
	}
	pop();

}
function setMax() {
	var gp;//games played per day
	var tb = 0;//tibearkers
	if (regionDD2.value == "ALL") {
		gp = 20;
	}
	else {
		gp = 10;
	}
	if (minDay <= 9 && maxDay >= 9) { //tiebreaker difference NA : 3, EU : 1
		if (regionDD2.value == "ALL") {
			tb += 4;
		}
		else if (regionDD2.value == "NA") {
			tb += 3;
		}
		else if (regionDD2.value == "EU") {
			tb += 1;
		}
	}

	changeMax = (((maxDay - minDay) + 1) * gp) + tb;
}
function calculateBanChart() {
	//banData,bMax1,bMax2
	var b = 0;
	var bans1;
	var bans2;
	var combinedBans;
	var b1, b2, b3, b4, b5, b6;
	var currChamp;
	//var tempBool = false;
	var c, d;
	while (b < pickban.getRowCount()) {
		var tempR = pickban.getRow(b);
		var foundRows = banData.findRows(tempR.getString(2), "Team");//array of rows
		var tempTeam1 = tempR.getString(2);
		var tempTeam2 = tempR.getString(3);
		var foundRows2 = banData.findRows(tempR.getString(3), "Team");
		bans1 = tempR.getString(4).split(',');
		bans2 = tempR.getString(5).split(',');
		combinedBans = bans1.concat(bans2);
		d = 0;
		while (d < combinedBans.length) {
			currChamp = combinedBans[d];
			c = 0;
			if (currChamp != "NOBAN") {
				if (foundRows != null) {
					var tempQ = 0;
					while (c < foundRows.length) {
						if (foundRows[c].getString(1) == currChamp) {
							if (d <= 2) {
								foundRows[c].setNum(2, foundRows[c].getNum(2) + 1);
								tempQ += 2;
							}
							else if (d <= 5) {
								foundRows[c].setNum(3, foundRows[c].getNum(3) + 1);
								tempQ += 2;
							}
						}
						c++;
					}
					c = 0;
					while (c < foundRows2.length) {
						if (foundRows2[c].getString(1) == currChamp) {
							if (d <= 2) {
								foundRows2[c].setNum(3, foundRows2[c].getNum(3) + 1);
								tempQ++;
							}
							else if (d <= 5) {
								foundRows2[c].setNum(2, foundRows2[c].getNum(2) + 1);
								tempQ++;
							}
						}
						c++;
					}
					if (tempQ == 2) {
						var newRow = banData.addRow();
						newRow.setString(0, tempTeam2);
						newRow.setString(1, currChamp);
						if (d <= 2) {
							newRow.setNum(2, 0);
							newRow.setNum(3, 1);
						}
						else if (d <= 5) {
							newRow.setNum(3, 0);
							newRow.setNum(2, 1);
						}
					}
					else if (tempQ == 1) {
						var newRow2 = banData.addRow();
						newRow2.setString(0, tempTeam1);
						newRow2.setString(1, currChamp);
						if (d <= 2) {
							newRow2.setNum(2, 1);
							newRow2.setNum(3, 0);
						}
						else if (d <= 5) {
							newRow2.setNum(3, 1);
							newRow2.setNum(2, 0);
						}
					}
					if (tempQ == 0) {
						var newRow = banData.addRow();
						newRow.setString(0, tempTeam1);
						newRow.setString(1, currChamp);
						if (d <= 2) {
							newRow.setNum(2, 1);
							newRow.setNum(3, 0);
						}
						else if (d <= 5) {
							newRow.setNum(3, 1);
							newRow.setNum(2, 0);
						}
						var newRow2 = banData.addRow();
						newRow2.setString(0, tempTeam2);
						newRow2.setString(1, currChamp);
						if (d <= 2) {
							newRow2.setNum(2, 0);
							newRow2.setNum(3, 1);
						}
						else if (d <= 5) {
							newRow2.setNum(3, 0);
							newRow2.setNum(2, 1);
						}
					}
				}
			}
			d++;
		}
		b++;
	}
	//team1Bans,team1BansVs,team1BansP,team1BansVsP
	//saveTable(banData,"test.tsv");
}
function top10Ban() {

	team1Bans = [];
	team1BansP = [];
	team1BansVs = [];
	team1BansVsP = [];
	team2Bans = [];
	team2BansP = [];
	team2BansVs = [];
	team2BansVsP = [];

	var max;
	var ind;
	while (team1Bans.length < 10) { //team1Bans
		var b = 0;
		max = 0;
		ind = -1;
		while (b < banData.getRowCount()) {
			var tempR = banData.getRow(b);
			if (tempR.getNum(2) > max && team1Bans.indexOf(b) == -1 && tempR.getString(0) == teamDD1.value) {
				max = tempR.getNum(2);
				ind = b;
			}
			b++;
		}
		if (ind == -1) {
			break;
		}
		else {
			team1Bans.push(ind);
			team1BansP.push(loadImage(champs.findRow(banData.getRow(ind).getString(1), "Name").getString(1)));
		}
	}
	while (team1BansVs.length < 10) { //team1BansVs
		var b = 0;
		max = 0;
		ind = -1;
		while (b < banData.getRowCount()) {
			var tempR = banData.getRow(b);
			if (tempR.getNum(3) > max && team1BansVs.indexOf(b) == -1 && tempR.getString(0) == teamDD1.value) {
				max = tempR.getNum(3);
				ind = b;
			}
			b++;
		}
		if (ind == -1) {
			break;
		}
		else {
			team1BansVs.push(ind);
			team1BansVsP.push(loadImage(champs.findRow(banData.getRow(ind).getString(1), "Name").getString(1)));
		}
	}

	while (team2Bans.length < 10) { //team2Bans
		var b = 0;
		max = 0;
		ind = -1;
		while (b < banData.getRowCount()) {
			var tempR = banData.getRow(b);
			if (tempR.getNum(2) > max && team2Bans.indexOf(b) == -1 && tempR.getString(0) == teamDD2.value) {
				max = tempR.getNum(2);
				ind = b;
			}
			b++;
		}
		if (ind == -1) {
			break;
		}
		else {
			team2Bans.push(ind);
			team2BansP.push(loadImage(champs.findRow(banData.getRow(ind).getString(1), "Name").getString(1)));
		}
	}
	while (team2BansVs.length < 10) { //team2BansVs
		var b = 0;
		max = 0;
		ind = -1;
		while (b < banData.getRowCount()) {
			var tempR = banData.getRow(b);
			if (tempR.getNum(3) > max && team2BansVs.indexOf(b) == -1 && tempR.getString(0) == teamDD2.value) {
				max = tempR.getNum(3);
				ind = b;
			}
			b++;
		}
		if (ind == -1) {
			break;
		}
		else {
			team2BansVs.push(ind);
			team2BansVsP.push(loadImage(champs.findRow(banData.getRow(ind).getString(1), "Name").getString(1)));
		}
	}
}
function showBanChart() {
	strokeWeight(1);
	textSize(13);
	fill(0);
	//team1
	text("Banned: ", 160, 118);
	text("Banned VS: ", 352.5, 118);

	fill(255);
	rect(160, 120, 385, 66);
	line(352.5, 120, 352.5, 120 + 66);

	line(348, 122, 357, 122);//18 tick mark
	line(348, 144.5, 357, 144.5);
	line(160, 167, 545, 167);


	line(350, 159.5, 355, 159.5);//smaller tick marks for 2nd ban graph
	line(350, 152, 355, 152);
	line(350, 137.5, 355, 137);
	line(350, 129.5, 355, 129.5);
		
	//line(755,159.5,760,159.5);//smaller tick marks for 2nd ban graph
	//line(755,152,760,152);
	//line(755,137,760,137);
	//line(755,129.5,760,129.5);
	
	
	//line()
	//team2
	fill(0);
	text("Banned: ", 565, 118);
	text("Banned VS: ", 757.5, 118);
	fill(255);
	rect(565, 120, 385, 66);
	line(757.5, 120, 757.5, 120 + 66);
	line(753, 122, 761, 122);//18 tick mark
	line(753, 144.5, 761, 144.5);

	line(755, 159.5, 760, 159.5);//smaller tick marks for 2nd ban graph
	line(755, 152, 760, 152);
	line(755, 137, 760, 137);
	line(755, 129.5, 760, 129.5);

	line(565, 167, 950, 167);

	fill(0);
	textSize(10);
	text("18", 347 - textWidth("18"), 128)
	text("18", 752 - textWidth("18"), 128)
	text("9", 347 - textWidth("9"), 148);
	text("9", 752 - textWidth("9"), 148);
	text("0", 347 - textWidth("0"), 171);
	text("0", 752 - textWidth("0"), 171);

	var b = 0;
	fill(255, 165, 0);//orange for ban charts
	var height = 0;
	while (b < team1Bans.length) {
		var tempim = team1BansP[b];//.resize(20,20);
		tempim.resize(18, 18);
		image(tempim, 160 + (18 * b), 168);

		height = banData.getRow(team1Bans[b]).getNum(2) * 2.527778;//rounded~~ orange ban bars
		rect(164.5 + (18 * b), 167 - height, 9, height);

		b++;
	}
	b = 0;
	while (b < team1BansVs.length) {
		var tempim = team1BansVsP[b];//.resize(20,20);
		tempim.resize(18, 18);
		image(tempim, 365 + (18 * b), 168);

		height = banData.getRow(team1BansVs[b]).getNum(3) * 2.527778;//rounded~~ orange ban bars
		rect(369.5 + (18 * b), 167 - height, 9, height);

		b++;
	}
	b = 0;
	while (b < team2Bans.length) {
		var tempim = team2BansP[b];//.resize(20,20);
		tempim.resize(18, 18);
		image(tempim, 565 + (18 * b), 168);

		height = banData.getRow(team2Bans[b]).getNum(2) * 2.527778;//rounded~~ orange ban bars
		rect(569.5 + (18 * b), 167 - height, 9, height);

		b++;
	}
	b = 0;
	while (b < team2BansVs.length) {
		var tempim = team2BansVsP[b];//.resize(20,20);
		tempim.resize(18, 18);
		image(tempim, 770 + (18 * b), 168);

		height = banData.getRow(team2BansVs[b]).getNum(3) * 2.527778;//rounded~~ orange ban bars
		rect(774.5 + (18 * b), 167 - height, 9, height);

		b++;
	}
}
function smallGraph(x, y, z) {
	var newY = 97 * y;
	var newX = 405 * x;
	var b = 0;
	var tempH = 0;
	var lMax = 0;
	textSize(9);
	fill(255);
	rect(160 + newX, 224 + newY, 50, 76);
	rect(210 + newX, 224 + newY, 335, 76);
	fill(0);
	line(210 + newX, 275 + newY, 210 + 335 + newX, 275 + newY);
	line(210 + newX, 288 + newY, 210 + 335 + newX, 288 + newY);
	line(250 + newX, 224 + newY, 250 + newX, 300 + newY);
	line(248 + newX, 226 + newY, 252 + newX, 226 + newY);//100% tick mark
	line(248 + newX, 251 + newY, 252 + newX, 251 + newY);//50% tick mark
	text("0%", 234 + newX, 274 + newY);
	text("50%", 228 + newX, 256 + newY);
	text("100%", 222 + newX, 234 + newY);
	textSize(10);
	text("Pick: ", 214 + newX, 286 + newY);
	text("K/D/A: ", 214 + newX, 298 + newY);
	text("Overall", 164 + newX, 234 + newY);
	text("K/D/A:", 164 + newX, 244 + newY);

	text("W/L:", 164 + newX, 264 + newY);

	text("Games", 164 + newX, 274 + newY);
	text("Played:", 164 + newX, 284 + newY);
	var temp;
	//0-> k,1->d,2->a,3->w,4->l
	if (z == "Top1") {
		lMax = t1Top.length;
		temp = t1TopS;
	}
	if (z == "Top2") {
		lMax = t2Top.length;
		temp = t2TopS;
	}
	if (z == "Mid1") {
		lMax = t1Mid.length;
		temp = t1MidS;
	}
	if (z == "Mid2") {
		lMax = t2Mid.length;
		temp = t2MidS;
	}
	if (z == "Jun1") {
		lMax = t1Jun.length;
		temp = t1JunS;
	}
	if (z == "Jun2") {
		lMax = t2Jun.length;
		temp = t2JunS;
	}
	if (z == "Adc1") {
		lMax = t1Adc.length;
		temp = t1AdcS;
	}
	if (z == "Adc2") {
		lMax = t2Adc.length;
		temp = t2AdcS;
	}
	if (z == "Sup1") {
		lMax = t1Sup.length;
		temp = t1SupS;
	}
	if (z == "Sup2") {
		lMax = t2Sup.length;
		temp = t2SupS;
	}
	var kda = ((temp[0] + temp[2]) / temp[1]).toFixed(2);
	var w = temp[3];
	var l = temp[4];
	var gp = w + l;
	if (temp.length > 0) {
		text(kda, 164 + newX, 254 + newY);
		line(164 + newX, 255 + newY, 164 + newX + textWidth(kda), 255 + newY);

		text(w + "-" + l, 166 + newX + textWidth("W/L:"), 264 + newY);
		line(164 + newX + textWidth("W/L: "), 265 + newY, 166 + newX + textWidth(w + "-" + l + "W/L:"), 265 + newY);

		text(gp, 164 + newX, 294 + newY);
		line(164 + newX, 295 + newY, 164 + newX + textWidth(gp), 295 + newY);
	}

	while (b < lMax) {
		if (z == "Top1") {
			tempR = playerData.getRow(t1Top[b]);
			t1TopI[b].resize(24, 24);
			image(t1TopI[b], 250 + (60 * b), 276 + newY);
		}
		if (z == "Jun1") {
			tempR = playerData.getRow(t1Jun[b]);
			t1JunI[b].resize(24, 24);
			image(t1JunI[b], 250 + (60 * b), 276 + newY);
		}
		if (z == "Mid1") {
			tempR = playerData.getRow(t1Mid[b]);
			t1MidI[b].resize(24, 24);
			image(t1MidI[b], 250 + (60 * b), 276 + newY);
		}
		if (z == "Adc1") {
			tempR = playerData.getRow(t1Adc[b]);
			t1AdcI[b].resize(24, 24);
			image(t1AdcI[b], 250 + (60 * b), 276 + newY);
		}
		if (z == "Sup1") {
			tempR = playerData.getRow(t1Sup[b]);
			t1SupI[b].resize(24, 24);
			image(t1SupI[b], 250 + (60 * b), 276 + newY);
		}
		if (z == "Top2") {
			tempR = playerData.getRow(t2Top[b]);
			t2TopI[b].resize(24, 24);
			image(t2TopI[b], 250 + (60 * b) + newX, 276 + newY);
		}
		if (z == "Jun2") {
			tempR = playerData.getRow(t2Jun[b]);
			t2JunI[b].resize(24, 24);
			image(t2JunI[b], 250 + (60 * b) + newX, 276 + newY);
		}
		if (z == "Mid2") {
			tempR = playerData.getRow(t2Mid[b]);
			t2MidI[b].resize(24, 24);
			image(t2MidI[b], 250 + (60 * b) + newX, 276 + newY);
		}
		if (z == "Adc2") {
			tempR = playerData.getRow(t2Adc[b]);
			t2AdcI[b].resize(24, 24);
			image(t2AdcI[b], 250 + (60 * b) + newX, 276 + newY);
		}
		if (z == "Sup2") {
			tempR = playerData.getRow(t2Sup[b]);
			t2SupI[b].resize(24, 24);
			image(t2SupI[b], 250 + (60 * b) + newX, 276 + newY);
		}
		fill(0);
		text(tempR.getNum(3), 278 + (60 * b) + newX, 286 + newY);
		text(((tempR.getNum(4) + tempR.getNum(6)) / tempR.getNum(5)).toFixed(2), 278 + (60 * b) + newX, 298 + newY);
		tempH = 49 * (tempR.getNum(7) / (tempR.getNum(3)));//the height of the bar 50->49
		fill(60, 60, 190);
		rect(250 + (60 * b) + newX, 276 - tempH + newY - 1, 11, tempH);
		tempH = 49 * (tempR.getNum(8) / (tempR.getNum(3)));//the height of the second bar
		fill(190, 60, 60);
		rect(262 + (60 * b) + newX, 276 - tempH + newY - 1, 11, tempH);
		b++;
	}
}
function showTeams() {
	fill(0);
	var b = 0;
	textSize(20);
	if (dd1Value != "ALL") {
		var tempt1 = teams.findRow(dd1Value, "Tag").getString(1);
	}
	else {
		tempt1 = "(Nothing Selected)";
	}
	if (dd2Value != "ALL") {
		var tempt2 = teams.findRow(dd2Value, "Tag").getString(1);
	}
	else {
		tempt2 = "(Nothing Selected)";
	}

	strokeWeight(3);//highlight green/purple
	fill(204, 153, 255);
	rect(150, 68, 404, 36);
	fill(204, 255, 153);
	rect(555, 68, 402, 36);

	fill(0);
	text(tempt1, 160, 96);
	text(tempt2, 565, 96);
	if (t1Pic != null) {
		t1Pic.resize(30, 30);
		image(t1Pic, 515, 72);
	}
	if (t2Pic != null) {
		t2Pic.resize(30, 30);
		image(t2Pic, 920, 72);
	}
	strokeWeight(3);
	line(150, 104, width, 104);
	textSize(16);
	strokeWeight(1);
	while (b < team1.length) {//names
		text(team1[b], 160, 111 + 97 * (b + 1));
		b++;
	}
	b = 0;
	while (b < team2.length) {//names
		text(team2[b], 565, 111 + 97 * (b + 1));
		b++;
	}
	showBanChart();
	smallGraph(0, -.12, "Top1");//top lane team 1
	smallGraph(0, .88, "Jun1");
	smallGraph(0, 1.88, "Mid1");
	smallGraph(0, 2.88, "Adc1");
	smallGraph(0, 3.88, "Sup1");

	smallGraph(1, -.12, "Top2");//top lane team 2
	smallGraph(1, .88, "Jun2");
	smallGraph(1, 1.88, "Mid2");
	smallGraph(1, 2.88, "Adc2");
	smallGraph(1, 3.88, "Sup2");

}
function calcStats() {
	//0-> k,1->d,2->a,3->w,4->l
	t1TopS = [];
	t1JunS = [];
	t1MidS = [];
	t1AdcS = [];
	t1SupS = [];
	t2TopS = [];
	t2JunS = [];
	t2MidS = [];
	t2AdcS = [];
	t2SupS = [];

	var b = 0;
	while (b < team1.length) {
		var k = 0;
		var d = 0;
		var a = 0;
		var w = 0;
		var l = 0;

		var c = 0;
		while (c < playerData.getRowCount()) {
			var tempR = playerData.getRow(c);
			if (tempR.getString(0) == team1[b]) {
				k += tempR.getNum(4);
				d += tempR.getNum(5);
				a += tempR.getNum(6);
				w += tempR.getNum(7);
				l += tempR.getNum(8);
			}
			if (b == 0) {
				t1TopS = [k, d, a, w, l];
			}
			else if (b == 1) {
				t1JunS = [k, d, a, w, l];
			}
			else if (b == 2) {
				t1MidS = [k, d, a, w, l];
			}
			else if (b == 3) {
				t1AdcS = [k, d, a, w, l];
			}
			else if (b == 4) {
				t1SupS = [k, d, a, w, l];
			}
			c++;
		}
		b++;
	}

	b = 0;
	while (b < team2.length) {
		var k = 0;
		var d = 0;
		var a = 0;
		var w = 0;
		var l = 0;

		var c = 0;
		while (c < playerData.getRowCount()) {
			var tempR = playerData.getRow(c);
			if (tempR.getString(0) == team2[b]) {
				k += tempR.getNum(4);
				d += tempR.getNum(5);
				a += tempR.getNum(6);
				w += tempR.getNum(7);
				l += tempR.getNum(8);
			}
			if (b == 0) {
				t2TopS = [k, d, a, w, l];
			}
			else if (b == 1) {
				t2JunS = [k, d, a, w, l];
			}
			else if (b == 2) {
				t2MidS = [k, d, a, w, l];
			}
			else if (b == 3) {
				t2AdcS = [k, d, a, w, l];
			}
			else if (b == 4) {
				t2SupS = [k, d, a, w, l];
			}
			c++;
		}
		b++;
	}
}
function calculateTeams() {
	playerData.clearRows();
	//filter team
	var q = 0;
	var champName = "";
	var playerName = "";
	var role = "";
	var foundRows = [];
	var foundRow = null;
	//var index = -1;
	while (q < stats.getRowCount()) {
		var r = stats.getRow(q);
		if (regionValue == r.getString(9)) {
			champName = r.getString(5);
			playerName = r.getString(3);
			role = r.getString(4);
			foundRows = playerData.findRows(playerName, "Player");
			var tempSize = foundRows.length;
			if (tempSize == 0) {
				var newRow = playerData.addRow();
				newRow.setString(0, playerName);//champ name
				newRow.setString(1, role);
				newRow.setString(2, champName);
				newRow.setNum(3, 1);//picked once
				newRow.setNum(4, r.getNum(6));//KILLS
				newRow.setNum(5, r.getNum(7));//DEATHS
				newRow.setNum(6, r.getNum(8));//ASSISTS
				newRow.setNum(7, r.getNum(10));//WINS
				newRow.setNum(8, r.getNum(11));//LOSSES	
				newRow.setString(9, r.getString(2));//team name
			}
			else {
				var qq = 0;
				foundRow = null;
				while (qq < tempSize) {
					var tempRow = foundRows[qq];
					if (tempRow.getString(2) == champName && tempRow.getString(1) == role) {
						foundRow = foundRows[qq];
						foundRow.setNum(3, foundRow.getNum(3) + 1);//increases pick count
						foundRow.setNum(4, foundRow.getNum(4) + r.getNum(6));//kills
						foundRow.setNum(5, foundRow.getNum(5) + r.getNum(7));//d
						foundRow.setNum(6, foundRow.getNum(6) + r.getNum(8));//a
						foundRow.setNum(7, foundRow.getNum(7) + r.getNum(10));
						foundRow.setNum(8, foundRow.getNum(8) + r.getNum(11));
						break;
					}
					qq++;
				}
				if (foundRow == null) {
					var newRow = playerData.addRow();
					newRow.setString(0, playerName);//champ name
					newRow.setString(1, role);
					newRow.setString(2, champName);
					newRow.setNum(3, 1);//picked once
					newRow.setNum(4, r.getNum(6));//KILLS
					newRow.setNum(5, r.getNum(7));//DEATHS
					newRow.setNum(6, r.getNum(8));//ASSISTS
					newRow.setNum(7, r.getNum(10));//WINS
					newRow.setNum(8, r.getNum(11));//LOSSES		
					newRow.setString(9, r.getString(2));//team name
				}
			}
		}
		q++;
	}
	//saveTable(playerData,"new2.tsv");
	team1 = [];//This and code below determine the main 5 players of each team(by playtime);
	team2 = [];
	var tempTeam1 = [];
	var tt1Value = [];
	var tt1Role = [];
	var max = 0;
	var ind = 0;
	var ind2;
	var max2;
	var c;
	clearTeams();
	if (teamDD1.value != "ALL") {
		//playerDatal
		var b = 0;
		while (b < playerData.getRowCount()) {
			var r = playerData.getRow(b);
			if (r.getString(9) == teamDD1.value) {
				var tempIndex = tempTeam1.indexOf(r.getString(0));
				if (tempIndex != -1) {
					tt1Value[tempIndex] += 1;
				}
				else {
					tempTeam1.push(r.getString(0));
					tt1Value.push(1);
					tt1Role.push(r.getString(1));
				}
			}
			b++;
		}
		b = 0;
		while (b < tempTeam1.length) {
			if (tt1Value[b] >= max && tt1Role[b] == "Top") {
				max = tt1Value[b];
				ind = b;
			}
			b++;
		}
		team1.push(tempTeam1[ind]);
		while (t1Top.length < 5) {
			c = 0;
			ind2 = -1;
			max2 = 0;
			while (c < playerData.getRowCount()) {
				var tempR = playerData.getRow(c);
				if (tempR.getNum(3) > max2 && t1Top.indexOf(c) == -1 && tempR.getString(0) == team1[0]) {
					ind2 = c;
					max2 = tempR.getNum(3);
				}
				c++;
			}
			if (ind2 == -1) {
				break;
			}
			else {
				t1Top.push(ind2);
				var im = loadImage(champs.findRow(playerData.getRow(ind2).getString(2), "Name").getString(1));
				t1TopI.push(im);
			}
		}

		max = 0;
		ind = 0;
		b = 0;
		while (b < tempTeam1.length) {
			if (tt1Value[b] >= max && tt1Role[b] == "Jungle") {
				max = tt1Value[b];
				ind = b;
			}
			b++;
		}
		team1.push(tempTeam1[ind]);
		while (t1Jun.length < 5) {
			c = 0;
			ind2 = -1;
			max2 = 0;
			while (c < playerData.getRowCount()) {
				var tempR = playerData.getRow(c);
				if (tempR.getNum(3) > max2 && t1Jun.indexOf(c) == -1 && tempR.getString(0) == team1[1]) {
					ind2 = c;
					max2 = tempR.getNum(3);
				}
				c++;
			}
			if (ind2 == -1) {
				break;
			}
			else {
				t1Jun.push(ind2);
				var im = loadImage(champs.findRow(playerData.getRow(ind2).getString(2), "Name").getString(1));
				t1JunI.push(im);
			}
		}
		max = 0;
		ind = 0;
		b = 0;
		while (b < tempTeam1.length) {
			if (tt1Value[b] >= max && tt1Role[b] == "Mid") {
				max = tt1Value[b];
				ind = b;
			}
			b++;
		}
		team1.push(tempTeam1[ind]);
		while (t1Mid.length < 5) {
			c = 0;
			ind2 = -1;
			max2 = 0;
			while (c < playerData.getRowCount()) {
				var tempR = playerData.getRow(c);
				if (tempR.getNum(3) > max2 && t1Mid.indexOf(c) == -1 && tempR.getString(0) == team1[2]) {
					ind2 = c;
					max2 = tempR.getNum(3);
				}
				c++;
			}
			if (ind2 == -1) {
				break;
			}
			else {
				t1Mid.push(ind2);
				var im = loadImage(champs.findRow(playerData.getRow(ind2).getString(2), "Name").getString(1));
				t1MidI.push(im);
			}
		}



		max = 0;
		ind = 0;
		b = 0;
		while (b < tempTeam1.length) {
			if (tt1Value[b] >= max && tt1Role[b] == "ADC") {
				max = tt1Value[b];
				ind = b;
			}
			b++;
		}
		team1.push(tempTeam1[ind]);
		while (t1Adc.length < 5) {
			c = 0;
			ind2 = -1;
			max2 = 0;
			while (c < playerData.getRowCount()) {
				var tempR = playerData.getRow(c);
				if (tempR.getNum(3) > max2 && t1Adc.indexOf(c) == -1 && tempR.getString(0) == team1[3]) {
					ind2 = c;
					max2 = tempR.getNum(3);
				}
				c++;
			}
			if (ind2 == -1) {
				break;
			}
			else {
				t1Adc.push(ind2);
				var im = loadImage(champs.findRow(playerData.getRow(ind2).getString(2), "Name").getString(1));
				t1AdcI.push(im);
			}
		}

		max = 0;
		ind = 0;
		b = 0;
		while (b < tempTeam1.length) {
			if (tt1Value[b] >= max && tt1Role[b] == "Support") {
				max = tt1Value[b];
				ind = b;
			}
			b++;
		}
		team1.push(tempTeam1[ind]);
		while (t1Sup.length < 5) {
			c = 0;
			ind2 = -1;
			max2 = 0;
			while (c < playerData.getRowCount()) {
				var tempR = playerData.getRow(c);
				if (tempR.getNum(3) > max2 && t1Sup.indexOf(c) == -1 && tempR.getString(0) == team1[4]) {
					ind2 = c;
					max2 = tempR.getNum(3);
				}
				c++;
			}
			if (ind2 == -1) {
				break;
			}
			else {
				t1Sup.push(ind2);
				var im = loadImage(champs.findRow(playerData.getRow(ind2).getString(2), "Name").getString(1));
				t1SupI.push(im);
			}
		}
	}
	else {
		team1 = [];
	}
	tempTeam1 = [];
	tt1Value = [];
	tt1Role = [];
	if (teamDD2.value != "ALL") {
		var b = 0;
		while (b < playerData.getRowCount()) {
			var r = playerData.getRow(b);
			if (r.getString(9) == teamDD2.value) {
				var tempIndex = tempTeam1.indexOf(r.getString(0));
				if (tempIndex != -1) {
					tt1Value[tempIndex] += 1;
				}
				else {
					tempTeam1.push(r.getString(0));
					tt1Value.push(1);
					tt1Role.push(r.getString(1));
				}
			}
			b++;
		}
		max = 0;
		ind = 0;
		b = 0;
		while (b < tempTeam1.length) {
			if (tt1Value[b] >= max && tt1Role[b] == "Top") {
				max = tt1Value[b];
				ind = b;
			}
			b++;
		}
		team2.push(tempTeam1[ind]);
		while (t2Top.length < 5) {
			c = 0;
			ind2 = -1;
			max2 = 0;
			while (c < playerData.getRowCount()) {
				var tempR = playerData.getRow(c);
				if (tempR.getNum(3) > max2 && t2Top.indexOf(c) == -1 && tempR.getString(0) == team2[0]) {
					ind2 = c;
					max2 = tempR.getNum(3);
				}
				c++;
			}
			if (ind2 == -1) {
				break;
			}
			else {
				t2Top.push(ind2);
				var im = loadImage(champs.findRow(playerData.getRow(ind2).getString(2), "Name").getString(1));
				t2TopI.push(im);
			}
		}

		max = 0;
		ind = 0;
		b = 0;
		while (b < tempTeam1.length) {
			if (tt1Value[b] >= max && tt1Role[b] == "Jungle") {
				max = tt1Value[b];
				ind = b;
			}
			b++;
		}
		team2.push(tempTeam1[ind]);
		while (t2Jun.length < 5) {
			c = 0;
			ind2 = -1;
			max2 = 0;
			while (c < playerData.getRowCount()) {
				var tempR = playerData.getRow(c);
				if (tempR.getNum(3) > max2 && t2Jun.indexOf(c) == -1 && tempR.getString(0) == team2[1]) {
					ind2 = c;
					max2 = tempR.getNum(3);
				}
				c++;
			}
			if (ind2 == -1) {
				break;
			}
			else {
				t2Jun.push(ind2);
				var im = loadImage(champs.findRow(playerData.getRow(ind2).getString(2), "Name").getString(1));
				t2JunI.push(im);
			}
		}

		max = 0;
		ind = 0;
		b = 0;
		while (b < tempTeam1.length) {
			if (tt1Value[b] >= max && tt1Role[b] == "Mid") {
				max = tt1Value[b];
				ind = b;
			}
			b++;
		}
		team2.push(tempTeam1[ind]);
		while (t2Mid.length < 5) {
			c = 0;
			ind2 = -1;
			max2 = 0;
			while (c < playerData.getRowCount()) {
				var tempR = playerData.getRow(c);
				if (tempR.getNum(3) > max2 && t2Mid.indexOf(c) == -1 && tempR.getString(0) == team2[2]) {
					ind2 = c;
					max2 = tempR.getNum(3);
				}
				c++;
			}
			if (ind2 == -1) {
				break;
			}
			else {
				t2Mid.push(ind2);
				var im = loadImage(champs.findRow(playerData.getRow(ind2).getString(2), "Name").getString(1));
				t2MidI.push(im);
			}
		}

		max = 0;
		ind = 0;
		b = 0;
		while (b < tempTeam1.length) {
			if (tt1Value[b] >= max && tt1Role[b] == "ADC") {
				max = tt1Value[b];
				ind = b;
			}
			b++;
		}
		team2.push(tempTeam1[ind]);
		while (t2Adc.length < 5) {
			c = 0;
			ind2 = -1;
			max2 = 0;
			while (c < playerData.getRowCount()) {
				var tempR = playerData.getRow(c);
				if (tempR.getNum(3) > max2 && t2Adc.indexOf(c) == -1 && tempR.getString(0) == team2[3]) {
					ind2 = c;
					max2 = tempR.getNum(3);
				}
				c++;
			}
			if (ind2 == -1) {
				break;
			}
			else {
				t2Adc.push(ind2);
				var im = loadImage(champs.findRow(playerData.getRow(ind2).getString(2), "Name").getString(1));
				t2AdcI.push(im);
			}
		}

		max = 0;
		ind = 0;
		b = 0;
		while (b < tempTeam1.length) {
			if (tt1Value[b] >= max && tt1Role[b] == "Support") {
				max = tt1Value[b];
				ind = b;
			}
			b++;
		}
		team2.push(tempTeam1[ind]);
		while (t2Sup.length < 5) {
			c = 0;
			ind2 = -1;
			max2 = 0;
			while (c < playerData.getRowCount()) {
				var tempR = playerData.getRow(c);
				if (tempR.getNum(3) > max2 && t2Sup.indexOf(c) == -1 && tempR.getString(0) == team2[4]) {
					ind2 = c;
					max2 = tempR.getNum(3);
				}
				c++;
			}
			if (ind2 == -1) {
				break;
			}
			else {
				t2Sup.push(ind2);
				var im = loadImage(champs.findRow(playerData.getRow(ind2).getString(2), "Name").getString(1));
				t2SupI.push(im);
			}
		}

	}
	else {
		team2 = [];
	}
	if (teamDD2.value != "ALL") {//loads team images for team stats screen
		t2Pic = loadImage(teams.findRow(teamDD2.value, "Tag").getString(2));
	}
	else {
		t2Pic = null;
	}
	if (teamDD1.value != "ALL") {
		t1Pic = loadImage(teams.findRow(teamDD1.value, "Tag").getString(2));
	}
	else {
		t1Pic = null;
	}
	calcStats();
	top10Ban();
}
function clearTeams() {
	t1Top = [];
	t2Top = [];
	t1Jun = [];
	t2Jun = [];
	t1Mid = [];
	t2Mid = [];
	t1Adc = [];
	t2Adc = [];
	t1Sup = [];
	t2Sup = [];

	t1TopI = [];
	t1JunI = [];
	t1MidI = [];
	t1AdcI = [];
	t1SupI = [];
	t2TopI = [];
	t2JunI = [];
	t2MidI = [];
	t2AdcI = [];
	t2SupI = [];
}
function calculatePBGraph() {
	pickBanData.clearRows();
	top10 = [];
	dict = [];
	//pickBanData Table : Pick,Ban,K,D,A,W,L
	var q = 0;
	var qq = 0;
	var currRow;
	var game;
	var currName = "";// 6 columns to check
	minDay = parseInt(minDayInput.value);
	maxDay = parseInt(maxDayInput.value);

	while (q < stats.getRowCount()) {
		var r = stats.getRow(q);
		var tempRoleString = roleDD.value;
		//var tempDay = (r.getNum(0)-1)*2 +r.getNum(1);// temp week/day, check vs range
		var tempWeek = r.getNum(0);
		if (tempWeek >= minDay && tempWeek <= maxDay) {
			if (r.getString(5) != "" && (r.getString(9) === regionDD2.value || regionDD2.value == "ALL") && (tempRoleString == "ALL" || tempRoleString == r.getString(4))) {   //CHECK FOR ROLE....EE
				currName = r.getString(5);
				var foundRow = pickBanData.findRow(currName, "Champ");
				if (foundRow != null) {
					foundRow.setNum(1, foundRow.getNum(1) + 1)
					if (r.getNum(10) == 1) {
						foundRow.setNum(6, foundRow.getNum(6) + 1);
					}
					else if (r.getNum(11) == 1) {
						foundRow.setNum(7, foundRow.getNum(7) + 1);
					}
				}
				else {
					var newRow = pickBanData.addRow();
					newRow.setString(0, currName);//champ name
					dict.push(currName);
					newRow.setNum(1, 1);
					if (r.getNum(10) == 1) {
						newRow.setNum(6, 1);
						newRow.setNum(7, 0);
					}
					else if (r.getNum(11) == 1) {
						newRow.setNum(6, 0);
						newRow.setNum(7, 1);
					}
					newRow.setNum(2, 0);
				}
			}
		}
		q++;
	}
	q = 0;
	while (q < pickban.getRowCount()) { //bans
		game = pickban.getRow(q);
		if (game.getString(16) === regionDD2.value || regionDD2.value == "ALL") {
			var p1 = game.getString(4).split(',');
			var p2 = game.getString(5).split(',');

			while (qq < 6) {
				if (qq == 0) {// bans team 1
					currName = p1[0];
				}
				else if (qq == 1) {
					currName = p1[1];
				}
				else if (qq == 2) {
					currName = p1[2];
				}
				else if (qq == 3) {//bans team 2
					currName = p2[0];
				}
				else if (qq == 4) {
					currName = p2[1];
				}
				else if (qq == 5) {
					currName = p2[2];
				}
				var foundRow = pickBanData.findRow(currName, "Champ");
				var tempWeek = game.getNum(0); //((game.getNum(0)-1)*2) +game.getNum(1);// temp week/day, check vs range
				if (tempWeek >= minDay && tempWeek <= maxDay) {
					if (foundRow != null && currName != "NOBAN" && dict.indexOf(currName) != -1) { //(roleDD.value == "ALL")) {// if it finds the row
						foundRow.setNum(2, foundRow.getNum(2) + 1); //increases bans by 1
					}
					else if (currName != "NOBAN" && dict.indexOf(currName) != -1) {  // DIDNT ACCOUNT FOR K/D/A, for new rows where the champ wasnt picked/banned yet
						var newRow = pickBanData.addRow();
						newRow.setString(0, currName);//champ name
						newRow.setNum(2, 1);
						newRow.setNum(1, 0);
						newRow.setNum(6, 0);
						newRow.setNum(7, 0);
					}
				}
				qq++;
			}
		}
		qq = 0;
		q++;
	}
	//saveTable(pickBanData,"new.tsv");
	var tempT = false;
	while (top10.length < 10 && tempT == false) {
		var tempMax = 0;
		var tempInd = -1;
		var q3 = pickBanData.getRowCount();
		var q4 = 0;
		while (q4 < q3) {
			var tempR = pickBanData.getRow(q4);
			if ((tempR.getNum(1) + tempR.getNum(2)) > tempMax && (tempR.getNum(1) >= minNumInput.value)) {//min only includes picked
				if (top10.indexOf(q4) == -1 && visitedTop10.indexOf(q4) == -1) {
					tempInd = q4;
					tempMax = tempR.getNum(1) + tempR.getNum(2);
				}
			}
			q4++;
		}
		if (-1 == tempInd) {
			tempT = true;
		}
		if (tempInd != -1) {
			top10.push(tempInd);
		}
	}
	var q6 = 0;
	var g21 = ""; var g22 = ""; var g23 = "";
	var g24 = ""; var g25 = ""; var g26 = "";
	var g27 = ""; var g28 = ""; var g29 = "";
	var g30 = "";//paths saved
	while (q6 < top10.length) {
		//tempb = champs.findRow(b1, "Name");   //Ban pictures
		//b1p = loadImage(tempb.getString(1));
		var curr = pickBanData.getRow(top10[q6]);
		var gi1, gi2, gi3, gi4, gi5, gi6, gi7, gi8, gi9, gi10;
		tempRow = champs.findRow(curr.getString(0), "Name");
		if (q6 == 0) {//MESS BELOW MAKES THE BAR GRAPH APPEAR SMOOTHER, WON'T RELOAD SAME IMAGES.
			if (giAllPaths[0] != tempRow.getString(1)) {
				g21 = tempRow.getString(1);
				gi1 = loadImage(tempRow.getString(1));
			}
			else {
				gi1 = giAll[0];
				g21 = tempRow.getString(1);
			}
		}
		else if (q6 == 1) {
			if (giAllPaths[1] != tempRow.getString(1)) {
				g22 = tempRow.getString(1);
				gi2 = loadImage(tempRow.getString(1));
			}
			else {
				gi2 = giAll[1];
				g22 = tempRow.getString(1);
			}
		}
		else if (q6 == 2) {
			if (giAllPaths[2] != tempRow.getString(1)) {
				g23 = tempRow.getString(1);
				gi3 = loadImage(tempRow.getString(1));
			}
			else {
				gi3 = giAll[2];
				g23 = tempRow.getString(1);
			}
		}
		else if (q6 == 3) {
			if (giAllPaths[3] != tempRow.getString(1)) {
				g24 = tempRow.getString(1);
				gi4 = loadImage(tempRow.getString(1));
			}
			else {
				gi4 = giAll[3];
				g24 = tempRow.getString(1);
			}
		}
		else if (q6 == 4) {
			if (giAllPaths[4] != tempRow.getString(1)) {
				g25 = tempRow.getString(1);
				gi5 = loadImage(tempRow.getString(1));
			}
			else {
				gi5 = giAll[4];
				g25 = tempRow.getString(1);
			}
		}
		else if (q6 == 5) {
			if (giAllPaths[5] != tempRow.getString(1)) {
				g26 = tempRow.getString(1);
				gi6 = loadImage(tempRow.getString(1));
			}
			else {
				gi6 = giAll[5];
				g26 = tempRow.getString(1);
			}
		}
		else if (q6 == 6) {
			if (giAllPaths[6] != tempRow.getString(1)) {
				g27 = tempRow.getString(1);
				gi7 = loadImage(tempRow.getString(1));
			}
			else {
				gi7 = giAll[6];
				g27 = tempRow.getString(1);
			}
		}
		else if (q6 == 7) {
			if (giAllPaths[7] != tempRow.getString(1)) {
				g28 = tempRow.getString(1);
				gi8 = loadImage(tempRow.getString(1));
			}
			else {
				gi8 = giAll[7];
				g28 = tempRow.getString(1);
			}
		}
		else if (q6 == 8) {
			if (giAllPaths[8] != tempRow.getString(1)) {
				g29 = tempRow.getString(1);
				gi9 = loadImage(tempRow.getString(1));
			}
			else {
				gi9 = giAll[8];
				g29 = tempRow.getString(1);
			}
		}
		else if (q6 == 9) {
			if (giAllPaths[9] != tempRow.getString(1)) {
				g30 = tempRow.getString(1);
				gi10 = loadImage(tempRow.getString(1));
			}
			else {
				gi10 = giAll[9];
				g30 = tempRow.getString(1);
			}
		}
		q6++;
	}
	maxRounded = Math.floor(pickBanData.getRowCount() / 10) * 10;
	if (gi10 == undefined) {
		maxRounded = 0;
	}
	giAll = [gi1, gi2, gi3, gi4, gi5, gi6, gi7, gi8, gi9, gi10];
	giAllPaths = [g21, g22, g23, g24, g25, g26, g27, g28, g29, g30];
}
function visited(x) {
	if (x == 1 && visitedTop10.length < 80) {
		var b = 0;
		while (b < top10.length) {
			visitedTop10.push(top10[b]);
			b++;
		}
	}
	else if (x == -1 && visitedTop10.length != 0) {
		visitedTop10 = visitedTop10.slice(0, visitedTop10.length - 10);
		if (visitedTop10.length <= 9) {
			visitedTop10 = [];
		}
	}
}
function drawMainGraph() {
	//center is width 555,
	textSize(9);

	fill(255);
	strokeWeight(2);
	rect(225, 140, 660, 500);
	line(255, 170, 255, 610);
	line(255, 610, 855, 610);

	fill(0);//labels
	text("100%", 249 - textWidth("100%"), 175);
	text("0%", 249 - textWidth("0%"), 610);
	text("50%", 249 - textWidth("50%"), 395);//middle
	
	fill(225);//key
	strokeWeight(2);
	rect(860, 360, 80, 80);
	line(860, 380, 940, 380);
	fill(255, 255, 0);
	rect(860, 360, 80, 20);
	textSize(16);
	fill(0);
	text("Key", 864, 376);
	textSize(12);

	rect(865, 385, 10, 10);
	fill(60, 190, 60);
	rect(865, 404, 10, 10);
	fill(60, 60, 190);
	rect(865, 423, 10, 10);
	fill(0);
	text("Ban Rate", 880, 394);
	text("Pick Rate", 880, 413);
	text("Win Rate", 880, 432);

	for (var q = 1; q < 11; q++) {
		var amnt = q * (610 - 170) / 10;
		line(250, 610 - amnt, 260, 610 - amnt);
	}
	var q = 0;
	var tempRow;
	while (q < top10.length) {
		var curr = pickBanData.getRow(top10[q]);
		setMax();
		var pick = curr.getNum(1) / changeMax;
		var ban = curr.getNum(2) / changeMax;
		var win = curr.getNum(6) / curr.getNum(1);
		var val = (curr.getNum(1) + curr.getNum(2)) / changeMax;
		giAll[q].resize(28, 26);
		if ((q + visitedTop10.length) < pickBanData.getRowCount()) {//////
			//image(giAll[q],260+(60*q),610-(pick*440)-(ban*440)-50); // this one puts squares above each bar
			image(giAll[q], 260 + (60 * q), 612); // 1 pix below graph
			fill(60, 190, 60);//pick color
			rect(255 + (60 * q), 610 - (pick * 440), 20, pick * 440);
			fill(60, 60, 190);
			rect(275 + (60 * q), 610 - (win * 440), 20, win * 440);
			fill(0);//ban color
			rect(255 + (60 * q), 610 - (pick * 440) - (ban * 440), 20, ban * 440);

			//fill(60, 60, 190);  winrate?
			//rect(255 + (60 * q), 610 - (win * 440), 40, win * 440);
		}
		q++;
	}
}

function resetTable() {
	gameList.clearRows();
	for (i = 0; i < pickban.getRowCount(); i++) {
		var tr = pickban.getRow(i);
		if (tr.getString(16) == document.getElementById("regionDD").value) {
			if (dd1Value == "ALL" && dd2Value == "ALL") {
				if (savedSelectedString != "") {
					if (tr.getString(6).indexOf(savedSelectedString) != -1
						|| tr.getString(7).indexOf(savedSelectedString) != -1
						|| tr.getString(8).indexOf(savedSelectedString) != -1
						|| tr.getString(9).indexOf(savedSelectedString) != -1
						|| tr.getString(10).indexOf(savedSelectedString) != -1
						|| tr.getString(11).indexOf(savedSelectedString) != -1) {
						gameList.addRow(tr);
					}
				}
				else {
					gameList.addRow(tr);
				}
			}
			else if (tr.getString(2) == dd1Value || tr.getString(3) == dd1Value || dd1Value == "ALL") {
				if (dd2Value == "ALL" || dd1Value == dd2Value || (tr.getString(2) == dd2Value || tr.getString(3) == dd2Value) || (dd2Value == "ALL" || dd1Value == dd2Value || (tr.getString(2) == dd2Value || tr.getString(3) == dd2Value))) //account for ""	)) //account for ""	FIX THIS?
				{
					if (savedSelectedString != "") {
						if (tr.getString(6).indexOf(savedSelectedString) != -1
							|| tr.getString(7).indexOf(savedSelectedString) != -1
							|| tr.getString(8).indexOf(savedSelectedString) != -1
							|| tr.getString(9).indexOf(savedSelectedString) != -1
							|| tr.getString(10).indexOf(savedSelectedString) != -1
							|| tr.getString(11).indexOf(savedSelectedString) != -1) {
							gameList.addRow(tr);
						}
					}
					else {
						gameList.addRow(tr);
					}
				}
			}
		}
	}
}

function calcRecords() {
	var game = gameList.getRow(currGame);
	var t1w = 0;
	var t1l = 0;
	var t2w = 0;
	var t2l = 0;
	var t1t = game.getString(2);//blue side tag
	var t2t = game.getString(3);//red side tag
	var time1 = (game.getNum(0) * 2) + game.getNum(1);
	for (gInc = 0; gInc < pickban.getRowCount(); gInc++) { // game increment
		
		var g = pickban.getRow(gInc);
		var time2 = (g.getNum(0) * 2) + g.getNum(1);
		if (spoiler == true) { // if spoilers are on/off
			time2 -= 1;
		}
		if (time2 < time1) {
			if (g.getString(2) == t1t) { //blue
				if (g.getNum(12) == 1) {
					t1w += 1;
				}
				else {
					t1l += 1;
				}
			}
			else if (g.getString(3) == t1t) {
				if (g.getNum(12) == 2) {
					t1w += 1;
				}
				else {
					t1l += 1;
				}
			}
			if (g.getString(2) == t2t) { //blue
				if (g.getNum(12) == 1) {
					t2w += 1;
				}
				else {
					t2l += 1;
				}
			}
			else if (g.getString(3) == t2t) {
				if (g.getNum(12) == 2) {
					t2w += 1;
				}
				else {
					t2l += 1;
				}
			}
		}
	}
	t1R = [t1w, t1l];
	t2R = [t2w, t2l];
}

function newScore() {
	if (gameList.getRowCount() > 0) {
		var game = gameList.getRow(currGame);
		currWeek = game.getString(0);
		currDay = game.getString(1);
		var t1 = game.getString(2);//tag EX: GIA(blue)
		var t2 = game.getString(3);//red team tag
		var rt1 = teams.findRow(t1, "Tag");
		var rt2 = teams.findRow(t2, "Tag");
		t1Name = rt1.getString(1);
		t2Name = rt2.getString(1);
		t1Pic = loadImage(rt1.getString(2));
		t2Pic = loadImage(rt2.getString(2));
		t1Pic.resize(80, 80);
		t2Pic.resize(80, 80);
		var tempCnt = 0;
		var tempb;
		var splitBans1 = game.getString(4).split(',');
		var splitBans2 = game.getString(5).split(',');
		var b1p,b2p,b3p,b4p,b5p,b6p;
		var b1,b2,b3,b4,b5,b6;
		b1 = splitBans1[0];//ban champ name
		b2 = splitBans1[1];
		b3 = splitBans1[2];
		b4 = splitBans2[0];
		b5 = splitBans2[1];
		b6 = splitBans2[2];
		bans = [b1,b2,b3,b4,b5,b6];

		if (b1 != "NOBAN") {
			tempb = champs.findRow(b1, "Name");   //Ban pictures
			b1p = loadImage(tempb.getString(1));
		}
		if (b2 != "NOBAN") {
			tempb = champs.findRow(b2, "Name");
			b2p = loadImage(tempb.getString(1));
		}
		if (b3 != "NOBAN") {
			tempb = champs.findRow(b3, "Name");
			b3p = loadImage(tempb.getString(1));
		}
		if (b4 != "NOBAN") {
			tempb = champs.findRow(b4, "Name");
			b4p = loadImage(tempb.getString(1));
		}
		if (b5 != "NOBAN") {
			tempb = champs.findRow(b5, "Name");
			b5p = loadImage(tempb.getString(1));
		}
		if (b6 != "NOBAN") {
			tempb = champs.findRow(b6, "Name");
			b6p = loadImage(tempb.getString(1));
		}
		banPictures = [b1p,b2p,b3p,b4p,b5p,b6p];

		var a = game.getString(15);
		var b = "https://www.youtube.com/embed/" + a + "?enablejsapi=1";
		player.src = b;

		calcRecords();
		var c1o, c2o, c3o, c4o, c5o, c6o, c7o, c8, o, c9o, c10o;//order 1-3
		var c1p,c2p,c3p,c4p,c5p,c6p,c7p,c8p,c9p,c10p;
		var n1,n2,n3,n4,n5,n6,n7,n8,n9,n10;
		var c1,c2,c3,c4,c5,c7,c8,c9,c10;
		champPickOrder = [];
		champPictures = [];
		for (i = 0; i < stats.getRowCount(); i++) {
			var tempRow = stats.getRow(i);
			if (tempRow.getNum(0) == currWeek && tempRow.getNum(1) == currDay) {
				if (t1.valueOf() == tempRow.getString(2).valueOf()) {
					if (tempRow.getString(4) == "Top") {
						c1 = tempRow.getString(5);
						n1 = tempRow.getString(3);
						tempCnt++;
						var tempNum = 0;
						for (j = 0; j < champs.getRowCount(); j++) {
							if (champs.getRow(j).getString(0).valueOf() == tempRow.getString(5).valueOf()) {
								tempNum = j;
								if (game.getString(6).indexOf(c1) != -1) {
									c1o = 1;
								}
								else if (game.getString(7).indexOf(c1) != -1) {
									c1o = 2;
								}
								else if (game.getString(8).indexOf(c1) != -1) {
									c1o = 3;
								}
								break;
							}
						}
						c1p = loadImage(champs.getRow(tempNum).getString(1));
						c1s = [tempRow.getNum(6), tempRow.getNum(7), tempRow.getNum(8)]

					}
					if (tempRow.getString(4) == "Jungle") {
						c2 = tempRow.getString(5);
						n2 = tempRow.getString(3);
						tempCnt++;
						var tempNum = 0;
						for (j = 0; j < champs.getRowCount(); j++) {
							if (champs.getRow(j).getString(0).valueOf() == tempRow.getString(5).valueOf()) {
								tempNum = j;
								if (game.getString(6).indexOf(c2) != -1) {
									c2o = 1;
								}
								else if (game.getString(7).indexOf(c2) != -1) {
									c2o = 2;
								}
								else if (game.getString(8).indexOf(c2) != -1) {
									c2o = 3;
								}
								break;
							}
						}
						c2p = loadImage(champs.getRow(tempNum).getString(1));
						c2s = [tempRow.getNum(6), tempRow.getNum(7), tempRow.getNum(8)]
					}
					if (tempRow.getString(4) == "Mid") {
						c3 = tempRow.getString(5);
						n3 = tempRow.getString(3);
						tempCnt++;
						var tempNum = 0;
						for (j = 0; j < champs.getRowCount(); j++) {
							if (champs.getRow(j).getString(0).valueOf() == tempRow.getString(5).valueOf()) {
								tempNum = j;
								if (game.getString(6).indexOf(c3) != -1) {
									c3o = 1;
								}
								else if (game.getString(7).indexOf(c3) != -1) {
									c3o = 2;
								}
								else if (game.getString(8).indexOf(c3) != -1) {
									c3o = 3;
								}
								break;
							}
						}
						c3p = loadImage(champs.getRow(tempNum).getString(1));
						c3s = [tempRow.getNum(6), tempRow.getNum(7), tempRow.getNum(8)]
					}
					if (tempRow.getString(4) == "ADC") {
						c4 = tempRow.getString(5);
						n4 = tempRow.getString(3);
						tempCnt++;
						var tempNum = 0;
						for (j = 0; j < champs.getRowCount(); j++) {
							if (champs.getRow(j).getString(0).valueOf() == tempRow.getString(5).valueOf()) {
								tempNum = j;
								if (game.getString(6).indexOf(c4) != -1) {
									c4o = 1;
								}
								else if (game.getString(7).indexOf(c4) != -1) {
									c4o = 2;
								}
								else if (game.getString(8).indexOf(c4) != -1) {
									c4o = 3;
								}
								break;
							}
						}
						c4p = loadImage(champs.getRow(tempNum).getString(1));
						c4s = [tempRow.getNum(6), tempRow.getNum(7), tempRow.getNum(8)]
					}
					if (tempRow.getString(4) == "Support") {
						c5 = tempRow.getString(5);
						n5 = tempRow.getString(3);
						tempCnt++;
						var tempNum = 0;
						for (j = 0; j < champs.getRowCount(); j++) {
							if (champs.getRow(j).getString(0).valueOf() == tempRow.getString(5).valueOf()) {
								tempNum = j;
								if (game.getString(6).indexOf(c5) != -1) {
									c5o = 1;
								}
								else if (game.getString(7).indexOf(c5) != -1) {
									c5o = 2;
								}
								else if (game.getString(8).indexOf(c5) != -1) {
									c5o = 3;
								}
								break;
							}
						}
						c5p = loadImage(champs.getRow(tempNum).getString(1));
						c5s = [tempRow.getNum(6), tempRow.getNum(7), tempRow.getNum(8)]
					}
				}
				if (t2.valueOf() == tempRow.getString(2).valueOf()) {
					if (tempRow.getString(4) == "Top") {
						c6 = tempRow.getString(5);
						n6 = tempRow.getString(3);
						tempCnt++;
						var tempNum = 0;
						for (j = 0; j < champs.getRowCount(); j++) {
							if (champs.getRow(j).getString(0).valueOf() == tempRow.getString(5).valueOf()) {
								tempNum = j;
								if (game.getString(9).indexOf(c6) != -1) {
									c6o = 1;
								}
								else if (game.getString(10).indexOf(c6) != -1) {
									c6o = 2;
								}
								else if (game.getString(11).indexOf(c6) != -1) {
									c6o = 3;
								}
								break;
							}
						}
						c6p = loadImage(champs.getRow(tempNum).getString(1));
						c6s = [tempRow.getNum(6), tempRow.getNum(7), tempRow.getNum(8)]
					}
					if (tempRow.getString(4) == "Jungle") {
						c7 = tempRow.getString(5);
						n7 = tempRow.getString(3);
						tempCnt++;
						var tempNum = 0;
						for (j = 0; j < champs.getRowCount(); j++) {
							if (champs.getRow(j).getString(0).valueOf() == tempRow.getString(5).valueOf()) {
								tempNum = j;
								if (game.getString(9).indexOf(c7) != -1) {
									c7o = 1;
								}
								else if (game.getString(10).indexOf(c7) != -1) {
									c7o = 2;
								}
								else if (game.getString(11).indexOf(c7) != -1) {
									c7o = 3;
								}
								break;
							}
						}
						c7p = loadImage(champs.getRow(tempNum).getString(1));
						c7s = [tempRow.getNum(6), tempRow.getNum(7), tempRow.getNum(8)]
					}
					if (tempRow.getString(4) == "Mid") {
						c8 = tempRow.getString(5);
						n8 = tempRow.getString(3);
						tempCnt++;
						var tempNum = 0;
						for (j = 0; j < champs.getRowCount(); j++) {
							if (champs.getRow(j).getString(0).valueOf() == tempRow.getString(5).valueOf()) {
								tempNum = j;
								if (game.getString(9).indexOf(c8) != -1) {
									c8o = 1;
								}
								else if (game.getString(10).indexOf(c8) != -1) {
									c8o = 2;
								}
								else if (game.getString(11).indexOf(c8) != -1) {
									c8o = 3;
								}
								break;
							}
						}
						c8p = loadImage(champs.getRow(tempNum).getString(1));
						c8s = [tempRow.getNum(6), tempRow.getNum(7), tempRow.getNum(8)]
					}
					if (tempRow.getString(4) == "ADC") {
						c9 = tempRow.getString(5);
						n9 = tempRow.getString(3);
						tempCnt++;
						var tempNum = 0;
						for (j = 0; j < champs.getRowCount(); j++) {
							if (champs.getRow(j).getString(0).valueOf() == tempRow.getString(5).valueOf()) {
								tempNum = j;
								if (game.getString(9).indexOf(c9) != -1) {
									c9o = 1;
								}
								else if (game.getString(10).indexOf(c9) != -1) {
									c9o = 2;
								}
								else if (game.getString(11).indexOf(c9) != -1) {
									c9o = 3;
								}
								break;
							}
						}
						c9p = loadImage(champs.getRow(tempNum).getString(1));
						c9s = [tempRow.getNum(6), tempRow.getNum(7), tempRow.getNum(8)]
					}
					if (tempRow.getString(4) == "Support") {
						c10 = tempRow.getString(5);
						n10 = tempRow.getString(3);
						tempCnt++;
					}
					var tempNum = 0;
					for (j = 0; j < champs.getRowCount(); j++) {
						if (champs.getRow(j).getString(0).valueOf() == tempRow.getString(5).valueOf()) {
							tempNum = j;
							if (game.getString(9).indexOf(c10) != -1) {
								c10o = 1;
							}
							else if (game.getString(10).indexOf(c10) != -1) {
								c10o = 2;
							}
							else if (game.getString(11).indexOf(c10) != -1) {
								c10o = 3;
							}
							break;
						}
					}
					
					c10p = loadImage(champs.getRow(tempNum).getString(1));
					c10s = [tempRow.getNum(6), tempRow.getNum(7), tempRow.getNum(8)]
				}
			}
			if (tempCnt == 10) {
				break;
			}
		}
	}
	champPickOrder = [c1o,c2o,c3o,c4o,c5o,c6o,c7o,c8o,c9o,c10o];
	champPictures = [c1p,c2p,c3p,c4p,c5p,c6p,c7p,c8p,c9p,c10p];
	playerNames = [n1,n2,n3,n4,n5,n6,n7,n8,n9,n10];
}
function showScore() {//MODE VIEW # 0
	push();
	var box2 = 520;
	strokeWeight(3);
	fill(220);
	if (teams.findRow(t1Name, "Name").getString(0) == dd1Value) {//} || teams.findRow(t2Name,"Name").getString(0) == dd1Value) {//teams.findRow(t1Name,"Name").getString(0) == dd2Value
		fill(204, 153, 255);
	}
	else if (teams.findRow(t1Name, "Name").getString(0) == dd2Value) {//green
		fill(204, 255, 153);
	}
	else {
		fill(220);
	}
	rect(150, 68, 200, 613);
	line(150, 104, 350, 104);
	strokeWeight(3);

	if (teams.findRow(t2Name, "Name").getString(0) == dd1Value) {
		fill(204, 153, 255);
	}
	else if (teams.findRow(t2Name, "Name").getString(0) == dd2Value) {
		fill(204, 255, 153);
	}
	else {
		fill(220);
	}
	rect(350, 68, 200, 613);
	line(350, 104, 550, 104);

	fill(255, 203, 203);//red
	rect(350, 68, 200, 36);
	fill(203, 203, 255);//blue
	rect(150, 68, 200, 36);

	fill(0);
	//line(150, 610, 550, 610);
	//line(175, height - 74, 175, height);
	fill(255, 153, 50);
	rect(150, height - 62, 20, 60);
	rect(530, height - 62, 20, 60);
	fill(0);
	textSize(16);
	push();
	translate(166, height - 8);
	rotate(-PI / 2.0);
	translate(-1 * (166), -1 * (height - 8));
	text("BANS", 166, height - 8);
	pop();
	
	push();
	translate(546, height - 8);
	rotate(-PI / 2.0);
	translate(-1 * (546), -1 * (height - 8));
	text("BANS", 546, height - 8);
	pop();
	
	textSize(13);
	textStyle(BOLD);
	strokeWeight(1);
	if (currGame < gameList.getRowCount() && gameList.getRowCount() != 0) {
		if (spoiler == true && gameList.getRow(currGame).getNum(12) == 1) {
			tint(255, 137);
			image(crown, 260, 92);

		}
		else if (spoiler == true && gameList.getRow(currGame).getNum(12) == 2) {
			tint(255, 137);
			image(crown, 360, 92);
		}
		tint(255, 118);//team icons transparency
		if (t1Pic == null) {
			t1Pic = loadImage(teams.findRow(gameList.getRow(currGame).getString(2), "Tag").getString(2));
		}
		if (t2Pic == null) {
			t2Pic = loadImage(teams.findRow(gameList.getRow(currGame).getString(3), "Tag").getString(2));
		}
		t1Pic.resize(30, 30);
		t2Pic.resize(30, 30);
		image(t1Pic, 315, 72);
		image(t2Pic, 355, 72);
		tint(255, 255);

		strokeWeight(2); // team names
		var combinedt1 = t1Name + " (" + t1R[0] + "-" + t1R[1] + ")";
		text(combinedt1, 154, 90);
		//line(160,102,160+textWidth(t1Name),102);
		var combinedt2 = "(" + t2R[0] + "-" + t2R[1] + ") " + t2Name;
		text(combinedt2, box2 + 26 - textWidth(combinedt2), 90);

		strokeWeight(1);
		
		var b = 0;
		var c = 0;
		var d = 0;
		var box3 = box2 - 60;
		
		while (b < champPickOrder.length) {
			if (d == 0) {
				fill(255);
				ellipse(164,175+(100*c),16,16);
				fill(0);
				text(champPickOrder[b], 160, 180+(100*c));
				image(champPictures[b],180,144+(100*c));
				text(playerNames[b],180,132+(100*c));
				c++;
				if (c == 5) {
					c = 0;
					d = 1;
				}
			}
			else if (d ==1) {
				fill(255);
				ellipse(537,175+(100*c),16,16);
				fill(0);
				text(champPickOrder[b], 540 - textWidth(champPickOrder[b]), 180+(100*c));
				image(champPictures[b], box3, 144+(100*c));
				text(playerNames[b], box2 - textWidth(playerNames[b]), 132+(100*c));
				c++;
			}
			b++;
		}
		fill(0);
		textSize(14);
		if (bans[0] != "NOBAN") {
			image(banPictures[0], 170, 621);
		}
		else {
			text("LOST", 180, 646);
			text("BAN", 184, 662);
		}
		if (bans[1] != "NOBAN") {
			image(banPictures[1], 230, 621);
		}
		else {
			text("LOST", 230, 646);
			text("BAN", 234, 662);
		}
		if (bans[2] != "NOBAN") {
			image(banPictures[2], 290, 621);
		}
		else {
			text("LOST", 280, 646);
			text("BAN", 284, 662);
		}
		if (bans[3] != "NOBAN") {
			image(banPictures[3], 350, 621);
		}
		else {
			text("LOST", 380, 646);
			text("BAN", 384, 662);
		}
		if (bans[4] != "NOBAN") {
			image(banPictures[4], 410, 621);
		}
		else {
			text("LOST", 430, 646);
			text("BAN", 434, 662);
		}
		if (bans[5] != "NOBAN") {
			//image(banPictures[5], 480, 626);
			image(banPictures[5], 470, 621);
		}
		else {
			text("LOST", 480, 646);
			text("BAN", 484, 662);
		}

		tint(255, 135); // ban images with transparency
		image(banImg, 170, 621);
		image(banImg, 230, 621);
		image(banImg, 290, 621);
		image(banImg, 350, 621);
		image(banImg, 410, 621);
		image(banImg, 470, 621);
		tint(255, 255);
		textSize(16);
		//K/D/A s
		//text("K/D/A",260,150);
		if (spoiler == true) {
			text(c1s[0] + " / " + c1s[1] + " / " + c1s[2], 260, 180);
			text(c2s[0] + " / " + c2s[1] + " / " + c2s[2], 260, 280);
			text(c3s[0] + " / " + c3s[1] + " / " + c3s[2], 260, 380);
			text(c4s[0] + " / " + c4s[1] + " / " + c4s[2], 260, 480);
			text(c5s[0] + " / " + c5s[1] + " / " + c5s[2], 260, 580);
			var q6 = c6s[0] + " / " + c6s[1] + " / " + c6s[2];
			var q7 = c7s[0] + " / " + c7s[1] + " / " + c7s[2];
			var q8 = c8s[0] + " / " + c8s[1] + " / " + c8s[2];
			var q9 = c9s[0] + " / " + c9s[1] + " / " + c9s[2];
			var q10 = c10s[0] + " / " + c10s[1] + " / " + c10s[2];
			text(c6s[0] + " / " + c6s[1] + " / " + c6s[2], 450 - textWidth(q6), 180);
			text(c7s[0] + " / " + c7s[1] + " / " + c7s[2], 450 - textWidth(q7), 280);
			text(c8s[0] + " / " + c8s[1] + " / " + c8s[2], 450 - textWidth(q8), 380);
			text(c9s[0] + " / " + c9s[1] + " / " + c9s[2], 450 - textWidth(q9), 480);
			text(c10s[0] + " / " + c10s[1] + " / " + c10s[2], 450 - textWidth(q10), 580);
		}
	}
	else {
		var box3 = box2 - 60;
		text("Nothing Selected", 154, 90);
		text("Nothing Selected", box2 + 26 - textWidth("Nothing Selected"), 90);

		fill(220);
		rect(180, 144, 60, 60);//empty rectangles for champs
		rect(180, 244, 60, 60);
		rect(180, 344, 60, 60);
		rect(180, 444, 60, 60);
		rect(180, 544, 60, 60);
		rect(box3, 144, 60, 60);
		rect(box3, 244, 60, 60);
		rect(box3, 344, 60, 60);
		rect(box3, 444, 60, 60);
		rect(box3, 544, 60, 60);

		rect(180, 626, 40, 40);//empty bans
		rect(230, 626, 40, 40);
		rect(280, 626, 40, 40);
		rect(380, 626, 40, 40);
		rect(430, 626, 40, 40);
		rect(480, 626, 40, 40);

		textSize(30);
		var temp = "No Games Match";
		var temp2 = "Please change your filters";
		var temp3 = "in order to find games!";
		fill(255, 51, 51);
		strokeWeight(3);
		rect(560, 348, 390, 200);
		line(560, 400, 950, 400);
		fill(0);
		text(temp, 570, 384);
		textSize(24);
		text(temp2, 570, 420);
		text(temp3, 570, 450);

	}



	pop();
}
function mousePressed() {
	//fill(0);
	if (mode == 0 && document.activeElement.id == "champInput" && mouseX >= 6 && mouseX <= 145 && mouseY >= 414 && mouseY <= 414 + (list1Max * 12)) {
		closeDD = true;

		champInput.value = selectedString;
		savedSelectedString = selectedString;
		var tempIm = champs.findRow(savedSelectedString, "Name");
		selectedImage = loadImage(tempIm.getString(1));
		resetTable();
		newScore();
		selectDDNum = 0;

	}
	//text("Mouse X: " + mouseX + ". Mouse Y : " + mouseY, 600, 600);
	closeDD = false;
}

function keyPressed() {
	if (mode == 0) {
		if (keyCode === LEFT_ARROW && document.activeElement.id != "champInput") {
			prev();
		}
		if (keyCode === RIGHT_ARROW && document.activeElement.id != "champInput") {
			next();
		}
		if (keyCode === UP_ARROW && selectDDNum > 0 && document.activeElement.id == "champInput") {
			selectDDNum -= 1;
		}
		if (keyCode === DOWN_ARROW && selectDDNum < list1Max - 1 && document.activeElement.id == "champInput") {
			selectDDNum += 1;
		}
		if (keyCode === ENTER) {
			if (document.activeElement.id == "teamDD1" || document.activeElement.id == "teamDD2" || document.activeElement.id == "team2DD2" || document.activeElement.id == "team2DD1") {
				//prevDD1 = dd1Value;
				currGame = 0;
			}
			if (document.activeElement.id == "champInput") {
				selectDDNum = 0;
				currGame = 0;
				closeDD = true;
				champInput.value = selectedString;
				savedSelectedString = selectedString;
				var tempIm = champs.findRow(savedSelectedString, "Name");
				selectedImage = loadImage(tempIm.getString(1));
				resetTable();
				newScore();				

			}
		}
		if (keyCode === BACKSPACE) {
			closeDD = false;
		}
	}
	if (mode == 2) {
		if (keyCode === LEFT_ARROW && document.activeElement.id != "champInput") {
			prev();
		}
		if (keyCode === RIGHT_ARROW && document.activeElement.id != "champInput") {
			next();
		}
	}

}
function mouseWheel(event) {

}
function next() {
	if (currGame < maxNum - 1 && mode == 0) {
		currGame += 1;
	}
	if (mode == 1 && visitedTop10.length <= maxRounded - 10) { //hard coded for this data, 80 should be pickbanstats.length rounded down by 10
		visited(1);
		if (visitedTop10.length >= maxRounded) {
			end = true;
		}
		calculatePBGraph();
	}
}
function prev() {
	if (currGame > 0 && mode == 0) {
		currGame -= 1;
	}
	if (mode == 1 && visitedTop10.length != 0) {
		if (end == true) {
			end = false;
		}
		visited(-1);
		calculatePBGraph();
	}
}
function clearChamp(tempM) {
	selectedString = "";
	savedSelectedString = "";
	champInput.value = "";
}

function createTypeBox(x, y) {  //creates dropdown for champ filter
	if (closeDD == false) {
		var count = 0;
		for (var r = 0; r < champs.getRowCount(); r++) {
			var name = champs.getRow(r).getString(0);// goes to tempname1
			var tempname0 = name;
			var tempname1 = name.toLowerCase();
			var tempname2;
			if (selectDDNum == count) {
				selectedString = tempname0;
			}
			if (selectedString == "") {
				//selectedString= tempname0;
			}
			if (document.activeElement.id == "champInput") {
				tempname2 = champInput.value.toLowerCase();
			}
			if (tempname1.indexOf(tempname2) != -1 && count < 11) {
				fill(173, 216, 230);
				if (document.activeElement.id == "champInput") {
					push();
					textSize(10);
					if (count == selectDDNum) {
						fill(255, 255, 0);
					}
					else {

					}
					rect(x, y - 10 + count * 12, 140, 12);
					fill(0);
					text(name, x, y + count * 12);
					count++;
					pop();
				}
			}
			if (r == champs.getRowCount() - 1) {
				if (document.activeElement.id == "champInput") {
					list1Max = count;
				}
			}
		}
		if (list1Max < selectDDNum && document.activeElement.id == "champInput") {
			selectDDNum = list1Max;
		}
	}
}