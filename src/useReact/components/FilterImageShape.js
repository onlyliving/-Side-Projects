import React, { Component } from 'react';

class FilterImageShape extends Component {
    render() {
        console.log(`==> FilterImageShape render`);

        let filterImageShapeDataArr = this.props.data.filterImageShape;
        let imageShapeList = [];

        for(let i = 0; i < filterImageShapeDataArr.length; i += 1) {
            if (i === 0) {
                imageShapeList.push(
                    <li className="is-active" key={i}><button type="button" name="filter" value={filterImageShapeDataArr[i].value}>{filterImageShapeDataArr[i].desc}</button></li>
                )

            } else {
                imageShapeList.push(
                    <li key={i}><button type="button" name="filter" value={filterImageShapeDataArr[i].value}>{filterImageShapeDataArr[i].desc}</button></li>
                )
            }
        }

        return (
            <ul className="search-filter__list">
                {imageShapeList}
            </ul>
        )
    }
}

export default FilterImageShape;