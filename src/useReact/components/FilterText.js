import React, { Component } from 'react';

class FilterText extends Component {

    textAllChangeEvent() {
          let modifyText = '';
          if (!document.getElementById('textAllChangeInput').value) {
            alert('내용을 입력해주세요.');
            return false;
          }
      
          modifyText = document.getElementById('textAllChangeInput').value;
          for (let i = 0; i < document.getElementsByClassName('result-item').length; i += 1) {
            document.getElementsByClassName('result-item')[i].querySelector('textarea').value = modifyText;
          }
    }

    render() {
        console.log(`==> FilterText render`);
        return (
            <article id="textChangeEvent" className="text-all-change-box">
                <h3 className="hide-text">텍스트 한번에 변경하기</h3>
                <input id="textAllChangeInput" className="text-all-change-box__input" type="text" placeholder="텍스트를 한번에 바꾸려면 내용을 입력해주세요." 
                    onKeyPress={function() {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                        event.stopPropagation();
                        document.getElementById('textAllChangeSend').click();
                        return true;}}.bind(this)}>

                </input>
                <button id="textAllChangeSend" className="text-all-change-box__btn" type="button" onClick={function(){this.textAllChangeEvent()}.bind(this)}>Change Text</button>
            </article>
        )
    }
}

export default FilterText;