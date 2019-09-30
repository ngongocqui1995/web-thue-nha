import { Form, Input, Tooltip, Icon, Select, Button, notification } from 'antd';
import React from 'react'
import fetchData from '../api/api'
import to from 'await-to-js'
import { Link } from "react-router-dom";

const { Option } = Select;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async(err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        await this.handleDangKi(values)
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Mật khẩu bạn nhập không khớp!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  handleDangKi = async(values) => {
    let { dangki } = this.props

    if (dangki === 1) {
      await this.handleDangKiNguoiThue(values)
    } else {
      await this.handleDangKiChuNha(values)
    }
  }

  handleDangKiNguoiThue = async(values) => {
    let [err, result] = await to(fetchData.dangKiNguoiThue(values.email, values.password, values.nickname, values.address, values.phone))
    if (err) notification.open({ message: "Lỗi đăng kí tài khoản người thuê!!!", description: `${err}` })

    notification.open({ message: "Thông báo", description: `${result.message}` })
  }

  handleDangKiChuNha = async(values) => {
    let [err, result] = await to(fetchData.dangKiChuNha(values.email, values.password, values.nickname, values.address, values.phone))
    if (err) notification.open({ message: "Lỗi đăng kí tài khoản chủ nhà!!!", description: `${err}` })

    notification.open({ message: "Thông báo", description: `${result.message}` })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { title } = this.props

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '84',
    })(
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
      </Select>,
    );

    return (
      <div style={{ textAlign: '-moz-center' }}>
        <Form style={{ width: '50%' }} {...formItemLayout} onSubmit={this.handleSubmit}>
          <h1>{title}</h1>
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'Email không đúng định dạng!',
                },
                {
                  required: true,
                  message: 'Xin nhập email!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Mật khẩu" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Xin nhập mật khẩu!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Nhập lại mật khẩu" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Xin hãy nhập mật khẩu!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Tên&nbsp;
                <Tooltip title="Bạn muốn người khác gọi bạn là gì?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Xin hãy nhập tên!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
          >
            {getFieldDecorator('address', {
              rules: [{ required: true, message: 'Xin hãy địa chỉ!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Số điện thoại">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Xin hãy nhập số điện thoại!' }],
            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng kí
          </Button>
        </Form>
        <div>
          <Button type="link">
            <Link to="/">Trang chủ</Link>
          </Button>
          <Button type="link">
            <Link to="/user/login">Đăng nhập</Link>
          </Button>
        </div>
      </div>
    );
  }
}

export default Form.create({ name: 'register' })(RegistrationForm);