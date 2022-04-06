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
    <div className='container mx-auto'>
      <div style={{ color: 'red', fontSize: '30px' }}>Your IP: {ip}</div>
      <div>OS: {os}</div>
      <div>Browser: {browserName}</div>
      <span style={{ color: 'blue' }}>HISTORY IP ACCESS THIS SERVER</span>
      <table className='table-auto'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Operation</th>
            <th>Browser</th>
            <th>IP Value</th>
            <th>City</th>
            <th>Region</th>
            <th>Country</th>
            <th>ISP</th>
            <th>Width</th>
            <th>Height</th>
            <th>Under tunnel</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {ips
            .slice()
            .reverse()
            .map((item, index) => (
              <tr key={item.id}>
                <td>{index}</td>
                <td>{item.osName}</td>
                <td>{item.browserName}</td>
                <td>{item.ipValue}</td>
                <td>{item.city}</td>
                <td>{item.region}</td>
                <td>{item.country}</td>
                <td>{item.isp}</td>
                <td>{item.width}</td>
                <td>{item.height}</td>
                <td>{item.underTunnel}</td>
                <td>{item.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
