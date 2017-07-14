var library = require("module-library")(require)

module.exports = library.define(
  "house-panel",
  ["issue-bond", "sell-bond", "web-host"],
  function(issueBond, sellBond, host) {

    var workshop = issueBond("workshop", [
      "Get drill bit for 4x4 bolts",
      "Get drill",
      "Get extension cord",
      "Get gasketed screws",
      "Get bolts",
      "H1 Hurricane clips",
      "Get workshop 10' 2x4s",
      "Get workshop 12' 2x6s",
      "Get workshop 4x4s",
      "Get workshop 12ft corrugated",
      "Get workshop 8' 2x4s",
      "Mark 12 inches from the end of each of the 12 foot 2x6s",
      "Mark 3 1/2 inches from the top of each of the 8 foot 4x4s",
      "Lay down two 4x4s, with a 2x6 across it, leaving the 3 1/2 inches free at the top, square and tack in place",
      "Drill 2 bolt holes on the diagonal through each intersection",
      "Mark 12 inches from the end of two 10 foot 2x4s",
      "Repeat the bolt hole drilling with the 2x4s and each 4x4, being careful about which side of the 4x4 you drill into",
      "Leave the last 4x4/2x4 assembly assembled, and bolt it",
      "Bolt the other 4x4s into the other 2x4",
      "Prop up the two assemblies and bolt on the 2x6s",
      "Add brackets to the 2x6s at 3 foot 4 inches from each 2x4",
      "Screw 10 foot 2x4s into each bracket",
      "Screw down roofing into 2x4s with gasketed screws",
      "Screw 8 ft 2x4s into ",
    ])

    workshop.addExpenses([
      ["Get drill bit for 4x4 bolts",  1, "$5.00"],
      ["Get drill", 1, "$100.00"],
      ["Get extension cord", 1, "$13.00"],
      ["Get ratchet", 1, "$20.00"],
      ["Get wrench", 1, "$10.00"],
      ["Get gasketed screws", 1, "$5.00"],
      ["Get bolts", 8, "$10.00"],
      ["H1 Hurricane clips", 4, "$2.40"],
      ["Get workshop 10' 2x4s", 4, "$60.00"],
      ["Get workshop 12' 2x6s", 2, "$24.00"],
      ["Get workshop 4x4s", 4, "$72.00"],
      ["Get workshop 12ft corrugated", 5, "$140.00"],
      ["Get workshop 8' 2x4s", 7, "$56.00"],
    ])




    host.onSite(function(site) {
      site.addRoute("get", "panel-house-bonds/",
      sellBond(workshop, tinyHouse3, kitchen)
    })

  }

