/**
Instructions:
1. Download the totally valid names file as a CSV
2. Go to https://www.convertcsv.com/csv-to-json.htm
3. Input the CSV file and ask for "CTV to JSON array"
**/
//Use this link to generate a
    let nameArray = [
      ["Vanilla Stout Porter",5],
      ["Brief",1],
      ["Samuel \"Bridges\" Porter",3],
      ["Martin House Porter",3],
      ["Cole Wehrle Porter",3],
      ["Ben N. Syder Porter",3],
      ["Kareem O'Weet Porter",2],
      ["Jed I. Knight Porter",4],
      ["Uwe Eurotrash Porter *sponsored by BGGCon*",6 ],
      ["Wayne Kerr Porter",0],
      ["Mae Denless Porter",1],
      ["Tylorine Carler Porter",5],
      ["Marina Quey Porter",2],
      ["Steve Irwin Porter",4],
      ["Taylor tha Creator Porter",3],
      ["Ashcan Porter",3],
      ["P.P. Hertz Porter",5],
      ["Gaunter O'Dimm Porter",1],
      ["Alotta Fagina Porter",3],
      ["Kenya Swallow Porter",3],
      ["Yuri Nate Porter",3],
      ["Charity Case Porter",3],
      ["Yuri Dopted Porter",3],
      ["Nugget",3],
      ["Formula Juan Porter",6],
      ["Port au Prince Porter",0],
      ["Baliin King Porter",3],
      ["Dwalin Bee Porter",3],
      ["Fudgecicle Mocha Porter",2],
      ["Guisseppe Tuscany Porter",4],
      ["Mae Patty Baldwin Ness Porter",3],
      ["Hey Porter",3],
      ["Harry Porter",4],
      ["Rafael Edward \"Ted\" Cruz Porter",2],
      ["Beto O Porter",5],
      ["Moe Lester Porter",1],
      ["Taks Credditte Porter",4],
      ["Brick \"Andy\" Mortar Porter",2],
      ["Brooke N. Rubbers Porter",4],
      ["Ivana Humpalotte Porter",2],
      ["Warner Horner McWhorter Porter",4],
      ["Monday September Nineteenth Porter",2],
      ["La-a (\"ladasha\") Porter",3],
      ["John Jacob Jingleheimer Schmidt Porter",3],
      ["Crystal Tits Porter",4],
      ["Ellis D. Porter",2],
      ["Little Sweetmeat Porter",3],
      ["Eaton Dariche Porter",3],
      ["Baby McBaby Face Porter",2],
      ["Bubba Porter",4],
      ["Boar Porter ",2],
      ["Porterhouse Steak Porter",4],
      ["Portland Patagonia Porter ",3],
      ["Torpor Porter",3],
      ["Twoler Porter",6],
      ["Papa Porter ",0],
      ["Eunuch Porter ",0],
      ["PeeWee Porter",6],
      ["P. Sherman, 42 Wallaby Way, Sydney, Porter ",2],
      ["Joseph Ray Porter",4],
      ["Brownie Shytles Porter",1],
      ["Johnny Sins Porter",5],
      ["Lil' Sweet Porter",2],
      ["Marijauna Jesus Porter",4]
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
                isMultiline: false, editable: false, textAlign: 'center',
                font: '10pt  Segoe UI,sans-serif', stroke: 'black'
              },
              new go.Binding("text", "score1").makeTwoWay()),
            $(go.TextBlock, "",
              {
                column: 1, row: 1,
                wrap: go.TextBlock.None, margin: 2, width: 25,
                isMultiline: false, editable: false, textAlign: 'center',
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
            let scoreOne = scores.shift();
            let scoreTwo = scores.shift();
            // TODO: doesn't prevent tie scores
            model.setDataProperty(d, "score1", scoreOne);
            model.setDataProperty(d, "score2", scoreTwo);
          }
        }

      }

      makeModel(names);
    } // end init
    window.addEventListener('DOMContentLoaded', init);
