/**
 * Created by shanshan on 2017/9/5.
 */
import React,{Component} from 'react'
import {Tabs,Card,Upload, Icon, Modal} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'
const TabPane=Tabs.TabPane
export default class PhoneUserCenter extends Component{
    state = {
        //收藏
        userCollections: [],
        //评论
        userComments: [],
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId')
        let url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + userId
        axios.get(url)
            .then(response=>{
                const userCollections = response.data
                this.setState({userCollections})
            })

        url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + userId
        axios.get(url)
            .then(response => {
                const userComments = response.data
                this.setState({userComments})
            })
    }

    handleCancel = () => this.setState({ previewVisible: false })

    // 显示预览图片(显示 modal)
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    // 选择上传图片
    handleChange = ({ fileList }) => this.setState({ fileList })
    render () {

        const {userCollections, userComments} = this.state

        const userCollectionsList = userCollections.length
            ? userCollections.map((uc, index) => (
                <Card key={index} title={uc.uniquekey}
                      extra={<Link to={`/news_detail/${uc.uniquekey}`}>查看</Link>}>
                    <p>{uc.Title}</p>
                </Card>
            ))
            : <h3>您还没有收藏任何的新闻，快去收藏一些新闻吧。</h3>

        const userCommentsList = userComments.length
            ? userComments.map((comment,index)=>(
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
                      extra={<Link to={`/news_detail/${comment.uniquekey}`}>查看</Link>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            : <h3>您还没有发表过任何评论。</h3>

        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Tabs>
                    <TabPane tab="我的收藏列表" key="1" style={{padding: '10px'}}>
                        {userCollectionsList}
                    </TabPane>
                    <TabPane tab="我的评论列表" key="2" style={{padding: '10px'}}>
                        {userCommentsList}
                    </TabPane>
                    <TabPane tab="头像设置" key="3">
                        <div className="clearfix">
                            <Upload
                                action="http://jsonplaceholder.typicode.com/photos"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}>
                                {fileList.length >= 3 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}