const CLOUD_NAME = 'rmnkh3jd'
const UPLOAD_PRESET = 'Thar manju'
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

export default async function uploadImage(file) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)

  const res = await fetch(API_URL, { method: 'POST', body: formData })
  if (!res.ok) throw new Error('Upload failed')
  const data = await res.json()
  return data.secure_url
}
