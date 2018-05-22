import './style.scss';

const agentsOperation = {

    bindDel : function () {
        const delIcons = document.getElementsByClassName('icon-trash');
        for(let i = 0; i<delIcons.length; i++){
            delIcons[i].onclick = function (e) {
                agentsOperation.delClicked(e);
            }
        }
    },

    bindAdd : function () {
        const addBtns = document.getElementsByClassName('icon-plus');
        for(let i=0; i<addBtns.length; i++){
            addBtns[i].onclick = function (e) {
                agentsOperation.addIconClicked(e);
            }
        }
    },

    bindAddRes : function(e, _modal){

        const addBtn = document.getElementById('add-res-btn');
        addBtn.onclick = function () {
            const inputVal = document.getElementById('input-resources').value;
            (inputVal) ? agentsOperation.addThese(e, inputVal) : '';
            // close modal
            agentsOperation.closeModal(_modal);
        }
    },

    bindClose : function (_modal) {
        const iconClose = document.getElementById('modal-close-icon');
        iconClose.onclick = function () {
            agentsOperation.closeModal(_modal);
        }
    },

    bindCancel : function (_modal) {
        const btnCancel = document.getElementById('cancel-btn');
        btnCancel.onclick = function () {
            agentsOperation.closeModal(_modal);
        }
    },

    addIconClicked : function(e){
        console.log(e);
        const modal = document.getElementById('modal');
        modal.style.left = e.clientX + "px";
        modal.style.top = e.clientY + "px";
        modal.style.display = 'block';
        // bind self events
        agentsOperation.bindClose(modal);   // icon-close
        agentsOperation.bindCancel(modal);   // cancel-btn
        agentsOperation.bindAddRes(e, modal);    // addRes-btn

    },

    addThese : function (e, v) {
      console.log(e, v);
    },

    delClicked : function (e) {
        e.srcElement.parentElement.parentElement.remove();
    },

    closeModal : function (_modal) {
        _modal.style.display = 'none';
    }

}

window.onload = function () {
    agentsOperation.bindDel();
    agentsOperation.bindAdd();
}


