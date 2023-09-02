const $fileZone = document.querySelector('.drag-file__zone')
const $files = document.querySelector('.drag-file__list')
const dragOverStyleName = 'drag-file__zone_hover'

$fileZone.addEventListener('dragover', dragOverFilePicker)
$fileZone.addEventListener('dragleave', dragLeaveFilePicker)
$fileZone.addEventListener('drop', dragDropFilePicker)

function dragOverFilePicker(event) {
    event.preventDefault()
    event.stopPropagation()
    setFileHover()
}

function dragLeaveFilePicker() {
    resetFileHover()
}

function dragDropFilePicker(event) {
    event.preventDefault()
    event.stopPropagation()
    addFiles(event.dataTransfer.files)
    resetFileHover()
}

function addFiles(files) {
    const listFiles = Array.from(files)

    listFiles.forEach((file) => {
        addFile(file)
    })
}

function addFile(file) {
    const $fileItem = document.createElement('li')
    $fileItem.innerHTML = file.name
    $files.append($fileItem)
}

function setFileHover() {
    $fileZone.classList.add(dragOverStyleName)
}

function resetFileHover() {
    $fileZone.classList.remove(dragOverStyleName)
}