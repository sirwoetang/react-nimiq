import React, {Component} from 'react';

class NimiqMain extends Component {
  constructor (props) {
    super(props);
    this.state = {
      nimiqStatus: 'loading...',
      myWalletAddress: 'loading...',
      consensus: 'loading...',
      head: 'loading...',
      peers: 'loading...',
      errors: [],
      minerActive: false,
      minerHashrate: 'loading...',
      myWalletBalance: 'loading...'
    };
  }

  handleError = (e) => {
    const newErrors = this.state.errors
    this.setState({ errors: newErrors.push(e.toString()) })
  }

  handleConsensusEstablished = () => {
    this.setState({ consensus: 'established' })
    $.miner.startWork();
  }

  handleConsensusLost = () => {
    this.setState({ consensus: 'lost' })
    $.miner.stopWork();
  }

  handleHeadChange = (height) => {
    this.setState({ head: height })
  }

  handlePeerChange = (peerCount) => {
    this.setState({ peers: peerCount })
  }

  handleMinerStart = () => {
    this.setState({ minerActive: true })
  }

  handleMinerStop = () => {
    this.setState({ minerActive: false })
  }

  handleMinerHashrateChange = ($) => {
    this.setState({ minerHashrate: $.miner.hashrate })
  }

  handleBalanceLookup = (account) => {
    account = account || window.Nimiq.BasicAccount.INITIAL;
    this.setState({ myWalletBalance: account.balance })
  }

  initialize = () => {
    const { miningAddress, miningAllowed, clientType } = this.props
    window.Nimiq.init(async () => {
      this.setState({ nimiqStatus: 'Nimiq loaded. Connecting and establishing consensus.' })
      const $ = {};
      window.$ = $;
      if (clientType === 'full') {
        $.consensus = await window.Nimiq.Consensus.full();
      } else if (clientType === 'light') {
        $.consensus = await window.Nimiq.Consensus.light();
      } else if (clientType === 'nano') {
        $.consensus = await window.Nimiq.Consensus.nano();
      }
      $.blockchain = $.consensus.blockchain;
      $.mempool = $.consensus.mempool;
      $.network = $.consensus.network;
      $.wallet = await window.Nimiq.Wallet.getPersistent();
      this.setState({ myWalletAddress: $.wallet.address.toUserFriendlyAddress() })

      if (clientType !== 'nano') {
        // the nano client does not sync the full account info and can not mine.
        $.accounts = $.blockchain.accounts;
        $.accounts.get($.wallet.address)
          .then(account => this.handleBalanceLookup(account));
        if (miningAllowed) {
          $.miner = new window.Nimiq.Miner($.blockchain, $.mempool, miningAddress ?
            window.Nimiq.Address.fromUserFriendlyAddress(miningAddress) : $.wallet.address);
          $.miner.on("start", () => this.handleMinerStart);
          $.miner.on("hashrate-changed", () => this.handleMinerHashrateChange($));
          $.miner.on("stop", () => this.handleMinerStop);
        }
      } else {
        $.consensus.getAccount($.wallet.address)
          .then(account => this.handleBalanceLookup(account));
      }
      $.consensus.on('established', () => this.handleConsensusEstablished($));
      $.consensus.on('lost', () => this.handleConsensusLost($));
      $.blockchain.on('head-changed', () => this.handleHeadChange($.blockchain.height));
      $.network.on('peers-changed', () => this.handlePeerChange($.network.peerCount));
      $.network.connect();

    }, (code) => {
      switch (code) {
        case window.Nimiq.ERR_WAIT:
          this.handleError('Error: Already open in another tab or window.');
          break;
        case window.Nimiq.ERR_UNSUPPORTED:
          this.handleError('Error: Browser not supported');
          break;
        default:
          this.handleError('Error: Nimiq initialization error');
          break;
      }
    });
  }

  componentDidMount () {
    this.initialize()
  }

  render () {
    const {
      nimiqStatus,
      consensus,
      head,
      peers,
      errors,
      myWalletAddress,
      minerActive,
      minerHashrate,
      myWalletBalance,
    } = this.state

    const {
      displayWidget,
      miningAddress,
      miningAllowed,
      clientType,
    } = this.props

    if (!displayWidget) {
      return null
    } else {
      return <div>
        <div>Client Type: {clientType}</div>
        <div>Nimiq Status: {nimiqStatus}</div>
        <div>My Wallet Address: {myWalletAddress}</div>
        <div>My Wallet Balance: {myWalletBalance}</div>
        <div>Mining Address: {miningAddress}</div>
        <div>Mining Allowed: {miningAllowed ? 'Yes' : 'No'}</div>
        <div>Miner Active: {minerActive ? 'Yes' : 'No'}</div>
        <div>Miner Hashrate: {minerHashrate} H/s</div>
        <div>Consensus: {consensus}</div>
        <div>Head: {head}</div>
        <div>Peers: {peers}</div>
        {errors.map((e) => {
          return <div>Error: {e}</div>
        })}
      </div>;
    }
  }
}

export default NimiqMain;