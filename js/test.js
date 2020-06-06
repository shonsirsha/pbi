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

const createForms = (json) => {
  let wrapper = document.getElementById("wrapper");
  let currentPage = 1;
  json.forEach((menuSection, i) => {
    if (i === currentPage - 1) {
      wrapper.innerHTML +=
        "<section id='multiStep" + i + "'>" + menuSection.sectionName;
    } else {
      wrapper.innerHTML +=
        "<section class='hidden' id='multiStep" +
        i +
        "'>" +
        menuSection.sectionName;
    }

    for (var inputName in menuSection.content) {
      // loops through the 'content' obj

      if (menuSection.content.hasOwnProperty(inputName)) {
        let pageSection = document.getElementById("multiStep" + i);

        if (Array.isArray(menuSection.content[inputName])) {
          pageSection.innerHTML += "<select id='" + inputName + "'>";
          let inputSelect = document.getElementById(inputName);
          // if the 'content' value for this particular key is an array, then create a select input with a unique id.

          menuSection.content[inputName].forEach((x) => {
            inputSelect.innerHTML += "<option>" + x + "</option>";
          });
          //populate options (which are the content of the array) inside the select input created above.
        } else {
          // if it's not an array, then it's gonna be a normal input (text/email/phone nr,etc for now) -- no check for radios yet.
          pageSection.innerHTML +=
            "<input type='" +
            menuSection.content[inputName] +
            "' name='" +
            inputName +
            "' placeholder='" +
            inputName +
            "'/>";
        }
      }
    }
  });
};

createForms(jsonForm);
