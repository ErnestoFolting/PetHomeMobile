export const processDates = (prevDates, dates) => {
    const deleteDates = [];
    const addDates = [];

    // Find dates to delete
    for (const date in prevDates) {
        if (!(date in dates)) {
            deleteDates.push(date);
        }
    }

    // Find dates to add
    for (const date in dates) {
        if (!(date in prevDates)) {
            addDates.push(date);
        }
    }
    return { deleteDates, addDates };
}

export const getDatesBetween = (startDate, endDate) => {
    const start = new Date(startDate.slice(0, 10));
    const end = new Date(endDate.slice(0, 10));
    const dates = [];

    let currentDate = new Date(start);
    while (currentDate <= end) {
        dates.push(currentDate.toISOString().slice(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

export const extractStartAndEndDates = (data) => {
    let startDate, endDate;

    for (let date in data) {
        if (data[date].startingDay) {
            startDate = date;
        }
        if (data[date].endingDay) {
            endDate = date;
        }
    }

    return { startDate, endDate };
}