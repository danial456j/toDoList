import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-left footer'>
      <div className='text-center p-3' style={{ backgroundColor: 'white', color: 'dark' }}>
        <span className='text-dark'>
          &copy; {new Date().getFullYear()} Copyright: Danial Jarrous{' '}
          {/* <a className='text-dark' href='https://mdbootstrap.com/'>
            MDBootstrap.com
          </a> */}
        </span>
      </div>
    </MDBFooter>
  );
}


