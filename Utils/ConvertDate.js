module.exports = (date, time) => {
    // If the date or the time is undefined or is an empty tring, return false
    if(!date || date == "" || !time || date == "") return false;
    
    dateArr = date.split("-")
    timeArr = time.split(":")

    // If the date or the time has not the good length, return false
    if(dateArr.length != 3 || dateArr[0].length != 4 || dateArr[1].length != 2 || dateArr[1].length != 2) return false;
    if(timeArr.length != 2 || timeArr[0].length != 2 || timeArr[1].length != 2) return false;

    // Create the date
    date = date + "T" + time + ":00.000Z"

    // If the date is invalid, return false. Otherwise, return the date
    if(new Date(date) == "Invalid Date") return false;
    return date;
}