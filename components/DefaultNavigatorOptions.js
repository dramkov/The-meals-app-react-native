import { Platform } from 'react-native';
import Colors from '../constants/Colors';

const DefaultNavigatorOptions = () => {
  return {
    headerStyle: {
      backgroundColor:
        Platform.OS === 'android' ? Colors.primaryColor : 'white',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitleStyle: {
      fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans',
    },
  };
};

export default DefaultNavigatorOptions;
