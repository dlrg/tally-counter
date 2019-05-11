export default function (statusCode) {
  switch (statusCode) {
  case 'OPEN': return 'Offen'
  case 'CLOSED': return 'Geschlossen'
  }
}
