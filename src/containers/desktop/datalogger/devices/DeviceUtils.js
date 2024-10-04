import Libs from "../../../../utils/Libs";
import styles from "./addDevice/AddDevice.module.scss";
const DeviceUtils = {};

const posMap = {
  0: "top",
  1: "left",
  2: "bottom",
  3: "right",
  4: "center",
};
DeviceUtils.fetchImage = async (path, pos = "4", id = null) => {
  if (!path) return;
  Libs.progress(true);
  const absolutePath = await import("../../../../assets/images/" + path);
  const demoContainer = document.querySelector("#demo");
  if (demoContainer) {
    const posContainer = demoContainer.querySelector(
      `#${posMap[parseInt(pos)]}-container`
    );
    if (posContainer) {
      await DeviceUtils.addImage(absolutePath, pos, posContainer, id);
    }
  }
  Libs.progress(false);
};

DeviceUtils.addImage = async (
  path,
  pos,
  posContainer,
  id = null,
  topOfParent = false
) => {
  const componentId = `id="component_${id}"`;
  if (pos !== "4") {
    const elementContainer = document.createElement("div");
    elementContainer.classList.add(styles["item"]);
    elementContainer.innerHTML = `<img ${componentId} src="${path.default}" alt=""/>`;
    const connectLine = await import(
      "../../../../assets/images/connect-line.svg"
    );
    const lineId = `id="line_${id}"`;
    elementContainer.innerHTML += `<img class=${styles["line"]} ${lineId} src="${connectLine.default}" alt=""/>`;

    if (topOfParent) {
      posContainer.insertBefore(elementContainer, posContainer.firstChild);
    } else {
      posContainer.appendChild(elementContainer);
    }
  } else {
    posContainer.innerHTML = `<img ${componentId} src="${path.default}" alt=""/>`;
  }
  posContainer.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
};

DeviceUtils.expandContainer = async (path, pos = "4", id = null) => {
  const posContainer = document.querySelector(`#${posMap[pos]}-container`);
  if (!posContainer) return;

  const absolutePath = await import("../../../../assets/images/" + path);
  var container = posContainer.querySelector(`.${styles["item-container"]}`);
  if (!container) {
    container = document.createElement("div");
    container.classList.add(styles["item-container"]);
    posContainer.firstElementChild.insertBefore(
      container,
      posContainer.firstElementChild.firstChild
    );
  }

  await DeviceUtils.addImage(absolutePath, pos, container, id, true);
};

DeviceUtils.addExtension = (pos) => {
  const posContainer = document.querySelector(`#${posMap[pos]}`);
  if (!posContainer) return;
  posContainer.innerHTML += `<div id="extension" class=${styles["extension"]}></div>`;
  posContainer
    .querySelector(`#${posMap[pos]}-container`)
    .setAttribute("style", `border-top: 5px solid #fff`);
};

DeviceUtils.createExtension = () => {
  const extension = document.createElement("div");
  extension.id = "extension";
  extension.classList.add(styles["extension"]);
  return extension;
};

DeviceUtils.clearDemoImage = () => {
  const demoContainer = document.querySelector("#demo");
  if (demoContainer) {
    demoContainer.querySelector("#top-container").innerHTML = "";
    demoContainer.querySelector("#bottom-container").innerHTML = "";
    demoContainer.querySelector("#center-container").innerHTML = "";
    demoContainer.querySelector("#left-container").innerHTML = "";
    demoContainer.querySelector("#right-container").innerHTML = "";
    demoContainer.querySelectorAll("#extension").forEach((item) => {
      item.remove();
    });
  }
};

export default DeviceUtils;
