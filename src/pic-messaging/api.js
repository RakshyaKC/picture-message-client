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
    body: data
  })
}

export const getUsers = () => {
  return fetch(apiUrl + '/users', {
    method: 'GET'
  })
}

export const createMessage = (picture_id, receiver_id, user) => {
  const data = new FormData()
  data.append('message[picture_id]', picture_id)
  data.append('message[receiver_id]', receiver_id)
  return fetch(apiUrl + '/messages', {
    method: 'POST',
    headers: {
      'Authorization':`Token token=${user.token}`
    },
    body: data
  })
}

export const getMessage = (user) => {
  console.log(user)
  const data = new FormData()
  data.append('message[receiver_id]', user.id)
  return fetch(apiUrl + '/messages', {
    method: 'GET',
    headers: {
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const seenMessage = (receiver_id, user) => {
  const data = new FormData()
  data.append('message[receiver_id]', receiver_id)
  return fetch(apiUrl + '/messages', {
    method: 'PATCH',
    headers: {
      'Authorization':`Token token=${user.token}`
    },
    body: data
    // seen: true
  })
}
