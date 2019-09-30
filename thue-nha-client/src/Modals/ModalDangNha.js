import React, { Component } from 'react'
import { Modal, Button, Input, Cascader, notification } from 'antd';
import fetchData from '../api/api'
import to from 'await-to-js'

const InputGroup = Input.Group;
  
export default class ModalDangNha extends Component {
    constructor(prop){
        super(prop)

        this.state = {
            dChi: "",
            soPhong: 1,
            tienthue1Thang: 10000,
            taikhoan: "",
            loainha: [],
            idLoaiNha: ""
        }
    }

    setData = async(taikhoan) => {
        let loainha = await this.layLoaiNha()

        this.setState({
            dChi: "",
            soPhong: 1,
            tienthue1Thang: 10000,
            taikhoan: taikhoan,
            loainha: loainha
        })
    }

    layLoaiNha = async(index, sodong) => {
        let [err, result] = await to(fetchData.layDanhSachLoaiNha(index, sodong))

        if (err) {
            notification.open({ message: "Lỗi lấy danh sách loại nhà!!!", description: `${err}` })
            return []
        }

        let data = result.nha
        data = data.map((value) => { 
            return { label: value.tenLoaiNha, value: value.idLoaiNha } 
        })

        return data
    }

    onChangeDiaChi = ({ target: { value } }) => {
        this.setState({dChi: value})
    }

    onChangeSoPhong = ({ target: { value } }) => {
        if (value >= 1 && value <= 100) this.setState({soPhong: value})
    }

    onChangetienThue1Thang = ({ target: { value } }) => {
        this.setState({tienthue1Thang: value})
    }

    onChangeLoaiNha = (value) => {
        if (value.length > 0) this.setState({idLoaiNha: value[0]})
    }

    handleDangNha = async() => {
        let diaChi = this.state.dChi
        let soPhong = this.state.soPhong
        let tienthue1Thang = this.state.tienthue1Thang
        let taikhoan = this.state.taikhoan
        let idNha = this.state.idLoaiNha

        if (diaChi === "") {
            notification.open({ message: "Thông báo", description: "Địa chỉ không được rỗng!!!" })
            return
        }
        if (idNha === "") {
            notification.open({ message: "Thông báo", description: "Loại nhà không được rỗng!!!" })
            return
        }

        let [err, result] = await to(fetchData.dangNha(diaChi, soPhong, tienthue1Thang, taikhoan, idNha))

        if (err) notification.open({ message: "Lỗi đăng nhà!!!", description: `${err}` })

        if (result && result.message) notification.open({ message: "Thông báo", description: `${result.message}` })
        
        this.props.closeModalDangNha()
        this.props.getAll(0, 10000, 3)
    }

    render() {
        let { isModalDangNha } = this.props
        let { dChi, soPhong, tienthue1Thang, loainha } = this.state

        return (
            <Modal
                title={`Đăng nhà`}
                visible={isModalDangNha}
                onOk={this.props.closeModalDangNha}
                onCancel={this.props.closeModalDangNha}
                footer={[
                    <Button type="default" onClick={this.handleDangNha}>
                    Đăng nhà
                    </Button>,
                    <Button type="default" onClick={this.props.closeModalDangNha}>
                    Huỷ
                    </Button>,
                ]}
                style={{textAlign: "center"}}
                >
                <Input addonBefore="Địa chỉ" style={{margin: 5}} value={dChi} onChange={this.onChangeDiaChi}/>
                <Input addonBefore="Số phòng" style={{margin: 5}} min={1} max={100} type="number" value={soPhong} onChange={this.onChangeSoPhong}/>
                <Input addonBefore="Tiền thuê 1 tháng" style={{margin: 5}} min={1} max={10000000000000} type="number" value={tienthue1Thang} onChange={this.onChangetienThue1Thang}/>
                <InputGroup compact style={{margin: 5}}>
                    <Button style={{ width: '20%' }} type="default">Loại nhà</Button>
                    <Cascader  style={{ width: '80%' }} options={loainha} onChange={this.onChangeLoaiNha} placeholder="Chọn loại nhà" />
                </InputGroup>
            </Modal>
        )
    }
}
