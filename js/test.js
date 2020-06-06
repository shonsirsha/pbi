let jsonForm = [
  {
    sectionName: "Personal Details",
    content: { fullName: "text", nationality: "text", sex: ["female", "male"] },
  },
  {
    sectionName: "Term Of Payment",
    content: {
      paidBy: ["individually", "organization"],
      paidUponArrival: ["cash", "credit", "bank transfer"],
    },
  },
];
var wrapper = document.getElementById("wrapper");
jsonForm.forEach((menuSection, i) => {
  wrapper.innerHTML += "<section class='" + i + "'>" + menuSection.sectionName;
  for (var inputName in menuSection.content) {
    if (menuSection.content.hasOwnProperty(inputName)) {
      if (Array.isArray(menuSection.content[inputName])) {
        wrapper.innerHTML += "<select id='" + inputName + "'>";
        let inputSelect = document.getElementById(inputName);
        menuSection.content[inputName].forEach((x) => {
          inputSelect.innerHTML += "<option>" + x + "</option>";
        });
      } else {
        wrapper.innerHTML +=
          "<input type='" +
          menuSection.content[inputName] +
          "' placeholder='" +
          inputName +
          "'/>";
      }
    }
  }
  wrapper.innerHTML += "</section>";
});
