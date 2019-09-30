import React, { Component } from 'react'
import { Modal, Button, notification } from 'antd';
import fetchData from '../api/api'
import to from 'await-to-js'

export default class ModalXacNhanThueNha extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: "",
            taikhoan: ""
        }
    }

    setData = (id, taikhoan) => {
        this.setState({id, taikhoan})
    }

    handleXacNhan = async() => {
        let [err, result] = await to(fetchData.xacnhanthuenha(this.state.id, this.state.taikhoan))

        if (err) notification.open({ message: "Lỗi xác nhận!!!", description: `${err}` })

        if (result && result.message) notification.open({ message: "Thông báo", description: `${result.message}` })
        
        this.props.closeModalXacNhan()
        this.props.getAll(0, 10000, 3)
    }

    render() {
        let { isModalXacNhan } = this.props
        let { taikhoan } = this.state

        return (
            <Modal
                title={"Xác nhận"}
                visible={isModalXacNhan}
                onOk={this.props.closeModalXacNhan}
                onCancel={this.props.closeModalXacNhan}
                footer={[
                    <Button type="default" onClick={this.handleXacNhan}>
                      Xác nhận
                    </Button>,
                    <Button type="default" onClick={this.props.closeModalXacNhan}>
                      Huỷ
                    </Button>,
                  ]}
                  style={{textAlign: "center"}}
                >
                    {`Bạn chắc chắn muốn xác nhận cho tài khoản ${taikhoan} này thuê nhà không?`}
            </Modal>
        )
    }
}
