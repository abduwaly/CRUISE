export function appItem(data) {
    return `<div class="app-item">
                <img class="os-img" src="./assets/os-icons/${data.osIcon}">
                <div class="first-line">
                    <i class="icon-desktop"></i>
                    <span class="app-name">${data.appName}</span>
                    <span class="app-tag ${data.tag.class}">${data.tag.name}</span>
                    <i class="icon-info"></i>
                    <span class="app-info">${data.ip}</span>
                    <i class="icon-folder"></i>
                    <span class="app-info">${data.path}</span>
                </div>
                <div class="second-line">
                    <i class="icon-plus"></i>
                    <ul class="env-list">
                        <li class="env-item">
                            <span class="env-name">${data.resources[0]} <i class="icon-trash"></i></span>
                        </li>
                        <li class="env-item">
                            <span class="env-name">${data.resources[1]} <i class="icon-trash"></i></span>
                        </li>
                        <li class="env-item">
                            <span class="env-name">${data.resources[2]} <i class="icon-trash"></i></span>
                        </li>
                    </ul>
                </div>
                <div class="action-btns" style="display:${data.btn.flag}">
                    <button class="deny-btn"><i class="icon-deny"></i>${data.btn.name}</button>
                </div>
            </div>`;
}