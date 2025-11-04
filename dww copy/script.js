window.addEventListener("DOMContentLoaded", () => {

    // setup adafruitIO requests
    const username = "methio";
    const activeKey = "aio_Pcdt15ROlZChsv9xdLc5S2BrVFo6";
    const IO = new AdafruitIO(username, activeKey);

    
    // create boxes 
    const colorsContainer = document.getElementById("colors-container");
    const colors = ['#6186CC', '#61CCCA', '#3357FF', '#CC6162', '#D5BD45', '#86BD87', '#2898B4', '#E7D69D', '#8FCC61', '#B78760'];
    let newColorInfo = "#ffffff";

    colors.forEach(color => {
        colorsContainer.innerHTML += `<div class="color-box" style="background-color: ${color};" data-color="${color}"></div>`;
        console.log("color added to the page")
    });

    let ColorBoxes = document.querySelectorAll(".color-box");

    // color picker
    const alwan = new Alwan("#color-picker", {
        theme: "light",
        popover: true,
        toggle: true,
        color: "#228B22",
        position: "top-center",
        margin: 5,
        inputs: {
        rgb: false,
        hex: true,
        hsl: false,
        },
        opacity: false,
    });


    alwan.on('change', (ev) => { 
        // console.log( ntc.name(ev.hex))
        const colorName = ntc.name(ev.hex)[1];
        newColorInfo = document.getElementById("new-color-info");
        newColorInfo.innerHTML = colorName;
        const newColorButton = document.getElementById("new-color-button");
        newColorButton.innerHTML = colorName;       
    });

    // button to create a new color box
    const buttonCreateColor = document.getElementById("button-create-color");
    buttonCreateColor.addEventListener("click", () => {
        const newColor = alwan.getColor().hex;
        colorsContainer.innerHTML += `<div class="color-box" style="background-color: ${newColor};" data-color="${newColor}"></div>`;
        ColorBoxes = document.querySelectorAll(".color-box");
        colorBoxListerner(ColorBoxes);

    });

    // listen to boxes click -> update UI and send color to display
    const colorBoxListerner = (colorBoxesList) => {
        colorBoxesList.forEach(box => {
            box.addEventListener("click", (e) => { 
                console.log(box.dataset.color);
                const colorInfo = document.getElementById("color-info");
                const title = colorInfo.children[0];
                title.innerHTML = box.dataset.color;
                const subTitle = colorInfo.children[1];
                subTitle.innerHTML = ntc.name(box.dataset.color)[1];
                const colorDisplay = document.getElementById("top-section");
                colorDisplay.style.backgroundColor = box.dataset.color;

                // off to avoid flooding the feed
                 IO.postData("color25", box.dataset.color);
            });
        });
    }

    colorBoxListerner(ColorBoxes);


});