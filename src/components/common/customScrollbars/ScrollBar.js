import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

const ScrollBarCommon = ({
  maxContainerHeight,
  minContainerHeight,
  sizeThumbScroll,
  widthThumbScroll,
  children,
}) => {
  const trackVertical = (props) => {
    const style = {
      width: `${widthThumbScroll}px`,
      right: 0,
      bottom: 2,
      top: 2,
      borderRadius: '4px',
    }
    return <div style={{ ...props.style, ...style }} />
  }

  const thumbVertical = (props) => {
    return (
      <div
        style={{
          ...props.style,
        }}
        className={styles.thumbVertical}
      />
    )
  }

  const trackHorizontal = (props) => {
    const style = {
      height: `${widthThumbScroll}px`,
      right: 2,
      bottom: 0,
      left: 2,
      borderRadius: '4px',
    }
    return <div style={{ ...props.style, ...style }} />
  }

  const thumbHorizontal = (props) => {
    return (
      <div
        style={{
          ...props.style,
        }}
        className={styles.thumbHorizontal}
      />
    )
  }

  return (
    <Scrollbars
      renderTrackVertical={trackVertical}
      renderThumbVertical={thumbVertical}
      renderTrackHorizontal={trackHorizontal}
      renderThumbHorizontal={thumbHorizontal}
      autoHide={true}
      autoHeight={true}
      autoHeightMax={maxContainerHeight}
      autoHeightMin={minContainerHeight}
      hideTracksWhenNotNeeded={true}
      autoHideTimeout={1000}
      autoHideDuration={500}
      universal={true}
      thumbSize={sizeThumbScroll}
      thumbMinSize={50}
    >
      {children}
    </Scrollbars>
  )
}

ScrollBarCommon.defaultProps = {
  widthThumbScroll: 7,
  sizeThumbScroll: 50,
}

ScrollBarCommon.propTypes = {
  maxContainerHeight: PropTypes.number,
  minContainerHeight: PropTypes.number,
  sizeThumbScroll: PropTypes.number,
  widthThumbScroll: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
}

export default ScrollBarCommon
