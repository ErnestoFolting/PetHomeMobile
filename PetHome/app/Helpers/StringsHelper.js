export const replaceSigns = (coords) => {
    return String(coords)?.replace('.', ',')
}

export const dateWithoutTime = (dateWithTime) => {
    if (dateWithTime) {
        return dateWithTime.split('T')[0];
    } else {
        return 'Не обрано'
    }
}