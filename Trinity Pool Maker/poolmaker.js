// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {

  const buttonclear = document.querySelector(".buttonclearvalues")
  const buttoncreate = document.querySelector(".buttoncreatepool")

  // Add clear output functionality
  // Clear output function
  window.clearOutput = () => {
    document.getElementById("pooloutput").value = ""
    showNotification("Output cleared!", "success")
  }

  // Show notification function
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    `

    if (type === "success") {
      notification.style.background = "linear-gradient(135deg, #10b981, #059669)"
    } else if (type === "error") {
      notification.style.background = "linear-gradient(135deg, #ef4444, #dc2626)"
    } else {
      notification.style.background = "linear-gradient(135deg, #6366f1, #4f46e5)"
    }

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease-out"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // Add CSS for notifications
  const notificationStyles = document.createElement("style")
  notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
  document.head.appendChild(notificationStyles)

  // Loop through all dropdown elements
  function initializeDropdowns(container) {
    const dynamicDropdowns = container.querySelectorAll(".dropdown-misc");
    dynamicDropdowns.forEach((dropdown) => {
      // Check if dropdown is already initialized
      if (dropdown.classList.contains('initialized')) {
        return;
      }
      dropdown.classList.add('initialized');

    //Get inner elements from each dropdown
    const select = dropdown.querySelector(".select")
    const caret = dropdown.querySelector(".caret")
    const menu = dropdown.querySelector(".menu")
    const options = dropdown.querySelectorAll(".menu li")
    const selected = dropdown.querySelector(".selected")

    // Add a click event to the select element
    select.addEventListener("click", () => {
      //Add the clicked select styles to the select element
      select.classList.toggle("select-clicked")
      //Add the rotate styles to the caret element
      caret.classList.toggle("caret-rotate")
      //Add the open styles to the menu element
      menu.classList.toggle("menu-open")
      SetHeight(dropdown)
    })

    // Loop through all option elements
    options.forEach((option) => {
      //Add a click eventto the opton element
      option.addEventListener("click", () => {
        //Change selected inner text to clicked option inner text
        selected.innerText = option.innerText
          // Set data-value for selected span for retrieval in createcondition
          selected.dataset.value = option.dataset.value;

        //Add the clicked select styles to the select element
        select.classList.remove("select-clicked")
        //Add the rotate styles to the caret element
        caret.classList.remove("caret-rotate")
        //Add the open styles to the menu element
        menu.classList.remove("menu-open")
        //Remove active class from all option elements
        options.forEach((option) => {
          option.classList.remove("active")
        })
        //Add active class to clicked option element
        option.classList.add("active")

        dropdown.style.zIndex = 0
      })
    })
  })
  }

  // Initial call for existing dropdowns
  initializeDropdowns(document);

  // Add a click event to the clear button
  if (buttonclear) {
    buttonclear.addEventListener("click", () => {
      document.getElementById("poolID").value = ""
      document.getElementById("maxSpawns").value = ""
      document.getElementById("templateDescription").value = ""
      const PoolTypeDropdown = document.querySelector(".pooltype-dropdown")
      if (PoolTypeDropdown) {
        const PoolTypeSelected = PoolTypeDropdown.querySelector(".selected")
        const PoolTypeOptions = PoolTypeDropdown.querySelectorAll(".menu li")
        PoolTypeSelected.innerText = "0 = Creature"
        PoolTypeSelected.dataset.value = "0"; // Set data-value for 0
        PoolTypeOptions.forEach((option) => option.classList.remove("active"))
        PoolTypeOptions[0].classList.add("active")
      }
      document.getElementById("chance").value = ""
      document.getElementById("memberDescription").value = ""
      document.getElementById("guids").value = ""
      showNotification("Values cleared successfully!", "success")
    })
  }

  // Add a click event to the create button
  if (buttoncreate) {
    buttoncreate.addEventListener("click", () => {
      const button = buttoncreate
      button.classList.add("loading")

      setTimeout(() => {
        createpool()
        button.classList.remove("loading")
      }, 500)
    })
  }

  // Put dropdown on top when active and back to normal when not.
  function SetHeight(element) {
    if (element.style.zIndex == 0) element.style.zIndex = 2
    else element.style.zIndex = 0
  }

  function createpool() {
    let MaxSpawns = 0
    let Chance = 0
    let guidString = ""

    let PoolID = document.getElementById("poolID").value
    if (PoolID == "") PoolID = "XXXXXX"

   if (PoolID != "XXXXXX") {
      PoolID = parseInt(PoolID)
      if (PoolID == 0 || Number.isNaN(PoolID) || PoolID > 99999999) {
        showNotification("PoolID must be a number greater than 0 and less than 100000000 or empty for unassigned.", "error")
        return
      }
    }

    MaxSpawns = parseInt(document.getElementById("maxSpawns").value)
    if (MaxSpawns == 0 || Number.isNaN(MaxSpawns)) {
      showNotification("MaxSpawns must be a number greater than 0.", "error")
      return
    }

    const PoolTypeDropdown = document.querySelector(".pooltype-dropdown .selected")
    let PoolType = PoolTypeDropdown ? PoolTypeDropdown.dataset.value : "0" // Use dataset.value
    if (PoolType == undefined){
      PoolType = "0"
    }

    Chance = parseInt(document.getElementById("chance").value)
    if (Chance == 0 || Number.isNaN(Chance) || Chance > 100) {
      showNotification("Chance must be a number between 1 and 100.", "error")
      return
    }

    const td = document.getElementById("templateDescription").value
    const TemplateDescription = td.replaceAll("'", "''")

    const md = document.getElementById("memberDescription").value
    const MemberDescription = md.replaceAll("'", "''")

    const gd = (document.getElementById("guids").value).trim()

    if (gd == "") {
      showNotification("Guids cannot be empty.", "error")
      return
    }
    let lastChar = gd.charAt(gd.length - 1);
    if (!isAllNumbers(lastChar)) {
      showNotification("Please fix end of Guids string.", "error")
      return
    }

    // Process guids
    const gd1 = gd.replaceAll("\n",",");    
    guidString = gd1.replaceAll(",,",",");

    const guidStringArray = guidString.split(",");

    if (guidStringArray.length < 2 && !guidStringArray[0].includes("-")) {
      showNotification("A pool requires more than one guid.", "error")
      return
    }

    let guidArray = [];
    for (let i = 0; i < guidStringArray.length; i++) {
      // Create array from guid string
      if (guidStringArray[i].includes("-")) {
            let tempArray = guidStringArray[i].split("-");
            if (tempArray.length > 2) {
              showNotification("Problem with Guids near " + guidStringArray[i] + ".", "error")
              return
            }
            if (parseInt(tempArray[0]) >= parseInt(tempArray[1])) {
              showNotification("First Guids is equal to or greater than second Guid near " + guidStringArray[i] + ".", "error")
              return
            }
            if (parseInt(tempArray[1]) - parseInt(tempArray[0]) > 200) {
              showNotification("Guid range is too high near " + guidStringArray[i] + ".", "error")
              return
            }
            for (let i = parseInt(tempArray[0]); i < parseInt(tempArray[1]) + 1; i++) {
              if (i.length > 8) {
                showNotification("Guid " + i + " is too large.", "error")
                return
              }
              guidArray.push(i.toString());
            }     
      } else {
        if (guidStringArray[i].length > 8) {
          showNotification("Guid " + guidStringArray[i] + " is too large.", "error")
          return
        }
        guidArray.push(guidStringArray[i].trim());
      }
    }

    if (MaxSpawns >= guidArray.length) {
      showNotification("Max spawns cannot be equal to or greater than the number of guids. " + guidArray.length + " guids in list.", "error")
      return
    }   

    if (hasDuplicates(guidArray)) {
      showNotification("Guid list cannot contain duplicates.", "error")
      return
    }   

    let SQL = "";
    SQL = "-- Pool Template\n";
    SQL += "SET @POOLID := " + PoolID + ";\n";
    SQL += "DELETE FROM `pool_template` WHERE `entry`=@POOLID;\n";
    SQL += "INSERT INTO `pool_template` (`entry`,`max_limit`,`description`) VALUES\n";
    SQL += "(@POOLID," + MaxSpawns + ",'" + TemplateDescription + "');\n"
    SQL += "-- Pool Members\n";
    SQL += "DELETE FROM `pool_members` WHERE `poolSpawnId`=@POOLID;\n";
    SQL += "INSERT INTO `pool_members` (`type`,`spawnId`,`poolSpawnId`,`chance`,`description`) VALUES\n";

    for (let i = 0; i < guidArray.length; i++) {

      if (!isAllNumbers(guidArray[i])) {
        showNotification("Guid " + guidArray[i] + " is not valid", "error")
        return
      }

      SQL += "{" + PoolType + "," + guidArray[i] + ",@POOLID," + Chance + ",'" + MemberDescription + "')"

      if(i < guidArray.length - 1){
        SQL += ",\n"
      } else {
        SQL += ";\n"
      }
    }

    document.getElementById("pooloutput").value += SQL + "\n";

    // Show success notification
    showNotification("SQL pool generated successfully!", "success");
  }

  function isAllNumbers(str) {
    return Array.from(str).every(char => !isNaN(Number(char)));
  }

  function hasDuplicates(arr) {
    return new Set(arr).size !== arr.length;
  }

  // Close dropdowns when clicking outside
  document.addEventListener("click", (event) => {
    const allDropdowns = document.querySelectorAll(".dropdown-misc");
    allDropdowns.forEach((dropdown) => {
      const select = dropdown.querySelector(".select");
      const menu = dropdown.querySelector(".menu");
      const caret = dropdown.querySelector(".caret");

      if (!dropdown.contains(event.target)) {
        select.classList.remove("select-clicked");
        caret.classList.remove("caret-rotate");
        menu.classList.remove("menu-open");
        dropdown.style.zIndex = 0;
      }
    });
  });
});
