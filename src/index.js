/**
 * Created by lenovo on 2017/9/1.
 */
import React from 'react'
import {render} from 'react-dom'
import {Router,Route,hashHistory,IndexRoute} from 'react-router'
import App from './comments/App'
import NewsContainer from './comments/NewsContainer'
import NewsDetail from './comments/NewsDetail'
import UserCenter from './comments/UserCenter'
import MediaQuery from 'react-responsive'
//引入移动端
import PhoneApp from './comments/phoneApp'
import PhoneContainer from './comments/phoneContainer'
import PhoneDetail from './comments/phoneDetail'
import PhoneUserCenter from './comments/phoneUserCenter'

 render((
     <div>
         <MediaQuery query='(min-device-width:1224px)'>
             <Router history={hashHistory}>
                 <Route path='/' component={App}>
                     <IndexRoute component={NewsContainer}/>
                     <Route path='/NewsDetail/:uniquekey/:type' component={NewsDetail}/>
                     <Route path='/UserCenter' component={UserCenter}/>
                 </Route>
             </Router>
         </MediaQuery>
         <MediaQuery query='(max-device-width:1224px)'>
             <Router history={hashHistory}>
                 <Route path='/' component={PhoneApp}>
                     <IndexRoute component={PhoneContainer}/>
                     <Route path='/NewsDetail/:uniquekey' component={PhoneDetail}/>
                     <Route path='/UserCenter' component={PhoneUserCenter}/>
                 </Route>
             </Router>
         </MediaQuery>
     </div>

 ),document.getElementById('root'))