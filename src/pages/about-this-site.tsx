import React from 'react'
import DefaultLayout from "../layouts/DefaultLayout"

function AboutThisSite({ location }) {
  return (
    <DefaultLayout location={location} pageTitle="About This Site">
      <div>
        <h1>About This Site</h1>
        <p>This site is built using the following stack:</p>
        <ul>
          <li><b>GatsbyJS</b> as the front end static site generator.</li>
          <li><b>WordPress</b> as a headless CMS for the blog & portfolio pages.</li>
          <li><b>Netlify</b> for hosting & serverless functions</li>
          <li><b>Namecheap</b> for the domain hosting.</li>
        </ul>
        <p>The site is also completely open source, feel free to check it out at <a href="https://github.com/bmorrisondev/brianmorrison.me" target="_blank">https://github.com/bmorrisondev/brianmorrison.me</a></p>
        <h2>Why I Chose This Stack</h2>
        <p>This is actually the fourth major version of my website. For years, I hosted my site in a traditional WordPress instance on Namecheap (and a few others along the way). When I learned how static site generators worked, mainly Gatsby, I decided to explore the framework and decided to go that route, but originally on AWS instead of Netlify.</p>
        <p>The third version of the site was actually in Gridsome, a Gatsby-like framework that uses Vue instead of React as it was my preferred front end framework at the time. I also moved the backend content away from WordPress to a completely custom CMS hosted in AWS. I ran my site like this for a few years before deciding to go back to Gatsby & WordPress. I also decided to host on Netlify instead of AWS to simplify the stack overall.</p>
        <p>I actually like WordPress as a CMS and the newer versions of Gatsby support WordPress along with Custom Post Types and Custom Fields VERY well. It essentially allows me to completely customize my schema using a tried and true backend system.</p>
      </div>
    </DefaultLayout>
  )
}

export default AboutThisSite