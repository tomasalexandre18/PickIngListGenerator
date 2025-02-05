function download(filename: string, text: string) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

export function saveConfig() {
    const config = window.localStorage.getItem('categories')
    if (config) {
        download('config.json', config)
    }
}

export function loadConfig() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = () => {
        if (input.files && input.files.length > 0) {
            const file = input.files[0]
            const reader = new FileReader()
            reader.onload = () => {
                window.localStorage.setItem('categories', reader.result as string)
            }
            reader.readAsText(file)
        }
    }
    input.click()
}