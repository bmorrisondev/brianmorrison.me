import React, { useEffect, useState } from 'react'

type Props = {
  url: string
}

function YouTubeEmbed(props: Props) {
  const { url } = props

  const [videoId, setVideoId] = useState<string>()

  useEffect(() => {
    const splitUrl = url.split("/")
    let vid = splitUrl[splitUrl.length - 1];
    setVideoId(vid)
  }, [])

  return (
    <div className='youtube-embed shadow-lg'>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="border-4 border-accent2"
        allowFullScreen>
      </iframe>
    </div>
  )
}

export default YouTubeEmbed