import React from 'react';
import ReactDOM from 'react-dom';
import '../../Assets/js/sprite';
import '../../Assets/scss/base.scss';
import TablePoints from '../../Components/TablePoints';

ReactDOM.render(
  <div style={{ margin: '80px 0 0 140px' }}>
    <TablePoints />
  </div>,
  document.getElementById('root'),
);
