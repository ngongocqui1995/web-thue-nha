import React from 'react';
import './App.css';
import LayoutWeb from './components/Layout';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NormalLoginForm from './components/Login';
import RegistrationForm from './components/Register';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <LayoutWeb />
          </Route>
          <Route path="/lich-su-giao-dich">
            <LayoutWeb />
          </Route>
          <Route path="/lich-su-dang-nha">
            <LayoutWeb />
          </Route>
          <Route path="/branches">
            <LayoutWeb />
          </Route>
          <Route path="/thue-nha">
            <LayoutWeb />
          </Route>
          <Route path="/chu-nha">
            <LayoutWeb />
          </Route>
          <Route path="/nguoi-thue">
            <LayoutWeb />
          </Route>
          <Route path="/user-detail">
            <LayoutWeb />
          </Route>
          <Route path="/user/login">
            <NormalLoginForm />
          </Route>
          <Route path={'/user/register'}>
            <Tabs defaultActiveKey="1" style={{textAlign: "center"}}>
              <TabPane tab="Đăng kí người thuê" key="1">
                <RegistrationForm title={"Đăng kí người thuê"} dangki={1}/>
              </TabPane>
              <TabPane tab="Đăng kí chủ nhà" key="2">
                <RegistrationForm title={"Đăng kí chủ nhà"} dangki={2}/>
              </TabPane>
            </Tabs>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
