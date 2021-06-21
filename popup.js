function toggleSetting(name, value) {
    let payload = {};
    payload[name] = value;
}

document.addEventListener('DOMContentLoaded', () => {
    for (let elem of document.getElementsByClassName('setting-toggle')) {
        chrome.storage.sync.get(elem.id, res => {
            if (Object.keys(res).length === 0) {
                toggleSetting(elem.id, true);
                elem.checked = true;
            } else {
                elem.checked = res[elem.id];
            }
        });
    }

    const input = document.getElementById('score-value');
    chrome.storage.sync.get('score-value', res => {
        input.value = res['score-value'];
    });
});

for (let elem of document.getElementsByClassName('setting-toggle')) {
    elem.addEventListener('change', (evt) => {
        toggleSetting(elem.id, evt.target.checked);
    });
}
const input = document.getElementById('score-value');
input.addEventListener('blur', (e) => {
    chrome.storage.sync.set({'score-value': e.target.value});
});