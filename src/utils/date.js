export const formatDate = (date) => {
  if (!date) return '-'

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) return '-'

  return parsedDate.toLocaleDateString('sv-SE')
}
