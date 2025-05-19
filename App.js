import { Provider } from 'react-redux';
import store from './src/app/store/store';
import AppNavigator from './src/app/navigation/AppNavigator';
import './gesture-handler';
import 'react-native-gesture-handler';


export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

