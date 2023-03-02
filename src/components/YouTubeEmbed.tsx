import React, { useEffect, useState } from 'react'
import './YouTubeEmbed.css'

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
    <div className='youtube-embed'>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
      </iframe>
    </div>
  )
}

export default YouTubeEmbed