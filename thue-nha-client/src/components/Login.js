import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import React from 'react'
import '../App.css';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router'
import fetchData from '../api/api'
import to from 'await-to-js'

class NormalLoginForm extends React.Component {
  componentDidMount = () => {
    let user = localStorage.getItem('user')
    user = JSON.parse(user)

    if (user && user.username) {
      this.props.history.push('/')
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let [err, result] = await to(fetchData.dangNhap(values.username, values.password))
        if (err) notification.open({ message: "Đăng nhập thất bại!!!", description: `${err}` })

        if (result.state === "ok") {
          notification.open({ message: "Thông báo", description: `${result.message}` })
          localStorage.setItem('user', JSON.stringify({ permission: result.permission, username: values.username }))
          this.props.history.push("/")
        }else {
          notification.open({ message: "Đăng nhập thất bại!!!", description: `${result.message}` })
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form style={{textAlign: 'center', marginTop: 100}} onSubmit={this.handleSubmit} className="login-form">
        <h1>Login</h1>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              style={{width:300}}
              
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              style={{width:300}}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Đăng nhập
            </Button>
            &nbsp;
            Hoặc<Button type="link"><Link to="/user/register">Đăng kí</Link></Button>
        </Form.Item>
        <div>
          <Button type="link">
            <Link to="/">Trở lại trang chủ</Link>
          </Button>
        </div>
      </Form>
    );
  }
}

export default withRouter(Form.create({ name: 'normal_login' })(NormalLoginForm));