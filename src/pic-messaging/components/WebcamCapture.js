import React from 'react'
import Webcam from 'react-webcam'

class WebcamCapture extends React.Component {
  setRef = webcam => {
    this.webcam = webcam
  }

  onCapture = () => {
    const imageSrc = this.webcam.getScreenshot()
    console.log(imageSrc)
    // const binaryImg = convertToBinary(imageSrc)
    // uploadPic([binaryImg])
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    }

    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.onCapture}>Take a pic!</button>
      </div>
    )
  }
}

export default WebcamCapture
