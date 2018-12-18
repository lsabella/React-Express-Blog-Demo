import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
    Redirect
} from 'react-router-dom'
import style from './style.css'
import ArticleList from "./components/articelList/ArticleList";
import {Pagination,Button} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as frontActions} from '../../reducers/frontReducer'
import {actions as logsActions} from '../../reducers/adminlog' 
const {get_article_list,get_article_detail} = frontActions;
const {create_log_operate,add_log_note} = logsActions;

class Home extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        const {tags} = this.props;
        localStorage.setItem('userInfo', JSON.stringify(this.props.userInfo));
        return (
            tags.length > 1 && this.props.match.params.tag && (tags.indexOf(this.props.match.params.tag) === -1 || this.props.location.pathname.lastIndexOf('\/') > 0)
                ?
                <Redirect to='/404'/>
                :
                <div className={style.container}>
                    <ArticleList
                        history={this.props.history}
                        data={this.props.articleList}
                        getArticleDetail={this.props.get_article_detail}
                    />
                    <div>{this.props.date+':'+this.props.creater+':'+this.props.place}</div>
                    <Button type='primary' icon="edit" onClick={()=>{this.props.create_log_operate('lsabella')}}>编辑</Button>
                    <div>{this.props.date+':'+this.props.creater+':'+this.props.place}</div>
                    <Button type='warn' icon="delete" onClick={()=>this.props.add_log_note()}>删除</Button>
                    <div className={style.paginationContainer}>
                        <Pagination
                            defaultPageSize={5}
                            onChange={(pageNum) => {
                                this.props.get_article_list(this.props.match.params.tag || '', pageNum);
                            }}
                            current={this.props.pageNum}
                            total={this.props.total}/>
                    </div>
                </div>
        )
    }

    componentDidMount() {
        this.props.get_article_list(this.props.match.params.tag || '')
    }
}

Home.defaultProps = {
    userInfo: {},
    pageNum: 1,
    total: 0,
    articleList: []
};

Home.propsTypes = {
    pageNum: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    articleList: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        tags: state.admin.tags,
        pageNum: state.front.pageNum,
        total: state.front.total,
        articleList: state.front.articleList,
        date: state.logs.date,
        creater: state.logs.creater,
        place: state.logs.place,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_article_list: bindActionCreators(get_article_list, dispatch),
        get_article_detail:bindActionCreators(get_article_detail,dispatch),
        create_log_operate:bindActionCreators(create_log_operate,dispatch),
        add_log_note:bindActionCreators(add_log_note,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);