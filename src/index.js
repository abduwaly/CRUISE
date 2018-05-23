import { $id, $class, $show, $hide, $create } from './tools';
import './style.scss';


const me = {

    $angleUp: $id('angle-up'),
    $angleDown: $id('angle-down'),
    $dropdown: $id('dropdown'),
    $modal: $id('modal'),
    $inputResource: $id('input-resources'),

    bindBtnAvatar: function () {
        const avatar = $id('user-avatar');
        avatar.onclick = function (e) {
            (me.$dropdown.style.display !== 'block') ? me.dropMenu() : me.rollupMenu();
        }
    },

    bindIconTrash: function () {
        const delIcons = $class('icon-trash');
        for (let i = 0; i < delIcons.length; i++) {
            delIcons[i].onclick = function (e) {
                me.delClicked(e);
            }
        }
    },

    bindIconPlus: function () {
        const addBtns = $class('icon-plus');
        for (let i = 0; i < addBtns.length; i++) {
            addBtns[i].onclick = function (e) {
                me.iconPlusClicked(e);
            }
        }
    },

    bindBtnAdd: function (e, _modal) {
        const addBtn = $id('add-res-btn');
        addBtn.onclick = function () {
            const inputVal = me.$inputResource.value;
            (inputVal) ? me.addResource(e, inputVal) : '';
            me.closeModal(_modal);
        }
    },

    bindIconClose: function (_modal) {
        const iconClose = $id('modal-close-icon');
        iconClose.onclick = function () {
            me.closeModal(_modal);
        }
    },

    bindBtnCancel: function (_modal) {
        const btnCancel = $id('cancel-btn');
        btnCancel.onclick = function () {
            me.closeModal(_modal);
        }
    },

    iconPlusClicked: function (e) {
        const modal = me.$modal;
        const ups = $class('point-up');
        const downs = $class('point-down');

        if (window.screen.height - e.screenY > 250) {
            $show(ups[0]);
            $show(ups[1]);
            $hide(downs[0]);
            $hide(downs[1]);
            modal.style.left = e.clientX - 20 + "px";
            modal.style.top = e.clientY + 30 + "px";
        } else {
            $hide(ups[0]);
            $hide(ups[1]);
            $show(downs[0]);
            $show(downs[1]);
            modal.style.left = e.clientX - 20 + "px";
            modal.style.top = e.clientY - 200 + "px";
        }
        me.rollupMenu(); // rollup user menu
        $show(modal);

        // bind self events
        me.bindIconClose(modal);   // icon-close
        me.bindBtnCancel(modal);   // cancel-btn
        me.bindBtnAdd(e, modal);    // addRes-btn

    },

    addResource: function (e, v) {
        const parentUl = e.srcElement.parentElement.getElementsByClassName('env-list')[0];
        const vals = (v.length > 1) ? v.split(',') : v;
        for (let i = 0; i < vals.length; i++) {
            const liEle = $create('li', 'env-item');
            const spanEle = $create('span', 'env-name');
            const iconEle = $create('i', 'icon-trash');
            spanEle.innerText = vals[i];
            liEle.appendChild(spanEle).appendChild(iconEle);
            parentUl.appendChild(liEle);
        }
        me.bindIconTrash(); // bind new trash icons
    },

    delClicked: function (e) {
        e.srcElement.parentElement.parentElement.remove();
    },

    closeModal: function (_modal) {
        $hide(_modal);
        me.$inputResource.value = '';
    },

    dropMenu: function () {
        $hide(me.$angleDown);
        $show(me.$angleUp);
        $show(me.$dropdown);
    },

    rollupMenu: function () {
        $hide(me.$angleUp);
        $show(me.$angleDown);
        $hide(me.$dropdown);
    }
}

window.onload = function () {
    me.bindBtnAvatar();
    me.bindIconTrash();
    me.bindIconPlus();
}


