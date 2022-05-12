/**
Instructions:
1. Download the totally valid names file as a CSV
2. Go to https://www.convertcsv.com/csv-to-json.htm
3. Input the CSV file and ask for "CTV to JSON array"
**/
//Use this link to generate a
    let nameArray = [
  ["Michael Postar Johnston *sponsored by Affordable Storage",1  ],
  ["Eustace Johnston",2  ],
  ["Reagor Dykes Johnston",3  ],
  ["Lie Fire Johnston",4  ],
  ["Planet Marfa Johnston",5  ],
  ["Ayewilleet Minaybor Johnston",6  ],
  ["Corona Fauci Johnston",7  ],
  ["Kung Flu Johnston",8  ],
  ["Donald Johnston",9  ],
  ["X Æ A-13 Johnston",10  ],
  ["Jean Stan Johnston",11  ],
  ["Action Johnston",12  ],
  ["Kaye Leigh Johnston",13  ],
  ["Johnathon \"John\" Stan Johnston",14  ],
  ["Daire Reck Johnston",15  ],
  ["Daire Rick-Alan Johnston",16  ],
  ["Dirk Johnston",17  ],
  ["Richard Johnston",18  ],
  ["Just the Letter D Johnston",19  ],
  ["Dee \"Deejay\" Jay Johnston",20  ],
  ["Barry",21  ],
  ["Small Derek Johnston",22  ],
  ["You Child Johnston",23  ],
  ["Johnston, son of Johnston",24  ],
  ["Sport Johnston",25  ],
  ["Johnston VerJohnstonson",26  ],
  ["Dejohnston Johnston",27  ],
  ["Bonus Johnston",28  ],
  ["Kidd Johnston",29  ],
  ["Action Bronson Johnston",30  ],
  ["Shania Twain Rufus Johnston",31  ],
  ["Stevie Irwin Johnston",32  ],
  ["Dijon \"Di\" Johnston",33  ],
  ["Mylegal Property Johnston",34  ],
  ["Mystic Olraspy Johnston",35  ],
  ["Metaphysical Meagon Johnston",36  ],
  ["Governor Abbott Johnston",37  ],
  ["Elle Shimmershimmer Johnston",38  ],
  ["John Johnson Johnston",39  ],
  ["Johnstdaughter Johnston ",40  ],
  ["Jan Johnston",41  ],
  ["Jar Jar \"Triple J\" Johnston",42  ],
  ["Jack Johnston",43  ],
  ["Karek Ranley Johnston",44  ],
  ["Untitled01 Johnston",45  ],
  ["Robert') DROP TABLE Students;-- Johnston",46  ],
  ["Holloway Johnston",47  ],
  ["Derecles Kaylos Johnston",48  ],
  ["Longjohn Johnston",49  ],
  ["Derek Alan Johnston II",50  ],
  ["💯 Johnston",51  ],
  ["Daniel Johnston",52  ],
  ["Chucklefuck Ballsack Johnston I",53  ],
  ["The People's Johnston",54  ],
  ["Agricola Johnston",55  ],
  ["Root Johnston",56  ]
];

//============================================

let names = [];
let scores = [];

