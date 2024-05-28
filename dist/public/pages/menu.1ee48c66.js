function changeProductList(type, element) {
    let tabs = document.getElementsByClassName("tab-item");
    for(i = 0; i < tabs.length; i++){
        tabs[i].style.background = "#ffffff";
        tabs[i].style.color = "#000000";
    }
    element.style.background = "#04b90b";
    element.style.color = "#ffffff";
    element.style.borderRadius = "8px";
    document.getElementById(type).style.display = "grid";
    switch(type){
        case "korean-food":
            document.getElementById("fast-food").style.display = "none";
            document.getElementById("thailand-food").style.display = "none";
            break;
        case "fast-food":
            document.getElementById("korean-food").style.display = "none";
            document.getElementById("thailand-food").style.display = "none";
            break;
        case "thailand-food":
            document.getElementById("korean-food").style.display = "none";
            document.getElementById("fast-food").style.display = "none";
            break;
    }
}

//# sourceMappingURL=menu.1ee48c66.js.map
