import React from 'react'
import Webcam from 'react-webcam'
import { uploadCamPic } from '../api.js'


class WebcamCapture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: ''
    }
  }
  setRef = webcam => {
    this.webcam = webcam
  }

  // onCapture = () => {
  //   const imageSrc = this.webcam.getScreenshot()
  //   // console.log('onCapture', imageSrc)
  //   // const binaryImg = convertToBinary(imageSrc)
  //   // uploadPic([binaryImg])
  // }

  onCapture = () => this.setState({
    image: this.dataURLtoBlob(this.webcam.getScreenshot())
  })

  dataURLtoBlob = (dataURI) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = atob(dataURI.split(',')[1])

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length)

    // create a view into the buffer
    const ia = new Uint8Array(ab)

    // set the bytes of the buffer to the correct values
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    // write the ArrayBuffer to a blob, and you're done
    const blob = new Blob([ab], {type: mimeString})
    return blob
  }

  onSend = () => {
    const camPic = this.state.image
    console.log('onSend camPic:', camPic)
    uploadCamPic(camPic)
      .then(res => console.log(res))
      // .then(res => res.json())
      // .then(resJson => console.log(resJson))
  }

  render() {
    const videoConstraints = {
      width: 500,
      height: 500,
      facingMode: 'user'
    }
    console.log(this.state.image)
    return (
      <div>
        <Webcam
          audio={false}
          height={500}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={500}
          videoConstraints={videoConstraints}
        /><br/>
        <button onClick={this.onCapture}>Take a pic!</button>
        <button onClick={this.onSend}>Send this pic!</button>
      </div>
    )
  }
}

export default WebcamCapture
