
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


export function buildHeader(pageTitle?: string) {
  const defaultDescription = "Personal blog of Brian Morrison II, full stack developer & content creator."

  return [
    { title:  `${pageTitle && `${pageTitle} | `}Brian Morrison II` },
    { name: "description", content: defaultDescription },
  ];
};