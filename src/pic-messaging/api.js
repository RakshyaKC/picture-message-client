const apiUrl = 'http://localhost:4741'

export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Recieved status in 400 or 500 range.')
  }
}

export const uploadPic = acceptedFiles => {
  // send acceptedFiles from dropzone to /pictures so pictures controller can CREATE a pic in database
  const data = new FormData()
  data.append('picture[image]', acceptedFiles[0])
  // data === { picture: { image: AcceptedFileNumberOne  } }

  return fetch(apiUrl + '/pictures', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    body: data
  })
}

export const uploadCamPic = (camPic) => {
  // send acceptedFiles from dropzone to /pictures so pictures controller can CREATE a pic in database
  const data = new FormData()
  data.append('picture[image]', camPic)
  // data === { picture: { image: AcceptedFileNumberOne  } }

  return fetch(apiUrl + '/pictures', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    body: data
  })
}
