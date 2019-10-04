import React, { Component } from 'react'
import fetchData from '../api/api'
import to from 'await-to-js'
import { notification, Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import ModalXem from '../Modals/ModalXem';
import ModalXacNhanNha from '../Modals/ModalXacNhanNha';
import ModalHuyNha from '../Modals/ModalHuyNha';
import ModalDangNha from '../Modals/ModalDangNha';

export default class ListHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            count: 0,
            selectedRowKeys: [],
            isModalXem: false,
            isModalHuy: false,
            isModalXacNhan: false,
            permission: "",
            isModalDangNha: false,
            tinhTrang: 3
        }

        this.modalXemRef = React.createRef()
        this.ModalXacNhanRef = React.createRef()
        this.ModalHuyRef = React.createRef()
        this.ModalDangNhaRef = React.createRef()
    }

    componentDidMount = async () => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)

        if (user && user.username) await this.setState({permission: user.permission})
        if (user) {
            if (Number(user.permission) !== 3) {
                await this.layDanhSachNha(0, 10000, 1)
            } else {
                await this.layDanhSachNha(0, 10000, 3)
            }
        }else {
            await this.layDanhSachNha(0, 10000, 1)
        }
    }

    layDanhSachNha = async (indexPage, sodong, tinhtrang) => {
        let [err, result] = await to(fetchData.layDanhSachNha(indexPage, sodong, tinhtrang))

        if (err) {
            notification.open({ message: "Lỗi lấy danh sách nhà!!!", description: `${err}` })
            return
        }

        this.setState({ data: result.nha, count: result.dem, tinhTrang: tinhtrang })
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

    openModalXem = (data) => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)

        this.setState({isModalXem: true})

        if (user && user.username) this.modalXemRef.setData(data, user.username)
    }

    closeModalXem = () => {
        this.setState({isModalXem: false})
    }

    onRefModalXem = (ref) => this.modalXemRef = ref

    openModalXacNhan = (data) => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)

        this.setState({isModalXacNhan: true})
        if (user && user.username) this.ModalXacNhanRef.setData(data.idNha, data.dChi, user.username)
    }

    closeModalXacNhan = () => {
        this.setState({isModalXacNhan: false})
    }

    onRefModalXacNhan = (ref) => this.ModalXacNhanRef = ref

    openModalHuy = (data) => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)

        this.setState({isModalHuy: true})
        if (user && user.username) this.ModalHuyRef.setData(data.idNha, data.dChi, user.username)
    }

    closeModalHuy = () => {
        this.setState({isModalHuy: false})
    }

    onRefModalHuy = (ref) => this.ModalHuyRef = ref

    renderAction = (text, record) => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)

        if (user && user.username) {
            if (Number(user.permission) === 3) {
                return (
                    <div style={{width: 62}}>
                        <Icon onClick={() => this.openModalXacNhan(record)} style={{color: "blue", marginLeft: 5, marginRight: 5}} title={`Xác nhận chủ nhà ${record.tKhoanChuNha}`} type="check" />
                        <Icon onClick={() => this.openModalHuy(record)} style={{color: "red", marginLeft: 5}} title={`Huỷ chủ nhà ${record.tKhoanChuNha}`} type="close" />
                    </div>
                )
            } else if (Number(user.permission) === 1) {
                return (
                    <div>
                        <Icon onClick={() => this.openModalXem(record)} style={{color: "blue", marginRight: 5}} title={`Xem thông tin nhà ${record.dChi}`} type="eye" />
                    </div>
                )
            }
        }
    }

    openModalDangNha = () => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)

        this.setState({isModalDangNha: true})

        if (user && user.username) this.ModalDangNhaRef.setData(user.username)
    }

    closeModalDangNha = () => {
        this.setState({isModalDangNha: false})
    }

    onRefModalDangNha = (ref) => this.ModalDangNhaRef = ref

    render() {
        let { data, selectedRowKeys, isModalXem, isModalHuy, isModalXacNhan, permission, isModalDangNha, tinhTrang } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let user = localStorage.getItem('user')
        user = JSON.parse(user)

        let actions = {}
        if (user && user.permission) {
            if (Number(user.permission) !== 2) {
                actions = {
                    title: 'Action',
                    key: 'action',
                    render: this.renderAction,
                }
            }
        } 
        
        const columns = [
            {
                title: 'Địa chỉ',
                dataIndex: 'dChi',
                key: 'dChi',
                ...this.getColumnSearchProps('dChi'),
            },
            {
                title: 'Số phòng',
                dataIndex: 'soPhong',
                key: 'soPhong',
                ...this.getColumnSearchProps('soPhong'),
            },
            {
                title: 'Tiền thuê 1 tháng',
                dataIndex: 'tienthue1Thang',
                key: 'tienthue1Thang',
                ...this.getColumnSearchProps('tienthue1Thang'),
            },
            {
                title: 'Loại nhà',
                dataIndex: 'tenLoaiNha',
                key: 'tenLoaiNha',
                ...this.getColumnSearchProps('tenLoaiNha'),
            },
            {
                title: 'Chủ nhà',
                dataIndex: 'tKhoanChuNha',
                key: 'tKhoanChuNha',
                ...this.getColumnSearchProps('tKhoanChuNha'),
            },
            {
                title: 'Nhân Viên',
                dataIndex: 'tKhoanNhanVien',
                key: 'tKhoanNhanVien',
                ...this.getColumnSearchProps('tKhoanNhanVien'),
            },
            {
                title: 'Số lượng đặt thuê',
                dataIndex: 'soluongdatthue',
                key: 'soluongdatthue',
                ...this.getColumnSearchProps('soluongdatthue'),
            },
            {
                title: "Tình trạng nhà",
                dataIndex: "tinhTrangNha",
                key: "tinhTrangNha",
                ...this.getColumnSearchProps('tinhTrangNha'),
            },
            {
                title: "Tình trạng",
                dataIndex: "tTrang",
                key: "tTrang",
                render: (text, record) => (
                    <span>
                        {Number(text) === 0 ? "Đã xoá" : null}
                        {Number(text) === 1 ? "Đã xác nhận" : null}
                        {Number(text) === 2 ? "Chưa xác nhận" : null}
                    </span>
                ),
            },
            actions
        ];

        return (
            <>
                {
                    Number(permission) === 2 ? 
                    <Button onClick={this.openModalDangNha} type="primary">
                        <Icon type="plus"></Icon>Đăng nhà
                    </Button> : null
                }
                <Table
                    pagination={true}
                    columns={columns} 
                    rowSelection={rowSelection} 
                    dataSource={data} 
                    size="middle" 
                />
                <ModalXem 
                    isModalXem={isModalXem}
                    ref={this.onRefModalXem}
                    closeModalXem={this.closeModalXem}
                />
                <ModalXacNhanNha 
                    ref={this.onRefModalXacNhan}
                    closeModalXacNhan={this.closeModalXacNhan}
                    isModalXacNhan={isModalXacNhan}
                    getAll={this.layDanhSachNha}
                />
                <ModalHuyNha
                    ref={this.onRefModalHuy}
                    closeModalHuy={this.closeModalHuy}
                    isModalHuy={isModalHuy}
                    getAll={this.layDanhSachNha}
                    tinhTrang={tinhTrang}
                />
                <ModalDangNha 
                    ref={this.onRefModalDangNha}
                    closeModalDangNha={this.closeModalDangNha}
                    isModalDangNha={isModalDangNha}
                    getAll={this.layDanhSachNha}
                    tinhTrang={tinhTrang}
                />
            </>
        )
    }
}
