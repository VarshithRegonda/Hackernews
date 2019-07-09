function generate() {
    var a = document.createElement('a');
    
    a.href = 'http://' + document.getElementById('href').value;    
    a.target = '_blank';
    a.appendChild(document.createTextNode(document.getElementById('href').value));
    document.getElementById('link').appendChild(a);
    document.getElementById('link').appendChild(document.createElement('br'));
}