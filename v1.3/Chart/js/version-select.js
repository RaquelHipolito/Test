window.addEventListener("DOMContentLoaded", function () {
  var VERSION = window.location.pathname.split("/")[1];

  function makeSelect(options, selected) {
    var select = document.createElement("select");
    select.classList.add("form-control");
    select.classList.add("select-text");

    options.forEach(function (i) {
      var option = new Option(
        i.text,
        "/" + i.value,
        undefined,
        i.value === selected
      );
      select.add(option);
    });

    return select;
  }

  var xhr = new XMLHttpRequest();
  // Obtain JSON listing all available versions
  xhr.open("GET", window.location.origin + "/versions.json");
  xhr.onload = function () {
    var versions = JSON.parse(this.responseText);

    // Identify which is the current version
    var currentVersion = versions.find(function (i) {
      return i.version === VERSION || i.aliases.includes(VERSION);
    });

    var select = makeSelect(
      versions.map(function (i) {
        return { text: i.title, value: i.version };
      }),
      currentVersion
    );

    select.addEventListener("change", function (event) {
      window.location.href = window.location.origin + this.value;
    });

    var container = document.createElement("div");
    container.id = "version-selector";
    container.classList.add("md-nav__item");
    container.classList.add("select");
    container.appendChild(select);

    var spanHighlight = document.createElement("span");
    spanHighlight.classList.add("select-highlight");
    container.appendChild(spanHighlight);

    var spanBar = document.createElement("span");
    spanBar.classList.add("select-bar");
    container.appendChild(spanBar);

    var sidebar = document.querySelector(".md-nav--primary > .md-nav__list");
    sidebar.parentNode.insertBefore(container, sidebar);
  };
  xhr.send();
});
