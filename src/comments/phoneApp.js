import React,{Component} from 'react'
import PhoneHeader from './phoneHeader'
import NewsFooter from './NewsFooter'
import '../commentCss/phoneCss.css'
export default class PhoneApp extends Component{
    render(){
        return (
            <div>
                <PhoneHeader/>
                {this.props.children}
                <NewsFooter/>
            </div>

        )

    }
}
