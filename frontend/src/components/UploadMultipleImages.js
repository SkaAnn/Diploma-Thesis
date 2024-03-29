import React, { Component } from 'react';

// https://www.positronx.io/react-multiple-files-upload-with-node-express-tutorial/
// https://www.positronx.io/react-single-and-multiple-images-upload-preview/
export default class UploadMultipleImages extends Component {

    fileObj = [];
    fileArray = [];

    constructor(props) {
        super(props)
        this.state = {
            file: [null],
            reload: false
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
    }

    uploadMultipleFiles(e) {
        Array.from(e.target.files).forEach(file => { this.fileObj.push(file) });
        this.fileArray = []
        for (let i = 0; i < this.fileObj.length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[i]))
        }
        this.setState({ file: this.fileArray })
        this.props.onUpload(this.fileObj)
    }

    uploadFiles(e) {
        e.preventDefault()
    }

    deleteImage(e, index) {
        e.preventDefault()
        this.fileArray.splice(index, 1);
        this.fileObj.splice(index, 1);
        this.props.onUpload(this.fileObj)
        this.setState(
            { reload: true },
            () => this.setState({ reload: false })
        )
    }

    render() {
        return (
            <>
                <div className="form-group multi-preview">
                    {(this.fileArray || []).map((url, index) => (
                        <img src={url} alt={index} key={index} onClick={(e) => { this.deleteImage(e, index) }} />
                    ))}
                </div>
                <div className="form-group">
                    <input type="file" accept="image/*" name='photos' className="form-control pb-5" onChange={this.uploadMultipleFiles} multiple />
                </div>
            </ >
        )
    }
}