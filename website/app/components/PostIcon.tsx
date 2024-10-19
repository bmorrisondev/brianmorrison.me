import React from "react"
import Paper from '../components/svgs/Paper'

type PostIconProps = {
  post: any
}

function PostIcon({ post }: PostIconProps) {
  if(post?.series?.length > 0 && post.series[0].icon) {
    return (
      <div className="w-[25px] h-[25px] mr-2 flex justify-center items-center">
        <img className="max-w-[25px] max-h-[25px] rounded"
          src={post.series[0].icon}
          alt="series icon" />
      </div>
    )
  }

  if(post.icon) {
    return (
      <div className="w-[25px] h-[25px] mr-2 flex justify-center items-center">
        <img className="max-w-[25px] max-h-[25px] rounded"
          src={post.icon}
          alt="blog-post-icon" />
      </div>
    )
  }

  return <Paper className="mr-2 text-slate-700" />
}

export default PostIcon