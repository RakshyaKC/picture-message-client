import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { uploadPic } from '../api.js'
import WebcamCapture from './WebcamCapture'

class CreatePicMessage extends Component {
  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('Accepted:', acceptedFiles)
    uploadPic(acceptedFiles)
    console.error('Rejected:', rejectedFiles)
  }

  render() {
    return (
      <React.Fragment>
        <WebcamCapture/>
        <Dropzone onDrop={this.onDrop}>
          {/* built in things*/}
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
              <div
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <p>Drop files here...</p> :
                    <p>Try dropping some files here, or click to select files to upload.</p>
                }
              </div>
            )
          }}
        </Dropzone>
      </React.Fragment>
    )
  }
}

export default CreatePicMessage
