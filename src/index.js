import { $id, $class, $show, $hide, $create } from './tools';
import './style.scss';


const me = {

    // common used elements
    $angleUp: $id('angle-up'),
    $angleDown: $id('angle-down'),
    $dropdown: $id('dropdown'),
    $modal: $id('modal'),
    $inputResource: $id('input-resources'),

    /**
     * bind avatar btn click event
     */
    bindBtnAvatar: function () {
        const avatar = $id('user-avatar');
        avatar.onclick = function (e) {
            (me.$dropdown.style.display !== 'block') ? me.dropMenu() : me.rollupMenu();
        }
    },

    /**
     * bind trash icon click event
     */
    bindIconTrash: function () {
        const delIcons = $class('icon-trash');
        for (let i = 0; i < delIcons.length; i++) {
            delIcons[i].onclick = function (e) {
                me.rmResource(e);
            }
        }
    },

    /**
     * bind plus icon click event
     */
    bindIconPlus: function () {
        const addBtns = $class('icon-plus');
        for (let i = 0; i < addBtns.length; i++) {
            addBtns[i].onclick = function (e) {
                me.addResources(e);
            }
        }
    },

    /**
     * bind modal's "Add Resources" button click event
     * 
     * @param e     //triggered event
     * @param _modal    //event source modal
     */
    bindBtnAdd: function (e, _modal) {
        const addBtn = $id('add-res-btn');
        addBtn.onclick = function () {
            const inputVal = me.$inputResource.value;
            (inputVal) ? me.appendResource(e, inputVal) : '';
            me.closeModal(_modal);
        }
    },

    /**
     * bind modal's "Cancel" button click event
     *
     * @param _modal    // event source modal
     */
    bindBtnCancel: function (_modal) {
        const btnCancel = $id('cancel-btn');
        btnCancel.onclick = function () {
            me.closeModal(_modal);
        }
    },

    /**
     * bind modal close-icon click event
     * 
     * @param _modal    //event source modal
     */
    bindIconClose: function (_modal) {
        const iconClose = $id('modal-close-icon');
        iconClose.onclick = function () {
            me.closeModal(_modal);
        }
    },

    /**
     * add resources
     * 
     * @param e     // triggered event
     */
    addResources: function (e) {
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

    /**
     * append resource to agent
     *
     * @param e     // triggered event
     * @param v     // inputted value(s)
     */
    appendResource: function (e, v) {
        const srcEle = e.target || e.srcElement;
        const parentUl = srcEle.parentElement.getElementsByClassName('env-list')[0];
        const v_arr = (v.length > 1) ? v.split(',') : v;
        for (let i = 0; i < v_arr.length; i++) {
            const liEle = $create('li', 'env-item');
            const spanEle = $create('span', 'env-name');
            const iconEle = $create('i', 'icon-trash');
            spanEle.innerText = v_arr[i];
            liEle.appendChild(spanEle).appendChild(iconEle);
            parentUl.appendChild(liEle);
        }
        me.bindIconTrash(); // bind new generated trash-icon(s)
    },

    /**
     * remove a resource after trash-icon clicked
     * 
     * @param e     // triggered event
     */
    rmResource: function (e) {
        const srcEle = e.target || e.srcElement;
        srcEle.parentElement.parentElement.remove();
    },

    /**
     * close modal
     *
     * @param _modal    // modal to close
     */
    closeModal: function (_modal) {
        $hide(_modal);
        me.$inputResource.value = '';
    },

    /**
     * drop the user menu
     */
    dropMenu: function () {
        $hide(me.$angleDown);
        $show(me.$angleUp);
        $show(me.$dropdown);
    },

    /**
     * rollup user menu
     */
    rollupMenu: function () {
        $hide(me.$angleUp);
        $show(me.$angleDown);
        $hide(me.$dropdown);
    }
}

/**
 * initializing
 */
window.onload = function () {
    me.bindBtnAvatar();
    me.bindIconTrash();
    me.bindIconPlus();
}


