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
const showCurrentPage = (renderedPageIndex, currentPage, sectionName) => {
  let wrapper = document.getElementById("wrapper");

  //shows current page/section and hides the other
  if (renderedPageIndex === currentPage) {
    wrapper.innerHTML +=
      "<section id='multiStep" + renderedPageIndex + "'>" + sectionName;
  } else {
    wrapper.innerHTML +=
      "<section class='hidden' id='multiStep" +
      renderedPageIndex +
      "'>" +
      sectionName;
  }
};
const btnShower = (page, lastPage) => {
  let prevBtn = document.getElementById("prevBtn");
  let nextBtn = document.getElementById("nextBtn");

  if (page === 0) {
    // first page
    prevBtn.className = "hidden";
    nextBtn.className = "shown";
    nextBtn.innerHTML = "next";
  }
  if (page >= 1 && page < lastPage - 1) {
    prevBtn.className = "shown";
    nextBtn.className = "shown";
  }

  if (page === lastPage - 1) {
    prevBtn.className = "shown";
    nextBtn.className = "shown";
    nextBtn.innerHTML = "send";
  }
};
const createForms = (json) => {
  let prevBtn = document.getElementById("prevBtn");
  let nextBtn = document.getElementById("nextBtn");
  let currentPage = 0;
  let lastPage = json.length;
  btnShower(currentPage, lastPage);

  nextBtn.addEventListener("click", () => {
    if (currentPage === lastPage - 1) {
      // send
      alert("send");
    }
    currentPage++;
    let nextPageSection = document.getElementById("multiStep" + currentPage);
    let currentPageSection = document.getElementById(
      "multiStep" + (currentPage - 1)
    );
    currentPageSection.className = "hidden";
    nextPageSection.className = "shown";
    btnShower(currentPage, lastPage);
  });

  prevBtn.addEventListener("click", () => {
    currentPage--;
    let prevPageSection = document.getElementById("multiStep" + currentPage);
    let currentPageSection = document.getElementById(
      "multiStep" + (currentPage + 1)
    );
    currentPageSection.className = "hidden";
    prevPageSection.className = "shown";
    btnShower(currentPage, lastPage);
  });

  json.forEach((menuSection, i) => {
    showCurrentPage(i, currentPage, menuSection.sectionName);

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
