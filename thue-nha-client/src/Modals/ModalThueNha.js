import React, { Component } from 'react'
import { Modal, Button, notification, Input } from 'antd';
import fetchData from '../api/api'
import to from 'await-to-js'

const { TextArea } = Input;

export default class ModalThueNha extends Component {
    constructor(props){
        super(props)

        this.state = {
            idNha: "",
            diaChi: "",
            taikhoan: "",
            nhanxet: ""
        }
    }

    setData = (idNha, diaChi, taikhoan) => {
        this.setState({idNha, diaChi, taikhoan})
    }

    handleThueNha = async() => {
        let [err, result] = await to(fetchData.dangkithuenha(this.state.idNha, this.state.taikhoan, this.state.nhanxet))

        if (err) notification.open({ message: "Lỗi thuê nhà!!!", description: `${err}` })

        if (result && result.message) notification.open({ message: "Thông báo", description: `${result.message}` })
        
        this.props.closeModalThueNha()
        this.props.closeModalXem()
    }

    onChangeNhanXet = ({ target: { value } }) => {
        this.setState({nhanxet: value})
    }

    render() {
        let { isModalThueNha } = this.props
        let { nhanxet } = this.state

        return (
            <Modal
                title={"Xác nhận thuê nhà"}
                visible={isModalThueNha}
                onOk={this.props.closeModalThueNha}
                onCancel={this.props.closeModalThueNha}
                footer={[
                    <Button type="default" onClick={this.handleThueNha}>
                      Xác nhận
                    </Button>,
                    <Button type="default" onClick={this.props.closeModalThueNha}>
                      Huỷ
                    </Button>,
                  ]}
                  style={{textAlign: "center"}}
                >
                    <TextArea
                        value={nhanxet}
                        onChange={this.onChangeNhanXet}
                        placeholder="Nhập lời nhận xét của bạn"
                        autosize={{ minRows: 3, maxRows: 5 }}
                    />
            </Modal>
        )
    }
}
