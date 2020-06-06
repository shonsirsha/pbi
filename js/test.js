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

jsonForm.forEach((menuSection, i) => {
  console.log("<section class='" + i + "'>" + menuSection.sectionName + "");
  for (var inputName in menuSection.content) {
    if (menuSection.content.hasOwnProperty(inputName)) {
      if (Array.isArray(menuSection.content[inputName])) {
        console.log("<option>");
        menuSection.content[inputName].forEach((x) => {
          console.log("<section>" + x + "</section>");
        });
        console.log("</option>");
      } else {
        console.log(
          inputName + " input of this: " + menuSection.content[inputName]
        );
      }
    }
  }
  console.log("</section>");
  console.log("----------------------");
});
