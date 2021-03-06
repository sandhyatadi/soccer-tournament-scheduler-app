import React from 'react';
import './style.css'
import ImageGallery from 'react-image-gallery';
import { Navbar } from '../Navbar';


class Replay extends React.Component {

  constructor() {
    super();
    this.state = {
    //   showIndex: false,
    //   showBullets: true,
      infinite: true,
      showThumbnails: true,
    //   showFullscreenButton: true,
    //   showGalleryFullscreenButton: true,
    //   showPlayButton: true,
    //   showGalleryPlayButton: true,
    //   showNav: true,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 2000,
      slideOnThumbnailOver: true,
      thumbnailPosition: 'bottom',
      showVideo: {},
      useWindowKeyDown: true,
    };

    this.images = [
      {
        thumbnail: `/Assets/images/soc1.jpg`,
        original: `/Assets/images/soc1.jpg`,
        embedUrl: 'https://www.youtube.com/embed/S9gDktlZqNI',
        renderItem: this._renderVideo.bind(this)
      },
      {
        thumbnail: '/Assets/images/soc.jpg',
        original: `/Assets/images/soc.jpg`,
        embedUrl: 'https://www.youtube.com/embed/0BSkIyGY0jI',
        renderItem: this._renderVideo.bind(this)
      },
      {
        original: `/Assets/images/soc2.jpg`,
        thumbnail: `/Assets/images/soc2.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
      },
    ]
  }

  _onImageClick(event) {
    console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onSlide(index) {
    this._resetVideo();
    console.debug('slid to index', index);
  }

  _onPause(index) {
    console.debug('paused on index', index);
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
  }

  _onPlay(index) {
    console.debug('playing from index', index);
  }

  _handleInputChange(state, event) {
    if (event.target.value > 0) {
      this.setState({[state]: event.target.value});
    }
  }

  _handleCheckboxChange(state, event) {
    this.setState({[state]: event.target.checked});
  }

  _handleThumbnailPositionChange(event) {
    this.setState({thumbnailPosition: event.target.value});
  }


  _resetVideo() {
    this.setState({showVideo: {}});

    if (this.state.showPlayButton) {
      this.setState({showGalleryPlayButton: true});
    }

    if (this.state.showFullscreenButton) {
      this.setState({showGalleryFullscreenButton: true});
    }
  }

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({showGalleryPlayButton: false});
      }

      if (this.state.showFullscreenButton) {
        this.setState({showGalleryFullscreenButton: false});
      }
    }
  }

  _renderVideo(item) {
    return (
      <div>
        {
          this.state.showVideo[item.embedUrl] ?
            <div className='video-wrapper'>
                <a
                  className='close-video'
                  onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
                >
                </a>
                <iframe
                  src={item.embedUrl}
                  frameBorder='0'
                  height = "560"
                  width = "1000"
                  autoPlay = 'true'
                  allowFullScreen
               
                >
                </iframe>
            </div>
          :
            <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
              <div className='play-button'></div>
              <img className='image-gallery-image' src={item.original} />
              {
                item.description &&
                  <span
                    className='image-gallery-description'
                    style={{right: '0', left: 'initial'}}
                  >
                    {item.description}
                  </span>
              }
            </a>
        }
      </div>
    );
  }

  render() {
    return (

      <div>
        <Navbar></Navbar>
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={this.images}
          onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad}
          onSlide={this._onSlide.bind(this)}
          onPause={this._onPause.bind(this)}
          onScreenChange={this._onScreenChange.bind(this)}
          onPlay={this._onPlay.bind(this)}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showFullscreenButton={false}
          showPlayButton={false}
          showThumbnails={this.state.showThumbnails}
          showIndex={this.state.showIndex}
          showNav={this.state.showNav}
          isRTL={this.state.isRTL}
          thumbnailPosition={this.state.thumbnailPosition}
          slideDuration={parseInt(this.state.slideDuration)}
          slideInterval={parseInt(this.state.slideInterval)}
          slideOnThumbnailOver={this.state.slideOnThumbnailOver}
          additionalClass="app-image-gallery"
          useWindowKeyDown={this.state.useWindowKeyDown}
        />

       
      </div>
    );
  }
}

export default Replay
