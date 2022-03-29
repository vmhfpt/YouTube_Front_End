/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
const { detect } = require('detect-browser');

export function TrackIpIndex() {
  const browser = detect();
  const [ips, setIps] = useState([]);
  const [ip, setIp] = useState('');
  const [os, setOs] = useState('');
  const [browserName, setBrowser] = useState('');

  useEffect(() => {
    async function fetchIps() {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/ips/all`
      );
      const json = await response.json();
      console.log('Response info is: ', json);
      setIps(json);
    }

    async function create() {
      if (browser) {
        setBrowser(browser.name);
        setOs(browser.os);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/ips/get-detail`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nameOs: browser.os,
              nameBrowser: browser.name,
              screenWidth: window.screen.width,
              screenHeight: window.screen.height,
            }),
          }
        );
        const tmp = await response.json();
        setIp(tmp);
      }
    }
    fetchIps();
    create();
  }, []);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-12'>
          <div style={{ color: 'red', fontSize: '30px' }}>Your IP: {ip}</div>
          <div>OS: {os}</div>
          <div>Browser: {browserName}</div>
          <span style={{ color: 'blue' }}>HISTORY IP ACCESS THIS SERVER</span>
          <table className='table table-striped'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Operation</th>
                <th scope='col'>Browser</th>
                <th scope='col'>IP Value</th>
                <th scope='col'>City</th>
                <th scope='col'>Region</th>
                <th scope='col'>Country</th>
                <th scope='col'>ISP</th>
                <th scope='col'>Width</th>
                <th scope='col'>Height</th>
                <th scope='col'>Under tunnel</th>
                <th scope='col'>Time</th>
              </tr>
            </thead>
            <tbody>
              {ips
                .slice()
                .reverse()
                .map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index}</th>
                    <th>{item.osName}</th>
                    <th>{item.browserName}</th>
                    <th>{item.ipValue}</th>
                    <th>{item.city}</th>
                    <th>{item.region}</th>
                    <th>{item.country}</th>
                    <th>{item.isp}</th>
                    <th>{item.width}</th>
                    <th>{item.height}</th>
                    <th>{item.underTunnel}</th>
                    <th>{item.createdAt}</th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
