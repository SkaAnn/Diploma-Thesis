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
        // if (this.fileObj.length === 0) { 
        //     this.fileObj.push(e.target.files) 
        // } else {
        Array.from(e.target.files).forEach(file => { this.fileObj.push(file) });
        //e.target.files.map(file => this.fileObj.push(file))
        // }
        this.fileArray = []
        for (let i = 0; i < this.fileObj.length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[i]))
        }
        this.setState({ file: this.fileArray })
        console.log(this.fileObj)
        this.props.onUpload(this.fileObj)
    }


    // uploadMultipleFiles(e) {
    //     this.fileObj.push(e.target.files)
    //     for (let i = 0; i < this.fileObj[0].length; i++) {
    //         this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
    //     }
    //     this.setState({ file: this.fileArray })
    //     this.setState({ imgCollection: e.target.files })
    //     console.log(this.state.imgCollection)
    //     this.props.onUpload(this.imgCollection) //this.fileArray)
    //     this.fileObj = []
    // }

    uploadFiles(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    deleteImage(e, index) {
        e.preventDefault()
        this.fileArray.splice(index, 1);
        this.fileObj.splice(index, 1);
        this.props.onUpload(this.fileObj)
        console.log(index)
        this.setState(
            { reload: true },
            () => this.setState({ reload: false })
        )
    }

    render() {
        return (
            <form>
                <div className="form-group multi-preview">
                    {(this.fileArray || []).map((url, index) => (
                        <img src={url} alt={index} key={index} onClick={(e) => { this.deleteImage(e, index) }} />
                    ))}
                </div>

                <div className="form-group">
                    <input type="file" name='photos' className="form-control" onChange={this.uploadMultipleFiles} multiple />
                </div>
                <button type="button" className="btn btn-danger btn-block" onClick={this.uploadFiles}>Upload</button>
            </form >
        )
    }
}