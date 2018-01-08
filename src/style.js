const bannerStyle = {
  message: {
    lineHeight: '45px',
    fontWeight: 500,
    color: '#ead6ff'
  },
  container: {
    position: 'relative',
    textAlign: 'center',
    background: "linear-gradient(to right, #3524B1 , #C16AD5)",
    width: '100%',
    height: '85px',
    zIndex: '10000'
  },
  leftIcon: {
    background: 'none',
    border: 'none',
    boxShadow: 'none',
    padding: '1em',
    position: 'absolute',
    top: '10%',
    left: '1em',
    cursor: 'pointer',
    size: "3"
  },
  rightIcon: {
    background: 'none',
    border: 'none',
    boxShadow: 'none',
    padding: '1em',
    position: 'absolute',
    top: '10%',
    right: '1em',
    cursor: 'pointer',
    size: "3"
  },
  rightRobohash: {
    width: "69px",
    height: "69px",
    margin: "8px",
    right: "200px",
    display: "inline-block"
  },
  leftRobohash: {
    width: "69px",
    height: "69px",
    margin: "8px",
    left: "200px",
    display: "inline-block"
  },
  centerTopHeadline: {
    background: 'none',
    border: 'none',
    position: 'absolute'
  },
}
export default bannerStyle