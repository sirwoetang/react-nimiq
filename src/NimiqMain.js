import React, {Component} from 'react';

class NimiqMain extends Component {
  constructor (props) {
    super(props);
    this.state = {
      nimiqStatus: null,
    };
  }

  initialize = (clientType='light') => {
    window.Nimiq.init(async function () {
      // this.setState({ nimiqStatus: 'window.Nimiq loaded. Connecting and establishing consensus.' })
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
        $.miner = new window.Nimiq.Miner($.blockchain, $.mempool, $.wallet.address);
      }

      $.consensus.on('established', () => console.error('Consensus established'));
      $.consensus.on('lost', () => console.error('Consensus lost'));

      $.blockchain.on('head-changed', () => console.error('Head Changed'));
      $.network.on('peers-changed', () => console.error('Peers Changed'));

      $.network.connect();
    }, function (code) {
      switch (code) {
        case window.Nimiq.ERR_WAIT:
          console.log('Error: Already open in another tab or window.');
          break;
        case window.Nimiq.ERR_UNSUPPORTED:
          console.log('Error: Browser not supported');
          break;
        default:
          console.log('Error: window.Nimiq initialization error');
          break;
      }
    });
  }

  componentDidMount () {
    this.initialize()
  }

  render () {
    return (
      <div>This is so Nimiq1212!</div>
    );
  }
}

export default NimiqMain;