module.exports = (dateDeparture, dateArrival) => {
    const departure = new Date(dateDeparture), arrival = new Date(dateArrival);
    
    const date = departure.getDate().toString().padStart(2, '0') + "/" + (departure.getMonth() + 1).toString().padStart(2, '0') + "/" + departure.getFullYear().toString().padStart(2, '0');
    const hourDeparture = (departure.getHours().toString().padStart(2, '0') - 1) + ":" + departure.getMinutes().toString().padStart(2, '0');
    const hourArrival = (arrival.getHours().toString().padStart(2, '0') - 1) + ":" + arrival.getMinutes().toString().padStart(2, '0');


    const timeTravel = (arrival.getTime() - departure.getTime()) / 60_000;
    const travelTime = Math.ceil(timeTravel / 60).toString().padStart(2, '0') + "h" + (timeTravel % 60).toString().padStart(2, '0');

    return { date, hourDeparture, hourArrival, travelTime }
}