require('dotenv').config()
const axios = require('axios')
const transfomers = require('./transformers')
const fs = require('fs')
const WPAPI = require('wpapi')

async function downloadFile(fileUrl, outputLocationPath) {
  const writer = fs.createWriteStream(outputLocationPath);

  return axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  }).then(response => {

    //ensure that the user can call `then()` only when the file has
    //been downloaded entirely.

    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on('error', err => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(true);
        }
        //no need to call the reject here, as it will have been called in the
        //'error' stream;
      });
    });
  });
}

const getToken = async function () {
  // Auth
  console.log(process.env.API_AUTH_URL)
  let authOpts = {
    method: 'post',
    url: process.env.API_AUTH_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: process.env.API_CLIENT_ID,
      password: process.env.API_CLIENT_SECRET
    },
    data: `grant_type=client_credentials&scope=bmops.netlify.app/api`
  }

  let authResponse = await axios(authOpts)
  return authResponse.data.access_token
}

const getPosts = async function (token) {
  let opts = {
    method: 'get',
    url: `${process.env.API_BASE}/cms/posts`,
    headers: {
      'Authorization': token
    }
  }
  let response = await axios(opts)
  return response.data
}

const getSeries = async function (token) {
  let opts = {
    method: 'get',
    url: `${process.env.API_BASE}/cms/series`,
    headers: {
      'Authorization': token
    }
  }
  let response = await axios(opts)
  return response.data
}

const getPortfolioItems = async function (token) {
  let opts = {
    method: 'get',
    url: `${process.env.API_BASE}/cms/portfolio`,
    headers: {
      'Authorization': token
    }
  }
  let response = await axios(opts)
  return response.data
}

const getOnlyPublished = function(edges) {
  return edges.filter(e => e.status === 'publish');
}

const publishPostToWordPress = async function(post) {
  let opts = {
    method: "post",
    url: `${process.env.WP_URL}/wp-json/wp/v2/posts`,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: process.env.WP_USERNAME,
      password: process.env.WP_PASSWORD
    },
    data: JSON.stringify(post)
  }

  try {
    await axios(opts)
  } catch (err) {
    console.error(err)
  }
}

const publishPortfolioItemToWordPress = async function(portfolioItem) {
  let opts = {
    method: "post",
    url: `${process.env.WP_URL}/wp-json/wp/v2/portfolio_items`,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: process.env.WP_USERNAME,
      password: process.env.WP_PASSWORD
    },
    data: JSON.stringify(portfolioItem)
  }

  try {
    await axios(opts)
  } catch (err) {
    console.error(err)
  }
}

const createSeriesInWordPress = async function(series) {
  let slug = series.name.toLowerCase().split(' ').join('-')
  slug = slug.replace(',', '')
  slug = slug.replace('(', '')
  slug = slug.replace(')', '')
  slug = slug.trim()

  let opts = {
    method: "post",
    url: `${process.env.WP_URL}/wp-json/wp/v2/series`,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: process.env.WP_USERNAME,
      password: process.env.WP_PASSWORD
    },
    data: JSON.stringify({
      name: series.name,
      description: series.description,
      slug
    })
  }

  try {
    let res = await axios(opts)
    return res.data.id
  } catch (err) {
    if(err.response && err.response.data && err.response.data.code === "term_exists") {
      return err.response.data.data.term_id
    } else {
      console.error(err)
      throw error
    }
  }
}

const createTagInWordPress = async function(name) {
  let slug = name.toLowerCase().split(' ').join('-')
  slug = slug.replace(',', '')
  slug = slug.replace('(', '')
  slug = slug.replace(')', '')
  slug = slug.trim()

  let opts = {
    method: "post",
    url: `${process.env.WP_URL}/wp-json/wp/v2/tags`,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: process.env.WP_USERNAME,
      password: process.env.WP_PASSWORD
    },
    data: JSON.stringify({
      name,
      slug
    })
  }

  try {
    let res = await axios(opts)
    return res.data.id
  } catch (err) {
    if(err.response && err.response.data && err.response.data.code === "term_exists") {
      return err.response.data.data.term_id
    } else {
      console.error(err)
      throw error
    }
  }
}

const uploadMedia = async function(name, path) {
  var wp = new WPAPI({
    endpoint: `${process.env.WP_URL}/wp-json`,
    username: process.env.WP_USERNAME,
    password: process.env.WP_PASSWORD
  });

  let res = await wp.media().file(path).create({
    title: name,
    alt_text: name
  })

  return res.id
}

