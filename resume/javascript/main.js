(function() {
  SC.initialize({
    client_id: '78329df5c12ce4478aaebe59c073f498'
  });


  var sound = {};
  
  sound.playTrackByID = function(num) {
    // Play a soundcloud sound by its ID number
    SC.stream('/tracks/' + num).then(function(player) {
      console.log(player);
      window.player = player;
      player.play();
    });
  };
  
  sound.pause = function() {
    // Pause current sound if playing
    if (window.player) {
      window.player.pause();
    } else {
      console.log("Nothing playing");
    }
  };
  
  sound.play = function() {
    // Play current sound if selected
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
  resumeSections.forEach(inputSectionToResume);

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
      if (paragraph.getElementsByTagName("a").length > 0) {
      resumeSection[paragraphHead] = {};
      resumeSection[paragraphHead].description = paragraph.firstElementChild.nextSibling.wholeText.toString().slice(3, -1);
      resumeSection[paragraphHead].link = paragraph.lastChild.href;
      } else {
      resumeSection[paragraphHead] = paragraph.lastChild.wholeText.toString().slice(3);  
      }
    });
  }

  function addKeyValuesFromLists(element, resumeSection) {
    listItems = Array.prototype.slice.call(element.children[1].children);
    listItems.forEach(function(listItem) {
      listHead = toCamelCase(listItem.getElementsByClassName("dark-span")[0].innerText);
      subListItems = Array.prototype.slice.call(listItem.children[1].children).map(function(subListItem) {
        subListItemObject = {};
        subListItemObject.skillName = subListItem.firstChild.wholeText.toString().slice(0, -1);
        subListItemObject.skillLevel = subListItem.lastChild.innerText.length; 
        return subListItemObject;
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

  resume.bestSkills = function(skill) {
    if (resume.skills[skill]) {
      highSkillLevel = resume.skills[skill].map(function(skillItem) {
        return skillItem.skillLevel;
      }).sort().pop();
      console.log("Highest Skill Level: " + highSkillLevel);
      bestSkills = resume.skills[skill].filter(function(skillItem) {
        return skillItem.skillLevel == highSkillLevel;
      }).map(function(highSkillItem) {
        return highSkillItem.skillName;
      });
      return bestSkills;
    } else {
      throw new ReferenceError("Couldn\'t find skill " + skill + ". Try languages, frameworks, deployment, or otherSkills.");
    }
  };

  var resumeToys = {
    sound: sound,
    resume: resume
  };

  window.resumeToys = resumeToys;
  window.sound = sound;
  window.resume = resume;

  var consoleCodeStyles = "background-color: #eef; color: #636363";
  console.log("Thanks for checking out my r\xE9sum\xe9. Take a look at the " + "%cresume%c" + " object, or view the " + "%csound%c" + " object to play some SoundCloud while you look it over. If you\'d like, of course.", consoleCodeStyles, "", consoleCodeStyles, "");
})();