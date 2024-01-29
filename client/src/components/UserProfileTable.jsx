import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserProfileTable = () => {
  const user = Cookies.get('user')
  return (
<div>{user}</div>
)};


export default UserProfileTable;