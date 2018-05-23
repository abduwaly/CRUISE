import './style.scss';

const me = {
    
    $angleUp : document.getElementById('angle-up'),
    $angleDown : document.getElementById('angle-down'),
    $dropdown : document.getElementById('dropdown'),
    $modal : document.getElementById('modal'),
    $inputResource : document.getElementById('input-resources'),

    bindBtnAvatar: function () {
        const avatar = document.getElementById('user-avatar');
        avatar.onclick =function (e) {
            (me.$dropdown.style.display !== 'block') ? me.dropMenu() : me.rollupMenu();
        }
    },

    bindIconTrash: function () {
        const delIcons = document.getElementsByClassName('icon-trash');
        for (let i = 0; i < delIcons.length; i++) {
            delIcons[i].onclick = function (e) {
                me.delClicked(e);
            }
        }
    },

    bindIconPlus: function () {
        const addBtns = document.getElementsByClassName('icon-plus');
        for (let i = 0; i < addBtns.length; i++) {
            addBtns[i].onclick = function (e) {
                me.iconPlusClicked(e);
            }
        }
    },

    bindBtnAdd: function (e, _modal) {
        const addBtn = document.getElementById('add-res-btn');
        addBtn.onclick = function () {
            const inputVal = me.$inputResource.value;
            (inputVal) ? me.addResource(e, inputVal) : '';
            me.closeModal(_modal);
        }
    },

    bindIconClose: function (_modal) {
        const iconClose = document.getElementById('modal-close-icon');
        iconClose.onclick = function () {
            me.closeModal(_modal);
        }
    },

    bindBtnCancel: function (_modal) {
        const btnCancel = document.getElementById('cancel-btn');
        btnCancel.onclick = function () {
            me.closeModal(_modal);
        }
    },

    iconPlusClicked: function (e) {
        const modal = me.$modal;
        const ups = modal.getElementsByClassName('up');
        const downs = modal.getElementsByClassName('down');

        if (window.screen.height - e.screenY > 250) {
            ups[0].style.display = 'block';
            ups[1].style.display = 'block';
            downs[0].style.display = 'none';
            downs[1].style.display = 'none';
            modal.style.left = e.clientX - 20 + "px";
            modal.style.top = e.clientY + 30 + "px";
        } else {
            ups[0].style.display = 'none';
            ups[1].style.display = 'none';
            downs[0].style.display = 'block';
            downs[1].style.display = 'block';
            modal.style.left = e.clientX - 20 + "px";
            modal.style.top = e.clientY - 200 + "px";
        }
        me.rollupMenu(); // rollup user menu
        modal.style.display = 'block';

        // bind self events
        me.bindIconClose(modal);   // icon-close
        me.bindBtnCancel(modal);   // cancel-btn
        me.bindBtnAdd(e, modal);    // addRes-btn

    },

    addResource: function (e, v) {
        const parentUl = e.srcElement.parentElement.getElementsByClassName('env-list')[0];
        const vals = (v.length > 1) ? v.split(',') : v;
        for (let i = 0; i < vals.length; i++) {
            const liEle = me.createEle('li', 'env-item');
            const spanEle = me.createEle('span', 'env-name');
            const iconEle = me.createEle('i', 'icon-trash');
            spanEle.innerText = vals[i];
            liEle.appendChild(spanEle).appendChild(iconEle);
            parentUl.appendChild(liEle);
        }
        me.bindIconTrash(); // bind new trash icons
    },

    createEle: function (tag, className) {
        const el = document.createElement(tag);
        el.className = className;
        return el;
    },

    delClicked: function (e) {
        e.srcElement.parentElement.parentElement.remove();
    },

    closeModal: function (_modal) {
        _modal.style.display = 'none';
        me.$inputResource.value = '';
    },

    dropMenu: function () {
        me.$angleDown.style.display = 'none';
        me.$angleUp.style.display = 'block';
        me.$dropdown.style.display = 'block';
    },

    rollupMenu: function () {
        me.$angleUp.style.display = 'none';
        me.$angleDown.style.display = 'block';
        me.$dropdown.style.display = 'none';
    }
}

window.onload = function () {
    me.bindBtnAvatar();
    me.bindIconTrash();
    me.bindIconPlus();
}


