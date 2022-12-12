module.exports = (date, time) => {
    if(!date || date == "" || !time || date == "") return false;
    
    dateArr = date.split("-")
    timeArr = time.split(":")

    if(dateArr.length != 3 || dateArr[0].length != 4 || dateArr[1].length != 2 || dateArr[1].length != 2) return false;
    if(timeArr.length != 2 || timeArr[0].length != 2 || timeArr[1].length != 2) return false;

    date = date + "T" + time + ":00.000Z"

    if(new Date(date) == "Invalid Date") return false;
    return date;
}