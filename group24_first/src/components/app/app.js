import React from "react";
// import ReactDOM from 'react-dom';
import Routing from '../app.routing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux';
import {store} from '../../store';

export const App = (props) => {
  // console.log('props >>',props);
  // const mount = () => {
  //   ReactDOM.render(<Register />, document.getElementById('app'));
  // }

  // const unmount = () => {
  //   ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  // }

  return (
    <div>
      <Provider store={store}>
        <Routing />
      </Provider>
      <ToastContainer />
    </div>
  );
};
