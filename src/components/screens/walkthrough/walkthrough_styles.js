import {Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = {
    wrapper: {
      // backgroundColor: '#f00'
    },
    nextButtonStyles:{
      backgroundColor:'transparent',
      position:'absolute',
      right:20,
      bottom:65
    },
    PreviosButtonStyles:{
      backgroundColor:'transparent',
      position:'absolute',
      left:20,
      bottom:65
    },
    buttonTextStyles:{
      fontSize:18,
      color:'white',
      fontWeight:'bold'
    },
    slide: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center'
    },
    container: {
      flex: 1,
    },
    imgBackground: {
      width,
      height,
      backgroundColor: 'transparent',
      position: 'absolute'
    }
}