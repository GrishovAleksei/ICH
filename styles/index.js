import {
    Dimensions,
    StyleSheet
} from 'react-native';
import Constants from 'expo-constants';
import { autorun } from 'mobx';

const {width, height} = Dimensions.get('window');
const colors = {
    white: '#fff',
    black: '#000',
    main: '#1c3f4e',
    lightBg: '#fafafa',
    darkBlue: '#004061',
    blue: '#5d84c3',
    blue2: '#abd9e9',
    blue3: '#b3d8e7',
    orange: '#f99d2e',
    orangeDark: '#ee9e4c',
    red: '#e00000',
    green: '#21be88',
    gray: '#1F314A',
    lightGray: '#e2e2e2',
    bgGray: '#f8f9fb',
    textGray: '#b0b1b1',
    blueGray: '#233f4c',
    turquoise: '#9dd8df',
};
export {colors};

export default StyleSheet.create({
    badge: {
        height: 18,
        width: 18,
        borderRadius: 10,
        backgroundColor: colors.red,
        position: 'absolute',
        right: 25,
        top: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    frontLayout: {
        height: '100%',
        flexDirection: 'column',
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    frontLogo: {
        marginTop: '15%',
        width: 141,
        height: 130
    },
    frontMessage: {
        marginTop: 15,
        fontSize: 22,
        fontWeight: 'bold',
        lineHeight: 32,
        textAlign: 'center',
        color: colors.gray
    },
    frontButton: {
        minWidth: 100,
        alignItems: 'center',
        backgroundColor: colors.main,
        borderRadius: 25,
        padding: 15
    },
    frontButtonText: {
        color: colors.white,
        fontSize: 17
    },

    searchButton: {
        minWidth: 100,
        alignItems: 'center',
        backgroundColor: colors.orangeDark,
        borderRadius: 25,
        padding: 15,
        paddingVertical: 5,
        marginLeft: 10,
        marginBottom: 5
    },
    searchButtonText: {
        color: colors.white,
        fontSize: 17
    },


    tagButton: {
        minWidth: 100,
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.blue,
        padding: 15,
        paddingVertical: 5,
        marginLeft: 10,
        marginBottom: 5
    },
    tagButtonText: {
        color: colors.blue,
        fontSize: 17
    },

    profileButton: {
        alignItems: 'center',
        backgroundColor: colors.main,
        borderRadius: 25,
        padding: 15,
        color: colors.white,
    },

    frontSignInButton: {
        marginTop: 10,
        minWidth: 140,
        alignItems: 'center',
        color: colors.blue,
        padding: 10,
        marginBottom: 5
    },
    frontSignInButtonText: {
        color: colors.black,
        fontSize: 17
    },

    cameraPane: {
        position: 'absolute',
        bottom: 20,
        height: 80,
        borderRadius: 40,
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    cameraBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 20
    },
    toggleCameraBtn: {
        marginLeft: 20
    },
    recordBtn: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    modeBtn: {
        marginRight: 20
    },
    cameraIcon: {
        color: '#000',
        fontSize: 20
    },
    cameraIconBig: {
        fontSize: 35
    },
    cameraRecordIcon: {
        color: '#FF5722',
        fontSize: 50
    },
    
    cameraWrapper: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    cameraTopBtn: {
        position: 'absolute',
        top: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 5,
        borderRadius: 10
    },
    cameraQualityBtn: {
        left: 20
    },
    cameraFlashBtn: {
        right: 20
    },
    cameraBorder: {
        position: 'absolute',
        left: 0, 
        backgroundColor: 'rgba(0,0,0,1)',
        width: width, 
    },


    accountLayout: {
        backgroundColor:'white',
        height: '100%',
        flexDirection: 'column',
        paddingTop: Constants.statusBarHeight,
        // marginBottom: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    accountHeader: {
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    accountHeaderText: {
        marginLeft: 5,
        lineHeight: 35
    },
    accountAvatar: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: colors.lightGray,
    },
    accountSettingsIcon: {
        margin: 5,
        width: 35,
        height: 35
    },
    tabIcon: {
        padding: 5,
        margin: 5,
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    tabIconCircle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 34,
        width: 34,
        borderRadius: 16,
    },
    tabShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 5,
        elevation: 8,
    },
    swipeIcon: {
        width: 40,
        height: 40
    },
    accountContent: {
        flex: 1,
        width: width - 30,
        marginTop: 10,
        marginHorizontal: 15,
        backgroundColor: 'rgba(218, 218, 218, 0.29)',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        padding: 20,
        paddingBottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    accountCard: {
        width: width - 70,
        height: (width - 70) * (395 / 620)
    },
    accountCardImage: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    accountCardImageContent: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 15
    },
    accountCardAvLabel: {
        color: colors.white,
        fontSize: 12,
    },
    accountCardAvValue: {
        fontWeight: 'bold',
        color: colors.white,
        fontSize: 32,
    },
    accountCardNumber: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#785706'
    },
    accountCardExp: {
        fontSize: 16,
        color: '#785706',
        marginBottom: 20
    },

    accountEmptyCardContent: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    accountCardOrder: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 36,
        color: colors.white
    },
    accountHistory: {
        backgroundColor: colors.white,
        marginTop: 10,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        flex: 1,
        width: width - 70,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 15,
        paddingHorizontal: 30
    },
    accountItem: {
        width: '100%',
        paddingVertical: 10,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.065)',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    accountItemDate: {
        fontWeight: 'bold',
        color: '#BDBDBD',
        fontSize: 24
    },
    accountItemMonth: {
        color: '#BDBDBD',
        fontSize: 14
    },
    accountItemTitleBlock: {
        flexDirection: 'column',
        flex: 1
    },
    accountItemTitle: {
        fontSize: 14,
        color: '#2B2B2B'
    },
    accountItemDescription: {
        fontSize: 12,
        color: '#AFAFAF'
    },
    accountItemPrice: {
        fontSize: 14,
        color: '#2B2B2B'
    },
    settingsHeader: {
        textAlign: 'center',
        paddingHorizontal: 15,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: colors.blue2, 
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    buttonHeader: {
        flexDirection: 'row',
        height: 50,
        borderBottomColor: colors.blue2,
        borderBottomWidth: 0.5,
    },
    backIcon: {
        width: 32,
        height: 24,
    },
    settingsAvatar: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0
        // paddingHorizontal: 15,
    },
    settingsAvatarImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.lightGray
    },
    settingsContent: {
        flex: 1
    },
    settingsPersonalBlock: {
        width: '80%',
        flex: 1,
    },
    settingsBankBlock: {
        backgroundColor: 'rgba(0, 0, 0, 0.07)',
        marginTop: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flex: 1,
        width: width - 30,
        paddingTop: 15,
        paddingHorizontal: 30
    },
    settingsPersonalItem: {
        width: '100%',
        flexDirection: 'column',
        paddingTop: 5,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.065)',
    },
    settingsPersonalLabel: {
        fontSize: 14,
        color: '#333333'
    },
    settingsPersonalValue: {
        fontSize: 18
    },
    headerTitle: {
        fontFamily:'MontserratSemiBold',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.main,
        fontSize: 18,
    },
    headerSubTitle: {
        fontFamily:'MontserratMedium',
        textAlign: 'center',
        color: colors.textGray,
        fontSize: 14
    },

    formItemActive: {
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.orange,
        borderRadius: 20
    },
    likeArea: {
        backgroundColor: 'rgba(19, 63, 80, 0.75)',
        borderRadius: 10,
        position: 'absolute',
        bottom: 15,
        right: 15,
        padding: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    likeIcons: {
        width: 15,
        height: 15,
        marginRight: 10
    },


    formAuth: {
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        marginBottom: 20,
        backgroundColor: colors.bgGray,
        borderWidth: 1,
        borderColor: colors.bgGray,
        borderRadius: 20
    },
    formAuthActive: {
        borderColor: colors.orange,
        backgroundColor: colors.white
    },
    // formAuthLabel: {
    //     position: 'absolute',
    //     top: -10,
    //     left: 10,
    //     backgroundColor: '#fff',
    //     paddingHorizontal: 5,
    //     fontSize: 12,
    //     color: colors.orange
    // },
    formAuthValue: {
        fontFamily: 'MontserratLight',
        padding: 5,
        paddingHorizontal: 10,
        minWidth: 150,
        width: '100%',
        fontSize: 18,
        // color: '#333333'
    },




    formItem: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 7.5,
        marginBottom: 10,
    },
    formLabel: {
        paddingHorizontal: 5,
        flex: 1,
        fontSize: 16,
        color: colors.main,
        fontFamily:'MontserratBold',
    },
    formText: {
        width: '100%',
        fontSize: 14,
        color: '#333333',
        marginBottom: 5
    },
    formValue: {
        flex: 2,
        justifyContent: 'flex-end',
        textAlign: 'right',
        fontFamily:'MontserratLight',
        paddingHorizontal: 10,
        fontSize: 18,
        color: '#333333'
    },
    link: {
        alignItems: 'center',
        minWidth: 100,
        marginBottom: 20,
    },
    linkText: {
        color: colors.blue,
        fontSize: 17
    },
    button: {
        minWidth: 190,
        alignItems: 'center',
        borderRadius: 25,
        padding: 15,
        paddingHorizontal: 25,
        fontSize: 17,
        marginVertical: 20,
        backgroundColor: colors.orange 
    },
    buttonWhite: {
        minWidth: 100,
        padding: 10,
        paddingHorizontal: 25,
        backgroundColor: colors.white
    },
    buttonWhiteText: {
        color: colors.main,
        fontSize: 16
    },
    buttonText: {
        color: colors.white,
        fontSize: 16
    },
    // buttonTextDisabled: {
    //     color: colors.black,
    // },

    feedContainer: {
        flex: 1,
        width: width,
        alignContent: 'center',
        // height: height
    },
    feedHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        backgroundColor: 'rgba(255,255,255,0.95)',
        paddingTop: 0,
        paddingHorizontal: 15,
        paddingBottom: 10
    },
    feedHeaderIcon: {
        color: '#E3E7EB',
        fontSize: 20
    },
    feedHeaderTitle: {
        textAlign: 'center',
        color: colors.main,
        fontSize: 18
    },
    feedMenuItemText: {
        color: colors.white,
        fontSize: 20,
    },
    feedMenuItem: {
        borderRadius: 40,
        paddingHorizontal: 10,
        paddingVertical: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    feedMenuItemActive: {
        backgroundColor: colors.orange
    },
    onePicker: {
        margin: 0,
        padding: 0,
        textAlign: 'center',
        height: 40
    },
    filterHeader: {
        marginTop: 20,
        width: '100%',
        color: colors.textGray,
        fontSize: 20
    },
    filterItem: {

        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderColor: colors.lightGray
    },
    filterItemText:{
        fontSize: 18
    },
    filterItemTextActive: {
        fontSize: 18,
        color: colors.orange
    },
    filterItemImg: {
        marginRight:5,
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    profileLabel:{
        color: colors.main,
        fontSize: 16,
        fontFamily: 'MontserratSemiBold'
    },
    profileValue:{
        color: colors.textGray,
        fontSize: 16
    },
    profileItem:{
        marginVertical:3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    tutorialBlock:{
        position:'absolute',
        left:0,
        top:0,
        bottom:0,
        right:0,
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tutorialCircle:{
        position: 'absolute',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#ee9e4c',
        width: 46,
        height: 46,
        borderRadius: 23,
    },
    tutorialFirstStepText:{
        color:'white',
        fontSize:18,
        textAlign:'center',
        padding:20

    },
    tutorialText: {
        color: 'white',
        fontSize:14,
        textAlign:'center',
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    tutorialBottomCircle:{
        backgroundColor: 'white',
        marginHorizontal:5,
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth:2,
        borderColor:'#ee9e4c'
    },
    tutorialClose: {
        alignItems: 'center',
        minWidth: 200,
        padding: 15
    },
    tutorialButton: {
        marginTop: 10,
        minWidth: 200,
        padding: 15
    },
    tutorialHelpers: {
        flex: 1,
        position:'absolute',
        top: Constants.statusBarHeight,
        bottom: 0,
        width: '100%',
        margin: 0,
        padding: 0,
    },
    tutorial: {
        position:'absolute',
        left:0,
        right:0,
        top:0,
        bottom:0,
        backgroundColor: 'white'
    },
    tutorialMask: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        paddingTop: Constants.statusBarHeight,
    },
    tutorialContainer: {
        flex: 1,
    },
    splashWrapper: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        padding: 10,
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    splashHeader: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    splashUserAgreement: {
        flex: 1,
        borderRadius: 10,
        width: '100%',
        padding: 10,
        backgroundColor: colors.bgGray
    },
    splashImage: {
        width: width * 0.33,
        height: width * 0.33,
    },
    splashText: {
        color: colors.blueGray,
        flexWrap: 'wrap',
        textAlign: 'center',
        fontSize: 15,
        marginTop: 5
    },
    splashUserAgreementText: {
       textAlign: 'justify',
    },
    splashTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 1
    },
    wrapper: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'MontserratRegular',
        fontSize: 14,
        textAlign: 'center',
        color: colors.main,
    },
    iconText: {
        fontSize: 12,
        fontFamily: 'MontserratLight',
        color: '#fff',
    },
    sortHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sortListSlide: {
        height: width,
        width: width,
    },
    bodyFrame: {
        backgroundColor: 'rgba(19, 63, 80, 0.75)',
        borderRadius: 17,
        position: 'absolute',
        paddingHorizontal: 8,
        paddingVertical: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'MontserratLight',
        color: colors.white,
        fontSize: 10,
    },
    modalView: {
        height: width * 0.95,
        width: width * 0.95,
        maxWidth: 400,
        maxHeight: 400,
        backgroundColor: colors.white,
        // margin: 20,
        borderRadius: 20,
        paddingHorizontal: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    centeredView: {
        height: height,
        width: width,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 30,
        paddingHorizontal: 30,
        width: '100%',
    },
    centeredRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    brandLogo: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    brandInfo: {
        color: colors.main,
        marginBottom: 10,
        paddingHorizontal: 15,
        textAlign: 'center',
    },
    avatar: {
        height: 100,
        width: 100,
        marginBottom: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#aaa',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    challengeImage: {
        // position: 'absolute',
        width: '100%',
        height: '100%',
    },
    challengesWrapper: {
        flex: 1,
        width: width,
    },
    preview: {
        aspectRatio: 1,
        position: 'relative'
    },
    // previewBig: {
    //     width: '100%',
    //     aspectRatio: 1,
    //     margin: 1,
    //     position: 'relative' 
    // },
    screen: {
        paddingTop: Constants.statusBarHeight,
    }
});
