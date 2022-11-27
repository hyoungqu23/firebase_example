import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <h1>생성 페이지에 오신 것을 환영합니다.</h1>
      <Link to="/register">Register</Link>
      <br />
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
