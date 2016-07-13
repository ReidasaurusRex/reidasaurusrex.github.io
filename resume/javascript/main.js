(function() {
  SC.initialize({
    client_id: '78329df5c12ce4478aaebe59c073f498'
  });

  var sound = {};
  sound.playTrackByID = function(num) {
    SC.stream('/tracks/' + num).then(function(player) {
      console.log(player);
      window.player = player;
      player.play();
    });
  };
  sound.songPause = function() {
    if (window.player) {
      window.player.pause();
    } else {
      console.log("Nothing playing");
    }
  };
  sound.songPlay = function() {
    if (window.player) {
      window.player.play();
    } else {
      console.log("No song selected yet");
    }
  };

  var resume = {};
  resume.contact = {
    name: "Reid H Lewis",
    email: "reidhlewis91@gmail.com",
    phone: "928.856.4225",
    github: "ReidasaurusRex"
  };
  resumeSections = Array.prototype.slice.call(document.getElementsByClassName("resume-section"));
  function inputSectionToResume(element) {
    sectionHead = element.innerText.split(/\s|\n/)[0].toLowerCase();
    if (elementHasMultipleParagraphs(element)) {
      resume[sectionHead] = {};
      addKeyValuesFromParagraphs(element, resume[sectionHead]);
    } else if (elementHasNestedLists(element)) {
      resume[sectionHead] = {};
      addKeyValuesFromLists(element, resume[sectionHead]);
    } else {
      resume[sectionHead] = element.getElementsByTagName("p")[0].innerText;
    }
  }
  function elementHasMultipleParagraphs(element) {
    return element.getElementsByTagName("p").length > 1;
  }
  function elementHasNestedLists(element) {
    return element.getElementsByTagName("ul").length > 1;
  }
  function addKeyValuesFromParagraphs(element, resumeSection) {
    paragraphs = Array.prototype.slice.call(element.getElementsByTagName("p"));
    paragraphs.forEach(function(paragraph) {
      paragraphHead = toCamelCase(paragraph.getElementsByTagName("span")[0].innerText);
      resumeSection[paragraphHead] = paragraph.lastChild.wholeText.toString().slice(3);
    });
  }
  function addKeyValuesFromLists(element, resumeSection) {
    listItems = Array.prototype.slice.call(element.children[1].children);
    listItems.forEach(function(listItem) {
      listHead = toCamelCase(listItem.getElementsByClassName("dark-span")[0].innerText);
      subListItems = Array.prototype.slice.call(listItem.children[1].children).map(function(subListItem) {
        return subListItem.innerText;
      });
      resumeSection[listHead] = subListItems;
    });
  }
  function toCamelCase(string) {
    downcase = string.toLowerCase();
    camelArray = downcase.split(/\s|\./).map(function(word, index) {
      if (index > 0) {
        return word[0].toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    });
    return camelArray.join("");
  }
  resumeSections.forEach(inputSectionToResume);
  window.sound = sound;
  window.resume = resume;
  window.resumeSections = resumeSections;
})();