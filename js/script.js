
// Textarea that grows dynamically on typing multiple lines
document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('textpost');

    textarea.addEventListener('input', function () {
        // 1. Reset height to 'auto' so it can shrink when deleting text
        this.style.height = 'auto';

        // 2. Set the height to match the internal scroll content
        // We use scrollHeight to see how much space the text actually takes
        this.style.height = (this.scrollHeight) + 'px';
    });
});