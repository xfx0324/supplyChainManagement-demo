export function now() {
    const curr = new Date()
    let year = curr.getFullYear()
    let month = curr.getMonth() + 1
    if (month < 10) month = '0' + month
    let date = curr.getDate()
    if (date < 10) date = '0' + date
    let hour = curr.getHours()
    if (hour < 10) hour = '0' + hour
    let minutes = curr.getMinutes()
    if (minutes < 10) minutes = '0' + minutes
    let seconds = curr.getSeconds()
    if (seconds < 10) seconds = '0' + seconds

    return year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds
}
export function nowTime() {
    const nt = new Date()
    let year = nt.getFullYear()
    let month = nt.getMonth() + 1
    if (month < 10) month = '0' + month
    let date = nt.getDate()
    if (date < 10) date = '0' + date
    let hour = nt.getHours()
    if (hour < 10) hour = '0' + hour
    let minutes = nt.getMinutes()
    if (minutes < 10) minutes = '0' + minutes
    let seconds = nt.getSeconds()
    if (seconds < 10) seconds = '0' + seconds

    return year+month+date+hour+minutes+seconds
}
