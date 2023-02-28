import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
// import colors from '../colors'

// const Wrapper = styled.div`
//   width: 100%;
//   position: relative;
//   height: 0;
//   padding-bottom: 56.25%;
//   border-radius: 5px;
//   border: 1px solid ${colors.light.backgroundAccent};
//   margin-bottom: 15px;

//   iframe {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     border-radius: 5px;
//   }
// `

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
    <div>
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