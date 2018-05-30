import {$id, $class, $show, $hide, $create, $append} from './tools';
import './style.scss'; // style should be imported before template!!!
import * as Template from './template.js';


const me = {

    // common used elements
    $angleUp: $id('angle-up'),
    $angleDown: $id('angle-down'),
    $dropdown: $id('dropdown'),
    $modal: $id('modal'),
    $inputResource: $id('input-resources'),

    // optional data for an app item
    options: {
        osIcons: ['cent_os','debin','suse','ubuntu','windows'],
        tags: [
            {name: 'idle', class: 'tag-idle'},
            {name: 'building', class: 'tag-building'}
        ],
        resources: ['Firefox', 'Safari', 'Ubuntu', 'Chrome']
    },


    initAppList: function () {
        const appNum = 5;
        for (let i = 1; i < appNum + 1; i++) {
            const randomItem = me.generateRandomItem(i);
            $append($id('app-list'), Template.appItem(randomItem));
        }
    },

    generateRandomItem: function (i) {
        const random = (i % 2);
        const itemData = {
            osIcon: me.options.osIcons[Math.floor(Math.random()* me.options.osIcons.length)],
            appName: 'bjstdmngbgr0' + i + '.thoughtworks.com',
            tag: {
                name: me.options.tags[random].name,
                class: me.options.tags[random].class
            },
            ip: '192.168.1.' + Math.ceil(Math.random() * 100),
            path: '/var/lib/cruise-agent',
            resources: me.options.resources.sort().slice(0,3),
            btn: {
                flag: Boolean(random) ? '' : 'none',
                name: 'Deny'
            }
        };
        return itemData;
    },

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
            if (inputVal) {
                me.appendResource(e, inputVal);
                me.closeModal(_modal);
            } else {
                alert('Invalid input!');
            }
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
    me.initAppList();
    me.bindBtnAvatar();
    me.bindIconTrash();
    me.bindIconPlus();
}


