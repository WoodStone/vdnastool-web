import React, { Component } from 'react';
import { Upload, message, Button, Icon } from 'antd';

const Dragger = Upload.Dragger;

const uploadProps = {
    name: 'file',
    action: 'http://localhost:9000/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status != 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status == 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status == 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
}

class Duplicates extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <div>
                <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon"><Icon type="inbox" /></p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
            </div>
        )
        
    }
}

export default Duplicates;
