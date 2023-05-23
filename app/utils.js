const getTagByName = (tagsTab, name) => {
   tagsTab.forEach((item) => {
      if (item.name == name) return 
   })

   return 0
}

const getPhotoById = (photosTab, id) => {
   photosTab.forEach((item) => {
      if (item.id == id) return item
   })

   return 0
}

module.exports = { getTagByName, getPhotoById }