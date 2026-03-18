const textAreaNames = document.getElementById("inputArea");
const textDrawer = localStorage.getItem("saveNames");
if(textDrawer){
    textAreaNames.value = textDrawer;
}
textAreaNames.addEventListener("input",() => {
    localStorage.setItem("saveNames",textAreaNames.value)
})