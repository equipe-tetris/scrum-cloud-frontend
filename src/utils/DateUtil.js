import moment from "moment"

export const GMT = -(new Date().getTimezoneOffset() / 60)
const DateFormatPattern = "DD/MM/YYYY HH:mm"

export function FormatDate(DateTime, Format = DateFormatPattern) {
    //let newDate = moment(DateTime).format(Format)
    let newDate = moment(DateTime).format(Format)
    return newDate
}

export function FormatDateUTC(DateTime, Format = DateFormatPattern) {
    //let newDate = moment(DateTime).format(Format)
    let newDate = moment.utc(DateTime).format(Format)
    return newDate
}

export function SubtractDate(StartDate, EndDate,Format = DateFormatPattern) {
    let newDate = moment(StartDate).diff(EndDate)
    return moment(newDate).format(Format)
}

export function GetDateGMT(Date, Format = DateFormatPattern) {
    let newDate = moment(Date).add(GMT,'hours').format(Format)
    return newDate
}