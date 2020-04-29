import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
//for consumer pages ----
import SigninPage from './src/pages/consumer/SigninPage';
import SignupPage from './src/pages/consumer/SignupPage';
import ProductCategoryPage from './src/pages/consumer/ProductCategoryPage';
import ProductsPage from './src/pages/consumer/ProductsPage';
import ProductDetailPage from './src/pages/consumer/ProductDetailPage';
import CartPage from './src/pages/consumer/CartPage';
import CheckoutPage from './src/pages/consumer/CheckoutPage';
import TrackingPage from './src/pages/consumer/TrackingPage';
import ReportPage from './src/pages/consumer/ReportPage';
import RatePage from './src/pages/consumer/RatePage';
import ProfilePage from './src/pages/consumer/ProfilePage';
import ProfileInfoPage from './src/pages/consumer/ProfileInfoPage';
import PaymentPage from './src/pages/consumer/PaymentPage';
import SearchStorePage from './src/pages/consumer/SearchStorePage';
import SearchFilterPage from './src/pages/consumer/SearchFilterPage';
import ForgotPwdPage from './src/pages/consumer/ForgotPwdPage';

//for dispensaries pages -----
import SigninDispensariesPage from './src/pages/dispensaries/SigninDispensariesPage';
import SignupDispensariesPage from './src/pages/dispensaries/SignupDispensariesPage';
import ProductsDispensariesPage from './src/pages/dispensaries/ProductsDispensariesPage';
import AddProductPage from './src/pages/dispensaries/AddProductPage';
import OrderHistoryPage from './src/pages/dispensaries/OrderHistoryPage';
import ProfileDispensariesPage from './src/pages/dispensaries/ProfileDispensariesPage';
import DispensariesInfoPage from './src/pages/dispensaries/DispensariesInfoPage';
import EditProductPage from './src/pages/dispensaries/EditProductPage';

//for driver pages -----
import SigninDriverPage from './src/pages/driver/SigninDriverPage';
import SignupDriverPage from './src/pages/driver/SignupDriverPage';
import ProfileDriverPage from './src/pages/driver/ProfileDriverPage';
import DriverInfoPage from './src/pages/driver/DriverInfoPage';
import TrackingDriverPage from './src/pages/driver/TrackingDriverPage';
import DriverHistoryPage from './src/pages/driver/DriverHistoryPage';


const RootStack = createStackNavigator({

  // for consumer pages---
  "SigninPage": { 
    screen: SigninPage,
    navigationOptions: {
      title: 'Home',
      headerShown : false
    }
  },
  "SignupPage": { 
    screen: SignupPage,
    navigationOptions: {
      title: 'Home',
      headerShown : false
    }
  },  
  "ProductCategoryPage": { 
    screen: ProductCategoryPage,
    navigationOptions: {
      title: 'Home',
      headerShown : false
    }
  },  
  "ProductsPage": { 
    screen: ProductsPage,
    navigationOptions: {
      title: 'Product',
      headerShown : false
    }
  },   
  "ProductDetailPage": { 
    screen: ProductDetailPage,
    navigationOptions: {
      title: 'Detail',
      headerShown : false
    }
  },  
  "CartPage": { 
    screen: CartPage,
    navigationOptions: {
      title: 'Cart',
      headerShown : false
      
    }
  },    
 
  "CheckoutPage": { 
    screen: CheckoutPage,
    navigationOptions: {
      title: 'Payment Method'
    }
  },    
  "TrackingPage": { 
    screen: TrackingPage,
    navigationOptions: {
      title: 'Payment Method',
      headerShown : false
    }
  },    
  "ReportPage": { 
    screen: ReportPage,
    navigationOptions: {
      title: 'Check Order',
      headerShown : false
    }
  },   
  "RatePage": { 
    screen: RatePage,
    navigationOptions: {
      title: 'Rate',
      headerShown : false
    }
  },    
  "ProfilePage": { 
    screen: ProfilePage,
    navigationOptions: {
      title: 'Profile',
      headerShown : false
    }
  },    
  "ProfileInfoPage": { 
    screen: ProfileInfoPage,
    navigationOptions: {
      title: 'Profile Information',
      headerShown : false
    }
  },   
  "PaymentPage": { 
    screen: PaymentPage,
    navigationOptions: {
      title: 'Payment',
    }
  },   
  "SearchStorePage": { 
    screen: SearchStorePage,
    navigationOptions: {
      title: 'Search',
      headerShown : false
    }
  },    
  "SearchFilterPage": { 
    screen: SearchFilterPage,
    navigationOptions: {
      title: 'Filter',
      headerShown : false
    }
  },    
  "ForgotPwdPage": { 
    screen: ForgotPwdPage,
    navigationOptions: {
      title: 'Filter',
      headerShown : false
    }
  },  
// for dispensaries pages ---

  "SigninDispensariesPage": { 
    screen: SigninDispensariesPage,
    navigationOptions: {
      title: 'signin',
      headerShown : false
    }
  },  
  "SignupDispensariesPage": { 
    screen: SignupDispensariesPage,
    navigationOptions: {
      title: 'signup',
      headerShown : false
    }
  },  

  "ProductsDispensariesPage": { 
    screen: ProductsDispensariesPage,
    navigationOptions: {
      title: 'product',
      headerShown : false
    },
  }, 
  "AddProductPage": { 
    screen: AddProductPage,
    navigationOptions: {
      title: 'add product',
      headerShown : false
    },
  },   
  "OrderHistoryPage": { 
    screen: OrderHistoryPage,
    navigationOptions: {
      title: 'order history',
      headerShown : false
    },
  }, 
  "ProfileDispensariesPage": { 
    screen: ProfileDispensariesPage,
    navigationOptions: {
      title: 'profile',
      headerShown : false
    },
  },  
  "DispensariesInfoPage": { 
    screen: DispensariesInfoPage,
    navigationOptions: {
      title: 'profile information',
      headerShown : false
    },
  },   
  "EditProductPage": { 
    screen: EditProductPage,
    navigationOptions: {
      title: 'profile information',
      headerShown : false
    },
  },        
  
// for driver pages ---

"SigninDriverPage": { 
  screen: SigninDriverPage,
  navigationOptions: {
    title: 'signin',
    headerShown : false
  }
},  

"SignupDriverPage": { 
  screen: SignupDriverPage,
  navigationOptions: {
    title: 'signup',
    headerShown : false
  }
},  
"ProfileDriverPage": { 
  screen: ProfileDriverPage,
  navigationOptions: {
    title: 'signup',
    headerShown : false
  }
},  
"DriverInfoPage": { 
  screen: DriverInfoPage,
  navigationOptions: {
    title: 'driver information',
    headerShown : false
  }
},  
"TrackingDriverPage": { 
    screen: TrackingDriverPage,
    navigationOptions: {
      title: 'driver tracking',
      headerShown : false
    }
  },  
  "DriverHistoryPage": { 
    screen: DriverHistoryPage,
    navigationOptions: {
      title: 'driver history',
      headerShown : false
    }
  }    
});
const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;


