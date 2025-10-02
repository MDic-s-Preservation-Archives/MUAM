// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get all dropdowns from the document
  const dropdowns = document.querySelectorAll(".dropdownsource, .dropdowncondition, .dropdown-misc")
  const conditionSource = document.querySelector(".boxsource")
  const condition = document.querySelector(".boxcondition")
  const effects = [
    "1 = EFFECT 0",
    "2 = EFFECT 1",
    "3 = EFFECT 2",
    "4 = EFFECT 3",
    "5 = EFFECT 4",
    "6 = EFFECT 5",
    "7 = EFFECT 6"
  ]
  const objectType = [
    "3 = Creature", 
    "5 = Gameobject"
  ]
  const ssobjectType = [
    "0 = Creature", 
    "1 = Gameobject", 
    "2 = Areatrigger"
  ]
  const lootType = [
    "Empty",
    "Creature",
    "Disenchanting",
    "Fishing",
    "Gameobject",
    "Item",
    "Mail",
    "Milling",
    "PickPocketing",
    "Prospecting",
    "Reference",
    "Skinning",
    "Spell"
  ]
  const itemBank = [
    "0 = not in bank", 
    "1 = in bank"
  ]
  const repRank = [
    "1 = Hated",
    "2 = Hostile",
    "4 = Unfriendly",
    "8 = Neutral",
    "16 = Friendly",
    "32 = Honored",
    "64 = Revered",
    "128 = Exalted"
  ]
  const playerRace = [
    "1 = Human",
    "2 = Orc",
    "3 = Dwarf",
    "4 = Night Elf",
    "5 = Undead",
    "6 = Tauren",
    "7 = Gnome",
    "8 = Troll",
    "9 = Goblin",
    "1 = Blood Elf",
    "11 = Draenei",
    "22 = Worgen",
    "24 = Pandaren Both",
    "25 = Pandaren Alliance",
    "26 = Pandaren Horde",
    "27 = Nightborne",
    "28 = Highmountain Tauren",
    "29 = Void Elf",
    "30 = Lightforged Draenei"
  ]
  const playerClass = [
    "1 = Warrior",
    "2 = Paladin",
    "3 = Hunter",
    "4 = Rogue",
    "5 = Priest",
    "6 = Death Knight",
    "7 = Shaman",
    "8 = Mage",
    "9 = Warlock",
    "10 = Monk",
    "11 = Druid",
    "12 = Demon Hunter"
  ]
  const creatureType = [
    "1 = Beast",
    "2 = Dragonkin",
    "3 = Demon",
    "4 = Elemental",
    "5 = Giant",
    "6 = Undead",
    "7 = Humaniod",
    "8 = Critter",
    "9 = Mechanical",
    "10 = Not Specified",
    "11 = Totem = 11",
    "12 = Non Combat Pet",
    "13 = Gas Cloud",
    "14 = Wild Pet",
    "15 = Aberration"
  ]
  const objectTypeID = [
    "3 = TYPEID_UNIT", 
    "4 = TYPEID_PLAYER", 
    "5 = TYPEID_GAMEOBJECT", 
    "7 = TYPEID_CORPSE"
  ]
  const relationTo = [
    "0 = RELATION_SELF",
    "1 = RELATION_IN_PARTY",
    "2 = RELATION_IN_RAID_OR_PARTY",
    "3 = RELATION_OWNED_BY",
    "4 = RELATION_PASSENGER_OF",
    "5 = RELATION_CREATED_BY"
  ]
  const distanceTo = [
    "0 = distance must be equal to",
    "1 = distance must be higher than",
    "2 = distance must be lower than",
    "3 = distance must be equal to or higher than",
    "4 = distance must be equal to or lower than"
  ]

  const hpValue = [
    "0 = HP must be equal",
    "1 = HP must be higher",
    "2 = HP must be lesser",
    "3 = HP must be equal or higher",
    "4 = HP must be equal or lower"
  ]

  const hpPercentage = [
    "0 = Percentage of max HP must be equal",
    "1 = Percentage of max HP must be higher",
    "2 = Percentage of max HP must be lower",
    "3 = Percentage of max HP must be equal or higher",
    "4 = Percentage of max HP must be equal or lower"
  ]

  const questState = [
    "1 = not taken",
    "2 = completed",
    "8 = in progress",
    "32 = failed",
    "64 = rewarded"
  ]

  const levelState = [
    "0 = equal to",
    "1 = higher than",
    "2 = lower than",
    "3 = higher than or equal to",
    "4 = lower than or equal to",
  ]

  const difficultyID = [
    "1 = Normal",
    "2 = Heroic",
    "5 = 10 Man",
    "6 = 25 Man"
  ]

  const standState = [
  "0 = Stand",
  "1 = Sit",
  "2 = Sit chair",
  "3 = Sleep",
  "4 = Sit low chair",
  "5 = Sit medium chair",
  "6 = Sit high chair",
  "7 = Dead",
  "8 = Kneel",
  "9 = Submerged"
  ]

  let sVal = 0
  let cVal = 0

  const buttonclear = document.querySelector(".buttonclearmisc")
  const buttoncreate = document.querySelector(".buttoncreatecondition")
  //const buttoncopy = document.querySelector(".buttoncopy")
  //const buttonclearoutput = document.querySelector(".buttonclearoutput")

  // Add clear output functionality

  // Add clear output functionality
  // Clear output function
  window.clearOutput = () => {
    document.getElementById("conditonoutput").value = ""
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
    const dynamicDropdowns = container.querySelectorAll(".dropdownsource, .dropdowncondition, .dropdown-misc, .dropdown-generated");
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

        // Handle different dropdown types
        if (dropdown.classList.contains("dropdownsource") || dropdown.classList.contains("dropdowncondition")) {
          setValuesFunction(option.innerText)
        }

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
      // Reset the misc dropdowns to their default values
      const elsegroupDropdown = document.querySelector(".elsegroup-dropdown")
      const negativeDropdown = document.querySelector(".negative-dropdown")

      if (elsegroupDropdown) {
        const elsegroupSelected = elsegroupDropdown.querySelector(".selected")
        const elsegroupOptions = elsegroupDropdown.querySelectorAll(".menu li")
        elsegroupSelected.innerText = "0"
        elsegroupSelected.dataset.value = "0"; // Set data-value for 0
        elsegroupOptions.forEach((option) => option.classList.remove("active"))
        elsegroupOptions[0].classList.add("active")
      }

      if (negativeDropdown) {
        const negativeSelected = negativeDropdown.querySelector(".selected")
        const negativeOptions = negativeDropdown.querySelectorAll(".menu li")
        negativeSelected.innerText = "No"
        negativeSelected.dataset.value = "0"; // Set data-value for No
        negativeOptions.forEach((option) => option.classList.remove("active"))
        negativeOptions[0].classList.add("active")
      }

      document.getElementById("errortext").value = "0"
      document.getElementById("scriptname").value = ""
      showNotification("Values cleared successfully!", "success")
    })
  }

  // Add a click event to the create button
  if (buttoncreate) {
    buttoncreate.addEventListener("click", () => {
      const button = buttoncreate
      button.classList.add("loading")

      setTimeout(() => {
        createcondition()
        button.classList.remove("loading")
      }, 500)
    })
  }

  // Put dropdown on top when active and back to normal when not.
  function SetHeight(element) {
    if (element.style.zIndex == 0) element.style.zIndex = 2
    else element.style.zIndex = 0
  }

  function setValuesFunction(text) {
    // Add loading animation to the relevant box
    const targetBox = text.startsWith("SOURCE_") ? conditionSource : condition
    targetBox.classList.add("loading")

    setTimeout(() => {
      switch (text) {
        // Source
        case "SOURCE_NONE":
          sVal = 0
          conditionSource.replaceChildren()
          break
        case "CREATURE_LOOT_TEMPLATE":
          sVal = 1
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Loot Entry:")
          inputboxFunction(conditionSource, "cs2", "Item Entry:")
          break
        case "DISENCHANT_LOOT_TEMPLATE":
          sVal = 2
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Loot Entry:")
          inputboxFunction(conditionSource, "cs2", "Item Entry:")
          break
        case "FISHING_LOOT_TEMPLATE":
          sVal = 3
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Loot Entry:")
          inputboxFunction(conditionSource, "cs2", "Item Entry:")
          break
        case "GAMEOBJECT_LOOT_TEMPLATE":
          sVal = 4
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Loot Entry:")
          inputboxFunction(conditionSource, "cs2", "Item Entry:")
          break
        case "ITEM_LOOT_TEMPLATE":
          sVal = 5
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Loot Entry:")
          inputboxFunction(conditionSource, "cs2", "Item Entry:")
          break
        case "MAIL_LOOT_TEMPLATE":
          sVal = 6
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Loot Entry:")
          inputboxFunction(conditionSource, "cs2", "Item Entry:")
          break
        case "MILLING_LOOT_TEMPLATE":
          sVal = 7
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Loot Entry:")
          inputboxFunction(conditionSource, "cs2", "Item Entry:")
          break
        case "PICKPOCKETING_LOOT_TEMPLATE":
          sVal = 8
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Loot Entry:")
          inputboxFunction(conditionSource, "cs2", "Item Entry:")
          break
        case "PROSPECTING_LOOT_TEMPLATE":
          sVal = 9
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Loot Entry:")
          inputboxFunction(conditionSource, "cs2", "Item Entry:")
          break
        case "REFERENCE_LOOT_TEMPLATE":
          sVal = 10
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Loot Entry:")
          inputboxFunction(conditionSource, "cs2", "Item Entry:")
          break
        case "SKINNING_LOOT_TEMPLATE":
          sVal = 11
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Loot Entry:")
          inputboxFunction(conditionSource, "cs2", "Item Entry:")
          break
        case "SPELL_LOOT_TEMPLATE":
          sVal = 12
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Loot Entry:")
          inputboxFunction(conditionSource, "cs2", "Item Entry:")
          break
        case "SPELL_IMPLICIT_TARGET":
          sVal = 13
          conditionSource.replaceChildren()
          listboxFunction(conditionSource, "cs1", "Spell Effect:", effects)
          inputboxFunction(conditionSource, "cs2", "Spell ID:")
          var ct = ["0 = Potential spell target", "1 = Spell caster"]
          conditionTargetFunction(ct)
          break
        case "GOSSIP_MENU":
          sVal = 14
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Gossip Menu ID:")
          inputboxFunction(conditionSource, "cs2", "Gossip Menu Text ID:")
          var ct = ["0 = Player", "1 = WorldObject"]
          conditionTargetFunction(ct)
          break
        case "GOSSIP_MENU_OPTION":
          sVal = 15
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Gossip Option Menu ID:")
          inputboxFunction(conditionSource, "cs2", "Gossip Option ID:")
          var ct = ["0 = Player", "1 = WorldObject"]
          conditionTargetFunction(ct)
          break
        case "CREATURE_TEMPLATE_VEHICLE":
          sVal = 16
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Creature Entry:")
          var ct = ["0 = Player riding vehicle", "1 = Vehicle creature"]
          conditionTargetFunction(ct)
          break
        case "SPELL_SOURCE":
          sVal = 17
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Spell ID:")
          var ct = ["0 = Caster", "1 = Target"]
          conditionTargetFunction(ct) 
          break
        case "SPELL_CLICK_EVENT":
          sVal = 18
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Creature Entry:")
          inputboxFunction(conditionSource, "cs2", "Spell ID:")
          var ct = ["0 = Clicker", "1 = Spellclick target"]
          conditionTargetFunction(ct)
          break
        case "QUEST_AVAILABLE":
          sVal = 19
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Quest ID:")
          break
        case "VEHICLE_SPELL":
          sVal = 21
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Creature Entry:")
          inputboxFunction(conditionSource, "cs2", "Spell ID:")
          var ct = ["0 = Player", "1 = Vehicle creature"]
          conditionTargetFunction(ct)
          break
        case "SMART_EVENT":
          sVal = 22
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Smartscript ID+1:")
          inputboxFunction(conditionSource, "cs2", "Smartscript entryorguid:")
          listboxFunction(conditionSource, "cs3", "Smartscript Objecttype:", ssobjectType)
          var ct = ["0 = Invoker", "1 = Object"]
          conditionTargetFunction(ct)
          break
        case "NPC_VENDOR":
          sVal = 23
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Vender Entry:")
          inputboxFunction(conditionSource, "cs2", "Item ID:")
          var ct = ["0 = Actor", "1 = Action target"]
          conditionTargetFunction(ct)  
          break
        case "SPELL_PROC": // to do
          sVal = 24
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Spell ID:")
          var ct = ["0 = Actor", "1 = Action target"]
          conditionTargetFunction(ct)  
          break
        case "TERRAIN_SWAP_SOURCE":
          sVal = 25
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Terrain Swap Map:")
          break
        case "PHASE":
          sVal = 26
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Phase ID:")
          inputboxFunction(conditionSource, "cs2", "Area ID:")
          break
        case "GRAVEYARD":
          sVal = 27
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "GhostZone ID:")
          inputboxFunction(conditionSource, "cs2", "Graveyard ZOne ID:")
          break
        case "AREATRIGGER":
          sVal = 28
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Areatrigger template ID:")
          var custom = ["0 = No", "1 = Yes"]
          listboxFunction(conditionSource, "cs2", "Is Custom:", custom)
          break
        case "CONVERSATION_LINE":
          sVal = 29
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Conversation Line template ID:")
          break
        case "AREATRIGGER_CLIENT_TRIGGERED":
          sVal = 30
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Areatrigger ID:")
          break
        case "TRAINER_SPELL":
          sVal = 31
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Trainer ID:")
          inputboxFunction(conditionSource, "cs2", "Spell ID:")
          break
        case "OBJECT_ID_VISIBILITY":
          sVal = 32
          conditionSource.replaceChildren()
          var ot = ["5 = Unit", "8 = Gameobject"]
          listboxFunction(conditionSource, "cs1", "Object Type:", ot)
          inputboxFunction(conditionSource, "cs2", "Object ID:")
          var ct = ["0 = Player", "1 = WorldObject"]
          conditionTargetFunction(ct)  
          break
        case "SPAWN_GROUP":
          sVal = 33
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Spawn group template ID:")
          break
        case "PLAYER_CONDITION_SOURCE":
          sVal = 34
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Player condition ID:")         
          break
        case "SKILL_LINE_ABILITY":
          sVal = 35
          conditionSource.replaceChildren()
          inputboxFunction(conditionSource, "cs1", "Skill line Ability ID:") 
          break
        // Conditions
        case "NONE":
          cVal = 0
          condition.replaceChildren()
          break
        case "AURA":
          cVal = 1
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Spell ID:")
          listboxFunction(condition, "c2", "Effect Index:", effects)
          break
        case "ITEM":
          cVal = 2
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Item Entry:")
          inputboxFunction(condition, "c2", "Item Count:")
          listboxFunction(condition, "c3", "Allowed Item Location:", itemBank)
          break
        case "ITEM_EQUIPPED":
          cVal = 3
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Item Entry:")
          break
        case "ZONEID":
          cVal = 4
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Zone ID:")
          break
        case "REPUTATION_RANK":
          cVal = 5
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Faction Template ID:")
          multilistboxFunction(condition, "c2", "Reputation Rank Mask:", repRank)
          break
        case "TEAM":
          cVal = 6
          condition.replaceChildren()
          const team = ["67 = Horde", "469 = Alliance"]
          listboxFunction(condition, "c1", "Team:", team)
          break
        case "SKILL":
          cVal = 7
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Skill ID:")
          inputboxFunction(condition, "c2", "Skill Rank:")
          break
        case "QUESTREWARDED":
          cVal = 8
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Quest ID:")
          break
        case "QUESTTAKEN":
          cVal = 9
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Quest ID:")
          break
        case "DRUNKENSTATE":
          cVal = 10
          condition.replaceChildren()
          const ds = ["0 = Sober", "1 = Tipsy", "2 = Drunk", "3 = Smashed"]
          listboxFunction(condition, "c1", "Drunken State:", ds)
          break
        case "WORLD_STATE":
          cVal = 11
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "World State Index:")
          inputboxFunction(condition, "c2", "World State Value:")
          break
        case "ACTIVE_EVENT":
          cVal = 12
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Game Event Entry:")
          break
        case "INSTANCE_INFO":
          cVal = 13
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Instance Entry:")
          inputboxFunction(condition, "c2", "Data:")
          break
        case "QUEST_NONE":
          cVal = 14
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Quest ID:")
          break
        case "CLASS":
          cVal = 15
          condition.replaceChildren()
          listboxFunction(condition, "c1", "Class:", playerClass)
          break
        case "RACE":
          cVal = 16
          condition.replaceChildren()
          listboxFunction(condition, "c1", "Race:", playerRace)
          break
        case "ACHIEVEMENT":
          cVal = 17
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Achievement ID:")
          break
        case "TITLE":
          cVal = 18
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Title ID:")
          break
        case "GENDER":
          cVal = 20
          condition.replaceChildren()
          const gender = ["0 = Male", "1 = Female"]
          listboxFunction(condition, "c1", "Gender:", gender)
          break
        case "UNIT_STATE":
          cVal = 21
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Unit State:")
          break
        case "MAPID":
          cVal = 22
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Map ID:")
          break
        case "AREAID":
          cVal = 23
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Area ID:")
          break
        case "CREATURE_TYPE":
          cVal = 24
          condition.replaceChildren()
          listboxFunction(condition, "c1", "Creature Type:", creatureType)
          break
        case "SPELL":
          cVal = 25
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Learned Spell ID:")
          break
        case "PHASEID":
          cVal = 26
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Phase ID:")
          break
        case "LEVEL":
          cVal = 27
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Level:")
          listboxFunction(condition, "c2", "Level:", levelState)
          break
        case "QUEST_COMPLETE":
          cVal = 28
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Quest ID:")
          break
        case "NEAR_CREATURE":
          cVal = 29
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Creature Entry:")
          inputboxFunction(condition, "c2", "Distance:")
          break
        case "NEAR_GAMEOBJECT":
          cVal = 30
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Gameobject Entry:")
          inputboxFunction(condition, "c2", "Distance:")
          break
        case "OBJECT_ENTRY_GUID_LEGACY":
          cVal = 31
          condition.replaceChildren()
          listboxFunction(condition, "c1", "Type ID:", objectTypeID)
          inputboxFunction(condition, "c2", "Entry:")
          inputboxFunction(condition, "c3", "GUID:")
          document.getElementById("c2").value = "0"
          document.getElementById("c3").value = "0"
          break
        case "TYPE_MASK_LEGACY":
          cVal = 32
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Typemask:")
          break
        case "RELATION_TO":
          cVal = 33
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Target:")
          document.getElementById("c1").value = "0"
          listboxFunction(condition, "c2", "Relation Type:", relationTo)
          break
        case "REACTION_TO":
          cVal = 34
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Target:")
          multilistboxFunction(condition, "c2", "Reputation Rank Mask:", repRank)
          break
        case "DISTANCE_TO":
          cVal = 35
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Target:")
          inputboxFunction(condition, "c2", "Distance:")
          listboxFunction(condition, "c3", "Comparison Type:", distanceTo)
          break
        case "ALIVE":
          cVal = 36
          condition.replaceChildren()
          labelFunction(condition, "Set Negative Condition:")
          labelFunction(condition, "No if target needs to be ALIVE.")
          labelFunction(condition, "Yes if target needs to be DEAD.")   
          break
        case "HP_VAL":
          cVal = 37
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "HP Value:")
          listboxFunction(condition, "c2", "Comparison Type:", hpValue)
          break
        case "HP_PCT":
          cVal = 38
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Percentage of max HP:")
          listboxFunction(condition, "c2", "Comparison Type:", hpPercentage)
          break
        case "REALM_ACHIEVEMENT":
          cVal = 39
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Achievement ID:")
          break
        case "IN_WATER":
          cVal = 40
          condition.replaceChildren()
          labelFunction(condition, "Set Negative Condition:")
          labelFunction(condition, "No if target needs to on land.")
          labelFunction(condition, "Yes if target needs to in water.")
          break
        case "TERRAIN_SWAP":
          cVal = 41
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Terrain Swap Map:")
          break
        case "STAND_STATE":
          cVal = 42
          condition.replaceChildren()
          const state = ["0 = Exact", "1 = Any"]
          listboxFunction(condition, "c1", "State Type:", state)
          listboxFunction(condition, "c2", "Standstate:", standState)
          break
        case "DAILY_QUEST_DONE":
          cVal = 43
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Quest ID:")
          break
        case "CHARMED": 
          cVal = 44
          condition.replaceChildren()
          labelFunction(condition, "Set Negative Condition:")
          labelFunction(condition, "No if target is charmed.")
          labelFunction(condition, "Yes if target is not charmed.")
          break
        case "PET_TYPE":
          cVal = 45
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Pet Type Mask:") // Should be a masklist but I don't have it
          break
        case "TAXI":
          cVal = 46
          condition.replaceChildren()
          labelFunction(condition, "Set Negative Condition:")
          labelFunction(condition, "No if player is on taxi.")
          labelFunction(condition, "Yes if player is not on taxi.")
          break
        case "QUESTSTATE":
          cVal = 47
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Quest ID:")
          multilistboxFunction(condition, "c2", "Quest State:", questState)
          break
        case "QUEST_OBJECTIVE_PROGRESS":
          cVal = 48
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Quest Objective ID:")
          const objectiveState = ["0 = Active", "1 = Complete"]
          listboxFunction(condition, "c3", "Quest Objective State:", objectiveState)
          break
        case "DIFFICULTY_ID":
          cVal = 49
          condition.replaceChildren()
          listboxFunction(condition, "c1", "Map Difficulty ID:", difficultyID)   
          break
        case "GAMEMASTER":
          cVal = 50
          condition.replaceChildren()
          const gamemaster = ["0 = Can not be a Gamemaster", "1 = Can be a Gamemaster"]
          listboxFunction(condition, "c1", "Gamemaster:", gamemaster)
          break
        case "OBJECT_ENTRY_GUID":
          cVal = 51
          condition.replaceChildren()
          listboxFunction(condition, "c1", "Type ID:", objectTypeID)
          inputboxFunction(condition, "c2", "Entry:")
          inputboxFunction(condition, "c3", "GUID:")
          document.getElementById("c2").value = "0"
          document.getElementById("c3").value = "0"
          break
        case "TYPE_MASK":
          cVal = 52
          condition.replaceChildren()
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Typemask:")
          break
        case "BATTLE_PET_COUNT":
          cVal = 53
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Species ID:")
          inputboxFunction(condition, "c2", "Count:")
          // ??? ComparisonType
          break
        case "SCENARIO_STEP":
          cVal = 54
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Scenario Step ID:")
          break
        case "SCENE_IN_PROGRESS":
          cVal = 55
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Scene Script Package ID:")
          break
        case "PLAYER_CONDITION":
          cVal = 56
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Player Condtion ID:")
          break
        case "PRIVATE_OBJECT":
          cVal = 57
          condition.replaceChildren()
          labelFunction(condition, "Set Negative Condition:")
          labelFunction(condition, "No if object is a personal object.")
          labelFunction(condition, "Yes if object is not a personal object.")
          break
        case "STRING_ID":
          cVal = 58
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "String ID:")
          break
        case "LABEL":
          cVal = 59
          condition.replaceChildren()
          inputboxFunction(condition, "c1", "Creature / Gameobject Label:")
          break
        default:
      }

      targetBox.classList.remove("loading")
      // Re-initialize dropdowns after content replacement
      initializeDropdowns(targetBox);
    }, 300)
  }

  function labelFunction(box, label) {
    //Create Label
    const Label = document.createElement("Label")
    Label.innerHTML = label
    //Append
    box.appendChild(Label)
  }

  function inputboxFunction(box, idv, label) {
    //Create Label
    const Label = document.createElement("Label")
    Label.innerHTML = label
    //create Inputbox
    const Input = document.createElement("input")
    Input.type = "text"
    Input.id = idv
    Input.pattern = "^[0-9]*$"
    Input.className = "modern-input"
    Input.placeholder = `Enter ${label.toLowerCase().replace(":", "")}`
    //Append
    box.appendChild(Label)
    box.appendChild(Input)
  }

  function listboxFunction(box, idv, label, list) {
    //Create Labels
    const labelElement = document.createElement("label");
    labelElement.innerHTML = label;
    box.appendChild(labelElement);

    // Create the custom dropdown HTML structure
    const dropdownDiv = document.createElement("div");
    dropdownDiv.className = "dropdown-generated";
    dropdownDiv.id = `dynamic-dropdown-${idv}`;

    const selectDiv = document.createElement("div");
    selectDiv.className = "select";

    const selectedSpan = document.createElement("span");
    selectedSpan.className = "selected";
    selectedSpan.id = idv; // The ID for value retrieval
    selectedSpan.dataset.id = idv; // Store idv in data-id as well

    const caretDiv = document.createElement("div");
    caretDiv.className = "caret";

    selectDiv.appendChild(selectedSpan);
    selectDiv.appendChild(caretDiv);
    dropdownDiv.appendChild(selectDiv);

    const menuUl = document.createElement("ul");
    menuUl.className = "menu";

    let firstOptionValue = ''; // To set as default selected

    list.forEach((optionText, index) => {
      const li = document.createElement("li");
      li.innerText = optionText;
      li.dataset.value = optionText.split('=')[0].trim(); // Store actual value in data-value

      if (index === 0) {
        li.classList.add("active");
        selectedSpan.innerText = optionText;
        selectedSpan.dataset.value = li.dataset.value;
        firstOptionValue = li.dataset.value; // Capture for initial setting
      }
      menuUl.appendChild(li);
    });

    dropdownDiv.appendChild(menuUl);
    box.appendChild(dropdownDiv);
  }

  function multilistboxFunction(box, idv, label, list) {
    //Create Labels
    const Label = document.createElement("Label")
    Label.innerHTML = label
    //create Loot Entry Box
    const Input = document.createElement("checkbox-container")
    Input.className = "modern-mask"
    Input.id = idv
    
    list.forEach(list => {
      const myArray = list.split("=")
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'mask';
      checkbox.id = myArray[0].trim()
      checkbox.text = myArray[1].trim()
      const label = document.createElement('label');
      label.id = myArray[0].trim()
      label.textContent = list

      Input.appendChild(checkbox);
      Input.appendChild(label);
    });

    //Append
    box.appendChild(Label)
    box.appendChild(Input)
  }

  function createcondition() {
    let SourceGroup = "0"
    let SourceEntry = "0"
    const SourceId = "0"

    // Get ElseGroup value from custom dropdown
    const elsegroupDropdown = document.querySelector(".elsegroup-dropdown .selected")
    let ElseGroup = elsegroupDropdown ? elsegroupDropdown.dataset.value : "0" // Use dataset.value
    if (ElseGroup == undefined){
      ElseGroup = "0"
    }

    let ConditionTarget = "0"
    let ConditionValue1 = "0"
    let ConditionValue2 = "0"
    let ConditionValue3 = "0"
    let ConditionStringValue1 = ""

    // Get Negative Condition value from custom dropdown
    const negativeDropdown = document.querySelector(".negative-dropdown .selected")
    const NegativeCondition = negativeDropdown && negativeDropdown.dataset.value === "1" ? "1" : "0" // Use dataset.value

    let ErrorTextId = document.getElementById("errortext").value
    const ScriptName = document.getElementById("scriptname").value
    let Comment = ""
    let SQLcomment = ""
    let SQL = ""

    if (ErrorTextId == "") {
      ErrorTextId = "0"
    }

    // Source
    switch (sVal) {
      case 0: {
        showNotification("Condition Source cannot be empty.", "error")
        return
      }
      case 1: // Creature Loot
      case 2: // Disenchant Loot
      case 3: // Fishing Loot
      case 4: // Gameobject Loot
      case 5: // Item Loot
      case 6: // Mail Loot
      case 7: // Milling Loot
      case 8: // Pickpocketing Loot
      case 9: // Prospecting Loot
      case 10: // Reference Loot
      case 11: // Skilling Loot
      case 12: {
        // Spell Loot
        SourceGroup = document.getElementById("cs1").value
        if (SourceGroup == "" || !isAllNumbers(SourceGroup) || SourceGroup.length > 6) {
          showNotification("Loot Entry must be a numeric value less than 7 digits.", "error")
          return
        }
        SourceEntry = document.getElementById("cs2").value
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 6) {
          showNotification("Item Entry must be a numeric value less than 7 digits.", "error")
          return
        }
        const lt = lootType[sVal]
        SQLcomment = "-- " + lt + " loot template condition (Retail TrinityCore)\r\n"
        Comment = lt + " loot entry: " + SourceGroup + " show loot item: " + SourceEntry + " if "
        break
      }
      case 13: {
        // Spell Implicit Target
        ConditionTarget = document.querySelector('[data-id="ct"]').dataset.value; // Use dataset.value
        const selectedSpellEffect = document.querySelector("cs1").innerText; // Use innerText
        const myArray = selectedSpellEffect.split("=");
        SourceGroup = myArray[0].trim();
        SourceEntry = document.getElementById("cs2").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 6) {
          showNotification("Spell ID must be a numeric value less than 7 digits.", "error");
          return;
        }
        SQLcomment = "-- Spell implicit target condition (Retail TrinityCore)\r\n";

        if (ConditionTarget == "0")
          Comment = "Spell ID: " + SourceEntry + " " + myArray[1].trim() + " will hit potential spell target if ";
        else Comment = "Spell ID: " + SourceEntry + " " + myArray[1].trim() + " will hit spell caster if ";

        break;
      }
      case 14: {
        // Gossip Menu
        ConditionTarget = document.querySelector('[data-id="ct"]').dataset.value; // Use dataset.value
        SourceGroup = document.getElementById("cs1").value;
        if (SourceGroup == "" || !isAllNumbers(SourceGroup) || SourceGroup.length > 5) {
          showNotification("Gossip Menu ID must be a numeric value less than 6 digits.", "error");
          return;
        }
        SourceEntry = document.getElementById("cs2").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 6) {
          showNotification("Gossip Menu Text ID must be a numeric value less than 7 digits.", "error");
          return;
        }
        SQLcomment = "-- Gossip Menu condition (Retail TrinityCore)\r\n";

        if (ConditionTarget == "0")
          Comment = "Gossip Menu: " + SourceGroup + " will use text ID: " + SourceEntry + " if Player ";
        else Comment = "Gossip Menu: " + SourceGroup + " will use text ID: " + SourceEntry + " if Worldobject ";

        break;
      }
      case 15: {
        // Gossip Menu Option
        ConditionTarget = document.querySelector('[data-id="ct"]').dataset.value; // Use dataset.value
        SourceGroup = document.getElementById("cs1").value;
        if (SourceGroup == "" || !isAllNumbers(SourceGroup) || SourceGroup.length > 5) {
          showNotification("Gossip Option Menu ID must be a numeric value less than 6 digits.", "error");
          return;
        }
        SourceEntry = document.getElementById("cs2").value;
        if (SourceEntry == "" || !isAllNumbersOrNeg(SourceEntry) || SourceEntry.length > 10) {
          showNotification("Gossip Option ID must be a numeric value less than 10 digits.", "error");
          return;
        }
        SQLcomment = "-- Gossip Menu Option condition (Retail TrinityCore)\r\n";

        if (ConditionTarget == "0")
          Comment = "Gossip Option Menu: " + SourceGroup + " will show Gossip Option ID: " + SourceEntry + " if Player ";
        else
          Comment =
            "Gossip Option Menu: " + SourceGroup + " will show Gossip Option ID: " + SourceEntry + " if Worldobject ";

        break;
      }
      case 16: {
        // Creature Template Vehicle
        ConditionTarget = document.querySelector('[data-id="ct"]').dataset.value; // Use dataset.value
        SourceGroup = document.getElementById("cs1").value;
        if (SourceGroup == "" || !isAllNumbers(SourceGroup) || SourceGroup.length > 6) {
          showNotification("Creature Entry must be a numeric value less than 7 digits.", "error");
          return;
        }
        SQLcomment = "-- Creature Template Vehicle condition (Retail TrinityCore)\r\n";

        if (ConditionTarget == "0") Comment = "Creature Entry: " + SourceGroup + " if Player riding vehicle ";
        else Comment = "Creature Entry: " + SourceGroup + " if vehicle creature ";

        break;
      }
      case 17: {
        // Spell
        ConditionTarget = document.querySelector('[data-id="ct"]').dataset.value; // Use dataset.value
        SourceEntry = document.getElementById("cs1").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 6) {
          showNotification("Spell ID must be a numeric value less than 7 digits.", "error");
          return;
        }
        SQLcomment = "-- Spell condition (Retail TrinityCore)\r\n";

        if (ConditionTarget == "0") Comment = "Spell: " + SourceEntry + " will be cast if Caster ";
        else Comment = "Spell: " + SourceEntry + " will be cast if Target ";

        break;
      }
      case 18: {
        // Spell click
        ConditionTarget = document.querySelector('[data-id="ct"]').dataset.value; // Use dataset.value
        SourceGroup = document.getElementById("cs1").value;
        if (SourceGroup == "" || !isAllNumbers(SourceGroup) || SourceGroup.length > 6) {
          showNotification("Creature Entry must be a numeric value less than 7 digits.", "error");
          return;
        }
        SourceEntry = document.getElementById("cs2").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 6) {
          showNotification("Spell ID must be a numeric value less than 7 digits.", "error");
          return;
        }
        SQLcomment = "-- Spell Click Event condition (Retail TrinityCore)\r\n";

        if (ConditionTarget == "0")
          Comment = "Spell " + SourceEntry + " will be cast on Clicker for creature : " + SourceGroup + " if Clicker ";
        else
          Comment =
            "Spell " +
            SourceEntry +
            " will be cast on Spellclick Target for creature : " +
            SourceGroup +
            " if Spellclick Target ";

        break;
      }
      case 19: {
        // Quest availible
        SourceEntry = document.getElementById("cs1").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 6) {
          showNotification("Quest ID must be a numeric value less than 7 digits.", "error");
          return;
        }
        SQLcomment = "-- Quest Available condition (Retail TrinityCore)\r\n";
        Comment = "Quest: " + SourceEntry + " will be availible if player ";

        break;
      }
      case 21: {
        // Vehicle Spell
        ConditionTarget = document.querySelector('[data-id="ct"]').dataset.value; // Use dataset.value
        SourceGroup = document.getElementById("cs1").value;
        if (SourceGroup == "" || !isAllNumbers(SourceGroup) || SourceGroup.length > 6) {
          showNotification("Creature must be a numeric value less than 7 digits.", "error");
          return;
        }
        SourceEntry = document.getElementById("cs2").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 6) {
          showNotification("Spell ID must be a numeric value less than 7 digits.", "error");
          return;
        }
        SQLcomment = "-- Vehicle Spell condition (Retail TrinityCore)\r\n";

        if (ConditionTarget == "0")
          Comment = "Show spell " + SourceEntry + " on vehicle " + SourceGroup + " spellbar if player ";
        else Comment = "Show spell " + SourceEntry + " on vehicle " + SourceGroup + " spellbar if vehicle ";

        break;
      }
      case 22: {
        // Smart Event
        ConditionTarget = document.querySelector('[data-id="ct"]').dataset.value; // Use dataset.value
        SourceGroup = document.getElementById("cs1").value;
        if (SourceGroup == "" || !isAllNumbers(SourceGroup) || SourceGroup.length > 3) {
          showNotification("Script ID+1 must be a numeric value less than 4 digits.", "error");
          return;
        }
        SourceEntry = document.getElementById("cs2").value;
        if (SourceEntry == ""|| !isAllNumbersOrNeg(SourceEntry) || SourceEntry.length > 9) {
          showNotification("entryorguid must be a numeric value less than 10 digits.", "error");
          return;
        }
        const selectedSmartObjectType = document.querySelector('[data-id="cs3"]').innerText; // Use innerText
        const myArray = selectedSmartObjectType.split("=");
        SourceId = myArray[0].trim();
        const SSID = document.getElementById("cs1").value -1;

        SQLcomment = "-- Smart Event condition (Retail TrinityCore)\r\n";

        if (ConditionTarget == "0")
          Comment = "Execute " + myArray[1].trim() + " Smartscript " + SourceEntry + " ID " + SSID + " if invoker ";
        else
          Comment = "Execute " + myArray[1].trim() + " Smartscript " + SourceEntry + " ID " + SSID + " if object ";

        break;
      }
      case 23: {
        // Npc Vendor
        ConditionTarget = document.querySelector('[data-id="ct"]').dataset.value; // Use dataset.value
        SourceGroup = document.getElementById("cs1").value;
        if (SourceGroup == "" || !isAllNumbers(SourceGroup) || SourceGroup.length > 6) {
          showNotification("Vendor entry must be a numeric value less than 7 digits.", "error");
          return;
        }
        SourceEntry = document.getElementById("cs2").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 6) {
          showNotification("Item ID must be a numeric value less than 7 digits.", "error");
          return;
        }

        SQLcomment = "-- Npc Vendor condition (Retail TrinityCore)\r\n";

        if (ConditionTarget == "0")
          Comment = "Vendor " + SourceGroup + " will show item " + SourceEntry + " if actor ";
        else
          Comment = "Vendor " + SourceGroup + " will show item " + SourceEntry + " if action target ";

        break;
      }
      case 24: {
        // Spell Proc
        ConditionTarget = document.querySelector('[data-id="ct"]').dataset.value; // Use dataset.value
        SourceEntry = document.getElementById("cs1").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 5) {
          showNotification("Spell ID must be a numeric value less than 6 digits.", "error");
          return;
        }
        SQLcomment = "-- Spell Proc condition (Retail TrinityCore)\r\n";

        if (ConditionTarget == "0") 
          Comment = "Spell: " + SourceEntry + " can proc on actor if target ";
        else 
          Comment = "Spell: " + SourceEntry + " can proc on action target if target ";

        break;
      }
      case 25: {
        // Terrain Swap
        SourceEntry = document.getElementById("c1").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 4) {
          showNotification("Terrain Swap Map must be a numeric value less than 5 digits.", "error");
          return;
        }

        if (NegativeCondition == "0") 
          Comment = Comment + "terrain swap map is " + SourceEntry;
        else 
          Comment = Comment + "terrain swap map is not " + SourceEntry;
        break;
      }
      case 26: {
        // Phase
        SourceGroup = document.getElementById("cs1").value;
        if (SourceGroup == "" || !isAllNumbers(SourceGroup) || SourceGroup.length > 5) {
          showNotification("Phase ID must be a numeric value less than 6 digits.", "error");
          return;
        }
        SourceEntry = document.getElementById("cs2").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 5) {
          showNotification("Area ID must be a numeric value less than 6 digits.", "error");
          return;
        }
        SQLcomment = "-- Phase condition (Retail TrinityCore)\r\n";

        Comment = "Set phase " + SourceGroup + " in area " + SourceEntry + " if player ";

        break;
      }
      case 27: {
        // Graveyard
        SourceGroup = document.getElementById("cs1").value;
        if (SourceGroup == "" || !isAllNumbers(SourceGroup) || SourceGroup.length > 5) {
          showNotification("GhostZone ID must be a numeric value less than 6 digits.", "error");
          return;
        }
        SourceEntry = document.getElementById("cs2").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 6) {
          showNotification("Graveyard Zone ID must be a numeric value less than 7 digits.", "error");
          return;
        }
        SQLcomment = "-- Graveyard condition (Retail TrinityCore)\r\n";

        Comment = "Graveyard - " + SourceGroup + " - " + SourceEntry + " if ";

        break;
      }
      case 28: {
        // Areatrigger
        SourceGroup = document.getElementById("cs1").value;
        if (SourceGroup == "" || !isAllNumbers(SourceGroup) || SourceGroup.length > 3) {
          showNotification("Areatrigger template ID must be a numeric value less than 4 digits.", "error");
          return;
        }

        SourceEntry = document.querySelector('[data-id="cs2"]').dataset.value; // Use dataset.value

        SQLcomment = "-- Areatrigger condition (Retail TrinityCore)\r\n";

        Comment = "Only trigger areatrigger " + SourceGroup + " if player ";

        break;
      }
      case 29: {
        // Conversation
        SourceEntry = document.getElementById("cs1").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 5) {
          showNotification("Conversation Line template ID must be a numeric value less than 6 digits.", "error");
          return;
        }

        SQLcomment = "-- Conversation condition (Retail TrinityCore)\r\n";

        Comment = "Only show conversation line " + SourceEntry + " if player ";

        break;
      }
      case 30: {
        // Areatrigger client triggered
        SourceEntry = document.getElementById("cs1").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 4) {
          showNotification("Areatrigger ID must be a numeric value less than 5 digits.", "error");
          return;
        }

        SQLcomment = "-- Areatrigger client triggered condition (Retail TrinityCore)\r\n";

        Comment = "Areatrigger " + SourceEntry + " triggers if player ";

        break;
      }
      case 31: {
        // Trainer Spell
        SourceGroup = document.getElementById("cs1").value;
        if (SourceGroup == "" || !isAllNumbers(SourceGroup) || SourceGroup.length > 3) {
          showNotification("Trainer ID must be a numeric value less than 4 digits.", "error");
          return;
        }
        SourceEntry = document.getElementById("cs2").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 6) {
          showNotification("Spell ID must be a numeric value less than 7 digits.", "error");
          return;
        }

        SQLcomment = "-- Areatrigger client triggered condition (Retail TrinityCore)\r\n";

        Comment = "Trainer " + SourceGroup + " will teach spell " + SourceGroup + " if player ";

        break;
      }
      case 32: {
        // Object ID Visibility
        const selectedObjectType = document.querySelector('[data-id="cs1"]').innerText; // Use innerText
        const myArray = selectedObjectType.split("=");
        SourceGroup = myArray[0].trim();
        SourceEntry = document.getElementById("cs2").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 6) {
          showNotification("Object ID must be a numeric value less than 7 digits.", "error");
          return;
        }

        SQLcomment = "-- Object ID Visibility condition (Retail TrinityCore)\r\n";

        if (ConditionTarget == "0") 
          Comment = "Spawn of " + myArray[1].trim() + " Entry: " + SourceEntry + " visible if player ";
        else 
          Comment = "Spawn of " + myArray[1].trim() + " Entry: " + SourceEntry + " visible if WorldObject ";

        break;
      }
      case 33: {
        // Spawn Group
        SourceEntry = document.getElementById("cs1").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 4) {
          showNotification("Areatrigger ID must be a numeric value less than 5 digits.", "error");
          return;
        }

        SQLcomment = "-- Spawn Group condition (Retail TrinityCore)\r\n";

        Comment = "Spawn Group " + SourceEntry + " will spawn if ";

        break;
      }
      case 34: {
        // Player Condition
        SourceEntry = document.getElementById("cs1").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 5) {
          showNotification("Player condition ID must be a numeric value less than 6 digits.", "error");
          return;
        }

        SQLcomment = "-- Player Condition condition (Retail TrinityCore)\r\n";

        Comment = "Satisfy PlayerCondition " + SourceEntry + " if player ";

        break;
      }
      case 35: {
        // Skill Line Ability
        SourceEntry = document.getElementById("cs1").value;
        if (SourceEntry == "" || !isAllNumbers(SourceEntry) || SourceEntry.length > 5) {
          showNotification("Skill line ability ID must be a numeric value less than 6 digits.", "error");
          return;
        }

        SQLcomment = "-- Skill Line Ability condition (Retail TrinityCore)\r\n";

        Comment = "Learn skill line ability " + SourceEntry + " if player ";

        break;
      }
      default:
        showNotification("Condition source not implemented.", "error");
        return;
    }
    // Conditions
    switch (cVal) {
      case 0: {
        showNotification("Condition cannot be empty.", "error");
        return;
      }
      case 1: {
        // Aura
        ConditionValue1 = document.getElementById("c1").value;
        const selectedEffectIndex = document.querySelector('[data-id="c2"]').innerText; // Use innerText
        const myArray = selectedEffectIndex.split("=");
        ConditionValue2 = myArray[0].trim();
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 6) {
          showNotification("Spell ID must be a numeric value less than 7 digits.", "error");
          return;
        }

        if (NegativeCondition == "0") Comment = Comment + "has Aura: " + ConditionValue1 + " " + myArray[1].trim();
        else Comment = Comment + "does not have Aura: " + ConditionValue1 + " " + myArray[1].trim();
        break;
      }
      case 2: {
        // Item
        ConditionValue1 = document.getElementById("c1").value;
        ConditionValue2 = document.getElementById("c2").value;
        const selectedItemLocation = document.querySelector('[data-id="c3"]').innerText; // Use innerText
        const myArray = selectedItemLocation.split("=");
        ConditionValue3 = myArray[0].trim();
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 6) {
          showNotification("Item Entry must be a numeric value less than 7 digits.", "error");
          return;
        }
        if (ConditionValue2 == "" || !isAllNumbers(ConditionValue2) || ConditionValue2.length > 3) {
          showNotification("Item Count must be a numeric value less than 4 digits.", "error");
          return;
        }

        if (NegativeCondition == "0")
          Comment = Comment + "has Item: " + ConditionValue1 + " Count: " + ConditionValue2 + " " + myArray[1].trim();
        else
          Comment =
            Comment + "does not have Item: " + ConditionValue1 + " Count: " + ConditionValue2 + " " + myArray[1].trim();
        break;
      }
      case 3: {
        // Item equipped
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 6) {
          showNotification("Item Entry must be a numeric value less than 7 digits.", "error");
          return;
        }

        if (NegativeCondition == "0") Comment = Comment + "has Item: " + ConditionValue1 + " equipped";
        else Comment = Comment + "does not have Item: " + ConditionValue1 + " equipped";
        break;
      }
      case 4: {
        // Zone ID
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 4) {
          showNotification("Zone ID must be a numeric value less than 5 digits.", "error");
          return;
        }

        if (NegativeCondition == "0") Comment = Comment + "is in Zone ID: " + ConditionValue1;
        else Comment = Comment + "is not in Zone ID: " + ConditionValue1;
        break;
      }
      case 5: {
        // Reputaion
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 4) {
          showNotification("Faction Template ID must be a numeric value less than 5 digits.", "error");
          return;
        }

        let mask = 0;
        let masknames = "";
        var checkboxes = document.querySelectorAll('input[name="mask"]:checked'), values = [];
        for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked == true){
            mask += parseInt(checkboxes[i].id);
            if(masknames != "")
              masknames += ", ";
            masknames += checkboxes[i].text;
            }
        }
        ConditionValue2 = mask;

        if (NegativeCondition == "0")
          Comment = Comment + "has faction ID: " + ConditionValue1 + " with reputation " + masknames;
        else
          Comment =
            Comment + "does not have faction ID: " + ConditionValue1 +  " with reputation " + masknames;
        break;
      }
      case 6: {
        // Team
        const selectedTeam = document.querySelector('[data-id="c1"]').innerText; // Use innerText
        const myArray = selectedTeam.split("=");
        ConditionValue1 = myArray[0].trim();

        if (NegativeCondition == "0") Comment = Comment + "team is " + myArray[1].trim();
        else Comment = Comment + "team is not " + myArray[1].trim();
        break;
      }
      case 7: {
        // Skill
        ConditionValue1 = document.getElementById("c1").value;
        ConditionValue2 = document.getElementById("c2").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 3) {
          showNotification("Skill ID must be a numeric value less than 4 digits.", "error");
          return;
        }
        if (ConditionValue2 == "" || !isAllNumbers(ConditionValue2) || ConditionValue2.length > 3) {
          showNotification("Skill Rank must be a numeric value less than 4 digits.", "error");
          return;
        }

        if (NegativeCondition == "0")
          Comment = Comment + "has Skill ID: " + ConditionValue1 + " Rank: " + ConditionValue2;
        else Comment = Comment + "does not have Skill ID: " + ConditionValue1 + " Rank: " + ConditionValue2;
        break;
      }
      case 8: {
        // Quest Rewarded
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 5) {
          showNotification("Quest ID cmust be a numeric value less than 6 digits.", "error");
          return;
        }

        if (NegativeCondition == "0") Comment = Comment + "Quest: " + ConditionValue1 + " in rewarded state";
        else Comment = Comment + "Quest: " + ConditionValue1 + " not in rewarded state";
        break;
      }
      case 9: {
        // Quest Taken
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 5) {
          showNotification("Quest ID must be a numeric value less than 6 digits.", "error");
          return;
        }

        if (NegativeCondition == "0") Comment = Comment + "Quest: " + ConditionValue1 + " in progress state";
        else Comment = Comment + "Quest: " + ConditionValue1 + " not in progress state";
        break;
      }
      case 10: {
        // Drunken State
        const selectedDrunkenState = document.querySelector('[data-id="c1"]').innerText; // Use innerText
        const myArray = selectedDrunkenState.split("=");
        ConditionValue1 = myArray[0].trim();

        if (NegativeCondition == "0") Comment = Comment + "Drunken State is " + myArray[1].trim();
        else Comment = Comment + "Drunken State is not " + myArray[1].trim();
        break;
      }
      case 11: {
        // Worldstate
        ConditionValue1 = document.getElementById("c1").value;
        ConditionValue2 = document.getElementById("c2").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 5) {
          showNotification("World State Index must be a numeric value less than 6 digits.", "error");
          return;
        }
        if (ConditionValue2 == "" || !isAllNumbers(ConditionValue2) || ConditionValue2.length > 1) {
          showNotification("World State Value must be a numeric value of 1 digit.", "error");
          return;
        }

        if (NegativeCondition == "0")
          Comment = Comment + "has World State Index: " + ConditionValue1 + " Value: " + ConditionValue2;
        else Comment = Comment + "does not have World State Index: " + ConditionValue1 + " Value: " + ConditionValue2;
        break;
      }
      case 12: {
        // Active Game Event
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 3) {
          showNotification("Game Event Entry must be a numeric value less than 4 digits.", "error");
          return;
        }

        if (NegativeCondition == "0") Comment = Comment + "Game Event Entry: " + ConditionValue1 + " is active";
        else Comment = Comment + "Game Event Entry: " + ConditionValue1 + " is not active";
        break;
      }
      case 13: {
        // Instance Info
        ConditionValue1 = document.getElementById("c1").value;
        ConditionValue2 = document.getElementById("c2").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 3) {
          showNotification("Instance Entry must be a numeric value less than 4 digits.", "error");
          return;
        }
        if (ConditionValue2 == "" || !isAllNumbers(ConditionValue2) || ConditionValue2.length > 1) {
          showNotification("Data must be a numeric value of 1 digit.", "error");
          return;
        }

        if (NegativeCondition == "0")
          Comment = Comment + "data value: " + ConditionValue2 + " is set for Instance Entry: " + ConditionValue1;
        else Comment = Comment + "data value: " + ConditionValue2 + " is not set for Instance Entry: " + ConditionValue1;
        break;
      }
      case 14: {
        // Quest None
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 5) {
          showNotification("Quest ID must be a numeric value less than 6 digits.", "error");
          return;
        }

        if (NegativeCondition == "0") Comment = Comment + "Quest: " + ConditionValue1 + " in not taken state";
        else Comment = Comment + "Quest: " + ConditionValue1 + " not in not taken state";
        break;
      }
      case 15: {
        // Class
        const selectedClass = document.querySelector('[data-id="c1"]').innerText; // Use innerText
        const myArray = selectedClass.split("=");
        ConditionValue1 = myArray[0].trim();

        if (NegativeCondition == "0") Comment = Comment + "class is " + myArray[1].trim();
        else Comment = Comment + "class is not " + myArray[1].trim();
        break;
      }
      case 16: {
        // Race
        const selectedRace = document.querySelector('[data-id="c1"]').innerText; // Use innerText
        const myArray = selectedRace.split("=");
        ConditionValue1 = myArray[0].trim();

        if (NegativeCondition == "0") Comment = Comment + "race is " + myArray[1].trim();
        else Comment = Comment + "race is not " + myArray[1].trim();
        break;
      }
      case 17: {
        // Achievement
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 4) {
          showNotification("Achievement ID must be a numeric value less than 5 digits.", "error");
          return;
        }

        if (NegativeCondition == "0") Comment = Comment + "player has Achievement ID: " + ConditionValue1 + " complete";
        else Comment = Comment + "player does not have Achievement ID: " + ConditionValue1 + " complete";
        break;
      }
      case 18: {
        // Title
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 3) {
          showNotification("Title ID must be a numeric value less than 4 digits.", "error");
          return;
        }

        if (NegativeCondition == "0") Comment = Comment + "player has Title ID: " + ConditionValue1;
        else Comment = Comment + "player doe not have Title ID: " + ConditionValue1;
        break;
      }
      case 20: {
        // Gender
        const selectedGender = document.querySelector('[data-id="c1"]').innerText; // Use innerText
        const myArray = selectedGender.split("=");
        ConditionValue1 = myArray[0].trim();

        if (NegativeCondition == "0") Comment = Comment + "gender is " + myArray[1].trim();
        else Comment = Comment + "gender is not " + myArray[1].trim();
        break;
      }
      case 21: {
        // Unit State
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 4) {
          showNotification("Unit State must be a numeric value less than 5 digits.", "error");
          return;
        }

        if (NegativeCondition == "0") Comment = Comment + "Unit State is " + ConditionValue1;
        else Comment = Comment + "Unit State is not " + ConditionValue1;
        break;
      }
      case 22: {
        // Map ID
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 4) {
          showNotification("Map ID must be a numeric value less than 5 digits.", "error");
          return;
        }

        if (NegativeCondition == "0") Comment = Comment + "Map: " + ConditionValue1 + " is current map";
        else Comment = Comment + "Map: " + ConditionValue1 + " is not current map";
        break;
      }
      case 23: {
        // Area ID
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 5) {
          showNotification("Area ID must be a numeric value less than 6 digits.", "error");
          return;
        }

        if (NegativeCondition == "0") Comment = Comment + "Area: " + ConditionValue1 + " is current area";
        else Comment = Comment + "Area: " + ConditionValue1 + " is not current area";
        break;
      }
      case 24: {
        // creature type
        const selectedCreatureType = document.querySelector('[data-id="c1"]').innerText; // Use innerText
        const myArray = selectedCreatureType.split("=");
        ConditionValue1 = myArray[0].trim();

        if (NegativeCondition == "0") Comment = Comment + "creature type is " + myArray[1].trim();
        else Comment = Comment + "creature type is not " + myArray[1].trim();
        break;
      }
      case 25: {
        // Learned spell
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 6) {
          showNotification("Learned spell must be a numeric value less than 7 digits.", "error");
          return;
        }

        if (NegativeCondition == "0") Comment = Comment + "player has learned spell: " + ConditionValue1;
        else Comment = Comment + "player has not learned spell: " + ConditionValue1;
        break;
      }
      case 26: {
        // PhaseID
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 5) {
          showNotification("PhaseID must be a numeric value less than 6 digits.", "error");
          return;
        }

        if (NegativeCondition == "0") Comment = Comment + "is in PhaseID: " + ConditionValue1;
        else Comment = Comment + "is not in PhaseID: " + ConditionValue1;
        break;
      }
      case 27: {
        // Level
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1 == 0 || ConditionValue1 > 70) {
          showNotification("Level must be a value between 1 and 70.", "error");
          return;
        }

        const selectedLevelState = document.querySelector('[data-id="c2"]').innerText; // Use innerText
        const myArray = selectedLevelState.split("=");
        ConditionValue2 = myArray[0].trim();


        if (NegativeCondition == "0") Comment = Comment + "level is " + myArray[1].trim() + " " + ConditionValue1;
        else Comment = Comment + "level is not " + myArray[1].trim() + " " + ConditionValue1;
        break;
      }
      case 28: {
        // Quest Complete
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 5) {
          showNotification("Quest ID must be a numeric value less than 6 digits.", "error");
          return;
        }

        if (NegativeCondition == "0") Comment = Comment + "Quest: " + ConditionValue1 + " is in complete state";
        else Comment = Comment + "Quest: " + ConditionValue1 + " is not in complete state";
        break;
      }
      case 29: {
        // Near creature
        ConditionValue1 = document.getElementById("c1").value;
        ConditionValue2 = document.getElementById("c2").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 6) {
          showNotification("Creature Entry must be a numeric value less than 7 digits.", "error");
          return;
        }
        if (ConditionValue2 == "" || !isAllNumbers(ConditionValue2) || ConditionValue2.length > 4) {
          showNotification("Distance must be a numeric value less than 5 digits.", "error");
          return;
        }

        if (NegativeCondition == "0")
          Comment = Comment + "Creature Entry: " + ConditionValue1 + " is within " + ConditionValue2 + " yards";
        else Comment = Comment + "Creature Entry: " + ConditionValue1 + " is not within " + ConditionValue2 + " yards";
        break;
      }
      case 30: {
        // Near gameobject
        ConditionValue1 = document.getElementById("c1").value;
        ConditionValue2 = document.getElementById("c2").value;
        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 6) {
          showNotification("Gameobject Entry must be a numeric value less than 7 digits.", "error");
          return;
        }
        if (ConditionValue2 == "" || !isAllNumbers(ConditionValue2) || ConditionValue2.length > 4) {
          showNotification("Distance must be a numeric value less than 5 digits.", "error");
          return;
        }

        if (NegativeCondition == "0")
          Comment = Comment + "Gameobject Entry: " + ConditionValue1 + " is within " + ConditionValue2 + " yards";
        else Comment = Comment + "Gameobject Entry: " + ConditionValue1 + " is not within " + ConditionValue2 + " yards";
        break;
      }
      case 31: {
        // Object entry guid legeacy
        const selectedTypeID = document.querySelector('[data-id="c1"]').innerText; // Use innerText
        const myArray = selectedTypeID.split("=");
        ConditionValue1 = myArray[0].trim();
        ConditionValue2 = document.getElementById("c2").value;
        ConditionValue3 = document.getElementById("c3").value;
        if (ConditionValue2 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 6) {
          showNotification("Entry must be a numeric value less than 7 digits.", "error");
          return;
        }
        if (ConditionValue3 == "" || !isAllNumbers(ConditionValue2) || ConditionValue2.length > 8) {
          showNotification("GUID must be a numeric value less than 9 digits.", "error");
          return;
        }
        if (NegativeCondition == "0")
          Comment =
            Comment + "object is " + myArray[1].trim() + " Entry: " + ConditionValue2 + " GUID: " + ConditionValue3;
        else
          Comment =
            Comment + "object is not " + myArray[1].trim() + " Entry: " + ConditionValue2 + " GUID: " + ConditionValue3;
        break;
      }
      case 32: {
        // Typemask Legacy
        ConditionValue1 = parseInt(document.getElementById("c1").value).toString();

        if (ConditionValue1 == "" || !isAllNumbers(ConditionValue1) || ConditionValue1.length > 3) {
          showNotification("Typemask must be a numeric value less than 4 digits.", "error");
          return;
        }

        if (NegativeCondition == "0")
          Comment =
            Comment + "typemask is " + ConditionValue1;
        else
          Comment =
            Comment + "typemask is not " + ConditionValue1;
        break;
      }
      case 33: {
        // Relation to
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "") {
          showNotification("Target cannot be empty.", "error");
          return;
        }
        const selectedRelationType = document.querySelector('[data-id="c2"]').innerText; // Use innerText
        const myArray = selectedRelationType.split("=");
        ConditionValue2 = myArray[0].trim();

        if (parseInt(ConditionValue2) < 3 && ConditionValue1 != "0") {
          showNotification("This Relation type requires target value to be 0.", "error");
          return;
        }

        if (parseInt(ConditionValue2) > 2 && ConditionValue1 == "0") {
          showNotification("This Relation type requires a target entry.", "error");
          return;
        }

        if (parseInt(ConditionValue2) < 3){
          if (NegativeCondition == "0")
            Comment =
              Comment + "relation is " + myArray[1].trim();
          else
            Comment =
              Comment + "relation is not " + myArray[1].trim();
        }
        if (parseInt(ConditionValue2) > 2){
          if (NegativeCondition == "0")
            Comment =
              Comment + "relation is " + myArray[1].trim() + " Entry " + ConditionValue1;
          else
            Comment =
              Comment + "relation is not " + myArray[1].trim() + " Entry " + ConditionValue1;
        }
        break;
      }
      case 34: {
        // Reaction to
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "") {
          showNotification("Target cannot be empty.", "error");
          return;
        }

        let mask = 0;
        let masknames = "";
        var checkboxes = document.querySelectorAll('input[name="mask"]:checked'), values = [];
        for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked == true){
            mask += parseInt(checkboxes[i].id);
            if(masknames != "")
              masknames += ", ";
            masknames += checkboxes[i].text;
            }
        }
        ConditionValue2 = mask;

        if (NegativeCondition == "0")
          Comment =
            Comment + "Reaction Reputation to target entry " + ConditionValue1 + " is " + masknames;
        else
          Comment =
            Comment + "Reaction Reputation to target entry " + ConditionValue1 + " is not " + masknames;
        break;
      }
      case 35: {
        // Distance to
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "") {
          showNotification("Target cannot be empty.", "error");
          return;
        }
        ConditionValue2 = document.getElementById("c2").value;
        if (ConditionValue2 == "") {
          showNotification("Distance cannot be empty.", "error");
          return;
        }

        const selectedComparisonType = document.querySelector('[data-id="c3"]').innerText; // Use innerText
        const myArray = selectedComparisonType.split("=");

        ConditionValue3 = myArray[0].trim();

        if (NegativeCondition == "0")
          Comment =
            Comment + "target " + ConditionValue1 + " " + myArray[1].trim() + " " + ConditionValue2;
        else
          Comment =
            Comment + "not target " + ConditionValue1 + " " + myArray[1].trim() + " " + ConditionValue2;
        break;
      }
      case 36: {
        // Alive
        if (NegativeCondition == "0")
          Comment =
            Comment + "target is alive";
        else
          Comment =
            Comment + "target is dead";
        break;
      }
      case 37: {
        // HP Value
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "") {
          showNotification("HP Value cannot be empty.", "error");
          return;
        }

        const selectedHPComparisonType = document.querySelector('[data-id="c2"]').innerText; // Use innerText
        const myArray = selectedHPComparisonType.split("=");
        ConditionValue2 = myArray[0].trim();

        if (NegativeCondition == "0") 
          Comment = Comment +  myArray[1].trim() + " to " + ConditionValue1;
        else 
          Comment = Comment + "not " + myArray[1].trim() + " to " + ConditionValue1;
        break;
      }
      case 38: {
        // HP Percentage
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "") {
          showNotification("HP Percentage cannot be empty.", "error");
          return;
        }

        const selectedHPPercentageComparisonType = document.querySelector('[data-id="c2"]').innerText; // Use innerText
        const myArray = selectedHPPercentageComparisonType.split("=");
        ConditionValue2 = myArray[0].trim();

        if (NegativeCondition == "0") 
          Comment = Comment + myArray[1].trim() + " to " + ConditionValue1;
        else 
          Comment = Comment + "not " + myArray[1].trim() + " to " + ConditionValue1;
        break;
      }
      case 39: {
        // Achievement ID
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "") {
          showNotification("Achievement ID cannot be empty.", "error");
          return;
        }

        if (NegativeCondition == "0") 
          Comment = Comment + "player has completed achievement " + ConditionValue1;
        else 
          Comment = Comment + "player has not completed achievement " + ConditionValue1;
        break;
      }
      case 40: {
        // In Water
        if (NegativeCondition == "0")
          Comment =
            Comment + "target is on land";
        else
          Comment =
            Comment + "target is in water";
        break;
      }
      case 41: {
        // Terrain Swap
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "") {
          showNotification("Terrain Swap Map cannot be empty.", "error");
          return;
        }

        if (NegativeCondition == "0") 
          Comment = Comment + "terrain swap map is " + ConditionValue1;
        else 
          Comment = Comment + "terrain swap map is not " + ConditionValue1;
        break;
      }
      case 42: {
        // Stand State
        const selectedHPComparisonType = document.querySelector('[data-id="c1"]').innerText; // Use innerText
        const myArray = selectedHPComparisonType.split("=");
        ConditionValue1 = myArray[0].trim();

        const selectedHPComparisonType1 = document.querySelector('[data-id="c2"]').innerText; // Use innerText
        const myArray1 = selectedHPComparisonType1.split("=");
        ConditionValue2 = myArray1[0].trim();

        if (NegativeCondition == "0") 
          Comment = Comment + "State type " + myArray[1].trim() + " of " + myArray1[1].trim() + " is true";
        else 
          Comment = Comment + "State type " + myArray[1].trim() + " of " + myArray1[1].trim() + " is not true";
        break;
      }
      case 43: {
        // Daily Quest Done
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "") {
          showNotification("Quest ID cannot be empty.", "error");
          return;
        }

        if (NegativeCondition == "0") 
          Comment = Comment + "daily quest: " + ConditionValue1 + " is rewarded";
        else 
          Comment = Comment + "daily quest: " + ConditionValue1 + " is not rewarded";
        break;
      }
      case 44: {
        // In Water
        if (NegativeCondition == "0")
          Comment =
            Comment + "target is charmed";
        else
          Comment =
            Comment + "target is not charmed";
        break;
      }
      // 45 TODO
      case 46: {
        // On Taxi
        if (NegativeCondition == "0")
          Comment =
            Comment + "target is on taxi";
        else
          Comment =
            Comment + "target is not on taxi";
        break;
      }
      case 47: {
        // Quest State
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "") {
          showNotification("Quest ID cannot be empty.", "error");
          return;
        }

        let mask = 0;
        let masknames = "";
        var checkboxes = document.querySelectorAll('input[name="mask"]:checked'), values = [];
        for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked == true){
            mask += parseInt(checkboxes[i].id);
            if(masknames != "")
              masknames += ", ";
            masknames += checkboxes[i].text;
            }
        }
        ConditionValue2 = mask;

        if (NegativeCondition == "0")
          Comment =
            Comment + "quest " + ConditionValue1 + " is in queststate(s) " + masknames;
        else
          Comment =
            Comment + "quest " + ConditionValue1 + " is not in queststate(s) " + masknames;
        break;
      }
      case 48: {
        // Quest Objective Progress
        ConditionValue1 = document.getElementById("c1").value;
        if (ConditionValue1 == "") {
          showNotification("Quest Objective ID cannot be empty.", "error");
          return;
        }

        const selectedObjectiveState = document.querySelector('[data-id="c3"]').innerText; // Use innerText
        const myArray = selectedObjectiveState.split("=");
        ConditionValue3 = myArray[0].trim();

        if (NegativeCondition == "0") 
          Comment = Comment + "quest objective ID: " + ConditionValue1 + " is " + myArray[1].trim();
        else 
          Comment = Comment + "quest objective ID: " + ConditionValue1 + " is not " + myArray[1].trim();
        break;
      }
      case 49: {
        // Difficulty ID
        const selectedDifficultyID = document.querySelector('[data-id="c1"]').innerText; // Use innerText
        const myArray = selectedDifficultyID.split("=");
        ConditionValue1 = myArray[0].trim();

        if (NegativeCondition == "0") 
          Comment = Comment + "map dufficulty is " + myArray[1].trim();
        else 
          Comment = Comment + "map dufficulty is not " + myArray[1].trim();
        break;
      }
      case 50: {
        // Gamemaster
        const selectedDifficultyID = document.querySelector('[data-id="c1"]').innerText; // Use innerText
        const myArray = selectedDifficultyID.split("=");
        ConditionValue1 = myArray[0].trim();

        if (NegativeCondition == "0") 
          Comment = Comment + "player " + myArray[1].trim();
        else 
          Comment = Comment + "not player " + myArray[1].trim();
        break;
      }
      case 51: {
        // Object entry guid
        const selectedTypeID = document.querySelector('[data-id="c1"]').innerText; // Use innerText
        const myArray = selectedTypeID.split("=");
        ConditionValue1 = myArray[0].trim();
        ConditionValue2 = document.getElementById("c2").value;
        ConditionValue3 = document.getElementById("c3").value;
        if (ConditionValue2 == "") {
          showNotification("Entry cannot be empty.", "error");
          return;
        }
        if (ConditionValue3 == "") {
          showNotification("GUID cannot be empty.", "error");
          return;
        }
        if (NegativeCondition == "0")
          Comment =
            Comment + "object is " + myArray[1].trim() + " Entry: " + ConditionValue2 + " GUID: " + ConditionValue3;
        else
          Comment =
            Comment + "object is not " + myArray[1].trim() + " Entry: " + ConditionValue2 + " GUID: " + ConditionValue3;
        break;
      }
      case 52: {
        // Typemask
        ConditionValue1 = parseInt(document.getElementById("c1").value).toString();

        if (ConditionValue1 == "") {
          showNotification("Typemask cannot be empty.", "error");
          return;
        }

        if (NegativeCondition == "0")
          Comment =
            Comment + "typemask is " + ConditionValue1;
        else
          Comment =
            Comment + "typemask is not " + ConditionValue1;
        break;
      }
      // 53 TODO
      case 54: {
        // Scenario Step
        ConditionValue1 = parseInt(document.getElementById("c1").value).toString();

        if (ConditionValue1 == "") {
          showNotification("Scenario Step ID cannot be empty.", "error");
          return;
        }

        if (NegativeCondition == "0")
          Comment =
            Comment + "object is in scenario at Scenario Step " + ConditionValue1;
        else
          Comment =
            Comment + "object is in scenario not at Scenario Step " + ConditionValue1;
        break;
      }
      case 55: {
        // Scene in Progress
        ConditionValue1 = parseInt(document.getElementById("c1").value).toString();

        if (ConditionValue1 == "") {
          showNotification("Scene Script Package ID cannot be empty.", "error");
          return;
        }

        if (NegativeCondition == "0")
          Comment =
            Comment + "player is playing a scene with ScenarioStepID: " + ConditionValue1;
        else
          Comment =
            Comment + "player is not playing a scene with ScenarioStepID: " + ConditionValue1;
        break;
      }
      case 56: {
        // Player Condition
        ConditionValue1 = parseInt(document.getElementById("c1").value).toString();

        if (ConditionValue1 == "") {
          showNotification("Player Condition cannot be empty.", "error");
          return;
        }

        if (NegativeCondition == "0")
          Comment =
            Comment + "Player Condition " + ConditionValue1 + " is satisfied";
        else
          Comment =
            Comment + "Player Condition " + ConditionValue1 + " is not satisfied";
        break;
      }
      case 57: {
        // Personal Object
        if (NegativeCondition == "0")
          Comment =
            Comment + "Object is personal object";
        else
          Comment =
            Comment + "Object is not personal object";
        break;
      }
      case 58: {
        // String ID
        ConditionStringValue1 = document.getElementById("c1").value;
        if (ConditionStringValue1 == "") {
          showNotification("String ID cannot be empty.", "error");
          return;
        }

        if (NegativeCondition == "0")
          Comment =
            Comment + "target has string ID: " + ConditionStringValue1;
        else
          Comment =
            Comment + "target does not have string ID: " + ConditionStringValue1;
        break;
      }
      default: {
        showNotification("Condition not implemented.", "error");
        return;
      }
      case 59: {
        // Label
        ConditionValue1 = parseInt(document.getElementById("c1").value).toString();

        if (ConditionValue1 == "") {
          showNotification("Object Label cannot be empty.", "error");
          return;
        }

        if (NegativeCondition == "0")
          Comment =
            Comment + "object has label " + ConditionValue1;
        else
          Comment =
            Comment + "object does not have label " + ConditionValue1;
        break;
      }
    }

    SQL = SQLcomment;
    SQL =
      SQL +
      "DELETE FROM `conditions` WHERE `SourceTypeOrReferenceId`=" +
      sVal +
      " AND `SourceGroup`=" +
      SourceGroup +
      " AND `SourceEntry`=" +
      SourceEntry +
      " AND `SourceId`=" +
      SourceId +
      ";\r\n";
    SQL =
      SQL +
      "INSERT INTO `conditions` (`SourceTypeOrReferenceId`,`SourceGroup`,`SourceEntry`,`SourceId`,`ElseGroup`,`ConditionTypeOrReference`,`ConditionTarget`,`ConditionValue1`,`ConditionValue2`,`ConditionStringValue1`,`ConditionValue3`,`NegativeCondition`,`ErrorTextId`,`ScriptName`,`Comment`) VALUES\r\n";
    SQL =
      SQL +
      "(" +
      sVal +
      "," +
      SourceGroup +
      "," +
      SourceEntry +
      "," +
      SourceId +
      "," +
      ElseGroup +
      "," +
      cVal +
      "," +
      ConditionTarget +
      "," +
      ConditionValue1 +
      "," +
      ConditionValue2 +
      "," +
      ConditionValue3 +
      ",'" +
      ConditionStringValue1 +
      "'," +
      NegativeCondition +
      "," +
      ErrorTextId +
      ", '" +
      ScriptName +
      "', '" +
      Comment +
      "');\r\n\r\n";

    document.getElementById("conditonoutput").value += SQL;

    // Show success notification
    showNotification("SQL condition generated successfully!", "success");

    // Add success styling to output
    const outputTextarea = document.getElementById("conditonoutput");
    outputTextarea.classList.add("success");
    setTimeout(() => {
      outputTextarea.classList.remove("success");
    }, 2000);
  }

  // Close dropdowns when clicking outside
  document.addEventListener("click", (event) => {
    const allDropdowns = document.querySelectorAll(".dropdownsource, .dropdowncondition, .dropdown-misc, .dropdown-generated");
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

  function conditionTargetFunction(list) {
    //Create Labels
    const labelElement = document.createElement("label");
    labelElement.innerHTML = "Condition Target";
    conditionSource.appendChild(labelElement);

    // Create the custom dropdown HTML structure
    const dropdownDiv = document.createElement("div");
    dropdownDiv.className = "dropdown-generated";
    dropdownDiv.id = `dynamic-dropdown-ct`; // Unique ID for condition target dropdown

    const selectDiv = document.createElement("div");
    selectDiv.className = "select";

    const selectedSpan = document.createElement("span");
    selectedSpan.className = "selected";
    selectedSpan.id = "ct"; // The ID for value retrieval
    selectedSpan.dataset.id = "ct"; // Store idv in data-id as well

    const caretDiv = document.createElement("div");
    caretDiv.className = "caret";

    selectDiv.appendChild(selectedSpan);
    selectDiv.appendChild(caretDiv);
    dropdownDiv.appendChild(selectDiv);

    const menuUl = document.createElement("ul");
    menuUl.className = "menu";

    list.forEach((optionText, index) => {
      const li = document.createElement("li");
      li.innerText = optionText;
      li.dataset.value = optionText.split('=')[0].trim(); // Store actual value in data-value

      if (index === 0) {
        li.classList.add("active");
        selectedSpan.innerText = optionText;
        selectedSpan.dataset.value = li.dataset.value;
      }
      menuUl.appendChild(li);
    });

    dropdownDiv.appendChild(menuUl);
    conditionSource.appendChild(dropdownDiv);
  }

   function isAllNumbers(str) {
    return Array.from(str).every(char => !isNaN(Number(char)));
   }

    function isAllNumbersOrNeg(str) {
    if (str.charAt(0) == "-") {
      str = str.slice(1);     
    }
    return Array.from(str).every(char => !isNaN(Number(char)));
   }

  // End of DOMContentLoaded
});
