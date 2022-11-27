import React from 'react';
import { useAuth } from '../../context/authContext';

type Props = {};

const Header = (props: Props) => {
  const auth = useAuth();

  return (
    <div>
      {auth.user && <h3>현재 로그인 유저: {auth.user.email}</h3>}
      <button onClick={() => auth.logout()}>Logout</button>
    </div>
  );
};

export default Header;
