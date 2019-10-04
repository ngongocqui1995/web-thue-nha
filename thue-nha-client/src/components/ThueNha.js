import React, { Component } from 'react'
import fetchData from '../api/api'
import to from 'await-to-js'
import { notification, Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import ModalXacNhanThueNha from '../Modals/ModalXacNhanThueNha';
import ModalXacNhanHuyThueNha from '../Modals/ModalXacNhanHuyThueNha';
import { withRouter } from 'react-router'

class ThueNha extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            count: 0,
            selectedRowKeys: [],
            isModalHuy: false,
            isModalXacNhan: false
        }

        this.ModalXacNhanRef = React.createRef()
        this.ModalHuyRef = React.createRef()
    }

    componentDidMount = async () => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)

        if (user && user.username) {
            if (Number(user.permission) === 3) {
                await this.layDanhSachThueNha(0, 10000, 3)
            }else {
                this.props.history.push("/")
            }
        }
    }

    layDanhSachThueNha = async (indexPage, sodong, tinhtrang) => {
        let [err, result] = await to(fetchData.layDanhSachThueNha(indexPage, sodong, tinhtrang))

        if (err) {
            notification.open({ message: "Lỗi lấy danh sách thuê nhà!!!", description: `${err}` })
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

    openModalXacNhan = (data) => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)

        this.setState({isModalXacNhan: true})
        if (user && user.username) this.ModalXacNhanRef.setData(data.idNha, data.tKhoanNguoiThue)
    }

    closeModalXacNhan = () => {
        this.setState({isModalXacNhan: false})
    }

    onRefModalXacNhan = (ref) => this.ModalXacNhanRef = ref

    openModalHuy = (data) => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)

        this.setState({isModalHuy: true})
        if (user && user.username) this.ModalHuyRef.setData(data.idNha, data.diaChi, data.tKhoanNguoiThue)
    }

    closeModalHuy = () => {
        this.setState({isModalHuy: false})
    }

    onRefModalHuy = (ref) => this.ModalHuyRef = ref

    render() {
        let { data, selectedRowKeys, isModalHuy, isModalXacNhan } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const columns = [
            {
                title: 'Tài khoản người thuê',
                dataIndex: 'tKhoanNguoiThue',
                key: 'tKhoanNguoiThue',
                ...this.getColumnSearchProps('tKhoanNguoiThue'),
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'diaChi',
                key: 'diaChi',
                ...this.getColumnSearchProps('diaChi'),
            },
            {
                title: 'Ngày xem',
                dataIndex: 'ngXem',
                key: 'ngXem',
                ...this.getColumnSearchProps('ngXem'),
            },
            {
                title: 'Nhận xét',
                dataIndex: 'nhanXet',
                key: 'nhanXet',
                ...this.getColumnSearchProps('nhanXet'),
            },
            {
                title: "Tình trạng thuê",
                dataIndex: "tinhtrangThue",
                key: "tinhtrangThue",
                ...this.getColumnSearchProps('tinhtrangThue'),
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                <span>
                    <Icon onClick={() => this.openModalXacNhan(record)} style={{color: "blue", marginRight: 5}} title={`Xác nhận chủ nhà${record.tenCN}`} type="check" />
                    <Icon onClick={() => this.openModalHuy(record)} style={{color: "red", marginLeft: 5}} title={`Huỷ chủ nhà${record.tenCN}`} type="close" />
                </span>
                ),
            }
        ];

        return (
            <>
                <Table
                    pagination={true}
                    columns={columns} 
                    rowSelection={rowSelection} 
                    dataSource={data} 
                    size="middle" 
                />
                <ModalXacNhanThueNha 
                    ref={this.onRefModalXacNhan}
                    closeModalXacNhan={this.closeModalXacNhan}
                    isModalXacNhan={isModalXacNhan}
                    getAll={this.layDanhSachThueNha}
                />
                <ModalXacNhanHuyThueNha 
                    ref={this.onRefModalHuy}
                    closeModalHuy={this.closeModalHuy}
                    isModalHuy={isModalHuy}
                    getAll={this.layDanhSachThueNha}
                />
            </>
        )
    }
}

export default withRouter(ThueNha)