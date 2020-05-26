import React, { Component } from 'react';

class SearchList extends Component {

    shouldComponentUpdate(newProps, newState) {
        console.log('>>>>>>> ===== shouldComponentUpdate =======');
        if (newProps.data.requestData.keywords === this.props.data.requestData.keywords) {
            return false;
        }
        return true;
    }

    render() {
        console.log(`==> SearchList render`);

        return (
            <ol id="resultEl" className="result-item-wrap"></ol>
        )
    }
}

export default SearchList;