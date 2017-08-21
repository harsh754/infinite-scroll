import React, { Component } from 'react';
import Infinite from 'react-infinite';
class ListItem extends Component {

    render() {
        return (
            <div style={{ height: this.props.height, lineHeight: this.props.lineHeight }}>
                List Item {this.props.index}
            </div>
        )
    }
}

ListItem.defaultProps = {
    height: 50,
    lineHeight: "50px"
}

export default class InfiniteList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            elements: this.buildElements(0,10),
            isInfiniteLoading: false
        }
    }

    buildElements = (start, end) => {
        var elements = [];
        for (var i = start; i < end; i++) {
            elements.push(<ListItem index={i} key={i} />)
        }
        return elements;
    }

    handleInfiniteLoad = () => {
        let that = this;
        this.setState({
            isInfiniteLoading: true
        });
        setTimeout(() => {
            let elemLength = that.state.elements.length,
                newElements = that.buildElements(elemLength, elemLength + 5);
            that.setState({
                isInfiniteLoading: false,
                elements: that.state.elements.concat(newElements)
            });
        }, 2500);
    }

    elementInfiniteLoad() {
        return (
            <div className="infinite-list-item">
                Loading...
            </div>
        )
    }

    render() {
        return <Infinite elementHeight={50}
                         
                         containerHeight={250}
                         
                        infiniteLoadBeginEdgeOffset={200}
                         
                         onInfiniteLoad={this.handleInfiniteLoad}
                         
                         loadingSpinnerDelegate={this.elementInfiniteLoad()}
                         
                         isInfiniteLoading={this.state.isInfiniteLoading}
                         
                         timeScrollStateLastsForAfterUserScrolls={1000}
        >

            {this.state.elements}

        </Infinite>
    }
}