export default ({ app }, inject) => {
  inject('toReadableTime', (minutes, short = false) => {
    if (!app) {
      return false
    }
    const hours = Math.floor(minutes / 60)
    const min = minutes % 60
    let readableString = ''
    if (hours > 0) {
      readableString +=
        hours.toString() + (short ? 'hr' : ' hour') + (hours > 1 ? 's ' : ' ')
    }
    readableString +=
      min.toString() + (short ? 'min' : ' minute') + (min > 1 ? 's ' : ' ')

    return readableString
  })
}
