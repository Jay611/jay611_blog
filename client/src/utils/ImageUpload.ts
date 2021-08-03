export const checkImage = (file: File) => {
  const types = ['image/png', 'image/jpeg']
  let err = ''
  // if (!file) return (err = 'File does not exist.')

  if (file.size > 1024 * 1024)
    // 1mb
    err = 'The largest image size is 1mb.'

  if (!types.includes(file.type))
    err = 'The image format incorrect. (image type is png or jpeg)'

  return err
}

export const imageUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'ait64jto')
  formData.append('cloud_name', 'dhkcdaal8')

  const res = await fetch('https://api.cloudinary.com/v1_1/dhkcdaal8/upload', {
    method: 'POST',
    body: formData,
  })

  const data = await res.json()
  return { public_id: data.public_id, url: data.secure_url }
}
