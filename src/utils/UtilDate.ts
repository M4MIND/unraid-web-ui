export const UtilDate = {
  ConvertUtcToHMS: (time: string) => {
    const date = new Date(time)

    // eslint-disable-next-line max-len
    return `${date.getHours() < 10 ? `0${date.getHours()}`: date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${date.getSeconds() < 10 ? `0${date.getSeconds()}`: date.getSeconds()}`
  }
}
