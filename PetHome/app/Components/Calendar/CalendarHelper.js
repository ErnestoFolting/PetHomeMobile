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