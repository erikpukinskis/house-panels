library.define(
  "house-panels",
  ["./house-plan", "./floor-section", "./face-wall", "./roof", "./door-section", "./side-wall"],
  function(HousePlan, floorSection, faceWall, roof, doorSection, sideWall) {

    var BACK_WALL_INSIDE_HEIGHT = 80
    var SLOPE = 1/8
    var FLOOR_TOP = 96

    var backPlateRightHeight = roof.RAFTER_HEIGHT - HousePlan.verticalSlice(HousePlan.parts.twinWall.THICKNESS, SLOPE)

    var rafterContact = HousePlan.parts.stud.DEPTH+HousePlan.parts.plywood.THICKNESS*SLOPE

    var backPlateLeftHeight = backPlateRightHeight - rafterContact*SLOPE

    var rafterStart = {
      zPos: HousePlan.parts.stud.DEPTH + HousePlan.parts.plywood.THICKNESS,
      yPos: FLOOR_TOP - BACK_WALL_INSIDE_HEIGHT
    }

    var betweenRafterIntersections = 72 - rafterStart.zPos
    var elevationBetweenIntersections = betweenRafterIntersections*SLOPE

    var headerRafterIntersection = {
      xPos: 0,
      zPos: 72,
      yPos: rafterStart.yPos - elevationBetweenIntersections
    }

    var frontWallPosition = 48+24 - HousePlan.parts.stud.DEPTH

    var frontWallHeight = FLOOR_TOP - headerRafterIntersection.yPos 

    var wallHang = HousePlan.parts.stud.DEPTH + HousePlan.parts.plywood.THICKNESS

    var interiorWidth = 48 - wallHang

    var sideHeightA = BACK_WALL_INSIDE_HEIGHT + HousePlan.verticalSlice(0.75, SLOPE) + interiorWidth*SLOPE

    var sideWidthA = 48 - wallHang

    var topOverhang = HousePlan.verticalSlice(roof.RAFTER_HEIGHT - 0.75, SLOPE)

    var sideWidthB = 24 - wallHang

    var sideHeightB = sideHeightA + sideWidthB*SLOPE

    var backWallOptions = {
      xSize: 48,
      ySize: 80,
      topOverhang: backPlateLeftHeight - HousePlan.parts.plywood.THICKNESS*SLOPE,
      bottomOverhang: floorSection.HEIGHT,
      orientation: "north",
      slope: SLOPE,
      generator: faceWall,
    }

    var panels = [
      {
        tag: "base floor section",
        xSize: 48,
        zSize: 96,
        join: "right",
        generator: floorSection,
      },
      {
        tag: "floor extension",
        xSize: 24,
        zSize: 96,
        join: "left",
        generator: floorSection,
      },
      merge(
        backWallOptions,
        {
          tag: "back wall section",
          leftBattenOverhang: HousePlan.parts.plywood.THICKNESS,
          joins: "right top-full",
          rightBattenOverhang: 0.75,
        }
      ),        
      merge(
        backWallOptions,
        {
          tag: "back wall extension",
          joins: "left top-full",
          rightBattenOverhang: HousePlan.parts.plywood.THICKNESS,
        }
      ),
      {
        tag: "door section",
        generator: doorSection,
        xSize: 48,
        joins: "right top-full",
        bottomOverhang: floorSection.HEIGHT,
        topOverhang: roof.RAFTER_HEIGHT,
        ySize: frontWallHeight
      },
      {
        tag: "window section",
        generator: faceWall,
        ySize: frontWallHeight,
        xSize: 48,
        openingWidth: 24,
        openingHeight: 48,
        openingBottom: 39-12,
        openingLeft: 6,
        bottomOverhang: floorSection.HEIGHT,
        topOverhang: roof.RAFTER_HEIGHT,
        joins: "top-full left",
        rightBattenOverhang: HousePlan.parts.plywood.THICKNESS,
        orientation: "south",
        slopeBattens: false,
      },
      {
        tag: "roof",
        generator: roof,
        slope: SLOPE,
      },
      {
        tag: "side wall",
        generator: sideWall,
        ySize: sideHeightA,
        zPos: wallHang,
        zSize: sideWidthA,
        joins: "right top",
        leftOverhang: wallHang,
        bottomOverhang: floorSection.HEIGHT,
        topOverhang: topOverhang,
        whichSide: "left",
        slope: SLOPE,
      },
      {
        tag: "side wall extension",
        generator: sideWall,
        ySize: sideHeightB,
        zPos: 48,
        zSize: sideWidthB,
        joins: "left top",
        bottomOverhang: floorSection.HEIGHT,
        topOverhang: topOverhang,
        rightOverhang: wallHang,
        whichSide: "left",
        slope: SLOPE,
      },
    ]

    function merge(obj1,obj2){
      var obj3 = {};
      for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
      for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
      return obj3;
    }

    return panels
  }
)
