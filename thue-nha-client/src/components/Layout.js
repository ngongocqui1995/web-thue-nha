import { Layout, Menu, Icon } from 'antd';
import React, { Component } from 'react'
import logo from '../logo.svg';
import ListHome from './ListHome';
import { Link, Route } from "react-router-dom";
import DetailUser from './DetailUser';
import Branches from './Branches';
import ChuNha from './ChuNha';
import NguoiThue from './NguoiThue';
import { withRouter } from 'react-router'
import ThueNha from './ThueNha';
import LichSuGiaoDich from './LichSuGiaoDich';
import LichSuDangNha from './LichSuDangNha';

const {  Content, Footer, Sider, Header } = Layout;
const { SubMenu } = Menu;

class SiderWeb extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: "User",
            permission: "",
            collapsed: false,
            title: "Thuê nhà"
        }
    }

    componentDidMount = () => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)

        if (user && user.username) {
            this.setState(user)
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    onCollapse = collapsed => {
        this.setState({ collapsed, title: this.state.title !== "" ? "" : "Thuê nhà" });
    };

    dangXuat = () => {
        localStorage.clear()
        this.setState({username: "User", permission: ""})
        this.props.history.push("/")
    }

    render() {
        let { title, username, permission } = this.state

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" style={{ textAlign: "center", justifyContent: "center", display: "flex" }}>
                        <img src={logo} className="App-logo" style={{ width: 30, height: 30 }} alt="logo" />
                        <div style={{ color: "#ffffff", fontSize: 20 }}>{title}</div>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Link to="/">
                                <Icon type="home" />
                                <span>Danh sách nhà</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span>{username}</span>
                                </span>
                            }
                        >
                            {
                                username === "User" ? 
                                <Menu.Item key="3">
                                    <Link to="/user/login">Đăng nhập</Link>
                                </Menu.Item> : null
                            }
                            {
                                username !== "User" ? 
                                <Menu.Item key="3">
                                    <Link to="/user-detail">Xem thông tin</Link>
                                </Menu.Item> : null
                            }
                            {
                                username !== "User" ? 
                                <Menu.Item key="4" onClick={this.dangXuat}>
                                    Đăng xuất
                                </Menu.Item> : null
                            }
                        </SubMenu>
                        {
                            Number(permission) === 3 ? 
                            <Menu.Item key="5">
                                <Link to="/branches">
                                    <Icon type="branches" />
                                    <span>Chi nhánh</span>
                                </Link>
                            </Menu.Item> : null
                        }
                        {
                            Number(permission) === 3 ? 
                            <Menu.Item key="6">
                                <Link to="/chu-nha">
                                    <Icon type="team" />
                                    <span>Quản lý chủ nhà</span>
                                </Link>
                            </Menu.Item> : null
                        }
                        {
                            Number(permission) === 3 ? 
                            <Menu.Item key="7">
                                <Link to="/nguoi-thue">
                                    <Icon type="team" />
                                    <span>Quản lý người thuê</span>
                                </Link>
                            </Menu.Item> : null
                        }
                        {
                            Number(permission) === 3 ? 
                            <Menu.Item key="8">
                                <Link to="/thue-nha">
                                    <Icon type="home" />
                                    <span>Quản lý thuê nhà</span>
                                </Link>
                            </Menu.Item> : null
                        }
                        {
                            Number(permission) === 1 ? 
                            <Menu.Item key="9">
                                <Link to="/lich-su-giao-dich">
                                    <Icon type="history" />
                                    <span>Lịch sử giao dịch</span>
                                </Link>
                            </Menu.Item> : null
                        }
                        {
                            Number(permission) === 2 ? 
                            <Menu.Item key="10">
                                <Link to="/lich-su-dang-nha">
                                    <Icon type="history" />
                                    <span>Lịch sử đăng nhà</span>
                                </Link>
                            </Menu.Item> : null
                        }
                    </Menu>
                </Sider>
                <Route exact path="/">
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0, fontSize: 24, textAlign: "center" }}>Danh sách nhà</Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Route exact path="/">
                                <ListHome />
                            </Route>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Route>
                <Route path="/lich-su-giao-dich">
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0, fontSize: 24, textAlign: "center" }}>Lịch sử giao dịch</Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Route exact path="/lich-su-giao-dich">
                                <LichSuGiaoDich />
                            </Route>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Route>
                <Route path="/lich-su-dang-nha">
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0, fontSize: 24, textAlign: "center" }}>Lịch sử đăng nhà cho thuê</Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Route exact path="/lich-su-dang-nha">
                                <LichSuDangNha />
                            </Route>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Route>
                <Route path="/branches">
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0, fontSize: 24, textAlign: "center" }}>Danh sách chi nhánh</Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Route exact path="/branches">
                                <Branches />
                            </Route>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Route>
                <Route path="/thue-nha">
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0, fontSize: 24, textAlign: "center" }}>Quản lí thuê nhà</Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Route exact path="/thue-nha">
                                <ThueNha />
                            </Route>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Route>
                <Route path="/chu-nha">
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0, fontSize: 24, textAlign: "center" }}>Danh sách chủ nhà</Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Route exact path="/chu-nha">
                                <ChuNha />
                            </Route>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Route>
                <Route path="/nguoi-thue">
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0, fontSize: 24, textAlign: "center" }}>Danh sách người thuê</Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Route exact path="/nguoi-thue">
                                <NguoiThue />
                            </Route>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Route>
                <Route path="/user-detail">
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0, fontSize: 24, textAlign: "center" }}>Thông tin tài khoản</Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Route path="/user-detail">
                                <DetailUser />
                            </Route>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Route>
            </Layout>
        );
    }
}

export default withRouter(SiderWeb)