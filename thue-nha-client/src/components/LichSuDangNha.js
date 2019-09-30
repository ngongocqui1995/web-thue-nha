import React, { Component } from 'react'
import fetchData from '../api/api'
import to from 'await-to-js'
import { notification, Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import { withRouter } from 'react-router'

class LichSuDangNha extends Component {
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
            if (Number(user.permission) === 2) {
                await this.layLichSuDangNha(user.username, 0, 10000, 3)
            }else {
                this.props.history.push("/")
            }
        }
    }

    layLichSuDangNha = async (taikhoan, indexPage, sodong, tinhtrang) => {
        let [err, result] = await to(fetchData.layLichSuDangNha(taikhoan, indexPage, sodong, tinhtrang))

        console.log(result)
        if (err) {
            notification.open({ message: "Lỗi lấy lịch sử đăng nhà!!!", description: `${err}` })
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

export default withRouter(LichSuDangNha)