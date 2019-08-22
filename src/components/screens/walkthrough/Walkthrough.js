import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import {Statusbar, Container} from '../../default';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'
import Slider from "./Slider";
import {ActiveDot} from './ActiveDot';
import {InActiveDot} from './InActiveDot';
import {styles} from './walkthrough_styles';

export default class Walkthrough extends Component {
  data = [
    { title: 'Screen one', des: 'asd'},
    { title: 'Screen two', des: 'asd'},
    { title: 'Screen three', des: 'asd'},
    { title: 'Screen four', des: 'asd'},
    { title: 'Screen five', des: 'asd'},
    { title: 'Screen six', des: 'asd'},
]

  constructor(props){
    super(props);
    this.swiper
    this.index = 1
    this.state = { BackShow: false , NextShow:true, StartShow:false, showRealApp: false}
  }

  swipeEnd(){
    AsyncStorage.setItem('@first_time', 'true').then(() => {
      this.setState({ showRealApp: true });
      this.props.navigation.navigate('Login');
    });
  }

  swipeForward(targetIndex) {
    const currentIndex = this.swiper.state.index;
    const offset = targetIndex- currentIndex;
    this.swiper.scrollBy(offset);
  }

  swipeBackward(targetIndex) {
    const currentIndex = this.swiper.state.index;
    const offset = currentIndex - targetIndex;
    this.swiper.scrollBy(offset);
  }

  onIndexChanged = (newIndex) => {
    const { onIndexChanged } = this.props;
    this.index = newIndex+1;
    if(newIndex > 0){ //middle page
      this.setState({BackShow:true})
      if (newIndex == 5){ //end page
        this.setState({NextShow:false, StartShow:true})
      }
      else{
        this.setState({NextShow:true, StartShow:false})
      }
    }
    else if (newIndex == 0){ //start page
      this.setState({BackShow:false,StartShow:false,NextShow:true})
    }
    if (onIndexChanged) {
        onIndexChanged(newIndex);
    }
  };

  render () {
    return (
      <Container ContainerStyle={styles.container}>
          <Statusbar 
          backgroundColor={'#0fbe9f'}
          barStyle='light-content' />
          <LinearGradient
            colors={['#0fbe9f','#ddd','#039be6']}
            style={styles.imgBackground}
          />
          <Swiper style={styles.wrapper}
            dot={<InActiveDot/>}
            activeDot={<ActiveDot/>}
            paginationStyle={{
              bottom: 70
            }}
            ref={component => this.swiper = component}
            showsButtons={false} 
            onIndexChanged={this.onIndexChanged}
            loop={false}>
                {this.data.map((item, key) =>{ return <Slider pageItem={item} key={key} /> })}
          </Swiper>
          {this.state.NextShow ? (
          <TouchableOpacity style={styles.nextButtonStyles} onPress={()=>this.swipeForward(this.index)} >
                  <Text style={styles.buttonTextStyles}>NEXT</Text>
          </TouchableOpacity>
          ) : null }
          {this.state.StartShow ? (
          <TouchableOpacity style={styles.nextButtonStyles} onPress={()=>this.swipeEnd()} >
                  <Text style={styles.buttonTextStyles}>START</Text>
          </TouchableOpacity>
          ) : null }
          {this.state.BackShow ? (
          <TouchableOpacity style={styles.PreviosButtonStyles} onPress={()=>this.swipeBackward(this.index)} >
                  <Text style={styles.buttonTextStyles}>BACK</Text>
          </TouchableOpacity>
          ) : null }
        </Container>
      )
  }
}