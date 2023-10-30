import moment from "moment"

export const getDateFromTime = (time?: string | Date) => {
  return moment(time).format('DD MMM YYYY')
}