
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

type BuildHeaderProps = {
  pageTitle?: string
  description?: string
  ogImageUrl?: string
  url?: string
}

export function buildHeader({ pageTitle, description, ogImageUrl, url }: BuildHeaderProps) {

  const defaultDescription = "Personal blog of Brian Morrison II, full stack developer & content creator."
  const titleHeader = pageTitle ? `${pageTitle} • Brian Morrison II` : "Brian Morrison II"
  const desc = description ? fixupDescription(description) : defaultDescription;
  const origin = url ? new URL(url).origin : "https://brianmorrison.me"

  return [
    { title: titleHeader },
    { name: "description", content: defaultDescription },
    { name: "og:image", content: ogImageUrl ? origin + ogImageUrl  : `${origin}/img/social.png` },
    { name: "og:type", content: "website" },
    { name: "og:title", content: titleHeader },
    { name: "og:description", content: desc },
    { name: "og:url", content: url},
    { name: "og:site_name", content: "Brian Morrison II" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: titleHeader },
    { name: "twitter:site", content: "@brianmmdev" },
    { name: "twitter:creator", content: "@brianmmdev" },
    { name: "twitter:description", content: desc },
    { name: "runson", content: 'remix' },
  ];
}