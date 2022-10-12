/** @type {HTMLCanvasElement} */
const myCanvas = document.getElementById("canvas");
const backGround = document.getElementById("backGround");
const image = document.getElementById("image");
const button = document.getElementById("downBtn");
const color = document.getElementById("color");

const ctx = myCanvas.getContext("2d");
const img = new Image();

image.disabled = true;
button.disabled = true;
color.disabled = true;

const transferImage = ({ target }) => {
  if (target.id === "backGround") {
    img.src = URL.createObjectURL(target.files[0]);
    img.onload = function () {
      myCanvas.width = this.width;
      myCanvas.height = this.height;
      ctx.drawImage(img, 0, 0, this.width, this.height);
      image.disabled = false;
    };
    return;
  }

  let width = 200;
  let height = 200;
  if (target.id === "image") {
    img.src = URL.createObjectURL(target.files[0]);
    img.onload = function () {
      ctx.drawImage(
        img,
        myCanvas.width / 2 - width / 2,
        myCanvas.height - height,
        width,
        height
      );
      button.disabled = false;
      color.disabled = false;
    };
    return;
  }
  ctx.filter = `drop-shadow(0 0 1rem ${target.value})`;
  ctx.drawImage(
    img,
    myCanvas.width / 2 - width / 2,
    myCanvas.height - height,
    width,
    height
  );
};

backGround.addEventListener("change", transferImage);
image.addEventListener("change", transferImage);
color.addEventListener("change", transferImage);

button.addEventListener("click", () => {
  let downloadButton = document.createElement("a");
  let imageDownload = document.createElement("img");
  let imageTransfered = myCanvas.toDataURL("image/png");

  imageDownload.src = imageTransfered;

  downloadButton.appendChild(imageDownload);
  downloadButton.href = imageTransfered;
  downloadButton.download = "convert-image.png";
  downloadButton.click();
  downloadButton.remove();

  image.disabled = false;
  button.disabled = false;
  color.disabled = false;
});
