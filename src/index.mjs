import "./styles.css";

parseData();

/**
 * @todo:
 *
 * add progress fields to data.json file, for dynamic values
 * add all svg files - compete switch statements
 * align list items - course details
 * check accessibility
 * success message after form submission
 */
function parseData() {
  var req = new XMLHttpRequest();
  var url = "../assets/data/data.json";
  req.overrideMimeType("application/json");
  req.open("GET", url, true);
  req.onload = function () {
    var data = JSON.parse(req.responseText);
    renderData(data);
    handleCourseDetailClick(data);
    handleFilterButtonClick();
  };

  req.send(null);
}

function renderData(data) {
  document.getElementById("app").innerHTML = `
  <div class="summary-wrapper">
    ${renderSummary(data)}
  </div>

  <div id="filter">
  <button data-filter="all" class="filter-button">ALL</button>
    ${renderFilterButton(data)}
  </div>

  <div class="courses-wrapper" id="courses">
    ${renderCourseDetails(data)}
  </div>
`;
}

function handleCourseDetailClick(data) {
  // Adding onclick event to the buttons
  const buttons = document.querySelectorAll(
    ".course-content__info__details__header__button"
  );

  buttons.forEach((button) => {
    const index = button.dataset.index;
    button.onclick = function () {
      const detailElem = document.querySelector(
        `.course-content__info__details__body--${data.courses[index].category}`
      );

      handleClick(detailElem);
    };
  });
}

function handleFilterButtonClick() {
  const filterButtons = document.querySelectorAll(".filter-button");
  const contentItems = document.querySelectorAll(".course");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filterValue = this.dataset.filter;
      // Toggle visibility of content items based on filter value
      contentItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

function renderFilterButton(data) {
  // Convert array elements to lowercase and add them to a Set
  const removeDupes = new Set(
    data.courses.map((item) => item.category.toUpperCase())
  );
  const courses = Array.from(removeDupes);
  return courses
    .map((course) => {
      return `<button data-filter=${course} class="filter-button"> ${course} </button>`;
    })
    .join(" ");
}

function renderSummary(data) {
  return `<span class="summary__avatar">
      <img src="../assets/svg/avatar.svg" alt="avatar-photo" />
    </span>
    <span class="summary-info">
      <span class="summary-info__name" id="studentName">
          ${data.name}
      </span>
      <span class="summary-info__username">
        (Your username: <span id="studentUsername"> ${data.username} </span>)
      </span>
      <div class="summary-info__bio" id="studentBio">
        ${data.bio}
      </div>
      <div class="summary-info__progress-bar">
        <div class="summary-info__progress-bar__container">
          <div class="summary-info__progress-bar__detail" style="width: 30%">
          </div>
        </div>

          <span class="summary-info__progress__detail">
            <h1> Completed 33% of Modules </h1>
            <p> 2 Modules completed </p>
            <p> 2 Modules in Progess </p>
            <p> 2 Modules Remaining </p>
          </span>
      </div>
    </span>`;
}

function renderCourseDetails(data) {
  return data.courses
    .map((course, index) => {
      let progressStatus = getCourseStatus(course.status);
      let courseLogo = getCourseLogo(course.category);
      let courseDetails = getCourseDetails(course.details);
      let courseCategory = course.category.toUpperCase();

      return `<div class="course ${courseCategory}">
                <div class="course-content">
                  <div class="course-content__category">${courseLogo} </div>
                  <div class="course-content__status">${progressStatus} </div>
                  <div class="course-content__info">
                      <h1 class="course-content__info__title"> ${course.title} </h1>
                      <div class="course-content__info__description">
                          ${course.description}
                      </div>
                      <div class="course-content__info__details"> 
                        <div class="course-content__info__details__header ${course.category}">
                          <button class="course-content__info__details__header__button" data-index="${index}">
                            <h3>Course Details</h3>
                            <img src="../assets/svg/arrows.svg" />
                          </button>
                          </div>

                          <div class="hide course-content__info__details__body--${course.category}">
                            ${courseDetails}
                          </div>
                      </div>
                  </div>
                </div>
            </div>`;
    })
    .join(" ");
}

function getCourseStatus(progress) {
  let imageSrc = "../assets/svg/";
  let imageColour = "course-content__status";
  let courseText = "";

  switch (progress) {
    /** @todo: common practice is to put the constants into one file, so only one file changes if the text change */
    /** @todo: I would recommend different colour for the progress */
    case "completed":
      imageSrc += "tick.svg";
      imageColour += "--completed";
      courseText = "Completed";
      break;
    case "progress":
      imageSrc += "";
      imageColour += "--progress";
      courseText = "Progress";
      break;
    case "unstarted":
      imageSrc += "";
      imageColour += "--unstarted";
      courseText = "Unstarted";
      break;
  }

  return `<img src=${imageSrc} class=${imageColour} alt="course-progress" /> ${courseText}`;
}

function getCourseLogo(course) {
  let imageSrc = "../assets/svg/";

  switch (course) {
    case "html":
      imageSrc += "html5.svg";
      break;
    case "CSS":
      imageSrc += "css.svg";
  }

  return `<img src=${imageSrc} alt="course-category-image" />`;
}

function getCourseDetails(details) {
  return details.map((detail) => `<li> ${detail} </li>`).join(" ");
}

function handleClick(elem) {
  elem.classList.toggle("hide");
}