//this breaks the imported name and score array
for (var i = 0; i < nameArray.length; i++) {
    let dataPoint = nameArray[i];
    let nameData = nameArray[i][0];
    let scoreData = nameArray[i][1];
    console.log("Name: " + nameData + ", Score: " + scoreData);
    names.push(nameArray[i][0]);
    scores.push(nameArray[i][1]);
}
console.log(names);
console.log(scores);

    function init() {

      // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
      // For details, see https://gojs.net/latest/intro/buildingObjects.html
      const $ = go.GraphObject.make;  // for conciseness in defining templates

      myDiagram =
        $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
          {
            "textEditingTool.starting": go.TextEditingTool.SingleClick,
            "textEditingTool.textValidation": isValidScore,
            layout: $(go.TreeLayout, { angle: 180 }),
            "undoManager.isEnabled": true
          });

      // validation function for editing text
      function isValidScore(textblock, oldstr, newstr) {
        if (newstr === "") return true;
        var num = parseInt(newstr, 10);
        return !isNaN(num) && num >= 0 && num < 1000;
      }

      // define a simple Node template
      myDiagram.nodeTemplate =
        $(go.Node, "Auto",
          { selectable: false },
          $(go.Shape, "Rectangle",
            { fill: '#8C8C8C', stroke: null },
            // Shape.fill is bound to Node.data.color
            new go.Binding("fill", "color")),
          $(go.Panel, "Table",
            $(go.RowColumnDefinition, { column: 0, separatorStroke: "black" }),
            $(go.RowColumnDefinition, { column: 1, separatorStroke: "black", background: "#BABABA" }),
            $(go.RowColumnDefinition, { row: 0, separatorStroke: "black" }),
            $(go.RowColumnDefinition, { row: 1, separatorStroke: "black" }),
            $(go.TextBlock, "",
              {
                row: 0,
                wrap: go.TextBlock.None, margin: 5, width: 200,
                isMultiline: false, textAlign: 'left',
                font: '10pt  Segoe UI,sans-serif', stroke: 'white'
              },
              new go.Binding("text", "player1").makeTwoWay()),
            $(go.TextBlock, "",
              {
                row: 1,
                wrap: go.TextBlock.None, margin: 5, width: 200,
                isMultiline: false, textAlign: 'left',
                font: '10pt  Segoe UI,sans-serif', stroke: 'white'
              },
              new go.Binding("text", "player2").makeTwoWay()),
            $(go.TextBlock, "",
              {
                column: 1, row: 0,
                wrap: go.TextBlock.None, margin: 2, width: 25,
                isMultiline: false, editable: true, textAlign: 'center',
                font: '10pt  Segoe UI,sans-serif', stroke: 'black'
              },
              new go.Binding("text", "score1").makeTwoWay()),
            $(go.TextBlock, "",
              {
                column: 1, row: 1,
                wrap: go.TextBlock.None, margin: 2, width: 25,
                isMultiline: false, editable: true, textAlign: 'center',
                font: '10pt  Segoe UI,sans-serif', stroke: 'black'
              },
              new go.Binding("text", "score2").makeTwoWay())
          )
        );

      // define the Link template
      myDiagram.linkTemplate =
        $(go.Link,
          {
            routing: go.Link.Orthogonal,
            selectable: false
          },
          $(go.Shape, { strokeWidth: 2, stroke: 'white' }));


      // Generates the original graph from an array of player names
      function createPairs(players) {
        if (players.length % 2 !== 0) players.push('(empty)');
        var startingGroups = players.length / 2;
        var currentLevel = Math.ceil(Math.log(startingGroups) / Math.log(2));
        var levelGroups = [];
        var currentLevel = Math.ceil(Math.log(startingGroups) / Math.log(2));
        for (var i = 0; i < startingGroups; i++) {
          levelGroups.push(currentLevel + '-' + i);
        }
        var totalGroups = [];
        makeLevel(levelGroups, currentLevel, totalGroups, players);
        return totalGroups;
      }

      function makeLevel(levelGroups, currentLevel, totalGroups, players) {
        currentLevel--;
        var len = levelGroups.length;
        var parentKeys = [];
        var parentNumber = 0;
        var p = '';
        for (var i = 0; i < len; i++) {
          if (parentNumber === 0) {
            p = currentLevel + '-' + parentKeys.length;
            parentKeys.push(p);
          }

          if (players !== null) {
            var p1 = players[i * 2];
            var p2 = players[(i * 2) + 1];
            totalGroups.push({
              key: levelGroups[i], parent: p, player1: p1, player2: p2, parentNumber: parentNumber
            });
          } else {
            totalGroups.push({ key: levelGroups[i], parent: p, parentNumber: parentNumber });
          }

          parentNumber++;
          if (parentNumber > 1) parentNumber = 0;
        }

        // after the first created level there are no player names
        if (currentLevel >= 0) makeLevel(parentKeys, currentLevel, totalGroups, null)
      }

      function makeModel(players) {
        var model = new go.TreeModel(createPairs(players));

        model.addChangedListener(e => {
          if (e.propertyName !== 'score1' && e.propertyName !== 'score2') return;
          var data = e.object;
          if (isNaN(data.score1) || isNaN(data.score2)) return;

          // TODO: What happens if score1 and score2 are the same number?

          // both score1 and score2 are numbers,
          // set the name of the higher-score'd player in the advancing (parent) node
          // if the data.parentNumber is 0, then we set player1 on the parent
          // if the data.parentNumber is 1, then we set player2
          var parent = myDiagram.findNodeForKey(data.parent);
          if (parent === null) return;

          var playerName = parseInt(data.score1) > parseInt(data.score2) ? data.player1 : data.player2;
          if (parseInt(data.score1) === parseInt(data.score2)) playerName = "";
          myDiagram.model.setDataProperty(parent.data, (data.parentNumber === 0 ? "player1" : "player2"), playerName);
        });

        myDiagram.model = model;

        console.log(model);
        // provide initial scores
        for (var i = 0; i < model.nodeDataArray.length; i++) {
          var d = model.nodeDataArray[i];
          if (d.player1 && d.player2) {
            let scoreOne = scores.pop();
            let scoreTwo = scores.pop();
            // TODO: doesn't prevent tie scores
            model.setDataProperty(d, "score1", scoreOne);
            model.setDataProperty(d, "score2", scoreTwo);
          }
        }

      }

      makeModel(names);
    } // end init
    window.addEventListener('DOMContentLoaded', init);