const processPosts = async function (token) {
  let series = await getSeries(token)
  for(let i = 0; i < series.length; i++) {
    let seriesId = await createSeriesInWordPress(series[i])
    series[i].wpid = seriesId
  }

  let posts = await getPosts(token)

  const postsCollection = []

  posts.forEach(p => {
    if(!p.slug) {
      let slug = p.title.toLowerCase().split(' ').join('-')
      slug = slug.replace(',', '')
      slug = slug.replace('(', '')
      slug = slug.replace(')', '')
      p.slug = slug.trim()
    }

    if(p.seriesName) {
      let s = series.find(el => el.name === p.seriesName)
      if(s && s.wpid) p.seriesId = s.wpid
    }

    let content = transfomers.compileMarkdown(p.markdown)
    // content = transfomers.highlightCode(content)
    content = transfomers.transformMagicTags(content)
    content = transfomers.removeH1Tags(content)

    let obj = {
      id: p.id,
      title: p.title,
      content,
      markdown: p.markdown,
      slug: p.slug,
      date: p.publishDateTime,
      githubRepo: p.githubRepo,
      youtubeVideo: p.youtubeVideo,
      seriesName: p.seriesName,
      iconUrl: p.iconUrl,
      series: p.series,
      excerpt: p.excerpt,
      socialMediaImageUrl: p.socialMediaImage,
      visibility: p.visibility,
      seriesOrder: p.seriesOrder,
      seriesId: p.seriesId
    }

    postsCollection.push(obj)
  })

  // Post into WordPress
  // for(let i = 0; i < 1; i++) {
  for(let i = 0; i < postsCollection.length; i++) {
    let p = postsCollection[i]
    console.log("Publishing:", p.title)
    let wpobj = {
      date: p.date,
      slug: p.slug,
      title: p.title,
      content: p.content,
      excerpt: p.excerpt,
      "status": "publish",
      "acf": {},
      series: []
    }
    if(p.youtubeVideo) wpobj.acf.video_url = p.youtubeVideo
    if(p.githubRepo) wpobj.acf.github_url = p.githubRepo
    if(p.seriesOrder) wpobj.acf.series_order = Number(p.seriesOrder)
    if(p.seriesId) wpobj.series.push(p.seriesId)
    if(p.socialMediaImageUrl) {
      // Download the file
      const fileName = `${p.slug}-featured-image.png`

      const filePath = `./temp/${fileName}`
      let didMediaDownload = false;
      try {
        await downloadFile(p.socialMediaImageUrl, filePath)
        didMediaDownload = true
      } catch (err) {
        console.log(p.socialMediaImageUrl, err.message)
      }
      if(didMediaDownload) {
        let mediaId = await uploadMedia(fileName, filePath)
        console.log("mediaId", mediaId)
        wpobj.featured_media = mediaId
      }
    }

    await publishPostToWordPress(wpobj)
  }
}

const processPortfolioItems = async function (token) {
  let portfolioItems = await getPortfolioItems(token)

  const tags = []

  portfolioItems.forEach(pi => {
    if(pi.tags) {
      pi.tags = pi.tags.split(',')
      pi.tags.forEach(t => {
        if(!tags.find(tt => tt.name === t)) tags.push({ name: t })
      })
    }

    if(!pi.slug) {
      let slug = pi.title.toLowerCase()
        .split(' ')
        .join('-')
        .replace('(', '')
        .replace(')', '')
        .replace(',', '')
      pi.slug = slug.trim()
    }

    let content = transfomers.compileMarkdown(pi.markdown)
    // content = transfomers.highlightCode(content)
    content = transfomers.transformMagicTags(content)
    content = transfomers.removeH1Tags(content)
    pi.content = content
  })

  for(let i = 0; i < tags.length; i++) {
    let tagId = await createTagInWordPress(tags[i].name)
    tags[i].id = tagId
  }

  for(let i = 0; i < portfolioItems.length; i++) {
    let pi = portfolioItems[i]
    let tagIds = []
    if(pi.tags) {
      pi.tags.forEach(t => {
        const tag = tags.find(tt => tt.name === t)
        if(tag) tagIds.push(tag.id)
      })
    }

    let wpobj = {
      date: pi.date,
      title: pi.title,
      content: pi.content,
      slug: pi.slug,
      tags: tagIds,
      acf: {
        year: pi.year
      }
    }
    await publishPortfolioItemToWordPress(wpobj)
  }
}


;(async () => {
  // Pull in data from API
  let token = await getToken()
  // await processPosts(token)
  await processPortfolioItems(token)
})()
