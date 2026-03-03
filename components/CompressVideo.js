import { ProcessingManager } from 'react-native-video-processing'

// import RNVideoHelper from 'react-native-video-helper';

export default function CompressVideo(video) {
  const { source } = video;
  
  const options = {
    width: 480,
    height: 480,
    bitrateMultiplier: 3,
    saveToCameraRoll: true, // default is false, iOS only
    saveWithCurrentDate: true, // default is false, iOS only
    minimumBitrate: 100000,
    // removeAudio: true, // default is false
  }


  ProcessingManager.compress(source, options)
    .then((data) => console.log(data))

}
