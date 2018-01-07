import React, {Component} from 'react';
import bannerStyle from './style'
import Logo from './nimiq_logo.svg'
import RobohashSVG from './robohash.min.svg'

class Banner extends Component {
  render () {
    const {
      nimiqStatus,
      consensus,
      head,
      peers,
      myWalletAddress,
      myWalletAddressSVG,
      minerActive,
      minerHashrate,
      myWalletBalance,
      miningAddress,
      miningAddressSVG,
      miningAllowed,
      clientType,
    } = this.props

    return (
      <div style={bannerStyle.container}>
        <Logo style={bannerStyle.leftIcon}/>
        <Logo style={bannerStyle.rightIcon}/>
        <div contentEditable='true' dangerouslySetInnerHTML={{ __html: myWalletAddressSVG }}
             style={bannerStyle.leftRobohash}></div>
        <div contentEditable='true' dangerouslySetInnerHTML={{ __html: miningAddressSVG }}
             style={bannerStyle.rightRobohash}></div>
        <div style={bannerStyle.message}>Patron this site</div>
        <div style={bannerStyle.message}>Client Type: {clientType}</div>
        <div style={bannerStyle.message}>Nimiq Status: {nimiqStatus}</div>
        <div style={bannerStyle.message}>My Wallet Address: {myWalletAddress}</div>
        <div style={bannerStyle.message}>My Wallet Balance: {myWalletBalance}</div>
        <div style={bannerStyle.message}>Mining Address: {miningAddress}</div>
        <div style={bannerStyle.message}>Mining Allowed: {miningAllowed ? 'Yes' : 'No'}</div>
        <div style={bannerStyle.message}>Miner Active: {minerActive ? 'Yes' : 'No'}</div>
        <div style={bannerStyle.message}>Miner Hashrate: {minerHashrate} H/s</div>
        <div style={bannerStyle.message}>Consensus: {consensus}</div>
        <div style={bannerStyle.message}>Head: {head}</div>
        <div style={bannerStyle.message}>Peers: {peers}</div>
      </div>);
  }
}

export default Banner;