import format from 'date-fns/format'

export const getDuration = duration => {
    var date = new Date(null)
    date.setSeconds(duration)
    if (duration > 3600) {
        return format(date, 'H[h][ ]m[m]')
    }

    return format(date, 'm[m]')
}
