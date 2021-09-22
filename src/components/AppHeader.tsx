import { Layout, Menu } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AppState } from "../store";
import { isLoggedIn } from "../store/actions/userActions";

const { Header } = Layout;

const AppHeader = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { data, loading } = useSelector((state: AppState) => state.user);

  useEffect(() => {
    dispatch(isLoggedIn());
  }, [dispatch]);

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
        {data.username ? (
          <React.Fragment>
            <Menu.Item key="/recors">
              <Link to="/records">Records</Link>
            </Menu.Item>

            <Menu.Item key="/categories">
              <Link to="/categories">Categories</Link>
            </Menu.Item>

            <Menu.Item key="/logout">
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </React.Fragment>
        ) : loading ? null : (
          <Menu.Item key="/login">
            <Link to="/login">Login</Link>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default AppHeader;
