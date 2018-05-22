import './style.scss';

const me = {

    bindIconTrash : function () {
        const delIcons = document.getElementsByClassName('icon-trash');
        for(let i = 0; i<delIcons.length; i++){
            delIcons[i].onclick = function (e) {
                me.delClicked(e);
            }
        }
    },

    bindIconPlus : function () {
        const addBtns = document.getElementsByClassName('icon-plus');
        for(let i=0; i<addBtns.length; i++){
            addBtns[i].onclick = function (e) {
                me.iconPlusClicked(e);
            }
        }
    },

    bindBtnAdd : function(e, _modal){
        const addBtn = document.getElementById('add-res-btn');
        addBtn.onclick = function () {
            const inputVal = document.getElementById('input-resources').value;
            (inputVal) ? me.addResource(e, inputVal) : '';
            // close modal
            me.closeModal(_modal);
        }
    },

    bindIconClose : function (_modal) {
        const iconClose = document.getElementById('modal-close-icon');
        iconClose.onclick = function () {
            me.closeModal(_modal);
        }
    },

    bindBtnCancel : function (_modal) {
        const btnCancel = document.getElementById('cancel-btn');
        btnCancel.onclick = function () {
            me.closeModal(_modal);
        }
    },

    iconPlusClicked : function(e){
        console.log(e);
        const modal = document.getElementById('modal');
        modal.style.left = e.clientX - 20 + "px";
        modal.style.top = e.clientY + 30 + "px";
        modal.style.display = 'block';
        // bind self events
        me.bindIconClose(modal);   // icon-close
        me.bindBtnCancel(modal);   // cancel-btn
        me.bindBtnAdd(e, modal);    // addRes-btn

    },

    addResource : function (e, v) {
        const parentUl = e.srcElement.parentElement.getElementsByClassName('env-list')[0];
        const vals = (v.length>1) ? v.split(',') : v;
        for(let i=0; i < vals.length; i++){
            const liEle = me.createEle('li', 'env-item');
            const spanEle = me.createEle('span', 'env-name');
            const iconEle = me.createEle('i', 'icon-trash');
            spanEle.innerText = vals[i];
            liEle.appendChild(spanEle).appendChild(iconEle);
            parentUl.appendChild(liEle);
        }
        // bind new trash icons
        me.bindIconTrash();
    },

    createEle : function (tag, className) {
        const el = document.createElement(tag);
        el.className = className;
        return el;
    },

    delClicked : function (e) {
        e.srcElement.parentElement.parentElement.remove();
    },

    closeModal : function (_modal) {
        _modal.style.display = 'none';
    }
}

window.onload = function () {
    me.bindIconTrash();
    me.bindIconPlus();
}


