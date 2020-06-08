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

const showCurrentPage = (renderedPageIndex, currentPage) => {
  let wrapper = $("#wrapper");

  //shows current page/section and hides the other
  if (renderedPageIndex === currentPage) {
    wrapper.append(
      "<section class='grid-2' id='multiStep" + renderedPageIndex + "'>"
    );
  } else {
    wrapper.append(
      "<section class='grid-2 hidden' id='multiStep" + renderedPageIndex + "'>"
    );
  }
};
const btnShower = (page, lastPage) => {
  if (page === 0) {
    // first page
    $("#prevBtn").removeClass("shown");
    $("#prevBtn").addClass("hidden");

    $("nextBtn").removeClass("hidden");
    $("#nextBtn").addClass("shown");

    $("#nextBtn").html("Next");
  }
  if (page >= 1 && page < lastPage - 1) {
    $("#prevBtn").addClass("shown");
    $("#nextBtn").addClass("shown");
  }

  if (page === lastPage - 1) {
    $("#prevBtn").addClass("shown");
    $("#nextBtn").addClass("shown");
    $("#nextBtn").html("Send");
  }

  $("#sectionTitle").html("<h3>" + jsonForm[page].sectionName + "</h3>");
};
const createForms = (json) => {
  let currentPage = 0;
  let lastPage = json.length;
  btnShower(currentPage, lastPage);

  $("#nextBtn").on("click", () => {
    if (currentPage === lastPage - 1) {
      // send
      alert("send");
    }
    currentPage++;
    let nextPageSection = $("#multiStep" + currentPage);
    let currentPageSection = $("#multiStep" + (currentPage - 1));
    currentPageSection.removeClass("shown");
    currentPageSection.addClass("hidden");

    nextPageSection.removeClass("hidden");
    nextPageSection.addClass("shown");
    btnShower(currentPage, lastPage);
  });

  $("#prevBtn").on("click", () => {
    currentPage--;
    let prevPageSection = $("#multiStep" + currentPage);
    let currentPageSection = $("#multiStep" + (currentPage + 1));
    currentPageSection.removeClass("shown");
    currentPageSection.addClass("hidden");

    prevPageSection.removeClass("hidden");
    prevPageSection.addClass("shown");
    btnShower(currentPage, lastPage);
  });

  json.forEach((menuSection, i) => {
    showCurrentPage(i, currentPage);

    for (var inputName in menuSection.content) {
      // loops through the 'content' obj

      if (menuSection.content.hasOwnProperty(inputName)) {
        let pageSection = $("#multiStep" + i);

        if (Array.isArray(menuSection.content[inputName])) {
          pageSection.append("<select id='" + inputName + "'>");
          let inputSelect = $("#" + inputName);
          // if the 'content' value for this particular key is an array, then create a select input with a unique id.

          menuSection.content[inputName].forEach((x) => {
            inputSelect.append("<option>" + x + "</option>");
          });
          //populate options (which are the content of the array) inside the select input created above.
        } else {
          // if it's not an array, then it's gonna be a normal input (text/email/phone nr,etc for now) -- no check for radios yet.
          pageSection.append(
            "<input class='form-input' type='" +
              menuSection.content[inputName] +
              "' name='" +
              inputName +
              "' placeholder='" +
              inputName +
              "'/>"
          );
        }
      }
    }
  });
};

createForms(jsonForm);
