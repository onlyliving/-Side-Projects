import React, { Component } from 'react';

class FilterImageShape extends Component {

    shouldComponentUpdate(newProps, newState) {
        console.log('>>>>>>> ===== FilterImageShape - shouldComponentUpdate =======');

        console.log(newProps);
        console.log(newState);
        if (newProps.data.requestData === this.props.data.requestData) {
            return false;
        }

        return true;
    }

    classAllRemove(el, className) {
        for (let i = 0; i < el.length; i += 1) {
            if (el[i].classList.contains(className)) {
            el[i].classList.remove(className);
            }
        }   
    };

    filterShapeEvent(thisNumber) {
        console.log('==== filterShapeEvent  ====');
        console.log(this);
        console.log(thisNumber);

        if (thisNumber === 0 || thisNumber) {
            console.log(document.querySelectorAll('.search-filter__list li')[thisNumber].querySelector('button').value);
            console.log(this);
            console.log(this.props.data.requestData.orientation);


        
            this.classAllRemove(document.querySelectorAll('.search-filter__list li'), 'is-active');
            document.querySelectorAll('.search-filter__list li')[thisNumber].classList.contains('is-active') ? document.querySelectorAll('.search-filter__list li')[thisNumber].classList.remove('is-active') : document.querySelectorAll('.search-filter__list li')[thisNumber].classList.add('is-active');
            

            // TODO : 여기에서 this.props.data.requestData.orientation 데이터가 바로 업데이트 되지 않음.
            
            document.getElementById('searchBtn').click();
        
            if (document.querySelectorAll('.search-filter__list li')[thisNumber].querySelector('button').value === 'landscape') {
                document.getElementById('resultEl').classList.add('is-type-landscape');
                document.getElementById('resultEl').classList.remove('is-type-portrait');

            } else if (document.querySelectorAll('.search-filter__list li')[thisNumber].querySelector('button').value === 'portrait') {
                document.getElementById('resultEl').classList.remove('is-type-landscape');
                document.getElementById('resultEl').classList.add('is-type-portrait');

            } else {
                document.getElementById('resultEl').classList.remove('is-type-landscape');
                document.getElementById('resultEl').classList.remove('is-type-portrait');
            }
        
            return true;
        }
        return false;
    }

    render() {
        console.log(`==> FilterImageShape render`);
        console.log(this);

        let filterImageShapeDataArr = this.props.data.filter.filterImageShape;
        let imageShapeList = [];

        for(let i = 0; i < filterImageShapeDataArr.length; i += 1) {
            if (i === 0) {
                imageShapeList.push(
                    <li className="is-active" key={i}><button onClick={function(){this.filterShapeEvent(i)}.bind(this)} type="button" name="filter" value={filterImageShapeDataArr[i].value}>{filterImageShapeDataArr[i].desc}</button></li>
                )

            } else {
                imageShapeList.push(
                    <li key={i}><button onClick={function(){this.filterShapeEvent(i)}.bind(this)} type="button" name="filter" value={filterImageShapeDataArr[i].value}>{filterImageShapeDataArr[i].desc}</button></li>
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