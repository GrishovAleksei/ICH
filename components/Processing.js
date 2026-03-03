
export default Processing = ({ uri, }) => {
    RNVideoHelper.compress(data.uri, {
        quality: 'low', // default low, can be medium or high
        defaultOrientation: 0
    }).progress(value => {
        console.warn('progress', value); // Int with progress value from 0 to 1
    }).then(compressedUri => {
        store.currentVideo = compressedUri
        console.warn('compressedUri', compressedUri); // String with path to temporary compressed video
    })

    .then(async () => {
        const asset = await MediaLibrary.createAssetAsync(store.currentVideo)
        MediaLibrary.createAlbumAsync('Ichazy',asset)
        .then(() => {
            console.warn('Album created!');
        })
        .catch(error => {
            console.warn('err', error);
        });
    })
}