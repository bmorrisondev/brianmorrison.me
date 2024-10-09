
export function fixupDescription(description: string): string {
  let temp = ""
  const spl = description.split(" ")
  for(let i = 0; temp.length < 100 && i - 1 < spl.length; i++) {
    temp += spl[i]
    if(temp.length < 100) {
      temp += " "
    }
  }
  if(temp.length >= 100) {
    temp += "..."
  }
  temp = temp.replace(/(<([^>]+)>)/ig, '')
  return temp
}