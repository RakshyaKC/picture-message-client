import React, { Component } from 'react'
import ReactWebcam from 'react-webcam'
import { uploadCamPic } from '../api.js'

export default class Webcam extends Component {
  state = { photos: [] }

  setRef = webcam => {
    this.webcam = webcam
  }

  capture = () => {
    // Every time a "capture" is taken, show the captured photo overlayed
    // on the video.
    const imageSrc = this.webcam.getScreenshot()
    // getScreenshot is the base64 image in the webcam upon capture
    this.setState({ photos: this.state.photos.concat(imageSrc) })
  }

  save = () => {
    // Get the "canvas" element and set its size to the
    // same size as the webcam video and snapped photos.
    const canvas = document.getElementById('canvas')
    const canvasWidth = this.webcam.video.clientWidth
    const canvasHeight = this.webcam.video.clientHeight
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    const ctx = canvas.getContext('2d')
    // Set this property to enable the "overlay" effect.
    ctx.globalCompositeOperation = 'darken'

    // Select all elements with class "photo", and convert it to an array
    // so that it can be mapped over.
    const photos = [].slice.call(document.querySelectorAll('.photo'))
    // Map over the photos array, inserting each photo element into the canvas
    photos.map(p => ctx.drawImage(p, 0, 0, canvas.width, canvas.height))

    const img = canvas.toDataURL()
    // "img" is now all of the photos overlayed, in base64
    // it should be converted to a binary and sent to the server
    console.log(img)

    const imgBinary = this.dataURLtoBlob(img)

    uploadCamPic(imgBinary)
      .then(res => res.json())
      .then(resJson => this.props.onClick(resJson.picture.id))
  }

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

  render() {
    return (
      <div>
        <button onClick={this.capture}>Capture photo</button>
        <button onClick={this.save}>Save photo</button>
        {/*
           The cool blending effects come from the styles on these
           "video", "photos", and "photo" classes in in "styles.css"
        */}
        <ReactWebcam className="video" ref={this.setRef} />
        <div className="photos">
          {this.state.photos.map(p => (
            <img key={p} src={p} className="photo" />
          ))}
        </div>
      </div>
    )
  }
}
