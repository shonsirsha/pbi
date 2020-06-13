let jsonForm = [
  {
    sectionName: "Personal Details",
    content: {
      "Full Name": "text",
      Nationality: "text",
      Sex: ["Female", "Male"],
      "Passport Number": "text",
      Email: "email",
      "Phone / Whatsapp": "text",
      "Present Address": "text",
      "Address in Yogyakarta (if any)": "text",
    },
  },
  {
    sectionName: "Term Of Payment",
    content: {
      "Paid By": ["Individually", "Organization"],
      "Paid Upon My Arrival With": ["Cash", "Credit", "Bank Transfer"],
    },
  },
  {
    sectionName: "Visa",
    content: {
      "Arrangement and sponsorship of an application for 6 month Social-Culture Visa or 1 year visa ": [
        "No",
        "Yes, 1 Year Student Visa",
        "Yes, Social-Culture Visa for 6 months",
      ],
      "Indonesian Embassy (City / Country)": "text",
    },
  },
];
let currentPage = 0;

const hideComponent = (component) => {
  component.removeClass("shown");
  component.addClass("hidden");
};

const showComponent = (component) => {
  component.removeClass("hidden");
  component.addClass("shown");
};

const showCurrentPage = (renderedPageIndex, currentPage) => {
  let wrapper = $("#wrapper");

  //shows current page/section and hides the other
  if (renderedPageIndex === currentPage) {
    wrapper.append(
      "<section class='grid-2 multiStep' id='multiStep" +
        renderedPageIndex +
        "'>"
    );
  } else {
    wrapper.append(
      "<section class='grid-2 hidden multiStep' id='multiStep" +
        renderedPageIndex +
        "'>"
    );
  }
};
const btnShower = (page, lastPage) => {
  if (page === 0) {
    // first page
    hideComponent($("#prevBtn"));
    showComponent($("#nextBtn"));
    $("#nextBtn").html("Next");
  }

  if (page >= 1 && page < lastPage - 1) {
    showComponent($("#prevBtn"));
    showComponent($("#nextBtn"));
    $("#nextBtn").html("Next");
  }

  if (page === lastPage - 1) {
    showComponent($("#prevBtn"));
    showComponent($("#nextBtn"));
    $("#nextBtn").html("Submit");
  }
  $(".goToSection").removeClass("text-bold");
  $(".goToSection").eq(page).addClass("text-bold");
  $("#sectionTitle").html(
    "<h3>" + [page + 1] + ". " + jsonForm[page].sectionName + "</h3>"
  );
};
const createForms = (json) => {
  let lastPage = json.length;
  btnShower(currentPage, lastPage);

  $("#nextBtn").on("click", () => {
    if (currentPage === lastPage - 1) {
      // send
    } else {
      currentPage++;
      let nextPageSection = $("#multiStep" + currentPage);
      let currentPageSection = $("#multiStep" + (currentPage - 1));
      hideComponent(currentPageSection);
      showComponent(nextPageSection);
      btnShower(currentPage, lastPage);
    }
    // alert(currentPage);
  });

  $("#prevBtn").on("click", () => {
    currentPage--;
    let prevPageSection = $("#multiStep" + currentPage);
    let currentPageSection = $("#multiStep" + (currentPage + 1));
    hideComponent(currentPageSection);
    showComponent(prevPageSection);
    btnShower(currentPage, lastPage);
    // alert(currentPage);
  });
  json.forEach((menuSection, i) => {
    showCurrentPage(i, currentPage);
    if (i === 0) {
      $("#allSectionNames").append(
        "<p myid='" +
          i +
          "' id='sectionNumber" +
          i +
          "' class='goToSection text-bold'>" +
          (i + 1) +
          ". " +
          menuSection.sectionName +
          "</p> <br/>"
      );
    } else {
      $("#allSectionNames").append(
        "<p myid='" +
          i +
          "' id='sectionNumber" +
          i +
          "' class='goToSection'>" +
          (i + 1) +
          ". " +
          menuSection.sectionName +
          "</p> <br/>"
      );
    }
    for (var inputName in menuSection.content) {
      // loops through the 'content' obj

      if (menuSection.content.hasOwnProperty(inputName)) {
        let pageSection = $("#multiStep" + i);

        if (Array.isArray(menuSection.content[inputName])) {
          let inputNameWithSpaces = inputName;
          inputName = inputName.replace(/\s/g, "");
          pageSection.append(
            "<select class='select-form-input' id='" + inputName + "'>"
          );
          let inputSelect = $("#" + inputName);
          // if the 'content' value for this particular key is an array, then create a select input with a unique id.
          inputSelect.append("<option>" + inputNameWithSpaces + "</option>");
          menuSection.content[inputNameWithSpaces].forEach((x) => {
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

$(".goToSection").click(function () {
  hideComponent($(".multiStep"));
  showComponent($("#multiStep" + $(this).attr("myid")));
  $(".goToSection").removeClass("text-bold");
  $(this).addClass("text-bold");
  let myIdInt = parseInt($(this).attr("myid"));
  currentPage = myIdInt;
  $("#sectionTitle").html(
    "<h3>" + (myIdInt + 1) + ". " + jsonForm[myIdInt].sectionName + "</h3>"
  );
  btnShower(currentPage, jsonForm.length);
  // showComponent($("#" + ));
});
