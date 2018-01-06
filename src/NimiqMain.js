import React, {Component} from 'react';

class NimiqMain extends Component {
  constructor (props) {
    super(props);
    this.state = {
      nimiqStatus: null,
      myWalletAddress: this.props.myWalletAddress ? this.props.myWalletAddress : null,
      consensus: null,
      heads: null,
      peers: null,
      myWalletBalance: null,
      error: null,
    };
  }

  handleError = (e) => {
    this.setState({ error: e })
  }

  handleConsensusEstablished = () => {
    this.setState({ consensus: 'established' })
  }

  handleConsensusLost = () => {
    this.setState({ consensus: 'lost' })
  }

  handleHeadChange = () => {
    this.setState({ heads: 1 })
  }

  handlePeerChange = () => {
    this.setState({ peers: 1 })
  }

  initialize = (clientType = 'light') => {
    window.Nimiq.init(async () => {
      this.setState({ nimiqStatus: 'window.Nimiq loaded. Connecting and establishing consensus.' })
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
      if (clientType !== 'nano') {
        // the nano client does not sync the full account info and can not mine.
        $.accounts = $.blockchain.accounts;
        // $.miner = new window.Nimiq.Miner($.blockchain, $.mempool, $.wallet.address);
      }
      $.consensus.on('established', this.handleConsensusEstablished);
      $.consensus.on('lost', this.handleConsensusLost);
      $.blockchain.on('head-changed', this.handleHeadChange);
      $.network.on('peers-changed', this.handlePeerChange);
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
          this.handleError('Error: window.Nimiq initialization error');
          break;
      }
    });
  }

  componentDidMount () {
    this.initialize()
  }

  render () {
    const { nimiqStatus, myWalletAddress, consensus, heads, peers, myWalletBalance, error } = this.state

    return (
      <div>
        <div>{nimiqStatus}</div>
        <div>{myWalletAddress}</div>
        <div>{consensus}</div>
        <div>{heads}</div>
        <div>{peers}</div>
        <div>{myWalletBalance}</div>
        <div>{error}</div>
      </div>
    );
  }
}

export default NimiqMain;