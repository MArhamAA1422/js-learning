const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);  // output in browser's, network tab
});

xhr.open('GET', 'https://supersimplebackend.dev/documentation');
xhr.send();  // asynchronous
