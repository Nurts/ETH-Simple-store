import React from 'react'
import { PageHeader } from 'antd';

export default function Header(props) {
  return (
    <div>
      <PageHeader
        title="Simple Store"
        // subTitle="a 🏗 Scaffold-ETH example app for IPFS"
        style={{cursor:'pointer'}}
      />
    </div>
  );
}
