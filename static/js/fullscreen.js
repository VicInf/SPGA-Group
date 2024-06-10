//Selecting all required elements
const galleries = {
    gallery1: document.querySelectorAll("#gallery1 .image"),
    gallery2: document.querySelectorAll("#gallery2 .image"),
    gallery3: document.querySelectorAll("#gallery3 .image"),
    gallery4: document.querySelectorAll("#gallery4 .image"),
};
previewBox = document.querySelector(".preview-box"),
shadow = document.querySelector(".shadow"),
previewImg = previewBox.querySelector("img"),
closeIcon = previewBox.querySelector(".icon"),
currentImg = previewBox.querySelector(".current-img"),
totalImg = previewBox.querySelector(".total-img");

window.onload = () => {
    for (const galleryName in galleries) {
        if (galleries.hasOwnProperty(galleryName)) {
            const gallery = galleries[galleryName];
            setupGallery(gallery);
        }
    }
};

function setupGallery(gallery) {
    for (let i = 0; i < gallery.length; i++) {
        totalImg.textContent = gallery.length;
        let newIndex = i; // passing i value to newIndex
        let clickImgIndex;
        gallery[i].onclick = ()=>{
            clickImgIndex = newIndex;
            console.log(i);
            function preview(){
                currentImg.textContent = newIndex + 1; //Passing newIndex value to currentImg and adding +1 for better UX
                let selectedImgUrl = gallery[newIndex].querySelector("img").src; //getting user clicked image url
                previewImg.src = selectedImgUrl; //passing user clicked img url to previewImg
            }
            //Previous and next buttons
            const prevBtn = document.querySelector(".prev");
            const nextBtn = document.querySelector(".next");
            if(newIndex == 0){
                prevBtn.style.display = "none";
            }
            if(newIndex >= gallery.length - 1) {
                nextBtn.style.display = "none";
            }
            prevBtn.onclick = () => {
                newIndex--;
                if (newIndex == 0){
                    preview();
                    prevBtn.style.display = "none";
                }else{
                    preview();
                    nextBtn.style.display = "block";
                }
            }
            nextBtn.onclick = () => {
                newIndex++;
                if (newIndex >= gallery.length - 1){
                    preview();
                    nextBtn.style.display = "none";
                }else{
                    preview();
                    prevBtn.style.display = "block";
                }
            }
            preview();
            previewBox.classList.add("show");
            shadow.style.display = "block";

            closeIcon.onclick = ()=>{
                newIndex = clickImgIndex; //Assigning user first click img index to newIndex variable
                nextBtn.style.display = "block";
                prevBtn.style.display = "block";
                shadow.style.display = "none";
                previewBox.classList.remove("show");
            }
            shadow.onclick = () => {
                previewBox.classList.remove("show");
                shadow.style.display = "none";
           }
        }
    }
}
