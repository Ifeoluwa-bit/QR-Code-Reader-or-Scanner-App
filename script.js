//getting all required elements
const container = document.querySelector(".container"),
form = container.querySelector("form"),
fileInput = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = container.querySelector(".close"),
copyText = container.querySelector(".copy");


function fetchRequest(formData, file) {
    infoText.innerText = "Scanning QR Code...";
    //sending post request to qr server api with passing
    //formData as body and getting response from it
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR to Scan Code" : "Couldn't Scan QR Code";
        if(!result) return;
        container.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        
        container.classList.add('active');
    }).catch(() => {
        infoText.innerText = "  Couldn't Scan QR Code"
    });
}

fileInput.addEventListener('change', e => {
    let file = e.target.files[0]; //getting user selected file
    if(!file) return;
    let formData = new FormData(); //creating a new formData object
    formData.append("file", file );
    fetchRequest(formData, file); 
});

copyText.addEventListener('click', () => {
    let text = container.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
 });

form.addEventListener('click', () => fileInput.click());
closeBtn.addEventListener('click', () => container.classList.remove('active'));