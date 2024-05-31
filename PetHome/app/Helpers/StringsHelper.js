export const replaceSigns = (coords) => {
    return String(coords)?.replace('.', ',')
}

export const dateWithoutTime = (dateWithTime) => {
    return dateWithTime.split('T')[0];
}