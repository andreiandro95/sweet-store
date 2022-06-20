// filter items
(function(){
    let images = document.querySelectorAll(".store-item");
    let buttons = document.querySelectorAll(".btn-store");
    
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            let filterName = btn.getAttribute("data-name");

            images.forEach(img => {
                if(filterName === "all"){
                    img.style.display = "block";
                }else if(img.classList.contains(filterName)){
                    img.style.display = "block";
                }else{
                    img.style.display = "none";
                }
            })
        })
    })
})();

// search items
(function(){
    let searchBox = document.querySelector(".search-box");
    let cards = document.querySelectorAll(".store-item");

    searchBox.addEventListener("keyup", function(){

        let searchLetters = searchBox.value.toLowerCase();

        cards.forEach((item) =>  {
            if(item.textContent.toLowerCase().includes(searchLetters)){
                item.style.display = 'block';
            }else{
                item.style.display = "none";
            }   
        })      
    })
})();

// gallery image
(function(){
    let galleryImage = document.querySelectorAll(".store-img");
    let currentIndex = 0;
    let arrayImages = [];
    galleryImage.forEach(img => {
        arrayImages.push(img);
        img.addEventListener("click", function(){
            currentIndex = arrayImages.indexOf(img);

            let imagePresent = document.createElement("div");
            imagePresent.classList.add("image-presentation");
            document.body.appendChild(imagePresent);

            let closeDiv = document.createElement("div");
            closeDiv.classList.add("image-div");
            let closeButton = document.createElement("span");
            closeButton.innerHTML = `<i class="fas fa-times-circle"></i>`;
            closeDiv.appendChild(closeButton);
            imagePresent.appendChild(closeDiv);

            let imageHolder = document.createElement("img");
            imageHolder.setAttribute("src", arrayImages[currentIndex].src);
            imageHolder.classList.add("gallery-image");
            imagePresent.appendChild(imageHolder);

            let nextButton = document.createElement("span")
            let textNext = document.createElement("i");
            textNext.setAttribute("class", "fas fa-arrow-circle-right btn-control button-next");
            nextButton.appendChild(textNext);
            imagePresent.appendChild(nextButton);

            let prevButton = document.createElement("span")
            let textPrev = document.createElement("i");
            textPrev.setAttribute("class", "fas fa-arrow-circle-left btn-control button-prev");
            prevButton.appendChild(textPrev);
            imagePresent.appendChild(prevButton);

            nextButton.addEventListener('click', function(){
                currentIndex++;
                if(currentIndex > arrayImages.length - 1){
                    currentIndex = 0;
                }
                imageHolder.src = arrayImages[currentIndex].src
            });

            prevButton.addEventListener('click', function(){
                currentIndex--;
                if(currentIndex < 0){
                    currentIndex = arrayImages.length - 1;
                }
                imageHolder.src = arrayImages[currentIndex].src
            })

            closeButton.addEventListener('click', function(){
                imagePresent.remove();
            })
        })
    })
})();

// add to cart
(function(){
    let addCart = document.querySelectorAll(".add-cart");
    let itemImage = document.querySelectorAll(".store-img")
    let itemName = document.querySelectorAll(".item-name");
    let itemPrice = document.querySelectorAll(".item-price");
    let cart = document.querySelector(".cart-items");
    let shopCart = document.querySelector(".shop-cart");

    let noProductInCart = 0;
    let crtIndex = 0;
    let total = 0;

    let imageArr = [];
    let nameArr = [];
    let priceArr = [];
    let btnArr = [];

    for(let i = 0; i < addCart.length; i++){
        btnArr.push(addCart[i]);
    }
    for(let i = 0; i < itemImage.length; i++){
        imageArr.push(itemImage[i]);
    }
    for(let i = 0; i < itemName.length; i++){
        nameArr.push(itemName[i]);
    }
    for(let i = 0; i < itemPrice.length; i++){
        priceArr.push(itemPrice[i]);
    }

    addCart.forEach(btn => {
        btn.addEventListener('click', function(){
            crtIndex = btnArr.indexOf(btn);
            noProductInCart++;
            
            let divImg = document.createElement("div");
            divImg.classList.add("div-img");
            cart.appendChild(divImg);

            let imgCart = document.createElement("img");
            imgCart.setAttribute("src", imageArr[crtIndex].src);
            imgCart.classList.add("img-cart");
            divImg.appendChild(imgCart);

            let divText = document.createElement("div");
            divText.classList.add("name-price");
            cart.appendChild(divText);

            let nameProd = document.createElement('p');
            let nameProdText = document.createTextNode(nameArr[crtIndex].textContent);
            nameProd.appendChild(nameProdText);
            nameProd.classList.add('name');
            divText.appendChild(nameProd);

            let priceProd = document.createElement('p');
            let priceProdText = document.createTextNode(priceArr[crtIndex].textContent);
            priceProd.appendChild(priceProdText);
            priceProd.classList.add('price');
            divText.appendChild(priceProd);

            let deleteItem = document.createElement("div");
            deleteItem.classList.add("delete-item");
            cart.appendChild(deleteItem);

            let deleteFromCart = document.createElement('span');
            let deleteIcon = document.createElement("i");
            deleteIcon.setAttribute("class", "fas fa-trash-alt");
            deleteFromCart.appendChild(deleteIcon);
            deleteItem.appendChild(deleteFromCart);

            total += +priceProd.textContent.match(/[0-9]{1,2}/g);
            console.log(total)
            deleteFromCart.addEventListener("click", function(){
                divImg.remove();
                divText.remove();
                deleteItem.remove();
                noProductInCart--;
                document.querySelector(".number-prod").textContent = noProductInCart;
                document.querySelector(".total-price").textContent = total - (+priceProd.textContent.match(/[0-9]{1,2}/g));
                
            });

            document.querySelector(".number-prod").textContent = noProductInCart;
            document.querySelector(".total-price").textContent = total;
        })
        
    })
    shopCart.addEventListener("click", function(){
        if(document.querySelector(".cart-visibility").style.display === "none"){
            document.querySelector(".cart-visibility").style.display = "block"
        }else{
            document.querySelector(".cart-visibility").style.display = "none"
        }
    })
 
   
})();

document.querySelector('.close-menu-mobile').addEventListener("click", function(){
    document.querySelector(".navigation").classList.remove('menu-active');
})

document.querySelector('.open-menu-mobile-btn').addEventListener("click", function(){
    document.querySelector(".navigation").classList.add('menu-active');
})