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
  const absolutePath = await import("../../../../assets/images/" + path);
  const demoContainer = document.querySelector("#demo");
  if (demoContainer) {
    const posContainer = demoContainer.querySelector(
      `#${posMap[parseInt(pos)]}-container`
    );
    if (posContainer) {
      const componentId = `id="component_${id}"`;
      if (pos !== "4") {
        const elementContainer = document.createElement("div");
        elementContainer.classList.add(styles["item"]);
        elementContainer.innerHTML = `<img ${componentId} src="${absolutePath.default}" alt=""/>`;
        const connectLine = await import(
          "../../../../assets/images/connect-line.svg"
        );
        const lineId = `id="line_${id}"`;
        elementContainer.innerHTML += `<img class=${styles["line"]} ${lineId} src="${connectLine.default}" alt=""/>`;
        posContainer.appendChild(elementContainer);
        return;
      }
      posContainer.innerHTML = `<img ${componentId} src="${absolutePath.default}" alt=""/>`;
    }
  }
};

DeviceUtils.addExtension = (pos) => {
  const posContainer = document.querySelector(`#${posMap[pos]}`);
  if (!posContainer) return;
  posContainer.innerHTML += `<div id="extension" class=${styles["extension"]}></div>`;
  posContainer
    .querySelector(`#${posMap[pos]}-container`)
    .setAttribute("style", `border-top: 5px solid #fff`);
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
