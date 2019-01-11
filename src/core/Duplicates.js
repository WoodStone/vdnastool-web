import React, { Component } from 'react';
import axios from 'axios';
import { Table, List } from 'antd';

const columns = [{
    title: 'Hash',
    dataIndex: 'hash',
    sorter: false
}, {
    title: 'Filename',
    dataIndex: 'filename',
    sorter: true
}, {
    title: 'Count',
    dataIndex: 'amount',
    sorter: true
}]

class Duplicates extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            pagination: {
                pageSize: 15,
                showSizeChanger: true,
                pageSizeOptions: ['10', '15', '20', '30', '40', '50'],
            },
            loading: false,
            dirs: {}
        }
    }

    componentDidMount() {
       this.fetch({
           results: this.state.pagination.pageSize
       })
    }

    getDirsFromHash(hash) {
        if (!this.state.dirs[hash]) {
            axios.get("http://localhost:9000/hash/" + hash + "/dirs").then(r => {
                this.setState({dirs: {...this.state.dirs, [hash]: r.data}})
            })
        }
    }

    handleTableChange = (pagination, filters, sorter) => {
        //const pager = {...this.state.pagination};
        const pager = {...pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager
        });

        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }

    fetch = (params) => {
        this.setState({loading: true});
        axios.get("http://localhost:9000/point", {params: {
            ...params
        }}).then(r => {
            const pagination = { ...this.state.pagination };
            pagination.total = r.data.total;
            this.setState({
                loading: false,
                data: r.data.data,
                pagination
            })
        })
        //console.log('params:', params);
    }

    render() {

        return (
            <div>
                <Table
                    size="small"
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}   
                    expandRowByClick={true}
                    onExpand={(expanded, record) => this.getDirsFromHash(record.hash)}
                    expandedRowRender={record => 
                        <List
                            size="small"
                            header={<div>Path</div>}
                            bordered
                            dataSource={this.state.dirs[record.id]}
                            renderItem={item => (<List.Item>{item.path}</List.Item>)}
                        />}
                />
            </div>
        )
        
    }
}

export default Duplicates;
