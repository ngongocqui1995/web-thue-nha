import React, { Component } from 'react'
import { Input, notification } from 'antd'
import fetchData from '../api/api'
import to from 'await-to-js'
import moment from 'moment'

export default class DetailUser extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: "",
            ten: "",
            dChi: "",
            dThoai: "",
            gtinh: "",
            ngSinh: "",
            Luong: "",
            tKhoan: "",
            tTrang: ""
        }
    }

    componentDidMount = async() => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)

        if (user && user.username) {
            await this.getThongTinUser(user.username, user.permission)
        }
    }

    getThongTinUser = async(username, permission) => {
        if (permission === "1") {
            await this.getThongTinUserNguoiThue(username)
        }

        if (permission === "2") {
            await this.getThongTinUserChuNha(username)
        }

        if (permission === "3") {
            await this.getThongTinUserNhanVien(username)
        }
    }

    getThongTinUserNguoiThue = async(username) => {
        let [err, result] = await to(fetchData.layThongTinNguoiThue(username))
        
        if (err) notification.open({ message: "Lỗi lấy thông tin nguười thuê!!!", description: `${err}` })

        if (result.data && result.data.length > 0) {
            this.setState({
                id: result.data[0].idNguoiThue,
                ten: result.data[0].tenNT,
                dChi: result.data[0].dChi,
                dThoai: result.data[0].dThoai,
                tTrang: result.data[0].tTrang
            })
        }
    }

    getThongTinUserChuNha = async(username) => {
        let [err, result] = await to(fetchData.layThongTinChuNha(username))
        if (err) notification.open({ message: "Lỗi lấy thông tin chủ nhà!!!", description: `${err}` })
        
        if (result.data && result.data.length > 0) {
            this.setState({
                id: result.data[0].idChuNha,
                ten: result.data[0].tenCN,
                dChi: result.data[0].dChi,
                dThoai: result.data[0].dThoai,
                tTrang: result.data[0].tTrang
            })
        }
    }

    getThongTinUserNhanVien = async(username) => {
        let [err, result] = await to(fetchData.layThongTinNhanVien(username))
        if (err) notification.open({ message: "Lỗi lấy thông tin nhân viên!!!", description: `${err}` })
        
        if (result.data && result.data.length > 0) {
            this.setState({
                id: result.data[0].idNhanVien,
                ten: result.data[0].tenNV,
                dChi: result.data[0].dChi,
                dThoai: result.data[0].dThoai,
                tTrang: result.data[0].tTrang,
                gtinh: result.data[0].gtinh,
                ngSinh: result.data[0].ngSinh,
                Luong: result.data[0].Luong,
                tKhoan: result.data[0].tKhoan
            })
        }
    }

    render() {
        let { Luong, dChi, dThoai, gtinh, id, ngSinh, tKhoan, tTrang, ten } = this.state

        return (
            <div style={{justifyContent: "center", display: "flex"}}>
                <div style={{width: "50%"}}>
                    <Input addonBefore="Id" value={id} disabled/>
                    <Input addonBefore="Tên" value={ten} disabled/>
                    <Input addonBefore="Địa chỉ" value={dChi} disabled/>
                    <Input addonBefore="Điện thoại" value={dThoai} disabled />
                    <Input addonBefore="Giới tính" value={gtinh} disabled />
                    <Input addonBefore="Ngày sinh" value={moment(ngSinh).format("DD/MM/YYYY")} disabled />
                    <Input addonBefore="Lương" value={Luong} disabled />
                    <Input addonBefore="Tài khoản" value={tKhoan} disabled />
                    <Input addonBefore="Tình trạng tài khoản" value={tTrang} disabled />
                </div>
            </div>
        )
    }
}
