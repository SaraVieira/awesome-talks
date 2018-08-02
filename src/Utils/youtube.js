import format from 'date-fns/format'
import addMinutes from 'date-fns/add_minutes'

export const getDuration = duration => {
    const date = new Date(null)
    date.setSeconds(duration)
    if (duration > 3600) {
        // We use addMinutes instead of subMinutes because
        // Date.prototype.getTimezoneOffset() returns negative number for positive offsets.
        return format(addMinutes(date, date.getTimezoneOffset()), 'H[h][ ]m[m]')
    }

    return format(date, 'm[m]')
}
