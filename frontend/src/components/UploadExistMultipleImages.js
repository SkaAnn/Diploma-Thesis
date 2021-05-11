import React, { Component } from 'react';

// https://www.positronx.io/react-multiple-files-upload-with-node-express-tutorial/
// https://www.positronx.io/react-single-and-multiple-images-upload-preview/
export default class UploadExistMultipleImages extends Component {

    fileObj = [];
    fileNewObj = [];
    fileArray = [];

    constructor(props) {
        super(props)
        this.state = {
            file: [null],
            reload: false
        }
        if (this.props.images) {
            const imagesUrl = []
            const imageObj = []
            for (var i = 0; i < this.props.images.length; i++) {
                imagesUrl.push(this.props.images[i])
                imageObj.push(this.props.images[i])
            }
            this.fileArray = imagesUrl
            this.fileObj = imageObj
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
        this.props.onLoad(this.props.images)
    }

    uploadMultipleFiles(e) {

        Array.from(e.target.files).forEach(file => { this.fileObj.push(file) });
        Array.from(e.target.files).forEach(file => { this.fileNewObj.push(file) });
        for (let i = 0; i < this.fileNewObj.length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileNewObj[i]))
        }
        this.fileNewObj = []
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