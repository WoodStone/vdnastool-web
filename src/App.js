import React, { Component } from 'react';
import './App.css';
import Duplicates from './core/Duplicates';
import UploadPage from './core/UploadPage';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const { Header, Content, Sider, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0
            }}
          >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="folder-open" />
                <span className="nav-text">Browse</span>
                <Link to="/"/>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="upload" />
                <span className="nav-text">Upload</span>
                <Link to="upload"/>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200, minHeight: "100vh" }}>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial', background: "#fff"}}>
              <Route exact path="/" component={Duplicates}/>
              <Route path="/upload" component={UploadPage}/>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
