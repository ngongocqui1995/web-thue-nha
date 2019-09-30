import React, { Component } from 'react'
import { Modal, Button, Input } from 'antd';
import ModalThueNha from './ModalThueNha';

export default class ModalXem extends Component {
    constructor(prop){
        super(prop)

        this.state = {
            idNha: "",
            dChi: "",
            soPhong: "",
            tienthue1Thang: "",
            tenLoaiNha: "",
            tKhoanChuNha: "",
            tKhoanNhanVien: "",
            soluongdatthue: "",
            tinhTrangNha: "",
            taikhoan: "",
            isModalThueNha: false
        }

        this.ModalThueNhaRef = React.createRef()
    }

    setData = (data, taikhoan) => {
        this.setState({
            idNha: data.idNha,
            dChi: data.dChi,
            soPhong: data.soPhong,
            tienthue1Thang: data.tienthue1Thang,
            tenLoaiNha: data.tenLoaiNha,
            tKhoanChuNha: data.tKhoanChuNha,
            tKhoanNhanVien: data.tKhoanNhanVien,
            soluongdatthue: data.soluongdatthue,
            tinhTrangNha: data.tinhTrangNha,
            taikhoan: taikhoan
        })
    }

    openModalThueNha = () => {
        this.setState({isModalThueNha: true})
        this.ModalThueNhaRef.setData(this.state.idNha, this.state.dChi, this.state.taikhoan)
    }

    closeModalThueNha = () => {
        this.setState({isModalThueNha: false})
    }

    onRefModalThueNha = (ref) => this.ModalThueNhaRef = ref

    render() {
        let { isModalXem } = this.props
        let { dChi, soPhong, soluongdatthue, tKhoanChuNha, tKhoanNhanVien, tenLoaiNha, tienthue1Thang, 
            tinhTrangNha, isModalThueNha } = this.state

        return (
            <>
                <Modal
                    title={`Xem thông tin nhà ${dChi}`}
                    visible={isModalXem}
                    onOk={this.props.closeModalXem}
                    onCancel={this.props.closeModalXem}
                    footer={[
                        <Button type="default" onClick={this.openModalThueNha}>
                        Thuê nhà
                        </Button>,
                        <Button type="default" onClick={this.props.closeModalXem}>
                        Huỷ
                        </Button>,
                    ]}
                    style={{textAlign: "center"}}
                    >
                    <Input addonBefore="Địa chỉ" style={{margin: 5}} defaultValue={dChi} disabled/>
                    <Input addonBefore="Số phòng" style={{margin: 5}} defaultValue={soPhong} disabled />
                    <Input addonBefore="Số lượng đặt thuê" style={{margin: 5}} defaultValue={soluongdatthue} disabled />
                    <Input addonBefore="Tài khoản chủ nhà" style={{margin: 5}} defaultValue={tKhoanChuNha} disabled />
                    <Input addonBefore="Tài khoản nhân viên" style={{margin: 5}} defaultValue={tKhoanNhanVien} disabled />
                    <Input addonBefore="Tên loại nhà" style={{margin: 5}} defaultValue={tenLoaiNha} disabled />
                    <Input addonBefore="Tiền thuê 1 tháng" style={{margin: 5}} defaultValue={tienthue1Thang} disabled />
                    <Input addonBefore="Tình trạng nhà" style={{margin: 5}} defaultValue={tinhTrangNha} disabled />
                </Modal>
                <ModalThueNha 
                    isModalThueNha={isModalThueNha}
                    closeModalThueNha={this.closeModalThueNha}
                    closeModalXem={this.props.closeModalXem}
                    ref={this.onRefModalThueNha}
                />
            </>
        )
    }
}
