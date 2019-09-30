import React, { Component } from 'react'
import fetchData from '../api/api'
import to from 'await-to-js'
import { notification, Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import { withRouter } from 'react-router'

class Branches extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            count: 0,
            selectedRowKeys: []
        }
    }

    componentDidMount = async () => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)

        if (user && user.username) {
            if (Number(user.permission) === 3) {
                await this.layDanhSachChiNhanh(0, 10000)
            }else {
                this.props.history.push("/")
            }
        }
    }

    layDanhSachChiNhanh = async (indexPage, sodong) => {
        let [err, result] = await to(fetchData.layDanhSachChiNhanh(indexPage, sodong))

        if (err) {
            notification.open({ message: "Lỗi lấy danh sách chi nhánh!!!", description: `${err}` })
            return
        }

        this.setState({ data: result.nha, count: result.dem })
    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        let { data, selectedRowKeys } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const columns = [
            {
                title: 'Địa chỉ',
                dataIndex: 'dChi',
                key: 'dChi',
                ...this.getColumnSearchProps('dChi'),
            },
            {
                title: 'Điện thoại',
                dataIndex: 'dThoai',
                key: 'dThoai',
                ...this.getColumnSearchProps('dThoai'),
            },
            {
                title: 'Số fax',
                dataIndex: 'sFax',
                key: 'sFax',
                ...this.getColumnSearchProps('sFax'),
            },
            {
                title: "Tình trạng chi nhánh",
                dataIndex: "tTrang",
                key: "tTrang",
                render: (text, record) => (
                    <span>
                        {Number(text) === 0 ? "Đã xoá" : null}
                        {Number(text) === 1 ? "Đã xác nhận" : null}
                        {Number(text) === 2 ? "Chưa xác nhận" : null}
                    </span>
                ),
            }
        ];

        return (
            <Table
                pagination={true}
                columns={columns} 
                rowSelection={rowSelection} 
                dataSource={data} 
                size="middle" 
            />
        )
    }
}

export default withRouter(Branches)