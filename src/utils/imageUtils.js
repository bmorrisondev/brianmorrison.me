exports.fixImageUrl = function(featuredImage) {
  featuredImage.azureFeaturedImageUrl = featuredImage.mediaItemUrl.replace("https://wp2.brianmorrison.me/wp-content/uploads", "https://cdn.brianmorrison.me/images")
  return featuredImage
}