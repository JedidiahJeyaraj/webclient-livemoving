"use strict";
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = new Date().getFullYear();
let selectMonth = new Date().getMonth()+1;

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    
    month = month + 1;
    console.log(month, year);
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";
    var now = new Date();
    var firstDay1 = new Date(year, month, 1);
    var lastDay1 = new Date(year,  month, 0);
        console.log("her",firstDay1.getDate(), lastDay1.getDate());
    var m =  month;
        m = m<10?'0'+m:m;
    var d1 = firstDay1.getDate();
        d1 = d1<10?'0'+d1:d1;
    var d2 = lastDay1.getDate();
        d2 = d2<10?'0'+d2:d2;
    var queryDate1  = year + '-' + m + '-' + d1;
    var queryDate2  = year + '-' + m + '-' + d2;
    var calenderDate = [];
    console.log("queryData", queryDate1, queryDate2);
    $.ajax({
        url:API_URL + '/get-calender/' + queryDate1 + '/' + queryDate2 + '/' + localStorage.getItem("userId"),
        type:"GET",
        async:false,
        success:function(res){
            console.log("res",res);
            if(res.result.length>0) {
                calenderDate = [];  
                for(var i in res.result){
                    var temp = res.result[i].lm_cal_block_date.split('T')[0];
                        temp = temp.split("-")[2];    
                    calenderDate.push(parseInt(temp) + 1)
                }
                
            }
        },
        error:function(err){
            console.log("get-calender query error", err);
        }
    });
    console.log("====================", calenderDate);
    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    // selectYear.value = year;
    // selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                console.log(year, today.getFullYear(), month, today.getMonth());
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                //if ( calenderDate.indexOf(date)>=0 && year === today.getFullYear() && month === today.getMonth()) {
                if ( calenderDate.indexOf(date)>=0) {
                    cell.classList.add("bg-info1");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}
